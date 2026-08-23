export type ContactForm = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export type ContactField = keyof ContactForm;

export type ContactErrors = Partial<Record<ContactField, string>>;

type ContactMessages = {
  nameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  serviceRequired: string;
  messageRequired: string;
  messageMin: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(
  form: ContactForm,
  messages: ContactMessages,
): ContactErrors {
  const errors: ContactErrors = {};

  if (!form.name.trim()) errors.name = messages.nameRequired;
  if (!form.email.trim()) errors.email = messages.emailRequired;
  else if (!EMAIL_RE.test(form.email.trim())) errors.email = messages.emailInvalid;
  if (!form.service.trim()) errors.service = messages.serviceRequired;
  if (!form.message.trim()) errors.message = messages.messageRequired;
  else if (form.message.trim().length < 10) errors.message = messages.messageMin;

  return errors;
}
