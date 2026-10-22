import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GERMAN_ONLY, LANG_STORAGE_KEY, langFromPath, localizePath, type Lang } from ".";

const BOT_UA = /bot|crawl|spider|slurp|lighthouse|headless|prerender|pagespeed/i;

/** Bevorzugte Sprache aus den Browsereinstellungen: die erste, die de oder en ist. */
function browserLang(): Lang | null {
  const list = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const l of list) {
    const code = l?.toLowerCase();
    if (code?.startsWith("de")) return "de";
    if (code?.startsWith("en")) return "en";
  }
  return null;
}

function storedLang(): Lang | null {
  try {
    const v = localStorage.getItem(LANG_STORAGE_KEY);
    return v === "de" || v === "en" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Leitet englischsprachige Browser beim ersten Aufruf einer deutschen Seite
 * auf die englische Fassung um. Eine einmal über den Umschalter getroffene
 * Wahl hat Vorrang. Crawler und der Prerender werden nie umgeleitet, damit
 * beide Fassungen unter ihrer eigenen URL indexiert werden.
 */
export function useLanguageRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.webdriver || BOT_UA.test(navigator.userAgent)) return;
    const { pathname } = location;
    if (langFromPath(pathname) !== "de" || GERMAN_ONLY.has(pathname)) return;

    const wanted = storedLang() ?? browserLang();
    if (wanted === "en") {
      navigate(localizePath(pathname + location.search + location.hash, "en"), { replace: true });
    }
    // Nur beim Einstieg prüfen, nicht bei jeder Navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
