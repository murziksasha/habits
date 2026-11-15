import { api, type ApiOptions } from "./api";

const STEP_UP_KEY = "eduforge_admin_stepup";

export function getStepUpToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STEP_UP_KEY);
    if (!raw) return null;
    const { token, expiresAt } = JSON.parse(raw) as { token: string; expiresAt: string };
    if (new Date(expiresAt).getTime() < Date.now()) {
      sessionStorage.removeItem(STEP_UP_KEY);
      return null;
    }
    return token;
  } catch {
    return null;
  }
}

export function setStepUpToken(token: string, expiresAt: string | Date) {
  sessionStorage.setItem(
    STEP_UP_KEY,
    JSON.stringify({ token, expiresAt: new Date(expiresAt).toISOString() }),
  );
}

export function clearStepUpToken() {
  sessionStorage.removeItem(STEP_UP_KEY);
}

export type AdminApiOptions = ApiOptions & { stepUp?: boolean };

/** Admin fetch with optional X-Admin-StepUp header */
export async function adminApi<T>(path: string, opts: AdminApiOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;
  if (opts.stepUp !== false) {
    const su = getStepUpToken();
    if (su) headers["X-Admin-StepUp"] = su;
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
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

// re-export plain api for non-step-up reads
export { api };
