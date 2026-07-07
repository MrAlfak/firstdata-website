const SANDBOX = process.env.ZARINPAL_SANDBOX === "true";
const BASE = SANDBOX
  ? "https://sandbox.zarinpal.com/pg/v4/payment"
  : "https://api.zarinpal.com/pg/v4/payment";
const START_PAY = SANDBOX
  ? "https://sandbox.zarinpal.com/pg/StartPay"
  : "https://www.zarinpal.com/pg/StartPay";

export type ZarinpalRequestResult =
  | { ok: true; authority: string; payUrl: string }
  | { ok: false; message: string };

export type ZarinpalVerifyResult =
  | { ok: true; refId: string }
  | { ok: false; message: string };

export function isZarinpalConfigured(): boolean {
  return Boolean(process.env.ZARINPAL_MERCHANT_ID?.trim());
}

export async function zarinpalRequestPayment(input: {
  amountRial: number;
  description: string;
  callbackUrl: string;
  email?: string | null;
  mobile?: string | null;
}): Promise<ZarinpalRequestResult> {
  const merchantId = process.env.ZARINPAL_MERCHANT_ID?.trim();
  if (!merchantId) return { ok: false, message: "Zarinpal not configured" };

  const res = await fetch(`${BASE}/request.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      merchant_id: merchantId,
      amount: input.amountRial,
      description: input.description.slice(0, 255),
      callback_url: input.callbackUrl,
      metadata: {
        email: input.email ?? undefined,
        mobile: input.mobile ?? undefined,
      },
    }),
  });

  const json = (await res.json()) as {
    data?: { code?: number; authority?: string; message?: string };
    errors?: { message?: string }[];
  };

  const code = json.data?.code;
  const authority = json.data?.authority;
  if (code === 100 && authority) {
    return { ok: true, authority, payUrl: `${START_PAY}/${authority}` };
  }

  return {
    ok: false,
    message:
      json.data?.message ??
      json.errors?.[0]?.message ??
      "Payment request failed",
  };
}

export async function zarinpalVerifyPayment(input: {
  amountRial: number;
  authority: string;
}): Promise<ZarinpalVerifyResult> {
  const merchantId = process.env.ZARINPAL_MERCHANT_ID?.trim();
  if (!merchantId) return { ok: false, message: "Zarinpal not configured" };

  const res = await fetch(`${BASE}/verify.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      merchant_id: merchantId,
      amount: input.amountRial,
      authority: input.authority,
    }),
  });

  const json = (await res.json()) as {
    data?: { code?: number; ref_id?: number; message?: string };
    errors?: { message?: string }[];
  };

  const code = json.data?.code;
  if ((code === 100 || code === 101) && json.data?.ref_id != null) {
    return { ok: true, refId: String(json.data.ref_id) };
  }

  return {
    ok: false,
    message:
      json.data?.message ??
      json.errors?.[0]?.message ??
      "Payment verification failed",
  };
}
