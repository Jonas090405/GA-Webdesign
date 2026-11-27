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
import doganAvatar from "../imports/dogan-avatar.jpeg";
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

// Imperio: Loops echter Interaktionen auf imperio-fulfillment.de; Standbild = erstes Videobild
import impHero from "../imports/projects/imperio/loop-hero-poster.webp";
import impLoopHero from "../imports/projects/imperio/loop-hero.mp4";
import impZusagen from "../imports/projects/imperio/loop-zusagen-poster.webp";
import impLoopZusagen from "../imports/projects/imperio/loop-zusagen.mp4";
import impProzess from "../imports/projects/imperio/loop-prozess-poster.webp";
import impLoopProzess from "../imports/projects/imperio/loop-prozess.mp4";
import impPakete from "../imports/projects/imperio/loop-pakete-poster.webp";
import impLoopPakete from "../imports/projects/imperio/loop-pakete.mp4";
import impUeber from "../imports/projects/imperio/loop-ueber-poster.webp";
import impLoopUeber from "../imports/projects/imperio/loop-ueber.mp4";
import impMobileHome from "../imports/projects/imperio/loop-mhome-poster.webp";
import impLoopMobileHome from "../imports/projects/imperio/loop-mhome.mp4";
import impMobileProzess from "../imports/projects/imperio/loop-mprozess-poster.webp";
import impLoopMobileProzess from "../imports/projects/imperio/loop-mprozess.mp4";
import impMobileKarriere from "../imports/projects/imperio/loop-mkarriere-poster.webp";
import impLoopMobileKarriere from "../imports/projects/imperio/loop-mkarriere.mp4";
// Imperio: Foto- und Videoproduktion – dieselben Fotos und Film-Vorschaubilder wie auf imperio-fulfillment.de
import impFilmImage from "../imports/projects/imperio/film-imagefilm-1600.webp";
import impFilmProzess from "../imports/projects/imperio/film-prozess-1600.webp";
import impBesprechung640 from "../imports/projects/imperio/web-team-besprechung-640.webp";
import impBesprechung1600 from "../imports/projects/imperio/web-team-besprechung-1600.webp";
import impImLager640 from "../imports/projects/imperio/web-team-im-lager-640.webp";
import impImLager1600 from "../imports/projects/imperio/web-team-im-lager-1600.webp";
import impScannen640 from "../imports/projects/imperio/web-mitarbeiter-scannen-640.webp";
import impScannen1600 from "../imports/projects/imperio/web-mitarbeiter-scannen-1600.webp";
import impRegale640 from "../imports/projects/imperio/web-lager-regale-640.webp";
import impRegale1600 from "../imports/projects/imperio/web-lager-regale-1600.webp";
import impPackplatz640 from "../imports/projects/imperio/web-team-packplatz-640.webp";
import impPackplatz1600 from "../imports/projects/imperio/web-team-packplatz-1600.webp";
import impTablet640 from "../imports/projects/imperio/web-kollegen-tablet-640.webp";
import impTablet1600 from "../imports/projects/imperio/web-kollegen-tablet-1600.webp";
import sergejAvatar from "../imports/projects/imperio/sergej-avatar-192.webp";

