import type { Template } from "./types";

export const QR_TEMPLATES: Template[] = [
  {
    id: "corporate-sleek",
    name: "Corporate Sleek",
    description: "Professional navy-on-white with clean square eyes",
    config: {
      shape: "squares",
      fgColor: "#1e3a5f",
      bgColor: "#FFFFFF",
      fgGradient: null,
      bgGradient: null,
      eyes: {
        frameStyle: "square",
        ballStyle: "square",
        frameColor: "#1e3a5f",
        ballColor: "#1e3a5f",
      },
      logo: { src: null, size: 0.25 },
    },
  },
  {
    id: "neon-cyberpunk",
    name: "Neon Cyberpunk",
    description: "Vibrant pink-to-cyan gradient on dark",
    config: {
      shape: "dots",
      fgColor: "#ff00ff",
      bgColor: "#0a0a0a",
      fgGradient: {
        type: "linear",
        color1: "#ff00ff",
        color2: "#00ffff",
        angle: 135,
      },
      bgGradient: null,
      eyes: {
        frameStyle: "rounded",
        ballStyle: "circle",
        frameColor: "#ff00ff",
        ballColor: "#00ffff",
      },
      logo: { src: null, size: 0.2 },
    },
  },
  {
    id: "minimalist-pastel",
    name: "Minimalist Pastel",
    description: "Soft purple on warm pink background",
    config: {
      shape: "rounded",
      fgColor: "#7c3aed",
      bgColor: "#fdf2f8",
      fgGradient: null,
      bgGradient: null,
      eyes: {
        frameStyle: "rounded",
        ballStyle: "rounded",
        frameColor: "#7c3aed",
        ballColor: "#a78bfa",
      },
      logo: { src: null, size: 0.2 },
    },
  },
  {
    id: "trusted-blue",
    name: "Trusted Blue",
    description: "Classic blue brand look with high contrast",
    config: {
      shape: "squares",
      fgColor: "#2563eb",
      bgColor: "#FFFFFF",
      fgGradient: null,
      bgGradient: null,
      eyes: {
        frameStyle: "square",
        ballStyle: "square",
        frameColor: "#2563eb",
        ballColor: "#2563eb",
      },
      logo: { src: null, size: 0.2 },
    },
  },
  {
    id: "midnight-gold",
    name: "Midnight Gold",
    description: "Elegant gold on dark slate",
    config: {
      shape: "smooth",
      fgColor: "#f59e0b",
      bgColor: "#0f172a",
      fgGradient: {
        type: "radial",
        color1: "#f59e0b",
        color2: "#d97706",
        angle: 0,
      },
      bgGradient: null,
      eyes: {
        frameStyle: "circle",
        ballStyle: "diamond",
        frameColor: "#f59e0b",
        ballColor: "#fbbf24",
      },
      logo: { src: null, size: 0.2 },
    },
  },
];
