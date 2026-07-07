export const COLLABORATE_BRANCH_KEYS = ["hiring", "freelancer"] as const;

export type CollaborateBranchKey = (typeof COLLABORATE_BRANCH_KEYS)[number];

export const WORK_MODE_KEYS = ["onsite", "remote"] as const;

export type WorkModeKey = (typeof WORK_MODE_KEYS)[number];

export const SPECIALTY_KEYS = [
  "ui_designer",
  "react_dev",
  "flutter",
  "python",
  "seo",
  "content",
] as const;

export type SpecialtyKey = (typeof SPECIALTY_KEYS)[number];

export const COLLABORATE_MAX_FILES = 3;
export const COLLABORATE_MAX_BYTES = 10 * 1024 * 1024;

export const COLLABORATE_ALLOWED_MIME = new Set([
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
