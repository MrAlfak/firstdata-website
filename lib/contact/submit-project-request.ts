type ProjectRequestApiResponse = {
  success: boolean;
  message?: string;
  code?: string;
};

export async function submitProjectRequestForm(
  formData: FormData,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const res = await fetch("/api/contact/project-request", {
    method: "POST",
    body: formData,
  });

  let data: ProjectRequestApiResponse = { success: false };
  try {
    data = (await res.json()) as ProjectRequestApiResponse;
  } catch {
    return { ok: false, message: "MALFORMED" };
  }

  if (res.ok && data.success) return { ok: true };
  return { ok: false, message: data.code ?? data.message ?? "SERVER" };
}
