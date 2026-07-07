"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import type { ProjectRow } from "@/lib/panel/types";
import { PanelCard, PanelEmpty, PanelLoading } from "./PanelLayoutClient";

export default function ProjectsClient() {
  const { dir, p, fd } = useT();
  const [projects, setProjects] = useState<ProjectRow[] | null>(null);

  useEffect(() => {
    fetch("/api/panel/projects")
      .then((r) => r.json())
      .then((j) => j.success && setProjects(j.projects));
  }, []);

  if (!projects) return <PanelLoading label={p.common.loading} />;

  return (
    <div dir={dir}>
      <h1 className="text-2xl text-paper">{p.projects.title}</h1>
      {projects.length === 0 ? (
        <PanelCard className="mt-6">
          <PanelEmpty label={p.common.empty} />
        </PanelCard>
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
