"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { PageLoading } from "@/components/page-loading";
import { useRequireAuth } from "@/lib/use-require-auth";

type Session = {
  id: string;
  durationSec: number;
  courseSlug: string | null;
  startedAt: string;
};

export function FocusClient() {
  const { user, token, loading } = useAuth();
  const { ready } = useRequireAuth();
  const { t } = useLocale();
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState<Session[]>([]);
  const [totalSec, setTotalSec] = useState(0);
  const [msg, setMsg] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);

  async function loadHistory() {
    if (!token) return;
    setDataLoading(true);
    try {
      const d = await api<{ history: Session[]; totalSec: number }>("/focus/history", {
        token,
      });
      setHistory(d.history);
      setTotalSec(d.totalSec);
    } catch {
      /* ignore */
    } finally {
      setDataLoading(false);
    }
  }

  useEffect(() => {
    if (token) void loadHistory();
  }, [token]);

  useEffect(() => {
    if (running) {
      tick.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else if (tick.current) {
      clearInterval(tick.current);
      tick.current = null;
    }
    return () => {
      if (tick.current) clearInterval(tick.current);
    };
  }, [running]);

  async function saveSession() {
    if (!token || seconds < 30) {
      setMsg("min 30s");
      return;
    }
    try {
      await api("/focus/log", {
        method: "POST",
        token,
        body: { durationSec: seconds },
      });
      setMsg(t.focus.done);
      setSeconds(0);
      setRunning(false);
      await loadHistory();
    } catch {
      setMsg(t.common.error);
    }
  }

  function fmt(s: number) {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }

  if (loading || !ready || dataLoading) return <PageLoading label={t.common.loading} />;
  if (!user) return <PageLoading label={t.common.loading} />;

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <h1 className="text-3xl font-black">⏱️ {t.focus.title}</h1>

      <div className="card mx-auto max-w-md space-y-6 text-center">
        <p className="font-mono text-6xl font-black tabular-nums">{fmt(seconds)}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {!running ? (
            <button type="button" className="btn-primary" onClick={() => setRunning(true)}>
              {t.focus.start}
            </button>
          ) : (
            <button type="button" className="btn-secondary" onClick={() => setRunning(false)}>
              {t.focus.pause}
            </button>
          )}
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setRunning(false);
              setSeconds(0);
            }}
          >
            {t.focus.reset}
          </button>
          <button type="button" className="btn-primary" onClick={() => void saveSession()}>
            {t.focus.log}
          </button>
        </div>
        {msg && <p className="text-sm font-bold text-grape">{msg}</p>}
      </div>

      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-black">{t.focus.history}</h2>
          <p className="text-sm font-bold text-ink-muted">
            {t.focus.total}: {Math.floor(totalSec / 60)} {t.focus.minutes}
          </p>
        </div>
        {history.map((h) => (
          <div key={h.id} className="card flex justify-between text-sm font-bold">
            <span>{new Date(h.startedAt).toLocaleString()}</span>
            <span>
              {Math.floor(h.durationSec / 60)}:{String(h.durationSec % 60).padStart(2, "0")}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
