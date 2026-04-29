// api/daily-transit.js
// Personalized daily horoscope for paid users based on their natal chart
// Uses /api/v3/horoscope/personal/daily — purpose-built for this

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, date, time, city, country_code } = req.body;

  if (!date || !time || !city) {
    return res.status(400).json({ error: "date, time, and city are required" });
  }

  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);

  if (!year || !month || !day || isNaN(hour) || isNaN(minute)) {
    return res.status(400).json({ error: "Invalid date or time format" });
  }

  const apiKey = process.env.Astrology_Api_Key;
  if (!apiKey) {
    return res.status(500).json({ error: "API configuration error." });
  }

  const subject = {
    birth_data: {
      day, month, year, hour, minute, second: 0,
      city: city.trim(),
      ...(country_code ? { country_code: country_code.toUpperCase() } : {}),
    },
    name: name || "Subject",
  };

  try {
    const response = await fetch("https://api.astrology-api.io/api/v3/horoscope/personal/daily", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ subject }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error("Personal horoscope failed:", response.status, err);
      return res.status(response.status).json({
        error: "Could not fetch today's personal reading. Please try again.",
      });
    }

    const data = await response.json();
    console.log("Personal horoscope response:", JSON.stringify(data).slice(0, 500));

    const d = data?.data || data;

    // Try to extract sections (array format) or plain text
    const interps = d?.interpretations || d?.sections || d?.transits || null;
    let sections = [];
    let horoscope = null;

    if (Array.isArray(interps) && interps.length > 0) {
      sections = interps
        .filter(s => s.title && s.text && typeof s.text === "string" && s.text.length > 20)
        .map(s => ({ title: s.title.replace(/_/g, " "), text: s.text }))
        .slice(0, 8);
    } else {
      // Fallback — single text block
      horoscope =
        d?.horoscope ||
        d?.text ||
        d?.description ||
        d?.content ||
        d?.prediction ||
        (typeof d === "string" ? d : null);
    }

    const today = new Date();
    const dateStr = today.toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric"
    });

    return res.status(200).json({
      name: name || "Your",
      date: dateStr,
      sections,
      horoscope,
    });

  } catch (error) {
    console.error("Personal daily error:", error);
    return res.status(500).json({
      error: "Something went wrong fetching your personal reading. Please try again.",
    });
  }
}
