"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

import { useAlerts } from "@/components/alerts/AlertProvider";
import type { AlertTone } from "@/lib/alerts/types";
import { useT } from "@/i18n/LangProvider";

function ToneIcon({ tone }: { tone: AlertTone }) {
  if (tone === "success") {
    return (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="14" cy="14" r="9.2" />
        <path d="M9.2 14.2 12.4 17.3 18.8 10.7" />
      </svg>
    );
  }
  if (tone === "error") {
    return (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden>
        <circle cx="14" cy="14" r="9.2" />
        <path d="M10 10 18 18M18 10 10 18" />
      </svg>
    );
  }
  if (tone === "warning") {
    return (
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M14 5.2 24.2 22.4H3.8Z" />
        <path d="M14 12.2v4.4M14 19.4h.01" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path className="fd-alert-spark-lg" d="M10.8 4.3c.78 4.72 3.42 7.36 8.14 8.14-4.72.78-7.36 3.42-8.14 8.14-.78-4.72-3.42-7.36-8.14-8.14 4.72-.78 7.36-3.42 8.14-8.14Z" />
      <path className="fd-alert-spark-sm" d="M20.5 3.4c.24 1.52 1.14 2.42 2.66 2.66-1.52.24-2.42 1.14-2.66 2.66-.24-1.52-1.14-2.42-2.66-2.66 1.52-.24 2.42-1.14 2.66-2.66Z" />
    </svg>
  );
}

/**
 * Bottom-right stacked alert cards (ported from alert-stack-demo).
 * Hover / tap expands the pile; swipe or × dismisses.
 */
export default function AlertStack() {
  const { alerts, dismiss } = useAlerts();
  const { d, dir } = useT();
  const a = d.alerts;
  const shellRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [manualOpen, setManualOpen] = useState(false);
  const [hoverOpen, setHoverOpen] = useState(false);
  const [entering, setEntering] = useState<Set<string>>(new Set());
  const [dismissing, setDismissing] = useState<Record<string, number>>({});
  const [openingSheen, setOpeningSheen] = useState(false);
  const closeTimer = useRef(0);
  const sheenTimer = useRef(0);
  const prevIds = useRef<string[]>([]);

  const open = alerts.length > 0 && (manualOpen || hoverOpen);

  useEffect(() => {
    const ids = alerts.map((x) => x.id);
    const fresh = ids.filter((id) => !prevIds.current.includes(id));
    prevIds.current = ids;
    if (!fresh.length) return;
    setEntering((s) => new Set([...s, ...fresh]));
    const t = window.setTimeout(() => {
      setEntering((s) => {
        const n = new Set(s);
        fresh.forEach((id) => n.delete(id));
        return n;
      });
    }, 420);
    return () => clearTimeout(t);
  }, [alerts]);

  useEffect(() => {
    if (!alerts.length) {
      setManualOpen(false);
      setHoverOpen(false);
    }
  }, [alerts.length]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    const cardH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--fd-alert-h")) || 64;
    const gap = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--fd-alert-gap")) || 9;
    const offset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--fd-alert-offset")) || 9;
    const n = alerts.length;
    const expanded = n ? (n - 1) * (cardH + gap) + cardH + 2 : 0;
    shell.style.setProperty("--fd-alert-expanded", `${expanded}px`);
    shell.style.height = open
      ? `var(--fd-alert-expanded)`
      : n
        ? `calc(var(--fd-alert-h) + (var(--fd-alert-offset) * ${Math.min(n - 1, 2)}) + 4px)`
        : "0px";

    listRef.current?.querySelectorAll<HTMLElement>(".fd-alert-card").forEach((card, index) => {
      const closedScale = Math.max(0.86, 1 - index * 0.034);
      const closedWidth = Math.max(84, 100 - index * 4.3);
      const closedOpacity = Math.max(0.58, 1 - index * 0.13);
      card.style.setProperty("--index", String(index));
      card.style.setProperty("--closed-y", `${index * offset}px`);
      card.style.setProperty("--closed-scale", String(closedScale));
      card.style.setProperty("--closed-width", `${closedWidth}%`);
      card.style.setProperty("--closed-opacity", String(closedOpacity));
      card.style.setProperty("--open-y", `${index * (cardH + gap)}px`);
    });
  }, [alerts, open]);

  function replaySheen() {
    window.clearTimeout(sheenTimer.current);
    setOpeningSheen(false);
    requestAnimationFrame(() => {
      setOpeningSheen(true);
      sheenTimer.current = window.setTimeout(() => setOpeningSheen(false), 1100);
    });
  }

  function scheduleClose() {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setHoverOpen(false), 140);
  }

  function dismissCard(id: string, direction = 1) {
    if (dismissing[id]) return;
    setDismissing((d) => ({ ...d, [id]: direction }));
    window.setTimeout(() => {
      dismiss(id);
      setDismissing((d) => {
        const n = { ...d };
        delete n[id];
        return n;
      });
    }, 320);
  }

  function attachSwipe(card: HTMLElement, id: string) {
    let pointerId: number | null = null;
    let startX = 0;
    let currentX = 0;
    let startTime = 0;
    let dragging = false;
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    const onDown = (event: PointerEvent) => {
      if (!coarse || (event.target as HTMLElement).closest("button")) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      currentX = startX;
      startTime = performance.now();
      dragging = true;
      card.classList.add("is-dragging");
      card.setPointerCapture(pointerId);
    };
    const onMove = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== pointerId) return;
      currentX = event.clientX;
      const dx = Math.max(-132, Math.min(132, currentX - startX));
      const opacity = Math.max(0.28, 1 - Math.abs(dx) / 165);
      const openY = getComputedStyle(card).getPropertyValue("--open-y").trim() || "0px";
      const closedY = getComputedStyle(card).getPropertyValue("--closed-y").trim() || "0px";
      const activeY = open ? openY : closedY;
      card.style.transform = `translate3d(calc(-50% + ${dx}px), ${activeY}, 0) rotate(${dx / 38}deg) scale(.988)`;
      card.style.opacity = String(opacity);
    };
    const finish = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== pointerId) return;
      dragging = false;
      card.classList.remove("is-dragging");
      try {
        card.releasePointerCapture(pointerId);
      } catch {
        /* ignore */
      }
      const dx = currentX - startX;
      const elapsed = Math.max(1, performance.now() - startTime);
      const velocity = Math.abs(dx) / elapsed;
      card.style.removeProperty("transform");
      card.style.removeProperty("opacity");
      if (Math.abs(dx) > 72 || (Math.abs(dx) > 42 && velocity > 0.55)) {
        dismissCard(id, Math.sign(dx) || 1);
      }
    };

    card.addEventListener("pointerdown", onDown);
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerup", finish);
    card.addEventListener("pointercancel", finish);
    return () => {
      card.removeEventListener("pointerdown", onDown);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerup", finish);
      card.removeEventListener("pointercancel", finish);
    };
  }

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const cleanups: Array<() => void> = [];
    list.querySelectorAll<HTMLElement>(".fd-alert-card").forEach((card) => {
      const id = card.dataset.id;
      if (id) cleanups.push(attachSwipe(card, id));
    });
    return () => cleanups.forEach((fn) => fn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alerts, open]);

  if (!alerts.length) return null;

  return (
    <div className="fd-alert-dock" dir={dir} aria-live="polite">
      <div
        ref={shellRef}
        className={`fd-alert-shell${openingSheen ? " is-opening" : ""}`}
        data-open={open ? "true" : "false"}
        tabIndex={0}
        role="group"
        aria-label={a.stackLabel}
        aria-expanded={open}
        onMouseEnter={() => {
          if (window.matchMedia("(hover: none)").matches) return;
          window.clearTimeout(closeTimer.current);
          const was = open;
          setHoverOpen(true);
          if (!was) replaySheen();
        }}
        onMouseLeave={scheduleClose}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("button")) return;
          if (!window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
          setManualOpen((v) => {
            const next = !v;
            if (next) replaySheen();
            return next;
          });
          setHoverOpen(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setManualOpen((v) => {
              const next = !v;
              if (next) replaySheen();
              return next;
            });
          }
          if (e.key === "Escape") {
            setManualOpen(false);
            setHoverOpen(false);
          }
        }}
      >
        <ol ref={listRef} className="fd-alert-list">
          {alerts.map((alert) => {
            const tone = alert.tone ?? "info";
            const dirX = dismissing[alert.id];
            return (
              <li
                key={alert.id}
                data-id={alert.id}
                data-tone={tone}
                className={`fd-alert-card${entering.has(alert.id) ? " is-entering" : ""}${
                  dirX ? " is-dismissing" : ""
                }`}
                style={
                  dirX
                    ? ({
                        ["--dismiss-x" as string]: `${dirX * 118}px`,
                        ["--dismiss-r" as string]: `${dirX * 4.5}deg`,
                      } as CSSProperties)
                    : undefined
                }
              >
                <span className="fd-alert-icon" aria-hidden>
                  <ToneIcon tone={tone} />
                </span>
                <span className="fd-alert-message-wrap">
                  <span className="fd-alert-message" dir="auto">
                    {alert.message}
                  </span>
                </span>
                <button
                  type="button"
                  className="fd-alert-dismiss"
                  aria-label={`${a.dismiss}: ${alert.message}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissCard(alert.id, 1);
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
                    <path d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" />
                  </svg>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
