"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FolderKanban, Eye } from "lucide-react";
import { useT } from "@/i18n/LangProvider";
import type { ProjectRow } from "@/lib/panel/types";
import { PanelCard, PanelEmpty } from "./PanelLayoutClient";
import { PanelGateLoading } from "./PanelGateLoading";
import { usePanelSkin } from "./PanelSkinToggle";
import PanelDataTable from "./PanelDataTable";

function progressTone(pct: number): string {
  if (pct >= 75) return "**:data-[slot=progress-indicator]:bg-teal-400";
  if (pct >= 40) return "**:data-[slot=progress-indicator]:bg-orange-400";
  return "**:data-[slot=progress-indicator]:bg-sky-400";
}

export default function ProjectsClient() {
  const { dir, p, fd } = useT();
  const [skin] = usePanelSkin();
  const isModern = skin === "modern";
  const [projects, setProjects] = useState<ProjectRow[] | null>(null);

  useEffect(() => {
    fetch("/api/panel/projects")
      .then((r) => r.json())
      .then((j) => j.success && setProjects(j.projects));
  }, []);

  if (!projects) return <PanelGateLoading label={p.common.loading} />;

  if (isModern) {
    return (
      <div dir={dir}>
        <h1 className="text-2xl text-paper">{p.projects.title}</h1>
        <div className="mt-6">
          <PanelDataTable
            title={p.projects.title}
            description={p.dashboard.projectStatus}
            primaryHeader={p.common.project}
            columnHeaders={[p.common.status, p.projects.phase]}
            progressHeader={p.projects.progress}
            actionsHeader={p.common.action}
            showCheckbox
            empty={
              <PanelEmpty
                label={p.dashboard.noProjectsHint}
                title={p.projects.emptyTitle}
                description={p.projects.emptyHint}
                href="/contactus/request"
                ctaLabel={p.dashboard.contactCta}
              />
            }
            rows={projects.map((pr) => ({
              id: String(pr.id),
              icon: FolderKanban,
              iconClassName: "text-orange-400",
              iconBgClassName: "bg-orange-400/20",
              title: pr.title,
              subtitle: pr.summary ?? (pr.delivery_due ? `${p.projects.deliveryDue}: ${pr.delivery_due}` : undefined),
              cells: [
                p.status.project[pr.status] ?? pr.status,
                p.status.phase[pr.phase] ?? pr.phase,
              ],
              progress: pr.progress_pct,
              progressClassName: progressTone(pr.progress_pct),
              href: `/panel/projects/${pr.id}`,
              actions: [
                {
                  label: p.common.view,
                  icon: Eye,
                  href: `/panel/projects/${pr.id}`,
                },
              ],
            }))}
          />
        </div>
      </div>
    );
  }

  return (
    <div dir={dir}>
      <h1 className="text-2xl text-paper">{p.projects.title}</h1>
      {projects.length === 0 ? (
        <div className="mt-6">
          <PanelEmpty
            label={p.dashboard.noProjects}
            title={p.projects.emptyTitle}
            description={p.projects.emptyHint}
            href="/contactus/request"
            ctaLabel={p.dashboard.contactCta}
          />
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {projects.map((pr) => (
            <li key={pr.id}>
              <PanelCard>
                <Link href={`/panel/projects/${pr.id}`} className="text-lg text-paper hover:text-term">
                  {pr.title}
                </Link>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-paper/45">
                  <span>
                    {p.common.status}: {p.status.project[pr.status] ?? pr.status}
                  </span>
                  <span>
                    {p.projects.phase}: {p.status.phase[pr.phase] ?? pr.phase}
                  </span>
                  <span dir="ltr">
                    {p.projects.progress}: {fd(pr.progress_pct)}%
                  </span>
                </div>
                {pr.summary && <p className="mt-2 text-sm text-paper/55">{pr.summary}</p>}
              </PanelCard>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
