"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { PortfolioProject } from "@/config/portfolio";
import PortfolioCasePreview from "@/components/portfolio/PortfolioCasePreview";
import { useT } from "@/i18n/LangProvider";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import { portfolioPageDictionaries } from "@/i18n/portfolio-page";

type Variant = "flagship" | "compact";

type Props = {
  project: PortfolioProject;
  variant?: Variant;
  href?: string;
  accentText?: string;
  accentHover?: string;
  accentBorder?: string;
};

export default function PortfolioCaseFile({
  project,
  variant = "compact",
  href,
  accentText = "text-term",
  accentHover = "hover:border-term/35",
  accentBorder = "border-term/40",
}: Props) {
  const { fa, dir, lang, fd } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const face = ai ? "font-iran" : fa ? "font-fa" : "";
  const ui = portfolioPageDictionaries[lang];
  const labels = ui.categoryLabels;
  const cf = ui.caseFile;
  const isFlagship = variant === "flagship";

  if (isFlagship) {
    const inner = (
      <div
        dir={dir}
        className={`group relative overflow-hidden border transition-colors ${accentHover} ${face} ${
          ai
            ? "rounded-2xl border-paper/10 bg-paper/[0.03]"
            : "border-paper/15 bg-[#060906]"
        }`}
      >
        {!ai ? (
          <>
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 80% 60% at 70% 0%, rgba(51,255,102,0.12), transparent 55%), radial-gradient(ellipse 50% 40% at 10% 90%, rgba(255,255,255,0.04), transparent 50%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(51,255,102,0.5) 1px, transparent 1px)",
                backgroundSize: "100% 4px",
              }}
            />
          </>
        ) : null}

        <div className="relative grid items-center gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative p-5 sm:p-8 lg:p-10">
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="transition-transform duration-500 group-hover:-translate-y-1"
            >
              <PortfolioCasePreview project={project} />
            </motion.div>
          </div>

          <div className="flex flex-col justify-center border-t border-paper/10 p-6 sm:p-8 lg:border-s lg:border-t-0 lg:p-10">
            <div
              className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] uppercase tracking-wider ${
                ai ? "font-iran normal-case tracking-wide text-[11px]" : "font-mono"
              }`}
            >
              <span className={`${accentText}`}>{cf.sample}</span>
              <span className="text-paper/25" aria-hidden>
                ·
              </span>
              <span className="text-paper/50">{labels[project.category]}</span>
              {project.year ? (
                <>
                  <span className="text-paper/25" aria-hidden>
                    ·
                  </span>
                  <span className="text-paper/40" dir="ltr">
                    {fd(project.year)}
                  </span>
                </>
              ) : null}
              {project.featured ? (
                <span
                  className={`border px-1.5 py-0.5 ${accentBorder} ${accentText} ${
                    ai ? "rounded-md" : ""
                  }`}
                >
                  {cf.featured}
                </span>
              ) : null}
            </div>

            <p
              className={`mt-5 text-xl leading-snug text-paper sm:text-2xl lg:text-[1.65rem] lg:leading-snug ${
                ai ? "font-medium font-iran" : fa ? "font-fa" : "font-pixel"
              }`}
            >
              <span
                className={`me-2 text-[11px] uppercase tracking-wider ${accentText} ${
                  ai ? "font-iran normal-case tracking-wide" : "font-mono"
                }`}
              >
                {ui.outcomeLabel}
              </span>
              {project.outcome[lang]}
            </p>

            <h3 className="mt-5 text-sm text-paper/55 sm:text-base">{project.title[lang]}</h3>

            <p className="mt-3 text-sm leading-relaxed text-paper/40">
              <span
                className={`text-[10px] uppercase tracking-wider text-paper/30 ${
                  ai ? "font-iran normal-case tracking-wide text-[11px]" : "font-mono"
                }`}
              >
                {cf.challenge}
              </span>
              <span className="mt-1 block text-paper/50">{project.description[lang]}</span>
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5" aria-label={ui.tagsAria}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`border border-paper/15 bg-paper/[0.04] px-2.5 py-1 text-[9px] uppercase tracking-wider text-paper/55 ${
                    ai ? "rounded-md font-iran normal-case tracking-wide text-[11px]" : "font-mono"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {href ? (
              <p
                className={`mt-8 inline-flex w-fit items-center gap-2 border px-5 py-3 text-xs transition-colors ${accentBorder} ${accentText} group-hover:bg-term/10 ${
                  ai
                    ? "rounded-xl font-iran normal-case tracking-normal"
                    : `uppercase tracking-wider ${fa ? "font-fa" : "font-mono"}`
                }`}
              >
                {cf.openCase}
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  {fa ? "←" : "→"}
                </span>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    );

    if (href) {
      return (
        <Link href={href} className="block no-underline">
          {inner}
        </Link>
      );
    }
    return <article>{inner}</article>;
  }

  const compactBody = (
    <>
      <div
        className={`mb-4 overflow-hidden border border-paper/10 ${
          ai ? "rounded-xl bg-paper/[0.04]" : "bg-[#080c08]"
        }`}
      >
        <div className="origin-top scale-[0.92] p-2 sm:scale-100 sm:p-3">
          <PortfolioCasePreview project={project} compact />
        </div>
      </div>

      <div
        className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] uppercase tracking-wider ${
          ai ? "font-iran normal-case tracking-wide text-[11px]" : "font-mono"
        }`}
      >
        <span className={`${accentText} opacity-60`}>{labels[project.category]}</span>
        {project.year ? (
          <>
            <span className="text-paper/25" aria-hidden>
              ·
            </span>
            <span className="text-paper/35" dir="ltr">
              {fd(project.year)}
            </span>
          </>
        ) : null}
      </div>

      <h3
        className={`mt-2 text-base text-paper sm:text-lg ${
          ai ? "font-medium font-iran" : fa ? "font-fa" : "font-pixel"
        }`}
      >
        {project.title[lang]}
      </h3>

      <p className={`mt-2 line-clamp-2 text-sm leading-relaxed ${accentText} opacity-90`}>
        {project.outcome[lang]}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className={`border border-paper/10 px-2 py-0.5 text-[9px] uppercase tracking-wider text-paper/40 ${
              ai ? "rounded-md font-iran normal-case tracking-wide text-[11px]" : "font-mono"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      {href ? (
        <p className={`mt-4 inline-flex items-center gap-2 text-sm ${accentText}`}>
          {cf.open}
          <span aria-hidden>{fa ? "←" : "→"}</span>
        </p>
      ) : null}
    </>
  );

  const compactClass = `group relative flex h-full flex-col overflow-hidden border border-paper/12 bg-paper/[0.02] p-4 transition-colors duration-200 hover:bg-paper/[0.04] ${accentHover} sm:p-5 ${face} ${
    ai ? "rounded-2xl" : ""
  }`;

  if (href) {
    return (
      <Link href={href} dir={dir} className={`${compactClass} no-underline`}>
        {compactBody}
      </Link>
    );
  }

  return (
    <article dir={dir} className={compactClass}>
      {compactBody}
    </article>
  );
}