// City Kebap: Loops echter Interaktionen auf citykebapfurtwangen.de
import ckHero from "../imports/projects/city-kebap/loop-hero-poster.webp";
import ckLoopHero from "../imports/projects/city-kebap/loop-hero.mp4";
import ckTeller from "../imports/projects/city-kebap/loop-teller-poster.webp";
import ckLoopTeller from "../imports/projects/city-kebap/loop-teller.mp4";
import ckKarte from "../imports/projects/city-kebap/loop-karte-poster.webp";
import ckLoopKarte from "../imports/projects/city-kebap/loop-karte.mp4";
import ckLiefergebiet from "../imports/projects/city-kebap/loop-liefergebiet-poster.webp";
import ckLoopLiefergebiet from "../imports/projects/city-kebap/loop-liefergebiet.mp4";
import ckBewertungen from "../imports/projects/city-kebap/loop-bewertungen-poster.webp";
import ckLoopBewertungen from "../imports/projects/city-kebap/loop-bewertungen.mp4";
import ckAblauf from "../imports/projects/city-kebap/loop-ablauf-poster.webp";
import ckLoopAblauf from "../imports/projects/city-kebap/loop-ablauf.mp4";
import ckMobileHome from "../imports/projects/city-kebap/loop-mhome-poster.webp";
import ckLoopMobileHome from "../imports/projects/city-kebap/loop-mhome.mp4";
import ckMobileKarte from "../imports/projects/city-kebap/loop-mkarte-poster.webp";
import ckLoopMobileKarte from "../imports/projects/city-kebap/loop-mkarte.mp4";
import ckMobileStandort from "../imports/projects/city-kebap/loop-mstandort-poster.webp";
import ckLoopMobileStandort from "../imports/projects/city-kebap/loop-mstandort.mp4";
// City Kebap: Foto- und Videoproduktion – Schnitt aus dem Küchenfilm (ohne Ton),
// Fotos wie auf citykebapfurtwangen.de
import ckFilm from "../imports/projects/city-kebap/film-loop-poster.webp";
import ckLoopFilm from "../imports/projects/city-kebap/film-loop.mp4";
import ckGaeste640 from "../imports/projects/city-kebap/web-gaeste-fensterplatz-640.webp";
import ckGaeste1400 from "../imports/projects/city-kebap/web-gaeste-fensterplatz-1400.webp";
import ckTeamKueche640 from "../imports/projects/city-kebap/web-team-kueche-640.webp";
import ckTeamKueche1400 from "../imports/projects/city-kebap/web-team-kueche-1400.webp";
import ckEingang640 from "../imports/projects/city-kebap/web-eingang-marktplatz-15-640.webp";
import ckEingang1400 from "../imports/projects/city-kebap/web-eingang-marktplatz-15-1400.webp";
import ckDoener640 from "../imports/projects/city-kebap/web-doener-schneiden-640.webp";
import ckDoener1400 from "../imports/projects/city-kebap/web-doener-schneiden-1400.webp";
import ckLadenfront640 from "../imports/projects/city-kebap/web-ladenfront-strasse-640.webp";
import ckLadenfront1400 from "../imports/projects/city-kebap/web-ladenfront-strasse-1400.webp";
import ckPizzaTeilen640 from "../imports/projects/city-kebap/web-pizza-teilen-640.webp";
import ckPizzaTeilen1400 from "../imports/projects/city-kebap/web-pizza-teilen-1400.webp";

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

/**
 * Platz eines Fotos im Raster der Foto-&-Video-Sektion: Spalten × Zeilen.
 * `base` gilt im 2er-Raster (Smartphone/Tablet), `lg` im 12er-Raster ab 1024 px.
 * Die Zeilenhöhe ist fest, Fotos füllen ihre Fläche (object-cover).
 */
export type PhotoSpan = {
  base: "1x1" | "1x2" | "2x1" | "2x2";
  lg: "4x1" | "4x2" | "8x1" | "8x2";
};

export type ProductionPhoto = {
  src: string;
  alt: string;
  /** Weitere Breiten desselben Fotos für srcset. */
  sources?: { src: string; width: number }[];
  span: PhotoSpan;
  /** Bildausschnitt, z. B. "50% 30%" (Standard: Mitte). */
  focus?: string;
};

/** Fertiger Film auf YouTube: eingebettet, lädt erst nach Klick, Link darunter. */
export type ProductionFilm = {
  youtubeId: string;
  title: string;
  /** Selbst gehostetes Vorschaubild (16:9) – vor dem Klick lädt nichts von YouTube. */
  poster: string;
};

/** Fotos und Filme, die wir für den Kunden produziert haben. */
export type Production = {
  text: string;
  films?: ProductionFilm[];
  /** Stummer Ausschnitt aus dem Dreh, wenn es keinen veröffentlichten Film gibt. */
  loop?: { src: string; video: string; alt: string };
  photos: ProductionPhoto[];
};

export type SolutionBlock = {
  title: string;
  text: string;
  /** Desktop-Screenshots neben dem Text, optional (ohne = reiner Textblock). */
  screens?: Screen[];
};

export type ProductionText = { text: string; filmTitles?: string[]; loopAlt?: string; photoAlts?: string[] };

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
    /** Filmtitel, Alt-Text des Ausschnitts und der Fotos in derselben Reihenfolge. */
    production?: ProductionText;
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
  /** null = bewusst keine Kundenstimme (dann auch lokal kein Platzhalter). */
  testimonial?: Testimonial | null;
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
    /** Fotos und Videos, die wir für den Kunden produziert haben. */
    production?: Production;
  };
  /** Englische Fassung der Texte (siehe ProjectText). */
  en?: ProjectText;
};

