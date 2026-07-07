import type { dictionaries } from "@/i18n/dictionaries";

type NetworkMessages = (typeof dictionaries)["en"]["errors"]["network"];

export async function fetchJson<T>(
  input: RequestInfo,
  init?: RequestInit,
  networkMessages?: NetworkMessages,
): Promise<{ ok: true; data: T } | { ok: false; message: string; code?: string }> {
  try {
    const res = await fetch(input, init);
    let data: T & { success?: boolean; message?: string; code?: string };
    try {
      data = await res.json();
    } catch {
      return {
        ok: false,
        message: networkMessages?.malformed ?? "Unexpected server response.",
        code: "MALFORMED",
      };
    }

    if (!res.ok) {
      return {
        ok: false,
        message: data.message ?? networkMessages?.failed ?? "Request failed.",
        code: data.code,
      };
    }

    return { ok: true, data };
  } catch {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      return {
        ok: false,
        message: networkMessages?.failed ?? "Connection failed.",
        code: "NETWORK",
      };
    }
    return {
      ok: false,
      message: networkMessages?.failed ?? "Connection failed.",
      code: "NETWORK",
    };
  }
}
