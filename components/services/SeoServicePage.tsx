"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import FaqAccordionList from "@/components/faq/FaqAccordionList";
import InnerPage from "@/components/layout/InnerPage";
import FinalCta from "@/components/sales/FinalCta";
import { useT } from "@/i18n/LangProvider";
import { seoPageDictionaries } from "@/i18n/seo-page";

const sectionClass =
  "border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8";

export default function SeoServicePage() {
  const { fa, dir, lang } = useT();
  const sd = seoPageDictionaries[lang];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sd.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <InnerPage
        eyebrow={sd.hero.eyebrow}
        title={sd.hero.title}
        subtitle={sd.hero.lead}
        lines={[sd.hero.body]}
      >
        <Link
          href="/contactus/request"
          dir={dir}
          className={`group inline-flex items-center gap-2 border border-violet/40 px-5 py-2.5 text-xs uppercase tracking-wider text-violet transition-colors duration-200 hover:bg-violet/10 ${fa ? "font-fa" : ""}`}
        >
          {sd.hero.cta}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            {fa ? "←" : "->"}
          </span>
        </Link>
      </InnerPage>

      {/* Service pillars */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={sd.pillars.eyebrow} title={sd.pillars.title} />
          <div className="grid gap-4 sm:grid-cols-2">
            {sd.pillars.cards.map((card) => (
              <motion.article
                key={card.title}
                variants={itemReveal}
                dir={dir}
                className={`border border-violet/15 bg-violet/[0.02] p-5 sm:p-6 ${fa ? "font-fa" : ""}`}
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

      {/* Audit deliverables */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={sd.deliverables.eyebrow} title={sd.deliverables.title} />
          <motion.ul
            variants={itemReveal}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {sd.deliverables.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 border border-violet/20 bg-violet/[0.03] px-4 py-4"
              >
                <span className="font-mono text-xs text-violet/70" aria-hidden>
                  ✓
                </span>
                <span className={`text-sm text-paper/80 ${fa ? "font-fa" : ""}`}>{item}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.section>

      {/* Tools */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={sd.tools.eyebrow} title={sd.tools.title} />
          <motion.div
            variants={itemReveal}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3"
          >
            {sd.tools.items.map((name) => (
              <div
                key={name}
                className="flex h-20 flex-col items-center justify-center border border-violet/15 bg-violet/[0.02] px-3 text-center"
                title={name}
              >
                <span className="font-mono text-[10px] uppercase tracking-wider text-violet/70">
                  {name.slice(0, 2)}
                </span>
                <span className={`mt-1 text-xs text-paper/70 ${fa ? "font-fa" : ""}`}>{name}</span>
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
          <AboutSectionHeader eyebrow={sd.process.eyebrow} title={sd.process.title} />
          <motion.ol
            variants={itemReveal}
            dir={dir}
            className={`relative mx-auto max-w-md border-s border-violet/25 ps-6 ${fa ? "font-fa" : ""}`}
          >
            {sd.process.steps.map((step, i) => (
              <li key={step} className="relative pb-8 last:pb-0">
                <span className="absolute -start-[7px] top-1.5 h-3 w-3 rounded-full border border-violet/50 bg-ink" />
                <p className="text-sm text-paper/75">{step}</p>
                {i < sd.process.steps.length - 1 && (
                  <p className="mt-2 font-mono text-[10px] text-violet/30" aria-hidden>
                    ↓
                  </p>
                )}
              </li>
            ))}
          </motion.ol>
        </div>
      </motion.section>

      {/* Results */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={sd.results.eyebrow} title={sd.results.title} />
          <motion.div variants={itemReveal} dir={dir} className={fa ? "font-fa" : ""}>
            <p className="text-sm leading-relaxed text-paper/60 sm:text-base">{sd.results.body}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {sd.results.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 border border-paper/10 bg-paper/[0.015] px-4 py-3 text-sm text-paper/75"
                >
                  <span className="text-violet/80" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
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
            className={`border border-violet/25 bg-gradient-to-br from-violet/[0.06] via-paper/[0.02] to-transparent p-6 sm:p-10 ${fa ? "font-fa" : ""}`}
          >
            <p className="text-[10px] text-violet/60">{sd.support.eyebrow}</p>
            <h2 className={`mt-3 text-lg text-paper sm:text-xl lg:text-2xl ${fa ? "font-fa" : "font-pixel"}`}>
              {sd.support.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-paper/65 sm:text-base">{sd.support.body}</p>
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
          <AboutSectionHeader eyebrow={sd.faq.eyebrow} title={sd.faq.title} />
          <motion.div variants={itemReveal}>
            <FaqAccordionList items={sd.faq.items} idPrefix="seo-faq" defaultOpenIndex={0} />
          </motion.div>
        </div>
      </motion.section>

      <FinalCta />
    </>
  );
}
