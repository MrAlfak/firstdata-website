"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import ProductBootSequence from "@/components/product/ProductBootSequence";
import ProductHeroVisual from "@/components/product/ProductHeroVisual";
import StableScramble from "@/motion/StableScramble";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import type { ProductSlug } from "@/i18n/product-page";

type Props = {
  slug: ProductSlug;
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
  cta: string;
  ctaClassName: string;
  bootLines: string[];
  badges: string[];
  accentBorder?: string;
  accentText?: string;
};

export default function ProductSubHero({
  slug,
  eyebrow,
  title,
  subtitle,
  body,
  cta,
  ctaClassName,
  bootLines,
  badges,
  accentBorder = "border-paper/35",
  accentText = "text-term",
}: Props) {
  const { fa, dir } = useT();
  const [bootDone, setBootDone] = useState(false);

  return (
    <motion.section
      variants={moduleReveal}
      initial="hidden"
      animate="show"
      className="border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {!bootDone ? (
          <ProductBootSequence lines={bootLines} className="mb-8" onComplete={() => setBootDone(true)} />
        ) : null}

        <div className={`lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-10 xl:gap-x-14 ${bootDone ? "" : "opacity-40"}`}>
          <div>
            <motion.p variants={itemReveal} dir={dir} className={`mb-4 text-[10px] txt-comment ${fa ? "font-fa" : "ascii"}`}>
              {eyebrow}
            </motion.p>
            <motion.h1
              variants={itemReveal}
              dir={dir}
              className={`text-2xl leading-tight tracking-tight sm:text-3xl lg:text-4xl ${fa ? "font-fa" : "font-pixel"}`}
              aria-label={title}
            >
              <StableScramble text={title} start={bootDone} duration={800} />
            </motion.h1>
            <motion.div variants={itemReveal} className="mt-4 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className={`border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${accentBorder} ${accentText}`}
                >
                  {badge}
                </span>
              ))}
            </motion.div>
            <motion.p
              variants={itemReveal}
              dir={dir}
              className={`mt-4 text-sm leading-relaxed text-paper/60 sm:text-base ${fa ? "font-fa" : ""}`}
            >
              {subtitle}
            </motion.p>
            <motion.div
              variants={itemReveal}
              dir={dir}
              className={`mt-6 border border-paper/10 bg-paper/[0.015] p-5 sm:p-6 ${fa ? "font-fa" : ""}`}
            >
              <p className="text-sm leading-relaxed text-paper/55">
                <span className="me-2 font-mono text-term/60">▸</span>
                {body}
              </p>
            </motion.div>
            <motion.div variants={itemReveal} className="mt-8">
              <Link href="/contactus/request" dir={dir} className={`group inline-flex items-center gap-2 ${ctaClassName}`}>
                {cta}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">{fa ? "←" : "->"}</span>
              </Link>
            </motion.div>
          </div>
          <motion.div variants={itemReveal} className="mt-10 lg:mt-0">
            <ProductHeroVisual slug={slug} animated />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
