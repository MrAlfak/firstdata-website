import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCT_SLUGS } from "@/config/navigation";
import { productSubPageDictionaries } from "@/i18n/product-sub-page";
import { productPhase3Sub } from "@/i18n/product-phase3";
import type { ProductSlug } from "@/i18n/product-page";
import OnePagerClient from "./OnePagerClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!PRODUCT_SLUGS.includes(slug)) return { title: "Not Found" };
  const p3 = productPhase3Sub.en[slug as ProductSlug];
  return {
    title: p3.onePager.printTitle,
    robots: { index: false, follow: false },
  };
}

export default async function ProductOnePagerPage({ params }: Props) {
  const { slug } = await params;
  if (!PRODUCT_SLUGS.includes(slug)) notFound();

  const productSlug = slug as ProductSlug;
  const hero = productSubPageDictionaries.en[productSlug].hero;
  const p3Fa = productPhase3Sub.fa[productSlug];
  const p3En = productPhase3Sub.en[productSlug];

  return (
    <OnePagerClient
      slug={productSlug}
      titleFa={productSubPageDictionaries.fa[productSlug].hero.title}
      titleEn={hero.title}
      leadFa={productSubPageDictionaries.fa[productSlug].hero.lead}
      leadEn={hero.lead}
      sectionsFa={p3Fa.onePager.sections}
      sectionsEn={p3En.onePager.sections}
      printTitle={p3En.onePager.printTitle}
    />
  );
}
