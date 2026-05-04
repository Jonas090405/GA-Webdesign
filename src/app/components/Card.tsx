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
    el.style.background = `radial-gradient(280px circle at ${mx}px ${my}px, rgba(77,190,243,0.7), rgba(77,190,243,0.08) 60%)`;
    if (spotRef.current) {
      spotRef.current.style.background = `radial-gradient(380px circle at ${mx}px ${my}px, rgba(77,190,243,0.06), transparent 55%)`;
      spotRef.current.style.opacity = "1";
    }
  }

  function handleLeave() {
    const el = outerRef.current;
    if (!el) return;
    el.style.background = "rgba(77,190,243,0.1)";
    if (spotRef.current) spotRef.current.style.opacity = "0";
  }

  return (
    <div
      ref={outerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={twMerge("rounded-2xl flex flex-col", className)}
      style={{ background: "rgba(77,190,243,0.1)", padding: "1px" }}
    >
      <div
        className={twMerge("group relative overflow-hidden flex-1 p-6 xl:p-8 2xl:p-10", innerClassName)}
        style={{
          background: "linear-gradient(135deg, rgba(16,24,27,0.97) 0%, rgba(10,17,22,0.99) 100%)",
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
