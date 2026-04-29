// api/daily-horoscope.js
// Fetches live daily horoscopes by sign from astrology-api.io
// Caches by sign + date so the API is called at most once per sign per day
// Max 12 API calls per day regardless of traffic

const cache = {};

function getCacheKey(sign, dateStr) {
  return `${sign}-${dateStr}`;
}

function getTodayString() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
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
      body: JSON.stringify({ sign }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error("Horoscope API failed:", response.status, err);
      return res.status(response.status).json({
        error: "Could not fetch today's horoscope. Please try again.",
      });
    }

    const data = await response.json();
    console.log("Horoscope API response:", JSON.stringify(data).slice(0, 400));

    // Parse the horoscope text from the response
    const d = data?.data || data;
    const horoscope =
      d?.horoscope ||
      d?.text ||
      d?.description ||
      d?.content ||
      d?.prediction ||
      (typeof d === "string" ? d : null);

    if (!horoscope) {
      console.warn("Unrecognised horoscope shape:", JSON.stringify(d).slice(0, 300));
      return res.status(500).json({ error: "Could not parse horoscope response." });
    }

    const result = {
      sign,
      date: today,
      horoscope: typeof horoscope === "string" ? horoscope : JSON.stringify(horoscope),
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
