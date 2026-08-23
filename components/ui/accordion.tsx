"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type AccordionProps = {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  className?: string;
  children?: React.ReactNode;
  collapsible?: boolean;
  disabled?: boolean;
  dir?: "ltr" | "rtl";
  orientation?: "horizontal" | "vertical";
} & Omit<
  React.ComponentPropsWithoutRef<"div">,
  "defaultValue" | "value" | "dir" | "onChange" | "color"
>;

/**
 * Accordion root — infers `type="multiple"` when value/defaultValue is an array
 * (matches shadcn-space accordion-04 demo API).
 */
function Accordion({
  type,
  defaultValue,
  value,
  onValueChange,
  className,
  collapsible = true,
  ...props
}: AccordionProps) {
  const resolvedType =
    type ??
    (Array.isArray(defaultValue) || Array.isArray(value) ? "multiple" : "single");

  if (resolvedType === "multiple") {
    return (
      <AccordionPrimitive.Root
        data-slot="accordion"
        type="multiple"
        defaultValue={defaultValue as string[] | undefined}
        value={value as string[] | undefined}
        onValueChange={onValueChange as ((v: string[]) => void) | undefined}
        className={className}
        {...props}
      />
    );
  }

  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      type="single"
      collapsible={collapsible}
      defaultValue={defaultValue as string | undefined}
      value={value as string | undefined}
      onValueChange={onValueChange as ((v: string) => void) | undefined}
      className={className}
      {...props}
    />
  );
}

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    data-slot="accordion-item"
    className={cn("border-b last:border-b-0", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      data-slot="accordion-trigger"
      className={cn(
        "group/accordion-trigger flex flex-1 items-center justify-between gap-4 rounded-md py-4 text-start text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        data-slot="accordion-trigger-icon"
        className="pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200"
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    data-slot="accordion-content"
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pt-0 pb-4", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
