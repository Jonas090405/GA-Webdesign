import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import jonasImg from "../../imports/Jonas_Gissler.png";
import berkantImg from "../../imports/Berkant_agyar.jpeg";

/**
 * Kompakte Agentur-Vorstellung für die Hero-Section: Jonas & Berkant plus ein
 * kurzer, lokal fokussierter Intro-Text (Schwarzwald / Triberg). Offener Block
 * ohne Container.
 */
export function AgencyIntro() {
  return (
    <div>
      {/* Team – Jonas & Berkant */}
      <div className="flex items-center gap-5">
        <div className="flex shrink-0">
          <div
            className="h-[80px] w-[80px] xl:h-[96px] xl:w-[96px] overflow-hidden rounded-full"
            style={{
              border: "2px solid rgba(77,190,243,0.5)",
              position: "relative",
              zIndex: 2,
            }}
          >
            <img
              src={jonasImg}
              alt="Jonas Gissler"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div
            className="h-[80px] w-[80px] xl:h-[96px] xl:w-[96px] -ml-5 xl:-ml-6 overflow-hidden rounded-full"
            style={{
              border: "2px solid rgba(77,190,243,0.5)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <img
              src={berkantImg}
              alt="Berkant Agyar"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
        <div>
          <div className="text-[19px] xl:text-[22px] font-medium leading-tight text-white">
            Jonas &amp; Berkant
          </div>
          <div className="mt-1 text-[13px] xl:text-[14px]" style={{ color: "#4dbef3" }}>
            G&amp;A Webdesign · Triberg
          </div>
        </div>
      </div>

      {/* Intro */}
      <h2 className="mt-7 xl:mt-9 text-[24px] sm:text-[27px] xl:text-[32px] leading-snug tracking-tight text-white">
        Persönliches Webdesign aus dem Schwarzwald.
      </h2>
      <p
        className="mt-4 max-w-xl text-[15px] xl:text-[17px] leading-relaxed"
        style={{ color: "rgba(180,210,230,0.72)" }}
      >
        Als kleines Team aus dem Schwarzwald erstellen wir moderne Webseiten für
        lokale Unternehmen – von Triberg über St. Georgen bis Villingen-Schwenningen.
        Vom ersten Gespräch bis zur fertigen Website hast du feste Ansprechpartner,
        die deine Region und deine Kunden kennen. Webdesign, Entwicklung, Hosting und
        SEO kommen komplett aus einer Hand – du musst dich um nichts kümmern.
      </p>

      {/* Link */}
      <Link
        to="/ueber-uns"
        className="group/link mt-6 inline-flex items-center gap-1.5 text-[15px] xl:text-[16px] font-medium transition-colors duration-200"
        style={{ color: "rgba(125,211,252,0.9)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(186,230,253,1)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(125,211,252,0.9)")}
      >
        Lerne uns kennen
        <ArrowRight
          size={16}
          className="transition-transform duration-200 ease-out group-hover/link:translate-x-0.5"
          aria-hidden
        />
      </Link>
    </div>
  );
}
