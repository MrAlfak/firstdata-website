import type { HTMLAttributes } from "react";

/** Keenicons glyph names (outline/solid/filled/duotone). Docs: https://keenthemes.com/metronic/tailwind/docs/plugins/keenicons */
export type KeenIconName = string;

export type KeenIconStyle = "outline" | "solid" | "filled" | "duotone";

type Props = {
  name: KeenIconName;
  style?: KeenIconStyle;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "style" | "children">;

/**
 * Metronic Keenicons font icon.
 * Usage: <KeenIcon name="calendar" /> → <i class="ki-outline ki-calendar" />
 * Duotone glyphs may need path children — prefer outline/solid/filled for simple use.
 */
export default function KeenIcon({
  name,
  style = "outline",
  className = "",
  ...rest
}: Props) {
  return (
    <i
      className={`ki-${style} ki-${name} ${className}`.trim()}
      aria-hidden
      {...rest}
    />
  );
}
