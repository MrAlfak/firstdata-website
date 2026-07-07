"use client";

import { motion } from "motion/react";
import { moduleReveal } from "@/motion/tokens";
import type { BlogPost } from "@/config/blog";
import BlogPostCard from "./BlogPostCard";

type Props = {
  posts: BlogPost[];
  showFeaturedSpan?: boolean;
  sectionTitle?: string;
  dir?: "ltr" | "rtl";
  fa?: boolean;
};

export default function BlogGrid({
  posts,
  showFeaturedSpan = true,
  sectionTitle,
  dir = "ltr",
  fa = false,
}: Props) {
  return (
    <div className="relative px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(51, 255, 102, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(51, 255, 102, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {sectionTitle && (
          <h2
            dir={dir}
            className={`mb-6 text-sm uppercase tracking-widest text-paper/40 sm:mb-8 ${fa ? "font-fa" : "font-mono"}`}
          >
            {sectionTitle}
          </h2>
        )}
        <motion.div
          key={posts.map((p) => p.slug).join(",")}
          variants={moduleReveal}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {posts.map((post, i) => (
            <BlogPostCard
              key={post.slug}
              post={post}
              index={i}
              featured={showFeaturedSpan && post.featured && i === 0}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
