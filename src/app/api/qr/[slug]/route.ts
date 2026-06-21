import { NextRequest, NextResponse } from "next/server";
import {
  getRedirects,
  recordScan,
  detectDevice,
  geoFromIP,
} from "@/lib/storage";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const redirects = getRedirects();
  const entry = redirects[slug];

  if (!entry) {
    return NextResponse.json(
      { error: "QR code not found" },
      { status: 404 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  const userAgent = request.headers.get("user-agent") || "unknown";
  const referer = request.headers.get("referer") || "";

  const geo = geoFromIP(ip);

  recordScan({
    timestamp: Date.now(),
    slug,
    device: detectDevice(userAgent),
    country: geo.country,
    city: geo.city,
    ip,
    userAgent,
    referer,
  });

  return NextResponse.redirect(entry.destination, { status: 302 });
}
