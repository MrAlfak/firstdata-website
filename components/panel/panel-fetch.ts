export type PanelJson<T> =
  | { ok: true; body: T & { success: true } }
  | { ok: false; message: string };

type ApiPayload = { success?: boolean; message?: string };

export async function panelFetch<T extends Record<string, unknown>>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<PanelJson<T>> {
  try {
    const res = await fetch(input, init);
    const body = (await res.json()) as ApiPayload & T;
    if (!res.ok || !body.success) {
      return { ok: false, message: body.message ?? "Request failed." };
    }
    return { ok: true, body: body as T & { success: true } };
  } catch {
    return { ok: false, message: "Connection failed." };
  }
}
