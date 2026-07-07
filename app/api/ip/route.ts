import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Self-hosted client-IP endpoint — replaces the external api.ipify.org call.
 * Reads the forwarded address set by the hosting proxy/CDN.
 */
export function GET(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  const ip =
    (xff ? xff.split(",")[0].trim() : "") ||
    req.headers.get("x-real-ip") ||
    "unavailable";
  return NextResponse.json({ ip });
}
