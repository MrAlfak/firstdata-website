"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import TermIcon from "@/components/icons/TermIcon";
import { useT } from "@/i18n/LangProvider";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";

export default function HomeProductsRow() {
  const { fa, dir, d } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const block = d.home.products;
  const face = ai ? "font-iran" : fa ? "font-fa" : "";

  return (
    <motion.section
      id="products-quick"
      aria-labelledby="home-products-title"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={`scroll-mt-16 border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 ${ai ? "ai-section" : ""}`}
    >
      <div className={`mx-auto ${ai ? "max-w-7xl" : "max-w-6xl"}`}>
        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mb-3 text-sm txt-comment ${ai ? "ai-eyebrow" : ""} ${face}`}
        >
          {block.eyebrow}
        </motion.p>

        <motion.div
          variants={itemReveal}
          dir={dir}
          className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8"
        >
          <div className="min-w-0 flex-1">
            <h2
              id="home-products-title"
              className={`${
                ai
                  ? "ai-display text-paper"
                  : `text-2xl font-normal leading-snug tracking-tight text-paper sm:text-3xl ${face}`
              }`}
            >
              {block.title}
            </h2>
            <p
              className={`mt-4 max-w-2xl leading-relaxed text-paper/65 ${
                ai ? "text-lg sm:text-xl" : "text-lg sm:text-xl"
              } ${face}`}
            >
              {block.subtitle}
            </p>
            {!ai ? <p className={`mt-2 text-base text-paper/55 ${face}`}>{block.hint}</p> : null}
          </div>

          <Link
            href="/product"
            dir={dir}
            className={`inline-flex shrink-0 items-center gap-2 self-start text-sm transition-colors sm:mt-1 ${
              ai
                ? "border-0 px-0 py-0 font-medium text-paper/55 hover:text-paper"
                : "border border-paper/25 px-5 py-2.5 text-paper/70 hover:border-paper/45 hover:text-paper"
            } ${face}`}
          >
            {fa ? (
              <>
                <span aria-hidden>←</span>
                {block.allLink}
              </>
            ) : (
              <>
                {block.allLink}
                <span aria-hidden>→</span>
              </>
            )}
          </Link>
        </motion.div>

        <motion.ul
          variants={itemReveal}
          className={`mt-10 ${
            ai
              ? "grid gap-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
              : "flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3 lg:gap-5 xl:grid-cols-5"
          }`}
          dir={dir}
        >
          {block.items.map((item) => (
            <li key={item.slug} className={ai ? "" : "min-w-[240px] snap-start sm:min-w-0"}>
              <Link
                href={`/product/${item.slug}`}
                className={`group flex h-full flex-col transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-term/60 ${
                  ai
                    ? `ai-link-row ${face}`
                    : `min-h-[168px] rounded-sm border border-paper/15 bg-paper/[0.02] p-5 hover:border-paper/35 hover:bg-paper/[0.05] ${face}`
                }`}
              >
                <div className="flex items-center gap-3">
                  <TermIcon name={item.slug} plain />
                  <span
                    className={`min-w-0 flex-1 leading-snug text-paper ${
                      ai ? "text-base font-medium sm:text-lg" : "text-lg font-normal"
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
                <span
                  className={`mt-2 flex-1 leading-relaxed text-paper/55 ${
                    ai ? "text-sm" : "mt-3 text-base text-paper/70"
                  }`}
                >
                  {item.desc}
                </span>
                <span
                  dir={dir}
                  className={`mt-3 inline-flex items-center gap-1.5 text-sm transition-colors group-hover:text-term ${
                    ai ? "text-paper/45" : "mt-4 text-paper/65"
                  }`}
                >
                  {fa ? (
                    <>
                      <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
                        ←
                      </span>
                      {item.cta}
                    </>
                  ) : (
                    <>
                      {item.cta}
                      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  );
}
