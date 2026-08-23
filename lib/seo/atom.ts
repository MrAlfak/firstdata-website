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
    language: "en-US",
    feedPath: "/blog/atom.xml",
    blogPath: "/blog",
  },
  fa: {
    title: "وبلاگ اولین دیتا",
    description: "مقالات مهندسی، طراحی، سئو و محصول از تیم اولین دیتا.",
    language: "fa-IR",
    feedPath: "/blog/atom/fa.xml",
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

function feedUpdated(posts: BlogPost[]): string {
  if (posts.length === 0) return new Date().toISOString();
  return new Date(posts[0]!.publishedAt).toISOString();
}

export function buildBlogAtomFeed(lang: LangCode): string {
  const meta = CHANNEL[lang];
  const posts = getSortedPosts();
  const feedUrl = absoluteUrl(meta.feedPath);
  const blogUrl = langUrl(meta.blogPath, lang);
  const author = BLOG_AUTHOR[lang];

  const entries = posts
    .map((post) => {
      const content = lang === "fa" ? post.fa : post.en;
      const url = langUrl(`/blog/${post.slug}`, lang);
      const updated = new Date(post.publishedAt).toISOString();

      return `
  <entry>
    <title>${escapeXml(content.title)}</title>
    <link href="${escapeXml(url)}" rel="alternate" type="text/html" />
    <id>${escapeXml(`${url}#${lang}`)}</id>
    <updated>${updated}</updated>
    <published>${updated}</published>
    <summary>${escapeXml(content.excerpt)}</summary>
    <category term="${escapeXml(post.category)}" />
    <author>
      <name>${escapeXml(author.name)}</name>
      <uri>${escapeXml(SITE_URL)}</uri>
    </author>
  </entry>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${meta.language}">
  <title>${escapeXml(meta.title)}</title>
  <subtitle>${escapeXml(meta.description)}</subtitle>
  <link href="${escapeXml(feedUrl)}" rel="self" type="application/atom+xml" />
  <link href="${escapeXml(blogUrl)}" rel="alternate" type="text/html" />
  <id>${escapeXml(feedUrl)}</id>
  <updated>${feedUpdated(posts)}</updated>${entries}
</feed>`;
}

export function blogAtomResponse(lang: LangCode): Response {
  return new Response(buildBlogAtomFeed(lang), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
