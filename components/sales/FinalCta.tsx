"use client";



import Link from "next/link";
import { motion } from "motion/react";

import { moduleReveal, itemReveal } from "@/motion/tokens";

import { Decode } from "@/components/Decode";

import { useT } from "@/i18n/LangProvider";



type Props = {

  /** Homepage: plain copy, no terminal panel */

  plain?: boolean;

};



export default function FinalCta({ plain = false }: Props) {

  const { fa, dir, d } = useT();

  const cta = plain ? d.home.start : d.finalCta;



  return (

    <motion.section

      id="start"

      variants={moduleReveal}

      initial="hidden"

      whileInView="show"

      viewport={{ once: true, margin: "-15% 0px" }}

      className="scroll-mt-16 border-b border-paper/20 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"

    >

      <div className={`mx-auto max-w-4xl ${plain ? "text-center" : "text-center"}`}>

        <motion.p

          variants={itemReveal}

          dir={dir}

          className={`mb-3 text-sm txt-comment ${fa ? "font-fa" : plain ? "" : "ascii"}`}

        >

          {plain ? cta.eyebrow : <Decode>{(cta as typeof d.finalCta).eyebrow}</Decode>}

        </motion.p>



        <motion.h2

          variants={itemReveal}

          dir={dir}

          className={`text-2xl font-normal leading-snug tracking-tight text-paper sm:text-3xl lg:text-4xl ${fa ? "font-fa" : plain ? "" : "font-pixel"}`}

        >

          {cta.title}

        </motion.h2>



        <motion.p

          variants={itemReveal}

          dir={dir}

          className={`mx-auto mt-5 max-w-xl text-base leading-relaxed text-paper/65 sm:mt-6 sm:text-lg ${fa ? "font-fa" : ""}`}

        >

          {cta.subtitle}

        </motion.p>



        {!plain && (

          <motion.div variants={itemReveal} className="mx-auto mt-8 max-w-sm">

            <div className="flex items-center gap-1.5 border border-b-0 border-paper/20 bg-paper/[0.04] px-3 py-2">

              <span className="h-2 w-2 rounded-full bg-[#ff5f57]/70" />

              <span className="h-2 w-2 rounded-full bg-[#febc2e]/70" />

              <span className="h-2 w-2 rounded-full bg-[#28c840]/70" />

              <span className="ml-auto font-mono text-[9px] text-paper/20">

                {fa ? "وضعیت سیستم" : "system-status"}

              </span>

            </div>

            <div className="border border-paper/20 bg-paper/[0.015] p-4 text-left">

              <pre className="ascii text-[9px] leading-relaxed text-paper/40 sm:text-[10px]">

                {fa

                  ? `> وضعیت: آنلاین        [OK]

> پاسخ: ۱ روز کاری   [OK]

> ظرفیت: موجود       [OK]

> مشاوره: رایگان     [OK]`

                  : `> status:  online       [OK]

> reply:   1 biz day  [OK]

> slots:   available  [OK]

> consult: free       [OK]`}

              </pre>

              <div className="mt-3 flex items-center gap-1 font-mono text-[10px] text-paper/20">

                <span>root@fd:~$</span>

                <span className="animate-blink ml-0.5 text-term/60">▮</span>

              </div>

            </div>

          </motion.div>

        )}



        {plain && (

          <motion.p

            variants={itemReveal}

            dir={dir}

            className={`mt-4 text-sm text-paper/45 ${fa ? "font-fa" : ""}`}

          >

            {(cta as typeof d.home.start).responseNote}

          </motion.p>

        )}



        <motion.div

          variants={itemReveal}

          className="mt-8 flex justify-center"

          dir={dir}

        >

          <Link

            href="/contactus"

            className={`border border-paper/30 px-8 py-3.5 text-base text-paper/75 transition-colors duration-200 hover:border-paper hover:text-paper ${fa ? "font-fa" : ""}`}

          >

            {plain ? (cta as typeof d.home.start).cta : (cta as typeof d.finalCta).ctaSecondary}

          </Link>

        </motion.div>



        <motion.div

          variants={itemReveal}

          className="mt-8 flex flex-col items-center gap-2 text-sm text-paper/40 sm:flex-row sm:justify-center sm:gap-6"

        >

          <a

            href="mailto:info@firstdata.ir"

            className="font-mono transition-colors duration-200 hover:text-paper/70"

          >

            info@firstdata.ir

          </a>

          <span className="font-mono" dir="ltr">

            {d.contact.directPhone}

          </span>

        </motion.div>

      </div>

    </motion.section>

  );

}

