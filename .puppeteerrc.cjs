const { join } = require("path");

// Auf Vercel liegt Chrome für das Prerendering fest im Projektordner, damit
// Install- und Build-Schritt garantiert denselben Pfad nutzen.
// Lokal bleibt der Standard (~/.cache/puppeteer).
module.exports = process.env.VERCEL
  ? { cacheDirectory: join(__dirname, ".cache", "puppeteer") }
  : {};
