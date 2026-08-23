"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type ForgotPasswordProps = {
  className?: string;
  dir?: "ltr" | "rtl";
  title?: string;
  description?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  submitLabel?: string;
  backLabel?: string;
  backHref?: string;
  logoHref?: string;
  logoLightSrc?: string;
  logoDarkSrc?: string;
  logoAlt?: string;
  email?: string;
  emailId?: string;
  onEmailChange?: (value: string) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
  submitDisabled?: boolean;
  error?: React.ReactNode;
  /** Channel tabs or other content above the fields */
  beforeFields?: React.ReactNode;
  /** Replace the default email field (e.g. phone input) */
  fields?: React.ReactNode;
  /** Replace the entire form body (e.g. “code sent” step) */
  formBody?: React.ReactNode;
  showSubmit?: boolean;
  showBack?: boolean;
};

const DEFAULT_LOGO_LIGHT =
  "https://images.shadcnspace.com/assets/logo/logo-icon-black.svg";
const DEFAULT_LOGO_DARK =
  "https://images.shadcnspace.com/assets/logo/logo-icon-white.svg";

const ForgotPassword = ({
  className,
  dir,
  title = "Forgot your password?",
  description =
    "Please enter the email address associated with your account and we will email you a link to reset your password.",
  emailLabel = "Email*",
  emailPlaceholder = "example@shadcnspace.com",
  submitLabel = "Forgot password",
  backLabel = "Back to Login",
  backHref = "/auth/login",
  logoHref = "",
  logoLightSrc = DEFAULT_LOGO_LIGHT,
  logoDarkSrc = DEFAULT_LOGO_DARK,
  logoAlt = "shadcnspace",
  email,
  emailId = "email",
  onEmailChange,
  onSubmit,
  loading = false,
  submitDisabled = false,
  error,
  beforeFields,
  fields,
  formBody,
  showSubmit = true,
  showBack = true,
}: ForgotPasswordProps) => {
  const logo = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoLightSrc}
        alt={logoAlt}
        className="h-10 w-10 dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoDarkSrc}
        alt={logoAlt}
        className="hidden h-10 w-10 dark:block"
      />
    </>
  );

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
              {logoHref ? (
                <Link href={logoHref} className="inline-block">
                  {logo}
                </Link>
              ) : (
                <span className="inline-block">{logo}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <CardTitle className="text-2xl font-medium text-card-foreground">
                {title}
              </CardTitle>
              <CardDescription className="text-sm font-normal text-muted-foreground">
                {description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {error ? <div className="mb-4">{error}</div> : null}
            {formBody ? (
              formBody
            ) : (
              <form onSubmit={onSubmit}>
                <FieldGroup className="gap-6">
                  {beforeFields}
                  <div className="flex flex-col gap-4">
                    {fields ?? (
                      <Field className="gap-1.5">
                        <FieldLabel
                          htmlFor={emailId}
                          className="text-sm font-normal text-muted-foreground"
                        >
                          {emailLabel}
                        </FieldLabel>
                        <Input
                          id={emailId}
                          type="email"
                          placeholder={emailPlaceholder}
                          required
                          autoComplete="email"
                          value={email}
                          onChange={
                            onEmailChange
                              ? (e) => onEmailChange(e.target.value)
                              : undefined
                          }
                          className="h-9 shadow-xs dark:bg-background"
                        />
                      </Field>
                    )}
                  </div>
                  <Field className="gap-4">
                    {showSubmit ? (
                      <Button
                        type="submit"
                        size="lg"
                        disabled={loading || submitDisabled}
                        className="h-10 cursor-pointer rounded-xl hover:bg-primary/80"
                      >
                        {submitLabel}
                      </Button>
                    ) : null}
                    {showBack ? (
                      <Button
                        type="button"
                        size="lg"
                        variant="ghost"
                        className="cursor-pointer rounded-xl"
                        asChild
                      >
                        <Link href={backHref}>{backLabel}</Link>
                      </Button>
                    ) : null}
                  </Field>
                </FieldGroup>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ForgotPassword;
