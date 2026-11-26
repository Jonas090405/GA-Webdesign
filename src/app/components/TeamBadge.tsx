import { useCopy } from "../../i18n";
import { AVATAR } from "../teamPhotos";
import { PortraitRing } from "./PortraitRing";

const COPY = {
  de: {
    alt: "Jonas Gissler und Berkant Agyar, die Gründer von G&A Webdesign",
    role: "Gründer von G&A Webdesign",
  },
  en: {
    alt: "Jonas Gissler and Berkant Agyar, founders of G&A Webdesign",
    role: "Founders of G&A Webdesign",
  },
};

/**
 * Teamzeile über der Hero-Headline: gemeinsames Foto rund im `PortraitRing`
 * (gleiche Sprache wie die Porträts auf „Über uns“), daneben Namen und Rolle.
 * Der Abstand nach rechts lässt Platz für den äußeren Lichtring (scale 1.18).
 * Auf flachen Laptops (Höhe ≤ 820 px) bleibt der Kreis kleiner, damit der
 * Button im ersten Bildschirm sichtbar bleibt.
 */
export function TeamBadge() {
  const t = useCopy(COPY);
  return (
    <div className="mb-8 sm:mb-10 xl:mb-12 flex items-center gap-6 sm:gap-8 xl:gap-10">
      <PortraitRing
        photo={AVATAR.team}
        alt={t.alt}
        spin={1}
        duration={20}
        eager
        className="h-[134px] w-[134px] sm:h-[172px] sm:w-[172px] xl:h-[212px] xl:w-[212px] 2xl:h-[250px] 2xl:w-[250px] [@media(min-width:1024px)_and_(min-height:761px)_and_(max-height:820px)]:h-[150px] [@media(min-width:1024px)_and_(min-height:761px)_and_(max-height:820px)]:w-[150px] [@media(min-width:1024px)_and_(min-height:821px)_and_(max-height:880px)]:h-[190px] [@media(min-width:1024px)_and_(min-height:821px)_and_(max-height:880px)]:w-[190px] [@media(min-width:1024px)_and_(max-height:760px)]:h-[112px] [@media(min-width:1024px)_and_(max-height:760px)]:w-[112px]"
      />
      <div>
        <p className="text-white text-[16px] sm:text-[19px] xl:text-[21px] font-medium leading-tight">
          Jonas &amp; Berkant
        </p>
        <p className="mt-1.5 text-[13px] sm:text-[15px] xl:text-[16px] text-ink-300">
          {t.role}
        </p>
      </div>
    </div>
  );
}
