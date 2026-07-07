import { NextResponse } from "next/server";
import {
  adminGetInvoiceByAuthority,
  adminMarkInvoicePaid,
} from "@/lib/panel/admin-repository";
import { zarinpalVerifyPayment } from "@/lib/payment/zarinpal";
import { dispatchPanelNotification } from "@/lib/panel/notify";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const authority = url.searchParams.get("Authority") ?? url.searchParams.get("authority");
  const status = url.searchParams.get("Status") ?? url.searchParams.get("status");
  const invoiceIdParam = url.searchParams.get("invoiceId");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
  const failRedirect = `${siteUrl}/panel/invoices?payment=failed`;
  const okRedirect = `${siteUrl}/panel/invoices?payment=success`;

  if (status !== "OK" || !authority) {
    return NextResponse.redirect(failRedirect);
  }

  let invoice = adminGetInvoiceByAuthority(authority);
  if (!invoice && invoiceIdParam) {
    const { getDb } = await import("@/lib/auth/db");
    invoice = getDb()
      .prepare(`SELECT * FROM invoices WHERE id = ?`)
      .get(Number(invoiceIdParam)) as typeof invoice;
  }
  if (!invoice) return NextResponse.redirect(failRedirect);

  const verified = await zarinpalVerifyPayment({
    amountRial: invoice.amount_rial,
    authority,
  });

  if (!verified.ok) return NextResponse.redirect(failRedirect);

  adminMarkInvoicePaid(invoice.id, verified.refId);
  await dispatchPanelNotification({
    userId: invoice.user_id,
    kind: "invoice",
    title: "Payment confirmed",
    body: invoice.title,
    link: "/panel/invoices",
    inAppOnly: true,
  });

  return NextResponse.redirect(okRedirect);
}
