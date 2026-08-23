export type ProjectStatus =
  | "inquiry"
  | "contract"
  | "active"
  | "delivered"
  | "support"
  | "closed";

export type ProjectPhase = "consult" | "design" | "build" | "launch" | "support";

export type MilestoneStatus = "pending" | "active" | "done" | "skipped";

export type ContractStatus = "pending" | "signed" | "expired";

export type TicketStatus = "open" | "waiting_client" | "in_progress" | "closed";

export type TicketPriority = "low" | "normal" | "high";

export type InvoiceStatus = "unpaid" | "paid" | "cancelled";

export type ApprovalStatus = "pending" | "approved" | "rejected";

export type FileDirection = "upload" | "download";

export type LeadStatus = "received" | "reviewing" | "replied" | "converted";

export type ProjectRow = {
  id: number;
  user_id: number;
  organization_id: number | null;
  title: string;
  service_slug: string | null;
  status: ProjectStatus;
  phase: ProjectPhase;
  progress_pct: number;
  summary: string | null;
  delivery_due: string | null;
  started_at: string | null;
  created_at: string;
  updated_at: string;
};

export type MilestoneRow = {
  id: number;
  project_id: number;
  milestone_key: string;
  label: string;
  status: MilestoneStatus;
  sort_order: number;
  completed_at: string | null;
};

export type ProjectUpdateRow = {
  id: number;
  project_id: number;
  body: string;
  created_at: string;
};

export type ContractRow = {
  id: number;
  project_id: number;
  user_id: number;
  title: string;
  version: number;
  status: ContractStatus;
  summary: string | null;
  file_path: string | null;
  mime: string | null;
  signature_hash: string | null;
  signature_payload: string | null;
  signed_file_path: string | null;
  signed_at: string | null;
  created_at: string;
};

export type TicketDepartment =
  | "support"
  | "technical"
  | "billing"
  | "sales"
  | "contracts";

export type TicketRow = {
  id: number;
  user_id: number;
  project_id: number | null;
  contract_id: number | null;
  department: TicketDepartment | string;
  subject: string;
  priority: TicketPriority;
  status: TicketStatus;
  created_at: string;
  updated_at: string;
};

export type TicketMessageRow = {
  id: number;
  ticket_id: number;
  author_type: "client" | "staff";
  author_name: string | null;
  body: string;
  created_at: string;
};

export type PanelFileRow = {
  id: number;
  user_id: number;
  project_id: number | null;
  ticket_id?: number | null;
  direction: FileDirection;
  name: string;
  storage_path: string;
  mime: string | null;
  size_bytes: number | null;
  description: string | null;
  created_at: string;
};

export type InvoiceRow = {
  id: number;
  user_id: number;
  project_id: number | null;
  number: string;
  title: string;
  amount_rial: number;
  status: InvoiceStatus;
  due_at: string | null;
  pay_url: string | null;
  payment_authority: string | null;
  payment_ref_id: string | null;
  payment_gateway: string | null;
  paid_at: string | null;
  created_at: string;
};

export type ApprovalRow = {
  id: number;
  project_id: number;
  user_id: number;
  title: string;
  description: string | null;
  status: ApprovalStatus;
  decided_at: string | null;
  created_at: string;
};

export type NotificationRow = {
  id: number;
  user_id: number;
  kind: string;
  title: string;
  body: string | null;
  link: string | null;
  read_at: string | null;
  created_at: string;
};

export type ContactLeadRow = {
  id: number;
  user_id: number | null;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  status: LeadStatus;
  created_at: string;
};

export type OrganizationRow = {
  id: number;
  name: string;
  created_at: string;
};

export type OrganizationMemberRow = {
  id: number;
  organization_id: number;
  user_id: number;
  role: "owner" | "manager" | "member";
  created_at: string;
};

export type OrganizationMemberWithUser = OrganizationMemberRow & {
  user_name: string;
  user_email: string | null;
  user_phone: string | null;
};

export type AdminLeadRow = ContactLeadRow & {
  user_name: string | null;
};

export type AdminTicketRow = TicketRow & {
  user_name: string;
  user_email: string | null;
  project_title: string | null;
};

export type DashboardData = {
  activeProjects: number;
  pendingActions: number;
  openTickets: number;
  unpaidInvoices: number;
  unreadNotifications: number;
  recentUpdates: { projectId: number; projectTitle: string; body: string; createdAt: string }[];
  pendingApprovals: ApprovalRow[];
  pendingContracts: ContractRow[];
};

export type ProjectDetail = {
  project: ProjectRow;
  milestones: MilestoneRow[];
  updates: ProjectUpdateRow[];
  contracts: ContractRow[];
  files: PanelFileRow[];
  approvals: ApprovalRow[];
};
