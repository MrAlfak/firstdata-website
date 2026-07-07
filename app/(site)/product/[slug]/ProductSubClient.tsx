"use client";

import ProductSubPage from "@/components/product/ProductSubPage";
import type { ProductSlug } from "@/i18n/product-page";

type Props = {
  slug: string;
};

export default function ProductSubClient({ slug }: Props) {
  return <ProductSubPage slug={slug as ProductSlug} />;
}
