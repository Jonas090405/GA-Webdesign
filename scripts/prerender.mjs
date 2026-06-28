import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, extname } from 'path';

const ROUTES = ['/', '/projekte', '/leistungen', '/ablauf', '/ueber-uns', '/kontakt', '/impressum', '/datenschutz', '/agb'];
const PORT = 3033;
const distDir = join(process.cwd(), 'dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.json': 'application/json',
  '.xml':  'application/xml',
  '.txt':  'text/plain',
};

const server = createServer((req, res) => {
  const url = req.url.split('?')[0];
  let filePath = join(distDir, url === '/' ? 'index.html' : url);

  try {
    const data = readFileSync(filePath);
    const mime = MIME[extname(filePath)] ?? 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  } catch {
    const data = readFileSync(join(distDir, 'index.html'));
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  }
});

server.listen(PORT);
console.log('🚀 Pre-rendering started...\n');

const browser = await puppeteer.launch({
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
  ],
  headless: true,
});

for (const route of ROUTES) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  await page.goto(`http://localhost:${PORT}${route}`, {
    waitUntil: 'networkidle2',
    timeout: 30000,
  });

  await new Promise(r => setTimeout(r, 800));

  const html = await page.content();

  if (route === '/') {
    writeFileSync(join(distDir, 'index.html'), html, 'utf-8');
  } else {
    const dir = join(distDir, route.slice(1));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html, 'utf-8');
  }

  console.log(`  ✅  ${route}`);
  await page.close();
}

await browser.close();
server.close();

console.log('\n🎉 All pages pre-rendered!\n');
