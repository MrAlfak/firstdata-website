"use client";

import { useEffect } from "react";

function shouldReport(message: string): boolean {
  if (!message) return false;
  if (message.includes("ResizeObserver loop")) return false;
  if (message.includes("Loading chunk")) return false;
  return true;
}

export default function ClientErrorReporter() {
  useEffect(() => {
    const report = (payload: {
      message?: string;
      stack?: string;
      digest?: string;
    }) => {
      if (!payload.message || !shouldReport(payload.message)) return;
      fetch("/api/report-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      }).catch(() => undefined);
    };

    const onError = (event: ErrorEvent) => {
      report({ message: event.message, stack: event.error?.stack });
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message = reason instanceof Error ? reason.message : String(reason ?? "");
      report({
        message,
        stack: reason instanceof Error ? reason.stack : undefined,
      });
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}
