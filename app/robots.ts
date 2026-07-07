import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/panel", "/panel/", "/auth/", "/403", "/forbidden"],
      },
    ],
    sitemap: "https://firstdata.ir/sitemap.xml",
    host: "https://firstdata.ir",
  };
}
