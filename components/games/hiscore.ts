/** Shared localStorage-backed high-score helpers for the terminal mini-games. */

const PREFIX = "fd-game-";

export function loadHi(key: string): number {
  if (typeof window === "undefined") return 0;
  try {
    const v = window.localStorage.getItem(PREFIX + key);
    const n = v ? parseInt(v, 10) : 0;
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}

export function saveHi(key: string, val: number): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PREFIX + key, String(val));
  } catch {
    /* private mode / quota — ignore */
  }
}
