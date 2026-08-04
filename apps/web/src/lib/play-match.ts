/** Cross-component flag: live chess match on /play hides sticky Continue. */

export const PLAY_MATCH_EVENT = "eduforge:play-match";
const STORAGE_KEY = "ef_play_match_active";

export function setPlayMatchActive(active: boolean) {
  if (typeof window === "undefined") return;
  try {
    if (active) sessionStorage.setItem(STORAGE_KEY, "1");
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(
    new CustomEvent(PLAY_MATCH_EVENT, { detail: { active } }),
  );
}

export function isPlayMatchActive(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}
