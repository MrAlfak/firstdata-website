"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import ModuleWrapper, { itemReveal } from "@/components/ModuleWrapper";
import { Decode } from "@/components/Decode";
import { useCountUp } from "@/motion/useCountUp";
import { useT } from "@/i18n/LangProvider";

const nodes = [
  { id: "A", x: 20, y: 10 }, { id: "B", x: 60, y: 5  }, { id: "C", x: 90, y: 20 }, { id: "D", x: 95, y: 55 }, { id: "E", x: 75, y: 85 }, { id: "F", x: 35, y: 90 }, { id: "G", x: 8, y: 65 }, { id: "H", x: 10, y: 35 }, ];

const edges = [
  ["A","B"],["A","H"],["B","C"],["C","D"], ["D","E"],["E","F"],["F","G"],["G","H"], ["A","G"],["B","E"],["C","F"],["H","D"],["G","D"],["A","E"], ] as const;

const nodeMetrics: Record<string, { rtt: string; load: string; status: string }> = {
  A: { rtt: "2.1ms", load: "34%", status: "ONLINE"  }, B: { rtt: "4.8ms", load: "71%", status: "ONLINE"  }, C: { rtt: "1.9ms", load: "22%", status: "ONLINE"  }, D: { rtt: "6.2ms", load: "88%", status: "ONLINE"  }, E: { rtt: "3.3ms", load: "45%", status: "OFFLINE" }, F: { rtt: "2.7ms", load: "19%", status: "ONLINE"  }, G: { rtt: "5.0ms", load: "63%", status: "ONLINE"  }, H: { rtt: "1.4ms", load: "11%", status: "ONLINE"  }, };

function edgeLen(a: string, b: string) {
  const n1 = nodes.find((n) => n.id === a)!;
  const n2 = nodes.find((n) => n.id === b)!;
  return Math.sqrt((n2.x - n1.x) ** 2 + (n2.y - n1.y) ** 2);
}

