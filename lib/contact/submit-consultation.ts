type ConsultationApiResponse = {
  success: boolean;
  message?: string;
  code?: string;
};

export async function submitConsultationForm(
  body: Record<string, string>,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const res = await fetch("/api/contact/consultation-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  let data: ConsultationApiResponse = { success: false };
  try {
    data = (await res.json()) as ConsultationApiResponse;
  } catch {
    return { ok: false, message: "MALFORMED" };
  }

  if (res.ok && data.success) return { ok: true };
  return { ok: false, message: data.code ?? data.message ?? "SERVER" };
}
