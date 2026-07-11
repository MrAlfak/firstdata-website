"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import TermIcon from "@/components/icons/TermIcon";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import { productPhase2Landing, resolveProductMatch } from "@/i18n/product-phase2";
import type { ProductSlug } from "@/i18n/product-page";

export default function ProductMatcher() {
  const { fa, dir, lang } = useT();
  const m = productPhase2Landing[lang].matcher;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const done = step >= m.questions.length;
  const resultSlug: ProductSlug | null = done ? resolveProductMatch(answers, m.questions) : null;

  const pick = (optionId: string) => setSelected(optionId);

  const goNext = () => {
    if (!selected) return;
    const nextAnswers = [...answers, selected];
    setAnswers(nextAnswers);
    setSelected(null);
    setStep((s) => s + 1);
  };

  const goBack = () => {
    if (step === 0) return;
    setStep((s) => s - 1);
    setSelected(null);
    setAnswers((prev) => prev.slice(0, -1));
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setSelected(null);
  };

  const q = m.questions[step];

  return (
    <motion.section
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="border-b border-paper/20 bg-paper/[0.015] px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <AboutSectionHeader eyebrow={m.eyebrow} title={m.title} />
        <p dir={dir} className={`mb-8 max-w-2xl text-sm text-paper/55 ${fa ? "font-fa" : ""}`}>
          {m.subtitle}
        </p>

        <motion.div variants={itemReveal} className="border border-paper/20 bg-[#080c08]/40 p-5 sm:p-8">
          {!done && q ? (
            <>
              <p className="font-mono text-[10px] text-term/50">
                {m.progressLabel} {step + 1}/{m.questions.length}
              </p>
              <h3 dir={dir} className={`mt-4 text-base text-paper sm:text-lg ${fa ? "font-fa" : "font-pixel"}`}>
                {q.prompt}
              </h3>
              <div className="mt-6 space-y-2">
                {q.options.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => pick(opt.id)}
                    dir={dir}
                    className={`flex w-full items-center gap-3 border px-4 py-3 text-sm transition-colors ${
                      selected === opt.id
                        ? "border-term/45 bg-term/[0.08] text-paper"
                        : "border-paper/12 text-paper/65 hover:border-paper/25 hover:bg-paper/[0.03]"
                    } ${fa ? "font-fa text-right" : "text-left"}`}
                  >
                    <span className="font-mono text-[10px] text-paper/30">{selected === opt.id ? "[*]" : "[ ]"}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className={`border border-paper/20 px-4 py-2 text-xs text-paper/60 transition-colors hover:border-paper/40 ${fa ? "font-fa" : "font-mono uppercase"}`}
                  >
                    {m.backLabel}
                  </button>
                )}
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!selected}
                  className={`border border-term/40 px-5 py-2 text-xs text-term transition-colors hover:bg-term/10 disabled:cursor-not-allowed disabled:opacity-40 ${fa ? "font-fa" : "font-mono uppercase"}`}
                >
                  {step === m.questions.length - 1 ? (fa ? "نتیجه" : "Result") : m.nextLabel}
                </button>
              </div>
            </>
          ) : resultSlug ? (
            <div dir={dir}>
              <p className="font-mono text-[10px] text-term/60">{m.resultEyebrow}</p>
              <h3 className={`mt-3 flex items-center gap-3 text-xl text-paper ${fa ? "font-fa" : "font-pixel"}`}>
                <TermIcon name={resultSlug} plain />
                {m.resultLabels[resultSlug]}
              </h3>
              <p className={`mt-4 max-w-xl text-sm leading-relaxed text-paper/60 ${fa ? "font-fa" : ""}`}>
                {m.resultBody}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/product/${resultSlug}`}
                  className={`inline-flex items-center gap-2 border border-term/40 px-5 py-2.5 text-xs text-term transition-colors hover:bg-term/10 ${fa ? "font-fa" : "font-mono uppercase"}`}
                >
                  {m.resultCta}
                  <span aria-hidden>{fa ? "←" : "→"}</span>
                </Link>
                <button
                  type="button"
                  onClick={restart}
                  className={`border border-paper/20 px-4 py-2 text-xs text-paper/50 hover:border-paper/35 ${fa ? "font-fa" : "font-mono uppercase"}`}
                >
                  {m.restartLabel}
                </button>
              </div>
            </div>
          ) : null}
        </motion.div>
      </div>
    </motion.section>
  );
}
