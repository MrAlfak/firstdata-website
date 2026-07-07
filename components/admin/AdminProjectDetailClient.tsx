"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import type { AdminProjectDetail } from "@/lib/panel/admin-repository";
import { PanelAlert, PanelCard, PanelLoading } from "@/components/panel/PanelLayoutClient";

const PHASES = ["consult", "design", "build", "launch", "support"] as const;
const STATUSES = ["inquiry", "contract", "active", "delivered", "support", "closed"] as const;

export default function AdminProjectDetailClient({ projectId }: { projectId: string }) {
  const { dir, a, fd } = useT();
  const router = useRouter();
  const pd = a.projectDetail;
  const [detail, setDetail] = useState<AdminProjectDetail | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [phase, setPhase] = useState("consult");
  const [progress, setProgress] = useState("10");
  const [status, setStatus] = useState("active");
  const [updateBody, setUpdateBody] = useState("");
  const [approvalTitle, setApprovalTitle] = useState("");
  const [approvalDesc, setApprovalDesc] = useState("");
  const [invNumber, setInvNumber] = useState("");
  const [invTitle, setInvTitle] = useState("");
  const [invAmount, setInvAmount] = useState("");
  const [invPayUrl, setInvPayUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileDesc, setFileDesc] = useState("");

  const load = useCallback(() => {
    fetch(`/api/admin/projects/${projectId}`)
      .then((r) => r.json())
      .then((j) => {
        if (j.success) {
          setDetail(j.detail);
          setPhase(j.detail.project.phase);
          setProgress(String(j.detail.project.progress_pct));
          setStatus(j.detail.project.status);
        }
      });
  }, [projectId]);

  useEffect(() => {
    load();
  }, [load]);

  async function patch(body: Record<string, unknown>) {
    setBusy(true);
    setMsg("");
    const res = await fetch(`/api/admin/projects/${projectId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setBusy(false);
    const j = await res.json();
    if (j.success) {
      setDetail(j.detail);
      setMsg(a.common.success);
      setUpdateBody("");
      setApprovalTitle("");
      setApprovalDesc("");
      setInvNumber("");
      setInvTitle("");
      setInvAmount("");
      setInvPayUrl("");
    } else {
      setMsg(j.message ?? a.common.failed);
    }
  }

  async function uploadFile(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !detail) return;
    setBusy(true);
    setMsg("");
    const fd = new FormData();
    fd.append("file", file);
    fd.append("userId", String(detail.project.user_id));
    fd.append("projectId", projectId);
    if (fileDesc) fd.append("description", fileDesc);
    const res = await fetch("/api/admin/files", { method: "POST", body: fd });
    setBusy(false);
    const j = await res.json();
    if (j.success) {
      setFile(null);
      setFileDesc("");
      setMsg(a.common.success);
      load();
    } else {
      setMsg(j.message ?? a.common.failed);
    }
  }

  if (!detail) return <PanelLoading label={a.common.loading} />;

  const inputClass = "border border-paper/20 bg-transparent px-3 py-2 text-sm text-paper w-full";

  return (
    <div dir={dir}>
      <button type="button" onClick={() => router.push("/admin/projects")} className="text-xs text-paper/40">
        ← {pd.back}
      </button>
      <h1 className="mt-2 text-2xl text-paper">{detail.project.title}</h1>
      <p className="mt-1 text-xs text-paper/45">
        {a.common.client}: {detail.project.user_name} · {detail.project.status} · {fd(detail.project.progress_pct)}%
      </p>

      {msg && (
        <div className="mt-4">
          <PanelAlert message={msg} variant={msg === a.common.success ? "success" : "error"} />
        </div>
      )}

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <PanelCard>
          <h2 className="text-sm text-paper/65">{pd.updatePhase}</h2>
          <div className="mt-3 grid gap-2">
            <label className="text-xs text-paper/45">{pd.phase}</label>
            <select value={phase} onChange={(e) => setPhase(e.target.value)} className={inputClass}>
              {PHASES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <label className="text-xs text-paper/45">{pd.progress}</label>
            <input value={progress} onChange={(e) => setProgress(e.target.value)} className={inputClass} dir="ltr" />
            <label className="text-xs text-paper/45">{pd.changeStatus}</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button
              type="button"
              disabled={busy}
              onClick={() => patch({ phase, progressPct: Number(progress), status })}
              className="border border-accent/50 px-4 py-2 text-sm text-accent"
            >
              {a.common.save}
            </button>
          </div>
        </PanelCard>

        <PanelCard>
          <h2 className="text-sm text-paper/65">{pd.postUpdate}</h2>
          <textarea
            value={updateBody}
            onChange={(e) => setUpdateBody(e.target.value)}
            placeholder={pd.updateBody}
            rows={4}
            className={`mt-3 ${inputClass}`}
          />
          <button
            type="button"
            disabled={busy || !updateBody.trim()}
            onClick={() => patch({ update: updateBody })}
            className="mt-2 border border-accent/50 px-4 py-2 text-sm text-accent"
          >
            {a.common.submit}
          </button>
        </PanelCard>

        <PanelCard>
          <h2 className="text-sm text-paper/65">{pd.requestApproval}</h2>
          <div className="mt-3 grid gap-2">
            <input
              value={approvalTitle}
              onChange={(e) => setApprovalTitle(e.target.value)}
              placeholder={pd.approvalTitle}
              className={inputClass}
            />
            <textarea
              value={approvalDesc}
              onChange={(e) => setApprovalDesc(e.target.value)}
              placeholder={pd.approvalDesc}
              rows={2}
              className={inputClass}
            />
            <button
              type="button"
              disabled={busy || !approvalTitle.trim()}
              onClick={() =>
                patch({ approvalTitle, approvalDescription: approvalDesc || undefined })
              }
              className="border border-accent/50 px-4 py-2 text-sm text-accent"
            >
              {a.common.submit}
            </button>
          </div>
        </PanelCard>

        <PanelCard>
          <h2 className="text-sm text-paper/65">{pd.createInvoice}</h2>
          <div className="mt-3 grid gap-2">
            <input
              value={invNumber}
              onChange={(e) => setInvNumber(e.target.value)}
              placeholder={pd.invoiceNumber}
              className={inputClass}
              dir="ltr"
            />
            <input
              value={invTitle}
              onChange={(e) => setInvTitle(e.target.value)}
              placeholder={pd.invoiceTitle}
              className={inputClass}
            />
            <input
              value={invAmount}
              onChange={(e) => setInvAmount(e.target.value)}
              placeholder={pd.amountRial}
              className={inputClass}
              dir="ltr"
            />
            <input
              value={invPayUrl}
              onChange={(e) => setInvPayUrl(e.target.value)}
              placeholder={pd.payUrl}
              className={inputClass}
              dir="ltr"
            />
            <button
              type="button"
              disabled={busy || !invNumber.trim() || !invTitle.trim()}
              onClick={() =>
                patch({
                  invoiceNumber: invNumber,
                  invoiceTitle: invTitle,
                  amountRial: Number(invAmount) || 0,
                  payUrl: invPayUrl || undefined,
                })
              }
              className="border border-accent/50 px-4 py-2 text-sm text-accent"
            >
              {a.common.submit}
            </button>
          </div>
        </PanelCard>

        <PanelCard className="lg:col-span-2">
          <h2 className="text-sm text-paper/65">{pd.uploadFile}</h2>
          <form onSubmit={uploadFile} className="mt-3 grid gap-2 sm:grid-cols-2">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="text-xs text-paper/60 sm:col-span-2"
            />
            <input
              value={fileDesc}
              onChange={(e) => setFileDesc(e.target.value)}
              placeholder={pd.fileDesc}
              className={inputClass}
            />
            <button
              type="submit"
              disabled={busy || !file}
              className="border border-accent/50 px-4 py-2 text-sm text-accent"
            >
              {a.common.upload}
            </button>
          </form>
        </PanelCard>
      </div>

      <PanelCard className="mt-6">
        <h2 className="text-sm text-paper/65">{pd.milestones}</h2>
        <ul className="mt-2 space-y-1 text-xs text-paper/55">
          {detail.milestones.map((m) => (
            <li key={m.id}>
              {m.label} — {m.status}
            </li>
          ))}
        </ul>
      </PanelCard>

      {detail.updates.length > 0 && (
        <PanelCard className="mt-4">
          <h2 className="text-sm text-paper/65">{pd.updates}</h2>
          <ul className="mt-2 space-y-2">
            {detail.updates.map((u) => (
              <li key={u.id} className="text-sm text-paper/65">
                {u.body}
              </li>
            ))}
          </ul>
        </PanelCard>
      )}

      {detail.invoices.length > 0 && (
        <PanelCard className="mt-4">
          <h2 className="text-sm text-paper/65">{pd.invoices}</h2>
          <ul className="mt-2 space-y-1 text-xs text-paper/55">
            {detail.invoices.map((inv) => (
              <li key={inv.id}>
                {inv.number} — {inv.title} — {inv.status} — {fd(inv.amount_rial)}
              </li>
            ))}
          </ul>
        </PanelCard>
      )}

      {detail.files.length > 0 && (
        <PanelCard className="mt-4">
          <h2 className="text-sm text-paper/65">{pd.files}</h2>
          <ul className="mt-2 space-y-1 text-xs text-paper/55">
            {detail.files.map((f) => (
              <li key={f.id}>{f.name}</li>
            ))}
          </ul>
        </PanelCard>
      )}
    </div>
  );
}
