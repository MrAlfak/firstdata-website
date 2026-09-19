"use client";

import { useEffect, useRef } from "react";
import type { Application } from "@splinetool/runtime";
import { SplineScene } from "@/components/ui/splite";
import {
  HERO_SPLINE_SCENE,
  isHeroSplinePointerMessage,
} from "@/config/hero-media";

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
 * Replay parent-hero pointer position onto Spline Look At / Follow.
 * Runtime maps `pageX`/`pageY` against the canvas rect — not `clientX`.
 */
function createLookAtPointerEvent(x: number, y: number): PointerEvent {
  const pageX = x + window.scrollX;
  const pageY = y + window.scrollY;
  const event = new PointerEvent("pointermove", {
    bubbles: true,
    cancelable: true,
    composed: true,
    clientX: x,
    clientY: y,
    view: window,
    pointerId: 1,
    pointerType: "mouse",
    isPrimary: true,
    buttons: 0,
  });
  try {
    Object.defineProperties(event, {
      pageX: { configurable: true, get: () => pageX },
      pageY: { configurable: true, get: () => pageY },
    });
  } catch {
    /* UA may already expose pageX from clientX */
  }
  return event;
}

function dispatchSplineLookAt(x: number, y: number, spline: Application | null) {
  const event = createLookAtPointerEvent(x, y);
  const manager = spline?.eventManager as
    | {
        handlers?: {
          LookAt?: {
            events?: Array<{ isReset?: boolean; target?: unknown }>;
            onMouseMove?: (event: PointerEvent) => void;
            onMouseEnter?: (event: PointerEvent) => void;
          };
          Follow?: {
            events?: Array<{ isReset?: boolean; target?: unknown }>;
            onMouseMove?: (event: PointerEvent) => void;
            onMouseEnter?: (event: PointerEvent) => void;
          };
        };
        eventContext?: {
          eventElement?: EventTarget;
          updateRaycaster?: (event: PointerEvent) => void;
        };
      }
    | undefined;

  const ctx = manager?.eventContext;
  ctx?.updateRaycaster?.(event);

  for (const handler of [manager?.handlers?.LookAt, manager?.handlers?.Follow]) {
    if (!handler) continue;
    handler.onMouseEnter?.(event);
    if (Array.isArray(handler.events)) {
      for (const item of handler.events) {
        if (item && item.target === undefined) item.isReset = false;
      }
    }
    handler.onMouseMove?.(event);
  }

  const target: EventTarget = ctx?.eventElement ?? spline?.canvas ?? window;
  try {
    target.dispatchEvent(event);
  } catch {
    /* event may already have been dispatched by a handler */
  }
  spline?.requestRender?.();
}

/**
 * Spline runtime for the homepage hero iframe.
 * Forwards wheel/touch to the parent so page scroll stays free while
 * pointer events remain enabled for mouse-follow / Look At on the robot.
 *
 * Framing: robot sits on the physical left (FA) or right (EN).
 *
 * Look At / Follow / States / smile morphs are authored in the Spline editor.
 * Code only: (1) keeps pointers on the iframe, (2) sets Variables if the
 * export already defines smile/mood keys.
 */
export default function HeroSplineEmbedClient({ robot = "left" }: Props) {
  const splineRef = useRef<Application | null>(null);
  const towardLeft = robot !== "right";
  const shiftClass = towardLeft
    ? "-translate-x-[20%] md:-translate-x-[26%]"
    : "translate-x-[20%] md:translate-x-[26%]";

  const onSplineLoad = (spline: Application) => {
    splineRef.current = spline;
    applyFacialVariablesIfPresent(spline);
    // Look At / Follow listen on window so parent-forwarded events are seen.
    spline.setGlobalEvents(true);
  };

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

    const onParentPointer = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (!isHeroSplinePointerMessage(event.data)) return;
      dispatchSplineLookAt(event.data.x, event.data.y, splineRef.current);
    };
    window.addEventListener("message", onParentPointer);

    return () => {
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("touchstart", onTouchStart, true);
      window.removeEventListener("touchmove", onTouchMove, true);
      window.removeEventListener("touchend", onTouchEnd, true);
      window.removeEventListener("touchcancel", onTouchEnd, true);
      window.removeEventListener("message", onParentPointer);
    };
  }, []);

  return (
    <div className="hero-spline-embed relative h-full w-full overflow-hidden overscroll-none bg-black [touch-action:pan-y]">
      <div
        className={`absolute inset-0 origin-center scale-[1.08] will-change-transform ${shiftClass}`}
        data-hero-spline-side={towardLeft ? "left" : "right"}
      >
        <SplineScene
          scene={HERO_SPLINE_SCENE}
          className="h-full w-full"
          onLoad={onSplineLoad}
        />
      </div>
    </div>
  );
}
