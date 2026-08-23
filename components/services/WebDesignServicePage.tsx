"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import FaqAccordionList from "@/components/faq/FaqAccordionList";
import InnerPage from "@/components/layout/InnerPage";
import FinalCta from "@/components/sales/FinalCta";
import { useT } from "@/i18n/LangProvider";
import { webDesignPageDictionaries } from "@/i18n/web-design-page";

const sectionClass =
  "border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8";

export default function WebDesignServicePage() {
  const { fa, dir, lang } = useT();
  const wd = webDesignPageDictionaries[lang];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: wd.faq.items.map((item) => ({
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
        eyebrow={wd.hero.eyebrow}
        title={wd.hero.title}
        subtitle={wd.hero.lead}
        lines={[wd.hero.body]}
      >
        <Link
          href="/contactus/request"
          dir={dir}
          className={`group inline-flex items-center gap-2 border border-paper px-5 py-2.5 text-xs uppercase tracking-wider transition-colors duration-200 hover:bg-paper hover:text-ink ${fa ? "font-fa" : ""}`}
        >
          {wd.hero.cta}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            {fa ? "←" : "->"}
          </span>
        </Link>
      </InnerPage>

      {/* Section 2 — project types */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={wd.types.eyebrow} title={wd.types.title} />
          <div className="grid gap-4 sm:grid-cols-2">
            {wd.types.cards.map((card) => (
              <motion.article
                key={card.title}
                variants={itemReveal}
                dir={dir}
                className={`border border-paper/15 bg-paper/[0.02] p-5 sm:p-6 ${fa ? "font-fa" : ""}`}
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

      {/* Section 3 — compare */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={wd.compare.eyebrow} title={wd.compare.title} />
          <div className="grid gap-4 lg:grid-cols-2">
            {(fa
              ? [
                  {
                    key: "custom",
                    title: wd.compare.customTitle,
                    items: wd.compare.customItems,
                    positive: true,
                  },
                  {
                    key: "template",
                    title: wd.compare.templateTitle,
                    items: wd.compare.templateItems,
                    positive: false,
                  },
                ]
              : [
                  {
                    key: "template",
                    title: wd.compare.templateTitle,
                    items: wd.compare.templateItems,
                    positive: false,
                  },
                  {
                    key: "custom",
                    title: wd.compare.customTitle,
                    items: wd.compare.customItems,
                    positive: true,
                  },
                ]
            ).map((col) => (
              <motion.div
                key={col.key}
                variants={itemReveal}
                dir={dir}
                className={`border p-5 sm:p-6 ${fa ? "font-fa" : ""} ${
                  col.positive
                    ? "border-term/25 bg-term/[0.04]"
                    : "border-red-500/20 bg-red-500/[0.03]"
                }`}
              >
                <h3 className="text-sm text-paper/80">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-paper/70">
                      <span
                        className={`shrink-0 ${col.positive ? "text-term/90" : "text-red-400/80"}`}
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

      {/* Section 4 — features grid */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={wd.features.eyebrow} title={wd.features.title} />
          <motion.ul
            variants={itemReveal}
            dir={dir}
            className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-3 ${fa ? "font-fa" : ""}`}
          >
            {wd.features.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 border border-paper/10 bg-paper/[0.015] px-4 py-3 text-sm text-paper/75"
              >
                <span className="text-term/80" aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.section>

      {/* Section 5 — timeline */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={wd.process.eyebrow} title={wd.process.title} />
          <motion.ol
            variants={itemReveal}
            dir={dir}
            className={`relative mx-auto max-w-md border-s border-paper/15 ps-6 ${fa ? "font-fa" : ""}`}
          >
            {wd.process.steps.map((step, i) => (
              <li key={step} className="relative pb-8 last:pb-0">
                <span className="absolute -start-[7px] top-1.5 h-3 w-3 rounded-full border border-term/50 bg-ink" />
                {i < wd.process.steps.length - 1 && (
                  <span className="absolute start-0 top-4 h-[calc(100%-8px)] w-px bg-paper/10" aria-hidden />
                )}
                <p className="text-sm text-paper/75">{step}</p>
                {i < wd.process.steps.length - 1 && (
                  <p className="mt-2 font-mono text-[10px] text-paper/25" aria-hidden>
                    ↓
                  </p>
                )}
              </li>
            ))}
          </motion.ol>
        </div>
      </motion.section>

      {/* Section 6 — tech stack */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={wd.tech.eyebrow} title={wd.tech.title} />
          <motion.div
            variants={itemReveal}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
          >
            {wd.tech.items.map((name) => (
              <div
                key={name}
                className="flex h-20 flex-col items-center justify-center border border-paper/15 bg-paper/[0.02] px-3 text-center transition-colors hover:border-paper/30"
                title={name}
              >
                <span className="font-mono text-[10px] uppercase tracking-wider text-term/70">
                  {name.slice(0, 2)}
                </span>
                <span className={`mt-1 text-xs text-paper/70 ${fa ? "font-fa" : ""}`}>{name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Section 7 — post-launch support */}
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
            className={`border border-accent/25 bg-gradient-to-br from-accent/[0.05] via-paper/[0.02] to-transparent p-6 sm:p-10 ${fa ? "font-fa" : ""}`}
          >
            <p className="text-[10px] text-accent/60">{wd.support.eyebrow}</p>
            <h2 className={`mt-3 text-lg text-paper sm:text-xl lg:text-2xl ${fa ? "font-fa" : "font-pixel"}`}>
              {wd.support.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-paper/65 sm:text-base">{wd.support.body}</p>
          </motion.blockquote>
        </div>
      </motion.section>

      {/* Section 8 — FAQ */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={wd.faq.eyebrow} title={wd.faq.title} />
          <motion.div variants={itemReveal}>
            <FaqAccordionList items={wd.faq.items} idPrefix="web-faq" defaultOpenIndex={0} />
          </motion.div>
        </div>
      </motion.section>

      <FinalCta />
    </>
  );
}
