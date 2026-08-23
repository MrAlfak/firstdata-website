"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  FD_ALERT_EVENT,
  pushAlert as dispatchAlert,
  type AlertInput,
  type AlertItem,
  type AlertTone,
} from "@/lib/alerts/types";

type Ctx = {
  alerts: AlertItem[];
  push: (input: AlertInput) => void;
  dismiss: (id: string) => void;
  clear: () => void;
};

const AlertContext = createContext<Ctx | null>(null);
const MAX_ALERTS = 6;

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const timers = useRef(new Map<string, number>());

  const clearTimer = useCallback((id: string) => {
    const t = timers.current.get(id);
    if (t) {
      window.clearTimeout(t);
      timers.current.delete(id);
    }
  }, []);

  const dismiss = useCallback(
    (id: string) => {
      clearTimer(id);
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    },
    [clearTimer],
  );

  const push = useCallback(
    (input: AlertInput) => {
      const message = input.message?.trim();
      if (!message) return;
      const id = input.id ?? `a-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const tone: AlertTone = input.tone ?? "info";
      const ttl = input.ttl ?? 7000;
      const item: AlertItem = { id, message, tone, createdAt: Date.now() };

      setAlerts((prev) => {
        const next = [item, ...prev.filter((a) => a.id !== id)].slice(0, MAX_ALERTS);
        return next;
      });

      clearTimer(id);
      if (ttl > 0) {
        timers.current.set(
          id,
          window.setTimeout(() => dismiss(id), ttl),
        );
      }
    },
    [clearTimer, dismiss],
  );

  const clear = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current.clear();
    setAlerts([]);
  }, []);

  useEffect(() => {
    const onEvent = (e: Event) => {
      const detail = (e as CustomEvent<AlertInput & { id?: string }>).detail;
      if (!detail?.message) return;
      push(detail);
    };
    window.addEventListener(FD_ALERT_EVENT, onEvent);
    return () => window.removeEventListener(FD_ALERT_EVENT, onEvent);
  }, [push]);

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current.clear();
    };
  }, []);

  const value = useMemo(
    () => ({ alerts, push, dismiss, clear }),
    [alerts, push, dismiss, clear],
  );

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
}

export function useAlerts() {
  const ctx = useContext(AlertContext);
  if (!ctx) {
    return {
      alerts: [] as AlertItem[],
      push: dispatchAlert,
      dismiss: () => undefined,
      clear: () => undefined,
    };
  }
  return ctx;
}

export { dispatchAlert as pushAlert };
