import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";

type Props = {
  items: BreadcrumbItem[];
  fa?: boolean;
};

export default function BreadcrumbNav({ items, fa = false }: Props) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      dir={fa ? "rtl" : "ltr"}
      className={`mb-4 text-[10px] text-paper/35 ${fa ? "font-fa" : "font-mono"}`}
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.name}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-paper/20">/</span>}
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-paper/60 transition-colors">
                  {item.name}
                </Link>
              ) : (
                <span className={isLast ? "text-paper/50" : undefined} aria-current={isLast ? "page" : undefined}>
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
