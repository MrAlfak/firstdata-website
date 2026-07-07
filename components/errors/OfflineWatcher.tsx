"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useT } from "@/i18n/LangProvider";

export default function OfflineWatcher() {
  const { fa, dir, d } = useT();
  const copy = d.errors.inline;
  const pathname = usePathname();
  const router = useRouter();
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const sync = () => setOffline(typeof navigator !== "undefined" && !navigator.onLine);
    sync();

    const onOffline = () => {
      setOffline(true);
      if (pathname !== "/offline") {
        router.replace("/offline");
      }
    };

    const onOnline = () => {
      setOffline(false);
    };

    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);
    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, [pathname, router]);

  if (!offline || pathname === "/offline") return null;

  return (
    <div
      role="alert"
      dir={dir}
      className="fixed inset-x-0 top-0 z-[100] border-b border-amber/30 bg-ink/95 px-4 py-2.5 backdrop-blur-sm"
    >
      <div className={`mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 text-xs text-amber ${fa ? "font-fa" : "font-mono"}`}>
        <span>{copy.offlineBanner}</span>
        <div className="flex gap-2">
          <a href="/offline" className="underline hover:text-paper">
            {copy.offlinePage}
          </a>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="underline hover:text-paper"
          >
            {copy.retry}
          </button>
        </div>
      </div>
    </div>
  );
}
