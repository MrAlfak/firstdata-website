"use client";

import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import TermIcon from "@/components/icons/TermIcon";
import { useT } from "@/i18n/LangProvider";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import {
  REVIEW_PROFILE_FALLBACKS,
  TestimonialMarquee,
  type ReviewItem,
} from "@/components/shadcn-space/marquee/marquee-01";

function mapTestimonialsToReviews(
  items: { name: string; role: string; text: string }[],
): ReviewItem[] {
  const mapped = items.map((item, i) => ({
    name: item.name,
    username: item.role,
    body: item.text,
    profile: REVIEW_PROFILE_FALLBACKS[i % REVIEW_PROFILE_FALLBACKS.length],
  }));
  // Dual-row marquee needs enough cards; pad by repeating when few items.
  if (mapped.length > 0 && mapped.length < 6) {
    return [...mapped, ...mapped];
  }
  return mapped;
}

export default function WhyUs() {
  const { fa, dir, d } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const why = d.home.why;
  const face = ai ? "font-iran" : fa ? "font-fa" : "";

  if (ai) {
    const tmt = d.testimonials;
    const reviews = mapTestimonialsToReviews(tmt.items);

    return (
      <motion.section
        id="testimonials"
        aria-labelledby="home-testimonials-title"
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15% 0px" }}
        className="ai-section scroll-mt-16 border-b border-paper/20 px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <motion.h2
            id="home-testimonials-title"
            variants={itemReveal}
            dir={dir}
            className={`ai-display mb-5 max-w-3xl text-paper sm:mb-6 ${face}`}
          >
            {tmt.title}
          </motion.h2>
          <motion.div variants={itemReveal}>
            <TestimonialMarquee reviews={reviews} />
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      id="why"
      variants={moduleReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px" }}
      className="scroll-mt-16 border-b border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mb-3 text-sm txt-comment ${face}`}
        >
          {why.eyebrow}
        </motion.p>

        <motion.h2
          variants={itemReveal}
          dir={dir}
          className={`text-2xl font-normal leading-snug tracking-tight text-paper sm:text-3xl lg:text-4xl ${face}`}
        >
          {why.title}
        </motion.h2>

        <motion.p
          variants={itemReveal}
          dir={dir}
          className={`mt-5 max-w-2xl text-lg leading-relaxed text-paper/65 sm:text-xl ${face}`}
        >
          {why.subtitle}
        </motion.p>

        <motion.div
          variants={itemReveal}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5"
        >
          {why.points.map((pt, i) => (
            <div
              key={i}
              className={`group flex gap-4 rounded-sm border border-paper/12 bg-paper/[0.02] p-5 transition-colors hover:border-paper/28 hover:bg-paper/[0.04] ${face}`}
              dir={dir}
            >
              <TermIcon
                name={pt.icon}
                plain
                size="md"
                className="shrink-0 [&_i]:text-[1.75rem]"
              />
              <div>
                <p className="text-base font-normal text-paper">{pt.label}</p>
                <p className="mt-2 text-base leading-relaxed text-paper/70 sm:text-lg">
                  {pt.text}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
