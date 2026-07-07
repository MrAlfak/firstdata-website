import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/constants";
import { verifySessionToken } from "@/lib/auth/session";

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
const BYPASS_PREFIXES = ["/api", "/_next", "/fonts", "/maintenance", "/offline"];

function isBypassed(pathname: string): boolean {
  if (pathname.startsWith("/icon")) return true;
  if (pathname.startsWith("/apple-icon")) return true;
  if (pathname === "/manifest.webmanifest" || pathname === "/manifest.json") return true;
  if (pathname === "/robots.txt" || pathname === "/sitemap.xml") return true;
  if (pathname === "/blog/rss.xml" || pathname.startsWith("/blog/rss/")) return true;
  return BYPASS_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const langParam = req.nextUrl.searchParams.get("lang");
  if (langParam === "fa" || langParam === "en") {
    const clean = req.nextUrl.clone();
    clean.searchParams.delete("lang");
    const res = NextResponse.redirect(clean);
    res.cookies.set("fd-lang", langParam, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    return res;
  }

  if (process.env.MAINTENANCE_MODE === "true" && !isBypassed(pathname)) {
    if (pathname !== MAINTENANCE_PATH) {
      return NextResponse.redirect(new URL(MAINTENANCE_PATH, req.url));
    }
    return NextResponse.next();
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
      return NextResponse.redirect(login);
    }
    if (!session) {
      const expired = new URL("/auth/session-expired", req.url);
      expired.searchParams.set("next", pathname);
      const res = NextResponse.redirect(expired);
      res.cookies.delete(SESSION_COOKIE);
      return res;
    }
  }

  if (isAuthPage && isAuthed && pathname !== "/auth/session-expired") {
    return NextResponse.redirect(new URL("/panel", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest\\.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2?|css|js)$).*)",
  ],
};
