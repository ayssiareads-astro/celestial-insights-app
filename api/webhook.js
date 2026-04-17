import Stripe from 'stripe';
import { kv } from '@vercel/kv';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).json({ error: `Webhook error: ${err.message}` });
  }

  const email = event.data.object.customer_email 
    || event.data.object.customer_details?.email;

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'invoice.payment_succeeded':
      if (email) await kv.set(`sub:${email}`, 'active');
      break;

    case 'customer.subscription.deleted':
    case 'invoice.payment_failed':
      if (email) await kv.set(`sub:${email}`, 'inactive');
      break;
  }

  res.status(200).json({ received: true });
}

export const config = {
  api: { bodyParser: false }
};
