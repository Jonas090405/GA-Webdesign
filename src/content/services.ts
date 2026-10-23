/**
 * Alle Leistungen für /leistungen, gruppiert nach dem, was Kunden davon haben.
 * Jede Leistung bekommt eine Illustration (`MEDIA`, sprachunabhängig) und
 * klappt auf der Seite zu einer genaueren Beschreibung auf.
 * `id` ist zugleich der Anker (/leistungen#seo öffnet direkt die SEO-Leistung).
 */
import webdesignImg from "../imports/tile-design-poster.webp";
import entwicklungImg from "../imports/tile-code-poster.webp";
import launchImg from "../imports/tile-rocket-poster.webp";
import seoImg from "../imports/services/seo.svg";
import geoImg from "../imports/services/geo.svg";
import seaImg from "../imports/services/sea.svg";
import analyticsImg from "../imports/services/analytics.svg";
import corporateImg from "../imports/services/corporate.svg";
import mediaImg from "../imports/services/media.svg";
import cmsImg from "../imports/services/cms.svg";
import shopImg from "../imports/services/shop.svg";
import languagesImg from "../imports/services/languages.svg";
import portalsImg from "../imports/services/portals.svg";
import maintenanceImg from "../imports/services/maintenance.svg";

export type ServiceId =
  | "webdesign"
  | "entwicklung"
  | "launch"
  | "seo"
  | "geo"
  | "sea"
  | "analytics"
  | "corporate-design"
  | "foto-video"
  | "cms"
  | "shop-buchung"
  | "mehrsprachigkeit"
  | "portale"
  | "wartung";

/**
 * Die drei Webseiten-Bilder sind Standbilder der alten Kachel-Clips auf
 * schwarzem Grund (→ mix-blend-mode: screen), die übrigen transparente SVGs.
 */
export const MEDIA: Record<ServiceId, { src: string; onBlack?: boolean }> = {
  webdesign: { src: webdesignImg, onBlack: true },
  entwicklung: { src: entwicklungImg, onBlack: true },
  launch: { src: launchImg, onBlack: true },
  seo: { src: seoImg },
  geo: { src: geoImg },
  sea: { src: seaImg },
  analytics: { src: analyticsImg },
  "corporate-design": { src: corporateImg },
  "foto-video": { src: mediaImg },
  cms: { src: cmsImg },
  "shop-buchung": { src: shopImg },
  mehrsprachigkeit: { src: languagesImg },
  portale: { src: portalsImg },
  wartung: { src: maintenanceImg },
};

export type ServiceList = { title?: string; points: string[] };

export type Service = {
  id: ServiceId;
  title: string;
  lead: string;
  body: string;
  lists: ServiceList[];
  /** Ehrliche Einschränkung, z. B. keine Ranking-Garantie. */
  note?: string;
  /** Interner Anker statt Kontakt-Link, z. B. zu den Wartungspreisen. */
  linkToPrices?: boolean;
};

export type ServiceGroup = { id: string; title: string; lead: string; items: Service[] };

