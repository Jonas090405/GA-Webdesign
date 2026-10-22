import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GERMAN_ONLY, langFromPath, localizePath, toGermanPath } from "../../i18n";

const BASE_URL = "https://ga-webdesign.de";

/** Legt ein <link>/<meta> im <head> an, falls es noch fehlt, und setzt das Attribut. */
function upsert(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function alternate(hreflang: string) {
  return () => {
    const l = document.createElement("link");
    l.rel = "alternate";
    l.hreflang = hreflang;
    return l;
  };
}

/**
 * Titel, Beschreibung, Canonical und Sprachvarianten der aktuellen Seite.
 * Der Pfad kommt aus dem Router, damit deutsche und englische Fassung
 * automatisch auf sich selbst (bzw. bei Rechtsseiten auf das deutsche
 * Original) zeigen. `path` bleibt aus Kompatibilität erlaubt, wird aber
 * nicht mehr gebraucht.
 */
export function usePageMeta({
  title,
  description,
}: {
  title: string;
  description: string;
  path?: string;
}) {
  const { pathname } = useLocation();

  useEffect(() => {
    const lang = langFromPath(pathname);
    const dePath = toGermanPath(pathname);
    const germanOnly = GERMAN_ONLY.has(dePath);
    const self = germanOnly ? dePath : localizePath(dePath, lang);
    const url = (p: string) => `${BASE_URL}${p === "/" ? "/" : p}`;

    document.title = title;
    document.documentElement.lang = lang;

    const set = (selector: string, attr: string, value: string) => {
      document.querySelector(selector)?.setAttribute(attr, value);
    };

    set('meta[name="description"]', "content", description);
    set('meta[property="og:title"]', "content", title);
    set('meta[property="og:description"]', "content", description);
    set('meta[property="og:url"]', "content", url(self));
    set('meta[property="og:locale"]', "content", lang === "en" ? "en_US" : "de_DE");
    set('link[rel="canonical"]', "href", url(self));
    set('meta[name="twitter:title"]', "content", title);
    set('meta[name="twitter:description"]', "content", description);

    // hreflang: Rechtsseiten haben keine eigene englische Fassung.
    const head = document.head;
    if (germanOnly) {
      head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((l) => l.remove());
    } else {
      upsert('link[rel="alternate"][hreflang="de"]', alternate("de"), "href", url(localizePath(dePath, "de")));
      upsert('link[rel="alternate"][hreflang="en"]', alternate("en"), "href", url(localizePath(dePath, "en")));
      upsert('link[rel="alternate"][hreflang="x-default"]', alternate("x-default"), "href", url(localizePath(dePath, "de")));
    }
  }, [title, description, pathname]);
}
