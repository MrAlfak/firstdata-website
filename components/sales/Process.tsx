"use client";

import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import { Decode } from "@/components/Decode";
import { useT } from "@/i18n/LangProvider";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";

export default function Process() {
  const { fa, dir, d, fd } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const proc = d.process;
  const face = ai ? "font-iran" : fa ? "font-fa" : "";

  return (
    <motion.section
      id="process"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
      className={`scroll-mt-16 border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 ${ai ? "ai-section" : ""}`}
    >
      <div className={`mx-auto ${ai ? "max-w-7xl" : "max-w-6xl"}`}>
        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mb-4 text-[10px] txt-comment ${ai ? "ai-eyebrow text-sm" : fa ? "font-fa" : "ascii"}`}
        >
          {ai ? proc.eyebrow : <Decode>{proc.eyebrow}</Decode>}
        </motion.p>

        <motion.h2
          variants={itemReveal}
          dir={dir}
          className={
            ai
              ? "ai-display mb-12 text-paper"
              : `mb-8 text-2xl leading-tight tracking-tight sm:text-3xl lg:text-4xl ${fa ? "font-fa" : "font-pixel"}`
          }
        >
          {proc.title}
        </motion.h2>

        {!ai ? (
          <motion.div variants={itemReveal} className="mb-8">
            <div className="flex items-center gap-1.5 border border-b-0 border-paper/20 bg-paper/[0.04] px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]/70" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]/70" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]/70" />
              <span className="ml-auto font-mono text-[9px] text-paper/20">
                {fa ? "خط لوله تولید" : "build-pipeline"}
              </span>
            </div>
            <div className="overflow-x-auto border border-paper/20 bg-paper/[0.015] p-4">
              <pre className="ascii text-[9px] leading-relaxed text-paper/50 sm:text-[10px]">
                {fa
                  ? `┌───────────┐      ┌───────────┐      ┌───────────┐      ┌───────────┐
│ [۱] مشاوره│ ───> │[۲] طراحی  │ ───> │  [۳] توسعه│ ───> │[۴] راه‌اندازی│
└───────────┘      └───────────┘      └───────────┘      └───────────┘
status: [OK]       status: [OK]       status: [OK]       status: [OK]`
                  : `┌────────────┐      ┌────────────┐      ┌────────────┐      ┌────────────┐
│[1] CONSULT │ ──> │ [2] DESIGN │ ──> │  [3] BUILD │ ──> │ [4] LAUNCH │
└────────────┘      └────────────┘      └────────────┘      └────────────┘
status: [OK]        status: [OK]        status: [OK]        status: [OK]`}
              </pre>
            </div>
          </motion.div>
        ) : null}

        <motion.div
          variants={itemReveal}
          className={
            ai
              ? "grid gap-0 border-t border-paper/10 sm:grid-cols-2 lg:grid-cols-4"
              : "grid gap-px border border-paper/10 sm:grid-cols-2 lg:grid-cols-4"
          }
        >
          {proc.steps.map((step, idx) => (
            <div
              key={step.num}
              className={
                ai
                  ? `flex flex-col gap-3 border-paper/10 py-8 pe-6 ${face} ${idx > 0 ? "sm:border-s sm:ps-6" : ""}`
                  : "flex flex-col gap-4 bg-paper/[0.015] p-5 transition-colors duration-200 hover:bg-paper/[0.03] sm:p-6"
              }
            >
              <div className="flex items-start justify-between">
                <span
                  className={
                    ai
                      ? "font-iran text-3xl font-bold text-paper/15"
                      : "font-pixel text-4xl text-paper/10"
                  }
                >
                  {fd(step.num)}
                </span>
                {!ai ? <span className="font-mono text-[10px] text-term/50">[OK]</span> : null}
              </div>

              <p
                className={
                  ai
                    ? "text-lg font-medium text-paper"
                    : `text-sm font-medium tracking-wide text-paper ${fa ? "font-fa" : "font-pixel"}`
                }
              >
                {step.label}
              </p>

              <p dir={dir} className={`text-sm leading-relaxed text-paper/55 ${face}`}>
                {step.text}
              </p>

              {!ai && idx < proc.steps.length - 1 ? (
                <p className="mt-auto font-mono text-[10px] text-paper/20">{fa ? "↓" : "──>"}</p>
              ) : null}
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
