"use client";

import Link from "next/link";
import { motion } from "motion/react";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import PortfolioCasePreview from "@/components/portfolio/PortfolioCasePreview";
import { getProductCaseStudy } from "@/config/product-case-studies";
import { getProjectsForProduct } from "@/config/product-portfolio";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import { productPolishUi } from "@/i18n/product-polish";
import type { ProductSlug } from "@/i18n/product-page";
import { portfolioPageDictionaries } from "@/i18n/portfolio-page";

type Props = {
  slug: ProductSlug;
  href: string;
  accentText?: string;
  accentBorder?: string;
  accentHover?: string;
};

export default function ProductCaseStudy({
  slug,
  href,
  accentText = "text-term",
  accentBorder = "border-term/40",
  accentHover = "hover:border-term/35",
}: Props) {
  const { fa, dir, lang, fd } = useT();
  const polish = productPolishUi[lang];
  const labels = portfolioPageDictionaries[lang].categoryLabels;
  const project = getProjectsForProduct(slug, 1)[0];
  const deep = getProductCaseStudy(slug, lang);

  if (!project) return null;

  return (
    <motion.section
      id="case-study"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="scroll-mt-24 border-b border-paper/20 bg-[#060906] px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AboutSectionHeader eyebrow={polish.caseStudy.eyebrow} title={polish.caseStudy.title} />

        <motion.div
          variants={itemReveal}
          className={`overflow-hidden border border-paper/15 ${accentHover}`}
        >
          <div className="grid lg:grid-cols-2">
            <div className="border-b border-paper/10 p-5 sm:p-8 lg:border-b-0 lg:border-e">
              <PortfolioCasePreview project={project} />
            </div>

            <div dir={dir} className={`flex flex-col justify-center p-6 sm:p-8 ${fa ? "font-fa" : ""}`}>
              <p className="font-mono text-[9px] uppercase tracking-wider text-paper/40">
                {labels[project.category]}
                {project.year ? (
                  <>
                    <span className="mx-1.5 text-paper/20">·</span>
                    <span dir="ltr">{fd(project.year)}</span>
                  </>
                ) : null}
              </p>

              <h3 className={`mt-3 text-xl text-paper sm:text-2xl ${fa ? "font-fa" : "font-pixel"}`}>
                {project.title[lang]}
              </h3>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-paper/35">
                    {polish.caseStudy.challenge}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-paper/60">{deep.challenge}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-paper/35">
                    {polish.caseStudy.approach}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-paper/60">{deep.approach}</p>
                </div>
                <div className={`border-s-2 border-s-current ps-4 ${accentText}`}>
                  <p className="font-mono text-[10px] uppercase tracking-wider opacity-70">
                    {polish.caseStudy.outcome}
                  </p>
                  <p className="mt-1.5 text-base leading-relaxed text-paper/90">
                    {project.outcome[lang]}
                  </p>
                </div>
              </div>

              <dl className="mt-5 grid grid-cols-3 gap-2">
                {deep.metrics.map((m) => (
                  <div key={m.label} className="border border-paper/12 bg-paper/[0.03] px-2 py-2">
                    <dt className="font-mono text-[9px] text-paper/40">{m.label}</dt>
                    <dd className={`mt-1 text-sm ${accentText}`} dir="ltr">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5">
                <p className="font-mono text-[9px] uppercase tracking-wider text-paper/30">
                  {polish.caseStudy.stack}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {deep.stack.map((tag) => (
                    <span
                      key={tag}
                      className="border border-paper/12 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-paper/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={href}
                className={`mt-6 inline-flex w-fit border px-4 py-2 text-xs transition-colors hover:bg-paper/[0.04] ${accentBorder} ${accentText} ${fa ? "font-fa" : "font-mono uppercase"}`}
              >
                {polish.caseStudy.cta}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
