"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { loadHi, saveHi } from "./hiscore";
import { useT } from "@/i18n/LangProvider";
import { useFaRef } from "./useFaRef";
import { scheduleUpdate } from "@/lib/react/schedule-update";
import { pick } from "./strings";

const COLS = 20;
const ROWS = 8;
type Dir = "U" | "D" | "L" | "R";
type Pt = { x: number; y: number };
type Phase = "idle" | "run" | "dead";

const INIT: Pt[] = [{ x: 5, y: 4 }, { x: 4, y: 4 }, { x: 3, y: 4 }];

function randFood(snake: Pt[]): Pt {
  let f: Pt;
  do { f = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }; }
  while (snake.some(s => s.x === f.x && s.y === f.y));
  return f;
}

function speed(len: number) { return Math.max(80, 160 - len * 6); }

export default function SnakeGame() {
  const phase    = useRef<Phase>("idle");
  const snake    = useRef<Pt[]>(INIT.map(p => ({ ...p })));
  const dir      = useRef<Dir>("R");
  const next     = useRef<Dir>("R");
  const food     = useRef<Pt>(randFood(INIT));
  const scoreVal = useRef(0);
  const hiVal    = useRef(0);
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  const eatRef = useRef(0);

  const { fa } = useT();
  const faRef = useFaRef();

  const [ascii, setAscii] = useState("");
  const [info, setInfo]  = useState("");
  const [hi, setHi]    = useState(() => (typeof window === "undefined" ? 0 : loadHi("snake")));
  const [eat, setEat]   = useState(false);

  const HEAD: Record<Dir, string> = { R: "►", L: "◄", U: "▲", D: "▼" };

  function draw(): string {
    const rows: string[] = ["┌" + "─".repeat(COLS) + "┐"];
    for (let r = 0; r < ROWS; r++) {
      let row = "│";
      for (let c = 0; c < COLS; c++) {
        const isHead = snake.current[0].x === c && snake.current[0].y === r;
        const isTail = snake.current.slice(1).some(s => s.x === c && s.y === r);
        const isFood = food.current.x === c && food.current.y === r;
        row += isHead ? HEAD[dir.current] : isTail ? "█" : isFood ? "◆" : " ";
      }
      rows.push(row + "│");
    }
    rows.push("└" + "─".repeat(COLS) + "┘");
    return rows.join("\n");
  }

  const steer = useCallback((d: Dir) => {
    const opp: Record<Dir, Dir> = { U: "D", D: "U", L: "R", R: "L" };
    if (phase.current === "idle") { phase.current = "run"; setInfo(""); }
    if (phase.current === "run" && d !== opp[dir.current]) next.current = d;
  }, []);

  const restart = useCallback(() => {
    snake.current = INIT.map(p => ({ ...p }));
    dir.current = "R"; next.current = "R";
    food.current = randFood(INIT);
    scoreVal.current = 0; eatRef.current = 0;
    phase.current = "run";
    setInfo(""); setEat(false);
  }, []);

  useEffect(() => { hiVal.current = hi; }, [hi]);

  // idle prompt, localized, refreshes on language toggle while not playing
  useEffect(() => {
    if (phase.current === "idle") {
      scheduleUpdate(() => setInfo(pick(fa, "[ ←↑↓→ / swipe ] to start", "[ ←↑↓→ / کشیدن ] برای شروع")));
    }
  }, [fa]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: "U", w: "U", W: "U", ArrowDown: "D", s: "D", S: "D", ArrowLeft: "L", a: "L", A: "L", ArrowRight: "R", d: "R", D: "R", };
      if (map[e.key]) { e.preventDefault(); steer(map[e.key]); }
      if ((e.code === "Space" || e.key === "Enter") && phase.current === "dead") restart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [steer, restart]);

  useEffect(() => {
    let id: ReturnType<typeof setInterval>;

    function tick() {
      if (phase.current !== "run") { id = setTimeout(tick, 160); return; }

      dir.current = next.current;
      const h = snake.current[0];
      const nh: Pt = {
        x: h.x + (dir.current === "R" ? 1 : dir.current === "L" ? -1 : 0), y: h.y + (dir.current === "D" ? 1 : dir.current === "U" ? -1 : 0), };

      // authentic Snake: walls kill, and so does hitting your own body
      const hitWall = nh.x < 0 || nh.x >= COLS || nh.y < 0 || nh.y >= ROWS;
      const hitSelf = snake.current.some(s => s.x === nh.x && s.y === nh.y);
      if (hitWall || hitSelf) {
        phase.current = "dead";
        if (scoreVal.current > hiVal.current) { hiVal.current = scoreVal.current; setHi(hiVal.current); saveHi("snake", hiVal.current); }
        setInfo(pick(faRef.current, `DEAD  score:${scoreVal.current}  hi:${hiVal.current}  [ SPACE/SWIPE ] retry`, `باخت  امتیاز:${scoreVal.current}  رکورد:${hiVal.current}  [ SPACE/کشیدن ] دوباره`));
        setEat(false);
        id = setTimeout(tick, 160);
        return;
      }

      snake.current = [nh, ...snake.current];
      if (nh.x === food.current.x && nh.y === food.current.y) {
        scoreVal.current++;
        eatRef.current = 2;
        food.current = randFood(snake.current);
      } else {
        snake.current.pop();
      }

      if (eatRef.current > 0) eatRef.current--;
      setEat(eatRef.current > 0);
      setAscii(draw());
      setInfo(pick(faRef.current, `len:${snake.current.length}  score:${scoreVal.current}`, `طول:${snake.current.length}  امتیاز:${scoreVal.current}`));
      id = setTimeout(tick, speed(snake.current.length));
    }

    scheduleUpdate(() => setAscii(draw()));
    id = setTimeout(tick, 160);
    return () => clearTimeout(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    if (phase.current === "dead") restart();
    if (phase.current === "idle") { phase.current = "run"; setInfo(""); }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchRef.current) return;
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    const dy = e.changedTouches[0].clientY - touchRef.current.y;
    touchRef.current = null;
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
    if (Math.abs(dx) > Math.abs(dy)) steer(dx > 0 ? "R" : "L");
    else steer(dy > 0 ? "D" : "U");
  };

  return (
    <div
      className="select-none outline-none"
      tabIndex={0}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex justify-between ascii text-[9px] text-white/30 mb-1">
        <span>SNAKE  hi:{hi}</span>
        <span className={eat ? "text-green-400" : ""}>{info}</span>
      </div>
      <pre className={`ascii text-[9px] leading-snug overflow-hidden transition-colors duration-100 ${eat ? "text-green-300/80" : "text-white/60"}`}>{ascii}</pre>
    </div>
  );
}
