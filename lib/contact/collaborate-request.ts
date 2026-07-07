import { z } from "zod";
import {
  COLLABORATE_BRANCH_KEYS,
  SPECIALTY_KEYS,
  WORK_MODE_KEYS,
} from "@/config/collaborate-request";

const urlOptional = z
  .string()
  .trim()
  .max(500)
  .optional()
  .default("")
  .refine((v) => !v || /^https?:\/\/.+/i.test(v), { message: "Invalid URL" });

export const collaborateHiringSchema = z.object({
  branch: z.literal("hiring"),
  name: z.string().trim().min(1).max(120),
  github: urlOptional,
  linkedin: urlOptional,
  portfolioUrl: urlOptional,
  skills: z.string().trim().min(2).max(2000),
  expectedSalary: z.string().trim().min(1).max(120),
  workMode: z.enum(WORK_MODE_KEYS),
  lang: z.enum(["en", "fa"]).optional().default("en"),
  website: z.string().optional().default(""),
});

export const collaborateFreelancerSchema = z.object({
  branch: z.literal("freelancer"),
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(8).max(32),
  specialties: z.array(z.enum(SPECIALTY_KEYS)).min(1),
  lang: z.enum(["en", "fa"]).optional().default("en"),
  website: z.string().optional().default(""),
});

export const collaborateBranchSchema = z.enum(COLLABORATE_BRANCH_KEYS);

export type CollaborateHiringInput = z.infer<typeof collaborateHiringSchema>;
export type CollaborateFreelancerInput = z.infer<typeof collaborateFreelancerSchema>;

export type CollaborateMetadata =
  | {
      branch: "hiring";
      github?: string;
      linkedin?: string;
      portfolioUrl?: string;
      skills: string;
      expectedSalary: string;
      workMode: string;
    }
  | {
      branch: "freelancer";
      specialties: string[];
    };

export type CollaborateAttachment = {
  name: string;
  path: string;
  size: number;
  mime: string | null;
  role?: "resume" | "portfolio";
};

export function collaborateValidationError(error: z.ZodError): string {
  const first = error.issues[0];
  return first?.message ?? "Invalid form data";
}

export function formatCollaborateHiringMessage(
  input: CollaborateHiringInput,
  labels: { workMode: string; attachments?: string[] },
): string {
  const lines = [
    "[Collaborate — Hiring]",
    `Work mode: ${labels.workMode}`,
    `Expected salary: ${input.expectedSalary}`,
    `Skills: ${input.skills}`,
  ];
  if (input.github) lines.push(`GitHub: ${input.github}`);
  if (input.linkedin) lines.push(`LinkedIn: ${input.linkedin}`);
  if (input.portfolioUrl) lines.push(`Portfolio: ${input.portfolioUrl}`);
  if (labels.attachments?.length) lines.push(`Attachments: ${labels.attachments.join(", ")}`);
  return lines.join("\n");
}

export function formatCollaborateFreelancerMessage(
  input: CollaborateFreelancerInput,
  labels: { specialties: string[]; attachments?: string[] },
): string {
  const lines = [
    "[Collaborate — Freelancer]",
    `Specialties: ${labels.specialties.join(", ")}`,
    `Phone: ${input.phone}`,
  ];
  if (labels.attachments?.length) lines.push(`Attachments: ${labels.attachments.join(", ")}`);
  return lines.join("\n");
}
