"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import ModuleWrapper, { itemReveal } from "@/components/ModuleWrapper";
import { Decode } from "@/components/Decode";
import { useT } from "@/i18n/LangProvider";

const stages = [
  { label: "LEXER", sub: "tokens"  }, { label: "PARSER", sub: "AST"     }, { label: "SEMA", sub: "types"   }, { label: "IR", sub: "ssa/opt" }, { label: "CODE", sub: "asm"     }, ];

const fib = `fn fibonacci(n: u64) -> u64 {
    match n {
        0 => 0, 1 => 1, _ => fibonacci(n - 1) + fibonacci(n - 2), }
}

// LLVM IR (simplified):
// define i64 @fibonacci(i64 %n) {
//   %cmp0 = icmp eq i64 %n, 0
//   br i1 %cmp0, label %ret0, label %chk1
// ret0:
//   ret i64 0
// ...
// }`;

export default function CompilerDesignSection() {
  const { t, fa, dir } = useT();
  const sectionRef  = useRef(null);
  const [activeStage, setActiveStage] = useState(-1);

  // Scroll-driven stage lighting, the ONLY scroll-linked motion on the page
  const { scrollYProgress } = useScroll({
    target: sectionRef, offset: ["start center", "end center"], });
  const stageMotion = useTransform(scrollYProgress, [0, 1], [-1, stages.length - 1]);
  useMotionValueEvent(stageMotion, "change", (v) => setActiveStage(Math.round(v)));

  return (
    <ModuleWrapper id="module-04" number="04" eyebrow="compiler-design">
      <motion.div variants={itemReveal} className="mb-8 flex items-start justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <Decode as="span" className="font-pixel text-2xl text-white/40" duration={300}>04</Decode>
          <div>
            <Decode as="h2" dir={dir} className={`text-xl uppercase tracking-wide sm:text-2xl ${fa ? "font-fa" : "font-pixel"}`}>
              {t("modules.04.title")}
            </Decode>
            <p dir={dir} className={`mt-2 max-w-md text-sm text-white/60 ${fa ? "font-fa" : ""}`}>
              {t("modules.04.subtitle")}
            </p>
          </div>
        </div>
        <span className="border border-white/30 px-2 py-1 text-[10px] uppercase tracking-wider text-white/50">
          LLVM
        </span>
      </motion.div>

      <div ref={sectionRef} className="grid gap-4 lg:grid-cols-2">
        {/* Scroll-driven pipeline */}
        <motion.div variants={itemReveal} className="border border-white/20 bg-white/[0.02] p-4">
          <p dir={dir} className={`mb-6 text-[10px] uppercase tracking-wider text-white/40 ${fa ? "font-fa" : ""}`}>
            {fa ? "خط لوله, برای مرور اسکرول کنید" : "Pipeline, scroll to step through"}
          </p>
          <div className="flex items-stretch gap-px">
            {stages.map((s, i) => (
              <div key={s.label} className="flex flex-1 flex-col items-center">
                <div
                  className={`w-full border px-1 py-3 text-center transition-colors duration-200 ${
                    i === activeStage
                      ? "border-paper bg-paper text-ink"
                      : i < activeStage
                      ? "border-white/60 text-white/70"
                      : "border-white/20 text-white/30"
                  }`}
                >
                  <div className="font-pixel text-[10px] uppercase">{s.label}</div>
                  <div className="mt-1 font-mono text-[9px] opacity-70">{s.sub}</div>
                </div>
                {i < stages.length - 1 && (
                  <div className={`mt-1 text-xs transition-colors ${i < activeStage ? "text-white/60" : "text-white/20"}`}>
                    ──▶
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-[9px] text-white/30">
            source.c → a.out [LINKED]
          </p>
        </motion.div>

        {/* Rust → LLVM IR example */}
        <motion.div variants={itemReveal} className="border border-white/20 bg-white/[0.02] p-4">
          <p dir={dir} className={`mb-3 text-[10px] uppercase tracking-wider text-white/40 ${fa ? "font-fa" : ""}`}>
            {fa ? "نمونه, Rust → LLVM IR" : "Example, Rust → LLVM IR"}
          </p>
          <pre className="ascii text-[10px] leading-relaxed text-white/70">{fib}</pre>
        </motion.div>
      </div>
    </ModuleWrapper>
  );
}
