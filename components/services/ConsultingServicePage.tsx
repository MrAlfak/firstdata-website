"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import InnerPage from "@/components/layout/InnerPage";
import FinalCta from "@/components/sales/FinalCta";
import { useT } from "@/i18n/LangProvider";
import { consultingPageDictionaries } from "@/i18n/consulting-page";

const sectionClass =
  "border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8";

const accent = {
  cta: "border-emerald/40 text-emerald hover:bg-emerald/10",
  card: "border-emerald/15 bg-emerald/[0.02]",
  cardStrong: "border-emerald/20 bg-gradient-to-br from-emerald/[0.04] to-transparent",
  timeline: "border-s border-emerald/25",
  dot: "border-emerald/50",
  arrow: "text-emerald/30",
  marker: "text-emerald/60",
  check: "text-emerald/80",
  support: "border-emerald/25 bg-gradient-to-br from-emerald/[0.06] via-paper/[0.02] to-transparent",
  supportEyebrow: "text-emerald/60",
  positive: "border-emerald/30 bg-emerald/[0.04]",
};

export default function ConsultingServicePage() {
  const { fa, dir, lang } = useT();
  const con = consultingPageDictionaries[lang];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: con.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const compareCols = fa
    ? [
        { key: "after", title: con.compare.afterTitle, items: con.compare.afterItems, positive: true },
        { key: "before", title: con.compare.beforeTitle, items: con.compare.beforeItems, positive: false },
      ]
    : [
        { key: "before", title: con.compare.beforeTitle, items: con.compare.beforeItems, positive: false },
        { key: "after", title: con.compare.afterTitle, items: con.compare.afterItems, positive: true },
      ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <InnerPage
        eyebrow={con.hero.eyebrow}
        title={con.hero.title}
        subtitle={con.hero.lead}
        lines={[con.hero.body]}
      >
        <Link
          href="/contactus/consultation"
          dir={dir}
          className={`group inline-flex items-center gap-2 border px-5 py-2.5 text-xs uppercase tracking-wider transition-colors duration-200 ${accent.cta} ${fa ? "font-fa" : ""}`}
        >
          {con.hero.cta}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            {fa ? "←" : "->"}
          </span>
        </Link>
      </InnerPage>

      {/* Audience */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={con.audience.eyebrow} title={con.audience.title} />
          <div className="grid gap-4 sm:grid-cols-2">
            {con.audience.cards.map((card) => (
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

      {/* Analyze */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={con.analyze.eyebrow} title={con.analyze.title} />
          <motion.ul
            variants={itemReveal}
            dir={dir}
            className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-4 ${fa ? "font-fa" : ""}`}
          >
            {con.analyze.items.map((item) => (
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

      {/* Deliverables */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={con.deliverables.eyebrow} title={con.deliverables.title} />
          <motion.ul
            variants={itemReveal}
            dir={dir}
            className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-3 ${fa ? "font-fa" : ""}`}
          >
            {con.deliverables.items.map((item) => (
              <li
                key={item}
                className={`border px-4 py-4 text-sm text-paper/75 ${accent.cardStrong}`}
              >
                <span className={`font-mono text-[10px] ${accent.marker}`}>▸</span>
                <span className="ms-2">{item}</span>
              </li>
            ))}
          </motion.ul>
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
          <AboutSectionHeader eyebrow={con.process.eyebrow} title={con.process.title} />
          <motion.ol
            variants={itemReveal}
            dir={dir}
            className={`relative mx-auto max-w-md ps-6 ${accent.timeline} ${fa ? "font-fa" : ""}`}
          >
            {con.process.steps.map((step, i) => (
              <li key={step} className="relative pb-8 last:pb-0">
                <span className={`absolute -start-[7px] top-1.5 h-3 w-3 rounded-full border bg-ink ${accent.dot}`} />
                <p className="text-sm text-paper/75">{step}</p>
                {i < con.process.steps.length - 1 && (
                  <p className={`mt-2 font-mono text-[10px] ${accent.arrow}`} aria-hidden>
                    ↓
                  </p>
                )}
              </li>
            ))}
          </motion.ol>
        </div>
      </motion.section>

      {/* Before / After */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={con.compare.eyebrow} title={con.compare.title} />
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

      {/* Engagement models */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={con.engagement.eyebrow} title={con.engagement.title} />
          <div className="grid gap-4 lg:grid-cols-3">
            {con.engagement.cards.map((card) => (
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
            className={`border p-6 sm:p-10 ${accent.support} ${fa ? "font-fa" : ""}`}
          >
            <p className={`text-[10px] ${accent.supportEyebrow}`}>{con.support.eyebrow}</p>
            <h2 className={`mt-3 text-lg text-paper sm:text-xl lg:text-2xl ${fa ? "font-fa" : "font-pixel"}`}>
              {con.support.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-paper/65 sm:text-base">{con.support.body}</p>
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
          <AboutSectionHeader eyebrow={con.faq.eyebrow} title={con.faq.title} />
          <motion.div variants={itemReveal} className="divide-y divide-paper/10">
            {con.faq.items.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={item.q} className="py-4 sm:py-5">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    dir={dir}
                    id={`consulting-faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`consulting-faq-a-${i}`}
                    className={`flex w-full items-start justify-between gap-4 text-sm text-paper/80 transition-colors hover:text-paper ${fa ? "font-fa text-right" : "text-left"}`}
                  >
                    <span>{item.q}</span>
                    <span className="mt-0.5 shrink-0 font-mono text-paper/30">
                      {isOpen ? "[-]" : "[+]"}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`consulting-faq-a-${i}`}
                        role="region"
                        aria-labelledby={`consulting-faq-q-${i}`}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p
                          dir={dir}
                          className={`mt-3 text-sm leading-relaxed text-paper/50 ${fa ? "font-fa" : ""}`}
                        >
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      <FinalCta />
    </>
  );
}
