import { BLOG_POSTS } from "@/config/blog";
import { SITE_URL } from "./site";

export function buildBlogIndexJsonLd() {
  return {
    "@context": "https://schema.org", "@type": "Blog", name: "First Data Blog", description: "Engineering, design, SEO, product, mobile, and AI, practical notes from our team.", url: `${SITE_URL}/blog`, publisher: {
      "@type": "Organization", name: "First Data", url: SITE_URL, logo: {
        "@type": "ImageObject", url: `${SITE_URL}/icon.svg`, }, }, blogPost: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting", headline: post.en.title, url: `${SITE_URL}/blog/${post.slug}`, datePublished: post.publishedAt, articleSection: post.category, })), };
}
