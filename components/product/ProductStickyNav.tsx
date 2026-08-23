"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";

export type ProductNavItem = { id: string; label: string };

type Props = { items: ProductNavItem[] };

export default function ProductStickyNav({ items }: Props) {
  const { fa, dir } = useT();
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleEntries[0]?.target.id) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  if (!visible || items.length === 0) return null;

  return (
    <nav
      aria-label={fa ? "ناوبری صفحه محصول" : "Product page navigation"}
      dir={dir}
      className="sticky top-[53px] z-40 border-b border-paper/10 bg-ink/85 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl gap-0.5 overflow-x-auto px-3 py-1.5 sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`shrink-0 px-2.5 py-1.5 text-[11px] transition-colors ${
                active
                  ? "border-b border-term text-term"
                  : "border-b border-transparent text-paper/45 hover:text-paper/75"
              } ${fa ? "font-fa" : "font-mono uppercase tracking-wide"}`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
