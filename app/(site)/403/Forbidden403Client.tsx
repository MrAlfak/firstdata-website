"use client";

import SiteErrorPage from "@/components/errors/SiteErrorPage";

export default function Forbidden403Client() {
  return (
    <main>
      <SiteErrorPage pageKey="forbidden" code="403" tone="warn" />
    </main>
  );
}
