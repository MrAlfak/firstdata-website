"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { scheduleUpdate } from "@/lib/react/schedule-update";
import { useT } from "@/i18n/LangProvider";
import { formatDigits } from "@/lib/i18n/digits";
import {
  getTerminalTitle,
  getVersionCommandOutput,
} from "@/lib/siteVersion";
import { logAssistantQueryClient } from "@/lib/assistant/log-client";
import type { AssistantMode, PublishedAnswer } from "@/lib/assistant/types";
import { resolveAssistantQuery } from "@/lib/assistant/resolve";
import { writeLeadPrefill } from "@/lib/contact/lead-prefill";

export type AssistantLine = { type: "input" | "output" | "error"; text: string };

export type ChatBubble = {
  id: string;
  role: "user" | "assistant";
  lines: string[];
  thinking?: boolean;
};

const SESSION_KEY = "fd-assistant-chat-v1";
const LINE_DELAY = 55;

function thinkDelayMs(opts: {
  queryLen: number;
  lineCount: number;
  matched: boolean;
}): number {
  const base = 480 + Math.random() * 720;
  const q = Math.min(opts.queryLen, 90) * (7 + Math.random() * 8);
  const a = Math.min(opts.lineCount, 14) * (35 + Math.random() * 55);
  const miss = opts.matched ? Math.random() * 220 : 520 + Math.random() * 900;
  return Math.round(Math.min(3600, Math.max(650, base + q + a + miss)));
}

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
    const res = await fetch("/api/ip", { signal: ctrl.signal });
    clearTimeout(to);
    const data = await res.json();
    return data.ip || "unavailable";
  } catch {
    return "unavailable";
  }
}

let bubbleSeq = 0;
function nextId() {
  bubbleSeq += 1;
  return `b-${Date.now()}-${bubbleSeq}`;
}

