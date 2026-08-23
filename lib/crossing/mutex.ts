import type { CrossingDirection } from "./types";

let lock: CrossingDirection | null = null;
let acquiredAt = 0;

/** Stale locks (HMR / aborted ceremony) must not permanently disable the FAB. */
const STALE_MS = 20_000;

function clearIfStale(): void {
  if (lock && acquiredAt > 0 && Date.now() - acquiredAt > STALE_MS) {
    lock = null;
    acquiredAt = 0;
  }
}

export function tryAcquireCrossing(direction: CrossingDirection): boolean {
  clearIfStale();
  if (lock) return false;
  lock = direction;
  acquiredAt = Date.now();
  return true;
}

export function releaseCrossing(): void {
  lock = null;
  acquiredAt = 0;
}

export function getCrossingLock(): CrossingDirection | null {
  clearIfStale();
  return lock;
}

export function isCrossingBusy(): boolean {
  clearIfStale();
  return lock != null;
}

/** Force-clear (FAB safety / page hide). */
export function forceReleaseCrossing(): void {
  lock = null;
  acquiredAt = 0;
}
