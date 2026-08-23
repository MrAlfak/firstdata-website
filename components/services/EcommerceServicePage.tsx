"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import FaqAccordionList from "@/components/faq/FaqAccordionList";
import InnerPage from "@/components/layout/InnerPage";
import FinalCta from "@/components/sales/FinalCta";
import { useT } from "@/i18n/LangProvider";
import { ecommercePageDictionaries } from "@/i18n/ecommerce-page";

const sectionClass =
  "border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8";

export default function EcommerceServicePage() {
  const { fa, dir, lang } = useT();
  const ec = ecommercePageDictionaries[lang];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ec.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const compareCols = fa
    ? [
        { key: "custom", title: ec.compare.customTitle, items: ec.compare.customItems, positive: true },
        { key: "template", title: ec.compare.templateTitle, items: ec.compare.templateItems, positive: false },
      ]
    : [
        { key: "template", title: ec.compare.templateTitle, items: ec.compare.templateItems, positive: false },
        { key: "custom", title: ec.compare.customTitle, items: ec.compare.customItems, positive: true },
      ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <InnerPage
        eyebrow={ec.hero.eyebrow}
        title={ec.hero.title}
        subtitle={ec.hero.lead}
        lines={[ec.hero.body]}
      >
        <Link
          href="/contactus/request"
          dir={dir}
          className={`group inline-flex items-center gap-2 border border-accent/50 px-5 py-2.5 text-xs uppercase tracking-wider text-accent transition-colors duration-200 hover:bg-accent/10 ${fa ? "font-fa" : ""}`}
        >
          {ec.hero.cta}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            {fa ? "←" : "->"}
          </span>
        </Link>
      </InnerPage>

      {/* Store types */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ec.types.eyebrow} title={ec.types.title} />
          <div className="grid gap-4 sm:grid-cols-2">
            {ec.types.cards.map((card) => (
              <motion.article
                key={card.title}
                variants={itemReveal}
                dir={dir}
                className={`border border-accent/15 bg-accent/[0.02] p-5 sm:p-6 ${fa ? "font-fa" : ""}`}
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

      {/* Compare */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ec.compare.eyebrow} title={ec.compare.title} />
          <div className="grid gap-4 lg:grid-cols-2">
            {compareCols.map((col) => (
              <motion.div
                key={col.key}
                variants={itemReveal}
                dir={dir}
                className={`border p-5 sm:p-6 ${fa ? "font-fa" : ""} ${
                  col.positive
                    ? "border-accent/30 bg-accent/[0.04]"
                    : "border-red-500/20 bg-red-500/[0.03]"
                }`}
              >
                <h3 className="text-sm text-paper/80">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-paper/70">
                      <span
                        className={`shrink-0 ${col.positive ? "text-accent/90" : "text-red-400/80"}`}
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

      {/* Features */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ec.features.eyebrow} title={ec.features.title} />
          <motion.ul
            variants={itemReveal}
            dir={dir}
            className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-3 ${fa ? "font-fa" : ""}`}
          >
            {ec.features.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 border border-paper/10 bg-paper/[0.015] px-4 py-3 text-sm text-paper/75"
              >
                <span className="text-accent/80" aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.section>

      {/* Integrations */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ec.integrations.eyebrow} title={ec.integrations.title} />
          <motion.div
            variants={itemReveal}
            dir={dir}
            className={`flex flex-wrap gap-2 ${fa ? "font-fa" : ""}`}
          >
            {ec.integrations.items.map((item) => (
              <span
                key={item}
                className="border border-paper/15 bg-paper/[0.02] px-3 py-2 text-xs text-paper/65"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Admin panel */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ec.admin.eyebrow} title={ec.admin.title} />
          <motion.div
            variants={itemReveal}
            dir={dir}
            className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-3 ${fa ? "font-fa" : ""}`}
          >
            {ec.admin.items.map((item) => (
              <div
                key={item}
                className="border border-accent/20 bg-gradient-to-br from-accent/[0.04] to-transparent px-4 py-4 text-sm text-paper/75"
              >
                <span className="font-mono text-[10px] text-accent/60">▸</span>
                <span className="ms-2">{item}</span>
              </div>
            ))}
          </motion.div>
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
          <AboutSectionHeader eyebrow={ec.process.eyebrow} title={ec.process.title} />
          <motion.ol
            variants={itemReveal}
            dir={dir}
            className={`relative mx-auto max-w-md border-s border-accent/25 ps-6 ${fa ? "font-fa" : ""}`}
          >
            {ec.process.steps.map((step, i) => (
              <li key={step} className="relative pb-8 last:pb-0">
                <span className="absolute -start-[7px] top-1.5 h-3 w-3 rounded-full border border-accent/50 bg-ink" />
                <p className="text-sm text-paper/75">{step}</p>
                {i < ec.process.steps.length - 1 && (
                  <p className="mt-2 font-mono text-[10px] text-accent/30" aria-hidden>
                    ↓
                  </p>
                )}
              </li>
            ))}
          </motion.ol>
        </div>
      </motion.section>

      {/* Support */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <motion.blockquote
            variants={itemReveal}
            dir={dir}
            className={`border border-accent/25 bg-gradient-to-br from-accent/[0.06] via-paper/[0.02] to-transparent p-6 sm:p-10 ${fa ? "font-fa" : ""}`}
          >
            <p className="text-[10px] text-accent/60">{ec.support.eyebrow}</p>
            <h2 className={`mt-3 text-lg text-paper sm:text-xl lg:text-2xl ${fa ? "font-fa" : "font-pixel"}`}>
              {ec.support.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-paper/65 sm:text-base">{ec.support.body}</p>
          </motion.blockquote>
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
          <AboutSectionHeader eyebrow={ec.faq.eyebrow} title={ec.faq.title} />
          <motion.div variants={itemReveal}>
            <FaqAccordionList items={ec.faq.items} idPrefix="shop-faq" defaultOpenIndex={0} />
          </motion.div>
        </div>
      </motion.section>

      <FinalCta />
    </>
  );
}
