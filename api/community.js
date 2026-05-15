// api/community.js

export const config = {
  api: { bodyParser: { sizeLimit: "1mb" } },
};

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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  // GIF search
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

  // GET comments
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

  // DELETE comment
  if (req.method === "DELETE") {
    const { prompt, id } = req.body || {};
    if (!prompt || !id) return res.status(400).json({ error: "prompt and id required" });
    try {
      const key = `aww_community_${prompt}`;
      const existing = await kvGet(key) || [];
      const updated = existing
        .filter(c => c.id !== id)
        .map(c => ({ ...c, replies: (c.replies || []).filter(r => r.id !== id) }));
      await kvSet(key, updated);
      return res.status(200).json({ ok: true });
    } catch(e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // POST — like or new comment
  if (req.method === "POST") {
    let body = req.body || {};
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch(e) { body = {}; }
    }

    // Like action
    if (body.action === "like") {
      const { prompt, id } = body;
      if (!prompt || !id) return res.status(400).json({ error: "prompt and id required" });
      try {
        const key = `aww_community_${prompt}`;
        const existing = await kvGet(key) || [];
        const updated = existing.map(c => {
          if (c.id === id) return { ...c, likes: (c.likes || 0) + 1 };
          return {
            ...c,
            replies: (c.replies || []).map(r =>
              r.id === id ? { ...r, likes: (r.likes || 0) + 1 } : r
            ),
          };
        });
        await kvSet(key, updated);
        return res.status(200).json({ ok: true });
      } catch(e) {
        return res.status(500).json({ error: e.message });
      }
    }

    // New comment
    const { prompt, nickname, sign, text, gif, parentId } = body;
    if (!prompt) return res.status(400).json({ error: "missing: prompt" });
    if (!nickname) return res.status(400).json({ error: "missing: nickname" });
    if (!sign) return res.status(400).json({ error: "missing: sign" });
    if (!text && !gif) return res.status(400).json({ error: "missing: text or gif" });
    if (nickname.length > 30) return res.status(400).json({ error: "nickname too long" });
    if (text && text.length > 280) return res.status(400).json({ error: "text too long" });

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
        likes: 0,
        parentId: parentId || null,
      };
      let updated;
      if (parentId) {
        updated = existing.map(c =>
          c.id === parentId ? { ...c, replies: [comment, ...(c.replies || [])] } : c
        );
      } else {
        updated = [comment, ...existing].slice(0, 200);
      }
      await kvSet(key, updated);
      return res.status(200).json({ ok: true, comment });
    } catch(e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
