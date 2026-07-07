"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import UserSearchInput from "@/components/admin/UserSearchInput";
import { PanelCard, PanelEmpty, PanelLoading } from "@/components/panel/PanelLayoutClient";

type Project = {
  id: number;
  title: string;
  user_name: string;
  status: string;
  phase: string;
  progress_pct: number;
};

export default function AdminProjectsPage() {
  const { dir, a, fd } = useT();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [clientId, setClientId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    serviceSlug: "",
    contractTitle: "",
  });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  function load() {
    fetch("/api/admin/projects/list")
      .then((r) => r.json())
      .then((j) => j.success && setProjects(j.projects));
  }

  useEffect(() => {
    load();
  }, []);

  async function createProject(e: React.FormEvent) {
    e.preventDefault();
    if (!clientId) return;
    setBusy(true);
    setMsg("");
    const res = await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: clientId,
        title: form.title,
        serviceSlug: form.serviceSlug || undefined,
        contractTitle: form.contractTitle || undefined,
        progressPct: 10,
      }),
    });
    setBusy(false);
    const j = await res.json();
    if (j.success) {
      setForm({ title: "", serviceSlug: "", contractTitle: "" });
      setMsg(a.common.success);
      load();
    } else {
      setMsg(j.message ?? a.common.failed);
    }
  }

  if (!projects) return <PanelLoading label={a.common.loading} />;

  const inputClass = "border border-paper/20 bg-transparent px-3 py-2 text-sm text-paper w-full";

  return (
    <div dir={dir}>
      <h1 className="text-2xl text-paper">{a.projects.title}</h1>

      <PanelCard className="mt-6">
        <h2 className="text-sm text-paper/60">{a.projects.create}</h2>
        <form onSubmit={createProject} className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <UserSearchInput
              value={clientId}
              onSelect={(u) => setClientId(u?.id ?? null)}
              placeholder={a.projects.selectClient}
            />
          </div>
          <input
            required
            placeholder={a.projects.projectTitle}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
          />
          <input
            placeholder={a.projects.service}
            value={form.serviceSlug}
            onChange={(e) => setForm({ ...form, serviceSlug: e.target.value })}
            className={inputClass}
            dir="ltr"
          />
          <input
            placeholder={a.projects.contractTitle}
            value={form.contractTitle}
            onChange={(e) => setForm({ ...form, contractTitle: e.target.value })}
            className={`${inputClass} sm:col-span-2`}
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

      {projects.length === 0 ? (
        <PanelCard className="mt-6">
          <PanelEmpty label={a.common.empty} />
        </PanelCard>
      ) : (
        <ul className="mt-6 space-y-2">
          {projects.map((p) => (
            <li key={p.id}>
              <PanelCard>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm text-paper">{p.title}</p>
                    <p className="mt-1 text-xs text-paper/40">
                      {a.common.client}: {p.user_name}, {p.status}, {fd(p.progress_pct)}%
                    </p>
                  </div>
                  <Link
                    href={`/admin/projects/${p.id}`}
                    className="border border-paper/25 px-3 py-1 text-xs text-paper/70 hover:text-paper"
                  >
                    {a.projects.manage}
                  </Link>
                </div>
              </PanelCard>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