export const SERVICE_GROUPS: { de: ServiceGroup[]; en: ServiceGroup[] } = {
  de: [
    {
      id: "webseite",
      title: "Von der Idee bis live.",
      lead: "Gestaltet, programmiert und live geschaltet. Alles aus einer Hand.",
      items: [
        {
          id: "webdesign",
          title: "Webdesign",
          lead: "So, wie du dir das vorstellst.",
          body: "Wir gestalten deine Webseite von Grund auf, passend zu deiner Marke und zu deinen Kunden. Bevor programmiert wird, zeigen wir dir das Design und stimmen jedes Detail mit dir ab.",
          lists: [
            {
              points: [
                "Individuelles Design statt Template",
                "Gestaltet für Smartphone, Tablet und Desktop",
                "Abgestimmt auf deine Farben, Schriften und Bildsprache",
                "Barrierefrei nach WCAG 2.2 AA",
              ],
            },
          ],
        },
        {
          id: "entwicklung",
          title: "Entwicklung",
          lead: "Schnell, stabil und zukunftssicher.",
          body: "Wir programmieren jede Seite von Hand mit Astro oder Next.js. Deine Besucher bekommen fertige Seiten ausgeliefert, die sofort laden. Plugins, die ständig Updates brauchen, kommen bei uns gar nicht erst auf die Seite.",
          lists: [
            {
              points: [
                "Handgebaut mit Astro oder Next.js",
                "Kurze Ladezeiten und sehr gute Core Web Vitals",
                "Formulare und Funktionen nach deinem Bedarf",
                "Sauberer Code als Basis für SEO und Barrierefreiheit",
              ],
            },
          ],
        },
        {
          id: "launch",
          title: "Launch, Domain & Hosting",
          lead: "Du musst dich um nichts kümmern.",
          body: "Wir besorgen deine Domain, richten das Hosting ein und schalten die Seite live. Vorher bekommst du einen Vorschau-Link und kannst alles in Ruhe testen. Online geht die Seite erst, wenn du zufrieden bist.",
          lists: [
            {
              points: [
                "Einrichtung auf neuer oder vorhandener Domain",
                "SSL-Verschlüsselung und DSGVO-konforme Einrichtung",
                "Vorschau-Link vor dem Livegang",
                "Hosting für 5 €/Monat, monatlich kündbar",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "gefunden-werden",
      title: "Gefunden werden.",
      lead: "Bei Google und in den Antworten von KI-Assistenten wie ChatGPT.",
      items: [
        {
          id: "seo",
          title: "SEO",
          lead: "Damit Google deine Seite versteht und gerne zeigt.",
          body: "Suchmaschinenoptimierung sorgt dafür, dass deine Seite bei Google auftaucht, wenn jemand nach deinen Leistungen sucht. Die technische Grundlage bekommt jede Webseite von uns. Willst du für bestimmte Suchbegriffe in deiner Region weiter nach oben, kümmern wir uns auch laufend darum.",
          lists: [
            {
              title: "In jeder Webseite enthalten",
              points: [
                "Seitentitel und Beschreibungen für jede Unterseite",
                "Strukturierte Daten zu deinem Betrieb",
                "Sitemap und saubere Überschriften-Struktur",
                "Kurze Ladezeiten, die Google belohnt",
              ],
            },
            {
              title: "Auf Wunsch dazu",
              points: [
                "Recherche der Suchbegriffe für deine Leistungen und deine Region",
                "Google-Unternehmensprofil einrichten und pflegen",
                "Inhalte und Unterseiten für wichtige Suchbegriffe",
                "Regelmäßige Auswertung deiner Sichtbarkeit",
              ],
            },
          ],
          note: "Eine Platz-1-Garantie kann seriös niemand geben. Das Ranking hängt auch von deinen Inhalten und deiner Konkurrenz ab.",
        },
        {
          id: "geo",
          title: "GEO",
          lead: "Damit ChatGPT & Co. deinen Betrieb nennen.",
          body: "Immer mehr Menschen fragen ChatGPT, Perplexity oder Googles KI-Übersicht, statt sich durch Suchergebnisse zu klicken. GEO (Generative Engine Optimization) bereitet deine Seite so auf, dass diese Systeme sie lesen, verstehen und als Quelle nennen können. Fragt jemand nach einem Elektriker in Triberg, soll dein Betrieb in der Antwort stehen.",
          lists: [
            {
              title: "In jeder Webseite enthalten",
              points: [
                "Strukturierte Daten zu Leistungen, Standort und Öffnungszeiten",
                "Inhalte, die typische Kundenfragen direkt beantworten",
                "KI-Crawler dürfen deine Seite lesen",
                "llms.txt: ein Inhaltsverzeichnis deiner Seite für KI-Systeme",
              ],
            },
            {
              title: "Auf Wunsch dazu",
              points: [
                "Prüfen, was KI-Assistenten heute über dich antworten",
                "Fragen und Antworten auf deiner Seite gezielt ausbauen",
                "Einheitliche Firmendaten in Verzeichnissen und Profilen",
              ],
            },
          ],
          note: "Welche Quellen eine KI nennt, entscheidet sie selbst. Garantieren kann das niemand, aber wir sorgen dafür, dass deine Seite die besten Voraussetzungen mitbringt.",
        },
        {
          id: "sea",
          title: "SEA (Google Ads)",
          lead: "Sofort oben in den Suchergebnissen.",
          body: "Mit bezahlten Anzeigen erscheinst du bei Google ganz oben, auch wenn deine Seite noch neu ist. Wir richten deine Kampagnen ein, legen Suchbegriffe und Budget mit dir fest und behalten die Kosten im Blick.",
          lists: [
            {
              points: [
                "Einrichtung deiner Kampagnen in Google Ads",
                "Suchbegriffe und Anzeigentexte für deine Region",
                "Eine Zielseite, die zur Anzeige passt",
                "Laufende Optimierung von Budget und Anzeigen",
              ],
            },
          ],
        },
        {
          id: "analytics",
          title: "Analytics & Tracking",
          lead: "Sehen, was auf deiner Seite passiert.",
          body: "Wir binden Google Analytics so ein, dass erst gemessen wird, wenn deine Besucher zugestimmt haben. Du siehst, woher sie kommen, welche Seiten sie lesen und wie oft sie dich kontaktieren.",
          lists: [
            {
              points: [
                "Google Analytics mit Cookie-Einwilligung",
                "Messung wichtiger Aktionen wie Anfragen oder Anrufe",
                "Verständliche Auswertung, auch ohne Vorwissen",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "marke-inhalte",
      title: "Marke & Inhalte.",
      lead: "Ein Auftritt, den deine Kunden wiedererkennen.",
      items: [
        {
          id: "corporate-design",
          title: "Corporate Design",
          lead: "Logo, Farben und Schriften aus einem Guss.",
          body: "Jonas entwickelt mit dir das Erscheinungsbild deines Unternehmens. Am Ende hast du ein Logo und klare Regeln für Farben und Schriften, damit Webseite, Visitenkarte und Social Media zusammenpassen.",
          lists: [
            {
              points: [
                "Logo-Entwicklung",
                "Farbpalette und Schriftwahl",
                "Kompakter Styleguide zum Weitergeben",
                "Dateien für Web und Druck",
              ],
            },
          ],
        },
        {
          id: "foto-video",
          title: "Foto- & Videoproduktion",
          lead: "Eigene Bilder statt Stockfotos.",
          body: "Mit professionellen Partnern setzen wir Fotos und Videos für dich um, vom Shooting bis zur fertigen Nachbearbeitung. Ob für deine Webseite, Social Media oder Werbung: Planung und Abstimmung übernehmen wir, du hast nur einen Ansprechpartner.",
          lists: [
            {
              points: [
                "Fotos von Team, Räumen und deiner Arbeit",
                "Imagefilme und kurze Clips für Social Media",
                "Komplette Organisation mit unseren Partnern",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "funktionen",
      title: "Funktionen.",
      lead: "Was deine Webseite können muss, bauen wir dazu.",
      items: [
        {
          id: "cms",
          title: "CMS",
          lead: "Texte und Bilder selbst ändern, ohne Programmierkenntnisse.",
          body: "Wir richten dir ein Content-Management-System ein, das genau auf deine Seite zugeschnitten ist. Du siehst nur die Felder, die du wirklich brauchst, zum Beispiel für Öffnungszeiten, Team oder Referenzen.",
          lists: [
            {
              points: [
                "Maßgeschneidertes Headless CMS",
                "Nur die Felder, die du wirklich bearbeitest",
                "Hosting, CMS-Updates und Wartung im CMS-Paket enthalten",
              ],
            },
          ],
        },
        {
          id: "shop-buchung",
          title: "Online-Shop & Buchungssystem",
          lead: "Verkaufen und Termine vergeben, direkt auf deiner Seite.",
          body: "Ob Produkte, Gutscheine oder Termine: Wir binden einen Shop oder ein Buchungssystem ein, das zu deinem Betrieb passt, und gestalten es im Look deiner Webseite.",
          lists: [
            {
              points: [
                "Online-Shop mit Warenkorb und Bezahlung",
                "Terminbuchung mit Kalender und Bestätigung",
                "Gestaltet im Design deiner Webseite",
              ],
            },
          ],
        },
        {
          id: "mehrsprachigkeit",
          title: "Mehrsprachigkeit",
          lead: "Deine Seite auch auf Englisch oder in weiteren Sprachen.",
          body: "Wir bauen deine Seite in mehreren Sprachen, mit eigener Adresse je Sprache, damit Google jede Fassung richtig zuordnet. Diese Webseite ist selbst so gebaut.",
          lists: [
            {
              points: [
                "Eigene URL je Sprache, z. B. /en",
                "Sprachumschalter, der sich die Wahl merkt",
                "Sprachangaben (hreflang) für Google",
              ],
            },
          ],
        },
        {
          id: "portale",
          title: "Portale & Admin-Panels",
          lead: "Eigene Werkzeuge für dich und deine Kunden.",
          body: "Wenn eine Webseite allein nicht reicht, bauen wir dazu, was dein Ablauf braucht: ein Bewerbungsportal, ein Buchungsportal für deine Kunden, einen Verwaltungsbereich für deine Daten oder die Anbindung an deinen Newsletter.",
          lists: [
            {
              points: [
                "Bewerbungsportal mit Datei-Upload",
                "Buchungsportal, z. B. für Termine, Räume oder Kurse",
                "Admin-Panel für deine Inhalte und Daten",
                "Newsletter-Integration",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "betreuung",
      title: "Betreuung.",
      lead: "Auch nach dem Launch sind wir für dich da.",
      items: [
        {
          id: "wartung",
          title: "Wartung & Support",
          lead: "Damit deine Seite sicher und aktuell bleibt.",
          body: "Wir überwachen deine Seite, spielen Sicherheits- und Datenschutzupdates ein und melden uns, wenn etwas nicht stimmt. In den größeren Paketen setzen wir auch Änderungen an Texten und Bildern für dich um.",
          lists: [
            {
              points: [
                "Überwachung und Meldung bei Problemen",
                "Sicherheits- und Datenschutzupdates",
                "Barrierefreiheit bleibt erhalten",
                "Inhaltsanpassungen je nach Paket",
              ],
            },
          ],
          linkToPrices: true,
        },
      ],
    },
  ],
  en: [
    {
      id: "webseite",
      title: "From idea to launch.",
      lead: "Designed, built and launched. All from one team.",
      items: [
        {
          id: "webdesign",
          title: "Web design",
          lead: "Exactly how you picture it.",
          body: "We design your website from scratch to fit your brand and your customers. Before any code is written, we show you the design and fine-tune every detail with you.",
          lists: [
            {
              points: [
                "Custom design instead of a template",
                "Designed for phone, tablet and desktop",
                "Matched to your colors, fonts and imagery",
                "Accessible to WCAG 2.2 AA",
              ],
            },
          ],
        },
        {
          id: "entwicklung",
          title: "Development",
          lead: "Fast, stable and future-proof.",
          body: "We hand-code every page with Astro or Next.js. Your visitors get prebuilt pages that load instantly. Plugins that constantly need updates never make it onto your site.",
          lists: [
            {
              points: [
                "Hand-built with Astro or Next.js",
                "Fast load times and excellent Core Web Vitals",
                "Forms and features built around your needs",
                "Clean code as the foundation for SEO and accessibility",
              ],
            },
          ],
        },
        {
          id: "launch",
          title: "Launch, domain & hosting",
          lead: "You don't have to worry about a thing.",
          body: "We get your domain, set up hosting and take your site live. Before that, you get a preview link so you can test everything at your own pace. The site only goes online once you're happy.",
          lists: [
            {
              points: [
                "Setup on a new or existing domain",
                "SSL encryption and GDPR-compliant setup",
                "Preview link before launch",
                "Hosting for €5/month, cancel monthly",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "gefunden-werden",
      title: "Getting found.",
      lead: "On Google and in the answers of AI assistants like ChatGPT.",
      items: [
        {
          id: "seo",
          title: "SEO",
          lead: "So Google understands your site and is happy to show it.",
          body: "Search engine optimization makes sure your site shows up on Google when people look for what you offer. Every website we build gets the technical groundwork. If you want to climb higher for specific search terms in your area, we take care of that on an ongoing basis too.",
          lists: [
            {
              title: "Included in every website",
              points: [
                "Page titles and descriptions for every page",
                "Structured data about your business",
                "Sitemap and a clean heading structure",
                "Fast load times that Google rewards",
              ],
            },
            {
              title: "Available on request",
              points: [
                "Research into search terms for your services and area",
                "Setting up and maintaining your Google Business Profile",
                "Content and pages for important search terms",
                "Regular reports on your visibility",
              ],
            },
          ],
          note: "Nobody can honestly guarantee a #1 ranking. Rankings also depend on your content and your competition.",
        },
        {
          id: "geo",
          title: "GEO",
          lead: "So ChatGPT and others mention your business.",
          body: "More and more people ask ChatGPT, Perplexity or Google's AI Overviews instead of clicking through search results. GEO (generative engine optimization) prepares your site so these systems can read it, understand it and cite it as a source. When someone asks for an electrician in Triberg, your business should be in the answer.",
          lists: [
            {
              title: "Included in every website",
              points: [
                "Structured data about your services, location and opening hours",
                "Content that answers typical customer questions directly",
                "AI crawlers are allowed to read your site",
                "llms.txt: a table of contents of your site for AI systems",
              ],
            },
            {
              title: "Available on request",
              points: [
                "Checking what AI assistants say about you today",
                "Expanding the questions and answers on your site",
                "Consistent business details across directories and profiles",
              ],
            },
          ],
          note: "Which sources an AI cites is up to the AI. Nobody can guarantee it, but we make sure your site has the best possible starting point.",
        },
        {
          id: "sea",
          title: "SEA (Google Ads)",
          lead: "Straight to the top of the search results.",
          body: "With paid ads, you appear at the very top of Google, even while your site is still new. We set up your campaigns, agree on search terms and budget with you and keep an eye on costs.",
          lists: [
            {
              points: [
                "Campaign setup in Google Ads",
                "Search terms and ad copy for your area",
                "A landing page that matches the ad",
                "Ongoing optimization of budget and ads",
              ],
            },
          ],
        },
        {
          id: "analytics",
          title: "Analytics & tracking",
          lead: "See what's happening on your site.",
          body: "We set up Google Analytics so nothing is measured until your visitors have agreed. You see where they come from, which pages they read and how often they get in touch.",
          lists: [
            {
              points: [
                "Google Analytics with cookie consent",
                "Tracking key actions like inquiries or calls",
                "Reports that make sense without prior knowledge",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "marke-inhalte",
      title: "Brand & content.",
      lead: "A look your customers recognize.",
      items: [
        {
          id: "corporate-design",
          title: "Corporate design",
          lead: "Logo, colors and fonts that belong together.",
          body: "Jonas works with you on your company's visual identity. You end up with a logo and clear rules for colors and fonts, so your website, business cards and social media all fit together.",
          lists: [
            {
              points: [
                "Logo design",
                "Color palette and font selection",
                "A compact style guide to share",
                "Files for web and print",
              ],
            },
          ],
        },
        {
          id: "foto-video",
          title: "Photo & video production",
          lead: "Your own images instead of stock photos.",
          body: "Together with professional partners, we produce photos and videos for you, from the shoot to finished post-production. Whether it's for your website, social media or advertising: we handle the planning and coordination, and you have just one person to talk to.",
          lists: [
            {
              points: [
                "Photos of your team, premises and work",
                "Brand films and short clips for social media",
                "Full coordination with our partners",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "funktionen",
      title: "Features.",
      lead: "Whatever your website needs to do, we build it in.",
      items: [
        {
          id: "cms",
          title: "CMS",
          lead: "Edit text and images yourself, no coding needed.",
          body: "We set up a content management system tailored exactly to your site. You only see the fields you actually need, for example for opening hours, your team or references.",
          lists: [
            {
              points: [
                "Custom headless CMS",
                "Only the fields you actually edit",
                "Hosting, CMS updates and maintenance included in the CMS plan",
              ],
            },
          ],
        },
        {
          id: "shop-buchung",
          title: "Online store & booking system",
          lead: "Sell and take bookings right on your site.",
          body: "Whether it's products, gift cards or appointments: we add a store or booking system that fits your business and design it to match your website.",
          lists: [
            {
              points: [
                "Online store with cart and checkout",
                "Appointment booking with calendar and confirmation",
                "Designed to match your website",
              ],
            },
          ],
        },
        {
          id: "mehrsprachigkeit",
          title: "Multilingual sites",
          lead: "Your site in English or other languages too.",
          body: "We build your site in several languages, with its own address for each one, so Google files every version correctly. This website is built exactly that way.",
          lists: [
            {
              points: [
                "Its own URL per language, e.g. /en",
                "A language switch that remembers the choice",
                "Language tags (hreflang) for Google",
              ],
            },
          ],
        },
        {
          id: "portale",
          title: "Portals & admin panels",
          lead: "Your own tools for you and your customers.",
          body: "When a website alone isn't enough, we build what your workflow needs: a job application portal, a booking portal for your customers, an admin area for your data or a connection to your newsletter.",
          lists: [
            {
              points: [
                "Job application portal with file upload",
                "Booking portal, e.g. for appointments, rooms or classes",
                "Admin panel for your content and data",
                "Newsletter integration",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "betreuung",
      title: "Ongoing care.",
      lead: "We're still here for you after launch.",
      items: [
        {
          id: "wartung",
          title: "Maintenance & support",
          lead: "Keeps your site secure and up to date.",
          body: "We monitor your site, install security and privacy updates and get in touch if something's wrong. In the bigger plans, we also make changes to your text and images for you.",
          lists: [
            {
              points: [
                "Monitoring and alerts when something's wrong",
                "Security and privacy updates",
                "Your site stays accessible",
                "Content updates depending on your plan",
              ],
            },
          ],
          linkToPrices: true,
        },
      ],
    },
  ],
};
