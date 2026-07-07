"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { loadHi, saveHi } from "./hiscore";
import { useT } from "@/i18n/LangProvider";
import { useFaRef } from "./useFaRef";
import { scheduleUpdate } from "@/lib/react/schedule-update";
import { pick } from "./strings";

const COLORS = ["R", "G", "B", "Y"] as const;
type Color = typeof COLORS[number];
type Phase = "idle" | "showing" | "input" | "dead";

const CLR: Record<Color, { dim: string; lit: string; label: string }> = {
  R: { dim: "bg-red-900/30 border-red-800/40", lit: "bg-red-500   border-red-300   shadow-red-500/40", label: "1" }, G: { dim: "bg-green-900/30 border-green-800/40", lit: "bg-green-400 border-green-200 shadow-green-400/40", label: "2" }, B: { dim: "bg-blue-900/30 border-blue-800/40", lit: "bg-blue-500  border-blue-300  shadow-blue-500/40", label: "3" }, Y: { dim: "bg-yellow-900/30 border-yellow-700/40", lit: "bg-yellow-400 border-yellow-200 shadow-yellow-400/40", label: "4" },
};

// Authentic Simon: each pad has its own pitch (a spread major-ish chord).
const TONE: Record<Color, number> = { R: 329.63, G: 261.63, B: 220.0, Y: 164.81 };

export default function SimonGame() {
  const [phase, setPhase]   = useState<Phase>("idle");
  const [lit, setLit]     = useState<Color | null>(null);
  const [round, setRound]   = useState(0);
  const [best, setBest]    = useState(() => (typeof window === "undefined" ? 0 : loadHi("simon")));
  const [msg, setMsg]     = useState("");
  const [progress, setProgress] = useState<number[]>([]);

  const { fa } = useT();
  const faRef = useFaRef();

  const seqRef     = useRef<Color[]>([]);
  const userIdx    = useRef(0);
  const mounted    = useRef(true);
  const running    = useRef(false);
  const audioRef   = useRef<AudioContext | null>(null);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      audioRef.current?.close().catch(() => {});
    };
  }, []);

  // idle prompt, localized, refreshes on language toggle before a game starts
  useEffect(() => {
    if (phase === "idle") {
      scheduleUpdate(() => setMsg(pick(fa, "click any block to start", "برای شروع یک بلوک را بزن")));
    }
  }, [fa, phase]);

  // short tone, lazily creates the AudioContext on first user gesture
  const beep = useCallback((freq: number, ms: number) => {
    try {
      let ctx = audioRef.current;
      if (!ctx) {
        const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AC) return;
        ctx = new AC();
        audioRef.current = ctx;
      }
      if (ctx.state === "suspended") ctx.resume();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + ms / 1000);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + ms / 1000 + 0.02);
    } catch { /* audio unavailable, game stays playable silently */ }
  }, []);

  const flash = useCallback((color: Color, ms: number) => {
    return new Promise<void>(resolve => {
      if (!mounted.current) { resolve(); return; }
      setLit(color);
      beep(TONE[color], ms);
      setTimeout(() => {
        if (mounted.current) setLit(null);
        setTimeout(resolve, 120);
      }, ms);
    });
  }, [beep]);

  const showSequence = useCallback(async (seq: Color[], rnd: number) => {
    if (!mounted.current) return;
    running.current = true;
    setPhase("showing");
    setMsg(pick(faRef.current, "watch the pattern...", "الگو را تماشا کن..."));
    await new Promise(r => setTimeout(r, 500));
    const ms = Math.max(250, 500 - rnd * 20);
    for (const c of seq) {
      if (!mounted.current) return;
      await flash(c, ms);
    }
    if (!mounted.current) return;
    running.current = false;
    setPhase("input");
    setMsg(pick(faRef.current, "your turn →", "نوبت توست ←"));
    userIdx.current = 0;
  }, [flash, faRef]);

  const addRound = useCallback((prev: Color[]) => {
    const next = [...prev, COLORS[Math.floor(Math.random() * 4)]];
    seqRef.current = next;
    const rnd = next.length;
    setRound(rnd);
    setProgress([]);
    showSequence(next, rnd);
  }, [showSequence]);

  const start = useCallback(() => {
    seqRef.current = [];
    userIdx.current = 0;
    setRound(0);
    setProgress([]);
    addRound([]);
  }, [addRound]);

  const press = useCallback((c: Color) => {
    if (phase === "idle" || phase === "dead") { beep(TONE[c], 180); start(); return; }
    if (phase !== "input" || running.current) return;

    // tactile pulse + tone on the pad the player hit
    setLit(c);
    beep(TONE[c], 200);
    setTimeout(() => { if (mounted.current) setLit(null); }, 180);

    const seq = seqRef.current;
    const idx = userIdx.current;

    setProgress(p => [...p, idx]);

    if (c !== seq[idx]) {
      setPhase("dead");
      beep(80, 350); // low error buzz
      setBest(b => { const nb = Math.max(b, round); saveHi("simon", nb); return nb; });
      setMsg(pick(faRef.current, `✗ wrong, round ${round}, click to retry`, `✗ اشتباه, مرحله ${round}, برای تکرار کلیک کن`));
      return;
    }

    userIdx.current = idx + 1;

    if (userIdx.current === seq.length) {
      setMsg(pick(faRef.current, `✓ round ${round} complete!`, `✓ مرحله ${round} کامل شد!`));
      setTimeout(() => { if (mounted.current) addRound(seq); }, 800);
    }
  }, [phase, round, start, addRound, beep, faRef]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Color> = { "1": "R", "2": "G", "3": "B", "4": "Y" };
      if (map[e.key]) press(map[e.key]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press]);

  const grid: Color[][] = [["R", "G"], ["B", "Y"]];
  const progressStr = round > 0 ? `[${"●".repeat(progress.length)}${"○".repeat(round - progress.length)}]` : "";

  return (
    <div className="select-none">
      <div className="flex justify-between ascii text-[9px] text-white/30 mb-2">
        <span>SIMON  best:{best}</span>
        <span>round:{round} {progressStr}</span>
      </div>

      <div className="flex flex-col gap-2 items-center my-1">
        {grid.map((row, ri) => (
          <div key={ri} className="flex gap-2">
            {row.map(c => (
              <button
                key={c}
                onClick={() => press(c)}
                className={`w-[4.5rem] h-10 border-2 font-mono text-[10px] tracking-widest transition-all duration-75 select-none
                  ${lit === c
                    ? CLR[c].lit + " scale-105 shadow-lg"
                    : CLR[c].dim + " text-white/35 hover:text-white/60"}`}
              >
                {CLR[c].label}
              </button>
            ))}
          </div>
        ))}
      </div>

      <p className="ascii text-[9px] text-white/40 mt-2 text-center">{msg}</p>
      <p className="ascii text-[9px] text-white/20 mt-1 text-center">{pick(fa, "click blocks or press 1 2 3 4", "بلوک‌ها را بزن یا ۱ ۲ ۳ ۴")}</p>
    </div>
  );
}
