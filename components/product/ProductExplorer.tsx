"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import TermIcon from "@/components/icons/TermIcon";
import ProductHeroVisual from "@/components/product/ProductHeroVisual";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import { productPageDictionaries } from "@/i18n/product-page";
import { productPhase2Landing } from "@/i18n/product-phase2";
import type { ProductSlug } from "@/i18n/product-page";

const SLUGS: ProductSlug[] = ["web", "mobile", "windows", "ai", "platforms"];

export default function ProductExplorer() {
  const { fa, dir, lang } = useT();
  const ui = productPageDictionaries[lang];
  const copy = productPhase2Landing[lang].explorer;
  const [active, setActive] = useState<ProductSlug>("web");
  const card = ui.categories.cards.find((c) => c.slug === active)!;

  return (
    <motion.section
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AboutSectionHeader eyebrow={copy.eyebrow} title={copy.title} />
        <p dir={dir} className={`mb-8 text-sm text-paper/50 ${fa ? "font-fa" : "font-mono"}`}>
          {copy.hint}
        </p>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
          <motion.div variants={itemReveal} className="flex flex-col gap-2">
            {SLUGS.map((slug) => {
              const c = ui.categories.cards.find((x) => x.slug === slug)!;
              const isActive = active === slug;
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => setActive(slug)}
                  dir={dir}
                  className={`flex items-center gap-3 border px-4 py-3 text-start transition-colors ${
                    isActive
                      ? "border-term/40 bg-term/[0.06] text-paper"
                      : "border-paper/15 bg-paper/[0.01] text-paper/65 hover:border-paper/30 hover:bg-paper/[0.03]"
                  } ${fa ? "font-fa" : ""}`}
                >
                  <TermIcon name={slug} plain className={isActive ? "text-term" : undefined} />
                  <span className={`text-sm ${fa ? "font-fa" : "font-pixel"}`}>{c.title}</span>
                </button>
              );
            })}
          </motion.div>

          <motion.div variants={itemReveal} className="border border-paper/20 bg-paper/[0.02] p-5 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <ProductHeroVisual slug={active} />
                <h3 dir={dir} className={`mt-6 text-lg text-paper ${fa ? "font-fa" : "font-pixel"}`}>
                  {card.title}
                </h3>
                <p dir={dir} className={`mt-2 text-sm leading-relaxed text-paper/60 ${fa ? "font-fa" : ""}`}>
                  {card.body}
                </p>
                <Link
                  href={`/product/${active}`}
                  dir={dir}
                  className={`mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-term transition-opacity hover:opacity-80 ${fa ? "font-fa" : "font-mono"}`}
                >
                  {copy.linkLabel}
                  <span aria-hidden>{fa ? "←" : "→"}</span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
