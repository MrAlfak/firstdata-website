"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { loadHi, saveHi } from "./hiscore";
import { useT } from "@/i18n/LangProvider";
import { useFaRef } from "./useFaRef";
import { scheduleUpdate } from "@/lib/react/schedule-update";
import { pick } from "./strings";

/*
 * Flappy Bird, authentic feel pass.
 *, gravity + single-impulse flap, scrolling striped ground
 *, bird tilts up/level/down by vel, pipes with lip caps
 *, score pings as you clear a pipe, medal line on death
 */

const W = 34;
const H = 14;
const FLOOR = H - 1;       // scrolling ground row
const SKY = FLOOR;         // playable rows 0..FLOOR-1
const BX = 6;              // bird column
const GAP = 5;             // pipe opening height
const PW = 3;              // pipe width

const GRAVITY = 0.32;
const FLAP = -1.9;
const FLOORPAT = "______/______\\_____";

type Phase = "idle" | "run" | "dead";
type Pipe = { x: number; top: number; scored: boolean };

export default function FlappyGame() {
  const phase    = useRef<Phase>("idle");
  const birdY    = useRef(SKY / 2);
  const vel      = useRef(0);
  const pipes    = useRef<Pipe[]>([]);
  const frameN   = useRef(0);
  const gOff     = useRef(0);
  const scoreVal = useRef(0);
  const hiVal    = useRef(0);
  const flashTil = useRef(0);

  const { fa } = useT();
  const faRef = useFaRef();

  const [ascii, setAscii] = useState("");
  const [info, setInfo]  = useState("");
  const [score, setScore] = useState(0);
  const [hi, setHi]    = useState(() => (typeof window === "undefined" ? 0 : loadHi("flappy")));
  const [flash, setFlash] = useState(false);

  function birdChar() {
    if (vel.current < -0.6) return "◤";   // climbing
    if (vel.current > 1.4)  return "◢";   // diving
    return "►";                            // level
  }

  function draw(): string {
    const g: string[][] = Array.from({ length: H }, () => Array(W).fill(" "));

    for (const p of pipes.current) {
      for (let dx = 0; dx < PW; dx++) {
        const px = p.x + dx;
        if (px < 0 || px >= W) continue;
        for (let r = 0; r < SKY; r++) {
          if (r < p.top || r >= p.top + GAP) g[r][px] = "█";
        }
        if (p.top > 0)        g[p.top - 1][px]   = "▄";   // lower lip of top pipe
        if (p.top + GAP < SKY) g[p.top + GAP][px] = "▀";   // upper lip of bottom pipe
      }
    }

    // bird
    const by = Math.max(0, Math.min(SKY - 1, Math.round(birdY.current)));
    g[by][BX] = birdChar();

    // scrolling ground
    for (let x = 0; x < W; x++) g[FLOOR][x] = FLOORPAT[(x + gOff.current) % FLOORPAT.length];

    return g.map(r => r.join("")).join("\n");
  }

  const flap = useCallback(() => {
    if (phase.current === "idle") { phase.current = "run"; setInfo(""); }
    else if (phase.current === "dead") {
      phase.current = "run";
      birdY.current = SKY / 2; vel.current = 0;
      pipes.current = []; scoreVal.current = 0; frameN.current = 0;
      flashTil.current = 0;
      setScore(0); setFlash(false); setInfo("");
    }
    if (phase.current === "run") vel.current = FLAP;
  }, []);

  useEffect(() => { hiVal.current = hi; }, [hi]);

  // idle prompt, localized, refreshes on language toggle while not playing
  useEffect(() => {
    if (phase.current === "idle") {
      scheduleUpdate(() => setInfo(pick(fa, "▸ [ SPACE / TAP ] to flap", "▸ [ SPACE / لمس ] برای بال‌زدن")));
    }
  }, [fa]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.code === "Space") { e.preventDefault(); flap(); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flap]);

  const die = useCallback(() => {
    phase.current = "dead";
    if (scoreVal.current > hiVal.current) { hiVal.current = scoreVal.current; setHi(hiVal.current); saveHi("flappy", hiVal.current); }
    const f = faRef.current;
    const medal = scoreVal.current >= 20 ? pick(f, "◆ gold", "◆ طلا")
      : scoreVal.current >= 10 ? pick(f, "◇ silver", "◇ نقره")
      : scoreVal.current >= 5 ? pick(f, "· bronze", "· برنز") : "";
    setInfo(pick(f, `DEAD  ${scoreVal.current}${medal ? "  " + medal : ""}, [ SPACE/TAP ] retry`, `باخت  ${scoreVal.current}${medal ? "  " + medal : ""}, [ SPACE/لمس ] دوباره`));
    setAscii(draw());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scheduleUpdate(() => setAscii(draw()));
    const id = setInterval(() => {
      if (phase.current !== "run") return;
      frameN.current++;
      gOff.current = (gOff.current + 1) % FLOORPAT.length;

      vel.current = Math.min(vel.current + GRAVITY, 3);
      birdY.current += vel.current;

      // ceiling clamp (no death), ground = death
      if (birdY.current < 0) { birdY.current = 0; vel.current = 0; }
      if (birdY.current >= SKY - 0.0001) { birdY.current = SKY - 1; die(); return; }

      pipes.current = pipes.current.map(p => ({ ...p, x: p.x - 1 })).filter(p => p.x + PW > 0);

      for (const p of pipes.current) {
        if (!p.scored && p.x + PW <= BX) {
          p.scored = true;
          scoreVal.current++;
          flashTil.current = frameN.current + 4;
          setScore(scoreVal.current);
        }
      }

      const spawnGap = Math.max(14, 22 - Math.floor(scoreVal.current / 4));
      if (frameN.current % spawnGap === 0) {
        const top = 1 + Math.floor(Math.random() * (SKY - GAP - 2));
        pipes.current.push({ x: W, top, scored: false });
      }

      const by = Math.round(birdY.current);
      for (const p of pipes.current) {
        if (BX >= p.x && BX < p.x + PW && (by < p.top || by >= p.top + GAP)) { die(); return; }
      }

      const fl = frameN.current < flashTil.current;
      if (fl !== flash) setFlash(fl);
      setAscii(draw());
    }, 70);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="select-none cursor-pointer outline-none"
      tabIndex={0}
      onTouchStart={e => { e.preventDefault(); flap(); }}
      onClick={flap}
    >
      <div className="flex justify-between ascii text-[9px] text-white/30 mb-1">
        <span>FLAPPY  hi:{hi}</span>
        <span className={flash ? "text-green-400" : ""}>score:{score}</span>
      </div>
      <pre className="ascii text-[9px] leading-snug text-white/60 overflow-hidden">{ascii}</pre>
      {info && <p className="ascii text-[9px] text-white/30 mt-1 truncate">{info}</p>}
    </div>
  );
}
