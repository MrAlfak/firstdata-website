"use client";

import { scheduleUpdate } from "@/lib/react/schedule-update";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "motion/react";
import RouteLoadingShell from "@/components/navigation/RouteLoadingShell";
import { useT } from "@/i18n/LangProvider";

const MIN_VISIBLE_MS = 360;
const STEP_MS = 120;
const SAFETY_MS = 10_000;

function isModifiedClick(e: MouseEvent): boolean {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
}

function shouldSkipAnchor(anchor: HTMLAnchorElement): boolean {
  if (anchor.target === "_blank") return true;
  if (anchor.hasAttribute("download")) return true;
  if (anchor.dataset.skipNav === "true") return true;

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return true;
  }

  return false;
}

function resolveInternalPath(href: string): string | null {
  try {
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return null;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
}

function currentLocationKey(): string {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

export default function PageNavPreloader() {
  return (
    <Suspense fallback={null}>
      <PageNavPreloaderInner />
    </Suspense>
  );
}

function PageNavPreloaderInner() {
  const pathname = usePathname();
  const { fa, dir, lang, d } = useT();

  const [active, setActive] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [targetPath, setTargetPath] = useState("/");
  const [revealed, setRevealed] = useState(0);
  const [progress, setProgress] = useState(0);

  const startedAt = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safetyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRaf = useRef(0);
  const skipFirstRoute = useRef(true);
  const activeRef = useRef(false);

  const clearTimers = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (safetyTimer.current) clearTimeout(safetyTimer.current);
    if (stepTimer.current) clearInterval(stepTimer.current);
    cancelAnimationFrame(progressRaf.current);
    hideTimer.current = null;
    safetyTimer.current = null;
    stepTimer.current = null;
  }, []);

  const finish = useCallback(() => {
    activeRef.current = false;
    cancelAnimationFrame(progressRaf.current);
    setProgress(100);
    setRevealed(d.navPreloader.steps.length);
    setExiting(true);

    const elapsed = Date.now() - startedAt.current;
    const delay = Math.max(0, MIN_VISIBLE_MS - elapsed);

    hideTimer.current = setTimeout(() => {
      setActive(false);
      setExiting(false);
      setRevealed(0);
      setProgress(0);
    }, delay + 180);
  }, [d.navPreloader.steps.length]);

  const begin = useCallback(
    (path: string) => {
      if (document.documentElement.hasAttribute("data-preloader")) return;

      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      clearTimers();
      activeRef.current = true;
      startedAt.current = Date.now();
      setTargetPath(path);
      setRevealed(1);
      setProgress(8);
      setExiting(false);
      setActive(true);

      const steps = d.navPreloader.steps.length;
      let step = 1;
      stepTimer.current = setInterval(() => {
        step += 1;
        setRevealed(Math.min(steps, step));
        setProgress((p) => Math.min(92, p + 18));
        if (step >= steps && stepTimer.current) clearInterval(stepTimer.current);
      }, STEP_MS);

      const t0 = performance.now();
      const tick = (now: number) => {
        if (!activeRef.current) return;
        const elapsed = now - t0;
        const p = Math.min(92, 8 + elapsed / 18);
        setProgress(Math.round(p));
        progressRaf.current = requestAnimationFrame(tick);
      };
      progressRaf.current = requestAnimationFrame(tick);

      safetyTimer.current = setTimeout(() => finish(), SAFETY_MS);
    },
    [clearTimers, d.navPreloader.steps.length, finish],
  );

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (isModifiedClick(e)) return;

      const anchor = (e.target as Element | null)?.closest("a");
      if (!anchor || shouldSkipAnchor(anchor)) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const next = resolveInternalPath(href);
      if (!next) return;

      const current = currentLocationKey();
      if (next === current) return;

      begin(next);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [begin]);

  useEffect(() => {
    const onPop = () => begin(currentLocationKey());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [begin]);

  useEffect(() => {
    if (skipFirstRoute.current) {
      skipFirstRoute.current = false;
      return;
    }
    if (!active) return;
    clearTimers();
    scheduleUpdate(() => finish());
  }, [pathname, active, clearTimers, finish]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const routeLine = d.navPreloader.loading(targetPath);

  return (
    <AnimatePresence>
      {active && (
        <RouteLoadingShell
          key="page-nav-preloader"
          lang={lang}
          fa={fa}
          dir={dir}
          routeLine={routeLine}
          steps={d.navPreloader.steps}
          revealed={revealed}
          progress={progress}
          exiting={exiting}
          mode="overlay"
        />
      )}
    </AnimatePresence>
  );
}
