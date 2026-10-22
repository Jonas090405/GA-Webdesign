import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FadeIn } from "../FadeIn";
import { PrimaryButton, GhostButton } from "../Button";
import { HeroModels } from "../HeroModels";
import { usePageMeta } from "../../hooks/usePageMeta";
import { useCopy, useLocalePath } from "../../../i18n";

const COPY = {
  de: {
    metaTitle: "Seite nicht gefunden | G&A Webdesign",
    metaDescription:
      "Diese Seite existiert nicht oder wurde verschoben. Zurück zur Startseite von G&A Webdesign.",
    text:
      "Diese Seite gibt es nicht — vielleicht wurde sie verschoben oder der Link enthält einen Tippfehler. Immerhin hast du uns beide gefunden.",
    home: "Zur Startseite",
    contact: "Kontakt aufnehmen",
    caption: "Hier gibt's nichts zu sehen\u00a0… außer uns.",
  },
  en: {
    metaTitle: "Page not found | G&A Webdesign",
    metaDescription:
      "This page doesn't exist or has moved. Head back to the G&A Webdesign homepage.",
    text:
      "This page doesn't exist. Maybe it moved, or there's a typo in the link. At least you found the two of us.",
    home: "Back to homepage",
    contact: "Get in touch",
    caption: "Nothing to see here\u00a0… except us.",
  },
};

export function NotFound() {
  const navigate = useNavigate();
  const t = useCopy(COPY);
  const lp = useLocalePath();

  usePageMeta({
    title: t.metaTitle,
    description: t.metaDescription,
  });

  // 404-Seiten sollen nicht in den Google-Index
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <main
      id="main-content"
      className="mx-auto max-w-7xl 2xl:max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 pt-28 sm:pt-32 pb-24 min-h-[80vh] flex items-center"
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 xl:gap-16 items-center w-full">
        {/* Text + Auswege */}
        <div>
          <FadeIn>
            <h1 className="text-white text-[clamp(56px,12vw,140px)] tracking-tight leading-[0.95]">
              4
              <span
                className="text-blue-400"
              >
                0
              </span>
              4
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="mt-6 max-w-xl text-[16px] sm:text-[18px] leading-relaxed text-ink-200"
            >
              {t.text}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <PrimaryButton onClick={() => navigate(lp("/"))}>
                {t.home}
              </PrimaryButton>
              <GhostButton onClick={() => navigate(lp("/kontakt"))}>
                {t.contact}
              </GhostButton>
            </div>
          </FadeIn>
        </div>

        {/* Spielerei: unsere 3D-Modelle haben sich auch verlaufen */}
        <FadeIn delay={0.25} className="flex flex-col items-center lg:items-end">
          <div className="w-full max-w-[300px] sm:max-w-[420px] xl:max-w-[520px]">
            <HeroModels />
            <p
              className="mt-5 text-center text-[13px] sm:text-[14px]"
              style={{ color: "rgba(170,200,225,0.6)" }}
              aria-hidden="true"
            >
              {t.caption}
            </p>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
