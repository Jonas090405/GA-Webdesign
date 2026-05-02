import { useState } from "react";
import { SectionLabel } from "../SectionLabel";
import { PrimaryButton, GhostButton } from "../Button";
import { Card } from "../Card";
import { FadeIn } from "../FadeIn";
import { PortfolioSlider } from "../PortfolioSlider";
import { useNavigate } from "react-router-dom";
import { Palette, Code2, Rocket, ExternalLink, Phone } from "lucide-react";
import emailjs from "@emailjs/browser";
import profilbild from "../../../imports/Profilbild.jpg";
import { DesignerSVG } from "../DesignerSVG";
import gcnImg from "../../../imports/gcn-fahrzeughandel.png";

const PROJECTS = [
  {
    image: gcnImg,
    tag: "Fahrzeughandel · 2026",
    title: "GCN-Fahrzeughandel",
    desc: "Vollständige Web-Plattform für einen Fahrzeughändler – Außendarstellung, Fahrzeugsuche, Verkaufsauftragsformulare mit automatischer E-Mail-Benachrichtigung und internes Kundenverwaltungs-Dashboard.",
    url: "https://gcn-fahrzeughandel.de/",
    features: ["React", "Dashboard", "Fahrzeugsuche", "E-Mail-System", "Deployment"],
  },
  {
    image: null,
    tag: "Demnächst verfügbar",
    title: "Nächstes Projekt",
    desc: "Mein nächstes Projekt ist gerade in Umsetzung. Melde dich gerne, wenn du Interesse an einer Zusammenarbeit hast.",
    comingSoon: true,
  },
];

export function Home() {
  return (
    <main className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 xl:px-16">
      <Hero />
      <PortfolioPreview />
      <Services />
      <AboutPreview />
      <Contact />
    </main>
  );
}

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="pt-36 sm:pt-44 lg:pt-52 xl:pt-60 pb-20 sm:pb-32 lg:pb-40 xl:pb-48 relative">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 xl:gap-16 items-center">
        <div>
          <FadeIn>
            <SectionLabel>Webdesign · Entwicklung · Deployment</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-white text-[clamp(38px,7vw,108px)] leading-[1.05] tracking-tight max-w-5xl lg:max-w-none">
              Webseiten,{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #4dbef3 0%, #006999 100%)",
                }}
              >
                die Wirkung zeigen.
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              className="mt-6 sm:mt-8 max-w-2xl lg:max-w-xl xl:max-w-2xl text-[17px] sm:text-[19px] lg:text-[21px] xl:text-[23px] leading-relaxed"
              style={{ color: "rgba(200, 225, 240, 0.75)" }}
            >
              Ich entwerfe und baue deine Website. Von der ersten Idee bis sie live ist.
              Du musst dich um nichts kümmern.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-8 sm:mt-10 xl:mt-12 flex flex-wrap gap-3">
              <PrimaryButton onClick={() => navigate("/kontakt")}>
                Projekt anfragen
              </PrimaryButton>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.4} className="hidden lg:flex justify-center lg:justify-end">
          <DesignerSVG className="w-full max-w-[500px] xl:max-w-[700px] 2xl:max-w-[800px] h-auto drop-shadow-[0_0_60px_rgba(77,190,243,0.15)]" />
        </FadeIn>
      </div>
    </section>
  );
}

function PortfolioPreview() {
  const navigate = useNavigate();
  return (
    <section className="py-16 sm:py-20 lg:py-28 xl:py-36">
      <FadeIn>
        <SectionLabel>Projekte</SectionLabel>
        <div className="mb-8 sm:mb-10 xl:mb-14">
          <h2 className="text-white text-[clamp(28px,4.5vw,64px)] tracking-tight max-w-xl xl:max-w-2xl">
            Projekte, die ich umgesetzt habe
          </h2>
          <p className="mt-4 xl:mt-6 max-w-2xl text-[15px] sm:text-[17px] xl:text-[19px] leading-relaxed" style={{ color: "rgba(180,210,230,0.65)" }}>
            Ein Auszug aus meinen Arbeiten. Von der ersten Idee bis zur fertigen, live geschalteten Website.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <PortfolioSlider projects={PROJECTS} />
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <GhostButton onClick={() => navigate("/portfolio")}>
            Alle Projekte ansehen
          </GhostButton>
          <a
            href="https://gissler-webdesign/portfolio.de"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-medium transition-colors duration-200"
            style={{ color: "rgba(150, 190, 220, 0.55)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(200, 235, 255, 0.85)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(150, 190, 220, 0.55)";
            }}
          >
            Persönliches Portfolio <ExternalLink size={16} />
          </a>
        </div>
      </FadeIn>
    </section>
  );
}

