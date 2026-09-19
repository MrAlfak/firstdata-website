"use client";

import { useEffect } from "react";
import SiteErrorPage from "@/components/errors/SiteErrorPage";

export default function SessionExpiredClient({ nextPath }: { nextPath: string }) {
  useEffect(() => {
    fetch("/api/auth/logout", { method: "POST" }).catch(() => undefined);
  }, []);

  return <SiteErrorPage pageKey="sessionExpired" code="401" tone="warn" loginNext={nextPath} />;
}
