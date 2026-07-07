"use client";
import { useState, useEffect, useCallback } from "react";
import { loadHi, saveHi } from "./hiscore";
import { useT } from "@/i18n/LangProvider";
import { useFaRef } from "./useFaRef";
import { pick as tr } from "./strings";

const WORDS = ["PIXEL", "REACT", "SWIFT", "QUERY", "CACHE", "STACK", "DEBUG", "PROXY", "ARRAY", "ASYNC", "CLASS", "TOKEN", "FLOAT", "BUILD", "ROUTE", "FETCH", "STORE", "HOOKS", "TYPES", "PARSE", "SCOPE", "CONST", "QUEUE", "GRAPH", "PATCH", "REGEX", "VAPOR", "LINUX", "MYSQL", "NGINX"];

const MAX = 6;
const LEN = 5;
const KB_ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

type LS = "correct" | "present" | "absent" | "empty";
type Row = { letters: string[]; states: LS[] };

function makeRow(): Row {
  return { letters: Array(LEN).fill(""), states: Array(LEN).fill("empty") };
}

function check(guess: string, target: string): LS[] {
  const states: LS[] = Array(LEN).fill("absent");
  const pool = target.split("");
  for (let i = 0; i < LEN; i++) {
    if (guess[i] === target[i]) { states[i] = "correct"; pool[i] = "_"; }
  }
  for (let i = 0; i < LEN; i++) {
    if (states[i] === "correct") continue;
    const idx = pool.indexOf(guess[i]);
    if (idx !== -1) { states[i] = "present"; pool[idx] = "_"; }
  }
  return states;
}

function pick() { return WORDS[Math.floor(Math.random() * WORDS.length)]; }

