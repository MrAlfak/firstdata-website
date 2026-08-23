"use client";

import { useEffect, useState } from "react";
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
  clearLeadPrefill,
  readLeadPrefill,
} from "@/lib/contact/lead-prefill";
import {
  validateProjectRequestForm,
  type ProjectRequestErrors,
} from "@/lib/errors/validate-project-request";
import { useContactFormClasses } from "@/components/contact/useContactFormClasses";
import FileDropzone from "@/components/ui/FileDropzone";
import { ModernFormStepper, type ModernFormStep } from "@/components/ui/modern-form-stepper";

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

function pickErrors(errors: ProjectRequestErrors, keys: (keyof ProjectRequestErrors)[]) {
  const out: ProjectRequestErrors = {};
  for (const key of keys) {
    if (errors[key]) out[key] = errors[key];
  }
  return out;
}

export default function ProjectRequestForm() {
  const { fa, dir, d } = useT();
  const pr = d.projectRequest;
  const err = d.errors.projectRequest;
  const cls = useContactFormClasses();

  const [form, setForm] = useState(EMPTY_FORM);
  const [files, setFiles] = useState<File[]>([]);
  const [fieldErrors, setFieldErrors] = useState<ProjectRequestErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const draft = readLeadPrefill();
    if (!draft) return;
    setForm((prev) => ({
      ...prev,
      name: draft.name?.trim() || prev.name,
      email: draft.email?.trim() || prev.email,
      phone: draft.phone?.trim() || prev.phone,
      companyName: draft.companyName?.trim() || prev.companyName,
      projectTypes: draft.projectTypes?.length ? draft.projectTypes : prev.projectTypes,
      budget: draft.budget || prev.budget,
      timeline: draft.timeline || prev.timeline,
      description: draft.description?.trim() || prev.description,
    }));
    if (draft.description?.trim()) setStep(3);
    clearLeadPrefill();
  }, []);

  const inputClass = cls.input();
  const labelClass = cls.label();
  const sectionClass = cls.section();
  const inputErrorClass = (field: keyof ProjectRequestErrors) =>
    fieldErrors[field]
      ? cls.input("border-terr/40 focus:border-terr/50 focus:ring-terr/15")
      : cls.input();

  function toggleType(key: ProjectTypeKey) {
    setForm((prev) => ({
      ...prev,
      projectTypes: prev.projectTypes.includes(key)
        ? prev.projectTypes.filter((k) => k !== key)
        : [...prev.projectTypes, key],
    }));
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function submit() {
    setSubmitError("");
    const errors = validateProjectRequestForm(form, err);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      if (errors.name || errors.email || errors.phone) setStep(0);
      else if (errors.projectTypes) setStep(1);
      else if (errors.budget || errors.timeline) setStep(2);
      else setStep(3);
      return;
    }

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submit();
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setFiles([]);
    setFieldErrors({});
    setSubmitError("");
    setSubmitted(false);
    setStep(0);
  }

  function advanceModern() {
    const all = validateProjectRequestForm(form, err);
    if (step === 0) {
      const partial = pickErrors(all, ["name", "email", "phone"]);
      setFieldErrors(partial);
      if (Object.keys(partial).length) return;
      setStep(1);
      return;
    }
    if (step === 1) {
      const partial = pickErrors(all, ["projectTypes"]);
      setFieldErrors(partial);
      if (Object.keys(partial).length) return;
      setStep(2);
      return;
    }
    if (step === 2) {
      const partial = pickErrors(all, ["budget", "timeline"]);
      setFieldErrors(partial);
      if (Object.keys(partial).length) return;
      setStep(3);
      return;
    }
    void submit();
  }

  if (submitted) {
    return (
      <div dir={dir} className={cls.successBox()}>
        <p className={cls.successText()}>{cls.ai ? cls.cleanSuccess(pr.success) : pr.success}</p>
        <button type="button" onClick={resetForm} className={cls.secondaryBtn()}>
          {pr.sendAnother}
        </button>
      </div>
    );
  }

  const basicFields = (
    <fieldset className={cls.fieldset()}>
      {!cls.ai ? <legend className={sectionClass}>{pr.sectionBasic}</legend> : null}
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
  );

  const typeFields = (
    <fieldset className={`space-y-3 ${cls.fieldset().replace("space-y-4 ", "")}`}>
      {!cls.ai ? <legend className={sectionClass}>{pr.sectionType}</legend> : null}
      <div className="grid gap-2 sm:grid-cols-2">
        {PROJECT_TYPE_KEYS.map((key) => {
          const checked = form.projectTypes.includes(key);
          return (
            <label key={key} className={cls.chip(checked)}>
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
  );

  const planFields = (
    <>
      <fieldset className={`space-y-3 ${cls.fieldset().replace("space-y-4 ", "")}`}>
        <legend className={sectionClass}>{pr.sectionBudget}</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {BUDGET_KEYS.map((key) => (
            <label key={key} className={cls.chip(form.budget === key)}>
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
      <fieldset className={`space-y-3 ${cls.fieldset().replace("space-y-4 ", "")}`}>
        <legend className={sectionClass}>{pr.sectionTimeline}</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {TIMELINE_KEYS.map((key) => (
            <label key={key} className={cls.chip(form.timeline === key)}>
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
    </>
  );

  const briefFields = (
    <>
      <fieldset className={`space-y-3 ${cls.fieldset().replace("space-y-4 ", "")}`}>
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
      <fieldset className={`space-y-3 ${cls.fieldset().replace("space-y-4 ", "")}`}>
        <legend className={sectionClass}>{pr.sectionFiles}</legend>
        <p className={`text-xs text-paper/45 ${cls.face}`}>{pr.filesHint}</p>
        <FileDropzone
          multiple
          accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.doc,.docx,.zip"
          disabled={files.length >= PROJECT_REQUEST_MAX_FILES}
          buttonLabel={pr.labelUpload}
          hint={pr.filesHint}
          removeLabel={pr.removeFile}
          files={files.map((file, i) => ({ key: `${file.name}-${i}`, name: file.name }))}
          onFilesSelected={(picked) =>
            setFiles((prev) => [...prev, ...picked].slice(0, PROJECT_REQUEST_MAX_FILES))
          }
          onRemoveFile={removeFile}
          buttonClassName={cls.uploadBtn()}
          faceClassName={cls.face}
          panelClassName={
            cls.ai
              ? "rounded-2xl border border-paper/10 bg-paper/[0.02] p-4"
              : "border border-paper/10 bg-paper/[0.02] p-4"
          }
          listItemClassName={`flex items-center justify-between gap-2 border border-paper/10 px-3 py-2 text-xs text-paper/65 ${cls.ai ? "rounded-xl" : ""}`}
        />
      </fieldset>
    </>
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
      { id: "basic", title: pr.sectionBasic, description: pr.stepBasicDesc, content: basicFields },
      { id: "type", title: pr.sectionType, description: pr.stepTypeDesc, content: typeFields },
      { id: "plan", title: pr.stepPlanTitle, description: pr.stepPlanDesc, content: planFields },
      { id: "brief", title: pr.stepBriefTitle, description: pr.stepBriefDesc, content: briefFields },
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
            submit: pr.labelSubmit,
            submitting: pr.submitting,
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
      {basicFields}
      {typeFields}
      {planFields}
      {briefFields}
      <button type="submit" disabled={submitting} className={`group ${cls.btn()}`}>
        {submitting ? pr.submitting : pr.labelSubmit}
        <span className="mx-1 inline-block transition-transform duration-200 group-hover:translate-x-1">
          {fa ? "←" : "->"}
        </span>
      </button>
    </form>
  );
}
