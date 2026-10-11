import { useRef } from "react";
import { twMerge } from "tailwind-merge";

export function Card({
  children,
  className = "",
  innerClassName = "",
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = outerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    el.style.background = `radial-gradient(520px circle at ${mx}px ${my}px, rgb(var(--blue-400-rgb) / 0.55), rgb(var(--blue-400-rgb) / 0.06) 70%)`;
    if (spotRef.current) {
      spotRef.current.style.background = `radial-gradient(600px circle at ${mx}px ${my}px, rgb(var(--blue-400-rgb) / 0.07), transparent 70%)`;
      spotRef.current.style.opacity = "1";
    }
  }

  function handleLeave() {
    const el = outerRef.current;
    if (!el) return;
    el.style.background = "rgb(var(--blue-400-rgb) / 0.1)";
    if (spotRef.current) spotRef.current.style.opacity = "0";
  }

  return (
    <div
      ref={outerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={twMerge("rounded-2xl flex flex-col", className)}
      style={{ background: "rgb(var(--blue-400-rgb) / 0.1)", padding: "1px" }}
    >
      <div
        className={twMerge("group relative overflow-hidden flex-1 p-6 xl:p-8 2xl:p-10", innerClassName)}
        style={{
          background: "linear-gradient(135deg, rgb(var(--ink-900-rgb) / 0.97) 0%, rgb(var(--ink-950-rgb) / 0.99) 100%)",
          borderRadius: "inherit",
        }}
      >
        <div
          ref={spotRef}
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ opacity: 0, transition: "opacity 0.3s" }}
        />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
