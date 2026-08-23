"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  PANEL_DOC_CATEGORIES,
  PANEL_DOCUMENTS,
  type PanelDocCategory,
} from "@/config/panel-documents";
import { useT } from "@/i18n/LangProvider";
import type { PanelFileRow, ProjectRow } from "@/lib/panel/types";
import { PanelAlert, PanelCard, PanelEmpty } from "./PanelLayoutClient";
import { PanelGateLoading } from "./PanelGateLoading";
import { pushAlert } from "@/lib/alerts/types";
import { usePanelSkin } from "./PanelSkinToggle";
import PanelDataTable from "./PanelDataTable";
import { Download, FileText } from "lucide-react";

export default function DocumentsClient() {
  const { dir, fa, lang, p, fd, d } = useT();
  const [skin] = usePanelSkin();
  const isModern = skin === "modern";
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<PanelFileRow[] | null>(null);
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [projectId, setProjectId] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [openDocId, setOpenDocId] = useState<string | null>(PANEL_DOCUMENTS[0]?.id ?? null);
  const [category, setCategory] = useState<PanelDocCategory | "all">("all");

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

  const catalog = useMemo(() => {
    if (category === "all") return PANEL_DOCUMENTS;
    return PANEL_DOCUMENTS.filter((d) => d.category === category);
  }, [category]);

  async function uploadFile(file: File) {
    setUploading(true);
    setMessage(null);
    const fdForm = new FormData();
    fdForm.append("file", file);
    if (projectId) fdForm.append("projectId", projectId);
    if (description) fdForm.append("description", description);
    try {
      const res = await fetch("/api/panel/files", { method: "POST", body: fdForm });
      const j = await res.json();
      if (!res.ok || !j.success) {
        setMessage({ type: "err", text: p.documents.uploadFail });
        pushAlert({ message: d.alerts.uploadFail, tone: "error" });
      } else {
        setMessage({ type: "ok", text: p.documents.uploadOk });
        pushAlert({ message: d.alerts.uploadOk, tone: "success" });
        setDescription("");
        load();
      }
    } catch {
      setMessage({ type: "err", text: p.documents.uploadFail });
      pushAlert({ message: d.alerts.uploadFail, tone: "error" });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  if (!files) return <PanelGateLoading label={p.common.loading} />;

  const delivered = files.filter((f) => f.direction === "download");
  const uploads = files.filter((f) => f.direction === "upload");
  const input =
    "w-full border border-paper/20 bg-paper/[0.03] px-3 py-2 text-sm text-paper outline-none focus:border-paper/45";

  return (
    <div dir={dir}>
      <h1 className="text-2xl text-paper">{p.documents.title}</h1>
      <p className="mt-2 max-w-2xl text-sm text-paper/55">{p.documents.lead}</p>

      {message && (
        <div className="mt-4">
          <PanelAlert
            message={message.text}
            variant={message.type === "ok" ? "success" : "error"}
          />
        </div>
      )}

      <section className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm text-paper/70">{p.documents.libraryTitle}</h2>
          <div className="flex flex-wrap gap-1">
            <button
              type="button"
              onClick={() => setCategory("all")}
              className={`border px-2.5 py-1 text-[11px] ${
                category === "all"
                  ? "border-term/40 text-term"
                  : "border-paper/20 text-paper/45 hover:text-paper"
              }`}
            >
              {p.documents.cat_all}
            </button>
            {PANEL_DOC_CATEGORIES.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setCategory(key)}
                className={`border px-2.5 py-1 text-[11px] ${
                  category === key
                    ? "border-term/40 text-term"
                    : "border-paper/20 text-paper/45 hover:text-paper"
                }`}
              >
                {p.documents[`cat_${key}`]}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-4 space-y-2">
          {catalog.map((doc) => {
            const open = openDocId === doc.id;
            return (
              <li key={doc.id}>
                <PanelCard>
                  <button
                    type="button"
                    onClick={() => setOpenDocId(open ? null : doc.id)}
                    className="flex w-full items-start justify-between gap-3 text-start"
                  >
                    <span>
                      <span className="block text-[10px] uppercase tracking-wider text-term/70">
                        {p.documents[`cat_${doc.category}`]}
                      </span>
                      <span className="mt-1 block text-sm text-paper">{doc.title[lang]}</span>
                      <span className="mt-1 block text-xs text-paper/45">{doc.summary[lang]}</span>
                    </span>
                    <span className="shrink-0 font-mono text-xs text-paper/35">
                      {open ? "−" : "+"}
                    </span>
                  </button>
                  {open ? (
                    <div className="mt-3 border-t border-paper/10 pt-3">
                      <ul className="space-y-2 text-sm leading-relaxed text-paper/65">
                        {doc.body[lang].map((line) => (
                          <li key={line} className="flex gap-2">
                            <span className="text-term/70" aria-hidden>
                              ›
                            </span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                      {doc.href ? (
                        <Link
                          href={doc.href}
                          className={`mt-3 inline-block text-xs text-term hover:underline ${
                            fa ? "font-fa" : "font-mono"
                          }`}
                        >
                          {p.documents.openRelated} →
                        </Link>
                      ) : null}
                    </div>
                  ) : null}
                </PanelCard>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-sm text-paper/70">{p.documents.deliveredTitle}</h2>
        <p className="mt-1 text-xs text-paper/40">{p.documents.deliveredHint}</p>
        {isModern ? (
          <div className="mt-3">
            {delivered.length === 0 ? (
              <PanelEmpty
                label={p.documents.deliveredEmpty}
                title={p.documents.deliveredEmpty}
                description={p.documents.deliveredHint}
              />
            ) : (
              <PanelDataTable
                title={p.documents.deliveredTitle}
                description={p.documents.deliveredHint}
                primaryHeader={p.documents.title}
                columnHeaders={[p.common.size]}
                actionsHeader={p.common.action}
                showCheckbox
                empty={
                  <PanelEmpty
                    label={p.documents.deliveredEmpty}
                    title={p.documents.deliveredEmpty}
                    description={p.documents.deliveredHint}
                  />
                }
                rows={delivered.map((f) => ({
                  id: String(f.id),
                  icon: FileText,
                  iconClassName: "text-teal-400",
                  iconBgClassName: "bg-teal-400/20",
                  title: f.name,
                  subtitle: f.description ?? undefined,
                  cells: [
                    f.size_bytes != null ? (
                      <span key="sz" dir="ltr">
                        {fd(Math.round(f.size_bytes / 1024))} KB
                      </span>
                    ) : (
                      "—"
                    ),
                  ],
                  actions: [
                    {
                      label: p.common.download,
                      icon: Download,
                      href: `/api/panel/files/${f.id}`,
                    },
                  ],
                }))}
              />
            )}
          </div>
        ) : (
          <div className="mt-3">
            {delivered.length === 0 ? (
              <PanelEmpty
                label={p.documents.deliveredEmpty}
                title={p.documents.deliveredEmpty}
                description={p.documents.deliveredHint}
              />
            ) : (
              <PanelCard>
                <ul className="space-y-3">
                  {delivered.map((f) => (
                    <li
                      key={f.id}
                      className="flex flex-wrap items-center justify-between gap-2 border-b border-paper/10 pb-3 last:border-0 last:pb-0"
                    >
                      <span>
                        <span className="block text-sm text-paper">{f.name}</span>
                        {f.description ? (
                          <span className="mt-0.5 block text-xs text-paper/40">{f.description}</span>
                        ) : null}
                        {f.size_bytes != null ? (
                          <span className="mt-0.5 block font-mono text-[11px] text-paper/35" dir="ltr">
                            {fd(Math.round(f.size_bytes / 1024))} KB
                          </span>
                        ) : null}
                      </span>
                      <a
                        href={`/api/panel/files/${f.id}`}
                        className="border border-term/35 px-3 py-1.5 text-xs text-term hover:bg-term/10"
                      >
                        {p.common.download}
                      </a>
                    </li>
                  ))}
                </ul>
              </PanelCard>
            )}
          </div>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-sm text-paper/70">{p.documents.uploadTitle}</h2>
        <p className="mt-1 text-xs text-paper/40">{p.documents.uploadHint}</p>
        <PanelCard className="mt-3">
          {projects.length > 0 && (
            <select
              className={input}
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
            className={`${input} mt-2`}
            placeholder={p.documents.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                inputRef.current?.click();
              }
            }}
            onClick={() => !uploading && inputRef.current?.click()}
            onDragEnter={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const file = e.dataTransfer.files?.[0];
              if (file && !uploading) void uploadFile(file);
            }}
            className={`mt-3 cursor-pointer border border-dashed px-4 py-8 text-center transition-colors ${
              dragOver
                ? "border-term/50 bg-term/[0.06]"
                : "border-paper/25 bg-paper/[0.02] hover:border-paper/40"
            } ${uploading ? "pointer-events-none opacity-60" : ""}`}
          >
            <p className="text-sm text-paper/70">
              {uploading ? p.documents.uploading : p.documents.dropHint}
            </p>
            <p className="mt-2 text-xs text-term">{p.documents.chooseFile}</p>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void uploadFile(file);
              }}
            />
          </div>

          {uploads.length > 0 ? (
            isModern ? (
              <div className="mt-4">
                <PanelDataTable
                  title={p.documents.fromYou}
                  primaryHeader={p.documents.title}
                  columnHeaders={[p.common.size]}
                  actionsHeader={p.common.action}
                  showCheckbox
                  rows={uploads.map((f) => ({
                    id: String(f.id),
                    icon: FileText,
                    iconClassName: "text-orange-400",
                    iconBgClassName: "bg-orange-400/20",
                    title: f.name,
                    cells: [
                      f.size_bytes != null ? (
                        <span key="sz" dir="ltr">
                          {fd(Math.round(f.size_bytes / 1024))} KB
                        </span>
                      ) : (
                        "—"
                      ),
                    ],
                    actions: [
                      {
                        label: p.common.download,
                        icon: Download,
                        href: `/api/panel/files/${f.id}`,
                      },
                    ],
                  }))}
                />
              </div>
            ) : (
              <ul className="mt-4 space-y-2 border-t border-paper/10 pt-4">
                <li className="text-xs text-paper/40">{p.documents.fromYou}</li>
                {uploads.map((f) => (
                  <li
                    key={f.id}
                    className="flex flex-wrap items-center justify-between gap-2 text-sm text-paper/70"
                  >
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
            )
          ) : null}
        </PanelCard>
      </section>
    </div>
  );
}
