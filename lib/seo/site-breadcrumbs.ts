import { ALL_NAV } from "@/config/navigation";
import { getPostBySlug } from "@/config/blog";
import type { Lang } from "@/i18n/dictionaries";
import { localizedDictionaries } from "@/i18n/localized";
import { searchDictionaries } from "@/i18n/search";
import { productPhase3Sub } from "@/i18n/product-phase3";
import type { ProductSlug } from "@/i18n/product-page";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";

const PATH_LABEL_KEY = new Map<string, string>();

for (const item of ALL_NAV) {
  PATH_LABEL_KEY.set(item.href, item.labelKey);
  for (const child of item.children ?? []) {
    PATH_LABEL_KEY.set(child.href, child.labelKey);
  }
}

/** Exact paths where the trail is hidden (home or standalone system screens). */
const HIDDEN_EXACT = new Set([
  "/",
  "/offline",
  "/maintenance",
  "/403",
  "/forbidden",
]);

/** App chrome areas with their own side nav — skip the public trail. */
const HIDDEN_PREFIXES = ["/panel", "/admin"];

function resolveKey(lang: Lang, key: string): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let node: any = localizedDictionaries[lang];
  for (const part of key.split(".")) {
    node = node?.[part];
    if (node == null) return key;
  }
  return typeof node === "string" ? node : key;
}

function humanizeSegment(segment: string): string {
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function labelForPath(path: string, lang: Lang, segments: string[]): string | null {
  const d = localizedDictionaries[lang];
  const key = PATH_LABEL_KEY.get(path);
  if (key) return resolveKey(lang, key);

  if (path === "/terms") return d.terms.title;
  if (path === "/search") return searchDictionaries[lang].pageTitle;
  if (path === "/auth/login") return d.auth.login.title;
  if (path === "/auth/register") return d.auth.register.title;
  if (path === "/auth/forgot-password") return d.auth.forgotPassword.title;
  if (path === "/auth/reset-password") return d.auth.resetPassword.title;
  if (path === "/auth/session-expired") return d.errors.pages.sessionExpired.title;

  if (segments[0] === "blog" && segments.length === 2) {
    const post = getPostBySlug(segments[1]);
    if (post) return lang === "fa" ? post.fa.title : post.en.title;
  }

  if (segments[0] === "product" && segments.length === 3 && segments[2] === "one-pager") {
    const slug = segments[1] as ProductSlug;
    const block = productPhase3Sub[lang][slug];
    if (block?.onePager?.printTitle) return block.onePager.printTitle;
  }

  return null;
}

/**
 * Build a public-site breadcrumb trail from the current pathname.
 * Returns [] on home and on panel/admin (or other excluded) routes.
 */
export function buildSiteBreadcrumbs(pathname: string, lang: Lang): BreadcrumbItem[] {
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";

  if (HIDDEN_EXACT.has(path)) return [];
  if (HIDDEN_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`))) return [];

  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) return [];

  const homeName = resolveKey(lang, "nav.home");
  const items: BreadcrumbItem[] = [{ name: homeName, href: "/" }];

  let href = "";
  for (let i = 0; i < segments.length; i++) {
    href += `/${segments[i]}`;
    const isLast = i === segments.length - 1;
    const name =
      labelForPath(href, lang, segments.slice(0, i + 1)) ?? humanizeSegment(segments[i]);
    items.push(isLast ? { name } : { name, href });
  }

  return items;
}

export function shouldShowSiteBreadcrumbs(pathname: string): boolean {
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";
  if (HIDDEN_EXACT.has(path)) return false;
  if (HIDDEN_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`))) return false;
  return path !== "/";
}
