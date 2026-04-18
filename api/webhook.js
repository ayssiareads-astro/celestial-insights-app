// api/webhook.js
// Stripe webhook handler — place this file at /api/webhook.js in your project
//
// ENVIRONMENT VARIABLES ALREADY SET BY UPSTASH (no action needed):
//   KV_REST_API_URL
//   KV_REST_API_TOKEN
//
// ENVIRONMENT VARIABLES YOU STILL NEED TO ADD IN VERCEL:
//   STRIPE_SECRET_KEY       → Stripe Dashboard → Developers → API Keys → Secret key
//   STRIPE_WEBHOOK_SECRET   → Stripe Dashboard → Developers → Webhooks → Signing secret
//                             (add this after you register the webhook endpoint in Stripe)

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Upstash Redis REST helper — works with KV_REST_API_URL and KV_REST_API_TOKEN
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

// Tell Vercel NOT to parse the body — Stripe needs the raw body to verify the signature
export const config = {
  api: { bodyParser: false },
};

// Read raw body from the request stream
async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const rawBody = await getRawBody(req);
  const signature = req.headers["stripe-signature"];

  let event;

  // Verify the webhook came from Stripe
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).json({ error: `Webhook error: ${err.message}` });
  }

  const subscription = event.data.object;
  const customerId = subscription.customer;

  // Get the customer's email from Stripe
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

  // Handle each Stripe event type
  switch (event.type) {

    // Trial started or subscription created
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
        console.log(`Subscription created for ${customerEmail} — status: ${subscription.status}`);
      }
      break;
    }

    // Subscription updated (trial converted, cancelled at period end, etc.)
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

    // Subscription cancelled or expired — revoke access
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

    // Payment succeeded — confirm active status
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

    // Payment failed — flag it but keep access (Stripe will retry)
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

  // Always return 200 so Stripe knows we received the webhook
  return res.status(200).json({ received: true });
}
