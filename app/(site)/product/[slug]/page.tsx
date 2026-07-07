import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import BreadcrumbNav from "@/components/seo/BreadcrumbNav";
import { PRODUCT_SLUGS, PRODUCT_SLUG_TO_PAGE } from "@/config/navigation";
import { productPageDictionaries } from "@/i18n/product-page";
import { productSubPageDictionaries } from "@/i18n/product-sub-page";
import { pageMetadata } from "@/lib/seo/metadata";
import ProductSubClient from "./ProductSubClient";

type Props = {
  params: Promise<{ slug: string }>;
};

const TITLES: Record<string, string> = {
  web: "Web",
  mobile: "Mobile",
  windows: "Windows",
  ai: "Artificial Intelligence",
  platforms: "Integrated Platforms",
};

export function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!PRODUCT_SLUG_TO_PAGE[slug]) {
    return { title: "Not Found" };
  }

  const title = TITLES[slug] ?? "Products";
  const description = productSubPageDictionaries.en[slug as keyof typeof productSubPageDictionaries.en].hero.body;

  return pageMetadata({
    path: `/product/${slug}`,
    title,
    description,
  });
}

export default async function ProductSubPage({ params }: Props) {
  const { slug } = await params;
  if (!PRODUCT_SLUGS.includes(slug)) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: productPageDictionaries.en.hero.title, href: "/product" },
    { name: TITLES[slug] ?? slug },
  ];

  return (
    <main>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <div className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <BreadcrumbNav items={breadcrumbs} />
      </div>
      <ProductSubClient slug={slug} />
    </main>
  );
}
