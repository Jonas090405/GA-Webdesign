import { Languages } from "lucide-react";
import { useLang } from "../../i18n";

/** Hinweis auf den englischen Fassungen der Rechtsseiten, die nur auf Deutsch vorliegen. */
export function GermanOnlyNotice() {
  if (useLang() !== "en") return null;

  return (
    <p
      lang="en"
      className="mt-6 flex items-start gap-3 rounded-2xl px-4 py-3 text-[14px] leading-relaxed text-ink-200"
      style={{
        background: "rgb(var(--blue-400-rgb) / 0.06)",
        border: "1px solid rgb(var(--blue-400-rgb) / 0.15)",
      }}
    >
      <Languages size={18} className="mt-0.5 shrink-0 text-blue-400" aria-hidden="true" />
      <span>
        This page is only available in German. The German version is legally binding.
      </span>
    </p>
  );
}
