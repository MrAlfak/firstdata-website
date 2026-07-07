"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useT } from "@/i18n/LangProvider";
import type { ProjectDetail } from "@/lib/panel/types";
import { scheduleUpdate } from "@/lib/react/schedule-update";
import { panelFetch } from "./panel-fetch";
import { PanelAlert, PanelCard, PanelEmpty, PanelLoading } from "./PanelLayoutClient";

export default function ProjectDetailClient({ id }: { id: string }) {
  const { dir, p, fd } = useT();
  const [detail, setDetail] = useState<ProjectDetail | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    const res = await panelFetch<{ detail: ProjectDetail }>(`/api/panel/projects/${id}`);
    if (!res.ok) {
      setError(res.message);
      setDetail(null);
      return;
    }
    setDetail(res.body.detail);
  }, [id]);

  useEffect(() => {
    scheduleUpdate(() => {
      void load();
    });
  }, [load]);

  async function decideApproval(approvalId: number, decision: "approved" | "rejected") {
    await fetch(`/api/panel/approvals/${approvalId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision }),
    });
    void load();
  }

  if (detail === undefined) return <PanelLoading label={p.common.loading} />;
  if (error) {
    return (
      <div dir={dir}>
        <PanelAlert message={p.common.loadFailed} />
      </div>
    );
  }
  if (!detail) return <PanelEmpty label={p.common.empty} />;

  const { project, milestones, updates, approvals, contracts, files } = detail;

  return (
    <div dir={dir}>
      <Link href="/panel/projects" className="text-xs text-paper/45 hover:text-paper">
        ← {p.projects.title}
      </Link>
      <h1 className="mt-2 text-2xl text-paper">{project.title}</h1>
      <p className="mt-2 text-sm text-paper/55">{project.summary}</p>

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-paper/45">
        <span>
          {p.common.status}: {p.status.project[project.status]}
        </span>
        <span>
          {p.projects.phase}: {p.status.phase[project.phase]}
        </span>
        <span dir="ltr">
          {p.projects.progress}: {fd(project.progress_pct)}%
        </span>
        {project.delivery_due && (
          <span>
            {p.projects.deliveryDue}: {project.delivery_due}
          </span>
        )}
      </div>

      <PanelCard className="mt-6">
        <h2 className="text-sm text-paper/70">{p.projects.milestones}</h2>
        <ol className="mt-4 space-y-2">
          {milestones.map((m) => (
            <li key={m.id} className="flex items-center gap-3 text-sm">
              <span
                className={`h-2 w-2 shrink-0 ${m.status === "done" ? "bg-term" : m.status === "active" ? "bg-amber" : "bg-paper/20"}`}
              />
              <span className="text-paper/80">{m.label}</span>
              <span className="text-xs text-paper/35">
                {p.status.milestone[m.status] ?? m.status}
              </span>
            </li>
          ))}
        </ol>
      </PanelCard>

      {approvals.filter((a) => a.status === "pending").length > 0 && (
        <PanelCard className="mt-4">
          <h2 className="text-sm text-paper/70">{p.projects.pendingApprovals}</h2>
          {approvals
            .filter((a) => a.status === "pending")
            .map((a) => (
              <div key={a.id} className="mt-3 border-t border-paper/10 pt-3 first:mt-0 first:border-0 first:pt-0">
                <p className="text-sm text-paper">{a.title}</p>
                {a.description && <p className="mt-1 text-xs text-paper/50">{a.description}</p>}
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => decideApproval(a.id, "approved")}
                    className="border border-term/40 px-3 py-1 text-xs text-term"
                  >
                    {p.common.approve}
                  </button>
                  <button
                    type="button"
                    onClick={() => decideApproval(a.id, "rejected")}
                    className="border border-paper/25 px-3 py-1 text-xs text-paper/60"
                  >
                    {p.common.reject}
                  </button>
                </div>
              </div>
            ))}
        </PanelCard>
      )}

      {contracts.length > 0 && (
        <PanelCard className="mt-4">
          <h2 className="text-sm text-paper/70">{p.projects.projectContracts}</h2>
          <ul className="mt-3 space-y-2">
            {contracts.map((c) => (
              <li key={c.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <div>
                  <p className="text-paper">{c.title}</p>
                  <p className="text-xs text-paper/40">
                    {p.status.contract[c.status] ?? c.status}
                  </p>
                </div>
                {c.file_path && (
                  <a href={`/api/panel/contracts/${c.id}/download`} className="text-xs text-term">
                    {p.common.download}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </PanelCard>
      )}

      {files.length > 0 && (
        <PanelCard className="mt-4">
          <h2 className="text-sm text-paper/70">{p.projects.projectFiles}</h2>
          <ul className="mt-3 space-y-2">
            {files.map((f) => (
              <li key={f.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="text-paper/80">{f.name}</span>
                <a href={`/api/panel/files/${f.id}`} className="text-xs text-term">
                  {p.common.download}
                </a>
              </li>
            ))}
          </ul>
        </PanelCard>
      )}

      <PanelCard className="mt-4">
        <h2 className="text-sm text-paper/70">{p.projects.updates}</h2>
        {updates.length === 0 ? (
          <PanelEmpty label={p.common.empty} />
        ) : (
          <ul className="mt-3 space-y-3">
            {updates.map((u) => (
              <li key={u.id} className="text-sm">
                <span className="text-xs text-paper/35">{u.created_at}</span>
                <p className="mt-1 text-paper/65">{u.body}</p>
              </li>
            ))}
          </ul>
        )}
      </PanelCard>
    </div>
  );
}
