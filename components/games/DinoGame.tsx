"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { loadHi, saveHi } from "./hiscore";
import { useT } from "@/i18n/LangProvider";
import { useFaRef } from "./useFaRef";
import { scheduleUpdate } from "@/lib/react/schedule-update";
import { pick } from "./strings";

/*
 * Chrome offline dino, authentic feel pass.
 *, scrolling pebbled ground       , parallax drifting clouds
 *, day → night cycle every 250 pts, speed ramps with distance
 *, running-leg + bird-flap animation, 100-pt milestone flash
 *
 * Grid: H rows. GND = ground line. REST = dino feet row (standing).
 * Dino is 2 cells tall standing (head at REST-1), 1 flat cell ducking (REST).
 * Cactus-short occupies rows REST-1..REST. Cactus-tall occupies REST-3..REST.
 * Birds fly at row REST-1 (low → duck/jump) or REST-3 (high → don't jump).
 */

const W = 46;
const H = 12;
const GND = H - 1;        // ground line row
const REST = GND - 1;     // dino feet at rest
const DX = 5;             // dino column

const IMPULSE = -2.2;
const GRAVITY = 0.5;
const VEL_CAP = 3;
const NIGHT_EVERY = 250;  // score units per day/night flip

// scrolling ground texture, '─' track with the odd pebble
const GROUND = "──────▪────·────────▪──·────────";

type Phase = "idle" | "run" | "dead";
type ObsKind = "short" | "tall" | "double" | "birdLow" | "birdHigh";
type Obs = { x: number; kind: ObsKind };
type Cloud = { x: number; row: number };

