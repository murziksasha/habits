"use client";

import { useLocale } from "@/lib/locale-context";
import { PageLoading } from "@/components/page-loading";
import { useRequireAuth } from "@/lib/use-require-auth";
import { PracticeSession } from "@/components/practice-session";

export function MistakesClient() {
  const { ready } = useRequireAuth();
  const { locale, t } = useLocale();
  const en = locale === "en";
  if (!ready) return <PageLoading label={t.common.loading} />;
  return (
    <PracticeSession
      loadPath="/review/mistakes?limit=10"
      checkPath="/review/mistakes/check"
      title={`📓 ${en ? "Mistake notebook" : "Зошит помилок"}`}
      intro={
        en
          ? "Exercises you missed or guessed come back on a spaced schedule until you answer them confidently on the first try."
          : "Вправи, у яких ви помилились або вгадали, повертаються за інтервальним графіком, доки ви не відповісте впевнено з першої спроби."
      }
      emptyTitle={en ? "No mistakes due" : "Немає помилок до повторення"}
      emptyDescription={
        en
          ? "Great! New items appear after lessons where you needed extra attempts."
          : "Чудово! Нові вправи зʼявляться після уроків, де знадобились додаткові спроби."
      }
    />
  );
}
