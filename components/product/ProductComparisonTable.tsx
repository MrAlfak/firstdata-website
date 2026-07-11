"use client";

import { motion } from "motion/react";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import type { ProductPhase2Sub } from "@/i18n/product-phase2";

type Props = {
  data: ProductPhase2Sub["comparison"];
};

export default function ProductComparisonTable({ data }: Props) {
  const { fa, dir } = useT();

  return (
    <motion.section
      id="compare"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="scroll-mt-24 border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AboutSectionHeader eyebrow={data.eyebrow} title={data.title} />
        <motion.div variants={itemReveal} className="overflow-x-auto">
          <table className={`w-full min-w-[520px] border-collapse text-sm ${fa ? "font-fa" : ""}`} dir={dir}>
            <thead>
              <tr className="border-b border-paper/15">
                <th className="py-3 pe-4 text-start font-mono text-[10px] uppercase tracking-wider text-paper/40" />
                {data.columns.map((col) => (
                  <th key={col.id} className="px-3 py-3 text-start">
                    <span className={`block text-paper/90 ${fa ? "font-fa" : "font-pixel"}`}>{col.title}</span>
                    <span className="mt-1 block text-[10px] font-normal text-paper/45">{col.subtitle}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row) => (
                <tr key={row.label} className="border-b border-paper/10">
                  <td className="py-3 pe-4 text-paper/70">{row.label}</td>
                  {row.values.map((val, i) => (
                    <td key={i} className="px-3 py-3 font-mono text-xs text-paper/60">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
        <p dir={dir} className={`mt-6 text-[11px] text-paper/40 ${fa ? "font-fa" : "font-mono"}`}>
          {data.note}
        </p>
      </div>
    </motion.section>
  );
}
