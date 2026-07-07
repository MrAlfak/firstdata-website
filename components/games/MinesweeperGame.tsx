"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { loadHi, saveHi } from "./hiscore";
import { useT } from "@/i18n/LangProvider";
import { pick } from "./strings";

const C = 9;
const R = 9;
const MINES = 10;

type Cell = { mine: boolean; revealed: boolean; flagged: boolean; count: number };
type Phase = "idle" | "run" | "won" | "dead";
type Board = Cell[][];

function blank(): Board {
  return Array.from({ length: R }, () =>
    Array.from({ length: C }, () => ({ mine: false, revealed: false, flagged: false, count: 0 }))
  );
}

function plant(b: Board, fr: number, fc: number): Board {
  const nb = b.map(row => row.map(c => ({ ...c })));
  let n = 0;
  while (n < MINES) {
    const r = Math.floor(Math.random() * R);
    const c = Math.floor(Math.random() * C);
    if (nb[r][c].mine) continue;
    if (Math.abs(r - fr) <= 1 && Math.abs(c - fc) <= 1) continue;
    nb[r][c].mine = true; n++;
  }
  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++) {
      if (nb[r][c].mine) continue;
      let cnt = 0;
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < R && nc >= 0 && nc < C && nb[nr][nc].mine) cnt++;
        }
      nb[r][c].count = cnt;
    }
  return nb;
}

function flood(b: Board, sr: number, sc: number): Board {
  const nb = b.map(row => row.map(c => ({ ...c })));
  const q: [number, number][] = [[sr, sc]];
  while (q.length) {
    const [r, c] = q.shift()!;
    if (r < 0 || r >= R || c < 0 || c >= C) continue;
    if (nb[r][c].revealed || nb[r][c].flagged || nb[r][c].mine) continue;
    nb[r][c].revealed = true;
    if (nb[r][c].count === 0)
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++)
          if (dr !== 0 || dc !== 0) q.push([r + dr, c + dc]);
  }
  return nb;
}

const NUM_CLS = ["", "text-blue-400", "text-green-400", "text-red-400", "text-purple-400", "text-red-600", "text-cyan-400", "text-white/80", "text-white/50"];

