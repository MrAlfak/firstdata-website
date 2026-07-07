export const PROJECT_TYPE_KEYS = [
  "web",
  "ecommerce",
  "android",
  "ios",
  "windows",
  "seo",
  "support",
  "custom",
] as const;

export type ProjectTypeKey = (typeof PROJECT_TYPE_KEYS)[number];

export const BUDGET_KEYS = [
  "under_30m",
  "30_70m",
  "70_150m",
  "over_150m",
  "unknown",
] as const;

export type BudgetKey = (typeof BUDGET_KEYS)[number];

export const TIMELINE_KEYS = ["urgent", "one_month", "two_three_months", "flexible"] as const;

export type TimelineKey = (typeof TIMELINE_KEYS)[number];

export const PROJECT_REQUEST_MAX_FILES = 5;
export const PROJECT_REQUEST_MAX_BYTES = 10 * 1024 * 1024;

export const PROJECT_REQUEST_ALLOWED_MIME = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/zip",
  "application/x-zip-compressed",
]);
