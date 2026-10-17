import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parser with generous limit for high-res logo upload from mobile or desktop
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  const publicDir = path.resolve(process.cwd(), 'public');
  const distDir = path.resolve(process.cwd(), 'dist');
  const jsonPath = path.join(publicDir, 'custom-brand-logo.json');
  const pngPath = path.join(publicDir, 'custom-brand-logo.png');

  // In-memory cache for instant response across devices
  let cachedLogoData: {
    hasCustomLogo: boolean;
    logo?: string;
    dataUrl?: string;
    updatedAt?: number;
  } | null = null;

  function loadCachedLogo() {
    if (fs.existsSync(jsonPath)) {
      try {
        const raw = fs.readFileSync(jsonPath, 'utf8');
        cachedLogoData = JSON.parse(raw);
        return cachedLogoData;
      } catch {
        // fallback
      }
    }
    if (fs.existsSync(pngPath)) {
      cachedLogoData = {
        hasCustomLogo: true,
        logo: '/custom-brand-logo.png',
        updatedAt: Date.now(),
      };
      return cachedLogoData;
    }
    cachedLogoData = { hasCustomLogo: false };
    return cachedLogoData;
  }

  // Load initially
  loadCachedLogo();

  // API Routes FIRST before Vite/static middlewares
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // Smart image resolver middleware for public/images
  // Handles requests with or without subpaths (e.g. /Emoze-Weddings-Events/images/...)
  // and recovers from .jpg vs .jpeg vs .jpg.jpeg extension mismatches
  app.use((req, res, next) => {
    if (req.url.includes('/images/')) {
      const idx = req.url.indexOf('/images/');
      const relPath = req.url.substring(idx).split('?')[0]; // e.g. /images/gallery/destination/cover-1.jpg
      const cleanRel = decodeURIComponent(relPath);
      const filePath = path.join(publicDir, cleanRel);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        return res.sendFile(filePath);
      }

      // Check alternative extensions
      if (cleanRel.endsWith('.jpg')) {
        const altJpeg = path.join(publicDir, cleanRel.replace(/\.jpg$/, '.jpeg'));
        if (fs.existsSync(altJpeg) && fs.statSync(altJpeg).isFile()) {
          return res.sendFile(altJpeg);
        }
        const altDouble = path.join(publicDir, cleanRel.replace(/\.jpg$/, '.jpg.jpeg'));
        if (fs.existsSync(altDouble) && fs.statSync(altDouble).isFile()) {
          return res.sendFile(altDouble);
        }
      } else if (cleanRel.endsWith('.jpeg')) {
        const altJpg = path.join(publicDir, cleanRel.replace(/\.jpeg$/, '.jpg'));
        if (fs.existsSync(altJpg) && fs.statSync(altJpg).isFile()) {
          return res.sendFile(altJpg);
        }
      }
    }
    next();
  });

  app.get('/api/brand-logo', (_req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    const data = cachedLogoData || loadCachedLogo();
    res.json(data || { hasCustomLogo: false });
  });

  app.post('/api/brand-logo', (req, res) => {
    try {
      const logoData = req.body?.logo;
      if (!logoData || typeof logoData !== 'string') {
        return res.status(400).json({ error: 'Invalid logo data' });
      }

      const updatedAt = Date.now();

      // If it's a base64 data URL, write binary file to both public/ and dist/ (if exists)
      if (logoData.startsWith('data:image/')) {
        const matches = logoData.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
        if (matches && matches[2]) {
          const buffer = Buffer.from(matches[2], 'base64');
          if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
          }
          fs.writeFileSync(pngPath, buffer);

          const srcBrandLogoPath = path.join(process.cwd(), 'src', 'components', 'Brandlogo.png');
          try {
            fs.writeFileSync(srcBrandLogoPath, buffer);
          } catch {
            // ignore
          }

          if (fs.existsSync(distDir)) {
            fs.writeFileSync(path.join(distDir, 'custom-brand-logo.png'), buffer);
          }
        }
      }

      const payload = {
        hasCustomLogo: true,
        logo: `/custom-brand-logo.png?v=${updatedAt}`,
        dataUrl: logoData,
        updatedAt,
      };

      fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2), 'utf8');
      if (fs.existsSync(distDir)) {
        fs.writeFileSync(
          path.join(distDir, 'custom-brand-logo.json'),
          JSON.stringify(payload, null, 2),
          'utf8'
        );
      }

      cachedLogoData = payload;
      return res.json({
        success: true,
        url: payload.logo,
        dataUrl: payload.dataUrl,
        updatedAt,
      });
    } catch (err: any) {
      console.error('Error saving brand logo:', err);
      return res.status(500).json({ error: err?.message || 'Failed to save logo' });
    }
  });

  app.delete('/api/brand-logo', (_req, res) => {
    try {
      if (fs.existsSync(jsonPath)) fs.unlinkSync(jsonPath);
      if (fs.existsSync(pngPath)) fs.unlinkSync(pngPath);
      if (fs.existsSync(path.join(distDir, 'custom-brand-logo.png'))) {
        fs.unlinkSync(path.join(distDir, 'custom-brand-logo.png'));
      }
      if (fs.existsSync(path.join(distDir, 'custom-brand-logo.json'))) {
        fs.unlinkSync(path.join(distDir, 'custom-brand-logo.json'));
      }
      cachedLogoData = { hasCustomLogo: false };
      return res.json({ success: true });
    } catch (err: any) {
      console.error('Error resetting brand logo:', err);
      return res.status(500).json({ error: 'Failed to reset logo' });
    }
  });

  // In-memory YouTube info cache to prevent repeated network requests
  const youtubeCache = new Map<string, {
    videoId: string;
    title: string;
    author: string;
    duration: string;
    durationSeconds?: number;
    thumbnail: string;
  }>();

  /**
   * GET /api/youtube-info?url=<youtubeUrlOrId>
   * Automatically calculates YouTube video duration and fetches metadata
   */
  app.get('/api/youtube-info', async (req, res) => {
    try {
      const rawUrl = (req.query.url as string) || (req.query.id as string) || '';
      if (!rawUrl) {
        return res.status(400).json({ error: 'Missing YouTube URL or video ID parameter' });
      }

      // Extract 11-character video ID
      let videoId = '';
      const trimmed = rawUrl.trim();
      if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
        videoId = trimmed;
      } else {
        const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/|user\/[^/]+\/u\/\d+\/))([a-zA-Z0-9_-]{11})/i);
        if (match) videoId = match[1];
      }

      if (!videoId) {
        return res.status(400).json({ error: 'Could not extract valid YouTube video ID' });
      }

      // Return from cache if already calculated
      if (youtubeCache.has(videoId)) {
        return res.json({ success: true, fromCache: true, ...youtubeCache.get(videoId) });
      }

      // 1. Fetch title and author from oEmbed
      let title = '';
      let author = '';
      try {
        const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
        if (oembedRes.ok) {
          const oembedData = (await oembedRes.json()) as { title?: string; author_name?: string };
          title = oembedData.title || '';
          author = oembedData.author_name || '';
        }
      } catch {
        // oembed failed, fallback to page scrape
      }

      // 2. Fetch HTML to extract exact duration (lengthSeconds, approxDurationMs, or simpleText)
      let duration = '';
      let durationSeconds: number | undefined;

      try {
        const pageRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
          headers: {
            'Accept-Language': 'en-US,en;q=0.9',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        });
        const html = await pageRes.text();

        const mLength = html.match(/"lengthSeconds":"(\d+)"/);
        if (mLength && mLength[1]) {
          const sec = parseInt(mLength[1], 10);
          durationSeconds = sec;
          const hrs = Math.floor(sec / 3600);
          const mins = Math.floor((sec % 3600) / 60);
          const s = sec % 60;
          if (hrs > 0) {
            duration = `${hrs}:${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')} hr`;
          } else {
            duration = `${mins}:${String(s).padStart(2, '0')} min`;
          }
        } else {
          const mApprox = html.match(/"approxDurationMs":"(\d+)"/);
          if (mApprox && mApprox[1]) {
            const sec = Math.round(parseInt(mApprox[1], 10) / 1000);
            durationSeconds = sec;
            const hrs = Math.floor(sec / 3600);
            const mins = Math.floor((sec % 3600) / 60);
            const s = sec % 60;
            if (hrs > 0) {
              duration = `${hrs}:${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')} hr`;
            } else {
              duration = `${mins}:${String(s).padStart(2, '0')} min`;
            }
          } else {
            const mSimple = html.match(/"simpleText":"(\d+:\d+(:\d+)?)"/);
            if (mSimple && mSimple[1]) {
              duration = `${mSimple[1]} min`;
            }
          }
        }

        if (!title) {
          const mTitle = html.match(/<title>([^<]+) - YouTube<\/title>/i);
          if (mTitle && mTitle[1]) {
            title = mTitle[1].replace(/\\u0026/g, '&').replace(/\\"/g, '"');
          }
        }
      } catch {
        // page fetch failed
      }

      if (!duration) {
        duration = 'Cinematic Film';
      }

      const result = {
        videoId,
        title: title || 'Wedding Film',
        author: author || 'Congratulations Weddings',
        duration,
        durationSeconds,
        thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      };

      youtubeCache.set(videoId, result);
      return res.json({ success: true, ...result });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Failed to fetch YouTube duration' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
