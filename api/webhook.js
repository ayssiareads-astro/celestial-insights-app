// api/webhook.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function kvSet(key, value) {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  const res = await fetch(`${url}/set/${encodeURIComponent(key)}/${encodeURIComponent(JSON.stringify(value))}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

async function kvGet(key) {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  const res = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data.result ? JSON.parse(data.result) : null;
}

async function sendWelcomeEmail(email) {
  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) { console.log("No RESEND_API_KEY — skipping welcome email"); return; }

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AreWeWoke <onboarding@resend.dev>",
        to: email,
        subject: "✦ Welcome to AreWeWoke — Your Free Trial is Active",
        html: `
          <div style="background:#0d0a14;color:#f5f0e0;font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:40px 32px;border-radius:16px;">
            <div style="text-align:center;margin-bottom:32px;">
              <h1 style="font-family:Georgia,serif;font-size:28px;color:#f5c842;margin:0 0 8px;">✦ Welcome to AreWeWoke ✦</h1>
              <p style="color:#a8e060;font-size:15px;margin:0;">Your 7-day free trial is now active.</p>
            </div>

            <p style="font-size:16px;line-height:1.75;color:#d8c890;">
              The stars brought you here for a reason. Your full birth chart reading, all 4 quiz levels, all 12 zodiac avatars, and the full community experience are now unlocked.
            </p>

            <div style="background:rgba(255,200,50,0.08);border:1px solid rgba(255,200,50,0.2);border-radius:12px;padding:20px 24px;margin:24px 0;">
              <p style="font-family:Georgia,serif;font-weight:700;font-size:14px;color:#f5c842;margin:0 0 12px;">✦ What you now have access to:</p>
              <ul style="margin:0;padding-left:20px;color:#d8c890;font-size:14px;line-height:2;">
                <li>Your full birth chart — all 11 planets, houses & aspects</li>
                <li>The complete 48-question Zodiac Quiz</li>
                <li>All 12 Zodiac Operative avatars to unlock</li>
                <li>The Community — share takes, react, post GIFs</li>
                <li>Daily Challenge — one question every day</li>
              </ul>
            </div>

            <div style="text-align:center;margin:32px 0;">
              <a href="https://arewewoke.com" style="background:linear-gradient(135deg,#e8a800,#8a6000);color:#0d0a14;text-decoration:none;padding:14px 36px;border-radius:100px;font-family:Georgia,serif;font-weight:700;font-size:15px;display:inline-block;">
                ✦ Open AreWeWoke
              </a>
            </div>

            <p style="font-size:13px;line-height:1.75;color:#6a6058;">
              Your free trial runs for 7 days. After that, you'll be charged $4.99/month — cancel anytime with no hassle via your
              <a href="https://billing.stripe.com/p/login/5kQ3co6dzeub70TfIx5sA00" style="color:#a8e060;">member portal</a>.
            </p>

            <div style="border-top:1px solid rgba(255,200,50,0.1);margin-top:32px;padding-top:20px;text-align:center;">
              <p style="font-size:12px;color:#3a3228;margin:0;">AreWeWoke · celestial.insights.app@gmail.com</p>
            </div>
          </div>
        `,
      }),
    });
    console.log(`Welcome email sent to ${email}`);
  } catch(e) {
    console.error("Welcome email error:", e.message);
  }
}

export const config = {
  api: { bodyParser: false },
};

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const rawBody = await getRawBody(req);
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).json({ error: `Webhook error: ${err.message}` });
  }

  const subscription = event.data.object;
  const customerId = subscription.customer;

  let customerEmail = null;
  try {
    const customer = await stripe.customers.retrieve(customerId);
    customerEmail = customer.email?.toLowerCase();
  } catch (err) {
    console.error("Could not retrieve customer:", err.message);
    return res.status(500).json({ error: "Could not retrieve customer" });
  }

  if (!customerEmail) {
    console.error("No email found for customer:", customerId);
    return res.status(400).json({ error: "No customer email" });
  }

  switch (event.type) {

    case "customer.subscription.created": {
      const isTrialing = subscription.status === "trialing";
      const isActive = subscription.status === "active";
      if (isTrialing || isActive) {
        await kvSet(`sub:${customerEmail}`, {
          status: subscription.status,
          subscriptionId: subscription.id,
          customerId,
          trialEnd: subscription.trial_end,
          currentPeriodEnd: subscription.current_period_end,
          updatedAt: Date.now(),
        });
        // Send welcome email on new subscription
        await sendWelcomeEmail(customerEmail);
        console.log(`Subscription created + welcome email sent for ${customerEmail}`);
      }
      break;
    }

    case "customer.subscription.updated": {
      await kvSet(`sub:${customerEmail}`, {
        status: subscription.status,
        subscriptionId: subscription.id,
        customerId,
        trialEnd: subscription.trial_end,
        currentPeriodEnd: subscription.current_period_end,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        updatedAt: Date.now(),
      });
      console.log(`Subscription updated for ${customerEmail} — status: ${subscription.status}`);
      break;
    }

    case "customer.subscription.deleted": {
      await kvSet(`sub:${customerEmail}`, {
        status: "canceled",
        subscriptionId: subscription.id,
        customerId,
        updatedAt: Date.now(),
      });
      console.log(`Subscription cancelled for ${customerEmail}`);
      break;
    }

    case "invoice.payment_succeeded": {
      const invoice = event.data.object;
      if (invoice.subscription) {
        const sub = await stripe.subscriptions.retrieve(invoice.subscription);
        await kvSet(`sub:${customerEmail}`, {
          status: sub.status,
          subscriptionId: sub.id,
          customerId,
          currentPeriodEnd: sub.current_period_end,
          updatedAt: Date.now(),
        });
        console.log(`Payment succeeded for ${customerEmail}`);
      }
      break;
    }

    case "invoice.payment_failed": {
      const existing = await kvGet(`sub:${customerEmail}`);
      if (existing) {
        await kvSet(`sub:${customerEmail}`, {
          ...existing,
          status: "past_due",
          updatedAt: Date.now(),
        });
      }
      console.log(`Payment failed for ${customerEmail}`);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return res.status(200).json({ received: true });
}
