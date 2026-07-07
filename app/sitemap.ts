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

const BASE_URL = "https://firstdata.ir";

type SitemapRoute = {
  path: string;
  priority: number;
  changeFrequency: "monthly" | "weekly" | "yearly";
  lastModified?: Date;
};

const ROUTES: SitemapRoute[] = [
  { path: "", priority: 1.0, changeFrequency: "monthly" as const },
  { path: "/aboutus", priority: 0.8, changeFrequency: "monthly" as const },
  ...ABOUTUS_CHILDREN.map((c) => ({
    path: c.href,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),
  { path: "/product", priority: 0.8, changeFrequency: "monthly" as const },
  ...PRODUCT_CHILDREN.map((c) => ({
    path: c.href,
    priority: 0.75,
    changeFrequency: "monthly" as const,
  })),
  { path: "/services", priority: 0.9, changeFrequency: "weekly" as const },
  ...SERVICES_CHILDREN.map((c) => ({
    path: c.href,
    priority: 0.85,
    changeFrequency: "weekly" as const,
  })),
  { path: "/portfolio", priority: 0.8, changeFrequency: "monthly" as const },
  ...PORTFOLIO_CHILDREN.map((c) => ({
    path: c.href,
    priority: 0.75,
    changeFrequency: "monthly" as const,
  })),
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/blog/rss.xml", priority: 0.4, changeFrequency: "weekly" as const, lastModified: getBlogFeedLastModified() },
  { path: "/blog/rss/fa.xml", priority: 0.4, changeFrequency: "weekly" as const, lastModified: getBlogFeedLastModified() },
  ...BLOG_POSTS.map((p) => ({
    path: `/blog/${p.slug}`,
    priority: 0.65,
    changeFrequency: "weekly" as const,
    lastModified: new Date(p.publishedAt),
  })),
  { path: "/contactus", priority: 0.9, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.5, changeFrequency: "yearly" as const },
  ...CONTACT_CHILDREN.map((c) => ({
    path: c.href,
    priority: 0.85,
    changeFrequency: "yearly" as const,
  })),
  { path: "/panel", priority: 0.5, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: route.lastModified ?? now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
