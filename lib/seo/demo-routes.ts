import type { Metadata } from "next";

/** Internal shadcn kit pages — keep for design reference, never index. */
export const DEMO_ROBOTS_DISALLOW = [
  "/login-01",
  "/register-01",
  "/forgot-password-01",
  "/verify-email-01",
  "/two-factor-authentication-01",
  "/cta-01",
  "/table-01",
  "/empty-state-06",
  "/bento-grid-01",
] as const;

export const demoPageMetadata: Metadata = {
  title: "Internal UI demo",
  robots: { index: false, follow: false },
};
