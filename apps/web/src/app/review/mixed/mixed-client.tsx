"use client";

import Link from "next/link";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { EmptyState } from "@/components/ui";
import { PageLoading } from "@/components/page-loading";
import { useRequireAuth } from "@/lib/use-require-auth";
import { ExercisePlayer, type Exercise } from "@/components/exercises";

type MixedItem = {
  lessonId: string;
  courseSlug: string;
  lessonTitleUk: string;
  lessonTitleEn: string;
  exercise: Exercise;
};

type CheckResult = {
  results: { lessonId: string; exerciseId: string; correct: boolean }[];
  correct: number;
  total: number;
  accuracy: number;
};

function MixedBody() {
  const { token, loading } = useAuth();
  const { ready } = useRequireAuth();
  const { locale, t } = useLocale();
  const en = locale === "en";
  const searchParams = useSearchParams();
  const course = searchParams.get("course");

  const [items, setItems] = useState<MixedItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<
    { lessonId: string; exerciseId: string; answer: unknown }[]
  >([]);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!token) return;
    setBusy(true);
    setError(null);
    setResult(null);
    setAnswers([]);
    setIdx(0);
    const q = new URLSearchParams({ count: "10" });
    if (course) q.set("course", course);
    api<{ items: MixedItem[] }>(`/review/mixed?${q.toString()}`, { token })
      .then((d) => setItems(d.items ?? []))
      .catch(() => {
        setItems([]);
        setError(en ? "Could not load practice." : "Не вдалося завантажити практику.");
      })
      .finally(() => setBusy(false));
  }, [token, course, en]);

  useEffect(() => {
    load();
  }, [load]);

  async function finish(all: { lessonId: string; exerciseId: string; answer: unknown }[]) {
    setBusy(true);
    try {
      const r = await api<CheckResult>("/review/mixed/check", {
        method: "POST",
        token,
        body: { answers: all },
      });
      setResult(r);
    } catch {
      setError(en ? "Could not check answers." : "Не вдалося перевірити відповіді.");
    } finally {
      setBusy(false);
    }
  }

  function handleAnswer(answer: unknown) {
    const it = items[idx];
    if (!it) return;
    const next = [
      ...answers,
      { lessonId: it.lessonId, exerciseId: it.exercise.id, answer },
    ];
    setAnswers(next);
    if (idx < items.length - 1) setIdx(idx + 1);
    else void finish(next);
  }

  if (loading || !ready || busy) return <PageLoading label={t.common.loading} />;

  const intro = (
    <div className="space-y-1">
      <h1 className="text-3xl font-black">🔀 {en ? "Mixed practice" : "Змішана практика"}</h1>
      <p className="text-sm font-bold text-ink-muted">
        {en
          ? "Interleaved questions from lessons you completed. Mixing topics makes recall harder now — and memory stronger later."
          : "Питання вперемішку з уроків, які ви пройшли. Змішування тем ускладнює пригадування зараз — і зміцнює памʼять надовго."}
      </p>
    </div>
  );

  if (error) {
    return (
      <div className="space-y-4">
        {intro}
        <p className="card font-bold text-red-600">{error}</p>
        <button type="button" className="btn-secondary" onClick={load}>
          {en ? "Retry" : "Спробувати знову"}
        </button>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="space-y-4">
        {intro}
        <EmptyState
          title={en ? "Nothing to mix yet" : "Поки нічого змішувати"}
          description={
            en
              ? "Complete a few lessons first — then come back for interleaved review."
              : "Спершу пройдіть кілька уроків — потім поверніться до змішаного повторення."
          }
          actionHref="/learn"
          actionLabel={t.nav.learn}
        />
      </div>
    );
  }

  if (result) {
    const pct = Math.round(result.accuracy * 100);
    return (
      <div className="space-y-4 pb-24 md:pb-6">
        {intro}
        <section className="card space-y-2 border-brand/40 bg-brand-soft/15">
          <p className="text-xs font-black uppercase text-brand-dark">
            {en ? "Session result" : "Результат сесії"}
          </p>
          <p className="text-3xl font-black">
            {result.correct}/{result.total} · {pct}%
          </p>
        </section>
        <ul className="space-y-2">
          {items.map((it, i) => {
            const r = result.results[i];
            return (
              <li key={`${it.lessonId}:${it.exercise.id}`} className="card flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-ink-muted">
                    {en ? it.lessonTitleEn : it.lessonTitleUk}
                  </p>
                  <p className="font-bold">
                    {String((en ? it.exercise.promptEn : it.exercise.promptUk) || it.exercise.promptUk)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className={r?.correct ? "text-green-600 font-black" : "text-orange-500 font-black"}>
                    {r?.correct ? "✓" : "↺"}
                  </span>
                  {!r?.correct && (
                    <Link
                      href={`/courses/${it.courseSlug}/lessons/${it.lessonId}`}
                      className="text-sm font-bold text-sky hover:underline"
                    >
                      {en ? "Lesson" : "Урок"} →
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-primary" onClick={load}>
            {en ? "New mix" : "Новий мікс"}
          </button>
          <Link href="/review" className="btn-secondary">
            {en ? "Back to review" : "До повторення"}
          </Link>
        </div>
      </div>
    );
  }

  const it = items[idx]!;
  return (
    <div className="space-y-4">
      {intro}
      <div className="flex items-center justify-between text-sm font-bold text-ink-muted">
        <span>
          {idx + 1} / {items.length}
        </span>
        <span>{it.courseSlug}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-brand"
          style={{ width: `${Math.round((idx / items.length) * 100)}%` }}
        />
      </div>
      <div className="card">
        <ExercisePlayer key={`${it.lessonId}:${it.exercise.id}`} exercise={it.exercise} onAnswer={handleAnswer} />
      </div>
    </div>
  );
}

export function MixedPracticeClient() {
  return (
    <Suspense fallback={<PageLoading label="…" />}>
      <MixedBody />
    </Suspense>
  );
}
