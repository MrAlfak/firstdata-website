"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import type { HorizonBeat } from "@/components/ui/horizon-hero-section";
import { playModemHandshake } from "@/lib/horizon/modem-audio";

export type HorizonCrossingLabels = {
  status: string;
  ready: string;
  beat?: string;
  awaken?: string;
  tag?: string;
  tagReady?: string;
  steps?: [string, string, string, string];
};

type Props = {
  active: boolean;
  brand: string;
  dir?: "rtl" | "ltr";
  labels: HorizonCrossingLabels;
  onReady?: () => void;
  onDone?: () => void;
};

/** Lean cinematic arc — fly → crest → land. */
const DONE_AT_MS = 6200;
const LANDING_MS = 2400;
const PREROLL_MS = 360;
const REDUCED_READY_MS = 80;
const REDUCED_DONE_MS = 500;
/** Hard cap — never leave the black overlay stuck if WebGL/RAF stalls. */
const SAFETY_MS = DONE_AT_MS + LANDING_MS + 1200;

const HorizonHeroLazy = dynamic(
  () =>
    import("@/components/ui/horizon-hero-section").then((m) => m.HorizonHeroSection),
  { ssr: false, loading: () => <div className="fd-horizon-void absolute inset-0" /> },
);

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function easeOutCubic(t: number) {
  const x = Math.min(Math.max(t, 0), 1);
  return 1 - Math.pow(1 - x, 3);
}

/**
 * 56K → AI — title-card ceremony.
 * Scene carries the spectacle; UI stays quiet: brand + one line + thin rail.
 */
export default function HorizonCrossing({
  active,
  brand,
  dir = "ltr",
  labels,
  onReady,
  onDone,
}: Props) {
  return (
    <AnimatePresence initial={false}>
      {active ? (
        <HorizonStage
          key="fd-horizon"
          brand={brand}
          dir={dir}
          labels={labels}
          onReady={onReady}
          onDone={onDone}
        />
      ) : null}
    </AnimatePresence>
  );
}

