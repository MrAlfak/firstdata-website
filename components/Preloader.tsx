"use client";

import { useLayoutEffect, useState } from "react";
import { motion } from "motion/react";
import { useTypewriter } from "@/motion/useTypewriter";
import { useT } from "@/i18n/LangProvider";
import { formatDigits } from "@/lib/i18n/digits";
import { getPreloaderCorner } from "@/lib/siteVersion";
import { FirstLoadAIBoot } from "@/components/crossing/FirstLoadAIBoot";
import { hasSeenModernFirstLoad } from "@/lib/crossing/session";

type Tone = "ok" | "error" | "accent" | "wait" | "success";

const toneClass: Record<Tone, string> = {
  ok: "text-paper/50",
  error: "text-red-500",
  accent: "text-paper",
  wait: "text-paper/30",
  success: "text-term",
};

type BootLine = { text: string; tone: Tone; gap: number };
type BootSkin = "modern" | "terminal";

type BootSnapshot = {
  id: number;
  wordmarkStarted: boolean;
  linesShown: number;
  percent: number;
  isComplete: boolean;
  exiting: boolean;
  hidden: boolean;
  skin: BootSkin;
};

type BootController = BootSnapshot & {
  listeners: Set<() => void>;
  timers: ReturnType<typeof setTimeout>[];
  raf: number;
  startedAt: number;
  exitAt: number;
};

const PANEL_SKIN_KEY = "fd-panel-skin";
const EXIT_SLIDE_MS = 550;

/** Survives React Strict Mode remounts. */
let boot: BootController | null = null;
let bootSeq = 0;

function notify() {
  if (!boot) return;
  boot.listeners.forEach((fn) => fn());
}

function resolveBootSkin(): BootSkin {
  try {
    const local = window.localStorage.getItem(PANEL_SKIN_KEY);
    if (local === "terminal" || local === "modern") return local;
  } catch {
    /* ignore */
  }
  const attr = document.documentElement.getAttribute("data-panel-skin");
  return attr === "terminal" ? "terminal" : "modern";
}

function seenKey(skin: BootSkin) {
  return `fd-preloader-seen:v3:${skin}`;
}

function migrateLegacySeen() {
  try {
    if (sessionStorage.getItem("fd-preloader-seen:v2:terminal") === "1") {
      if (!sessionStorage.getItem(seenKey("terminal"))) {
        sessionStorage.setItem(seenKey("terminal"), "1");
      }
    }
    sessionStorage.removeItem("fd-preloader-seen");
  } catch {
    /* ignore */
  }
}

function markSeen(skin: BootSkin) {
  try {
    sessionStorage.setItem(seenKey(skin), "1");
  } catch {
    /* ignore */
  }
}

function wasSeen(skin: BootSkin) {
  try {
    if (skin === "modern" && hasSeenModernFirstLoad()) return true;
    return sessionStorage.getItem(seenKey(skin)) === "1";
  } catch {
    return false;
  }
}

function lockSkin(skin: BootSkin) {
  const root = document.documentElement;
  root.setAttribute("data-panel-skin", skin);
  root.setAttribute("data-preloader", "active");
  root.setAttribute("data-preloader-skin", skin);
}

function unlockSkin() {
  const root = document.documentElement;
  root.removeAttribute("data-preloader");
  root.removeAttribute("data-preloader-skin");
}

function completeBoot(expectedId?: number) {
  if (!boot || boot.hidden) return;
  if (expectedId != null && boot.id !== expectedId) return;
  boot.hidden = true;
  boot.exiting = false;
  markSeen(boot.skin);
  unlockSkin();
  boot.timers.forEach(clearTimeout);
  cancelAnimationFrame(boot.raf);
  notify();
}

function startBoot(lines: BootLine[]): BootController {
  migrateLegacySeen();
  const skin = resolveBootSkin();

  if (
    boot &&
    !boot.hidden &&
    !boot.isComplete &&
    !boot.exiting &&
    boot.skin === skin
  ) {
    return boot;
  }

  if (boot) {
    boot.timers.forEach(clearTimeout);
    cancelAnimationFrame(boot.raf);
    boot.listeners.clear();
    boot = null;
  }

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const seen = wasSeen(skin);

  const next: BootController = {
    id: ++bootSeq,
    wordmarkStarted: false,
    linesShown: 0,
    percent: 0,
    isComplete: false,
    exiting: false,
    hidden: false,
    skin,
    listeners: new Set(),
    timers: [],
    raf: 0,
    startedAt: performance.now(),
    exitAt: 0,
  };
  boot = next;

  if (reduced || seen) {
    next.hidden = true;
    unlockSkin();
    document.documentElement.setAttribute("data-panel-skin", skin);
    if (skin === "modern") {
      try {
        sessionStorage.setItem(seenKey("modern"), "1");
      } catch {
        /* ignore */
      }
    }
    return next;
  }

  lockSkin(skin);

  // Modern: Identity Disc first-load (rendered by React via FirstLoadAIBoot).
  if (skin === "modern") {
    notify();
    return next;
  }

  // Terminal: typing boot (unchanged).
  const safeLines = Array.isArray(lines) && lines.length > 0 ? lines : [];
  let clock = 0;
  for (const line of safeLines) {
    clock += typeof line.gap === "number" ? line.gap : 100;
  }
  const exitAt = Math.max(clock + 1350, 2800);
  next.exitAt = exitAt;

  next.timers.push(
    setTimeout(() => {
      if (!boot || boot !== next || next.hidden) return;
      next.wordmarkStarted = true;
      notify();
    }, 200),
  );

  let acc = 0;
  safeLines.forEach((line, i) => {
    acc += typeof line.gap === "number" ? line.gap : 100;
    const at = acc;
    next.timers.push(
      setTimeout(() => {
        if (!boot || boot !== next || next.hidden) return;
        next.linesShown = i + 1;
        notify();
      }, at),
    );
  });

  const fillDur = Math.max(exitAt - 250, 1200);
  const steps = 20;
  const t0 = performance.now();
  const tick = (now: number) => {
    if (!boot || boot !== next || next.hidden) return;
    const p = Math.min(1, (now - t0) / fillDur);
    next.percent = Math.floor(p * steps) * 5;
    notify();
    if (p < 1) next.raf = requestAnimationFrame(tick);
    else {
      next.percent = 100;
      notify();
    }
  };
  next.raf = requestAnimationFrame(tick);

  next.timers.push(
    setTimeout(() => {
      if (!boot || boot !== next || next.hidden) return;
      next.exiting = true;
      notify();
    }, exitAt),
  );

  next.timers.push(
    setTimeout(() => {
      if (!boot || boot !== next || next.hidden) return;
      completeBoot(next.id);
    }, exitAt + EXIT_SLIDE_MS),
  );

  return next;
}

