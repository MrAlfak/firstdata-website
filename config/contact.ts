/** Canonical contact endpoints (ASCII / E.164 for hrefs). */
export const CONTACT_PHONE_E164 = "+989331274039";
export const CONTACT_WHATSAPP_URL = "https://wa.me/989331274039";
export const CONTACT_TELEGRAM_URL = "https://t.me/firstdatair";
export const CONTACT_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("شیراز بلوار سرباز خیابان ایثارگران کوچه ۳");

/** Normalize display phone (Persian digits, spaces, RTL marks) to `tel:` href. */
export function toTelHref(phone: string): string {
  const ascii = phone
    .replace(/[\u200e\u200f\u061c\s\-()]/g, "")
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));
  return `tel:${ascii || CONTACT_PHONE_E164}`;
}
