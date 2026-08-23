"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { useT } from "@/i18n/LangProvider";
import type { UserOrganization } from "@/lib/panel/org";
import { PanelCard, PanelEmpty } from "./PanelLayoutClient";
import { PanelGateLoading } from "./PanelGateLoading";
import { usePanelSkin } from "./PanelSkinToggle";
import PanelDataTable from "./PanelDataTable";

function orgRoleLabel(role: string, o: Record<string, string>): string {
  if (role === "owner") return o.roleOwner;
  if (role === "manager") return o.roleManager;
  return o.roleMember;
}

export default function OrgClient() {
  const { dir, p } = useT();
  const o = p.org;
  const [skin] = usePanelSkin();
  const isModern = skin === "modern";
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

  if (loading) return <PanelGateLoading label={p.common.loading} />;

  if (isModern) {
    return (
      <div dir={dir}>
        <h1 className="text-2xl text-paper">{o.title}</h1>
        <p className="mt-2 text-sm text-paper/45">{o.subtitle}</p>
        {orgs.length === 0 ? (
          <div className="mt-6">
            <PanelEmpty label={o.empty} title={o.empty} description={o.emptyHint} />
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {orgs.map((org) => (
              <PanelDataTable
                key={org.id}
                title={org.name}
                description={`${o.yourRole}: ${orgRoleLabel(org.role, o)}`}
                primaryHeader={p.common.member}
                columnHeaders={[p.common.role]}
                showCheckbox
                empty={<PanelEmpty label={p.common.empty} />}
                rows={org.members.map((m) => ({
                  id: String(m.userId),
                  icon: Users,
                  iconClassName: "text-blue-500",
                  iconBgClassName: "bg-blue-500/20",
                  title: m.name,
                  subtitle: (
                    <span dir="ltr">{m.email ?? m.phone ?? "—"}</span>
                  ),
                  cells: [orgRoleLabel(m.role, o)],
                }))}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div dir={dir}>
      <h1 className="text-2xl text-paper">{o.title}</h1>
      <p className="mt-2 text-sm text-paper/45">{o.subtitle}</p>

      {orgs.length === 0 ? (
        <div className="mt-6">
          <PanelEmpty label={o.empty} title={o.empty} description={o.emptyHint} />
        </div>
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