export default function WordleGame() {
  const [target, setTarget]    = useState(() => pick());
  const [rows, setRows]      = useState<Row[]>(Array.from({ length: MAX }, makeRow));
  const [cur, setCur]       = useState(0);
  const [input, setInput]     = useState("");
  const [phase, setPhase]     = useState<"run" | "won" | "dead">("run");
  const [msg, setMsg]       = useState("");
  const [letterMap, setLetterMap] = useState<Record<string, LS>>({});
  const [shake, setShake]     = useState(false);

  const { fa } = useT();
  const faRef = useFaRef();
  const [wins, setWins]      = useState(() => (typeof window === "undefined" ? 0 : loadHi("wordle-wins")));

  const updateLetterMap = useCallback((guess: string, states: LS[]) => {
    setLetterMap(prev => {
      const next = { ...prev };
      const priority: Record<LS, number> = { correct: 3, present: 2, absent: 1, empty: 0 };
      for (let i = 0; i < LEN; i++) {
        const l = guess[i];
        if (!next[l] || priority[states[i]] > priority[next[l]]) next[l] = states[i];
      }
      return next;
    });
  }, []);

  const submit = useCallback(() => {
    const w = input.trim();
    if (w.length !== LEN) {
      setMsg(tr(faRef.current, "need 5 letters", "۵ حرف لازم است"));
      setShake(true);
      setTimeout(() => setShake(false), 420);
      return;
    }
    const states = check(w, target);
    setRows(prev => {
      const next = prev.map(r => ({ ...r }));
      next[cur] = { letters: w.split(""), states };
      return next;
    });
    updateLetterMap(w, states);
    if (states.every(s => s === "correct")) {
      setPhase("won"); setMsg(tr(faRef.current, `✓ got it in ${cur + 1}/${MAX}`, `✓ در ${cur + 1}/${MAX} حدس`));
      setWins(w => { const nw = w + 1; saveHi("wordle-wins", nw); return nw; });
    } else if (cur + 1 >= MAX) {
      setPhase("dead"); setMsg(tr(faRef.current, `answer: ${target}`, `پاسخ: ${target}`));
    } else {
      setCur(c => c + 1);
    }
    setInput("");
  }, [input, target, cur, updateLetterMap, faRef]);

  const pressKey = useCallback((k: string) => {
    if (phase !== "run") return;
    if (k === "ENTER") { submit(); return; }
    if (k === "⌫") { setInput(v => v.slice(0, -1)); setMsg(""); return; }
    if (/^[A-Z]$/.test(k) && input.length < LEN) setInput(v => v + k);
  }, [phase, input, submit]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase !== "run") return;
      if (e.key === "Enter") { submit(); return; }
      if (e.key === "Backspace") { setInput(v => v.slice(0, -1)); setMsg(""); return; }
      if (/^[a-zA-Z]$/.test(e.key) && input.length < LEN)
        setInput(v => v + e.key.toUpperCase());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, input, submit]);

  const reset = () => {
    setTarget(pick());
    setRows(Array.from({ length: MAX }, makeRow));
    setCur(0); setInput(""); setPhase("run"); setMsg(""); setLetterMap({});
  };

  const keyCls = (l: string) => {
    const s = letterMap[l];
    if (s === "correct") return "bg-green-800/60 border-green-600/70 text-green-300";
    if (s === "present") return "bg-yellow-800/60 border-yellow-600/70 text-yellow-300";
    if (s === "absent")  return "bg-white/5 border-white/10 text-white/20";
    return "border-white/20 text-white/50 hover:border-white/40 hover:text-white/70";
  };

  return (
    <div className="select-none">
      <div className="flex justify-between ascii text-[9px] text-white/30 mb-2">
        <span>WORDLE, {tr(fa, "dev words", "واژه‌های برنامه‌نویسی")}{wins > 0 && `  ${tr(fa, "won", "برد")}:${wins}`}</span>
        <span className="cursor-pointer hover:text-white/60" onClick={reset}>
          {phase !== "run" ? tr(fa, "[ retry ]", "[ تکرار ]") : `${cur}/${MAX}`}
        </span>
      </div>

      {/* Grid */}
      <div className="space-y-[3px]">
        {rows.map((row, ri) => {
          const isActive = ri === cur && phase === "run";
          return (
            <div key={ri} className={`flex gap-[3px] ${isActive && shake ? "fd-shake" : ""}`}>
              {Array.from({ length: LEN }, (_, ci) => {
                const letter = isActive ? (input[ci] ?? "") : (row.letters[ci] ?? "");
                const state: LS = isActive ? "empty" : row.states[ci];
                return (
                  <div key={ci}
                    className={`w-6 h-6 border flex items-center justify-center text-[10px] font-mono font-bold transition-colors ${isActive && letter ? "fd-pop" : ""}
                      ${state === "correct" ? "border-green-500/70 bg-green-900/20 text-green-400"
                      : state === "present" ? "border-yellow-500/70 bg-yellow-900/20 text-yellow-400"
                      : state === "absent"  ? "border-white/12 text-white/25"
                      : isActive && letter  ? "border-white/50 text-white"
                      : "border-white/15 text-white/15"}`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Keyboard */}
      <div className="mt-2 space-y-[2px]">
        {KB_ROWS.map((row, ri) => (
          <div key={ri} className="flex gap-[2px]" style={{ paddingLeft: `${ri * 5}px` }}>
            {row.split("").map(l => (
              <button key={l} onClick={() => pressKey(l)}
                className={`w-[1.5rem] h-[1.4rem] text-[8px] font-mono border transition-colors ${keyCls(l)}`}>
                {l}
              </button>
            ))}
          </div>
        ))}
        {/* Action row */}
        <div className="flex gap-[2px] justify-center mt-[3px]">
          <button onClick={() => pressKey("⌫")}
            className="px-2 h-[1.4rem] text-[8px] font-mono border border-white/20 text-white/50 hover:border-white/40 hover:text-white/80 transition-colors">
            ⌫
          </button>
          <button onClick={submit} disabled={phase !== "run"}
            className="px-3 h-[1.4rem] text-[8px] font-mono border border-white/20 text-white/50 hover:border-green-500/50 hover:text-green-400 transition-colors disabled:opacity-30">
            ENTER
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="mt-1 border-t border-white/10 pt-1">
        {phase === "run" ? (
          <div className="flex items-center gap-1">
            <span className="ascii text-[9px] text-white/25">›</span>
            <span className="font-mono text-[10px] text-white/70 tracking-widest">{input}</span>
            <span className="animate-blink text-green-500/60 font-mono text-[10px]">▮</span>
            {msg && <span className="ascii text-[9px] text-white/30 ml-2">{msg}</span>}
          </div>
        ) : (
          <p className={`ascii text-[9px] ${phase === "won" ? "text-green-400" : "text-red-400"}`}>{msg}</p>
        )}
      </div>
    </div>
  );
}
