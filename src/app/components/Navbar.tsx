import { useState, useEffect } from "react";
import { Briefcase, Layers, User, Mail, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useLocation, Link } from "react-router-dom";
import logoUrl from "../../imports/Logo-Gissler-webdesign.svg";

const items = [
  { id: "/portfolio", label: "Projekte", Icon: Briefcase },
  { id: "/leistungen", label: "Leistungen", Icon: Layers },
  { id: "/ueber-mich", label: "Über uns", Icon: User },
  { id: "/kontakt", label: "Kontakt", Icon: Mail },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  return (
    <>
      {/* ── DESKTOP header bar (lg+) ───────────────────────── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 hidden xl:block"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="transition-all duration-300"
          style={{
            background: scrolled ? "rgba(13, 17, 21, 0.80)" : "transparent",
            backdropFilter: scrolled ? "blur(14px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
            borderBottom: scrolled ? "1px solid rgba(77, 190, 243, 0.08)" : "1px solid transparent",
            boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.35)" : "none",
          }}
        >
          {/* Full-width relative layer so nav centers to viewport */}
          <div
            className="relative w-full"
            style={{ height: scrolled ? "72px" : "96px", transition: "height 0.3s ease" }}
          >
            {/* Logo – always pinned to viewport top-left */}
            <div className="absolute inset-y-0 left-6 lg:left-8 flex items-center">
              <Link
                to="/"
                aria-label="Zur Startseite"
                className="cursor-pointer hover:opacity-75 transition-opacity duration-200 shrink-0"
              >
                <img
                  src={logoUrl}
                  alt="Gissler Webdesign Logo"
                  style={{ height: scrolled ? "36px" : "44px", transition: "height 0.3s ease", width: "auto" }}
                />
              </Link>
            </div>

            {/* Nav items – centered to full viewport */}
            <nav aria-label="Hauptnavigation" className="absolute inset-0 hidden xl:flex items-center justify-center gap-10 pointer-events-none">
              {items.map(({ id, label, Icon }) => {
                const active =
                  location.pathname === id ||
                  (id !== "/" && location.pathname.startsWith(id));
                return (
                  <Link
                    key={id}
                    to={id}
                    className="nav-item group flex items-center gap-2.5 font-medium cursor-pointer relative py-1.5 whitespace-nowrap pointer-events-auto no-underline"
                    style={{ color: active ? "#ffffff" : "rgba(200,220,235,0.65)", fontSize: scrolled ? "15px" : "17px", transition: "color 0.2s, font-size 0.35s ease", textDecoration: "none" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                      const bar = e.currentTarget.querySelector(".underline-bar") as HTMLElement | null;
                      if (bar) bar.style.width = "100%";
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLAnchorElement).style.color = "rgba(200,220,235,0.65)";
                        const bar = e.currentTarget.querySelector(".underline-bar") as HTMLElement | null;
                        if (bar) bar.style.width = "0%";
                      }
                    }}
                  >
                    <Icon
                      size={16}
                      style={{ color: active ? "#4dbef3" : "inherit", transition: "color 0.2s" }}
                    />
                    <span className="relative">
                      {label}
                      <span
                        className="absolute -bottom-0.5 left-0 h-[1.5px] rounded-full transition-all duration-200 underline-bar"
                        style={{
                          width: active ? "100%" : "0%",
                          background: "#4dbef3",
                        }}
                      />
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* ── MOBILE / TABLET header bar ────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 xl:hidden flex items-center justify-between px-4 transition-all duration-300"
        style={{
          height: "60px",
          background: scrolled ? "rgba(13, 17, 21, 0.80)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(77, 190, 243, 0.08)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.35)" : "none",
        }}
      >
        <Link
          to="/"
          aria-label="Zur Startseite"
          className="cursor-pointer hover:opacity-75 transition-opacity duration-200"
        >
          <img src={logoUrl} alt="Gissler Webdesign Logo" className="h-9 w-auto" />
        </Link>

        <button
          onClick={() => setIsOpen(true)}
          aria-label="Hauptmenü öffnen"
          className="p-2 text-white hover:text-[#4dbef3] transition-colors cursor-pointer"
        >
          <Menu size={26} />
        </button>
      </div>

      {/* Sidebar overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-[#060c10]/80 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] z-[70] flex flex-col shadow-[-16px_0_48px_rgba(0,0,0,0.6)]"
              style={{
                background: "linear-gradient(160deg, rgb(16,24,28) 0%, rgb(11,15,19) 100%)",
                borderLeft: "1px solid rgba(77,190,243,0.12)",
              }}
            >
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  aria-label="Zur Startseite"
                  className="cursor-pointer hover:opacity-70 transition-opacity duration-200"
                >
                  <img src={logoUrl} alt="Gissler Webdesign Logo" className="h-9 w-auto" />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Hauptmenü schließen"
                  className="p-2.5 rounded-full bg-white/5 text-white cursor-pointer"
                >
                  <X size={22} />
                </button>
              </div>

              <div
                className="mx-6 mb-4"
                style={{ height: "1px", background: "rgba(77,190,243,0.08)" }}
              />

              <nav aria-label="Mobilnavigation">
                <div className="flex flex-col gap-1.5 px-4 py-2">
                  {items.map(({ id, label, Icon }) => {
                    const active =
                      location.pathname === id ||
                      (id !== "/" && location.pathname.startsWith(id));
                    return (
                      <Link
                        key={id}
                        to={id}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-4 rounded-2xl px-5 py-4 text-[17px] font-medium transition-colors cursor-pointer"
                        style={{
                          textDecoration: "none",
                          ...(active
                            ? {
                                background: "rgba(77,190,243,0.1)",
                                color: "#4dbef3",
                                border: "1px solid rgba(77,190,243,0.2)",
                              }
                            : {
                                color: "rgba(210,230,245,0.75)",
                                border: "1px solid transparent",
                              }),
                        }}
                      >
                        <Icon size={22} style={{ color: active ? "#4dbef3" : "rgba(200,220,235,0.55)" }} />
                        <span>{label}</span>
                      </Link>
                    );
                  })}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}