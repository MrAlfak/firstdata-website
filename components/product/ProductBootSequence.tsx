"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";

type Props = {
  lines: string[];
  className?: string;
  onComplete?: () => void;
};

export default function ProductBootSequence({ lines, className = "", onComplete }: Props) {
  const { fa } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const [visible, setVisible] = useState(0);
  const [done, setDone] = useState(false);
  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setDone(true);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || ai) {
      finish();
      return;
    }
    if (visible >= lines.length) {
      finish();
      return;
    }
    const t = window.setTimeout(() => setVisible((v) => v + 1), 280);
    return () => window.clearTimeout(t);
  }, [visible, lines.length, finish, ai]);

  if (done || ai) return null;

  return (
    <div
      className={`overflow-hidden rounded-sm border border-paper/15 bg-[#080c08] font-mono text-[11px] text-paper/55 ${className}`}
      dir="ltr"
      aria-live="polite"
      aria-busy={!done}
    >
      <div className="flex items-center justify-between border-b border-paper/10 px-3 py-1.5">
        <span className="text-[9px] uppercase tracking-wider text-paper/30">boot</span>
        <button
          type="button"
          onClick={finish}
          className={`text-[9px] text-paper/40 transition-colors hover:text-term ${fa ? "font-fa" : "uppercase tracking-wider"}`}
        >
          {fa ? "رد کردن" : "Skip"}
        </button>
      </div>
      <ul className="space-y-1 p-4">
        {lines.slice(0, visible).map((line) => (
          <li key={line}>{line}</li>
        ))}
        {visible < lines.length ? (
          <li className="text-term/60" aria-hidden>
            █
          </li>
        ) : null}
      </ul>
    </div>
  );
}
