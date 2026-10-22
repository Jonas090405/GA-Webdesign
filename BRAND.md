# G&A Webdesign – Brand Guideline

Stand: Oktober 2026 · gilt für Website, Angebote, Social, Präsentationen.
Technische Quelle der Farben: `src/styles/globals.css` (Canvas/WebGL: `src/lib/tokens.ts`).

---

## 1. Marke

**G&A Webdesign GbR** – Gissler & Agyar, Leopoldstraße 1, St. Georgen im Schwarzwald.
Zwei feste Ansprechpartner, alles aus einer Hand: Design, Entwicklung, Hosting, SEO.

- **Positionierung:** Zwei aus dem Schwarzwald, die Webseiten bauen, die wirken – ohne dass sich der Kunde um etwas kümmern muss.
- **Name in Texten:** „G&A Webdesign“. Im Impressum und in Verträgen: „G&A Webdesign GbR“.
- **Nicht mehr verwenden:** „Gissler Webdesign“ (alter Name).
- **Bildwelt in einem Satz:** Schwarzwald bei Nacht, Nebel zwischen den Tannen, darüber feine Lichtlinien eines Netzwerks.

## 2. Logo

Datei: `src/imports/Logo_GA_Webdesign.svg` (isometrisches „GA“ aus einer Linie).

| Regel | Wert |
|---|---|
| Mindestgröße | 24 px Höhe (digital), 8 mm (Druck) |
| Schutzzone | ¼ der Logohöhe rundum frei |
| Auf Dunkel | Blau 700 `#006999`, Blau 400 `#4DBEF3` oder Weiß |
| Auf Nebel (hell) | Ink 950 `#0D1115` oder Blau 700 |
| Wortmarke | „G&A Webdesign“ in Bricolage Grotesque, Blau 400 auf Dunkel |

Nicht erlaubt: Verläufe im Logo, Schatten/Glow, Verzerren, andere Farben, Logo auf unruhigen Fotostellen ohne Abdunklung.

## 3. Farben

Die Marke ist **eine Blau-Familie auf blau getöntem Dunkel**. Abwechslung entsteht über helle Nebel-Flächen, nicht über weitere Akzentfarben.

### Blau

| Token | Hex | Rolle |
|---|---|---|
| `--blue-50` | `#EEF8FE` | sehr helle Flächen |
| `--blue-100` | `#D6EFFC` | Hover für helle Links |
| `--blue-200` | `#ADDFF9` | Sekundär-Links, Pill-Text auf Dunkel |
| `--blue-300` | `#7DCDF6` | Zwischenstufe |
| `--blue-400` | `#4DBEF3` | **Funklicht** – Linien, Labels, Fokus, Akzentwort |
| `--blue-500` | `#1EA2DD` | Zustände |
| `--blue-600` | `#0A82B8` | Zustände |
| `--blue-700` | `#006999` | **Markenblau** – Logo, Akzent auf Nebel |
| `--blue-800` | `#00567C` | CTA-Fläche (weiße Schrift) |
| `--blue-900` | `#0A3A52` | tiefe Flächen |
| `--blue-950` | `#06212F` | tiefste Fläche |

### Ink (Neutrals, blau getönt)

| Token | Hex | Rolle |
|---|---|---|
| `--ink-50` | `#F5F7F8` | starker Text (Alternative zu Weiß) |
| `--ink-100` | `#D3E0E8` | betonter Fließtext, Hero-Lead |
| `--ink-200` | `#B0C3CF` | Fließtext auf Rechtsseiten, Footer-Links |
| `--ink-300` | `#8EA3B1` | **Standard-Fließtext sekundär**, Leads |
| `--ink-400` | `#7A8F9E` | **gedämpft** – Meta, Labels, Hinweise |
| `--ink-500` | `#55687A` | nur Deko / Disabled auf Dunkel; Text auf Nebel |
| `--ink-600` | `#3A4A55` | Fließtext auf Nebel, Ringe |
| `--ink-700` – `--ink-800` | `#2A3840` / `#1B262C` | Linien, Trenner |
| `--ink-850` / `--ink-900` | `#141E23` / `#10181C` | Karte / Sektion |
| `--ink-950` | `#0D1115` | **Seitenhintergrund** |

### Nebel (helle Sektionen)

| Token | Hex | Rolle |
|---|---|---|
| `--fog-50` | `#F2F6F7` | helle Sektionsfläche |
| `--fog-100` | `#E4ECEF` | Karte auf Nebel |
| `--fog-200` | `#CFDBE0` | Linien auf Nebel |

### Geprüfte Kombinationen (WCAG AA: Text ≥ 4,5 : 1)

| Text | auf | Kontrast |
|---|---|---|
| Weiß | Ink 950 | 18,9 |
| Ink 300 | Ink 950 / Ink 850 | 7,2 / 6,5 |
| Ink 400 | Ink 950 / Ink 850 | 5,6 / 5,0 |
| Blau 400 | Ink 950 | 9,0 |
| Weiß | Blau 800 (CTA) | 8,0 |
| Ink 950 | Nebel 50 | 17,4 |
| Ink 600 | Nebel 50 | 8,4 |
| Blau 700 | Nebel 50 | 5,6 |

