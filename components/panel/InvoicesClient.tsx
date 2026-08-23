"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CreditCard, Banknote } from "lucide-react";
import { useT } from "@/i18n/LangProvider";
import { scheduleUpdate } from "@/lib/react/schedule-update";
import { panelFetch } from "./panel-fetch";
import { PanelAlert, PanelCard, PanelEmpty } from "./PanelLayoutClient";
import { PanelGateLoading } from "./PanelGateLoading";
import { usePanelSkin } from "./PanelSkinToggle";
import PanelDataTable from "./PanelDataTable";

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

function statusClass(status: string): string {
  if (status === "paid") return "panel-badge border-term/40 bg-term/[0.08] text-term";
  if (status === "unpaid") return "panel-badge border-amber/40 bg-amber/[0.08] text-amber";
  return "panel-badge border-paper/20 bg-paper/[0.03] text-paper/45";
}

function statusHint(status: string, p: ReturnType<typeof useT>["p"]): string {
  if (status === "paid") return p.invoices.statusPaidHint;
  if (status === "unpaid") return p.invoices.statusUnpaidHint;
  if (status === "cancelled") return p.invoices.statusCancelledHint;
  return "";
}

export default function InvoicesClient() {
  const { dir, p, fd } = useT();
  const [skin] = usePanelSkin();
  const isModern = skin === "modern";
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

  if (!invoices) return <PanelGateLoading label={p.common.loading} />;

  const alerts = (
    <>
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
    </>
  );

  if (isModern) {
    return (
      <div dir={dir}>
        <h1 className="text-2xl text-paper">{p.invoices.title}</h1>
        {alerts}
        <div className="mt-6">
          <PanelDataTable
            title={p.invoices.title}
            description={p.invoices.statusUnpaidHint}
            primaryHeader={p.invoices.title}
            columnHeaders={[p.common.amount, p.common.status, p.invoices.dueAt]}
            actionsHeader={p.common.action}
            showCheckbox
            empty={
              <PanelEmpty
                label={p.common.empty}
                title={p.invoices.emptyTitle}
                description={p.invoices.emptyHint}
              />
            }
            rows={invoices.map((inv) => {
              const paying = payingId === inv.id;
              return {
                id: String(inv.id),
                icon: CreditCard,
                iconClassName: inv.status === "paid" ? "text-teal-400" : "text-amber-400",
                iconBgClassName: inv.status === "paid" ? "bg-teal-400/20" : "bg-amber-400/20",
                title: inv.title,
                subtitle: [inv.number, inv.project_title].filter(Boolean).join(" · "),
                cells: [
                  <span key="amt" dir="ltr">
                    {fd(inv.amount_rial.toLocaleString("en-US"))} {p.common.currency}
                  </span>,
                  <span
                    key="st"
                    className={`inline-flex border px-2 py-0.5 text-[11px] tracking-wide ${statusClass(inv.status)}`}
                  >
                    {p.status.invoice[inv.status] ?? inv.status}
                  </span>,
                  inv.due_at ? <span key="due" dir="ltr">{inv.due_at}</span> : "—",
                ],
                actions: [
                  ...(inv.status === "unpaid"
                    ? [
                        {
                          label: paying ? p.invoices.paying : p.invoices.payOnline,
                          icon: Banknote,
                          disabled: paying,
                          onSelect: () => void pay(inv.id),
                        },
                      ]
                    : []),
                ],
              };
            })}
          />
        </div>
      </div>
    );
  }

  return (
    <div dir={dir}>
      <h1 className="text-2xl text-paper">{p.invoices.title}</h1>
      {alerts}

      {invoices.length === 0 ? (
        <div className="mt-6">
          <PanelEmpty
            label={p.common.empty}
            title={p.invoices.emptyTitle}
            description={p.invoices.emptyHint}
          />
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {invoices.map((inv) => {
            const hint = statusHint(inv.status, p);
            const paying = payingId === inv.id;
            return (
              <li key={inv.id}>
                <PanelCard>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-paper/40" dir="ltr">
                        {inv.number}
                      </p>
                      <p className="mt-1 text-lg font-medium text-paper">{inv.title}</p>
                    </div>
                    <span
                      className={`border px-2.5 py-1 text-[11px] tracking-wide ${statusClass(
                        inv.status,
                      )}`}
                    >
                      {p.status.invoice[inv.status] ?? inv.status}
                    </span>
                  </div>
                  {inv.project_title && (
                    <p className="mt-1 text-xs text-paper/45">{inv.project_title}</p>
                  )}
                  <p className="mt-2 text-base font-semibold text-term" dir="ltr">
                    {fd(inv.amount_rial.toLocaleString("en-US"))} {p.common.currency}
                  </p>
                  {inv.due_at && (
                    <p className="mt-1 text-xs text-paper/40">
                      {p.invoices.dueAt}:{" "}
                      <span dir="ltr">{inv.due_at}</span>
                    </p>
                  )}
                  {hint ? <p className="mt-2 text-xs leading-relaxed text-paper/50">{hint}</p> : null}
                  {inv.status === "unpaid" && (
                    <button
                      type="button"
                      disabled={paying}
                      onClick={() => pay(inv.id)}
                      className="mt-3 inline-flex items-center border border-term/40 bg-term/10 px-4 py-2 text-xs font-medium text-term transition-colors hover:bg-term/20 disabled:opacity-50"
                    >
                      {paying ? p.invoices.paying : p.invoices.payOnline}
                    </button>
                  )}
                </PanelCard>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
