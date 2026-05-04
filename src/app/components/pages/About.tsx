import { motion } from "motion/react";
import { SectionLabel } from "../SectionLabel";
import { Card } from "../Card";
import { PrimaryButton } from "../Button";
import { FadeIn } from "../FadeIn";
import { useNavigate } from "react-router-dom";
import profilbild from "../../../imports/Profilbild.jpg";
import { Zap, Layers, UserCheck, type LucideIcon } from "lucide-react";

export function About() {
  const navigate = useNavigate();
  return (
    <main className="mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-36 sm:pt-44 lg:pt-52 xl:pt-60 2xl:pt-72 pb-12 xl:pb-20 2xl:pb-28">
      <FadeIn>
        <SectionLabel>Über mich</SectionLabel>
      </FadeIn>

      {/* Hero with profile picture */}
      <div className="mt-4 grid gap-10 md:gap-16 2xl:gap-24 md:grid-cols-5 items-center">
        <FadeIn className="md:col-span-3">
          <h1 className="text-white text-[clamp(36px,6vw,80px)] tracking-tight leading-[1.05]">
            Hi, ich bin{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #4dbef3 0%, #006999 100%)",
              }}
            >
              Jonas.
            </span>
          </h1>
          <p
            className="mt-6 text-[16px] sm:text-[17px] xl:text-[19px] 2xl:text-[21px] leading-relaxed"
            style={{ color: "rgba(200, 225, 240, 0.8)" }}
          >
            Ich bin 21 Jahre alt und komme aus Triberg im Schwarzwald.
            Ich designe und entwickle Websites für lokale Unternehmen.
            Von der ersten Idee bis sie live sind.
          </p>
          <p
            className="mt-4 text-[15px] xl:text-[17px] 2xl:text-[18px] leading-relaxed"
            style={{ color: "rgba(180, 210, 230, 0.6)" }}
          >
            Aktuell studiere ich Medienkonzeption an der Hochschule Furtwangen
            mit Fokus auf Webdesign und Nutzererfahrung. Nebenbei arbeite ich ich als Softwaredesigner bei M&M Software. <br />Mein Fachwissen aus Studium und Beruf bringe ich direkt in den Projekt ein.
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="md:col-span-2 flex justify-center md:justify-end">
          <div className="group relative">
            {/* Outer decorative ring */}
            <div
              className="absolute inset-0 rounded-full scale-[1.10]"
              style={{ border: "1px solid rgba(77, 190, 243, 0.15)" }}
            />
            {/* Inner decorative ring */}
            <div
              className="absolute inset-0 rounded-full scale-[1.04]"
              style={{ border: "1px solid rgba(77, 190, 243, 0.08)" }}
            />
            {/* Rotierender Akzent-Ring */}
            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-full scale-[1.18] pointer-events-none"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgba(77,190,243,0.50) 80deg, transparent 160deg, transparent 360deg)",
                WebkitMask:
                  "radial-gradient(circle, transparent 49%, #000 50%, #000 51%, transparent 52%)",
                mask: "radial-gradient(circle, transparent 49%, #000 50%, #000 51%, transparent 52%)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />
            {/* Profile image circle */}
            <div
              className="relative h-60 w-60 sm:h-72 sm:w-72 xl:h-80 xl:w-80 2xl:h-96 2xl:w-96 rounded-full overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              style={{ border: "2px solid rgba(77, 190, 243, 0.45)" }}
            >
              <img
                src={profilbild}
                alt="Jonas Gissler"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Info cards */}
      <div className="mt-16 2xl:mt-24 grid gap-4 2xl:gap-6 md:grid-cols-2 items-stretch">
        <FadeIn className="h-full">
          <Card className="h-full">
            <div
              className="text-[12px] tracking-[0.25em] uppercase mb-5"
              style={{ color: "#4dbef3" }}
            >
              Hintergrund
            </div>
            <ul
              className="space-y-3 text-[14px]"
              style={{ color: "rgba(200, 225, 240, 0.8)" }}
            >
              <li>Studium Medienkonzeption im 6. Semester (HFU Furtwangen)</li>
              <li>Schwerpunkt UX/UI Design & Frontend-Entwicklung</li>
              <li>Arbeitserfahrung als Softwaredesigner</li>
              <li>Aus Triberg im Schwarzwald</li>
            </ul>
          </Card>
        </FadeIn>
        <FadeIn delay={0.08} className="h-full">
          <Card className="h-full">
            <div
              className="text-[12px] tracking-[0.25em] uppercase mb-5"
              style={{ color: "#4dbef3" }}
            >
              Womit ich arbeite
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Figma",
                "React",
                "KI",
                "TypeScript",
                "TailwindCSS",
                "Motiondesign",
                "Vercel",
                "EmailJS",
                "Google Analytics",
                "GitHub",
                "Strapi",
                "Supabase",
              ].map((t) => (
                <span
                  key={t}
                  className="tag-pill rounded-full px-3 py-1 2xl:px-4 2xl:py-1.5 text-[12px] 2xl:text-[14px]"
                  style={{
                    background: "rgba(77, 190, 243, 0.08)",
                    border: "1px solid rgba(77, 190, 243, 0.18)",
                    color: "rgba(180, 225, 245, 0.85)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </Card>
        </FadeIn>
      </div>

      {/* Philosophy */}
      <div className="mt-20 2xl:mt-28">
        <FadeIn>
          <SectionLabel>Mein Ansatz</SectionLabel>
          <h2 className="text-white text-[clamp(26px,4vw,52px)] tracking-tight max-w-2xl 2xl:max-w-3xl mb-10 2xl:mb-14">
            Was mir bei jeder Website wichtig ist.
          </h2>
        </FadeIn>
        <div className="grid gap-6 2xl:gap-8 sm:grid-cols-2 md:grid-cols-3 items-stretch">
          {([
            {
              Icon: Zap,
              t: "Einfach & klar",
              d: "Deine Kunden sollen sofort verstehen, was du anbietest. Ganz ohne suchen zu müssen.",
            },
            {
              Icon: Layers,
              t: "Design & Technik aus einer Hand",
              d: "Ich mache beides selbst. So entsteht kein Wirrwarr zwischen verschiedenen Anbietern.",
            },
            {
              Icon: UserCheck,
              t: "Persönliche Betreuung",
              d: "Du arbeitest direkt mit mir. Kein Callcenter, kein Ping-Pong. Ein Ansprechpartner für alles.",
            },
          ] as { Icon: LucideIcon; t: string; d: string }[]).map(({ Icon, t, d }) => (
            <FadeIn key={t} className="h-full">
              <Card className="h-full">
                <div
                  className="mb-4 inline-flex items-center justify-center rounded-xl p-2.5"
                  style={{
                    background: "rgba(77, 190, 243, 0.10)",
                    border: "1px solid rgba(77, 190, 243, 0.18)",
                  }}
                >
                  <Icon size={22} color="#4dbef3" strokeWidth={1.8} />
                </div>
                <h3 className="text-white text-[18px] sm:text-[20px] 2xl:text-[23px] mb-2">
                  {t}
                </h3>
                <p
                  className="text-[14px] 2xl:text-[16px] leading-relaxed"
                  style={{ color: "rgba(180, 210, 230, 0.6)" }}
                >
                  {d}
                </p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* CTA */}
      <FadeIn>
        <div className="mt-20 2xl:mt-28 text-center">
          <h2 className="text-white text-[28px] 2xl:text-[36px] mb-3">
            Lass uns miteinander reden.
          </h2>
          <p
            className="text-[15px] xl:text-[16px] 2xl:text-[18px] mb-8"
            style={{ color: "rgba(180, 210, 230, 0.6)" }}
          >
            Unverbindlich, entspannt und auf Augenhöhe.
          </p>
          <PrimaryButton onClick={() => navigate("/kontakt")}>
            Projekt anfragen
          </PrimaryButton>
        </div>
      </FadeIn>
    </main>
  );
}