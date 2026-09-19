"use client";

import type { FormEvent, ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export type LoginFormLabels = {
  title?: string;
  description?: string;
  emailLabel?: string;
  passwordLabel?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  rememberLabel?: string;
  forgotPasswordLabel?: string;
  submitLabel?: string;
  submitLoadingLabel?: string;
  orSignInWith?: string;
  noAccount?: string;
  createAccountLabel?: string;
  googleLabel?: string;
  githubLabel?: string;
  logoAlt?: string;
};

export type LoginFormProps = {
  labels?: LoginFormLabels;
  email?: string;
  password?: string;
  onEmailChange?: (value: string) => void;
  onPasswordChange?: (value: string) => void;
  remember?: boolean;
  onRememberChange?: (value: boolean) => void;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
  error?: ReactNode;
  /** Replaces the default email/password field group when set. */
  children?: ReactNode;
  /** Rendered above the form fields (e.g. mode tabs). */
  beforeFields?: ReactNode;
  forgotPasswordHref?: string;
  registerHref?: string;
  logoHref?: string;
  logo?: ReactNode;
  showOAuth?: boolean;
  showRemember?: boolean;
  className?: string;
  dir?: "ltr" | "rtl" | string;
};

const DEFAULTS: Required<LoginFormLabels> = {
  title: "Welcome to Shadcn Space",
  description: "Login to your account now",
  emailLabel: "Email*",
  passwordLabel: "Password*",
  emailPlaceholder: "example@shadcnspace.com",
  passwordPlaceholder: "Enter your password",
  rememberLabel: "Remember this device",
  forgotPasswordLabel: "Forgot password?",
  submitLabel: "Sign in",
  submitLoadingLabel: "Please wait...",
  orSignInWith: "or sign in with",
  noAccount: "Don't have an account?",
  createAccountLabel: "Create an account",
  googleLabel: "Sign in with Google",
  githubLabel: "Sign in with Github",
  logoAlt: "shadcnspace",
};

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

export default function LoginForm({
  labels,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  remember = true,
  onRememberChange,
  onSubmit,
  loading = false,
  error,
  children,
  beforeFields,
  forgotPasswordHref = "#",
  registerHref = "#",
  logoHref = "/",
  logo,
  showOAuth = true,
  showRemember = true,
  className,
  dir,
}: LoginFormProps) {
  const t = { ...DEFAULTS, ...labels };
  const useCustomBody = children != null;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (onSubmit) {
      onSubmit(e);
      return;
    }
    e.preventDefault();
  }

  const registerLink = (
    <Link
      href={registerHref}
      className="font-medium text-card-foreground !no-underline"
    >
      {t.createAccountLabel}
    </Link>
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
        <Card className="relative flex max-w-lg flex-col gap-6 px-6 py-8 sm:p-12">
          <CardHeader className="gap-6 p-0 text-center">
            <div className="mx-auto">
              <Link href={logoHref} aria-label={t.logoAlt}>
                {logo ?? <DefaultLogo alt={t.logoAlt} />}
              </Link>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-medium text-card-foreground">
                {t.title}
              </h1>
              <CardDescription className="text-sm font-normal text-muted-foreground">
                {t.description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {error ? <div className="mb-4">{error}</div> : null}

            {useCustomBody ? (
              <div className="flex flex-col gap-6">
                {children}
                <FieldDescription className="text-center text-sm font-normal text-muted-foreground">
                  {t.noAccount} {registerLink}
                </FieldDescription>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <FieldGroup className="gap-6">
                  {beforeFields}

                  {showOAuth ? (
                    <>
                      <Field className="grid gap-3 md:grid-cols-2 md:gap-6">
                        <Button
                          variant="outline"
                          type="button"
                          className="h-9 cursor-pointer gap-2 rounded-lg text-sm font-medium text-card-foreground shadow-xs dark:bg-background"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="https://images.shadcnspace.com/assets/svgs/icon-google.svg"
                            alt=""
                            className="h-4 w-4"
                          />
                          {t.googleLabel}
                        </Button>
                        <Button
                          variant="outline"
                          type="button"
                          className="h-9 cursor-pointer gap-2 rounded-lg text-sm font-medium text-card-foreground shadow-xs dark:bg-background"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="https://images.shadcnspace.com/assets/svgs/icon-github.svg"
                            alt=""
                            className="h-4 w-4 dark:hidden"
                          />
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="https://images.shadcnspace.com/assets/svgs/icon-github-white.svg"
                            alt=""
                            className="hidden h-4 w-4 dark:block"
                          />
                          {t.githubLabel}
                        </Button>
                      </Field>
                      <FieldSeparator className="bg-transparent text-sm text-muted-foreground *:data-[slot=field-separator-content]:bg-card">
                        <span className="px-4">{t.orSignInWith}</span>
                      </FieldSeparator>
                    </>
                  ) : null}

                  <div className="flex flex-col gap-4">
                    <Field className="gap-1.5">
                      <FieldLabel
                        htmlFor="login-email"
                        className="text-sm font-normal text-muted-foreground"
                      >
                        {t.emailLabel}
                      </FieldLabel>
                      <Input
                        id="login-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder={t.emailPlaceholder}
                        required
                        value={email}
                        onChange={(e) => onEmailChange?.(e.target.value)}
                        className="h-9 shadow-xs dark:bg-background"
                      />
                    </Field>
                    <Field className="gap-1.5">
                      <FieldLabel
                        htmlFor="login-password"
                        className="text-sm font-normal text-muted-foreground"
                      >
                        {t.passwordLabel}
                      </FieldLabel>
                      <Input
                        id="login-password"
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        placeholder={t.passwordPlaceholder}
                        required
                        value={password}
                        onChange={(e) => onPasswordChange?.(e.target.value)}
                        className="h-9 shadow-xs dark:bg-background"
                      />
                    </Field>
                  </div>

                  <Field orientation="horizontal" className="justify-between">
                    {showRemember ? (
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id="login-remember"
                          checked={remember}
                          onCheckedChange={(v) =>
                            onRememberChange?.(v === true)
                          }
                          className="cursor-pointer"
                        />
                        <FieldLabel
                          htmlFor="login-remember"
                          className="cursor-pointer text-sm font-normal text-primary"
                        >
                          {t.rememberLabel}
                        </FieldLabel>
                      </div>
                    ) : (
                      <span />
                    )}
                    <Link
                      href={forgotPasswordHref}
                      className="text-end text-sm font-medium text-card-foreground"
                    >
                      {t.forgotPasswordLabel}
                    </Link>
                  </Field>

                  <Field className="gap-4">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="h-10 cursor-pointer rounded-lg hover:bg-primary/80"
                    >
                      {loading ? t.submitLoadingLabel : t.submitLabel}
                    </Button>
                    <FieldDescription className="text-center text-sm font-normal text-muted-foreground">
                      {t.noAccount} {registerLink}
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
