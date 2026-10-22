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

import gcnVideo from "../imports/GCN-Projekt.mp4";
import gcnAvatar from "../imports/gcn-avatar.jpeg";
import gcnHero from "../imports/projects/gcn/home-hero.webp";
import gcnAuftraege from "../imports/projects/gcn/home-auftraege.webp";
import gcnReifenKonfigurator from "../imports/projects/gcn/reifen-konfigurator.webp";
import gcnReifenErgebnisse from "../imports/projects/gcn/reifen-ergebnisse.webp";
import gcnVerkauf from "../imports/projects/gcn/verkauf-formular.webp";
import gcnMobileHome from "../imports/projects/gcn/mobile-home.webp";
import gcnMobileReifen from "../imports/projects/gcn/mobile-reifen.webp";
import gcnMobileSuche from "../imports/projects/gcn/mobile-suchauftrag.webp";

export type Screen = { src: string; alt: string };

export type Testimonial = {
  quote: string;
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
  services: string[];
  coverAlt: string;
  testimonial?: { quote: string; role: string };
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
  /** Was wir gemacht haben – erscheint als Liste. */
  services: string[];
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
    services: [
      "Corporate Design",
      "Konzept & Webdesign",
      "Entwicklung",
      "Reifen-Shop & Bestellprozess",
      "Admin-Dashboard",
      "E-Mail-Benachrichtigungen",
    ],
    cover: { src: gcnHero, alt: "Startseite von gcn-fahrzeughandel.de mit gezeichneter Schwarzwaldstraße" },
    video: gcnVideo,
    testimonial: {
      quote:
        "Die Zusammenarbeit war von Anfang bis Ende reibungslos. Unsere Vorstellungen wurden genau verstanden und eine Webseite gebaut, die wirklich zu uns passt. Außerdem erleichtert unser neues Admin-Panel die Verwaltung unserer Kunden erheblich.",
      name: "Giosue Canobbio",
      role: "Geschäftsführer",
      company: "GCN-Fahrzeughandel",
      avatar: gcnAvatar,
    },
    caseStudy: {
      challenge:
        "Vor dem Projekt hatte GCN weder eine Webseite noch einen eigenen Auftritt – kein Corporate Design, nichts, woran man das Unternehmen wiedererkennt.\n\nIm Alltag lief vieles von Hand. Anfragen, Kundendaten und Unterlagen an einem Ort zusammenzuhalten, war kompliziert, und den Überblick über alle Kunden zu behalten, kostete jeden Tag Zeit.",
      solution: [
        {
          title: "Drei Aufträge, ein klarer Einstieg",
          text: "Suchauftrag, Fahrzeugverkauf und Reifen stehen gleichwertig nebeneinander – jeder mit eigener Illustration und einem direkten Weg zum passenden Formular. Dazu eine gezeichnete Bildwelt mit einer Fahrt durch den Schwarzwald, die den Auftritt unverwechselbar macht.",
          screens: [{ src: gcnAuftraege, alt: "Übersicht der drei Aufträge Suchauftrag, Fahrzeugverkauf und Reifen" }],
        },
        {
          title: "Such- und Verkaufsaufträge in drei Minuten",
          text: "Kunden hinterlegen ihren Suchauftrag oder bieten ihr Fahrzeug direkt online an. Die Formulare fragen genau das ab, was GCN für die Einschätzung braucht, und jede Anfrage landet automatisch per E-Mail beim Team.",
          screens: [{ src: gcnVerkauf, alt: "Formular für einen Verkaufsauftrag auf gcn-fahrzeughandel.de" }],
        },
        {
          title: "Reifen-Shop mit eigenem Bestellprozess",
          text: "Ein Größen-Konfigurator zeigt die gewählte Reifengröße live als Zeichnung. Preise und Bestände kommen tagesaktuell vom Großhandelspartner, gefiltert nach Saison und Marke, mit EU-Reifenlabel. Warenkorb und Bestellprozess haben wir komplett selbst gebaut.",
          screens: [
            { src: gcnReifenKonfigurator, alt: "Reifen-Konfigurator mit Größenauswahl und Live-Zeichnung" },
            { src: gcnReifenErgebnisse, alt: "Suchergebnisse im Reifen-Shop mit Preisen, EU-Label und Warenkorb" },
          ],
        },
        {
          title: "Admin-Dashboard für den Alltag",
          text: "Hinter der Seite steckt ein eigenes Dashboard: Kunden verwalten, Umsätze im Blick behalten und Dateien hochladen – alles an einem Ort.",
          // Kein Screenshot: Das Dashboard ist nicht öffentlich. Bei Bedarf
          // einen anonymisierten Screen ergänzen.
        },
      ],
      result:
        "Heute läuft alles an einem Ort. Anfragen aus den Formularen gehen automatisch ein, Kunden werden im Dashboard verwaltet, Dokumente direkt dort hochgeladen. Das vereinfacht den Arbeitsalltag enorm.\n\nÜber die Webseite und ihre Formulare kommen laufend neue Leads herein. Mit dem Reifen-Shop ist eine komplett neue Umsatzquelle dazugekommen: Aus dem reinen Fahrzeughändler ist ein Anbieter geworden, der Suche, Verkauf und Reifen aus einer Hand bietet.\n\nUnd zum ersten Mal tritt GCN mit einem eigenen Corporate Design auf – einheitlich, wiedererkennbar und mit einer Bildwelt, die zum Schwarzwald passt.",
      mobile: [
        { src: gcnMobileHome, alt: "Startseite auf dem Smartphone" },
        { src: gcnMobileSuche, alt: "Suchauftrag auf dem Smartphone" },
        { src: gcnMobileReifen, alt: "Reifen-Konfigurator auf dem Smartphone" },
      ],
    },
    en: {
      industry: "Car dealership",
      location: "St. Georgen, Black Forest",
      summary:
        "From corporate design to a complete web platform: a brand with its own visual world, search and sell requests, a tire shop with a custom-built checkout and an admin dashboard for customers, revenue and documents.",
      services: [
        "Corporate design",
        "Concept & web design",
        "Development",
        "Tire shop & checkout",
        "Admin dashboard",
        "Email notifications",
      ],
      coverAlt: "Homepage of gcn-fahrzeughandel.de with an illustrated Black Forest road",
      testimonial: {
        quote:
          "Working together was smooth from start to finish. They understood exactly what we had in mind and built a website that truly fits us. And our new admin panel makes managing our customers so much easier.",
        role: "Managing Director",
      },
      caseStudy: {
        challenge:
          "Before the project, GCN had neither a website nor a brand of its own – no corporate design, nothing that made the business recognizable.\n\nA lot of the daily work was done by hand. Keeping inquiries, customer data and paperwork together in one place was complicated, and keeping track of every customer took time every single day.",
        solution: [
          {
            title: "Three services, one clear way in",
            text: "Car search, selling your car and tires sit side by side as equals – each with its own illustration and a direct path to the right form. On top of that, an illustrated visual world with a drive through the Black Forest makes the brand unmistakable.",
            screenAlts: ["Overview of the three services: car search, selling your car and tires"],
          },
          {
            title: "Search and sell requests in three minutes",
            text: "Customers submit a search request or offer their car for sale right online. The forms ask for exactly what GCN needs to make an assessment, and every inquiry reaches the team automatically by email.",
            screenAlts: ["Form for selling a car on gcn-fahrzeughandel.de"],
          },
          {
            title: "A tire shop with its own checkout",
            text: "A size configurator shows the selected tire size as a live drawing. Prices and stock come straight from the wholesale partner, updated daily and filtered by season and brand, with the EU tire label. We built the cart and checkout entirely ourselves.",
            screenAlts: [
              "Tire configurator with size selection and live drawing",
              "Tire shop search results with prices, EU label and cart",
            ],
          },
          {
            title: "An admin dashboard for everyday work",
            text: "Behind the site sits a custom dashboard: manage customers, keep an eye on revenue and upload files – all in one place.",
          },
        ],
        result:
          "Today everything runs in one place. Inquiries from the forms come in automatically, customers are managed in the dashboard and documents are uploaded right there. That makes everyday work a whole lot easier.\n\nNew leads keep coming in through the website and its forms. The tire shop has added a completely new source of revenue: the car dealer has become a one-stop shop for car search, sales and tires.\n\nAnd for the first time, GCN has a corporate design of its own – consistent, recognizable and with a visual world that fits the Black Forest.",
        mobileAlts: [
          "Homepage on a smartphone",
          "Search request on a smartphone",
          "Tire configurator on a smartphone",
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
    services: en.services,
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
