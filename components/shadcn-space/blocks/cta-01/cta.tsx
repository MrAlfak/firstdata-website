"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { ModernIconButton } from "@/components/ui/modern-icon-button";
import { cn } from "@/lib/utils";

type CTAProps = {
  className?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  href?: string;
  /** Full-bleed band (no inset card); content stays centered */
  wide?: boolean;
};

const CTA = ({
  className,
  title = "Innovative solutions for bold brands",
  description =
    "Looking to elevate your brand? We craft immersive experiences that captivate, engage, and make your business unforgettable in every interaction.",
  buttonLabel = "Let's craft together",
  href = "/contactus",
  wide = false,
}: CTAProps) => {
  const ref = useRef(null);

  const bottomAnimation = {
    initial: { y: "5%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 1, delay: 0.8 },
  };

  if (wide) {
    /* Div shell — parent FinalCta owns the <section> landmark */
    return (
      <div className={cn(className)}>
        <div className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div
            ref={ref}
            className="relative mx-auto flex w-full max-w-3xl flex-col items-center justify-center"
          >
            <motion.div
              {...bottomAnimation}
              className="fd-cta-glass relative z-10 mx-auto flex w-full flex-col items-center gap-6 px-6 py-10 sm:gap-7 sm:px-10 sm:py-12 lg:px-12 lg:py-14"
            >
              <div className="relative z-10 flex flex-col items-center gap-3.5 text-center">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-[3.35rem] lg:leading-[1.12]">
                  {title}
                </h2>
                <p className="mx-auto max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg">
                  {description}
                </p>
              </div>
              <div className="relative z-10">
                <ModernIconButton href={href}>{buttonLabel}</ModernIconButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={cn(className)}>
      <div className="py-8 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-16">
          <div
            ref={ref}
            className={cn(
              "relative flex w-full min-h-96 items-center justify-center overflow-hidden rounded-3xl border bg-card px-6 shadow-sm sm:min-h-[28rem] sm:px-10 lg:min-h-[32rem]",
              "border-foreground/18 dark:border-foreground/22",
              "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit]",
              "before:bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgb(var(--c-accent)/0.12),transparent_70%)]",
              "dark:before:bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgb(var(--c-accent)/0.16),transparent_70%)]",
            )}
          >
            <motion.div
              {...bottomAnimation}
              className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-6"
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-5xl lg:text-[3.25rem]">
                  {title}
                </h2>
                <p className="mx-auto max-w-2xl text-base text-foreground/65 sm:text-lg">
                  {description}
                </p>
              </div>
              <ModernIconButton href={href}>{buttonLabel}</ModernIconButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
