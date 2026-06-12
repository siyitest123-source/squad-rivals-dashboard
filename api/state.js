import { neon } from '@neondatabase/serverless';

const CONN = process.env.DATABASE_URL || process.env.POSTGRES_URL;

export default async function handler(req, res) {
  if (!CONN) {
    return res.status(500).json({ error: 'No database connected. Add Neon Postgres in the Vercel dashboard (Storage tab).' });
  }
  const sql = neon(CONN);

  try {
    await sql`CREATE TABLE IF NOT EXISTS model_state (
      id text PRIMARY KEY,
      data jsonb NOT NULL,
      updated_at timestamptz DEFAULT now()
    )`;

    if (req.method === 'GET') {
      const rows = await sql`SELECT data, updated_at FROM model_state WHERE id = 'default'`;
      return res.status(200).json(rows[0] || { data: null });
    }

    if (req.method === 'POST') {
      const data = req.body;
      if (!data || !Array.isArray(data.streams) || typeof data.wau !== 'number') {
        return res.status(400).json({ error: 'Invalid state payload' });
      }
      await sql`INSERT INTO model_state (id, data, updated_at)
                VALUES ('default', ${JSON.stringify(data)}::jsonb, now())
                ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`;
      return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: 'Database error', detail: String(e.message || e) });
  }
}