export default function MinesweeperGame() {
  const { fa } = useT();
  const [board, setBoard]     = useState<Board>(blank());
  const [phase, setPhase]     = useState<Phase>("idle");
  const [flags, setFlags]     = useState(0);
  const [secs, setSecs]      = useState(0);
  const [flagMode, setFlagMode]  = useState(false);
  const [best, setBest]      = useState(() => (typeof window === "undefined" ? 0 : loadHi("mines-best")));
  const secsRef = useRef(0);

  useEffect(() => {
    if (phase !== "run") return;
    const id = setInterval(() => setSecs(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    secsRef.current = secs;
  }, [secs]);

  const checkWin = useCallback((b: Board) => {
    if (b.every(row => row.every(cell => cell.mine || cell.revealed))) {
      setPhase("won");
      const elapsed = secsRef.current;
      setBest((prev) => {
        const nb = prev === 0 ? elapsed : Math.min(prev, elapsed);
        saveHi("mines-best", nb);
        return nb;
      });
    }
  }, []);

  const handleClick = useCallback((r: number, c: number) => {
    setBoard(prev => {
      if (prev[r][c].revealed || prev[r][c].flagged) return prev;
      let b = prev;
      if (phase === "idle") { b = plant(prev, r, c); setPhase("run"); setSecs(0); }
      if (b[r][c].mine) {
        setPhase("dead");
        return b.map(row => row.map(cell => ({ ...cell, revealed: true })));
      }
      const nb = flood(b, r, c);
      checkWin(nb);
      return nb;
    });
  }, [phase, checkWin]);

  const handleFlag = useCallback((e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (phase !== "run" && phase !== "idle") return;
    setBoard(prev => {
      if (prev[r][c].revealed) return prev;
      const nb = prev.map(row => row.map(c => ({ ...c })));
      nb[r][c].flagged = !nb[r][c].flagged;
      setFlags(f => nb[r][c].flagged ? f + 1 : f - 1);
      return nb;
    });
  }, [phase]);

  // chord: click a satisfied number to reveal its remaining neighbours (classic feel)
  const chord = useCallback((r: number, c: number) => {
    setBoard(prev => {
      const cell = prev[r][c];
      if (!cell.revealed || cell.count === 0) return prev;
      let flagged = 0;
      const hidden: [number, number][] = [];
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr, nc = c + dc;
          if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
          if (prev[nr][nc].flagged) flagged++;
          else if (!prev[nr][nc].revealed) hidden.push([nr, nc]);
        }
      if (flagged !== cell.count) return prev; // not satisfied, do nothing
      // wrong flags → stepping on a mine
      if (hidden.some(([nr, nc]) => prev[nr][nc].mine)) {
        setPhase("dead");
        return prev.map(row => row.map(cl => ({ ...cl, revealed: true })));
      }
      let nb = prev;
      for (const [nr, nc] of hidden) nb = flood(nb, nr, nc);
      checkWin(nb);
      return nb;
    });
  }, [checkWin]);

  const reset = () => { setBoard(blank()); setPhase("idle"); setFlags(0); setSecs(0); setFlagMode(false); };

  function cellChar(cell: Cell, isDead: boolean): { ch: string; cls: string } {
    if (isDead && cell.mine) return { ch: cell.flagged ? "⚑" : "✸", cls: cell.flagged ? "text-green-400" : "text-red-400" };
    if (cell.flagged)   return { ch: "⚑", cls: "text-yellow-400" };
    if (!cell.revealed) return { ch: "▓", cls: "text-white/25 hover:text-white/50" };
    if (cell.mine)      return { ch: "✸", cls: "text-red-500" };
    if (cell.count === 0) return { ch: "·", cls: "text-white/15" };
    return { ch: String(cell.count), cls: NUM_CLS[cell.count] ?? "" };
  }

  const isDead = phase === "dead";
  const remaining = MINES - flags;
  const face = phase === "won" ? "😎" : isDead ? "😵" : "🙂";
  const led = (n: number) => String(Math.max(0, Math.min(999, n))).padStart(3, "0");

  return (
    <div className="select-none">
      <div className="flex justify-between ascii text-[9px] text-white/30 mb-1.5">
        <span>MINESWEEPER{best > 0 && `  ${pick(fa, "best", "رکورد")}:${best}s`}</span>
        <span>{phase === "won" ? pick(fa, "✓ cleared", "✓ پاک شد") : isDead ? pick(fa, "✸ boom", "✸ ترکید") : phase === "run" ? pick(fa, "▸ running", "▸ در حال اجرا") : pick(fa, "press a tile", "یک خانه بزن")}</span>
      </div>

      {/* Classic counter / face / timer bar */}
      <div className="flex items-center justify-between border border-white/15 bg-white/[0.03] px-2 py-1.5 mb-2">
        <span className="font-mono text-[13px] tracking-[0.15em] bg-black px-1.5 py-0.5 text-red-500 tabular-nums shadow-inner">
          {led(remaining)}
        </span>
        <button
          onClick={reset}
          aria-label="reset game"
          className="text-base leading-none transition-transform duration-100 hover:scale-110 active:scale-95"
        >
          {face}
        </button>
        <span className="font-mono text-[13px] tracking-[0.15em] bg-black px-1.5 py-0.5 text-red-500 tabular-nums shadow-inner">
          {led(secs)}
        </span>
      </div>

      <div className="font-mono text-[10px] leading-none">
        {board.map((row, r) => (
          <div key={r} className="flex">
            {row.map((cell, c) => {
              const { ch, cls } = cellChar(cell, isDead);
              return (
                <span
                  key={c}
                  className={`cursor-pointer inline-block w-[1.6ch] text-center transition-colors duration-75 ${cls}`}
                  onClick={e => {
                    if (isDead || phase === "won") { reset(); return; }
                    if (flagMode) { handleFlag(e, r, c); return; }
                    if (cell.revealed) { chord(r, c); return; }
                    handleClick(r, c);
                  }}
                  onContextMenu={e => handleFlag(e, r, c)}
                >
                  {ch}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-3">
        <p className="ascii text-[9px] text-white/20 flex-1">{pick(fa, "right-click: flag, click number: chord", "راست‌کلیک: پرچم, کلیک عدد: chord")}</p>
        <button
          onClick={() => setFlagMode(f => !f)}
          className={`ascii text-[9px] border px-2 py-0.5 transition-colors
            ${flagMode
              ? "border-yellow-500/60 text-yellow-400 bg-yellow-900/20"
              : "border-white/15 text-white/30 hover:border-white/30 hover:text-white/50"}`}
        >
          ⚑ {flagMode ? pick(fa, "flag on", "پرچم روشن") : pick(fa, "flag off", "پرچم خاموش")}
        </button>
      </div>
    </div>
  );
}
