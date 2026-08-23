"use client";

import StreamlineCoreIcon from "@/components/icons/StreamlineCoreIcon";
import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import { CORE_CONTACT } from "@/lib/icons/streamline-core-map";

type Props = {
  title: string;
  titleId: string;
  prompt?: string;
  fa: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  maximized?: boolean;
  closeLabel: string;
  minimizeLabel?: string;
  maximizeLabel?: string;
  restoreLabel?: string;
};

export default function TermModalChrome({
  title,
  titleId,
  prompt = "fd@modal:~$",
  fa,
  onClose,
  onMinimize,
  onMaximize,
  maximized = false,
  closeLabel,
  minimizeLabel,
  maximizeLabel,
  restoreLabel,
}: Props) {
  const [skin] = usePanelSkin();
  const modern = skin === "modern";

  if (modern) {
    return (
      <div className="flex items-center gap-3 border-b border-paper/10 px-4 py-3.5 sm:px-5">
        <div className="min-w-0 flex-1">
          <h2
            id={titleId}
            className={`truncate text-base font-medium text-paper ${fa ? "font-iran" : "font-iran"}`}
          >
            {title}
          </h2>
        </div>
        {onMaximize ? (
          <button
            type="button"
            onClick={onMaximize}
            aria-label={maximized ? (restoreLabel ?? maximizeLabel) : maximizeLabel}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-paper/45 transition-colors hover:bg-paper/8 hover:text-paper"
          >
            <StreamlineCoreIcon name={CORE_CONTACT.maximize} size={14} className="text-current" />
          </button>
        ) : null}
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-paper/45 transition-colors hover:bg-paper/8 hover:text-paper"
        >
          <StreamlineCoreIcon name={CORE_CONTACT.cross} size={16} className="text-current" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 border-b border-term/20 bg-paper/[0.03] px-3 py-2.5 sm:px-4">
      <div className="flex shrink-0 items-center gap-1.5" dir="ltr">
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="h-3 w-3 rounded-full bg-[#ff5f56] transition-opacity hover:opacity-90"
        />
        <button
          type="button"
          onClick={onMinimize ?? onClose}
          aria-label={minimizeLabel ?? closeLabel}
          className="h-3 w-3 rounded-full bg-[#ffbd2e] transition-opacity hover:opacity-90"
        />
        <button
          type="button"
          onClick={onMaximize}
          disabled={!onMaximize}
          aria-label={maximized ? (restoreLabel ?? maximizeLabel) : maximizeLabel}
          className="h-3 w-3 rounded-full bg-[#27c93f] transition-opacity hover:opacity-90 disabled:opacity-40"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-mono text-[10px] text-term/55" dir="ltr">
          {prompt}
        </p>
        <h2
          id={titleId}
          className={`truncate text-sm text-paper ${fa ? "font-fa" : "font-pixel tracking-wide"}`}
        >
          {title}
        </h2>
      </div>

      <button
        type="button"
        onClick={onClose}
        className={`shrink-0 border border-paper/20 px-2.5 py-1 text-[10px] uppercase tracking-wider text-paper/55 transition-colors hover:border-paper/40 hover:text-paper ${
          fa ? "font-fa" : "font-mono"
        }`}
      >
        {closeLabel}
      </button>
    </div>
  );
}
