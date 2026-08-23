"use client";

import Link from "next/link";
import { motion } from "motion/react";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { PRODUCT_CHILDREN } from "@/config/navigation";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import { productPolishUi } from "@/i18n/product-polish";
import type { ProductSubPageUi } from "@/i18n/product-sub-page";
import type { ProductSlug } from "@/i18n/product-page";
import type { ProductPhase3Sub } from "@/i18n/product-phase3";

type Props = {
  slug: ProductSlug;
  related: ProductSubPageUi["relatedService"];
  crossNav: ProductSubPageUi["crossNav"];
  services?: ProductPhase3Sub["services"];
  accentText?: string;
  accentHover?: string;
};

export default function ProductCrossNav({
  slug,
  related,
  crossNav,
  services,
  accentText = "text-term",
  accentHover = "hover:border-term/35",
}: Props) {
  const { fa, dir, lang, t } = useT();
  const polish = productPolishUi[lang];
  const others = PRODUCT_CHILDREN.filter((item) => item.slug !== slug);

  return (
    <motion.section
      id="related"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="scroll-mt-24 border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Primary related service */}
        <motion.div variants={itemReveal}>
          <AboutSectionHeader eyebrow={related.eyebrow} title={related.title} subtitle={related.body} />
          <Link
            href={related.href}
            dir={dir}
            className={`mt-2 inline-flex items-center gap-2 border border-paper/25 px-4 py-2.5 text-xs uppercase tracking-wider text-paper/70 transition-colors hover:border-paper/45 hover:text-paper ${
              fa ? "font-fa" : "font-mono"
            }`}
          >
            {related.cta}
            <span aria-hidden>{fa ? "←" : "→"}</span>
          </Link>
        </motion.div>

        {/* Service graph if available */}
        {services && services.links.length > 0 ? (
          <motion.div variants={itemReveal}>
            <p
              className={`mb-3 font-mono text-[10px] uppercase tracking-wider text-paper/35 ${
                fa ? "font-fa" : ""
              }`}
            >
              {services.eyebrow} — {services.title}
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {services.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  dir={dir}
                  className={`border border-paper/12 bg-paper/[0.015] p-4 transition-colors ${accentHover} hover:bg-paper/[0.03] ${
                    fa ? "font-fa" : ""
                  }`}
                >
                  <p className={`text-sm text-paper ${fa ? "" : "font-pixel"}`}>{link.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-paper/50">{link.body}</p>
                  <span className={`mt-3 inline-block font-mono text-[10px] ${accentText}`}>
                    {fa ? "←" : "→"}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        ) : null}

        {/* Other products */}
        <motion.div variants={itemReveal}>
          <AboutSectionHeader eyebrow={crossNav.eyebrow} title={crossNav.title} />
          <p className={`mb-4 text-xs text-paper/40 ${fa ? "font-fa" : "font-mono"}`}>
            {polish.crossNavHint}
          </p>
          <div className="flex flex-wrap gap-2">
            {others.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                dir={dir}
                className={`border border-paper/15 px-3 py-2 text-xs text-paper/70 transition-colors hover:border-term/35 hover:text-term ${
                  fa ? "font-fa" : "font-mono uppercase tracking-wider"
                }`}
              >
                {t(item.labelKey)}
                <span className="ms-2 opacity-50">{crossNav.linkLabel}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