function readSession(lang: string): ChatBubble[] | null {
  try {
    const raw = sessionStorage.getItem(`${SESSION_KEY}:${lang}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ChatBubble[];
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    return parsed.filter((b) => b && !b.thinking && b.lines?.length);
  } catch {
    return null;
  }
}

function writeSession(lang: string, bubbles: ChatBubble[]) {
  try {
    const slim = bubbles
      .filter((b) => !b.thinking && (b.role === "user" || b.lines.length > 0))
      .slice(-40);
    sessionStorage.setItem(`${SESSION_KEY}:${lang}`, JSON.stringify(slim));
  } catch {
    /* ignore */
  }
}

export function useAssistantSession(mode: AssistantMode) {
  const { fa, lang, d } = useT();
  const term = d.terminal;
  const chat = d.assistantChat;

  const bootLines = (): AssistantLine[] => [
    { type: "output", text: getTerminalTitle(lang) },
    { type: "output", text: term.hint },
    { type: "output", text: "" },
  ];

  const bootBubbles = (): ChatBubble[] => [
    {
      id: "boot",
      role: "assistant",
      lines: chat.welcomeLines?.length
        ? chat.welcomeLines
        : [getTerminalTitle(lang), term.hint],
    },
  ];

  const [lines, setLines] = useState<AssistantLine[]>(bootLines);
  const [bubbles, setBubbles] = useState<ChatBubble[]>(bootBubbles);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [printing, setPrinting] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [published, setPublished] = useState<PublishedAnswer[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const mounted = useRef(false);
  const runGen = useRef(0);

  const busy = printing || thinking;

  useEffect(() => {
    fetch("/api/assistant/answers")
      .then((r) => r.json())
      .then((j) => {
        if (j.success && Array.isArray(j.answers)) setPublished(j.answers);
      })
      .catch(() => {
        /* offline */
      });
  }, []);

  useEffect(() => {
    if (mode !== "chat") {
      setHydrated(true);
      return;
    }
    const saved = readSession(lang);
    scheduleUpdate(() => {
      runGen.current += 1;
      setThinking(false);
      setPrinting(false);
      setLines(bootLines());
      setBubbles(saved?.length ? saved : bootBubbles());
      setHydrated(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, mode]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, bubbles, thinking]);

  useEffect(() => {
    if (mode !== "chat" || !hydrated || busy) return;
    writeSession(lang, bubbles);
  }, [bubbles, mode, lang, hydrated, busy]);

  const stop = useCallback(() => {
    runGen.current += 1;
    setThinking(false);
    setPrinting(false);
    setBubbles((prev) => prev.filter((b) => !b.thinking));
  }, []);

  const newChat = useCallback(() => {
    runGen.current += 1;
    setThinking(false);
    setPrinting(false);
    setInput("");
    setBubbles(bootBubbles());
    setLines(bootLines());
    try {
      sessionStorage.removeItem(`${SESSION_KEY}:${lang}`);
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, term, chat]);

  const appendOutputLines = useCallback(
    (
      outputLines: string[],
      opts?: { queryLen?: number; matched?: boolean; thinkMs?: number },
    ) => {
      const localized = fa
        ? outputLines.map((line) => formatDigits(line, true))
        : outputLines;

      const gen = runGen.current;

      if (mode === "chat") {
        const id = nextId();
        const delay =
          opts?.thinkMs === undefined
            ? thinkDelayMs({
                queryLen: opts?.queryLen ?? 12,
                lineCount: localized.length,
                matched: opts?.matched ?? true,
              })
            : opts.thinkMs;

        const streamLines = (bubbleId: string) => {
          setThinking(false);
          setPrinting(true);
          setBubbles((prev) =>
            prev.map((b) =>
              b.id === bubbleId ? { ...b, thinking: false, lines: [] } : b,
            ),
          );
          if (localized.length === 0) {
            setPrinting(false);
            return;
          }
          localized.forEach((text, i) => {
            window.setTimeout(() => {
              if (gen !== runGen.current) return;
              setBubbles((prev) =>
                prev.map((b) =>
                  b.id === bubbleId ? { ...b, lines: [...b.lines, text] } : b,
                ),
              );
              if (i === localized.length - 1) {
                window.setTimeout(() => {
                  if (gen !== runGen.current) return;
                  setPrinting(false);
                }, LINE_DELAY);
              }
            }, (i + 1) * LINE_DELAY);
          });
        };

        if (delay <= 0) {
          setBubbles((prev) => [
            ...prev,
            { id, role: "assistant", lines: [], thinking: false },
          ]);
          streamLines(id);
          return;
        }

        setThinking(true);
        setPrinting(false);
        setBubbles((prev) => [
          ...prev,
          { id, role: "assistant", lines: [], thinking: true },
        ]);

        window.setTimeout(() => {
          if (gen !== runGen.current) return;
          streamLines(id);
        }, delay);
        return;
      }

      setPrinting(true);
      localized.forEach((text, i) => {
        window.setTimeout(() => {
          if (gen !== runGen.current) return;
          setLines((prev) => [...prev, { type: "output", text }]);
          if (i === outputLines.length - 1) {
            window.setTimeout(() => {
              if (gen !== runGen.current) return;
              setLines((prev) => [...prev, { type: "output", text: "" }]);
              setPrinting(false);
            }, LINE_DELAY);
          }
        }, (i + 1) * LINE_DELAY);
      });
    },
    [fa, mode],
  );

  const runWhoami = useCallback(
    async (queryLen: number) => {
      const gen = runGen.current;
      const thinkId = mode === "chat" ? nextId() : "";

      if (mode === "chat") {
        setThinking(true);
        setBubbles((prev) => [
          ...prev,
          { id: thinkId, role: "assistant", lines: [], thinking: true },
        ]);
      } else {
        setPrinting(true);
      }

      const started = Date.now();
      const n = navigator;
      const { browser, os } = parseUA(n.userAgent);
      const touch = (n.maxTouchPoints ?? 0) > 0 || /Mobi/.test(n.userAgent);
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown";
      const ip = await fetchIp();
      if (gen !== runGen.current) return;

      const output = term.whoamiLines({
        ip,
        os,
        browser,
        device: fa
          ? touch
            ? "موبایل / لمسی"
            : "دسکتاپ"
          : touch
            ? "mobile / touch"
            : "desktop",
        screen: `${window.screen.width}x${window.screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        language: n.language,
        timezone: tz,
        cores: String(n.hardwareConcurrency ?? "n/a"),
      });

      if (mode === "chat") {
        const target = thinkDelayMs({
          queryLen,
          lineCount: output.length,
          matched: true,
        });
        const wait = Math.max(0, target - (Date.now() - started));
        window.setTimeout(() => {
          if (gen !== runGen.current) return;
          setThinking(false);
          setPrinting(true);
          setBubbles((prev) =>
            prev.map((b) =>
              b.id === thinkId ? { ...b, thinking: false, lines: [] } : b,
            ),
          );
          const localized = fa
            ? output.map((line) => formatDigits(line, true))
            : output;
          localized.forEach((text, i) => {
            window.setTimeout(() => {
              if (gen !== runGen.current) return;
              setBubbles((prev) =>
                prev.map((b) =>
                  b.id === thinkId ? { ...b, lines: [...b.lines, text] } : b,
                ),
              );
              if (i === localized.length - 1) {
                window.setTimeout(() => {
                  if (gen !== runGen.current) return;
                  setPrinting(false);
                }, LINE_DELAY);
              }
            }, (i + 1) * LINE_DELAY);
          });
        }, wait);
        return;
      }

      appendOutputLines(output);
    },
    [appendOutputLines, fa, term, mode],
  );

  const run = useCallback(
    (cmd: string) => {
      const display = cmd.trim().slice(0, 500);
      if (!display) return;

      runGen.current += 1;

      const resolved = resolveAssistantQuery(display, lang, term, published);

      logAssistantQueryClient({
        query: display,
        matched: resolved.matched,
        mode,
        lang,
      });

      if (mode === "chat") {
        setBubbles((prev) => [
          ...prev.filter((b) => !b.thinking),
          { id: nextId(), role: "user", lines: [display] },
        ]);
      } else {
        setLines((prev) => [
          ...prev,
          { type: "input", text: display.toLowerCase() },
        ]);
      }

      if (resolved.special === "clear" || resolved.kind === "clear") {
        setThinking(false);
        setPrinting(false);
        if (mode === "chat") {
          setBubbles(bootBubbles());
          try {
            sessionStorage.removeItem(`${SESSION_KEY}:${lang}`);
          } catch {
            /* ignore */
          }
        } else setLines(bootLines());
        return;
      }

      if (resolved.special === "whoami") {
        void runWhoami(display.length);
        return;
      }

      if (resolved.special === "version") {
        appendOutputLines(getVersionCommandOutput(lang), {
          queryLen: display.length,
          matched: true,
        });
        return;
      }

      if (resolved.special === "navigate" && resolved.navigateHref) {
        writeLeadPrefill({
          source: mode === "chat" ? "chat" : "terminal",
          description: resolved.leadDescription,
        });
        appendOutputLines(resolved.lines, {
          queryLen: display.length,
          matched: true,
          thinkMs: mode === "chat" ? 320 : 0,
        });
        const delay =
          mode === "chat"
            ? 900 + resolved.lines.length * LINE_DELAY
            : (resolved.lines.length + 2) * LINE_DELAY + 450;
        const href = resolved.navigateHref;
        const gen = runGen.current;
        window.setTimeout(() => {
          if (gen !== runGen.current) return;
          window.location.assign(href);
        }, delay);
        return;
      }

      // Terminal mode: keep classic notFound for pure unknown short "commands"
      // unless natural language matched FAQ/published
      if (
        mode === "terminal" &&
        resolved.kind === "unknown" &&
        !display.includes(" ") &&
        display.length < 24
      ) {
        appendOutputLines([term.notFound(display.toLowerCase())], {
          queryLen: display.length,
          matched: false,
        });
        return;
      }

      appendOutputLines(resolved.lines, {
        queryLen: display.length,
        matched: resolved.matched,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [appendOutputLines, runWhoami, term, mode, lang, published, chat],
  );

  const submit = useCallback(() => {
    if (busy) return;
    const cmd = input;
    if (cmd.trim()) setHistory((h) => [cmd.trim(), ...h]);
    setHistIdx(-1);
    setInput("");
    run(cmd);
  }, [input, busy, run]);

  const onKey = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === "Escape" && busy) {
      e.preventDefault();
      stop();
      return;
    }
    if (busy) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    } else if (e.key === "ArrowUp" && mode === "terminal") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown" && mode === "terminal") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next]);
    }
  };

  return {
    term,
    fa,
    lang,
    lines,
    bubbles,
    input,
    setInput,
    printing,
    thinking,
    busy,
    outputRef,
    inputRef,
    run,
    submit,
    stop,
    newChat,
    onKey,
    d,
    chat,
  };
}
