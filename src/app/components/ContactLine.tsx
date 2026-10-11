import { type LucideIcon } from "lucide-react";

/**
 * Einheitliche Kontakt-Zeile für Homepage und Kontakt-Seite:
 * schlichtes Icon (ohne Hinterlegung) vor Label + Wert (Homepage-Stil).
 */
export function ContactLine({
  Icon,
  label,
  value,
  href,
  onClick,
}: {
  Icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  onClick?: () => void;
}) {
  const base = "text-white text-[14px] xl:text-[16px]";
  const interactive = `${base} hover:text-brand-light transition-colors`;

  return (
    <div className="flex items-center gap-3">
      <Icon size={18} className="shrink-0 text-blue-400" aria-hidden />
      <div className="min-w-0">
        <div className="mb-1 text-[14px] xl:text-[16px] text-ink-400">
          {label}
        </div>
        {onClick ? (
          <button
            onClick={onClick}
            className={`${interactive} cursor-pointer break-all border-none bg-transparent p-0 text-left`}
          >
            {value}
          </button>
        ) : href ? (
          <a href={href} className={interactive}>
            {value}
          </a>
        ) : (
          <div className={base}>{value}</div>
        )}
      </div>
    </div>
  );
}