function snapshotOf(controller: BootController): BootSnapshot {
  return {
    id: controller.id,
    wordmarkStarted: controller.wordmarkStarted,
    linesShown: controller.linesShown,
    percent: controller.percent,
    isComplete: controller.isComplete,
    exiting: controller.exiting,
    hidden: controller.hidden,
    skin: controller.skin,
  };
}

/**
 * First-load preloader. Terminal/modern are separate one-shots per session.
 * Skin is locked for the boot so terminal typing stays visible.
 */
export default function Preloader() {
  const { fa, d, t } = useT();
  const lines = d.preloader.lines as BootLine[];

  const [snap, setSnap] = useState<BootSnapshot | null>(null);

  useLayoutEffect(() => {
    // Embed frames (e.g. Spline hero iframe) must not lock parent-style boot chrome.
    if (window.location.pathname.startsWith("/embed")) {
      unlockSkin();
      return;
    }
    const controller = startBoot(lines);
    const sync = () => setSnap(snapshotOf(controller));
    controller.listeners.add(sync);
    sync();
    return () => {
      controller.listeners.delete(sync);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const welcome = d.preloader.welcome;
  const wordmark = useTypewriter(fa ? `> ${welcome}` : welcome, {
    start: !!snap?.wordmarkStarted && !snap.hidden && snap.skin === "terminal",
    speed: 50,
  });

  if (!snap || snap.hidden) return null;

  if (snap.skin === "modern") {
    return (
      <FirstLoadAIBoot
        locale={fa ? "fa" : "en"}
        status={d.crossing.assemble}
        ready={d.crossing.ready}
        enabled
        onDone={() => completeBoot(snap.id)}
      />
    );
  }

  const printing = snap.linesShown > 0 && snap.linesShown < lines.length;

  return (
    <motion.div
      dir={fa ? "rtl" : "ltr"}
      className="preloader-root fixed inset-0 z-[9999] flex flex-col justify-center bg-ink px-8 text-paper sm:px-16"
      animate={snap.exiting ? { x: "100%" } : { x: 0 }}
      initial={{ x: 0 }}
      transition={{ duration: EXIT_SLIDE_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
    >
      <p className="preloader-only-term absolute left-5 top-5 font-mono text-[10px] uppercase tracking-widest text-paper/25">
        {getPreloaderCorner(fa ? "fa" : "en")}
      </p>

      <div className="mb-10 min-h-[4rem] sm:min-h-[6rem]">
        <p
          dir={fa ? "rtl" : "ltr"}
          className={`preloader-only-term text-5xl leading-none tracking-tight sm:text-7xl md:text-8xl ${
            fa ? "font-fa" : "font-pixel"
          }`}
          aria-label={t("hero.brand")}
        >
          {wordmark}
          {snap.wordmarkStarted && snap.linesShown === 0 && (
            <span className="animate-blink ml-1">▮</span>
          )}
        </p>
      </div>

      <div
        dir={fa ? "rtl" : "ltr"}
        className={`preloader-only-term mb-6 max-h-[55vh] overflow-hidden text-[10px] leading-snug sm:text-xs ${
          fa ? "font-fa text-right" : "ascii text-left"
        }`}
      >
        {lines.slice(0, snap.linesShown).map((l, i) => (
          <div key={i} className={toneClass[l.tone]}>
            {l.text}
            {printing && i === snap.linesShown - 1 && <span className="animate-blink"> ▮</span>}
          </div>
        ))}
      </div>

      <div className="absolute bottom-16 left-1/2 w-4/5 -translate-x-1/2">
        <div className="preloader-only-term mb-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-term/70">
          <span className={fa ? "font-fa" : ""}>{d.preloader.deploying}</span>
          <span>{formatDigits(snap.percent, fa)}%</span>
        </div>
        <div className="preloader-only-term h-4 w-full overflow-hidden border border-term/20 bg-term/5">
          <div
            className="h-full bg-term/30"
            style={{ width: `${snap.percent}%`, transition: "width 0.4s linear" }}
          />
        </div>
      </div>

      <p className="preloader-only-term absolute bottom-5 right-5 font-mono text-[10px] text-paper/20">
        {d.preloader.bottom}
      </p>
    </motion.div>
  );
}
