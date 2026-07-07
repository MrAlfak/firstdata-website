"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import type { PanelFileRow, ProjectRow } from "@/lib/panel/types";
import { PanelCard, PanelEmpty, PanelLoading } from "./PanelLayoutClient";

export default function FilesClient() {
  const { dir, p, fd } = useT();
  const [files, setFiles] = useState<PanelFileRow[] | null>(null);
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [projectId, setProjectId] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  function load() {
    fetch("/api/panel/files")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) {
          setFiles(j.files);
          setProjects(j.projects ?? []);
        }
      });
  }

  useEffect(() => {
    load();
  }, []);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fdForm = new FormData();
    fdForm.append("file", file);
    if (projectId) fdForm.append("projectId", projectId);
    if (description) fdForm.append("description", description);
    await fetch("/api/panel/files", { method: "POST", body: fdForm });
    setUploading(false);
    setDescription("");
    e.target.value = "";
    load();
  }

  if (!files) return <PanelLoading label={p.common.loading} />;

  const downloads = files.filter((f) => f.direction === "download");
  const uploads = files.filter((f) => f.direction === "upload");

  return (
    <div dir={dir}>
      <h1 className="text-2xl text-paper">{p.files.title}</h1>

      <PanelCard className="mt-6">
        <p className="text-sm text-paper/55">{p.files.uploadHint}</p>
        {projects.length > 0 && (
          <select
            className="mt-3 w-full border border-paper/20 bg-paper/[0.03] px-3 py-2 text-sm text-paper"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="">{p.common.project}</option>
            {projects.map((pr) => (
              <option key={pr.id} value={pr.id}>
                {pr.title}
              </option>
            ))}
          </select>
        )}
        <input
          className="mt-2 w-full border border-paper/20 bg-paper/[0.03] px-3 py-2 text-sm text-paper"
          placeholder={p.files.description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className="mt-3 inline-block cursor-pointer border border-paper/30 px-4 py-2 text-sm text-paper/75 hover:border-paper">
          {uploading ? p.common.loading : p.common.upload}
          <input type="file" className="hidden" onChange={onUpload} disabled={uploading} />
        </label>
      </PanelCard>

      <PanelCard className="mt-4">
        <h2 className="text-sm text-paper/70">{p.files.fromUs}</h2>
        {downloads.length === 0 ? (
          <PanelEmpty label={p.common.empty} />
        ) : (
          <ul className="mt-3 space-y-2">
            {downloads.map((f) => (
              <li key={f.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="text-paper">{f.name}</span>
                <a href={`/api/panel/files/${f.id}`} className="text-xs text-term">
                  {p.common.download}
                </a>
              </li>
            ))}
          </ul>
        )}
      </PanelCard>

      <PanelCard className="mt-4">
        <h2 className="text-sm text-paper/70">{p.files.fromYou}</h2>
        {uploads.length === 0 ? (
          <PanelEmpty label={p.common.empty} />
        ) : (
          <ul className="mt-3 space-y-2">
            {uploads.map((f) => (
              <li key={f.id} className="flex flex-wrap items-center justify-between gap-2 text-sm text-paper/70">
                <span>
                  {f.name}
                  {f.size_bytes != null && (
                    <span className="ms-2 text-xs text-paper/35" dir="ltr">
                      ({fd(Math.round(f.size_bytes / 1024))} KB)
                    </span>
                  )}
                </span>
                <a href={`/api/panel/files/${f.id}`} className="text-xs text-term">
                  {p.common.download}
                </a>
              </li>
            ))}
          </ul>
        )}
      </PanelCard>
    </div>
  );
}
