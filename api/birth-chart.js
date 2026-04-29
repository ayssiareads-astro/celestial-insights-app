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
  "Medium_Coeli": "Midheaven", "Midheaven": "Midheaven",
  "Chiron": "Chiron",
};

const HOUSE_NAMES = {
  1: "1st House — Self & Identity",
  2: "2nd House — Possessions & Values",
  3: "3rd House — Communication & Mind",
  4: "4th House — Home & Roots",
  5: "5th House — Creativity & Joy",
  6: "6th House — Health & Service",
  7: "7th House — Partnerships",
  8: "8th House — Transformation",
  9: "9th House — Philosophy & Travel",
  10: "10th House — Career & Legacy",
  11: "11th House — Community & Ideals",
  12: "12th House — Spirituality & Endings",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, date, time, city, country_code, paid } = req.body;

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

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
  };

  const subject = {
    birth_data: {
      day, month, year, hour, minute, second: 0,
      city: city.trim(),
      ...(country_code ? { country_code: country_code.toUpperCase() } : {}),
    },
    name: name || "Subject",
  };

  const safeFetch = async (url, body, label) => {
    try {
      const r = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });
      if (!r.ok) { console.warn(`${label} failed:`, r.status); return null; }
      const json = await r.json();
      console.log(`${label} OK:`, JSON.stringify(json).slice(0, 300));
      return json;
    } catch (err) {
      console.warn(`${label} threw:`, err.message);
      return null;
    }
  };

  try {
    // ── FREE: Basic positions for Big Three ───────────────────
    const posData = await safeFetch(
      "https://api.astrology-api.io/api/v3/data/positions",
      { subject },
      "Positions"
    );

    const planets = {};
    const positions = posData?.data?.positions || posData?.positions || [];
    if (Array.isArray(positions)) {
      positions.forEach(p => {
        const planetName = PLANET_MAP[p.name] || p.name;
        const signFull = SIGN_MAP[p.sign] || p.sign;
        if (planetName && signFull) planets[planetName] = signFull;
      });
    }

    // Rising from house cusps (free tier)
    const housesData = await safeFetch(
      "https://api.astrology-api.io/api/v3/data/house-cusps",
      { subject },
      "Houses"
    );

    if (housesData) {
      const d = housesData?.data || housesData;
      if (d?.ascendant?.sign) {
        planets["Rising"] = SIGN_MAP[d.ascendant.sign] || d.ascendant.sign;
      } else if (Array.isArray(d?.cusps) && d.cusps[0]?.sign) {
        planets["Rising"] = SIGN_MAP[d.cusps[0].sign] || d.cusps[0].sign;
      } else if (Array.isArray(d?.positions)) {
        const asc = d.positions.find(p => p.name === "Asc" || p.name === "Ascendant");
        if (asc?.sign) planets["Rising"] = SIGN_MAP[asc.sign] || asc.sign;
      }
    }

    console.log("Free planets:", planets);

    // ── PAID: Full chart via charts/natal ─────────────────────
    let chartPlanets = []; // array of { name, sign, house, degree, retrograde }
    let houseCusps = [];   // array of { house, sign, degree }
    let aspects = [];      // array of { planet1, planet2, type, orb }
    let report = null;

    if (paid) {
      console.log("Paid — fetching full natal chart...");

      const [natalData, reportData] = await Promise.all([
        safeFetch(
          "https://api.astrology-api.io/api/v3/charts/natal",
          {
            subject,
            options: { house_system: "W" }, // W = Whole Sign
          },
          "NatalChart"
        ),
        safeFetch(
          "https://api.astrology-api.io/api/v3/analysis/natal-report",
          { subject, tradition: "psychological" },
          "NatalReport"
        ),
      ]);

      if (natalData) {
        const cd = natalData?.chart_data || natalData?.data || natalData;

        // Parse planetary positions with house numbers
        const rawPositions = cd?.planetary_positions || [];
        if (Array.isArray(rawPositions)) {
          rawPositions.forEach(p => {
            const planetName = PLANET_MAP[p.name] || p.name;
            const signFull = SIGN_MAP[p.sign] || p.sign;
            if (planetName && signFull && planetName !== "Midheaven") {
              chartPlanets.push({
                name: planetName,
                sign: signFull,
                house: p.house || null,
                degree: p.degree ? parseFloat(p.degree).toFixed(1) : null,
                retrograde: p.is_retrograde || false,
              });
              // Also update the simple planets map with correct sign
              if (planetName !== "Rising" || !planets["Rising"]) {
                planets[planetName] = signFull;
              }
              // Grab Rising from Ascendant entry
              if (p.name === "Ascendant") {
                planets["Rising"] = signFull;
              }
            }
          });
        }

        // Parse house cusps
        const rawHouses = cd?.house_cusps || [];
        if (Array.isArray(rawHouses)) {
          houseCusps = rawHouses.map(h => ({
            house: h.house,
            sign: SIGN_MAP[h.sign] || h.sign,
            degree: h.degree ? parseFloat(h.degree).toFixed(1) : null,
            name: HOUSE_NAMES[h.house] || `House ${h.house}`,
          }));
        }

        // Parse aspects
        const rawAspects = cd?.aspects || [];
        if (Array.isArray(rawAspects)) {
          rawAspects.forEach(a => {
            const p1 = PLANET_MAP[a.point1] || a.point1;
            const p2 = PLANET_MAP[a.point2] || a.point2;
            const type = a.aspect_type || a.aspect || "";
            const orb = a.orb != null ? parseFloat(a.orb).toFixed(1) : null;
            if (p1 && p2 && type) {
              aspects.push({ planet1: p1, planet2: p2, type, orb });
            }
          });
        }

        console.log("Chart planets:", chartPlanets.length);
        console.log("House cusps:", houseCusps.length);
        console.log("Aspects:", aspects.length);
      }

      // Parse natal report
      if (reportData) {
        const d = reportData?.data || reportData;
        const interps = d?.interpretations || d?.report || d?.sections || null;

        // Correct Rising from report
        if (Array.isArray(interps)) {
          const ascSection = interps.find(s =>
            s.title && s.title.toLowerCase().startsWith("ascendant") &&
            !s.title.toLowerCase().includes("house")
          );
          if (ascSection?.title) {
            const match = ascSection.title.match(/\bin\s+([A-Za-z]+)/i);
            if (match) {
              const reportSign = SIGN_MAP[match[1]] || (match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase());
              if (reportSign && reportSign !== planets["Rising"]) {
                console.log(`Correcting Rising to ${reportSign}`);
                planets["Rising"] = reportSign;
              }
            }
          }
        }

        if (Array.isArray(interps) && interps.length > 0) {
          report = interps
            .filter(s => s.title && s.text && typeof s.text === "string" && s.text.length > 20)
            .map(s => ({ title: s.title, text: s.text }));
        }
      }
    }

    return res.status(200).json({
      name: name || "Your",
      city,
      planets,        // simple sign map for Big Three display
      chartPlanets,   // full planet data with house numbers (paid only)
      houseCusps,     // house system (paid only)
      aspects,        // aspects (paid only)
      report,         // written report (paid only)
      chartSvg: null,
    });

  } catch (error) {
    console.error("Birth chart error:", error);
    return res.status(500).json({
      error: "Something went wrong reading the stars. Please try again.",
    });
  }
}
