"use client";

import Link from "next/link";
import { motion } from "motion/react";
import TermIcon from "@/components/icons/TermIcon";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import ProductArchitectureDiagram from "@/components/product/ProductArchitectureDiagram";
import ProductBeforeAfter from "@/components/product/ProductBeforeAfter";
import ProductChangelogTeaser from "@/components/product/ProductChangelogTeaser";
import ProductDemoSection from "@/components/product/ProductDemoSection";
import ProductFaq from "@/components/product/ProductFaq";
import ProductOnePagerCta from "@/components/product/ProductOnePagerCta";
import ProductPortfolioSamples from "@/components/product/ProductPortfolioSamples";
import ProductPricingTiers from "@/components/product/ProductPricingTiers";
import ProductServiceGraph from "@/components/product/ProductServiceGraph";
import ProductStackTags from "@/components/product/ProductStackTags";
import ProductStatsStrip from "@/components/product/ProductStatsStrip";
import ProductStickyNav from "@/components/product/ProductStickyNav";
import ProductSubHero from "@/components/product/ProductSubHero";
import ProductTestimonial from "@/components/product/ProductTestimonial";
import FinalCta from "@/components/sales/FinalCta";
import { PRODUCT_CHILDREN } from "@/config/navigation";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import { productPhase2Sub } from "@/i18n/product-phase2";
import { productPhase3Sub } from "@/i18n/product-phase3";
import { productSubExtensions } from "@/i18n/product-sub-extensions";
import { productSubPageDictionaries } from "@/i18n/product-sub-page";
import type { ProductSlug } from "@/i18n/product-page";

const sectionClass = "scroll-mt-24 border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8";

const accentMap: Record<ProductSlug, { border: string; text: string; hover: string; cta: string }> = {
  web: {
    border: "border-paper/35",
    text: "text-paper",
    hover: "hover:border-paper/55",
    cta: "border border-paper/30 px-5 py-2.5 text-xs uppercase tracking-wider text-paper/70 transition-colors duration-200 hover:border-paper hover:text-paper",
  },
  mobile: {
    border: "border-term/40",
    text: "text-term",
    hover: "hover:border-term/55",
    cta: "border border-term/40 px-5 py-2.5 text-xs uppercase tracking-wider text-term transition-colors duration-200 hover:bg-term/10",
  },
  windows: {
    border: "border-sky/40",
    text: "text-sky",
    hover: "hover:border-sky/55",
    cta: "border border-sky/40 px-5 py-2.5 text-xs uppercase tracking-wider text-sky transition-colors duration-200 hover:bg-sky/10",
  },
  ai: {
    border: "border-violet/40",
    text: "text-violet",
    hover: "hover:border-violet/55",
    cta: "border border-violet/40 px-5 py-2.5 text-xs uppercase tracking-wider text-violet transition-colors duration-200 hover:bg-violet/10",
  },
  platforms: {
    border: "border-emerald/40",
    text: "text-emerald",
    hover: "hover:border-emerald/55",
    cta: "border border-emerald/40 px-5 py-2.5 text-xs uppercase tracking-wider text-emerald transition-colors duration-200 hover:bg-emerald/10",
  },
};

type Props = {
  slug: ProductSlug;
};

