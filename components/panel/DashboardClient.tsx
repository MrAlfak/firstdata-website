"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import type { DashboardData, ProjectRow } from "@/lib/panel/types";
import { PanelCard, PanelLoading } from "./PanelLayoutClient";

export default function DashboardClient() {
  const { dir, p, fd } = useT();
  const [data, setData] = useState<{ dashboard: DashboardData; projects: ProjectRow[] } | null>(
    null, );
  function load() {
    fetch("/api/panel/dashboard")
      .then((r) => r.json())
      .then((j) => j.success && setData({ dashboard: j.dashboard, projects: j.projects }));
  }

  useEffect(() => {
    load();
  }, []);

  if (!data) return <PanelLoading label={p.common.loading} />;

  const { dashboard: d, projects } = data;
  const stats = [
    { label: p.dashboard.activeProjects, value: d.activeProjects },
    { label: p.dashboard.pendingActions, value: d.pendingActions },
    { label: p.dashboard.openTickets, value: d.openTickets },
    { label: p.dashboard.unpaidInvoices, value: d.unpaidInvoices },
    { label: p.dashboard.unreadNotifications, value: d.unreadNotifications },
  ];
  return (
    <div dir={dir}>
      <h1 className="text-2xl text-paper">{p.dashboard.title}</h1>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
        {stats.map((s) => (
          <PanelCard key={s.label}>
            <p className="text-2xl text-term" dir="ltr">
              {fd(s.value)}
            </p>
            <p className="mt-1 text-xs text-paper/50">{s.label}</p>
          </PanelCard>
        ))}
      </div>

      {projects.length === 0 && (
        <PanelCard className="mt-6">
          <p className="text-paper">{p.dashboard.noProjects}</p>
          <p className="mt-2 text-sm text-paper/55">{p.dashboard.noProjectsHint}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/contactus/request"
              className="border border-paper/30 px-4 py-2 text-sm text-paper/75 hover:border-paper hover:text-paper"
            >
              {p.dashboard.contactCta}
            </Link>
          </div>
        </PanelCard>
      )}

      {(d.pendingApprovals.length > 0 || d.pendingContracts.length > 0) && (
        <PanelCard className="mt-6">
          <h2 className="text-sm text-paper/70">{p.dashboard.needsYou}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {d.pendingContracts.map((c) => (
              <li key={`c-${c.id}`}>
                <Link href="/panel/contracts" className="text-term hover:underline">
                  {c.title}, {p.contracts.pending}
                </Link>
              </li>
            ))}
            {d.pendingApprovals.map((a) => (
              <li key={`a-${a.id}`}>
                <Link href={`/panel/projects/${a.project_id}`} className="text-term hover:underline">
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </PanelCard>
      )}

      {d.recentUpdates.length > 0 && (
        <PanelCard className="mt-6">
          <h2 className="text-sm text-paper/70">{p.dashboard.recentUpdates}</h2>
          <ul className="mt-3 space-y-3">
            {d.recentUpdates.map((u, i) => (
              <li key={i} className="border-b border-paper/10 pb-3 last:border-0">
                <Link href={`/panel/projects/${u.projectId}`} className="text-xs text-term">
                  {u.projectTitle}
                </Link>
                <p className="mt-1 text-sm text-paper/60">{u.body}</p>
              </li>
            ))}
          </ul>
        </PanelCard>
      )}

      {projects.length > 0 && (
        <PanelCard className="mt-6">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm text-paper/70">{p.projects.title}</h2>
            <Link href="/panel/projects" className="text-xs text-term">
              {p.common.view} →
            </Link>
          </div>
          <ul className="mt-3 space-y-2">
            {projects.slice(0, 5).map((pr) => (
              <li key={pr.id}>
                <Link href={`/panel/projects/${pr.id}`} className="text-sm text-paper hover:text-term">
                  {pr.title}
                </Link>
                <span className="ms-2 text-xs text-paper/40">
                  {p.status.project[pr.status] ?? pr.status}, {fd(pr.progress_pct)}%
                </span>
              </li>
            ))}
          </ul>
        </PanelCard>
      )}
    </div>
  );
}
