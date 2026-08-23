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
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FILL_PATHS, LOGO_VIEW_BOX } from "@/lib/brand/mark-paths";
import { cn } from "@/lib/utils";

export type RegisterFormLabels = {
  title?: string;
  description?: string;
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
  namePlaceholder?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  confirmPlaceholder?: string;
  submit?: string;
  loading?: string;
  orSignUpWith?: string;
  signUpGoogle?: string;
  signUpGithub?: string;
  alreadyHaveAccount?: string;
  signIn?: string;
  logoAlt?: string;
};

export type RegisterFormProps = {
  className?: string;
  labels?: RegisterFormLabels;
  /** Demo keeps Shadcn Space marks; production auth uses First Data. */
  brand?: "shadcn" | "firstdata";
  logoHref?: string;
  loginHref?: string;
  showSocial?: boolean;
  showConfirm?: boolean;
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
  onNameChange?: (value: string) => void;
  onEmailChange?: (value: string) => void;
  onPasswordChange?: (value: string) => void;
  onConfirmChange?: (value: string) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
  disabled?: boolean;
  dir?: "ltr" | "rtl";
  /** Tabs / mode switcher above social / fields */
  topSlot?: React.ReactNode;
  /** Error banner */
  errorSlot?: React.ReactNode;
  /** Replaces default name/email/password fields (e.g. OTP flow) */
  fieldsSlot?: React.ReactNode;
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

const DEFAULT_LABELS: Required<RegisterFormLabels> = {
  title: "Signup to Shadcn Space",
  description: "Signup to your account now",
  name: "Name*",
  email: "Email*",
  password: "Password*",
  confirm: "Confirm password*",
  namePlaceholder: "enter your name",
  emailPlaceholder: "example@shadcnspace.com",
  passwordPlaceholder: "Enter your password",
  confirmPlaceholder: "Confirm your password",
  submit: "Sign up",
  loading: "please wait...",
  orSignUpWith: "or sign up with",
  signUpGoogle: "Sign up with Google",
  signUpGithub: "Sign up with Github",
  alreadyHaveAccount: "Already have an account?",
  signIn: "Sign in",
  logoAlt: "shadcnspace",
};

const RegisterForm = ({
  className,
  labels: labelsProp,
  brand = "shadcn",
  logoHref = "/",
  loginHref = "/auth/login",
  showSocial = true,
  showConfirm = false,
  name,
  email,
  password,
  confirm,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmChange,
  onSubmit,
  loading = false,
  disabled = false,
  dir,
  topSlot,
  errorSlot,
  fieldsSlot,
}: RegisterFormProps) => {
  const labels = { ...DEFAULT_LABELS, ...labelsProp };
  const controlled = onNameChange != null || onEmailChange != null || onPasswordChange != null;

  return (
    <section
      dir={dir}
      className={cn(
        "relative flex min-h-[70vh] items-center justify-center bg-transparent",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-lg px-4 py-10 sm:px-0 md:py-20">
        <Card className="relative max-w-lg px-6 py-8 sm:p-12">
          <CardHeader className="gap-6 p-0 text-center">
            <div className="mx-auto">
              <Link href={logoHref} aria-label={labels.logoAlt}>
                {brand === "firstdata" ? (
                  <FirstDataMark />
                ) : (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.shadcnspace.com/assets/logo/logo-icon-black.svg"
                      alt={labels.logoAlt}
                      className="h-10 w-10 dark:hidden"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.shadcnspace.com/assets/logo/logo-icon-white.svg"
                      alt={labels.logoAlt}
                      className="hidden h-10 w-10 dark:block"
                    />
                  </>
                )}
              </Link>
            </div>
            <div className="flex flex-col gap-1">
              <CardTitle className="text-2xl font-medium text-card-foreground">
                {labels.title}
              </CardTitle>
              <CardDescription className="text-sm font-normal text-muted-foreground">
                {labels.description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {topSlot ? <div className="mb-6">{topSlot}</div> : null}
            {errorSlot ? <div className="mb-4">{errorSlot}</div> : null}
            <form onSubmit={onSubmit}>
              <FieldGroup className="gap-6">
                {showSocial ? (
                  <>
                    <Field className="grid gap-3 md:grid-cols-2 md:gap-6">
                      <Button
                        variant="outline"
                        type="button"
                        className="h-9 cursor-pointer gap-2 rounded-lg text-sm font-medium text-card-foreground shadow-sm dark:bg-background"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="https://images.shadcnspace.com/assets/svgs/icon-google.svg"
                          alt=""
                          className="h-4 w-4"
                        />
                        {labels.signUpGoogle}
                      </Button>
                      <Button
                        variant="outline"
                        type="button"
                        className="h-9 cursor-pointer gap-2 rounded-lg text-sm font-medium text-card-foreground shadow-sm dark:bg-background"
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
                        {labels.signUpGithub}
                      </Button>
                    </Field>
                    <FieldSeparator className="bg-transparent text-sm text-muted-foreground *:data-[slot=field-separator-content]:bg-card">
                      <span className="px-4">{labels.orSignUpWith}</span>
                    </FieldSeparator>
                  </>
                ) : null}

                {fieldsSlot ?? (
                  <div className="flex flex-col gap-4">
                    <Field className="gap-1.5">
                      <FieldLabel
                        htmlFor="name"
                        className="text-sm font-normal text-muted-foreground"
                      >
                        {labels.name}
                      </FieldLabel>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder={labels.namePlaceholder}
                        required
                        value={controlled ? name ?? "" : undefined}
                        onChange={
                          onNameChange
                            ? (e) => onNameChange(e.target.value)
                            : undefined
                        }
                        className="h-9 shadow-sm dark:bg-background"
                      />
                    </Field>
                    <Field className="gap-1.5">
                      <FieldLabel
                        htmlFor="email"
                        className="text-sm font-normal text-muted-foreground"
                      >
                        {labels.email}
                      </FieldLabel>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder={labels.emailPlaceholder}
                        required
                        value={controlled ? email ?? "" : undefined}
                        onChange={
                          onEmailChange
                            ? (e) => onEmailChange(e.target.value)
                            : undefined
                        }
                        className="h-9 shadow-sm dark:bg-background"
                      />
                    </Field>
                    <Field className="gap-1.5">
                      <FieldLabel
                        htmlFor="password"
                        className="text-sm font-normal text-muted-foreground"
                      >
                        {labels.password}
                      </FieldLabel>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        placeholder={labels.passwordPlaceholder}
                        required
                        minLength={8}
                        value={controlled ? password ?? "" : undefined}
                        onChange={
                          onPasswordChange
                            ? (e) => onPasswordChange(e.target.value)
                            : undefined
                        }
                        className="h-9 shadow-sm dark:bg-background"
                      />
                    </Field>
                    {showConfirm ? (
                      <Field className="gap-1.5">
                        <FieldLabel
                          htmlFor="confirm"
                          className="text-sm font-normal text-muted-foreground"
                        >
                          {labels.confirm}
                        </FieldLabel>
                        <Input
                          id="confirm"
                          name="confirm"
                          type="password"
                          autoComplete="new-password"
                          placeholder={labels.confirmPlaceholder}
                          required
                          minLength={8}
                          value={controlled ? confirm ?? "" : undefined}
                          onChange={
                            onConfirmChange
                              ? (e) => onConfirmChange(e.target.value)
                              : undefined
                          }
                          className="h-9 shadow-sm dark:bg-background"
                        />
                      </Field>
                    ) : null}
                  </div>
                )}

                <Field className="gap-4">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading || disabled}
                    className="h-10 cursor-pointer rounded-lg hover:bg-primary/80"
                  >
                    {loading ? labels.loading : labels.submit}
                  </Button>
                  <FieldDescription className="text-center text-sm font-normal text-muted-foreground">
                    {labels.alreadyHaveAccount}{" "}
                    <Link
                      href={loginHref}
                      className="font-medium text-card-foreground !no-underline"
                    >
                      {labels.signIn}
                    </Link>
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

export default RegisterForm;
