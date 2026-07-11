"use client";

import { useEffect, useState } from "react";

type Props = {
  lines: string[];
  className?: string;
  onComplete?: () => void;
};

export default function ProductBootSequence({ lines, className = "", onComplete }: Props) {
  const [visible, setVisible] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (visible >= lines.length) {
      setDone(true);
      onComplete?.();
      return;
    }
    const t = window.setTimeout(() => setVisible((v) => v + 1), 280);
    return () => window.clearTimeout(t);
  }, [visible, lines.length, onComplete]);

  if (done) return null;

  return (
    <div
      className={`overflow-hidden rounded-sm border border-paper/15 bg-[#080c08] font-mono text-[11px] text-paper/55 ${className}`}
      dir="ltr"
      aria-live="polite"
      aria-busy={!done}
    >
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
