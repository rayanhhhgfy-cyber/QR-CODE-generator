import { getContrastRatio } from "./ecc-utils";

export interface ScannabilityResult {
  score: "good" | "warning" | "danger";
  message: string;
  ratio: number;
}

export function checkScannability(
  fgColor: string,
  bgColor: string,
  logoSize: number,
): ScannabilityResult {
  const ratio = getContrastRatio(fgColor, bgColor);
  if (ratio < 2) {
    return {
      score: "danger",
      message: `Very low contrast (${ratio.toFixed(1)}:1) — scanning will likely fail`,
      ratio,
    };
  }
  if (ratio < 3) {
    return {
      score: "danger",
      message: `Low contrast (${ratio.toFixed(1)}:1) — scanning may fail`,
      ratio,
    };
  }
  if (ratio < 4.5) {
    return {
      score: "warning",
      message: `Moderate contrast (${ratio.toFixed(1)}:1) — ensure good lighting when scanning`,
      ratio,
    };
  }
  if (logoSize > 0.3) {
    return {
      score: "warning",
      message: `Large logo area (${Math.round(logoSize * 100)}%) may reduce scannability`,
      ratio,
    };
  }
  return {
    score: "good",
    message: `Excellent contrast (${ratio.toFixed(1)}:1) — highly scannable`,
    ratio,
  };
}
