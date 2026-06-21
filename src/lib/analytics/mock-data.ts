import type { AnalyticsData } from "./types";

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

const COUNTRIES = [
  { country: "United States", city: "New York" },
  { country: "United States", city: "San Francisco" },
  { country: "United Kingdom", city: "London" },
  { country: "Germany", city: "Berlin" },
  { country: "Canada", city: "Toronto" },
  { country: "India", city: "Mumbai" },
  { country: "Australia", city: "Sydney" },
  { country: "Japan", city: "Tokyo" },
  { country: "Brazil", city: "São Paulo" },
  { country: "France", city: "Paris" },
];

const DEVICES = [
  { name: "iOS", value: 0, color: "#000000" },
  { name: "Android", value: 0, color: "#3ddc84" },
  { name: "Desktop", value: 0, color: "#2563eb" },
  { name: "Other", value: 0, color: "#6b7280" },
];

export function generateMockAnalytics(slug: string): AnalyticsData {
  const seed = hashString(slug || "default");
  const random = seededRandom(seed);

  const totalScans = Math.floor(random() * 5000) + 500;
  const uniqueScans = Math.floor(totalScans * (0.4 + random() * 0.3));

  const deviceData = DEVICES.map((d) => ({
    ...d,
    value: Math.floor(random() * 100),
  }));

  const geoBreakdown = COUNTRIES.map((c) => ({
    ...c,
    count: Math.floor(random() * totalScans * 0.15),
  })).sort((a, b) => b.count - a.count);

  const scansOverTime: { date: string; count: number }[] = [];
  const now = Date.now();
  const dayMs = 86400000;
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now - i * dayMs);
    const dateStr = date.toISOString().split("T")[0];
    scansOverTime.push({
      date: dateStr,
      count: Math.floor(random() * 80) + 10,
    });
  }

  return {
    totalScans,
    uniqueScans,
    scansOverTime,
    deviceBreakdown: deviceData,
    geoBreakdown: geoBreakdown.slice(0, 6),
  };
}
