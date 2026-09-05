import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parser with generous limit for high-res logo upload from mobile or desktop
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  const publicDir = path.resolve(process.cwd(), "public");
  const distDir = path.resolve(process.cwd(), "dist");
  const jsonPath = path.join(publicDir, "custom-brand-logo.json");
  const pngPath = path.join(publicDir, "custom-brand-logo.png");

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
        const raw = fs.readFileSync(jsonPath, "utf8");
        cachedLogoData = JSON.parse(raw);
        return cachedLogoData;
      } catch {
        // fallback
      }
    }
    if (fs.existsSync(pngPath)) {
      cachedLogoData = {
        hasCustomLogo: true,
        logo: "/custom-brand-logo.png",
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
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/brand-logo", (_req, res) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    const data = cachedLogoData || loadCachedLogo();
    res.json(data || { hasCustomLogo: false });
  });

  app.post("/api/brand-logo", (req, res) => {
    try {
      const logoData = req.body?.logo;
      if (!logoData || typeof logoData !== "string") {
        return res.status(400).json({ error: "Invalid logo data" });
      }

      const updatedAt = Date.now();

      // If it's a base64 data URL, write binary file to both public/ and dist/ (if exists)
      if (logoData.startsWith("data:image/")) {
        const matches = logoData.match(
          /^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/
        );
        if (matches && matches[2]) {
          const buffer = Buffer.from(matches[2], "base64");
          if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
          }
          fs.writeFileSync(pngPath, buffer);

          if (fs.existsSync(distDir)) {
            fs.writeFileSync(
              path.join(distDir, "custom-brand-logo.png"),
              buffer
            );
          }
        }
      }

      const payload = {
        hasCustomLogo: true,
        logo: `/custom-brand-logo.png?v=${updatedAt}`,
        dataUrl: logoData,
        updatedAt,
      };

      fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2), "utf8");
      if (fs.existsSync(distDir)) {
        fs.writeFileSync(
          path.join(distDir, "custom-brand-logo.json"),
          JSON.stringify(payload, null, 2),
          "utf8"
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
      console.error("Error saving brand logo:", err);
      return res
        .status(500)
        .json({ error: err?.message || "Failed to save logo" });
    }
  });

  app.delete("/api/brand-logo", (_req, res) => {
    try {
      if (fs.existsSync(jsonPath)) fs.unlinkSync(jsonPath);
      if (fs.existsSync(pngPath)) fs.unlinkSync(pngPath);
      if (fs.existsSync(path.join(distDir, "custom-brand-logo.png"))) {
        fs.unlinkSync(path.join(distDir, "custom-brand-logo.png"));
      }
      if (fs.existsSync(path.join(distDir, "custom-brand-logo.json"))) {
        fs.unlinkSync(path.join(distDir, "custom-brand-logo.json"));
      }
      cachedLogoData = { hasCustomLogo: false };
      return res.json({ success: true });
    } catch (err: any) {
      console.error("Error resetting brand logo:", err);
      return res.status(500).json({ error: "Failed to reset logo" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(distDir));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distDir, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
