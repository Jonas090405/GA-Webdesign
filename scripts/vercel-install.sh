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
# (allowScripts), und Vercels Cache kann einen halbfertigen Chrome-Ordner
# enthalten. Daher sauber neu laden.
rm -rf "$HOME/.cache/puppeteer"
npx puppeteer browsers install chrome
