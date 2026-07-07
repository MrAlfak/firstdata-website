"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/motion/usePrefersReducedMotion";
import { useT } from "@/i18n/LangProvider";
import { IRAN_GRID_CITIES, type IranGridCity } from "./iran-grid-data";
import {
  citySourcePercentPosition,
  createIranGridRenderer,
  MAP_H,
  MAP_W,
} from "./iran-grid-renderer";

export default function IranSquareGridMap() {
  const { fa, d } = useT();
  const mainRef = useRef<HTMLCanvasElement>(null);
  const brightRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState<IranGridCity["id"] | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const main = mainRef.current;
    const bright = brightRef.current;
    if (!main || !bright) return;

    bright.classList.remove("iran-grid-map__bright--on");

    const renderer = createIranGridRenderer(main, bright, reducedMotion);
    renderer.onComplete(() => setRevealed(true));
    renderer.start();

    return () => renderer.stop();
  }, [reducedMotion]);

  const labels = d.heroMap.cities;

  return (
    <div
      className="iran-grid-map relative w-full"
      role="img"
      aria-label={d.heroMap.ariaLabel}
    >
      <div
        className="iran-grid-map__canvas-wrap relative mx-auto w-full"
        style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}
      >
        <canvas
          ref={mainRef}
          className="iran-grid-map__canvas h-full w-full"
          width={MAP_W}
          height={MAP_H}
          aria-hidden
        />
        <canvas
          ref={brightRef}
          className={`iran-grid-map__bright pointer-events-none absolute inset-0 h-full w-full ${revealed ? "iran-grid-map__bright--on" : ""}`}
          width={MAP_W}
          height={MAP_H}
          aria-hidden
        />

        <div className="iran-grid-map__cities pointer-events-none absolute inset-0">
          {IRAN_GRID_CITIES.map((city) => {
            const active = hovered === city.id;
            const pos = citySourcePercentPosition(city.row, city.col);
            return (
              <button
                key={city.id}
                type="button"
                className="iran-grid-city relative pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
                style={pos}
                onMouseEnter={() => setHovered(city.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(city.id)}
                onBlur={() => setHovered(null)}
                aria-label={labels[city.id]}
              >
                <span
                  className={[
                    "iran-grid-city__halo absolute inset-0 -m-1.5 rounded-sm",
                    active ? "iran-grid-city__halo--active" : "",
                  ].join(" ")}
                  aria-hidden
                />
                <span
                  className={[
                    "iran-grid-city__core relative block",
                    active ? "iran-grid-city__core--active" : "iran-grid-city-pulse",
                  ].join(" ")}
                />
                {active && (
                  <span
                    className={`iran-grid-city__label absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-sm border border-[#ff5a5a]/25 bg-[#080c08]/90 px-2 py-0.5 text-[10px] text-[#ff6b6b] shadow-[0_0_16px_rgb(255_90_90_/_0.2)] sm:text-xs ${fa ? "font-fa" : "font-mono"}`}
                  >
                    {labels[city.id]}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
