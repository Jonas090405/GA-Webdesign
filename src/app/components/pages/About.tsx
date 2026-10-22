import { usePageMeta } from "../../hooks/usePageMeta";
import { motion } from "motion/react";
import { Card } from "../Card";
import { PrimaryButton } from "../Button";
import { FadeIn } from "../FadeIn";
import { useNavigate } from "react-router-dom";
import { useCopy, useLocalePath } from "../../../i18n";
import profilbild from "../../../imports/Jonas_Gissler.jpg";
import berkantImg from "../../../imports/Berkant_agyar.jpeg";
import { Linkedin } from "lucide-react";
import { PortraitRing } from "../PortraitRing";
import { TileMedia } from "../TileMedia";
import tileZapClip from "../../../imports/tile-zap.mp4";
import tileZapPoster from "../../../imports/tile-zap-poster.webp";
import tileLayersClip from "../../../imports/tile-layers.mp4";
import tileLayersPoster from "../../../imports/tile-layers-poster.webp";
import tileUsersClip from "../../../imports/tile-users.mp4";
import tileUsersPoster from "../../../imports/tile-users-poster.webp";

type AnsatzItem = { poster: string; clip: string; t: string; d: string };

const ANSATZ: { de: AnsatzItem[]; en: AnsatzItem[] } = {
  de: [
    {
      poster: tileZapPoster,
      clip: tileZapClip,
      t: "Einfach & klar",
      d: "Ein modernes Design, bei dem deine Kunden sofort verstehen, was du anbietest. Ganz ohne suchen zu müssen.",
    },
    {
      poster: tileLayersPoster,
      clip: tileLayersClip,
      t: "Design & Technik aus einer Hand",
      d: "Wir machen beides selbst. So entsteht kein Wirrwarr zwischen verschiedenen Anbietern.",
    },
    {
      poster: tileUsersPoster,
      clip: tileUsersClip,
      t: "Persönliche Betreuung",
      d: "Du hast feste Ansprechpartner. Kein Callcenter, kein Ping-Pong – direkt, schnell und auf Augenhöhe.",
    },
  ],
  en: [
    {
      poster: tileZapPoster,
      clip: tileZapClip,
      t: "Simple & clear",
      d: "A modern design that shows your customers right away what you offer. Nobody has to go looking.",
    },
    {
      poster: tileLayersPoster,
      clip: tileLayersClip,
      t: "Design & tech under one roof",
      d: "We do both ourselves. That way you never get stuck in a tangle of different vendors.",
    },
    {
      poster: tileUsersPoster,
      clip: tileUsersClip,
      t: "Personal support",
      d: "You always deal with the same people. Forget call centers and endless back-and-forth – we're direct, quick and talk to you as an equal.",
    },
  ],
};

