"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

type Stats = {
  lessonsCompleted: number;
  xpApprox: number;
  flashcardReviews: number;
  focusMinutes: number;
  streakDays: number;
  displayName: string;
};

export default function ReportsPage() {
  const { user, token, loading } = useAuth();
  const { t, locale, setLocale } = useLocale();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [enabled, setEnabled] = useState(true);
  const [msg, setMsg] = useState("");
  const [preview, setPreview] = useState("");

  async function load() {
    if (!token) return;
    const d = await api<{
      stats: Stats;
      weeklyEmailEnabled: boolean;
    }>("/reports/weekly", { token });
    setStats(d.stats);
    setEnabled(d.weeklyEmailEnabled);
  }

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (token) void load().catch(() => undefined);
  }, [token]);

  async function toggleEmail() {
    if (!token) return;
    const next = !enabled;
    await api("/reports/prefs", {
      method: "PATCH",
      token,
      body: { weeklyEmailEnabled: next },
    });
    setEnabled(next);
  }

  async function send() {
    if (!token) return;
    setMsg("");
    try {
      const d = await api<{ ok: boolean; preview?: string; dev?: boolean }>(
        "/reports/weekly/send-me",
        { method: "POST", token },
      );
      setMsg(t.reports.sent);
      if (d.preview) setPreview(d.preview);
    } catch {
      setMsg(t.common.error);
    }
  }

  async function saveLocalePref() {
    if (!token) return;
    await api("/reports/prefs", {
      method: "PATCH",
      token,
      body: { preferredLocale: locale },
    });
  }

  if (loading || !user) return <p>{t.common.loading}</p>;

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="text-3xl font-black">📧 {t.reports.title}</h1>

      {stats && (
        <div className="grid grid-cols-2 gap-3">
          <div className="card">
            <p className="text-xs font-bold text-ink-muted">{t.reports.lessons}</p>
            <p className="text-2xl font-black">{stats.lessonsCompleted}</p>
          </div>
          <div className="card">
            <p className="text-xs font-bold text-ink-muted">XP</p>
            <p className="text-2xl font-black">{stats.xpApprox}</p>
          </div>
          <div className="card">
            <p className="text-xs font-bold text-ink-muted">{t.reports.cards}</p>
            <p className="text-2xl font-black">{stats.flashcardReviews}</p>
          </div>
          <div className="card">
            <p className="text-xs font-bold text-ink-muted">{t.reports.focus}</p>
            <p className="text-2xl font-black">{stats.focusMinutes}</p>
          </div>
          <div className="card col-span-2">
            <p className="text-xs font-bold text-ink-muted">🔥 streak</p>
            <p className="text-2xl font-black">{stats.streakDays}</p>
          </div>
        </div>
      )}

      <div className="card space-y-3">
        <button type="button" className="btn-secondary w-full" onClick={() => void toggleEmail()}>
          {enabled ? t.reports.enable : t.reports.disable} — click to toggle
        </button>
        <button
          type="button"
          className="btn-secondary w-full"
          onClick={() => {
            setLocale(locale === "uk" ? "en" : "uk");
            void saveLocalePref();
          }}
        >
          preferredLocale: {locale} (save)
        </button>
        <button type="button" className="btn-primary w-full" onClick={() => void send()}>
          {t.reports.send}
        </button>
        {msg && <p className="text-sm font-bold text-grape">{msg}</p>}
      </div>

      {preview && (
        <div className="card">
          <h2 className="font-black mb-2">{t.reports.preview}</h2>
          <pre className="whitespace-pre-wrap text-sm">{preview}</pre>
        </div>
      )}
    </div>
  );
}
