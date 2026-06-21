export interface RedirectEntry {
  slug: string;
  destination: string;
  createdAt: number;
}

export interface ScanEntry {
  timestamp: number;
  slug: string;
  device: "ios" | "android" | "desktop" | "unknown";
  country: string;
  city: string;
  ip: string;
  userAgent: string;
  referer: string;
}

const redirectStore = new Map<string, RedirectEntry>();
const scanStore: ScanEntry[] = [];

export function getRedirects(): Record<string, RedirectEntry> {
  return Object.fromEntries(redirectStore);
}

export function saveRedirect(slug: string, destination: string): void {
  redirectStore.set(slug, {
    slug,
    destination,
    createdAt: Date.now(),
  });
}

export function getScans(slug?: string): ScanEntry[] {
  if (slug) return scanStore.filter((s) => s.slug === slug);
  return [...scanStore];
}

export function recordScan(scan: ScanEntry): void {
  scanStore.push(scan);
}

export function detectDevice(userAgent: string): ScanEntry["device"] {
  const ua = userAgent.toLowerCase();
  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ios"))
    return "ios";
  if (ua.includes("android")) return "android";
  if (
    ua.includes("windows") ||
    ua.includes("macintosh") ||
    ua.includes("linux")
  )
    return "desktop";
  return "unknown";
}

const COUNTRIES: [string, string][] = [
  ["US", "United States"],
  ["GB", "United Kingdom"],
  ["DE", "Germany"],
  ["CA", "Canada"],
  ["IN", "India"],
  ["AU", "Australia"],
  ["JP", "Japan"],
  ["BR", "Brazil"],
  ["FR", "France"],
  ["NL", "Netherlands"],
];

const CITIES: Record<string, string[]> = {
  "United States": ["New York", "San Francisco", "Chicago", "Austin"],
  "United Kingdom": ["London", "Manchester", "Birmingham"],
  Germany: ["Berlin", "Munich", "Hamburg"],
  Canada: ["Toronto", "Vancouver", "Montreal"],
  India: ["Mumbai", "Bangalore", "Delhi"],
  Australia: ["Sydney", "Melbourne", "Brisbane"],
  Japan: ["Tokyo", "Osaka", "Kyoto"],
  Brazil: ["São Paulo", "Rio de Janeiro"],
  France: ["Paris", "Lyon"],
  Netherlands: ["Amsterdam", "Rotterdam"],
};

export function geoFromIP(_ip: string): { country: string; city: string } {
  const idx = Math.abs(hashCode(_ip)) % COUNTRIES.length;
  const [code, country] = COUNTRIES[idx];
  const cities = CITIES[country] || [code];
  const cityIdx = Math.abs(hashCode(_ip + "city")) % cities.length;
  return { country, city: cities[cityIdx] };
}

function hashCode(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
}
