/**
 * Tiny bilingual helper for the terminal mini-games.
 *
 * Games render inside the terminal aesthetic, so short tokens (SCORE, HI, the
 * game's own name) stay as-is. This covers the *readable* strings, how to play, * what just happened, so Persian users get instructions too.
 *
 * Usage:
 *   const { fa } = useT();
 *   pick(fa, "press space to start", "برای شروع SPACE را بزن")
 */
export function pick(fa: boolean, en: string, fa_: string): string {
  return fa ? fa_ : en;
}
