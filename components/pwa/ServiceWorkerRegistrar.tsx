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
 */
export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (!shouldRegisterServiceWorker()) return;

    let cancelled = false;

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
            if (worker.state === "installed" && navigator.serviceWorker.controller) {
              worker.postMessage({ type: "SKIP_WAITING" });
            }
          });
        });

        // Warm offline page + assets while online.
        void fetch("/offline", { cache: "reload" }).catch(() => undefined);
      } catch {
        /* SW unsupported or blocked */
      }
    };

    void register();

    const onControllerChange = () => {
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
