"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api, apiBlob } from "@/lib/api";
import { PageLoading } from "@/components/page-loading";
import { FunnelChart } from "@/components/admin/funnel-chart";

type ProductFunnel = {
  firstLessonComplete: number;
  lessonCompleted: number;
  paywallShown: number;
  paywallCtaClick: number;
  examPassed: number;
  examFailed: number;
  windowDays: number;
};

type FunnelDelta = {
  key: string;
  current: number;
  previous: number;
  pctChange: number | null;
};

type FunnelHistory = {
  windowDays: number;
  current: ProductFunnel;
  previous: ProductFunnel;
  deltas: FunnelDelta[];
};

type Metrics = {
  windowDays: number;
  since: string;
  totals: {
    users: number;
    premium: number;
    certificates: number;
    streakShieldsHeld: number;
    avgStreakDays: number;
  };
  engagement: {
    activeUsers: number;
    activeUsers30d: number;
    lessonsCompleted: number;
    xpFromAttempts: number;
    homeworkCompleted: number;
  };
  programming: {
    learners: number;
    lessonsCompletedAll: number;
    lessonsCompletedWindow: number;
    lessonsTotal: number;
  };
  playground: {
    catalogChallenges: number;
    solvesWindow: number;
    solvesAllTime: number;
  };
  minis?: {
    catalog: number;
    completionsAllTime: number;
    raceParticipantsThisWeek: number;
    raceFeatured: number;
  };
  exams?: {
    catalog: number;
    passedAllTime: number;
    passedWindow: number;
    deepTrackLearners: number;
  };
  topActivityKinds: { kind: string; n: number }[];
  productFunnel?: ProductFunnel;
  productFunnelHistory?: FunnelHistory;
};

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="card !py-4">
      <p className="text-xs font-bold text-ink-muted">{label}</p>
      <p className="text-2xl font-black">{value}</p>
      {hint ? <p className="mt-1 text-[10px] font-bold text-ink-muted">{hint}</p> : null}
    </div>
  );
}

