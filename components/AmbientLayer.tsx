// Fixed overlays: scanline sweep + CRT grain. pointer-events-none, z-50.
export default function AmbientLayer() {
  return (
    <>
      {/* Scanline — 2px line sweeps top→bottom every 8s */}
      <div
        aria-hidden="true"
        className="animate-scanline pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-term/20"
      />
      {/* CRT grain — tiled noise at 3% opacity */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />
    </>
  );
}
