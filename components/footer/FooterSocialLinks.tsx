"use client";

import PixelIcon from "@/components/icons/PixelIcon";
import StreamlineCoreIcon from "@/components/icons/StreamlineCoreIcon";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import { SOCIAL_LINKS } from "@/config/social";
import { useT } from "@/i18n/LangProvider";
import { CORE_SOCIAL } from "@/lib/icons/streamline-core-map";
import { PIXEL_SOCIAL } from "@/lib/icons/streamline-pixel-map";

export default function FooterSocialLinks() {
  const { t } = useT();
  const [skin] = usePanelSkin();
  const modern = skin === "modern";
  const size = modern ? 22 : 20;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-4 sm:gap-5">
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.id}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t(link.labelKey)}
          className="inline-flex items-center justify-center text-paper/45 transition-colors duration-200 hover:text-paper"
        >
          {modern ? (
            <StreamlineCoreIcon name={CORE_SOCIAL[link.id]} size={size} className="text-current" />
          ) : (
            <PixelIcon name={PIXEL_SOCIAL[link.id]} size={size} className="text-current" />
          )}
        </a>
      ))}
    </div>
  );
}
