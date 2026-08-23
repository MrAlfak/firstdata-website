"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Hash } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type InteractiveJumpProps = {
  /** Controlled page (1-based). Omit for internal demo state. */
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  ofLabel?: string;
  goLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  /** Format displayed page numbers (e.g. Persian digits). */
  formatNumber?: (n: number) => string;
  rtl?: boolean;
  className?: string;
};

export function InteractiveJumpPagination({
  page: pageProp,
  totalPages = 48,
  onPageChange,
  ofLabel = "of",
  goLabel = "GO",
  previousLabel = "Previous",
  nextLabel = "Next",
  formatNumber = (n) => String(n),
  rtl = false,
  className,
}: InteractiveJumpProps) {
  const controlled = typeof pageProp === "number" && typeof onPageChange === "function";
  const [internalPage, setInternalPage] = React.useState(pageProp ?? 12);
  const activePage = controlled ? pageProp! : internalPage;

  const [isEditing, setIsEditing] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(String(activePage));

  React.useEffect(() => {
    setInputValue(String(activePage));
  }, [activePage]);

  const handlePageChange = (page: number) => {
    const newPage = Math.max(1, Math.min(totalPages, page));
    if (controlled) onPageChange!(newPage);
    else setInternalPage(newPage);
    setInputValue(String(newPage));
    setIsEditing(false);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(inputValue, 10);
    if (!isNaN(page)) {
      handlePageChange(page);
    } else {
      setInputValue(String(activePage));
      setIsEditing(false);
    }
  };

  const PrevIcon = rtl ? ChevronRight : ChevronLeft;
  const NextIcon = rtl ? ChevronLeft : ChevronRight;

  if (totalPages < 1) return null;

  return (
    <Pagination className={cn("justify-center", className)}>
      <PaginationContent className="gap-2 rounded-xl border border-border bg-background p-1.5">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(activePage - 1);
            }}
            aria-disabled={activePage <= 1}
            className={cn(
              "rounded-lg group hover:bg-secondary/80",
              activePage <= 1 && "pointer-events-none opacity-40",
            )}
          >
            <PrevIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{previousLabel}</span>
          </PaginationPrevious>
        </PaginationItem>

        <PaginationItem>
          <div className="flex min-w-[140px] items-center justify-center px-2">
            <AnimatePresence mode="wait">
              {!isEditing ? (
                <motion.button
                  type="button"
                  key="viewer"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  onClick={() => setIsEditing(true)}
                  className="group flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1 transition-colors hover:bg-secondary/50"
                >
                  <span className="text-sm font-semibold tabular-nums">
                    {formatNumber(activePage)}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {ofLabel} {formatNumber(totalPages)}
                  </span>
                  <Hash className="h-3 w-3 text-muted-foreground transition-colors group-hover:text-primary" />
                </motion.button>
              ) : (
                <motion.form
                  key="editor"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleInputSubmit}
                  className="flex items-center gap-1.5"
                >
                  <Input
                    autoFocus
                    className="h-7 w-12 px-1 py-0 text-center text-xs tabular-nums focus-visible:ring-1"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={() => setIsEditing(false)}
                    type="text"
                    inputMode="numeric"
                    aria-label={goLabel}
                  />
                  <Button
                    type="submit"
                    variant="secondary"
                    size="sm"
                    className="h-7 cursor-pointer px-2 text-[10px] font-bold uppercase tracking-tighter"
                  >
                    {goLabel}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </PaginationItem>

        <PaginationItem className="hidden sm:list-item">
          <div className="mx-1 h-4 w-px bg-border" aria-hidden />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(activePage + 1);
            }}
            aria-disabled={activePage >= totalPages}
            className={cn(
              "rounded-lg group hover:bg-secondary/80",
              activePage >= totalPages && "pointer-events-none opacity-40",
            )}
          >
            <span className="hidden sm:inline">{nextLabel}</span>
            <NextIcon className="h-4 w-4" />
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

/** Demo block — interactive jump pagination (shadcn-space / pagination-03). */
export default function InteractiveJump() {
  return <InteractiveJumpPagination />;
}
