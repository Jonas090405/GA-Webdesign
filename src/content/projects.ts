/**
 * Projekte & Case Studies – die einzige Stelle, an der Projekte gepflegt werden.
 * Startseite, /projekte und /projekte/:slug lesen alle von hier.
 *
 * NEUES PROJEKT ANLEGEN
 * 1. Medien nach src/imports/projects/<slug>/ legen (Screens als .webp).
 * 2. Unten einen Eintrag in PROJECTS ergänzen (neueste zuerst).
 * 3. `published: false`, solange Texte fehlen. Leere Texte ("") erscheinen
 *    lokal (npm run dev) als gestrichelter Platzhalter, live werden sie
 *    ausgeblendet. Unveröffentlichte Case Studies sind live nicht erreichbar.
 * 4. Wenn alles steht: `published: true` – direkt unter `slug`, weil
 *    scripts/prerender.mjs die Route genau so erkennt. Dann die URL
 *    zusätzlich in public/sitemap.xml eintragen.
 * 5. Englische Fassung unter `en` ergänzen (gleiche Struktur, nur Texte).
 *    Fehlt sie, zeigt /en/projects/<slug> die deutschen Texte.
 */

import { type Lang, localizePath } from "../i18n";
import type { ServiceId } from "./services";

import gcnVideo from "../imports/GCN-Projekt.mp4";
import gcnAvatar from "../imports/gcn-avatar.jpeg";
import gcnHero from "../imports/projects/gcn/home-hero.webp";
// GCN: Loops echter Interaktionen; Standbild = erstes Videobild
import gcnAuftraege from "../imports/projects/gcn/loop-auftraege-poster.webp";
import gcnLoopAuftraege from "../imports/projects/gcn/loop-auftraege.mp4";
import gcnVerkauf from "../imports/projects/gcn/loop-verkauf-poster.webp";
import gcnLoopVerkauf from "../imports/projects/gcn/loop-verkauf.mp4";
import gcnReifenKonfigurator from "../imports/projects/gcn/loop-reifen-poster.webp";
import gcnLoopReifen from "../imports/projects/gcn/loop-reifen.mp4";
import gcnReifenErgebnisse from "../imports/projects/gcn/loop-ergebnisse-poster.webp";
import gcnLoopErgebnisse from "../imports/projects/gcn/loop-ergebnisse.mp4";
import gcnMobileHome from "../imports/projects/gcn/loop-mhome-poster.webp";
import gcnLoopMobileHome from "../imports/projects/gcn/loop-mhome.mp4";
import gcnMobileReifen from "../imports/projects/gcn/loop-mreifen-poster.webp";
import gcnLoopMobileReifen from "../imports/projects/gcn/loop-mreifen.mp4";
import gcnMobileSuche from "../imports/projects/gcn/loop-mkontakt-poster.webp";
import gcnLoopMobileSuche from "../imports/projects/gcn/loop-mkontakt.mp4";

// Your Mask: Loops echter Interaktionen; Standbild = erstes Videobild (kein Sprung beim Start)
import ymHero from "../imports/projects/your-mask/loop-hero-poster.webp";
import ymLoopHero from "../imports/projects/your-mask/loop-hero.mp4";
import ymReferenzen from "../imports/projects/your-mask/loop-referenzen-poster.webp";
import ymLoopReferenzen from "../imports/projects/your-mask/loop-referenzen.mp4";
import ymPackungen from "../imports/projects/your-mask/loop-packungen-poster.webp";
import ymLoopPackungen from "../imports/projects/your-mask/loop-packungen.mp4";
import ymProdukt from "../imports/projects/your-mask/loop-produkt-poster.webp";
import ymLoopProdukt from "../imports/projects/your-mask/loop-produkt.mp4";
import ymStaffel from "../imports/projects/your-mask/loop-staffel-poster.webp";
import ymLoopStaffel from "../imports/projects/your-mask/loop-staffel.mp4";
import ymBelege from "../imports/projects/your-mask/loop-belege-poster.webp";
import ymLoopBelege from "../imports/projects/your-mask/loop-belege.mp4";
import ymProduktion from "../imports/projects/your-mask/loop-produktion-poster.webp";
import ymLoopProduktion from "../imports/projects/your-mask/loop-produktion.mp4";
import ymMobileShop from "../imports/projects/your-mask/loop-mshop-poster.webp";
import ymLoopMobileShop from "../imports/projects/your-mask/loop-mshop.mp4";
import ymMobileProduktion from "../imports/projects/your-mask/loop-mproduktion-poster.webp";
import ymLoopMobileProduktion from "../imports/projects/your-mask/loop-mproduktion.mp4";
import ymMobileGrosskunden from "../imports/projects/your-mask/loop-mgrosskunden-poster.webp";
import ymLoopMobileGrosskunden from "../imports/projects/your-mask/loop-mgrosskunden.mp4";

