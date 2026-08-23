"use client";

import Link from "next/link";
import { motion } from "motion/react";
import ProductHeroVisual from "@/components/product/ProductHeroVisual";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import { productPolishUi } from "@/i18n/product-polish";
import type { ProductSlug } from "@/i18n/product-page";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import { ModernIconButton } from "@/components/ui/modern-icon-button";

type Props = {
  slug: ProductSlug;
  title: string;
  subtitle: string;
  body: string;
  cta: string;
  ctaClassName: string;
  badges: string[];
  accentBorder?: string;
  accentText?: string;
};

export default function ProductSubHero({
  slug,
  title,
  subtitle,
  body,
  cta,
  ctaClassName,
  badges,
  accentBorder = "border-paper/35",
  accentText = "text-term",
}: Props) {
  const { fa, dir, lang } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const polish = productPolishUi[lang];
  const face = ai ? "font-iran" : fa ? "font-fa" : "";

  return (
    <motion.section
      variants={moduleReveal}
      initial="hidden"
      animate="show"
      className={`border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 ${ai ? "ai-section" : ""}`}
    >
      <div
        className={`mx-auto lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-10 xl:gap-x-14 ${
          ai ? "max-w-7xl" : "max-w-6xl"
        }`}
      >
        <div>
          <motion.h1
            variants={itemReveal}
            dir={dir}
            className={
              ai
                ? "ai-display max-w-xl text-paper"
                : `text-2xl leading-tight tracking-tight sm:text-3xl lg:text-4xl ${fa ? "font-fa" : "font-pixel"}`
            }
          >
            {title}
          </motion.h1>
          {badges.length > 0 ? (
            <motion.div variants={itemReveal} className="mt-4 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className={`px-2 py-0.5 text-[9px] tracking-wider ${
                    ai
                      ? `rounded-md border ${accentBorder} ${accentText} font-iran normal-case`
                      : `border font-mono uppercase ${accentBorder} ${accentText}`
                  }`}
                >
                  {badge}
                </span>
              ))}
            </motion.div>
          ) : null}
          <motion.p
            variants={itemReveal}
            dir={dir}
            className={`mt-5 max-w-xl leading-relaxed text-paper/60 ${
              ai ? "text-base sm:text-lg" : "text-sm sm:text-base text-paper/65"
            } ${face}`}
          >
            {subtitle}
          </motion.p>
          {body ? (
            <motion.div
              variants={itemReveal}
              dir={dir}
              className={
                ai
                  ? `mt-6 max-w-xl ${face}`
                  : `mt-6 max-w-xl border border-paper/10 bg-paper/[0.015] p-5 sm:p-6 ${fa ? "font-fa" : ""}`
              }
            >
              <p className={`leading-relaxed text-paper/55 ${ai ? "text-base" : "text-sm"}`}>
                {!ai ? <span className="me-2 font-mono text-term/60">▸</span> : null}
                {body}
              </p>
            </motion.div>
          ) : null}
          <motion.div variants={itemReveal} className="mt-8 flex flex-wrap gap-3">
            {ai ? (
              <ModernIconButton href="/contactus/request" className={face}>
                {cta}
              </ModernIconButton>
            ) : (
              <Link
                href="/contactus/request"
                dir={dir}
                className={`group inline-flex items-center gap-2 ${ctaClassName}`}
              >
                {cta}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  {fa ? "←" : "→"}
                </span>
              </Link>
            )}
            <Link
              href="/contactus/consultation"
              dir={dir}
              className={`inline-flex items-center gap-2 transition-colors ${
                ai
                  ? `rounded-xl border border-paper/20 px-5 py-3 text-sm font-medium text-paper/60 hover:border-paper/40 hover:text-paper ${face}`
                  : `border border-paper/25 px-5 py-2.5 text-xs uppercase tracking-wider text-paper/60 hover:border-paper/45 hover:text-paper ${
                      fa ? "font-fa" : "font-mono"
                    }`
              }`}
            >
              {polish.secondaryCta}
            </Link>
          </motion.div>
        </div>
        <motion.div variants={itemReveal} className="mt-10 lg:mt-0">
          <ProductHeroVisual slug={slug} animated />
        </motion.div>
      </div>
    </motion.section>
  );
}
