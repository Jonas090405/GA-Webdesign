# Hosting – ga-webdesign.de

Die Seite läuft auf **Vercel** (Team „GA Webdesign“, Projekt `ga-webdesign`),
verbunden mit dem GitHub-Repo `Jonas090405/GA-Webdesign`.

- Push auf `main` → Production-Deployment auf ga-webdesign.de
- Push auf jeden anderen Branch → Preview-Deployment (eigene URL, Vercel-Login nötig)

## Build

Konfiguration steht in `vercel.json`:

| Schritt | Befehl |
|---|---|
| Install | `sh scripts/vercel-install.sh` – installiert Chrome-Systembibliotheken (dnf), npm-Pakete und Chrome für Puppeteer |
| Build | `npm run build` – Vite-Build, danach `scripts/prerender.mjs` (alle DE/EN-Seiten + `404.html`) |
| Output | `dist` |

- Node-Version ist über `engines` in `package.json` auf **22.x** festgelegt. Mit Node 26 bricht der Chrome-Download ab.
- `.puppeteerrc.cjs` legt Chrome auf Vercel in `.cache/puppeteer` im Projekt ab.
- URLs ohne Slash am Ende (`/kontakt`), `/kontakt/` leitet mit 308 weiter.
- Unbekannte URLs liefern die vorgerenderte NotFound-Seite mit Status 404.

## Umgebungsvariablen

In Vercel → Project Settings → Environment Variables (Production + Preview):

`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID`,
`VITE_EMAILJS_PUBLIC_KEY`, `VITE_GA_MEASUREMENT_ID`

Lokal stehen dieselben Werte in `.env.local` (nicht im Repo).

## Domain & DNS (Strato)

DNS bleibt bei Strato. Nur diese Einträge zeigen auf Vercel:

| Typ | Name | Wert |
|---|---|---|
| A | @ | 216.150.1.1 |
| A | @ | 216.150.16.1 |
| CNAME | www | a5ffb6f7ca5e88c6.vercel-dns-016.com. |

`www.ga-webdesign.de` leitet in Vercel per 308 auf `ga-webdesign.de` um.
MX- und TXT-Einträge (Strato-Mail, SPF, Google-/Anthropic-Verifizierung) bleiben unverändert.
