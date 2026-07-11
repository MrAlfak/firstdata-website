"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import InnerPage from "@/components/layout/InnerPage";
import ProductBootSequence from "@/components/product/ProductBootSequence";
import ProductChangelogTeaser from "@/components/product/ProductChangelogTeaser";
import ProductExplorer from "@/components/product/ProductExplorer";
import ProductFaq from "@/components/product/ProductFaq";
import ProductMatcher from "@/components/product/ProductMatcher";
import ProductStatsStrip from "@/components/product/ProductStatsStrip";
import FinalCta from "@/components/sales/FinalCta";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import { productLandingExtensions } from "@/i18n/product-page-extensions";
import { productPageDictionaries } from "@/i18n/product-page";
import { productPhase3Landing } from "@/i18n/product-phase3";

const sectionClass = "border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8";

export default function ProductLandingPage() {
  const { fa, dir, lang } = useT();
  const ui = productPageDictionaries[lang];
  const ext = productLandingExtensions[lang];
  const p3 = productPhase3Landing[lang];
  const [bootDone, setBootDone] = useState(false);

  return (
    <>
      <div className="border-b border-paper/20 px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {!bootDone ? (
            <ProductBootSequence lines={p3.bootLines} className="mb-6" onComplete={() => setBootDone(true)} />
          ) : null}
        </div>
      </div>

      <div className={bootDone ? "" : "pointer-events-none opacity-50"}>
        <InnerPage eyebrow={ui.hero.eyebrow} title={ui.hero.title} subtitle={ui.hero.lead} lines={[ui.hero.body]}>
          <Link
            href="/contactus/request"
            dir={dir}
            className={`group inline-flex items-center gap-2 border border-term/40 px-5 py-2.5 text-xs uppercase tracking-wider text-term transition-colors duration-200 hover:bg-term/10 ${fa ? "font-fa" : ""}`}
          >
            {ui.hero.cta}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">{fa ? "←" : "→"}</span>
          </Link>
        </InnerPage>

        <ProductStatsStrip eyebrow={ext.stats.eyebrow} items={ext.stats.items} accentText="text-term" />

        <ProductExplorer />

        <ProductMatcher />

        <motion.section
          variants={moduleReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          className={sectionClass}
        >
          <div className="mx-auto max-w-6xl">
            <AboutSectionHeader eyebrow={ui.pillars.eyebrow} title={ui.pillars.title} />
            <div className="grid gap-4 md:grid-cols-3">
              {ui.pillars.items.map((item) => (
                <motion.article
                  key={item.title}
                  variants={itemReveal}
                  dir={dir}
                  className={`border border-paper/15 bg-paper/[0.015] p-5 sm:p-6 ${fa ? "font-fa" : ""}`}
                >
                  <h3 className={`text-base text-paper/90 ${fa ? "font-fa" : "font-pixel"}`}>{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-paper/55">{item.body}</p>
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
            <AboutSectionHeader eyebrow={ui.process.eyebrow} title={ui.process.title} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ui.process.steps.map((step, index) => (
                <motion.article
                  key={step.title}
                  variants={itemReveal}
                  dir={dir}
                  className={`border border-paper/15 bg-paper/[0.015] p-5 sm:p-6 ${fa ? "font-fa" : ""}`}
                >
                  <span className="font-mono text-[10px] text-term/60">{String(index + 1).padStart(2, "0")}</span>
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
            <AboutSectionHeader eyebrow={ui.links.eyebrow} title={ui.links.title} />
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { title: ui.links.servicesTitle, body: ui.links.servicesBody, href: ui.links.servicesHref },
                { title: ui.links.portfolioTitle, body: ui.links.portfolioBody, href: ui.links.portfolioHref },
              ].map((item) => (
                <motion.div key={item.href} variants={itemReveal}>
                  <Link
                    href={item.href}
                    dir={dir}
                    className={`group flex h-full flex-col border border-paper/20 bg-paper/[0.015] p-5 transition-colors hover:border-term/35 hover:bg-paper/[0.03] sm:p-6 ${fa ? "font-fa" : ""}`}
                  >
                    <span className={`text-base text-paper/90 ${fa ? "font-fa" : "font-pixel"}`}>{item.title}</span>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-paper/55">{item.body}</p>
                    <span className={`mt-4 text-xs text-paper/35 group-hover:text-term ${fa ? "font-fa" : "font-mono"}`}>
                      {ui.links.linkLabel} {fa ? "←" : "→"}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <ProductChangelogTeaser data={p3.changelog} />

        <ProductFaq slug="product" eyebrow={ext.faq.eyebrow} title={ext.faq.title} items={ext.faq.items} />

        <FinalCta />
      </div>
    </>
  );
}
