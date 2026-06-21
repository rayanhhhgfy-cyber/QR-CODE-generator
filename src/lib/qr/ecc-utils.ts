import type { ECCLevel } from "./types";

export function getMinECCForLogoSizes(logoSizeFraction: number): ECCLevel {
  if (logoSizeFraction <= 0) return "L";
  if (logoSizeFraction <= 0.15) return "M";
  if (logoSizeFraction <= 0.3) return "Q";
  return "H";
}

export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getRelativeLuminance(color1);
  const lum2 = getRelativeLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

function getRelativeLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const rsRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gsRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bsRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB;
}

export function getRecommendedECC(
  logoSize: number,
  fgColor: string,
  bgColor: string,
  autoEcc: boolean,
): ECCLevel {
  if (!autoEcc) return "M";
  const contrast = getContrastRatio(fgColor, bgColor);
  const eccFromLogo = getMinECCForLogoSizes(logoSize);
  const eccLevels: ECCLevel[] = ["L", "M", "Q", "H"];
  const logoIndex = eccLevels.indexOf(eccFromLogo);
  if (contrast < 3) {
    return eccLevels[Math.max(logoIndex, eccLevels.indexOf("H"))];
  }
  if (contrast < 4.5) {
    return eccLevels[Math.max(logoIndex, eccLevels.indexOf("Q"))];
  }
  return eccFromLogo;
}