export default function DinoGame() {
  const phase     = useRef<Phase>("idle");
  const dinoY     = useRef(REST);   // float feet row
  const crouching = useRef(false);
  const vel       = useRef(0);
  const obs       = useRef<Obs[]>([]);
  const clouds    = useRef<Cloud[]>([]);
  const tick      = useRef(0);
  const gOff      = useRef(0);       // ground scroll offset
  const scoreVal  = useRef(0);
  const hiVal     = useRef(0);
  const flashTil  = useRef(0);       // milestone flash until tick

  const { fa } = useT();
  const faRef = useFaRef();

  const [ascii, setAscii] = useState("");
  const [hint, setHint]  = useState("");
  const [score, setScore] = useState(0);
  const [hi, setHi]    = useState(() => (typeof window === "undefined" ? 0 : loadHi("dino")));
  const [night, setNight] = useState(false);
  const [flash, setFlash] = useState(false);

  function isNight() {
    return Math.floor(scoreVal.current / NIGHT_EVERY) % 2 === 1;
  }

  function draw(): string {
    const g: string[][] = Array.from({ length: H }, () => Array(W).fill(" "));
    const dark = isNight();

    // sky: moon + stars at night
    if (dark) {
      g[1][W - 8] = ")";                 // crescent moon
      g[0][8] = "·"; g[2][16] = "·"; g[1][30] = "·"; g[3][38] = "·"; g[0][W - 16] = "·";
    }

    // parallax clouds, small puffs
    for (const c of clouds.current) {
      const x = Math.round(c.x);
      if (x >= 0 && x + 2 < W) { g[c.row][x] = "("; g[c.row][x + 1] = "~"; g[c.row][x + 2] = ")"; }
    }

    // scrolling ground
    for (let x = 0; x < W; x++) {
      g[GND][x] = GROUND[(x + gOff.current) % GROUND.length];
    }

    // dino
    const feet = Math.min(Math.round(dinoY.current), REST);
    if (crouching.current && feet >= REST) {
      g[REST][DX] = "▟"; g[REST][DX + 1] = "▙";   // long flat duck
    } else {
      const grounded = feet >= REST;
      // head/back
      if (feet - 1 >= 0) g[feet - 1][DX] = "▆";
      // legs, alternate while running on the ground
      g[Math.min(feet, REST)][DX] = grounded ? (tick.current % 2 === 0 ? "▟" : "▙") : "█";
    }

    // obstacles
    for (const o of obs.current) {
      const x = o.x;
      if (x < 0 || x >= W) {
        // still draw a partially-visible double cactus' second column etc.
      }
      const put = (c: number, r: number, ch: string) => { if (c >= 0 && c < W) g[r][c] = ch; };
      if (o.kind === "short") {
        put(x, REST - 1, "╻"); put(x, REST, "█");
      } else if (o.kind === "tall") {
        put(x, REST - 3, "╻"); put(x, REST - 2, "█"); put(x, REST - 1, "█"); put(x, REST, "█");
      } else if (o.kind === "double") {
        put(x, REST - 1, "█"); put(x, REST, "█");
        put(x + 1, REST - 1, "█"); put(x + 1, REST, "█");
      } else {
        // bird, flapping wing
        const row = o.kind === "birdLow" ? REST - 1 : REST - 3;
        const wing = tick.current % 2 === 0 ? "‾" : "_";
        put(x, row, ">"); put(x + 1, row, wing);
      }
    }

    return g.map(r => r.join("")).join("\n");
  }

  const jump = useCallback(() => {
    if (phase.current === "idle") { phase.current = "run"; vel.current = IMPULSE; setHint(""); }
    else if (phase.current === "dead") {
      phase.current = "run";
      dinoY.current = REST; vel.current = IMPULSE; crouching.current = false;
      obs.current = []; scoreVal.current = 0; tick.current = 0; gOff.current = 0;
      flashTil.current = 0;
      setScore(0); setNight(false); setFlash(false); setHint("");
    } else if (phase.current === "run" && dinoY.current >= REST && !crouching.current) {
      vel.current = IMPULSE;
    }
  }, []);

  const duck = useCallback((on: boolean) => {
    if (phase.current !== "run") return;
    crouching.current = on;
    if (on && dinoY.current < REST) vel.current = Math.max(vel.current, VEL_CAP); // fast-fall
  }, []);

  useEffect(() => { hiVal.current = hi; }, [hi]);

  // idle instruction, localized, refreshes on language toggle while not playing
  useEffect(() => {
    if (phase.current === "idle") {
      scheduleUpdate(() => setHint(pick(fa, "[ SPACE/↑ ] jump   [ ↓ ] duck", "[ SPACE/↑ ] پرش   [ ↓ ] خم‌شدن")));
    }
  }, [fa]);

  useEffect(() => {
    const dn = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === "ArrowUp") { e.preventDefault(); jump(); }
      if (e.key === "ArrowDown") { e.preventDefault(); duck(true); }
    };
    const up = (e: KeyboardEvent) => { if (e.key === "ArrowDown") duck(false); };
    window.addEventListener("keydown", dn);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", dn); window.removeEventListener("keyup", up); };
  }, [jump, duck]);

  useEffect(() => {
    // seed a couple of clouds
    clouds.current = [{ x: 12, row: 2 }, { x: 30, row: 1 }, { x: 42, row: 3 }];
    scheduleUpdate(() => setAscii(draw()));

    let id: ReturnType<typeof setTimeout>;
    const loop = () => {
      if (phase.current !== "run") { id = setTimeout(loop, 80); return; }
      const t = ++tick.current;
      scoreVal.current++;
      gOff.current = (gOff.current + 1) % GROUND.length;

      // physics
      if (!crouching.current) {
        vel.current = Math.min(vel.current + GRAVITY, VEL_CAP);
        dinoY.current = dinoY.current + vel.current;
        if (dinoY.current >= REST) { dinoY.current = REST; vel.current = 0; }
      } else {
        dinoY.current = REST; vel.current = 0;
      }

      // move obstacles + clouds (clouds drift at half speed = parallax)
      obs.current = obs.current.map(o => ({ ...o, x: o.x - 1 })).filter(o => o.x > -2);
      if (t % 2 === 0) {
        clouds.current = clouds.current.map(c => ({ ...c, x: c.x - 1 })).filter(c => c.x > -3);
        if (clouds.current.length < 3 && Math.random() < 0.3)
          clouds.current.push({ x: W + 2, row: 1 + Math.floor(Math.random() * 3) });
      }

      // spawn, gap shrinks with distance for rising pressure
      const gap = Math.max(13, 26 - Math.floor(scoreVal.current / 120) * 2);
      const last = obs.current[obs.current.length - 1];
      if ((!last || W - last.x >= gap) && Math.random() < 0.5) {
        const r = Math.random();
        const kind: ObsKind =
          r < 0.30 ? "short" :
          r < 0.50 ? "tall" :
          r < 0.65 ? "double" :
          r < 0.83 ? "birdLow" : "birdHigh";
        obs.current.push({ x: W - 1, kind });
      }

      // collision
      const feet = Math.min(Math.round(dinoY.current), REST);
      const occ: Set<number> = crouching.current
        ? new Set([REST])
        : new Set([feet - 1, feet]);
      let dead = false;
      for (const o of obs.current) {
        const cols = (o.kind === "double" || o.kind === "birdLow" || o.kind === "birdHigh")
          ? [o.x, o.x + 1] : [o.x];
        if (!cols.includes(DX)) continue;
        let rows: number[] = [];
        if (o.kind === "short")        rows = [REST - 1, REST];
        else if (o.kind === "tall")    rows = [REST - 3, REST - 2, REST - 1, REST];
        else if (o.kind === "double")  rows = [REST - 1, REST];
        else if (o.kind === "birdLow") rows = [REST - 1];
        else                           rows = [REST - 3];
        if (rows.some(rw => occ.has(rw))) { dead = true; break; }
      }

      // milestone flash every 100 pts
      if (scoreVal.current > 0 && scoreVal.current % 100 === 0) flashTil.current = t + 8;
      const fl = t < flashTil.current;
      if (fl !== flash) setFlash(fl);

      const nightNow = isNight();
      if (nightNow !== night) setNight(nightNow);

      if (dead) {
        phase.current = "dead";
        if (scoreVal.current > hiVal.current) { hiVal.current = scoreVal.current; setHi(hiVal.current); saveHi("dino", hiVal.current); }
        setHint(pick(faRef.current, `G A M E   O V E R, ${scoreVal.current}, [ SPACE/TAP ] retry`, `پایان بازی, ${scoreVal.current}, [ SPACE/لمس ] دوباره`));
      }

      setAscii(draw());
      setScore(scoreVal.current);

      // accelerating frame rate = authentic speed-up
      const interval = Math.max(45, 82 - Math.floor(scoreVal.current / 100) * 4);
      id = setTimeout(loop, interval);
    };
    id = setTimeout(loop, 80);
    return () => clearTimeout(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="select-none outline-none" tabIndex={0}>
      <div className="flex justify-between ascii text-[9px] text-white/30 mb-1">
        <span>DINO  hi:{String(hi).padStart(5, "0")}{night && " ☾"}</span>
        <span className={flash ? "text-green-400" : ""}>
          {flash ? `‹ ${String(score).padStart(5, "0")} ›` : String(score).padStart(5, "0")}
        </span>
      </div>
      <pre
        className={`ascii text-[9px] leading-snug overflow-hidden cursor-pointer transition-colors duration-500 ${night ? "text-indigo-200/45" : "text-white/60"}`}
        onClick={jump}
        onTouchStart={e => { e.preventDefault(); jump(); }}
      >{ascii}</pre>
      {hint && <p className="ascii text-[9px] text-white/30 mt-1 truncate">{hint}</p>}
      {/* Mobile controls */}
      <div className="mt-2 flex gap-2">
        <button
          className="flex-1 border border-white/15 py-1.5 ascii text-[9px] text-white/35 hover:text-white/60 hover:border-white/30 active:bg-white/5 transition-colors"
          onTouchStart={e => { e.preventDefault(); jump(); }}
          onTouchEnd={e => e.preventDefault()}
          onClick={jump}
        >
          {pick(fa, "↑ JUMP", "↑ پرش")}
        </button>
        <button
          className="flex-1 border border-white/15 py-1.5 ascii text-[9px] text-white/35 hover:text-white/60 hover:border-white/30 active:bg-white/5 transition-colors"
          onTouchStart={e => { e.preventDefault(); duck(true); }}
          onTouchEnd={e => { e.preventDefault(); duck(false); }}
          onMouseDown={() => duck(true)}
          onMouseUp={() => duck(false)}
          onMouseLeave={() => duck(false)}
        >
          {pick(fa, "↓ DUCK", "↓ خم")}
        </button>
      </div>
    </div>
  );
}
