"use client";

import { useRef, useState } from "react";
import {
  BUDGET_KEYS,
  PROJECT_REQUEST_MAX_FILES,
  PROJECT_TYPE_KEYS,
  TIMELINE_KEYS,
  type BudgetKey,
  type ProjectTypeKey,
  type TimelineKey,
} from "@/config/project-request";
import FormFieldError from "@/components/errors/FormFieldError";
import InlineError from "@/components/errors/InlineError";
import { useT } from "@/i18n/LangProvider";
import { submitProjectRequestForm } from "@/lib/contact/submit-project-request";
import {
  validateProjectRequestForm,
  type ProjectRequestErrors,
} from "@/lib/errors/validate-project-request";

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  companyName: "",
  projectTypes: [] as ProjectTypeKey[],
  budget: "" as BudgetKey | "",
  timeline: "" as TimelineKey | "",
  description: "",
};

export default function ProjectRequestForm() {
  const { fa, dir, d } = useT();
  const pr = d.projectRequest;
  const err = d.errors.projectRequest;

  const [form, setForm] = useState(EMPTY_FORM);
  const [files, setFiles] = useState<File[]>([]);
  const [fieldErrors, setFieldErrors] = useState<ProjectRequestErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputClass = `w-full border border-paper/20 bg-paper/[0.03] px-4 py-3 text-xs text-paper placeholder:text-paper/25 outline-none focus:border-paper/50 transition-colors duration-200 ${fa ? "font-fa text-right" : "font-mono"}`;
  const labelClass = `mb-2 block text-[10px] uppercase tracking-widest text-paper/40 ${fa ? "font-fa" : ""}`;
  const sectionClass = `text-sm text-paper/70 ${fa ? "font-fa" : "font-mono uppercase tracking-wider"}`;
  const inputErrorClass = (field: keyof ProjectRequestErrors) =>
    fieldErrors[field] ? inputClass.replace("border-paper/20", "border-terr/40") : inputClass;

  function toggleType(key: ProjectTypeKey) {
    setForm((prev) => ({
      ...prev,
      projectTypes: prev.projectTypes.includes(key)
        ? prev.projectTypes.filter((k) => k !== key)
        : [...prev.projectTypes, key],
    }));
  }

  function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    setFiles((prev) => [...prev, ...picked].slice(0, PROJECT_REQUEST_MAX_FILES));
    e.target.value = "";
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    const errors = validateProjectRequestForm(form, err);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("phone", form.phone);
    fd.append("companyName", form.companyName);
    fd.append("projectTypes", JSON.stringify(form.projectTypes));
    fd.append("budget", form.budget);
    fd.append("timeline", form.timeline);
    fd.append("description", form.description);
    fd.append("lang", fa ? "fa" : "en");
    for (const file of files) fd.append("files", file);

    const result = await submitProjectRequestForm(fd);
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
    setFiles([]);
    setFieldErrors({});
    setSubmitError("");
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div dir={dir} className="border border-term/30 bg-term/5 p-8">
        <p className={`text-sm text-term ${fa ? "font-fa" : "font-mono"}`}>{pr.success}</p>
        <button
          type="button"
          onClick={resetForm}
          className={`mt-6 border border-paper/30 px-4 py-2 text-[11px] uppercase tracking-wider text-paper/70 transition-colors duration-200 hover:border-paper hover:text-paper ${fa ? "font-fa" : ""}`}
        >
          {pr.sendAnother}
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
        <legend className={sectionClass}>{pr.sectionBasic}</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass}>{pr.labelName}</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputErrorClass("name")}
              placeholder={pr.labelName}
              aria-invalid={Boolean(fieldErrors.name)}
            />
            <FormFieldError message={fieldErrors.name ?? ""} />
          </div>
          <div>
            <label className={labelClass}>{pr.labelPhone}</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputErrorClass("phone")}
              placeholder={pr.labelPhone}
              dir="ltr"
              aria-invalid={Boolean(fieldErrors.phone)}
            />
            <FormFieldError message={fieldErrors.phone ?? ""} />
          </div>
          <div>
            <label className={labelClass}>{pr.labelEmail}</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputErrorClass("email")}
              placeholder={pr.labelEmail}
              dir="ltr"
              aria-invalid={Boolean(fieldErrors.email)}
            />
            <FormFieldError message={fieldErrors.email ?? ""} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>{pr.labelCompany}</label>
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              className={inputClass}
              placeholder={pr.labelCompanyOptional}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-3 border border-paper/10 bg-paper/[0.015] p-5">
        <legend className={sectionClass}>{pr.sectionType}</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {PROJECT_TYPE_KEYS.map((key) => {
            const checked = form.projectTypes.includes(key);
            return (
              <label
                key={key}
                className={`flex cursor-pointer items-center gap-3 border px-3 py-2.5 text-sm transition-colors ${checked ? "border-term/40 bg-term/5 text-paper" : "border-paper/15 text-paper/60 hover:border-paper/30"} ${fa ? "font-fa" : ""}`}
              >
                <input
                  type="checkbox"
                  className="accent-term"
                  checked={checked}
                  onChange={() => toggleType(key)}
                />
                {pr.projectTypes[key]}
              </label>
            );
          })}
        </div>
        <FormFieldError message={fieldErrors.projectTypes ?? ""} />
      </fieldset>

      <fieldset className="space-y-3 border border-paper/10 bg-paper/[0.015] p-5">
        <legend className={sectionClass}>{pr.sectionBudget}</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {BUDGET_KEYS.map((key) => (
            <label
              key={key}
              className={`flex cursor-pointer items-center gap-3 border px-3 py-2.5 text-sm transition-colors ${form.budget === key ? "border-term/40 bg-term/5 text-paper" : "border-paper/15 text-paper/60 hover:border-paper/30"} ${fa ? "font-fa" : ""}`}
            >
              <input
                type="radio"
                name="budget"
                className="accent-term"
                checked={form.budget === key}
                onChange={() => setForm({ ...form, budget: key })}
              />
              {pr.budgets[key]}
            </label>
          ))}
        </div>
        <FormFieldError message={fieldErrors.budget ?? ""} />
      </fieldset>

      <fieldset className="space-y-3 border border-paper/10 bg-paper/[0.015] p-5">
        <legend className={sectionClass}>{pr.sectionTimeline}</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {TIMELINE_KEYS.map((key) => (
            <label
              key={key}
              className={`flex cursor-pointer items-center gap-3 border px-3 py-2.5 text-sm transition-colors ${form.timeline === key ? "border-term/40 bg-term/5 text-paper" : "border-paper/15 text-paper/60 hover:border-paper/30"} ${fa ? "font-fa" : ""}`}
            >
              <input
                type="radio"
                name="timeline"
                className="accent-term"
                checked={form.timeline === key}
                onChange={() => setForm({ ...form, timeline: key })}
              />
              {pr.timelines[key]}
            </label>
          ))}
        </div>
        <FormFieldError message={fieldErrors.timeline ?? ""} />
      </fieldset>

      <fieldset className="space-y-3 border border-paper/10 bg-paper/[0.015] p-5">
        <legend className={sectionClass}>{pr.sectionDescription}</legend>
        <textarea
          rows={6}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className={`${inputErrorClass("description")} resize-none`}
          placeholder={pr.labelDescription}
          aria-invalid={Boolean(fieldErrors.description)}
        />
        <FormFieldError message={fieldErrors.description ?? ""} />
      </fieldset>

      <fieldset className="space-y-3 border border-paper/10 bg-paper/[0.015] p-5">
        <legend className={sectionClass}>{pr.sectionFiles}</legend>
        <p className={`text-xs text-paper/45 ${fa ? "font-fa" : ""}`}>{pr.filesHint}</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.doc,.docx,.zip"
          className="hidden"
          onChange={onFilesChange}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={files.length >= PROJECT_REQUEST_MAX_FILES}
          className={`border border-paper/30 px-4 py-2 text-xs text-paper/75 transition-colors hover:border-paper disabled:opacity-40 ${fa ? "font-fa" : ""}`}
        >
          {pr.labelUpload}
        </button>
        {files.length > 0 && (
          <ul className="space-y-2">
            {files.map((file, i) => (
              <li
                key={`${file.name}-${i}`}
                className="flex items-center justify-between gap-2 border border-paper/10 px-3 py-2 text-xs text-paper/65"
              >
                <span className="truncate" dir="ltr">
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="shrink-0 text-paper/40 hover:text-terr"
                  aria-label={pr.removeFile}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </fieldset>

      <button
        type="submit"
        disabled={submitting}
        className={`group w-full border border-paper px-5 py-3 text-xs uppercase tracking-wider transition-colors duration-200 hover:bg-paper hover:text-ink disabled:opacity-50 ${fa ? "font-fa" : ""}`}
      >
        {submitting ? pr.submitting : pr.labelSubmit}
        <span className="mx-1 inline-block transition-transform duration-200 group-hover:translate-x-1">
          {fa ? "←" : "->"}
        </span>
      </button>
    </form>
  );
}
