import { z } from "zod";

export const contactSubmitSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(32).optional().default(""),
  service: z.string().trim().min(1).max(120),
  message: z.string().trim().min(10).max(5000),
  company: z.string().optional().default(""),
  lang: z.enum(["en", "fa"]).optional().default("en"),
});

export type ContactSubmitInput = z.infer<typeof contactSubmitSchema>;

export function contactValidationError(error: z.ZodError): string {
  const first = error.issues[0];
  return first?.message ?? "Invalid form data";
}
