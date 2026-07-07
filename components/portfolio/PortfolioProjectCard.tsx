"use client";

import type { PortfolioProject } from "@/config/portfolio";
import { useT } from "@/i18n/LangProvider";
import { portfolioPageDictionaries } from "@/i18n/portfolio-page";

type Props = {
  project: PortfolioProject;
};

export default function PortfolioProjectCard({ project }: Props) {
  const { fa, dir, lang, fd } = useT();
  const labels = portfolioPageDictionaries[lang].categoryLabels;

  return (
    <article
      dir={dir}
      className={`group flex h-full flex-col border border-paper/12 bg-paper/[0.015] p-5 transition-colors hover:border-term/25 hover:bg-paper/[0.03] sm:p-6 ${fa ? "font-fa" : ""}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[9px] uppercase tracking-wider text-term/55">
          {labels[project.category]}
        </span>
        {project.year ? (
          <span className="font-mono text-[9px] text-paper/35" dir="ltr">
            {fd(project.year)}
          </span>
        ) : null}
        {project.featured ? (
          <span className="border border-term/25 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-term/70">
            ★
          </span>
        ) : null}
      </div>

      <h3 className={`mt-3 text-base text-paper group-hover:text-term/90 sm:text-lg ${fa ? "font-fa" : ""}`}>
        {project.title[lang]}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-paper/60">
        {project.description[lang]}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-paper/50">
        <span className="font-mono text-[10px] text-term/50">→ </span>
        {project.outcome[lang]}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="border border-paper/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-paper/45"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
