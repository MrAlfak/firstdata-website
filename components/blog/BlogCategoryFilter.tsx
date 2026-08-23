"use client";

import { useMemo } from "react";
import type { BlogCategorySlug } from "@/config/blog";
import { BLOG_CATEGORIES } from "@/config/blog";
import { useT } from "@/i18n/LangProvider";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import {
  AnimatedTabs,
  type AnimatedTabItem,
} from "@/components/shadcn-space/tabs/tabs-08";

export type BlogFilter = "all" | BlogCategorySlug;

type Props = {
  active: BlogFilter;
  onChange: (filter: BlogFilter) => void;
  counts: Record<BlogFilter, number>;
};

export default function BlogCategoryFilter({ active, onChange, counts }: Props) {
  const { fa, dir, d, fd } = useT();
  const [skin] = usePanelSkin();
  const modern = skin === "modern";
  const ui = d.blogUi;

  const items = useMemo(
    (): { key: BlogFilter; label: string }[] => [
      { key: "all", label: ui.filterAll },
      ...BLOG_CATEGORIES.map((key) => ({
        key,
        label: ui.categories[key],
      })),
    ],
    [ui.categories, ui.filterAll],
  );

  const modernTabs: AnimatedTabItem[] = useMemo(
    () =>
      items.map(({ key, label }) => ({
        value: key,
        label,
        badge: fd(counts[key]),
      })),
    [counts, fd, items],
  );

  return (
    <div dir={dir} className="border-b border-paper/15 bg-paper/[0.02] px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p
          className={`mb-3 text-[10px] uppercase tracking-widest text-paper/35 ${
            fa ? (modern ? "font-iran" : "font-fa") : modern ? "font-iran" : "font-mono"
          }`}
        >
          {ui.filterLabel}
        </p>
        {modern ? (
          <AnimatedTabs
            tabs={modernTabs}
            value={active}
            onValueChange={(next) => onChange(next as BlogFilter)}
            showPanel={false}
            indicatorId="blog-category-tabs"
            className={`gap-0 ${fa ? "font-iran" : "font-iran"}`}
            listClassName="w-full max-w-full sm:w-full"
          />
        ) : (
          <div
            className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label={ui.filterLabel}
          >
            {items.map(({ key, label }) => {
              const selected = active === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => onChange(key)}
                  className={`shrink-0 border px-3 py-2 font-mono text-[11px] transition-colors duration-200 sm:px-4 sm:text-xs ${
                    selected
                      ? "border-term/50 bg-term/10 text-term"
                      : "border-paper/20 text-paper/55 hover:border-paper/40 hover:bg-paper/5 hover:text-paper/80"
                  } ${fa ? "font-fa" : ""}`}
                >
                  <span className="text-paper/35">{selected ? ">" : "$"}</span>{" "}
                  {label}
                  <span className="ms-2 text-paper/30">({counts[key]})</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
