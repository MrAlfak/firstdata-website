"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import type { ProductSlug } from "@/i18n/product-page";
import type { ProductPhase3Sub } from "@/i18n/product-phase3";

type Props = {
  slug: ProductSlug;
  data: ProductPhase3Sub["onePager"];
  accentBorder?: string;
  accentText?: string;
};

export default function ProductOnePagerCta({ slug, data, accentBorder = "border-term/35", accentText = "text-term" }: Props) {
  const { fa, dir } = useT();

  return (
    <motion.section
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="border-b border-paper/20 px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={itemReveal}
          dir={dir}
          className={`flex flex-col gap-4 border bg-paper/[0.015] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 ${accentBorder} ${fa ? "font-fa" : ""}`}
        >
          <div>
            <p className="font-mono text-[10px] text-paper/35">{data.eyebrow}</p>
            <h2 className={`mt-2 text-lg text-paper ${fa ? "font-fa" : "font-pixel"}`}>{data.title}</h2>
            <p className="mt-2 max-w-xl text-sm text-paper/55">{data.body}</p>
          </div>
          <Link
            href={`/product/${slug}/one-pager`}
            target="_blank"
            rel="noopener noreferrer"
            className={`shrink-0 border px-5 py-2.5 text-xs transition-colors hover:bg-paper/[0.04] ${accentBorder} ${accentText} ${fa ? "font-fa" : "font-mono uppercase"}`}
          >
            {data.buttonLabel}
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
