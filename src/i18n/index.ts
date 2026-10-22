import { useCallback } from "react";
import { useLocation } from "react-router-dom";

/**
 * Zweisprachigkeit ohne Bibliothek: Die Sprache steckt in der URL
 * (deutsch ohne Präfix, englisch unter /en/…). Texte liegen je Komponente
 * als `{ de, en }`-Objekt direkt neben dem Markup und werden mit `useCopy`
 * ausgewählt. Interne Links schreiben weiter die deutschen Pfade und
 * laufen durch `useLocalePath`.
 */

export type Lang = "de" | "en";

export const LANG_STORAGE_KEY = "lang";

/** Deutsche Route ↔ englische Route. Case Studies behalten ihren Slug. */
const ROUTES: [de: string, en: string][] = [
  ["/", "/en"],
  ["/projekte", "/en/projects"],
  ["/leistungen", "/en/services"],
  ["/ablauf", "/en/process"],
  ["/ueber-uns", "/en/about"],
  ["/kontakt", "/en/contact"],
  ["/impressum", "/en/legal-notice"],
  ["/datenschutz", "/en/privacy"],
  ["/agb", "/en/terms"],
];

/** Rechtsseiten gibt es nur auf Deutsch; unter /en/ zeigen sie den deutschen Text mit Hinweis. */
export const GERMAN_ONLY = new Set(["/impressum", "/datenschutz", "/agb"]);

export function langFromPath(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "de";
}

function trimSlash(p: string) {
  return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
}

/** Deutscher Pfad zu einem beliebigen (deutschen oder englischen) Pfad. */
export function toGermanPath(pathname: string): string {
  const p = trimSlash(pathname);
  if (langFromPath(p) === "de") return p;
  const exact = ROUTES.find(([, en]) => en === p);
  if (exact) return exact[0];
  if (p.startsWith("/en/projects/")) return `/projekte/${p.slice("/en/projects/".length)}`;
  return p.slice(3) || "/";
}

/**
 * Übersetzt einen Pfad in die Zielsprache. Akzeptiert deutsche wie englische
 * Pfade, Query und Hash bleiben erhalten.
 */
export function localizePath(path: string, lang: Lang): string {
  const cut = path.search(/[?#]/);
  const pathname = cut === -1 ? path : path.slice(0, cut);
  const suffix = cut === -1 ? "" : path.slice(cut);
  const de = toGermanPath(pathname);
  if (lang === "de") return de + suffix;
  const exact = ROUTES.find(([d]) => d === de);
  if (exact) return exact[1] + suffix;
  if (de.startsWith("/projekte/")) return `/en/projects/${de.slice("/projekte/".length)}` + suffix;
  return (de === "/" ? "/en" : `/en${de}`) + suffix;
}

/** Englische Gegenstücke aller deutschen Routen – für Router und Prerender. */
export const EN_ROUTES = ROUTES.map(([de, en]) => ({ de, en }));

export function useLang(): Lang {
  return langFromPath(useLocation().pathname);
}

/** Wählt den Textblock der aktuellen Sprache: `const t = useCopy(COPY)`. */
export function useCopy<T>(copy: { de: T; en: T }): T {
  return copy[useLang()];
}

/** `lp("/kontakt")` → „/kontakt“ bzw. „/en/contact“. */
export function useLocalePath() {
  const lang = useLang();
  return useCallback((path: string) => localizePath(path, lang), [lang]);
}

export function rememberLang(lang: Lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    /* Speicher gesperrt – Wahl gilt dann nur für diesen Besuch */
  }
}
