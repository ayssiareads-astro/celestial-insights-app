import { kv } from "@vercel/kv";

const PROMPTS = [
  "I knew I was woke when...",
  "Leos be like...",
  "As a [sign], my biggest pet peeve is...",
  "Who's most likely to start random beef?",
  "Tell us your most unhinged astrology opinion",
  "Which sign are you and what's your toxic trait?",
];

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  // GET /api/community?prompt=0  → returns posts for that prompt index
  if (req.method === "GET") {
    const { prompt } = req.query;
    const idx = parseInt(prompt ?? "0", 10);
    if (isNaN(idx) || idx < 0 || idx >= PROMPTS.length) {
      return res.status(400).json({ error: "Invalid prompt index" });
    }
    try {
      // Posts stored as a list, newest first
      const posts = (await kv.lrange(`community:prompt:${idx}`, 0, 49)) || [];
      return res.status(200).json({ prompts: PROMPTS, posts, promptIndex: idx });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch posts" });
    }
  }

  // POST /api/community  → { promptIndex, nickname, sign, response, gifUrl? }
  if (req.method === "POST") {
    const { promptIndex, nickname, sign, response, gifUrl } = req.body || {};
    if (
      typeof promptIndex !== "number" ||
      promptIndex < 0 ||
      promptIndex >= PROMPTS.length ||
      !nickname?.trim() ||
      !sign?.trim() ||
      !response?.trim()
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const post = {
      id: Date.now() + "-" + Math.random().toString(36).slice(2, 7),
      nickname: nickname.trim().slice(0, 30),
      sign: sign.trim(),
      response: response.trim().slice(0, 280),
      gifUrl: gifUrl || null,
      ts: Date.now(),
    };

    try {
      await kv.lpush(`community:prompt:${promptIndex}`, JSON.stringify(post));
      // Keep list at max 200 entries per prompt
      await kv.ltrim(`community:prompt:${promptIndex}`, 0, 199);
      return res.status(200).json({ ok: true, post });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to save post" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
