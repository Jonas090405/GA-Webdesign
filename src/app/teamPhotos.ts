/**
 * Fotos aus dem Team-Shooting (November 2026), zentral an einer Stelle.
 *
 * Zuschnitte liegen als WebP ohne EXIF/GPS unter `src/imports/team/`
 * (Dateiname = Motiv + Breite in Pixeln), exportiert aus den gegradeten
 * Finals („G&A Colorgraded (N).jpg“). Neue Versionen ersetzen nur die
 * Dateien gleichen Namens – der Code bleibt.
 */
import jonasPortrait from "../imports/team/jonas-portrait-800.webp";
import berkantPortrait from "../imports/team/berkant-portrait-800.webp";
import berkantAvatar from "../imports/team/berkant-avatar-192.webp";
import teamRund from "../imports/team/team-rund-480.webp";
import duoTablet960 from "../imports/team/duo-tablet-960.webp";
import duoTablet1600 from "../imports/team/duo-tablet-1600.webp";
import duoHoodie960 from "../imports/team/duo-hoodie-960.webp";
import duoHoodie1600 from "../imports/team/duo-hoodie-1600.webp";
import berkantKontakt640 from "../imports/team/berkant-kontakt-640.webp";
import berkantKontakt1000 from "../imports/team/berkant-kontakt-1000.webp";
import arbeitWhiteboard640 from "../imports/team/arbeit-whiteboard-640.webp";
import arbeitWhiteboard1200 from "../imports/team/arbeit-whiteboard-1200.webp";
import arbeitCoding640 from "../imports/team/arbeit-coding-640.webp";
import arbeitCoding1200 from "../imports/team/arbeit-coding-1200.webp";
import arbeitBetreuung640 from "../imports/team/arbeit-betreuung-640.webp";
import arbeitBetreuung1200 from "../imports/team/arbeit-betreuung-1200.webp";
import ablaufPlanung1280 from "../imports/team/ablauf-planung-1280.webp";
import ablaufPlanung2400 from "../imports/team/ablauf-planung-2400.webp";

export type PhotoSource = { src: string; width: number };

/** Runde Porträts (PortraitRing), Teambild im Hero und Mini-Avatar. */
export const PORTRAIT = {
  jonas: jonasPortrait,
  berkant: berkantPortrait,
};

export const AVATAR = {
  berkant: berkantAvatar,
  /** Jonas & Berkant zusammen (06387), rund über der Hero-Headline. */
  team: teamRund,
};

/** Rechteckige Fotos für `Photo` – Seitenverhältnis passend zum Zuschnitt. */
export const PHOTO = {
  duoTablet: {
    ratio: [3, 2] as const,
    sources: [
      { src: duoTablet960, width: 960 },
      { src: duoTablet1600, width: 1600 },
    ],
  },
  duoHoodie: {
    ratio: [3, 2] as const,
    sources: [
      { src: duoHoodie960, width: 960 },
      { src: duoHoodie1600, width: 1600 },
    ],
  },
  berkantKontakt: {
    ratio: [4, 5] as const,
    sources: [
      { src: berkantKontakt640, width: 640 },
      { src: berkantKontakt1000, width: 1000 },
    ],
  },
  arbeitWhiteboard: {
    ratio: [4, 3] as const,
    sources: [
      { src: arbeitWhiteboard640, width: 640 },
      { src: arbeitWhiteboard1200, width: 1200 },
    ],
  },
  arbeitCoding: {
    ratio: [4, 3] as const,
    sources: [
      { src: arbeitCoding640, width: 640 },
      { src: arbeitCoding1200, width: 1200 },
    ],
  },
  arbeitBetreuung: {
    ratio: [4, 3] as const,
    sources: [
      { src: arbeitBetreuung640, width: 640 },
      { src: arbeitBetreuung1200, width: 1200 },
    ],
  },
  ablaufPlanung: {
    ratio: [21, 9] as const,
    sources: [
      { src: ablaufPlanung1280, width: 1280 },
      { src: ablaufPlanung2400, width: 2400 },
    ],
  },
};

export type PhotoAsset = (typeof PHOTO)[keyof typeof PHOTO];
