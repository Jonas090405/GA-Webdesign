/**
 * analytics.ts — DSGVO-konformes Google Analytics.
 *
 * Das gtag.js-Skript wird NIE beim Seitenaufruf geladen.
 * Es wird erst dann dynamisch injiziert, wenn der Nutzer
 * im Cookie-Banner zugestimmt hat (grantConsent).
 * Damit findet ohne explizite Einwilligung kein Transfer
 * der IP-Adresse an Google-Server statt.
 */

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string;
let scriptInjected = false;

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    // Muss das `arguments`-Objekt pushen: gtag.js ignoriert echte Arrays
    // (Rest-Parameter) und sendet dann keinerlei Hits.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }
}

/** Lädt gtag.js und startet Tracking. Nur beim ersten Aufruf aktiv. */
function injectGtagScript() {
  if (scriptInjected || !GA_ID) return;
  scriptInjected = true;
  ensureGtag();
  // Befehle sofort in die Queue – gtag.js arbeitet sie nach dem Laden ab.
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

/**
 * Consent erteilt → Skript laden + Tracking aktivieren.
 * Das Banner fragt nur nach Analyse – Werbesignale bleiben daher immer aus.
 */
export function grantConsent() {
  if (!GA_ID) return;
  const firstLoad = !scriptInjected;
  injectGtagScript();
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = false;
  window.gtag("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  // config erst nach dem Consent-Update, damit der erste page_view mit Cookies läuft.
  if (firstLoad) {
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
  }
}

/** Consent verweigert → kein Skript, kein Tracking. */
export function denyConsent() {
  // Kein Script injizieren. Falls gtag doch irgendwie existiert → denied setzen.
  ensureGtag();
  window.gtag("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
}

export function hasConsent(): boolean {
  return localStorage.getItem("cookie-consent") === "granted";
}

/** Entfernt die GA-Cookies (_ga, _ga_<ID>) für alle Domain-Varianten. */
function deleteGaCookies() {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => name.startsWith("_ga"))
    .forEach((name) => {
      domains.forEach((domain) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ""}`;
      });
    });
}

/** Einwilligung widerrufen → localStorage zurücksetzen, Tracking stoppen, Cookies löschen. */
export function revokeConsent() {
  localStorage.setItem("cookie-consent", "denied");
  denyConsent();
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
  deleteGaCookies();
}
