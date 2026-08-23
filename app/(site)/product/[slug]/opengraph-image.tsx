import { PRODUCT_SLUG_TO_PAGE } from "@/config/navigation";
import { productSubPageDictionaries } from "@/i18n/product-sub-page";
import type { ProductSlug } from "@/i18n/product-page";
import { renderOgImage } from "@/lib/seo/og-image";

export const dynamic = "force-dynamic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductOgImage({ params }: Props) {
  const { slug } = await params;
  if (!PRODUCT_SLUG_TO_PAGE[slug]) {
    return renderOgImage({ title: "PRODUCT", subtitle: "First Data" });
  }

  const ui = productSubPageDictionaries.fa[slug as ProductSlug];
  return renderOgImage({
    title: ui.hero.title,
    subtitle: ui.hero.lead,
    eyebrow: `// product/${slug}`,
  });
}
