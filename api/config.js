// api/config.js
// Environment variables diset di Vercel Dashboard → Settings → Environment Variables
// Tambahkan:
//   SUPABASE_AUTH_URL   → URL project Supabase AUTH (baru)
//   SUPABASE_AUTH_KEY   → Anon key project Supabase AUTH (baru)
//   SUPABASE_DATA_URL   → URL project Supabase DATA (lama)
//   SUPABASE_DATA_KEY   → Anon key project Supabase DATA (lama)

export default function handler(req, res) {
  // Hanya izinkan GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Pastikan semua env variable sudah diset
  const { 
    SUPABASE_AUTH_URL, 
    SUPABASE_AUTH_KEY,
    SUPABASE_DATA_URL,
    SUPABASE_DATA_KEY
  } = process.env;

  if (!SUPABASE_AUTH_URL || !SUPABASE_AUTH_KEY || !SUPABASE_DATA_URL || !SUPABASE_DATA_KEY) {
    return res.status(500).json({ error: 'Server config belum lengkap. Cek environment variables di Vercel.' });
  }

  // Cache 5 menit di browser, 1 jam di CDN
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=3600');
  res.setHeader('Content-Type', 'application/json');

  return res.status(200).json({
    authUrl : SUPABASE_AUTH_URL,
    authKey : SUPABASE_AUTH_KEY,
    dataUrl : SUPABASE_DATA_URL,
    dataKey : SUPABASE_DATA_KEY,
  });
}
