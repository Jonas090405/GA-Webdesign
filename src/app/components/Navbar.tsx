import { useState, useEffect } from "react";
import { Briefcase, Layers, User, Mail, Menu, X, Route } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useLocation, Link } from "react-router-dom";
import logoUrl from "../../imports/Logo_GA_Webdesign.svg";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { useWhatsAppLink } from "./ContactForm";
import { localizePath, rememberLang, useCopy, useLang, useLocalePath, type Lang } from "../../i18n";

const COPY = {
  de: {
    skip: "Zum Inhalt springen",
    home: "Zur Startseite",
    logoAlt: "G&A Webdesign Logo",
    mainNav: "Hauptnavigation",
    mobileNav: "Mobilnavigation",
    menu: "Hauptmenü",
    openMenu: "Hauptmenü öffnen",
    closeMenu: "Hauptmenü schließen",
    language: "Sprache",
    waLabel: "Berkant Agyar auf WhatsApp schreiben (öffnet WhatsApp)",
    waCta: "Nachricht schreiben",
    nav: {
      "/projekte": "Projekte",
      "/leistungen": "Leistungen",
      "/ablauf": "Ablauf",
      "/ueber-uns": "Über uns",
      "/kontakt": "Kontakt",
    },
  },
  en: {
    skip: "Skip to content",
    home: "Go to homepage",
    logoAlt: "G&A Webdesign logo",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    menu: "Main menu",
    openMenu: "Open main menu",
    closeMenu: "Close main menu",
    language: "Language",
    waLabel: "Message Berkant Agyar on WhatsApp (opens WhatsApp)",
    waCta: "Send a message",
    nav: {
      "/projekte": "Projects",
      "/leistungen": "Services",
      "/ablauf": "Process",
      "/ueber-uns": "About us",
      "/kontakt": "Contact",
    },
  },
};

const LANGS: { code: Lang; short: string; name: string }[] = [
  { code: "de", short: "DE", name: "Deutsch" },
  { code: "en", short: "EN", name: "English" },
];

/**
 * Sprachumschalter: zwei echte Links auf die Gegenstücke der aktuellen Seite
 * (crawlbar, mit hreflang). Die Wahl wird gemerkt und hat dann Vorrang vor
 * der automatischen Umleitung. Die Markierung gleitet beim Wechsel mit.
 */
