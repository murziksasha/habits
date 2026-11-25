"use client";

import { useEffect, useState } from "react";
import { isChessBoardTheme, type ChessBoardThemeId } from "@eduforge/shared";

/** Board preferences (phase 8): stored in localStorage and shared across boards on the page. */
export type ChessPrefs = { theme: ChessBoardThemeId; coordinates: boolean; sound: boolean };

const DEFAULTS: ChessPrefs = { theme: "classic", coordinates: true, sound: false };
const KEY = "chess-board-prefs";
const SOUND_KEY = "chess-sound-enabled";
const EVENT = "chess-prefs-change";

export function readChessPrefs(): ChessPrefs {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = JSON.parse(window.localStorage.getItem(KEY) ?? "{}") as Partial<ChessPrefs>;
    return {
      theme: isChessBoardTheme(raw.theme) ? raw.theme : DEFAULTS.theme,
      coordinates: typeof raw.coordinates === "boolean" ? raw.coordinates : DEFAULTS.coordinates,
      // Sound is off unless the learner turned it on.
      sound: window.localStorage.getItem(SOUND_KEY) === "1",
    };
  } catch {
    return DEFAULTS;
  }
}

export function writeChessPrefs(patch: Partial<ChessPrefs>): void {
  if (typeof window === "undefined") return;
  const next = { ...readChessPrefs(), ...patch };
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ theme: next.theme, coordinates: next.coordinates }));
    window.localStorage.setItem(SOUND_KEY, next.sound ? "1" : "0");
  } catch {
    /* storage may be unavailable */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function useChessPrefs(): [ChessPrefs, (patch: Partial<ChessPrefs>) => void] {
  const [prefs, setPrefs] = useState<ChessPrefs>(DEFAULTS);
  useEffect(() => {
    setPrefs(readChessPrefs());
    const on = () => setPrefs(readChessPrefs());
    window.addEventListener(EVENT, on);
    window.addEventListener("storage", on);
    return () => {
      window.removeEventListener(EVENT, on);
      window.removeEventListener("storage", on);
    };
  }, []);
  return [prefs, writeChessPrefs];
}
