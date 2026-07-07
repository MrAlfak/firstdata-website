import { NextResponse } from "next/server";
import { z } from "zod";
import { removePushSubscription } from "@/lib/pwa/subscriptions";
import { enforceRateLimit, getClientIp } from "@/lib/rate-limit/ip";

export const runtime = "nodejs";

const unsubscribeSchema = z.object({
  endpoint: z.string().url(),
});

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (!enforceRateLimit(`pwa-unsubscribe:${ip}`, 10, 60 * 60 * 1000)) {
    return NextResponse.json(
      { success: false, message: "Too many requests." },
      { status: 429 },
    );
  }

  try {
    const body = await req.json();
    const parsed = unsubscribeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid endpoint." },
        { status: 400 },
      );
    }

    removePushSubscription(parsed.data.endpoint);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to remove subscription." },
      { status: 500 },
    );
  }
}
