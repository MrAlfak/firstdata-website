export type ConsultationForm = {
  name: string;
  phone: string;
  contactMethod: "" | import("@/config/consultation-request").ContactMethodKey;
  email: string;
  contactTime: "" | import("@/config/consultation-request").ContactTimeKey;
};

export type ConsultationField = keyof ConsultationForm;

export type ConsultationErrors = Partial<Record<ConsultationField, string>>;

type Messages = {
  nameRequired: string;
  phoneRequired: string;
  phoneInvalid: string;
  contactMethodRequired: string;
  emailRequired: string;
  emailInvalid: string;
  contactTimeRequired: string;
};

const PHONE_RE = /^[\d+\s()-]{8,32}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateConsultationForm(
  form: ConsultationForm,
  messages: Messages,
): ConsultationErrors {
  const errors: ConsultationErrors = {};

  if (!form.name.trim()) errors.name = messages.nameRequired;
  if (!form.phone.trim()) errors.phone = messages.phoneRequired;
  else if (!PHONE_RE.test(form.phone.trim())) errors.phone = messages.phoneInvalid;
  if (!form.contactMethod) errors.contactMethod = messages.contactMethodRequired;
  if (!form.contactTime) errors.contactTime = messages.contactTimeRequired;

  if (form.contactMethod === "email") {
    if (!form.email.trim()) errors.email = messages.emailRequired;
    else if (!EMAIL_RE.test(form.email.trim())) errors.email = messages.emailInvalid;
  } else if (form.email.trim() && !EMAIL_RE.test(form.email.trim())) {
    errors.email = messages.emailInvalid;
  }

  return errors;
}
