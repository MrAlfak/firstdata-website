"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import type { ContactLeadRow } from "@/lib/panel/types";
import { PanelCard, PanelEmpty, PanelLoading } from "./PanelLayoutClient";

export default function RequestsClient() {
  const { dir, p } = useT();
  const [leads, setLeads] = useState<ContactLeadRow[] | null>(null);

  useEffect(() => {
    fetch("/api/panel/requests")
      .then((r) => r.json())
      .then((j) => j.success && setLeads(j.leads));
  }, []);

  if (!leads) return <PanelLoading label={p.common.loading} />;

  return (
    <div dir={dir}>
      <h1 className="text-2xl text-paper">{p.requests.title}</h1>
      {leads.length === 0 ? (
        <PanelCard className="mt-6">
          <PanelEmpty label={p.common.empty} />
        </PanelCard>
      ) : (
        <ul className="mt-6 space-y-3">
          {leads.map((lead) => (
            <li key={lead.id}>
              <PanelCard>
                <p className="text-xs text-paper/40">{lead.created_at}</p>
                <p className="mt-1 text-sm text-paper">{lead.service || lead.message.slice(0, 80)}</p>
                <p className="mt-2 text-xs text-paper/45">
                  {p.status.lead[lead.status ?? "received"] ?? lead.status}
                </p>
                <p className="mt-2 text-sm text-paper/55">{lead.message}</p>
              </PanelCard>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
