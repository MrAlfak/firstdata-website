import type { Point } from "./types";

const FAB_FALLBACK_INSET = 32;

export function measureBrandAnchor(): DOMRect | null {
  if (typeof document === "undefined") return null;
  const el = document.querySelector("[data-brand-mark-anchor]");
  if (!(el instanceof HTMLElement)) return null;
  const rect = el.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2) return null;
  return rect;
}

export function brandAnchorCenter(fallback?: Point): Point {
  const rect = measureBrandAnchor();
  if (rect) {
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }
  if (fallback) return fallback;
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight * 0.46,
  };
}

export function measureFabCenter(fallback?: Point): Point {
  if (typeof document === "undefined") {
    return fallback ?? { x: 0, y: 0 };
  }
  const el = document.querySelector("[data-skin-fab]");
  if (el instanceof HTMLElement) {
    const rect = el.getBoundingClientRect();
    if (rect.width >= 2 && rect.height >= 2) {
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
  }
  if (fallback) return fallback;
  const rtl = document.documentElement.dir === "rtl";
  return {
    x: rtl ? window.innerWidth - FAB_FALLBACK_INSET : FAB_FALLBACK_INSET,
    y: window.innerHeight - FAB_FALLBACK_INSET,
  };
}

export function wipeRadiusFrom(origin: Point): number {
  const { innerWidth: w, innerHeight: h } = window;
  return Math.hypot(Math.max(origin.x, w - origin.x), Math.max(origin.y, h - origin.y));
}

/** Cubic filament path between brand mark and FAB. */
export function filamentPath(from: Point, to: Point): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const c1 = { x: from.x + dx * 0.28, y: from.y + dy * 0.08 };
  const c2 = { x: from.x + dx * 0.72, y: from.y + dy * 0.92 };
  return `M ${from.x} ${from.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${to.x} ${to.y}`;
}
