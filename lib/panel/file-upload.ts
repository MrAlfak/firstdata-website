import path from "node:path";

/**
 * Upload safety: whitelist file types by extension + MIME so users cannot
 * upload executables/scripts (`.exe`, `.bat`, `.html`, `.svg`, `.js`, ...)
 * that could be served back and used for stored XSS or malware delivery.
 */

export type AllowedFileKind =
  | "document"
  | "image"
  | "archive"
  | "contract"
  | "deliverable";

const EXT_ALLOWLIST: Record<AllowedFileKind, Set<string>> = {
  document: new Set([
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".txt",
    ".csv",
    ".rtf",
    ".odt",
    ".ods",
    ".md",
  ]),
  image: new Set([
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".bmp",
    ".tif",
    ".tiff",
  ]),
  archive: new Set([".zip", ".rar", ".7z", ".tar", ".gz"]),
  // Contracts are generated server-side as PDF; only PDF accepted from clients.
  contract: new Set([".pdf"]),
  deliverable: new Set([
    ".pdf",
    ".zip",
    ".rar",
    ".7z",
    ".tar",
    ".gz",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".txt",
    ".csv",
    ".mp4",
    ".mov",
  ]),
};

// Explicitly block dangerous types regardless of any other rule.
const BLOCKED_EXTS = new Set([
  ".exe",
  ".dll",
  ".bat",
  ".cmd",
  ".ps1",
  ".vbs",
  ".js",
  ".mjs",
  ".cjs",
  ".ts",
  ".html",
  ".htm",
  ".svg",
  ".sh",
  ".scr",
  ".msi",
  ".com",
  ".pif",
  ".lnk",
  ".jar",
  ".php",
  ".asp",
  ".aspx",
  ".jsp",
]);

export function isAllowedExtension(
  filename: string,
  kind: AllowedFileKind,
): boolean {
  const ext = path.extname(filename).toLowerCase();
  if (!ext) return false;
  if (BLOCKED_EXTS.has(ext)) return false;
  return EXT_ALLOWLIST[kind].has(ext);
}

/**
 * Validate both the reported MIME type and the filename extension. Returns an
 * error message, or null when the file is acceptable.
 */
export function validateUploadFile(
  filename: string,
  mime: string | null,
  kind: AllowedFileKind,
): string | null {
  const name = (filename || "").trim();
  if (!name) return "File name is required";

  if (!isAllowedExtension(name, kind)) {
    return "File type not allowed";
  }

  const ext = path.extname(name).toLowerCase();

  // Reject obvious mismatches between extension and reported MIME.
  const mimeLower = (mime || "").toLowerCase();
  if (mimeLower) {
    const mismatch =
      (ext === ".pdf" && !mimeLower.includes("pdf")) ||
      (ext === ".png" && !mimeLower.includes("png")) ||
      (ext === ".jpg" && !mimeLower.includes("jpeg")) ||
      (ext === ".jpeg" && !mimeLower.includes("jpeg")) ||
      (ext === ".gif" && !mimeLower.includes("gif")) ||
      (ext === ".webp" && !mimeLower.includes("webp")) ||
      (ext === ".zip" && !mimeLower.includes("zip")) ||
      (ext === ".txt" && !mimeLower.includes("text") && !mimeLower.includes("plain"));
    if (mismatch) return "File content does not match its type";
  }

  return null;
}
