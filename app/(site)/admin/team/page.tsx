"use client";

import { useCallback, useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";
import UserSearchInput from "@/components/admin/UserSearchInput";
import { PanelCard, PanelLoading } from "@/components/panel/PanelLayoutClient";

type Org = { id: number; name: string };
type Member = {
  id: number;
  user_id: number;
  role: string;
  user_name: string;
  user_email: string | null;
};

export default function AdminTeamPage() {
  const { dir, a } = useT();
  const [orgs, setOrgs] = useState<Org[] | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<number | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [memberUserId, setMemberUserId] = useState<number | null>(null);
  const [ownerUserId, setOwnerUserId] = useState<number | null>(null);
  const [orgName, setOrgName] = useState("");
  const [role, setRole] = useState("member");
  const [msg, setMsg] = useState("");

  const loadOrgs = useCallback(() => {
    fetch("/api/admin/organizations")
      .then((r) => r.json())
      .then((j) => {
        if (j.success) {
          setOrgs(j.organizations);
          if (j.organizations[0]) {
            setSelectedOrg((prev) => prev ?? j.organizations[0].id);
          }
        }
      });
  }, []);

  useEffect(() => {
    loadOrgs();
  }, [loadOrgs]);

  useEffect(() => {
    if (!selectedOrg) return;
    fetch(`/api/admin/organizations/${selectedOrg}/members`)
      .then((r) => r.json())
      .then((j) => j.success && setMembers(j.members));
  }, [selectedOrg]);

  async function addMember(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedOrg || !memberUserId) return;
    const res = await fetch("/api/admin/organizations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        organizationId: selectedOrg,
        userId: memberUserId,
        role,
      }),
    });
    const j = await res.json();
    setMsg(j.ok ? a.common.success : a.common.failed);
    setMemberUserId(null);
    if (selectedOrg) {
      fetch(`/api/admin/organizations/${selectedOrg}/members`)
        .then((r) => r.json())
        .then((j2) => j2.success && setMembers(j2.members));
    }
  }

  async function createOrg(e: React.FormEvent) {
    e.preventDefault();
    if (!ownerUserId || !orgName.trim()) return;
    const res = await fetch("/api/admin/organizations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: orgName.trim(), ownerUserId }),
    });
    const j = await res.json();
    if (j.success) {
      setOrgName("");
      setOwnerUserId(null);
      setMsg(a.common.success);
      loadOrgs();
      if (j.organizationId) setSelectedOrg(j.organizationId);
    } else {
      setMsg(a.common.failed);
    }
  }

  if (!orgs) return <PanelLoading label={a.common.loading} />;

  const inputClass = "border border-paper/20 bg-transparent px-2 py-1.5 text-sm text-paper w-full";

  return (
    <div dir={dir}>
      <h1 className="text-2xl text-paper">{a.team.title}</h1>

      <PanelCard className="mt-6">
        <h2 className="text-sm text-paper/60">{a.team.createOrg}</h2>
        <form onSubmit={createOrg} className="mt-3 grid gap-2 sm:grid-cols-2">
          <input
            required
            placeholder={a.team.orgName}
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className={inputClass}
          />
          <UserSearchInput
            value={ownerUserId}
            onSelect={(u) => setOwnerUserId(u?.id ?? null)}
            placeholder={a.team.ownerUser}
          />
          <button
            type="submit"
            disabled={!ownerUserId}
            className="border border-accent/50 px-3 py-1.5 text-xs text-accent sm:col-span-2"
          >
            {a.team.createOrg}
          </button>
        </form>
      </PanelCard>

      <PanelCard className="mt-6">
        <label className="text-xs text-paper/50">{a.team.orgId}</label>
        <select
          value={selectedOrg ?? ""}
          onChange={(e) => setSelectedOrg(Number(e.target.value))}
          className="mt-1 w-full border border-paper/20 bg-transparent px-2 py-2 text-sm text-paper"
        >
          {orgs.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name} (#{o.id})
            </option>
          ))}
        </select>

        <ul className="mt-4 space-y-2">
          {members.map((m) => (
            <li key={m.id} className="text-xs text-paper/60">
              {m.user_name} ({m.role}){m.user_email ? `, ${m.user_email}` : ""}
            </li>
          ))}
        </ul>

        <form onSubmit={addMember} className="mt-4 grid gap-2">
          <UserSearchInput
            value={memberUserId}
            onSelect={(u) => setMemberUserId(u?.id ?? null)}
            placeholder={a.team.userId}
          />
          <div className="grid gap-2 sm:grid-cols-2">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={inputClass}
            >
              <option value="owner">{a.common.owner}</option>
              <option value="manager">{a.team.manager}</option>
              <option value="member">{a.team.member}</option>
            </select>
            <button
              type="submit"
              disabled={!memberUserId}
              className="border border-accent/50 px-3 py-1.5 text-xs text-accent"
            >
              {a.team.addMember}
            </button>
          </div>
        </form>
        {msg && <p className="mt-2 text-xs text-term">{msg}</p>}
      </PanelCard>
    </div>
  );
}
