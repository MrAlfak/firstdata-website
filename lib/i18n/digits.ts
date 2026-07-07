const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/** Convert ASCII digits (0-9) in a string to Persian numerals. Idempotent for already-Persian text. */
export function toPersianDigits(value: string): string {
  return value.replace(/\d/g, (d) => FA_DIGITS[Number(d)] ?? d);
}

/** Format a number or string for display in the active locale. */
export function formatDigits(value: string | number, fa: boolean): string {
  const text = String(value);
  return fa ? toPersianDigits(text) : text;
}

/** Recursively convert ASCII digits in all string leaves of an object tree. */
export function localizeDigitsDeep<T>(value: T): T {
  if (typeof value === "string") {
    return toPersianDigits(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => localizeDigitsDeep(item)) as T;
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, localizeDigitsDeep(child)]),
    ) as T;
  }

  return value;
}
