// api/birth-chart.js

const SIGN_MAP = {
  "Ari": "Aries", "Tau": "Taurus", "Gem": "Gemini", "Can": "Cancer",
  "Leo": "Leo", "Vir": "Virgo", "Lib": "Libra", "Sco": "Scorpio",
  "Sag": "Sagittarius", "Cap": "Capricorn", "Aqu": "Aquarius", "Pis": "Pisces",
  "Aries": "Aries", "Taurus": "Taurus", "Gemini": "Gemini", "Cancer": "Cancer",
  "Virgo": "Virgo", "Libra": "Libra", "Scorpio": "Scorpio",
  "Sagittarius": "Sagittarius", "Capricorn": "Capricorn", "Aquarius": "Aquarius", "Pisces": "Pisces",
};

const PLANET_MAP = {
  "Sun": "Sun", "Moon": "Moon", "Mercury": "Mercury", "Venus": "Venus",
  "Mars": "Mars", "Jupiter": "Jupiter", "Saturn": "Saturn",
  "Uranus": "Uranus", "Neptune": "Neptune", "Pluto": "Pluto",
  "Asc": "Rising", "Ascendant": "Rising", "Rising": "Rising",
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

  const subject = {
    birth_data: {
      day, month, year, hour, minute, second: 0,
      city: city.trim(),
      ...(country_code ? { country_code: country_code.toUpperCase() } : {}),
    },
    name: name || "Subject",
  };

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
  };

  try {
    // ── Step 1: Get planetary positions (required) ─────────────
    const positionsRes = await fetch("https://api.astrology-api.io/api/v3/data/positions", {
      method: "POST",
      headers,
      body: JSON.stringify({ subject }),
    });

    if (!positionsRes.ok) {
      const err = await positionsRes.json().catch(() => ({}));
      console.error("Positions failed:", positionsRes.status, err);
      return res.status(positionsRes.status).json({
        error: "Failed to generate birth chart. Please check your birth details and try again.",
      });
    }

    const posData = await positionsRes.json();
    console.log("Positions OK:", JSON.stringify(posData).slice(0, 500));

    const planets = {};
    const positions = posData?.data?.positions || posData?.positions || [];

    if (Array.isArray(positions)) {
      positions.forEach(p => {
        const planetName = PLANET_MAP[p.name] || p.name;
        const signFull = SIGN_MAP[p.sign] || p.sign;
        if (planetName && signFull) planets[planetName] = signFull;
      });
    }

    // ── Step 2: Get Rising sign from house cusps (optional) ────
    try {
      const housesRes = await fetch("https://api.astrology-api.io/api/v3/data/house-cusps", {
        method: "POST",
        headers,
        body: JSON.stringify({ subject }),
      });

      if (housesRes.ok) {
        const housesData = await housesRes.json();
        console.log("Houses OK:", JSON.stringify(housesData).slice(0, 500));
        const d = housesData?.data || housesData;

        if (d?.ascendant?.sign) {
          planets["Rising"] = SIGN_MAP[d.ascendant.sign] || d.ascendant.sign;
        } else if (Array.isArray(d?.houses)) {
          const h1 = d.houses.find(h => h.house === 1 || h.number === 1 || h.name === "I");
          if (h1?.sign) planets["Rising"] = SIGN_MAP[h1.sign] || h1.sign;
        } else if (Array.isArray(d?.cusps) && d.cusps[0]?.sign) {
          planets["Rising"] = SIGN_MAP[d.cusps[0].sign] || d.cusps[0].sign;
        } else if (Array.isArray(d?.positions)) {
          const asc = d.positions.find(p => p.name === "Asc" || p.name === "Ascendant");
          if (asc?.sign) planets["Rising"] = SIGN_MAP[asc.sign] || asc.sign;
        }
      } else {
        console.warn("Houses call failed:", housesRes.status, "— continuing without Rising");
      }
    } catch (housesErr) {
      console.warn("Houses call threw error:", housesErr.message, "— continuing without Rising");
    }

    console.log("Final planets:", planets);
    return res.status(200).json({ name: name || "Your", city, planets });

  } catch (error) {
    console.error("Birth chart error:", error);
    return res.status(500).json({ error: "Something went wrong reading the stars. Please try again." });
  }
}
