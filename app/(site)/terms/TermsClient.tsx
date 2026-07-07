"use client";

import InnerPage from "@/components/layout/InnerPage";
import ChangelogList from "@/components/changelog/ChangelogList";
import { APP_VERSION } from "@/config/changelog";
import { useT } from "@/i18n/LangProvider";
import { formatDigits } from "@/lib/i18n/digits";

export default function TermsClient() {
  const { fa, dir, d, lang } = useT();
  const terms = d.terms;
  const versionLabel = fa ? `v${formatDigits(APP_VERSION, true)}` : `v${APP_VERSION}`;

  return (
    <InnerPage
      eyebrow={terms.eyebrow}
      title={terms.title}
      subtitle={terms.subtitle}
    >
      <div className={`space-y-8 ${fa ? "font-fa" : ""}`} dir={dir}>
        <section className="space-y-5">
          {terms.rules.map((rule) => (
            <article
              key={rule.title}
              className="border border-paper/10 bg-paper/[0.015] p-5 sm:p-6"
            >
              <h2 className="text-sm text-paper">{rule.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-paper/60">{rule.body}</p>
            </article>
          ))}
        </section>

        <section>
          <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className={`text-lg text-paper ${fa ? "font-fa" : "font-pixel tracking-wide"}`}>
              {terms.changelogTitle}
            </h2>
            <span className={`text-[10px] text-term/70 ${fa ? "font-fa" : "font-mono"}`}>
              {versionLabel}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-paper/55">{terms.changelogIntro}</p>
          <p className="mt-2 text-xs text-paper/40">{terms.versionNote}</p>
          <ChangelogList lang={lang} fa={fa} />
        </section>
      </div>
    </InnerPage>
  );
}