function LanguageToggle({ wide = false, className = "" }: { wide?: boolean; className?: string }) {
  const lang = useLang();
  const t = useCopy(COPY);
  const { pathname, search, hash } = useLocation();

  return (
    <div
      role="group"
      aria-label={t.language}
      className={`inline-flex items-center rounded-full p-1 ${className}`}
      style={{
        border: "1px solid rgb(var(--blue-400-rgb) / 0.14)",
        background: "rgb(var(--ink-950-rgb) / 0.35)",
      }}
    >
      {LANGS.map(({ code, short, name }) => {
        const active = code === lang;
        return (
          <Link
            key={code}
            to={localizePath(pathname + search + hash, code)}
            onClick={() => rememberLang(code)}
            hrefLang={code}
            lang={code}
            aria-label={wide ? undefined : name}
            aria-current={active ? "true" : undefined}
            className={`relative isolate flex-1 rounded-full text-center font-semibold no-underline whitespace-nowrap transition-colors duration-200 cursor-pointer ${
              wide ? "px-4 py-2.5 text-[15px]" : "px-2.5 py-1 text-[13px] tracking-[0.06em]"
            } ${active ? "text-white" : "text-ink-400 hover:text-ink-100"}`}
          >
            {active && (
              <motion.span
                layoutId={wide ? "lang-pill-wide" : "lang-pill"}
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-full"
                style={{
                  background: "rgb(var(--blue-400-rgb) / 0.16)",
                  boxShadow: "inset 0 0 0 1px rgb(var(--blue-400-rgb) / 0.22)",
                }}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            {wide ? name : short}
          </Link>
        );
      })}
    </div>
  );
}

/** WhatsApp-CTA im Header – gleicher Verlauf wie die übrigen Primär-Buttons. */
function WhatsAppCta({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  const t = useCopy(COPY);
  const href = useWhatsAppLink();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.waLabel}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium text-white whitespace-nowrap no-underline cursor-pointer transition-[filter,padding,font-size] duration-300 hover:brightness-110 active:brightness-95 ${className}`}
      style={{ background: "var(--gradient-cta)", ...style }}
    >
      <WhatsAppIcon size={16} />
      {t.waCta}
    </a>
  );
}

const items = [
  { id: "/projekte", Icon: Briefcase },
  { id: "/leistungen", Icon: Layers },
  { id: "/ablauf", Icon: Route },
  { id: "/ueber-uns", Icon: User },
  { id: "/kontakt", Icon: Mail },
] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const t = useCopy(COPY);
  const lp = useLocalePath();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  return (
    <>
      {/* Skip navigation – WCAG 2.4.1 */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:font-medium focus:text-sm"
        style={{ background: "var(--blue-400)", color: "#0d1115" }}
      >
        {t.skip}
      </a>

      {/* ── DESKTOP header bar (lg+) ───────────────────────── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 hidden xl:block"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="transition-all duration-300"
          style={{
            background: scrolled ? "rgb(var(--ink-950-rgb) / 0.80)" : "transparent",
            backdropFilter: scrolled ? "blur(14px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
            borderBottom: scrolled ? "1px solid rgb(var(--blue-400-rgb) / 0.08)" : "1px solid transparent",
            boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.35)" : "none",
          }}
        >
          {/* Full-width relative layer so nav centers to viewport */}
          <div
            className="relative w-full"
            style={{ height: scrolled ? "72px" : "96px", transition: "height 0.3s ease" }}
          >
            {/* Logo – always pinned to viewport top-left */}
            <div className="absolute inset-y-0 left-6 lg:left-8 flex items-center">
              <Link
                to={lp("/")}
                aria-label={t.home}
                className="cursor-pointer hover:opacity-75 transition-opacity duration-200 shrink-0"
              >
                <img
                  src={logoUrl}
                  alt={t.logoAlt}
                  style={{ height: scrolled ? "36px" : "44px", transition: "height 0.3s ease", width: "auto" }}
                />
              </Link>
            </div>

            {/* Nav items – centered to full viewport */}
            <nav aria-label={t.mainNav} className="absolute inset-0 hidden xl:flex items-center justify-center gap-10 pointer-events-none">
              {items.map(({ id, Icon }) => {
                const href = lp(id);
                const active = location.pathname === href || location.pathname.startsWith(`${href}/`);
                return (
                  <Link
                    key={id}
                    to={href}
                    aria-current={active ? "page" : undefined}
                    className="nav-item group flex items-center gap-2.5 font-medium cursor-pointer relative py-1.5 whitespace-nowrap pointer-events-auto no-underline"
                    style={{ color: active ? "#ffffff" : "var(--ink-200)", fontSize: scrolled ? "15px" : "17px", transition: "color 0.2s, font-size 0.35s ease", textDecoration: "none" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                      const bar = e.currentTarget.querySelector(".underline-bar") as HTMLElement | null;
                      if (bar) bar.style.width = "100%";
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-200)";
                        const bar = e.currentTarget.querySelector(".underline-bar") as HTMLElement | null;
                        if (bar) bar.style.width = "0%";
                      }
                    }}
                  >
                    <Icon
                      size={16}
                      style={{ color: active ? "var(--blue-400)" : "inherit", transition: "color 0.2s" }}
                    />
                    <span className="relative">
                      {t.nav[id]}
                      <span
                        className="absolute -bottom-0.5 left-0 h-[1.5px] rounded-full transition-all duration-200 underline-bar"
                        style={{
                          width: active ? "100%" : "0%",
                          background: "var(--blue-400)",
                        }}
                      />
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Sprache + WhatsApp-CTA – rechts gegenüber vom Logo */}
            <div className="absolute inset-y-0 right-6 lg:right-8 flex items-center gap-3">
              <LanguageToggle />
              <WhatsAppCta
                className={scrolled ? "px-4 py-2" : "px-5 py-2.5"}
                style={{ fontSize: scrolled ? "14px" : "15px" }}
              />
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── MOBILE / TABLET header bar ────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 xl:hidden flex items-center justify-between px-4 transition-all duration-300"
        style={{
          height: "60px",
          background: scrolled ? "rgb(var(--ink-950-rgb) / 0.80)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid rgb(var(--blue-400-rgb) / 0.08)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.35)" : "none",
        }}
      >
        <Link
          to={lp("/")}
          aria-label={t.home}
          className="cursor-pointer hover:opacity-75 transition-opacity duration-200"
        >
          <img src={logoUrl} alt={t.logoAlt} className="h-9 w-auto" />
        </Link>

        <div className="flex items-center gap-1.5">
          {/* Unter sm wäre kein Platz neben Logo und CTA – dort sitzt der Umschalter im Menü. */}
          <div className="hidden sm:block mr-1.5">
            <LanguageToggle />
          </div>
          <WhatsAppCta className="px-3.5 py-2 text-[13px]" />
          <button
            onClick={() => setIsOpen(true)}
            aria-label={t.openMenu}
            className="p-2 text-white hover:text-blue-400 transition-colors cursor-pointer"
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* Sidebar overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-[#060c10]/80 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              role="dialog"
              aria-modal="true"
              aria-label={t.menu}
              className="fixed top-0 right-0 bottom-0 w-[300px] z-[70] flex flex-col overflow-y-auto shadow-[-16px_0_48px_rgba(0,0,0,0.6)]"
              style={{
                background: "linear-gradient(160deg, var(--ink-900) 0%, rgb(11,15,19) 100%)",
                borderLeft: "1px solid rgb(var(--blue-400-rgb) / 0.12)",
              }}
            >
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <Link
                  to={lp("/")}
                  onClick={() => setIsOpen(false)}
                  aria-label={t.home}
                  className="cursor-pointer hover:opacity-70 transition-opacity duration-200"
                >
                  <img src={logoUrl} alt={t.logoAlt} className="h-9 w-auto" />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label={t.closeMenu}
                  className="p-2.5 rounded-full bg-white/5 text-white cursor-pointer"
                >
                  <X size={22} />
                </button>
              </div>

              <div
                className="mx-6 mb-4"
                style={{ height: "1px", background: "rgb(var(--blue-400-rgb) / 0.08)" }}
              />

              <nav aria-label={t.mobileNav}>
                <div className="flex flex-col gap-1.5 px-4 py-2">
                  {items.map(({ id, Icon }) => {
                    const href = lp(id);
                    const active = location.pathname === href || location.pathname.startsWith(`${href}/`);
                    return (
                      <Link
                        key={id}
                        to={href}
                        onClick={() => setIsOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className="flex items-center gap-4 rounded-2xl px-5 py-4 text-[17px] font-medium transition-colors cursor-pointer"
                        style={{
                          textDecoration: "none",
                          ...(active
                            ? {
                                background: "rgb(var(--blue-400-rgb) / 0.1)",
                                color: "var(--blue-400)",
                                border: "1px solid rgb(var(--blue-400-rgb) / 0.2)",
                              }
                            : {
                                color: "rgba(210,230,245,0.75)",
                                border: "1px solid transparent",
                              }),
                        }}
                      >
                        <Icon size={22} style={{ color: active ? "var(--blue-400)" : "var(--ink-200)" }} />
                        <span>{t.nav[id]}</span>
                      </Link>
                    );
                  })}
                </div>
              </nav>

              <div className="mt-auto px-6 pt-6 pb-8 flex flex-col gap-4">
                <LanguageToggle wide className="w-full" />
                <WhatsAppCta className="w-full px-5 py-3.5 text-[16px]" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}