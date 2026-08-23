import type { CrossingDirection } from "./types";

export const CROSSING_SESSION_KEYS = {
  modernFirstLoadSeen: "fd.aiBoot.seen.v2",
  crossingLock: "fd.crossing.lock.v1",
  lastCrossingDirection: "fd.crossing.lastDirection.v1",
} as const;

export function hasSeenModernFirstLoad(): boolean {
  try {
    return sessionStorage.getItem(CROSSING_SESSION_KEYS.modernFirstLoadSeen) === "1";
  } catch {
    return false;
  }
}

export function markModernFirstLoadSeen(): void {
  try {
    sessionStorage.setItem(CROSSING_SESSION_KEYS.modernFirstLoadSeen, "1");
  } catch {
    /* ignore */
  }
}

export function setCrossingLock(direction: CrossingDirection): void {
  try {
    sessionStorage.setItem(CROSSING_SESSION_KEYS.crossingLock, direction);
  } catch {
    /* ignore */
  }
}

export function clearCrossingLock(): void {
  try {
    sessionStorage.removeItem(CROSSING_SESSION_KEYS.crossingLock);
  } catch {
    /* ignore */
  }
}

export function readCrossingLock(): CrossingDirection | null {
  try {
    const v = sessionStorage.getItem(CROSSING_SESSION_KEYS.crossingLock);
    if (v === "enter-ai" || v === "exit-dialup") return v;
  } catch {
    /* ignore */
  }
  return null;
}

export function setLastCrossingDirection(direction: CrossingDirection): void {
  try {
    sessionStorage.setItem(CROSSING_SESSION_KEYS.lastCrossingDirection, direction);
  } catch {
    /* ignore */
  }
}
