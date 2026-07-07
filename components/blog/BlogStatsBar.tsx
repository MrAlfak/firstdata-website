"use client";

import Link from "next/link";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/config/blog";
import { getBlogRssFeedPath } from "@/lib/seo/rss";
import { useT } from "@/i18n/LangProvider";

type Props = {
  activeCount: number;
};

export default function BlogStatsBar({ activeCount }: Props) {
  const { fa, dir, d, fd } = useT();
  const ui = d.blogUi;

  return (
    <div dir={dir} className="border-b border-paper/15 bg-paper/[0.015] px-4 py-3 sm:px-6 lg:px-8">
      <div className={`mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-[11px] text-paper/45 ${fa ? "font-fa" : "font-mono"}`}>
        <p className="flex flex-wrap items-center gap-x-1 gap-y-1">
            <span>
              {fd(activeCount)} {ui.articlesLabel}
            </span>
            <span className="text-paper/25" aria-hidden>
              ,
            </span>
            <span>
              {fd(BLOG_CATEGORIES.length)} {ui.categoriesLabel}
            </span>
            <span className="text-paper/25" aria-hidden>
              ,
            </span>
            <span>
              {fd(BLOG_POSTS.length)} {ui.totalLabel}
            </span>
        </p>
        <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1">
          <Link
            href={getBlogRssFeedPath("en")}
            className="inline-flex items-center gap-1.5 text-paper/40 transition-colors hover:text-term"
            data-skip-ajax="true"
          >
            <span className="text-term/50">▸</span>
            {ui.rssLinkEn}
          </Link>
          <Link
            href={getBlogRssFeedPath("fa")}
            className="inline-flex items-center gap-1.5 text-paper/40 transition-colors hover:text-term"
            data-skip-ajax="true"
          >
            <span className="text-term/50">▸</span>
            {ui.rssLinkFa}
          </Link>
        </span>
      </div>
    </div>
  );
}
