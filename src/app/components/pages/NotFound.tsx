import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SectionLabel } from "../SectionLabel";
import { FadeIn } from "../FadeIn";
import { PrimaryButton, GhostButton } from "../Button";
import { HeroModels } from "../HeroModels";
import { usePageMeta } from "../../hooks/usePageMeta";

export function NotFound() {
  const navigate = useNavigate();

  usePageMeta({
    title: "Seite nicht gefunden | G&A Webdesign",
    description:
      "Diese Seite existiert nicht oder wurde verschoben. Zurück zur Startseite von G&A Webdesign.",
    path: "/404",
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
            <SectionLabel>Fehler 404</SectionLabel>
            <h1 className="text-white text-[clamp(56px,12vw,140px)] tracking-tight leading-[0.95]">
              4
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #4dbef3 0%, #006999 100%)",
                }}
              >
                0
              </span>
              4
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p
              className="mt-6 max-w-xl text-[16px] sm:text-[18px] leading-relaxed"
              style={{ color: "rgba(200, 225, 240, 0.75)" }}
            >
              Diese Seite gibt es nicht — vielleicht wurde sie verschoben oder
              der Link enthält einen Tippfehler. Immerhin hast du uns beide
              gefunden.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <PrimaryButton onClick={() => navigate("/")}>
                Zur Startseite
              </PrimaryButton>
              <GhostButton onClick={() => navigate("/kontakt")}>
                Kontakt aufnehmen
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
              Hier gibt&apos;s nichts zu sehen&nbsp;… außer uns.
            </p>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
