/** Defer a state update until after the current effect body completes. */
export function scheduleUpdate(run: () => void): void {
  queueMicrotask(run);
}
