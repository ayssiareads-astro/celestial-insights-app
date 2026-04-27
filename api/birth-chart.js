// api/birth-chart.js
// Add this file to your api/ folder alongside check-subscription.js and webhook.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, date, time, city, country_code } = req.body;

  if (!date || !time || !city) {
    return res.status(400).json({ error: "date, time, and city are required" });
  }

  // Parse "YYYY-MM-DD" → day, month, year
  const [year, month, day] = date.split("-").map(Number);

  // Parse "HH:MM" → hour, minute
  const [hour, minute] = time.split(":").map(Number);

  if (!year || !month || !day || isNaN(hour) || isNaN(minute)) {
    return res.status(400).json({ error: "Invalid date or time format" });
  }

  try {
    const response = await fetch("https://astrology-api.io/api/v3/analysis/natal-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.ASTROLOGY_API_KEY}`,
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
        tradition: "psychological",
        include_aspect_patterns: false,
        include_sabian_symbols: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Astrology API error:", errorData);
      return res.status(response.status).json({
        error: "Failed to generate birth chart. Please check your birth details and try again.",
      });
    }

    const data = await response.json();

    const planets = {};
    if (data.planets) {
      for (const [planet, info] of Object.entries(data.planets)) {
        if (info?.sign) planets[capitalize(planet)] = capitalize(info.sign);
      }
    }
    if (data.ascendant?.sign) planets["Rising"] = capitalize(data.ascendant.sign);

    const interpretations = {};
    if (data.interpretations) {
      for (const [key, text] of Object.entries(data.interpretations)) {
        interpretations[key] = text;
      }
    }

    return res.status(200).json({ name: name || "Your", city, planets, interpretations });

  } catch (error) {
    console.error("Birth chart error:", error);
    return res.status(500).json({ error: "Something went wrong reading the stars. Please try again." });
  }
}

function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