const COPY = {
  de: {
    metaTitle: "Über uns | G&A Webdesign",
    metaDescription: "Wir sind Jonas Gissler (Design & Frontend) und Berkant Agyar (Backend & Kundenkontakt) – ein eingespieltes Team für individuelle Webseiten aus dem Schwarzwald.",
    hi: "Hi, ich bin",
    jonasRole: "Design & Frontend",
    jonasIntro: "Ich bin 21 Jahre alt und komme aus Triberg im Schwarzwald. Ich gestalte deine Webseite und setze sie im Frontend um – also alles, was deine Kunden später sehen und anklicken. Auf Wunsch auch deinen kompletten Markenauftritt, vom Logo bis zu den Farben.",
    jonasStudy: "Aktuell bin ich im 7. Semester Medienkonzeption an der Hochschule Furtwangen, mit Schwerpunkt auf UX/UI-Design und Frontend-Entwicklung. Nebenbei arbeite ich als zertifizierter Softwaredesigner bei M&M Software. Mein Fachwissen aus Studium und Beruf bringe ich direkt in dein Projekt ein.",
    jonasTools: "Entworfen wird in Figma – von der Webseite bis zu Logo und Markenauftritt. Gebaut wird mit Astro oder Next.js, React, TypeScript und Tailwind CSS – inklusive der kleinen Animationen, die eine Seite lebendig machen. KI setze ich da ein, wo sie Arbeit spart – nicht als Selbstzweck.",
    jonasLinkedIn: "Jonas Gissler auf LinkedIn (öffnet in neuem Tab)",
    berkantRole: "Backend & Kundenkontakt",
    berkantIntro: "Ich komme wie Jonas aus Triberg und bin dein Ansprechpartner – von der ersten Anfrage bis zum Livegang. Und ich sorge dafür, dass hinter deiner Webseite alles zuverlässig läuft.",
    berkantStudy: "Ich studiere Wirtschaftsinformatik an der Hochschule Furtwangen, ebenfalls im 7. Semester, mit Schwerpunkt Projektmanagement und Digital Business. Praxis dazu kommt aus dem Projektmanagement bei Mercedes-Benz.",
    berkantTech: "Technisch kümmere ich mich um das Backend: Kontaktformulare und E-Mail-Versand, Datenbanken, Schnittstellen und das Redaktionssystem, über das du deine Inhalte selbst pflegt – mit Node.js, Supabase und Sanity. Dazu Hosting, Domain und Deployment. Und bei Angebot, Terminen und Abstimmung bin ich dein direkter Draht zu uns.",
    berkantLinkedIn: "Berkant Agyar auf LinkedIn (öffnet in neuem Tab)",
    approachTitle: "Was uns bei jeder Webseite wichtig ist.",
    ctaTitle: "Lass uns miteinander reden.",
    ctaText: "Unverbindlich, entspannt — Berkant meldet sich in der Regel innerhalb von 24 Stunden bei dir.",
    ctaButton: "Projekt anfragen",
  },
  en: {
    metaTitle: "About us | G&A Webdesign",
    metaDescription: "We're Jonas Gissler (design & frontend) and Berkant Agyar (backend & client contact) – a well-practiced team building custom websites from the Black Forest.",
    hi: "Hi, I'm",
    jonasRole: "Design & Frontend",
    jonasIntro: "I'm 21 and from Triberg in the Black Forest. I design your website and build its frontend – everything your customers will see and click on. If you like, I'll also create your complete brand identity, from the logo to the colors.",
    jonasStudy: "I'm currently in my 7th semester of Media Conception at Furtwangen University, focusing on UX/UI design and frontend development. On the side, I work as a certified software designer at M&M Software. What I learn in my studies and on the job goes straight into your project.",
    jonasTools: "I design in Figma – from the website to the logo and brand identity. I build with Astro or Next.js, React, TypeScript and Tailwind CSS – including the small animations that bring a page to life. I use AI where it saves work – not for its own sake.",
    jonasLinkedIn: "Jonas Gissler on LinkedIn (opens in a new tab)",
    berkantRole: "Backend & Client Contact",
    berkantIntro: "Like Jonas, I'm from Triberg, and I'm your point of contact from the first inquiry to launch day. I also make sure everything behind your website runs reliably.",
    berkantStudy: "I study Business Information Systems at Furtwangen University, also in my 7th semester, with a focus on project management and digital business. My hands-on experience comes from project management at Mercedes-Benz.",
    berkantTech: "On the technical side, I handle the backend: contact forms and email delivery, databases, APIs and the content management system you use to update your content yourself – with Node.js, Supabase and Sanity. Plus hosting, domain and deployment. And for quotes, scheduling and coordination, I'm your direct line to us.",
    berkantLinkedIn: "Berkant Agyar on LinkedIn (opens in a new tab)",
    approachTitle: "What matters to us on every website.",
    ctaTitle: "Let's talk.",
    ctaText: "No strings attached, no pressure — Berkant usually gets back to you within 24 hours.",
    ctaButton: "Start your project",
  },
};

function AnsatzCard({
  poster, clip, t, d, i,
}: {
  poster: string; clip: string; t: string; d: string; i: number;
}) {
  return (
    <FadeIn delay={i * 0.08} className="h-full">
      <div className="h-full">
        <Card className="h-full">
          {/* Illustration — läuft im Viewport dauerhaft */}
          <TileMedia
            poster={poster}
            src={clip}
            label={t}
            className="mb-4 w-full aspect-[16/9]"
          />
          <h3 className="text-white text-[18px] sm:text-[20px] 2xl:text-[23px] mb-2">{t}</h3>
          <p className="text-[14px] 2xl:text-[16px] leading-relaxed text-ink-300">
            {d}
          </p>
        </Card>
      </div>
    </FadeIn>
  );
}

