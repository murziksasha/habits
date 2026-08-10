"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { Badge, EmptyState } from "@/components/ui";
import { PageLoading } from "@/components/page-loading";
import { useRequireAuth } from "@/lib/use-require-auth";

type ReviewReason = {
  code: string;
  labelUk: string;
  labelEn: string;
};

type Item = {
  lessonId: string;
  lessonTitleUk: string;
  courseSlug: string;
  courseTitleUk: string;
  courseIcon: string;
  masteryPct: number;
  attempts: number;
  leech?: boolean;
  reasons?: ReviewReason[];
  primaryReasonUk?: string;
  primaryReasonEn?: string;
};

type ExamContext = {
  courseSlug?: string;
  wrongTypes?: string[];
  accuracy?: number;
};

function ReviewBody() {
  const { user, token, loading } = useAuth();
  const { ready } = useRequireAuth();
  const { t, locale } = useLocale();
  const searchParams = useSearchParams();
  const fromExam = searchParams.get("from") === "exam";
  const [items, setItems] = useState<Item[]>([]);
  const [stats, setStats] = useState({ total: 0, mastered: 0, weak: 0 });
  const [examContext, setExamContext] = useState<ExamContext | null>(null);
  const [dueCards, setDueCards] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    setDataLoading(true);
    const q = fromExam ? "?from=exam" : "";
    Promise.all([
      api<{ items: Item[]; examContext?: ExamContext | null }>(`/review${q}`, {
        token,
      })
        .then((d) => {
          setItems(d.items);
          setExamContext(d.examContext ?? null);
        })
        .catch(() => setItems([])),
      api<{ total: number; mastered: number; weak: number }>("/review/stats", {
        token,
      })
        .then(setStats)
        .catch(() => undefined),
      api<{ decks?: { dueCount?: number }[]; due?: number }>("/flashcards", { token })
        .then((d) => {
          if (typeof d.due === "number") {
            setDueCards(d.due);
            return;
          }
          const n = (d.decks ?? []).reduce((s, x) => s + (x.dueCount ?? 0), 0);
          setDueCards(n);
        })
        .catch(() => setDueCards(0)),
    ]).finally(() => setDataLoading(false));
  }, [token, fromExam]);

  if (loading || !ready || dataLoading) return <PageLoading label={t.common.loading} />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">🔁 {t.review.title}</h1>
      <p className="text-sm font-bold text-ink-muted">
        {locale === "en"
          ? "Unified inbox: weak lessons + flashcards due."
          : "Єдиний інбокс: слабкі уроки + картки до повторення."}
      </p>

      {!items.length && dueCards === 0 && (
        <EmptyState
          title={t.onboarding.emptyReview}
          description={
            locale === "en"
              ? "Start a lesson or open flashcards when due."
              : "Почніть урок або відкрийте картки, коли зʼявляться."
          }
          actionHref="/learn"
          actionLabel={t.nav.learn}
        />
      )}

      {(dueCards > 0 || items.length > 0) && (
        <section className="card border-brand/40 bg-brand-soft/15 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase text-brand-dark">
              {locale === "en" ? "Review now" : "Повторити зараз"}
            </p>
            <p className="font-black">
              {items.length} {locale === "en" ? "lessons" : "уроків"}
              {dueCards > 0
                ? ` · ${dueCards} ${locale === "en" ? "cards" : "карток"}`
                : ""}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {items[0] && (
              <Link
                href={`/courses/${items[0].courseSlug}/lessons/${items[0].lessonId}`}
                className="btn-primary !py-2 text-sm"
              >
                {locale === "en" ? "Weak lesson" : "Слабкий урок"} →
              </Link>
            )}
            <Link href="/flashcards" className="btn-secondary !py-2 text-sm">
              🃏 {t.nav.flashcards}
              {dueCards > 0 ? ` (${dueCards})` : ""}
            </Link>
          </div>
        </section>
      )}

      {fromExam && (
        <div className="card border-grape/40 bg-grape/10 space-y-2">
          <p className="text-sm font-black text-grape">
            {locale === "en"
              ? "After exam — focus weak skills"
              : "Після контрольної — фокус на слабких місцях"}
          </p>
          {examContext?.wrongTypes?.length ? (
            <p className="text-sm font-bold">
              {locale === "en" ? "Missed types:" : "Типи з помилками:"}{" "}
              {examContext.wrongTypes.join(", ")}
              {examContext.accuracy != null
                ? ` · ${Math.round(examContext.accuracy * 100)}%`
                : ""}
            </p>
          ) : (
            <p className="text-sm font-bold text-ink-muted">
              {locale === "en"
                ? "Review low-mastery lessons below, then retry the exam."
                : "Повторіть уроки з низькою майстерністю нижче, потім спробуйте контрольну знову."}
            </p>
          )}
          {examContext?.courseSlug && (
            <Link
              href={`/courses/${examContext.courseSlug}`}
              className="text-sm font-bold text-sky hover:underline"
            >
              {locale === "en" ? "Back to course" : "До курсу"} →
            </Link>
          )}
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="card">
          <p className="text-xs font-bold text-ink-muted">{t.review.stats}</p>
          <p className="text-2xl font-black">{stats.total}</p>
        </div>
        <div className="card">
          <p className="text-xs font-bold text-ink-muted">{t.review.mastered}</p>
          <p className="text-2xl font-black text-green-600">{stats.mastered}</p>
        </div>
        <div className="card">
          <p className="text-xs font-bold text-ink-muted">{t.review.weak}</p>
          <p className="text-2xl font-black text-orange-500">{stats.weak}</p>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="card text-ink-muted font-bold">{t.review.empty}</p>
      ) : (
        <div className="space-y-3">
          {items.map((it) => (
            <div
              key={it.lessonId}
              className="card flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm text-ink-muted">
                  {it.courseIcon} {it.courseTitleUk}
                  {it.leech ? (
                    <Badge tone="grape" className="ml-2">
                      leech
                    </Badge>
                  ) : null}
                </p>
                <p className="font-black text-lg">{it.lessonTitleUk}</p>
                <p className="text-sm font-bold">
                  {t.review.mastery}: {it.masteryPct}% · attempts: {it.attempts}
                </p>
                {(it.primaryReasonUk || it.reasons?.[0]) && (
                  <p className="mt-1 text-xs font-bold text-ink-muted">
                    {locale === "en" ? "Why:" : "Чому:"}{" "}
                    {locale === "en"
                      ? it.primaryReasonEn || it.reasons?.[0]?.labelEn
                      : it.primaryReasonUk || it.reasons?.[0]?.labelUk}
                  </p>
                )}
                {it.reasons && it.reasons.length > 1 && (
                  <ul className="mt-1 list-inside list-disc text-xs font-bold text-ink-muted">
                    {it.reasons.slice(1, 3).map((r) => (
                      <li key={r.code + r.labelEn}>
                        {locale === "en" ? r.labelEn : r.labelUk}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-2 h-2 max-w-xs overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-orange-400"
                    style={{ width: `${it.masteryPct}%` }}
                  />
                </div>
              </div>
              <Link
                href={`/courses/${it.courseSlug}/lessons/${it.lessonId}`}
                className="btn-primary shrink-0"
              >
                {t.review.open}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ReviewClient() {
  return (
    <Suspense fallback={<p>…</p>}>
      <ReviewBody />
    </Suspense>
  );
}
