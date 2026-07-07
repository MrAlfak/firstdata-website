"use client";

import type { BlogCategorySlug } from "@/config/blog";
import { BLOG_CATEGORIES } from "@/config/blog";
import { useT } from "@/i18n/LangProvider";

export type BlogFilter = "all" | BlogCategorySlug;

type Props = {
  active: BlogFilter;
  onChange: (filter: BlogFilter) => void;
  counts: Record<BlogFilter, number>;
};

export default function BlogCategoryFilter({ active, onChange, counts }: Props) {
  const { fa, dir, d } = useT();
  const ui = d.blogUi;

  const items: { key: BlogFilter; label: string }[] = [
    { key: "all", label: ui.filterAll },
    ...BLOG_CATEGORIES.map((key) => ({
      key,
      label: ui.categories[key],
    })),
  ];

  return (
    <div dir={dir} className="border-b border-paper/15 bg-paper/[0.02] px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p
          className={`mb-3 text-[10px] uppercase tracking-widest text-paper/35 ${fa ? "font-fa" : "font-mono"}`}
        >
          {ui.filterLabel}
        </p>
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
      </div>
    </div>
  );
}
