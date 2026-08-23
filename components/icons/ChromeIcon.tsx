"use client";

import PixelIcon from "@/components/icons/PixelIcon";
import StreamlineCoreIcon from "@/components/icons/StreamlineCoreIcon";
import { CORE_CHROME } from "@/lib/icons/streamline-core-map";
import { PIXEL_CHROME, type PixelChromeName } from "@/lib/icons/streamline-pixel-map";

export type ChromeIconName = PixelChromeName;

type Props = {
  name: ChromeIconName;
  /** AI / modern skin → Streamline Core; terminal → Streamline Pixel */
  modern: boolean;
  className?: string;
  /** SVG size (default 15) */
  size?: number;
};

/**
 * Header / chrome glyphs: Streamline Core in AI skin; Streamline Pixel in terminal.
 */
export default function ChromeIcon({ name, modern, className = "", size = 15 }: Props) {
  const Icon = modern ? StreamlineCoreIcon : PixelIcon;
  const glyph = modern ? CORE_CHROME[name] : PIXEL_CHROME[name];

  return (
    <span className={`inline-flex items-center justify-center ${className}`.trim()}>
      <Icon name={glyph} size={size} className="text-current" />
    </span>
  );
}
