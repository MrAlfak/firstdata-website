"use client";

import { Fragment } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  DotIcon,
  FolderKanban,
  HomeIcon,
  LayoutGrid,
  Newspaper,
  Package,
  Settings,
  Wrench,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import type { BreadcrumbItem as Crumb } from "@/lib/seo/breadcrumbs";
import { cn } from "@/lib/utils";

type Props = {
  items: Crumb[];
  fa?: boolean;
};

function segmentIcon(item: Crumb, index: number) {
  if (index === 0 || item.href === "/") return HomeIcon;
  const href = (item.href ?? item.name).toLowerCase();
  const name = item.name.toLowerCase();
  if (href.includes("account") || name.includes("account") || name.includes("حساب")) {
    return CircleUserRound;
  }
  if (href.includes("setting") || name.includes("setting") || name.includes("تنظیم")) {
    return Settings;
  }
  if (href.includes("/services") || name.includes("service") || name.includes("خدمت")) {
    return Wrench;
  }
  if (href.includes("/product") || name.includes("product") || name.includes("محصول")) {
    return Package;
  }
  if (href.includes("/portfolio") || name.includes("portfolio") || name.includes("نمونه")) {
    return FolderKanban;
  }
  if (href.includes("/blog") || name.includes("blog") || name.includes("وبلاگ")) {
    return Newspaper;
  }
  if (href.includes("/about") || name.includes("about") || name.includes("درباره")) {
    return LayoutGrid;
  }
  return null;
}

/** Modern outline trail (shadcn-space breadcrumb-03 look). */
function ModernBreadcrumbNav({ items, fa = false }: Props) {
  if (items.length === 0) return null;

  const backLabel = fa ? "بازگشت" : "Back";
  const forwardLabel = fa ? "جلو" : "Forward";

  return (
    <Breadcrumb dir={fa ? "rtl" : "ltr"} className={fa ? "font-iran" : "font-iran"}>
      <BreadcrumbList className="h-8 gap-2 rounded-lg border border-border bg-background/80 px-3 text-sm text-muted-foreground backdrop-blur-sm">
        <li
          className={cn(
            "flex items-center rounded-full bg-muted px-1.5 py-0.5",
            fa ? "ml-1" : "mr-1",
          )}
        >
          <button
            type="button"
            aria-label={backLabel}
            onClick={() => {
              if (typeof window !== "undefined") window.history.back();
            }}
            className="inline-flex text-foreground"
          >
            {fa ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
          <button
            type="button"
            aria-label={forwardLabel}
            onClick={() => {
              if (typeof window !== "undefined") window.history.forward();
            }}
            className="inline-flex text-foreground/60"
          >
            {fa ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </li>

        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const Icon = segmentIcon(item, i);
          return (
            <Fragment key={`${item.name}-${i}`}>
              {i > 0 ? (
                <BreadcrumbSeparator>
                  <DotIcon className="size-4" />
                </BreadcrumbSeparator>
              ) : null}
              <BreadcrumbItem>
                {item.href && !isLast ? (
                  <BreadcrumbLink asChild>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                    >
                      {Icon ? <Icon className="size-4 shrink-0" aria-hidden /> : null}
                      {i === 0 ? (
                        <span className="sr-only">{item.name}</span>
                      ) : (
                        <span>{item.name}</span>
                      )}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="flex items-center gap-2">
                    {Icon ? <Icon className="inline size-4 shrink-0" aria-hidden /> : null}
                    <span>{item.name}</span>
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function TerminalBreadcrumbNav({ items, fa = false }: Props) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      dir={fa ? "rtl" : "ltr"}
      className={`mb-0 text-[10px] text-paper/35 ${fa ? "font-fa" : "font-mono"}`}
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.name}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-paper/20">/</span>}
              {item.href && !isLast ? (
                <Link href={item.href} className="transition-colors hover:text-paper/60">
                  {item.name}
                </Link>
              ) : (
                <span
                  className={isLast ? "text-paper/50" : undefined}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default function BreadcrumbNav({ items, fa = false }: Props) {
  const [skin] = usePanelSkin();
  if (skin === "modern") {
    return <ModernBreadcrumbNav items={items} fa={fa} />;
  }
  return <TerminalBreadcrumbNav items={items} fa={fa} />;
}
