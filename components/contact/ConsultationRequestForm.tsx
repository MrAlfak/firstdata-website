"use client";

import { useState } from "react";
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

const EMPTY_FORM = {
  name: "",
  phone: "",
  contactMethod: "" as ContactMethodKey | "",
  email: "",
  contactTime: "" as ContactTimeKey | "",
};

export default function ConsultationRequestForm() {
  const { fa, dir, d } = useT();
  const c = d.consultationRequest;
  const err = d.errors.consultationRequest;

  const [form, setForm] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<ConsultationErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const inputClass = `w-full border border-paper/20 bg-paper/[0.03] px-4 py-3 text-xs text-paper placeholder:text-paper/25 outline-none focus:border-paper/50 transition-colors duration-200 ${fa ? "font-fa text-right" : "font-mono"}`;
  const labelClass = `mb-2 block text-[10px] uppercase tracking-widest text-paper/40 ${fa ? "font-fa" : ""}`;
  const sectionClass = `text-sm text-paper/70 ${fa ? "font-fa" : "font-mono uppercase tracking-wider"}`;
  const inputErrorClass = (field: keyof ConsultationErrors) =>
    fieldErrors[field] ? inputClass.replace("border-paper/20", "border-terr/40") : inputClass;

  const emailRequired = form.contactMethod === "email";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    const errors = validateConsultationForm(form, err);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

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

  function resetForm() {
    setForm(EMPTY_FORM);
    setFieldErrors({});
    setSubmitError("");
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div dir={dir} className="border border-term/30 bg-term/5 p-8">
        <p className={`text-sm text-term ${fa ? "font-fa" : "font-mono"}`}>{c.success}</p>
        <button
          type="button"
          onClick={resetForm}
          className={`mt-6 border border-paper/30 px-4 py-2 text-[11px] uppercase tracking-wider text-paper/70 transition-colors duration-200 hover:border-paper hover:text-paper ${fa ? "font-fa" : ""}`}
        >
          {c.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" dir={dir} noValidate>
      {submitError && <InlineError message={submitError} dir={dir} fa={fa} />}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <fieldset className="space-y-4 border border-paper/10 bg-paper/[0.015] p-5">
        <div>
          <label className={labelClass}>{c.labelName}</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputErrorClass("name")}
            placeholder={c.labelName}
            aria-invalid={Boolean(fieldErrors.name)}
          />
          <FormFieldError message={fieldErrors.name ?? ""} />
        </div>
        <div>
          <label className={labelClass}>{c.labelPhone}</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputErrorClass("phone")}
            placeholder={c.labelPhone}
            dir="ltr"
            aria-invalid={Boolean(fieldErrors.phone)}
          />
          <FormFieldError message={fieldErrors.phone ?? ""} />
        </div>
      </fieldset>

      <fieldset className="space-y-3 border border-paper/10 bg-paper/[0.015] p-5">
        <legend className={sectionClass}>{c.sectionContactMethod}</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {CONTACT_METHOD_KEYS.map((key) => (
            <label
              key={key}
              className={`flex cursor-pointer items-center gap-3 border px-3 py-2.5 text-sm transition-colors ${form.contactMethod === key ? "border-term/40 bg-term/5 text-paper" : "border-paper/15 text-paper/60 hover:border-paper/30"} ${fa ? "font-fa" : ""}`}
            >
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

      <fieldset className="space-y-3 border border-paper/10 bg-paper/[0.015] p-5">
        <legend className={sectionClass}>{c.labelEmail}</legend>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputErrorClass("email")}
          placeholder={emailRequired ? c.labelEmail : c.labelEmailOptional}
          dir="ltr"
          aria-invalid={Boolean(fieldErrors.email)}
          aria-required={emailRequired}
        />
        <FormFieldError message={fieldErrors.email ?? ""} />
      </fieldset>

      <fieldset className="space-y-3 border border-paper/10 bg-paper/[0.015] p-5">
        <legend className={sectionClass}>{c.sectionContactTime}</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {CONTACT_TIME_KEYS.map((key) => (
            <label
              key={key}
              className={`flex cursor-pointer items-center gap-3 border px-3 py-2.5 text-sm transition-colors ${form.contactTime === key ? "border-term/40 bg-term/5 text-paper" : "border-paper/15 text-paper/60 hover:border-paper/30"} ${fa ? "font-fa" : ""}`}
            >
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

      <button
        type="submit"
        disabled={submitting}
        className={`group w-full border border-paper px-5 py-3 text-xs uppercase tracking-wider transition-colors duration-200 hover:bg-paper hover:text-ink disabled:opacity-50 ${fa ? "font-fa" : ""}`}
      >
        {submitting ? c.submitting : c.labelSubmit}
        <span className="mx-1 inline-block transition-transform duration-200 group-hover:translate-x-1">
          {fa ? "←" : "->"}
        </span>
      </button>
    </form>
  );
}
