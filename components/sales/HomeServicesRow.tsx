"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import TermIcon from "@/components/icons/TermIcon";
import {
  Integration,
  IntegrationCard,
} from "@/components/shadcn-space/card/card-19";
import { useT } from "@/i18n/LangProvider";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";

export default function HomeServicesRow() {
  const { fa, dir, d } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const face = ai ? "font-iran" : fa ? "font-fa" : "";
  const block = d.home.services;

  return (
    <motion.section
      id="services-quick"
      aria-labelledby="home-services-title"
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
              id="home-services-title"
              className={
                ai
                  ? "ai-display text-paper"
                  : `text-2xl font-normal leading-snug tracking-tight text-paper sm:text-3xl ${face}`
              }
            >
              {block.title}
            </h2>
            <p className={`mt-4 max-w-2xl text-lg leading-relaxed text-paper/65 sm:text-xl ${face}`}>
              {block.subtitle}
            </p>
            {!ai ? <p className={`mt-2 text-base text-paper/55 ${face}`}>{block.hint}</p> : null}
          </div>

          <Link
            href="/services"
            dir={dir}
            className={`inline-flex shrink-0 items-center gap-2 self-start border border-paper/25 px-5 py-2.5 text-sm text-paper/70 transition-colors hover:border-paper/45 hover:text-paper sm:mt-1 ${face}`}
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

        {ai ? (
          <motion.ul
            variants={itemReveal}
            className="mt-10 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-4"
            dir={dir}
          >
            {block.items.map((item) => (
              <li key={item.slug} className="min-w-0">
                <IntegrationCard
                  visual={<Integration slug={item.slug} />}
                  title={item.title}
                  description={item.desc}
                  url={`/services/${item.slug}`}
                  ctaLabel={item.cta}
                  className={face}
                />
              </li>
            ))}
          </motion.ul>
        ) : (
          <motion.ul
            variants={itemReveal}
            className="mt-10 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4 lg:gap-5"
            dir={dir}
          >
            {block.items.map((item) => (
              <li key={item.slug} className="min-w-[240px] snap-start sm:min-w-0">
                <Link
                  href={`/services/${item.slug}`}
                  className={`group flex h-full min-h-[168px] flex-col rounded-sm border border-paper/15 bg-paper/[0.02] p-5 transition-all duration-200 hover:border-paper/35 hover:bg-paper/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-term/60 ${face}`}
                >
                  <div className="flex items-center gap-3">
                    <TermIcon name={item.slug} plain />
                    <span className="min-w-0 flex-1 text-lg font-normal leading-snug text-paper">
                      {item.title}
                    </span>
                  </div>
                  <span className="mt-3 flex-1 text-base leading-relaxed text-paper/70">
                    {item.desc}
                  </span>
                  <span
                    dir={dir}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm text-paper/65 transition-colors group-hover:text-term"
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
        )}
      </div>
    </motion.section>
  );
}
