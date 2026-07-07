"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import ModuleWrapper, { itemReveal } from "@/components/ModuleWrapper";
import { Decode } from "@/components/Decode";
import { useScramble } from "@/motion/useScramble";
import { useT } from "@/i18n/LangProvider";

const registers = [
  { name: "RAX", value: "0x00007FFE4B3C2A10", desc: "accumulator", descFa: "انباشتگر"        }, { name: "RBX", value: "0x0000000000000001", desc: "base", descFa: "پایه"            }, { name: "RCX", value: "0x00007FFE4B3C2A08", desc: "counter", descFa: "شمارنده"         }, { name: "RDX", value: "0x0000000000000000", desc: "data", descFa: "داده"            }, { name: "RSP", value: "0x00007FFE4B3C29E0", desc: "stack ptr", descFa: "اشاره‌گر پشته"   }, { name: "RBP", value: "0x00007FFE4B3C2A20", desc: "base ptr", descFa: "اشاره‌گر پایه"   }, { name: "RIP", value: "0x000000014000159C", desc: "instr ptr", descFa: "اشاره‌گر دستور"  }, { name: "RFLAGS", value: "0x0000000000000246", desc: "flags", descFa: "پرچم‌ها"         }, ];

const layers = [
  { level: "L4", label: "APPLICATION LOGIC", labelFa: "منطق برنامه" }, { level: "L3", label: "FRAMEWORK", labelFa: "فریم‌ورک" }, { level: "L2", label: "HAL, driver interface", labelFa: "HAL, رابط درایور" }, { level: "L1", label: "REGISTERS, 0x40021000", labelFa: "رجیسترها, 0x40021000" }, { level: "L0", label: "SILICON, gpio, timer, uart", labelFa: "سیلیکون, gpio, timer, uart" }, ];

function ScrambleHex({ value, active, delay }: { value: string; active: boolean; delay: number }) {
  const [started, setStarted] = useState(false);
  const text = useScramble(value, { start: started, duration: 300 });

  // Start scramble after stagger delay when active
  useState(() => {
    if (!active) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  });

  if (!started && active) {
    // kick off on first render when active
    setTimeout(() => setStarted(true), delay);
  }

  return <span className="font-mono text-[10px]">{text}</span>;
}

export default function HardwareAbstractionSection() {
  const { t, fa, dir } = useT();
  const [selected, setSelected] = useState<string | null>(null);
  const layersRef = useRef(null);
  const regsRef   = useRef(null);
  const layersInView = useInView(layersRef, { once: true, margin: "-15% 0px" });
  const regsInView   = useInView(regsRef, { once: true, margin: "-15% 0px" });

  const reg = registers.find((r) => r.name === selected);

  return (
    <ModuleWrapper id="module-08" number="08" eyebrow="hardware-abstraction">
      <motion.div variants={itemReveal} className="mb-8 flex items-start justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <Decode as="span" className="font-pixel text-2xl text-white/40" duration={300}>08</Decode>
          <div>
            <Decode as="h2" dir={dir} className={`text-xl uppercase tracking-wide sm:text-2xl ${fa ? "font-fa" : "font-pixel"}`}>
              {t("modules.08.title")}
            </Decode>
            <p dir={dir} className={`mt-2 max-w-md text-sm text-white/60 ${fa ? "font-fa" : ""}`}>
              {t("modules.08.subtitle")}
            </p>
          </div>
        </div>
        <span className="border border-white/30 px-2 py-1 text-[10px] uppercase tracking-wider text-white/50">
          HAL
        </span>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Register file */}
        <motion.div ref={regsRef} variants={itemReveal} className="border border-white/20 bg-white/[0.02] p-4">
          <p dir={dir} className={`mb-4 text-[10px] uppercase tracking-wider text-white/40 ${fa ? "font-fa" : ""}`}>
            {fa ? "رجیسترهای پردازنده, برای بازرسی کلیک کنید" : "CPU Registers, click to inspect"}
          </p>
          <div className="space-y-1">
            {registers.map((r, i) => (
              <motion.button
                key={r.name}
                initial={{ opacity: 0, x: -8 }}
                animate={regsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ delay: i * 0.06, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => setSelected(selected === r.name ? null : r.name)}
                className={`flex w-full items-center justify-between px-2 py-1.5 text-left transition-colors duration-200 ${
                  selected === r.name ? "bg-paper text-ink" : "hover:bg-white/5"
                }`}
              >
                <span className="w-16 shrink-0 font-pixel text-xs">{r.name}</span>
                <ScrambleHex value={r.value} active={regsInView} delay={i * 60} />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Layer stack + inspector */}
        <div className="flex flex-col gap-4">
          {/* L4→L0 drill-down */}
          <motion.div ref={layersRef} variants={itemReveal} className="border border-white/20 bg-white/[0.02] p-4">
            <p dir={dir} className={`mb-4 text-[10px] uppercase tracking-wider text-white/40 ${fa ? "font-fa" : ""}`}>
              {fa ? "لایه‌های انتزاع" : "Abstraction Layers"}
            </p>
            {layers.map((l, i) => (
              <motion.div
                key={l.level}
                initial={{ opacity: 0, y: -6 }}
                animate={layersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="flex items-center gap-4 border-b border-white/10 py-2 text-xs last:border-0"
              >
                <span className="w-6 shrink-0 font-pixel text-white/40">{l.level}</span>
                <span dir={dir} className={`flex-1 text-white/70 ${fa ? "font-fa" : ""}`}>{fa ? l.labelFa : l.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Register inspector */}
          <motion.div variants={itemReveal} className="border border-white/20 bg-white/[0.02] p-4">
            <p dir={dir} className={`mb-3 text-[10px] uppercase tracking-wider text-white/40 ${fa ? "font-fa" : ""}`}>
              {reg
                ? fa ? `رجیستر ${reg.name}` : `Register ${reg.name}`
                : fa ? "بازرس رجیستر" : "Register Inspector"}
            </p>
            {reg ? (
              <div className="space-y-2 text-xs">
                <div>
                  <span dir={dir} className={`text-white/40 ${fa ? "font-fa" : ""}`}>{fa ? "مقدار" : "Value"}</span>
                  <div className="mt-1 font-mono" dir="ltr">{reg.value}</div>
                </div>
                <div>
                  <span dir={dir} className={`text-white/40 ${fa ? "font-fa" : ""}`}>{fa ? "نقش" : "Role"}</span>
                  <div dir={dir} className={`mt-1 ${fa ? "font-fa" : ""}`}>{fa ? reg.descFa : reg.desc}</div>
                </div>
                <div>
                  <span dir={dir} className={`text-white/40 ${fa ? "font-fa" : ""}`}>{fa ? "رابط" : "Interface"}</span>
                  <div className="mt-1" dir="ltr">MMIO / PIO &nbsp; PCIe Gen5 x16</div>
                </div>
              </div>
            ) : (
              <p dir={dir} className={`text-[11px] text-white/30 ${fa ? "font-fa" : ""}`}>
                {fa ? "برای بازرسی مقدار و نقش، روی یک رجیستر کلیک کنید." : "Click a register to inspect its value and role."}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </ModuleWrapper>
  );
}
