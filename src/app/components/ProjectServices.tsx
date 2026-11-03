import { Link } from "react-router-dom";
import { MEDIA, SERVICE_GROUPS, type Service, type ServiceId } from "../../content/services";
import { useCopy, useLocalePath } from "../../i18n";

/**
 * Leistungen eines Projekts, immer in den Kategorien und mit den
 * Illustrationen aus /leistungen. Jede Leistung verlinkt auf ihre Zeile dort
 * (/leistungen#seo öffnet sie direkt).
 */
function useServices(ids: ServiceId[]): Service[] {
  const groups = useCopy(SERVICE_GROUPS);
  const all = groups.flatMap((g) => g.items);
  return ids.flatMap((id) => all.find((s) => s.id === id) ?? []);
}

/** Raster mit Illustration, Titel und Kurzsatz – für die Case Study. */
export function ProjectServiceGrid({ ids, label }: { ids: ServiceId[]; label: string }) {
  const services = useServices(ids);
  const lp = useLocalePath();
  return (
    <ul
      aria-label={label}
      className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-2 border-t border-line"
    >
      {services.map((s) => (
        <li key={s.id} className="border-b border-line">
          <Link
            to={lp(`/leistungen#${s.id}`)}
            className="group flex items-center gap-4 py-4 rounded-lg outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            <img
              src={MEDIA[s.id].src}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-14 w-14 xl:h-16 xl:w-16 shrink-0 object-contain transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            />
            <span className="min-w-0">
              <span className="block text-[15px] xl:text-[16px] font-medium leading-snug text-white transition-colors duration-200 group-hover:text-blue-200">
                {s.title}
              </span>
              <span className="mt-0.5 block text-[13px] leading-snug text-ink-400">{s.lead}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Kompakte Pillen mit denselben Kategorien – für Übersichten. */
export function ProjectServicePills({ ids, label }: { ids: ServiceId[]; label: string }) {
  const services = useServices(ids);
  const lp = useLocalePath();
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {services.map((s) => (
        <li key={s.id}>
          <Link
            to={lp(`/leistungen#${s.id}`)}
            className="inline-flex rounded-full border border-blue-400/15 bg-blue-400/[0.06] px-3 py-1 text-[12px] xl:text-[13px] text-ink-200 transition-colors duration-200 hover:border-blue-400/35 hover:text-blue-100 focus-visible:border-blue-400/35 focus-visible:text-blue-100"
          >
            {s.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
