import { useRef } from "react";

/**
 * Sanfter 3D-Tilt-Effekt: das Element neigt sich subtil zur Mausposition.
 * Funktioniert reaktiv ohne Re-Renders (direktes Style-Update via ref).
 */
export function Tilt({
  children,
  className = "",
  strength = 7,
  scale = 1.015,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * strength).toFixed(2)}deg) rotateY(${(x * strength).toFixed(2)}deg) scale(${scale})`;
  }

  function handleLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
