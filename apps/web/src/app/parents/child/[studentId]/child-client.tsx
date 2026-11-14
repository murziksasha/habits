"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { Badge, Button, Card, EmptyState } from "@/components/ui";
import { PageLoading } from "@/components/page-loading";

type ChildProgress = {
  character: {
    displayName: string;
    globalXp: number;
    globalLevel: number;
    streakDays: number;
    dailyXp: number;
    dailyGoalXp: number;
  } | null;
  courses: {
    courseSlug: string;
    titleUk: string;
    xp: number;
    level: number;
    completedLessons: number;
  }[];
  homework: {
    titleUk: string;
    status: string;
    score: number | null;
    dueAt: string | null;
    className: string;
  }[];
  playground?: {
    solved: number;
    xp: number;
    total: number;
    maxXp: number;
    challenges: {
      id: string;
      lang: string;
      titleUk: string;
      titleEn: string;
      xpReward: number;
    }[];
  };
  programming?: {
    lessonsCompleted: number;
    lessonsTotal: number;
    unitsDone: number;
    unitsTotal: number;
    pathComplete: boolean;
    units: {
      slug: string;
      titleUk: string;
      titleEn: string;
      done: number;
      total: number;
      complete: boolean;
    }[];
  } | null;
  certificates?: {
    code: string;
    titleUk: string;
    titleEn: string;
    issuedAt: string;
    courseSlug: string;
  }[];
  milestones?: {
    code: string;
    titleUk: string;
    titleEn: string;
    unlockedAt: string;
  }[];
};

type Digest = {
  lessonsCompleted: number;
  xpApprox: number;
  streakDays: number;
  programmingLessonsWeek: number;
  examsPassedWeek?: number;
  playgroundSolvedWeek: number;
  homeworkCompletedWeek: number;
  childName: string;
  globalLevel: number;
};

