import { z } from "zod";
import { CONTACT_METHOD_KEYS, CONTACT_TIME_KEYS } from "@/config/consultation-request";

export const consultationRequestSchema = z
  .object({
    name: z.string().trim().min(1).max(120),
    phone: z.string().trim().min(8).max(32),
    contactMethod: z.enum(CONTACT_METHOD_KEYS),
    email: z.string().trim().max(254).optional().default(""),
    contactTime: z.enum(CONTACT_TIME_KEYS),
    lang: z.enum(["en", "fa"]).optional().default("en"),
    website: z.string().optional().default(""),
  })
  .superRefine((data, ctx) => {
    if (data.contactMethod === "email") {
      if (!data.email) {
        ctx.addIssue({ code: "custom", message: "Email required", path: ["email"] });
        return;
      }
      const emailCheck = z.string().email().safeParse(data.email);
      if (!emailCheck.success) {
        ctx.addIssue({ code: "custom", message: "Invalid email", path: ["email"] });
      }
    } else if (data.email) {
      const emailCheck = z.string().email().safeParse(data.email);
      if (!emailCheck.success) {
        ctx.addIssue({ code: "custom", message: "Invalid email", path: ["email"] });
      }
    }
  });

export type ConsultationRequestInput = z.infer<typeof consultationRequestSchema>;

export function consultationValidationError(error: z.ZodError): string {
  const first = error.issues[0];
  return first?.message ?? "Invalid form data";
}

export function formatConsultationMessage(input: ConsultationRequestInput, labels: {
  method: string;
  time: string;
}): string {
  return [
    "[Free Consultation]",
    `Contact method: ${labels.method}`,
    `Best time: ${labels.time}`,
    input.email ? `Email: ${input.email}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
