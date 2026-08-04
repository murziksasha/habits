"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { PageLoading } from "@/components/page-loading";

export default function AdminHomePage() {
  const { user, token, loading } = useAuth();
  const { t } = useLocale();
  const router = useRouter();
  const [stats, setStats] = useState<{
    users: number;
    lessons: number;
    courses: number;
    totalGlobalXp: number;
  } | null>(null);
  const [courseStats, setCourseStats] = useState<
    { slug: string; titleUk: string; learners: number; totalXp: number }[]
  >([]);
  const [ops, setOps] = useState<{
    parentLinksActive: number;
    digestsSentLast7d: number;
    weeklyEmailOptIn: number;
    recentDigests: {
      parentUserId: string;
      parentName: string;
      studentId: string | null;
      source: string;
      createdAt: string;
    }[];
  } | null>(null);
  const [opsMsg, setOpsMsg] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) router.replace("/dashboard");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token || user?.role !== "admin") return;
    void api<NonNullable<typeof stats>>("/admin/stats", { token }).then(setStats);
    void api<{ courses: typeof courseStats }>("/admin/progress/overview", { token }).then((d) =>
      setCourseStats(d.courses),
    );
    void api<NonNullable<typeof ops>>("/admin/ops/summary", { token })
      .then(setOps)
      .catch(() => setOps(null));
  }, [token, user]);

  async function runOps(path: string, label: string) {
    if (!token) return;
    setBusy(label);
    setOpsMsg("");
    try {
      const r = await api<Record<string, unknown>>(path, { method: "POST", token });
      setOpsMsg(`${t.admin.runOk}: ${JSON.stringify(r)}`);
      const summary = await api<NonNullable<typeof ops>>("/admin/ops/summary", { token });
      setOps(summary);
    } catch (e) {
      setOpsMsg((e as Error).message || t.common.error);
    } finally {
      setBusy(null);
    }
  }

  if (loading || user?.role !== "admin") {
    return <PageLoading label={t.common.loading} />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-3xl font-black">🛠️ {t.admin.title}</h1>
        <p className="text-sm font-bold text-ink-muted">
          Dashboard · sidebar modules
        </p>
      </div>
      {!stats && (
        <p className="text-sm font-bold text-ink-muted" aria-live="polite">
          {t.common.loading}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: t.admin.users, v: stats?.users ?? "…" },
          { label: t.nav.courses, v: stats?.courses ?? "…" },
          { label: "Lessons", v: stats?.lessons ?? "…" },
          { label: "Σ global XP", v: stats?.totalGlobalXp ?? "…" },
        ].map((s) => (
          <div key={s.label} className="card">
            <p className="text-sm font-bold text-ink-muted">{s.label}</p>
            <p className="text-3xl font-black">{s.v}</p>
          </div>
        ))}
      </div>

      <section className="card space-y-4 border-grape/30">
        <h2 className="text-xl font-black">⚙️ {t.admin.ops}</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">
            <p className="text-xs font-bold text-ink-muted">{t.admin.parentLinks}</p>
            <p className="text-2xl font-black">{ops?.parentLinksActive ?? "…"}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">
            <p className="text-xs font-bold text-ink-muted">{t.admin.digests7d}</p>
            <p className="text-2xl font-black">{ops?.digestsSentLast7d ?? "…"}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">
            <p className="text-xs font-bold text-ink-muted">{t.admin.weeklyOptIn}</p>
            <p className="text-2xl font-black">{ops?.weeklyEmailOptIn ?? "…"}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="btn-primary !py-2 text-sm"
            disabled={Boolean(busy)}
            onClick={() => void runOps("/admin/ops/parent-digests", "pd")}
          >
            {busy === "pd" ? "…" : `📧 ${t.admin.runParentDigests}`}
          </button>
          <button
            type="button"
            className="btn-secondary !py-2 text-sm"
            disabled={Boolean(busy)}
            onClick={() => void runOps("/admin/ops/homework-reminders", "hw")}
          >
            {busy === "hw" ? "…" : `⏰ ${t.admin.runHwReminders}`}
          </button>
          <button
            type="button"
            className="btn-secondary !py-2 text-sm"
            disabled={Boolean(busy)}
            onClick={() => void runOps("/admin/ops/weekly-learners", "wl")}
          >
            {busy === "wl" ? "…" : `📬 ${t.admin.runWeeklyLearners}`}
          </button>
          <button
            type="button"
            className="btn-sky !py-2 text-sm"
            disabled={Boolean(busy)}
            onClick={() =>
              void (async () => {
                if (!token) return;
                setBusy("re");
                setOpsMsg("");
                try {
                  const r = await api<Record<string, unknown>>("/admin/ops/push-reengage", {
                    method: "POST",
                    token,
                    body: { days: 3 },
                  });
                  setOpsMsg(`Push re-engage 3d: ${JSON.stringify(r)}`);
                } catch (e) {
                  setOpsMsg((e as Error).message || t.common.error);
                } finally {
                  setBusy(null);
                }
              })()
            }
          >
            {busy === "re" ? "…" : "🔔 Push re-engage (3d)"}
          </button>
        </div>
        {opsMsg && (
          <pre className="max-h-40 overflow-auto whitespace-pre-wrap rounded-xl bg-slate-50 p-3 text-xs font-bold dark:bg-slate-900">
            {opsMsg}
          </pre>
        )}
        {ops && ops.recentDigests.length > 0 && (
          <div className="space-y-1">
            <h3 className="font-black text-sm">{t.admin.recentDigests}</h3>
            {ops.recentDigests.map((d, i) => (
              <div
                key={`${d.parentUserId}-${d.createdAt}-${i}`}
                className="flex flex-wrap justify-between gap-2 text-xs font-bold text-ink-muted"
              >
                <span>
                  {d.parentName} → {d.studentId?.slice(0, 8) ?? "—"} · {d.source}
                </span>
                <span>{new Date(d.createdAt).toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="card">
        <h2 className="mb-4 text-xl font-black">{t.admin.stats}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-ink-muted">
                <th className="pb-2">Курс</th>
                <th className="pb-2">Учні</th>
                <th className="pb-2 text-right">Σ XP</th>
              </tr>
            </thead>
            <tbody>
              {courseStats.map((r) => (
                <tr key={r.slug} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="py-2 font-bold">{r.titleUk}</td>
                  <td className="py-2">{r.learners}</td>
                  <td className="py-2 text-right font-mono">{r.totalXp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
