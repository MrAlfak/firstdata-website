"use client";

import { getIconData, iconToSVG, replaceIDs } from "@iconify/utils";
import streamline from "@iconify-json/streamline/icons.json";
import type { IconifyJSON } from "@iconify/types";

/**
 * Streamline Core free icons (CC BY 4.0) via Iconify JSON — modern / AI skin.
 * Attribution: https://www.streamlinehq.com/icons/streamline-core
 */
export type StreamlineCoreIconName = string;

type Props = {
  /** Iconify id without prefix, e.g. `interface-search-glass-search-magnifying` */
  name: StreamlineCoreIconName;
  size?: number;
  className?: string;
};

const collection = streamline as IconifyJSON;

export default function StreamlineCoreIcon({ name, size = 18, className = "" }: Props) {
  const data = getIconData(collection, name);
  if (!data) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[StreamlineCoreIcon] missing streamline:${name}`);
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
