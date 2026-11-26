"use client";

import { readChessPrefs } from "@/lib/chess-prefs";

/**
 * Synthetic chess sounds via the Web Audio API — no audio files (phase 8).
 * Off by default; the AudioContext is created lazily on the first sound after a user gesture.
 */
export type ChessSound =
  | "move"
  | "capture"
  | "check"
  | "castle"
  | "promote"
  | "gameStart"
  | "gameEnd"
  | "illegal"
  | "lowTime"
  | "puzzleSolved"
  | "puzzleWrong";

type Tone = { f: number; d: number; type?: OscillatorType; gain?: number; at?: number };

const TONES: Record<ChessSound, Tone[]> = {
  move: [{ f: 520, d: 0.05, type: "triangle", gain: 0.18 }],
  capture: [
    { f: 300, d: 0.06, type: "square", gain: 0.12 },
    { f: 200, d: 0.08, type: "triangle", gain: 0.14, at: 0.04 },
  ],
  check: [
    { f: 880, d: 0.08, type: "sine", gain: 0.16 },
    { f: 660, d: 0.1, type: "sine", gain: 0.14, at: 0.08 },
  ],
  castle: [
    { f: 500, d: 0.05, type: "triangle", gain: 0.16 },
    { f: 500, d: 0.05, type: "triangle", gain: 0.16, at: 0.09 },
  ],
  promote: [
    { f: 660, d: 0.08, gain: 0.14 },
    { f: 990, d: 0.12, gain: 0.14, at: 0.08 },
  ],
  gameStart: [
    { f: 440, d: 0.1, gain: 0.12 },
    { f: 660, d: 0.14, gain: 0.12, at: 0.1 },
  ],
  gameEnd: [
    { f: 660, d: 0.12, gain: 0.12 },
    { f: 440, d: 0.2, gain: 0.12, at: 0.12 },
  ],
  illegal: [{ f: 150, d: 0.12, type: "sawtooth", gain: 0.08 }],
  lowTime: [{ f: 1200, d: 0.03, type: "sine", gain: 0.06 }],
  puzzleSolved: [
    { f: 523, d: 0.08, gain: 0.13 },
    { f: 659, d: 0.08, gain: 0.13, at: 0.08 },
    { f: 784, d: 0.14, gain: 0.13, at: 0.16 },
  ],
  puzzleWrong: [{ f: 220, d: 0.18, type: "triangle", gain: 0.12 }],
};

let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  ctx ??= new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function chessSoundEnabled(): boolean {
  return readChessPrefs().sound;
}

export function playChessSound(kind: ChessSound): void {
  if (!chessSoundEnabled()) return;
  const ac = audio();
  if (!ac) return;
  const now = ac.currentTime;
  for (const tone of TONES[kind]) {
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = tone.type ?? "sine";
    osc.frequency.value = tone.f;
    const start = now + (tone.at ?? 0);
    g.gain.setValueAtTime(tone.gain ?? 0.12, start);
    g.gain.exponentialRampToValueAtTime(0.0001, start + tone.d);
    osc.connect(g).connect(ac.destination);
    osc.start(start);
    osc.stop(start + tone.d + 0.02);
  }
}

/** Classify a SAN for its sound. */
export function soundForSan(san: string): ChessSound {
  if (san.includes("#") || san.includes("+")) return "check";
  if (san.includes("=")) return "promote";
  if (san.startsWith("O-O")) return "castle";
  if (san.includes("x")) return "capture";
  return "move";
}
