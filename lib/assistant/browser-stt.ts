/**
 * On-device Persian STT via vosk-browser (no Google, no ParsPack).
 * Runtime script and model are served from /stt (see scripts/fetch-stt-model.mjs).
 */

"use client";

export const VOSK_SCRIPT_URL = "/stt/vosk.js";
export const VOSK_FA_MODEL_URL = "/stt/vosk-model-small-fa-0.42.zip";

type VoskRecognizer = {
  on: (event: string, listener: (message: unknown) => void) => void;
  acceptWaveform: (buffer: AudioBuffer) => void;
  retrieveFinalResult: () => void;
  remove: () => void;
};

type VoskModel = {
  ready: boolean;
  KaldiRecognizer: new (sampleRate: number) => VoskRecognizer;
  on: (event: string, listener: (message: unknown) => void) => void;
};

type VoskApi = {
  createModel: (modelUrl: string, logLevel?: number) => Promise<VoskModel>;
  Model: new (modelUrl: string, logLevel?: number) => VoskModel;
};

declare global {
  interface Window {
    Vosk?: VoskApi;
  }
}

let modelPromise: Promise<VoskModel> | null = null;
let scriptPromise: Promise<VoskApi> | null = null;

function AudioContextCtor(): typeof AudioContext | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & { webkitAudioContext?: typeof AudioContext };
  return window.AudioContext ?? w.webkitAudioContext ?? null;
}

function loadVoskScript(): Promise<VoskApi> {
  if (window.Vosk?.Model) return Promise.resolve(window.Vosk);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${VOSK_SCRIPT_URL}"]`);
    const done = () => {
      if (window.Vosk?.Model) {
        resolve(window.Vosk);
        return;
      }
      scriptPromise = null;
      reject(new Error("vosk-missing"));
    };
    const fail = () => {
      scriptPromise = null;
      reject(new Error("vosk-script"));
    };
    if (existing) {
      if (window.Vosk?.Model) {
        resolve(window.Vosk);
        return;
      }
      existing.addEventListener("load", done);
      existing.addEventListener("error", fail);
      return;
    }
    const el = document.createElement("script");
    el.src = VOSK_SCRIPT_URL;
    el.async = true;
    el.onload = done;
    el.onerror = fail;
    document.head.appendChild(el);
  });

  return scriptPromise;
}

async function loadFaModel(): Promise<VoskModel> {
  if (modelPromise) return modelPromise;

  modelPromise = (async () => {
    const vosk = await loadVoskScript();
    const url = new URL(VOSK_FA_MODEL_URL, window.location.href).href;
    const model = new vosk.Model(url, -1);
    await new Promise<void>((resolve, reject) => {
      const timer = window.setTimeout(() => {
        reject(new Error("vosk-timeout"));
      }, 180_000);
      model.on("load", (message) => {
        window.clearTimeout(timer);
        const ok =
          message &&
          typeof message === "object" &&
          "result" in message &&
          Boolean((message as { result?: unknown }).result);
        if (ok) {
          resolve();
          return;
        }
        reject(new Error("vosk-load-failed"));
      });
      model.on("error", (message) => {
        window.clearTimeout(timer);
        const text =
          message && typeof message === "object" && "error" in message
            ? String((message as { error?: unknown }).error ?? "vosk-error")
            : "vosk-error";
        reject(new Error(text));
      });
    });
    if (!model.ready) {
      throw new Error("vosk-not-ready");
    }
    return model;
  })().catch((err) => {
    modelPromise = null;
    throw err;
  });

  return modelPromise;
}

