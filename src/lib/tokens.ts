/**
 * Brand-Farben für Kontexte, die keine CSS-Variablen lesen können
 * (Canvas 2D, Three.js-Lichter). Spiegel von src/styles/globals.css –
 * bei Änderungen beide Stellen anpassen. Siehe BRAND.md.
 */
export const BLUE_200 = "#addff9";
export const BLUE_400 = "#4dbef3";

const BLUE_400_RGB = "77, 190, 243";

/** Funklicht-Blau mit Transparenz, z. B. für ctx.fillStyle. */
export const blue400 = (alpha: number) => `rgba(${BLUE_400_RGB}, ${alpha})`;