export const PROJECTS: Project[] = [
  {
    slug: "imperio-fulfillment",
    published: true,
    title: "Imperio Fulfillment",
    client: "Imperio Fulfillment GmbH",
    industry: "Fulfillment für Onlinehändler",
    location: "Mönchweiler",
    year: "2026",
    url: "https://imperio-fulfillment.de/",
    summary:
      "Der komplette Markenauftritt für einen Fulfillment-Dienstleister aus dem Schwarzwald: Logo und Markenguideline, eine Website in drei Sprachen, Imagefilm, Prozessvideo und Fotoshooting im Lager, dazu digitale NFC-Visitenkarten.",
    services: [
      "corporate-design",
      "foto-video",
      "webdesign",
      "entwicklung",
      "mehrsprachigkeit",
      "seo",
      "geo",
      "email",
      "launch",
    ],
    cover: { src: impHero, alt: "Startseite von imperio-fulfillment.de mit dem Leitsatz „Ihr Lager. Unser Job.“ und einem gezeichneten Lager" },
    video: impLoopHero,
    testimonial: {
      quote:
        "Wir haben mit G&A Webdesign unseren kompletten Markenauftritt für Imperio Fulfillment umgesetzt – vom Logo über die Website bis hin zu Image- und Prozessvideo und unseren digitalen NFC-Visitenkarten. Besonders beim Logo hat uns überzeugt, wie gut die Idee hinter unserem Geschäft eingefangen wurde: Die Regale als Krone bringen genau auf den Punkt, wofür wir stehen.\n\nJonas und Berkant haben schnell verstanden, was wir brauchen, Vorschläge kamen zügig und Änderungswünsche wurden unkompliziert umgesetzt. Man merkt, dass hier mitgedacht wird und nicht nur abgearbeitet. Alles aus einer Hand, persönlich und regional – genau so stellt man sich die Zusammenarbeit mit einer Agentur vor.\n\nKlare Empfehlung für alle, die einen professionellen Auftritt suchen!",
      short:
        "Man merkt, dass hier mitgedacht wird und nicht nur abgearbeitet. Alles aus einer Hand, persönlich und regional – genau so stellt man sich die Zusammenarbeit mit einer Agentur vor.",
      name: "Sergej Miller",
      role: "Geschäftsführer",
      company: "Imperio Fulfillment GmbH",
      avatar: sergejAvatar,
    },
    caseStudy: {
      challenge:
        "Imperio Fulfillment lagert, kommissioniert, verpackt und versendet Ware für Onlinehändler, von Mönchweiler bei Villingen-Schwenningen aus. Hinter dem Unternehmen steht Fulfillment-Erfahrung seit 2017.\n\nNach außen war davon nichts zu sehen. Es gab kein Logo und keine Bilder, unter der eigenen Domain lag eine leere WordPress-Seite mit Impressum und Datenschutz. Wer online nach Imperio suchte, landete eher bei einer Kosmetikmarke gleichen Namens.",
      goal:
        "Ein Auftritt, der Onlinehändlern auf den ersten Blick zeigt, dass ihre Ware hier in guten Händen ist: eine eigene Marke, echte Bilder aus dem Lager und ein kurzer Weg zum Angebot.",
      solution: [
        {
          title: "Ein Logo, das das Geschäft erzählt",
          text: "Am Anfang stand die Marke. Die Bildmarke setzt drei Regale zu einer Krone zusammen, darunter liegt ein oranger Balken. In einer Markenguideline haben wir Farben, Schrift und Bildsprache festgelegt: Marine als Grundton, Signalorange als einziger Akzent, abgeleitet von Warnwesten, Staplern und Bodenmarkierungen im Lager. Im selben Look sind die digitalen NFC-Visitenkarten entstanden, die Kontaktdaten mit einem Antippen weitergeben.",
        },
        {
          title: "Was Händler wissen wollen, ganz oben",
          text: "Die Startseite sagt in einem Satz, worum es geht, daneben arbeitet ein gezeichnetes Lager im Kleinen. Darunter folgen die fünf Leistungen von der Lagerung bis zur Retoure, jede mit eigener Line-Art-Animation, und die Zusagen, auf die sich Händler verlassen können: Bestellannahme bis 14 Uhr, Versand am selben Tag, 2.500 Palettenplätze.",
          screens: [{ src: impZusagen, video: impLoopZusagen, alt: "Zusagen von Imperio mit Kennzahlen, die beim Einblenden hochzählen" }],
        },
        {
          title: "Der Weg eines Pakets in sechs Stationen",
          text: "Auf der Prozessseite zeichnet sich beim Scrollen eine Linie durch sechs Stationen, von der Bestellung bis zur Verladung in den Lkw. In jeder Station läuft ein echter Ausschnitt aus dem Lager, gedreht für genau diese Stelle. Am Ende steht das ganze Prozessvideo.",
          screens: [{ src: impProzess, video: impLoopProzess, alt: "Prozessseite mit einer Linie durch sechs runde Stationen mit gefilmten Szenen aus dem Lager" }],
        },
        {
          title: "Pakete statt Preisliste",
          text: "Drei Pakete bauen aufeinander auf, von Basic bis Enterprise, und zeigen, was jeweils dazukommt. Preise macht Imperio individuell, deshalb führt jedes Paket direkt ins Kontaktformular, in dem Betreff und Paket schon ausgewählt sind.",
          screens: [{ src: impPakete, video: impLoopPakete, alt: "Drei Leistungspakete Basic, Professional und Enterprise nebeneinander" }],
        },
        {
          title: "Menschen statt Stockfotos",
          text: "Über uns beginnt mit einem Gang durchs Lager in 4K, gleich danach läuft der Imagefilm. Darunter stehen Geschichte, Werte und der Standort auf einer eigenen Karte, die ohne Google-Dienste auskommt.",
          screens: [{ src: impUeber, video: impLoopUeber, alt: "Über-uns-Seite mit Video aus dem Lager, Imagefilm und Werten" }],
        },
        {
          title: "Bewerben in vier Schritten",
          text: "Für die Karriereseite haben wir ein geführtes Bewerbungsformular gebaut: vier Schritte mit Fortschrittsanzeige, Fragen passend zur Stelle und Lebenslauf als PDF. Es funktioniert auch ohne JavaScript. Bewerbungen und Anfragen landen im jeweils zuständigen Postfach, und wer schreibt, bekommt eine gestaltete Bestätigung in seiner Sprache.",
        },
        {
          title: "Auf Deutsch, Englisch und Russisch gefunden werden",
          text: "Die Website gibt es in drei Sprachen, jede Seite mit eigener Adresse. Strukturierte Daten beschreiben Unternehmen, Leistungen, Fragen und offene Stellen, eine llms.txt hilft KI-Suchen. Filme laden erst nach einem Klick und die Schriften liegen auf dem eigenen Server, deshalb kommt die Seite ohne Cookie-Banner aus.",
        },
      ],
      result:
        "Seit dem 26. November 2026 ist der neue Auftritt live. Zum ersten Mal hat Imperio eine Marke, an der man das Unternehmen wiedererkennt, vom Logo auf dem Shirt bis zur Visitenkarte.\n\nHändler sehen auf der Website, wie im Lager gearbeitet wird, bevor sie zum ersten Mal anrufen, und Bewerber sehen, mit wem sie arbeiten würden.",
      mobile: [
        { src: impMobileHome, video: impLoopMobileHome, alt: "Startseite mit Leistungen am Smartphone" },
        { src: impMobileProzess, video: impLoopMobileProzess, alt: "Weg eines Pakets in sechs Stationen am Smartphone" },
        { src: impMobileKarriere, video: impLoopMobileKarriere, alt: "Karriereseite mit Teamfotos und offener Stelle am Smartphone" },
      ],
      production: {
        text: "Für die Filme haben wir zuerst ein Konzept geschrieben: ein Dreh, drei Verwertungen. Daraus sind ein Imagefilm mit Sergej Miller als Gesicht des Unternehmens entstanden, ein Prozessvideo, das den Weg einer Bestellung in sechs Stationen zeigt, und kurze Loops derselben Stationen für die Website.\n\nDazu kommt ein Fotoshooting im Lager, mit Team, Regalen und Packplatz. Die Bilder tragen jetzt Startseite, Über uns und Karriere.",
        films: [
          { youtubeId: "SUwAr23X4Cg", title: "Imagefilm", poster: impFilmImage },
          { youtubeId: "HGRWNRgPwTo", title: "Prozessvideo: Der Weg Ihres Pakets", poster: impFilmProzess },
        ],
        photos: [
          {
            src: impBesprechung1600,
            sources: [
              { src: impBesprechung640, width: 640 },
              { src: impBesprechung1600, width: 1600 },
            ],
            alt: "Sergej Miller zeigt zwei Kollegen etwas im Lager, von unten fotografiert",
            span: { base: "2x2", lg: "8x2" },
          },
          {
            src: impImLager1600,
            sources: [
              { src: impImLager640, width: 640 },
              { src: impImLager1600, width: 1600 },
            ],
            alt: "Sergej Miller mit Tablet im Regalgang, ein Mitarbeiter sortiert Kartons ein",
            span: { base: "1x1", lg: "4x1" },
          },
          {
            src: impScannen1600,
            sources: [
              { src: impScannen640, width: 640 },
              { src: impScannen1600, width: 1600 },
            ],
            alt: "Mitarbeiter scannt ein Paket am Packplatz",
            span: { base: "1x1", lg: "4x1" },
          },
          {
            src: impRegale1600,
            sources: [
              { src: impRegale640, width: 640 },
              { src: impRegale1600, width: 1600 },
            ],
            alt: "Mitarbeiter mit Imperio-Logo auf dem Shirt am Regal, daneben Sergej Miller",
            span: { base: "1x1", lg: "4x1" },
          },
          {
            src: impPackplatz1600,
            sources: [
              { src: impPackplatz640, width: 640 },
              { src: impPackplatz1600, width: 1600 },
            ],
            alt: "Drei Kollegen am Packplatz",
            span: { base: "1x1", lg: "4x1" },
          },
          {
            src: impTablet1600,
            sources: [
              { src: impTablet640, width: 640 },
              { src: impTablet1600, width: 1600 },
            ],
            alt: "Sergej Miller und ein Mitarbeiter am Tablet vor den Regalen",
            span: { base: "2x1", lg: "4x1" },
          },
        ],
      },
    },
    en: {
      industry: "Fulfillment for online retailers",
      location: "Mönchweiler",
      summary:
        "The complete brand for a fulfillment provider from the Black Forest: logo and brand guideline, a website in three languages, an image film, a process video and a photo shoot in the warehouse, plus digital NFC business cards.",
      coverAlt: "Homepage of imperio-fulfillment.de with the line “Your warehouse. Our job.” and an illustrated warehouse",
      testimonial: {
        quote:
          "We worked with G&A Webdesign on our entire brand for Imperio Fulfillment – from the logo and the website to an image film, a process video and our digital NFC business cards. The logo convinced us most: it captures the idea behind our business so well. The shelves forming a crown sum up exactly what we stand for.\n\nJonas and Berkant quickly understood what we needed, suggestions came fast and change requests were handled without any fuss. You can tell they think along instead of just ticking boxes. Everything from one source, personal and local – that is exactly how working with an agency should be.\n\nA clear recommendation for anyone looking for a professional presence!",
        short:
          "You can tell they think along instead of just ticking boxes. Everything from one source, personal and local – that is exactly how working with an agency should be.",
        role: "Managing Director",
      },
      caseStudy: {
        challenge:
          "Imperio Fulfillment stores, picks, packs and ships goods for online retailers from Mönchweiler near Villingen-Schwenningen. Behind the company is fulfillment experience going back to 2017.\n\nNone of that showed. There was no logo and no imagery, and the company's own domain held an empty WordPress site with nothing but the legal pages. Anyone searching for Imperio online was more likely to end up at a cosmetics brand of the same name.",
        goal:
          "A presence that shows online retailers at first glance that their goods are in good hands: a brand of its own, real images from the warehouse and a short path to a quote.",
        solution: [
          {
            title: "A logo that tells the business",
            text: "It started with the brand. The logo mark turns three shelving units into a crown, resting on an orange bar. A brand guideline sets out colours, type and imagery: navy as the base, signal orange as the only accent, taken from the high-vis vests, forklifts and floor markings in the warehouse. The digital NFC business cards share the same look and pass on contact details with a single tap.",
          },
          {
            title: "What retailers want to know, right at the top",
            text: "The homepage says in one sentence what it is about, next to an illustrated warehouse at work. Below come the five services from storage to returns, each with its own line-art animation, and the promises retailers can rely on: orders accepted until 2 pm, shipped the same day, 2,500 pallet spaces.",
            screenAlts: ["Imperio's promises with figures that count up as they appear"],
          },
          {
            title: "A parcel's journey in six stations",
            text: "On the process page, a line draws itself through six stations as you scroll, from the order to loading onto the truck. Each station plays a real clip from the warehouse, filmed for exactly that spot. The full process video closes the page.",
            screenAlts: ["Process page with a line through six round stations showing filmed warehouse scenes"],
          },
          {
            title: "Packages instead of a price list",
            text: "Three packages build on each other, from Basic to Enterprise, and show what each one adds. Imperio prices every client individually, so each package leads straight to the contact form with the subject and package already selected.",
            screenAlts: ["Three service packages Basic, Professional and Enterprise side by side"],
          },
          {
            title: "People instead of stock photos",
            text: "The about page opens with a walk through the warehouse in 4K, followed right away by the image film. Below sit the story, the values and the location on a custom map that works without any Google services.",
            screenAlts: ["About page with warehouse video, image film and values"],
          },
          {
            title: "Applying in four steps",
            text: "For the careers page we built a guided application form: four steps with a progress indicator, questions tailored to the role and a CV upload as PDF, and it even works without JavaScript. Applications and inquiries go to the right inbox, and everyone who writes in gets a designed confirmation in their own language.",
          },
          {
            title: "Found in German, English and Russian",
            text: "The website comes in three languages, each page with its own address. Structured data describes the company, services, FAQs and open positions, and an llms.txt helps AI search. Films only load after a click and the fonts are self-hosted, so the site needs no cookie banner.",
          },
        ],
        result:
          "The new presence has been live since 26 November 2026. For the first time, Imperio has a brand that makes the company recognizable, from the logo on the shirt to the business card.\n\nRetailers can see how the warehouse works before they ever pick up the phone, and applicants can see who they would be working with.",
        mobileAlts: [
          "Homepage with services on a smartphone",
          "A parcel's journey in six stations on a smartphone",
          "Careers page with team photos and an open position on a smartphone",
        ],
        production: {
          text: "For the films we started with a concept: one shoot, three uses. It produced an image film with Sergej Miller as the face of the company, a process video that follows an order through six stations, and short loops of the same stations for the website.\n\nOn top of that came a photo shoot in the warehouse, covering the team, the shelving and the packing stations. These images now carry the homepage, the about page and the careers page.",
          filmTitles: ["Image film", "Process video: Your parcel's journey"],
          photoAlts: [
            "Sergej Miller pointing something out to two colleagues in the warehouse, shot from below",
            "Sergej Miller with a tablet in the shelving aisle while an employee stacks boxes",
            "Employee scanning a parcel at the packing station",
            "Employee with the Imperio logo on his shirt at the shelves, next to Sergej Miller",
            "Three colleagues at the packing station",
            "Sergej Miller and an employee at a tablet in front of the shelves",
          ],
        },
      },
    },
  },
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
      avatar: doganAvatar,
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
    slug: "city-kebap",
    published: true,
    title: "City Kebap",
    client: "City Kebap Furtwangen",
    industry: "Imbiss & Lieferdienst",
    location: "Furtwangen im Schwarzwald",
    year: "2026",
    url: "https://citykebapfurtwangen.de/",
    summary:
      "Relaunch für den Imbiss am Marktplatz in Furtwangen: eine Website mit Speisekarte zum Durchtippen, Live-Öffnungszeiten und Liefergebiet, dazu Fotos und Videos aus der eigenen Küche statt Stockbildern.",
    services: ["webdesign", "entwicklung", "foto-video", "seo", "geo", "email", "launch"],
    cover: { src: ckHero, alt: "Startseite von citykebapfurtwangen.de mit Küchenvideo und der Frage „Heute Lust auf Döner?“" },
    video: ckLoopHero,
    testimonial: null,
    caseStudy: {
      challenge:
        "City Kebap gehört zum Marktplatz in Furtwangen: Döner, Pizza, Pide und Lahmacun, frisch zubereitet und halal, zum Mitnehmen, vor Ort oder geliefert.\n\nDie alte Website war ein WordPress-Baukasten mit grellen Icon-Kacheln, Stock- und KI-Bildern und einer Werbesprache, die nicht zum Laden passte. Selbst der Name stand mal mit p, mal mit b im Netz, und in Verzeichnissen fanden sich falsche Adressen.",
      goal:
        "Eine Seite, auf der Gäste in Sekunden sehen, was es gibt, ob gerade offen ist und ob geliefert wird, und die so herzlich klingt wie der Laden selbst.",
      solution: [
        {
          title: "Hunger auf den ersten Blick",
          text: "Der Einstieg zeigt echte Aufnahmen aus der Küche, die Überschrift wechselt zwischen Döner, Pide, Lahmacun und Pizza, und der Teller daneben wechselt mit. Darunter liegen die Kategorien als Teller auf der roten Scheibe aus dem Logo und drehen sich beim Scrollen. Ob gerade geöffnet ist, kommt direkt aus dem Google-Profil.",
          screens: [{ src: ckTeller, video: ckLoopTeller, alt: "Kategorien als Teller auf roten Scheiben, die sich beim Scrollen drehen" }],
        },
        {
          title: "Die ganze Karte, ein Tipp entfernt",
          text: "119 Gerichte in zehn Kategorien, von Döner bis Getränke. Jede Kategorie ist einen Tipp entfernt, beim Weiterscrollen bleibt eine kompakte Leiste stehen. Wer lieber alles auf einem Blatt hat, lädt die Karte als PDF. Bestellt wird über den Bestellknopf, auf dem Smartphone steht er immer am unteren Rand.",
          screens: [{ src: ckKarte, video: ckLoopKarte, alt: "Speisekarte mit Kategorien als Teller, beim Antippen wechselt die Kategorie" }],
        },
        {
          title: "Liefern oder abholen",
          text: "Drei Lieferzonen mit Mindestbestellwert und Liefergebühr stehen in einer Tabelle, daneben eine gezeichnete Karte. Fährt man über eine Zeile, leuchtet die passende Zone auf. Anfahrt, Öffnungszeiten und die häufigsten Fragen stehen auf derselben Seite.",
          screens: [{ src: ckLiefergebiet, video: ckLoopLiefergebiet, alt: "Liefergebiet mit drei Zonen, die beim Überfahren der Tabelle aufleuchten" }],
        },
        {
          title: "Stimmen vom Marktplatz",
          text: "18 Google-Bewertungen stehen wörtlich auf der Startseite, zum Durchblättern und mit einem direkten Weg zur eigenen Bewertung.",
          screens: [{ src: ckBewertungen, video: ckLoopBewertungen, alt: "Slider mit Google-Bewertungen von Gästen" }],
        },
        {
          title: "So kommt dein Essen zu dir",
          text: "Auf Über uns fährt ein Roller beim Scrollen die Stationen ab, von der Bestellung bis zum Genießen. Jede Station ist ein gezeichneter Sticker, der sich kurz bewegt.",
          screens: [{ src: ckAblauf, video: ckLoopAblauf, alt: "Ablauf als Straße, auf der ein Roller vier Stationen abfährt" }],
        },
        {
          title: "Gefunden werden in Furtwangen",
          text: "Strukturierte Daten beschreiben Restaurant, Speisekarte, Liefergebiet und Fragen. Eine llms.txt und die Karte als Markdown geben KI-Suchen saubere Antworten, alte Adressen leiten auf die neuen Seiten weiter. Für das Google-Profil haben wir ein fertiges Paket mit Fotos, Video und Anleitung zusammengestellt.",
        },
        {
          title: "Anfragen ohne Umweg",
          text: "Catering, Großbestellung oder Feedback laufen über ein Kontaktformular mit Spamschutz. Das Restaurant bekommt eine Benachrichtigung, der Gast eine Bestätigung im Design der Seite.",
        },
      ],
      result:
        "Seit dem 23. November 2026 ist die neue Seite live. City Kebap tritt jetzt überall mit einem Namen auf, mit Bildern aus der eigenen Küche und mit Texten, die klingen wie der Laden.\n\nGäste sehen auf dem Smartphone in Sekunden, was es gibt, ob offen ist und ob geliefert wird, und bestellen mit einem Tipp.",
      mobile: [
        { src: ckMobileHome, video: ckLoopMobileHome, alt: "Startseite mit Küchenvideo und Kategorien am Smartphone" },
        { src: ckMobileKarte, video: ckLoopMobileKarte, alt: "Speisekarte mit Preisen am Smartphone" },
        { src: ckMobileStandort, video: ckLoopMobileStandort, alt: "Standort und Liefergebiet am Smartphone" },
      ],
      production: {
        text: "Statt Stockbildern zeigt die Seite jetzt den echten Laden. Bei einem Shooting vor Ort sind Fotos von Küche, Team, Gerichten und Ladenfront entstanden, dazu Videoaufnahmen aus der Küche.\n\nDaraus haben wir den Loop für den Einstieg geschnitten, vom Dönerspieß über die Pizza bis zur Fritteuse, und einen längeren Küchenfilm.",
        loop: {
          src: ckFilm,
          video: ckLoopFilm,
          alt: "Ausschnitte aus dem Küchenfilm: Pizza belegen, Pizza aus dem Ofen, Döner füllen, Köfte grillen, Pizza schneiden und servieren",
        },
        photos: [
          {
            src: ckGaeste1400,
            sources: [
              { src: ckGaeste640, width: 640 },
              { src: ckGaeste1400, width: 1400 },
            ],
            alt: "Gäste am Fensterplatz mit Familienpizza und Blick auf den Marktplatz",
            span: { base: "2x1", lg: "8x2" },
          },
          {
            src: ckTeamKueche1400,
            sources: [
              { src: ckTeamKueche640, width: 640 },
              { src: ckTeamKueche1400, width: 1400 },
            ],
            alt: "Zwei Köche belegen Lahmacun an der Theke",
            span: { base: "2x2", lg: "4x1" },
            focus: "50% 35%",
          },
          {
            src: ckEingang1400,
            sources: [
              { src: ckEingang640, width: 640 },
              { src: ckEingang1400, width: 1400 },
            ],
            alt: "Eingang von City Kebap am Marktplatz 15",
            span: { base: "2x1", lg: "4x1" },
          },
          {
            src: ckDoener1400,
            sources: [
              { src: ckDoener640, width: 640 },
              { src: ckDoener1400, width: 1200 },
            ],
            alt: "Der Dönerspieß wird frisch geschnitten",
            span: { base: "1x2", lg: "4x2" },
          },
          {
            src: ckLadenfront1400,
            sources: [
              { src: ckLadenfront640, width: 640 },
              { src: ckLadenfront1400, width: 1200 },
            ],
            alt: "Ladenfront mit Efeu von der Straße aus",
            span: { base: "1x2", lg: "4x2" },
          },
          {
            src: ckPizzaTeilen1400,
            sources: [
              { src: ckPizzaTeilen640, width: 640 },
              { src: ckPizzaTeilen1400, width: 1200 },
            ],
            alt: "Gäste teilen sich eine Pizza",
            span: { base: "2x2", lg: "4x2" },
            focus: "50% 40%",
          },
        ],
      },
    },
    en: {
      industry: "Takeaway & delivery",
      location: "Furtwangen, Black Forest",
      summary:
        "A relaunch for the takeaway on the market square in Furtwangen: a website with a tap-through menu, live opening hours and delivery area, plus photos and videos from their own kitchen instead of stock images.",
      coverAlt: "Homepage of citykebapfurtwangen.de with a kitchen video and the question “Craving döner today?”",
      caseStudy: {
        challenge:
          "City Kebap is part of the market square in Furtwangen: döner, pizza, pide and lahmacun, freshly made and halal, to take away, eat in or delivered.\n\nThe old website was a WordPress builder site with garish icon tiles, stock and AI images and advertising copy that did not fit the place. Even the name appeared online with a p in some places and a b in others, and directories listed wrong addresses.",
        goal:
          "A site where guests see within seconds what is on offer, whether it is open and whether they deliver, and that sounds as warm as the place itself.",
        solution: [
          {
            title: "Hungry at first glance",
            text: "The opening shows real footage from the kitchen, the headline switches between döner, pide, lahmacun and pizza, and the plate next to it changes along. Below, the categories sit as plates on the red disc from the logo and turn as you scroll. Whether it is open right now comes straight from the Google profile.",
            screenAlts: ["Categories as plates on red discs that turn as you scroll"],
          },
          {
            title: "The whole menu, one tap away",
            text: "119 dishes in ten categories, from döner to drinks. Every category is one tap away, and a compact bar stays in place as you scroll. Anyone who prefers everything on one sheet can download the menu as a PDF. Ordering works through the order button, which always sits at the bottom of the screen on a smartphone.",
            screenAlts: ["Menu with categories as plates, tapping switches the category"],
          },
          {
            title: "Delivery or pick-up",
            text: "Three delivery zones with minimum order and delivery fee are listed in a table next to an illustrated map. Hovering over a row lights up the matching zone. Directions, opening hours and the most common questions sit on the same page.",
            screenAlts: ["Delivery area with three zones that light up when hovering over the table"],
          },
          {
            title: "Voices from the market square",
            text: "18 Google reviews appear word for word on the homepage, to browse through and with a direct path to leaving your own review.",
            screenAlts: ["Slider with Google reviews from guests"],
          },
          {
            title: "How your food gets to you",
            text: "On the about page, a scooter rides past the stations as you scroll, from ordering to enjoying. Each station is an illustrated sticker that moves briefly.",
            screenAlts: ["The process as a road along which a scooter passes four stations"],
          },
          {
            title: "Found in Furtwangen",
            text: "Structured data describes the restaurant, menu, delivery area and FAQs. An llms.txt and the menu as Markdown give AI search clean answers, and old addresses redirect to the new pages. For the Google profile we put together a ready-made package with photos, video and instructions.",
          },
          {
            title: "Inquiries without detours",
            text: "Catering, large orders or feedback go through a contact form with spam protection. The restaurant gets a notification, the guest a confirmation in the site's design.",
          },
        ],
        result:
          "The new site has been live since 23 November 2026. City Kebap now appears everywhere under one name, with images from its own kitchen and copy that sounds like the place.\n\nOn a smartphone, guests see within seconds what is on offer, whether it is open and whether they deliver, and order with a single tap.",
        mobileAlts: [
          "Homepage with kitchen video and categories on a smartphone",
          "Menu with prices on a smartphone",
          "Location and delivery area on a smartphone",
        ],
        production: {
          text: "Instead of stock images, the site now shows the real place. A shoot on location produced photos of the kitchen, the team, the dishes and the shop front, along with video footage from the kitchen.\n\nFrom that we cut the loop for the opening, from the döner spit to the pizza to the fryer, and a longer kitchen film.",
          loopAlt: "Clips from the kitchen film: topping a pizza, pizza from the oven, filling a döner, grilling köfte, cutting and serving pizza",
          photoAlts: [
            "Guests at the window table with a family pizza and a view of the market square",
            "Two cooks topping lahmacun at the counter",
            "Entrance of City Kebap at Marktplatz 15",
            "The döner spit being freshly carved",
            "Shop front with ivy seen from the street",
            "Guests sharing a pizza",
          ],
        },
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
      production: p.caseStudy.production && localizeProduction(p.caseStudy.production, en.caseStudy.production),
    },
  };
}

function localizeProduction(p: Production, en?: ProductionText): Production {
  if (!en) return p;
  return {
    ...p,
    text: en.text,
    films: p.films?.map((f, i) => ({ ...f, title: en.filmTitles?.[i] ?? f.title })),
    loop: p.loop && { ...p.loop, alt: en.loopAlt ?? p.loop.alt },
    photos: p.photos.map((ph, i) => ({ ...ph, alt: en.photoAlts?.[i] ?? ph.alt })),
  };
}

export const findProject = (slug?: string) => PROJECTS.find((p) => p.slug === slug);
