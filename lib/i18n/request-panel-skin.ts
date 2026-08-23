import { cookies } from "next/headers";
import {
  PANEL_SKIN_COOKIE,
  parsePanelSkin,
  type PanelSkin,
} from "@/lib/i18n/panel-skin";

/** Server-only: read panel skin cookie (default modern). */
export async function getRequestPanelSkin(): Promise<PanelSkin> {
  try {
    const jar = await cookies();
    return parsePanelSkin(jar.get(PANEL_SKIN_COOKIE)?.value) ?? "modern";
  } catch {
    return "modern";
  }
}
