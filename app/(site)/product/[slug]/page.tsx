import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import ProductJsonLdScript from "@/components/seo/ProductJsonLdScript";
import { PRODUCT_SLUGS, PRODUCT_SLUG_TO_PAGE } from "@/config/navigation";
import { productSubExtensions } from "@/i18n/product-sub-extensions";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { buildFaqJsonLd } from "@/lib/seo/faq-jsonld";
import { productSubPageMeta } from "@/lib/seo/product-page-meta";
import { buildProductJsonLd } from "@/lib/seo/product-jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import ProductSubClient from "./ProductSubClient";
import type { ProductSlug } from "@/i18n/product-page";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!PRODUCT_SLUG_TO_PAGE[slug]) {
    return { title: "Not Found" };
  }

  const lang = await getRequestLang();
  const meta = productSubPageMeta(slug as ProductSlug, lang);

  return pageMetadata({
    path: `/product/${slug}`,
    title: meta.title,
    description: meta.description,
    lang,
  });
}

export default async function ProductSubPage({ params }: Props) {
  const { slug } = await params;
  if (!PRODUCT_SLUGS.includes(slug)) {
    notFound();
  }

  const lang = await getRequestLang();
  const productSlug = slug as ProductSlug;
  const meta = productSubPageMeta(productSlug, lang);

  const jsonLd = buildProductJsonLd({
    slug: productSlug,
    name: meta.title,
    description: meta.description,
    lang,
  });
  const faqItems = productSubExtensions[lang][productSlug].faq.items;
  const faqJsonLd = buildFaqJsonLd(faqItems, lang);

  return (
    <main>
      <ProductJsonLdScript data={jsonLd} />
      <ProductJsonLdScript data={faqJsonLd} />
      <BreadcrumbJsonLd items={meta.breadcrumbs} />
      <ProductSubClient slug={slug} />
    </main>
  );
}
