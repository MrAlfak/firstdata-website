import type { Lang } from "@/i18n/dictionaries";

/** Cookie / localStorage key for site language preference. */
export const LANG_STORAGE_KEY = "fd-lang";

/** Request header set by proxy so the same request can read the resolved lang. */
export const LANG_HEADER = "x-fd-lang";

export function parseLang(value: string | null | undefined): Lang | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  return normalized === "en" || normalized === "fa" ? normalized : null;
}
