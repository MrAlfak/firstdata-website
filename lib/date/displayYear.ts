import type { Lang } from "@/i18n/dictionaries";

/**
 * Copyright year: Solar Hijri for Persian, Gregorian for English.
 */
export function getDisplayYear(lang: Lang, date: Date = new Date()): string {
  if (lang === "fa") {
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      year: "numeric",
      numberingSystem: "arabext",
    }).format(date);
  }

  return new Intl.DateTimeFormat("en-US", { year: "numeric", numberingSystem: "latn" }).format(date);
}

/**
 * Format an ISO date (YYYY-MM-DD) for changelog entries.
 */
export function formatChangelogDate(isoDate: string, lang: Lang): string {
  const date = new Date(`${isoDate}T12:00:00`);

  if (lang === "fa") {
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      year: "numeric",
      month: "long",
      day: "numeric",
      numberingSystem: "arabext",
    }).format(date);
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    numberingSystem: "latn",
  }).format(date);
}
