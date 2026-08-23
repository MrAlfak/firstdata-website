/** Canonical First Data monogram SVG geometry (shared by loaders + Grid Crossing). */

export const LOGO_VIEW_BOX = "0 0 64 64";

/** Continuous outer contour for trace / disc rim framing. */
export const TRACE_PATH =
  "M16 6h32c5.5 0 10 4.5 10 10v32c0 5.5-4.5 10-10 10H16c-5.5 0-10-4.5-10-10V16c0-5.5 4.5-10 10-10z";

/** Filled F + D (evenodd hole on D). */
export const FILL_PATHS = [
  "M13 14h20v5.5H20.5v7.5H31V32H20.5v18H13V14z",
  "M35 14h12.5C56 14 61 21.2 61 32s-5 18-13.5 18H35V14zm6.5 6v24h6.5c5.5 0 9-5 9-12s-3.5-12-9-12h-6.5z",
] as const;
