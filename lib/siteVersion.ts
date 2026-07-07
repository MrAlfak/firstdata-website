import { APP_VERSION } from "@/config/changelog";
import type { Lang } from "@/i18n/dictionaries";
import { toPersianDigits } from "@/lib/i18n/digits";

export { toPersianDigits } from "@/lib/i18n/digits";

export function getHeroVersionLabel(lang: Lang): string {
  if (lang === "fa") {
    return `اولین‌دیتا ~ نسخه ${toPersianDigits(APP_VERSION)}`;
  }

  return `first-data ~ v${APP_VERSION}`;
}

export function getPreloaderCorner(lang: Lang): string {
  if (lang === "fa") {
    return `SYS,INIT v${toPersianDigits(APP_VERSION)}`;
  }

  return `SYS,INIT v${APP_VERSION}`;
}

export function getTerminalTitle(lang: Lang): string {
  if (lang === "fa") {
    return `ترمینال اولین دیتا نسخه ${toPersianDigits(APP_VERSION)}`;
  }

  return `First Data Terminal v${APP_VERSION}`;
}

export function getTerminalTabTitle(lang: Lang): string {
  if (lang === "fa") {
    return `bash, اولین دیتا v${toPersianDigits(APP_VERSION)}`;
  }

  return `bash, first-data v${APP_VERSION}`;
}

export function getVersionCommandOutput(lang: Lang): string[] {
  if (lang === "fa") {
    return [
      `first-data.runtime v${toPersianDigits(APP_VERSION)}`, "stack: Next.js / React / TypeScript", "locale: fa-IR", ];
  }

  return [
    `first-data.runtime v${APP_VERSION}`, "stack: Next.js / React / TypeScript", "locale: en-US", ];
}
