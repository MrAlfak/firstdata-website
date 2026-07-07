"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import { PanelCard, PanelEmpty, PanelLoading } from "@/components/panel/PanelLayoutClient";

type Lead = {
  id: number;
  name: string;
  email: string;
  service: string | null;
  message: string;
  status: string;
  user_name: string | null;
  created_at: string;
};

export default function AdminLeadsPage() {
  const { dir, a } = useT();
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [filter, setFilter] = useState("");
  const [titles, setTitles] = useState<Record<number, string>>({});
  const [busyId, setBusyId] = useState<number | null>(null);

  function load(status?: string) {
    const q = status ? `?status=${status}` : "";
    fetch(`/api/admin/leads${q}`)
      .then((r) => r.json())
      .then((j) => j.success && setLeads(j.leads));
  }

  useEffect(() => {
    load(filter || undefined);
  }, [filter]);

  async function convert(leadId: number) {
    setBusyId(leadId);
    await fetch(`/api/admin/leads/${leadId}/convert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: titles[leadId] || undefined }),
    });
    setBusyId(null);
    load(filter || undefined);
  }

  async function setStatus(leadId: number, status: string) {
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, status }),
    });
    load(filter || undefined);
  }

  if (!leads) return <PanelLoading label={a.common.loading} />;

  return (
    <div dir={dir}>
      <h1 className="text-2xl text-paper">{a.leads.title}</h1>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter("")}
          className={`border px-3 py-1 text-xs ${!filter ? "border-accent/50 text-accent" : "border-paper/20 text-paper/50"}`}
        >
          {a.leads.filterAll}
        </button>
        <button
          type="button"
          onClick={() => setFilter("received")}
          className={`border px-3 py-1 text-xs ${filter === "received" ? "border-accent/50 text-accent" : "border-paper/20 text-paper/50"}`}
        >
          {a.leads.filterNew}
        </button>
        <button
          type="button"
          onClick={() => setFilter("reviewing")}
          className={`border px-3 py-1 text-xs ${filter === "reviewing" ? "border-accent/50 text-accent" : "border-paper/20 text-paper/50"}`}
        >
          {a.leads.reviewing}
        </button>
      </div>

      {leads.length === 0 ? (
        <PanelCard className="mt-6">
          <PanelEmpty label={a.common.empty} />
        </PanelCard>
      ) : (
        <ul className="mt-6 space-y-3">
          {leads.map((lead) => (
            <li key={lead.id}>
              <PanelCard>
                <p className="text-sm text-paper">
                  {lead.name}, {lead.email}
                </p>
                {lead.service && <p className="mt-1 text-xs text-term">{lead.service}</p>}
                <p className="mt-2 text-sm text-paper/60">{lead.message}</p>
                <p className="mt-2 text-xs text-paper/35">
                  {a.common.status}: {lead.status}
                  {lead.user_name ? `, ${lead.user_name}` : ""}
                </p>
                {lead.status !== "converted" && (
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <input
                      placeholder={a.leads.convertTitle}
                      value={titles[lead.id] ?? ""}
                      onChange={(e) => setTitles({ ...titles, [lead.id]: e.target.value })}
                      className="flex-1 border border-paper/20 bg-transparent px-2 py-1.5 text-xs text-paper"
                    />
                    <button
                      type="button"
                      disabled={busyId === lead.id}
                      onClick={() => convert(lead.id)}
                      className="border border-accent/50 px-3 py-1.5 text-xs text-accent"
                    >
                      {a.common.convert}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatus(lead.id, "reviewing")}
                      className="border border-paper/30 px-3 py-1.5 text-xs text-paper/50"
                    >
                      {a.leads.reviewing}
                    </button>
                  </div>
                )}
              </PanelCard>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
