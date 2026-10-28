import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { Navigation } from "lucide-react";
import { FadeIn } from "./FadeIn";
import { SectionHeader } from "./SectionHeader";
import { useCopy } from "../../i18n";
import mapUrl from "../../imports/standort-map.svg";
import logoUrl from "../../imports/Logo_GA_Webdesign.svg";

export const LOCATION_ANCHOR = "standort";

const DESTINATION = encodeURIComponent("Leopoldstraße 1, 78112 St. Georgen im Schwarzwald");
const GOOGLE_MAPS_ROUTE = `https://www.google.com/maps/dir/?api=1&destination=${DESTINATION}`;
const APPLE_MAPS_ROUTE = `https://maps.apple.com/?daddr=${DESTINATION}`;

/**
 * Route in der Karten-App des Geräts: iPhone/iPad → Apple Karten, alles andere
 * → Google Maps (öffnet auf Android direkt die Google-Maps-App). Startwert ist
 * Google, damit das vorgerenderte HTML einen gültigen Link hat.
 */
export function useRouteUrl() {
  const [url, setUrl] = useState(GOOGLE_MAPS_ROUTE);
  useEffect(() => {
    const ua = navigator.userAgent;
    // iPadOS meldet sich als „Macintosh“, hat aber einen Touchscreen.
    const appleMobile = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    if (appleMobile) setUrl(APPLE_MAPS_ROUTE);
  }, []);
  return url;
}

const COPY = {
  de: {
    title: "So findest du",
    accent: "zu uns.",
    lead: "Du findest uns in der Leopoldstraße 1 in St. Georgen im Schwarzwald, direkt an der Sommerauer Straße.",
    city: "78112 St. Georgen im Schwarzwald",
    route: "Route planen",
    routeLabel: "Route zu G&A Webdesign planen (öffnet deine Karten-App)",
    mapAlt: "Kartenausschnitt von St. Georgen im Schwarzwald. Der Pin markiert die Leopoldstraße 1 zwischen Sommerauer Straße und Luisenstraße.",
    attribution: "Kartendaten © OpenStreetMap",
  },
  en: {
    title: "How to",
    accent: "find us.",
    lead: "You'll find us at Leopoldstraße 1 in St. Georgen im Schwarzwald, right on Sommerauer Straße.",
    city: "78112 St. Georgen im Schwarzwald, Germany",
    route: "Get directions",
    routeLabel: "Get directions to G&A Webdesign (opens your maps app)",
    mapAlt: "Map of St. Georgen in the Black Forest. The pin marks Leopoldstraße 1, between Sommerauer Straße and Luisenstraße.",
    attribution: "Map data © OpenStreetMap",
  },
};

/**
 * Standort-Sektion mit eigener Karte (SVG aus OpenStreetMap-Daten, gerendert
 * von scripts/render-standort-map.py). Kein Google-Embed: beim Seitenaufruf
 * gehen keine Daten an Dritte, erst der Klick auf Pin oder „Route planen“ öffnet Maps.
 */
