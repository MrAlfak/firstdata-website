"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { scheduleUpdate } from "@/lib/react/schedule-update";
import { useT } from "@/i18n/LangProvider";
import { formatDigits } from "@/lib/i18n/digits";
import {
  getTerminalTabTitle, getTerminalTitle, getVersionCommandOutput, } from "@/lib/siteVersion";

type Line = { type: "input" | "output" | "error"; text: string };

function parseUA(ua: string) {
  let browser = "Unknown";
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/OPR\//.test(ua)) browser = "Opera";
  else if (/Chrome\//.test(ua)) browser = "Chrome";
  else if (/Firefox\//.test(ua)) browser = "Firefox";
  else if (/Safari\//.test(ua)) browser = "Safari";

  let os = "Unknown";
  if (/Windows/.test(ua)) os = "Windows";
  else if (/Mac OS X/.test(ua)) os = "macOS";
  else if (/Android/.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";
  else if (/Linux/.test(ua)) os = "Linux";

  return { browser, os };
}

async function fetchIp(): Promise<string> {
  try {
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 4000);
    // self-hosted endpoint, no external service
    const res = await fetch("/api/ip", { signal: ctrl.signal });
    clearTimeout(to);
    const data = await res.json();
    return data.ip || "unavailable";
  } catch {
    return "unavailable";
  }
}

const LINE_DELAY = 55;

type Props = {
  /** Homepage: friendly intro above the terminal */
  showIntro?: boolean;
};

export default function TerminalSection({ showIntro = false }: Props) {
  const { fa, lang, d, dir } = useT();
  const term = d.terminal;

  const init: Line[] = [
    { type: "output", text: getTerminalTitle(lang) }, { type: "output", text: term.hint }, { type: "output", text: "" }, ];

  const [lines, setLines]       = useState<Line[]>(init);
  const [input, setInput]       = useState("");
  const [history, setHistory]   = useState<string[]>([]);
  const [histIdx, setHistIdx]   = useState(-1);
  const [printing, setPrinting] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const mounted   = useRef(false);

  // Reset terminal when language changes
  useEffect(() => {
    scheduleUpdate(() => setLines([
      { type: "output", text: getTerminalTitle(lang) }, { type: "output", text: term.hint }, { type: "output", text: "" }, ]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const printOutput = useCallback((outputLines: string[]) => {
    const localized = fa ? outputLines.map((line) => formatDigits(line, true)) : outputLines;
    setPrinting(true);
    localized.forEach((text, i) => {
      setTimeout(() => {
        setLines((prev) => [...prev, { type: "output", text }]);
        if (i === outputLines.length - 1) {
          setTimeout(() => {
            setLines((prev) => [...prev, { type: "output", text: "" }]);
            setPrinting(false);
          }, LINE_DELAY);
        }
      }, (i + 1) * LINE_DELAY);
    });
  }, [fa]);

  const runWhoami = useCallback(async () => {
    setPrinting(true);
    const n = navigator;
    const { browser, os } = parseUA(n.userAgent);
    const touch = (n.maxTouchPoints ?? 0) > 0 || /Mobi/.test(n.userAgent);
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown";
    const ip = await fetchIp();

    const output = term.whoamiLines({
      ip, os, browser, device: fa ? (touch ? "موبایل / لمسی" : "دسکتاپ") : (touch ? "mobile / touch" : "desktop"), screen: `${window.screen.width}x${window.screen.height}`, viewport: `${window.innerWidth}x${window.innerHeight}`, language: n.language, timezone: tz, cores: String(n.hardwareConcurrency ?? "n/a"), });
    printOutput(output);
  }, [printOutput, fa, term]);

  const run = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      setLines((prev) => [...prev, { type: "input", text: trimmed }]);
      if (!trimmed) return;
      if (trimmed === term.clearCmd || trimmed === "clear") { setLines(init); return; }
      if (trimmed === term.whoamiCmd || trimmed === "whoami") { void runWhoami(); return; }
      if (trimmed === "version" || trimmed === "نسخه") {
        printOutput(getVersionCommandOutput(lang));
        return;
      }

      const output = term.commands[trimmed] ?? term.commands[cmd.trim()];
      if (output) {
        printOutput(output);
      } else {
        printOutput([term.notFound(trimmed)]);
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [printOutput, runWhoami, term, fa], );

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (printing) return;
    if (e.key === "Enter") {
      const cmd = input;
      if (cmd.trim()) setHistory((h) => [cmd.trim(), ...h]);
      setHistIdx(-1);
      setInput("");
      run(cmd);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next]);
    }
  };

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
          {/* Chrome bar, window dots always on the visual left */}
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

          {/* Output */}
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

          {/* Input, FA: cursor left; ~$ + brand on the right */}
          <div className="flex items-center border-t border-paper/10 py-2 pe-0 ps-0" dir="ltr">
            <span className="animate-blink shrink-0 pl-2 pr-1 text-xs text-term">▮</span>
            {fa ? (
              <>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  disabled={printing}
                  dir="rtl"
                  className="min-w-0 flex-1 bg-transparent px-2 text-xs text-paper outline-none placeholder:text-paper/20 disabled:opacity-50 font-fa text-right"
                  placeholder={printing ? "" : term.placeholder}
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
                <span className={`shrink-0 text-xs text-paper/40 ascii`}>{term.prompt}</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  disabled={printing}
                  className="min-w-0 flex-1 bg-transparent ps-1 text-xs text-paper outline-none placeholder:text-paper/20 disabled:opacity-50 ascii text-left"
                  placeholder={printing ? "" : term.placeholder}
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
