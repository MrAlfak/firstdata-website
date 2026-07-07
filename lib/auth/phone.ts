/** Normalize Iranian mobile numbers to E.164 (+989xxxxxxxxx). */
export function normalizePhone(input: string): string | null {
  const raw = input.trim().replace(/[\s-]/g, "");
  const digits = raw.replace(/\D/g, "");

  if (digits.startsWith("98") && digits.length === 12 && digits[2] === "9") {
    return `+${digits}`;
  }
  if (digits.startsWith("0") && digits.length === 11 && digits[1] === "9") {
    return `+98${digits.slice(1)}`;
  }
  if (digits.length === 10 && digits[0] === "9") {
    return `+98${digits}`;
  }
  if (raw.startsWith("+98") && digits.length === 12 && digits[2] === "9") {
    return `+${digits}`;
  }

  return null;
}

export function isValidPhone(input: string): boolean {
  return normalizePhone(input) !== null;
}
