"use client";

import { useEffect } from "react";

const SW_URL = "/sw.js";

function shouldRegisterServiceWorker(): boolean {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return false;
  }

  return (
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_ENABLE_SW === "true"
  );
}

/**
 * Register the offline service worker and warm-cache the /offline route.
 * Do not reload on first SW claim — that was replaying the first-load preloader.
 */
export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (!shouldRegisterServiceWorker()) return;

    let cancelled = false;
    /** True if a SW already controlled this page before we registered (update path). */
    const hadControllerAtStart = Boolean(navigator.serviceWorker.controller);

    const register = async () => {
      try {
        const registration = await navigator.serviceWorker.register(SW_URL, {
          scope: "/",
          updateViaCache: "none",
        });

        if (cancelled) return;

        registration.addEventListener("updatefound", () => {
          const worker = registration.installing;
          if (!worker) return;
          worker.addEventListener("statechange", () => {
            // Only skip-waiting when replacing an existing controller (update).
            if (worker.state === "installed" && navigator.serviceWorker.controller) {
              worker.postMessage({ type: "SKIP_WAITING" });
            }
          });
        });

        void fetch("/offline", { cache: "reload" }).catch(() => undefined);
      } catch {
        /* SW unsupported or blocked */
      }
    };

    void register();

    const onControllerChange = () => {
      // First install + clients.claim() fires controllerchange — do not hard-reload
      // or the boot preloader runs twice on the user's first visit.
      if (!hadControllerAtStart) return;
      if (sessionStorage.getItem("fd-sw-reloaded") === "1") return;
      sessionStorage.setItem("fd-sw-reloaded", "1");
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);

    return () => {
      cancelled = true;
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
    };
  }, []);

  return null;
}
