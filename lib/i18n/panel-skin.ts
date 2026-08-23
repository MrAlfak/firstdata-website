export type PanelSkin = "terminal" | "modern";

/** Cookie mirrored from localStorage so SSR can render the correct skin. */
export const PANEL_SKIN_COOKIE = "fd-panel-skin";

/** localStorage key (must match PanelSkinToggle / boot script). */
export const PANEL_SKIN_STORAGE_KEY = "fd-panel-skin";

export function parsePanelSkin(value: string | null | undefined): PanelSkin | null {
  if (value === "terminal" || value === "modern") return value;
  return null;
}

/**
 * Campaign / share links: `?skin=terminal` or `?skin=modern` (also `view=builder|business`).
 * Returns null when absent so callers can fall back to cookie/storage/default.
 */
export function parseSkinFromSearchParams(
  params: URLSearchParams | { get(name: string): string | null },
): PanelSkin | null {
  const skin = parsePanelSkin(params.get("skin"));
  if (skin) return skin;
  const view = (params.get("view") || "").trim().toLowerCase();
  if (view === "builder" || view === "56k" || view === "terminal") return "terminal";
  if (view === "business" || view === "ai" || view === "modern") return "modern";
  return null;
}

/** Client: cookie string to assign via document.cookie */
export function buildPanelSkinCookie(skin: PanelSkin): string {
  return `${PANEL_SKIN_COOKIE}=${skin};path=/;max-age=31536000;SameSite=Lax`;
}
