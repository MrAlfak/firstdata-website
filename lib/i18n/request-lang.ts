import { cookies, headers } from "next/headers";
import type { Lang } from "@/i18n/dictionaries";
import { LANG_HEADER, LANG_STORAGE_KEY, parseLang } from "@/lib/i18n/lang-cookie";

/** Resolve language for SSR / metadata (defaults to fa). */
export async function getRequestLang(): Promise<Lang> {
  const headerStore = await headers();
  const fromHeader = parseLang(headerStore.get(LANG_HEADER));
  if (fromHeader) return fromHeader;

  const jar = await cookies();
  return parseLang(jar.get(LANG_STORAGE_KEY)?.value) ?? "fa";
}