export type Screen = {
  /** Standbild (auch Poster des Videos). */
  src: string;
  alt: string;
  /** Kurzer Loop einer echten Interaktion; ersetzt das Standbild, sobald er läuft. */
  video?: string;
};

export type Testimonial = {
  /** Volles Zitat für die Case Study, Absätze mit Leerzeile trennen. */
  quote: string;
  /** Kurzzitat (1–2 Sätze) für Startseite und Übersicht. Ohne = volles Zitat. */
  short?: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
};

export type SolutionBlock = {
  title: string;
  text: string;
  /** Desktop-Screenshots neben dem Text, optional (ohne = reiner Textblock). */
  screens?: Screen[];
};

/**
 * Englische Texte eines Projekts. Bilder, Kunde, Jahr und URL bleiben gleich;
 * Alt-Texte stehen in derselben Reihenfolge wie die Screens.
 */
export type ProjectText = {
  /** Nur nötig, wenn der Projekttitel übersetzt werden soll. */
  title?: string;
  industry: string;
  location: string;
  summary: string;
  coverAlt: string;
  testimonial?: { quote: string; short?: string; role: string };
  caseStudy: {
    challenge: string;
    goal?: string;
    solution: { title: string; text: string; screenAlts?: string[] }[];
    result: string;
    mobileAlts?: string[];
  };
};

export type Project = {
  slug: string;
  /** false = Case Study live nicht erreichbar, Platzhalter nur lokal sichtbar. */
  published: boolean;
  title: string;
  client: string;
  industry: string;
  location: string;
  year: string;
  /** Live-Webseite des Kunden. */
  url?: string;
  /** 1–2 Sätze für Karten und Startseite. */
  summary: string;
  /** Was wir gemacht haben, in den Kategorien von /leistungen (Titel und Illustration kommen von dort). */
  services: ServiceId[];
  /** Titelbild für Übersicht (Desktop-Screenshot). */
  cover: Screen;
  /** Loop-Video für Startseite und Case-Study-Kopf. */
  video?: string;
  testimonial?: Testimonial;
  caseStudy: {
    /** Ausgangslage: Was war das Problem? */
    challenge: string;
    /** Was sollte am Ende stehen? Optional. */
    goal?: string;
    /** Was wir gebaut haben, Block für Block. */
    solution: SolutionBlock[];
    /** Was sich verändert hat. Zahlen nur, wenn belegbar. */
    result: string;
    /** Smartphone-Ansichten, 2–3 Stück. */
    mobile?: Screen[];
  };
  /** Englische Fassung der Texte (siehe ProjectText). */
  en?: ProjectText;
};