export function AdminMetricsClient() {
  const { user, token, loading } = useAuth();
  const { t } = useLocale();
  const router = useRouter();
  const [days, setDays] = useState(7);
  const [data, setData] = useState<Metrics | null>(null);
  const [funnel, setFunnel] = useState<ProductFunnel | null>(null);
  const [history, setHistory] = useState<FunnelHistory | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) router.replace("/dashboard");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token || user?.role !== "admin") return;
    setErr("");
    void api<Metrics>(`/admin/metrics?days=${days}`, { token })
      .then((d) => {
        setData(d);
        if (d.productFunnel) setFunnel(d.productFunnel);
        if (d.productFunnelHistory) setHistory(d.productFunnelHistory);
      })
      .catch(() => {
        setData(null);
        setErr(t.common.error);
      });
    // Fallback if admin metrics build predates productFunnel field
    void api<{ funnel: ProductFunnel; history?: FunnelHistory }>(
      `/analytics/funnel?days=${days}&compare=1`,
      { token },
    )
      .then((d) => {
        setFunnel((prev) => prev ?? d.funnel);
        if (d.history) setHistory((prev) => prev ?? d.history!);
      })
      .catch(() => undefined);
  }, [token, user, days, t.common.error]);

  if (loading || user?.role !== "admin") {
    return <PageLoading label={t.common.loading} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Link href="/admin" className="text-sm font-bold text-ink-muted">
            ← {t.admin.title}
          </Link>
          <h1 className="text-3xl font-black mt-1">📈 {t.admin.metrics}</h1>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {[7, 14, 30].map((d) => (
            <button
              key={d}
              type="button"
              className={
                days === d ? "btn-primary !py-2 !px-3 text-sm" : "btn-secondary !py-2 !px-3 text-sm"
              }
              onClick={() => setDays(d)}
            >
              {d}d
            </button>
          ))}
          <button
            type="button"
            className="btn-secondary !py-2 !px-3 text-sm"
            disabled={!token}
            onClick={() => {
              if (!token) return;
              void apiBlob(`/admin/metrics.csv?days=${days}`, { token })
                .then((blob) => {
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `eduforge-metrics-${days}d.csv`;
                  a.click();
                  URL.revokeObjectURL(url);
                })
                .catch(() => setErr(t.common.error));
            }}
          >
            📥 {t.admin.exportCsv}
          </button>
          <button
            type="button"
            className="btn-secondary !py-2 !px-3 text-sm"
            disabled={!token}
            title="Funnel current vs previous window"
            onClick={() => {
              if (!token) return;
              void apiBlob(`/admin/metrics/funnel.csv?days=${days}`, { token })
                .then((blob) => {
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `eduforge-funnel-${days}d.csv`;
                  a.click();
                  URL.revokeObjectURL(url);
                })
                .catch(() => setErr(t.common.error));
            }}
          >
            📥 Funnel CSV
          </button>
        </div>
      </div>

      {err && <p className="text-sm font-bold text-red-500">{err}</p>}
      {!data && !err && <p>{t.common.loading}</p>}

      {data && (
        <>
          <p className="text-xs font-bold text-ink-muted">
            {t.admin.window}: {data.windowDays}d · since {new Date(data.since).toLocaleString()}
          </p>

          {funnel && (
            <section className="space-y-3">
              <h2 className="font-black">🎯 Product funnel ({funnel.windowDays}d)</h2>
              <p className="text-xs font-bold text-ink-muted">
                first_lesson · lessons · paywall · exams (activity events)
              </p>
              <div className="grid gap-4 lg:grid-cols-2">
                <FunnelChart
                  title="Learning core"
                  bars={[
                    {
                      key: "first",
                      label: "First lesson",
                      value: funnel.firstLessonComplete,
                      tone: "brand",
                    },
                    {
                      key: "lessons",
                      label: "Lessons completed",
                      value: funnel.lessonCompleted,
                      tone: "sky",
                    },
                    {
                      key: "exam_pass",
                      label: "Exam passed",
                      value: funnel.examPassed,
                      tone: "brand",
                    },
                    {
                      key: "exam_fail",
                      label: "Exam failed",
                      value: funnel.examFailed,
                      tone: "orange",
                    },
                  ]}
                />
                <FunnelChart
                  title="Conversion"
                  bars={[
                    {
                      key: "paywall",
                      label: "Paywall shown",
                      value: funnel.paywallShown,
                      tone: "grape",
                    },
                    {
                      key: "cta",
                      label: "Paywall CTA click",
                      value: funnel.paywallCtaClick,
                      tone: "sky",
                    },
                  ]}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Stat label="First lesson" value={funnel.firstLessonComplete} />
                <Stat label="Lessons completed" value={funnel.lessonCompleted} />
                <Stat label="Paywall shown" value={funnel.paywallShown} />
                <Stat label="Paywall CTA click" value={funnel.paywallCtaClick} />
                <Stat label="Exam passed" value={funnel.examPassed} />
                <Stat label="Exam failed" value={funnel.examFailed} />
              </div>
              {funnel.paywallShown > 0 && (
                <p className="text-xs font-bold text-ink-muted">
                  CTA rate:{" "}
                  {Math.round((funnel.paywallCtaClick / funnel.paywallShown) * 1000) / 10}%
                </p>
              )}
              {history && (
                <div className="card space-y-2">
                  <h3 className="text-sm font-black text-ink-muted">
                    vs previous {history.windowDays}d
                  </h3>
                  <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm font-bold">
                    {history.deltas.map((d) => {
                      const label = d.key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (s) => s.toUpperCase());
                      const up = (d.pctChange ?? 0) > 0;
                      const down = (d.pctChange ?? 0) < 0;
                      return (
                        <li
                          key={d.key}
                          className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 px-3 py-2 dark:border-slate-800"
                        >
                          <span className="text-ink-muted">{label}</span>
                          <span className="tabular-nums">
                            {d.current}
                            <span
                              className={
                                up
                                  ? "ml-2 text-brand-dark"
                                  : down
                                    ? "ml-2 text-orange-500"
                                    : "ml-2 text-ink-muted"
                              }
                            >
                              {d.pctChange == null
                                ? d.current > 0
                                  ? "new"
                                  : "—"
                                : `${d.pctChange > 0 ? "+" : ""}${d.pctChange}%`}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </section>
          )}

          <section className="space-y-2">
            <h2 className="font-black">{t.admin.totals}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <Stat label={t.admin.users} value={data.totals.users} />
              <Stat label="Premium" value={data.totals.premium} />
              <Stat label={t.nav.certificates} value={data.totals.certificates} />
              <Stat label={`🛡️ ${t.streak.shields}`} value={data.totals.streakShieldsHeld} />
              <Stat label={`🔥 ${t.streak.label} avg`} value={data.totals.avgStreakDays} />
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="font-black">{t.admin.engagement}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <Stat
                label={t.admin.activeUsers}
                value={data.engagement.activeUsers}
                hint={`${data.engagement.activeUsers30d} / 30d`}
              />
              <Stat label={t.admin.lessonsDone} value={data.engagement.lessonsCompleted} />
              <Stat label="XP" value={data.engagement.xpFromAttempts} />
              <Stat label={t.nav.homework} value={data.engagement.homeworkCompleted} />
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="font-black">💻 Programming</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Stat label={t.admin.learners} value={data.programming.learners} />
              <Stat
                label={t.admin.lessonsDone}
                value={data.programming.lessonsCompletedWindow}
                hint={`${data.programming.lessonsCompletedAll} all-time`}
              />
              <Stat
                label={t.admin.contentLessons}
                value={data.programming.lessonsTotal}
              />
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="font-black">🖥️ Playground</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              <Stat label={t.admin.catalog} value={data.playground.catalogChallenges} />
              <Stat label={t.admin.solvesWindow} value={data.playground.solvesWindow} />
              <Stat label={t.admin.solvesAll} value={data.playground.solvesAllTime} />
            </div>
          </section>

          {data.exams && (
            <section className="space-y-2">
              <h2 className="font-black">📝 Exams & deep tracks</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="Exam lessons" value={data.exams.catalog} />
                <Stat label="Passed (window)" value={data.exams.passedWindow} />
                <Stat label="Passed all" value={data.exams.passedAllTime} />
                <Stat label="Deep track learners" value={data.exams.deepTrackLearners} />
              </div>
            </section>
          )}

          {data.minis && (
            <section className="space-y-2">
              <h2 className="font-black">🧩 Minis</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label={t.admin.catalog} value={data.minis.catalog} />
                <Stat
                  label={t.admin.minisCompletions}
                  value={data.minis.completionsAllTime}
                />
                <Stat
                  label={t.admin.minisRacePlayers}
                  value={data.minis.raceParticipantsThisWeek}
                  hint={`${data.minis.raceFeatured} featured`}
                />
              </div>
            </section>
          )}

          <section className="card space-y-2">
            <h2 className="font-black">{t.admin.topActivity}</h2>
            {data.topActivityKinds.length === 0 && (
              <p className="text-sm text-ink-muted">—</p>
            )}
            {data.topActivityKinds.map((k) => (
              <div
                key={k.kind}
                className="flex justify-between text-sm font-bold border-b border-slate-50 py-1 dark:border-slate-800"
              >
                <span className="font-mono text-xs">{k.kind}</span>
                <span>{k.n}</span>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
