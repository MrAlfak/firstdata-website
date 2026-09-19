/** Prevent open redirects after login. Only same-origin relative paths. */
export function safeNextPath(raw: string | undefined | null, fallback = "/panel"): string {
  if (!raw) return fallback;
  const path = raw.trim();
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return fallback;
  if (path.includes("://")) return fallback;
  return path;
}
