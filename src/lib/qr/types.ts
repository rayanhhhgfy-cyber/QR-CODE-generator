export type ContentType = "url" | "wifi" | "vcard" | "text" | "sms" | "email";

export type QRType = "static" | "dynamic";

export type Shape = "squares" | "dots" | "rounded" | "smooth" | "stars";

export type EyeStyle = "square" | "rounded" | "circle" | "diamond";

export type ECCLevel = "L" | "M" | "Q" | "H";

export type ExportFormat = "png" | "jpeg" | "svg" | "webp";

export type GradientType = "none" | "linear" | "radial";

export interface Gradient {
  type: GradientType;
  color1: string;
  color2: string;
  angle: number;
}

export interface ContentFields {
  url?: string;
  ssid?: string;
  password?: string;
  encryption?: "WPA" | "WEP" | "none";
  hidden?: boolean;
  firstName?: string;
  lastName?: string;
  organization?: string;
  phone?: string;
  email?: string;
  address?: string;
  title?: string;
  text?: string;
  smsNumber?: string;
  smsBody?: string;
  mailTo?: string;
  mailSubject?: string;
  mailBody?: string;
}

export interface EyeConfig {
  frameStyle: EyeStyle;
  ballStyle: EyeStyle;
  frameColor: string;
  ballColor: string;
}

export interface LogoConfig {
  src: string | null;
  size: number;
}

export interface QRConfig {
  qrType: QRType;
  contentType: ContentType;
  content: ContentFields;
  dynamicUrl: string;
  slug: string;
  shape: Shape;
  fgColor: string;
  bgColor: string;
  fgGradient: Gradient | null;
  bgGradient: Gradient | null;
  eyes: EyeConfig;
  logo: LogoConfig;
  ecc: ECCLevel;
  autoEcc: boolean;
  marginSize: number;
}

export interface QRCodeEntry {
  id: string;
  name: string;
  config: QRConfig;
  createdAt: number;
  updatedAt: number;
  scanCount: number;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  config: Partial<QRConfig>;
}

export interface ScanEvent {
  timestamp: number;
  device: "ios" | "android" | "desktop" | "unknown";
  country: string;
  city: string;
  ip: string;
  userAgent: string;
}

export interface AnalyticsData {
  totalScans: number;
  uniqueScans: number;
  scansOverTime: { date: string; count: number }[];
  deviceBreakdown: { name: string; value: number; color: string }[];
  geoBreakdown: { country: string; city: string; count: number }[];
  recentScans: ScanEvent[];
}
