import { NextRequest, NextResponse } from "next/server";
import { getScans } from "@/lib/storage";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const scans = getScans(slug);

  const totalScans = scans.length;
  const uniqueIps = new Set(scans.map((s) => s.ip)).size;

  const scansOverTime: { date: string; count: number }[] = [];
  const dayBuckets = new Map<string, number>();
  const now = Date.now();
  const dayMs = 86400000;

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now - i * dayMs);
    const key = date.toISOString().split("T")[0];
    dayBuckets.set(key, 0);
  }

  for (const scan of scans) {
    const key = new Date(scan.timestamp).toISOString().split("T")[0];
    if (dayBuckets.has(key)) {
      dayBuckets.set(key, (dayBuckets.get(key) || 0) + 1);
    }
  }

  for (const [date, count] of dayBuckets) {
    scansOverTime.push({ date, count });
  }

  const deviceMap = new Map<string, number>();
  for (const scan of scans) {
    deviceMap.set(scan.device, (deviceMap.get(scan.device) || 0) + 1);
  }

  const deviceColors: Record<string, string> = {
    ios: "#000000",
    android: "#3ddc84",
    desktop: "#2563eb",
    unknown: "#6b7280",
  };

  const deviceLabels: Record<string, string> = {
    ios: "iOS",
    android: "Android",
    desktop: "Desktop",
    unknown: "Other",
  };

  const deviceBreakdown = Array.from(deviceMap.entries()).map(
    ([name, value]) => ({
      name: deviceLabels[name] || name,
      value,
      color: deviceColors[name] || "#6b7280",
    }),
  );

  const geoMap = new Map<string, { country: string; city: string; count: number }>();
  for (const scan of scans) {
    const key = `${scan.country}|${scan.city}`;
    const existing = geoMap.get(key);
    if (existing) {
      existing.count++;
    } else {
      geoMap.set(key, {
        country: scan.country,
        city: scan.city,
        count: 1,
      });
    }
  }

  const geoBreakdown = Array.from(geoMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return NextResponse.json({
    totalScans,
    uniqueScans: uniqueIps,
    scansOverTime,
    deviceBreakdown,
    geoBreakdown,
  });
}
