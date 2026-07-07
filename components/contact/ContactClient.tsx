"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import { Decode } from "@/components/Decode";
import FormFieldError from "@/components/errors/FormFieldError";
import InlineError from "@/components/errors/InlineError";
import { useT } from "@/i18n/LangProvider";
import { submitContactForm } from "@/lib/contact/submit-client";
import { validateContactForm, type ContactErrors } from "@/lib/errors/validate-contact";

export default function ContactClient() {
  const { fa, dir, d } = useT();
  const c = d.contact;

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ContactErrors>({});
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", message: "", company: "", });

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
        result.message === "RATE_LIMIT"
          ? d.errors.auth.RATE_LIMIT
          : d.errors.contact.networkError, );
      return;
    }

    setSubmitted(true);
  };

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", service: "", message: "", company: "" });
    setFieldErrors({});
    setSubmitError("");
    setSubmitted(false);
  };

  const inputClass = `w-full border border-paper/20 bg-paper/[0.03] px-4 py-3 text-xs text-paper placeholder:text-paper/25 outline-none focus:border-paper/50 transition-colors duration-200 ${fa ? "font-fa text-right" : "font-mono"}`;
  const labelClass = `block text-[10px] uppercase tracking-widest text-paper/40 mb-2 ${fa ? "font-fa" : ""}`;
  const inputErrorClass = (field: keyof ContactErrors) =>
    fieldErrors[field] ? inputClass.replace("border-paper/20", "border-terr/40") : inputClass;

  return (
    <motion.section
      variants={moduleReveal}
      initial="hidden"
      animate="show"
      className="min-h-screen border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mb-4 text-[10px] text-paper/30 ${fa ? "font-fa" : "ascii"}`}
        >
          <Decode>{c.eyebrow}</Decode>
        </motion.p>

        <motion.h1
          variants={itemReveal}
          dir={dir}
          className={`mb-4 text-3xl tracking-tight sm:text-5xl ${fa ? "font-fa" : "font-pixel"}`}
        >
          {c.title}
        </motion.h1>

        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mb-12 max-w-lg text-sm text-paper/60 ${fa ? "font-fa" : ""}`}
        >
          {c.subtitle}
        </motion.p>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div variants={itemReveal}>
            {submitted ? (
              <div className="border border-term/30 bg-term/5 p-8">
                <p className={`text-sm text-term ${fa ? "font-fa" : "font-mono"}`}>{c.success}</p>
                <button
                  onClick={resetForm}
                  className={`mt-6 border border-paper/30 px-4 py-2 text-[11px] uppercase tracking-wider text-paper/70 transition-colors duration-200 hover:border-paper hover:text-paper ${fa ? "font-fa" : ""}`}
                >
                  {fa ? "ارسال پیام دیگر" : "send another message"}
                </button>
              </div>
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
                  <label className={labelClass}>{c.labelEmail}</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputErrorClass("email")}
                    placeholder={c.labelEmail}
                    dir="ltr"
                    aria-invalid={Boolean(fieldErrors.email)}
                  />
                  <FormFieldError message={fieldErrors.email ?? ""} />
                </div>
                <div>
                  <label className={labelClass}>{c.labelPhone}</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass}
                    placeholder={c.labelPhone}
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className={labelClass}>{c.labelService}</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="" disabled>
                      {c.labelService}
                    </option>
                    {c.serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>{c.labelMessage}</label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputErrorClass("message")} resize-none`}
                    placeholder={c.labelMessage}
                    aria-invalid={Boolean(fieldErrors.message)}
                  />
                  <FormFieldError message={fieldErrors.message ?? ""} />
                </div>
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
            )}
          </motion.div>

          <motion.div variants={itemReveal} className="flex flex-col gap-8">
            <div>
              <p className={`text-[10px] uppercase tracking-widest text-paper/30 mb-4 ${fa ? "font-fa" : "ascii"}`}>
                {c.orDirect}
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:info@firstdata.ir"
                  className="flex items-center gap-3 text-sm text-paper/70 hover:text-paper transition-colors duration-200"
                >
                  <span className="font-mono text-paper/30">@</span>
                  <span className="font-mono">info@firstdata.ir</span>
                </a>
                <div className="flex items-center gap-3 text-sm text-paper/70">
                  <span className="font-mono text-paper/30">#</span>
                  <span className="font-mono" dir="ltr">
                    {c.directPhone}
                  </span>
                </div>
              </div>
            </div>
            <div className="border border-paper/10 bg-paper/[0.02] p-5">
              <pre className="ascii text-[10px] text-paper/40 leading-relaxed whitespace-pre-wrap">
                {fa
                  ? `> وضعیت: آنلاین\n> پاسخ در: ۱ روز کاری\n> زبان‌ها: فارسی, English\n> تخصص: وب, موبایل, دسکتاپ, سئو`
                  : `> status: online\n> reply_in: 1 business day\n> languages: English, فارسی\n> expertise: web, mobile, desktop, seo`}
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
