import type { MetadataRoute } from "next";
import {
  ABOUTUS_CHILDREN,
  CONTACT_CHILDREN,
  PORTFOLIO_CHILDREN,
  PRODUCT_CHILDREN,
  SERVICES_CHILDREN,
} from "@/config/navigation";
import { BLOG_POSTS } from "@/config/blog";
import { getBlogFeedLastModified } from "@/lib/seo/rss";
import { SITE_URL, langUrl } from "@/lib/seo/site";

type SitemapRoute = {
  path: string;
  priority: number;
  changeFrequency: "monthly" | "weekly" | "yearly" | "daily";
  lastModified?: Date;
};

function withLangAlternates(path: string) {
  return {
    languages: {
      fa: langUrl(path || "/", "fa"),
      en: langUrl(path || "/", "en"),
    },
  };
}

const ROUTES: SitemapRoute[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/aboutus", priority: 0.8, changeFrequency: "monthly" },
  ...ABOUTUS_CHILDREN.map((c) => ({
    path: c.href,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),
  { path: "/product", priority: 0.85, changeFrequency: "weekly" },
  ...PRODUCT_CHILDREN.map((c) => ({
    path: c.href,
    priority: 0.8,
    changeFrequency: "weekly" as const,
  })),
  { path: "/services", priority: 0.9, changeFrequency: "weekly" },
  ...SERVICES_CHILDREN.map((c) => ({
    path: c.href,
    priority: 0.85,
    changeFrequency: "weekly" as const,
  })),
  { path: "/portfolio", priority: 0.8, changeFrequency: "monthly" },
  ...PORTFOLIO_CHILDREN.map((c) => ({
    path: c.href,
    priority: 0.75,
    changeFrequency: "monthly" as const,
  })),
  { path: "/blog", priority: 0.75, changeFrequency: "weekly" },
  { path: "/blog/rss.xml", priority: 0.35, changeFrequency: "weekly", lastModified: getBlogFeedLastModified() },
  { path: "/blog/rss/fa.xml", priority: 0.35, changeFrequency: "weekly", lastModified: getBlogFeedLastModified() },
  { path: "/blog/atom.xml", priority: 0.35, changeFrequency: "weekly", lastModified: getBlogFeedLastModified() },
  { path: "/blog/atom/fa.xml", priority: 0.35, changeFrequency: "weekly", lastModified: getBlogFeedLastModified() },
  ...BLOG_POSTS.map((p) => ({
    path: `/blog/${p.slug}`,
    priority: 0.65,
    changeFrequency: "monthly" as const,
    lastModified: new Date(p.publishedAt),
  })),
  { path: "/contactus", priority: 0.9, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.4, changeFrequency: "yearly" },
  ...CONTACT_CHILDREN.map((c) => ({
    path: c.href,
    priority: 0.85,
    changeFrequency: "monthly" as const,
  })),
  { path: "/search", priority: 0.5, changeFrequency: "monthly" },
  { path: "/llms.txt", priority: 0.3, changeFrequency: "weekly" },
  { path: "/llms-full.txt", priority: 0.25, changeFrequency: "weekly" },
  { path: "/ai.txt", priority: 0.2, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((route) => {
    const path = route.path || "/";
    return {
      url: `${SITE_URL}${route.path}`,
      lastModified: route.lastModified ?? now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: withLangAlternates(path === "/" ? "" : path),
    };
  });
}
