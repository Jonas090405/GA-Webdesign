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
# (allowScripts). Chrome daher direkt über @puppeteer/browsers laden, in genau
# der Version, die Puppeteer erwartet, und in den Ordner aus .puppeteerrc.cjs.
CHROME_VERSION=$(node -e "import('puppeteer-core/lib/esm/puppeteer/revisions.js').then(m => console.log(m.PUPPETEER_REVISIONS.chrome))")
rm -rf .cache/puppeteer
npx browsers install "chrome@$CHROME_VERSION" --path "$PWD/.cache/puppeteer"

CHROME=$(node -e "import('puppeteer').then(p => console.log(p.default.executablePath()))")
echo "Chrome für Prerendering: $CHROME"
test -x "$CHROME"
