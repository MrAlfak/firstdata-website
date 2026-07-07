"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import UserSearchInput from "@/components/admin/UserSearchInput";
import { PanelCard, PanelEmpty, PanelLoading } from "@/components/panel/PanelLayoutClient";
import type { AdminContractListRow } from "@/lib/panel/admin-repository";

export default function AdminContractsPage() {
  const { dir, a } = useT();
  const c = a.contracts;
  const [contracts, setContracts] = useState<AdminContractListRow[] | null>(null);
  const [clientId, setClientId] = useState<number | null>(null);
  const [form, setForm] = useState({
    projectId: "",
    title: "",
    summary: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  function load() {
    fetch("/api/admin/contracts")
      .then((r) => r.json())
      .then((j) => j.success && setContracts(j.contracts));
  }

  useEffect(() => {
    load();
  }, []);

  async function upload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !clientId) return;
    setBusy(true);
    setMsg("");
    const fd = new FormData();
    fd.append("file", file);
    fd.append("userId", String(clientId));
    fd.append("projectId", form.projectId);
    fd.append("title", form.title);
    if (form.summary) fd.append("summary", form.summary);
    const res = await fetch("/api/admin/contracts", { method: "POST", body: fd });
    setBusy(false);
    const j = await res.json();
    if (j.success) {
      setMsg(a.common.success);
      load();
    } else {
      setMsg(j.message ?? a.common.failed);
    }
  }

  async function generatePdf(e: React.FormEvent) {
    e.preventDefault();
    if (!clientId) return;
    setBusy(true);
    setMsg("");
    const res = await fetch("/api/admin/contracts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: clientId,
        projectId: Number(form.projectId),
        title: form.title,
        summary: form.summary || undefined,
      }),
    });
    setBusy(false);
    const j = await res.json();
    if (j.success) {
      setMsg(a.common.success);
      load();
    } else {
      setMsg(j.message ?? a.common.failed);
    }
  }

  const inputClass = "border border-paper/20 bg-transparent px-3 py-2 text-sm text-paper w-full";

  return (
    <div dir={dir}>
      <h1 className="text-2xl text-paper">{c.title}</h1>

      <PanelCard className="mt-6">
        <h2 className="text-sm text-paper/60">{c.uploadTitle}</h2>
        <form className="mt-3 grid gap-3">
          <UserSearchInput
            value={clientId}
            onSelect={(u) => setClientId(u?.id ?? null)}
            placeholder={c.selectClient}
          />
          <input
            required
            placeholder={c.projectId}
            value={form.projectId}
            onChange={(e) => setForm({ ...form, projectId: e.target.value })}
            className={inputClass}
            dir="ltr"
          />
          <input
            required
            placeholder={c.titleField}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
          />
          <textarea
            placeholder={a.common.summary}
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
            className={inputClass}
            rows={2}
          />
          <label className="text-xs text-paper/50">
            {c.pickFile}
            <input
              type="file"
              accept="application/pdf,.pdf"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="mt-1 block w-full text-xs"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy || !file || !clientId}
              onClick={upload}
              className="border border-accent/50 px-4 py-2 text-sm text-accent"
            >
              {a.common.upload}
            </button>
            <button
              type="button"
              disabled={busy || !clientId}
              onClick={generatePdf}
              className="border border-paper/30 px-4 py-2 text-sm text-paper/70"
            >
              {a.common.generate}
            </button>
          </div>
        </form>
        {msg && <p className="mt-3 text-xs text-term">{msg}</p>}
      </PanelCard>

      {!contracts ? (
        <PanelLoading label={a.common.loading} />
      ) : contracts.length === 0 ? (
        <PanelCard className="mt-6">
          <PanelEmpty label={a.common.empty} />
        </PanelCard>
      ) : (
        <PanelCard className="mt-6">
          <h2 className="text-sm text-paper/60">{c.listTitle}</h2>
          <ul className="mt-3 space-y-2">
            {contracts.map((row) => (
              <li key={row.id} className="border-b border-paper/10 pb-2 text-xs text-paper/60 last:border-0">
                <p className="text-sm text-paper">{row.title}</p>
                <p className="mt-1">
                  {row.user_name} · {row.project_title} ·{" "}
                  {row.status === "signed" ? c.signed : c.pending}
                </p>
              </li>
            ))}
          </ul>
        </PanelCard>
      )}
    </div>
  );
}
