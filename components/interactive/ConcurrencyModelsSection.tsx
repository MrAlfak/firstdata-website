"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import ModuleWrapper, { itemReveal } from "@/components/ModuleWrapper";
import { Decode } from "@/components/Decode";
import { useT } from "@/i18n/LangProvider";

const threads = [
  { name: "main", segments: [1,1,1,0,1,1,0,0,1,1,1,1,0,1,1,1,1,1,0,1] }, { name: "worker-1", segments: [0,1,1,1,1,0,0,1,1,0,1,1,1,1,0,0,1,1,1,0] }, { name: "worker-2", segments: [1,0,0,1,1,1,1,1,0,1,0,1,1,0,1,1,0,1,1,1] }, { name: "io-pool", segments: [0,0,1,1,0,0,1,0,1,1,1,0,0,1,1,0,1,0,1,1] }, { name: "gc", segments: [0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,1,1,0,0,0] }, { name: "scheduler", segments: [1,1,0,1,0,1,0,1,1,0,0,1,1,0,1,1,0,0,1,0] }, ];

export default function ConcurrencyModelsSection() {
  const { t, fa, dir } = useT();
  const timelineRef = useRef(null);
  const inView = useInView(timelineRef, { once: true, margin: "-15% 0px" });

  return (
    <ModuleWrapper id="module-07" number="07" eyebrow="concurrency-models">
      <motion.div variants={itemReveal} className="mb-8 flex items-start justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <Decode as="span" className="font-pixel text-2xl text-white/40" duration={300}>07</Decode>
          <div>
            <Decode as="h2" dir={dir} className={`text-xl uppercase tracking-wide sm:text-2xl ${fa ? "font-fa" : "font-pixel"}`}>
              {t("modules.07.title")}
            </Decode>
            <p dir={dir} className={`mt-2 max-w-md text-sm text-white/60 ${fa ? "font-fa" : ""}`}>
              {t("modules.07.subtitle")}
            </p>
          </div>
        </div>
        <span className="border border-white/30 px-2 py-1 text-[10px] uppercase tracking-wider text-white/50">
          ASYNC
        </span>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Thread timeline */}
        <motion.div
          ref={timelineRef}
          variants={itemReveal}
          className="border border-white/20 bg-white/[0.02] p-4 lg:col-span-2"
        >
          <p dir={dir} className={`mb-4 text-[10px] uppercase tracking-wider text-white/40 ${fa ? "font-fa" : ""}`}>
            {fa ? "خط زمانی نخ‌ها, ۰ تا ۱۰۰ms" : "Thread Timeline, 0 to 100ms"}
          </p>
          <div className="space-y-2">
            {threads.map((t, i) => (
              <div key={t.name} className="flex items-center gap-2">
                <span className="w-16 shrink-0 text-right font-mono text-[10px] text-white/50">
                  {t.name}
                </span>
                {/* Clip-path reveal with steps(), fills left→right */}
                <div
                  className="flex h-4 flex-1 gap-px"
                  style={{
                    clipPath: inView ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)", transition: inView
                      ? `clip-path 0.7s steps(20, end) ${i * 0.09}s`
                      : "none", }}
                >
                  {t.segments.map((s, j) => (
                    <div
                      key={j}
                      className={`flex-1 ${
                        s === 1
                          ? "bg-white"
                          : t.name === "gc"
                          ? "bg-white/10"
                          : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between font-mono text-[9px] text-white/30">
            <span>0ms</span><span>50ms</span><span>100ms</span>
          </div>
          <div className="mt-4 flex gap-6 text-[10px] text-white/50">
            <span className={`flex items-center gap-1.5 ${fa ? "font-fa" : ""}`} dir={dir}>
              <span className="inline-block h-2 w-4 bg-white" /> {fa ? "در حال اجرا" : "running"}
            </span>
            <span className={`flex items-center gap-1.5 ${fa ? "font-fa" : ""}`} dir={dir}>
              <span className="inline-block h-2 w-4 bg-white/20" /> {fa ? "در انتظار" : "waiting"}
            </span>
          </div>
        </motion.div>

        {/* Runtime specs */}
        <motion.div variants={itemReveal} className="border border-white/20 bg-white/[0.02] p-4">
          <p dir={dir} className={`mb-4 text-[10px] uppercase tracking-wider text-white/40 ${fa ? "font-fa" : ""}`}>{fa ? "مشخصات زمان اجرا" : "Runtime Specs"}</p>
          {[
            [fa ? "مدل" : "Model", fa ? "ترکیب CSP + Actor" : "CSP + Actor hybrid"], [fa ? "نخ‌ها" : "Threads", fa ? "نخ‌های سبز M:N" : "M:N green threads"], [fa ? "کانال‌ها" : "Channels", fa ? "MPMC کران‌دار" : "bounded MPMC"], [fa ? "زمان‌بند" : "Scheduler", fa ? "کار-ربایی" : "work-stealing"], [fa ? "قفل‌ها" : "Locks", fa ? "۰ [امن]" : "0 [SAFE]"], [fa ? "زمینه‌ها" : "Contexts", fa ? "۶" : "6"], ].map(([k, v]) => (
            <div key={k} className="flex justify-between border-b border-white/10 py-1.5 text-xs last:border-0">
              <span dir={dir} className={`text-white/50 ${fa ? "font-fa" : ""}`}>{k}</span>
              <span dir={dir} className={`text-paper ${fa ? "font-fa" : ""}`}>{v}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </ModuleWrapper>
  );
}
