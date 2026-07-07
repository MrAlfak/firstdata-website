"use client";

import SiteErrorPage from "@/components/errors/SiteErrorPage";

export default function MaintenancePage() {
  return (
    <main>
      <SiteErrorPage pageKey="maintenance" code="503" tone="warn" />
    </main>
  );
}
