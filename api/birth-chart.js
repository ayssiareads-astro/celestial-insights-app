// api/birth-chart.js

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

  // NOTE: env var is named Astrology_Api_Key in Vercel (mixed case)
  const apiKey = process.env.Astrology_Api_Key;

  if (!apiKey) {
    console.error("Missing API key — check Vercel environment variable name");
    return res.status(500).json({ error: "API configuration error." });
  }

  try {
    const response = await fetch("https://api.astrology-api.io/api/v3/data/positions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        subject: {
          birth_data: {
            day,
            month,
            year,
            hour,
            minute,
            second: 0,
            city: city.trim(),
            ...(country_code ? { country_code: country_code.toUpperCase() } : {}),
          },
          name: name || "Subject",
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Astrology API error:", response.status, errorData);
      return res.status(response.status).json({
        error: "Failed to generate birth chart. Please check your birth details and try again.",
      });
    }

    const data = await response.json();
    console.log("API response:", JSON.stringify(data).slice(0, 500));

    // Extract planet signs — handle both object and array formats
    const planets = {};

    if (data.planets && typeof data.planets === "object" && !Array.isArray(data.planets)) {
      for (const [planet, info] of Object.entries(data.planets)) {
        if (info?.sign) planets[capitalize(planet)] = capitalize(info.sign);
      }
    }

    if (Array.isArray(data.planets)) {
      data.planets.forEach(p => {
        if (p.name && p.sign) planets[capitalize(p.name)] = capitalize(p.sign);
      });
    }

    // Rising sign
    if (data.ascendant?.sign) planets["Rising"] = capitalize(data.ascendant.sign);
    else if (data.houses?.ascendant?.sign) planets["Rising"] = capitalize(data.houses.ascendant.sign);

    return res.status(200).json({ name: name || "Your", city, planets });

  } catch (error) {
    console.error("Birth chart error:", error);
    return res.status(500).json({ error: "Something went wrong reading the stars. Please try again." });
  }
}

function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
