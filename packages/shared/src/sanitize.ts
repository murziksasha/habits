/**
 * Lightweight XSS-oriented sanitization for user-generated plain text.
 * Strips tags, control chars, and common script vectors. Not a full HTML sanitizer.
 */

const TAG_RE = /<\/?[^>]+>/g;
const CTRL_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const SCRIPT_RE = /javascript\s*:/gi;
const EVENT_RE = /\bon\w+\s*=/gi;
const DATA_HTML_RE = /data\s*:\s*text\/html/gi;

export function sanitizeUserText(input: string, maxLen = 4000): string {
  let s = String(input ?? "");
  s = s.replace(TAG_RE, "");
  s = s.replace(CTRL_RE, "");
  s = s.replace(SCRIPT_RE, "");
  s = s.replace(EVENT_RE, "");
  s = s.replace(DATA_HTML_RE, "");
  s = s.trim();
  if (s.length > maxLen) s = s.slice(0, maxLen);
  return s;
}

export function sanitizeDisplayName(input: string, maxLen = 32): string {
  return sanitizeUserText(input, maxLen).replace(/\s+/g, " ");
}
