"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SiteErrorPage from "@/components/errors/SiteErrorPage";

function SessionExpiredInner() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/panel";

  useEffect(() => {
    fetch("/api/auth/logout", { method: "POST" }).catch(() => undefined);
  }, []);

  return (
    <SiteErrorPage pageKey="sessionExpired" code="401" tone="warn" loginNext={next} />
  );
}

export default function SessionExpiredPage() {
  return (
    <main>
      <Suspense>
        <SessionExpiredInner />
      </Suspense>
    </main>
  );
}
