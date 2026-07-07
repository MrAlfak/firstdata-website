"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";

function isChunkError(message: string): boolean {
  return (
    /loading chunk/i.test(message) ||
    /chunkloaderror/i.test(message) ||
    /failed to fetch dynamically imported module/i.test(message)
  );
}

export default function ChunkErrorHandler() {
  const { fa, dir, d } = useT();
  const copy = d.errors.inline;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      if (event.message && isChunkError(event.message)) setVisible(true);
    };
    const onRejection = (event: PromiseRejectionEvent) => {
      const msg = event.reason instanceof Error ? event.reason.message : String(event.reason ?? "");
      if (isChunkError(msg)) setVisible(true);
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="alert"
      dir={dir}
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-terr/30 bg-ink/95 px-4 py-3 backdrop-blur-sm"
    >
      <div className={`mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 text-xs text-terr ${fa ? "font-fa" : "font-mono"}`}>
        <span>{copy.chunkLoad}</span>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="border border-terr/40 px-3 py-1 uppercase tracking-wider hover:bg-terr/10"
        >
          {copy.retry}
        </button>
      </div>
    </div>
  );
}
