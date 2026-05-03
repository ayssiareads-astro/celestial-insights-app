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

const HOUSE_ORDINALS = ["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th"];

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
    let chartPlanets = [];
    let houseCusps = [];
    let aspects = [];
    let report = null;

    if (paid) {
      console.log("Paid — fetching full natal chart...");

      const [natalData, reportData, enhancedData] = await Promise.all([
        safeFetch(
          "https://api.astrology-api.io/api/v3/charts/natal",
          { subject, options: { house_system: "W" } },
          "NatalChart"
        ),
        safeFetch(
          "https://api.astrology-api.io/api/v3/analysis/natal-report",
          { subject, tradition: "psychological", house_system: "W" },
          "NatalReport"
        ),
        safeFetch(
          "https://api.astrology-api.io/api/v3/data/aspects/enhanced",
          {
            subject,
            options: {
              house_system: "W",
              tradition: "classical",
              detail_level: "full",
              zodiac_type: "Tropic",
              active_points: ["Sun","Moon","Mercury","Venus","Mars",
                              "Jupiter","Saturn","Uranus","Neptune","Pluto"],
              precision: 3,
            },
          },
          "EnhancedAspects"
        ),
      ]);

      if (natalData) {
        const cd = natalData?.chart_data || natalData?.data || natalData;

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
              if (planetName !== "Rising" || !planets["Rising"]) {
                planets[planetName] = signFull;
              }
              if (p.name === "Ascendant") {
                planets["Rising"] = signFull;
              }
            }
          });
        }

        const rawHouses = cd?.house_cusps || [];
        if (Array.isArray(rawHouses)) {
          houseCusps = rawHouses.map(h => ({
            house: h.house,
            sign: SIGN_MAP[h.sign] || h.sign,
            degree: h.degree ? parseFloat(h.degree).toFixed(1) : null,
            name: HOUSE_NAMES[h.house] || `House ${h.house}`,
          }));
        }

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

        if (enhancedData) {
          const rawEnhanced = enhancedData?.aspects || enhancedData?.data?.aspects || [];
          const enhancedMap = {};
          rawEnhanced.forEach(a => {
            const p1 = PLANET_MAP[a.point1] || a.point1;
            const p2 = PLANET_MAP[a.point2] || a.point2;
            const type = (a.aspect_type || a.aspect || "").toLowerCase();
            if (!p1 || !p2 || !type) return;
            const key = [p1, p2].sort().join("|") + "|" + type;
            enhancedMap[key] = {
              strength:  a.strength       ?? null,
              applying:  a.applying       ?? null,
              reception: a.reception_data ?? null,
            };
          });
          aspects = aspects.map(a => {
            const key = [a.planet1, a.planet2].sort().join("|") + "|" + a.type.toLowerCase();
            return { ...a, ...(enhancedMap[key] || {}) };
          });
          console.log("Aspects after enhanced merge:", aspects.length);
        }
      }

      // ── Parse natal report ──────────────────────────────────
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
          const clean = interps.filter(
            s => s.title && s.text && typeof s.text === "string" && s.text.length > 20
          );

          // Debug: log all titles so we can see exactly what the API returns
          console.log("INTERP TITLES:", clean.map(s => s.title).join(" | "));

          const KNOWN_PLANETS = new Set([
            "Sun","Moon","Mercury","Venus","Mars",
            "Jupiter","Saturn","Uranus","Neptune","Pluto","Chiron",
            "Ascendant","Rising"
          ]);

          const signSections  = {};  // keyed by planet name e.g. "Sun"
          const houseSections = {};  // keyed by planet name e.g. "Sun"
          const otherSections = [];  // aspects and everything else

          clean.forEach(s => {
            const t = s.title || "";

            // ── Planet in house: "Sun in House_10" ──────────────
            const houseMatch = t.match(/^(\w+)\s+in\s+House[\s_](\d+)$/i);
            if (houseMatch) {
              const planet = PLANET_MAP[houseMatch[1]] || houseMatch[1];
              houseSections[planet] = { houseNum: houseMatch[2], text: s.text };
              return;
            }

            // ── Planet in sign: "Sun in Tau" or "Sun in Taurus" ─
            // Must start with a known planet and have exactly "in <word>" with no underscore
            const signMatch = t.match(/^([A-Za-z]+)\s+in\s+([A-Za-z]+)$/i);
            if (signMatch) {
              const planet = PLANET_MAP[signMatch[1]] || signMatch[1];
              if (KNOWN_PLANETS.has(planet) || KNOWN_PLANETS.has(signMatch[1])) {
                signSections[planet] = { sign: signMatch[2], text: s.text };
                return;
              }
            }

            // ── Everything else: aspects like "Sun_trine_Jupiter" ─
            otherSections.push(s);
          });

          console.log("Sign sections:", Object.keys(signSections).join(", "));
          console.log("House sections:", Object.keys(houseSections).join(", "));
          console.log("Other sections:", otherSections.length);

          // Merge sign + house into one combined card per planet
          const PLANET_ORDER = [
            "Sun","Moon","Mercury","Venus","Mars",
            "Jupiter","Saturn","Uranus","Neptune","Pluto","Chiron"
          ];

          const mergedPlanets = PLANET_ORDER
            .filter(p => signSections[p] || houseSections[p])
            .map(p => {
              const signData  = signSections[p]  || {};
              const houseData = houseSections[p] || {};

              const correctHouse = chartPlanets.find(cp => cp.name === p)?.house;
const houseLabel = correctHouse
  ? `${HOUSE_ORDINALS[parseInt(correctHouse) - 1]} House`
  : houseData.houseNum
    ? `${HOUSE_ORDINALS[parseInt(houseData.houseNum) - 1]} House`
    : null;

              const signName = SIGN_MAP[signData.sign] || signData.sign || "";

              // Title: "Sun in Taurus · 5th House"
              // We use a special separator "|||" so App.jsx can split if needed,
              // but it displays fine as-is too
              const title = houseLabel
                ? `${p} in ${signName} · ${houseLabel}`
                : `${p} in ${signName}`;

              // Two paragraphs: sign first, then house
              const text = [signData.text, houseData.text]
                .filter(Boolean)
                .join("\n\n");

              return { title, text };
            });

          console.log("Merged planet cards:", mergedPlanets.map(p => p.title).join(" | "));

          // Clean up aspect titles: "Sun_trine_Jupiter" → "Sun trine Jupiter"
          const cleanedOther = otherSections.map(s => ({
            ...s,
            title: s.title.replace(/_/g, " "),
          }));

          report = [...mergedPlanets, ...cleanedOther];

          // ── Extract house-sign interpretations for the House System cards ──
          // The API returns sections like "Ascendant in Leo", "Moon in House 3" etc.
          // We want "Sign in House N" readings — map house number → interpretation text
          const houseSignReadings = {};

          // Method 1: from houseCusps + signSections
          // Each house has a sign — look for that sign's planet interpretation
          // e.g. House 1 = Leo → look for "Ascendant in Leo" or "Leo in House 1"
          houseCusps.forEach(h => {
            const houseNum = h.house;
            const sign = h.sign;

            // Look in otherSections for anything mentioning this sign + house
            const match = clean.find(s => {
              const t = (s.title || "").toLowerCase();
              return t.includes(sign.toLowerCase()) &&
                (t.includes(`house ${houseNum}`) || t.includes(`house_${houseNum}`));
            });
            if (match) {
              houseSignReadings[houseNum] = match.text;
              return;
            }

            // Also check ascending/MC sections for house 1 and 10
            if (houseNum === 1) {
              const ascMatch = clean.find(s => {
                const t = (s.title || "").toLowerCase();
                return (t.includes("ascendant") || t.includes("rising")) &&
                  t.includes(sign.toLowerCase());
              });
              if (ascMatch) houseSignReadings[1] = ascMatch.text;
            }
            if (houseNum === 10) {
              const mcMatch = clean.find(s => {
                const t = (s.title || "").toLowerCase();
                return (t.includes("medium") || t.includes("coeli") || t.includes("midheaven")) &&
                  t.includes(sign.toLowerCase());
              });
              if (mcMatch) houseSignReadings[10] = mcMatch.text;
            }
          });

          console.log("House sign readings:", Object.keys(houseSignReadings).join(", "));
        }
      }
    }

    return res.status(200).json({
      name: name || "Your",
      city,
      planets,
      chartPlanets,
      houseCusps,
      aspects,
      report,
      houseSignReadings,
      chartSvg: null,
    });

  } catch (error) {
    console.error("Birth chart error:", error);
    return res.status(500).json({
      error: "Something went wrong reading the stars. Please try again.",
    });
  }
}
