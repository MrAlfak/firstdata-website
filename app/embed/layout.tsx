import type { ReactNode } from "react";

/** Minimal chrome for isolated embeds (e.g. Spline hero iframe). */
export default function EmbedLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-embed-shell=""
      className="fixed inset-0 overflow-hidden overscroll-none bg-black text-paper [touch-action:pan-y]"
    >
      {children}
    </div>
  );
}
