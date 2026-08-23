"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { scheduleUpdate } from "@/lib/react/schedule-update";
import InnerPage from "@/components/layout/InnerPage";
import BlogCategoryFilter, { type BlogFilter } from "@/components/blog/BlogCategoryFilter";
import BlogFeaturedPost from "@/components/blog/BlogFeaturedPost";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogStatsBar from "@/components/blog/BlogStatsBar";
import FinalCta from "@/components/sales/FinalCta";
import BreadcrumbNav from "@/components/seo/BreadcrumbNav";
import { InteractiveJumpPagination } from "@/components/shadcn-space/pagination/pagination-03";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import {
  BLOG_POSTS,
  getFeaturedPosts,
  isBlogCategory,
  type BlogCategorySlug,
} from "@/config/blog";
import { useT } from "@/i18n/LangProvider";

const MODERN_PAGE_SIZE = 6;

function sortPosts(posts: typeof BLOG_POSTS) {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

function BlogClientInner() {
  const searchParams = useSearchParams();
  const { fa, dir, d, t, fd } = useT();
  const [skin] = usePanelSkin();
  const modern = skin === "modern";
  const page = d.pages.blog;
  const ui = d.blogUi;

  const breadcrumbs = useMemo(
    () => [{ name: t("nav.home"), href: "/" }, { name: page.title }],
    [t, page.title],
  );

  const initialFilter = useMemo((): BlogFilter => {
    const cat = searchParams.get("category");
    if (cat && isBlogCategory(cat)) return cat;
    return "all";
  }, [searchParams]);

  const [filter, setFilter] = useState<BlogFilter>(initialFilter);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    scheduleUpdate(() => setFilter(initialFilter));
  }, [initialFilter]);

  useEffect(() => {
    setPageIndex(1);
  }, [filter]);

  const counts = useMemo(() => {
    const base: Record<BlogFilter, number> = {
      all: BLOG_POSTS.length,
      web: 0,
      design: 0,
      seo: 0,
      mobile: 0,
      product: 0,
      ai: 0,
    };
    for (const post of BLOG_POSTS) {
      base[post.category as BlogCategorySlug] += 1;
    }
    return base;
  }, []);

  const featured = getFeaturedPosts()[0] ?? null;

  const filtered = useMemo(() => {
    const sorted = sortPosts(BLOG_POSTS);
    if (filter === "all") {
      if (featured) {
        return sorted.filter((p) => p.slug !== featured.slug);
      }
      return sorted;
    }
    return sorted.filter((p) => p.category === filter);
  }, [filter, featured]);

  const totalPages = modern
    ? Math.max(1, Math.ceil(filtered.length / MODERN_PAGE_SIZE))
    : 1;

  const pagedPosts = useMemo(() => {
    if (!modern) return filtered;
    const start = (pageIndex - 1) * MODERN_PAGE_SIZE;
    return filtered.slice(start, start + MODERN_PAGE_SIZE);
  }, [filtered, modern, pageIndex]);

  useEffect(() => {
    if (pageIndex > totalPages) setPageIndex(totalPages);
  }, [pageIndex, totalPages]);

  const handlePageChange = useCallback((next: number) => {
    setPageIndex(next);
    if (typeof window !== "undefined") {
      document.getElementById("blog-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleFilterChange = useCallback((next: BlogFilter) => {
    setFilter(next);
    const url = next === "all" ? "/blog" : `/blog?category=${next}`;
    window.history.replaceState(null, "", url);
  }, []);

  return (
    <>
      <InnerPage
        eyebrow={page.eyebrow}
        title={page.title}
        subtitle={page.subtitle}
        lines={page.lines.length > 0 ? page.lines : undefined}
      >
        {breadcrumbs.length > 0 && (
          <div className="mb-6">
            <BreadcrumbNav items={breadcrumbs} fa={fa} />
          </div>
        )}
      </InnerPage>

      <BlogStatsBar activeCount={filtered.length} />

      <BlogCategoryFilter active={filter} onChange={handleFilterChange} counts={counts} />

      {filter === "all" && featured && <BlogFeaturedPost post={featured} />}

      {filtered.length > 0 ? (
        <>
          <div id="blog-grid">
            <BlogGrid
              posts={pagedPosts}
              showFeaturedSpan={false}
              sectionTitle={filter === "all" ? ui.allArticlesLabel : ui.categories[filter]}
              dir={dir}
              fa={fa}
            />
          </div>
          {modern && totalPages > 1 ? (
            <div className="px-4 pb-12 sm:px-6 lg:px-8">
              <InteractiveJumpPagination
                page={pageIndex}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                ofLabel={ui.pageOf}
                goLabel={ui.pageGo}
                previousLabel={ui.pagePrev}
                nextLabel={ui.pageNext}
                formatNumber={fd}
                rtl={fa}
                className={fa ? "font-iran" : "font-iran"}
              />
            </div>
          ) : null}
        </>
      ) : (
        <p
          dir={dir}
          className={`px-4 py-16 text-center text-sm text-paper/50 sm:px-6 lg:px-8 ${fa ? "font-fa" : ""}`}
          role="status"
        >
          {d.blogUi.noPosts}
        </p>
      )}

      <FinalCta plain />
    </>
  );
}

export default function BlogClient() {
  return (
    <Suspense fallback={null}>
      <BlogClientInner />
    </Suspense>
  );
}
