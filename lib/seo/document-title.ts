import { ALL_NAV } from "@/config/navigation";
import type { Lang } from "@/i18n/dictionaries";
import { localizedDictionaries } from "@/i18n/localized";

const PATH_LABEL_KEY = new Map<string, string>();

for (const item of ALL_NAV) {
  PATH_LABEL_KEY.set(item.href, item.labelKey);
  for (const child of item.children ?? []) {
    PATH_LABEL_KEY.set(child.href, child.labelKey);
  }
}

PATH_LABEL_KEY.set("/panel", "nav.panel");
PATH_LABEL_KEY.set("/contact", "nav.contact");
PATH_LABEL_KEY.set("/search", "nav.search");
PATH_LABEL_KEY.set("/terms", "terms.title");
PATH_LABEL_KEY.set("/status", "nav.status");
PATH_LABEL_KEY.set("/method", "nav.method");
PATH_LABEL_KEY.set("/auth/login", "auth.login.title");
PATH_LABEL_KEY.set("/auth/register", "auth.register.title");
PATH_LABEL_KEY.set("/auth/forgot-password", "auth.forgotPassword.title");
PATH_LABEL_KEY.set("/auth/reset-password", "auth.resetPassword.title");
PATH_LABEL_KEY.set("/auth/session-expired", "errors.pages.sessionExpired.title");

function resolveKey(lang: Lang, key: string): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let node: any = localizedDictionaries[lang];
  for (const part of key.split(".")) {
    node = node?.[part];
    if (node == null) return key;
  }
  return typeof node === "string" ? node : key;
}

function normalizeBrand(brand: string): string {
  return brand.replace(/^>\s?/, "").trim();
}

/** Client-side document title, slogan, brand on home; page, brand elsewhere. */
export function getDocumentTitle(pathname: string, lang: Lang): string {
  const d = localizedDictionaries[lang];
  const brand = normalizeBrand(d.hero.brand);
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";

  if (path === "/") {
    return `${brand} | ${d.hero.slogan}`;
  }

  const labelKey = PATH_LABEL_KEY.get(path);
  if (labelKey) {
    return `${resolveKey(lang, labelKey)} | ${brand}`;
  }

  const segment = path.split("/").filter(Boolean).pop();
  if (segment) {
    const titled = segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return `${titled} | ${brand}`;
  }

  return `${brand} | ${d.hero.slogan}`;
}
