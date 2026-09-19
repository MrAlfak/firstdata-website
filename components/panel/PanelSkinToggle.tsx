"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  buildPanelSkinCookie,
  type PanelSkin,
} from "@/lib/i18n/panel-skin";
import ShinySkinButton from "@/components/panel/ShinySkinButton";
import HorizonCrossing from "@/components/skin/HorizonCrossing";
import { ExitDialupCrossing } from "@/components/crossing/ExitDialupCrossing";
import { pushAlert } from "@/lib/alerts/types";
import { useT } from "@/i18n/LangProvider";
import {
  forceReleaseCrossing,
  isCrossingBusy,
  releaseCrossing,
  tryAcquireCrossing,
} from "@/lib/crossing/mutex";
import {
  clearCrossingLock,
  setCrossingLock,
  setLastCrossingDirection,
} from "@/lib/crossing/session";
import type { Point } from "@/lib/crossing/types";

export type { PanelSkin };
export const PANEL_SKIN_KEY = "fd-panel-skin";
export const DEFAULT_PANEL_SKIN: PanelSkin = "modern";

type Labels = {
  enterAi: string;
  back56k: string;
  fabEnter: string;
  fabBack: string;
  assemble: string;
  reconnect: string;
  brand: string;
  horizonStatus: string;
  horizonReady: string;
  horizonBeat: string;
  horizonAwaken: string;
  horizonTag: string;
  horizonTagReady: string;
};

const PanelSkinInitialContext = createContext<PanelSkin>(DEFAULT_PANEL_SKIN);

/** SSR cookie → React initial skin (avoids modern→terminal flash). */
export function PanelSkinProvider({
  initialSkin,
  children,
}: {
  initialSkin: PanelSkin;
  children: ReactNode;
}) {
  return (
    <PanelSkinInitialContext.Provider value={initialSkin}>
      {children}
    </PanelSkinInitialContext.Provider>
  );
}

export function normalizePanelSkin(value: unknown): PanelSkin {
  return value === "terminal" ? "terminal" : "modern";
}

/** Read panel skin from localStorage (SSR-safe → default modern). */
export function readStoredPanelSkin(): PanelSkin {
  if (typeof window === "undefined") return DEFAULT_PANEL_SKIN;
  try {
    const v = window.localStorage.getItem(PANEL_SKIN_KEY);
    if (v === "terminal") return "terminal";
    if (v === "modern") return "modern";
    return DEFAULT_PANEL_SKIN;
  } catch {
    return DEFAULT_PANEL_SKIN;
  }
}

function writeSkinLocal(skin: PanelSkin) {
  try {
    window.localStorage.setItem(PANEL_SKIN_KEY, skin);
  } catch {
    /* ignore */
  }
  try {
    document.cookie = buildPanelSkinCookie(skin);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent("fd-panel-skin", { detail: skin }));
}

async function persistSkinAccount(skin: PanelSkin) {
  if (typeof document !== "undefined" && !/(?:^|;\s*)fd_auth=1/.test(document.cookie)) {
    return;
  }
  try {
    await fetch("/api/panel/account", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ panelSkin: skin }),
    });
  } catch {
    /* offline / ignore — local preference still applied */
  }
}

/** Apply skin locally (and optionally sync to the signed-in account). */
export function applyPanelSkin(skin: PanelSkin, opts?: { syncAccount?: boolean }) {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-panel-skin", skin);
  }
  writeSkinLocal(skin);
  if (opts?.syncAccount) void persistSkinAccount(skin);
}

/** Prefer <html data-panel-skin> (set by blocking script) over React default. */
export function readDocumentPanelSkin(): PanelSkin {
  if (typeof document === "undefined") return DEFAULT_PANEL_SKIN;
  const attr = document.documentElement.getAttribute("data-panel-skin");
  if (attr === "terminal" || attr === "modern") return attr;
  return readStoredPanelSkin();
}

/**
 * localStorage is the UI source of truth. Account preference only seeds when
 * the user has no local choice yet; otherwise push local → account.
 */
export function reconcileSkinWithAccount(accountSkin: unknown): void {
  const fromAccount = normalizePanelSkin(accountSkin);
  let local: string | null = null;
  try {
    local = window.localStorage.getItem(PANEL_SKIN_KEY);
  } catch {
    local = null;
  }

  if (local === "modern" || local === "terminal") {
    if (local !== fromAccount) {
      applyPanelSkin(local, { syncAccount: true });
    } else {
      applyPanelSkin(local);
    }
    return;
  }

  applyPanelSkin(fromAccount);
}

/**
 * [skin, setSkin, hydrated]
 * Gate skin-branching UI (Hero) on hydrated to avoid modern→terminal flash.
 */
