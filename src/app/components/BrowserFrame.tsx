/**
 * macOS-Browserfenster um einen Screenshot oder ein Video.
 * Gemeinsam genutzt von Startseite, Projektübersicht und Case Study.
 */
export function BrowserFrame({
  children,
  url,
  className = "",
}: {
  children: React.ReactNode;
  url?: string;
  className?: string;
}) {
  const displayUrl = url
    ? url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
    : "vorschau";

  return (
    <div
      className={`w-full overflow-hidden rounded-xl ${className}`}
      style={{
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Titelleiste */}
      <div
        className="flex items-center gap-3 px-3.5"
        style={{
          height: "34px",
          background: "linear-gradient(180deg, rgba(52,57,63,0.98) 0%, rgba(36,41,46,0.99) 100%)",
          borderBottom: "1px solid rgba(0,0,0,0.35)",
        }}
      >
        <div className="flex items-center gap-[5px] shrink-0" aria-hidden>
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <div className="flex-1 flex justify-center">
          <div
            className="px-3 py-[3px] rounded-md text-[10px] text-ink-300 max-w-[180px] truncate text-center"
            style={{
              background: "rgba(0,0,0,0.28)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {displayUrl}
          </div>
        </div>
        <div className="w-[40px] shrink-0" />
      </div>
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

/**
 * Smartphone-Rahmen für Mobile-Screenshots (Hochformat, 390 × 844).
 */
export function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="overflow-hidden rounded-[28px] p-1.5"
      style={{
        background: "linear-gradient(160deg, #2a3138 0%, #161b20 100%)",
        boxShadow: "0 24px 56px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.08)",
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        width={390}
        height={844}
        className="block w-full h-auto rounded-[22px]"
      />
    </div>
  );
}
