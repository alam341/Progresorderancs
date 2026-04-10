// api/config.js
// Set di Vercel Dashboard → Settings → Environment Variables:
//   SUPABASE_AUTH_URL   → URL Supabase AUTH (baru)
//   SUPABASE_AUTH_KEY   → Anon key Supabase AUTH (baru)
//   SUPABASE_DATA_URL   → URL Supabase DATA (lama)
//   SUPABASE_DATA_KEY   → Anon key Supabase DATA (lama)

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { SUPABASE_AUTH_URL, SUPABASE_AUTH_KEY, SUPABASE_DATA_URL, SUPABASE_DATA_KEY } = process.env;

  if (!SUPABASE_AUTH_URL || !SUPABASE_AUTH_KEY || !SUPABASE_DATA_URL || !SUPABASE_DATA_KEY) {
    return res.status(500).json({ error: 'Server config belum lengkap. Cek environment variables di Vercel.' });
  }

  // Cache 1 jam di browser, 24 jam di CDN Vercel — drastis kurangi jumlah request
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  res.setHeader('Content-Type', 'application/json');

  return res.status(200).json({
    authUrl : SUPABASE_AUTH_URL,
    authKey : SUPABASE_AUTH_KEY,
    dataUrl : SUPABASE_DATA_URL,
    dataKey : SUPABASE_DATA_KEY,
  });
}
