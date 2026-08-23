"use client";

import type { FormEvent, ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { FILL_PATHS, LOGO_VIEW_BOX } from "@/lib/brand/mark-paths";
import { cn } from "@/lib/utils";

export type TwoFactorAuthLabels = {
  title?: string;
  description?: string;
  resendPrompt?: string;
  resendLabel?: string;
  confirmLabel?: string;
  confirmLoadingLabel?: string;
  logoAlt?: string;
};

export type TwoFactorAuthFormProps = {
  labels?: TwoFactorAuthLabels;
  /** Demo keeps Shadcn Space marks; production auth uses First Data. */
  brand?: "shadcn" | "firstdata";
  logoHref?: string;
  logo?: ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  onResend?: () => void;
  resendHref?: string;
  /** Hide resend row (e.g. authenticator TOTP has nothing to resend). */
  showResend?: boolean;
  loading?: boolean;
  disabled?: boolean;
  error?: ReactNode;
  /** Secondary action under the confirm button (e.g. back to sign in). */
  footerSlot?: ReactNode;
  className?: string;
  dir?: "ltr" | "rtl" | string;
};

const DEFAULTS: Required<TwoFactorAuthLabels> = {
  title: "Two Factor Authentication",
  description:
    "Please confirm access to your account by entering the code provided by your authenticator application",
  resendPrompt: "Didn\u2019t get the code?",
  resendLabel: "Resend code",
  confirmLabel: "Confirm",
  confirmLoadingLabel: "Please wait...",
  logoAlt: "shadcnspace",
};

function FirstDataMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox={LOGO_VIEW_BOX}
      className={cn("h-10 w-10 text-card-foreground", className)}
      aria-hidden="true"
    >
      {FILL_PATHS.map((d) => (
        <path key={d} d={d} fill="currentColor" fillRule="evenodd" />
      ))}
    </svg>
  );
}

function DefaultLogo({ alt }: { alt: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.shadcnspace.com/assets/logo/logo-icon-black.svg"
        alt={alt}
        className="h-10 w-10 dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.shadcnspace.com/assets/logo/logo-icon-white.svg"
        alt={alt}
        className="hidden h-10 w-10 dark:block"
      />
    </>
  );
}

const TwoFactorAuthForm = ({
  labels,
  brand = "shadcn",
  logoHref = "/",
  logo,
  value,
  onValueChange,
  onSubmit,
  onResend,
  resendHref = "#",
  showResend = true,
  loading = false,
  disabled = false,
  error,
  footerSlot,
  className,
  dir,
}: TwoFactorAuthFormProps) => {
  const t = { ...DEFAULTS, ...labels };
  const controlled = onValueChange != null;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (onSubmit) {
      onSubmit(e);
      return;
    }
    e.preventDefault();
  }

  const logoNode =
    logo ??
    (brand === "firstdata" ? <FirstDataMark /> : <DefaultLogo alt={t.logoAlt} />);

  return (
    <section
      dir={dir}
      className={cn(
        "relative flex min-h-[70vh] items-center justify-center bg-transparent",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-lg px-4 py-10 sm:px-0 md:py-20">
        <Card className="relative flex flex-col gap-6 px-6 py-8 sm:p-12">
          <CardHeader className="gap-6 p-0 text-center">
            <div className="mx-auto">
              <Link href={logoHref} aria-label={t.logoAlt}>
                {logoNode}
              </Link>
            </div>
            <div className="flex flex-col gap-1">
              <CardTitle className="text-2xl font-medium text-card-foreground">
                {t.title}
              </CardTitle>
              <CardDescription className="text-sm font-normal text-muted-foreground">
                {t.description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {error ? <div className="mb-4">{error}</div> : null}
            <form onSubmit={handleSubmit}>
              <FieldGroup className="gap-6">
                <div className="flex flex-col items-center gap-4">
                  <InputOTP
                    maxLength={6}
                    id="otp"
                    required
                    value={controlled ? value ?? "" : undefined}
                    onChange={onValueChange}
                    disabled={loading || disabled}
                    autoComplete="one-time-code"
                  >
                    <InputOTPGroup className="gap-1 *:data-[slot=input-otp-slot]:size-9 *:data-[slot=input-otp-slot]:rounded-xl *:data-[slot=input-otp-slot]:border">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>

                  <Field className="w-full gap-6">
                    {showResend ? (
                      <FieldDescription className="text-center text-sm font-normal text-muted-foreground">
                        {t.resendPrompt}{" "}
                        {onResend ? (
                          <button
                            type="button"
                            onClick={onResend}
                            className="font-medium text-card-foreground !no-underline"
                          >
                            {t.resendLabel}
                          </button>
                        ) : (
                          <Link
                            href={resendHref}
                            className="font-medium text-card-foreground !no-underline"
                          >
                            {t.resendLabel}
                          </Link>
                        )}
                      </FieldDescription>
                    ) : null}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading || disabled}
                      className="h-10 cursor-pointer rounded-lg hover:bg-primary/80"
                    >
                      {loading ? t.confirmLoadingLabel : t.confirmLabel}
                    </Button>
                    {footerSlot}
                  </Field>
                </div>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TwoFactorAuthForm;
