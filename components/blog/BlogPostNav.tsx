"use client";

import Link from "next/link";
import type { BlogPost } from "@/config/blog";
import { useT } from "@/i18n/LangProvider";

type Props = {
  prev: BlogPost | null;
  next: BlogPost | null;
};

export default function BlogPostNav({ prev, next }: Props) {
  const { lang, fa, dir, d } = useT();
  const ui = d.blogUi;

  if (!prev && !next) return null;

  const label = (post: BlogPost) => (lang === "fa" ? post.fa.title : post.en.title);

  return (
    <nav
      dir={dir}
      aria-label={ui.postNavLabel}
      className={`mt-10 grid gap-3 border-t border-paper/10 pt-8 sm:grid-cols-2 ${fa ? "font-fa" : ""}`}
    >
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex flex-col gap-1 border border-paper/15 bg-paper/[0.02] p-4 transition-colors hover:border-term/30 hover:bg-paper/[0.04]"
        >
          <span className={`text-[10px] uppercase tracking-wider text-paper/40 ${fa ? "font-fa" : "font-mono"}`}>
            {fa ? "→" : "←"} {ui.prevPost}
          </span>
          <span className="text-sm leading-snug text-paper/75 transition-colors group-hover:text-paper">
            {label(prev)}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex flex-col gap-1 border border-paper/15 bg-paper/[0.02] p-4 text-end transition-colors hover:border-term/30 hover:bg-paper/[0.04] sm:col-start-2"
        >
          <span className={`text-[10px] uppercase tracking-wider text-paper/40 ${fa ? "font-fa" : "font-mono"}`}>
            {ui.nextPost} {fa ? "←" : "→"}
          </span>
          <span className="text-sm leading-snug text-paper/75 transition-colors group-hover:text-paper">
            {label(next)}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