function joinTranscript(finals: string[], partial: string): string {
  return [...finals, partial]
    .map((piece) => piece.trim())
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function resultText(message: unknown): string {
  if (!message || typeof message !== "object") return "";
  const result = (message as { result?: { text?: unknown } }).result;
  return typeof result?.text === "string" ? result.text.trim() : "";
}

function partialText(message: unknown): string {
  if (!message || typeof message !== "object") return "";
  const result = (message as { result?: { partial?: unknown } }).result;
  return typeof result?.partial === "string" ? result.partial.trim() : "";
}

export type BrowserSttSession = {
  stop: () => Promise<string>;
};

export async function startBrowserStt(options: {
  onPartial: (text: string) => void;
  signal: AbortSignal;
}): Promise<BrowserSttSession> {
  if (!window.isSecureContext) {
    throw new Error("insecure");
  }

  const Ctx = AudioContextCtor();
  if (!Ctx || !navigator.mediaDevices?.getUserMedia) {
    throw new Error("unsupported");
  }

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      channelCount: 1,
    },
    video: false,
  });

  if (options.signal.aborted) {
    stream.getTracks().forEach((track) => track.stop());
    throw new DOMException("Aborted", "AbortError");
  }

  let audioContext: AudioContext | null = null;
  let source: MediaStreamAudioSourceNode | null = null;
  let processor: ScriptProcessorNode | null = null;
  let silent: GainNode | null = null;
  let recognizer: VoskRecognizer | null = null;
  let stopped = false;
  const finals: string[] = [];
  let partial = "";

  const cleanup = () => {
    try {
      processor?.disconnect();
    } catch {
      /* already disconnected */
    }
    try {
      source?.disconnect();
    } catch {
      /* already disconnected */
    }
    try {
      silent?.disconnect();
    } catch {
      /* already disconnected */
    }
    try {
      recognizer?.remove();
    } catch {
      /* already removed */
    }
    stream.getTracks().forEach((track) => track.stop());
    void audioContext?.close().catch(() => undefined);
    processor = null;
    source = null;
    silent = null;
    recognizer = null;
    audioContext = null;
  };

  const onAbort = () => {
    if (stopped) return;
    stopped = true;
    cleanup();
  };
  options.signal.addEventListener("abort", onAbort, { once: true });

  try {
    const model = await loadFaModel();
    if (options.signal.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }

    audioContext = new Ctx();
    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    recognizer = new model.KaldiRecognizer(audioContext.sampleRate);
    recognizer.on("result", (message) => {
      const text = resultText(message);
      if (!text) return;
      finals.push(text);
      partial = "";
      options.onPartial(joinTranscript(finals, ""));
    });
    recognizer.on("partialresult", (message) => {
      partial = partialText(message);
      options.onPartial(joinTranscript(finals, partial));
    });

    await new Promise((resolve) => window.setTimeout(resolve, 120));
    if (options.signal.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }

    source = audioContext.createMediaStreamSource(stream);
    processor = audioContext.createScriptProcessor(4096, 1, 1);
    processor.onaudioprocess = (event) => {
      if (stopped || !recognizer) return;
      try {
        recognizer.acceptWaveform(event.inputBuffer);
      } catch {
        /* recognizer not ready yet */
      }
    };
    silent = audioContext.createGain();
    silent.gain.value = 0;
    source.connect(processor);
    processor.connect(silent);
    silent.connect(audioContext.destination);
  } catch (err) {
    options.signal.removeEventListener("abort", onAbort);
    if (!stopped) cleanup();
    throw err;
  }

  return {
    stop: async () => {
      if (stopped) return joinTranscript(finals, partial);
      stopped = true;
      options.signal.removeEventListener("abort", onAbort);

      const rec = recognizer;
      if (rec) {
        try {
          rec.retrieveFinalResult();
        } catch {
          /* ignore */
        }
        await new Promise((resolve) => window.setTimeout(resolve, 350));
      }

      const spoken = joinTranscript(finals, partial);
      cleanup();
      return spoken;
    },
  };
}

export function isMicDenied(err: unknown): boolean {
  if (err instanceof DOMException) {
    return (
      err.name === "NotAllowedError" ||
      err.name === "SecurityError" ||
      err.name === "PermissionDeniedError"
    );
  }
  return false;
}

export function isAbortError(err: unknown): boolean {
  return err instanceof DOMException && err.name === "AbortError";
}
