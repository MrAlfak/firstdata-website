import { NextResponse } from "next/server";
import { z } from "zod";
import { savePushSubscription } from "@/lib/pwa/subscriptions";
import { isPushConfigured } from "@/lib/pwa/send";
import { enforceRateLimit, getClientIp } from "@/lib/rate-limit/ip";

export const runtime = "nodejs";

const subscribeSchema = z.object({
  subscription: z.object({
    endpoint: z.string().url(),
    keys: z.object({
      p256dh: z.string().min(1),
      auth: z.string().min(1),
    }),
  }),
  locale: z.enum(["fa", "en"]).optional(),
});

export async function POST(req: Request) {
  if (!isPushConfigured()) {
    return NextResponse.json(
      { success: false, message: "Push notifications are not configured." },
      { status: 503 },
    );
  }

  const ip = getClientIp(req);
  if (!enforceRateLimit(`pwa-subscribe:${ip}`, 10, 60 * 60 * 1000)) {
    return NextResponse.json(
      { success: false, message: "Too many requests." },
      { status: 429 },
    );
  }

  try {
    const body = await req.json();
    const parsed = subscribeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid subscription payload." },
        { status: 400 },
      );
    }

    savePushSubscription(parsed.data.subscription, {
      userAgent: req.headers.get("user-agent") ?? undefined,
      locale: parsed.data.locale,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to save subscription." },
      { status: 500 },
    );
  }
}
