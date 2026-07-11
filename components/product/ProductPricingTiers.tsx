"use client";

import Link from "next/link";
import { motion } from "motion/react";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import type { ProductPhase3Sub } from "@/i18n/product-phase3";

type Props = {
  data: ProductPhase3Sub["pricing"];
  accentBorder?: string;
  accentText?: string;
};

export default function ProductPricingTiers({ data, accentBorder = "border-term/35", accentText = "text-term" }: Props) {
  const { fa, dir } = useT();

  return (
    <motion.section
      id="pricing"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="scroll-mt-24 border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AboutSectionHeader eyebrow={data.eyebrow} title={data.title} />

        <motion.div variants={itemReveal} className="grid gap-4 lg:grid-cols-3">
          {data.tiers.map((tier) => (
            <article
              key={tier.id}
              dir={dir}
              className={`flex flex-col border bg-paper/[0.015] p-5 sm:p-6 ${accentBorder} ${fa ? "font-fa" : ""}`}
            >
              <p className={`font-mono text-[10px] uppercase tracking-wider ${accentText}`}>{tier.title}</p>
              <p className="mt-2 font-mono text-lg text-paper/90" dir="ltr">
                {tier.timeline}
              </p>
              <p className="mt-2 text-sm text-paper/55">{tier.summary}</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-paper/65">
                {tier.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className={accentText} aria-hidden>
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href="/contactus/request"
                className={`mt-6 inline-flex border px-4 py-2 text-xs transition-colors hover:bg-paper/[0.04] ${accentBorder} ${accentText} ${fa ? "font-fa" : "font-mono uppercase"}`}
              >
                {tier.cta}
              </Link>
            </article>
          ))}
        </motion.div>

        <motion.div variants={itemReveal} className="mt-10 overflow-x-auto">
          <table className={`w-full min-w-[480px] border-collapse text-sm ${fa ? "font-fa" : ""}`} dir={dir}>
            <thead>
              <tr className="border-b border-paper/15">
                <th className="py-2 pe-4 text-start font-mono text-[10px] text-paper/40" />
                {data.tiers.map((t) => (
                  <th key={t.id} className="px-2 py-2 text-start text-paper/75">
                    {t.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.compareRows.map((row) => (
                <tr key={row.label} className="border-b border-paper/10">
                  <td className="py-2 pe-4 text-paper/65">{row.label}</td>
                  {row.values.map((val, i) => (
                    <td key={i} className="px-2 py-2 font-mono text-xs text-paper/55">
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
