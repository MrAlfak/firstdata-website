import {
  MAP_RENDER_CELLS,
  MAP_RENDER_COLS,
  MAP_RENDER_ROWS,
  MAP_STRIDE,
  type IranLandCell,
} from "./iran-grid-data";

export const CELL = 12;
export const GAP = 2;
export const PITCH = CELL + GAP;
export const PAD = 0;

export const MAP_W = PAD * 2 + MAP_RENDER_COLS * PITCH - GAP;
export const MAP_H = PAD * 2 + MAP_RENDER_ROWS * PITCH - GAP;

const STAGGER_MS = 0.65;
const STAGGER_MAX_MS = 2800;
const POP_MS = 280;

export const MAP_BRIGHT_CELLS = MAP_RENDER_CELLS.filter((c) => c.bright);

type Rgb = [number, number, number];

type Palette = {
  dim: Rgb;
  bright: Rgb;
};

type PopEntry = { cell: IranLandCell; start: number };

function readCssRgb(name: string): Rgb {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const parts = raw.split(/\s+/).map(Number);
  return [parts[0] ?? 51, parts[1] ?? 255, parts[2] ?? 102];
}

export function readMapPalette(): Palette {
  return {
    dim: readCssRgb("--c-fg"),
    bright: readCssRgb("--c-accent"),
  };
}

function cellOrigin(row: number, col: number) {
  return {
    x: PAD + col * PITCH,
    y: PAD + row * PITCH,
  };
}

function rgba([r, g, b]: Rgb, a: number) {
  return `rgba(${r},${g},${b},${a})`;
}

function popScale(t: number): number {
  if (t < 0.7) return 0.12 + (t / 0.7) * 1.01;
  return 1.13 - ((t - 0.7) / 0.3) * 0.13;
}

function popOpacity(t: number): number {
  return Math.min(1, t * 1.45);
}

function drawSquare(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
  alpha = 1,
) {
  const bleed = GAP > 0 ? 0 : 1;
  if (alpha < 1) ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size + bleed, size + bleed);
  if (alpha < 1) ctx.globalAlpha = 1;
}

function drawSettledCell(ctx: CanvasRenderingContext2D, cell: IranLandCell, palette: Palette) {
  const { x, y } = cellOrigin(cell.row, cell.col);
  if (cell.bright) {
    drawSquare(ctx, x, y, CELL, rgba(palette.bright, 0.62));
  } else {
    drawSquare(ctx, x, y, CELL, rgba(palette.dim, 0.48));
  }
}

function drawPopCell(
  ctx: CanvasRenderingContext2D,
  cell: IranLandCell,
  progress: number,
  palette: Palette,
) {
  const { x, y } = cellOrigin(cell.row, cell.col);
  const scale = popScale(progress);
  const size = CELL * scale;
  const cx = x + CELL / 2;
  const cy = y + CELL / 2;
  const color = cell.bright ? rgba(palette.bright, 0.9) : rgba(palette.dim, 0.6);
  drawSquare(ctx, cx - size / 2, cy - size / 2, size, color, popOpacity(progress));
}

function clearCanvas(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, MAP_W, MAP_H);
}

function drawBrightOverlay(ctx: CanvasRenderingContext2D, palette: Palette) {
  clearCanvas(ctx);
  for (const cell of MAP_BRIGHT_CELLS) {
    const { x, y } = cellOrigin(cell.row, cell.col);
    drawSquare(ctx, x, y, CELL, rgba(palette.bright, 0.95));
  }
}

function drawAllCells(ctx: CanvasRenderingContext2D, palette: Palette) {
  clearCanvas(ctx);
  for (const cell of MAP_RENDER_CELLS) drawSettledCell(ctx, cell, palette);
}

function cellDelayMs(order: number) {
  return Math.min(order * STAGGER_MS, STAGGER_MAX_MS);
}

export type IranGridRenderer = {
  start: () => void;
  stop: () => void;
  onComplete: (cb: () => void) => void;
};

export function createIranGridRenderer(
  mainCanvas: HTMLCanvasElement,
  brightCanvas: HTMLCanvasElement | null,
  reducedMotion: boolean,
): IranGridRenderer {
  mainCanvas.width = MAP_W;
  mainCanvas.height = MAP_H;
  if (brightCanvas) {
    brightCanvas.width = MAP_W;
    brightCanvas.height = MAP_H;
  }

  const mainCtx = mainCanvas.getContext("2d", { alpha: true });
  if (!mainCtx) {
    return { start: () => {}, stop: () => {}, onComplete: () => {} };
  }

  const brightCtx = brightCanvas?.getContext("2d", { alpha: true }) ?? null;
  const landCanvas = document.createElement("canvas");
  landCanvas.width = MAP_W;
  landCanvas.height = MAP_H;
  const landCtx = landCanvas.getContext("2d", { alpha: true })!;

  const palette = readMapPalette();
  clearCanvas(landCtx);

  let rafId = 0;
  let nextIndex = 0;
  let startTime = 0;
  const activePops: PopEntry[] = [];
  let completeCb: (() => void) | null = null;
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    if (brightCtx && brightCanvas) {
      drawBrightOverlay(brightCtx, palette);
      brightCanvas.classList.add("iran-grid-map__bright--on");
    }
    completeCb?.();
  };

  const paintFrame = (now: number) => {
    const elapsed = startTime ? now - startTime : 0;

    while (nextIndex < MAP_RENDER_CELLS.length) {
      const cell = MAP_RENDER_CELLS[nextIndex];
      if (elapsed < cellDelayMs(cell.order)) break;
      activePops.push({ cell, start: now });
      nextIndex++;
    }

    for (let i = activePops.length - 1; i >= 0; i--) {
      const pop = activePops[i];
      const t = (now - pop.start) / POP_MS;
      if (t >= 1) {
        drawSettledCell(landCtx, pop.cell, palette);
        activePops.splice(i, 1);
      }
    }

    clearCanvas(mainCtx);
    mainCtx.drawImage(landCanvas, 0, 0);
    for (const pop of activePops) {
      const t = Math.min(1, (now - pop.start) / POP_MS);
      drawPopCell(mainCtx, pop.cell, t, palette);
    }

    if (nextIndex >= MAP_RENDER_CELLS.length && activePops.length === 0) {
      finish();
      return;
    }

    rafId = requestAnimationFrame(paintFrame);
  };

  const start = () => {
    if (reducedMotion) {
      drawAllCells(mainCtx, palette);
      finish();
      return;
    }
    startTime = performance.now();
    rafId = requestAnimationFrame(paintFrame);
  };

  const stop = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  };

  return {
    start,
    stop,
    onComplete: (cb) => {
      completeCb = cb;
    },
  };
}

/** Align HTML markers with coarse canvas cell centers (not raw 120×108 %). */
export function citySourcePercentPosition(sourceRow: number, sourceCol: number) {
  const coarseCol = Math.floor(sourceCol / MAP_STRIDE);
  const coarseRow = Math.floor(sourceRow / MAP_STRIDE);
  const cx = PAD + coarseCol * PITCH + CELL / 2;
  const cy = PAD + coarseRow * PITCH + CELL / 2;
  return {
    left: `${(cx / MAP_W) * 100}%`,
    top: `${(cy / MAP_H) * 100}%`,
  };
}
