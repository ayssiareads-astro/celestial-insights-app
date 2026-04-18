// api/check-subscription.js
// Your app calls this to verify a user's subscription status
//
// Usage: GET /api/check-subscription?email=someone@example.com
//
// Returns:
//   { active: true,  status: "trialing" }
//   { active: true,  status: "active" }
//   { active: false, status: "canceled" }
//   { active: false, status: null }

async function kvGet(key) {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data.result ? JSON.parse(data.result) : null;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const email = req.query.email?.toLowerCase();

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const record = await kvGet(`sub:${email}`);

    if (!record) {
      return res.status(200).json({ active: false, status: null });
    }

    const activeStatuses = ["trialing", "active"];
    const isActive = activeStatuses.includes(record.status);

    // Extra check: if trialing, confirm the trial hasn't expired
    if (record.status === "trialing" && record.trialEnd) {
      const now = Math.floor(Date.now() / 1000);
      if (now > record.trialEnd) {
        return res.status(200).json({ active: false, status: "trial_expired" });
      }
    }

    return res.status(200).json({
      active: isActive,
      status: record.status,
      trialEnd: record.trialEnd || null,
      currentPeriodEnd: record.currentPeriodEnd || null,
    });

  } catch (err) {
    console.error("Error checking subscription:", err.message);
    return res.status(500).json({ error: "Could not check subscription status" });
  }
}
