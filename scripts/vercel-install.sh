#!/bin/sh
# Install-Schritt für Vercel (Amazon Linux 2023).
# Das Prerendering (scripts/prerender.mjs) startet Chrome über Puppeteer;
# dafür fehlen im Build-Image einige Systembibliotheken.
set -e

dnf install -y --skip-broken \
  nss atk at-spi2-atk cups-libs libdrm libxkbcommon \
  libXcomposite libXdamage libXfixes libXrandr libXext libX11 libxcb \
  mesa-libgbm alsa-lib pango cairo >/dev/null

npm install

# npm führt den Postinstall-Download von Puppeteer nicht mehr automatisch aus
# (allowScripts). Chrome daher ausdrücklich laden – Zielordner: .puppeteerrc.cjs
# Vercel setzt evtl. PUPPETEER_SKIP_*-Variablen, die den Download stumm überspringen.
echo "Puppeteer-Variablen im Build: $(env | grep -o '^PUPPETEER[A-Z_]*' | tr '\n' ' ')"
rm -rf .cache/puppeteer
env -u PUPPETEER_SKIP_DOWNLOAD -u PUPPETEER_SKIP_CHROME_DOWNLOAD \
  -u PUPPETEER_SKIP_CHROMIUM_DOWNLOAD -u PUPPETEER_SKIP_CHROME_HEADLESS_SHELL_DOWNLOAD \
  npx puppeteer browsers install chrome
CHROME=$(node -e "import('puppeteer').then(p => console.log(p.default.executablePath()))")
echo "Chrome für Prerendering: $CHROME"
test -x "$CHROME"
