"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export type ModernFormStep = {
  id: string;
  title: string;
  description: string;
  content: ReactNode;
};

export type ModernFormStepperLabels = {
  back: string;
  continue: string;
  submit: string;
  submitting?: string;
};

type Props = {
  steps: ModernFormStep[];
  activeStepIdx: number;
  onStepChange: (index: number) => void;
  onBack: () => void;
  onContinue: () => void;
  labels: ModernFormStepperLabels;
  dir?: "rtl" | "ltr";
  className?: string;
  headerExtra?: ReactNode;
  banner?: ReactNode;
  submitting?: boolean;
  /** When true, last-step primary button is disabled */
  submitDisabled?: boolean;
};

/**
 * Stepper shell matching shadcn-space/stepper-02 — for modern-skin multi-step forms.
 */
export function ModernFormStepper({
  steps,
  activeStepIdx,
  onStepChange,
  onBack,
  onContinue,
  labels,
  dir = "ltr",
  className,
  headerExtra,
  banner,
  submitting = false,
  submitDisabled = false,
}: Props) {
  const isLast = activeStepIdx >= steps.length - 1;
  const Chevron = dir === "rtl" ? ChevronLeft : ChevronRight;

  return (
    <Card
      dir={dir}
      className={cn(
        "overflow-hidden border border-border bg-background pt-0 shadow-xs",
        className,
      )}
    >
      <CardContent className="px-0 pb-6">
        {headerExtra ? <div className="border-b border-border px-6 py-4 sm:px-8">{headerExtra}</div> : null}
        {banner ? <div className="px-6 pt-4 sm:px-8">{banner}</div> : null}

        <div className="flex flex-col justify-between gap-4 border-b border-border bg-muted/5 px-6 py-5 sm:flex-row sm:items-center sm:px-8 sm:py-6">
          {steps.map((step, index) => {
            const isActive = activeStepIdx === index;
            const isPast = activeStepIdx > index;

            return (
              <div key={step.id} className="flex flex-1 items-center gap-3 last:flex-none sm:gap-4">
                <button
                  type="button"
                  onClick={() => onStepChange(index)}
                  disabled={submitting}
                  className="group flex cursor-pointer items-center gap-3 text-left focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-60 sm:gap-4"
                >
                  <div
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 sm:size-10",
                      isPast
                        ? "bg-teal-400 text-white"
                        : isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground",
                    )}
                  >
                    {index + 1}
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <span
                      className={cn(
                        "truncate text-sm font-bold transition-colors",
                        isActive ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {step.title}
                    </span>
                    <span className="truncate text-xs font-medium text-muted-foreground/60">
                      {step.description}
                    </span>
                  </div>
                </button>
                {index < steps.length - 1 ? (
                  <div className="mx-auto hidden sm:block">
                    <Chevron className="size-4 text-muted-foreground/40" aria-hidden />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="min-h-32 px-6 py-8 sm:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={steps[activeStepIdx]?.id ?? activeStepIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full space-y-5 text-start"
            >
              {steps[activeStepIdx]?.content}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3 border-t border-border px-6 pt-4 sm:px-8">
          <Button
            type="button"
            variant="outline"
            className="h-9 cursor-pointer rounded-lg shadow-xs"
            onClick={onBack}
            disabled={activeStepIdx === 0 || submitting}
          >
            {labels.back}
          </Button>
          <Button
            type="button"
            className="ml-auto h-9 cursor-pointer rounded-lg hover:bg-primary/80"
            onClick={onContinue}
            disabled={submitting || (isLast && submitDisabled)}
          >
            {isLast
              ? submitting
                ? (labels.submitting ?? labels.submit)
                : labels.submit
              : labels.continue}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
