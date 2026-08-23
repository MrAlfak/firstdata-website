"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import { Decode } from "@/components/Decode";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";

export type ErrorAction = {
  href?: string;
  label: string;
  onClick?: () => void;
  primary?: boolean;
};

type Props = {
  code: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  prompt: string;
  actions: ErrorAction[];
  tone?: "default" | "danger" | "warn";
  detail?: string;
  art?: string;
  minHeight?: string;
  fa?: boolean;
  dir?: "ltr" | "rtl";
};

export default function ErrorTerminalLayout({
  code,
  eyebrow,
  title,
  subtitle,
  prompt,
  actions,
  tone = "default",
  detail,
  art,
  minHeight = "min-h-[70vh]",
  fa = false,
  dir = "ltr",
}: Props) {
  const [showDetail, setShowDetail] = useState(false);
  const [skin] = usePanelSkin();
  const ai = skin === "modern";

  const accent =
    tone === "danger" ? "text-red-400" : tone === "warn" ? "text-amber" : "text-term";

  const statusLabel =
    tone === "danger" ? "PANIC" : tone === "warn" ? "DEGRADED" : "NOTICE";

  const cleanEyebrow = eyebrow.replace(/^\/\/\s*/, "").replace(/^>\s*/, "").trim();

  if (ai) {
    return (
      <motion.section
        variants={moduleReveal}
        initial="hidden"
        animate="show"
        className={`relative flex ${minHeight} items-center overflow-hidden border-b border-paper/10 px-4 py-16 sm:px-6 lg:px-8`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              tone === "danger"
                ? "radial-gradient(ellipse 70% 50% at 50% 0%, rgb(255 90 90 / 0.06), transparent 70%)"
                : tone === "warn"
                  ? "radial-gradient(ellipse 70% 50% at 50% 0%, rgb(255 176 32 / 0.06), transparent 70%)"
                  : "radial-gradient(ellipse 70% 50% at 50% 0%, rgb(var(--c-accent) / 0.06), transparent 70%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-2xl text-center" dir={dir}>
          <motion.p variants={itemReveal} className={`ai-eyebrow mb-6 ${fa ? "font-iran" : "font-iran"}`}>
            {cleanEyebrow}
          </motion.p>

          <motion.p
            variants={itemReveal}
            className={`ai-display select-none text-6xl font-medium tracking-tight sm:text-7xl ${accent} ${fa ? "font-iran" : "font-iran"}`}
            dir="ltr"
          >
            {code}
          </motion.p>

          <motion.h1
            variants={itemReveal}
            className={`mt-6 text-2xl font-medium text-paper sm:text-3xl ${fa ? "font-iran" : "font-iran"}`}
          >
            {title}
          </motion.h1>

          <motion.p
            variants={itemReveal}
            className={`mx-auto mt-4 max-w-lg text-base leading-relaxed text-paper/55 ${fa ? "font-iran" : "font-iran"}`}
          >
            {subtitle}
          </motion.p>

          {(detail || art) && (
            <motion.div variants={itemReveal} className="mt-6">
              <button
                type="button"
                onClick={() => setShowDetail((v) => !v)}
                className={`text-xs text-paper/40 transition-colors hover:text-paper ${fa ? "font-iran" : "font-iran"}`}
              >
                {showDetail ? (fa ? "مخفی کردن جزئیات" : "Hide details") : fa ? "جزئیات بیشتر" : "More details"}
              </button>
              {showDetail && (
                <pre className="mt-3 max-h-40 overflow-auto rounded-xl border border-paper/10 bg-paper/[0.03] p-4 text-start text-[11px] leading-relaxed text-paper/45">
                  {detail ?? art}
                </pre>
              )}
            </motion.div>
          )}

          <motion.div variants={itemReveal} className="mt-10 flex flex-wrap justify-center gap-3">
            {actions.map((action) => {
              const primary = action.primary === true;
              const className = primary
                ? `rounded-xl bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-paper/90 ${fa ? "font-iran" : "font-iran"}`
                : `rounded-xl border border-paper/20 px-6 py-3 text-sm text-paper/60 transition-colors hover:border-paper/40 hover:text-paper ${fa ? "font-iran" : "font-iran"}`;

              if (action.onClick) {
                return (
                  <button key={action.label} type="button" onClick={action.onClick} className={className}>
                    {action.label}
                  </button>
                );
              }

              return (
                <a key={action.label} href={action.href ?? "/"} className={className}>
                  {action.label}
                </a>
              );
            })}
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      variants={moduleReveal}
      initial="hidden"
      animate="show"
      className={`relative flex ${minHeight} items-center overflow-hidden border-b border-paper/20 px-4 py-16 sm:px-6 lg:px-8`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            tone === "danger"
              ? "radial-gradient(ellipse 70% 50% at 50% 0%, rgb(255 90 90 / 0.08), transparent 70%)"
              : tone === "warn"
                ? "radial-gradient(ellipse 70% 50% at 50% 0%, rgb(255 176 32 / 0.08), transparent 70%)"
                : "radial-gradient(ellipse 70% 50% at 50% 0%, rgb(var(--c-accent) / 0.1), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-4xl">
        <motion.div
          variants={itemReveal}
          className="overflow-hidden rounded-sm border border-paper/20 bg-ink/40 shadow-[0_0_60px_-12px_rgb(var(--c-accent)/0.15)] backdrop-blur-sm"
        >
          <div className="flex items-center justify-between border-b border-paper/15 bg-paper/[0.03] px-4 py-2.5">
            <div className="flex items-center gap-2" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-term/60" />
            </div>
            <p className={`truncate text-[10px] text-paper/35 ${fa ? "font-fa" : "font-mono"}`}>
              first,data.runtime, {statusLabel}
            </p>
            <span className="font-mono text-[10px] text-paper/25" dir="ltr">
              errno/{code}
            </span>
          </div>

          <div className="grid gap-0 lg:grid-cols-[1fr_minmax(0,280px)]">
            <div className="border-b border-paper/10 p-6 sm:p-8 lg:border-b-0 lg:border-e lg:border-paper/10">
              <motion.p
                variants={itemReveal}
                dir={dir}
                className={`mb-5 text-[10px] tracking-wide text-paper/40 ${fa ? "font-fa" : "ascii"}`}
              >
                <Decode>{eyebrow}</Decode>
              </motion.p>

              <motion.div variants={itemReveal} className="flex flex-wrap items-end gap-4">
                <h1
                  className={`select-none font-pixel text-7xl leading-none tracking-tighter sm:text-8xl ${accent} [text-shadow:0_0_40px_rgb(var(--c-accent)/0.25)]`}
                  dir="ltr"
                >
                  {code}
                </h1>
                <div
                  className={`mb-2 flex gap-2 text-[9px] uppercase tracking-widest ${fa ? "font-fa" : "font-mono"}`}
                >
                  <span className="border border-paper/15 px-2 py-0.5 text-paper/40">{statusLabel}</span>
                  <span className="border border-term/25 px-2 py-0.5 text-term/70">recovery OK</span>
                </div>
              </motion.div>

              <motion.h2
                variants={itemReveal}
                dir={dir}
                className={`mt-5 text-xl font-normal text-paper sm:text-2xl ${fa ? "font-fa" : "font-pixel"}`}
              >
                {title}
              </motion.h2>

              <motion.p
                variants={itemReveal}
                dir={dir}
                className={`mt-3 max-w-lg text-sm leading-relaxed text-paper/55 sm:text-base ${fa ? "font-fa" : ""}`}
              >
                {subtitle}
              </motion.p>

              {(detail || art) && (
                <motion.div variants={itemReveal} className="mt-6">
                  <button
                    type="button"
                    onClick={() => setShowDetail((v) => !v)}
                    className={`text-[10px] uppercase tracking-wider text-paper/35 transition-colors hover:text-term ${fa ? "font-fa" : "font-mono"}`}
                  >
                    {showDetail ? "▾ hide trace" : "▸ show trace"}
                  </button>
                  {showDetail && (
                    <pre
                      className={`ascii mt-3 max-h-40 overflow-auto border border-paper/10 bg-paper/[0.02] p-3 text-[9px] leading-relaxed sm:text-[10px] ${
                        tone === "danger"
                          ? "text-red-300/55"
                          : tone === "warn"
                            ? "text-amber/70"
                            : "text-paper/45"
                      }`}
                    >
                      {detail ?? art}
                    </pre>
                  )}
                </motion.div>
              )}

              <motion.div variants={itemReveal} className="mt-8 flex flex-wrap gap-2" dir={dir}>
                {actions.map((action) => {
                  const primary = action.primary === true;
                  const className = primary
                    ? `group relative overflow-hidden border border-term/50 bg-term/[0.06] px-5 py-2.5 text-xs uppercase tracking-wider text-term transition-all duration-200 hover:border-term hover:bg-term/15 hover:shadow-[0_0_24px_-4px_rgb(var(--c-accent)/0.35)] ${fa ? "font-fa" : ""}`
                    : `border border-paper/20 px-5 py-2.5 text-xs uppercase tracking-wider text-paper/55 transition-colors duration-200 hover:border-paper/40 hover:text-paper ${fa ? "font-fa" : ""}`;

                  if (action.onClick) {
                    return (
                      <button key={action.label} type="button" onClick={action.onClick} className={className}>
                        {primary && (
                          <span
                            aria-hidden
                            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-term/10 to-transparent transition-transform duration-500 group-hover:translate-x-full"
                          />
                        )}
                        <span className="relative">{action.label}</span>
                      </button>
                    );
                  }

                  return (
                    <a key={action.label} href={action.href ?? "/"} className={className}>
                      {action.label}
                    </a>
                  );
                })}
              </motion.div>
            </div>

            <div className="hidden flex-col justify-between bg-paper/[0.02] p-5 lg:flex">
              <div className="font-mono text-[9px] leading-relaxed text-paper/30">
                <p className="text-term/50">$ dmesg, tail -n 6</p>
                <p className="mt-2 text-paper/25">
                  [{new Date().toISOString().slice(11, 19)}] kernel: page fault
                </p>
                <p className="text-paper/25">[{code}] handler invoked</p>
                <p className="text-paper/25">stack trace captured</p>
                <p className="text-term/40">→ awaiting user input</p>
              </div>
              <div className="mt-8 border-t border-paper/10 pt-4 font-mono text-[10px] text-paper/25">
                <span className={tone === "danger" ? "text-red-400/60" : "text-term/50"}>▸</span> {prompt}
                <span className="animate-blink ml-0.5 text-term/70">▮</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          variants={itemReveal}
          className="mt-6 text-center font-mono text-[10px] text-paper/20 lg:hidden"
        >
          <span className={tone === "danger" ? "text-red-400/50" : "text-term/50"}>▸</span> {prompt}
          <span className="animate-blink text-term/60">▮</span>
        </motion.p>
      </div>
    </motion.section>
  );
}