export default function NetworkTopologySection() {
  const { t, fa, dir, fd } = useT();
  const [selected, setSelected] = useState<string | null>(null);
  const svgRef = useRef(null);
  const inView  = useInView(svgRef, { once: true, margin: "-15% 0px" });

  const throughput  = useCountUp(9.2, { start: inView, decimals: 1 });
  const latency     = useCountUp(8.4, { start: inView, decimals: 1 });
  const packetLoss  = useCountUp(0.001, { start: inView, decimals: 3 });

  const getCoord = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <ModuleWrapper id="module-02" number="02" eyebrow="network-topologies">
      <motion.div variants={itemReveal} className="mb-8 flex items-start justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <Decode as="span" className="font-pixel text-2xl text-white/40" duration={300}>02</Decode>
          <div>
            <Decode as="h2" dir={dir} className={`text-xl uppercase tracking-wide sm:text-2xl ${fa ? "font-fa" : "font-pixel"}`}>
              {t("modules.02.title")}
            </Decode>
            <p dir={dir} className={`mt-2 max-w-md text-sm text-white/60 ${fa ? "font-fa" : ""}`}>
              {t("modules.02.subtitle")}
            </p>
          </div>
        </div>
        <span className="border border-white/30 px-2 py-1 text-[10px] uppercase tracking-wider text-white/50">
          MESH
        </span>
      </motion.div>

      <motion.div variants={itemReveal} className="grid gap-4 lg:grid-cols-3">
        {/* SVG topology */}
        <div className="border border-white/20 bg-white/[0.02] p-4 lg:col-span-2">
          <svg
            ref={svgRef}
            viewBox="0 0 110 100"
            className="w-full"
            style={{ fontFamily: "var(--font-stack-digits), var(--font-mono), monospace" }}
          >
            {/* Edges, draw on via strokeDashoffset */}
            {edges.map(([a, b], i) => {
              const from   = getCoord(a);
              const to     = getCoord(b);
              const len    = edgeLen(a, b);
              const active = selected === a || selected === b;
              return (
                <motion.line
                  key={`${a}-${b}`}
                  x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  stroke={active ? "#ffffff" : "#ffffff44"}
                  strokeWidth={active ? 0.6 : 0.3}
                  strokeDasharray={len}
                  initial={{ strokeDashoffset: len }}
                  animate={inView ? { strokeDashoffset: 0 } : { strokeDashoffset: len }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] }}
                />
              );
            })}

            {/* Nodes, appear after edges */}
            {nodes.map((n, i) => {
              const offline    = nodeMetrics[n.id].status === "OFFLINE";
              const isSelected = selected === n.id;
              return (
                <motion.g
                  key={n.id}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: edges.length * 0.06 + i * 0.04, duration: 0.3 }}
                  onClick={() => setSelected(isSelected ? null : n.id)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={n.x} cy={n.y} r={3.5}
                    fill={isSelected ? "#ffffff" : "#000000"}
                    stroke={offline ? "#ffffff33" : "#ffffff"}
                    strokeWidth={0.8}
                  />
                  <text
                    x={n.x} y={n.y - 5}
                    textAnchor="middle" fontSize={4}
                    fill={offline ? "#ffffff33" : isSelected ? "#ffffff" : "#ffffffaa"}
                  >
                    {n.id}
                  </text>
                  {/* LIVE dot */}
                  {!offline && (
                    <circle
                      cx={n.x + 2.8} cy={n.y - 2.8} r={0.9}
                      fill="#ffffff"
                      className="animate-pulse"
                    />
                  )}
                </motion.g>
              );
            })}
          </svg>
        </div>

        {/* Metrics + inspector */}
        <div className="flex flex-col gap-3">
          <div className="border border-white/20 bg-white/[0.02] p-4">
            <p dir={dir} className={`mb-3 text-[10px] uppercase tracking-wider text-white/40 ${fa ? "font-fa" : ""}`}>
              {fa ? "متریک‌های کلی" : "Global Metrics"}
            </p>
            {[
              [fa ? "گره‌های آنلاین" : "Nodes Online", fa ? fd("7 / 8") : "7 / 8"], [fa ? "توان عبوری" : "Throughput", fa ? fd(`${throughput} Gbps`) : `${throughput} Gbps`], [fa ? "تأخیر p99" : "Latency p99", fa ? fd(`${latency} ms`) : `${latency} ms`], [fa ? "اتلاف بسته" : "Packet Loss", fa ? fd(`${packetLoss}%`) : `${packetLoss}%`], [fa ? "پروتکل" : "Protocol", "TCP/IP"], [fa ? "توپولوژی" : "Topology", fa ? "مش ترکیبی" : "Hybrid Mesh"], ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-1 text-xs">
                <span dir={dir} className={`text-white/50 ${fa ? "font-fa" : ""}`}>{k}</span>
                <span className="font-mono text-paper">{v}</span>
              </div>
            ))}
          </div>

          <div className="border border-white/20 bg-white/[0.02] p-4">
            <p dir={dir} className={`mb-3 text-[10px] uppercase tracking-wider text-white/40 ${fa ? "font-fa" : ""}`}>
              {selected
                ? fa ? `بازرس گره ${selected}` : `Node ${selected}, Inspector`
                : fa ? "یک گره را انتخاب کنید" : "Select a node"}
            </p>
            {selected ? (
              <>
                {[
                  [fa ? "وضعیت" : "Status", nodeMetrics[selected].status], ["RTT", nodeMetrics[selected].rtt], [fa ? "بار پردازنده" : "CPU Load", nodeMetrics[selected].load], ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1 text-xs">
                    <span dir={dir} className={`text-white/50 ${fa ? "font-fa" : ""}`}>{k}</span>
                    <span className={v === "OFFLINE" ? "text-white/40" : "text-paper"}>
                      {fa && v === "ONLINE" ? "آنلاین" : fa && v === "OFFLINE" ? "آفلاین" : v}
                    </span>
                  </div>
                ))}
              </>
            ) : (
              <p dir={dir} className={`text-[11px] text-white/30 ${fa ? "font-fa" : ""}`}>
                {fa ? "برای بازرسی متریک‌ها روی هر گره کلیک کنید." : "Click any node to inspect its metrics."}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </ModuleWrapper>
  );
}
