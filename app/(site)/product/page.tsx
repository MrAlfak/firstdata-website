import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import BreadcrumbNav from "@/components/seo/BreadcrumbNav";
import { productPageDictionaries } from "@/i18n/product-page";
import { pageMetadata } from "@/lib/seo/metadata";
import ProductClient from "./ProductClient";

export const metadata: Metadata = pageMetadata({
  path: "/product",
  title: productPageDictionaries.en.hero.title,
  description: productPageDictionaries.en.hero.body,
});

const breadcrumbs = [{ name: "Home", href: "/" }, { name: productPageDictionaries.en.hero.title }];

export default function ProductPage() {
  return (
    <main>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <div className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <BreadcrumbNav items={breadcrumbs} />
      </div>
      <ProductClient />
    </main>
  );
}
