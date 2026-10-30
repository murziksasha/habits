export type KeyLike = {
  key?: string;
  code?: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
};

/**
 * Returns 0–8 from Digit1–Digit9 and Numpad1–Numpad9.
 * Ignores Ctrl, Meta, Alt, and Shift (returns null).
 * Falls back to e.key "1"–"9" when code is empty.
 * Returns null for 0, letters, and non-numeric keys.
 */
export function optionIndexFromKey(e: KeyLike): number | null {
  if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) {
    return null;
  }
  if (e.code) {
    const m = /^(?:Digit|Numpad)([1-9])$/.exec(e.code);
    if (m) {
      return Number(m[1]) - 1;
    }
    return null;
  }
  if (e.key && /^[1-9]$/.test(e.key)) {
    return Number(e.key) - 1;
  }
  return null;
}

/**
 * True for elements where typing should take precedence over lesson shortcuts:
 * input, textarea, select, and contenteditable.
 */
export function isTypingTarget(target: EventTarget | null): boolean {
  if (!target || typeof target !== "object") return false;
  const el = target as Partial<HTMLElement>;
  const tag = typeof el.tagName === "string" ? el.tagName.toLowerCase() : "";
  if (tag === "input" || tag === "textarea" || tag === "select") {
    return true;
  }
  if (el.isContentEditable) {
    return true;
  }
  if (typeof el.getAttribute === "function") {
    const ce = el.getAttribute("contenteditable");
    if (ce !== null && ce !== "false") {
      return true;
    }
  }
  return false;
}

/**
 * True if a dialog modal (such as LessonShortcutsHelp '?') is open.
 */
export function hasOpenDialog(doc?: Document): boolean {
  const d = doc ?? (typeof document !== "undefined" ? document : null);
  if (!d || typeof d.querySelector !== "function") return false;
  return d.querySelector('[role="dialog"]') !== null;
}

