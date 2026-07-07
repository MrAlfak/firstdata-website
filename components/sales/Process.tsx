"use client";

import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import { Decode } from "@/components/Decode";
import { useT } from "@/i18n/LangProvider";

export default function Process() {
  const { fa, dir, d, fd } = useT();
  const proc = d.process;

  return (
    <motion.section
      id="process"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
      className="scroll-mt-16 border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">

        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mb-4 text-[10px] txt-comment ${fa ? "font-fa" : "ascii"}`}
        >
          <Decode>{proc.eyebrow}</Decode>
        </motion.p>

        <motion.h2
          variants={itemReveal}
          dir={dir}
          className={`mb-8 text-2xl leading-tight tracking-tight sm:text-3xl lg:text-4xl ${fa ? "font-fa" : "font-pixel"}`}
        >
          {proc.title}
        </motion.h2>

        {/* Terminal pipeline diagram */}
        <motion.div variants={itemReveal} className="mb-8">
          {/* Chrome */}
          <div className="flex items-center gap-1.5 border border-b-0 border-paper/20 bg-paper/[0.04] px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57]/70" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e]/70" />
            <span className="h-2 w-2 rounded-full bg-[#28c840]/70" />
            <span className="ml-auto font-mono text-[9px] text-paper/20">
              {fa ? "خط لوله تولید" : "build-pipeline"}
            </span>
          </div>
          {/* Pipeline body, scrollable on mobile */}
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

        {/* Step cards */}
        <motion.div
          variants={itemReveal}
          className="grid gap-px border border-paper/10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {proc.steps.map((step, idx) => (
            <div
              key={step.num}
              className="flex flex-col gap-4 bg-paper/[0.015] p-5 sm:p-6 transition-colors duration-200 hover:bg-paper/[0.03]"
            >
              {/* Step number */}
              <div className="flex items-start justify-between">
                <span className="font-pixel text-4xl text-paper/10">{fd(step.num)}</span>
                <span className="font-mono text-[10px] text-term/50">[OK]</span>
              </div>

              <p className={`text-sm font-medium tracking-wide text-paper ${fa ? "font-fa" : "font-pixel"}`}>
                {step.label}
              </p>

              <p
                dir={dir}
                className={`text-xs leading-relaxed text-paper/50 ${fa ? "font-fa" : ""}`}
              >
                {step.text}
              </p>

              {/* Connector arrow, not on last item */}
              {idx < proc.steps.length - 1 && (
                <p className="mt-auto font-mono text-[10px] text-paper/20">
                  {fa ? "↓" : "──>"}
                </p>
              )}
            </div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}
