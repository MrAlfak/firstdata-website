import { getDb } from "@/lib/auth/db";
import { ensurePanelSchema } from "./migrate";

export type OrgMember = {
  userId: number;
  name: string;
  email: string | null;
  phone: string | null;
  role: string;
};

export type UserOrganization = {
  id: number;
  name: string;
  role: string;
  members: OrgMember[];
};

function db() {
  ensurePanelSchema();
  return getDb();
}

export function listUserOrganizations(userId: number): UserOrganization[] {
  const orgRows = db()
    .prepare(
      `SELECT o.id, o.name, om.role
       FROM organizations o
       JOIN organization_members om ON om.organization_id = o.id
       WHERE om.user_id = ?
       ORDER BY o.name`,
    )
    .all(userId) as { id: number; name: string; role: string }[];

  return orgRows.map((org) => {
    const members = db()
      .prepare(
        `SELECT u.id AS userId, u.name, u.email, u.phone, om.role
         FROM organization_members om
         JOIN users u ON u.id = om.user_id
         WHERE om.organization_id = ?
         ORDER BY om.role, u.name`,
      )
      .all(org.id) as OrgMember[];
    return { id: org.id, name: org.name, role: org.role, members };
  });
}
