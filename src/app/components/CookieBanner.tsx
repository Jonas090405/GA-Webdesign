import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { grantConsent, denyConsent } from "../../lib/analytics";
import { useCopy, useLocalePath } from "../../i18n";

const COPY = {
  de: {
    before: "Mit deiner Einwilligung nutzen wir",
    after:
      "mit Cookies, um die Nutzung pseudonym auszuwerten und das Angebot zu verbessern. Dabei können Daten an Google in die USA übermittelt werden. Deine Einwilligung ist freiwillig und jederzeit widerrufbar.",
    more: "Mehr erfahren",
    decline: "Ablehnen",
    accept: "Akzeptieren",
  },
  en: {
    before: "With your consent, we use",
    after:
      "with cookies to analyze site usage under a pseudonym and improve what we offer. This may involve transferring data to Google in the USA. Your consent is voluntary and you can withdraw it at any time.",
    more: "Learn more",
    decline: "Decline",
    accept: "Accept",
  },
};

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const t = useCopy(COPY);
  const lp = useLocalePath();

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    } else if (consent === "granted") {
      grantConsent();
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "granted");
    setVisible(false);
    grantConsent();
  }

  function decline() {
    localStorage.setItem("cookie-consent", "denied");
    setVisible(false);
    denyConsent();
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
            style={{ background: "var(--ink-900)" }}
          >
            <p className="text-ink-200 text-[13px] leading-relaxed mb-4">
              {t.before}{" "}
              <strong className="text-slate-100">Google Analytics</strong>{" "}
              {t.after}{" "}
              <a
                href={lp("/datenschutz")}
                className="text-brand underline hover:text-brand-light transition-colors"
              >
                {t.more}
              </a>
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={decline}
                className="px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-300 cursor-pointer"
                style={{
                  background: "rgb(var(--blue-400-rgb) / 0.07)",
                  border: "1px solid rgb(var(--blue-400-rgb) / 0.2)",
                  color: "var(--ink-100)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgb(var(--blue-400-rgb) / 0.13)";
                  e.currentTarget.style.borderColor = "rgb(var(--blue-400-rgb) / 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgb(var(--blue-400-rgb) / 0.07)";
                  e.currentTarget.style.borderColor = "rgb(var(--blue-400-rgb) / 0.2)";
                }}
              >
                {t.decline}
              </button>
              <button
                onClick={accept}
                className="px-4 py-2 rounded-xl text-[13px] font-medium text-white transition-[filter] duration-300 hover:brightness-110 cursor-pointer"
                style={{
                  background: "var(--gradient-cta)",
                }}
              >
                {t.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
