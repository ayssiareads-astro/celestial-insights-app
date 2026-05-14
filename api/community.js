// api/community.js — GET comments, POST comment, GET GIFs via Giphy

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;
const GIPHY_KEY = process.env.GIPHY_API_KEY;

async function kvGet(key) {
  const res = await fetch(`${KV_URL}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${KV_TOKEN}` },
  });
  const data = await res.json();
  return data.result ? JSON.parse(data.result) : null;
}

async function kvSet(key, value) {
  await fetch(`${KV_URL}/set/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${KV_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(value),
  });
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  // ── GIF search ───────────────────────────────────────────────
  if (req.method === "GET" && req.query.action === "gifs") {
    const q = req.query.q || "astrology";
    try {
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(q)}&limit=16&rating=pg-13`;
      const r = await fetch(url);
      const d = await r.json();
      const gifs = (d.data || []).map(g => ({
        id: g.id,
        url: g.images.downsized_medium?.url || g.images.fixed_height?.url,
        preview: g.images.fixed_height_small?.url || g.images.fixed_height?.url,
      }));
      return res.status(200).json({ gifs });
    } catch(e) {
      return res.status(500).json({ gifs: [], error: e.message });
    }
  }

  // ── GET comments for a prompt ────────────────────────────────
  if (req.method === "GET" && req.query.action === "get") {
    const prompt = req.query.prompt;
    if (!prompt) return res.status(400).json({ error: "prompt required" });
    try {
      const comments = await kvGet(`aww_community_${prompt}`) || [];
      return res.status(200).json({ comments });
    } catch(e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // ── POST new comment ─────────────────────────────────────────
  if (req.method === "POST") {
    const { prompt, nickname, sign, text, gif } = req.body || {};
    if (!prompt || !nickname || !sign) return res.status(400).json({ error: "prompt, nickname and sign required" });
    if (!text && !gif) return res.status(400).json({ error: "message or gif required" });
    if (nickname.length > 30 || (text && text.length > 280)) return res.status(400).json({ error: "Content too long" });
    try {
      const key = `aww_community_${prompt}`;
      const existing = await kvGet(key) || [];
      const comment = {
        id: Date.now().toString(),
        nickname: nickname.trim().slice(0, 30),
        sign,
        text: (text || "").trim().slice(0, 280),
        gif: gif || null,
        ts: Date.now(),
      };
      const updated = [comment, ...existing].slice(0, 200);
      await kvSet(key, updated);
      return res.status(200).json({ ok: true, comment });
    } catch(e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
