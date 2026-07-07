import { getDb } from "@/lib/auth/db";
import { ensurePanelSchema } from "./migrate";

function db() {
  ensurePanelSchema();
  return getDb();
}

/** User ids whose panel data this user may read (self + org teammates). */
export function getAccessibleUserIds(userId: number): number[] {
  const ids = new Set<number>([userId]);
  const orgRows = db()
    .prepare(
      `SELECT organization_id FROM organization_members WHERE user_id = ?`,
    )
    .all(userId) as { organization_id: number }[];

  for (const { organization_id } of orgRows) {
    const members = db()
      .prepare(`SELECT user_id FROM organization_members WHERE organization_id = ?`)
      .all(organization_id) as { user_id: number }[];
    for (const m of members) ids.add(m.user_id);
  }
  return Array.from(ids);
}

export function getUserOrganizationIds(userId: number): number[] {
  return (
    db()
      .prepare(`SELECT organization_id FROM organization_members WHERE user_id = ?`)
      .all(userId) as { organization_id: number }[]
  ).map((r) => r.organization_id);
}

export function isOrgMember(userId: number, organizationId: number): boolean {
  const row = db()
    .prepare(
      `SELECT 1 AS ok FROM organization_members WHERE user_id = ? AND organization_id = ?`,
    )
    .get(userId, organizationId) as { ok: number } | undefined;
  return Boolean(row);
}

export function canAccessUserData(viewerId: number, ownerId: number): boolean {
  if (viewerId === ownerId) return true;
  return getAccessibleUserIds(viewerId).includes(ownerId);
}
