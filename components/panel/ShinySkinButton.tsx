"use client";

import {
  useEffect,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";

import type { PanelSkin } from "@/lib/i18n/panel-skin";

type Props = {
  skin: PanelSkin;
  label: string;
  face: string;
  icon: ReactNode;
  disabled?: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

type Bit = {
  x: number;
  y: number;
  nx: number;
  ny: number;
  digit: string;
  seed: number;
  phase: number;
};

/* Scaled from Desktop HTML (336×210) for FAB footprint */
const WIDTH = 260;
const HEIGHT = 150;
const MAX_DPR = 1.25;
const FRAME_MS = 1000 / 30;
const FLIP_MS = 160;

/**
 * Digit colors only — no bloom orbs.
 * Modern: muted paper/fg (not orange→blue halo).
 * Terminal: soft phosphor green.
 */
const PALETTE = {
  modern: {
    a: [168, 176, 188] as const,
    b: [210, 216, 224] as const,
    c: [148, 168, 188] as const,
  },
  terminal: {
    a: [56, 180, 110] as const,
    b: [90, 210, 145] as const,
    c: [140, 230, 185] as const,
  },
} as const;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(e0: number, e1: number, v: number) {
  const x = clamp((v - e0) / (e1 - e0), 0, 1);
  return x * x * (3 - 2 * x);
}

function hash(x: number, y: number) {
  const r = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return r - Math.floor(r);
}

function radial(nx: number, ny: number, cx: number, cy: number, sx: number, sy: number) {
  const dx = (nx - cx) / sx;
  const dy = (ny - cy) / sy;
  return Math.exp(-(dx * dx + dy * dy) * 2.2);
}

function mixColor(
  a: readonly [number, number, number],
  b: readonly [number, number, number],
  t: number,
): [number, number, number] {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

function colorAt(
  nx: number,
  palette: (typeof PALETTE)[keyof typeof PALETTE],
): [number, number, number] {
  const amount = clamp((nx + 0.48) / 0.96, 0, 1);
  if (amount < 0.5) return mixColor(palette.a, palette.b, amount / 0.5);
  return mixColor(palette.b, palette.c, (amount - 0.5) / 0.5);
}

/** ~HTML buildBits: spacing 9×10 */
function buildBits(): Bit[] {
  const bits: Bit[] = [];
  const spacingX = 9;
  const spacingY = 10;

  for (let y = 9; y < HEIGHT - 9; y += spacingY) {
    for (let x = 9; x < WIDTH - 9; x += spacingX) {
      const seed = hash(x, y);
      bits.push({
        x: x + (hash(x + 5.7, y) - 0.5) * 0.8,
        y: y + (hash(x, y + 8.3) - 0.5) * 0.8,
        nx: (x - WIDTH / 2) / (WIDTH / 2),
        ny: (y - HEIGHT / 2) / (HEIGHT / 2),
        digit: seed > 0.5 ? "1" : "0",
        seed,
        phase: Math.floor(hash(x + 19, y + 23) * 9),
      });
    }
  }
  return bits;
}

/**
 * Skin FAB (56K ↔ AI) — binary digit field restored; no bloom orbs / ring.
 */
export default function ShinySkinButton({
  skin,
  label,
  face,
  icon,
  disabled,
  onClick,
}: Props) {
  const effectRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skinRef = useRef(skin);

  useEffect(() => {
    skinRef.current = skin;
  }, [skin]);

  useEffect(() => {
    const effect = effectRef.current;
    const buttonEl = buttonRef.current;
    const canvasEl = canvasRef.current;
    if (!effect || !buttonEl || !canvasEl) return;

    const ctxRaw = canvasEl.getContext("2d", { alpha: true });
    if (!ctxRaw) return;
    const ctx = ctxRaw;
    const canvas = canvasEl;
    const button = buttonEl;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bits = buildBits();

    const state = {
      active: false,
      focused: false,
      pointerX: 0,
      pointerY: 0,
      targetPointerX: 0,
      targetPointerY: 0,
      lastFrame: 0,
      lastFlip: 0,
      flipStep: 0,
      animationId: 0,
    };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.round(WIDTH * dpr);
      canvas.height = Math.round(HEIGHT * dpr);
      canvas.style.width = `${WIDTH}px`;
      canvas.style.height = `${HEIGHT}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
    }

    function intensityFor(bit: Bit, activeAmount: number) {
      const warm = radial(
        bit.nx,
        bit.ny,
        -0.3 + state.pointerX * 0.018,
        0.02 + state.pointerY * 0.012,
        0.53,
        0.66,
      );
      const cool = radial(
        bit.nx,
        bit.ny,
        0.3 + state.pointerX * 0.018,
        0.02 + state.pointerY * 0.012,
        0.53,
        0.66,
      );
      const center = radial(bit.nx, bit.ny, 0, 0.02, 0.34, 0.54) * 0.25;
      const ellipseDistance = Math.sqrt((bit.nx / 1) ** 2 + (bit.ny / 0.87) ** 2);
      const outerMask = 1 - smoothstep(0.5, 0.99, ellipseDistance);
      const combined =
        Math.max(warm, cool) * 0.73 + Math.min(warm + cool, 1) * 0.18 + center;
      return combined * outerMask * lerp(0.14, 1, activeAmount);
    }

    function render(activeAmount = 0) {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      const palette = PALETTE[skinRef.current === "terminal" ? "terminal" : "modern"];
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "700 7px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

      const ox = state.pointerX * 1.8;
      const oy = state.pointerY * 1.0;

      for (const bit of bits) {
        const intensity = intensityFor(bit, activeAmount);
        if (intensity < 0.012) continue;
        const color = colorAt(bit.nx, palette);
        const shouldFlip =
          activeAmount > 0.2 && bit.seed > 0.56 && (state.flipStep + bit.phase) % 4 === 0;
        const digit = shouldFlip ? (bit.digit === "1" ? "0" : "1") : bit.digit;
        const alpha = clamp(0.06 + intensity * lerp(0.88, 1.24, activeAmount), 0, 0.94);
        ctx.fillStyle = `rgba(${color[0] | 0},${color[1] | 0},${color[2] | 0},${alpha})`;
        ctx.fillText(digit, bit.x + ox, bit.y + oy);
      }
    }

    function animate(time: number) {
      state.animationId = 0;
      if (!(state.active || state.focused) || reduced) {
        render(0);
        return;
      }
      if (time - state.lastFrame < FRAME_MS) {
        state.animationId = requestAnimationFrame(animate);
        return;
      }
      state.lastFrame = time;
      state.pointerX = lerp(state.pointerX, state.targetPointerX, 0.18);
      state.pointerY = lerp(state.pointerY, state.targetPointerY, 0.18);
      if (time - state.lastFlip > FLIP_MS) {
        state.lastFlip = time;
        state.flipStep += 1;
      }
      render(1);
      state.animationId = requestAnimationFrame(animate);
    }

    function start() {
      if (!state.animationId && !reduced) {
        state.animationId = requestAnimationFrame(animate);
      }
    }

    function stopIfIdle() {
      if (!state.active && !state.focused) {
        state.targetPointerX = 0;
        state.targetPointerY = 0;
        state.pointerX = 0;
        state.pointerY = 0;
        button.style.setProperty("--pointer-x", "50%");
        button.style.setProperty("--pointer-y", "50%");
        render(0);
      }
    }

    const onEnter = () => {
      state.active = true;
      start();
    };
    const onLeave = () => {
      state.active = false;
      stopIfIdle();
    };
    const onMove = (event: PointerEvent) => {
      const effectRect = effect.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      state.targetPointerX = clamp(
        (event.clientX - (effectRect.left + effectRect.width / 2)) / (effectRect.width / 2),
        -1,
        1,
      );
      state.targetPointerY = clamp(
        (event.clientY - (effectRect.top + effectRect.height / 2)) / (effectRect.height / 2),
        -1,
        1,
      );
      button.style.setProperty(
        "--pointer-x",
        `${clamp(((event.clientX - buttonRect.left) / buttonRect.width) * 100, 0, 100)}%`,
      );
      button.style.setProperty(
        "--pointer-y",
        `${clamp(((event.clientY - buttonRect.top) / buttonRect.height) * 100, 0, 100)}%`,
      );
    };
    const onFocusIn = () => {
      state.focused = true;
      start();
    };
    const onFocusOut = () => {
      state.focused = false;
      stopIfIdle();
    };
    const onVis = () => {
      if (document.hidden && state.animationId) {
        cancelAnimationFrame(state.animationId);
        state.animationId = 0;
      } else if (!document.hidden && (state.active || state.focused)) {
        start();
      }
    };
    const onResize = () => {
      resize();
      render(state.active || state.focused ? 1 : 0);
    };

    effect.addEventListener("pointerenter", onEnter);
    effect.addEventListener("pointerleave", onLeave);
    effect.addEventListener("pointermove", onMove);
    effect.addEventListener("focusin", onFocusIn);
    effect.addEventListener("focusout", onFocusOut);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", onResize);

    resize();
    render(0);

    return () => {
      if (state.animationId) cancelAnimationFrame(state.animationId);
      effect.removeEventListener("pointerenter", onEnter);
      effect.removeEventListener("pointerleave", onLeave);
      effect.removeEventListener("pointermove", onMove);
      effect.removeEventListener("focusin", onFocusIn);
      effect.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={effectRef}
      className={`fd-shiny-skin fixed z-[70]${disabled ? " is-disabled" : ""}`}
      data-skin={skin}
      style={{ viewTransitionName: "fd-skin-fab" }}
    >
      <canvas ref={canvasRef} className="fd-shiny-binary" aria-hidden />

      <button
        ref={buttonRef}
        type="button"
        className="fd-shiny-btn"
        data-skin-fab
        onClick={onClick}
        disabled={disabled}
        aria-pressed={skin === "modern"}
        aria-disabled={disabled || undefined}
        data-crossing-active={disabled ? "true" : undefined}
        aria-label={label}
        title={label}
      >
        <span className="fd-shiny-tint" aria-hidden />
        <span className="fd-shiny-top-line" aria-hidden />
        <span className="fd-shiny-bottom-line" aria-hidden />
        <span className="fd-shiny-shine" aria-hidden />
        <span className="fd-shiny-label">
          <span className="fd-shiny-icon">{icon}</span>
          <span className="fd-shiny-face">{face}</span>
        </span>
      </button>
    </div>
  );
}
