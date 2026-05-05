// api/daily-horoscope.js
// Fetches live daily horoscopes by sign from astrology-api.io
// Caches by sign + date so the API is called at most once per sign per day
// Max 12 API calls per day regardless of traffic

const cache = {};

function getCacheKey(sign, dateStr) {
  return `v2-${sign}-${dateStr}`;
}

function getTodayString() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { sign } = req.body;

  if (!sign) {
    return res.status(400).json({ error: "sign is required" });
  }

  const apiKey = process.env.Astrology_Api_Key;
  if (!apiKey) {
    return res.status(500).json({ error: "API configuration error." });
  }

  const today = getTodayString();
  const cacheKey = getCacheKey(sign, today);

  // Return cached version if available
  if (cache[cacheKey]) {
    console.log(`Cache hit for ${sign} on ${today}`);
    return res.status(200).json(cache[cacheKey]);
  }

  console.log(`Cache miss — fetching live horoscope for ${sign} on ${today}`);

  try {
    const response = await fetch("https://api.astrology-api.io/api/v3/horoscope/sign/daily", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        sign: sign.charAt(0).toUpperCase() + sign.slice(1).toLowerCase(),
        date: today,
        language: "en",
        tradition: "universal",
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error("Horoscope API failed:", response.status, err);
      return res.status(response.status).json({
        error: "Could not fetch today's horoscope. Please try again.",
      });
    }

    const data = await response.json();
    console.log("Horoscope response:", JSON.stringify(data).slice(0, 600));

    const d = data?.data || data;

    // Strip generic filler overall_theme
    const rawTheme = d?.overall_theme || "";
    const fillerPhrases = ["suspended animation","astrological energies hover","intentions and actions","responsive to one"];
    const overallTheme = fillerPhrases.some(p => rawTheme.toLowerCase().includes(p)) ? "" : rawTheme;

    const overallRating = d?.overall_rating || null;

    // Extract life areas — each has area, title, prediction, rating, keywords
    const lifeAreas = [];
    if (Array.isArray(d?.life_areas)) {
      d.life_areas.forEach(a => {
        if (a.title && a.prediction) {
          lifeAreas.push({
            area: a.area || "",
            title: a.title,
            prediction: a.prediction,
            rating: a.rating || null,
            keywords: a.keywords || [],
          });
        }
      });
    }

    if (!overallTheme && lifeAreas.length === 0) {
      console.warn("Empty horoscope response:", JSON.stringify(d).slice(0, 400));
      return res.status(500).json({ error: "Could not parse horoscope response." });
    }

    // ── Rewrite in Arewewoke voice via Claude ──────────────────
    let rewrittenTheme = overallTheme;
    let rewrittenAreas = lifeAreas;

    try {
      const anthropicKey = process.env.ANTHROPIC_API_KEY;
      if (anthropicKey && (overallTheme || lifeAreas.length > 0)) {
        const inputText = JSON.stringify({ overallTheme, lifeAreas });

        const rewriteRes = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": anthropicKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1500,
            messages: [
              {
                role: "user",
                content: `You are the voice of Arewewoke, an astrology app for Gen Z and millennials. Rewrite this horoscope data in a conversational, direct, slightly edgy tone — like a smart friend who actually knows astrology texting you. Rules: short punchy sentences, no flowery or formal language, no words like "unfolds" "celestial" "energies hover" "astrological forces" — just real talk. Keep all the actual astrological accuracy and specific predictions. Do not add anything that wasn't in the original. Return ONLY valid JSON in exactly this shape with no markdown or extra text: {"overallTheme": "string", "lifeAreas": [{"area": "string", "title": "string", "prediction": "string", "rating": number_or_null, "keywords": ["string"]}]}

Here is the horoscope data to rewrite:
${inputText}`,
              },
            ],
          }),
        });

        if (rewriteRes.ok) {
          const rewriteData = await rewriteRes.json();
          const raw = rewriteData?.content?.[0]?.text || "";
          const clean = raw.replace(/\`\`\`json|\`\`\`/g, "").trim();
          const parsed = JSON.parse(clean);
          if (parsed.overallTheme !== undefined) rewrittenTheme = parsed.overallTheme;
          if (Array.isArray(parsed.lifeAreas) && parsed.lifeAreas.length > 0) {
            rewrittenAreas = parsed.lifeAreas;
          }
          console.log("Rewrite successful for", sign);
        } else {
          console.warn("Rewrite failed, using original:", rewriteRes.status);
        }
      }
    } catch (rewriteErr) {
      console.warn("Rewrite error, using original:", rewriteErr.message);
    }

    const result = {
      sign,
      date: today,
      overallTheme: rewrittenTheme,
      overallRating,
      lifeAreas: rewrittenAreas,
    };

    // Cache it for today
    cache[cacheKey] = result;
    return res.status(200).json(result);

  } catch (error) {
    console.error("Daily horoscope error:", error);
    return res.status(500).json({
      error: "Something went wrong fetching your horoscope. Please try again.",
    });
  }
}
