"use client";

export type AlertTone = "info" | "success" | "error" | "warning";

export type AlertItem = {
  id: string;
  message: string;
  tone?: AlertTone;
  createdAt: number;
};

export type AlertInput = {
  message: string;
  tone?: AlertTone;
  /** Auto-dismiss after ms (0 = keep until user dismisses). Default 7000. */
  ttl?: number;
  id?: string;
};

export const FD_ALERT_EVENT = "fd-alert";

/** Fire an alert from anywhere (components, listeners, non-React). */
export function pushAlert(input: AlertInput) {
  if (typeof window === "undefined") return;
  const message = input.message?.trim();
  if (!message) return;
  window.dispatchEvent(
    new CustomEvent(FD_ALERT_EVENT, {
      detail: {
        id: input.id ?? `a-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        message,
        tone: input.tone ?? "info",
        ttl: input.ttl ?? 7000,
      } satisfies AlertInput & { id: string },
    }),
  );
}
