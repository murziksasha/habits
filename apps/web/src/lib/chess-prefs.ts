"use client";

import { useEffect, useState } from "react";
import { DEFAULT_CHESS_BOARD_PREFS, normalizeChessBoardPrefs, type ChessBoardPrefs } from "@eduforge/shared";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

/**
 * Board preferences (phase 8): cached in localStorage and shared across boards on the page.
 * Signed-in learners also keep them on the server (`GET/PUT /chess/prefs`), so they follow
 * the account to another device.
 */
export type ChessPrefs = ChessBoardPrefs;

const DEFAULTS: ChessPrefs = DEFAULT_CHESS_BOARD_PREFS;
const KEY = "chess-board-prefs";
const SOUND_KEY = "chess-sound-enabled";
const EVENT = "chess-prefs-change";

export function readChessPrefs(): ChessPrefs {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = JSON.parse(window.localStorage.getItem(KEY) ?? "{}") as Partial<ChessPrefs>;
    // Sound is off unless the learner turned it on.
    return normalizeChessBoardPrefs({ ...raw, sound: window.localStorage.getItem(SOUND_KEY) === "1" });
  } catch {
    return DEFAULTS;
  }
}

function storeLocal(next: ChessPrefs): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ theme: next.theme, coordinates: next.coordinates }));
    window.localStorage.setItem(SOUND_KEY, next.sound ? "1" : "0");
  } catch {
    /* storage may be unavailable */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

/** Signed-in session the prefs are synced for (set by useChessPrefs). */
let session: { userId: string; token: string | null } | null = null;
let syncedFor: string | null = null;
let pushTimer: ReturnType<typeof setTimeout> | null = null;

function pushToServer(prefs: ChessPrefs): void {
  if (!session) return;
  const { token } = session;
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => {
    void api("/chess/prefs", { method: "PUT", token, body: prefs }).catch(() => undefined);
  }, 400);
}

export function writeChessPrefs(patch: Partial<ChessPrefs>): void {
  if (typeof window === "undefined") return;
  const next = normalizeChessBoardPrefs(patch, readChessPrefs());
  storeLocal(next);
  pushToServer(next);
}

/** Pull server prefs once per account and page load; first sync uploads prefs saved before sign-in. */
async function syncFromServer(userId: string, token: string | null): Promise<void> {
  if (syncedFor === userId) return;
  syncedFor = userId;
  try {
    const r = await api<{ prefs: ChessPrefs | null }>("/chess/prefs", { token });
    if (r.prefs) storeLocal(normalizeChessBoardPrefs(r.prefs));
    else if (window.localStorage.getItem(KEY) !== null || window.localStorage.getItem(SOUND_KEY) !== null) pushToServer(readChessPrefs());
  } catch {
    syncedFor = null;
  }
}

export function useChessPrefs(): [ChessPrefs, (patch: Partial<ChessPrefs>) => void] {
  const { user, token } = useAuth();
  const [prefs, setPrefs] = useState<ChessPrefs>(DEFAULTS);
  const userId = user?.id ?? null;
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
  useEffect(() => {
    if (!userId) {
      session = null;
      return;
    }
    session = { userId, token };
    void syncFromServer(userId, token);
  }, [userId, token]);
  return [prefs, writeChessPrefs];
}
