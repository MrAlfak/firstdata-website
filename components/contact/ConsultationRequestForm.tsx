"use client";

import { useId, useState } from "react";
import {
  CONTACT_METHOD_KEYS,
  CONTACT_TIME_KEYS,
  type ContactMethodKey,
  type ContactTimeKey,
} from "@/config/consultation-request";
import FormFieldError from "@/components/errors/FormFieldError";
import InlineError from "@/components/errors/InlineError";
import { useT } from "@/i18n/LangProvider";
import { submitConsultationForm } from "@/lib/contact/submit-consultation";
import {
  validateConsultationForm,
  type ConsultationErrors,
} from "@/lib/errors/validate-consultation";
import { useContactFormClasses } from "@/components/contact/useContactFormClasses";
import { ModernFormStepper, type ModernFormStep } from "@/components/ui/modern-form-stepper";

const EMPTY_FORM = {
  name: "",
  phone: "",
  contactMethod: "" as ContactMethodKey | "",
  email: "",
  contactTime: "" as ContactTimeKey | "",
};

function pickErrors(errors: ConsultationErrors, keys: (keyof ConsultationErrors)[]) {
  const out: ConsultationErrors = {};
  for (const key of keys) {
    if (errors[key]) out[key] = errors[key];
  }
  return out;
}

export default function ConsultationRequestForm() {
  const { fa, dir, d } = useT();
  const c = d.consultationRequest;
  const err = d.errors.consultationRequest;
  const cls = useContactFormClasses();
  const ids = { name: useId(), phone: useId(), email: useId() };

  const [form, setForm] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<ConsultationErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(0);

  const inputError = (field: keyof ConsultationErrors) =>
    fieldErrors[field]
      ? cls.input("border-terr/40 focus:border-terr/50 focus:ring-terr/15")
      : cls.input();

  const emailRequired = form.contactMethod === "email";

  async function submit() {
    setSubmitError("");
    const errors = validateConsultationForm(form, err);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      if (errors.name || errors.phone) setStep(0);
      else if (errors.contactMethod || errors.email) setStep(1);
      else setStep(2);
      return;
    }

    setSubmitting(true);
    const result = await submitConsultationForm({
      name: form.name,
      phone: form.phone,
      contactMethod: form.contactMethod,
      email: form.email,
      contactTime: form.contactTime,
      lang: fa ? "fa" : "en",
    });
    setSubmitting(false);

    if (!result.ok) {
      setSubmitError(
        result.message === "RATE_LIMIT" ? d.errors.auth.RATE_LIMIT : err.networkError,
      );
      return;
    }

    setSubmitted(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submit();
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setFieldErrors({});
    setSubmitError("");
    setSubmitted(false);
    setStep(0);
  }

  function advanceModern() {
    const all = validateConsultationForm(form, err);
    if (step === 0) {
      const partial = pickErrors(all, ["name", "phone"]);
      setFieldErrors(partial);
      if (Object.keys(partial).length) return;
      setStep(1);
      return;
    }
    if (step === 1) {
      const partial = pickErrors(all, ["contactMethod", "email"]);
      setFieldErrors(partial);
      if (Object.keys(partial).length) return;
      setStep(2);
      return;
    }
    void submit();
  }

  if (submitted) {
    return (
      <div dir={dir} className={cls.successBox()}>
        <p className={cls.successText()}>{cls.ai ? cls.cleanSuccess(c.success) : c.success}</p>
        <button type="button" onClick={resetForm} className={cls.secondaryBtn()}>
          {c.sendAnother}
        </button>
      </div>
    );
  }

  const identityFields = (
    <fieldset className={cls.fieldset()}>
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
        />
        <FormFieldError message={fieldErrors.name ?? ""} />
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
          className={inputError("phone")}
          dir="ltr"
          aria-invalid={Boolean(fieldErrors.phone)}
        />
        <FormFieldError message={fieldErrors.phone ?? ""} />
      </div>
    </fieldset>
  );

  const methodFields = (
    <>
      <fieldset className={`space-y-3 ${cls.fieldset().replace("space-y-4 ", "")}`}>
        <legend className={cls.section()}>{c.sectionContactMethod}</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {CONTACT_METHOD_KEYS.map((key) => (
            <label key={key} className={cls.chip(form.contactMethod === key)}>
              <input
                type="radio"
                name="contactMethod"
                className="accent-term"
                checked={form.contactMethod === key}
                onChange={() => setForm({ ...form, contactMethod: key })}
              />
              {c.contactMethods[key]}
            </label>
          ))}
        </div>
        <FormFieldError message={fieldErrors.contactMethod ?? ""} />
      </fieldset>
      <fieldset className={`space-y-3 ${cls.fieldset().replace("space-y-4 ", "")}`}>
        <legend className={cls.section()}>{c.labelEmail}</legend>
        <input
          id={ids.email}
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputError("email")}
          placeholder={emailRequired ? c.labelEmail : c.labelEmailOptional}
          dir="ltr"
          aria-invalid={Boolean(fieldErrors.email)}
          aria-required={emailRequired}
        />
        <FormFieldError message={fieldErrors.email ?? ""} />
      </fieldset>
    </>
  );

  const timeFields = (
    <fieldset className={`space-y-3 ${cls.fieldset().replace("space-y-4 ", "")}`}>
      <legend className={cls.section()}>{c.sectionContactTime}</legend>
      <div className="grid gap-2 sm:grid-cols-3">
        {CONTACT_TIME_KEYS.map((key) => (
          <label key={key} className={cls.chip(form.contactTime === key)}>
            <input
              type="radio"
              name="contactTime"
              className="accent-term"
              checked={form.contactTime === key}
              onChange={() => setForm({ ...form, contactTime: key })}
            />
            {c.contactTimes[key]}
          </label>
        ))}
      </div>
      <FormFieldError message={fieldErrors.contactTime ?? ""} />
    </fieldset>
  );

  const honeypot = (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute left-[-9999px] h-0 w-0 opacity-0"
    />
  );

  if (cls.ai) {
    const steps: ModernFormStep[] = [
      {
        id: "identity",
        title: c.stepIdentityTitle,
        description: c.stepIdentityDesc,
        content: identityFields,
      },
      {
        id: "method",
        title: c.sectionContactMethod,
        description: c.stepMethodDesc,
        content: methodFields,
      },
      {
        id: "time",
        title: c.sectionContactTime,
        description: c.stepTimeDesc,
        content: timeFields,
      },
    ];

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          advanceModern();
        }}
        dir={dir}
        noValidate
        className="relative"
      >
        {honeypot}
        <ModernFormStepper
          steps={steps}
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
          banner={submitError ? <InlineError message={submitError} dir={dir} fa={fa} /> : null}
          submitting={submitting}
        />
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" dir={dir} noValidate>
      {submitError && <InlineError message={submitError} dir={dir} fa={fa} />}
      {honeypot}
      {identityFields}
      {methodFields}
      {timeFields}
      <button type="submit" disabled={submitting} className={`group ${cls.btn()}`}>
        {submitting ? c.submitting : c.labelSubmit}
        <span className="mx-1 inline-block transition-transform duration-200 group-hover:translate-x-1">
          {fa ? "←" : "->"}
        </span>
      </button>
    </form>
  );
}
