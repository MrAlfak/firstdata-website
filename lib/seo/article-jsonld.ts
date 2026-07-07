import type { BlogPost } from "@/config/blog";
import { countWords } from "@/lib/blog";
import { SITE_URL } from "./site";

export function buildArticleJsonLd(post: BlogPost) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.en.title,
    alternativeHeadline: post.fa.title,
    description: post.en.excerpt,
    inLanguage: ["en-US", "fa-IR"],
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
    wordCount: countWords(post.en.body.join(" ")),
    keywords: post.tags?.join(", "),
  };
}
