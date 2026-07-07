"use client";

import { useState, useEffect, useRef } from "react";
import { scheduleUpdate } from "@/lib/react/schedule-update";
import { motion, useInView } from "motion/react";
import ModuleWrapper, { itemReveal } from "@/components/ModuleWrapper";
import { Decode } from "@/components/Decode";
import { useT } from "@/i18n/LangProvider";

const STAGES = [
  { id: 0, label: "VERTEX SHADER", sub: "clip·mvp" }, { id: 1, label: "RASTERIZER", sub: "fragments" }, { id: 2, label: "FRAGMENT", sub: "shade"     }, { id: 3, label: "TEXTURE", sub: "sample"    }, { id: 4, label: "BLEND/DEPTH", sub: "merge"     }, { id: 5, label: "FRAMEBUFFER", sub: "output"    }, ];

const PULSE_INTERVAL = Math.round(2500 / STAGES.length);

export default function GraphicsPipelinesSection() {
  const { t, fa, dir, fd } = useT();
  const [activeStage, setActiveStage] = useState(-1);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-20% 0px" });

  // Signal pulse, starts when section enters view
  useEffect(() => {
    if (!inView) return;
    scheduleUpdate(() => setActiveStage(0));
    const id = setInterval(() => {
      setActiveStage((s) => (s + 1) % STAGES.length);
    }, PULSE_INTERVAL);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <ModuleWrapper id="module-05" number="05" eyebrow="graphics-pipelines">
      <motion.div variants={itemReveal} className="mb-8 flex items-start justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <Decode as="span" className="font-pixel text-2xl text-white/40" duration={300}>05</Decode>
          <div>
            <Decode as="h2" dir={dir} className={`text-xl uppercase tracking-wide sm:text-2xl ${fa ? "font-fa" : "font-pixel"}`}>
              {t("modules.05.title")}
            </Decode>
            <p dir={dir} className={`mt-2 max-w-md text-sm text-white/60 ${fa ? "font-fa" : ""}`}>
              {t("modules.05.subtitle")}
            </p>
          </div>
        </div>
        <span className="border border-white/30 px-2 py-1 text-[10px] uppercase tracking-wider text-white/50">
          GPU
        </span>
      </motion.div>

      <div ref={ref} className="grid gap-4 lg:grid-cols-2">
        {/* Signal pulse, pipeline stages */}
        <motion.div variants={itemReveal} className="border border-white/20 bg-white/[0.02] p-4">
          <p dir={dir} className={`mb-1 text-[10px] uppercase tracking-wider text-white/40 ${fa ? "font-fa" : ""}`}>
            {fa ? "سیگنال, شکل‌موج GPU" : "SIGNAL, GPU WAVEFORM"}
          </p>
          <p className="mb-6 font-mono text-[9px] text-white/25">[VBO] → stages → [FB]  linear, 2.5s loop</p>

          <div className="flex flex-col gap-2">
            {STAGES.map((s) => (
              <div
                key={s.id}
                className={`flex items-center justify-between border px-3 py-2 transition-colors duration-200 ${
                  activeStage === s.id
                    ? "border-paper bg-paper text-ink"
                    : "border-white/20 text-white/50"
                }`}
              >
                <span className="font-pixel text-xs uppercase">{s.label}</span>
                <span className="font-mono text-[9px] opacity-60">{s.sub}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pipeline specs */}
        <motion.div variants={itemReveal} className="border border-white/20 bg-white/[0.02] p-4">
          <p dir={dir} className={`mb-4 text-[10px] uppercase tracking-wider text-white/40 ${fa ? "font-fa" : ""}`}>{fa ? "مشخصات خط لوله" : "Pipeline Specs"}</p>
          {[
            ["API", "Vulkan / WebGPU"], [fa ? "سایه‌زنی" : "Shading", fa ? "PBR (مبتنی بر فیزیک)" : "PBR (physically based)"], [fa ? "وضوح" : "Resolution", fa ? fd("4K @ 120Hz") : "4K @ 120Hz"], [fa ? "فراخوان‌های ترسیم" : "Draw Calls", fa ? "< ۱٬۰۰۰ / فریم" : "< 1,000 / frame"], ["AA", fa ? fd("MSAA 4x") : "MSAA 4x"], [fa ? "حذف" : "Culling", fa ? "فراستوم + انسداد" : "frustum + occlusion"], [fa ? "وضعیت" : "Status", "[OK]"], ].map(([k, v]) => (
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
