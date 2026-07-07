export const SITE_URL = "https://firstdata.ir";

export type LangCode = "en" | "fa";

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function langUrl(path: string, lang: LangCode): string {
  const url = new URL(absoluteUrl(path));
  url.searchParams.set("lang", lang);
  return url.toString();
}

export function langAlternates(path: string) {
  const canonical = absoluteUrl(path);
  return {
    canonical,
    languages: {
      en: langUrl(path, "en"),
      fa: langUrl(path, "fa"),
      "x-default": canonical,
    },
  };
}

export const ORG_GEO = {
  latitude: 35.6892,
  longitude: 51.389,
};

export const ORG_HOURS = [
  "Mo-Fr 09:00-18:00",
  "Sa 09:00-14:00",
];

export const ORG_OPENING_HOURS_JSON_LD = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Saturday",
    opens: "09:00",
    closes: "14:00",
  },
];