export const PROJECTS: Project[] = [
  {
    slug: "your-mask",
    published: true,
    title: "Your Mask",
    client: "YOUR MASK GmbH",
    industry: "FFP2-Atemschutzmasken",
    location: "Berlin · Bad Dürrheim",
    year: "2026",
    url: "https://www.yourmask-berlin.de/",
    summary:
      "Neuer Auftritt für einen FFP2-Hersteller aus dem Schwarzwald: Website und Shop für Kliniken und Privatkunden in einem, eine Markenguideline, SEO und Google Ads, dazu der komplette Mailverkehr von der eigenen Adresse bis zur Bestellbestätigung.",
    services: [
      "corporate-design",
      "webdesign",
      "entwicklung",
      "shop-buchung",
      "mehrsprachigkeit",
      "seo",
      "geo",
      "sea",
      "email",
      "launch",
      "wartung",
    ],
    cover: { src: ymHero, alt: "Startseite von yourmask-berlin.de mit der PREMIUM FFP2 YOU-M4 und dem DEKRA-Siegel" },
    video: ymLoopHero,
    testimonial: {
      quote:
        "Wir von YOUR MASK sind rundum begeistert von G&A Webdesign! Unser Online-Shop lag eine Zeit lang auf Eis, und G&A hat ihn komplett neu aufgesetzt. Herausgekommen ist ein modernes, individuelles Design, das unsere Masken richtig zur Geltung bringt, mit einem schnellen eigenen Frontend und einem sauberen Shopify-Checkout im Hintergrund.\n\nBesonders schätzen wir die Zusammenarbeit: Das Team von G&A ist immer erreichbar, antwortet schnell, erklärt alles verständlich und denkt mit. Ideen und Änderungswünsche werden unkompliziert umgesetzt, und auch nach dem Livegang kümmert sich G&A zuverlässig um Hosting und Betreuung. Man merkt, dass hier mit Herzblut gearbeitet wird.\n\nWir fühlen uns bestens aufgehoben und können G&A Webdesign jedem empfehlen, der einen professionellen Webauftritt oder Online-Shop sucht. Vielen Dank für die tolle Arbeit!",
      short:
        "Unser Online-Shop lag eine Zeit lang auf Eis, und G&A hat ihn komplett neu aufgesetzt. Wir fühlen uns bestens aufgehoben und können G&A Webdesign jedem empfehlen.",
      name: "Dogan Yüksel",
      role: "Geschäftsführung",
      company: "YOUR MASK",
    },
    caseStudy: {
      challenge:
        "Your Mask wurde im Sommer 2020 in Berlin gegründet, mitten in der Pandemie und mit einem klaren Anspruch: Jeder Mensch sollte die Möglichkeit haben, hochwertige Masken zu tragen. Heute fertigt das Unternehmen die PREMIUM FFP2 YOU-M4 auf eigenen Linien in Bad Dürrheim im Schwarzwald. Mehr als jede zehnte Klinik in Deutschland hat die Maske bereits bezogen, über 300 Klinik-Standorte wurden beliefert.\n\nOnline war davon wenig zu sehen. Bilder und Siegel auf der alten Seite waren veraltet, Großkunden bestellten in einem eigenen B2B-Shop unter einer zweiten Adresse, und um den Online-Shop war es nach der Pandemie ruhig geworden. Wer als Einkäufer einer Klinik Norm, Prüfstelle und Zertifikat suchte, musste sich durch lange Textseiten klicken.",
      goal:
        "Eine Seite, die Einkäufer im Gesundheitswesen in Sekunden überzeugt und Privatkunden genauso bequem bestellen lässt: Referenzen und Belege ganz vorne, Bestellen von überall mit einem Klick.",
      solution: [
        {
          title: "Referenzen auf den ersten Blick",
          text: "Direkt unter dem Einstieg stehen die Siegel, gleich danach die Referenzen: 55 Logos von Klinikträgern wie Vivantes, Asklepios und dem Universitätsklinikum Heidelberg, dazu die Kennzahlen, die im Einkauf zählen. Für eine Klinik ist das der stärkste Beleg, deshalb bekommt er den prominentesten Platz.",
          screens: [{ src: ymReferenzen, video: ymLoopReferenzen, alt: "Referenzbereich mit Kennzahlen und Logos von Kliniken auf yourmask-berlin.de" }],
        },
        {
          title: "Ein Shop für Klinik und Privatkunden",
          text: "Box, Big Pack, Umkarton und Palette stehen mit Packungs- und Stückpreis schon auf der Startseite und landen mit einem Klick im Warenkorb. Die Shop-Oberfläche haben wir selbst gebaut, bezahlt wird über den Shopify-Checkout mit PayPal, Klarna, Kreditkarte, Apple Pay und Google Pay. Das Kundenkonto kommt ohne Passwort aus, angemeldet wird per Code aus der E-Mail. Geliefert wird nach Deutschland, Österreich und in die Schweiz.",
          screens: [
            { src: ymPackungen, video: ymLoopPackungen, alt: "Packungsgrößen der YOU-M4 mit Preisen auf der Startseite" },
            { src: ymProdukt, video: ymLoopProdukt, alt: "Produktseite der PREMIUM FFP2 YOU-M4 mit Prüfzeichen und Packungsauswahl" },
          ],
        },
        {
          title: "Großkunden ohne zweiten Shop",
          text: "Staffelpreise stehen offen in einer Tabelle, ab einer Palette erstellt Your Mask ein Angebot mit festem Liefertermin, auf Wunsch als Rahmenvertrag. Bestellreferenz, Kostenstelle und USt-IdNr. lassen sich direkt im Warenkorb angeben. Der frühere B2B-Shop ist darin aufgegangen, seine Adressen leiten auf die neue Seite weiter.",
          screens: [{ src: ymStaffel, video: ymLoopStaffel, alt: "Staffelpreise für Großkunden in einer Tabelle von Box bis Palette" }],
        },
        {
          title: "Belege statt Versprechen",
          text: "Fünf Stationen führen vom Material bis zur Klinik, jede mit Prüfstelle und Nachweis: Oeko-Tex, DEKRA, EN 149 und Dermatest. Auf der Produktionsseite zeigen acht Schritte die Fertigung in Bad Dürrheim, vom Vlies bis zum Umkarton, mit Bildern aus dem eigenen Produktionsfilm.",
          screens: [
            { src: ymBelege, video: ymLoopBelege, alt: "Prüfpfad mit fünf Stationen von Material bis Klinik" },
            { src: ymProduktion, video: ymLoopProduktion, alt: "Fertigung der YOU-M4 in acht Schritten auf der Produktionsseite" },
          ],
        },
        {
          title: "Ein Außenauftritt mit klaren Regeln",
          text: "Damit Website, Mails und Newsletter überall gleich auftreten, haben wir eine Markenguideline geschrieben: Logo, Farben mit dem Logo-Rot als einzigem Akzent, Typografie, eine Bildsprache mit eigenen Line-Art-Illustrationen und ein Ton, der sachlich bleibt und trotzdem verkauft. Jede neue Seite und jede Mail richtet sich danach.",
        },
        {
          title: "Gefunden werden: SEO und Google Ads",
          text: "Die Seite ist zweisprachig, sauber gegliedert und mit strukturierten Daten für Produkt, Preise, Versand und Unternehmen ausgezeichnet. Alle alten Shop-Adressen leiten dauerhaft auf die passenden neuen Seiten weiter, damit keine Rankings verloren gehen, und eine llms.txt hilft KI-Suchen, die Maske richtig zu beschreiben. Parallel läuft eine Google-Ads-Kampagne, die Suchende direkt in den Shop und auf die Großkunden-Seite führt.",
        },
        {
          title: "Der komplette Mailverkehr",
          text: "Wir haben den gesamten Mailverkehr eingerichtet: eigene Adressen für Bestellungen, Presse und Bewerbungen, dazu SPF, DKIM und DMARC, damit Mails zuverlässig ankommen statt im Spam zu landen. Jedes Formular verschickt eine Bestätigung, der Newsletter läuft mit Double-Opt-in, und alle Shop-Mails von der Bestellbestätigung bis zur Erstattung tragen das Your-Mask-Design, auf Deutsch und Englisch. Newsletter und Blog betreuen wir weiter selbst.",
        },
      ],
      result:
        "Seit Ende Oktober 2026 ist die neue Seite live, und Your Mask ist wieder online bestellbar, für Kliniken genauso wie für Privatkunden. Aus zwei Shops ist einer geworden. Einkäufer finden Norm, Prüfstelle und Bestellweg auf einen Blick, und die Referenzen, die Your Mask seit 2020 gesammelt hat, stehen jetzt dort, wo sie wirken.\n\nIm Hintergrund läuft der Alltag automatisch: Bestellungen, Anfragen, Bestätigungen und Newsletter gehen zuverlässig raus, alle im eigenen Design.",
      mobile: [
        { src: ymMobileShop, video: ymLoopMobileShop, alt: "Packungsauswahl auf der Produktseite am Smartphone" },
        { src: ymMobileProduktion, video: ymLoopMobileProduktion, alt: "Fertigung in acht Schritten am Smartphone" },
        { src: ymMobileGrosskunden, video: ymLoopMobileGrosskunden, alt: "Großkunden-Seite mit Referenzen am Smartphone" },
      ],
    },
    en: {
      industry: "FFP2 respirators",
      location: "Berlin · Bad Dürrheim",
      summary:
        "A new presence for an FFP2 manufacturer from the Black Forest: one website and shop for hospitals and private customers, a brand guideline, SEO and Google Ads, plus the entire email setup from their own addresses to order confirmations.",
      testimonial: {
        quote:
          "We at YOUR MASK are absolutely thrilled with G&A Webdesign! Our online shop had been on hold for a while, and G&A rebuilt it from the ground up. The result is a modern, individual design that really shows off our masks, with a fast custom frontend and a clean Shopify checkout in the background.\n\nWhat we value most is the collaboration: the G&A team is always available, replies quickly, explains everything clearly and thinks ahead. Ideas and change requests are put into practice without any fuss, and even after launch G&A reliably takes care of hosting and support. You can tell they put their heart into their work.\n\nWe feel we are in the best hands and can recommend G&A Webdesign to anyone looking for a professional website or online shop. Thank you for the great work!",
        short:
          "Our online shop had been on hold for a while, and G&A rebuilt it from the ground up. We feel we are in the best hands and can recommend G&A Webdesign to anyone.",
        role: "Managing Director",
      },
      coverAlt: "Homepage of yourmask-berlin.de with the PREMIUM FFP2 YOU-M4 and the DEKRA seal",
      caseStudy: {
        challenge:
          "Your Mask was founded in Berlin in the summer of 2020, in the middle of the pandemic, with a clear ambition: everyone should have access to high-quality masks. Today the company makes the PREMIUM FFP2 YOU-M4 on its own production lines in Bad Dürrheim in the Black Forest. More than one in ten hospitals in Germany has already sourced the mask, and over 300 hospital sites have been supplied.\n\nLittle of that showed online. Images and seals on the old site were out of date, large customers ordered from a separate B2B shop on a second domain, and the online shop had gone quiet after the pandemic. Hospital buyers looking for the standard, the testing body and the certificate had to click through long pages of text.",
        goal:
          "A site that convinces healthcare buyers within seconds and lets private customers order just as easily: references and proof up front, ordering one click away from anywhere.",
        solution: [
          {
            title: "References at first glance",
            text: "Right below the opening sit the seals, followed by the references: 55 logos of hospital operators such as Vivantes, Asklepios and Heidelberg University Hospital, along with the figures that matter in procurement. For a hospital this is the strongest proof, so it gets the most prominent spot.",
            screenAlts: ["Reference section with key figures and hospital logos on yourmask-berlin.de"],
          },
          {
            title: "One shop for hospitals and private customers",
            text: "Box, big pack, carton and pallet are listed with pack and unit prices right on the homepage and go into the cart with one click. We built the shop interface ourselves; payment runs through the Shopify checkout with PayPal, Klarna, credit card, Apple Pay and Google Pay. The customer account needs no password, sign-in works with a code sent by email. Delivery covers Germany, Austria and Switzerland.",
            screenAlts: [
              "YOU-M4 pack sizes with prices on the homepage",
              "Product page of the PREMIUM FFP2 YOU-M4 with test marks and pack selection",
            ],
          },
          {
            title: "Large customers without a second shop",
            text: "Volume prices are shown openly in a table, and from one pallet upwards Your Mask prepares a quote with a fixed delivery date, as a framework agreement if needed. Order reference, cost centre and VAT ID can be entered right in the cart. The former B2B shop has been merged in, and its addresses redirect to the new site.",
            screenAlts: ["Volume prices for large customers in a table from box to pallet"],
          },
          {
            title: "Proof instead of promises",
            text: "Five stations lead from material to hospital, each with its testing body and evidence: Oeko-Tex, DEKRA, EN 149 and Dermatest. On the production page, eight steps show how the mask is made in Bad Dürrheim, from nonwoven to carton, with stills from the company's own production film.",
            screenAlts: [
              "Five-station proof path from material to hospital",
              "Production of the YOU-M4 in eight steps on the production page",
            ],
          },
          {
            title: "A brand presence with clear rules",
            text: "To make the website, emails and newsletter look the same everywhere, we wrote a brand guideline: logo, colours with the logo red as the only accent, typography, an image style with custom line-art illustrations and a tone that stays factual while still selling. Every new page and every email follows it.",
          },
          {
            title: "Getting found: SEO and Google Ads",
            text: "The site is bilingual, clearly structured and marked up with structured data for product, prices, shipping and company. All old shop addresses permanently redirect to the matching new pages so no rankings are lost, and an llms.txt helps AI search describe the mask correctly. Alongside, a Google Ads campaign takes searchers straight to the shop and the page for large customers.",
          },
          {
            title: "The entire email setup",
            text: "We set up all of the email: dedicated addresses for orders, press and applications, plus SPF, DKIM and DMARC so emails reliably arrive instead of landing in spam. Every form sends a confirmation, the newsletter runs with double opt-in, and all shop emails from order confirmation to refund carry the Your Mask design, in German and English. We keep running the newsletter and blog ourselves.",
          },
        ],
        result:
          "The new site has been live since the end of October 2026, and Your Mask can be ordered online again, by hospitals and private customers alike. Two shops have become one. Buyers find the standard, testing body and way to order at a glance, and the references Your Mask has collected since 2020 now sit where they make an impact.\n\nBehind the scenes, everyday work runs automatically: orders, inquiries, confirmations and newsletters go out reliably, all in the company's own design.",
        mobileAlts: [
          "Pack selection on the product page on a smartphone",
          "Production in eight steps on a smartphone",
          "Page for large customers with references on a smartphone",
        ],
      },
    },
  },
  {
    slug: "gcn-fahrzeughandel",
    published: true,
    title: "GCN-Fahrzeughandel",
    client: "GCN Fahrzeughandel GbR",
    industry: "Fahrzeughandel",
    location: "St. Georgen im Schwarzwald",
    year: "2026",
    url: "https://gcn-fahrzeughandel.de/",
    summary:
      "Vom Corporate Design bis zur kompletten Web-Plattform: Auftritt mit eigener Bildwelt, Such- und Verkaufsaufträge, ein Reifen-Shop mit selbst gebautem Bestellprozess und ein Admin-Dashboard für Kunden, Umsätze und Dokumente.",
    services: ["corporate-design", "webdesign", "entwicklung", "shop-buchung", "portale", "email", "launch", "wartung"],
    cover: { src: gcnHero, alt: "Startseite von gcn-fahrzeughandel.de mit gezeichneter Schwarzwaldstraße" },
    video: gcnVideo,
    testimonial: {
      quote:
        "Die Zusammenarbeit war von Anfang bis Ende reibungslos. Unsere Vorstellungen wurden genau verstanden und eine Webseite gebaut, die wirklich zu uns passt. Außerdem erleichtert unser neues Admin-Panel die Verwaltung unserer Kunden erheblich.",
      short:
        "Unsere Vorstellungen wurden genau verstanden und eine Webseite gebaut, die wirklich zu uns passt.",
      name: "Giosue Canobbio",
      role: "Geschäftsführer",
      company: "GCN-Fahrzeughandel",
      avatar: gcnAvatar,
    },
    caseStudy: {
      challenge:
        "Vor dem Projekt hatte GCN weder eine Webseite noch einen eigenen Auftritt – kein Corporate Design, nichts, woran man das Unternehmen wiedererkennt.\n\nIm Alltag lief vieles von Hand. Anfragen, Kundendaten und Unterlagen an einem Ort zusammenzuhalten, war kompliziert, und den Überblick über alle Kunden zu behalten, kostete jeden Tag Zeit.",
      goal:
        "Ein Auftritt, an dem man GCN sofort wiedererkennt, und eine Plattform, die Anfragen, Kunden und Reifenbestellungen an einem Ort bündelt, damit im Alltag nichts mehr von Hand zusammengesucht werden muss.",
      solution: [
        {
          title: "Drei Aufträge, ein klarer Einstieg",
          text: "Suchauftrag, Fahrzeugverkauf und Reifen stehen gleichwertig nebeneinander, jeder mit eigener Illustration und einem direkten Weg zum passenden Formular. Dazu eine gezeichnete Bildwelt mit einer Fahrt durch den Schwarzwald, die den Auftritt unverwechselbar macht.",
          screens: [{ src: gcnAuftraege, video: gcnLoopAuftraege, alt: "Übersicht der drei Aufträge Suchauftrag, Fahrzeugverkauf und Reifen" }],
        },
        {
          title: "Such- und Verkaufsaufträge in drei Minuten",
          text: "Kunden hinterlegen ihren Suchauftrag oder bieten ihr Fahrzeug direkt online an. Die Formulare fragen genau das ab, was GCN für die Einschätzung braucht. Jede Anfrage landet sofort beim Team, und der Kunde bekommt eine Eingangsbestätigung per E-Mail.",
          screens: [{ src: gcnVerkauf, video: gcnLoopVerkauf, alt: "Formular für einen Verkaufsauftrag auf gcn-fahrzeughandel.de" }],
        },
        {
          title: "Reifen-Shop mit über 60.000 Reifen",
          text: "Ein Größen-Konfigurator zeigt die gewählte Reifengröße live als Zeichnung. Über 60.000 Reifen in mehr als 600 Größen kommen direkt aus dem Katalog des Großhändlers und werden alle zehn Minuten aktualisiert, filterbar nach Saison und Marke, mit EU-Reifenlabel. Warenkorb und Bestellprozess haben wir selbst gebaut: Bezahlt wird über Stripe, GCN prüft jede Bestellung und nimmt sie mit einem Klick aus der E-Mail an.",
          screens: [
            { src: gcnReifenKonfigurator, video: gcnLoopReifen, alt: "Reifen-Konfigurator mit Größenauswahl und Live-Zeichnung" },
            { src: gcnReifenErgebnisse, video: gcnLoopErgebnisse, alt: "Suchergebnisse im Reifen-Shop mit Preisen, EU-Label und Warenkorb" },
          ],
        },
        {
          title: "Admin-Dashboard für den Alltag",
          text: "Hinter der Seite steckt ein eigenes Dashboard: Kunden verwalten, Umsätze im Blick behalten und Dokumente hochladen, alles an einem Ort und nur für berechtigte Admins zugänglich.",
          // Kein Screenshot: Das Dashboard ist nicht öffentlich. Bei Bedarf
          // einen anonymisierten Screen ergänzen.
        },
        {
          title: "Schnelles Hosting, Mails von der eigenen Domain",
          text: "Wir haben die Seite auf schnelles Hosting umgezogen und den Mailversand auf die eigene Domain gestellt, sauber authentifiziert, damit Anfragen und Bestätigungen zuverlässig ankommen. Seitdem betreuen wir die Plattform laufend.",
        },
      ],
      result:
        "Heute läuft alles an einem Ort. Anfragen aus den Formularen gehen automatisch ein, Kunden werden im Dashboard verwaltet, Dokumente direkt dort hochgeladen. Das vereinfacht den Arbeitsalltag enorm.\n\nÜber die Webseite und ihre Formulare kommen laufend neue Leads herein. Mit dem Reifen-Shop ist eine komplett neue Umsatzquelle dazugekommen: Aus dem reinen Fahrzeughändler ist ein Anbieter geworden, der Suche, Verkauf und Reifen aus einer Hand bietet.\n\nUnd zum ersten Mal tritt GCN mit einem eigenen Corporate Design auf – einheitlich, wiedererkennbar und mit einer Bildwelt, die zum Schwarzwald passt.",
      mobile: [
        { src: gcnMobileHome, video: gcnLoopMobileHome, alt: "Startseite mit Schwarzwald-Fahrt und den drei Aufträgen auf dem Smartphone" },
        { src: gcnMobileReifen, video: gcnLoopMobileReifen, alt: "Reifen-Konfigurator auf dem Smartphone" },
        { src: gcnMobileSuche, video: gcnLoopMobileSuche, alt: "Suchauftrag auf dem Smartphone" },
      ],
    },
    en: {
      industry: "Car dealership",
      location: "St. Georgen, Black Forest",
      summary:
        "From corporate design to a complete web platform: a brand with its own visual world, search and sell requests, a tire shop with a custom-built checkout and an admin dashboard for customers, revenue and documents.",
            coverAlt: "Homepage of gcn-fahrzeughandel.de with an illustrated Black Forest road",
      testimonial: {
        quote:
          "Working together was smooth from start to finish. They understood exactly what we had in mind and built a website that truly fits us. And our new admin panel makes managing our customers so much easier.",
        short: "They understood exactly what we had in mind and built a website that truly fits us.",
        role: "Managing Director",
      },
      caseStudy: {
        challenge:
          "Before the project, GCN had neither a website nor a brand of its own – no corporate design, nothing that made the business recognizable.\n\nA lot of the daily work was done by hand. Keeping inquiries, customer data and paperwork together in one place was complicated, and keeping track of every customer took time every single day.",
        goal:
          "A brand that makes GCN instantly recognizable, and a platform that brings inquiries, customers and tire orders together in one place, so nothing has to be pieced together by hand anymore.",
        solution: [
          {
            title: "Three services, one clear way in",
            text: "Car search, selling your car and tires sit side by side as equals, each with its own illustration and a direct path to the right form. On top of that, an illustrated visual world with a drive through the Black Forest makes the brand unmistakable.",
            screenAlts: ["Overview of the three services: car search, selling your car and tires"],
          },
          {
            title: "Search and sell requests in three minutes",
            text: "Customers submit a search request or offer their car for sale right online. The forms ask for exactly what GCN needs to make an assessment. Every inquiry reaches the team instantly, and the customer gets a confirmation by email.",
            screenAlts: ["Form for selling a car on gcn-fahrzeughandel.de"],
          },
          {
            title: "A tire shop with over 60,000 tires",
            text: "A size configurator shows the selected tire size as a live drawing. Over 60,000 tires in more than 600 sizes come straight from the wholesaler's catalog and update every ten minutes, filterable by season and brand, with the EU tire label. We built the cart and checkout ourselves: payment runs through Stripe, and GCN reviews every order and accepts it with one click from the email.",
            screenAlts: [
              "Tire configurator with size selection and live drawing",
              "Tire shop search results with prices, EU label and cart",
            ],
          },
          {
            title: "An admin dashboard for everyday work",
            text: "Behind the site sits a custom dashboard: manage customers, keep an eye on revenue and upload documents, all in one place and accessible only to authorized admins.",
          },
          {
            title: "Fast hosting, emails from their own domain",
            text: "We moved the site to fast hosting and switched email sending to the company's own domain, properly authenticated so inquiries and confirmations arrive reliably. We have been looking after the platform ever since.",
          },
        ],
        result:
          "Today everything runs in one place. Inquiries from the forms come in automatically, customers are managed in the dashboard and documents are uploaded right there. That makes everyday work a whole lot easier.\n\nNew leads keep coming in through the website and its forms. The tire shop has added a completely new source of revenue: the car dealer has become a one-stop shop for car search, sales and tires.\n\nAnd for the first time, GCN has a corporate design of its own – consistent, recognizable and with a visual world that fits the Black Forest.",
        mobileAlts: [
          "Homepage with the Black Forest drive and the three services on a smartphone",
          "Tire configurator on a smartphone",
          "Search request on a smartphone",
        ],
      },
    },
  },
];

