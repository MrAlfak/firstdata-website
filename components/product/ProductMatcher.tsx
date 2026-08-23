"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import TermIcon from "@/components/icons/TermIcon";
import AboutSectionHeader from "@/components/about/AboutSectionHeader";
import { itemReveal, moduleReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import { productPhase2Landing, resolveProductMatch } from "@/i18n/product-phase2";
import type { ProductSlug } from "@/i18n/product-page";
import { ThickTrackSlider } from "@/components/shadcn-space/slider/slider-04";

export default function ProductMatcher() {
  const { fa, dir, lang } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
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
  const face = fa ? (ai ? "font-iran" : "font-fa") : ai ? "font-iran" : "";

  return (
    <motion.section
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={`border-b px-4 py-12 sm:px-6 sm:py-16 lg:px-8 ${
        ai ? "ai-section border-paper/10 bg-transparent" : "border-paper/20 bg-paper/[0.015]"
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <AboutSectionHeader eyebrow={m.eyebrow} title={m.title} />
        <p dir={dir} className={`mb-8 max-w-2xl text-sm text-paper/55 ${face}`}>
          {m.subtitle}
        </p>

        <motion.div
          variants={itemReveal}
          className={
            ai
              ? "rounded-2xl border border-paper/10 bg-paper/[0.03] p-5 sm:p-8"
              : "border border-paper/20 bg-[#080c08]/40 p-5 sm:p-8"
          }
        >
          {!done && q ? (
            <>
              <p
                className={
                  ai
                    ? `text-xs text-paper/40 ${face}`
                    : "font-mono text-[10px] text-term/50"
                }
              >
                {m.progressLabel} {step + 1}/{m.questions.length}
              </p>
              {ai ? (
                <ThickTrackSlider
                  className="mt-3"
                  value={[((step + 1) / m.questions.length) * 100]}
                  min={0}
                  max={100}
                  step={0.1}
                  disabled
                  aria-label={m.progressLabel}
                />
              ) : null}
              <h3
                dir={dir}
                className={`mt-4 text-base text-paper sm:text-lg ${
                  ai
                    ? `font-medium ${face}`
                    : fa
                      ? "font-fa"
                      : "font-pixel"
                }`}
              >
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
                      ai ? "rounded-xl" : ""
                    } ${
                      selected === opt.id
                        ? "border-term/45 bg-term/[0.08] text-paper"
                        : "border-paper/12 text-paper/65 hover:border-paper/25 hover:bg-paper/[0.03]"
                    } ${fa ? `${face} text-right` : "text-left"}`}
                  >
                    {!ai ? (
                      <span className="font-mono text-[10px] text-paper/30">
                        {selected === opt.id ? "[*]" : "[ ]"}
                      </span>
                    ) : (
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${
                          selected === opt.id ? "bg-term" : "bg-paper/25"
                        }`}
                        aria-hidden
                      />
                    )}
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className={`border border-paper/20 px-4 py-2 text-xs text-paper/60 transition-colors hover:border-paper/40 ${
                      ai ? `rounded-xl ${face}` : fa ? "font-fa" : "font-mono uppercase"
                    }`}
                  >
                    {m.backLabel}
                  </button>
                )}
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!selected}
                  className={`border border-term/40 px-5 py-2 text-xs text-term transition-colors hover:bg-term/10 disabled:cursor-not-allowed disabled:opacity-40 ${
                    ai ? `rounded-xl ${face}` : fa ? "font-fa" : "font-mono uppercase"
                  }`}
                >
                  {step === m.questions.length - 1 ? (fa ? "نتیجه" : "Result") : m.nextLabel}
                </button>
              </div>
            </>
          ) : resultSlug ? (
            <div dir={dir}>
              <p
                className={
                  ai ? `text-xs text-term/70 ${face}` : "font-mono text-[10px] text-term/60"
                }
              >
                {m.resultEyebrow}
              </p>
              <h3
                className={`mt-3 flex items-center gap-3 text-xl text-paper ${
                  ai ? `font-medium ${face}` : fa ? "font-fa" : "font-pixel"
                }`}
              >
                <TermIcon name={resultSlug} plain />
                {m.resultLabels[resultSlug]}
              </h3>
              <p className={`mt-4 max-w-xl text-sm leading-relaxed text-paper/60 ${face}`}>
                {m.resultBody}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/product/${resultSlug}`}
                  className={`inline-flex items-center gap-2 border border-term/40 px-5 py-2.5 text-xs text-term transition-colors hover:bg-term/10 ${
                    ai ? `rounded-xl ${face}` : fa ? "font-fa" : "font-mono uppercase"
                  }`}
                >
                  {m.resultCta}
                  <span aria-hidden>{fa ? "←" : "→"}</span>
                </Link>
                <button
                  type="button"
                  onClick={restart}
                  className={`border border-paper/20 px-4 py-2 text-xs text-paper/50 hover:border-paper/35 ${
                    ai ? `rounded-xl ${face}` : fa ? "font-fa" : "font-mono uppercase"
                  }`}
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
