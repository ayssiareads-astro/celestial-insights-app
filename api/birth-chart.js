// api/birth-chart.js

const SIGN_MAP = {
  "Ari": "Aries", "Tau": "Taurus", "Gem": "Gemini", "Can": "Cancer",
  "Leo": "Leo", "Vir": "Virgo", "Lib": "Libra", "Sco": "Scorpio",
  "Sag": "Sagittarius", "Cap": "Capricorn", "Aqu": "Aquarius", "Pis": "Pisces",
  // Also handle full names just in case
  "Aries": "Aries", "Taurus": "Taurus", "Gemini": "Gemini", "Cancer": "Cancer",
  "Virgo": "Virgo", "Libra": "Libra", "Scorpio": "Scorpio",
  "Sagittarius": "Sagittarius", "Capricorn": "Capricorn", "Aquarius": "Aquarius", "Pisces": "Pisces",
};

const PLANET_MAP = {
  "Sun": "Sun", "Moon": "Moon", "Mercury": "Mercury", "Venus": "Venus",
  "Mars": "Mars", "Jupiter": "Jupiter", "Saturn": "Saturn",
  "Uranus": "Uranus", "Neptune": "Neptune", "Pluto": "Pluto",
  "Asc": "Rising", "Ascendant": "Rising", "Rising": "Rising",
  "Mc": "MC", "MC": "MC",
};

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
    console.error("Missing API key");
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
    console.log("API response:", JSON.stringify(data).slice(0, 800));

    const planets = {};

    // The API returns: { success: true, data: { positions: [...] } }
    const positions = data?.data?.positions || data?.positions || [];

    if (Array.isArray(positions)) {
      positions.forEach(p => {
        const planetName = PLANET_MAP[p.name] || p.name;
        const signFull = SIGN_MAP[p.sign] || p.sign;
        if (planetName && signFull) {
          planets[planetName] = signFull;
        }
      });
    }

    // Also check for ascendant/rising separately
    const ascendant = data?.data?.ascendant || data?.ascendant;
    if (ascendant?.sign) {
      planets["Rising"] = SIGN_MAP[ascendant.sign] || ascendant.sign;
    }

    // Check houses for ascendant
    const houses = data?.data?.houses || data?.houses;
    if (houses?.ascendant?.sign && !planets["Rising"]) {
      planets["Rising"] = SIGN_MAP[houses.ascendant.sign] || houses.ascendant.sign;
    }

    console.log("Planets extracted:", planets);

    return res.status(200).json({ name: name || "Your", city, planets });

  } catch (error) {
    console.error("Birth chart error:", error);
    return res.status(500).json({ error: "Something went wrong reading the stars. Please try again." });
  }
}
