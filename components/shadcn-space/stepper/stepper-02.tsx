"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    value: "personal",
    title: "User Details",
    description: "User data",
    content:
      "User Details Step: Please provide your first name, last name, and contact details.",
  },
  {
    id: 2,
    value: "workspace",
    title: "Workspace",
    description: "Workspace setup",
    content:
      "Workspace Step: Configure your organization settings and team workspace directories.",
  },
  {
    id: 3,
    value: "network",
    title: "Network",
    description: "Network setup",
    content:
      "Network Step: Setup access rules, database credentials, and network configuration.",
  },
];

const Stepper02 = () => {
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const handleNext = () => {
    if (activeStepIdx < steps.length - 1) {
      setActiveStepIdx((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStepIdx > 0) {
      setActiveStepIdx((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setActiveStepIdx(0);
  };

  return (
    <section className="w-full py-6 sm:py-10">
      <div className="mx-auto w-full max-w-4xl px-4">
        <Card className="overflow-hidden border border-border bg-background pt-0 shadow-xs">
          <CardContent className="px-0 pb-6">
            <div className="flex flex-col justify-between gap-4 border-b border-border bg-muted/5 px-8 py-6 sm:flex-row sm:items-center">
              {steps.map((step, index) => {
                const isActive = activeStepIdx === index;
                const isPast = activeStepIdx > index;

                return (
                  <div
                    key={step.value}
                    className="flex flex-1 items-center gap-4 last:flex-none"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveStepIdx(index)}
                      className="group flex cursor-pointer items-center gap-4 text-left focus:outline-hidden"
                    >
                      <div
                        className={cn(
                          "flex size-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300",
                          isPast
                            ? "bg-teal-400 text-white"
                            : isActive
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground",
                        )}
                      >
                        {step.id}
                      </div>
                      <div className="flex flex-col">
                        <span
                          className={cn(
                            "text-sm font-bold transition-colors",
                            isActive ? "text-foreground" : "text-muted-foreground",
                          )}
                        >
                          {step.title}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground/60">
                          {step.description}
                        </span>
                      </div>
                    </button>
                    {index < steps.length - 1 && (
                      <div className="mx-auto hidden sm:block">
                        <ChevronRight className="size-4 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex min-h-32 flex-col items-center justify-center px-8 py-10 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStepIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <h3 className="text-lg font-semibold text-foreground">
                    {steps[activeStepIdx].title} Configuration
                  </h3>
                  <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
                    {steps[activeStepIdx].content}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-3 border-t border-border px-8 pt-4">
              <Button
                type="button"
                variant="outline"
                className="h-9 cursor-pointer rounded-lg shadow-xs"
                onClick={handleBack}
                disabled={activeStepIdx === 0}
              >
                Back
              </Button>
              {activeStepIdx === steps.length - 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  className="ml-auto h-9 cursor-pointer rounded-lg"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              ) : (
                <Button
                  type="button"
                  className="ml-auto h-9 cursor-pointer rounded-lg hover:bg-primary/80"
                  onClick={handleNext}
                >
                  Continue
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Stepper02;
