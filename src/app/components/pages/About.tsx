import { usePageMeta } from "../../hooks/usePageMeta";
import { motion } from "motion/react";
import { PrimaryButton } from "../Button";
import { FadeIn, FadeInGroup } from "../FadeIn";
import { Link } from "react-router-dom";
import { useCopy, useLocalePath } from "../../../i18n";
import { Linkedin } from "lucide-react";
import { PortraitRing } from "../PortraitRing";
import { Photo } from "../Photo";
import { PHOTO, PORTRAIT, type PhotoAsset } from "../../teamPhotos";

type AnsatzItem = { photo: PhotoAsset; alt: string; t: string; d: string };

const ANSATZ: { de: AnsatzItem[]; en: AnsatzItem[] } = {
  de: [
    {
      photo: PHOTO.arbeitWhiteboard,
      alt: "Jonas Gissler skizziert am Whiteboard den Aufbau einer Webseite, Berkant Agyar schaut mit",
      t: "Individuell & klar",
      d: "Deine Webseite hebt sich von der Masse ab, statt nach Baukasten auszusehen. Und deine Kunden verstehen trotzdem sofort, was du anbietest.",
    },
    {
      photo: PHOTO.arbeitCoding,
      alt: "Jonas Gissler programmiert eine Webseite am Bildschirm",
      t: "Design & Technik aus einer Hand",
      d: "Wir machen beides selbst. So entsteht kein Wirrwarr zwischen verschiedenen Anbietern.",
    },
    {
      photo: PHOTO.arbeitBetreuung,
      alt: "Berkant Agyar und Jonas Gissler, deine festen Ansprechpartner bei G&A Webdesign",
      t: "Persönliche Betreuung",
      d: "Wir sind persönlich für dich da, auf Augenhöhe und mit Verständnis für dein Unternehmen. Du bringst deine Ideen ein und gestaltest deine Webseite aktiv mit.",
    },
  ],
  en: [
    {
      photo: PHOTO.arbeitWhiteboard,
      alt: "Jonas Gissler sketching the structure of a website on a whiteboard while Berkant Agyar looks on",
      t: "Unique & clear",
      d: "Your website stands out from the crowd instead of looking like a template. And your customers still see right away what you offer.",
    },
    {
      photo: PHOTO.arbeitCoding,
      alt: "Jonas Gissler coding a website at the desk",
      t: "Design & tech under one roof",
      d: "We do both ourselves. That way you never get stuck in a tangle of different vendors.",
    },
    {
      photo: PHOTO.arbeitBetreuung,
      alt: "Berkant Agyar and Jonas Gissler, your dedicated contacts at G&A Webdesign",
      t: "Personal support",
      d: "We're there for you personally, as equals and with real understanding of your business. You bring in your ideas and help shape your website yourself.",
    },
  ],
};