function HorizonStage({
  brand,
  dir,
  labels,
  onReady,
  onDone,
}: Omit<Props, "active"> & { dir: "rtl" | "ltr" }) {
  const [reduced] = useState(prefersReducedMotion);
  const [beat, setBeat] = useState<HorizonBeat>("enter");
  const [finale, setFinale] = useState(false);
  const [preroll, setPreroll] = useState(!reduced);
  const [sceneOn, setSceneOn] = useState(reduced);
  const [readyCopy, setReadyCopy] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const audioRef = useRef<ReturnType<typeof playModemHandshake>>(null);
  const doneFired = useRef(false);
  const readyFired = useRef(false);
  const dissolveStarted = useRef(false);
  const dissolveRaf = useRef(0);
  const onReadyRef = useRef(onReady);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onReadyRef.current = onReady;
    onDoneRef.current = onDone;
  }, [onReady, onDone]);

  function fireReady() {
    if (readyFired.current) return;
    readyFired.current = true;
    onReadyRef.current?.();
  }

  function fireDone() {
    if (doneFired.current) return;
    doneFired.current = true;
    if (dissolveRaf.current) cancelAnimationFrame(dissolveRaf.current);
    dissolveRaf.current = 0;
    try {
      audioRef.current?.stop();
    } catch {
      /* ignore audio teardown */
    }
    audioRef.current = null;
    document.documentElement.style.overflow = "";
    const stage = stageRef.current;
    if (stage) {
      stage.style.pointerEvents = "none";
      stage.style.setProperty("--fd-fade", "1");
      stage.style.setProperty("--fd-land", "1");
    }
    try {
      onDoneRef.current?.();
    } catch {
      /* parent must still be able to clear crossing */
    }
  }

  /** One landing dissolve — wash + fade as a single curve into the AI skin. */
  function startLanding() {
    if (dissolveStarted.current || doneFired.current) return;
    dissolveStarted.current = true;
    setFinale(true);
    setBeat("ready");
    setReadyCopy(true);
    fireReady();

    const stage = stageRef.current;
    if (!stage) {
      window.setTimeout(fireDone, Math.min(LANDING_MS, 800));
      return;
    }

    // Never let CSS transition fight the RAF-driven --fd-fade dissolve
    stage.style.transition = "none";
    stage.style.pointerEvents = "none";
    const from = Number.parseFloat(stage.style.getPropertyValue("--fd-land") || "0") || 0;
    const t0 = performance.now();

    const tick = (now: number) => {
      if (doneFired.current) return;
      const u = Math.min((now - t0) / LANDING_MS, 1);
      const e = easeOutCubic(u);
      // Light fills early; overlay melts in the back half
      const land = from + (1 - from) * Math.min(e / 0.4, 1);
      const fade = u < 0.3 ? 0 : easeOutCubic((u - 0.3) / 0.7);
      stage.style.setProperty("--fd-land", String(land));
      stage.style.setProperty("--fd-fade", String(fade));
      stage.style.setProperty("--fd-era", "1");

      if (u < 1) {
        dissolveRaf.current = requestAnimationFrame(tick);
      } else {
        stage.style.setProperty("--fd-land", "1");
        stage.style.setProperty("--fd-fade", "1");
        fireDone();
      }
    };

    dissolveRaf.current = requestAnimationFrame(tick);
  }

  const startLandingRef = useRef(startLanding);
  const fireDoneRef = useRef(fireDone);
  useEffect(() => {
    startLandingRef.current = startLanding;
    fireDoneRef.current = fireDone;
  });

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const stage = stageRef.current;
    // Absolute escape hatch — WebGL stall / RAF cancel must never trap the page
    const safety = window.setTimeout(() => {
      if (doneFired.current) return;
      if (!dissolveStarted.current) startLandingRef.current();
      window.setTimeout(() => fireDoneRef.current(), 400);
    }, SAFETY_MS);

    if (stage) {
      stage.style.setProperty("--fd-era", "0");
      stage.style.setProperty("--fd-land", "0");
      stage.style.setProperty("--fd-fade", "0");
      stage.style.setProperty("--fd-enter", "0");
      const id = requestAnimationFrame(() => {
        // Enter fade only — cleared again when landing starts
        stage.style.transition = "opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
        stage.style.setProperty("--fd-enter", "1");
      });
      return () => {
        clearTimeout(safety);
        cancelAnimationFrame(id);
        document.documentElement.style.overflow = "";
        if (dissolveRaf.current) cancelAnimationFrame(dissolveRaf.current);
        dissolveRaf.current = 0;
        try {
          audioRef.current?.stop();
        } catch {
          /* ignore */
        }
        audioRef.current = null;
        // Do NOT call onDone here — React Strict Mode remounts would abort
        // the ceremony immediately and make «Enter AI» appear broken.
      };
    }
    return () => {
      clearTimeout(safety);
      document.documentElement.style.overflow = "";
      if (dissolveRaf.current) cancelAnimationFrame(dissolveRaf.current);
      dissolveRaf.current = 0;
      try {
        audioRef.current?.stop();
      } catch {
        /* ignore */
      }
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    const t = window.setTimeout(() => {
      setPreroll(false);
      setSceneOn(true);
      audioRef.current = playModemHandshake(DONE_AT_MS + LANDING_MS);
    }, PREROLL_MS);
    return () => clearTimeout(t);
  }, [reduced]);

  useEffect(() => {
    if (!reduced) return;
    const a = window.setTimeout(fireReady, REDUCED_READY_MS);
    const b = window.setTimeout(() => setReadyCopy(true), REDUCED_READY_MS + 100);
    const c = window.setTimeout(fireDone, REDUCED_DONE_MS);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
      clearTimeout(c);
    };
  }, [reduced]);

  function handleProgress(p: number) {
    if (railRef.current) railRef.current.style.transform = `scaleX(${p})`;
    if (!stageRef.current || dissolveStarted.current) return;

    const era = Math.min(Math.max((p - 0.12) / 0.55, 0), 1);
    const eraEase = easeOutCubic(era);
    stageRef.current.style.setProperty("--fd-era", String(eraEase));

    const land = Math.min(Math.max((p - 0.72) / 0.28, 0), 1);
    stageRef.current.style.setProperty("--fd-land", String(easeOutCubic(land)));

    if (p >= 0.68) fireReady();
  }

  function handleBeat(next: HorizonBeat) {
    if (dissolveStarted.current) return;
    setBeat(next);
  }

  const statusLine = (() => {
    if (readyCopy || beat === "ready" || finale) return labels.ready;
    if (beat === "awaken") return labels.awaken ?? labels.status;
    if (beat === "cross") return labels.beat ?? labels.status;
    return labels.status;
  })();

  const tag = readyCopy || finale ? labels.tagReady ?? labels.tag : labels.tag;
  const words = brand.split(/\s+/).filter(Boolean);

  return (
    <div
      ref={stageRef}
      role="dialog"
      aria-modal="true"
      aria-label={labels.status}
      dir={dir}
      className={`fd-horizon fixed inset-0 z-[10000] overflow-hidden${finale ? " is-landing" : ""}`}
      data-beat={beat}
    >
      <AnimatePresence>
        {preroll ? (
          <motion.div
            key="preroll"
            className="fd-horizon-preroll"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          >
            <span className="fd-horizon-preroll-mark" />
            <span className="fd-horizon-preroll-route">56K → AI</span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="fd-horizon-letterbox fd-horizon-letterbox-top" aria-hidden />
      <div className="fd-horizon-letterbox fd-horizon-letterbox-bottom" aria-hidden />

      {reduced ? (
        <div className="fd-horizon-void absolute inset-0" aria-hidden />
      ) : sceneOn ? (
        <HorizonHeroLazy
          className="fd-horizon-webgl"
          ceremony={{
            enabled: true,
            durationMs: DONE_AT_MS,
            brand,
            status: labels.status,
            ready: labels.ready,
            beat: labels.beat,
            awaken: labels.awaken,
            hideCopy: true,
            onProgress: handleProgress,
            onBeat: handleBeat,
            onFinale: startLanding,
            onDone: startLanding,
          }}
        />
      ) : (
        <div className="fd-horizon-void absolute inset-0" aria-hidden />
      )}

      <div className="fd-horizon-vignette pointer-events-none absolute inset-0" aria-hidden />
      <div className="fd-horizon-crt pointer-events-none absolute inset-0" aria-hidden />
      <div className="fd-horizon-grain pointer-events-none absolute inset-0" aria-hidden />
      <div className="fd-horizon-landing pointer-events-none absolute inset-0" aria-hidden />

      <div className="fd-horizon-hud" data-landing={finale ? "true" : undefined}>
        <div className="fd-horizon-hud-center">
          <motion.p
            className="fd-horizon-hud-eyebrow"
            key={tag}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {tag}
          </motion.p>

          <h2 className="fd-horizon-hud-title">
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className="fd-horizon-hud-word"
                initial={{ opacity: 0, y: 36, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 1.1,
                  delay: 0.25 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <div className="fd-horizon-hud-rule" aria-hidden>
            <span />
          </div>

          <div className="fd-horizon-hud-status" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.p
                key={statusLine}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {statusLine}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {!reduced ? (
          <div className="fd-horizon-hud-rail" aria-hidden>
            <span className="fd-horizon-hud-track">
              <span ref={railRef} className="fd-horizon-hud-bar" />
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
