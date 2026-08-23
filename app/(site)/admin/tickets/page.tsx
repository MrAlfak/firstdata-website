"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import { PanelCard, PanelEmpty, PanelLoading } from "@/components/panel/PanelLayoutClient";

type Ticket = {
  id: number;
  subject: string;
  status: string;
  user_name: string;
  updated_at: string;
};

export default function AdminTicketsPage() {
  const { dir, a } = useT();
  const [tickets, setTickets] = useState<Ticket[] | null>(null);
  const [filter, setFilter] = useState("");

  function load(status?: string) {
    const q = status ? `?status=${status}` : "";
    fetch(`/api/admin/tickets${q}`)
      .then((r) => r.json())
      .then((j) => j.success && setTickets(j.tickets));
  }

  useEffect(() => {
    load(filter || undefined);
  }, [filter]);

  if (!tickets) return <PanelLoading label={a.common.loading} />;

  return (
    <div dir={dir}>
      <h1 className="text-2xl text-paper">{a.tickets.title}</h1>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter("")}
          className={`border px-3 py-1 text-xs ${!filter ? "border-accent/50 text-accent" : "border-paper/20 text-paper/50"}`}
        >
          {a.tickets.filterAll}
        </button>
        <button
          type="button"
          onClick={() => setFilter("open")}
          className={`border px-3 py-1 text-xs ${filter === "open" ? "border-accent/50 text-accent" : "border-paper/20 text-paper/50"}`}
        >
          {a.tickets.filterOpen}
        </button>
        <button
          type="button"
          onClick={() => setFilter("closed")}
          className={`border px-3 py-1 text-xs ${filter === "closed" ? "border-accent/50 text-accent" : "border-paper/20 text-paper/50"}`}
        >
          {a.tickets.filterClosed}
        </button>
      </div>

      {tickets.length === 0 ? (
        <div className="mt-6">
          <PanelEmpty label={a.common.empty} title={a.common.empty} description={a.common.emptyHint} />
        </div>
      ) : (
        <ul className="mt-6 space-y-2">
          {tickets.map((t) => (
            <li key={t.id}>
              <Link href={`/admin/tickets/${t.id}`}>
                <PanelCard className="transition-colors hover:border-accent/30">
                  <p className="text-sm text-paper">{t.subject}</p>
                  <p className="mt-1 text-xs text-paper/40">
                    {t.user_name}, {t.status}, {t.updated_at}
                  </p>
                </PanelCard>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
