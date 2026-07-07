"use client";
import { useRef, useState, useLayoutEffect } from "react";

/**
 * Scales its child up (or down) to fill the parent box while preserving aspect
 * ratio. Lets every terminal mini-game fill the whole terminal window regardless
 * of its own natural character-grid size. Uses layout size (scrollWidth/Height)
 * so the transform never feeds back into the measurement.
 */
export default function FitBox({
  children,
  max = 2.8,
}: {
  children: React.ReactNode;
  max?: number;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const fit = () => {
      const ow = o.clientWidth;
      const oh = o.clientHeight;
      const iw = i.scrollWidth;
      const ih = i.scrollHeight;
      if (!ow || !oh || !iw || !ih) return;
      const s = Math.min(ow / iw, oh / ih, max);
      setScale(s > 0 ? s : 1);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(o);
    ro.observe(i);
    return () => ro.disconnect();
  }, [max]);

  return (
    <div ref={outer} className="flex h-full w-full items-center justify-center overflow-hidden">
      <div
        ref={inner}
        style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
      >
        {children}
      </div>
    </div>
  );
}
