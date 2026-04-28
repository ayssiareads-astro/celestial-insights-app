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
  "sun": "Sun", "moon": "Moon", "mercury": "Mercury", "venus": "Venus",
  "mars": "Mars", "jupiter": "Jupiter", "saturn": "Saturn",
  "uranus": "Uranus", "neptune": "Neptune", "pluto": "Pluto",
  "Asc": "Rising", "Ascendant": "Rising", "Rising": "Rising",
  "asc": "Rising", "ascendant": "Rising",
  "Chiron": "Chiron", "chiron": "Chiron",
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
    house_system: "whole_sign",
  };

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
  };

  // ── Helper: safe fetch that never throws ──────────────────────
  const safeFetch = async (url, body, label) => {
    try {
      const r = await fetch(url, { method: "POST", headers, body: JSON.stringify(body) });
      if (!r.ok) {
        console.warn(`${label} failed:`, r.status);
        return null;
      }
      const json = await r.json();
      console.log(`${label} OK:`, JSON.stringify(json).slice(0, 300));
      return json;
    } catch (err) {
      console.warn(`${label} threw:`, err.message);
      return null;
    }
  };

  try {
    // ── Step 1: Positions (required) + global positions (optional, for outer planets) ─
    const [positionsRes, globalRes] = await Promise.allSettled([
      fetch("https://api.astrology-api.io/api/v3/data/positions", {
        method: "POST", headers, body: JSON.stringify({ subject }),
      }),
      fetch("https://api.astrology-api.io/api/v3/data/global-positions", {
        method: "POST", headers, body: JSON.stringify({ subject }),
      }),
    ]);

    // positions is required
    if (positionsRes.status === "rejected" || !positionsRes.value?.ok) {
      const err = positionsRes.value ? await positionsRes.value.json().catch(() => ({})) : {};
      console.error("Positions failed:", err);
      return res.status(500).json({
        error: "Failed to generate birth chart. Please check your birth details and try again.",
      });
    }

    const posData = await positionsRes.value.json();
    const planets = {};
    const positions = posData?.data?.positions || posData?.positions || [];

    console.log("Raw positions:", JSON.stringify(positions.map(p => ({ name: p.name, sign: p.sign }))));

    if (Array.isArray(positions)) {
      positions.forEach(p => {
        const planetName = PLANET_MAP[p.name] || PLANET_MAP[p.name?.toLowerCase()] || p.name;
        const signFull = SIGN_MAP[p.sign] || SIGN_MAP[p.sign?.toLowerCase()] || p.sign;
        if (planetName && signFull) {
          planets[planetName] = signFull;
        }
      });
    }

    // Outer planets from global-positions (non-fatal if it fails)
    try {
      if (globalRes.status === "fulfilled" && globalRes.value?.ok) {
        const globalData = await globalRes.value.json();
        const globalPositions = globalData?.data?.positions || globalData?.positions || [];
        console.log("Global positions:", JSON.stringify(globalPositions.map(p => ({ name: p.name, sign: p.sign }))));
        if (Array.isArray(globalPositions)) {
          globalPositions.forEach(p => {
            const planetName = PLANET_MAP[p.name] || PLANET_MAP[p.name?.toLowerCase()] || p.name;
            const signFull = SIGN_MAP[p.sign] || SIGN_MAP[p.sign?.toLowerCase()] || p.sign;
            if (planetName && signFull && !planets[planetName]) {
              planets[planetName] = signFull;
            }
          });
        }
      }
    } catch (globalErr) {
      console.warn("Global positions failed silently:", globalErr.message);
    }

    // ── Step 2: Rising sign — try positions array first (most reliable) ──
    // The positions endpoint sometimes includes Asc directly
    const ascFromPositions = positions.find(p =>
      p.name === "Asc" || p.name === "Ascendant" || p.name === "Rising"
    );
    if (ascFromPositions?.sign) {
      planets["Rising"] = SIGN_MAP[ascFromPositions.sign] || ascFromPositions.sign;
      console.log("Rising from positions array:", planets["Rising"]);
    }

    // ── Step 3: House cusps fallback for Rising ───────────────
    if (!planets["Rising"]) {
      const housesData = await safeFetch(
        "https://api.astrology-api.io/api/v3/data/house-cusps",
        { subject, house_system: "whole_sign" },
        "Houses"
      );
      if (housesData) {
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
        console.log("Rising from house-cusps:", planets["Rising"]);
      }
    }

    console.log("Final planets:", planets);

    // ── Paid-tier data only ───────────────────────────────────
    let aspects = [];
    let report = null;
    let chartSvg = null;

    if (paid) {
      const [aspectsData, reportData] = await Promise.all([
        safeFetch("https://api.astrology-api.io/api/v3/data/aspects", { subject }, "Aspects"),
        safeFetch("https://api.astrology-api.io/api/v3/analysis/natal-report", { subject, tradition: "psychological" }, "NatalReport"),
      ]);

      // Parse aspects
      const rawAspects = aspectsData?.data?.aspects || aspectsData?.aspects || [];
      console.log("Raw aspects sample:", JSON.stringify(rawAspects).slice(0, 400));
      if (Array.isArray(rawAspects)) {
        rawAspects.forEach(a => {
          const p1 = PLANET_MAP[a.planet1] || PLANET_MAP[a.planet1?.toLowerCase()] || a.planet1;
          const p2 = PLANET_MAP[a.planet2] || PLANET_MAP[a.planet2?.toLowerCase()] || a.planet2;
          const type = a.aspect || a.type || a.name || "";
          const orb = a.orb != null ? parseFloat(a.orb).toFixed(1) : null;
          if (p1 && p2 && type) aspects.push({ planet1: p1, planet2: p2, type, orb });
        });
      }

      // Parse natal report
      if (reportData) {
        const d = reportData?.data || reportData;
        const interps = d?.interpretations || d?.report || d?.sections || d?.data || null;

        // Correct Rising from report if available
        if (Array.isArray(interps)) {
          const ascSection = interps.find(s =>
            s.title && s.title.toLowerCase().startsWith("ascendant") && !s.title.toLowerCase().includes("house")
          );
          if (ascSection?.title) {
            const match = ascSection.title.match(/\bin\s+([A-Za-z]+)/i);
            if (match) {
              const reportSign = SIGN_MAP[match[1]] || (match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase());
              if (reportSign && reportSign !== planets["Rising"]) {
                console.log(`Correcting Rising from ${planets["Rising"]} to ${reportSign}`);
                planets["Rising"] = reportSign;
              }
            }
          }
        }

        if (Array.isArray(interps) && interps.length > 0) {
          report = interps.filter(s => s.title && s.text && typeof s.text === "string" && s.text.length > 20)
            .map(s => ({ title: s.title, text: s.text }));
        } else if (typeof d === "string") {
          report = d;
        }
      }

      console.log("Aspects count:", aspects.length);
      console.log("Report sections:", Array.isArray(report) ? report.length : (report ? "string" : "none"));
    }

    return res.status(200).json({
      name: name || "Your",
      city,
      planets,
      aspects,
      report,
      chartSvg,
    });

  } catch (error) {
    console.error("Birth chart error:", error);
    return res.status(500).json({
      error: "Something went wrong reading the stars. Please try again.",
    });
  }
}
