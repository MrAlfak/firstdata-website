"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import ModuleWrapper, { itemReveal } from "@/components/ModuleWrapper";
import { Decode } from "@/components/Decode";
import { useT } from "@/i18n/LangProvider";

const blocks = [
  { height: 1020, hash: "0xA3F...2B", prev: "0x91C...F4", nonce: 42, tx: 12 }, { height: 1021, hash: "0xB7E...9C", prev: "0xA3F...2B", nonce: 87, tx: 8  }, { height: 1022, hash: "0xC2D...7F", prev: "0xB7E...9C", nonce: 156, tx: 15 }, { height: 1023, hash: "0xD9A...3E", prev: "0xC2D...7F", nonce: 203, tx: 5  }, { height: 1024, hash: "0xE4B...1A", prev: "0xD9A...3E", nonce: 91, tx: 22 }, ];

export default function DistributedLedgerSection() {
  const { t, fa, dir } = useT();
  const [selected, setSelected] = useState(blocks[4]);
  const chainRef = useRef(null);
  const inView   = useInView(chainRef, { once: true, margin: "-15% 0px" });

  return (
    <ModuleWrapper id="module-03" number="03" eyebrow="distributed-ledger">
      <motion.div variants={itemReveal} className="mb-8 flex items-start justify-between gap-4">
        <div className="flex items-baseline gap-4">
          <Decode as="span" className="font-pixel text-2xl text-white/40" duration={300}>03</Decode>
          <div>
            <Decode as="h2" dir={dir} className={`text-xl uppercase tracking-wide sm:text-2xl ${fa ? "font-fa" : "font-pixel"}`}>
              {t("modules.03.title")}
            </Decode>
            <p dir={dir} className={`mt-2 max-w-md text-sm text-white/60 ${fa ? "font-fa" : ""}`}>
              {t("modules.03.subtitle")}
            </p>
          </div>
        </div>
        <span className="border border-white/30 px-2 py-1 text-[10px] uppercase tracking-wider text-white/50">
          CHAIN
        </span>
      </motion.div>

      {/* Block chain, each block chains in left→right */}
      <motion.div
        ref={chainRef}
        variants={itemReveal}
        className="mb-4 flex flex-wrap items-center gap-1 overflow-x-auto"
      >
        {blocks.map((b, i) => (
          <div key={b.height} className="flex items-center gap-1">
            <motion.button
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ duration: 0.4, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => setSelected(b)}
              className={`border px-3 py-2 text-left transition-colors duration-200 ${
                selected.height === b.height
                  ? "border-paper bg-paper text-ink"
                  : "border-white/30 hover:border-white/70 hover:bg-white/5"
              }`}
            >
              <div dir={dir} className={`text-[10px] uppercase tracking-wider opacity-60 ${fa ? "font-fa" : ""}`}>{fa ? "بلوک" : "Block"}</div>
              <div className="font-pixel text-sm">#{b.height}</div>
              <div className="mt-1 font-mono text-[9px] opacity-50">
                <Decode duration={400}>{b.hash}</Decode>
              </div>
            </motion.button>
            {i < blocks.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: i * 0.12 + 0.3 }}
                className="text-white/30"
              >
                ──▶
              </motion.span>
            )}
          </div>
        ))}
      </motion.div>

      <motion.div variants={itemReveal} className="grid gap-4 lg:grid-cols-2">
        {/* Block inspector */}
        <div className="border border-white/20 bg-white/[0.02] p-4">
          <p dir={dir} className={`mb-4 text-[10px] uppercase tracking-wider text-white/40 ${fa ? "font-fa" : ""}`}>
            {fa ? `بازرس بلوک, #${selected.height}` : `Block Inspector, #${selected.height}`}
          </p>
          {[
            [fa ? "ارتفاع" : "Height", selected.height.toString()], [fa ? "هش" : "Hash", selected.hash], [fa ? "هش قبلی" : "Previous Hash", selected.prev], [fa ? "نانس" : "Nonce", selected.nonce.toString()], [fa ? "تراکنش‌ها" : "Transactions", selected.tx.toString()], ].map(([k, v]) => (
            <div key={k} className="border-b border-white/10 py-2 text-xs last:border-0">
              <div dir={dir} className={`text-white/40 ${fa ? "font-fa" : ""}`}>{k}</div>
              <div className="mt-0.5 font-mono">{v}</div>
            </div>
          ))}
        </div>

        {/* Chain specs */}
        <div className="border border-white/20 bg-white/[0.02] p-4">
          <p dir={dir} className={`mb-4 text-[10px] uppercase tracking-wider text-white/40 ${fa ? "font-fa" : ""}`}>
            {fa ? "مشخصات زنجیره" : "Chain Specifications"}
          </p>
          {[
            [fa ? "اجماع" : "Consensus", fa ? "اثبات سهام" : "Proof of Stake"], [fa ? "زمان بلوک" : "Block Time", fa ? "~۱۲ ثانیه" : "~12 seconds"], [fa ? "تابع هش" : "Hash Fn", "SHA-256"], [fa ? "وضعیت زنجیره" : "Chain State", fa ? "معتبر [OK]" : "VALID [OK]"], ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-1.5 text-xs">
              <span dir={dir} className={`text-white/50 ${fa ? "font-fa" : ""}`}>{k}</span>
              <span dir={dir} className={`text-paper ${fa ? "font-fa" : ""}`}>{v}</span>
            </div>
          ))}
          <pre className="ascii mt-6 text-[10px] text-white/50">{`
#1020 ──▶ #1021 ──▶ #1022 ──▶ #1023 ──▶ #1024
  │         │         │         │         │
 hash      hash      hash      hash      hash
 prev◀─────┘ prev◀───┘ prev◀───┘ prev◀───┘`.trim()}</pre>
        </div>
      </motion.div>
    </ModuleWrapper>
  );
}
