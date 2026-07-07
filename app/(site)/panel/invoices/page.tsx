import InvoicesClient from "@/components/panel/InvoicesClient";
import { Suspense } from "react";
import { PanelLoading } from "@/components/panel/PanelLayoutClient";

export default function PanelInvoicesPage() {
  return (
    <Suspense fallback={<PanelLoading label="…" />}>
      <InvoicesClient />
    </Suspense>
  );
}