export function usePanelSkin(): [PanelSkin, (next: PanelSkin) => void, boolean] {
  const initial = useContext(PanelSkinInitialContext);
  const [skin, setSkin] = useState<PanelSkin>(initial);
  const [hydrated, setHydrated] = useState(false);

  useLayoutEffect(() => {
    const stored = readDocumentPanelSkin();
    setSkin(stored);
    if (!document.documentElement.hasAttribute("data-preloader")) {
      document.documentElement.setAttribute("data-panel-skin", stored);
    }
    try {
      document.cookie = buildPanelSkinCookie(stored);
    } catch {
      /* ignore */
    }
    setHydrated(true);

    const onStorage = (e: StorageEvent) => {
      if (e.key === PANEL_SKIN_KEY) setSkin(normalizePanelSkin(e.newValue));
    };
    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent<PanelSkin>).detail;
      if (detail === "modern" || detail === "terminal") setSkin(detail);
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("fd-panel-skin", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("fd-panel-skin", onCustom);
    };
  }, []);

  function set(next: PanelSkin) {
    setSkin(next);
    applyPanelSkin(next, { syncAccount: true });
  }

  return [skin, set, hydrated];
}

function ModemIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="8" width="18" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 8V6.5A1.5 1.5 0 018.5 5h7A1.5 1.5 0 0117 6.5V8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="13.5" r="1.25" fill="currentColor" />
      <circle cx="12" cy="13.5" r="1.25" fill="currentColor" />
      <path d="M16 12.5h2.5v2H16z" fill="currentColor" />
      <path d="M6 19h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AiIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

type CrossingMode = null | "enter-ai" | "exit-dialup";

/** Fixed bottom-left FAB — site-wide. Toggles terminal ↔ modern skin. */
export default function PanelSkinToggle({
  labels,
  dir = "ltr",
}: {
  labels: Labels;
  dir?: "rtl" | "ltr";
}) {
  const [skin, setSkin] = usePanelSkin();
  const [crossing, setCrossing] = useState<CrossingMode>(null);
  const [fabOrigin, setFabOrigin] = useState<Point | null>(null);
  const { d, fa } = useT();
  const locale = fa ? "fa" : "en";
  const isModern = skin === "modern";
  const label = isModern ? labels.back56k : labels.enterAi;
  const face = isModern ? labels.fabBack : labels.fabEnter;
  const busy = crossing != null || isCrossingBusy();

  function toggle(e: MouseEvent<HTMLButtonElement>) {
    // Recover from a stuck mutex (HMR / aborted overlay) so the FAB never bricks.
    if (crossing == null && isCrossingBusy()) {
      forceReleaseCrossing();
      clearCrossingLock();
    }
    if (crossing != null) return;

    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const origin = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    if (isModern) {
      setFabOrigin(origin);
      setCrossing("exit-dialup");
      return;
    }

    if (!tryAcquireCrossing("enter-ai")) {
      forceReleaseCrossing();
      if (!tryAcquireCrossing("enter-ai")) return;
    }
    setCrossingLock("enter-ai");
    setFabOrigin(origin);
    setCrossing("enter-ai");
  }

  function endCrossing() {
    releaseCrossing();
    clearCrossingLock();
    setCrossing(null);
    setFabOrigin(null);
    // Ensure CrossingPortal leftovers never leave the shell inert.
    const shell = document.getElementById("site-shell");
    shell?.removeAttribute("inert");
    shell?.removeAttribute("aria-hidden");
    shell?.removeAttribute("aria-busy");
    document.documentElement.removeAttribute("data-crossing");
    document.documentElement.style.overflow = "";
    // Keep scroll / form / focus context — Crossing is a lens change, not a reload.
    requestAnimationFrame(() => {
      const fab = document.querySelector<HTMLElement>("[data-skin-fab]");
      fab?.focus({ preventScroll: true });
    });
  }

  function finishEnterAi() {
    setLastCrossingDirection("enter-ai");
    endCrossing();
  }

  return (
    <>
      <HorizonCrossing
        active={crossing === "enter-ai"}
        brand={labels.brand}
        dir={dir}
        labels={{
          status: labels.horizonStatus,
          ready: labels.horizonReady,
          beat: labels.horizonBeat,
          awaken: labels.horizonAwaken,
          tag: labels.horizonTag,
          tagReady: labels.horizonTagReady,
        }}
        onReady={() => setSkin("modern")}
        onDone={finishEnterAi}
      />
      <ExitDialupCrossing
        active={crossing === "exit-dialup"}
        locale={locale}
        status={labels.reconnect}
        origin={fabOrigin}
        onCommit={() => setSkin("terminal")}
        onDone={endCrossing}
        onError={() => {
          pushAlert({
            message: d.alerts.skinSwitchFail,
            tone: "error",
            ttl: 4500,
          });
        }}
      />
      <ShinySkinButton
        skin={skin}
        label={label}
        face={face}
        disabled={busy}
        onClick={toggle}
        icon={isModern ? <ModemIcon className="h-[1.05em] w-[1.05em]" /> : <AiIcon className="h-[1.05em] w-[1.05em]" />}
      />
    </>
  );
}
