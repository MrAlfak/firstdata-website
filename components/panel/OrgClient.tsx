"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import type { UserOrganization } from "@/lib/panel/org";
import { PanelCard, PanelEmpty, PanelLoading } from "./PanelLayoutClient";

function orgRoleLabel(role: string, o: Record<string, string>): string {
  if (role === "owner") return o.roleOwner;
  if (role === "manager") return o.roleManager;
  return o.roleMember;
}

export default function OrgClient() {
  const { dir, p } = useT();
  const o = p.org;
  const [orgs, setOrgs] = useState<UserOrganization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/panel/org")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setOrgs(j.organizations ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PanelLoading label={p.common.loading} />;

  return (
    <div dir={dir}>
      <h1 className="text-2xl text-paper">{o.title}</h1>
      <p className="mt-2 text-sm text-paper/45">{o.subtitle}</p>

      {orgs.length === 0 ? (
        <PanelCard className="mt-6">
          <PanelEmpty label={o.empty} />
        </PanelCard>
      ) : (
        <div className="mt-6 space-y-6">
          {orgs.map((org) => (
            <PanelCard key={org.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg text-paper">{org.name}</h2>
                <span className="text-xs text-paper/45">
                  {o.yourRole}: <span className="text-paper/70">{orgRoleLabel(org.role, o)}</span>
                </span>
              </div>
              <h3 className="mt-4 text-xs uppercase tracking-widest text-paper/35">{o.members}</h3>
              <ul className="mt-2 divide-y divide-paper/10">
                {org.members.map((m) => (
                  <li key={m.userId} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
                    <span className="text-paper/80">{m.name}</span>
                    <span className="text-xs text-paper/45">
                      {orgRoleLabel(m.role, o)}
                      {(m.email || m.phone) && (
                        <span className="ms-2 font-mono text-[10px] text-paper/35" dir="ltr">
                          {m.email ?? m.phone}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </PanelCard>
          ))}
        </div>
      )}
    </div>
  );
}
