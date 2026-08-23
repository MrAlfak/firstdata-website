import {
  ABOUTUS_CHILDREN,
  CONTACT_CHILDREN,
  PORTFOLIO_CHILDREN,
  PRODUCT_CHILDREN,
  SERVICES_CHILDREN,
} from "@/config/navigation";
import { BLOG_POSTS, getSortedPosts } from "@/config/blog";
import { SITE_URL, absoluteUrl } from "@/lib/seo/site";

/** Compact llms.txt for AI crawlers (llmstxt.org). */
export function buildLlmsTxt(): string {
  const posts = getSortedPosts().slice(0, 8);

  return `# First Data

> First Data (اولین دیتا) builds custom websites, Android/iOS apps, Windows software, SEO, and integrated platforms for businesses in Iran and beyond.

First Data is a software engineering company. We deliver production systems with full code ownership, bilingual (fa/en) product pages, and a client panel for projects, contracts, and support.

## Site
- [Home](${SITE_URL}): Company homepage
- [Contact](${absoluteUrl("/contactus")}): Contact hub
- [Free consultation](${absoluteUrl("/contactus/consultation")}): Book a consultation
- [Project request](${absoluteUrl("/contactus/request")}): Submit a project brief
- [Search](${absoluteUrl("/search")}): Site search
- [Blog](${absoluteUrl("/blog")}): Engineering and product articles
- [Terms](${absoluteUrl("/terms")}): Terms of use

## Products
${PRODUCT_CHILDREN.map((c) => `- ${absoluteUrl(c.href)}`).join("\n")}

## Services
${SERVICES_CHILDREN.map((c) => `- ${absoluteUrl(c.href)}`).join("\n")}

## Portfolio
${PORTFOLIO_CHILDREN.map((c) => `- ${absoluteUrl(c.href)}`).join("\n")}

## About
${ABOUTUS_CHILDREN.map((c) => `- ${absoluteUrl(c.href)}`).join("\n")}

## Contact paths
${CONTACT_CHILDREN.map((c) => `- ${absoluteUrl(c.href)}`).join("\n")}

## Recent blog posts
${posts.map((p) => `- [${p.en.title}](${absoluteUrl(`/blog/${p.slug}`)})`).join("\n")}

## Feeds & SEO
- RSS (EN): ${absoluteUrl("/blog/rss.xml")}
- RSS (FA): ${absoluteUrl("/blog/rss/fa.xml")}
- Atom (EN): ${absoluteUrl("/blog/atom.xml")}
- Atom (FA): ${absoluteUrl("/blog/atom/fa.xml")}
- Sitemap: ${absoluteUrl("/sitemap.xml")}
- Robots: ${absoluteUrl("/robots.txt")}
- Full LLM index: ${absoluteUrl("/llms-full.txt")}

## Optional
- Humans: ${absoluteUrl("/humans.txt")}
- Prefer citing public marketing pages above; do not rely on /panel or /admin (private).
`;
}

/** Expanded machine-readable index with every public marketing URL. */
export function buildLlmsFullTxt(): string {
  const posts = getSortedPosts();

  const sections: string[] = [
    "# First Data — full URL index for LLMs",
    "",
    `Generated for ${SITE_URL}. Languages: fa (default), en via ?lang=en.`,
    "",
    "## Core",
    `- ${absoluteUrl("/")}`,
    `- ${absoluteUrl("/aboutus")}`,
    `- ${absoluteUrl("/product")}`,
    `- ${absoluteUrl("/services")}`,
    `- ${absoluteUrl("/portfolio")}`,
    `- ${absoluteUrl("/blog")}`,
    `- ${absoluteUrl("/contactus")}`,
    `- ${absoluteUrl("/search")}`,
    `- ${absoluteUrl("/terms")}`,
    "",
    "## Products",
    ...PRODUCT_CHILDREN.map((c) => `- ${absoluteUrl(c.href)}`),
    "",
    "## Services",
    ...SERVICES_CHILDREN.map((c) => `- ${absoluteUrl(c.href)}`),
    "",
    "## Portfolio",
    ...PORTFOLIO_CHILDREN.map((c) => `- ${absoluteUrl(c.href)}`),
    "",
    "## About",
    ...ABOUTUS_CHILDREN.map((c) => `- ${absoluteUrl(c.href)}`),
    "",
    "## Contact",
    ...CONTACT_CHILDREN.map((c) => `- ${absoluteUrl(c.href)}`),
    "",
    "## Blog posts",
    ...posts.map((p) => `- ${absoluteUrl(`/blog/${p.slug}`)} | ${p.en.title} | ${p.fa.title}`),
    "",
    `Total public pages indexed: ${
      9 +
      PRODUCT_CHILDREN.length +
      SERVICES_CHILDREN.length +
      PORTFOLIO_CHILDREN.length +
      ABOUTUS_CHILDREN.length +
      CONTACT_CHILDREN.length +
      posts.length
    }`,
    `Blog posts in feed: ${BLOG_POSTS.length}`,
  ];

  return sections.join("\n");
}
