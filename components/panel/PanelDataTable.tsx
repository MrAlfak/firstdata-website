"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { EllipsisVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type PanelDataTableAction = {
  label: string;
  icon?: LucideIcon;
  onSelect?: () => void;
  href?: string;
  destructive?: boolean;
  disabled?: boolean;
};

export type PanelDataTableRow = {
  id: string;
  title: ReactNode;
  subtitle?: ReactNode;
  icon?: LucideIcon;
  iconClassName?: string;
  iconBgClassName?: string;
  /** Extra cells after the primary column (same order as `columnHeaders`) */
  cells?: ReactNode[];
  progress?: number;
  progressClassName?: string;
  actions?: PanelDataTableAction[];
  href?: string;
  selected?: boolean;
  onSelectedChange?: (checked: boolean) => void;
};

export type PanelDataTableProps = {
  title: string;
  description?: string;
  primaryHeader: string;
  columnHeaders?: string[];
  progressHeader?: string;
  actionsHeader?: string;
  showCheckbox?: boolean;
  rows: PanelDataTableRow[];
  empty?: ReactNode;
  className?: string;
  onSelectAll?: (checked: boolean) => void;
  allSelected?: boolean;
};

const CHECKBOX_CLASS =
  "data-[state=checked]:border-[rgb(var(--c-accent))] data-[state=checked]:bg-[rgb(var(--c-accent))] dark:data-[state=checked]:border-[rgb(var(--c-accent))] dark:data-[state=checked]:bg-[rgb(var(--c-accent))] cursor-pointer";

export default function PanelDataTable({
  title,
  description,
  primaryHeader,
  columnHeaders = [],
  progressHeader,
  actionsHeader,
  showCheckbox = false,
  rows,
  empty,
  className,
  onSelectAll,
  allSelected = false,
}: PanelDataTableProps) {
  const showProgress = Boolean(progressHeader) || rows.some((r) => r.progress != null);
  const showActions = Boolean(actionsHeader) || rows.some((r) => (r.actions?.length ?? 0) > 0);

  return (
    <Card
      className={cn(
        "w-full overflow-hidden rounded-xl border border-border/80 bg-card pb-0 pt-6 shadow-sm gap-6",
        className,
      )}
    >
      <CardHeader className="px-6">
        <CardTitle className="text-base font-medium tracking-tight text-foreground sm:text-lg">
          {title}
        </CardTitle>
        {description ? (
          <CardDescription className="text-muted-foreground">{description}</CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="px-0">
        {rows.length === 0 ? (
          <div className="px-6 pb-6 text-sm text-muted-foreground">{empty}</div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="min-w-[40rem]">
              <TableHeader>
                <TableRow className="hover:bg-transparent!">
                  {showCheckbox ? (
                    <TableHead className="p-3 ps-6">
                      {onSelectAll ? (
                        <Checkbox
                          checked={allSelected}
                          onCheckedChange={(v) => onSelectAll(v === true)}
                          aria-label="Select all"
                          className={CHECKBOX_CLASS}
                        />
                      ) : (
                        <span className="text-muted-foreground">#</span>
                      )}
                    </TableHead>
                  ) : null}
                  <TableHead className="p-2">{primaryHeader}</TableHead>
                  {columnHeaders.map((h) => (
                    <TableHead key={h} className="p-2">
                      {h}
                    </TableHead>
                  ))}
                  {showProgress ? (
                    <TableHead className="p-2">{progressHeader}</TableHead>
                  ) : null}
                  {showActions ? (
                    <TableHead className="flex justify-end p-3 pe-6">
                      {actionsHeader}
                    </TableHead>
                  ) : null}
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-border">
                {rows.map((row) => {
                  const Icon = row.icon;
                  const primary = (
                    <div className="flex items-center gap-2">
                      {Icon ? (
                        <div
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10",
                            row.iconBgClassName,
                          )}
                        >
                          <Icon
                            width={18}
                            height={18}
                            className={cn("text-primary", row.iconClassName)}
                          />
                        </div>
                      ) : null}
                      <div className="min-w-0">
                        <h6 className="truncate text-sm font-medium text-foreground">{row.title}</h6>
                        {row.subtitle ? (
                          <p className="truncate text-xs text-muted-foreground">{row.subtitle}</p>
                        ) : null}
                      </div>
                    </div>
                  );

                  return (
                    <TableRow key={row.id} data-state={row.selected ? "selected" : undefined}>
                      {showCheckbox ? (
                        <TableCell className="whitespace-nowrap p-3 ps-6">
                          <Checkbox
                            checked={row.selected === true}
                            onCheckedChange={(v) => row.onSelectedChange?.(v === true)}
                            disabled={!row.onSelectedChange}
                            className={CHECKBOX_CLASS}
                          />
                        </TableCell>
                      ) : null}

                      <TableCell className="whitespace-nowrap">
                        {row.href ? (
                          <Link href={row.href} className="block hover:opacity-90">
                            {primary}
                          </Link>
                        ) : (
                          primary
                        )}
                      </TableCell>

                      {(row.cells ?? []).map((cell, i) => (
                        <TableCell key={`${row.id}-c-${i}`} className="whitespace-nowrap">
                          <div className="text-sm text-foreground">{cell}</div>
                        </TableCell>
                      ))}

                      {showProgress ? (
                        <TableCell className="min-w-[7rem] whitespace-nowrap">
                          {row.progress != null ? (
                            <Progress
                              value={Math.min(100, Math.max(0, row.progress))}
                              className={cn(
                                "h-1.5 w-full [&>div]:h-1.5",
                                row.progressClassName,
                              )}
                            />
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </TableCell>
                      ) : null}

                      {showActions ? (
                        <TableCell className="whitespace-nowrap p-3 pe-6">
                          <div className="flex items-center justify-end">
                            {(row.actions?.length ?? 0) > 0 ? (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button
                                    type="button"
                                    className="flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-muted"
                                    aria-label={actionsHeader ?? "Actions"}
                                  >
                                    <EllipsisVertical width={16} height={16} />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {row.actions!.map((action, idx) => {
                                    const ActionIcon = action.icon;
                                    const content = (
                                      <>
                                        {ActionIcon ? <ActionIcon /> : null}
                                        <span>{action.label}</span>
                                      </>
                                    );
                                    if (action.href && !action.disabled) {
                                      return (
                                        <DropdownMenuItem key={idx} asChild>
                                          <Link
                                            href={action.href}
                                            className={cn(
                                              "group flex cursor-pointer gap-3",
                                              action.destructive && "text-destructive",
                                            )}
                                          >
                                            {content}
                                          </Link>
                                        </DropdownMenuItem>
                                      );
                                    }
                                    return (
                                      <DropdownMenuItem
                                        key={idx}
                                        disabled={action.disabled}
                                        className={cn(
                                          "group flex cursor-pointer gap-3",
                                          action.destructive && "text-destructive",
                                        )}
                                        onSelect={() => action.onSelect?.()}
                                      >
                                        {content}
                                      </DropdownMenuItem>
                                    );
                                  })}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            ) : null}
                          </div>
                        </TableCell>
                      ) : null}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
