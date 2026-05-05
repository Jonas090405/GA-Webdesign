import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { initGA } from "../../lib/analytics";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    } else if (consent === "granted") {
      initGA();
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "granted");
    setVisible(false);
    initGA();
  }

  function decline() {
    localStorage.setItem("cookie-consent", "denied");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 z-50 max-w-lg mx-auto"
        >
          <div
            className="rounded-2xl border border-white/10 shadow-2xl p-5"
            style={{ background: "rgb(16, 22, 28)" }}
          >
            <p className="text-slate-300 text-[13px] leading-relaxed mb-4">
              Diese Website verwendet{" "}
              <strong className="text-slate-100">Cookies</strong>, um die
              Nutzung anonym auszuwerten und das Angebot zu verbessern. Deine
              Einwilligung ist freiwillig und jederzeit widerrufbar.{" "}
              <a
                href="/datenschutz"
                className="text-sky-400 underline hover:text-sky-300 transition-colors"
              >
                Mehr erfahren
              </a>
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={decline}
                className="px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-300 cursor-pointer"
                style={{
                  background: "rgba(77, 190, 243, 0.07)",
                  border: "1px solid rgba(77, 190, 243, 0.2)",
                  color: "rgba(200, 235, 255, 0.85)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(77, 190, 243, 0.13)";
                  e.currentTarget.style.borderColor = "rgba(77, 190, 243, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(77, 190, 243, 0.07)";
                  e.currentTarget.style.borderColor = "rgba(77, 190, 243, 0.2)";
                }}
              >
                Ablehnen
              </button>
              <button
                onClick={accept}
                className="px-4 py-2 rounded-xl text-[13px] font-medium text-white transition-[filter] duration-300 hover:brightness-110 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #006999 0%, #4dbef3 100%)",
                }}
              >
                Akzeptieren
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
