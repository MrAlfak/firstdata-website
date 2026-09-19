import type { Metadata } from "next";
import BlogClient from "./BlogClient";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { dictionaries } from "@/i18n/dictionaries";
import { isBlogCategory, type BlogCategorySlug } from "@/config/blog";
import { buildBlogIndexJsonLd } from "@/lib/seo/blog-jsonld";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { pageMetadata } from "@/lib/seo/metadata";
import type { BlogFilter } from "@/components/blog/BlogCategoryFilter";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const page = dictionaries[lang].pages.blog;
  return pageMetadata({
    path: "/blog",
    title: page.title,
    description: page.subtitle,
    lang,
  });
}

export default async function BlogPage({ searchParams }: Props) {
  const lang = await getRequestLang();
  const page = dictionaries[lang].pages.blog;
  const { category } = await searchParams;
  const initialFilter: BlogFilter =
    category && isBlogCategory(category) ? (category as BlogCategorySlug) : "all";

  const breadcrumbs = [
    { name: dictionaries[lang].nav.home, href: "/" },
    { name: page.title },
  ];

  return (
    <main>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBlogIndexJsonLd()) }}
      />
      <BlogClient initialFilter={initialFilter} />
    </main>
  );
}