const COPY = {
  de: {
    metaTitle: "Über uns | G&A Webdesign",
    metaDescription: "Wir sind Jonas Gissler (Design & Frontend) und Berkant Agyar (Backend & Kundenkontakt) – ein eingespieltes Team für individuelle Webseiten aus dem Schwarzwald.",
    hi: "Hi, ich bin",
    jonasRole: "Design & Frontend",
    jonasIntro: {
      before: "Ich bin 21 Jahre alt und komme aus Triberg im Schwarzwald. Ich gestalte deine Webseite und setze sie im Frontend um – also alles, was deine Kunden später sehen und anklicken. Auf Wunsch auch deinen ",
      link: "kompletten Markenauftritt",
      after: ", vom Logo bis zu den Farben.",
    },
    jonasStudy: "Aktuell bin ich im 7. Semester Medienkonzeption an der Hochschule Furtwangen, mit Schwerpunkt auf UX/UI-Design und Frontend-Entwicklung. Nebenbei arbeite ich als zertifizierter Softwaredesigner bei M&M Software. Mein Fachwissen aus Studium und Beruf bringe ich direkt in dein Projekt ein.",
    jonasTools: "Entworfen wird in Figma – von der Webseite bis zu Logo und Markenauftritt. Gebaut wird mit Astro oder Next.js, React, TypeScript und Tailwind CSS – inklusive der kleinen Animationen, die eine Seite lebendig machen. KI setze ich da ein, wo sie Arbeit spart – nicht als Selbstzweck.",
    jonasLinkedIn: "Jonas Gissler auf LinkedIn (öffnet in neuem Tab)",
    berkantRole: "Backend & Kundenkontakt",
    berkantIntro: "Ich komme wie Jonas aus Triberg und bin dein Ansprechpartner – von der ersten Anfrage bis zum Livegang. Und ich sorge dafür, dass hinter deiner Webseite alles zuverlässig läuft.",
    berkantStudy: "Ich studiere Wirtschaftsinformatik an der Hochschule Furtwangen, ebenfalls im 7. Semester, mit Schwerpunkt Projektmanagement und Digital Business. Praxis dazu kommt aus dem Projektmanagement bei Mercedes-Benz.",
    berkantTech: {
      before: "Technisch kümmere ich mich um das Backend: Kontaktformulare und E-Mail-Versand, Datenbanken, Schnittstellen und ",
      link: "das Redaktionssystem",
      after: ", über das du deine Inhalte selbst pflegt – mit Node.js, Supabase und Sanity. Dazu Hosting, Domain und Deployment. Und bei Angebot, Terminen und Abstimmung bin ich dein direkter Draht zu uns.",
    },
    berkantLinkedIn: "Berkant Agyar auf LinkedIn (öffnet in neuem Tab)",
    jonasAlt: "Porträt von Jonas Gissler, Design & Frontend bei G&A Webdesign",
    berkantAlt: "Porträt von Berkant Agyar, Backend & Kundenkontakt bei G&A Webdesign",
    duoTitle: "Von der Unternehmensseite bis zum komplexen System.",
    duoText: "Wir setzen um, was dein Projekt braucht: eine klassische Unternehmensseite, einen Online-Shop oder ein System mit Datenbank und Schnittstellen. Design, Entwicklung, Hosting und Pflege bekommst du dabei aus einer Hand.",
    duoAlt: "Berkant Agyar und Jonas Gissler besprechen einen Entwurf auf dem Tablet",
    ctaAlt: "Jonas Gissler und Berkant Agyar stehen nebeneinander im Flur",
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
    jonasIntro: {
      before: "I'm 21 and from Triberg in the Black Forest. I design your website and build its frontend – everything your customers will see and click on. If you like, I'll also create your ",
      link: "complete brand identity",
      after: ", from the logo to the colors.",
    },
    jonasStudy: "I'm currently in my 7th semester of Media Conception at Furtwangen University, focusing on UX/UI design and frontend development. On the side, I work as a certified software designer at M&M Software. What I learn in my studies and on the job goes straight into your project.",
    jonasTools: "I design in Figma – from the website to the logo and brand identity. I build with Astro or Next.js, React, TypeScript and Tailwind CSS – including the small animations that bring a page to life. I use AI where it saves work – not for its own sake.",
    jonasLinkedIn: "Jonas Gissler on LinkedIn (opens in a new tab)",
    berkantRole: "Backend & Client Contact",
    berkantIntro: "Like Jonas, I'm from Triberg, and I'm your point of contact from the first inquiry to launch day. I also make sure everything behind your website runs reliably.",
    berkantStudy: "I study Business Information Systems at Furtwangen University, also in my 7th semester, with a focus on project management and digital business. My hands-on experience comes from project management at Mercedes-Benz.",
    berkantTech: {
      before: "On the technical side, I handle the backend: contact forms and email delivery, databases, APIs and the ",
      link: "content management system",
      after: " you use to update your content yourself – with Node.js, Supabase and Sanity. Plus hosting, domain and deployment. And for quotes, scheduling and coordination, I'm your direct line to us.",
    },
    berkantLinkedIn: "Berkant Agyar on LinkedIn (opens in a new tab)",
    jonasAlt: "Portrait of Jonas Gissler, design & frontend at G&A Webdesign",
    berkantAlt: "Portrait of Berkant Agyar, backend & client contact at G&A Webdesign",
    duoTitle: "From a company website to a complex system.",
    duoText: "We build what your project needs: a classic company website, an online shop or a system with a database and integrations. You get design, development, hosting and maintenance from a single source.",
    duoAlt: "Berkant Agyar and Jonas Gissler reviewing a design on a tablet",
    ctaAlt: "Jonas Gissler and Berkant Agyar standing side by side in a hallway",
    approachTitle: "What matters to us on every website.",
    ctaTitle: "Let's talk.",
    ctaText: "No strings attached, no pressure — Berkant usually gets back to you within 24 hours.",
    ctaButton: "Start your project",
  },
};

const INLINE_LINK =
  "text-blue-200 underline decoration-blue-400/40 underline-offset-4 transition-colors duration-200 hover:text-blue-100 hover:decoration-blue-100";

/**
 * Ein Grundsatz: großes Foto, darunter Titel und Text – ohne Karte.
 * Handy: gestapelt · sm–lg: Foto und Text nebeneinander · ab lg: drei Spalten.
 */
