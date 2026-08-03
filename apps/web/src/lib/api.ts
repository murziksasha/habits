const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

/** Marker: authenticated via httpOnly cookie (no Bearer secret in JS). */
export const COOKIE_SESSION = "cookie";

/** Legacy localStorage key — cleared on successful cookie migration. */
export const LEGACY_TOKEN_KEY = "eduforge_token";

export type ApiOptions = {
  method?: string;
  body?: unknown;
  /** Real Bearer token, or COOKIE_SESSION / null when cookie session is active. */
  token?: string | null;
};

export function isBearerToken(token: string | null | undefined): boolean {
  return Boolean(token && token !== COOKIE_SESSION);
}

export async function api<T>(path: string, opts: ApiOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (isBearerToken(opts.token)) {
    headers.Authorization = `Bearer ${opts.token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method: opts.method ?? (opts.body ? "POST" : "GET"),
    headers,
    credentials: "include",
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error((data as { error?: string }).error ?? "request_failed") as Error & {
      status?: number;
      data?: { error?: string; [k: string]: unknown };
    };
    err.status = res.status;
    err.data = data as { error?: string };
    throw err;
  }
  return data as T;
}

/** Authenticated binary download (CSV etc.) — cookie or Bearer dual-support. */
export async function apiBlob(
  path: string,
  opts: { token?: string | null } = {},
): Promise<Blob> {
  const headers: Record<string, string> = {};
  if (isBearerToken(opts.token)) {
    headers.Authorization = `Bearer ${opts.token}`;
  }
  const res = await fetch(`${API_URL}${path}`, {
    headers,
    credentials: "include",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("download_failed");
  }
  return res.blob();
}

export { API_URL };
