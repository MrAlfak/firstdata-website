import { z } from "zod";
import {
  BUDGET_KEYS,
  PROJECT_TYPE_KEYS,
  TIMELINE_KEYS,
} from "@/config/project-request";

export const projectRequestSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(8).max(32),
  companyName: z.string().trim().max(120).optional().default(""),
  projectTypes: z.array(z.enum(PROJECT_TYPE_KEYS)).min(1),
  budget: z.enum(BUDGET_KEYS),
  timeline: z.enum(TIMELINE_KEYS),
  description: z.string().trim().min(10).max(5000),
  lang: z.enum(["en", "fa"]).optional().default("en"),
  website: z.string().optional().default(""),
});

export type ProjectRequestInput = z.infer<typeof projectRequestSchema>;

export type ProjectRequestAttachment = {
  name: string;
  path: string;
  size: number;
  mime: string | null;
};

export function projectRequestValidationError(error: z.ZodError): string {
  const first = error.issues[0];
  return first?.message ?? "Invalid form data";
}

export function formatProjectRequestMessage(
  input: ProjectRequestInput,
  labels: {
    types: string[];
    budget: string;
    timeline: string;
    company?: string;
    attachments?: string[];
  },
): string {
  const lines = [
    "[Project Request]",
    `Types: ${labels.types.join(", ")}`,
    `Budget: ${labels.budget}`,
    `Timeline: ${labels.timeline}`,
  ];
  if (labels.company) lines.push(`Company: ${labels.company}`);
  if (labels.attachments?.length) lines.push(`Attachments: ${labels.attachments.join(", ")}`);
  lines.push("", input.description);
  return lines.join("\n");
}
