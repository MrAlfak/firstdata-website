"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { loadHi, saveHi } from "./hiscore";
import { useT } from "@/i18n/LangProvider";
import { useFaRef } from "./useFaRef";
import { scheduleUpdate } from "@/lib/react/schedule-update";
import { pick } from "./strings";

const GRID  = 3;
const TOTAL = GRID * GRID;
const TIMER = 30;
const BAR_W = 22;
const BUG_LIFE = 25; // ticks a bug stays alive (100ms each → 2.5s)

type Phase = "idle" | "run" | "dead";
const BUGS = ["BUG", "ERR", "NUL", "404", "OOM", "NaN", "503", "INF"];

type BugCell = { label: string; born: number } | null;

export default function WhackGame() {
  const phase    = useRef<Phase>("idle");
  const cells    = useRef<BugCell[]>(Array(TOTAL).fill(null));
  const scoreVal = useRef(0);
  const timeLeft = useRef(TIMER);
  const tickRef  = useRef(0);
  const streak   = useRef(0);
  const hiVal    = useRef(0);

  const { fa } = useT();
  const faRef = useFaRef();

  const [display, setDisplay] = useState<BugCell[]>(Array(TOTAL).fill(null));
  const [score, setScore]   = useState(0);
  const [time, setTime]    = useState(TIMER);
  const [tick, setTick]    = useState(0);
  const [hi, setHi]      = useState(() => (typeof window === "undefined" ? 0 : loadHi("whack")));
  const [phase2, setPhase2]  = useState<Phase>("idle");
  const [msg, setMsg]     = useState("");
  const [streakD, setStreakD] = useState(0);

  const start = useCallback(() => {
    cells.current = Array(TOTAL).fill(null);
    scoreVal.current = 0; timeLeft.current = TIMER;
    tickRef.current = 0; streak.current = 0;
    phase.current = "run"; setPhase2("run");
    setScore(0); setTime(TIMER); setMsg(""); setStreakD(0);
    setDisplay(Array(TOTAL).fill(null));
  }, []);

  const whack = useCallback((idx: number) => {
    if (phase.current === "idle" || phase.current === "dead") { start(); return; }
    if (phase.current !== "run") return;
    if (cells.current[idx]) {
      cells.current[idx] = null;
      streak.current++;
      const pts = streak.current >= 3 ? 2 : 1;
      scoreVal.current += pts;
      setScore(scoreVal.current);
      setStreakD(streak.current);
      setDisplay([...cells.current]);
    } else {
      streak.current = 0;
      setStreakD(0);
    }
  }, [start]);

  useEffect(() => { hiVal.current = hi; }, [hi]);

  // idle prompt, localized, refreshes on language toggle before a round starts
  useEffect(() => {
    if (phase.current === "idle") {
      scheduleUpdate(() => setMsg(pick(fa, "click a cell to start", "برای شروع یک خانه را بزن")));
    }
  }, [fa]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const n = parseInt(e.key);
      if (n >= 1 && n <= 9) whack(n - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [whack]);

  useEffect(() => {
    const id = setInterval(() => {
      if (phase.current !== "run") return;
      const tickN = ++tickRef.current;
      setTick(tickN);

      // 1-second countdown every 10 ticks
      if (tick % 10 === 0) {
        timeLeft.current--;
        setTime(timeLeft.current);
        if (timeLeft.current <= 0) {
          phase.current = "dead"; setPhase2("dead");
          if (scoreVal.current > hiVal.current) { hiVal.current = scoreVal.current; setHi(hiVal.current); saveHi("whack", hiVal.current); }
          setMsg(pick(faRef.current, `time up! score:${scoreVal.current}  hi:${hiVal.current}, click to retry`, `وقت تمام! امتیاز:${scoreVal.current}  رکورد:${hiVal.current}, برای تکرار کلیک کن`));
          cells.current = Array(TOTAL).fill(null);
          setDisplay(Array(TOTAL).fill(null));
          return;
        }
      }

      // expire old bugs by lifetime
      const nb = cells.current.map(c =>
        c && tick - c.born >= BUG_LIFE ? null : c
      );
      cells.current = nb;

      // spawn, faster as score increases
      const spawnEvery = Math.max(3, 10 - Math.floor(scoreVal.current / 5));
      if (tick % spawnEvery === 0) {
        const empty = nb.map((c, i) => c === null ? i : -1).filter(i => i !== -1);
        if (empty.length > 0) {
          const idx = empty[Math.floor(Math.random() * empty.length)];
          cells.current[idx] = {
            label: BUGS[Math.floor(Math.random() * BUGS.length)], born: tick, };
        }
      }

      setDisplay([...cells.current]);
    }, 100);
    return () => clearInterval(id);
    // tick state is updated inside the loop for render-only urgency; interval must stay mount-scoped
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faRef]);

  function timeBar(): string {
    const pct = time / TIMER;
    const filled = Math.round(pct * BAR_W);
    const ch = time <= 8 ? "!" : time <= 16 ? "=" : "█";
    return "[" + ch.repeat(Math.max(0, filled)) + "·".repeat(Math.max(0, BAR_W - filled)) + "] " + time + "s";
  }

  // urgency: how close is a bug to expiring? (0=fresh, 1=about to die)
  function bugUrgency(cell: BugCell): number {
    if (!cell) return 0;
    return Math.min(1, (tick - cell.born) / BUG_LIFE);
  }

  const labels = ["1","2","3","4","5","6","7","8","9"];
  const bonusActive = streakD >= 3;

  return (
    <div className="select-none">
      <div className="flex justify-between ascii text-[9px] text-white/30 mb-1">
        <span>WHACK-A-BUG  hi:{hi}</span>
        <span>
          score:{score}
          {bonusActive && <span className="text-yellow-400 ml-1">×2</span>}
        </span>
      </div>

      <pre className={`ascii text-[9px] leading-none mb-2 ${time <= 8 ? "text-red-400/80" : "text-white/30"}`}>
        {timeBar()}
      </pre>

      <div className="grid grid-cols-3 gap-1.5">
        {Array.from({ length: TOTAL }, (_, i) => {
          const cell = display[i];
          const urgency = bugUrgency(cell);
          const isUrgent = urgency > 0.65;
          return (
            <button key={i} onClick={() => whack(i)}
              className={`h-9 border font-mono text-[9px] tracking-wider transition-all duration-75
                ${cell
                  ? isUrgent
                    ? "border-orange-500/80 bg-orange-900/30 text-orange-300 animate-pulse scale-[1.03]"
                    : "border-red-500/70 bg-red-900/25 text-red-400 scale-[1.04]"
                  : "border-white/12 bg-white/[0.02] text-white/20 hover:border-white/25 hover:text-white/40"}`}
            >
              {cell ? cell.label : labels[i]}
            </button>
          );
        })}
      </div>

      <p className="ascii text-[9px] mt-2 text-center truncate">
        {phase2 === "dead"
          ? <span className="text-white/40">{msg}</span>
          : phase2 === "idle"
          ? <span className="text-white/30">{msg}</span>
          : <span className="text-white/20">
              {bonusActive
                ? pick(fa, `🔥 ×2 streak, press 1-9 or click bugs`, `🔥 ×2 رگبار, ۱-۹ یا روی باگ‌ها بزن`)
                : pick(fa, `press 1-9 or click bugs`, `۱-۹ یا روی باگ‌ها بزن`)}
            </span>
        }
      </p>
    </div>
  );
}
