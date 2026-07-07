import { BLOG_AUTHOR, getSortedPosts, type BlogPost } from "@/config/blog";
import type { LangCode } from "@/lib/seo/site";
import { absoluteUrl, langUrl, SITE_URL } from "./site";

const CHANNEL: Record<
  LangCode,
  { title: string; description: string; language: string; feedPath: string; blogPath: string }
> = {
  en: {
    title: "First Data Blog",
    description: "Engineering, design, SEO, and product insights from First Data.",
    language: "en-us",
    feedPath: "/blog/rss.xml",
    blogPath: "/blog",
  },
  fa: {
    title: "وبلاگ اولین دیتا",
    description: "مقالات مهندسی، طراحی، سئو و محصول از تیم اولین دیتا.",
    language: "fa-ir",
    feedPath: "/blog/rss/fa.xml",
    blogPath: "/blog",
  },
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function feedLastBuildDate(posts: BlogPost[]): string {
  if (posts.length === 0) return new Date().toUTCString();
  return new Date(posts[0]!.publishedAt).toUTCString();
}

export function getBlogRssFeedPath(lang: LangCode): string {
  return CHANNEL[lang].feedPath;
}

/** Latest post date, used for cache busting / sitemap. */
export function getBlogFeedLastModified(): Date {
  const posts = getSortedPosts();
  if (posts.length === 0) return new Date();
  return new Date(posts[0]!.publishedAt);
}

export function buildBlogRssFeed(lang: LangCode): string {
  const meta = CHANNEL[lang];
  const posts = getSortedPosts();
  const feedUrl = absoluteUrl(meta.feedPath);
  const blogUrl = langUrl(meta.blogPath, lang);
  const author = BLOG_AUTHOR[lang];

  const items = posts
    .map((post) => {
      const content = lang === "fa" ? post.fa : post.en;
      const url = langUrl(`/blog/${post.slug}`, lang);
      const guid = `${url}#${lang}`;

      return `
    <item>
      <title>${escapeXml(content.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="false">${escapeXml(guid)}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(content.excerpt)}</description>
      <category>${escapeXml(post.category)}</category>
      <author>${escapeXml(`${author.name} (${SITE_URL})`)}</author>
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(meta.title)}</title>
    <link>${escapeXml(blogUrl)}</link>
    <description>${escapeXml(meta.description)}</description>
    <language>${meta.language}</language>
    <lastBuildDate>${feedLastBuildDate(posts)}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;
}

export function blogRssResponse(lang: LangCode): Response {
  return new Response(buildBlogRssFeed(lang), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
