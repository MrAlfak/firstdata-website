"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useT } from "@/i18n/LangProvider";
import { scheduleUpdate } from "@/lib/react/schedule-update";
import { panelFetch } from "./panel-fetch";
import { PanelAlert, PanelCard, PanelEmpty, PanelLoading } from "./PanelLayoutClient";

type InvoiceItem = {
  id: number;
  number: string;
  title: string;
  amount_rial: number;
  status: string;
  pay_url: string | null;
  project_title: string | null;
  due_at: string | null;
};

export default function InvoicesClient() {
  const { dir, p, fd } = useT();
  const searchParams = useSearchParams();
  const payment = searchParams.get("payment");
  const [invoices, setInvoices] = useState<InvoiceItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [payingId, setPayingId] = useState<number | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!redirectUrl) return;
    window.location.assign(redirectUrl);
  }, [redirectUrl]);

  useEffect(() => {
    scheduleUpdate(() => {
      void panelFetch<{ invoices: InvoiceItem[] }>("/api/panel/invoices").then((res) => {
        if (!res.ok) {
          setError(res.message);
          setInvoices([]);
          return;
        }
        setInvoices(res.body.invoices);
      });
    });
  }, []);

  async function pay(invoiceId: number) {
    setPayingId(invoiceId);
    const res = await fetch(`/api/panel/invoices/${invoiceId}/pay`, { method: "POST" });
    const j = await res.json();
    setPayingId(null);
    if (j.success && j.redirectUrl) {
      setRedirectUrl(j.redirectUrl);
    }
  }

  if (!invoices) return <PanelLoading label={p.common.loading} />;

  return (
    <div dir={dir}>
      <h1 className="text-2xl text-paper">{p.invoices.title}</h1>

      {payment === "success" && (
        <div className="mt-4">
          <PanelAlert message={p.invoices.paymentSuccess} variant="success" />
        </div>
      )}
      {payment === "failed" && (
        <div className="mt-4">
          <PanelAlert message={p.invoices.paymentFailed} />
        </div>
      )}
      {error && (
        <div className="mt-4">
          <PanelAlert message={p.common.loadFailed} />
        </div>
      )}

      {invoices.length === 0 ? (
        <PanelCard className="mt-6">
          <PanelEmpty label={p.common.empty} />
        </PanelCard>
      ) : (
        <ul className="mt-6 space-y-3">
          {invoices.map((inv) => (
            <li key={inv.id}>
              <PanelCard>
                <p className="font-mono text-xs text-paper/40" dir="ltr">
                  {inv.number}
                </p>
                <p className="mt-1 text-lg text-paper">{inv.title}</p>
                {inv.project_title && (
                  <p className="mt-1 text-xs text-paper/45">{inv.project_title}</p>
                )}
                <p className="mt-2 text-sm text-term" dir="ltr">
                  {fd(inv.amount_rial.toLocaleString("en-US"))} {p.common.currency}
                </p>
                <p className="mt-1 text-xs text-paper/40">
                  {p.status.invoice[inv.status] ?? inv.status}
                </p>
                {inv.status === "unpaid" && (
                  <button
                    type="button"
                    disabled={payingId === inv.id}
                    onClick={() => pay(inv.id)}
                    className="mt-3 inline-block border border-term/40 px-3 py-1.5 text-xs text-term disabled:opacity-50"
                  >
                    {p.invoices.payOnline}
                  </button>
                )}
              </PanelCard>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
