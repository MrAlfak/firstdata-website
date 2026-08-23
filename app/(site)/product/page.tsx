import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import ProductJsonLdScript from "@/components/seo/ProductJsonLdScript";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { productHubMeta } from "@/lib/seo/product-page-meta";
import { buildProductHubJsonLd } from "@/lib/seo/product-jsonld";
import { pageMetadata } from "@/lib/seo/metadata";
import ProductClient from "./ProductClient";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getRequestLang();
  const meta = productHubMeta(lang);
  return pageMetadata({
    path: "/product",
    title: meta.title,
    description: meta.description,
  });
}

export default async function ProductPage() {
  const lang = await getRequestLang();
  const meta = productHubMeta(lang);
  const jsonLd = buildProductHubJsonLd(meta.title, meta.description);

  return (
    <main>
      <ProductJsonLdScript data={jsonLd} />
      <BreadcrumbJsonLd items={meta.breadcrumbs} />
      <ProductClient />
    </main>
  );
}
