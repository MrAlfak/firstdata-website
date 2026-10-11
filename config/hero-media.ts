/** Cinematic modern-hero media (PrismaHero pattern). */
export const HERO_PRISMA_VIDEO = "/media/hero-cinematic.mp4";

/** Optional still while buffering — leave unset to avoid third-party watermark frames. */
export const HERO_PRISMA_POSTER: string | undefined = undefined;

/** Mainframe-style mouse-scrub hero background (served locally). */
export const HERO_MAINFRAME_VIDEO = "/media/hero-mainframe.mp4";

/** Modern homepage Spline scene (.splinecode). Loaded locally in an iframe. */
export const HERO_SPLINE_SCENE = "/media/scene.splinecode";

/** Same-origin embed route that hosts HERO_SPLINE_SCENE. */
export const HERO_SPLINE_EMBED_PATH = "/embed/hero-spline";

/** postMessage type: parent hero forwards pointer coords into the embed. */
export const HERO_SPLINE_POINTER_TYPE = "fd-hero-spline-pointer";

export type HeroSplinePointerMessage = {
  type: typeof HERO_SPLINE_POINTER_TYPE;
  x: number;
  y: number;
};

export function isHeroSplinePointerMessage(data: unknown): data is HeroSplinePointerMessage {
  if (!data || typeof data !== "object") return false;
  const msg = data as Record<string, unknown>;
  return (
    msg.type === HERO_SPLINE_POINTER_TYPE &&
    typeof msg.x === "number" &&
    typeof msg.y === "number" &&
    Number.isFinite(msg.x) &&
    Number.isFinite(msg.y)
  );
}