export function ParentChildClient() {
  const { studentId } = useParams<{ studentId: string }>();
  const { user, token, loading } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const [data, setData] = useState<ChildProgress | null>(null);
  const [digest, setDigest] = useState<Digest | null>(null);
  const [digestMsg, setDigestMsg] = useState("");

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token || !studentId) return;
    void api<ChildProgress>(`/parents/children/${studentId}/progress`, { token })
      .then(setData)
      .catch(() => setData(null));
    void api<{ digest: Digest }>(`/parents/children/${studentId}/digest`, { token })
      .then((d) => setDigest(d.digest))
      .catch(() => setDigest(null));
  }, [token, studentId]);

  async function sendDigest() {
    if (!token || !studentId) return;
    setDigestMsg("");
    try {
      const r = await api<{ ok: boolean; preview?: string }>(
        `/parents/children/${studentId}/digest/send`,
        { method: "POST", token },
      );
      setDigestMsg(r.preview ? r.preview.slice(0, 200) + "…" : t.parents.digestSent);
    } catch {
      setDigestMsg(t.common.error);
    }
  }

  if (loading || !user) {
    return <PageLoading label={t.common.loading} />;
  }
  if (!data) {
    return (
      <EmptyState
        title={locale === "en" ? "Child not found" : "Дитину не знайдено"}
        description={
          locale === "en"
            ? "Check the link or return to the parents portal."
            : "Перевірте посилання або поверніться до кабінету батьків."
        }
        actionHref="/parents"
        actionLabel={t.nav.parents}
      />
    );
  }

  const ch = data.character;
  const prog = data.programming;
  const pg = data.playground;
  const quietWeek =
    digest &&
    digest.lessonsCompleted === 0 &&
    digest.xpApprox === 0 &&
    digest.programmingLessonsWeek === 0 &&
    digest.playgroundSolvedWeek === 0 &&
    digest.homeworkCompletedWeek === 0 &&
    (digest.examsPassedWeek ?? 0) === 0;

  return (
    <div className="space-y-6">
      <Link href="/parents" className="text-sm font-bold text-ink-muted">
        ← {t.common.back}
      </Link>
      <Card>
        <h1 className="text-3xl font-black">
          {t.parents.progress}: {ch?.displayName}
        </h1>
        <p className="text-ink-muted font-bold mt-2">
          L{ch?.globalLevel ?? 1} · {ch?.globalXp ?? 0} XP · 🔥 {ch?.streakDays ?? 0} ·
          daily {ch?.dailyXp ?? 0}/{ch?.dailyGoalXp ?? 50}
        </p>
      </Card>

      {/* 3-part Actionable Parent Report Card */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card space-y-2 border-emerald-300/40 bg-emerald-50/20 dark:border-emerald-800/40 dark:bg-emerald-950/20">
          <p className="text-xs font-black uppercase text-emerald-800 dark:text-emerald-300">
            🎯 {locale === "en" ? "What Was Mastered" : "Чому навчився"}
          </p>
          <p className="text-sm font-bold text-ink">
            {digest && digest.lessonsCompleted > 0
              ? locale === "en"
                ? `${digest.lessonsCompleted} lessons completed, ${digest.examsPassedWeek ?? 0} exams passed with verified mastery.`
                : `Пройдено ${digest.lessonsCompleted} уроків, складено ${digest.examsPassedWeek ?? 0} контрольних із підтвердженим результатом.`
              : locale === "en"
                ? "Active practice recorded in course syllabus."
                : "Зафіксовано активні навчальні сесії за програмою."}
          </p>
        </div>

        <div className="card space-y-2 border-amber-300/40 bg-amber-50/20 dark:border-amber-800/40 dark:bg-amber-950/20">
          <p className="text-xs font-black uppercase text-amber-800 dark:text-amber-300">
            🤝 {locale === "en" ? "Where Support Is Needed" : "Де потрібна підтримка"}
          </p>
          <p className="text-sm font-bold text-ink">
            {data?.homework?.some((h) => h.status !== "graded" && h.status !== "submitted")
              ? locale === "en"
                ? "Check pending assignments and encourage independent first attempts."
                : "Є поточні домашні завдання, заохочуйте самостійні перші спроби."
              : locale === "en"
                ? "Encourage solving exercises with fewer hints to boost self-verified mastery."
                : "Заохочуйте вирішувати вправи без підказок для зростання самостійності."}
          </p>
        </div>

        <div className="card space-y-2 border-sky-300/40 bg-sky-50/20 dark:border-sky-800/40 dark:bg-sky-950/20">
          <p className="text-xs font-black uppercase text-sky-800 dark:text-sky-300">
            🚀 {locale === "en" ? "Next Step" : "Наступний крок"}
          </p>
          <p className="text-sm font-bold text-ink">
            {data?.courses[0]
              ? locale === "en"
                ? `Continue ${data.courses[0].titleUk} or complete spaced retention check.`
                : `Продовжити курс «${data.courses[0].titleUk}» або пройти інтервальне закріплення.`
              : locale === "en"
                ? "Start the next recommended 10-minute learning session."
                : "Почати наступну рекомендовану 10-хвилинну сесію."}
          </p>
        </div>
      </div>

      {digest && (
        <Card className="space-y-3 border-sky/30">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-black">📧 {t.parents.weeklyDigest}</h2>
              {quietWeek ? (
                <Badge tone="muted">
                  {locale === "en" ? "Quiet week" : "Тихий тиждень"}
                </Badge>
              ) : (
                <Badge tone="sky">7d</Badge>
              )}
            </div>
            <Button size="sm" onClick={() => void sendDigest()}>
              {t.parents.sendDigest}
            </Button>
          </div>
          {quietWeek && (
            <p className="text-sm font-bold text-ink-muted">
              {locale === "en"
                ? "Little activity this week — email will gently nudge the family to start one lesson."
                : "Мало активності — лист м’яко нагадає почати хоча б один урок."}
            </p>
          )}
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-4 text-center">
            <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-900">
              <p className="text-[10px] font-bold text-ink-muted">{t.parents.lessonsWeek}</p>
              <p className="text-xl font-black">{digest.lessonsCompleted}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-900">
              <p className="text-[10px] font-bold text-ink-muted">{t.parents.xpWeek}</p>
              <p className="text-xl font-black">{digest.xpApprox}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-900">
              <p className="text-[10px] font-bold text-ink-muted">🔥</p>
              <p className="text-xl font-black">{digest.streakDays}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-900">
              <p className="text-[10px] font-bold text-ink-muted">{t.parents.progWeek}</p>
              <p className="text-xl font-black">{digest.programmingLessonsWeek}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-900">
              <p className="text-[10px] font-bold text-ink-muted">{t.parents.pgWeek}</p>
              <p className="text-xl font-black">{digest.playgroundSolvedWeek}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-900">
              <p className="text-[10px] font-bold text-ink-muted">{t.parents.hwWeek}</p>
              <p className="text-xl font-black">{digest.homeworkCompletedWeek}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-2 dark:bg-slate-900">
              <p className="text-[10px] font-bold text-ink-muted">
                📝 {locale === "en" ? "Exams" : "Контрольні"}
              </p>
              <p className="text-xl font-black">{digest.examsPassedWeek ?? 0}</p>
            </div>
          </div>
          {digestMsg && (
            <pre className="whitespace-pre-wrap text-xs font-bold text-ink-muted rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
              {digestMsg}
            </pre>
          )}
        </Card>
      )}

      {prog && (
        <section className="card space-y-3 border-sky/30">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-black">💻 {t.parents.programmingTitle}</h2>
            {prog.pathComplete ? (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-700 dark:bg-green-900/40 dark:text-green-300">
                {t.parents.pathComplete}
              </span>
            ) : null}
          </div>
          <p className="text-sm font-bold text-ink-muted">
            {prog.lessonsCompleted}/{prog.lessonsTotal} {t.parents.lessons} ·{" "}
            {prog.unitsDone}/{prog.unitsTotal} units
          </p>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-sky transition-all"
              style={{
                width: `${
                  prog.lessonsTotal
                    ? Math.round((prog.lessonsCompleted / prog.lessonsTotal) * 100)
                    : 0
                }%`,
              }}
            />
          </div>
          <ul className="space-y-1.5">
            {prog.units.map((u) => (
              <li
                key={u.slug}
                className="flex justify-between text-sm font-bold"
              >
                <span>
                  {u.complete ? "✓ " : "○ "}
                  {locale === "en" ? u.titleEn : u.titleUk}
                </span>
                <span className="text-ink-muted">
                  {u.done}/{u.total}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {pg && (
        <section className="card space-y-3 border-grape/30">
          <h2 className="font-black">🖥️ {t.parents.playgroundTitle}</h2>
          <p className="text-sm font-bold text-ink-muted">
            {pg.solved}/{pg.total} {t.parents.challengesSolved} · {pg.xp}/{pg.maxXp} XP
          </p>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-grape transition-all"
              style={{
                width: `${pg.total ? Math.round((pg.solved / pg.total) * 100) : 0}%`,
              }}
            />
          </div>
          {pg.challenges.length > 0 ? (
            <ul className="max-h-48 space-y-1 overflow-y-auto text-sm">
              {pg.challenges.map((c) => (
                <li key={c.id} className="flex justify-between font-bold">
                  <span>
                    [{c.lang}]{" "}
                    {locale === "en" ? c.titleEn || c.titleUk : c.titleUk}
                  </span>
                  <span className="text-ink-muted">+{c.xpReward} XP</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink-muted">{t.parents.noPgYet}</p>
          )}
        </section>
      )}

      {(data.certificates?.length ?? 0) > 0 && (
        <section className="card space-y-2">
          <h2 className="font-black">📜 {t.nav.certificates}</h2>
          {data.certificates!.map((cert) => (
            <Link
              key={cert.code}
              href={`/certificates/${cert.code}`}
              className="flex justify-between text-sm font-bold hover:text-sky"
            >
              <span>
                {locale === "en" ? cert.titleEn || cert.titleUk : cert.titleUk}
              </span>
              <span className="text-ink-muted font-mono text-xs">{cert.code}</span>
            </Link>
          ))}
        </section>
      )}

      <section className="card space-y-2">
        <h2 className="font-black">{t.nav.courses}</h2>
        {data.courses.map((c) => (
          <div key={c.courseSlug} className="flex justify-between text-sm font-bold">
            <span>{c.titleUk}</span>
            <span className="text-ink-muted">
              L{c.level} · {c.xp} XP · {c.completedLessons} lessons
            </span>
          </div>
        ))}
        {!data.courses.length && <p className="text-ink-muted text-sm">—</p>}
      </section>

      <section className="card space-y-2">
        <h2 className="font-black">{t.homework.title}</h2>
        {data.homework.map((h, i) => (
          <div
            key={i}
            className="flex justify-between text-sm font-bold border-b border-slate-50 py-2 dark:border-slate-800"
          >
            <span>
              {h.titleUk}{" "}
              <span className="text-ink-muted font-semibold">({h.className})</span>
            </span>
            <span>
              {h.status}
              {h.score != null ? ` ${Math.round(h.score * 100)}%` : ""}
            </span>
          </div>
        ))}
        {!data.homework.length && (
          <p className="text-sm text-ink-muted">{t.homework.empty}</p>
        )}
      </section>
    </div>
  );
}