function AnsatzItemView({
  photo, alt, t, d, i,
}: AnsatzItem & { i: number }) {
  return (
    <FadeIn delay={i * 0.08}>
      <article className="grid gap-5 sm:grid-cols-2 sm:items-center sm:gap-8 lg:grid-cols-1 lg:items-start lg:gap-6 2xl:gap-7">
        <Photo
          photo={photo}
          alt={alt}
          sizes="(min-width: 1536px) 440px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
        />
        <div>
          <h3 className="text-white text-[18px] sm:text-[20px] 2xl:text-[23px] mb-2">{t}</h3>
          <p className="text-[14px] 2xl:text-[16px] leading-relaxed text-ink-300 text-pretty">
            {d}
          </p>
        </div>
      </article>
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
  return (
    <main id="main-content" className="mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-36 sm:pt-44 lg:pt-52 xl:pt-60 2xl:pt-72 pb-12 xl:pb-20 2xl:pb-28">

      {/* ── Jonas ── */}
      <FadeInGroup className="mt-4 grid gap-10 md:gap-16 2xl:gap-24 md:grid-cols-5 items-center">
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
            {t.jonasIntro.before}
            <Link to={lp("/leistungen#corporate-design")} className={INLINE_LINK}>
              {t.jonasIntro.link}
            </Link>
            {t.jonasIntro.after}
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
          <PortraitRing photo={PORTRAIT.jonas} alt={t.jonasAlt} spin={1} duration={18} eager />
        </FadeIn>
      </FadeInGroup>

      {/* ── Berkant ── */}
      <FadeInGroup className="mt-24 sm:mt-28 xl:mt-32 2xl:mt-40 grid gap-10 md:gap-16 2xl:gap-24 md:grid-cols-5 items-center">
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
            {t.berkantTech.before}
            <Link to={lp("/leistungen#cms")} className={INLINE_LINK}>
              {t.berkantTech.link}
            </Link>
            {t.berkantTech.after}
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
          <PortraitRing photo={PORTRAIT.berkant} alt={t.berkantAlt} spin={-1} duration={22} />
        </FadeIn>
      </FadeInGroup>

      {/* ── Zu zweit ── */}
      <FadeInGroup className="mt-24 sm:mt-28 xl:mt-32 2xl:mt-40 grid gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 lg:grid-cols-5 items-center">
        <FadeIn className="lg:col-span-3">
          <Photo
            photo={PHOTO.duoTablet}
            alt={t.duoAlt}
            sizes="(min-width: 1536px) 820px, (min-width: 1024px) 58vw, 92vw"
          />
        </FadeIn>
        <FadeIn delay={0.12} className="lg:col-span-2 max-w-2xl">
          <h2 className="text-white text-[clamp(26px,3.4vw,46px)] tracking-tight leading-[1.1] text-balance">
            {t.duoTitle}
          </h2>
          <p className="mt-6 text-[15px] xl:text-[17px] 2xl:text-[18px] leading-relaxed text-ink-300">
            {t.duoText}
          </p>
        </FadeIn>
      </FadeInGroup>

      {/* ── Unser Ansatz ── */}
      <div className="mt-24 sm:mt-28 xl:mt-32 2xl:mt-40">
        <FadeIn>
          <h2 className="text-white text-[clamp(26px,4vw,52px)] tracking-tight max-w-2xl 2xl:max-w-3xl mb-10 2xl:mb-14">
            {t.approachTitle}
          </h2>
        </FadeIn>
        <div className="grid gap-12 sm:gap-10 lg:grid-cols-3 lg:gap-8 2xl:gap-12">
          {ansatz.map((item, i) => (
            <AnsatzItemView key={item.t} {...item} i={i} />
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <FadeInGroup className="mt-24 sm:mt-28 xl:mt-32 2xl:mt-40 grid gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 lg:grid-cols-5 items-center">
        <FadeIn className="lg:col-span-2">
          <h2 className="text-white text-[28px] xl:text-[34px] 2xl:text-[42px] tracking-tight leading-[1.1] mb-3">
            {t.ctaTitle}
          </h2>
          <p
            className="text-[15px] xl:text-[16px] 2xl:text-[18px] mb-8 text-ink-300 max-w-md"
          >
            {t.ctaText}
          </p>
          <PrimaryButton to={lp("/kontakt")}>
            {t.ctaButton}
          </PrimaryButton>
        </FadeIn>
        <FadeIn delay={0.12} className="lg:col-span-3 order-first lg:order-none">
          <Photo
            photo={PHOTO.duoHoodie}
            alt={t.ctaAlt}
            sizes="(min-width: 1536px) 820px, (min-width: 1024px) 58vw, 92vw"
          />
        </FadeIn>
      </FadeInGroup>
    </main>
  );
}
