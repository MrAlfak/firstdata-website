"use client";

import { useMemo, useState } from "react";
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
import { useContactFormClasses } from "@/components/contact/useContactFormClasses";
import FileDropzone from "@/components/ui/FileDropzone";
import { ModernFormStepper, type ModernFormStep } from "@/components/ui/modern-form-stepper";
import {
  AnimatedTabs,
  type AnimatedTabItem,
} from "@/components/shadcn-space/tabs/tabs-08";

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
  const cls = useContactFormClasses();

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
  const [step, setStep] = useState(0);

  const labelClass = cls.label();
  const sectionClass = cls.section();
  const hiringInputError = (field: keyof HiringErrors) =>
    hiringErrors[field]
      ? cls.input("border-terr/40 focus:border-terr/50 focus:ring-terr/15")
      : cls.input();
  const freelancerInputError = (field: keyof FreelancerErrors) =>
    freelancerErrors[field]
      ? cls.input("border-terr/40 focus:border-terr/50 focus:ring-terr/15")
      : cls.input();
  const box = () => `space-y-3 ${cls.fieldset().replace("space-y-4 ", "")}`;

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
    setStep(0);
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
    setSubmitting(false);
    setSubmitted(false);
    setStep(0);
    setBranch("hiring");
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

  function pickHiring(errors: HiringErrors, keys: (keyof HiringErrors)[]) {
    const out: HiringErrors = {};
    for (const key of keys) {
      if (errors[key]) out[key] = errors[key];
    }
    return out;
  }

  function pickFreelancer(errors: FreelancerErrors, keys: (keyof FreelancerErrors)[]) {
    const out: FreelancerErrors = {};
    for (const key of keys) {
      if (errors[key]) out[key] = errors[key];
    }
    return out;
  }

  async function runSubmit() {
    const fake = { preventDefault() {} } as React.FormEvent;
    await handleSubmit(fake);
  }

  function advanceModern() {
    if (branch === "hiring") {
      const all = validateHiringForm(hiringForm, hiringResume, err.hiring);
      if (step === 0) {
        const partial = pickHiring(all, ["name"]);
        setHiringErrors(partial);
        if (Object.keys(partial).length) return;
        setStep(1);
        return;
      }
      if (step === 1) {
        const partial = pickHiring(all, ["resume"]);
        setHiringErrors(partial);
        if (Object.keys(partial).length) return;
        setStep(2);
        return;
      }
      if (step === 2) {
        const partial = pickHiring(all, ["github", "linkedin", "portfolioUrl"]);
        setHiringErrors(partial);
        if (Object.keys(partial).length) return;
        setStep(3);
        return;
      }
      const partial = pickHiring(all, ["skills", "expectedSalary", "workMode"]);
      setHiringErrors(partial);
      if (Object.keys(partial).length) return;
      void runSubmit();
      return;
    }

    const all = validateFreelancerForm(freelancerForm, freelancerPortfolio, err.freelancer);
    if (step === 0) {
      const partial = pickFreelancer(all, ["name", "phone"]);
      setFreelancerErrors(partial);
      if (Object.keys(partial).length) return;
      setStep(1);
      return;
    }
    if (step === 1) {
      const partial = pickFreelancer(all, ["specialties"]);
      setFreelancerErrors(partial);
      if (Object.keys(partial).length) return;
      setStep(2);
      return;
    }
    const partial = pickFreelancer(all, ["portfolioFile"]);
    setFreelancerErrors(partial);
    if (Object.keys(partial).length) return;
    void runSubmit();
  }

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

  const hiringBasic = (
    <fieldset className={cls.fieldset()}>
      {!cls.ai ? <legend className={sectionClass}>{col.hiring.sectionBasic}</legend> : null}
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
  );

  const hiringResumeBlock = (
    <fieldset className={box()}>
      {!cls.ai ? <legend className={sectionClass}>{col.hiring.sectionResume}</legend> : null}
      <FileDropzone
        accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.doc,.docx,.zip"
        buttonLabel={col.hiring.labelUploadResume}
        hint={col.hiring.resumeHint}
        removeLabel={d.projectRequest.removeFile}
        files={hiringResume ? [{ key: `${hiringResume.name}-${hiringResume.size}`, name: hiringResume.name }] : []}
        onFilesSelected={(picked) => setHiringResume(picked[0] ?? null)}
        onRemoveFile={() => setHiringResume(null)}
        buttonClassName={cls.uploadBtn()}
        faceClassName={cls.face}
        panelClassName={
          cls.ai
            ? "rounded-2xl border border-paper/10 bg-paper/[0.02] p-4"
            : "border border-paper/10 bg-paper/[0.02] p-4"
        }
        listItemClassName={`flex items-center justify-between gap-2 border border-paper/10 px-3 py-2 text-xs text-paper/65 ${cls.ai ? "rounded-xl" : ""}`}
      />
      <FormFieldError message={hiringErrors.resume ?? ""} />
    </fieldset>
  );

  const hiringLinks = (
    <fieldset className={cls.fieldset()}>
      {!cls.ai ? <legend className={sectionClass}>{col.hiring.sectionLinks}</legend> : null}
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
  );

  const hiringDetails = (
    <>
      <fieldset className={cls.fieldset()}>
        {!cls.ai ? <legend className={sectionClass}>{col.hiring.sectionDetails}</legend> : null}
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
      <fieldset className={box()}>
        {!cls.ai ? <legend className={sectionClass}>{col.hiring.sectionWorkMode}</legend> : null}
        {cls.ai ? <p className={sectionClass}>{col.hiring.sectionWorkMode}</p> : null}
        <div className="grid gap-2 sm:grid-cols-2">
          {WORK_MODE_KEYS.map((key) => (
            <label key={key} className={cls.chip(hiringForm.workMode === key)}>
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
  );

  const freelancerBasic = (
    <fieldset className={cls.fieldset()}>
      {!cls.ai ? <legend className={sectionClass}>{col.freelancer.sectionBasic}</legend> : null}
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
  );

  const freelancerSpecialty = (
    <fieldset className={box()}>
      {!cls.ai ? <legend className={sectionClass}>{col.freelancer.sectionSpecialty}</legend> : null}
      <div className="grid gap-2 sm:grid-cols-2">
        {SPECIALTY_KEYS.map((key) => {
          const checked = freelancerForm.specialties.includes(key);
          return (
            <label key={key} className={cls.chip(checked)}>
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
  );

  const freelancerFiles = (
    <>
      <fieldset className={box()}>
        {!cls.ai ? <legend className={sectionClass}>{col.freelancer.sectionPortfolio}</legend> : null}
        <FileDropzone
          accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.doc,.docx,.zip"
          buttonLabel={col.freelancer.labelUploadPortfolio}
          hint={col.freelancer.portfolioHint}
          removeLabel={d.projectRequest.removeFile}
          files={
            freelancerPortfolio
              ? [{ key: `${freelancerPortfolio.name}-${freelancerPortfolio.size}`, name: freelancerPortfolio.name }]
              : []
          }
          onFilesSelected={(picked) => setFreelancerPortfolio(picked[0] ?? null)}
          onRemoveFile={() => setFreelancerPortfolio(null)}
          buttonClassName={cls.uploadBtn()}
          faceClassName={cls.face}
          panelClassName={
            cls.ai
              ? "rounded-2xl border border-paper/10 bg-paper/[0.02] p-4"
              : "border border-paper/10 bg-paper/[0.02] p-4"
          }
          listItemClassName={`flex items-center justify-between gap-2 border border-paper/10 px-3 py-2 text-xs text-paper/65 ${cls.ai ? "rounded-xl" : ""}`}
        />
        <FormFieldError message={freelancerErrors.portfolioFile ?? ""} />
      </fieldset>
      <fieldset className={box()}>
        {!cls.ai ? <legend className={sectionClass}>{col.freelancer.sectionResume}</legend> : null}
        {cls.ai ? <p className={sectionClass}>{col.freelancer.sectionResume}</p> : null}
        <FileDropzone
          accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.doc,.docx,.zip"
          buttonLabel={col.freelancer.labelUploadResume}
          hint={col.freelancer.resumeHint}
          removeLabel={d.projectRequest.removeFile}
          files={
            freelancerResume
              ? [{ key: `${freelancerResume.name}-${freelancerResume.size}`, name: freelancerResume.name }]
              : []
          }
          onFilesSelected={(picked) => setFreelancerResume(picked[0] ?? null)}
          onRemoveFile={() => setFreelancerResume(null)}
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

  const branchTabs: AnimatedTabItem[] = useMemo(
    () => [
      { value: "hiring", label: col.branches.hiring },
      { value: "freelancer", label: col.branches.freelancer },
    ],
    [col.branches.freelancer, col.branches.hiring],
  );

  const branchToggle = cls.ai ? (
    <div aria-label={col.branchToggleLabel}>
      <AnimatedTabs
        tabs={branchTabs}
        value={branch}
        onValueChange={(next) => switchBranch(next as CollaborateBranchKey)}
        showPanel={false}
        indicatorId="collaborate-branch-tabs"
        className={cls.face}
        listClassName="w-full"
      />
    </div>
  ) : (
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
            className={`px-4 py-3 text-sm transition-colors ${
              active
                ? "border border-term/40 bg-term/5 text-paper"
                : "border border-transparent text-paper/55 hover:text-paper/80"
            } ${fa ? "font-fa" : "font-mono uppercase tracking-wider"}`}
          >
            {col.branches[key]}
          </button>
        );
      })}
    </div>
  );

  if (submitted) {
    return (
      <div dir={dir} className={cls.successBox()}>
        <p className={cls.successText()}>{cls.ai ? cls.cleanSuccess(col.success) : col.success}</p>
        <button type="button" onClick={resetForm} className={cls.secondaryBtn()}>
          {col.sendAnother}
        </button>
      </div>
    );
  }

  if (cls.ai) {
    const hiringSteps: ModernFormStep[] = [
      {
        id: "hiring-basic",
        title: col.hiring.sectionBasic,
        description: col.hiring.labelName,
        content: hiringBasic,
      },
      {
        id: "hiring-resume",
        title: col.hiring.sectionResume,
        description: col.hiring.resumeHint,
        content: hiringResumeBlock,
      },
      {
        id: "hiring-links",
        title: col.hiring.sectionLinks,
        description: col.hiring.labelPortfolioUrl,
        content: hiringLinks,
      },
      {
        id: "hiring-details",
        title: col.hiring.sectionDetails,
        description: col.hiring.sectionWorkMode,
        content: hiringDetails,
      },
    ];
    const freelancerSteps: ModernFormStep[] = [
      {
        id: "freelancer-basic",
        title: col.freelancer.sectionBasic,
        description: col.freelancer.labelPhone,
        content: freelancerBasic,
      },
      {
        id: "freelancer-specialty",
        title: col.freelancer.sectionSpecialty,
        description: col.freelancer.sectionSpecialty,
        content: freelancerSpecialty,
      },
      {
        id: "freelancer-files",
        title: col.freelancer.sectionPortfolio,
        description: col.freelancer.sectionResume,
        content: freelancerFiles,
      },
    ];
    const steps = branch === "hiring" ? hiringSteps : freelancerSteps;

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          advanceModern();
        }}
        dir={dir}
        noValidate
        className="relative space-y-6"
      >
        {honeypot}
        {branchToggle}
        <ModernFormStepper
          steps={steps}
          activeStepIdx={step}
          onStepChange={setStep}
          onBack={() => setStep((s) => Math.max(0, s - 1))}
          onContinue={advanceModern}
          labels={{
            back: d.formStepper.back,
            continue: d.formStepper.continue,
            submit: col.labelSubmit,
            submitting: col.submitting,
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
      {branchToggle}
      {branch === "hiring" ? (
        <>
          {hiringBasic}
          {hiringResumeBlock}
          {hiringLinks}
          {hiringDetails}
        </>
      ) : (
        <>
          {freelancerBasic}
          {freelancerSpecialty}
          {freelancerFiles}
        </>
      )}
      <button type="submit" disabled={submitting} className={`group ${cls.btn()}`}>
        {submitting ? col.submitting : col.labelSubmit}
        <span className="mx-1 inline-block transition-transform duration-200 group-hover:translate-x-1">
          {fa ? "←" : "->"}
        </span>
      </button>
    </form>
  );
}
