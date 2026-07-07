"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import { PanelCard, PanelLoading } from "@/components/panel/PanelLayoutClient";

export default function AdminDashboardPage() {
  const { dir, a, fd } = useT();
  const [stats, setStats] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then((j) => j.success && setStats(j.stats));
  }, []);

  if (!stats) return <PanelLoading label={a.common.loading} />;

  const cards = [
    { label: a.dashboard.openTickets, value: stats.openTickets, href: "/admin/tickets" },
    { label: a.dashboard.newLeads, value: stats.newLeads, href: "/admin/leads" },
    { label: a.dashboard.activeProjects, value: stats.activeProjects, href: "/admin/projects" },
    { label: a.dashboard.unpaidInvoices, value: stats.unpaidInvoices, href: "/admin/invoices" },
  ];

  return (
    <div dir={dir}>
      <h1 className="text-2xl text-paper">{a.dashboard.title}</h1>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {cards.map((c) => (
          <Link key={c.label} href={c.href}>
            <PanelCard className="transition-colors hover:border-accent/30">
              <p className="text-xs text-paper/40">{c.label}</p>
              <p className="mt-2 text-2xl text-term">{fd(c.value)}</p>
            </PanelCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