/** Live nur veröffentlichte Case Studies, lokal alle (zum Befüllen). */
export const isVisible = (p: Project) => p.published || import.meta.env.DEV;

export const VISIBLE_PROJECTS = PROJECTS.filter(isVisible);

/** Pfad der Case Study, für Englisch unter /en/projects/<slug>. */
export const projectPath = (p: Project, lang: Lang = "de") =>
  localizePath(`/projekte/${p.slug}`, lang);

/**
 * Projekt mit den Texten der gewünschten Sprache. Ohne `en`-Fassung bleibt
 * es deutsch. Mehrfaches Anwenden ist unschädlich.
 */
export function localizeProject(p: Project, lang: Lang): Project {
  const en = p.en;
  if (lang === "de" || !en) return p;
  return {
    ...p,
    title: en.title ?? p.title,
    industry: en.industry,
    location: en.location,
    summary: en.summary,
    cover: { ...p.cover, alt: en.coverAlt },
    testimonial: p.testimonial && {
      ...p.testimonial,
      ...(en.testimonial ?? {}),
    },
    caseStudy: {
      ...p.caseStudy,
      challenge: en.caseStudy.challenge,
      goal: en.caseStudy.goal ?? p.caseStudy.goal,
      solution: p.caseStudy.solution.map((block, i) => {
        const b = en.caseStudy.solution[i];
        if (!b) return block;
        return {
          ...block,
          title: b.title,
          text: b.text,
          screens: block.screens?.map((s, j) => ({ ...s, alt: b.screenAlts?.[j] ?? s.alt })),
        };
      }),
      result: en.caseStudy.result,
      mobile: p.caseStudy.mobile?.map((m, i) => ({ ...m, alt: en.caseStudy.mobileAlts?.[i] ?? m.alt })),
    },
  };
}

export const findProject = (slug?: string) => PROJECTS.find((p) => p.slug === slug);
