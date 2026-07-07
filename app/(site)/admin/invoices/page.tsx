"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import UserSearchInput from "@/components/admin/UserSearchInput";
import { PanelCard, PanelEmpty, PanelLoading } from "@/components/panel/PanelLayoutClient";
import type { AdminInvoiceRow } from "@/lib/panel/admin-repository";

export default function AdminInvoicesPage() {
  const { dir, a, fd } = useT();
  const inv = a.invoices;
  const [invoices, setInvoices] = useState<AdminInvoiceRow[] | null>(null);
  const [filter, setFilter] = useState("");
  const [clientId, setClientId] = useState<number | null>(null);
  const [form, setForm] = useState({
    number: "",
    title: "",
    amountRial: "",
    projectId: "",
    payUrl: "",
    dueAt: "",
  });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  function load(status?: string) {
    const q = status ? `?status=${status}` : "";
    fetch(`/api/admin/invoices${q}`)
      .then((r) => r.json())
      .then((j) => j.success && setInvoices(j.invoices));
  }

  useEffect(() => {
    load(filter || undefined);
  }, [filter]);

  async function createInvoice(e: React.FormEvent) {
    e.preventDefault();
    if (!clientId) return;
    setBusy(true);
    setMsg("");
    const res = await fetch("/api/admin/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: clientId,
        number: form.number,
        title: form.title,
        amountRial: Number(form.amountRial) || 0,
        projectId: form.projectId ? Number(form.projectId) : undefined,
        payUrl: form.payUrl || undefined,
        dueAt: form.dueAt || undefined,
      }),
    });
    setBusy(false);
    const j = await res.json();
    if (j.success) {
      setForm({ number: "", title: "", amountRial: "", projectId: "", payUrl: "", dueAt: "" });
      setMsg(a.common.success);
      load(filter || undefined);
    } else {
      setMsg(j.message ?? a.common.failed);
    }
  }

  async function markPaid(id: number) {
    if (!confirm(inv.markPaidConfirm)) return;
    const refId = prompt(inv.refId) ?? `manual-${Date.now()}`;
    await fetch(`/api/admin/invoices/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "markPaid", refId }),
    });
    load(filter || undefined);
  }

  if (!invoices) return <PanelLoading label={a.common.loading} />;

  const inputClass = "border border-paper/20 bg-transparent px-3 py-2 text-sm text-paper w-full";

  return (
    <div dir={dir}>
      <h1 className="text-2xl text-paper">{inv.title}</h1>

      <PanelCard className="mt-6">
        <h2 className="text-sm text-paper/60">{inv.create}</h2>
        <form onSubmit={createInvoice} className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <UserSearchInput
              value={clientId}
              onSelect={(u) => setClientId(u?.id ?? null)}
              placeholder={inv.selectClient}
            />
          </div>
          <input
            required
            placeholder={inv.number}
            value={form.number}
            onChange={(e) => setForm({ ...form, number: e.target.value })}
            className={inputClass}
            dir="ltr"
          />
          <input
            required
            placeholder={inv.titleField}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
          />
          <input
            required
            placeholder={inv.amountRial}
            value={form.amountRial}
            onChange={(e) => setForm({ ...form, amountRial: e.target.value })}
            className={inputClass}
            dir="ltr"
          />
          <input
            placeholder={inv.projectOptional}
            value={form.projectId}
            onChange={(e) => setForm({ ...form, projectId: e.target.value })}
            className={inputClass}
            dir="ltr"
          />
          <input
            placeholder={inv.payUrl}
            value={form.payUrl}
            onChange={(e) => setForm({ ...form, payUrl: e.target.value })}
            className={inputClass}
            dir="ltr"
          />
          <input
            type="date"
            placeholder={inv.dueAt}
            value={form.dueAt}
            onChange={(e) => setForm({ ...form, dueAt: e.target.value })}
            className={inputClass}
            dir="ltr"
          />
          <button
            type="submit"
            disabled={busy || !clientId}
            className="border border-accent/50 px-4 py-2 text-sm text-accent sm:col-span-2"
          >
            {a.common.submit}
          </button>
        </form>
        {msg && <p className="mt-2 text-xs text-term">{msg}</p>}
      </PanelCard>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter("")}
          className={`border px-3 py-1 text-xs ${!filter ? "border-accent/50 text-accent" : "border-paper/20 text-paper/50"}`}
        >
          {a.common.all}
        </button>
        <button
          type="button"
          onClick={() => setFilter("unpaid")}
          className={`border px-3 py-1 text-xs ${filter === "unpaid" ? "border-accent/50 text-accent" : "border-paper/20 text-paper/50"}`}
        >
          {inv.unpaid}
        </button>
        <button
          type="button"
          onClick={() => setFilter("paid")}
          className={`border px-3 py-1 text-xs ${filter === "paid" ? "border-accent/50 text-accent" : "border-paper/20 text-paper/50"}`}
        >
          {inv.paid}
        </button>
      </div>

      {invoices.length === 0 ? (
        <PanelCard className="mt-6">
          <PanelEmpty label={a.common.empty} />
        </PanelCard>
      ) : (
        <ul className="mt-6 space-y-2">
          {invoices.map((row) => (
            <li key={row.id}>
              <PanelCard>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-sm text-paper">
                      {row.number} — {row.title}
                    </p>
                    <p className="mt-1 text-xs text-paper/45">
                      {row.user_name}
                      {row.project_title ? ` · ${row.project_title}` : ""}
                    </p>
                    <p className="mt-1 text-xs text-paper/40">
                      {row.status} · {fd(row.amount_rial)} {a.common.status}
                    </p>
                  </div>
                  {row.status === "unpaid" && (
                    <button
                      type="button"
                      onClick={() => markPaid(row.id)}
                      className="border border-term/40 px-3 py-1 text-xs text-term"
                    >
                      {a.common.markPaid}
                    </button>
                  )}
                </div>
              </PanelCard>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
