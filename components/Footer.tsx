"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import { ALL_NAV } from "@/config/navigation";
import ChangelogModal from "@/components/changelog/ChangelogModal";
import FooterMetaBar from "@/components/footer/FooterMetaBar";
import FooterSocialLinks from "@/components/footer/FooterSocialLinks";

export default function Footer() {
  const { t, fa, dir, d, lang, fd } = useT();
  const footer = d.footer;
  const [changelogOpen, setChangelogOpen] = useState(false);

  return (
    <>
      <motion.footer
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15% 0px" }}
        className="border-t border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">

          <motion.div
            variants={itemReveal}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            dir={dir}
          >
            <div>
              <p dir={dir} className={`text-sm tracking-widest ${fa ? "font-fa" : "font-pixel"}`}>
                {footer.brand}
              </p>
              <p dir={dir} className={`mt-2 text-xs leading-relaxed text-paper/50 ${fa ? "font-fa" : ""}`}>
                {t("footer.tagline")}
              </p>
              <FooterSocialLinks />
            </div>

            <div className={`grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-paper/40 ${fa ? "font-fa" : ""}`}>
              {ALL_NAV.map((item) => (
                <Link
                  key={item.slug}
                  href={item.href}
                  className="hover:text-paper transition-colors duration-200 w-fit"
                >
                  <span className="font-mono text-amber/55">{fd(item.num)}</span>{" "}
                  {t(item.labelKey)}
                </Link>
              ))}
              <Link
                href="/terms"
                className="hover:text-paper transition-colors duration-200 w-fit"
              >
                <span className="font-mono text-amber/55">{fd("08")}</span>{" "}
                {footer.linkTerms}
              </Link>
            </div>

            <div className={`text-xs text-paper/40 ${fa ? "font-fa" : ""}`}>
              <a
                href={`tel:${d.contact.directPhone.replace(/\s/g, "").replace(/[\u200e\u061c]/g, "")}`}
                className="link-underline block w-fit font-mono transition-colors duration-200 hover:text-paper"
                dir="ltr"
              >
                {d.contact.directPhone}
              </a>
              <p dir={dir} className="mt-2 max-w-xs leading-relaxed text-paper/50">
                {d.contact.directAddress}
              </p>
              <a
                href="mailto:info@firstdata.ir"
                className="link-underline mt-2 block w-fit font-mono transition-colors duration-200 hover:text-paper"
              >
                {d.contact.directEmail}
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemReveal} className="mt-8 border-t border-paper/10 pt-6">
            <FooterMetaBar
              lang={lang}
              fa={fa}
              dir={dir}
              brand={footer.copyrightBrand}
              suffix={footer.copyrightSuffix}
              changelogAria={footer.changelogAria}
              onVersionClick={() => setChangelogOpen(true)}
            />
          </motion.div>

        </div>
      </motion.footer>

      <ChangelogModal
        open={changelogOpen}
        onClose={() => setChangelogOpen(false)}
        lang={lang}
        fa={fa}
        dir={dir}
        title={footer.changelogTitle}
        closeLabel={footer.changelogClose}
      />
    </>
  );
}
