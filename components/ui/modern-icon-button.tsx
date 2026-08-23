"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n/LangProvider";

type ModernIconButtonSize = "default" | "sm";

export type ModernIconButtonProps = Omit<
  ButtonProps,
  "asChild" | "children" | "size" | "onClick"
> & {
  children: React.ReactNode;
  /** When set, renders as a Next.js Link via Button asChild */
  href?: string;
  className?: string;
  size?: ModernIconButtonSize;
  /** Extra classes on the sliding icon disc */
  iconClassName?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
};

const SIZE = {
  default: {
    shell: "h-12 text-sm ps-6 pe-14",
    icon: "size-10",
    iconPx: 16,
    /** Matches former padding swap (pe-14 − ps-6) */
    labelShift: "group-hover:translate-x-8 rtl:group-hover:-translate-x-8",
  },
  sm: {
    shell: "h-9 text-sm ps-3.5 pe-11",
    icon: "size-7",
    iconPx: 14,
    /** Matches former padding swap (pe-11 − ps-3.5) */
    labelShift:
      "group-hover:translate-x-[1.875rem] rtl:group-hover:-translate-x-[1.875rem]",
  },
} as const;

/** GPU-friendly hover motion — transform only, no layout props */
const MOTION =
  "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none";

/**
 * Sliding-pill CTA with directional arrow disc — modern skin primary buttons.
 * RTL (fa): ArrowUpLeft + mirrored hover rotate; icon travel RTL-mirrored.
 * Hover uses transform (not padding / left / right) for 60fps-friendly motion.
 */
export function ModernIconButton({
  children,
  href,
  className,
  iconClassName,
  size = "default",
  variant = "default",
  onClick,
  type = "button",
  disabled,
  ...rest
}: ModernIconButtonProps) {
  const { dir } = useT();
  const rtl = dir === "rtl";
  const s = SIZE[size];
  const ArrowIcon = rtl ? ArrowUpLeft : ArrowUpRight;

  const shell = cn(
    "group relative w-fit cursor-pointer overflow-hidden rounded-full p-1 font-medium transition-colors duration-300",
    s.shell,
    className,
  );

  const label = cn(
    "relative z-10 inline-block",
    MOTION,
    "motion-reduce:group-hover:translate-x-0",
    s.labelShift,
  );

  const iconDisc = cn(
    "absolute end-0 top-1/2 z-[1] flex -translate-y-1/2 items-center justify-center rounded-full bg-background text-foreground",
    MOTION,
    // Track is @container; % in translate is the disc width → travel = track − disc
    "group-hover:-translate-x-[calc(100cqi-100%)] rtl:group-hover:translate-x-[calc(100cqi-100%)]",
    rtl ? "group-hover:-rotate-45" : "group-hover:rotate-45",
    "motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:rotate-0",
    s.icon,
    iconClassName,
  );

  const inner = (
    <>
      <span className={label}>{children}</span>
      <span
        className="pointer-events-none absolute inset-1 z-0 @container"
        aria-hidden
      >
        <span className={iconDisc}>
          <ArrowIcon size={s.iconPx} />
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <Button
        asChild
        variant={variant}
        disabled={disabled}
        className={shell}
        {...rest}
      >
        <Link
          href={href}
          dir={dir}
          onClick={
            onClick as unknown as React.MouseEventHandler<HTMLAnchorElement> | undefined
          }
        >
          {inner}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      type={type}
      variant={variant}
      disabled={disabled}
      className={shell}
      onClick={onClick}
      {...rest}
    >
      {inner}
    </Button>
  );
}

export default ModernIconButton;
