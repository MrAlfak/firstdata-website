"use client";



import Link from "next/link";

import { motion } from "motion/react";

import { moduleReveal, itemReveal } from "@/motion/tokens";

import { Decode } from "@/components/Decode";

import BlogPostCard from "@/components/blog/BlogPostCard";

import BlogArticleBody from "@/components/blog/BlogArticleBody";

import BlogTableOfContents from "@/components/blog/BlogTableOfContents";

import BlogShareBar from "@/components/blog/BlogShareBar";

import BlogPostNav from "@/components/blog/BlogPostNav";

import FinalCta from "@/components/sales/FinalCta";

import {

  BLOG_AUTHOR,

  getAdjacentPosts,

  getRelatedPosts,

  type BlogPost,

} from "@/config/blog";

import { formatBlogDate, categoryLabel, getReadMinutes } from "@/lib/blog";

import { SITE_URL } from "@/lib/seo/site";

import { useT } from "@/i18n/LangProvider";



type Props = {
  post: BlogPost;
};

export default function BlogPostClient({ post }: Props) {
  const { lang, fa, dir, d, fd } = useT();

  const content = lang === "fa" ? post.fa : post.en;

  const ui = d.blogUi;

  const author = BLOG_AUTHOR[lang];

  const related = getRelatedPosts(post.slug, 3);

  const { prev, next } = getAdjacentPosts(post.slug);

  const date = formatBlogDate(post.publishedAt, lang);

  const cat = categoryLabel(post.category, ui.categories);

  const minutes = getReadMinutes(post, lang);

  const shareUrl = `${SITE_URL}/blog/${post.slug}`;

  return (

    <>

      <motion.article

        variants={moduleReveal}

        initial="hidden"

        animate="show"

        className="border-b border-paper/20 px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-8 lg:px-8"

      >

        <div className="mx-auto max-w-3xl">

          <motion.div variants={itemReveal}>

            <Link

              href="/blog"

              dir={dir}

              className={`mb-6 inline-flex items-center gap-2 text-xs text-paper/45 transition-colors hover:text-term ${fa ? "font-fa" : "font-mono"}`}

            >

              {fa ? "→" : "←"}

              {ui.backToBlog}

            </Link>

          </motion.div>



          <motion.p

            variants={itemReveal}

            dir={dir}

            className={`mb-4 text-[10px] text-paper/30 ${fa ? "font-fa" : "ascii"}`}

          >

            <Decode>{`> loading /blog/${post.slug}...`}</Decode>

          </motion.p>



          <motion.div

            variants={itemReveal}

            dir={dir}

            className="mb-4 flex flex-wrap items-center gap-2"

          >

            <span

              className={`border border-term/25 bg-term/10 px-2 py-0.5 font-mono text-[10px] text-term ${fa ? "font-fa" : ""}`}

            >

              {cat}

            </span>

            <span className={`text-[10px] text-paper/40 ${fa ? "font-fa" : "font-mono"}`}>

              {date}

            </span>

            <span className={`text-[10px] text-paper/35 ${fa ? "font-fa" : "font-mono"}`}>

              {fd(minutes)} {ui.minRead}

            </span>

          </motion.div>



          <motion.h1

            variants={itemReveal}

            dir={dir}

            className={`text-2xl leading-tight tracking-tight sm:text-3xl lg:text-4xl ${fa ? "font-fa" : "font-pixel"}`}

          >

            {content.title}

          </motion.h1>



          <motion.p

            variants={itemReveal}

            dir={dir}

            className={`mt-2 text-xs text-paper/40 ${fa ? "font-fa" : "font-mono"}`}

          >

            {ui.writtenBy} {author.name}, {author.role}

          </motion.p>



          <motion.p

            variants={itemReveal}

            dir={dir}

            className={`mt-5 text-base leading-relaxed text-paper/65 sm:text-lg ${fa ? "font-fa" : ""}`}

          >

            {content.excerpt}

          </motion.p>



          {post.tags && post.tags.length > 0 && (

            <motion.div variants={itemReveal} className="mt-4 flex flex-wrap gap-2" dir={dir}>

              {post.tags.map((tag) => (

                <span

                  key={tag}

                  className={`border border-paper/15 px-2 py-0.5 font-mono text-[10px] text-paper/40 ${fa ? "font-fa" : ""}`}

                >

                  #{tag}

                </span>

              ))}

            </motion.div>

          )}



          <motion.div variants={itemReveal} className="mt-8">

            <BlogTableOfContents body={content.body} title={ui.tableOfContents} fa={fa} dir={dir} />

          </motion.div>



          <motion.div

            variants={itemReveal}

            dir={dir}

            className="mt-6 border border-paper/10 bg-paper/[0.015] p-5 sm:p-8"

          >

            <BlogArticleBody body={content.body} fa={fa} />

            <BlogShareBar url={shareUrl} title={content.title} />

            <BlogPostNav prev={prev} next={next} />

          </motion.div>

        </div>

      </motion.article>



      {related.length > 0 && (

        <section className="border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

          <div className="mx-auto max-w-6xl">

            <h2

              dir={dir}

              className={`mb-6 text-lg tracking-tight text-paper/80 sm:mb-8 sm:text-xl ${fa ? "font-fa" : "font-pixel"}`}

            >

              {ui.relatedTitle}

            </h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">

              {related.map((rel, i) => (

                <BlogPostCard key={rel.slug} post={rel} index={i} compact />

              ))}

            </div>

          </div>

        </section>

      )}



      <FinalCta plain />

    </>

  );

}


