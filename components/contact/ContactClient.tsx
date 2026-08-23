"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import { Decode } from "@/components/Decode";
import FormFieldError from "@/components/errors/FormFieldError";
import InlineError from "@/components/errors/InlineError";
import { useT } from "@/i18n/LangProvider";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import { submitContactForm } from "@/lib/contact/submit-client";
import { validateContactForm, type ContactErrors } from "@/lib/errors/validate-contact";
import {
  CONTACT_MAP_URL,
  CONTACT_TELEGRAM_URL,
  CONTACT_WHATSAPP_URL,
  toTelHref,
} from "@/config/contact";
import { useContactFormClasses } from "@/components/contact/useContactFormClasses";
import { pushAlert } from "@/lib/alerts/types";
import PixelIcon from "@/components/icons/PixelIcon";
import StreamlineCoreIcon from "@/components/icons/StreamlineCoreIcon";
import SkinSelect from "@/components/ui/SkinSelect";
import { CORE_CONTACT } from "@/lib/icons/streamline-core-map";
import { PIXEL_CONTACT } from "@/lib/icons/streamline-pixel-map";
import { ModernFormStepper, type ModernFormStep } from "@/components/ui/modern-form-stepper";

function pickContactErrors(errors: ContactErrors, keys: (keyof ContactErrors)[]) {
  const out: ContactErrors = {};
  for (const key of keys) {
    if (errors[key]) out[key] = errors[key];
  }
  return out;
}

