"use client";

import { motion } from "motion/react";
import { PRODUCT_INDUSTRY_STRIP } from "@/config/product-case-studies";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";

type Props = {
  eyebrow: string;
  title: string;
};

export default function ProductLogoStrip({ eyebrow, title }: Props) {
  const { fa, dir, lang } = useT();
  const items = PRODUCT_INDUSTRY_STRIP[lang];

  return (
    <motion.section
      id="social-proof"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="scroll-mt-24 border-b border-paper/20 px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div variants={itemReveal} dir={dir}>
          <p className={`font-mono text-[10px] uppercase tracking-wider text-paper/35 ${fa ? "font-fa" : ""}`}>
            {eyebrow}
          </p>
          <h2 className={`mt-2 text-lg text-paper ${fa ? "font-fa" : "font-pixel"}`}>{title}</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {items.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2 border border-paper/15 bg-paper/[0.02] px-3 py-2"
              >
                <span className="flex h-8 w-8 items-center justify-center border border-term/30 bg-term/[0.06] font-mono text-[10px] text-term">
                  {item.initials}
                </span>
                <span className={`text-xs text-paper/65 ${fa ? "font-fa" : ""}`}>{item.label}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.section>
  );
}
