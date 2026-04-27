// api/birth-chart.js
// Place this in your api/ folder alongside check-subscription.js and webhook.js

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
    const response = await fetch("https://astrology-api.io/api/v3/charts/natal", {
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

    // Extract planet signs from the response
    const planets = {};

    // The natal chart endpoint returns planets array
    if (data.planets) {
      for (const [planet, info] of Object.entries(data.planets)) {
        if (info?.sign) {
          planets[capitalize(planet)] = capitalize(info.sign);
        }
      }
    }

    // Also check for array format
    if (Array.isArray(data.planets)) {
      data.planets.forEach(p => {
        if (p.name && p.sign) {
          planets[capitalize(p.name)] = capitalize(p.sign);
        }
      });
    }

    // Rising sign from ascendant
    if (data.ascendant?.sign) {
      planets["Rising"] = capitalize(data.ascendant.sign);
    } else if (data.houses?.ascendant?.sign) {
      planets["Rising"] = capitalize(data.houses.ascendant.sign);
    }

    // Log what we got for debugging
    console.log("API response keys:", Object.keys(data));
    console.log("Planets extracted:", planets);

    return res.status(200).json({
      name: name || "Your",
      city,
      planets,
    });

  } catch (error) {
    console.error("Birth chart error:", error);
    return res.status(500).json({
      error: "Something went wrong reading the stars. Please try again.",
    });
  }
}

function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