export default function ContactClient() {
  const { fa, dir, d } = useT();
  const c = d.contact;
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const cls = useContactFormClasses();
  const ids = {
    name: useId(),
    email: useId(),
    phone: useId(),
    service: useId(),
    message: useId(),
  };

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactErrors>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    company: "",
  });
  const [step, setStep] = useState(0);

  const [mapOpen, setMapOpen] = useState(false);

  useEffect(() => {
    if (!mapOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mapOpen]);

  // Enable submit only when the required fields are complete and valid.
  const completionErrors = validateContactForm(form, d.errors.contact);
  const canSubmit = Object.keys(completionErrors).length === 0;

  const cleanEyebrow = c.eyebrow.replace(/^\/\/\s*/, "").replace(/^>\s*/, "").trim();
  const face = ai || fa ? "font-iran" : "";

  const contactGlyph = (key: keyof typeof PIXEL_CONTACT & keyof typeof CORE_CONTACT) =>
    ai ? (
      <StreamlineCoreIcon name={CORE_CONTACT[key]} size={18} className="text-current" />
    ) : (
      <PixelIcon name={PIXEL_CONTACT[key]} size={18} className="text-current" />
    );

  const tipClass = `pointer-events-none absolute left-1/2 bottom-[calc(100%+0.45rem)] z-[90] -translate-x-1/2 whitespace-nowrap border border-paper/25 bg-ink px-2 py-1 text-[10px] text-paper opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.55)] transition-opacity duration-150 group-hover/tip:opacity-100 group-focus-within/tip:opacity-100 ${
    fa ? "font-fa normal-case" : "font-mono uppercase tracking-wider"
  }`;
  const iconBtnClass =
    "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-paper/15 bg-paper/[0.03] text-paper/70 transition-colors duration-200 hover:border-paper/35 hover:text-paper focus:outline-none";

  const inputError = (field: keyof ContactErrors) =>
    fieldErrors[field]
      ? cls.input("border-terr/40 focus:border-terr/50 focus:ring-terr/15")
      : cls.input();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.company) return;
    setSubmitError("");
    const errors = validateContactForm(form, d.errors.contact);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    const result = await submitContactForm({ ...form, lang: fa ? "fa" : "en" });
    setSubmitting(false);

    if (!result.ok) {
      setSubmitError(
        result.message === "RATE_LIMIT" ? d.errors.auth.RATE_LIMIT : d.errors.contact.networkError,
      );
      pushAlert({ message: d.alerts.formError, tone: "error" });
      return;
    }

    setSubmitted(true);
    pushAlert({ message: d.alerts.formSent, tone: "success" });
  };

  const advanceModern = () => {
    const all = validateContactForm(form, d.errors.contact);
    if (step === 0) {
      const partial = pickContactErrors(all, ["name", "email"]);
      setFieldErrors(partial);
      if (Object.keys(partial).length) return;
      setStep(1);
      return;
    }
    const partial = pickContactErrors(all, ["service", "message"]);
    setFieldErrors(partial);
    if (Object.keys(partial).length) return;
    void (async () => {
      const fakeEvent = { preventDefault() {} } as React.FormEvent;
      await handleSubmit(fakeEvent);
    })();
  };

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", service: "", message: "", company: "" });
    setFieldErrors({});
    setSubmitError("");
    setSubmitted(false);
    setStep(0);
  };

  const paths = [
    {
      href: "/contactus/consultation",
      title: c.pathConsultationTitle,
      desc: c.pathConsultationDesc,
    },
    {
      href: "/contactus/request",
      title: c.pathRequestTitle,
      desc: c.pathRequestDesc,
    },
    {
      href: "/contactus/collaborate",
      title: c.pathCollaborateTitle,
      desc: c.pathCollaborateDesc,
    },
  ] as const;

  return (
    <>
      <motion.section
      variants={moduleReveal}
      initial="hidden"
      animate="show"
      className={`min-h-screen border-b px-4 py-12 sm:px-6 sm:py-16 lg:px-8 ${
        ai ? "ai-section border-paper/10" : "border-paper/20"
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          variants={itemReveal}
          dir={dir}
          className={
            ai
              ? `ai-eyebrow mb-4 ${face}`
              : `mb-4 text-[10px] text-paper/30 ${fa ? "font-fa" : "ascii"}`
          }
        >
          {ai ? cleanEyebrow : <Decode>{c.eyebrow}</Decode>}
        </motion.p>

        <motion.h1
          variants={itemReveal}
          dir={dir}
          className={
            ai
              ? `ai-display mb-4 max-w-3xl text-3xl font-medium tracking-tight text-paper sm:text-5xl ${face}`
              : `mb-4 text-3xl tracking-tight sm:text-5xl ${fa ? "font-fa" : "font-pixel"}`
          }
        >
          {c.title}
        </motion.h1>

        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mb-12 max-w-lg text-sm text-paper/60 sm:text-base ${
            ai ? `leading-relaxed ${face}` : fa ? "font-fa" : ""
          }`}
        >
          {c.subtitle}
        </motion.p>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div variants={itemReveal}>
            {submitted ? (
              <div className={cls.successBox()}>
                <p className={cls.successText()}>
                  {ai ? cls.cleanSuccess(c.success) : c.success}
                </p>
                <button type="button" onClick={resetForm} className={cls.secondaryBtn()}>
                  {c.sendAnother}
                </button>
              </div>
            ) : ai ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  advanceModern();
                }}
                dir={dir}
                noValidate
                className="relative"
              >
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />
                <ModernFormStepper
                  steps={
                    [
                      {
                        id: "contact",
                        title: c.stepContactTitle,
                        description: c.stepContactDesc,
                        content: (
                          <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                              <label htmlFor={ids.name} className={cls.label()}>
                                {c.labelName}
                              </label>
                              <input
                                id={ids.name}
                                type="text"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className={inputError("name")}
                                aria-invalid={Boolean(fieldErrors.name)}
                                autoComplete="name"
                              />
                              <FormFieldError message={fieldErrors.name ?? ""} />
                            </div>
                            <div>
                              <label htmlFor={ids.email} className={cls.label()}>
                                {c.labelEmail}
                              </label>
                              <input
                                id={ids.email}
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className={inputError("email")}
                                dir="ltr"
                                aria-invalid={Boolean(fieldErrors.email)}
                                autoComplete="email"
                              />
                              <FormFieldError message={fieldErrors.email ?? ""} />
                            </div>
                            <div className="sm:col-span-2">
                              <label htmlFor={ids.phone} className={cls.label()}>
                                {c.labelPhone}
                              </label>
                              <input
                                id={ids.phone}
                                type="tel"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                className={cls.input()}
                                dir="ltr"
                                autoComplete="tel"
                              />
                            </div>
                          </div>
                        ),
                      },
                      {
                        id: "details",
                        title: c.stepDetailsTitle,
                        description: c.stepDetailsDesc,
                        content: (
                          <div className="space-y-5">
                            <div>
                              <label htmlFor={ids.service} className={cls.label()}>
                                {c.labelService}
                              </label>
                              <SkinSelect
                                id={ids.service}
                                value={form.service}
                                placeholder={c.labelService}
                                ai={ai}
                                fa={fa}
                                invalid={Boolean(fieldErrors.service)}
                                className={
                                  fieldErrors.service
                                    ? "border-terr/40 focus:border-terr/50 focus:ring-terr/15"
                                    : ""
                                }
                                options={c.serviceOptions.map((opt) => ({
                                  value: opt,
                                  label: opt,
                                }))}
                                onChange={(service) => setForm({ ...form, service })}
                              />
                              <FormFieldError message={fieldErrors.service ?? ""} />
                            </div>
                            <div>
                              <label htmlFor={ids.message} className={cls.label()}>
                                {c.labelMessage}
                              </label>
                              <textarea
                                id={ids.message}
                                rows={5}
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                className={`${inputError("message")} resize-none`}
                                aria-invalid={Boolean(fieldErrors.message)}
                              />
                              <FormFieldError message={fieldErrors.message ?? ""} />
                            </div>
                          </div>
                        ),
                      },
                    ] satisfies ModernFormStep[]
                  }
                  activeStepIdx={step}
                  onStepChange={setStep}
                  onBack={() => setStep((s) => Math.max(0, s - 1))}
                  onContinue={advanceModern}
                  labels={{
                    back: d.formStepper.back,
                    continue: d.formStepper.continue,
                    submit: c.labelSubmit,
                    submitting: c.submitting,
                  }}
                  dir={dir}
                  banner={
                    submitError ? <InlineError message={submitError} dir={dir} fa={fa} /> : null
                  }
                  submitting={submitting}
                  submitDisabled={!canSubmit && step === 1}
                />
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" dir={dir} noValidate>
                {submitError && <InlineError message={submitError} dir={dir} fa={fa} />}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor={ids.name} className={cls.label()}>
                      {c.labelName}
                    </label>
                    <input
                      id={ids.name}
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputError("name")}
                      aria-invalid={Boolean(fieldErrors.name)}
                      autoComplete="name"
                    />
                    <FormFieldError message={fieldErrors.name ?? ""} />
                  </div>

                  <div>
                    <label htmlFor={ids.email} className={cls.label()}>
                      {c.labelEmail}
                    </label>
                    <input
                      id={ids.email}
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputError("email")}
                      dir="ltr"
                      aria-invalid={Boolean(fieldErrors.email)}
                      autoComplete="email"
                    />
                    <FormFieldError message={fieldErrors.email ?? ""} />
                  </div>

                  <div>
                    <label htmlFor={ids.phone} className={cls.label()}>
                      {c.labelPhone}
                    </label>
                    <input
                      id={ids.phone}
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={cls.input()}
                      dir="ltr"
                      autoComplete="tel"
                    />
                  </div>

                  <div>
                    <label htmlFor={ids.service} className={cls.label()}>
                      {c.labelService}
                    </label>
                    <SkinSelect
                      id={ids.service}
                      value={form.service}
                      placeholder={c.labelService}
                      ai={ai}
                      fa={fa}
                      invalid={Boolean(fieldErrors.service)}
                      className={
                        fieldErrors.service
                          ? "border-terr/40 focus:border-terr/50 focus:ring-terr/15"
                          : ""
                      }
                      options={c.serviceOptions.map((opt) => ({ value: opt, label: opt }))}
                      onChange={(service) => setForm({ ...form, service })}
                    />
                    <FormFieldError message={fieldErrors.service ?? ""} />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor={ids.message} className={cls.label()}>
                    {c.labelMessage}
                  </label>
                  <textarea
                    id={ids.message}
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputError("message")} resize-none`}
                    aria-invalid={Boolean(fieldErrors.message)}
                  />
                  <FormFieldError message={fieldErrors.message ?? ""} />
                </div>

                <button
                  type="submit"
                  disabled={submitting || !canSubmit}
                  className={`group ${cls.btn()}`}
                >
                  {submitting ? c.submitting : c.labelSubmit}
                  <span className="mx-1 inline-block transition-transform duration-200 group-hover:translate-x-1">
                    {fa ? "←" : "->"}
                  </span>
                </button>
              </form>
            )}
          </motion.div>

          <motion.div variants={itemReveal} className="flex flex-col gap-8">
            <div className="overflow-visible pt-1">
              <div className="flex flex-nowrap items-center gap-2 overflow-visible">
                <span className="group/tip relative z-10 inline-flex shrink-0 overflow-visible">
                  <a
                    href={`mailto:${c.directEmail}`}
                    className={iconBtnClass}
                    aria-label={c.labelEmail}
                    title={c.labelEmail}
                  >
                    {contactGlyph("email")}
                  </a>
                  <span role="tooltip" className={tipClass}>
                    {c.labelEmail}
                  </span>
                </span>

                <span className="group/tip relative z-10 inline-flex shrink-0 overflow-visible">
                  <a
                    href={toTelHref(c.directPhone)}
                    className={iconBtnClass}
                    aria-label={c.labelPhone}
                    title={c.labelPhone}
                  >
                    {contactGlyph("phone")}
                  </a>
                  <span role="tooltip" className={tipClass}>
                    {c.labelPhone}
                  </span>
                </span>

                <span className="group/tip relative z-10 inline-flex shrink-0 overflow-visible">
                  <a
                    href={CONTACT_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconBtnClass}
                    aria-label={c.whatsappLabel}
                    title={c.whatsappLabel}
                  >
                    {contactGlyph("whatsapp")}
                  </a>
                  <span role="tooltip" className={tipClass}>
                    {c.whatsappLabel}
                  </span>
                </span>

                <span className="group/tip relative z-10 inline-flex shrink-0 overflow-visible">
                  <a
                    href={CONTACT_TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconBtnClass}
                    aria-label={c.telegramLabel}
                    title={c.telegramLabel}
                  >
                    {contactGlyph("telegram")}
                  </a>
                  <span role="tooltip" className={tipClass}>
                    {c.telegramLabel}
                  </span>
                </span>

                <span className="group/tip relative z-10 inline-flex shrink-0 overflow-visible">
                  <button
                    type="button"
                    onClick={() => setMapOpen(true)}
                    className={iconBtnClass}
                    aria-label={c.mapLabel}
                    title={c.mapLabel}
                  >
                    {contactGlyph("map")}
                  </button>
                  <span role="tooltip" className={tipClass}>
                    {c.mapLabel}
                  </span>
                </span>
              </div>
            </div>

            <div
              className={
                ai
                  ? "rounded-2xl border border-paper/10 bg-paper/[0.02] p-5"
                  : ""
              }
            >
              <p
                className={
                  ai
                    ? `mb-4 text-sm text-paper/45 ${face}`
                    : `mb-3 text-[10px] uppercase tracking-widest text-paper/30 ${fa ? "font-fa" : "ascii"}`
                }
              >
                {c.pathsTitle}
              </p>
              <div className={ai ? "space-y-3" : "space-y-2"}>
                {paths.map((path) => (
                  <Link
                    key={path.href}
                    href={path.href}
                    className={
                      ai
                        ? `group flex items-start gap-3 rounded-xl border border-paper/10 bg-paper/[0.02] px-4 py-3 transition-colors hover:border-paper/25 hover:bg-paper/[0.03] ${face}`
                        : "group flex items-start gap-3 border border-paper/15 px-4 py-3 transition-colors hover:border-paper/35"
                    }
                  >
                    <span
                      className={
                        ai
                          ? "mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-paper/15 bg-paper/[0.03] text-paper/70 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-[1.02]"
                          : "mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center border border-paper/20 bg-paper/[0.03] text-paper/55"
                      }
                    >
                      {path.href.includes("request")
                        ? contactGlyph("rocket")
                        : path.href.includes("consultation")
                          ? contactGlyph("calendar")
                          : contactGlyph("users")}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`block text-sm text-paper ${
                          ai
                            ? "font-medium"
                            : fa
                              ? "font-fa"
                              : "font-mono uppercase tracking-wider text-xs"
                        }`}
                      >
                        {path.title}
                      </span>
                      <span
                        className={`mt-1 block break-words text-xs leading-relaxed text-paper/55 ${
                          ai ? "" : fa ? "font-fa" : ""
                        }`}
                      >
                        {path.desc}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      </motion.section>

      {mapOpen ? (
        <div
          className="fixed inset-0 z-[140] flex items-end justify-center p-3 sm:items-center sm:p-4"
          role="presentation"
          onClick={() => setMapOpen(false)}
        >
          <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" aria-hidden />

          <div
            role="dialog"
            aria-modal="true"
            dir={dir}
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-paper/10 bg-ink shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-paper/10 px-4 py-3">
              <h2 className={`truncate text-sm font-medium text-paper ${ai ? face : "font-fa"}`}>
                {c.mapLabel}
              </h2>
              <button
                type="button"
                onClick={() => setMapOpen(false)}
                aria-label={c.mapLabel}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-paper/20 text-paper/55 transition-colors hover:border-paper/35 hover:text-paper"
              >
                {contactGlyph("cross")}
              </button>
            </div>

            <div className="p-4 sm:p-5">
              <div className="overflow-hidden rounded-xl border border-paper/10 bg-paper/[0.02]">
                <iframe
                  title={c.mapLabel}
                  src={CONTACT_MAP_URL}
                  className="h-[360px] w-full"
                  loading="lazy"
                />
              </div>

              <p dir={dir} className={`mt-3 text-sm text-paper/55 ${ai ? face : "font-mono"}`}>
                {c.directAddress}
              </p>

              <a
                href={CONTACT_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-2 inline-flex text-sm text-term transition-colors hover:text-paper ${ai ? face : "font-mono"}`}
              >
                {c.mapLabel}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
