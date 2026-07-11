"use client";

import Link from "next/link";
import { motion } from "motion/react";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import ProductHeroVisual from "@/components/product/ProductHeroVisual";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import type { ProductSlug } from "@/i18n/product-page";
import type { ProductPhase3Sub } from "@/i18n/product-phase3";

type Props = {
  slug: ProductSlug;
  data: ProductPhase3Sub["demo"];
  accentBorder?: string;
};

export default function ProductDemoSection({ slug, data, accentBorder = "border-paper/20" }: Props) {
  const { fa, dir } = useT();

  return (
    <motion.section
      id="demo"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="scroll-mt-24 border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AboutSectionHeader eyebrow={data.eyebrow} title={data.title} />
        <motion.div
          variants={itemReveal}
          className={`product-demo-loop overflow-hidden border bg-paper/[0.02] p-4 sm:p-6 ${accentBorder}`}
        >
          <ProductHeroVisual slug={slug} animated />
        </motion.div>
        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mt-4 text-sm text-paper/50 ${fa ? "font-fa" : "font-mono"}`}
        >
          {data.caption}
        </motion.p>
      </div>
    </motion.section>
  );
}
