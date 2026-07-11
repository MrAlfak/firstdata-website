"use client";

import { useEffect, useState } from "react";
import { useT } from "@/i18n/LangProvider";

export type ProductNavItem = { id: string; label: string };

type Props = { items: ProductNavItem[] };

export default function ProductStickyNav({ items }: Props) {
  const { fa, dir } = useT();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <nav
      aria-label={fa ? "?????? ???? ?????" : "Product page navigation"}
      dir={dir}
      className="sticky top-0 z-40 border-b border-paper/15 bg-ink/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`shrink-0 rounded-sm border border-transparent px-3 py-1.5 text-[11px] text-paper/55 transition-colors hover:border-paper/20 hover:bg-paper/[0.04] hover:text-paper ${fa ? "font-fa" : "font-mono uppercase tracking-wide"}`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
