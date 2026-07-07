"use client";

import Link from "next/link";
import { motion } from "motion/react";
import TermIcon from "@/components/icons/TermIcon";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import InnerPage from "@/components/layout/InnerPage";
import FinalCta from "@/components/sales/FinalCta";
import { PRODUCT_CHILDREN } from "@/config/navigation";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import { productSubPageDictionaries } from "@/i18n/product-sub-page";
import type { ProductSlug } from "@/i18n/product-page";

const sectionClass = "border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8";

const accentMap: Record<ProductSlug, { border: string; text: string; bg: string; hover: string }> = {
  web: { border: "border-paper/35", text: "text-paper", bg: "hover:bg-paper/10", hover: "hover:border-paper/55" },
  mobile: { border: "border-term/40", text: "text-term", bg: "hover:bg-term/10", hover: "hover:border-term/55" },
  windows: { border: "border-sky/40", text: "text-sky", bg: "hover:bg-sky/10", hover: "hover:border-sky/55" },
  ai: { border: "border-violet/40", text: "text-violet", bg: "hover:bg-violet/10", hover: "hover:border-violet/55" },
  platforms: { border: "border-emerald/40", text: "text-emerald", bg: "hover:bg-emerald/10", hover: "hover:border-emerald/55" },
};

type Props = {
  slug: ProductSlug;
};

export default function ProductSubPage({ slug }: Props) {
  const { fa, dir, lang, t } = useT();
  const ui = productSubPageDictionaries[lang][slug];
  const accent = accentMap[slug];
  const others = PRODUCT_CHILDREN.filter((item) => item.slug !== slug);

  return (
    <>
      <InnerPage eyebrow={ui.hero.eyebrow} title={ui.hero.title} subtitle={ui.hero.lead} lines={[ui.hero.body]}>
        <Link
          href="/contactus/request"
          dir={dir}
          className={`group inline-flex items-center gap-2 border px-5 py-2.5 text-xs uppercase tracking-wider transition-colors duration-200 ${accent.border} ${accent.text} ${accent.bg} ${fa ? "font-fa" : ""}`}
        >
          {ui.pageCta}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">{fa ? "←" : "->"}</span>
        </Link>
      </InnerPage>

      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.useCases.eyebrow} title={ui.useCases.title} />
          <div className="grid gap-4 sm:grid-cols-2">
            {ui.useCases.cards.map((card) => (
              <motion.article
                key={card.title}
                variants={itemReveal}
                dir={dir}
                className={`border border-paper/15 bg-paper/[0.015] p-5 sm:p-6 ${fa ? "font-fa" : ""}`}
              >
                <h3 className={`text-base text-paper/90 ${fa ? "font-fa" : "font-pixel"}`}>{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/55">{card.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.features.eyebrow} title={ui.features.title} />
          <motion.ul variants={itemReveal} dir={dir} className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-3 ${fa ? "font-fa" : ""}`}>
            {ui.features.items.map((item) => (
              <li key={item} className="flex items-center gap-2 border border-paper/12 bg-paper/[0.015] px-4 py-3 text-sm text-paper/70">
                <span className={accent.text} aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.section>

      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.stack.eyebrow} title={ui.stack.title} />
          <motion.div variants={itemReveal} className="flex flex-wrap gap-2">
            {ui.stack.tags.map((tag) => (
              <span
                key={tag}
                className={`border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-paper/75 ${accent.border}`}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.process.eyebrow} title={ui.process.title} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ui.process.steps.map((step, index) => (
              <motion.article
                key={step.title}
                variants={itemReveal}
                dir={dir}
                className={`border border-paper/15 bg-paper/[0.015] p-5 sm:p-6 ${fa ? "font-fa" : ""}`}
              >
                <span className={`font-mono text-[10px] ${accent.text}`}>{String(index + 1).padStart(2, "0")}</span>
                <h3 className={`mt-3 text-base text-paper/90 ${fa ? "font-fa" : "font-pixel"}`}>{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/55">{step.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={itemReveal}
            dir={dir}
            className={`border bg-paper/[0.015] p-6 sm:p-8 ${accent.border} ${fa ? "font-fa" : ""}`}
          >
            <p className="text-[10px] txt-comment">{ui.relatedService.eyebrow}</p>
            <h2 className={`mt-3 flex items-center gap-3 text-xl text-paper sm:text-2xl ${fa ? "font-fa" : "font-pixel"}`}>
              <TermIcon name={slug} plain />
              {ui.relatedService.title}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-paper/65 sm:text-base">{ui.relatedService.body}</p>
            <Link
              href={ui.relatedService.href}
              dir={dir}
              className={`mt-6 inline-flex items-center gap-2 border px-5 py-3 text-sm transition-colors ${accent.border} ${accent.text} ${accent.bg} ${fa ? "font-fa" : ""}`}
            >
              {ui.relatedService.cta}
              <span aria-hidden>{fa ? "←" : "→"}</span>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ui.crossNav.eyebrow} title={ui.crossNav.title} />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((item) => (
              <motion.div key={item.slug} variants={itemReveal}>
                <Link
                  href={item.href}
                  dir={dir}
                  className={`group flex items-center justify-between border border-paper/15 bg-paper/[0.015] px-4 py-3 text-sm transition-colors ${accent.hover} hover:bg-paper/[0.03] ${fa ? "font-fa" : ""}`}
                >
                  <span className="flex items-center gap-2 text-paper/75 group-hover:text-paper">
                    <TermIcon name={item.slug} plain className="group-hover:text-current" />
                    {t(item.labelKey)}
                  </span>
                  <span className={`font-mono text-[10px] text-paper/35 ${accent.text}`}>
                    {ui.crossNav.linkLabel} {fa ? "←" : "→"}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <FinalCta />
    </>
  );
}