export default function ProductSubPage({ slug }: Props) {
  const { fa, dir, lang, t } = useT();
  const ui = productSubPageDictionaries[lang][slug];
  const ext = productSubExtensions[lang][slug];
  const p2 = productPhase2Sub[lang][slug];
  const p3 = productPhase3Sub[lang][slug];
  const accent = accentMap[slug];
  const others = PRODUCT_CHILDREN.filter((item) => item.slug !== slug);

  const navItems = [
    { id: "stats", label: ext.nav.stats },
    { id: "use-cases", label: ext.nav.useCases },
    { id: "before-after", label: p2.nav.beforeAfter },
    { id: "demo", label: p3.nav.demo },
    { id: "samples", label: ext.nav.samples },
    { id: "features", label: ext.nav.features },
    { id: "architecture", label: p2.nav.architecture },
    { id: "stack", label: ext.nav.stack },
    { id: "process", label: ext.nav.process },
    { id: "pricing", label: p3.nav.pricing },
    { id: "services", label: p3.nav.services },
    { id: "changelog", label: p3.nav.changelog },
    { id: "faq", label: ext.nav.faq },
  ];

  return (
    <>
      <ProductSubHero
        slug={slug}
        eyebrow={ui.hero.eyebrow}
        title={ui.hero.title}
        subtitle={ui.hero.lead}
        body={ui.hero.body}
        cta={ui.pageCta}
        ctaClassName={`${accent.cta} ${fa ? "font-fa" : ""}`}
        bootLines={p3.bootLines}
        badges={p3.badges}
        accentBorder={accent.border}
        accentText={accent.text}
      />

      <ProductStickyNav items={navItems} />

      <ProductStatsStrip eyebrow={ext.stats.eyebrow} items={ext.stats.items} accentText={accent.text} />

      <motion.section
        id="use-cases"
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.useCases.eyebrow} title={ui.useCases.title} />
          <div className="grid gap-4 sm:grid-cols-2">
            {ui.useCases.cards.map((card) => (
              <motion.article
                key={card.title}
                variants={itemReveal}
                dir={dir}
                className={`border border-paper/15 bg-paper/[0.015] p-5 sm:p-6 ${fa ? "font-fa" : ""}`}
              >
                <h3 className={`text-base text-paper/90 ${fa ? "font-fa" : "font-pixel"}`}>{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/55">{card.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <ProductBeforeAfter data={p2.beforeAfter} />

      <ProductDemoSection slug={slug} data={p3.demo} accentBorder={accent.border} />

      <ProductPortfolioSamples
        slug={slug}
        eyebrow={ext.portfolio.eyebrow}
        title={ext.portfolio.title}
        linkLabel={ext.portfolio.linkLabel}
        href={ext.portfolio.href}
        accentText={accent.text}
      />

      <motion.section
        id="features"
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.features.eyebrow} title={ui.features.title} />
          <motion.ul variants={itemReveal} dir={dir} className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-3 ${fa ? "font-fa" : ""}`}>
            {ui.features.items.map((item) => (
              <li key={item} className="flex items-center gap-2 border border-paper/12 bg-paper/[0.015] px-4 py-3 text-sm text-paper/70">
                <span className={accent.text} aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.section>

      <ProductArchitectureDiagram data={p2.architecture} accentBorder={accent.border} accentText={accent.text} />

      <ProductStackTags
        eyebrow={ui.stack.eyebrow}
        title={ui.stack.title}
        tags={ui.stack.tags}
        stackWhy={p2.stackWhy}
        accentBorder={accent.border}
      />

      <ProductTestimonial data={p2.testimonial} accentBorder={accent.border} />

      <motion.section
        id="process"
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.process.eyebrow} title={ui.process.title} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ui.process.steps.map((step, index) => (
              <motion.article
                key={step.title}
                variants={itemReveal}
                dir={dir}
                className={`border border-paper/15 bg-paper/[0.015] p-5 sm:p-6 ${fa ? "font-fa" : ""}`}
              >
                <span className={`font-mono text-[10px] ${accent.text}`}>{String(index + 1).padStart(2, "0")}</span>
                <h3 className={`mt-3 text-base text-paper/90 ${fa ? "font-fa" : "font-pixel"}`}>{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/55">{step.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <ProductPricingTiers data={p3.pricing} accentBorder={accent.border} accentText={accent.text} />

      <ProductServiceGraph data={p3.services} accentText={accent.text} />

      <ProductChangelogTeaser data={p3.changelog} />

      <ProductOnePagerCta slug={slug} data={p3.onePager} accentBorder={accent.border} accentText={accent.text} />

      <ProductFaq slug={slug} eyebrow={ext.faq.eyebrow} title={ext.faq.title} items={ext.faq.items} />

      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.crossNav.eyebrow} title={ui.crossNav.title} />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((item) => (
              <motion.div key={item.slug} variants={itemReveal}>
                <Link
                  href={item.href}
                  dir={dir}
                  className={`group flex items-center justify-between border border-paper/15 bg-paper/[0.015] px-4 py-3 text-sm transition-colors ${accent.hover} hover:bg-paper/[0.03] ${fa ? "font-fa" : ""}`}
                >
                  <span className="flex items-center gap-2 text-paper/75 group-hover:text-paper">
                    <TermIcon name={item.slug} plain className="group-hover:text-current" />
                    {t(item.labelKey)}
                  </span>
                  <span className={`font-mono text-[10px] text-paper/35 ${accent.text}`}>
                    {ui.crossNav.linkLabel} {fa ? "←" : "→"}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <FinalCta />
    </>
  );
}