function Services() {
  const navigate = useNavigate();
  const services = [
    {
      Icon: Palette,
      title: "Individuelles Design",
      desc: "Deine Website sieht genau so aus, wie du es dir vorstellst. Kein vorgefertigtes Template, sondern ein eigenes Design für dich.",
    },
    {
      Icon: Code2,
      title: "Technische Umsetzung",
      desc: "Alle Funktionen sauber mit modernster Technik umgesetzt. Schnell geladen, für Google optimiert und auf jedem Gerät perfekt nutzbar.",
    },
    {
      Icon: Rocket,
      title: "Fertig live, sofort nutzbar",
      desc: "Domain, Hosting, Einrichtung. Ich kümmere mich um alles. Du bekommst eine fertige Website und kannst sofort loslegen.",
    },
  ];

  return (
    <section id="leistungen" className="py-16 sm:py-20 lg:py-28 xl:py-36">
      <FadeIn>
        <SectionLabel>Leistungen</SectionLabel>
        <div className="mb-10 sm:mb-12 xl:mb-16">
          <h2 className="text-white text-[clamp(28px,4.5vw,64px)] tracking-tight max-w-xl xl:max-w-2xl">
            Alles, was du für deine Website brauchst.
          </h2>
          <p className="mt-4 xl:mt-6 max-w-2xl text-[15px] sm:text-[17px] xl:text-[19px] leading-relaxed" style={{ color: "rgba(180,210,230,0.65)" }}>
            Ich übernehme alles: Design, Entwicklung und Hosting. Du musst dich um nichts kümmern.
          </p>
        </div>
      </FadeIn>

      <div className="grid gap-5 sm:gap-6 xl:gap-8 sm:grid-cols-2 md:grid-cols-3 items-stretch">
        {services.map(({ Icon, title, desc }, i) => (
          <FadeIn key={title} delay={i * 0.08} className="h-full">
            <Card className="h-full">
              <div className="flex flex-col h-full">
                <div className="mb-5 xl:mb-7 self-start">
                  <div
                    className="inline-flex h-12 w-12 xl:h-16 xl:w-16 items-center justify-center rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0,105,153,0.25) 0%, rgba(77,190,243,0.12) 100%)",
                      border: "1px solid rgba(77, 190, 243, 0.2)",
                    }}
                  >
                    <Icon size={22} className="xl:!h-7 xl:!w-7" style={{ color: "#4dbef3" }} />
                  </div>
                </div>
                <h3 className="text-white text-[18px] sm:text-[20px] xl:text-[22px] mb-2 xl:mb-3">
                  {title}
                </h3>
                <p
                  className="text-[14px] xl:text-[16px] leading-relaxed flex-1"
                  style={{ color: "rgba(180, 210, 230, 0.6)" }}
                >
                  {desc}
                </p>
              </div>
            </Card>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.2}>
        <div className="mt-10 xl:mt-14">
          <GhostButton onClick={() => navigate("/leistungen")}>
            Mehr über meine Leistungen
          </GhostButton>
        </div>
      </FadeIn>
    </section>
  );
}

