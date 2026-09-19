import type { BlogPost } from "@/config/blog";
import type { Lang } from "@/i18n/dictionaries";
import { countWords } from "@/lib/blog";
import { SITE_URL } from "./site";

export function buildArticleJsonLd(post: BlogPost, lang: Lang = "en") {
  const loc = post[lang];
  const alt = post[lang === "fa" ? "en" : "fa"];
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: loc.title,
    alternativeHeadline: alt.title,
    description: loc.excerpt,
    inLanguage: lang === "fa" ? "fa-IR" : "en-US",
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "First Data",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "First Data",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
      },
    },
    image: [`${url}/opengraph-image`],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    articleSection: post.category,
    wordCount: countWords(loc.body.join(" ")),
    keywords: post.tags?.join(", "),
  };
}
