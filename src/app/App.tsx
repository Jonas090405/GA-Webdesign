import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";
import { Home } from "./components/pages/Home";
import { Portfolio } from "./components/pages/Portfolio";
import { Leistungen } from "./components/pages/Leistungen";
import { Ablauf } from "./components/pages/Ablauf";
import { About } from "./components/pages/About";
import { Impressum } from "./components/pages/Impressum";
import { Datenschutz } from "./components/pages/Datenschutz";
import { Kontakt } from "./components/pages/Kontakt";
import { CookieBanner } from "./components/CookieBanner";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    document.body.style.background = "rgb(13, 17, 21)";
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
    ease: [0.22, 1, 0.36, 1],
  };

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden" style={{ background: "linear-gradient(160deg, rgb(13,17,21) 0%, rgb(16,24,28) 60%, rgb(13,17,21) 100%)" }}>
      <ScrollProgress />
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
              <Home />
            </motion.div>
          } />
          <Route path="/projekte" element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
              <Portfolio />
            </motion.div>
          } />
          <Route path="/leistungen" element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
              <Leistungen />
            </motion.div>
          } />
          <Route path="/ablauf" element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
              <Ablauf />
            </motion.div>
          } />
          <Route path="/ueber-uns" element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
              <About />
            </motion.div>
          } />
          <Route path="/kontakt" element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
              <Kontakt />
            </motion.div>
          } />
          <Route path="/impressum" element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
              <Impressum />
            </motion.div>
          } />
          <Route path="/datenschutz" element={
            <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
              <Datenschutz />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>

      <Footer />
      <CookieBanner />
    </div>
  );
}