**Regeln**
- Blau 400 nie als Fläche unter weißer Schrift (2,1 : 1). Weiße Schrift erst ab Blau 700.
- Auf Nebel-Flächen ist der Akzent Blau 700, nicht Blau 400 (1,9 : 1).
- Ink 500 und dunkler nie als Text auf dunklem Grund.
- Pro Sektion maximal **ein** Akzentwort in Blau.
- **Kein Verlaufstext.** Betonung kommt über Farbe, Gewicht oder Größe.
- Transparenzen über Kanal-Tokens: `rgb(var(--blue-400-rgb) / 0.2)` bzw. Tailwind `border-blue-400/20`.

## 4. Typografie

| Rolle | Schrift | Größe | Zeilenabstand |
|---|---|---|---|
| Hero-Headline (h1) | Bricolage Grotesque, 500 | `clamp(34px, 6.5vw, 108px)` | 1.05 |
| Sektions-Headline (h2) | Bricolage Grotesque, 500 | `clamp(28px, 4.5vw, 72px)` | 1.08 |
| Karten-Titel (h3) | Bricolage Grotesque, 500 | 18 → 25 px | 1.2 |
| Lead | Inter | 15 → 21 px | relaxed (1.625) |
| Fließtext | Inter | 14 → 18 px | relaxed |

- Beide Schriften sind selbst gehostet (`@fontsource-variable`), keine Requests zu Google, DSGVO-konform.
- Headlines: `tracking-tight`, `text-wrap: balance`, nie Versalien.
- Fließtext max. ca. 70 Zeichen pro Zeile (`max-w-2xl`).
- Sektionsköpfe immer mit `SectionHeader` bauen, damit Größe und Abstand überall gleich sind.
- **Keine Eyebrows:** kein kleines Label über einer Headline. Die Headline trägt sich selbst.

## 5. Ton

Wir duzen. Immer. Kurze Sätze, konkrete Zusagen, kein Agentur-Sprech.

| Do | Don’t |
|---|---|
| „Du musst dich um nichts kümmern.“ | „Wir bieten ganzheitliche Full-Service-Lösungen.“ |
| „Wir melden uns innerhalb von 24 Stunden.“ | „Zeitnahe Rückmeldung garantiert.“ |
| „Ich gestalte deine Webseite.“ | „Ich gestalte eure Webseite.“ / „Ihre Webseite“ |
| „Kein Callcenter, kein Ping-Pong.“ | „Persönlicher Premium-Support“ |

Ausnahme: In FAQ-Fragen spricht der Besucher uns an („Was kostet eine Webseite bei euch?“).
Zahlen und Fakten nur, wenn sie belegbar sind.

## 6. Bildwelt & Motion

**Bild**
- Schwarzwald bei Nacht oder Dämmerung, Nebel, Tannen. Darüber feine Lichtlinien (Netzwerk) in Blau 400.
- Personenfotos: natürlich, kein Studio-Look, rund im `PortraitRing`.
- KI-Clips (Higgsfield) auf **pechschwarzem Grund** generieren und mit `mix-blend-mode: screen` einbinden – so verschwindet der Hintergrund ohne Alpha-Video.
- Illustrationen groß und freigestellt auf der Kachel, keine kleinen Icons in Boxen.

**Motion**
- Easing `[0.22, 1, 0.36, 1]`, Dauer 200–450 ms für UI, Loops als kurze Palindrome.
- Bewegungen sollen **entstehen**, nicht sich verformen.
- Scroll-Effekte sparsam, kein Sticky-Scrub über ~150vh. Kein `<video>`-Scrubbing (iOS) – Framesequenzen auf Canvas.
- `prefers-reduced-motion` wird immer respektiert (global in `globals.css` und `MotionConfig reducedMotion="user"`).

## 7. Komponenten

| Komponente | Datei | Einsatz |
|---|---|---|
| `PrimaryButton` | `Button.tsx` | Haupt-Aktion („Projekt anfragen“), CTA-Verlauf Blau 800 → Blau 700 |
| `GhostButton` | `Button.tsx` | Weiterführend („Mehr über uns“) |
| `TertiaryButton` | `Button.tsx` | Text-Link mit Pfeil |
| `Card` | `Card.tsx` | Inhalt mit Spotlight-Hover, 1 px Blau-Rand |
| `SectionHeader` | `SectionHeader.tsx` | h2 + Lead, `tone="dark" \| "fog"` |
| `BrowserFrame` / `PhoneFrame` | `BrowserFrame.tsx` | Screens und Videos von Projekten |
| `ProjectActions` | `ProjectActions.tsx` | „Case Study lesen“ + „Webseite öffnen“ |
| `PortraitRing` | `PortraitRing.tsx` | Personenfoto mit umlaufendem Lichtbogen |

Fokus: 2 px Outline in Blau 400, 3 px Abstand. Textauswahl: Blau 400 mit Ink-950-Schrift. Scrollbar: Blau-Verlauf auf Ink 950.

## 8. Projekte & Case Studies

Alle Projekte stehen in `src/content/projects.ts` – Startseite, `/projekte` und `/projekte/<slug>` lesen von dort.

- Aufbau einer Case Study: **Ausgangslage → (Ziel) → Was wir gebaut haben → Ergebnis + Kundenstimme**.
- Screens: Desktop 1440 × 900 und Mobile 390 × 844 als `.webp` unter `src/imports/projects/<slug>/`.
- Neue Case Study erst mit `published: true` live schalten, wenn Ausgangslage und Ergebnis geschrieben sind. Danach die URL in `public/sitemap.xml` eintragen.
- Ergebnisse nur mit belegbaren Aussagen oder Zahlen, im Zweifel lieber mit Kundenzitat.
