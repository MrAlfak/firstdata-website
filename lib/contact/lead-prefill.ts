import {
  BUDGET_KEYS,
  PROJECT_TYPE_KEYS,
  TIMELINE_KEYS,
  type BudgetKey,
  type ProjectTypeKey,
  type TimelineKey,
} from "@/config/project-request";

export const LEAD_PREFILL_KEY = "fd-lead-prefill";

export type LeadPrefill = {
  source: "terminal" | "chat" | "campaign";
  description?: string;
  name?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  projectTypes?: ProjectTypeKey[];
  budget?: BudgetKey;
  timeline?: TimelineKey;
  /** Unix ms — ignore stale drafts */
  at?: number;
};

const MAX_AGE_MS = 1000 * 60 * 60 * 6; // 6 hours

function isProjectType(v: unknown): v is ProjectTypeKey {
  return typeof v === "string" && (PROJECT_TYPE_KEYS as readonly string[]).includes(v);
}

function isBudget(v: unknown): v is BudgetKey {
  return typeof v === "string" && (BUDGET_KEYS as readonly string[]).includes(v);
}

function isTimeline(v: unknown): v is TimelineKey {
  return typeof v === "string" && (TIMELINE_KEYS as readonly string[]).includes(v);
}

export function writeLeadPrefill(draft: LeadPrefill): void {
  if (typeof window === "undefined") return;
  try {
    const payload: LeadPrefill = { ...draft, at: Date.now() };
    sessionStorage.setItem(LEAD_PREFILL_KEY, JSON.stringify(payload));
  } catch {
    /* ignore */
  }
}

export function readLeadPrefill(): LeadPrefill | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(LEAD_PREFILL_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LeadPrefill;
    if (!parsed || typeof parsed !== "object") return null;
    if (parsed.at && Date.now() - parsed.at > MAX_AGE_MS) {
      sessionStorage.removeItem(LEAD_PREFILL_KEY);
      return null;
    }
    const projectTypes = Array.isArray(parsed.projectTypes)
      ? parsed.projectTypes.filter(isProjectType)
      : undefined;
    return {
      source: parsed.source === "chat" || parsed.source === "campaign" ? parsed.source : "terminal",
      description: typeof parsed.description === "string" ? parsed.description.slice(0, 4000) : undefined,
      name: typeof parsed.name === "string" ? parsed.name.slice(0, 120) : undefined,
      email: typeof parsed.email === "string" ? parsed.email.slice(0, 200) : undefined,
      phone: typeof parsed.phone === "string" ? parsed.phone.slice(0, 40) : undefined,
      companyName:
        typeof parsed.companyName === "string" ? parsed.companyName.slice(0, 200) : undefined,
      projectTypes: projectTypes?.length ? projectTypes : undefined,
      budget: isBudget(parsed.budget) ? parsed.budget : undefined,
      timeline: isTimeline(parsed.timeline) ? parsed.timeline : undefined,
      at: parsed.at,
    };
  } catch {
    return null;
  }
}

export function clearLeadPrefill(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(LEAD_PREFILL_KEY);
  } catch {
    /* ignore */
  }
}
