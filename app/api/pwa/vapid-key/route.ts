import { NextResponse } from "next/server";
import { getVapidPublicKey } from "@/lib/pwa/client";

export const runtime = "nodejs";

export function GET() {
  const publicKey = getVapidPublicKey();
  if (!publicKey) {
    return NextResponse.json({ configured: false, publicKey: null });
  }

  return NextResponse.json({ configured: true, publicKey });
}
