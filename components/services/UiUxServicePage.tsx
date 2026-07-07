"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import InnerPage from "@/components/layout/InnerPage";
import FinalCta from "@/components/sales/FinalCta";
import { useT } from "@/i18n/LangProvider";
import { uiUxPageDictionaries } from "@/i18n/ui-ux-page";

const sectionClass =
  "border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8";

export default function UiUxServicePage() {
  const { fa, dir, lang } = useT();
  const ux = uiUxPageDictionaries[lang];

  return (
    <>
      <InnerPage
        eyebrow={ux.hero.eyebrow}
        title={ux.hero.title}
        subtitle={ux.hero.lead}
        lines={[ux.hero.body]}
      >
        <Link
          href="/contactus/consultation"
          dir={dir}
          className={`group inline-flex items-center gap-2 border border-amber/40 px-5 py-2.5 text-xs uppercase tracking-wider text-amber/90 transition-colors duration-200 hover:bg-amber/10 hover:text-amber ${fa ? "font-fa" : ""}`}
        >
          {ux.hero.cta}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            {fa ? "←" : "->"}
          </span>
        </Link>
      </InnerPage>

      {/* Section 2 — UI vs UX */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ux.diff.eyebrow} title={ux.diff.title} />
          <div className="grid gap-4 lg:grid-cols-2">
            <motion.article
              variants={itemReveal}
              dir={dir}
              className={`border border-paper/20 bg-gradient-to-br from-paper/[0.04] to-transparent p-5 sm:p-7 ${fa ? "font-fa" : ""}`}
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-paper/35">UI</p>
              <h3 className="mt-2 text-lg text-paper">{ux.diff.ui.title}</h3>
              <ul className="mt-4 space-y-2">
                {ux.diff.ui.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-paper/65">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-paper/40" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
            <motion.article
              variants={itemReveal}
              dir={dir}
              className={`border border-amber/25 bg-gradient-to-br from-amber/[0.06] to-transparent p-5 sm:p-7 ${fa ? "font-fa" : ""}`}
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-amber/60">UX</p>
              <h3 className="mt-2 text-lg text-paper">{ux.diff.ux.title}</h3>
              <ul className="mt-4 space-y-2">
                {ux.diff.ux.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-paper/70">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-amber/70" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          </div>
        </div>
      </motion.section>

      {/* Section 3 — product types (4 columns) */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ux.products.eyebrow} title={ux.products.title} />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {ux.products.cards.map((card) => (
              <motion.div
                key={card.title}
                variants={itemReveal}
                dir={dir}
                className={`flex flex-col items-center border border-paper/12 bg-paper/[0.02] px-4 py-6 text-center ${fa ? "font-fa" : ""}`}
              >
                <span className="text-2xl" aria-hidden>
                  {card.icon}
                </span>
                <p className="mt-3 text-sm text-paper/75">{card.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section 4 — design process timeline */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ux.process.eyebrow} title={ux.process.title} />
          <motion.ol
            variants={itemReveal}
            dir={dir}
            className={`relative mx-auto max-w-lg border-s border-amber/20 ps-6 ${fa ? "font-fa" : ""}`}
          >
            {ux.process.steps.map((step, i) => (
              <li key={step} className="relative pb-7 last:pb-0">
                <span className="absolute -start-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-amber/60 bg-ink" />
                <p className="text-sm text-paper/75">{step}</p>
                {i < ux.process.steps.length - 1 && (
                  <p className="mt-2 font-mono text-[10px] text-amber/30" aria-hidden>
                    ↓
                  </p>
                )}
              </li>
            ))}
          </motion.ol>
        </div>
      </motion.section>

      {/* Section 5 — principles */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ux.principles.eyebrow} title={ux.principles.title} />
          <motion.div
            variants={itemReveal}
            dir={dir}
            className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-4 ${fa ? "font-fa" : ""}`}
          >
            {ux.principles.items.map((item) => (
              <div
                key={item}
                className="border border-paper/10 bg-paper/[0.015] px-4 py-4 text-sm text-paper/75"
              >
                <span className="text-amber/80" aria-hidden>
                  ✓
                </span>
                <span className="ms-2">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Section 6 — deliverables */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader eyebrow={ux.deliverables.eyebrow} title={ux.deliverables.title} />
          <motion.ul
            variants={itemReveal}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {ux.deliverables.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 border border-amber/20 bg-amber/[0.03] px-4 py-4"
              >
                <span className="font-mono text-xs text-amber/70" aria-hidden>
                  ✓
                </span>
                <span className={`text-sm text-paper/80 ${fa ? "font-fa" : ""}`}>{item}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.section>

      {/* Section 7 — why before development */}
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
            className={`border border-paper/15 bg-paper/[0.02] p-6 sm:p-10 ${fa ? "font-fa" : ""}`}
          >
            <p className="text-[10px] text-paper/40">{ux.whyBefore.eyebrow}</p>
            <h2 className={`mt-3 text-lg text-paper sm:text-xl ${fa ? "font-fa" : "font-pixel"}`}>
              {ux.whyBefore.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-paper/60 sm:text-base">
              {ux.whyBefore.body}
            </p>
          </motion.blockquote>
        </div>
      </motion.section>

      {/* Section 8 — design showcase */}
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={sectionClass}
      >
        <div className="mx-auto max-w-6xl">
          <AboutSectionHeader
            eyebrow={ux.showcase.eyebrow}
            title={ux.showcase.title}
            subtitle={ux.showcase.subtitle}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {ux.showcase.items.map((item) => (
              <motion.article
                key={item.title}
                variants={itemReveal}
                dir={dir}
                className={`group border border-paper/12 bg-paper/[0.015] p-5 transition-colors hover:border-amber/25 sm:p-6 ${fa ? "font-fa" : ""}`}
              >
                <p className="font-mono text-[9px] uppercase tracking-wider text-amber/55">UI/UX</p>
                <h3 className="mt-2 text-base text-paper group-hover:text-amber/90">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/55">{item.desc}</p>
                <p className="mt-3 font-mono text-[10px] text-paper/35">{item.scope}</p>
              </motion.article>
            ))}
          </div>
          <motion.div variants={itemReveal} className="mt-8">
            <Link
              href="/portfolio"
              dir={dir}
              className={`text-xs text-paper/45 underline underline-offset-4 transition-colors hover:text-paper ${fa ? "font-fa" : ""}`}
            >
              {ux.showcase.viewAll} →
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <FinalCta />
    </>
  );
}
