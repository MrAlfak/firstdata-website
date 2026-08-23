"use client";

import { usePanelSkin } from "@/components/panel/PanelSkinToggle";
import { useT } from "@/i18n/LangProvider";
import { getTerminalTabTitle } from "@/lib/siteVersion";
import { useAssistantSession } from "./useAssistantSession";

type Props = {
  /** Homepage: friendly intro above the terminal */
  showIntro?: boolean;
};

function CrtTerminal({ showIntro }: Props) {
  const { dir, d, fa, lang } = useT();
  const {
    term,
    lines,
    input,
    setInput,
    printing,
    busy,
    outputRef,
    inputRef,
    onKey,
  } = useAssistantSession("terminal");

  return (
    <section className="border-b border-paper/20 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {showIntro && (
          <div className="mb-8 max-w-2xl" dir={dir}>
            <h2 className={`text-xl font-normal leading-snug text-paper sm:text-2xl ${fa ? "font-fa" : ""}`}>
              {d.home.terminalIntro.title}
            </h2>
            <p className={`mt-3 text-base leading-relaxed text-paper/60 ${fa ? "font-fa" : ""}`}>
              {d.home.terminalIntro.subtitle}
            </p>
          </div>
        )}
        <div
          className="border border-paper/20"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="flex items-center justify-between border-b border-paper/20 bg-paper/[0.03] px-3 py-2" dir="ltr">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full border border-paper/40" />
              <span className="h-2 w-2 rounded-full border border-paper/40" />
              <span className="h-2 w-2 rounded-full border border-paper/40" />
            </div>
            <span
              dir={dir}
              className={`text-[10px] uppercase tracking-wider text-paper/40 ${fa ? "font-fa" : ""}`}
            >
              {getTerminalTabTitle(lang)}
            </span>
          </div>

          <div
            ref={outputRef}
            dir={fa ? "rtl" : "ltr"}
            className={`max-h-72 overflow-y-auto p-4 text-xs leading-relaxed ${fa ? "font-fa text-right" : "ascii"}`}
          >
            {lines.map((l, i) => (
              <div key={i}>
                {l.type === "input" && (
                  <span className="text-paper/40">{term.prompt}</span>
                )}
                <span
                  className={
                    l.type === "error"
                      ? "text-paper/50"
                      : l.type === "input"
                        ? "text-paper"
                        : "text-paper/70"
                  }
                >
                  {l.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center border-t border-paper/10 py-2 pe-0 ps-0" dir="ltr">
            <span className="animate-blink shrink-0 pl-2 pr-1 text-xs text-term">▮</span>
            {fa ? (
              <>
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  disabled={busy}
                  dir="rtl"
                  className="min-w-0 flex-1 bg-transparent px-2 text-xs text-paper outline-none placeholder:text-paper/20 disabled:opacity-50 font-fa text-right"
                  placeholder={busy ? "" : term.placeholder}
                  spellCheck={false}
                  autoComplete="off"
                />
                <span
                  dir="rtl"
                  className="flex shrink-0 items-center gap-2 border-s border-paper/10 ps-3 pe-3 text-xs font-fa"
                >
                  <span className="text-paper/40">~$</span>
                  <span className="text-term/85">اولین دیتا</span>
                </span>
              </>
            ) : (
              <>
                <span className="shrink-0 text-xs text-paper/40 ascii">{term.prompt}</span>
                <input
                  ref={inputRef as React.RefObject<HTMLInputElement>}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  disabled={busy}
                  className="min-w-0 flex-1 bg-transparent ps-1 text-xs text-paper outline-none placeholder:text-paper/20 disabled:opacity-50 ascii text-left"
                  placeholder={busy ? "" : term.placeholder}
                  spellCheck={false}
                  autoComplete="off"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TerminalSection({ showIntro = false }: Props) {
  const [skin] = usePanelSkin();
  // Modern: chat lives in StickyAiPrompt only (no mid-page ask block).
  if (skin === "modern") return null;
  return <CrtTerminal showIntro={showIntro} />;
}
