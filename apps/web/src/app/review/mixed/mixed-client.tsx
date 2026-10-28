"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "@/lib/locale-context";
import { PageLoading } from "@/components/page-loading";
import { useRequireAuth } from "@/lib/use-require-auth";
import { PracticeSession } from "@/components/practice-session";

function MixedBody() {
  const { ready } = useRequireAuth();
  const { locale, t } = useLocale();
  const en = locale === "en";
  const course = useSearchParams().get("course");
  const q = new URLSearchParams({ count: "10" });
  if (course) q.set("course", course);
  if (!ready) return <PageLoading label={t.common.loading} />;
  return (
    <PracticeSession
      loadPath={`/review/mixed?${q.toString()}`}
      checkPath="/review/mixed/check"
      title={`🔀 ${en ? "Mixed practice" : "Змішана практика"}`}
      intro={
        en
          ? "Interleaved questions from lessons you completed. Mixing topics makes recall harder now — and memory stronger later. +2 XP per first-try answer."
          : "Питання вперемішку з уроків, які ви пройшли. Змішування тем ускладнює пригадування зараз — і зміцнює памʼять надовго. +2 XP за відповідь з першої спроби."
      }
      emptyTitle={en ? "Nothing to mix yet" : "Поки нічого змішувати"}
      emptyDescription={
        en
          ? "Complete a few lessons first — then come back for interleaved review."
          : "Спершу пройдіть кілька уроків — потім поверніться до змішаного повторення."
      }
    />
  );
}

export function MixedPracticeClient() {
  return (
    <Suspense fallback={<PageLoading label="…" />}>
      <MixedBody />
    </Suspense>
  );
}
