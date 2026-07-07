import { z } from "zod";
import { emailSchema, phoneSchema } from "./validation";

export const accountPatchSchema = z
  .object({
    name: z.string().trim().min(2).max(120).optional(),
    password: z.string().min(8).max(128).optional(),
    confirmPassword: z.string().min(8).max(128).optional(),
    currentPassword: z.string().min(1).max(128).optional(),
  })
  .refine(
    (data) => {
      if (!data.password) return true;
      return data.password === data.confirmPassword;
    },
    { message: "Password mismatch", path: ["confirmPassword"] },
  );

export const accountDeleteSchema = z.object({
  confirm: z.literal("DELETE"),
  currentPassword: z.string().min(1).max(128).optional(),
  otpCode: z.string().trim().length(6).regex(/^\d+$/).optional(),
});

export const contactChangeSendSchema = z.discriminatedUnion("channel", [
  z.object({ channel: z.literal("email"), email: emailSchema }),
  z.object({ channel: z.literal("sms"), phone: phoneSchema }),
]);

export const contactChangeConfirmSchema = z.discriminatedUnion("channel", [
  z.object({
    channel: z.literal("email"),
    email: emailSchema,
    code: z.string().trim().length(6).regex(/^\d+$/),
  }),
  z.object({
    channel: z.literal("sms"),
    phone: phoneSchema,
    code: z.string().trim().length(6).regex(/^\d+$/),
  }),
]);

export const passwordResetRequestSchema = z.discriminatedUnion("channel", [
  z.object({ channel: z.literal("email"), email: emailSchema }),
  z.object({ channel: z.literal("sms"), phone: phoneSchema }),
]);

export const passwordResetConfirmSchema = z.discriminatedUnion("channel", [
  z.object({
    channel: z.literal("email"),
    email: emailSchema,
    code: z.string().trim().length(6).regex(/^\d+$/),
    password: z.string().min(8).max(128),
    confirmPassword: z.string().min(8).max(128),
  }),
  z.object({
    channel: z.literal("sms"),
    phone: phoneSchema,
    code: z.string().trim().length(6).regex(/^\d+$/),
    password: z.string().min(8).max(128),
    confirmPassword: z.string().min(8).max(128),
  }),
]);

export const verifyEmailConfirmSchema = z.object({
  code: z.string().trim().length(6).regex(/^\d+$/),
});

export const totpEnableSchema = z.object({
  code: z.string().trim().length(6).regex(/^\d+$/),
  currentPassword: z.string().min(1).max(128).optional(),
});

export const totpDisableSchema = z.object({
  code: z.string().trim().length(6).regex(/^\d+$/),
  currentPassword: z.string().min(1).max(128).optional(),
});

export const totpLoginSchema = z.object({
  preAuthToken: z.string().min(10),
  code: z.string().trim().length(6).regex(/^\d+$/),
});

export function validationError(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Invalid input";
}
