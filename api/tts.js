// api/tts.js - ElevenLabs Text to Speech with Ayssia's cloned voice
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Missing ElevenLabs API key" });

  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Missing text" });

  const VOICE_ID = "xZaHMxbPj5ahCNmfYyvY"; // Ayssia's cloned voice

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_turbo_v2_5",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.85,
          style: 0.2,
          use_speaker_boost: true,
        },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("ElevenLabs error:", err);
      return res.status(response.status).json({ error: "ElevenLabs API error" });
    }

    const audioBuffer = await response.arrayBuffer();
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "no-cache");
    return res.status(200).send(Buffer.from(audioBuffer));

  } catch (err) {
    console.error("TTS error:", err);
    return res.status(500).json({ error: err.message });
  }
}
