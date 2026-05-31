import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

export function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = ref.current;
    if (!el || disabled) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMove}
      className={`group/btn relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full px-6 py-3 xl:px-7 xl:py-3.5 2xl:px-9 2xl:py-4 text-[15px] 2xl:text-[17px] text-white font-medium transition-[filter] duration-300 ease-out hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100 ${className}`}
      style={{
        background: "linear-gradient(135deg, #006999 0%, #4dbef3 100%)",
      }}
    >
      {/* Cursor-Spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.2), transparent 70%)",
        }}
      />
      {/* Sweep-Shine */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-y-2 -left-1/2 w-1/3 -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 ease-out group-hover/btn:left-[120%]"
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 ease-out group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
        />
      </span>
    </button>
  );
}

export function TertiaryButton({
  children,
  onClick,
  href,
  external = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  external?: boolean;
}) {
  const cls =
    "group/btn inline-flex cursor-pointer items-center gap-1.5 text-[14px] xl:text-[15px] 2xl:text-[16px] font-medium transition-colors duration-200 whitespace-nowrap";
  const color = "rgba(125, 211, 252, 0.85)";
  const colorHover = "rgba(186, 230, 253, 1)";
  const icon = (
    <ArrowUpRight
      size={14}
      className="xl:!h-4 xl:!w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
      aria-hidden
    />
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : "_self"}
        rel={external ? "noreferrer" : undefined}
        className={cls}
        style={{ color }}
        onMouseEnter={(e) => { e.currentTarget.style.color = colorHover; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = color; }}
      >
        {children}
        {icon}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cls}
      style={{ color }}
      onMouseEnter={(e) => { e.currentTarget.style.color = colorHover; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = color; }}
    >
      {children}
      {icon}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group/btn inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 xl:px-7 xl:py-3.5 2xl:px-9 2xl:py-4 text-[15px] 2xl:text-[17px] font-medium transition-all duration-300 whitespace-nowrap"
      style={{
        background: "rgba(77, 190, 243, 0.07)",
        border: "1px solid rgba(77, 190, 243, 0.2)",
        color: "rgba(200, 235, 255, 0.85)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.background = "rgba(77, 190, 243, 0.13)";
        el.style.borderColor = "rgba(77, 190, 243, 0.4)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = "rgba(77, 190, 243, 0.07)";
        el.style.borderColor = "rgba(77, 190, 243, 0.2)";
      }}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 ease-out group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          aria-hidden
        />
      </span>
    </button>
  );
}
