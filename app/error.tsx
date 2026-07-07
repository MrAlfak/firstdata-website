"use client";

import { useEffect } from "react";
import SiteErrorPage from "@/components/errors/SiteErrorPage";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const detail = [
    "✸ runtime exception",
    `  ${error.message || "unknown error"}${error.digest ? `\n  digest: ${error.digest}` : ""}`,
  ].join("\n");

  return (
    <main className="flex min-h-screen items-center pt-8">
      <SiteErrorPage
        pageKey="server"
        code="500"
        tone="danger"
        detail={detail}
        onRetry={reset}
      />
    </main>
  );
}
