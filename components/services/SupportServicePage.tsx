"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import FaqAccordionList from "@/components/faq/FaqAccordionList";
import InnerPage from "@/components/layout/InnerPage";
import FinalCta from "@/components/sales/FinalCta";
import { useT } from "@/i18n/LangProvider";
import { supportPageDictionaries } from "@/i18n/support-page";

const sectionClass =
  "border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8";

const accent = {
  cta: "border-rose/40 text-rose hover:bg-rose/10",
  card: "border-rose/15 bg-rose/[0.02]",
  cardStrong: "border-rose/20 bg-gradient-to-br from-rose/[0.04] to-transparent",
  timeline: "border-s border-rose/25",
  dot: "border-rose/50",
  arrow: "text-rose/30",
  marker: "text-rose/60",
  check: "text-rose/80",
  support: "border-rose/25 bg-gradient-to-br from-rose/[0.06] via-paper/[0.02] to-transparent",
  positive: "border-rose/30 bg-rose/[0.04]",
};

export default function SupportServicePage() {
  const { fa, dir, lang } = useT();
  const sup = supportPageDictionaries[lang];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sup.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const compareCols = fa
    ? [
        { key: "with", title: sup.compare.withTitle, items: sup.compare.withItems, positive: true },
        { key: "without", title: sup.compare.withoutTitle, items: sup.compare.withoutItems, positive: false },
      ]
    : [
        { key: "without", title: sup.compare.withoutTitle, items: sup.compare.withoutItems, positive: false },
        { key: "with", title: sup.compare.withTitle, items: sup.compare.withItems, positive: true },
      ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <InnerPage
        eyebrow={sup.hero.eyebrow}
        title={sup.hero.title}
        subtitle={sup.hero.lead}
        lines={[sup.hero.body]}
      >
        <Link
          href="/contactus/request"
          dir={dir}
          className={`group inline-flex items-center gap-2 border px-5 py-2.5 text-xs uppercase tracking-wider transition-colors duration-200 ${accent.cta} ${fa ? "font-fa" : ""}`}
        >
          {sup.hero.cta}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            {fa ? "←" : "->"}
          </span>
        </Link>
      </InnerPage>

      {/* Who */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={sup.who.eyebrow} title={sup.who.title} />
          <div className="grid gap-4 sm:grid-cols-2">
            {sup.who.cards.map((card) => (
              <motion.article
                key={card.title}
                variants={itemReveal}
                dir={dir}
                className={`border p-5 sm:p-6 ${accent.card} ${fa ? "font-fa" : ""}`}
              >
                <p className="text-2xl" aria-hidden>
                  {card.icon}
                </p>
                <h3 className="mt-3 text-base text-paper sm:text-lg">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/60">{card.line1}</p>
                <p className="mt-1 text-sm leading-relaxed text-paper/45">{card.line2}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Scope */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={sup.scope.eyebrow} title={sup.scope.title} />
          <motion.ul
            variants={itemReveal}
            dir={dir}
            className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-4 ${fa ? "font-fa" : ""}`}
          >
            {sup.scope.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 border border-paper/10 bg-paper/[0.015] px-4 py-3 text-sm text-paper/75"
              >
                <span className={accent.check} aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.section>

      {/* Tiers */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={sup.tiers.eyebrow} title={sup.tiers.title} />
          <div className="grid gap-4 lg:grid-cols-3">
            {sup.tiers.cards.map((card) => (
              <motion.article
                key={card.title}
                variants={itemReveal}
                dir={dir}
                className={`border p-5 sm:p-6 ${accent.cardStrong} ${fa ? "font-fa" : ""}`}
              >
                <h3 className="text-base text-rose/90 sm:text-lg">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/65">{card.line1}</p>
                <p className="mt-2 text-sm leading-relaxed text-paper/55">{card.line2}</p>
                <p className="mt-2 text-sm leading-relaxed text-paper/45">{card.line3}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Process */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={sup.process.eyebrow} title={sup.process.title} />
          <motion.ol
            variants={itemReveal}
            dir={dir}
            className={`relative mx-auto max-w-md ps-6 ${accent.timeline} ${fa ? "font-fa" : ""}`}
          >
            {sup.process.steps.map((step, i) => (
              <li key={step} className="relative pb-8 last:pb-0">
                <span className={`absolute -start-[7px] top-1.5 h-3 w-3 rounded-full border bg-ink ${accent.dot}`} />
                <p className="text-sm text-paper/75">{step}</p>
                {i < sup.process.steps.length - 1 && (
                  <p className={`mt-2 font-mono text-[10px] ${accent.arrow}`} aria-hidden>
                    ↓
                  </p>
                )}
              </li>
            ))}
          </motion.ol>
        </div>
      </motion.section>

      {/* Without vs With */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={sup.compare.eyebrow} title={sup.compare.title} />
          <div className="grid gap-4 lg:grid-cols-2">
            {compareCols.map((col) => (
              <motion.div
                key={col.key}
                variants={itemReveal}
                dir={dir}
                className={`border p-5 sm:p-6 ${fa ? "font-fa" : ""} ${
                  col.positive
                    ? accent.positive
                    : "border-red-500/20 bg-red-500/[0.03]"
                }`}
              >
                <h3 className="text-sm text-paper/80">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-paper/70">
                      <span
                        className={`shrink-0 ${col.positive ? accent.check : "text-red-400/80"}`}
                        aria-hidden
                      >
                        {col.positive ? "✓" : "✕"}
                      </span>
                      <span className={col.positive ? "" : "text-paper/55"}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stack */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={sup.stack.eyebrow} title={sup.stack.title} />
          <motion.div
            variants={itemReveal}
            className="flex flex-wrap gap-2"
          >
            {sup.stack.items.map((name) => (
              <span
                key={name}
                className={`border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-paper/70 ${accent.card} ${fa ? "font-fa" : ""}`}
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={sup.faq.eyebrow} title={sup.faq.title} />
          <motion.div variants={itemReveal}>
            <FaqAccordionList items={sup.faq.items} idPrefix="support-faq" defaultOpenIndex={0} />
          </motion.div>
        </div>
      </motion.section>

      <FinalCta />
    </>
  );
}
