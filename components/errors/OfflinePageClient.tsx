"use client";

import { useEffect, useRef, useState } from "react";
import { scheduleUpdate } from "@/lib/react/schedule-update";
import Link from "next/link";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import { Decode } from "@/components/Decode";
import { useT } from "@/i18n/LangProvider";

const LINE_DELAY_MS = 380;

function StatusBadge({
  label,
  value,
  tone,
  fa,
}: {
  label: string;
  value: string;
  tone: "danger" | "warn" | "ok";
  fa: boolean;
}) {
  const toneClass =
    tone === "danger"
      ? "border-red-500/30 bg-red-500/[0.06] text-red-300/80"
      : tone === "warn"
        ? "border-amber/30 bg-amber/[0.06] text-amber/80"
        : "border-term/30 bg-term/[0.06] text-term/80";

  return (
    <div className={`border px-3 py-2 ${toneClass}`}>
      <p className={`text-[9px] uppercase tracking-widest opacity-70 ${fa ? "font-fa" : "font-mono"}`}>
        {label}
      </p>
      <p className={`mt-1 text-xs ${fa ? "font-fa" : "font-mono uppercase tracking-wide"}`}>{value}</p>
    </div>
  );
}

export default function OfflinePageClient() {
  const { fa, dir, d } = useT();
  const page = d.errors.pages.offline;
  const ui = d.errors.offlineUi;

  const [lines, setLines] = useState<string[]>([]);
  const [typingDone, setTypingDone] = useState(false);
  const [online, setOnline] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    scheduleUpdate(() => setOnline(typeof navigator !== "undefined" && navigator.onLine));

    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    scheduleUpdate(() => {
      setLines([]);
      setTypingDone(false);
    });

    ui.terminalLines.forEach((line, index) => {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, line]);
        if (index === ui.terminalLines.length - 1) {
          setTypingDone(true);
        }
      }, (index + 1) * LINE_DELAY_MS);
      timers.current.push(timer);
    });

    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, [fa, ui.terminalLines]);

  const retry = () => window.location.reload();

  return (
    <motion.section
      variants={moduleReveal}
      initial="hidden"
      animate="show"
      className="border-b border-paper/20 px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Terminal panel */}
          <motion.div variants={itemReveal} className="lg:col-span-7">
            <div className="overflow-hidden border border-paper/15 bg-paper/[0.015]">
              <div className="flex items-center justify-between gap-3 border-b border-paper/10 bg-paper/[0.03] px-3 py-2 sm:px-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full border border-amber/40 bg-amber/20" />
                  <span className="h-2 w-2 rounded-full border border-paper/30" />
                  <span className="h-2 w-2 rounded-full border border-paper/30" />
                </div>
                <span className={`text-[10px] uppercase tracking-wider text-paper/35 ${fa ? "font-fa" : "font-mono"}`}>
                  {ui.tabTitle}
                </span>
              </div>

              <div className="border-b border-paper/10 px-3 py-2 sm:px-4">
                <p className={`text-[10px] text-paper/40 ${fa ? "font-fa" : "font-mono"}`}>{ui.windowTitle}</p>
              </div>

              <div
                dir="ltr"
                className="min-h-[280px] overflow-x-auto p-4 font-mono text-[10px] leading-relaxed sm:min-h-[320px] sm:text-[11px]"
              >
                {lines.map((line, index) => {
                  const isTimeout = line.includes("timeout") || line.includes("100%");
                  const isStats = line.startsWith("---") || line.startsWith("4 packets");
                  return (
                    <div
                      key={`${line}-${index}`}
                      className={
                        isTimeout
                          ? "text-amber/75"
                          : isStats
                            ? "text-red-400/70"
                            : "text-paper/60"
                      }
                    >
                      {line}
                    </div>
                  );
                })}
                {!typingDone && (
                  <span className="mt-1 inline-block animate-blink text-term/70">▮</span>
                )}
              </div>

              <div className="flex items-center gap-2 border-t border-paper/10 px-3 py-2.5 sm:px-4">
                <span className="text-term/50">▸</span>
                <span className="font-mono text-[10px] text-paper/45">{page.prompt}</span>
                {typingDone && <span className="animate-blink text-term/60">▮</span>}
              </div>
            </div>
          </motion.div>

          {/* Content panel */}
          <motion.div variants={itemReveal} className="lg:col-span-5">
            <p
              dir={dir}
              className={`mb-3 text-[10px] text-amber/70 ${fa ? "font-fa" : "ascii"}`}
            >
              <Decode>{page.eyebrow}</Decode>
            </p>

            <div className="mb-4 flex flex-wrap items-end gap-3">
              <h1 className="font-pixel text-5xl tracking-tight text-amber sm:text-6xl" dir="ltr">
                NET
              </h1>
              <span className={`border border-amber/25 bg-amber/[0.06] px-2 py-1 text-[10px] text-amber/80 ${fa ? "font-fa" : "font-mono uppercase tracking-wider"}`}>
                {ui.codeLabel}
              </span>
            </div>

            <h2
              dir={dir}
              className={`text-xl font-medium tracking-tight text-paper sm:text-2xl ${fa ? "font-fa" : "font-pixel"}`}
            >
              {page.title}
            </h2>

            <p
              dir={dir}
              className={`mt-3 text-sm leading-relaxed text-paper/60 ${fa ? "font-fa" : ""}`}
            >
              {page.subtitle}
            </p>

            {online && (
              <div
                dir={dir}
                className={`mt-4 border border-term/25 bg-term/[0.06] px-3 py-2 text-xs text-term/85 ${fa ? "font-fa" : "font-mono"}`}
              >
                {ui.onlineRestored}
              </div>
            )}

            <div className="mt-6 grid grid-cols-3 gap-2">
              <StatusBadge label={ui.statusNet} value={ui.statusOffline} tone="danger" fa={fa} />
              <StatusBadge label={ui.statusDns} value={ui.statusUnavailable} tone="warn" fa={fa} />
              <StatusBadge label={ui.statusCache} value={ui.statusAvailable} tone="ok" fa={fa} />
            </div>

            <div className="mt-8 flex flex-wrap gap-3" dir={dir}>
              <button
                type="button"
                onClick={retry}
                className={`border border-paper bg-paper/5 px-5 py-2.5 text-xs uppercase tracking-wider text-paper transition-colors duration-200 hover:bg-paper hover:text-ink ${fa ? "font-fa" : ""}`}
              >
                {page.ctaRetry}
              </button>
              <Link
                href="/"
                className={`border border-paper/30 px-5 py-2.5 text-xs uppercase tracking-wider text-paper/70 transition-colors duration-200 hover:border-paper hover:text-paper ${fa ? "font-fa" : ""}`}
              >
                {page.ctaHome}
              </Link>
              <Link
                href="/contactus"
                className={`border border-paper/30 px-5 py-2.5 text-xs uppercase tracking-wider text-paper/70 transition-colors duration-200 hover:border-paper hover:text-paper ${fa ? "font-fa" : ""}`}
              >
                {page.ctaContact}
              </Link>
            </div>

            <div className="mt-8 border border-paper/10 bg-paper/[0.015] p-4 sm:p-5">
              <h3 className={`text-xs uppercase tracking-wider text-paper/50 ${fa ? "font-fa" : "font-mono"}`}>
                {ui.checklistTitle}
              </h3>
              <ul className={`mt-3 space-y-2 ${fa ? "font-fa" : ""}`}>
                {ui.checklist.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-paper/55">
                    <span className="mt-0.5 shrink-0 font-mono text-term/55">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className={`mt-4 text-[10px] text-paper/30 ${fa ? "font-fa" : "font-mono"}`}>
                {ui.lastSync}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
