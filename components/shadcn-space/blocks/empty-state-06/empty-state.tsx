"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "motion/react";
import { Plug, ChartNoAxesColumn } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface EmptyStateAction {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  href?: string;
}

export interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  /** Pass `null` to hide the primary CTA (demo defaults to Connect). */
  primaryAction?: EmptyStateAction | null;
  secondaryAction?: EmptyStateAction;
  className?: string;
  /** Tighter padding for table/list empties inside the panel. */
  compact?: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

function ActionButton({
  action,
  variant,
}: {
  action: EmptyStateAction;
  variant?: "outline" | "default";
}) {
  const className =
    variant === "outline"
      ? "gap-1.5 cursor-pointer"
      : "cursor-pointer gap-1.5 hover:bg-primary/80";

  const content = (
    <>
      {action.icon}
      {action.label}
    </>
  );

  if (action.href) {
    return (
      <Button variant={variant === "outline" ? "outline" : "default"} asChild className={className}>
        <Link href={action.href}>{content}</Link>
      </Button>
    );
  }

  return (
    <Button
      variant={variant === "outline" ? "outline" : "default"}
      onClick={action.onClick}
      className={className}
    >
      {content}
    </Button>
  );
}

const EmptyState = ({
  icon = <ChartNoAxesColumn />,
  title = "No chart data available",
  description = "Connect a data source to start visualizing your metrics here.",
  primaryAction = {
    label: "Connect data source",
    icon: <Plug className="size-3.5" />,
  },
  secondaryAction,
  className,
  compact = false,
}: EmptyStateProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full items-center justify-center px-4",
        compact ? "py-4 sm:py-6" : "py-10 sm:py-16",
        className,
      )}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="w-full max-w-md animate-in fade-in-0 duration-300"
      >
        <Card className={cn(
          "w-full bg-background ring-0",
          compact ? "border border-dashed" : "border-2 border-dashed",
        )}>
          <CardContent className={compact ? "p-5" : "p-6"}>
            <Empty className={compact ? "gap-4 p-0 md:p-0" : undefined}>
              <EmptyHeader>
                <motion.div variants={itemVariants}>
                  <EmptyMedia variant="icon">{icon}</EmptyMedia>
                </motion.div>
                <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
                  <EmptyTitle className="text-base font-semibold text-card-foreground">
                    {title}
                  </EmptyTitle>
                  <EmptyDescription className="text-sm">{description}</EmptyDescription>
                </motion.div>
              </EmptyHeader>

              {(primaryAction || secondaryAction) && (
                <motion.div variants={itemVariants} className="w-full">
                  <EmptyContent>
                    <div className="flex items-center gap-2">
                      {secondaryAction && (
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ duration: 0.2, ease: EASE }}
                          className="inline-flex"
                        >
                          <ActionButton action={secondaryAction} variant="outline" />
                        </motion.div>
                      )}
                      {primaryAction && (
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ duration: 0.2, ease: EASE }}
                          className="inline-flex"
                        >
                          <ActionButton action={primaryAction} />
                        </motion.div>
                      )}
                    </div>
                  </EmptyContent>
                </motion.div>
              )}
            </Empty>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EmptyState;
