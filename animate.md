# animate.md — Motion System for Monochrome ASCII Hub

> Scope: animation/motion only. Stack: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Geist/GeistPixel.
> Read this before touching any motion. The aesthetic is a **monochrome CRT terminal** (#000 / #FFF, pixel type, ASCII art). Every motion decision must read as *a machine rendering itself*, not as a marketing site. When in doubt, do less.

---

## 0. The one big idea (don't break this)

The whole page behaves like a single **booting terminal**. Content does not "fade in" — it gets *drawn/decoded/printed*, the way a TTY renders. There is exactly **one signature move**, reused everywhere with discipline:

**DECODE** — text (and select ASCII art) resolves from random monochrome glyph-noise into its final characters, left-to-right, character by character.

Spend boldness only on DECODE. Everything else stays quiet.

### Hard rules (these keep it Awwwards, not generic)
- **No** smooth-scroll hijack (Lenis), parallax hero, WebGL fluid, particle fields, or magnetic cursor. These are the clichés that would kill this identity.
- **No** spring/overshoot easing. Motion is *computed*, so it's `linear`, `steps()`, or the existing `cubic-bezier(0.4, 0, 0.2, 1)`. Never bouncy.
- **Never animate hue** — it's monochrome. State changes happen via **invert (fg↔bg swap)**, **opacity**, and **glyph content**.
- Reveals fire **once** (`once: true`). The system boots once; it doesn't re-boot on every scroll.
- Body paragraphs do **not** scramble (unreadable). Only headings, labels, stat values, and short codes decode.

---

## 1. Motion grammar (global tokens)

```ts
// motion/tokens.ts
export const ease = {
  tty: [0.4, 0, 0.2, 1] as const,   // default UI transition
  linear: "linear" as const,        // ambient loops, marquees
  step: "steps(8, end)" as const,   // discrete "rendered" feel for some reveals
};

export const dur = {
  micro: 0.15,     // hover / state toggles
  reveal: 0.5,     // element appear
  decode: 0.7,     // scramble resolve (per element; chars stagger inside)
  ambientFast: 1,  // cursor blink
  ambientSlow: 8,  // scanline sweep
};

export const stagger = {
  char: 0.018,     // per-character in decode
  child: 0.06,     // per-child in a section reveal
};
```

Use these everywhere. No magic numbers inline.

---

## 2. Ambient layer (always on, subtle)

These already exist in the codebase as `animate-scanline` / `animate-blink` / `animate-pulse`. Keep them, formalize them, and **gate them behind reduced-motion**.

| Effect | Where | Spec |
|---|---|---|
| Scanline sweep | full-page overlay (`pointer-events-none`, `z-10`) | 2px line, `bg-foreground/5`, `8s linear infinite`, translateY top→bottom |
| Cursor blink | every `_` / block caret | `1s steps(1) infinite`, opacity 1↔0 |
| Status pulse | "LIVE", node-online dots | `2s cubic-bezier(0.4,0,0.6,1) infinite` |
| CRT grain (optional) | full-page overlay | tiled SVG/`feTurbulence` noise, `opacity: 0.03`, no animation or a slow `steps(6)` jitter. **Cap at 3% or it muddies the monochrome.** |

Ambient is texture, not spectacle. If it's noticeable as "an animation," it's too strong.

---

## 3. SIGNATURE — the DECODE effect

The single move that defines the site. rAF-based (never per-char `setInterval` — that thrashes). Resolves noise → target text.

```ts
// motion/useScramble.ts
import { useEffect, useRef, useState } from "react";

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\|<>_-=+*#%@░▒▓█";

export function useScramble(target: string, opts?: { duration?: number; start?: boolean }) {
  const { duration = 700, start = true } = opts ?? {};
  const [out, setOut] = useState(target); // SSR-safe: render final text first
  const raf = useRef(0);

  useEffect(() => {
    if (!start) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setOut(target); return; }

    const t0 = performance.now();
    const charDelay = 18; // ms per char of stagger -> left-to-right reveal
    const tick = (now: number) => {
      const elapsed = now - t0;
      let next = "";
      for (let i = 0; i < target.length; i++) {
        const charStart = i * charDelay;
        const p = Math.min(1, Math.max(0, (elapsed - charStart) / duration));
        if (target[i] === " ") next += " ";
        else if (p >= 1) next += target[i];
        else next += POOL[(Math.random() * POOL.length) | 0];
      }
      setOut(next);
      if (elapsed < duration + target.length * charDelay) raf.current = requestAnimationFrame(tick);
      else setOut(target);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, start, duration]);

  return out;
}
```

```tsx
// Decode.tsx — fires once when scrolled into view
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useScramble } from "@/motion/useScramble";

export function Decode({ children, as: Tag = "span" }: { children: string; as?: any }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const text = useScramble(children, { start: inView });
  return <Tag ref={ref} aria-label={children}>{text}</Tag>;
}
```

**Apply DECODE to:** section H2 titles (`Kernel & Systems`, `Network Topologies`, …), eyebrow labels (`Distributed connectivity`), stat values (`9.2 Gbps`, `8.4ms`), block hashes (`0xC12...8A`), the hero headline.
**Do not apply to:** body copy, nav, long code blocks.

---

## 4. Hero — boot sequence

The hero already ships a boot log (`> initializing ascii_renderer...`). Make it live:

1. **Typewriter print** the boot log line-by-line, each line appended with a trailing block cursor, ~`steps()` reveal. ~80–120ms per line.
2. On `status: OPERATIONAL`, **DECODE the headline** "Raw Logic. Refined Form."
3. CTA buttons appear with a **hard cut** (instant, no fade) + cursor flash — terminals draw, they don't dissolve.
4. The tech-keyword **marquee** (`Next.js///React///…`) scrolls `linear infinite`; **pause on hover**. Keep the `///` separators.
5. "Scroll to Explore" caret: `animate-bounce` is too playful — use a 1-cell vertical step (`steps(2)`) blink instead.

Sequence the steps with Framer `delayChildren` / `staggerChildren`, not nested timeouts.

---

## 5. Section reveals — "module initialization"

Every numbered module (01–08) boots on scroll. Container variant:

```ts
export const moduleReveal = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], staggerChildren: 0.06 },
  },
};
```

Order inside a module: (1) eyebrow prints `> initializing module 0X…`, (2) H2 **decodes**, (3) the interactive widget draws in, (4) the stat rows reveal with `staggerChildren`. The big section number (`01`–`08`) gets a quick **glitch-in** (2–3 scramble frames then lock) — not a slow count-up.

Use `whileInView` with `viewport={{ once: true, margin: "-15% 0px" }}`.

---

## 6. Per-module bespoke moments (tie motion to the content)

Each widget gets ONE motion that means something. Keep them crisp.

- **02 Network Topologies** — nodes A–H connect via SVG `stroke-dashoffset` draw-on (links trace in). `LIVE` dot pulses. Throughput/latency numbers **tick to value** on reveal (then static).
- **03 Distributed Ledger** — blocks chain in **left→right, one at a time** (~120ms apart); each draws a connector to its predecessor. Hashes **decode**. Block Inspector fields update on block hover (instant swap, no morph).
- **04 Compiler Design** — pipeline stages `01 SOURCE → 05 ASM` light up **sequentially** as the section scrolls through (scroll-progress driven, the *only* place scroll-linked motion is allowed). Active stage = inverted.
- **05 Graphics Pipelines** — a "signal" pulse travels `IA → VS → RS → FS → OM` on loop (`linear`, ~2.5s), echoing the `SIGNAL — GPU WAVEFORM` label.
- **06 Logic Synthesis** — already interactive. Add **instant** invert on input toggle (no transition on the gate state — logic is discrete). Render the Clock Signal as an animated SVG **square wave** scrolling `linear infinite`.
- **07 Concurrency Models** — thread-profiler bars **fill left→right** like a real timeline on reveal (`steps()` for a sampled look). Channel buffer fills `0→N/128`.
- **08 Hardware Abstraction** — layers `L4 → L0` reveal as a **descending drill-down** (top-to-bottom stagger). CPU register hex values **flicker/scramble** briefly then lock.

---

## 7. Micro-interactions

- **Hover (buttons/cards/nav):** invert fg↔bg over `0.2s cubic-bezier(0.4,0,0.2,1)`. This is the terminal's whole hover language — keep it consistent everywhere.
- **Link arrows (`->`):** `group-hover:translate-x-1`, `0.2s`. Already present — standardize it.
- **Underlines:** draw in via `scaleX` from 0, `transform-origin: left`.
- **Terminal section (interactive):** typed commands echo char-by-char; output prints with a `steps()` typewriter; block cursor always present.
- **BACK TO TOP:** on click, do **not** smooth-scroll-animate the page — a terminal jumps. Instant scroll, then re-run the hero cursor flash.

---

## 8. Reduced motion & performance (non-negotiable floor)

```css
@media (prefers-reduced-motion: reduce) {
  /* kill scanline, grain, marquee, decode loops */
  .animate-scanline, .animate-blink, .animate-pulse, .marquee { animation: none !important; }
}
```
- Under reduced-motion: `useScramble` returns final text instantly; all reveals collapse to a ≤200ms opacity fade; ambient overlays off.
- **Only animate `transform` and `opacity`.** Never animate layout (width/top/left) — use transforms.
- DECODE is rAF + capped; never spawn a timer per character.
- `useInView` / `whileInView` everywhere with `once: true` so nothing re-runs on scroll-back.
- Lighthouse: keep CLS at 0 — reserve space for elements that draw/decode (text is SSR-rendered at final length, so it won't reflow).

---

## 9. Build order (so it stays coherent)

1. `motion/tokens.ts` + `useScramble` + `<Decode>`.
2. Ambient layer (scanline / cursor / grain) behind reduced-motion guard.
3. Hero boot sequence.
4. `moduleReveal` wrapper applied to all 8 sections (decode titles + stagger).
5. Per-module bespoke moments — one at a time, review each in isolation before moving on.
6. Micro-interactions pass.
7. Final pass: turn on reduced-motion, tab through for focus visibility, then **remove one effect** that isn't earning its place.