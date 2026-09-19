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

/** Customer-facing office (matches footer / contact NAP). */
export const ORG_ADDRESS = {
  streetAddress: "Sarbaz Blvd, Isargaran St, Alley 3",
  addressLocality: "Shiraz",
  addressRegion: "Fars",
  addressCountry: "IR",
};

/** Approximate coordinates for Sarbaz Blvd, Shiraz. */
export const ORG_GEO = {
  latitude: 29.6196,
  longitude: 52.5319,
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
