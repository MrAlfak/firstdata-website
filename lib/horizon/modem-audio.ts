/**
 * Procedural dial-up modem handshake via Web Audio API.
 * Phases align to Horizon ceremony beats:
 *   Dial-up → Handshake → Uplink → AI resolve
 */

type ModemAudioHandle = {
  stop: () => void;
};

function tone(
  ctx: AudioContext,
  dest: AudioNode,
  freq: number,
  start: number,
  dur: number,
  type: OscillatorType = "sine",
  gain = 0.04,
  pan = 0,
) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(gain, start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, start + Math.max(dur, 0.04));
  osc.connect(g);
  if (ctx.createStereoPanner) {
    const panner = ctx.createStereoPanner();
    panner.pan.setValueAtTime(Math.max(-1, Math.min(1, pan)), start);
    g.connect(panner);
    panner.connect(dest);
  } else {
    g.connect(dest);
  }
  osc.start(start);
  osc.stop(start + dur + 0.03);
}

function dualTone(
  ctx: AudioContext,
  dest: AudioNode,
  a: number,
  b: number,
  start: number,
  dur: number,
  gain = 0.035,
  pan = 0,
) {
  tone(ctx, dest, a, start, dur, "sine", gain, pan - 0.15);
  tone(ctx, dest, b, start, dur, "sine", gain, pan + 0.15);
}

/** DTMF keypad frequencies (row, col). */
const DTMF: Record<string, [number, number]> = {
  "0": [941, 1336],
  "1": [697, 1209],
  "8": [852, 1336],
  "9": [852, 1477],
  "*": [941, 1209],
};

function noiseBurst(
  ctx: AudioContext,
  dest: AudioNode,
  start: number,
  dur: number,
  gain = 0.03,
  fromHz = 1200,
  toHz = 2800,
) {
  const len = Math.ceil(ctx.sampleRate * dur);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const g = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(fromHz, start);
  filter.frequency.exponentialRampToValueAtTime(toHz, start + dur * 0.45);
  filter.frequency.exponentialRampToValueAtTime(Math.max(fromHz * 0.7, 200), start + dur);
  filter.Q.value = 2.4;
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(gain, start + 0.04);
  g.gain.exponentialRampToValueAtTime(gain * 0.65, start + dur * 0.55);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  src.connect(filter);
  filter.connect(g);
  g.connect(dest);
  src.start(start);
  src.stop(start + dur + 0.02);
}

function sweep(
  ctx: AudioContext,
  dest: AudioNode,
  from: number,
  to: number,
  start: number,
  dur: number,
  gain = 0.028,
  type: OscillatorType = "sawtooth",
) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(from, start);
  osc.frequency.exponentialRampToValueAtTime(Math.max(to, 40), start + dur);
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(gain, start + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(g);
  g.connect(dest);
  osc.start(start);
  osc.stop(start + dur + 0.02);
}

/** Soft filtered noise bed — line hiss under dial/handshake. */
function hissBed(
  ctx: AudioContext,
  dest: AudioNode,
  start: number,
  dur: number,
  gain = 0.012,
) {
  const len = Math.ceil(ctx.sampleRate * dur);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 1800;
  filter.Q.value = 0.7;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(gain, start + 0.2);
  g.gain.setValueAtTime(gain * 0.7, start + dur * 0.7);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  src.connect(filter);
  filter.connect(g);
  g.connect(dest);
  src.start(start);
  src.stop(start + dur + 0.02);
}

/**
 * Play a condensed cinematic modem handshake synced to ceremony timing.
 * Returns a stop handle — call on unmount / ceremony end.
 */
