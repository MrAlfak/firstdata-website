import type { Lang } from "@/i18n/dictionaries";
import type { BlogCategorySlug, BlogPost, BlogPostContent } from "@/config/blog";

export function formatBlogDate(iso: string, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "fa" ? "fa-IR" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    numberingSystem: lang === "fa" ? "arabext" : "latn",
  }).format(new Date(iso));
}

export function categoryLabel(
  category: BlogCategorySlug,
  labels: Record<BlogCategorySlug, string>,
): string {
  return labels[category];
}

/** Words per minute for read-time estimation. */
const WPM = 200;

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function computeReadMinutes(content: BlogPostContent): number {
  const text = content.body.join(" ");
  return Math.max(1, Math.ceil(countWords(text) / WPM));
}

export function getReadMinutes(post: BlogPost, lang: Lang): number {
  const content = lang === "fa" ? post.fa : post.en;
  return post.readMinutes || computeReadMinutes(content);
}

export type BodyBlock =
  | { type: "h2"; text: string; id: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u0600-\u06FF-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 64);
}

/** Parse body lines: `## heading`, `, list item`, or paragraph. */
export function parseBodyBlocks(body: string[]): BodyBlock[] {
  const blocks: BodyBlock[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      blocks.push({ type: "ul", items: [...listBuffer] });
      listBuffer = [];
    }
  };

  for (const line of body) {
    const trimmed = line.trim();
    if (trimmed.startsWith("## ")) {
      flushList();
      const text = trimmed.slice(3).trim();
      blocks.push({ type: "h2", text, id: slugifyHeading(text) });
      continue;
    }
    if (trimmed.startsWith(", ") || trimmed.startsWith("- ")) {
      listBuffer.push(trimmed.slice(2).trim());
      continue;
    }
    flushList();
    blocks.push({ type: "p", text: line });
  }

  flushList();
  return blocks;
}

export function extractToc(body: string[]): { id: string; text: string }[] {
  return parseBodyBlocks(body)
    .filter((b): b is BodyBlock & { type: "h2" } => b.type === "h2")
    .map(({ id, text }) => ({ id, text }));
}
