"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ConfidenceLevel } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { EmptyState } from "@/components/ui";
import { PageLoading } from "@/components/page-loading";
import { ExercisePlayer, type Exercise } from "@/components/exercises";
import { ConfidencePicker, isConfidenceRateable } from "@/components/confidence-picker";

export type PracticeItem = {
  lessonId: string;
  courseSlug: string;
  lessonTitleUk: string;
  lessonTitleEn: string;
  exercise: Exercise;
};

type CheckResult = {
  results: { lessonId: string; exerciseId: string; correct: boolean; firstTry?: boolean }[];
  correct: number;
  total: number;
  accuracy: number;
  xpGain?: number;
  xpCapReached?: boolean;
};

type SessionAnswer = {
  lessonId: string;
  exerciseId: string;
  answer: unknown;
  wrongAttempts: number;
  confidence: ConfidenceLevel | null;
};

/**
 * Generic review session (mixed practice + mistake notebook, SPEC 91/92):
 * loads items, plays them with confidence rating + wrong-attempt tracking, grades server-side.
 */
export function PracticeSession({
  loadPath,
  checkPath,
  title,
  intro,
  emptyTitle,
  emptyDescription,
}: {
  loadPath: string;
  checkPath: string;
  title: string;
  intro: string;
  emptyTitle: string;
  emptyDescription: string;
}) {
  const { token, loading } = useAuth();
  const { locale, t } = useLocale();
  const en = locale === "en";

  const [items, setItems] = useState<PracticeItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<SessionAnswer[]>([]);
  const [confidence, setConfidence] = useState<ConfidenceLevel | null>(null);
  const wrongRef = useRef(0);
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
    setConfidence(null);
    wrongRef.current = 0;
    api<{ items: PracticeItem[] }>(loadPath, { token })
      .then((d) => setItems(d.items ?? []))
      .catch(() => {
        setItems([]);
        setError(en ? "Could not load practice." : "Не вдалося завантажити практику.");
      })
      .finally(() => setBusy(false));
  }, [token, loadPath, en]);

  useEffect(() => {
    load();
  }, [load]);

  async function finish(all: SessionAnswer[]) {
    setBusy(true);
    try {
      const r = await api<CheckResult>(checkPath, { method: "POST", token, body: { answers: all } });
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
      {
        lessonId: it.lessonId,
        exerciseId: it.exercise.id,
        answer,
        wrongAttempts: wrongRef.current,
        confidence,
      },
    ];
    setAnswers(next);
    wrongRef.current = 0;
    setConfidence(null);
    if (idx < items.length - 1) setIdx(idx + 1);
    else void finish(next);
  }

  if (loading || busy) return <PageLoading label={t.common.loading} />;

  const header = (
    <div className="space-y-1">
      <h1 className="text-3xl font-black">{title}</h1>
      <p className="text-sm font-bold text-ink-muted">{intro}</p>
    </div>
  );

  if (error) {
    return (
      <div className="space-y-4">
        {header}
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
        {header}
        <EmptyState title={emptyTitle} description={emptyDescription} actionHref="/review" actionLabel={t.nav.review} />
      </div>
    );
  }

  if (result) {
    const pct = Math.round(result.accuracy * 100);
    return (
      <div className="space-y-4 pb-24 md:pb-6">
        {header}
        <section className="card space-y-2 border-brand/40 bg-brand-soft/15">
          <p className="text-xs font-black uppercase text-brand-dark">
            {en ? "Session result (first try)" : "Результат сесії (з першої спроби)"}
          </p>
          <p className="text-3xl font-black">
            {result.correct}/{result.total} · {pct}%
          </p>
          {typeof result.xpGain === "number" && (
            <p className="text-sm font-bold">
              +{result.xpGain} XP
              {result.xpCapReached
                ? en
                  ? " · daily review XP cap reached"
                  : " · денний ліміт XP за повторення"
                : ""}
            </p>
          )}
        </section>
        <ul className="space-y-2">
          {items.map((it, i) => {
            const r = result.results[i];
            const ok = r?.firstTry ?? r?.correct;
            return (
              <li key={`${it.lessonId}:${it.exercise.id}`} className="card flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-ink-muted">{en ? it.lessonTitleEn : it.lessonTitleUk}</p>
                  <p className="font-bold">
                    {String((en ? it.exercise.promptEn : it.exercise.promptUk) || it.exercise.promptUk)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className={ok ? "font-black text-green-600" : "font-black text-orange-500"}>
                    {ok ? "✓" : "↺"}
                  </span>
                  {!ok && (
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
            {en ? "Again" : "Ще раз"}
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
      {header}
      <div className="flex items-center justify-between text-sm font-bold text-ink-muted">
        <span>
          {idx + 1} / {items.length}
        </span>
        <span>{it.courseSlug}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-brand" style={{ width: `${Math.round((idx / items.length) * 100)}%` }} />
      </div>
      <div className="card space-y-4">
        {isConfidenceRateable(it.exercise.type) && (
          <ConfidencePicker value={confidence} onChange={setConfidence} />
        )}
        <ExercisePlayer
          key={`${it.lessonId}:${it.exercise.id}`}
          exercise={it.exercise}
          onAnswer={handleAnswer}
          onWrongAttempt={() => {
            wrongRef.current += 1;
          }}
          lessonId={it.lessonId}
        />
      </div>
    </div>
  );
}
