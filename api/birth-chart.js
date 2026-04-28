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
    // ── Step 1: Planetary positions (required) ────────────────
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
    const planets = {};
    const positions = posData?.data?.positions || posData?.positions || [];

    if (Array.isArray(positions)) {
      positions.forEach(p => {
        const planetName = PLANET_MAP[p.name] || p.name;
        const signFull = SIGN_MAP[p.sign] || p.sign;
        if (planetName && signFull) planets[planetName] = signFull;
      });
    }

    // ── Step 2: Rising sign from house cusps (optional) ───────
    const housesData = await safeFetch(
      "https://api.astrology-api.io/api/v3/data/house-cusps",
      { subject },
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
    }

    // ── Steps 3–5: Paid-tier data (run in parallel) ───────────
    const [aspectsData, reportData, chartData] = await Promise.all([

      // Aspects
      safeFetch(
        "https://api.astrology-api.io/api/v3/data/aspects",
        { subject },
        "Aspects"
      ),

      // Natal report (written interpretations)
      safeFetch(
        "https://api.astrology-api.io/api/v3/analysis/natal-report",
        { subject },
        "NatalReport"
      ),

      // SVG chart render
      safeFetch(
        "https://api.astrology-api.io/api/v3/render/natal",
        {
          subject,
          options: { format: "svg", width: 600 },
        },
        "ChartRender"
      ),
    ]);

    // ── Parse aspects ─────────────────────────────────────────
    const aspects = [];
    const rawAspects =
      aspectsData?.data?.aspects ||
      aspectsData?.aspects ||
      [];

    if (Array.isArray(rawAspects)) {
      rawAspects.forEach(a => {
        const p1 = PLANET_MAP[a.planet1] || a.planet1;
        const p2 = PLANET_MAP[a.planet2] || a.planet2;
        const type = a.aspect || a.type || a.name || "";
        const orb = a.orb != null ? parseFloat(a.orb).toFixed(1) : null;
        if (p1 && p2 && type) {
          aspects.push({ planet1: p1, planet2: p2, type, orb });
        }
      });
    }

    // ── Parse natal report ────────────────────────────────────
    // The API returns { data: { subject: {...}, interpretations: [...] } }
    // where interpretations is an array of { title, text, components, astrological_data }
    let report = null;
    if (reportData) {
      const d = reportData?.data || reportData;

      // Primary format: array of {title, text} interpretation objects
      const interps =
        d?.interpretations ||
        d?.report ||
        d?.sections ||
        d?.data ||
        null;

      if (Array.isArray(interps) && interps.length > 0) {
        // Filter to only entries that have both a title and meaningful text,
        // and exclude entries whose title looks like raw JSON or metadata
        report = interps
          .filter(s => s.title && s.text && typeof s.text === "string" && s.text.length > 20)
          .map(s => ({ title: s.title, text: s.text }));
      } else if (typeof d === "string") {
        report = d;
      } else if (typeof d?.content === "string") {
        report = d.content;
      } else {
        // Log full shape so we can adjust next time
        console.warn("Unrecognised report shape:", JSON.stringify(d).slice(0, 500));
        report = null;
      }
    }

    // ── Parse SVG chart ───────────────────────────────────────
    let chartSvg = null;
    if (chartData) {
      const d = chartData?.data || chartData;
      if (typeof d === "string" && d.trim().startsWith("<svg")) {
        chartSvg = d;
      } else if (typeof d?.svg === "string") {
        chartSvg = d.svg;
      } else if (typeof d?.chart === "string") {
        chartSvg = d.chart;
      } else if (typeof d?.content === "string" && d.content.trim().startsWith("<svg")) {
        chartSvg = d.content;
      }
    }

    console.log("Final planets:", planets);
    console.log("Aspects count:", aspects.length);
    console.log("Report length:", report?.length || 0);
    console.log("Chart SVG:", chartSvg ? "received" : "none");

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
