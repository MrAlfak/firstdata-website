"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { moduleReveal, itemReveal } from "@/motion/tokens";
import { useT } from "@/i18n/LangProvider";
import { ALL_NAV } from "@/config/navigation";
import ChangelogModal from "@/components/changelog/ChangelogModal";
import FooterMetaBar from "@/components/footer/FooterMetaBar";
import { toTelHref } from "@/config/contact";
import FooterSocialLinks from "@/components/footer/FooterSocialLinks";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";

export default function Footer() {
  const { t, fa, dir, d, lang, fd } = useT();
  const [skin] = usePanelSkin();
  const ai = skin === "modern";
  const footer = d.footer;
  const [changelogOpen, setChangelogOpen] = useState(false);
  const face = ai ? "font-iran" : fa ? "font-fa" : "";

  return (
    <>
      <motion.footer
        variants={moduleReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15% 0px" }}
        className={`border-t border-paper/20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 ${ai ? "ai-footer" : ""}`}
      >
        <div className={`mx-auto ${ai ? "max-w-7xl" : "max-w-6xl"}`}>
          <motion.div
            variants={itemReveal}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            dir={dir}
          >
            <div>
              <p
                dir={dir}
                className={`text-sm tracking-widest ${
                  ai ? "font-iran text-lg font-bold tracking-tight" : fa ? "font-fa" : "font-pixel"
                }`}
              >
                {ai ? (fa ? "اولین دیتا" : "First Data") : footer.brand}
              </p>
              <p dir={dir} className={`mt-2 text-xs leading-relaxed text-paper/50 ${face}`}>
                {t("footer.tagline")}
              </p>
              <FooterSocialLinks />
            </div>

            <div className={`grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-paper/40 ${face}`}>
              {ALL_NAV.map((item) => (
                <Link
                  key={item.slug}
                  href={item.href}
                  className="w-fit transition-colors duration-200 hover:text-paper"
                >
                  {!ai ? (
                    <span className="ai-footer-num font-mono text-amber/55">{fd(item.num)}</span>
                  ) : null}{" "}
                  {t(item.labelKey)}
                </Link>
              ))}
              <Link href="/method" className="w-fit transition-colors duration-200 hover:text-paper">
                {!ai ? <span className="font-mono text-amber/55">{fd("07")}</span> : null} {t("nav.method")}
              </Link>
              <Link href="/status" className="w-fit transition-colors duration-200 hover:text-paper">
                {!ai ? <span className="font-mono text-amber/55">{fd("09")}</span> : null} {t("nav.status")}
              </Link>
              <Link href="/terms" className="w-fit transition-colors duration-200 hover:text-paper">
                {!ai ? <span className="font-mono text-amber/55">{fd("08")}</span> : null} {footer.linkTerms}
              </Link>
            </div>

            <div className={`text-xs text-paper/40 ${face}`}>
              <a
                href={toTelHref(d.contact.directPhone)}
                className={`link-underline block w-fit transition-colors duration-200 hover:text-paper ${
                  ai ? "" : "font-mono"
                }`}
                dir="ltr"
              >
                {d.contact.directPhone}
              </a>
              <p dir={dir} className="mt-2 max-w-xs leading-relaxed text-paper/50">
                {d.contact.directAddress}
              </p>
              <a
                href="mailto:info@firstdata.ir"
                className={`link-underline mt-2 block w-fit transition-colors duration-200 hover:text-paper ${
                  ai ? "" : "font-mono"
                }`}
              >
                {d.contact.directEmail}
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={itemReveal}
            className={`mt-8 pt-6 ${ai ? "border-t border-paper/8" : "border-t border-paper/10"}`}
          >
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