export function About() {
  const t = useCopy(COPY);
  const ansatz = useCopy(ANSATZ);
  const lp = useLocalePath();
  usePageMeta({
    title: t.metaTitle,
    description: t.metaDescription,
  });
  const navigate = useNavigate();
  return (
    <main id="main-content" className="mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-36 sm:pt-44 lg:pt-52 xl:pt-60 2xl:pt-72 pb-12 xl:pb-20 2xl:pb-28">

      {/* ── Jonas ── */}
      <div className="mt-4 grid gap-10 md:gap-16 2xl:gap-24 md:grid-cols-5 items-center">
        <FadeIn className="md:col-span-3">
          <h1 className="text-white text-[clamp(36px,6vw,80px)] tracking-tight leading-[1.05]">
            {t.hi}{" "}
            <span
              className="text-blue-400"
            >
              Jonas.
            </span>
          </h1>
          <p
            className="mt-2 text-[12px] sm:text-[13px] tracking-[0.2em] text-blue-400"
          >
            {t.jonasRole}
          </p>
          <p
            className="mt-7 text-[16px] sm:text-[17px] xl:text-[19px] 2xl:text-[21px] leading-relaxed text-ink-100"
          >
            {t.jonasIntro}
          </p>
          <p
            className="mt-4 text-[15px] xl:text-[17px] 2xl:text-[18px] leading-relaxed text-ink-300"
          >
            {t.jonasStudy}
          </p>
          <p
            className="mt-4 text-[15px] xl:text-[17px] 2xl:text-[18px] leading-relaxed text-ink-300"
          >
            {t.jonasTools}
          </p>
          <a
            href="https://www.linkedin.com/in/jonas-gissler-37b1482b0/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.jonasLinkedIn}
            className="mt-6 inline-flex items-center gap-2.5 text-[14px] xl:text-[15px] font-medium transition-colors duration-200 text-ink-400 hover:text-blue-400 focus-visible:text-blue-400"
          >
            <Linkedin size={16} aria-hidden="true" />
            LinkedIn
          </a>
        </FadeIn>

        <FadeIn delay={0.15} className="md:col-span-2 flex justify-center md:justify-end">
          <PortraitRing photo={profilbild} alt="Jonas Gissler" spin={1} duration={18} eager />
        </FadeIn>
      </div>

      {/* ── Berkant ── */}
      <div className="mt-24 sm:mt-28 xl:mt-32 2xl:mt-40 grid gap-10 md:gap-16 2xl:gap-24 md:grid-cols-5 items-center">
        <FadeIn className="md:col-span-3">
          <h2 className="text-white text-[clamp(36px,6vw,80px)] tracking-tight leading-[1.05]">
            {t.hi}{" "}
            <span
              className="text-blue-400"
            >
              Berkant.
            </span>
          </h2>
          <p
            className="mt-2 text-[12px] sm:text-[13px] tracking-[0.2em] text-blue-400"
          >
            {t.berkantRole}
          </p>
          <p
            className="mt-7 text-[16px] sm:text-[17px] xl:text-[19px] 2xl:text-[21px] leading-relaxed text-ink-100"
          >
            {t.berkantIntro}
          </p>
          <p
            className="mt-4 text-[15px] xl:text-[17px] 2xl:text-[18px] leading-relaxed text-ink-300"
          >
            {t.berkantStudy}
          </p>
          <p
            className="mt-4 text-[15px] xl:text-[17px] 2xl:text-[18px] leading-relaxed text-ink-300"
          >
            {t.berkantTech}
          </p>
          <a
            href="https://www.linkedin.com/in/berkant-agyar-2334a6363"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.berkantLinkedIn}
            className="mt-6 inline-flex items-center gap-2.5 text-[14px] xl:text-[15px] font-medium transition-colors duration-200 text-ink-400 hover:text-blue-400 focus-visible:text-blue-400"
          >
            <Linkedin size={16} aria-hidden="true" />
            LinkedIn
          </a>
        </FadeIn>

        <FadeIn delay={0.15} className="md:col-span-2 flex justify-center md:justify-end">
          <PortraitRing photo={berkantImg} alt="Berkant Agyar" spin={-1} duration={22} />
        </FadeIn>
      </div>

      {/* ── Unser Ansatz ── */}
      <div className="mt-24 sm:mt-28 xl:mt-32 2xl:mt-40">
        <FadeIn>
          <h2 className="text-white text-[clamp(26px,4vw,52px)] tracking-tight max-w-2xl 2xl:max-w-3xl mb-10 2xl:mb-14">
            {t.approachTitle}
          </h2>
        </FadeIn>
        <div className="grid gap-6 2xl:gap-8 sm:grid-cols-2 md:grid-cols-3 items-stretch">
          {ansatz.map((item, i) => (
            <AnsatzCard key={item.t} {...item} i={i} />
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <FadeIn>
        <div className="mt-20 2xl:mt-28 text-center">
          <h2 className="text-white text-[28px] 2xl:text-[36px] mb-3">
            {t.ctaTitle}
          </h2>
          <p
            className="text-[15px] xl:text-[16px] 2xl:text-[18px] mb-8 text-ink-300"
          >
            {t.ctaText}
          </p>
          <PrimaryButton onClick={() => navigate(lp("/kontakt"))}>
            {t.ctaButton}
          </PrimaryButton>
        </div>
      </FadeIn>
    </main>
  );
}
