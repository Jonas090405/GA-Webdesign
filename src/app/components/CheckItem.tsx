import { Check } from "lucide-react";

/**
 * Einheitlicher Listenpunkt für alle Leistungs- und Preislisten: schlichter
 * Haken ohne Kreis. Der Icon-Wrapper ist genau eine Zeile hoch (1.5em bei leading-normal), dadurch
 * sitzt der Haken bei jeder Schriftgröße mittig auf der ersten Textzeile –
 * auch wenn der Text umbricht.
 */
export function CheckItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li className={`flex items-start gap-2.5 leading-normal ${className}`}>
      <span className="flex shrink-0 items-center" style={{ height: "1.5em" }} aria-hidden>
        <Check size={15} strokeWidth={2.5} className="text-brand" />
      </span>
      <span className="min-w-0">{children}</span>
    </li>
  );
}
