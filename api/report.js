// api/report.js
// Receives a flagged post and emails celestial.insights.app@gmail.com

export const config = {
  api: { bodyParser: { sizeLimit: "1mb" } },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { nickname, sign, text, promptId, ts } = req.body || {};

  if (!nickname || !promptId) return res.status(400).json({ error: "Missing fields" });

  const time = ts ? new Date(ts).toLocaleString("en-US", { timeZone: "America/New_York" }) : "Unknown";

  // Use Resend API if available, otherwise log and return ok
  const RESEND_KEY = process.env.RESEND_API_KEY;

  if (RESEND_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "AreWeWoke Reports <onboarding@resend.dev>",
          to: "celestial.insights.app@gmail.com",
          subject: `🚩 Post Reported on AreWeWoke`,
          html: `
            <h2>A post has been reported</h2>
            <p><strong>Prompt:</strong> ${promptId}</p>
            <p><strong>Posted by:</strong> ${nickname} (${sign})</p>
            <p><strong>Posted at:</strong> ${time}</p>
            <p><strong>Content:</strong></p>
            <blockquote style="border-left:3px solid #ccc;padding-left:12px;color:#444">${text || "(GIF only post)"}</blockquote>
            <p>Log in to your admin panel to review and delete if needed.</p>
          `,
        }),
      });
    } catch(e) {
      console.error("Email error:", e.message);
    }
  } else {
    // No email key — just log it so you can see it in Vercel logs
    console.log("REPORTED POST:", { nickname, sign, text, promptId, time });
  }

  return res.status(200).json({ ok: true });
}
