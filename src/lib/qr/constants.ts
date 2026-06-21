import type { QRConfig, ContentType } from "./types";

export const DEFAULT_QR_CONFIG: QRConfig = {
  qrType: "static",
  contentType: "url",
  content: {},
  dynamicUrl: "",
  slug: "",
  shape: "squares",
  fgColor: "#000000",
  bgColor: "#FFFFFF",
  fgGradient: null,
  bgGradient: null,
  eyes: {
    frameStyle: "square",
    ballStyle: "square",
    frameColor: "#000000",
    ballColor: "#000000",
  },
  logo: {
    src: null,
    size: 0.25,
  },
  ecc: "M",
  autoEcc: true,
  marginSize: 4,
};

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  url: "URL",
  wifi: "WiFi Network",
  vcard: "vCard Contact",
  text: "Plain Text",
  sms: "SMS",
  email: "Email",
};

export const CONTENT_TYPE_ICONS: Record<ContentType, string> = {
  url: "Link",
  wifi: "Wifi",
  vcard: "User",
  text: "FileText",
  sms: "MessageSquare",
  email: "Mail",
};

export const ECC_LABELS: Record<string, string> = {
  L: "Low (7%)",
  M: "Medium (15%)",
  Q: "Quartile (25%)",
  H: "High (30%)",
};

export const EXPORT_SIZES = [
  { label: "512px", value: 512 },
  { label: "1024px", value: 1024 },
  { label: "2048px", value: 2048 },
];

export const SHAPE_LABELS: Record<string, string> = {
  squares: "Squares",
  dots: "Dots",
  rounded: "Rounded",
  smooth: "Smooth",
  stars: "Stars",
};
