"use client";

import { motion } from "motion/react";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import type { ProductPhase2Sub } from "@/i18n/product-phase2";

type Props = {
  data: ProductPhase2Sub["architecture"];
  accentBorder?: string;
  accentText?: string;
};

export default function ProductArchitectureDiagram({
  data,
  accentBorder = "border-term/35",
  accentText = "text-term",
}: Props) {
  const { fa, dir } = useT();
  const nodes = data.nodes;

  return (
    <motion.section
      id="architecture"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="scroll-mt-24 border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AboutSectionHeader eyebrow={data.eyebrow} title={data.title} />
        <motion.div variants={itemReveal} className="overflow-x-auto">
          <div className="flex min-w-[280px] flex-col items-stretch gap-0 sm:min-w-0">
            {nodes.map((node, i) => (
              <div key={node} className="flex flex-col items-center">
                <div
                  className={`w-full max-w-md border bg-paper/[0.03] px-4 py-3 text-center font-mono text-[11px] uppercase tracking-wider text-paper/80 sm:text-xs ${accentBorder}`}
                >
                  {node}
                </div>
                {i < nodes.length - 1 && (
                  <span className={`my-1 font-mono text-sm ${accentText}`} aria-hidden>
                    ↓
                  </span>
                )}
              </div>
            ))}
          </div>
          <p dir={dir} className={`mt-6 max-w-2xl text-sm text-paper/50 ${fa ? "font-fa" : "font-mono"}`}>
            {data.caption}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