export function LocationMap({ className = "" }: { className?: string }) {
  const t = useCopy(COPY);
  const { hash } = useLocation();
  const routeUrl = useRouteUrl();

  // Anker aus der URL (z. B. von der Startseite) erst nach dem Seitenübergang
  // anspringen, sonst setzt App.tsx die Scrollposition wieder auf 0.
  useEffect(() => {
    if (hash !== `#${LOCATION_ANCHOR}`) return;
    const timer = window.setTimeout(
      () => document.getElementById(LOCATION_ANCHOR)?.scrollIntoView({ behavior: "smooth", block: "start" }),
      500,
    );
    return () => window.clearTimeout(timer);
  }, [hash]);

  return (
    <section id={LOCATION_ANCHOR} className={`scroll-mt-28 ${className}`}>
      <SectionHeader title={t.title} accent={t.accent} lead={t.lead} />

      <FadeIn>
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: "var(--ink-950)",
            border: "1px solid rgb(var(--blue-400-rgb) / 0.12)",
          }}
        >
          <div className="relative h-[340px] sm:h-[420px] lg:h-[480px] 2xl:h-[540px] overflow-hidden [--shift:0px] lg:[--shift:150px] xl:[--shift:170px]">
            {/* Kartenmitte = Gebäude. Ab lg rückt sie nach rechts, damit das Adress-Panel den Pin
                nicht verdeckt; die Mindestbreite hält die Straßennamen auf dem Handy lesbar. */}
            <div className="absolute top-1/2 left-[calc(50%+var(--shift))] aspect-[2/1] min-h-full w-[max(calc(100%+2*var(--shift)),820px)] -translate-x-1/2 -translate-y-1/2">
              <img
                src={mapUrl}
                alt={t.mapAlt}
                width={1300}
                height={650}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full max-w-none object-cover select-none"
                draggable={false}
              />
              <MapPin href={routeUrl} label={t.routeLabel} />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 75% 85% at 50% 50%, transparent 45%, rgb(var(--ink-950-rgb) / 0.75) 100%)",
              }}
            />
            {/* Die Karte läuft dorthin aus, wo die Adresse steht: bis lg nach unten, ab lg nach links. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 lg:hidden"
              style={{ background: "linear-gradient(to bottom, transparent 55%, var(--ink-950) 100%)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden lg:block"
              style={{
                background:
                  "linear-gradient(to right, var(--ink-950) 0%, rgb(var(--ink-950-rgb) / 0.92) 22%, rgb(var(--ink-950-rgb) / 0.55) 38%, transparent 56%)",
              }}
            />
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-2 bottom-2 rounded-md px-2 py-0.5 text-[11px] text-ink-400 hover:text-ink-100 transition-colors"
              style={{ background: "rgb(var(--ink-950-rgb) / 0.8)" }}
            >
              {t.attribution}
            </a>
          </div>

          {/* Adresse ohne eigenen Kasten: bis lg unter der Karte, ab lg auf deren Verlauf */}
          <div className="relative px-5 pt-1 pb-6 sm:px-6 sm:pb-7 lg:absolute lg:left-0 lg:bottom-0 lg:p-10 xl:p-12">
            <address className="not-italic">
              <p className="flex items-center gap-3">
                <img src={logoUrl} alt="" width={104} height={107} className="h-8 w-auto xl:h-9" />
                <span
                  className="text-white text-[19px] xl:text-[21px] font-medium tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  G&amp;A Webdesign
                </span>
              </p>
              <p className="mt-3 text-[14px] xl:text-[15px] leading-relaxed text-ink-300">
                Leopoldstraße 1
                <br />
                {t.city}
              </p>
            </address>

            <div className="mt-5">
              <a
                href={routeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.routeLabel}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] text-white font-medium transition-all duration-200 hover:brightness-110 active:brightness-95"
                style={{ background: "var(--gradient-cta)" }}
              >
                <Navigation size={15} aria-hidden />
                {t.route}
              </a>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/**
 * Pin mit der Spitze exakt in der Kartenmitte; fällt einmal ein, dann pulst der Ring.
 * Klick auf den Pin öffnet die Route wie der Button.
 */
function MapPin({ href, label }: { href: string; label: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2">
      {!reduce && (
        <motion.span
          aria-hidden
          className="absolute left-0 top-0 h-5 w-12 -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
          style={{ border: "1.5px solid var(--blue-400)" }}
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: [0.3, 1.6], opacity: [0.8, 0] }}
          transition={{ duration: 2.2, delay: 1.1, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-2 w-5 -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
        style={{ background: "rgb(0 0 0 / 0.45)", filter: "blur(2px)" }}
      />
      {/* Trefferfläche 48 × 56 px um den Pin */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="group pointer-events-auto absolute -left-6 -top-[52px] h-14 w-12 rounded-lg cursor-pointer"
      >
        <motion.svg
          aria-hidden
          width="34"
          height="44"
          viewBox="0 0 34 44"
          className="absolute left-[7px] top-[9px] transition-[translate] duration-200 group-hover:-translate-y-1"
          style={{ filter: "drop-shadow(0 6px 8px rgb(0 0 0 / 0.5))" }}
          initial={reduce ? false : { y: -28, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <path
            d="M17 1C8.16 1 1 8.1 1 16.88 1 28.4 17 43 17 43s16-14.6 16-26.12C33 8.1 25.84 1 17 1Z"
            fill="var(--blue-400)"
            stroke="var(--blue-200)"
            strokeWidth="1"
          />
          <circle cx="17" cy="17" r="6.5" fill="var(--ink-950)" />
        </motion.svg>
      </a>
    </div>
  );
}
