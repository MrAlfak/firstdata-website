"use client";

import { useState } from "react";
import { motion } from "motion/react";
import ModuleWrapper, { itemReveal } from "@/components/ModuleWrapper";
import { Decode } from "@/components/Decode";
import { useT } from "@/i18n/LangProvider";

function Bit({ label, value, onToggle }: { label: string; value: 0 | 1; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`flex flex-col items-center gap-1 border px-4 py-3 transition-colors duration-[0ms] ${
        value === 1
          ? "border-paper bg-paper text-ink"
          : "border-white/30 text-white/70 hover:border-white/70"
      }`}
    >
      <span className="text-[10px] uppercase tracking-wider">{label}</span>
      <span className="font-pixel text-2xl">{value}</span>
    </button>
  );
}

// Generate a square wave SVG path (doubled for seamless scroll)
function squareWavePath(periods: number, step: number, hi: number, lo: number): string {
  let d = "";
  for (let rep = 0; rep < 2; rep++) {
    const off = rep * periods * step;
    for (let i = 0; i < periods; i++) {
      const x0 = off + i * step;
      const xm = x0 + step / 2;
      const x1 = x0 + step;
      if (i === 0 && rep === 0) d += `M${x0},${lo}`;
      d += ` L${x0},${lo} L${x0},${hi} L${xm},${hi} L${xm},${lo} L${x1},${lo}`;
    }
  }
  return d;
}

const WAVE_PATH = squareWavePath(12, 20, 4, 16);

export default function LogicSynthesisSection() {
  const { t, fa, dir } = useT();
  const [inputs, setInputs] = useState<[0|1,0|1,0|1,0|1]>([0, 0, 0, 0]);

  const toggle = (i: number) =>
    setInputs((prev) => {
      const next = [...prev] as [0|1,0|1,0|1,0|1];
      next[i] = prev[i] === 0 ? 1 : 0;
      return next;
    });

  const [A, B, C, D] = inputs;
  const andAB = (A & B) as 0 | 1;
  const andCD = (C & D) as 0 | 1;
  const Q     = (andAB | andCD) as 0 | 1;

  return (
    <ModuleWrapper id="module-06" number="06" eyebrow="logic-synthesis">
      <motion.div variants={itemReveal} className="mb-8 flex items-start justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <Decode as="span" className="font-pixel text-2xl text-white/40" duration={300}>06</Decode>
          <div>
            <Decode as="h2" dir={dir} className={`text-xl uppercase tracking-wide sm:text-2xl ${fa ? "font-fa" : "font-pixel"}`}>
              {t("modules.06.title")}
            </Decode>
            <p dir={dir} className={`mt-2 max-w-md text-sm text-white/60 ${fa ? "font-fa" : ""}`}>
              {t("modules.06.subtitle")}
            </p>
          </div>
        </div>
        <span className="border border-white/30 px-2 py-1 text-[10px] uppercase tracking-wider text-white/50">
          RTL
        </span>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Controls + clock signal */}
        <motion.div variants={itemReveal} className="border border-white/20 bg-white/[0.02] p-6">
          <p dir={dir} className={`mb-4 text-[10px] uppercase tracking-wider text-white/40 ${fa ? "font-fa" : ""}`}>
            {fa ? "ورودی‌ها, برای تغییر کلیک کنید" : "Inputs, click to toggle"}
          </p>
          <div className="mb-8 flex gap-3">
            {(["A","B","C","D"] as const).map((label, i) => (
              <Bit key={label} label={label} value={inputs[i]} onToggle={() => toggle(i)} />
            ))}
          </div>

          <p dir={dir} className={`mb-2 text-[10px] uppercase tracking-wider text-white/40 ${fa ? "font-fa" : ""}`}>{fa ? "فرمول" : "Formula"}</p>
          <p className="font-mono text-sm" dir="ltr">Q = (A AND B) OR (C AND D)</p>

          <div className="mt-6 flex items-center gap-4">
            <div dir={dir} className={`text-[10px] uppercase tracking-wider text-white/40 ${fa ? "font-fa" : ""}`}>{fa ? "خروجی" : "Output"}</div>
            <div
              className={`border px-6 py-3 font-pixel text-3xl transition-colors duration-[0ms] ${
                Q === 1
                  ? "border-paper bg-paper text-ink"
                  : "border-white/30 text-white/40"
              }`}
            >
              Q = {Q}
            </div>
          </div>

          {/* Clock signal */}
          <div className="mt-8">
            <p dir={dir} className={`mb-2 text-[10px] uppercase tracking-wider text-white/40 ${fa ? "font-fa" : ""}`}>{fa ? "سیگنال کلاک" : "CLK signal"}</p>
            <div className="overflow-hidden border border-white/10">
              <svg
                viewBox="0 0 240 20"
                className="w-full"
                style={{ display: "block" }}
                preserveAspectRatio="none"
              >
                <g className="animate-clock-scroll">
                  <path
                    d={WAVE_PATH}
                    stroke="#ffffff"
                    strokeWidth="1"
                    fill="none"
                    strokeOpacity="0.5"
                  />
                </g>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Gate diagram */}
        <motion.div variants={itemReveal} className="border border-white/20 bg-white/[0.02] p-4">
          <p dir={dir} className={`mb-4 text-[10px] uppercase tracking-wider text-white/40 ${fa ? "font-fa" : ""}`}>{fa ? "نمودار گیت" : "Gate Diagram"}</p>
          <pre className="ascii text-[11px]">{`
  A(${A}) ─┐
          ├──[ AND ]──┐
  B(${B}) ─┘           │
                      ├──[ OR ]── Q(${Q})
  C(${C}) ─┐           │
          ├──[ AND ]──┘
  D(${D}) ─┘`.trim()}</pre>
          <div className="mt-6 space-y-1 text-xs text-white/50">
            <div className="flex justify-between">
              <span>A AND B</span>
              <span className="font-mono">{andAB}</span>
            </div>
            <div className="flex justify-between">
              <span>C AND D</span>
              <span className="font-mono">{andCD}</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-1">
              <span dir={dir} className={fa ? "font-fa" : ""}>{fa ? "گیت‌ها: ۳    عمق: ۲" : "gates: 3    depth: 2"}</span>
              <span className="font-mono">Q = {Q}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </ModuleWrapper>
  );
}
