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

function isSingleElementTyping(target: EventTarget | null): boolean {
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
    const role = el.getAttribute("role");
    if (role === "textbox" || role === "searchbox" || role === "combobox") {
      return true;
    }
  }
  if (typeof el.closest === "function") {
    const parentTyping = el.closest(
      "input, textarea, select, [contenteditable]:not([contenteditable='false']), [role='textbox'], [role='searchbox'], [role='combobox'], .monaco-editor, [data-monaco-editor], .editor-instance",
    );
    if (parentTyping) return true;
  }
  const className = typeof el.className === "string" ? el.className : "";
  if (className.includes("monaco-editor") || className.includes("inputarea")) {
    return true;
  }
  return false;
}

/**
 * True for elements where typing should take precedence over lesson shortcuts:
 * input, textarea, select, contenteditable, and code editors (Monaco/Ace).
 * Also checks activeElement if target is body/document/window.
 */
export function isTypingTarget(target: EventTarget | null): boolean {
  if (isSingleElementTyping(target)) return true;
  if (
    typeof document !== "undefined" &&
    document.activeElement &&
    document.activeElement !== document.body &&
    document.activeElement !== target
  ) {
    if (isSingleElementTyping(document.activeElement)) return true;
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

