import type { Metadata } from "next";
import OfflinePageClient from "@/components/errors/OfflinePageClient";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/offline", title: "Offline, First Data", description:
    "No internet connection detected. Retry when you are back online or contact First Data support.", });

export const dynamic = "force-static";

export default function OfflinePage() {
  return (
    <main className="pt-20">
      <OfflinePageClient />
    </main>
  );
}
