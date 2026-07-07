import { jsonError, jsonOk } from "@/lib/auth/api";
import { getPanelUserOrError } from "@/lib/panel/api";
import {
  adminSetInvoicePaymentAuthority, getInvoiceForUser, } from "@/lib/panel/admin-repository";
import { isZarinpalConfigured, zarinpalRequestPayment } from "@/lib/payment/zarinpal";

export const runtime = "nodejs";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error, user } = await getPanelUserOrError();
  if (error || !user) return error!;

  const invoice = getInvoiceForUser(Number(id), user.id);
  if (!invoice || invoice.status !== "unpaid") {
    return jsonError("Invoice not payable", 400);
  }

  if (!isZarinpalConfigured()) {
    if (invoice.pay_url) {
      return jsonOk({ redirectUrl: invoice.pay_url, gateway: "manual" });
    }
    return jsonError("Payment not configured", 503);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:4000";
  const callbackUrl = `${siteUrl}/api/panel/invoices/payment/callback?invoiceId=${invoice.id}`;

  const result = await zarinpalRequestPayment({
    amountRial: invoice.amount_rial, description: `${invoice.number}, ${invoice.title}`, callbackUrl, email: user.email, mobile: user.phone, });

  if (!result.ok) return jsonError(result.message, 502);

  adminSetInvoicePaymentAuthority(invoice.id, result.authority, result.payUrl);
  return jsonOk({ redirectUrl: result.payUrl, gateway: "zarinpal" });
}
