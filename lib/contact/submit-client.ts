export type ContactFormPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  company: string;
  lang?: "en" | "fa";
};

type ContactApiResponse = {
  success: boolean;
  message?: string;
  code?: string;
};

export async function submitContactForm(
  form: ContactFormPayload,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  let data: ContactApiResponse = { success: false };
  try {
    data = (await res.json()) as ContactApiResponse;
  } catch {
    return { ok: false, message: "MALFORMED" };
  }

  if (res.ok && data.success) return { ok: true };
  return { ok: false, message: data.code ?? data.message ?? "SERVER" };
}
