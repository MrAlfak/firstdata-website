"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import type { BlogPost } from "@/config/blog";
import { BLOG_AUTHOR } from "@/config/blog";
import { formatBlogDate, categoryLabel, getReadMinutes } from "@/lib/blog";
import { useT } from "@/i18n/LangProvider";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";

type Props = {
  post: BlogPost;
};

export default function BlogFeaturedPost({ post }: Props) {
  const { lang, fa, dir, d, fd } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const face = ai ? "font-iran" : fa ? "font-fa" : "";
  const content = lang === "fa" ? post.fa : post.en;
  const ui = d.blogUi;
  const author = BLOG_AUTHOR[lang];
  const cat = categoryLabel(post.category, ui.categories);
  const date = formatBlogDate(post.publishedAt, lang);
  const minutes = getReadMinutes(post, lang);

  return (
    <motion.section
      variants={moduleReveal}
      initial="hidden"
      animate="show"
      className={`border-b px-4 py-8 sm:px-6 sm:py-10 lg:px-8 ${
        ai ? "ai-section border-paper/10" : "border-paper/20"
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          variants={itemReveal}
          dir={dir}
          className={
            ai
              ? `ai-eyebrow mb-4 ${face}`
              : `mb-4 text-[10px] uppercase tracking-widest text-term/70 ${fa ? "font-fa" : "font-mono"}`
          }
        >
          {ui.featuredLabel}
        </motion.p>

        <motion.article
          variants={itemReveal}
          className={
            ai
              ? "overflow-hidden rounded-2xl border border-paper/10 bg-paper/[0.03]"
              : "overflow-hidden border border-term/25 bg-gradient-to-br from-term/[0.06] via-paper/[0.02] to-paper/[0.01]"
          }
        >
          {!ai ? (
            <div className="flex items-center gap-1.5 border-b border-paper/15 bg-paper/[0.04] px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
              <span className="ms-auto font-mono text-[9px] text-paper/30" dir="ltr">
                featured, {post.slug}
              </span>
            </div>
          ) : null}

          <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-10">
            <div dir={dir}>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span
                  className={`border border-term/35 bg-term/15 px-2 py-0.5 text-[10px] text-term ${
                    ai ? `rounded-md ${face}` : "font-mono"
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

              <h2
                className={`text-2xl leading-tight tracking-tight text-paper sm:text-3xl lg:text-4xl ${
                  ai ? "ai-display font-iran font-medium" : fa ? "font-fa" : "font-pixel"
                }`}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="outline-none hover:text-term focus-visible:underline"
                >
                  {content.title}
                </Link>
              </h2>

              <p className={`mt-4 text-base leading-relaxed text-paper/65 sm:text-lg ${face}`}>
                {content.excerpt}
              </p>

              <p className={`mt-4 text-xs text-paper/40 ${face || (fa ? "font-fa" : "font-mono")}`}>
                {ui.writtenBy} {author.name}, {author.role}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className={`mt-6 inline-flex items-center gap-2 border border-paper/30 px-5 py-2.5 text-sm text-paper/75 transition-colors hover:border-term/50 hover:text-term ${
                  ai ? `rounded-xl ${face}` : fa ? "font-fa" : "font-mono"
                }`}
              >
                {ui.readFull}
                <span aria-hidden>{fa ? "←" : "→"}</span>
              </Link>
            </div>

            {!ai ? (
              <div
                dir="ltr"
                className="hidden border border-paper/10 bg-ink/40 p-4 font-mono text-[10px] leading-relaxed text-paper/45 lg:block"
              >
                <p className="text-term/60">$ cat featured.meta</p>
                <p className="mt-2">slug: {post.slug}</p>
                <p>category: {post.category}</p>
                <p>published: {post.publishedAt}</p>
                <p>read, time: {minutes}m</p>
                {post.tags && post.tags.length > 0 && <p>tags: {post.tags.join(", ")}</p>}
                <p className="mt-3 animate-blink text-term/50">▮</p>
              </div>
            ) : (
              <div
                className={`hidden rounded-xl border border-paper/10 bg-paper/[0.04] p-6 lg:block ${face}`}
              >
                <p className="text-sm leading-relaxed text-paper/50">{content.excerpt}</p>
                <p className="mt-4 text-xs text-paper/35">
                  {date} · {fd(minutes)} {ui.minRead}
                </p>
              </div>
            )}
          </div>
        </motion.article>
      </div>
    </motion.section>
  );
}
