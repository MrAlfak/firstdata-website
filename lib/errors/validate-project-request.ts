import type { BudgetKey, ProjectTypeKey, TimelineKey } from "@/config/project-request";

export type ProjectRequestForm = {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  projectTypes: ProjectTypeKey[];
  budget: BudgetKey | "";
  timeline: TimelineKey | "";
  description: string;
};

export type ProjectRequestField = keyof ProjectRequestForm;

export type ProjectRequestErrors = Partial<Record<ProjectRequestField, string>>;

type Messages = {
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  phoneRequired: string;
  phoneInvalid: string;
  projectTypeRequired: string;
  budgetRequired: string;
  timelineRequired: string;
  descriptionRequired: string;
  descriptionMin: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d+\s()-]{8,32}$/;

export function validateProjectRequestForm(
  form: ProjectRequestForm,
  messages: Messages,
): ProjectRequestErrors {
  const errors: ProjectRequestErrors = {};

  if (!form.name.trim()) errors.name = messages.nameRequired;
  if (!form.email.trim()) errors.email = messages.emailRequired;
  else if (!EMAIL_RE.test(form.email.trim())) errors.email = messages.emailInvalid;
  if (!form.phone.trim()) errors.phone = messages.phoneRequired;
  else if (!PHONE_RE.test(form.phone.trim())) errors.phone = messages.phoneInvalid;
  if (form.projectTypes.length === 0) errors.projectTypes = messages.projectTypeRequired;
  if (!form.budget) errors.budget = messages.budgetRequired;
  if (!form.timeline) errors.timeline = messages.timelineRequired;
  if (!form.description.trim()) errors.description = messages.descriptionRequired;
  else if (form.description.trim().length < 10) errors.description = messages.descriptionMin;

  return errors;
}
