import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";
import { DEMO_ROBOTS_DISALLOW } from "@/lib/seo/demo-routes";

const DISALLOW = [
  "/api/",
  "/_next/",
  "/panel",
  "/panel/",
  "/admin",
  "/admin/",
  "/auth/",
  "/embed/",
  "/403",
  "/forbidden",
  "/offline",
  "/maintenance",
  "/stt/",
  "/product/*/one-pager",
  ...DEMO_ROBOTS_DISALLOW,
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
      // Explicit allow for major AI crawlers on public marketing content
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: DISALLOW,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL.replace(/^https?:\/\//, ""),
  };
}
