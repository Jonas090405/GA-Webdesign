import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { Card } from "./Card";
import jonasImg from "../../imports/Jonas_Gissler.png";
import berkantImg from "../../imports/Berkant_agyar.jpeg";

/**
 * Kompakte Agentur-Vorstellung für die Hero-Section: Jonas & Berkant plus ein
 * kurzer, lokal fokussierter Intro-Text (Schwarzwald / Triberg).
 */

function Chip({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon?: React.ElementType;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] xl:text-[13px] font-medium"
      style={{
        background: "rgba(77,190,243,0.08)",
        border: "1px solid rgba(77,190,243,0.18)",
        color: "rgba(200,235,255,0.8)",
      }}
    >
      {Icon && <Icon size={13} style={{ color: "#4dbef3" }} aria-hidden />}
      {children}
    </span>
  );
}

export function AgencyIntro() {
  return (
    <Card>
      {/* Team – Jonas & Berkant */}
      <div className="flex items-center gap-4">
        <div className="flex shrink-0">
          <div
            className="h-[52px] w-[52px] xl:h-[58px] xl:w-[58px] overflow-hidden rounded-full"
            style={{
              border: "2px solid rgba(77,190,243,0.45)",
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
            className="h-[52px] w-[52px] xl:h-[58px] xl:w-[58px] overflow-hidden rounded-full"
            style={{
              border: "2px solid rgba(77,190,243,0.45)",
              marginLeft: -16,
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
          <div className="text-[17px] xl:text-[19px] font-medium leading-tight text-white">
            Jonas &amp; Berkant
          </div>
          <div className="mt-1 text-[12px] xl:text-[13px]" style={{ color: "#4dbef3" }}>
            G&amp;A Webdesign · Triberg
          </div>
        </div>
      </div>

      {/* Intro */}
      <h2 className="mt-6 xl:mt-7 text-[21px] sm:text-[23px] xl:text-[27px] leading-snug tracking-tight text-white">
        Persönlich aus dem Schwarzwald.
      </h2>
      <p
        className="mt-3 text-[14px] xl:text-[16px] leading-relaxed"
        style={{ color: "rgba(180,210,230,0.7)" }}
      >
        Wir bauen moderne Webseiten für lokale Unternehmen in der Region rund um
        Triberg – verständlich erklärt und komplett aus einer Hand.
      </p>

      {/* Trust-Chips */}
      <div className="mt-5 flex flex-wrap gap-2">
        <Chip icon={MapPin}>Aus Triberg</Chip>
        <Chip>Persönlich vor Ort</Chip>
        <Chip>Alles aus einer Hand</Chip>
      </div>

      {/* Link */}
      <Link
        to="/ueber-uns"
        className="group/link mt-6 inline-flex items-center gap-1.5 text-[14px] xl:text-[15px] font-medium transition-colors duration-200"
        style={{ color: "rgba(125,211,252,0.9)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(186,230,253,1)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(125,211,252,0.9)")}
      >
        Lerne uns kennen
        <ArrowRight
          size={15}
          className="transition-transform duration-200 ease-out group-hover/link:translate-x-0.5"
          aria-hidden
        />
      </Link>
    </Card>
  );
}
