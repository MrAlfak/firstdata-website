"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import type { DashboardData, ProjectRow, ProjectStatus } from "@/lib/panel/types";
import { PanelCard, PanelEmpty } from "./PanelLayoutClient";
import { PanelGateLoading } from "./PanelGateLoading";

const statusTone: Record<ProjectStatus, string> = {
  inquiry: "border-paper/25 text-paper/60",
  contract: "border-amber/35 text-amber",
  active: "border-term/40 text-term",
  delivered: "border-term/30 text-term/80",
  support: "border-paper/30 text-paper/70",
  closed: "border-paper/15 text-paper/40",
};

export default function DashboardClient() {
  const { dir, p, fd } = useT();
  const [data, setData] = useState<{ dashboard: DashboardData; projects: ProjectRow[] } | null>(
    null,
  );

  function load() {
    fetch("/api/panel/dashboard")
      .then((r) => r.json())
      .then((j) => j.success && setData({ dashboard: j.dashboard, projects: j.projects }));
  }

  useEffect(() => {
    load();
  }, []);

  if (!data) return <PanelGateLoading label={p.common.loading} variant="dashboard" />;

  const { dashboard: d, projects } = data;
  const stats = [
    { label: p.dashboard.activeProjects, value: d.activeProjects, href: "/panel/projects" },
    { label: p.dashboard.pendingActions, value: d.pendingActions, href: "/panel/contracts" },
    { label: p.dashboard.openTickets, value: d.openTickets, href: "/panel/tickets" },
    { label: p.dashboard.unpaidInvoices, value: d.unpaidInvoices, href: "/panel/invoices" },
    { label: p.dashboard.unreadNotifications, value: d.unreadNotifications, href: "/panel/notifications" },
  ];

  return (
    <div dir={dir}>
      <h1 className="text-2xl text-paper">{p.dashboard.title}</h1>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="block transition-opacity hover:opacity-90">
            <PanelCard>
              <p className="text-2xl text-term" dir="ltr">
                {fd(s.value)}
              </p>
              <p className="mt-1 text-xs text-paper/50">{s.label}</p>
            </PanelCard>
          </Link>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="mt-6">
          <PanelEmpty
            label={p.dashboard.noProjects}
            title={p.dashboard.noProjects}
            description={p.dashboard.noProjectsHint}
            href="/contactus/request"
            ctaLabel={p.dashboard.contactCta}
          />
        </div>
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

      {projects.length > 0 && (
        <PanelCard className="mt-6">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm text-paper/70">{p.dashboard.projectStatus}</h2>
            <Link href="/panel/projects" className="text-xs text-term">
              {p.common.view} →
            </Link>
          </div>
          <ul className="mt-4 space-y-4">
            {projects.slice(0, 5).map((pr) => {
              const pct = Math.max(0, Math.min(100, pr.progress_pct ?? 0));
              return (
                <li key={pr.id} className="border-b border-paper/10 pb-4 last:border-0 last:pb-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <Link
                      href={`/panel/projects/${pr.id}`}
                      className="text-sm text-paper hover:text-term"
                    >
                      {pr.title}
                    </Link>
                    <span
                      className={`border px-2 py-0.5 text-[10px] uppercase tracking-wide ${
                        statusTone[pr.status] ?? "border-paper/20 text-paper/50"
                      }`}
                    >
                      {p.status.project[pr.status] ?? pr.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-paper/40">
                    {p.projects.phase}: {p.status.phase[pr.phase] ?? pr.phase}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-1.5 flex-1 bg-paper/10">
                      <div className="h-full bg-term/70 transition-[width]" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="font-mono text-[11px] text-paper/45" dir="ltr">
                      {fd(pct)}%
                    </span>
                  </div>
                </li>
              );
            })}
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
    </div>
  );
}
