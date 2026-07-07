type CollaborateApiResponse = {
  success: boolean;
  message?: string;
  code?: string;
};

export async function submitCollaborateForm(
  formData: FormData,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const res = await fetch("/api/contact/collaborate-request", {
    method: "POST",
    body: formData,
  });

  let data: CollaborateApiResponse = { success: false };
  try {
    data = (await res.json()) as CollaborateApiResponse;
  } catch {
    return { ok: false, message: "MALFORMED" };
  }

  if (res.ok && data.success) return { ok: true };
  return { ok: false, message: data.code ?? data.message ?? "SERVER" };
}
