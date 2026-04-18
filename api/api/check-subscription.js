// api/check-subscription.js
const https = require("https");

function stripeRequest(path, secretKey) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.stripe.com",
      path: path,
      method: "GET",
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => { resolve(JSON.parse(data)); });
    });
    req.on("error", reject);
    req.end();
  });
}

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const email = (req.query.email || "").toLowerCase().trim();
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Valid email required" });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ error: "Stripe not configured" });
  }

  try {
    // Search for customer by email
    const customers = await stripeRequest(
      `/v1/customers?email=${encodeURIComponent(email)}&limit=5`,
      secretKey
    );

    if (!customers.data || customers.data.length === 0) {
      return res.status(200).json({ active: false, status: null });
    }

    // Check subscriptions for each customer
    for (const customer of customers.data) {
      const subs = await stripeRequest(
        `/v1/subscriptions?customer=${customer.id}&status=all&limit=10`,
        secretKey
      );

      if (subs.data && subs.data.length > 0) {
        for (const sub of subs.data) {
          if (sub.status === "trialing" || sub.status === "active") {
            return res.status(200).json({
              active: true,
              status: sub.status,
              trialEnd: sub.trial_end || null,
              currentPeriodEnd: sub.current_period_end || null,
            });
          }
        }
      }
    }

    return res.status(200).json({ active: false, status: null });

  } catch (err) {
    console.error("Error checking subscription:", err.message);
    return res.status(500).json({ error: "Could not check subscription" });
  }
};
