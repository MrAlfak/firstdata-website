import { z } from "zod";
import { isValidPhone, normalizePhone } from "./phone";
import type { OtpPurpose } from "./types";

export const emailSchema = z.string().trim().email().max(255);

export const phoneSchema = z
  .string()
  .trim()
  .min(10)
  .max(20)
  .refine(isValidPhone, "Invalid mobile number");

export function parsePhone(input: string): string {
  const normalized = normalizePhone(input);
  if (!normalized) throw new Error("Invalid mobile number");
  return normalized;
}

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: emailSchema,
  password: z.string().min(8).max(128),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1).max(128),
});

const otpPurposeSchema = z.enum([
  "login",
  "register",
  "reset_password",
  "verify_email",
  "change_email",
  "change_phone",
  "delete_account",
] satisfies OtpPurpose[]);

export const otpSendEmailSchema = z.object({
  channel: z.literal("email"),
  email: emailSchema,
  purpose: otpPurposeSchema,
});

export const otpSendSmsSchema = z.object({
  channel: z.literal("sms"),
  phone: phoneSchema,
  purpose: otpPurposeSchema,
});

export const otpSendSchema = z.discriminatedUnion("channel", [
  otpSendEmailSchema,
  otpSendSmsSchema,
]);

export const otpVerifyLoginEmailSchema = z.object({
  channel: z.literal("email"),
  email: emailSchema,
  code: z.string().trim().length(6).regex(/^\d+$/),
  purpose: z.literal("login"),
});

export const otpVerifyLoginSmsSchema = z.object({
  channel: z.literal("sms"),
  phone: phoneSchema,
  code: z.string().trim().length(6).regex(/^\d+$/),
  purpose: z.literal("login"),
});

export const otpVerifyRegisterEmailSchema = z.object({
  channel: z.literal("email"),
  email: emailSchema,
  code: z.string().trim().length(6).regex(/^\d+$/),
  purpose: z.literal("register"),
  name: z.string().trim().min(2).max(120),
});

export const otpVerifyRegisterSmsSchema = z.object({
  channel: z.literal("sms"),
  phone: phoneSchema,
  code: z.string().trim().length(6).regex(/^\d+$/),
  purpose: z.literal("register"),
  name: z.string().trim().min(2).max(120),
});

export const otpVerifySchema = z.union([
  otpVerifyLoginEmailSchema,
  otpVerifyLoginSmsSchema,
  otpVerifyRegisterEmailSchema,
  otpVerifyRegisterSmsSchema,
]);

export function validationError(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Invalid input";
}

export function otpDestination(parsed: z.infer<typeof otpSendSchema>): {
  channel: "email" | "sms";
  destination: string;
} {
  if (parsed.channel === "email") {
    return { channel: "email", destination: parsed.email.trim().toLowerCase() };
  }
  return { channel: "sms", destination: parsePhone(parsed.phone) };
}

export function otpVerifyDestination(parsed: z.infer<typeof otpVerifySchema>): {
  channel: "email" | "sms";
  destination: string;
} {
  if (parsed.channel === "email") {
    return { channel: "email", destination: parsed.email.trim().toLowerCase() };
  }
  return { channel: "sms", destination: parsePhone(parsed.phone) };
}

