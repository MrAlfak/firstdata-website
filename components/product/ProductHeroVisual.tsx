"use client";

import { motion } from "motion/react";
import { itemReveal } from "@/motion/tokens";
import type { ProductSlug } from "@/i18n/product-page";

type Accent = { border: string; text: string; glow: string };

const accentMap: Record<ProductSlug, Accent> = {
  web: { border: "border-paper/35", text: "text-paper", glow: "from-paper/10" },
  mobile: { border: "border-term/40", text: "text-term", glow: "from-term/10" },
  windows: { border: "border-sky/40", text: "text-sky", glow: "from-sky/10" },
  ai: { border: "border-violet/40", text: "text-violet", glow: "from-violet/10" },
  platforms: { border: "border-emerald/40", text: "text-emerald", glow: "from-emerald/10" },
};

function Block({ className = "", pulse = false }: { className?: string; pulse?: boolean }) {
  return (
    <div
      className={`rounded-sm bg-paper/[0.06] ${pulse ? "product-demo-pulse" : ""} ${className}`}
      aria-hidden
    />
  );
}

function WebVisual({ accent, animated }: { accent: Accent; animated?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-sm border bg-paper/[0.02] ${accent.border}`}>
      <div className="flex items-center gap-2 border-b border-paper/10 bg-paper/[0.03] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5a5a]/70" />
        <span className="h-2 w-2 rounded-full bg-[#ffb020]/70" />
        <span className="h-2 w-2 rounded-full bg-term/50" />
        <span className="ms-auto font-mono text-[9px] text-paper/35" dir="ltr">
          firstdata.ir/dashboard
        </span>
      </div>
      <div className="space-y-2 p-4">
        <Block className="h-3 w-2/3" pulse={animated} />
        <div className="grid grid-cols-3 gap-2 pt-1">
          <Block className="h-16" pulse={animated} />
          <Block className="h-16" pulse={animated} />
          <Block className="h-16" pulse={animated} />
        </div>
        <Block className="h-20 w-full" pulse={animated} />
      </div>
    </div>
  );
}

function MobileVisual({ accent, animated }: { accent: Accent; animated?: boolean }) {
  return (
    <div className="mx-auto max-w-[220px]">
      <div className={`overflow-hidden rounded-[1.25rem] border-2 bg-paper/[0.02] p-2 ${accent.border}`}>
        <div className="overflow-hidden rounded-[0.9rem] border border-paper/10 bg-[#080c08]">
          <div className="flex justify-center py-1.5">
            <span className="h-1 w-10 rounded-full bg-paper/15" />
          </div>
          <div className="space-y-2 px-3 pb-4 pt-1">
            <Block className="h-2 w-1/2 bg-term/20" pulse={animated} />
            <Block className="h-14 w-full" pulse={animated} />
            <Block className="h-8 w-full" pulse={animated} />
            <div className="flex gap-2 pt-1">
              <Block className="h-8 flex-1 bg-term/15" pulse={animated} />
              <Block className="h-8 flex-1" pulse={animated} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WindowsVisual({ accent, animated }: { accent: Accent; animated?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-sm border bg-paper/[0.02] ${accent.border}`}>
      <div className="flex items-center justify-between border-b border-paper/10 bg-paper/[0.04] px-3 py-1.5">
        <span className={`font-mono text-[9px] ${accent.text}`}>FirstData.LOB.exe</span>
        <span className="font-mono text-[9px] text-paper/30">— □ ×</span>
      </div>
      <div className="grid grid-cols-[120px_1fr] gap-0">
        <div className="space-y-1.5 border-e border-paper/10 p-3">
          <Block className="h-2 w-full" pulse={animated} />
          <Block className="h-2 w-4/5" pulse={animated} />
          <Block className="h-2 w-full bg-sky/15" pulse={animated} />
          <Block className="h-2 w-3/5" pulse={animated} />
        </div>
        <div className="space-y-2 p-3">
          <Block className="h-3 w-1/2" pulse={animated} />
          <Block className="h-24 w-full" pulse={animated} />
          <div className="flex justify-end gap-2">
            <Block className="h-6 w-14 bg-sky/20" pulse={animated} />
            <Block className="h-6 w-14" pulse={animated} />
          </div>
        </div>
      </div>
    </div>
  );
}

function AiVisual({ accent, animated }: { accent: Accent; animated?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-sm border bg-[#080c08] font-mono text-[11px] ${accent.border}`}>
      <div className="border-b border-violet/15 px-3 py-2 text-violet/45">ai-assistant v1</div>
      <div className={`space-y-2 p-4 text-paper/55 ${animated ? "product-demo-type" : ""}`} dir="ltr">
        <p><span className="text-violet/70">user&gt;</span> summarize ticket #4821</p>
        <p><span className="text-term/70">sys&gt;</span> retrieving context… 3 docs</p>
        <p className="text-paper/75"><span className="text-violet/70">ai&gt;</span> Customer asked about SLA — draft ready.</p>
        <p className="text-paper/30 product-demo-cursor">█</p>
      </div>
    </div>
  );
}

function PlatformsVisual({ accent, animated }: { accent: Accent; animated?: boolean }) {
  const nodes = ["Web", "Mobile", "Admin", "API"];
  return (
    <div className={`relative overflow-hidden rounded-sm border bg-paper/[0.02] p-6 ${accent.border}`}>
      <div className="relative grid grid-cols-2 gap-4">
        {nodes.map((label, i) => (
          <div
            key={label}
            className={`flex items-center justify-center border bg-paper/[0.03] px-3 py-4 font-mono text-[10px] uppercase tracking-wider ${accent.border} ${accent.text} ${animated ? "product-demo-node" : ""}`}
            style={animated ? { animationDelay: `${i * 0.35}s` } : undefined}
          >
            {label}
          </div>
        ))}
      </div>
      <div className={`relative mt-4 border-t pt-3 text-center font-mono text-[9px] uppercase tracking-widest ${accent.text}`}>
        SSO · Unified API · Queue
      </div>
    </div>
  );
}

type Props = { slug: ProductSlug; animated?: boolean };

export default function ProductHeroVisual({ slug, animated = false }: Props) {
  const accent = accentMap[slug];

  return (
    <motion.div
      variants={itemReveal}
      className={`relative w-full bg-gradient-to-br to-transparent p-1 ${accent.glow}`}
    >
      {slug === "web" && <WebVisual accent={accent} animated={animated} />}
      {slug === "mobile" && <MobileVisual accent={accent} animated={animated} />}
      {slug === "windows" && <WindowsVisual accent={accent} animated={animated} />}
      {slug === "ai" && <AiVisual accent={accent} animated={animated} />}
      {slug === "platforms" && <PlatformsVisual accent={accent} animated={animated} />}
    </motion.div>
  );
}
