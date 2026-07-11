"use client";

import { motion } from "motion/react";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import type { ProductPhase2Sub } from "@/i18n/product-phase2";

type Props = {
  data: ProductPhase2Sub["testimonial"];
  accentBorder?: string;
};

export default function ProductTestimonial({ data, accentBorder = "border-term/25" }: Props) {
  const { fa, dir } = useT();

  return (
    <motion.section
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.blockquote
          variants={itemReveal}
          dir={dir}
          className={`border bg-paper/[0.015] p-6 sm:p-8 ${accentBorder} ${fa ? "font-fa" : ""}`}
        >
          <div className="flex items-center gap-2 border-b border-paper/10 pb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-term/60" />
            <span className="font-mono text-[9px] text-paper/30">{data.eyebrow}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-paper/75 sm:text-base">&ldquo;{data.quote}&rdquo;</p>
          <footer className="mt-6 border-t border-paper/10 pt-4">
            <p className={`text-sm text-paper ${fa ? "font-fa" : "font-pixel"}`}>{data.name}</p>
            <p className={`mt-1 text-[11px] text-paper/45 ${fa ? "font-fa" : ""}`}>{data.role}</p>
          </footer>
        </motion.blockquote>
      </div>
    </motion.section>
  );
}
