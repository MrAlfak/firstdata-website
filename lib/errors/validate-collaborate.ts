import type {
  CollaborateBranchKey,
  SpecialtyKey,
  WorkModeKey,
} from "@/config/collaborate-request";

export type HiringForm = {
  name: string;
  github: string;
  linkedin: string;
  portfolioUrl: string;
  skills: string;
  expectedSalary: string;
  workMode: WorkModeKey | "";
};

export type FreelancerForm = {
  name: string;
  phone: string;
  specialties: SpecialtyKey[];
};

export type HiringErrors = Partial<Record<keyof HiringForm | "resume", string>>;
export type FreelancerErrors = Partial<
  Record<keyof FreelancerForm | "portfolioFile" | "resume", string>
>;

type HiringMessages = {
  nameRequired: string;
  resumeRequired: string;
  urlInvalid: string;
  skillsRequired: string;
  salaryRequired: string;
  workModeRequired: string;
};

type FreelancerMessages = {
  nameRequired: string;
  phoneRequired: string;
  phoneInvalid: string;
  specialtyRequired: string;
  portfolioRequired: string;
};

const PHONE_RE = /^[\d+\s()-]{8,32}$/;
const URL_RE = /^https?:\/\/.+/i;

function validateUrl(value: string, invalidMsg: string): string | undefined {
  if (!value.trim()) return undefined;
  if (!URL_RE.test(value.trim())) return invalidMsg;
  return undefined;
}

export function validateHiringForm(
  form: HiringForm,
  resume: File | null,
  messages: HiringMessages,
): HiringErrors {
  const errors: HiringErrors = {};

  if (!form.name.trim()) errors.name = messages.nameRequired;
  if (!resume || resume.size === 0) errors.resume = messages.resumeRequired;
  if (!form.skills.trim()) errors.skills = messages.skillsRequired;
  if (!form.expectedSalary.trim()) errors.expectedSalary = messages.salaryRequired;
  if (!form.workMode) errors.workMode = messages.workModeRequired;

  const githubErr = validateUrl(form.github, messages.urlInvalid);
  if (githubErr) errors.github = githubErr;
  const linkedinErr = validateUrl(form.linkedin, messages.urlInvalid);
  if (linkedinErr) errors.linkedin = linkedinErr;
  const portfolioErr = validateUrl(form.portfolioUrl, messages.urlInvalid);
  if (portfolioErr) errors.portfolioUrl = portfolioErr;

  return errors;
}

export function validateFreelancerForm(
  form: FreelancerForm,
  portfolioFile: File | null,
  messages: FreelancerMessages,
): FreelancerErrors {
  const errors: FreelancerErrors = {};

  if (!form.name.trim()) errors.name = messages.nameRequired;
  if (!form.phone.trim()) errors.phone = messages.phoneRequired;
  else if (!PHONE_RE.test(form.phone.trim())) errors.phone = messages.phoneInvalid;
  if (form.specialties.length === 0) errors.specialties = messages.specialtyRequired;
  if (!portfolioFile || portfolioFile.size === 0) errors.portfolioFile = messages.portfolioRequired;

  return errors;
}

export type { CollaborateBranchKey };
