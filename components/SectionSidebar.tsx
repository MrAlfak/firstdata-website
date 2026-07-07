"use client";

import { useState, useEffect } from "react";
import { useScramble } from "@/motion/useScramble";

const SERVICE_IDS = ["01", "02", "03", "04", "05", "06", "07", "08"];

export default function SectionSidebar() {
  const [active, setActive] = useState("--");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SERVICE_IDS.forEach((num) => {
      const el = document.getElementById(`service-${num}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(num);
            setVisible(true);
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    // Hide when back at top
    const top = document.getElementById("top");
    if (top) {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setVisible(false); },
        { threshold: 0.1 }
      );
      obs.observe(top);
      observers.push(obs);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const displayed = useScramble(active, { start: true, duration: 180 });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div className="h-16 w-px bg-paper/15" />
      <p
        className="font-pixel text-[10px] uppercase tracking-widest text-paper/25"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        {displayed === "--" ? "//----" : `// ${displayed}`}
      </p>
      <div className="h-16 w-px bg-paper/15" />
    </div>
  );
}
