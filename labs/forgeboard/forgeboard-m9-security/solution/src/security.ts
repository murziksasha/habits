export function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function sanitizeExternalHref(rawUrl: string): string | null {
  try {
    const parsed = new URL(rawUrl.trim());
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString();
    }
    return null;
  } catch {
    return null;
  }
}

export function formatSessionCookie(token: string): string {
  return `forgeboard_session=${token}; Path=/; HttpOnly; SameSite=Lax`;
}

export function isTrustedMutationOrigin(
  originHeader: string | undefined,
  allowedOrigin: string,
): boolean {
  if (!originHeader) return false;
  return originHeader.trim() === allowedOrigin;
}
