import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }

  const status = await kv.get(`sub:${email.toLowerCase()}`);
  res.status(200).json({ active: status === 'active' });
}
