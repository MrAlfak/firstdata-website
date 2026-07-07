import { NextResponse } from "next/server";
import { enforceRateLimit, getClientIp } from "@/lib/rate-limit/ip";

export const runtime = "nodejs";

const MAX_PER_WINDOW = 10;
const WINDOW_MS = 15 * 60 * 1000;

type ErrorReport = {
  message?: string;
  stack?: string;
  digest?: string;
  url?: string;
  userAgent?: string;
};

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (!enforceRateLimit(`error-report:${ip}`, MAX_PER_WINDOW, WINDOW_MS)) {
      return NextResponse.json({ success: false }, { status: 429 });
    }

    const body = (await req.json()) as ErrorReport;
    const webhook = process.env.ERROR_REPORT_WEBHOOK;

    const payload = {
      message: body.message?.slice(0, 2000) ?? "unknown",
      stack: body.stack?.slice(0, 8000),
      digest: body.digest,
      url: body.url?.slice(0, 500),
      userAgent: body.userAgent?.slice(0, 500),
      ip,
      at: new Date().toISOString(),
    };

    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else if (process.env.NODE_ENV !== "production") {
      console.warn("[client-error]", payload);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
