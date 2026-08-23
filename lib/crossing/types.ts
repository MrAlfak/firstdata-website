export type CrossingDirection = "enter-ai" | "exit-dialup";

export type CrossingLocale = "fa" | "en";

export type Point = { x: number; y: number };

export type EnterAiPhase =
  | "idle"
  | "channel-compress"
  | "void-seed"
  | "ribbon-acquire"
  | "disc-charge"
  | "identity-assemble"
  | "identity-lock"
  | "lock-and-handoff"
  | "site-resolve"
  | "complete";

export type ExitDialupPhase =
  | "idle"
  | "coherence-drop"
  | "rim-unspool"
  | "retract-to-fab"
  | "terminal-reveal"
  | "complete";

export type CrossingPhase = EnterAiPhase | ExitDialupPhase;

export const CROSSING_DURATIONS = {
  enterToggle: 3460,
  enterFirstLoad: 2180,
  exitDialup: 1260,
} as const;
