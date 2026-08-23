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
import { cn } from "@/lib/utils";

export interface VerifyEmailProps {
  email?: string;
  title?: string;
  /** Full description; when omitted, built from `email` + default copy. */
  description?: string;
  verifyLabel?: string;
  resendPrompt?: string;
  resendLabel?: string;
  logoHref?: string;
  logoLightSrc?: string;
  logoDarkSrc?: string;
  logoAlt?: string;
  logo?: ReactNode;
  onVerify?: (e: FormEvent<HTMLFormElement>) => void;
  onResend?: () => void;
  verifyHref?: string;
  resendHref?: string;
  loading?: boolean;
  className?: string;
}

const DEFAULT_EMAIL = "hello@example.com";

function buildDescription(email: string): string {
  return `An activation link has been sent to your email address: ${email}. Please check your inbox and click on the link to complete the activation process.`;
}

const VerifyEmail = ({
  email = DEFAULT_EMAIL,
  title = "Verify your email",
  description,
  verifyLabel = "Verify Now",
  resendPrompt = "Didn't get the email?",
  resendLabel = "Resend",
  logoHref = "/",
  logoLightSrc = "https://images.shadcnspace.com/assets/logo/logo-icon-black.svg",
  logoDarkSrc = "https://images.shadcnspace.com/assets/logo/logo-icon-white.svg",
  logoAlt = "Logo",
  logo,
  onVerify,
  onResend,
  verifyHref,
  resendHref = "#",
  loading = false,
  className,
}: VerifyEmailProps) => {
  const body = description ?? buildDescription(email);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onVerify?.(e);
  }

  const verifyButton = (
    <Button
      type={verifyHref ? "button" : "submit"}
      size="lg"
      disabled={loading}
      className="h-10 cursor-pointer rounded-xl hover:bg-primary/80"
    >
      {verifyLabel}
    </Button>
  );

  const resendClassName =
    "font-medium text-card-foreground !no-underline hover:!no-underline";

  return (
    <section
      className={cn(
        "relative flex min-h-[70vh] items-center justify-center bg-transparent",
        className,
      )}
    >
      <div className="relative mx-auto w-full max-w-lg px-4 py-10 sm:px-0 md:py-20">
        <Card className="relative px-6 py-8 sm:p-12">
          <CardHeader className="gap-6 p-0 text-center">
            <div className="mx-auto">
              {logo ? (
                logoHref ? (
                  <Link href={logoHref}>{logo}</Link>
                ) : (
                  logo
                )
              ) : (
                <Link href={logoHref}>
                  <img
                    src={logoLightSrc}
                    alt={logoAlt}
                    className="h-10 w-10 dark:hidden"
                  />
                  <img
                    src={logoDarkSrc}
                    alt={logoAlt}
                    className="hidden h-10 w-10 dark:block"
                  />
                </Link>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <CardTitle className="text-2xl font-medium text-card-foreground">
                {title}
              </CardTitle>
              <CardDescription className="text-sm font-normal text-muted-foreground">
                {body}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field className="gap-4">
                  {verifyHref ? (
                    <Button
                      asChild
                      size="lg"
                      className="h-10 cursor-pointer rounded-xl hover:bg-primary/80"
                    >
                      <Link href={verifyHref}>{verifyLabel}</Link>
                    </Button>
                  ) : (
                    verifyButton
                  )}
                  <FieldDescription className="text-center text-sm font-normal text-muted-foreground">
                    {resendPrompt}{" "}
                    {onResend ? (
                      <button
                        type="button"
                        onClick={onResend}
                        disabled={loading}
                        className={resendClassName}
                      >
                        {resendLabel}
                      </button>
                    ) : (
                      <a href={resendHref} className={resendClassName}>
                        {resendLabel}
                      </a>
                    )}
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default VerifyEmail;
