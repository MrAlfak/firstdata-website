/** Cinematic modern-hero media (PrismaHero pattern). */
export const HERO_PRISMA_VIDEO = "/media/hero-cinematic.mp4";

/** Optional still while buffering — leave unset to avoid third-party watermark frames. */
export const HERO_PRISMA_POSTER: string | undefined = undefined;

/** Mainframe-style mouse-scrub hero background (CloudFront). */
export const HERO_MAINFRAME_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4";

/** Modern homepage Spline scene (.splinecode). Loaded in an iframe so parent page scroll stays free. */
export const HERO_SPLINE_SCENE =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

/** Same-origin embed route that hosts HERO_SPLINE_SCENE. */
export const HERO_SPLINE_EMBED_PATH = "/embed/hero-spline";