function AboutPreview() {
  const navigate = useNavigate();
  return (
    <section className="py-16 sm:py-20 lg:py-28 xl:py-36">
      <FadeIn>
        <SectionLabel>Über mich</SectionLabel>
      </FadeIn>
      <div className="grid gap-10 md:gap-12 xl:gap-20 md:grid-cols-5 items-center">
        <FadeIn className="md:col-span-3">
          <h2 className="text-white text-[clamp(26px,4vw,54px)] tracking-tight mb-6 xl:mb-8">
            Hi, ich bin Jonas.
          </h2>
          <p
            className="text-[15px] sm:text-[16px] xl:text-[18px] leading-relaxed mb-4 xl:mb-6"
            style={{ color: "rgba(200, 225, 240, 0.8)" }}
          >
            Webdesigner und Entwickler aus Triberg im Schwarzwald.
            Ich kümmere mich komplett um deine Website: Design, Technik und alles, was dazugehört.
          </p>
          <p
            className="text-[14px] sm:text-[15px] xl:text-[17px] leading-relaxed mb-4"
            style={{ color: "rgba(180, 210, 230, 0.6)" }}
          >
            Mein Ziel ist eine Website, bei der deine Kunden sofort verstehen, was du anbietest
            und dich gerne kontaktieren.
          </p>
          <p
            className="text-[14px] sm:text-[15px] xl:text-[17px] leading-relaxed mb-8 xl:mb-10"
            style={{ color: "rgba(180, 210, 230, 0.6)" }}
          >
            Ich bin persönlich für dich da. Du schreibst immer direkt mit mir.
          </p>
          <GhostButton onClick={() => navigate("/ueber-mich")}>
            Mehr über mich
          </GhostButton>
        </FadeIn>

        <FadeIn delay={0.15} className="md:col-span-2 flex justify-center">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full scale-[1.08]"
              style={{ border: "1px solid rgba(77, 190, 243, 0.15)" }}
            />
            <div
              className="relative h-56 w-56 sm:h-64 sm:w-64 xl:h-80 xl:w-80 rounded-full overflow-hidden"
              style={{ border: "2px solid rgba(77, 190, 243, 0.4)" }}
            >
              <img
                src={profilbild}
                alt="Jonas Gissler"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── EmailJS (Werte aus .env – nie in Git pushen!) ────────────────────────────
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const PHONE_NUMBER = "+49 151 2079 7408"; // ← deine Nummer
const EMAIL_ADDRESS = "gissler.jonas@gmail.com";

type HomeFormData = { name: string; email: string; phone: string; message: string };
type HomeFormErrors = Partial<Record<keyof HomeFormData, string>>;

function validateHome(d: HomeFormData): HomeFormErrors {
  const e: HomeFormErrors = {};
  if (!d.name.trim()) e.name = "Name ist erforderlich.";
  else if (d.name.trim().length < 2) e.name = "Name muss mind. 2 Zeichen haben.";
  if (!d.email.trim()) e.email = "E-Mail ist erforderlich.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim()))
    e.email = "Bitte gültige E-Mail eingeben.";
  if (d.phone.trim() && !/^[\+\d\s\-\(\)\/]{6,20}$/.test(d.phone.trim()))
    e.phone = "Bitte gültige Telefonnummer eingeben.";
  if (!d.message.trim()) e.message = "Nachricht ist erforderlich.";
  else if (d.message.trim().length < 20) e.message = "Bitte etwas ausführlicher (mind. 20 Zeichen).";
  return e;
}

function Contact() {
  const [mode, setMode] = useState<"form" | "call">("form");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [formData, setFormData] = useState<HomeFormData>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<HomeFormErrors>({});

  function handleChange(field: keyof HomeFormData, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validateHome(formData);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStatus("loading");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone.trim() || "–",
          subject: "Anfrage über Startseite",
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="kontakt" className="py-16 sm:py-20 lg:py-28 xl:py-36">
      <FadeIn>
        <SectionLabel>Kontakt</SectionLabel>
      </FadeIn>
      <div className="grid gap-10 md:gap-12 xl:gap-20 md:grid-cols-2 items-start">
        <FadeIn>
          <h2 className="text-white text-[clamp(26px,4vw,54px)] tracking-tight mb-6 xl:mb-8">
            Erzähl mir von deinem Projekt.
          </h2>
          <p
            className="text-[14px] sm:text-[15px] xl:text-[17px] leading-relaxed mb-8 max-w-md xl:max-w-lg"
            style={{ color: "rgba(180, 210, 230, 0.6)" }}
          >
            Schreib mir kurz, was du brauchst. Ich melde mich innerhalb von 24 Stunden
            mit einer ersten Einschätzung. Kostenlos, unverbindlich, unkompliziert.
          </p>
          <div className="space-y-3 text-[14px] xl:text-[16px]">
            <div>
              <div className="mb-1" style={{ color: "rgba(150, 180, 200, 0.5)" }}>E-Mail</div>
              <a href={`mailto:${EMAIL_ADDRESS}`} className="text-white hover:text-sky-300 transition-colors break-all">
                {EMAIL_ADDRESS}
              </a>
            </div>
            <div>
              <div className="mb-1" style={{ color: "rgba(150, 180, 200, 0.5)" }}>Telefon</div>
              <a
                href={`tel:${PHONE_NUMBER.replace(/[\s\-\(\)]/g, "")}`}
                className="text-white hover:text-sky-300 transition-colors"
              >
                {PHONE_NUMBER}
              </a>
            </div>
            <div>
              <div className="mb-1" style={{ color: "rgba(150, 180, 200, 0.5)" }}>Standort</div>
              <div className="text-white">Triberg, Schwarzwald</div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          {/* Tab-Toggle */}
          <div
            className="flex mb-4 p-1 rounded-xl gap-1"
            style={{
              background: "rgba(10,19,30,0.7)",
              border: "1px solid rgba(77,190,243,0.12)",
            }}
          >
            <HomeTabBtn active={mode === "form"} onClick={() => setMode("form")}>
              Anfrage senden
            </HomeTabBtn>
            <HomeTabBtn active={mode === "call"} onClick={() => setMode("call")}>
              Direkt anrufen
            </HomeTabBtn>
          </div>

          {mode === "call" ? (
            <Card>
              <div className="py-8 flex flex-col items-center text-center gap-5">
                <div
                  className="h-16 w-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,105,153,0.3) 0%, rgba(77,190,243,0.15) 100%)",
                    border: "1px solid rgba(77,190,243,0.3)",
                  }}
                >
                  <Phone size={26} style={{ color: "#4dbef3" }} />
                </div>
                <div>
                  <p className="text-[13px] mb-1" style={{ color: "rgba(150,190,220,0.6)" }}>
                    Ruf mich einfach direkt an:
                  </p>
                  <a
                    href={`tel:${PHONE_NUMBER.replace(/[\s\-\(\)]/g, "")}`}
                    className="text-white text-[24px] font-semibold tracking-tight hover:text-sky-300 transition-colors"
                  >
                    {PHONE_NUMBER}
                  </a>
                </div>
                <p className="text-[13px] max-w-xs leading-relaxed" style={{ color: "rgba(150,190,220,0.5)" }}>
                  Falls du mich nicht erreichen solltest, werde ich dich schnellstmöglich zurückrufen.
                </p>
                <a
                  href={`tel:${PHONE_NUMBER.replace(/[\s\-\(\)]/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-white font-medium transition-all duration-200 hover:brightness-110"
                  style={{ background: "linear-gradient(135deg, #006999 0%, #4dbef3 100%)" }}
                >
                  <Phone size={15} />
                  Jetzt anrufen
                </a>
              </div>
            </Card>
          ) : (
            <Card>
              {status === "sent" ? (
                <div className="py-12 text-center">
                  <div
                    className="text-[12px] tracking-[0.25em] uppercase mb-3"
                    style={{ color: "#4dbef3" }}
                  >
                    Gesendet
                  </div>
                  <h3 className="text-white text-[22px] mb-2">Danke!</h3>
                  <p className="text-[14px]" style={{ color: "rgba(180, 210, 230, 0.6)" }}>
                    Ich melde mich so schnell wie möglich bei dir.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Name *" name="name" value={formData.name}
                      onChange={v => handleChange("name", v)} error={errors.name}
                      placeholder="Max Mustermann"
                    />
                    <Field
                      label="E-Mail *" name="email" type="email" value={formData.email}
                      onChange={v => handleChange("email", v)} error={errors.email}
                      placeholder="max@beispiel.de"
                    />
                  </div>
                  <Field
                    label="Telefon (optional)" name="phone" type="tel" value={formData.phone}
                    onChange={v => handleChange("phone", v)} error={errors.phone}
                    placeholder="+49 123 456789"
                  />
                  <Field
                    label="Nachricht *" name="message" textarea value={formData.message}
                    onChange={v => handleChange("message", v)} error={errors.message}
                    placeholder="Erzähl mir kurz, was du brauchst…"
                  />
                  {status === "error" && (
                    <p className="text-red-400 text-[13px]">
                      Fehler beim Senden. Bitte direkt an{" "}
                      <a href={`mailto:${EMAIL_ADDRESS}`} className="underline">
                        {EMAIL_ADDRESS}
                      </a>{" "}
                      schreiben.
                    </p>
                  )}
                  <PrimaryButton type="submit" disabled={status === "loading"}>
                    {status === "loading" ? "Wird gesendet…" : "Projekt anfragen"}
                  </PrimaryButton>
                </form>
              )}
            </Card>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

function HomeTabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 rounded-lg px-4 py-2 text-[13px] font-medium tracking-wide transition-all duration-200"
      style={
        active
          ? { background: "linear-gradient(135deg, #006999 0%, #4dbef3 100%)", color: "#fff" }
          : { background: "transparent", color: "rgba(150,190,220,0.6)" }
      }
    >
      {children}
    </button>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea = false,
  placeholder,
  value,
  onChange,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const baseCls =
    "w-full rounded-xl px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-all text-[14px]";

  const sharedProps = {
    name,
    value,
    placeholder,
    className: baseCls,
    style: {
      background: "rgba(10, 17, 25, 0.8)",
      border: error ? "1px solid rgba(248,113,113,0.6)" : "1px solid rgba(77, 190, 243, 0.12)",
    } as React.CSSProperties,
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = error ? "rgba(248,113,113,0.8)" : "rgba(77, 190, 243, 0.45)";
      e.currentTarget.style.boxShadow = error ? "0 0 0 3px rgba(248,113,113,0.1)" : "0 0 0 3px rgba(77,190,243,0.1)";
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = error ? "rgba(248,113,113,0.6)" : "rgba(77, 190, 243, 0.12)";
      e.currentTarget.style.boxShadow = "none";
    },
  };

  return (
    <label className="block">
      <span
        className="block text-[12px] tracking-[0.2em] uppercase mb-2"
        style={{ color: "rgba(150, 190, 220, 0.6)" }}
      >
        {label}
      </span>
      {textarea ? (
        <textarea {...sharedProps} rows={5} onChange={e => onChange(e.target.value)} />
      ) : (
        <input {...sharedProps} type={type} onChange={e => onChange(e.target.value)} />
      )}
      {error && <span className="block mt-1.5 text-[12px] text-red-400">{error}</span>}
    </label>
  );
}