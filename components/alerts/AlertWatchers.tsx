"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { pushAlert } from "@/lib/alerts/types";
import { useT } from "@/i18n/LangProvider";

/**
 * Global alert triggers — external tabs, clipboard, network, panel route changes.
 * Feature UIs also call pushAlert() directly for form success/errors.
 */
export default function AlertWatchers() {
  const { d } = useT();
  const a = d.alerts;
  const pathname = usePathname();
  const prevPath = useRef<string | null>(null);
  const booted = useRef(false);

  useEffect(() => {
    if (!booted.current) {
      booted.current = true;
      prevPath.current = pathname;
      return;
    }
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    if (
      pathname.startsWith("/panel") ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/auth")
    ) {
      pushAlert({ message: a.pageOpened, tone: "info", ttl: 3200 });
    }
  }, [pathname, a.pageOpened]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const anchor = t?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      const isExternal =
        anchor.target === "_blank" ||
        ((/^https?:\/\//i.test(href) || href.startsWith("//")) &&
          !href.includes(window.location.host));
      if (isExternal) {
        pushAlert({ message: a.externalTab, tone: "info", ttl: 4000 });
      }
    };

    const onCopy = () => {
      pushAlert({ message: a.copied, tone: "success", ttl: 2800 });
    };

    const onOffline = () => {
      pushAlert({ message: a.offline, tone: "warning", ttl: 0 });
    };
    const onOnline = () => {
      pushAlert({ message: a.online, tone: "success", ttl: 4000 });
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("copy", onCopy);
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("copy", onCopy);
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, [a.copied, a.externalTab, a.offline, a.online]);

  return null;
}
