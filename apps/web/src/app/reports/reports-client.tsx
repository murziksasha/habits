"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { PageLoading } from "@/components/page-loading";
import { Badge } from "@/components/ui";
import { useRequireAuth } from "@/lib/use-require-auth";
import { useToast } from "@/components/ui";

type Stats = {
  lessonsCompleted: number;
  xpApprox: number;
  flashcardReviews: number;
  focusMinutes: number;
  streakDays: number;
  displayName: string;
};

/** Labs: weekly email report prefs + send preview. */
export function ReportsClient() {
  const { user, token, loading } = useAuth();
  const { ready } = useRequireAuth();
  const { t, locale, setLocale } = useLocale();
  const { toast } = useToast();
  const [stats, setStats] = useState<Stats | null>(null);
  const [enabled, setEnabled] = useState(true);
  const [msg, setMsg] = useState("");
  const [preview, setPreview] = useState("");
  const [dataLoading, setDataLoading] = useState(true);

  async function load() {
    if (!token) return;
    setDataLoading(true);
    try {
      const d = await api<{
        stats: Stats;
        weeklyEmailEnabled: boolean;
      }>("/reports/weekly", { token });
      setStats(d.stats);
      setEnabled(d.weeklyEmailEnabled);
    } catch {
      setStats(null);
    } finally {
      setDataLoading(false);
    }
  }

  useEffect(() => {
    if (token) void load();
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
    toast(
      next
        ? locale === "en"
          ? "Weekly email on"
          : "Тижневий email увімкнено"
        : locale === "en"
          ? "Weekly email off"
          : "Тижневий email вимкнено",
      "success",
    );
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
      toast(t.reports.sent, "success");
    } catch {
      setMsg(t.common.error);
      toast(t.common.error, "error");
    }
  }

  async function saveLocalePref() {
    if (!token) return;
    await api("/reports/prefs", {
      method: "PATCH",
      token,
      body: { preferredLocale: locale },
    });
    toast(locale === "en" ? "Locale saved" : "Мову збережено", "success");
  }

  if (loading || !ready || dataLoading) {
    return <PageLoading label={t.common.loading} />;
  }
  if (!user) return <PageLoading label={t.common.loading} />;

  return (
    <div className="mx-auto max-w-xl space-y-6 pb-20 md:pb-0">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-3xl font-black">📧 {t.reports.title}</h1>
        <Badge tone="muted">Labs</Badge>
      </div>
      <p className="text-sm font-bold text-ink-muted">
        {locale === "en"
          ? "Weekly learning summary email (Labs)."
          : "Тижневий email-звіт про навчання (Labs)."}
      </p>

      {stats && (
        <div className="grid grid-cols-2 gap-3" role="list">
          <div className="card" role="listitem">
            <p className="text-xs font-bold text-ink-muted">{t.reports.lessons}</p>
            <p className="text-2xl font-black">{stats.lessonsCompleted}</p>
          </div>
          <div className="card" role="listitem">
            <p className="text-xs font-bold text-ink-muted">XP</p>
            <p className="text-2xl font-black">{stats.xpApprox}</p>
          </div>
          <div className="card" role="listitem">
            <p className="text-xs font-bold text-ink-muted">{t.nav.flashcards}</p>
            <p className="text-2xl font-black">{stats.flashcardReviews}</p>
          </div>
          <div className="card" role="listitem">
            <p className="text-xs font-bold text-ink-muted">🔥 {t.dashboard.streak}</p>
            <p className="text-2xl font-black">{stats.streakDays}</p>
          </div>
        </div>
      )}

      <div className="card space-y-3">
        <label className="flex min-h-11 cursor-pointer items-center justify-between gap-3 font-bold">
          <span>{enabled ? t.reports.enable : t.reports.disable}</span>
          <input
            type="checkbox"
            className="h-5 w-5"
            checked={enabled}
            onChange={() => void toggleEmail()}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="btn-secondary min-h-11 !py-2 text-sm"
            onClick={() => setLocale(locale === "en" ? "uk" : "en")}
          >
            UI: {locale.toUpperCase()}
          </button>
          <button
            type="button"
            className="btn-secondary min-h-11 !py-2 text-sm"
            onClick={() => void saveLocalePref()}
          >
            {locale === "en" ? "Save locale pref" : "Зберегти мову"}
          </button>
          <button
            type="button"
            className="btn-primary min-h-11 !py-2 text-sm"
            onClick={() => void send()}
          >
            {t.reports.send}
          </button>
        </div>
        {msg && (
          <p className="text-sm font-bold text-brand-dark" role="status">
            {msg}
          </p>
        )}
        {preview && (
          <pre
            className="max-h-48 overflow-auto rounded-xl bg-slate-50 p-3 text-xs dark:bg-slate-900"
            tabIndex={0}
          >
            {preview}
          </pre>
        )}
      </div>
    </div>
  );
}
