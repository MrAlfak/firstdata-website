import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { BLOG_SLUGS, getPostBySlug } from "@/config/blog";
import { dictionaries } from "@/i18n/dictionaries";
import { getRequestLang } from "@/lib/i18n/request-lang";
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

  const lang = await getRequestLang();
  const loc = post[lang];

  return pageMetadata({
    path: `/blog/${slug}`,
    title: loc.title,
    description: loc.excerpt,
    openGraphType: "article",
    lang,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const lang = await getRequestLang();
  const nav = dictionaries[lang].nav;
  const blogTitle = dictionaries[lang].pages.blog.title;
  const breadcrumbs = [
    { name: nav.home, href: "/" },
    { name: blogTitle, href: "/blog" },
    { name: post[lang].title },
  ];

  return (
    <main>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleJsonLd(post, lang)) }}
      />
      <BlogPostClient post={post} />
    </main>
  );
}
