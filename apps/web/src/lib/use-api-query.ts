"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { api, type ApiOptions } from "@/lib/api";
import { useRequireAuth } from "@/lib/use-require-auth";

export type UseApiQueryResult<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
  ready: boolean;
  user: ReturnType<typeof useRequireAuth>["user"];
  token: ReturnType<typeof useRequireAuth>["token"];
  character: ReturnType<typeof useRequireAuth>["character"];
  authLoading: boolean;
  reload: () => void;
};

/**
 * Authenticated GET helper: waits for session, loads path, exposes loading/error.
 * Use for high-traffic pages (dashboard, learn, review, programming).
 */
export function useApiQuery<T>(
  path: string | null,
  opts?: { enabled?: boolean; mapError?: (err: unknown) => string },
): UseApiQueryResult<T> {
  const auth = useRequireAuth();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(Boolean(path));
  const gen = useRef(0);

  const load = useCallback(() => {
    if (!path || !auth.token || !auth.ready) {
      if (!path) {
        setLoading(false);
        setData(null);
      }
      return;
    }
    const id = ++gen.current;
    setLoading(true);
    setError(null);
    api<T>(path, { token: auth.token } satisfies ApiOptions)
      .then((d) => {
        if (id !== gen.current) return;
        setData(d);
      })
      .catch((err: unknown) => {
        if (id !== gen.current) return;
        setData(null);
        const msg =
          opts?.mapError?.(err) ??
          (err instanceof Error ? err.message : "request_failed");
        setError(msg);
      })
      .finally(() => {
        if (id !== gen.current) return;
        setLoading(false);
      });
  }, [path, auth.token, auth.ready, opts?.mapError]);

  useEffect(() => {
    if (opts?.enabled === false) {
      setLoading(false);
      return;
    }
    if (!auth.ready) return;
    load();
  }, [auth.ready, load, opts?.enabled]);

  return {
    data,
    error,
    loading: auth.loading || (auth.ready && loading),
    ready: auth.ready,
    user: auth.user,
    token: auth.token,
    character: auth.character,
    authLoading: auth.loading,
    reload: load,
  };
}

/**
 * Parallel authenticated GETs — resolves when all settle.
 */
export function useApiQueries<T extends Record<string, unknown>>(
  paths: Record<keyof T, string | null>,
  opts?: { enabled?: boolean },
): {
  data: Partial<T>;
  loading: boolean;
  ready: boolean;
  user: ReturnType<typeof useRequireAuth>["user"];
  token: ReturnType<typeof useRequireAuth>["token"];
  character: ReturnType<typeof useRequireAuth>["character"];
  authLoading: boolean;
  reload: () => void;
  errors: Partial<Record<keyof T, string>>;
} {
  const auth = useRequireAuth();
  const [data, setData] = useState<Partial<T>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [loading, setLoading] = useState(true);
  const gen = useRef(0);
  const key = JSON.stringify(paths);

  const load = useCallback(() => {
    if (!auth.token || !auth.ready) return;
    const entries = Object.entries(paths).filter(([, p]) => Boolean(p)) as [
      keyof T,
      string,
    ][];
    if (!entries.length) {
      setLoading(false);
      setData({});
      return;
    }
    const id = ++gen.current;
    setLoading(true);
    Promise.all(
      entries.map(async ([k, p]) => {
        try {
          const d = await api<T[typeof k]>(p, { token: auth.token });
          return { k, d, err: null as string | null };
        } catch (e) {
          return {
            k,
            d: null,
            err: e instanceof Error ? e.message : "request_failed",
          };
        }
      }),
    ).then((rows) => {
      if (id !== gen.current) return;
      const next: Partial<T> = {};
      const errs: Partial<Record<keyof T, string>> = {};
      for (const row of rows) {
        if (row.d != null) next[row.k] = row.d as T[typeof row.k];
        if (row.err) errs[row.k] = row.err;
      }
      setData(next);
      setErrors(errs);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- key captures paths
  }, [auth.token, auth.ready, key]);

  useEffect(() => {
    if (opts?.enabled === false) {
      setLoading(false);
      return;
    }
    if (!auth.ready) return;
    load();
  }, [auth.ready, load, opts?.enabled]);

  return {
    data,
    loading: auth.loading || (auth.ready && loading),
    ready: auth.ready,
    user: auth.user,
    token: auth.token,
    character: auth.character,
    authLoading: auth.loading,
    reload: load,
    errors,
  };
}
