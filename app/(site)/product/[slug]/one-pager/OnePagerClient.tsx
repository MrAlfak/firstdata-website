"use client";

import { useEffect } from "react";
import { useT } from "@/i18n/LangProvider";
import type { ProductSlug } from "@/i18n/product-page";

type Section = { heading: string; bullets: string[] };

type Props = {
  slug: ProductSlug;
  titleFa: string;
  titleEn: string;
  leadFa: string;
  leadEn: string;
  sectionsFa: Section[];
  sectionsEn: Section[];
  printTitle: string;
};

export default function OnePagerClient({
  titleFa,
  titleEn,
  leadFa,
  leadEn,
  sectionsFa,
  sectionsEn,
  printTitle,
}: Props) {
  const { fa, lang, dir } = useT();
  const title = fa ? titleFa : titleEn;
  const lead = fa ? leadFa : leadEn;
  const sections = lang === "fa" ? sectionsFa : sectionsEn;

  useEffect(() => {
    document.title = printTitle;
  }, [printTitle]);

  return (
    <div className="min-h-screen bg-white text-black print:p-8" dir={dir}>
      <div className="mx-auto max-w-3xl px-6 py-10 print:max-w-none print:px-0">
        <header className="border-b border-black/15 pb-6">
          <p className="font-mono text-xs uppercase tracking-widest text-black/45">First Data</p>
          <h1 className={`mt-2 text-2xl font-bold ${fa ? "font-fa" : ""}`}>{title}</h1>
          <p className={`mt-3 text-sm leading-relaxed text-black/70 ${fa ? "font-fa" : ""}`}>{lead}</p>
        </header>

        {sections.map((section) => (
          <section key={section.heading} className="mt-8">
            <h2 className={`text-lg font-semibold ${fa ? "font-fa" : ""}`}>{section.heading}</h2>
            <ul className={`mt-3 list-disc space-y-1 ps-5 text-sm ${fa ? "font-fa" : ""}`}>
              {section.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>
        ))}

        <footer className="mt-12 border-t border-black/15 pt-6 text-sm text-black/55">
          <p className={fa ? "font-fa" : ""}>
            {fa ? "firstdata.ir — درخواست مشاوره: /contactus/request" : "firstdata.ir — Request: /contactus/request"}
          </p>
          <button
            type="button"
            onClick={() => window.print()}
            className={`mt-4 border border-black/25 px-4 py-2 text-xs print:hidden ${fa ? "font-fa" : "font-mono uppercase"}`}
          >
            {fa ? "چاپ / Save as PDF" : "Print / Save as PDF"}
          </button>
        </footer>
      </div>
    </div>
  );
}
