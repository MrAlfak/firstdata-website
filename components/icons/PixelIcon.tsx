"use client";

import { getIconData, iconToSVG, replaceIDs } from "@iconify/utils";
import streamlinePixel from "@iconify-json/streamline-pixel/icons.json";
import type { IconifyJSON } from "@iconify/types";

/**
 * Streamline Pixel free icons (CC BY 4.0) via Iconify JSON — terminal skin only.
 * Attribution: https://www.streamlinehq.com/icons/pixel
 */
export type PixelIconName = string;

type Props = {
  /** Iconify id without prefix, e.g. `interface-essential-search-1` */
  name: PixelIconName;
  size?: number;
  className?: string;
};

const collection = streamlinePixel as IconifyJSON;

export default function PixelIcon({ name, size = 16, className = "" }: Props) {
  const data = getIconData(collection, name);
  if (!data) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[PixelIcon] missing streamline-pixel:${name}`);
    }
    return null;
  }

  const rendered = iconToSVG(data, { height: `${size}px` });
  const body = replaceIDs(rendered.body);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...rendered.attributes}
      width={size}
      height={size}
      className={`shrink-0 ${className}`.trim()}
      aria-hidden
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}
