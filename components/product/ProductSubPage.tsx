"use client";

import ProductCaseStudy from "@/components/product/ProductCaseStudy";
import ProductComparisonTable from "@/components/product/ProductComparisonTable";
import ProductCrossNav from "@/components/product/ProductCrossNav";
import ProductFaq from "@/components/product/ProductFaq";
import ProductFeaturesSection from "@/components/product/ProductFeaturesSection";
import ProductInteractiveDemo from "@/components/product/ProductInteractiveDemo";
import ProductLogoStrip from "@/components/product/ProductLogoStrip";
import ProductOnePagerCta from "@/components/product/ProductOnePagerCta";
import ProductPortfolioSamples from "@/components/product/ProductPortfolioSamples";
import ProductPricingTiers from "@/components/product/ProductPricingTiers";
import ProductProcessSection from "@/components/product/ProductProcessSection";
import ProductStickyNav from "@/components/product/ProductStickyNav";
import ProductSubHero from "@/components/product/ProductSubHero";
import ProductTestimonial from "@/components/product/ProductTestimonial";
import ProductUseCaseCards from "@/components/product/ProductUseCaseCards";
import FinalCta from "@/components/sales/FinalCta";
import { useT } from "@/i18n/LangProvider";
import { productPhase2Sub } from "@/i18n/product-phase2";
import { productPhase3Sub } from "@/i18n/product-phase3";
import { productPolishUi } from "@/i18n/product-polish";
import { productSubExtensions } from "@/i18n/product-sub-extensions";
import { productSubPageDictionaries } from "@/i18n/product-sub-page";
import type { ProductSlug } from "@/i18n/product-page";

/** CRT-aligned accents — avoid generic SaaS sky/violet. */
const accentMap: Record<
  ProductSlug,
  { border: string; text: string; hover: string; card: string; cta: string }
> = {
  web: {
    border: "border-paper/40",
    text: "text-paper",
    hover: "hover:border-paper/45",
    card: "border-paper/15 bg-paper/[0.02]",
    cta: "border border-paper/40 bg-paper/10 px-5 py-2.5 text-xs uppercase tracking-wider text-paper transition-colors duration-200 hover:bg-paper/20",
  },
  mobile: {
    border: "border-term/40",
    text: "text-term",
    hover: "hover:border-term/35",
    card: "border-term/15 bg-term/[0.03]",
    cta: "border border-term/40 bg-term/10 px-5 py-2.5 text-xs uppercase tracking-wider text-term transition-colors duration-200 hover:bg-term/20",
  },
  windows: {
    border: "border-amber/40",
    text: "text-amber",
    hover: "hover:border-amber/35",
    card: "border-amber/15 bg-amber/[0.03]",
    cta: "border border-amber/40 bg-amber/10 px-5 py-2.5 text-xs uppercase tracking-wider text-amber transition-colors duration-200 hover:bg-amber/20",
  },
  ai: {
    border: "border-term/45",
    text: "text-term",
    hover: "hover:border-term/40",
    card: "border-term/20 bg-term/[0.04]",
    cta: "border border-term/45 bg-term/10 px-5 py-2.5 text-xs uppercase tracking-wider text-term transition-colors duration-200 hover:bg-term/20",
  },
  platforms: {
    border: "border-paper/45",
    text: "text-paper",
    hover: "hover:border-term/30",
    card: "border-paper/15 bg-paper/[0.025]",
    cta: "border border-paper/40 bg-paper/10 px-5 py-2.5 text-xs uppercase tracking-wider text-paper transition-colors duration-200 hover:border-term/40 hover:text-term",
  },
};

type Props = {
  slug: ProductSlug;
};

export default function ProductSubPage({ slug }: Props) {
  const { fa, lang } = useT();
  const ui = productSubPageDictionaries[lang][slug];
  const ext = productSubExtensions[lang][slug];
  const p2 = productPhase2Sub[lang][slug];
  const p3 = productPhase3Sub[lang][slug];
  const polish = productPolishUi[lang];
  const accent = accentMap[slug];

  const stickyItems = [
    { id: "use-cases", label: ext.nav.useCases },
    { id: "features", label: ext.nav.features },
    { id: "demo", label: polish.navDemo },
    { id: "pricing", label: polish.navPricing },
    { id: "case-study", label: polish.navCaseStudy },
    { id: "compare", label: polish.navCompare },
    { id: "samples", label: ext.nav.samples },
    { id: "process", label: ext.nav.process },
    { id: "faq", label: ext.nav.faq },
    { id: "related", label: polish.crossNavHint },
  ];

  return (
    <div className="product-sub-page" data-product-page>
      <ProductSubHero
        slug={slug}
        title={ui.hero.title}
        subtitle={ui.hero.lead}
        body={ui.hero.body}
        cta={polish.processCta}
        ctaClassName={`${accent.cta} ${fa ? "font-fa" : ""}`}
        badges={p3.badges}
        accentBorder={accent.border}
        accentText={accent.text}
      />

      <ProductStickyNav items={stickyItems} />

      <ProductUseCaseCards
        data={ui.useCases}
        accentText={accent.text}
        accentHover={accent.hover}
        accentCard={accent.card}
      />

      <ProductFeaturesSection data={ui.features} accentText={accent.text} />

      <ProductInteractiveDemo
        slug={slug}
        eyebrow={polish.demo.eyebrow}
        title={polish.demo.title}
        subtitle={polish.demo.subtitle}
        accentText={accent.text}
        accentBorder={accent.border}
      />

      <ProductPricingTiers
        data={p3.pricing}
        accentBorder={accent.border}
        accentText={accent.text}
      />

      <ProductCaseStudy
        slug={slug}
        href={ext.portfolio.href}
        accentText={accent.text}
        accentBorder={accent.border}
        accentHover={accent.hover}
      />

      <ProductComparisonTable data={p2.comparison} />

      <ProductTestimonial data={p2.testimonial} accentBorder={accent.border} />

      <ProductLogoStrip eyebrow={polish.industries.eyebrow} title={polish.industries.title} />

      <ProductPortfolioSamples
        slug={slug}
        limit={3}
        eyebrow={ext.portfolio.eyebrow}
        title={ext.portfolio.title}
        subtitle={ext.portfolio.subtitle}
        linkLabel={ext.portfolio.linkLabel}
        href={ext.portfolio.href}
        accentText={accent.text}
        accentHover={accent.hover}
        accentBorder={accent.border}
      />

      <ProductProcessSection
        data={ui.process}
        accentText={accent.text}
        accentBorder={accent.border}
      />

      <ProductOnePagerCta
        slug={slug}
        data={p3.onePager}
        accentBorder={accent.border}
        accentText={accent.text}
      />

      <ProductFaq
        slug={slug}
        eyebrow={ext.faq.eyebrow}
        title={ext.faq.title}
        items={ext.faq.items}
        maxItems={5}
      />

      <ProductCrossNav
        slug={slug}
        related={ui.relatedService}
        crossNav={ui.crossNav}
        services={p3.services}
        accentText={accent.text}
        accentHover={accent.hover}
      />

      <FinalCta />
    </div>
  );
}
