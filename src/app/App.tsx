import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./components/pages/Home";
import { Portfolio } from "./components/pages/Portfolio";
import { CaseStudy } from "./components/pages/CaseStudy";
import { Leistungen } from "./components/pages/Leistungen";
import { Ablauf } from "./components/pages/Ablauf";
import { About } from "./components/pages/About";
import { Impressum } from "./components/pages/Impressum";
import { Datenschutz } from "./components/pages/Datenschutz";
import { AGB } from "./components/pages/AGB";
import { Kontakt } from "./components/pages/Kontakt";
import { NotFound } from "./components/pages/NotFound";
import { CookieBanner } from "./components/CookieBanner";
import { localizePath } from "../i18n";
import { useLanguageRedirect } from "../i18n/useLanguageRedirect";

/** Jede Seite hängt unter ihrem deutschen Pfad und dem englischen Gegenstück (/en/…). */
const PAGES = [
  { path: "/", Page: Home },
  { path: "/projekte", Page: Portfolio },
  { path: "/projekte/:slug", Page: CaseStudy },
  { path: "/leistungen", Page: Leistungen },
  { path: "/ablauf", Page: Ablauf },
  { path: "/ueber-uns", Page: About },
  { path: "/kontakt", Page: Kontakt },
  { path: "/impressum", Page: Impressum },
  { path: "/datenschutz", Page: Datenschutz },
  { path: "/agb", Page: AGB },
];

export default function App() {
  const location = useLocation();
  useLanguageRedirect();

  useEffect(() => {
    document.body.style.background = "var(--ink-950)";
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  const pageVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };

  const pageTransition = {
    duration: 0.45,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    // overflow-x-clip statt -hidden: `hidden` würde diesen Container zum
    // Scroll-Container machen und damit `position: sticky` im Hero aushebeln.
    <div className="min-h-screen text-white relative overflow-x-clip" style={{ background: "var(--page-gradient)" }}>
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {PAGES.flatMap(({ path, Page }) =>
            [path, localizePath(path, "en")].map((p) => (
              <Route key={p} path={p} element={
                <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
                  <Page />
                </motion.div>
              } />
            ))
          )}
          <Route path="*" element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
              <NotFound />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>

      <Footer />
      <CookieBanner />
    </div>
  );
}