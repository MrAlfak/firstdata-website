"use client";

import { Suspense } from "react";
import SiteErrorPage from "@/components/errors/SiteErrorPage";

function ForbiddenInner() {
  return <SiteErrorPage pageKey="forbidden" code="403" tone="warn" />;
}

export default function ForbiddenPage() {
  return (
    <main>
      <Suspense>
        <ForbiddenInner />
      </Suspense>
    </main>
  );
}
