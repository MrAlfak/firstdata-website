"use client";

import { useEffect, useState } from "react";
import type { Application } from "@splinetool/runtime";
import { SplineScene } from "@/components/ui/splite";
import { HERO_SPLINE_SCENE } from "@/config/hero-media";

type Props = {
  /** Physical half of the hero for the robot. */
  robot?: "left" | "right";
};

/**
 * Apply a subtle happy/idle face only when the exported scene already exposes
 * matching Variables (set in the Spline editor). Never invents face overlays.
 */
function applyFacialVariablesIfPresent(spline: Application) {
  let variables: Record<string, string | number | boolean> = {};
  try {
    variables = spline.getVariables?.() ?? {};
  } catch {
    return;
  }

  const keys = Object.keys(variables);
  if (!keys.length) return;

  const smileKey = keys.find((k) => /smile|happy|grin/i.test(k));
  if (smileKey) {
    const current = variables[smileKey];
    if (typeof current === "boolean") spline.setVariable(smileKey, true);
    else if (typeof current === "number") spline.setVariable(smileKey, Math.max(current, 1));
    else if (typeof current === "string") {
      const lower = current.toLowerCase();
      if (lower === "false" || lower === "0" || lower === "idle" || lower === "") {
        spline.setVariable(smileKey, "happy");
      }
    }
  }

  const moodKey = keys.find((k) => /mood|emotion|expression|face.?state/i.test(k));
  if (moodKey && moodKey !== smileKey) {
    const current = variables[moodKey];
    if (typeof current === "string") spline.setVariable(moodKey, "happy");
    else if (typeof current === "number") spline.setVariable(moodKey, 1);
    else if (typeof current === "boolean") spline.setVariable(moodKey, true);
  }
}

/** Instant parent scroll — bypasses `html { scroll-behavior: smooth }`. */
function scrollParentBy(deltaX: number, deltaY: number) {
  try {
    const parentWin = window.parent;
    if (!parentWin || parentWin === window) return;
    const parentDoc = parentWin.document;
    const root = parentDoc.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    const se = parentDoc.scrollingElement ?? root;
    se.scrollLeft += deltaX;
    se.scrollTop += deltaY;
    root.style.scrollBehavior = prev;
  } catch {
    /* cross-origin / detached */
  }
}

function normalizeWheelDelta(event: WheelEvent): { deltaX: number; deltaY: number } {
  let { deltaX, deltaY } = event;
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    // Match common UA line → px (~40); keeps notch distance near native.
    const line = 40;
    deltaX *= line;
    deltaY *= line;
  } else if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    try {
      deltaX *= window.parent.innerWidth;
      deltaY *= window.parent.innerHeight;
    } catch {
      deltaX *= window.innerWidth;
      deltaY *= window.innerHeight;
    }
  }
  return { deltaX, deltaY };
}

/**
 * Spline runtime for the homepage hero iframe.
 * Forwards wheel/touch to the parent so page scroll stays free while
 * pointer events remain enabled for mouse-follow / Look At on the robot.
 *
 * Framing uses `?robot=left|right` (not `?lang=` — proxy strips lang into a cookie).
 *
 * Look At / Follow / States / smile morphs are authored in the Spline editor.
 * Code only: (1) keeps pointers on the iframe, (2) sets Variables if the
 * export already defines smile/mood keys.
 */
export default function HeroSplineEmbedClient({ robot = "right" }: Props) {
  const [towardRight, setTowardRight] = useState(robot !== "left");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const fromUrl = q.get("robot");
    if (fromUrl === "left" || fromUrl === "right") {
      setTowardRight(fromUrl === "right");
      return;
    }
    setTowardRight(robot !== "left");
  }, [robot]);

  // FA → deep into the empty left half (red zone); EN → right of copy.
  const shiftClass = towardRight
    ? "translate-x-[14%] md:translate-x-[16%]"
    : "-translate-x-[26%] md:-translate-x-[32%]";

  useEffect(() => {
    /**
     * Capture-phase wheel bridge.
     *
     * Spline OrbitControls call preventDefault when the canvas fills the
     * iframe viewport; a bubble-only listener can lose the race or leave
     * zoom fighting page scroll. Capture + stopImmediatePropagation hands
     * vertical/horizontal wheel to the parent document only.
     */
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const { deltaX, deltaY } = normalizeWheelDelta(event);
      scrollParentBy(deltaX, deltaY);
    };

    /**
     * Single-finger touch → parent scroll. The iframe document is
     * overflow:hidden / fixed, so native touch never reaches the page.
     * (Parent also sets pointer-events:none on coarse pointers; this is
     * the fallback when the iframe still receives touch.)
     */
    let lastY: number | null = null;
    let lastX: number | null = null;

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        lastX = event.touches[0].clientX;
        lastY = event.touches[0].clientY;
      } else {
        lastX = null;
        lastY = null;
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      if (lastY == null || lastX == null || event.touches.length !== 1) return;
      const x = event.touches[0].clientX;
      const y = event.touches[0].clientY;
      const dx = lastX - x;
      const dy = lastY - y;
      lastX = x;
      lastY = y;
      if (Math.abs(dy) < 0.5 && Math.abs(dx) < 0.5) return;
      // Prefer vertical page scroll; ignore mostly-horizontal pans.
      if (Math.abs(dy) < Math.abs(dx)) return;
      event.preventDefault();
      scrollParentBy(0, dy);
    };

    const onTouchEnd = () => {
      lastX = null;
      lastY = null;
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true, capture: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true, capture: true });

    return () => {
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("touchstart", onTouchStart, true);
      window.removeEventListener("touchmove", onTouchMove, true);
      window.removeEventListener("touchend", onTouchEnd, true);
      window.removeEventListener("touchcancel", onTouchEnd, true);
    };
  }, []);

  return (
    <div className="hero-spline-embed relative h-full w-full overflow-hidden overscroll-none bg-black [touch-action:pan-y]">
      <div
        className={`absolute inset-0 origin-center scale-[1.22] will-change-transform ${shiftClass}`}
        data-hero-spline-side={towardRight ? "right" : "left"}
      >
        <SplineScene
          scene={HERO_SPLINE_SCENE}
          className="h-full w-full"
          onLoad={applyFacialVariablesIfPresent}
        />
      </div>
    </div>
  );
}
