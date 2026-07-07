import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {  return {
    name: "First Data, We Build. You Grow.", short_name: "FirstData", description:
      "Custom websites, Android & iOS apps, Windows software, and SEO by First Data / اولین دیتا.", start_url: "/", scope: "/", display: "standalone", background_color: "#080c08", theme_color: "#080c08", orientation: "portrait-primary", lang: "en", dir: "ltr", categories: ["business", "productivity"], icons: [
      {
        src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any", }, {
        src: "/apple-icon", sizes: "180x180", type: "image/png", purpose: "any", }, {
        src: "/icon-512", sizes: "512x512", type: "image/png", purpose: "maskable", }, ], // Must be same-origin (relative). Absolute production URL breaks on localhost.
    id: "/", };
}
