"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { itemReveal } from "@/motion/tokens";
import type { BlogPost } from "@/config/blog";
import { formatBlogDate, categoryLabel, getReadMinutes } from "@/lib/blog";
import { useT } from "@/i18n/LangProvider";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";

type Props = {
  post: BlogPost;
  index: number;
  featured?: boolean;
  compact?: boolean;
};

export default function BlogPostCard({ post, index, featured = false, compact = false }: Props) {
  const { lang, fa, dir, d, fd } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const face = ai ? "font-iran" : fa ? "font-fa" : "";
  const content = lang === "fa" ? post.fa : post.en;
  const ui = d.blogUi;
  const cat = categoryLabel(post.category, ui.categories);
  const num = String(index + 1).padStart(2, "0");
  const date = formatBlogDate(post.publishedAt, lang);
  const minutes = getReadMinutes(post, lang);
  const tags = post.tags?.slice(0, 2) ?? [];

  return (
    <motion.article
      variants={itemReveal}
      className={`group flex h-full flex-col overflow-hidden border transition-colors duration-200 hover:border-term/30 hover:bg-paper/[0.03] ${
        ai
          ? "rounded-2xl border-paper/10 bg-paper/[0.03]"
          : "border-paper/20 bg-paper/[0.015]"
      } ${featured && !compact ? "lg:col-span-2" : ""}`}
    >
      {!ai ? (
        <div className="flex items-center gap-1.5 border-b border-paper/15 bg-paper/[0.04] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
          <span className="ms-auto font-mono text-[9px] text-paper/30" dir="ltr">
            post.{fd(num)}, {post.slug}
          </span>
        </div>
      ) : null}

      <div className={`flex flex-1 flex-col p-4 sm:p-5 ${compact ? "p-4" : ""}`}>
        <div dir={dir} className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className={`border border-amber/30 bg-amber/10 px-2 py-0.5 text-[10px] text-amber/90 ${
              ai ? `rounded-md ${face}` : `font-mono ${fa ? "font-fa" : ""}`
            }`}
          >
            {cat}
          </span>
          <span className={`text-[10px] text-paper/40 ${face || (fa ? "font-fa" : "font-mono")}`}>
            {date}
          </span>
          <span className={`text-[10px] text-paper/35 ${face || (fa ? "font-fa" : "font-mono")}`}>
            {fd(minutes)} {ui.minRead}
          </span>
        </div>

        {tags.length > 0 && (
          <div dir={dir} className="mb-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`border border-paper/10 px-1.5 py-0.5 text-[9px] text-paper/35 ${
                  ai ? `rounded-md ${face}` : `font-mono ${fa ? "font-fa" : ""}`
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <h2
          dir={dir}
          className={`text-base font-normal leading-snug tracking-tight text-paper/90 transition-colors group-hover:text-paper sm:text-lg ${
            featured && !compact ? "sm:text-xl" : ""
          } ${ai ? "font-medium font-iran" : fa ? "font-fa" : "font-pixel"}`}
        >
          <Link href={`/blog/${post.slug}`} className="outline-none focus-visible:underline">
            {content.title}
          </Link>
        </h2>

        <p
          dir={dir}
          className={`mt-3 flex-1 text-sm leading-relaxed text-paper/55 ${face} ${
            featured && !compact ? "sm:text-base" : ""
          }`}
        >
          {content.excerpt}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          dir={dir}
          className={`mt-4 inline-flex items-center gap-2 text-xs text-paper/50 transition-colors duration-200 group-hover:text-term ${
            ai
              ? `font-iran normal-case tracking-normal`
              : `uppercase tracking-wider ${fa ? "font-fa" : "font-mono"}`
          }`}
        >
          {ui.readMore}
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">
            {fa ? "←" : "->"}
          </span>
        </Link>
      </div>
    </motion.article>
  );
}
