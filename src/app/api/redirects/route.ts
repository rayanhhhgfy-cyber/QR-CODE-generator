import { NextRequest, NextResponse } from "next/server";
import { saveRedirect, getRedirects } from "@/lib/storage";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, destination } = body;

    if (!slug || !destination) {
      return NextResponse.json(
        { error: "slug and destination are required" },
        { status: 400 },
      );
    }

    saveRedirect(slug, destination);
    return NextResponse.json({ success: true, slug });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}

export async function GET() {
  const redirects = getRedirects();
  return NextResponse.json(Object.values(redirects));
}
