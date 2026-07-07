"use client";

import { scheduleUpdate } from "@/lib/react/schedule-update";
import { useCallback, useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import {
  dismissInstallPrompt,
  dismissPushPrompt,
  getVapidPublicKey,
  isBeforeInstallPromptEvent,
  isInstallDismissed,
  isPushDismissed,
  isPwaInstalled,
  subscribeToPush,
  type BeforeInstallPromptEvent,
} from "@/lib/pwa/client";

function shouldEnablePwaUi(): boolean {
  return (
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_ENABLE_SW === "true"
  );
}

type PromptKind = "install" | "push" | null;

export default function PwaPrompts() {
  const { fa, dir, lang, d } = useT();
  const copy = d.pwa;

  const [prompt, setPrompt] = useState<PromptKind>(null);
  const [installed, setInstalled] = useState(false);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [deferredInstall, setDeferredInstall] = useState<BeforeInstallPromptEvent | null>(null);

  const pushAvailable =
    typeof window !== "undefined" &&
    "Notification" in window &&
    "PushManager" in window &&
    Boolean(getVapidPublicKey());

  const evaluatePrompt = useCallback(() => {
    if (!shouldEnablePwaUi()) {
      setPrompt(null);
      return;
    }

    const standalone = isPwaInstalled();
    setInstalled(standalone);

    if (deferredInstall && !standalone && !isInstallDismissed()) {
      setPrompt("install");
      return;
    }

    if (
      pushAvailable &&
      Notification.permission === "default" &&
      !isPushDismissed()
    ) {
      setPrompt("push");
      return;
    }

    setPrompt(null);
  }, [deferredInstall, pushAvailable]);

  useEffect(() => {
    if (!shouldEnablePwaUi()) return;

    scheduleUpdate(() => setInstalled(isPwaInstalled()));

    const onInstallPrompt = (event: Event) => {
      if (!isBeforeInstallPromptEvent(event)) return;
      event.preventDefault();
      setDeferredInstall(event);
    };

    const onInstalled = () => {
      setInstalled(true);
      setDeferredInstall(null);
      dismissInstallPrompt();
      evaluatePrompt();
    };

    window.addEventListener("beforeinstallprompt", onInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);

    const delay = window.setTimeout(evaluatePrompt, 1200);

    return () => {
      window.removeEventListener("beforeinstallprompt", onInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
      window.clearTimeout(delay);
    };
  }, [evaluatePrompt]);

  useEffect(() => {
    const id = window.setTimeout(evaluatePrompt, 0);
    return () => window.clearTimeout(id);
  }, [deferredInstall, evaluatePrompt]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const onInstall = async () => {
    if (!deferredInstall) return;
    setBusy(true);
    try {
      await deferredInstall.prompt();
      const { outcome } = await deferredInstall.userChoice;
      if (outcome === "accepted") {
        setToast(copy.installSuccess);
        setInstalled(true);
      }
      setDeferredInstall(null);
      dismissInstallPrompt();
      evaluatePrompt();
    } finally {
      setBusy(false);
    }
  };

  const onInstallDismiss = () => {
    dismissInstallPrompt();
    setPrompt(null);
    evaluatePrompt();
  };

  const onPushEnable = async () => {
    setBusy(true);
    try {
      const result = await subscribeToPush(lang);
      if (result.ok) {
        setToast(copy.pushSuccess);
        dismissPushPrompt();
        setPrompt(null);
        return;
      }
      if (result.reason === "denied") {
        setToast(copy.pushDenied);
      } else if (result.reason === "unsupported") {
        setToast(copy.pushUnsupported);
      }
      dismissPushPrompt();
      setPrompt(null);
    } finally {
      setBusy(false);
    }
  };

  const onPushDismiss = () => {
    dismissPushPrompt();
    setPrompt(null);
  };

  if (!prompt && !toast && !installed) return null;

  return (
    <>
      {installed && !prompt && (
        <div
          dir={dir}
          className={`fixed bottom-4 start-4 z-[108] hidden border border-term/25 bg-ink/90 px-2.5 py-1 text-[10px] text-term/70 backdrop-blur-sm sm:block ${fa ? "font-fa" : "font-mono uppercase tracking-wider"}`}
          aria-live="polite"
        >
          {copy.installedBadge}
        </div>
      )}

      {prompt && (
        <div
          role="dialog"
          aria-live="polite"
          dir={dir}
          className="fixed inset-x-0 bottom-0 z-[115] border-t border-paper/20 bg-ink/95 px-4 py-4 backdrop-blur-sm"
        >
          <div className={`mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${fa ? "font-fa" : "font-mono"}`}>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-term/60">
                fd://pwa
              </p>
              <p className="mt-1 text-sm text-paper">
                {prompt === "install" ? copy.installTitle : copy.pushTitle}
              </p>
              <p className="mt-1 text-xs text-paper/55">
                {prompt === "install" ? copy.installBody : copy.pushBody}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                disabled={busy}
                onClick={prompt === "install" ? onInstallDismiss : onPushDismiss}
                className="border border-paper/25 px-3 py-1.5 text-[10px] uppercase tracking-wider text-paper/50 hover:text-paper disabled:opacity-50"
              >
                {prompt === "install" ? copy.installDismiss : copy.pushDismiss}
              </button>
              <button
                type="button"
                disabled={busy || (prompt === "install" && !deferredInstall)}
                onClick={prompt === "install" ? onInstall : onPushEnable}
                className="border border-term/40 bg-term/10 px-3 py-1.5 text-[10px] uppercase tracking-wider text-term hover:bg-term/20 disabled:opacity-50"
              >
                {prompt === "install" ? copy.installAction : copy.pushAction}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          dir={dir}
          className={`fixed bottom-4 end-4 z-[116] border border-term/30 bg-ink/95 px-3 py-2 text-xs text-term shadow-lg ${fa ? "font-fa" : "font-mono"}`}
          role="status"
        >
          {toast}
        </div>
      )}
    </>
  );
}
