"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { loadHi, saveHi } from "./hiscore";
import { useT } from "@/i18n/LangProvider";
import { useFaRef } from "./useFaRef";
import { scheduleUpdate } from "@/lib/react/schedule-update";
import { pick } from "./strings";

const W = 28;
const H = 11;
const BASKET_W = 5;
const MAX_LIVES = 5;

type Phase = "idle" | "run" | "dead";
type Item = { x: number; y: number; label: string; speed: number };

const ITEMS = ["[WEB]", "[APP]", "[SEO]", "[UX·]", "[SHP]", "[IOS]", "[WIN]"];

export default function CatchGame() {
  const phase      = useRef<Phase>("idle");
  const basketX    = useRef(Math.floor((W - BASKET_W) / 2));
  const items      = useRef<Item[]>([]);
  const frameN     = useRef(0);
  const scoreVal   = useRef(0);
  const hiVal      = useRef(0);
  const lives      = useRef(MAX_LIVES);
  const combo      = useRef(0);
  const touchX     = useRef<number | null>(null);

  const { fa } = useT();
  const faRef = useFaRef();

  const [ascii, setAscii]   = useState("");
  const [score, setScore]   = useState(0);
  const [hi, setHi]      = useState(() => (typeof window === "undefined" ? 0 : loadHi("catch")));
  const [livesD, setLivesD]  = useState(MAX_LIVES);
  const [comboD, setComboD]  = useState(0);
  const [phase2, setPhase2]  = useState<Phase>("idle");
  const [msg, setMsg]     = useState("");

  function draw(): string {
    const g: string[][] = Array.from({ length: H }, () => Array(W).fill(" "));
    for (const it of items.current) {
      const y = Math.round(it.y);
      if (y >= 0 && y < H - 1) {
        for (let i = 0; i < it.label.length; i++) {
          const x = it.x + i;
          if (x >= 0 && x < W) g[y][x] = it.label[i];
        }
      }
    }
    const bx = basketX.current;
    for (let x = 0; x < W; x++) g[H - 1][x] = "·";
    g[H - 1][bx] = "└";
    for (let i = 1; i < BASKET_W - 1; i++) g[H - 1][bx + i] = "─";
    g[H - 1][bx + BASKET_W - 1] = "┘";
    return g.map(r => r.join("")).join("\n");
  }

  const moveLeft  = useCallback(() => {
    if (phase.current === "idle") { phase.current = "run"; setPhase2("run"); setMsg(""); }
    basketX.current = Math.max(0, basketX.current - 2);
  }, []);

  const moveRight = useCallback(() => {
    if (phase.current === "idle") { phase.current = "run"; setPhase2("run"); setMsg(""); }
    basketX.current = Math.min(W - BASKET_W, basketX.current + 2);
  }, []);

  const restart = useCallback(() => {
    phase.current = "run"; setPhase2("run");
    basketX.current = Math.floor((W - BASKET_W) / 2);
    items.current = []; scoreVal.current = 0; lives.current = MAX_LIVES;
    combo.current = 0; frameN.current = 0;
    setScore(0); setLivesD(MAX_LIVES); setComboD(0); setMsg("");
  }, []);

  useEffect(() => { hiVal.current = hi; }, [hi]);

  // idle prompt, localized, refreshes on language toggle while not playing
  useEffect(() => {
    if (phase.current === "idle") {
      scheduleUpdate(() => setMsg(pick(fa, "← → / A D / swipe to move  catch items!", "← → / A D / کشیدن برای حرکت  آیتم‌ها را بگیر!")));
    }
  }, [fa]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft"  || e.key === "a" || e.key === "A") { e.preventDefault(); moveLeft(); }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") { e.preventDefault(); moveRight(); }
      if ((e.code === "Space" || e.key === "Enter") && phase.current === "dead") restart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [moveLeft, moveRight, restart]);

  useEffect(() => {
    scheduleUpdate(() => setAscii(draw()));
    const id = setInterval(() => {
      if (phase.current !== "run") return;
      frameN.current++;

      items.current = items.current.map(it => ({ ...it, y: it.y + it.speed }));

      const bx = basketX.current;
      const surviving: Item[] = [];
      for (const it of items.current) {
        if (Math.round(it.y) >= H - 1) {
          const center = it.x + Math.floor(it.label.length / 2);
          if (center >= bx && center < bx + BASKET_W) {
            combo.current++;
            const pts = Math.min(combo.current, 5);
            scoreVal.current += pts;
            setScore(scoreVal.current);
            setComboD(combo.current);
          } else {
            combo.current = 0;
            setComboD(0);
            lives.current--;
            setLivesD(lives.current);
            if (lives.current <= 0) {
              phase.current = "dead"; setPhase2("dead");
              if (scoreVal.current > hiVal.current) { hiVal.current = scoreVal.current; setHi(hiVal.current); saveHi("catch", hiVal.current); }
              setMsg(pick(faRef.current, `score:${scoreVal.current}  hi:${hiVal.current}  [ SPACE/TAP ] retry`, `امتیاز:${scoreVal.current}  رکورد:${hiVal.current}  [ SPACE/لمس ] دوباره`));
            }
          }
        } else {
          surviving.push(it);
        }
      }
      items.current = surviving;

      const spawnRate = Math.max(10, 20 - Math.floor(scoreVal.current / 8));
      if (frameN.current % spawnRate === 0) {
        const label = ITEMS[Math.floor(Math.random() * ITEMS.length)];
        const spd = 0.3 + Math.random() * 0.2 + Math.floor(scoreVal.current / 20) * 0.05;
        items.current.push({ x: Math.floor(Math.random() * (W - label.length)), y: 0, label, speed: spd });
      }

      setAscii(draw());
    }, 70);
    return () => clearInterval(id);
  }, [faRef]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    if (phase.current === "dead") { restart(); return; }
    if (x < rect.width / 2) moveLeft(); else moveRight();
  };

  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (touchX.current === null) return;
    const dx = e.touches[0].clientX - touchX.current;
    if (Math.abs(dx) > 12) {
      if (dx < 0) moveLeft(); else moveRight();
      touchX.current = e.touches[0].clientX;
    }
  };

  const hearts = "♥".repeat(livesD) + "♡".repeat(MAX_LIVES - livesD);
  const comboTxt = comboD > 1 ? `×${Math.min(comboD, 5)}` : "";

  return (
    <div
      className="select-none outline-none"
      style={{ touchAction: "none" }}
      tabIndex={0}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      <div className="flex justify-between ascii text-[9px] text-white/30 mb-1">
        <span>{hearts}</span>
        <span>
          {comboTxt && <span className="text-yellow-400 mr-2">{comboTxt}</span>}
          score:{score}  hi:{hi}
        </span>
      </div>
      <pre className="ascii text-[9px] leading-snug text-white/60 overflow-hidden">{ascii}</pre>
      <p className="ascii text-[9px] text-white/25 mt-1 truncate">
        {phase2 === "dead" ? msg : pick(fa, "← → or A D to move, tap left/right half", "← → یا A D برای حرکت, لمس نیمه چپ/راست")}
      </p>
    </div>
  );
}
