"use client";

import { usePanelSkin } from "@/components/panel/PanelSkinToggle";

/** Fixed overlays: CRT in terminal; soft grain/glow in AI (modern). */
export default function AmbientLayer() {
  const [skin] = usePanelSkin();

  if (skin === "modern") {
    return (
      <>
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.35] [[data-theme=dark]_&]:hidden"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 15% -10%, rgb(var(--c-accent) / 0.07), transparent 55%), radial-gradient(ellipse 60% 40% at 90% 10%, rgb(var(--c-accent) / 0.04), transparent 50%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.018]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "180px 180px",
          }}
        />
      </>
    );
  }

  return (
    <>
      <div
        aria-hidden="true"
        className="ambient-crt animate-scanline pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-term/20"
      />
      <div
        aria-hidden="true"
        className="ambient-crt pointer-events-none fixed inset-0 z-40 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />
    </>
  );
}
