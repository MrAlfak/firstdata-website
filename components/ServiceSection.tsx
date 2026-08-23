"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import { Decode } from "@/components/Decode";
import { useT } from "@/i18n/LangProvider";
import serviceAscii from "@/components/service-ascii";
import FitBox from "@/components/games/FitBox";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";

const GAMES: Record<string, React.ComponentType> = {
  "01": dynamic(() => import("@/components/games/DinoGame"), { ssr: false }),
  "02": dynamic(() => import("@/components/games/SnakeGame"), { ssr: false }),
  "03": dynamic(() => import("@/components/games/FlappyGame"), { ssr: false }),
  "04": dynamic(() => import("@/components/games/MinesweeperGame"), { ssr: false }),
  "05": dynamic(() => import("@/components/games/WordleGame"), { ssr: false }),
  "06": dynamic(() => import("@/components/games/SimonGame"), { ssr: false }),
  "07": dynamic(() => import("@/components/games/CatchGame"), { ssr: false }),
  "08": dynamic(() => import("@/components/games/WhackGame"), { ssr: false }),
};

type Props = {
  number: string; // "01" … "09"
};

export default function ServiceSection({ number }: Props) {
  const { fa, dir, d, t, fd } = useT();
  const svc = d.services[number];
  const ascii = serviceAscii[number];
  const [skin] = usePanelSkin();
  const ai = skin === "modern";

  if (!svc) return null;

  if (ai) {
    const stackBits = svc.stack
      .split("///")
      .map((s) => s.trim())
      .filter(Boolean);

    return (
      <motion.section
        id={`service-${number}`}
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15% 0px" }}
        className="ai-section scroll-mt-16 border-b border-paper/10 px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div className="flex flex-col">
              <motion.p
                variants={itemReveal}
                dir={dir}
                className={`ai-eyebrow mb-4 ${fa ? "font-iran" : "font-iran"}`}
              >
                {svc.tag}
              </motion.p>

              <motion.h2
                variants={itemReveal}
                dir={dir}
                className={`ai-display text-2xl font-medium leading-tight tracking-tight text-paper sm:text-3xl lg:text-4xl ${fa ? "font-iran" : "font-iran"}`}
              >
                {svc.title}
              </motion.h2>

              <motion.p
                variants={itemReveal}
                dir={dir}
                className={`mt-4 text-base leading-relaxed text-paper/55 sm:text-lg ${fa ? "font-iran" : "font-iran"}`}
              >
                {svc.subtitle}
              </motion.p>

              <motion.ul
                variants={itemReveal}
                dir={dir}
                className={`mt-8 space-y-3 ${fa ? "font-iran" : "font-iran"}`}
              >
                {svc.bullets.map((bullet, i) => (
                  <li key={i} className="ai-point text-sm leading-relaxed text-paper/65 sm:text-base">
                    {bullet}
                  </li>
                ))}
              </motion.ul>

              <motion.div variants={itemReveal} className="mt-10">
                <Link
                  href="/contactus"
                  dir={dir}
                  className={`inline-flex items-center gap-2 rounded-xl bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-paper/90 ${fa ? "font-iran" : "font-iran"}`}
                >
                  {svc.cta}
                  <span aria-hidden className="opacity-70">
                    {fa ? "←" : "→"}
                  </span>
                </Link>
              </motion.div>
            </div>

            <motion.div
              variants={itemReveal}
              className={`flex flex-col justify-center rounded-2xl border border-paper/10 bg-paper/[0.03] p-6 sm:p-8 ${fa ? "font-iran" : "font-iran"}`}
            >
              <p className="text-[11px] uppercase tracking-wider text-paper/35">
                {fa ? "فناوری" : "Stack"}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {stackBits.map((bit) => (
                  <span
                    key={bit}
                    className="rounded-lg border border-paper/10 bg-paper/[0.04] px-3 py-1.5 text-xs text-paper/70"
                  >
                    {bit}
                  </span>
                ))}
              </div>
              <p className="mt-8 text-sm leading-relaxed text-paper/45">
                {fa
                  ? "مشاوره رایگان برای انتخاب مسیر درست — بدون تعهد."
                  : "Free consult to pick the right path — no commitment."}
              </p>
              <Link
                href="/contactus"
                className="mt-3 text-sm text-term transition-colors hover:text-paper"
              >
                {t("nav.contact")} {fa ? "←" : "→"}
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      id={`service-${number}`}
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
          className={`mb-4 text-[10px] text-paper/30 ${fa ? "font-fa" : "ascii"}`}
        >
          <Decode>
            {fa
              ? `> در حال بارگذاری سرویس ${fd(number)}... [ ${svc.tag} ]`
              : `> initializing service ${number}... [ ${svc.tag} ]`}
          </Decode>
        </motion.p>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="flex flex-col">
            <motion.h2
              variants={itemReveal}
              dir={dir}
              className={`text-2xl font-normal leading-tight tracking-tight sm:text-3xl lg:text-4xl ${fa ? "font-fa" : "font-pixel"}`}
            >
              {svc.title}
            </motion.h2>

            <motion.p
              variants={itemReveal}
              dir={dir}
              className={`mt-4 text-sm leading-relaxed text-paper/60 sm:text-base ${fa ? "font-fa" : ""}`}
            >
              {svc.subtitle}
            </motion.p>

            <motion.ul
              variants={itemReveal}
              dir={dir}
              className={`mt-5 space-y-2.5 ${fa ? "font-fa" : ""}`}
            >
              {svc.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-paper/70">
                  <span className="mt-0.5 shrink-0 font-mono text-term/80">▸</span>
                  <span dir={dir}>{bullet}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={itemReveal} className="mt-8">
              <Link
                href="/contactus"
                dir={dir}
                className={`group inline-flex items-center gap-2 border border-paper px-5 py-2.5 text-xs uppercase tracking-wider transition-colors duration-200 hover:bg-paper hover:text-ink ${fa ? "font-fa" : ""}`}
              >
                {svc.cta}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  {fa ? "←" : "->"}
                </span>
              </Link>
            </motion.div>
          </div>

          <motion.div variants={itemReveal} className="flex flex-col">
            <div className="flex items-center gap-1.5 border border-b-0 border-paper/20 bg-paper/[0.04] px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
              <span className="ml-auto max-w-[60%] truncate font-mono text-[9px] text-paper/25">
                {ascii?.title ?? `service-${number}`}
              </span>
            </div>

            <div className="flex flex-1 flex-col border border-paper/20 bg-paper/[0.015] p-4 sm:p-5">
              {(() => {
                const Game = GAMES[number];
                return Game ? (
                  <div className="flex min-h-[360px] flex-1 overflow-hidden sm:min-h-[420px]">
                    <FitBox>
                      <Game />
                    </FitBox>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <pre className="ascii text-[9px] leading-snug text-paper/55 sm:text-[10px]">
                        {ascii?.art ?? svc.stack}
                      </pre>
                    </div>
                    {ascii?.statusLines && (
                      <div className="mt-4 space-y-1 border-t border-paper/10 pt-3">
                        {ascii.statusLines.map((line, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-term/60" />
                            <p className="ascii text-[9px] text-paper/45 sm:text-[10px]">{line}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-3 border-t border-paper/10 pt-3">
                      <p className="ascii truncate text-[9px] text-paper/20 sm:text-[10px]">
                        {`stack › `}
                        {svc.stack.replace(/\n/g, ", ")}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center gap-1 font-mono text-[10px] text-paper/25">
                      <span className="text-term/50">▸</span>
                      <span>root@fd:~$</span>
                      <span className="animate-blink ml-0.5 text-term/70">▮</span>
                    </div>
                  </>
                );
              })()}
            </div>

            <p dir={dir} className={`mt-2 text-[10px] text-paper/25 ${fa ? "font-fa" : "ascii"}`}>
              {fa ? `> مشاوره رایگان, ` : `> free consultation, `}
              <Link
                href="/contactus"
                className="text-paper/45 underline underline-offset-2 transition-colors duration-200 hover:text-paper"
              >
                {t("nav.contact")}
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
