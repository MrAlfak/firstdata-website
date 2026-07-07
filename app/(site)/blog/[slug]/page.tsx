import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { BLOG_SLUGS, getPostBySlug } from "@/config/blog";
import { dictionaries } from "@/i18n/dictionaries";
import { buildArticleJsonLd } from "@/lib/seo/article-jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import BlogPostClient from "./BlogPostClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Not Found" };
  }

  return pageMetadata({
    path: `/blog/${slug}`,
    title: post.en.title,
    description: post.en.excerpt,
    openGraphType: "article",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const nav = dictionaries.en.nav;
  const blogTitle = dictionaries.en.pages.blog.title;
  const breadcrumbs = [
    { name: nav.home, href: "/" },
    { name: blogTitle, href: "/blog" },
    { name: post.en.title },
  ];

  return (
    <main>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleJsonLd(post)) }}
      />
      <BlogPostClient post={post} />
    </main>
  );
}
