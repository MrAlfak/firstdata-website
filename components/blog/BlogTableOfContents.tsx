"use client";

import { extractToc } from "@/lib/blog";

type Props = {
  body: string[];
  title: string;
  fa: boolean;
  dir: "ltr" | "rtl";
};

export default function BlogTableOfContents({ body, title, fa, dir }: Props) {
  const items = extractToc(body);
  if (items.length < 2) return null;

  return (
    <nav
      aria-label={title}
      dir={dir}
      className={`mb-8 border border-paper/10 bg-paper/[0.02] p-4 sm:p-5 ${fa ? "font-fa" : ""}`}
    >
      <p className={`mb-3 text-[10px] uppercase tracking-widest text-paper/35 ${fa ? "font-fa" : "font-mono"}`}>
        {title}
      </p>
      <ol className="space-y-2">
        {items.map(({ id, text }, i) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="group flex items-start gap-2 text-sm text-paper/55 transition-colors hover:text-term"
            >
              <span className="shrink-0 font-mono text-[10px] text-term/40">{String(i + 1).padStart(2, "0")}</span>
              <span className="leading-snug group-hover:underline">{text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