export function playModemHandshake(totalMs: number): ModemAudioHandle | null {
  if (typeof window === "undefined") return null;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;

  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;

  const ctx = new AC();
  const master = ctx.createGain();
  master.gain.value = 0.52;

  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -18;
  comp.knee.value = 12;
  comp.ratio.value = 4;
  comp.attack.value = 0.01;
  comp.release.value = 0.22;
  master.connect(comp);
  comp.connect(ctx.destination);

  const t0 = ctx.currentTime + 0.04;
  const scale = Math.max(totalMs, 4000) / 1000;

  // Beat markers (match HorizonCrossing progress thresholds)
  const dialEnd = t0 + scale * 0.16;
  const hsStart = t0 + scale * 0.18;
  const hsPeak = t0 + scale * 0.34;
  const uplink = t0 + scale * 0.5;
  const awaken = t0 + scale * 0.62;
  const aiBed = t0 + scale * 0.76;
  const end = t0 + scale;

  // ── Dial-up ──
  hissBed(ctx, master, t0, scale * 0.5, 0.01);
  dualTone(ctx, master, 350, 440, t0, Math.min(0.48, scale * 0.07), 0.026);

  let cursor = t0 + 0.55;
  const digits = ["9", "1", "8", "0", "0", "*", "1"] as const;
  digits.forEach((digit, i) => {
    const pair = DTMF[digit];
    if (pair) {
      dualTone(ctx, master, pair[0], pair[1], cursor, 0.1, 0.038, (i % 2 === 0 ? -1 : 1) * 0.35);
    }
    cursor += 0.155;
  });

  // Ringback — two short cycles before answer
  dualTone(ctx, master, 440, 480, dialEnd - 0.85, 0.32, 0.028, -0.2);
  dualTone(ctx, master, 440, 480, dialEnd - 0.35, 0.28, 0.026, 0.2);

  // ── Handshake (iconic screech / V.90 training) ──
  noiseBurst(ctx, master, hsStart, scale * 0.14, 0.042, 900, 2600);
  sweep(ctx, master, 380, 2100, hsStart + 0.04, scale * 0.1, 0.028);
  // Answer tone 2100 Hz (classic modem)
  tone(ctx, master, 2100, hsPeak - scale * 0.04, scale * 0.08, "square", 0.014, 0);
  sweep(ctx, master, 2400, 550, hsPeak, scale * 0.12, 0.024);
  tone(ctx, master, 1800, hsPeak + scale * 0.04, scale * 0.07, "square", 0.015, -0.25);
  noiseBurst(ctx, master, hsPeak + scale * 0.08, scale * 0.1, 0.032, 1400, 3200);
  // Training chirps — alternate L/R
  for (let i = 0; i < 5; i++) {
    const f = 600 + i * 280;
    tone(ctx, master, f, hsPeak + scale * 0.12 + i * 0.07, 0.05, "square", 0.01, i % 2 === 0 ? -0.55 : 0.55);
  }

  // ── Uplink / CONNECT ──
  tone(ctx, master, 880, uplink, 0.1, "sine", 0.038, -0.1);
  tone(ctx, master, 1320, uplink + 0.08, 0.16, "sine", 0.028, 0.1);
  tone(ctx, master, 1760, uplink + 0.18, 0.2, "sine", 0.018, 0);
  // Soft carrier lock bed
  tone(ctx, master, 2100, uplink + 0.25, scale * 0.12, "sine", 0.008, 0);

  // ── Awaken → AI resolve ──
  tone(ctx, master, 220, awaken, scale * 0.2, "sine", 0.01, -0.2);
  tone(ctx, master, 330, awaken + 0.15, scale * 0.18, "sine", 0.007, 0.2);
  tone(ctx, master, 440, awaken + 0.35, scale * 0.15, "sine", 0.005, 0);

  // Warm AI triad (very quiet) — center image
  tone(ctx, master, 110, aiBed, Math.max(1.1, scale * 0.28), "sine", 0.011, 0);
  tone(ctx, master, 165, aiBed + 0.2, Math.max(1.0, scale * 0.26), "sine", 0.007, -0.15);
  tone(ctx, master, 277, aiBed + 0.4, Math.max(0.9, scale * 0.22), "sine", 0.005, 0.15);
  // Final settle chime
  tone(ctx, master, 523.25, aiBed + 0.55, 0.55, "sine", 0.012, 0);
  tone(ctx, master, 784, aiBed + 0.7, 0.7, "sine", 0.007, 0);

  master.gain.setValueAtTime(0.52, Math.max(t0, end - 1.5));
  master.gain.linearRampToValueAtTime(0.0001, end);

  void ctx.resume();

  return {
    stop: () => {
      try {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.05);
        window.setTimeout(() => {
          void ctx.close();
        }, 120);
      } catch {
        /* ignore */
      }
    },
  };
}
