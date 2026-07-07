"use client";

import { useRef, useState } from "react";
import {
  SPECIALTY_KEYS,
  WORK_MODE_KEYS,
  type CollaborateBranchKey,
  type SpecialtyKey,
} from "@/config/collaborate-request";
import FormFieldError from "@/components/errors/FormFieldError";
import InlineError from "@/components/errors/InlineError";
import { useT } from "@/i18n/LangProvider";
import { submitCollaborateForm } from "@/lib/contact/submit-collaborate";
import {
  validateFreelancerForm,
  validateHiringForm,
  type FreelancerErrors,
  type HiringErrors,
} from "@/lib/errors/validate-collaborate";

const EMPTY_HIRING = {
  name: "",
  github: "",
  linkedin: "",
  portfolioUrl: "",
  skills: "",
  expectedSalary: "",
  workMode: "" as "" | import("@/config/collaborate-request").WorkModeKey,
};

const EMPTY_FREELANCER = {
  name: "",
  phone: "",
  specialties: [] as SpecialtyKey[],
};

export default function CollaborateForm() {
  const { fa, dir, d } = useT();
  const col = d.collaborateRequest;
  const err = d.errors.collaborateRequest;

  const [branch, setBranch] = useState<CollaborateBranchKey>("hiring");
  const [hiringForm, setHiringForm] = useState(EMPTY_HIRING);
  const [freelancerForm, setFreelancerForm] = useState(EMPTY_FREELANCER);
  const [hiringResume, setHiringResume] = useState<File | null>(null);
  const [freelancerPortfolio, setFreelancerPortfolio] = useState<File | null>(null);
  const [freelancerResume, setFreelancerResume] = useState<File | null>(null);
  const [hiringErrors, setHiringErrors] = useState<HiringErrors>({});
  const [freelancerErrors, setFreelancerErrors] = useState<FreelancerErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const hiringResumeRef = useRef<HTMLInputElement>(null);
  const portfolioRef = useRef<HTMLInputElement>(null);
  const freelancerResumeRef = useRef<HTMLInputElement>(null);

  const inputClass = `w-full border border-paper/20 bg-paper/[0.03] px-4 py-3 text-xs text-paper placeholder:text-paper/25 outline-none focus:border-paper/50 transition-colors duration-200 ${fa ? "font-fa text-right" : "font-mono"}`;
  const labelClass = `mb-2 block text-[10px] uppercase tracking-widest text-paper/40 ${fa ? "font-fa" : ""}`;
  const sectionClass = `text-sm text-paper/70 ${fa ? "font-fa" : "font-mono uppercase tracking-wider"}`;
  const hiringInputError = (field: keyof HiringErrors) =>
    hiringErrors[field] ? inputClass.replace("border-paper/20", "border-terr/40") : inputClass;
  const freelancerInputError = (field: keyof FreelancerErrors) =>
    freelancerErrors[field] ? inputClass.replace("border-paper/20", "border-terr/40") : inputClass;

  function toggleSpecialty(key: SpecialtyKey) {
    setFreelancerForm((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(key)
        ? prev.specialties.filter((k) => k !== key)
        : [...prev.specialties, key],
    }));
  }

  function switchBranch(next: CollaborateBranchKey) {
    setBranch(next);
    setHiringErrors({});
    setFreelancerErrors({});
    setSubmitError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");

    const fd = new FormData();
    fd.append("branch", branch);
    fd.append("lang", fa ? "fa" : "en");

    if (branch === "hiring") {
      const errors = validateHiringForm(hiringForm, hiringResume, err.hiring);
      setHiringErrors(errors);
      if (Object.keys(errors).length > 0) return;

      fd.append("name", hiringForm.name);
      fd.append("github", hiringForm.github);
      fd.append("linkedin", hiringForm.linkedin);
      fd.append("portfolioUrl", hiringForm.portfolioUrl);
      fd.append("skills", hiringForm.skills);
      fd.append("expectedSalary", hiringForm.expectedSalary);
      fd.append("workMode", hiringForm.workMode);
      if (hiringResume) fd.append("resume", hiringResume);
    } else {
      const errors = validateFreelancerForm(freelancerForm, freelancerPortfolio, err.freelancer);
      setFreelancerErrors(errors);
      if (Object.keys(errors).length > 0) return;

      fd.append("name", freelancerForm.name);
      fd.append("phone", freelancerForm.phone);
      fd.append("specialties", JSON.stringify(freelancerForm.specialties));
      if (freelancerPortfolio) fd.append("portfolioFile", freelancerPortfolio);
      if (freelancerResume) fd.append("resume", freelancerResume);
    }

    setSubmitting(true);
    const result = await submitCollaborateForm(fd);
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
    setHiringForm(EMPTY_HIRING);
    setFreelancerForm(EMPTY_FREELANCER);
    setHiringResume(null);
    setFreelancerPortfolio(null);
    setFreelancerResume(null);
    setHiringErrors({});
    setFreelancerErrors({});
    setSubmitError("");
    setSubmitted(false);
    setBranch("hiring");
  }

  if (submitted) {
    return (
      <div dir={dir} className="border border-term/30 bg-term/5 p-8">
        <p className={`text-sm text-term ${fa ? "font-fa" : "font-mono"}`}>{col.success}</p>
        <button
          type="button"
          onClick={resetForm}
          className={`mt-6 border border-paper/30 px-4 py-2 text-[11px] uppercase tracking-wider text-paper/70 transition-colors duration-200 hover:border-paper hover:text-paper ${fa ? "font-fa" : ""}`}
        >
          {col.sendAnother}
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

      <div
        role="tablist"
        aria-label={col.branchToggleLabel}
        className="grid grid-cols-2 gap-2 border border-paper/10 bg-paper/[0.015] p-2"
      >
        {(["hiring", "freelancer"] as const).map((key) => {
          const active = branch === key;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => switchBranch(key)}
              className={`px-4 py-3 text-sm transition-colors ${active ? "border border-term/40 bg-term/5 text-paper" : "border border-transparent text-paper/55 hover:text-paper/80"} ${fa ? "font-fa" : "font-mono uppercase tracking-wider"}`}
            >
              {col.branches[key]}
            </button>
          );
        })}
      </div>

      {branch === "hiring" ? (
        <>
          <fieldset className="space-y-4 border border-paper/10 bg-paper/[0.015] p-5">
            <legend className={sectionClass}>{col.hiring.sectionBasic}</legend>
            <div>
              <label className={labelClass}>{col.hiring.labelName}</label>
              <input
                type="text"
                value={hiringForm.name}
                onChange={(e) => setHiringForm({ ...hiringForm, name: e.target.value })}
                className={hiringInputError("name")}
                placeholder={col.hiring.labelName}
                aria-invalid={Boolean(hiringErrors.name)}
              />
              <FormFieldError message={hiringErrors.name ?? ""} />
            </div>
          </fieldset>

          <fieldset className="space-y-3 border border-paper/10 bg-paper/[0.015] p-5">
            <legend className={sectionClass}>{col.hiring.sectionResume}</legend>
            <p className={`text-xs text-paper/45 ${fa ? "font-fa" : ""}`}>{col.hiring.resumeHint}</p>
            <input
              ref={hiringResumeRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.doc,.docx,.zip"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setHiringResume(file);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => hiringResumeRef.current?.click()}
              className={`border border-paper/30 px-4 py-2 text-xs text-paper/75 transition-colors hover:border-paper ${fa ? "font-fa" : ""}`}
            >
              {col.hiring.labelUploadResume}
            </button>
            {hiringResume && (
              <p className="text-xs text-paper/65" dir="ltr">
                {hiringResume.name}
              </p>
            )}
            <FormFieldError message={hiringErrors.resume ?? ""} />
          </fieldset>

          <fieldset className="space-y-4 border border-paper/10 bg-paper/[0.015] p-5">
            <legend className={sectionClass}>{col.hiring.sectionLinks}</legend>
            <div>
              <label className={labelClass}>{col.hiring.labelGithub}</label>
              <input
                type="url"
                value={hiringForm.github}
                onChange={(e) => setHiringForm({ ...hiringForm, github: e.target.value })}
                className={hiringInputError("github")}
                placeholder="https://github.com/..."
                dir="ltr"
                aria-invalid={Boolean(hiringErrors.github)}
              />
              <FormFieldError message={hiringErrors.github ?? ""} />
            </div>
            <div>
              <label className={labelClass}>{col.hiring.labelLinkedin}</label>
              <input
                type="url"
                value={hiringForm.linkedin}
                onChange={(e) => setHiringForm({ ...hiringForm, linkedin: e.target.value })}
                className={hiringInputError("linkedin")}
                placeholder="https://linkedin.com/in/..."
                dir="ltr"
                aria-invalid={Boolean(hiringErrors.linkedin)}
              />
              <FormFieldError message={hiringErrors.linkedin ?? ""} />
            </div>
            <div>
              <label className={labelClass}>{col.hiring.labelPortfolioUrl}</label>
              <input
                type="url"
                value={hiringForm.portfolioUrl}
                onChange={(e) => setHiringForm({ ...hiringForm, portfolioUrl: e.target.value })}
                className={hiringInputError("portfolioUrl")}
                placeholder="https://..."
                dir="ltr"
                aria-invalid={Boolean(hiringErrors.portfolioUrl)}
              />
              <FormFieldError message={hiringErrors.portfolioUrl ?? ""} />
            </div>
          </fieldset>

          <fieldset className="space-y-4 border border-paper/10 bg-paper/[0.015] p-5">
            <legend className={sectionClass}>{col.hiring.sectionDetails}</legend>
            <div>
              <label className={labelClass}>{col.hiring.labelSkills}</label>
              <textarea
                rows={4}
                value={hiringForm.skills}
                onChange={(e) => setHiringForm({ ...hiringForm, skills: e.target.value })}
                className={`${hiringInputError("skills")} resize-none`}
                placeholder={col.hiring.labelSkills}
                aria-invalid={Boolean(hiringErrors.skills)}
              />
              <FormFieldError message={hiringErrors.skills ?? ""} />
            </div>
            <div>
              <label className={labelClass}>{col.hiring.labelSalary}</label>
              <input
                type="text"
                value={hiringForm.expectedSalary}
                onChange={(e) => setHiringForm({ ...hiringForm, expectedSalary: e.target.value })}
                className={hiringInputError("expectedSalary")}
                placeholder={col.hiring.labelSalary}
                aria-invalid={Boolean(hiringErrors.expectedSalary)}
              />
              <FormFieldError message={hiringErrors.expectedSalary ?? ""} />
            </div>
          </fieldset>

          <fieldset className="space-y-3 border border-paper/10 bg-paper/[0.015] p-5">
            <legend className={sectionClass}>{col.hiring.sectionWorkMode}</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {WORK_MODE_KEYS.map((key) => (
                <label
                  key={key}
                  className={`flex cursor-pointer items-center gap-3 border px-3 py-2.5 text-sm transition-colors ${hiringForm.workMode === key ? "border-term/40 bg-term/5 text-paper" : "border-paper/15 text-paper/60 hover:border-paper/30"} ${fa ? "font-fa" : ""}`}
                >
                  <input
                    type="radio"
                    name="workMode"
                    className="accent-term"
                    checked={hiringForm.workMode === key}
                    onChange={() => setHiringForm({ ...hiringForm, workMode: key })}
                  />
                  {col.hiring.workModes[key]}
                </label>
              ))}
            </div>
            <FormFieldError message={hiringErrors.workMode ?? ""} />
          </fieldset>
        </>
      ) : (
        <>
          <fieldset className="space-y-4 border border-paper/10 bg-paper/[0.015] p-5">
            <legend className={sectionClass}>{col.freelancer.sectionBasic}</legend>
            <div>
              <label className={labelClass}>{col.freelancer.labelName}</label>
              <input
                type="text"
                value={freelancerForm.name}
                onChange={(e) => setFreelancerForm({ ...freelancerForm, name: e.target.value })}
                className={freelancerInputError("name")}
                placeholder={col.freelancer.labelName}
                aria-invalid={Boolean(freelancerErrors.name)}
              />
              <FormFieldError message={freelancerErrors.name ?? ""} />
            </div>
            <div>
              <label className={labelClass}>{col.freelancer.labelPhone}</label>
              <input
                type="tel"
                value={freelancerForm.phone}
                onChange={(e) => setFreelancerForm({ ...freelancerForm, phone: e.target.value })}
                className={freelancerInputError("phone")}
                placeholder={col.freelancer.labelPhone}
                dir="ltr"
                aria-invalid={Boolean(freelancerErrors.phone)}
              />
              <FormFieldError message={freelancerErrors.phone ?? ""} />
            </div>
          </fieldset>

          <fieldset className="space-y-3 border border-paper/10 bg-paper/[0.015] p-5">
            <legend className={sectionClass}>{col.freelancer.sectionSpecialty}</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {SPECIALTY_KEYS.map((key) => {
                const checked = freelancerForm.specialties.includes(key);
                return (
                  <label
                    key={key}
                    className={`flex cursor-pointer items-center gap-3 border px-3 py-2.5 text-sm transition-colors ${checked ? "border-term/40 bg-term/5 text-paper" : "border-paper/15 text-paper/60 hover:border-paper/30"} ${fa ? "font-fa" : ""}`}
                  >
                    <input
                      type="checkbox"
                      className="accent-term"
                      checked={checked}
                      onChange={() => toggleSpecialty(key)}
                    />
                    {col.freelancer.specialties[key]}
                  </label>
                );
              })}
            </div>
            <FormFieldError message={freelancerErrors.specialties ?? ""} />
          </fieldset>

          <fieldset className="space-y-3 border border-paper/10 bg-paper/[0.015] p-5">
            <legend className={sectionClass}>{col.freelancer.sectionPortfolio}</legend>
            <p className={`text-xs text-paper/45 ${fa ? "font-fa" : ""}`}>{col.freelancer.portfolioHint}</p>
            <input
              ref={portfolioRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.doc,.docx,.zip"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setFreelancerPortfolio(file);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => portfolioRef.current?.click()}
              className={`border border-paper/30 px-4 py-2 text-xs text-paper/75 transition-colors hover:border-paper ${fa ? "font-fa" : ""}`}
            >
              {col.freelancer.labelUploadPortfolio}
            </button>
            {freelancerPortfolio && (
              <p className="text-xs text-paper/65" dir="ltr">
                {freelancerPortfolio.name}
              </p>
            )}
            <FormFieldError message={freelancerErrors.portfolioFile ?? ""} />
          </fieldset>

          <fieldset className="space-y-3 border border-paper/10 bg-paper/[0.015] p-5">
            <legend className={sectionClass}>{col.freelancer.sectionResume}</legend>
            <p className={`text-xs text-paper/45 ${fa ? "font-fa" : ""}`}>{col.freelancer.resumeHint}</p>
            <input
              ref={freelancerResumeRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.doc,.docx,.zip"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setFreelancerResume(file);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => freelancerResumeRef.current?.click()}
              className={`border border-paper/30 px-4 py-2 text-xs text-paper/75 transition-colors hover:border-paper ${fa ? "font-fa" : ""}`}
            >
              {col.freelancer.labelUploadResume}
            </button>
            {freelancerResume && (
              <p className="text-xs text-paper/65" dir="ltr">
                {freelancerResume.name}
              </p>
            )}
          </fieldset>
        </>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={`group w-full border border-paper px-5 py-3 text-xs uppercase tracking-wider transition-colors duration-200 hover:bg-paper hover:text-ink disabled:opacity-50 ${fa ? "font-fa" : ""}`}
      >
        {submitting ? col.submitting : col.labelSubmit}
        <span className="mx-1 inline-block transition-transform duration-200 group-hover:translate-x-1">
          {fa ? "←" : "->"}
        </span>
      </button>
    </form>
  );
}
