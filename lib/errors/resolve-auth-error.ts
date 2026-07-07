import type { dictionaries } from "@/i18n/dictionaries";
import type { AuthErrorCode } from "./codes";

type Dict = (typeof dictionaries)["en"];

export function resolveAuthError(
  errors: Dict["errors"]["auth"],
  payload: { code?: string; message?: string } | null | undefined,
  fallback: string,
): string {
  const code = payload?.code as AuthErrorCode | undefined;
  if (code && code in errors) {
    return errors[code as keyof typeof errors];
  }
  return payload?.message ?? fallback;
}
