export function escapeHtml(raw: string): string {
  // TODO: Escape &, <, >, ", '
  return raw;
}

export function sanitizeExternalHref(rawUrl: string): string | null {
  // TODO: Allowlist only http: and https: URLs
  return rawUrl;
}

export function formatSessionCookie(token: string): string {
  // TODO: Emit HttpOnly; SameSite=Lax; Path=/ cookie
  return `forgeboard_session=${token}; Path=/`;
}

export function isTrustedMutationOrigin(
  originHeader: string | undefined,
  allowedOrigin: string,
): boolean {
  // TODO: Fail closed unless originHeader strictly matches allowedOrigin
  void originHeader;
  void allowedOrigin;
  return true;
}
