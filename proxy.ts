import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/constants";
import { verifySessionToken } from "@/lib/auth/session";
import { LANG_HEADER, LANG_STORAGE_KEY, parseLang } from "@/lib/i18n/lang-cookie";

const AUTH_PATHS = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/session-expired",
];
const PROTECTED_PREFIX = "/panel";
const ADMIN_PREFIX = "/admin";
const MAINTENANCE_PATH = "/maintenance";
const BYPASS_PREFIXES = ["/api", "/_next", "/fonts", "/maintenance", "/offline", "/stt"];

function isBypassed(pathname: string): boolean {
  if (pathname.startsWith("/icon")) return true;
  if (pathname.startsWith("/apple-icon")) return true;
  if (pathname === "/manifest.webmanifest" || pathname === "/manifest.json") return true;
  if (pathname === "/robots.txt" || pathname === "/sitemap.xml") return true;
  if (pathname === "/llms.txt" || pathname === "/llms-full.txt" || pathname === "/ai.txt") return true;
  if (pathname === "/humans.txt") return true;
  if (pathname === "/blog/rss.xml" || pathname.startsWith("/blog/rss/")) return true;
  if (pathname === "/blog/atom.xml" || pathname.startsWith("/blog/atom/")) return true;
  return BYPASS_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function withLangHeaders(req: NextRequest, lang: "fa" | "en"): Headers {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(LANG_HEADER, lang);
  return requestHeaders;
}

function attachLangCookie(res: NextResponse, lang: "fa" | "en", setCookie: boolean) {
  if (setCookie) {
    res.cookies.set(LANG_STORAGE_KEY, lang, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }
  return res;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const langParam = req.nextUrl.searchParams.get("lang");
  if (langParam === "fa" || langParam === "en") {
    // Keep ?lang= on the URL so hreflang/sitemap alternates are stable for crawlers.
    const res = NextResponse.next({
      request: { headers: withLangHeaders(req, langParam) },
    });
    res.cookies.set(LANG_STORAGE_KEY, langParam, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return res;
  }

  const cookieLang = parseLang(req.cookies.get(LANG_STORAGE_KEY)?.value);
  const lang = cookieLang ?? "fa";
  const needsLangCookie = !cookieLang;

  if (process.env.MAINTENANCE_MODE === "true" && !isBypassed(pathname)) {
    if (pathname !== MAINTENANCE_PATH) {
      return attachLangCookie(
        NextResponse.redirect(new URL(MAINTENANCE_PATH, req.url)),
        lang,
        needsLangCookie,
      );
    }
    return attachLangCookie(
      NextResponse.next({ request: { headers: withLangHeaders(req, lang) } }),
      lang,
      needsLangCookie,
    );
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  const isAuthed = Boolean(session);

  const isAuthPage = AUTH_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const isProtected =
    pathname === PROTECTED_PREFIX ||
    pathname.startsWith(`${PROTECTED_PREFIX}/`) ||
    pathname === ADMIN_PREFIX ||
    pathname.startsWith(`${ADMIN_PREFIX}/`);

  if (isProtected) {
    if (!token) {
      const login = new URL("/auth/login", req.url);
      login.searchParams.set("next", pathname);
      return attachLangCookie(NextResponse.redirect(login), lang, needsLangCookie);
    }
    if (!session) {
      const expired = new URL("/auth/session-expired", req.url);
      expired.searchParams.set("next", pathname);
      const res = NextResponse.redirect(expired);
      res.cookies.delete(SESSION_COOKIE);
      return attachLangCookie(res, lang, needsLangCookie);
    }
  }

  if (isAuthPage && isAuthed && pathname !== "/auth/session-expired") {
    return attachLangCookie(
      NextResponse.redirect(new URL("/panel", req.url)),
      lang,
      needsLangCookie,
    );
  }

  return attachLangCookie(
    NextResponse.next({ request: { headers: withLangHeaders(req, lang) } }),
    lang,
    needsLangCookie,
  );
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest\\.webmanifest|stt(?:/|$)|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2?|css|js|zip)$).*)",
  ],
};
