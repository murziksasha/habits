"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import clsx from "clsx";

type Hw = {
  submissionId: string;
  status: string;
  score: number | null;
  titleUk: string;
  titleEn: string;
  dueAt: string | null;
  lessonId: string;
  courseSlug: string;
  lessonTitleUk: string;
  className: string;
};

type PgAssign = {
  id: string;
  challengeId: string;
  className: string;
  titleUk?: string;
  titleEn?: string;
  solved: boolean;
  xpReward: number;
};

export default function HomeworkPage() {
  const { user, token, loading } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const [items, setItems] = useState<Hw[]>([]);
  const [pgAssigns, setPgAssigns] = useState<PgAssign[]>([]);
  const [reminders, setReminders] = useState<
    { titleUk: string; dueAt: string | null; overdue: boolean; className: string }[]
  >([]);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token) return;
    void api<{ homework: Hw[] }>("/homework/mine", { token })
      .then((d) => setItems(d.homework))
      .catch(() => setItems([]));
    void api<{
      reminders: {
        titleUk: string;
        dueAt: string | null;
        overdue: boolean;
        className: string;
      }[];
    }>("/reminders/homework/mine", { token })
      .then((d) => setReminders(d.reminders))
      .catch(() => setReminders([]));
    void api<{ assignments: PgAssign[] }>("/playground/class-mine", { token })
      .then((d) => setPgAssigns(d.assignments))
      .catch(() => setPgAssigns([]));
  }, [token]);

  if (loading || !user) return <p>{t.common.loading}</p>;

  const statusLabel = (s: string) =>
    s === "completed"
      ? t.homework.completed
      : s === "overdue"
        ? t.homework.overdue
        : t.homework.assigned;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">📝 {t.homework.title}</h1>
      {reminders.length > 0 && (
        <div className="card border-sun/40 bg-amber-50 space-y-2">
          <p className="font-black text-sun">⏰ Due soon / overdue</p>
          {reminders.map((r, i) => (
            <p key={i} className="text-sm font-bold">
              {r.overdue ? "⚠️" : "⏳"} {r.titleUk} ({r.className})
              {r.dueAt ? ` · ${new Date(r.dueAt).toLocaleString()}` : ""}
            </p>
          ))}
        </div>
      )}
      <div className="space-y-3">
        {items.map((h) => (
          <div
            key={h.submissionId}
            className={clsx(
              "card flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
              h.status === "completed" && "border-brand/30 bg-brand-soft/20",
              h.status === "overdue" && "border-red-200 bg-red-50/50",
            )}
          >
            <div>
              <p className="font-black">
                {locale === "en" && h.titleEn ? h.titleEn : h.titleUk}
              </p>
              <p className="text-sm text-ink-muted">
                {h.className} · {h.lessonTitleUk}
              </p>
              <p className="text-xs font-bold mt-1">
                {t.homework.status}: {statusLabel(h.status)}
                {h.dueAt && (
                  <>
                    {" "}
                    · {t.homework.due}: {new Date(h.dueAt).toLocaleString()}
                  </>
                )}
              </p>
            </div>
            {h.status !== "completed" && (
              <Link
                href={`/courses/${h.courseSlug}/lessons/${h.lessonId}`}
                className="btn-primary !py-2 text-sm"
              >
                {t.homework.open}
              </Link>
            )}
          </div>
        ))}
        {!items.length && !pgAssigns.length && (
          <p className="text-ink-muted">{t.homework.empty}</p>
        )}
      </div>

      {pgAssigns.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-black">🖥️ {t.homework.playgroundSection}</h2>
          {pgAssigns.map((a) => (
            <div
              key={a.id}
              className={clsx(
                "card flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-grape/20",
                a.solved && "bg-brand-soft/20",
              )}
            >
              <div>
                <p className="font-black">
                  {a.solved ? "✓ " : ""}
                  {locale === "en"
                    ? a.titleEn || a.titleUk || a.challengeId
                    : a.titleUk || a.challengeId}
                </p>
                <p className="text-sm text-ink-muted">
                  {a.className} · +{a.xpReward} XP
                </p>
              </div>
              {!a.solved && (
                <Link
                  href={`/playground?challenge=${encodeURIComponent(a.challengeId)}`}
                  className="btn-primary !py-2 text-sm"
                >
                  {t.homework.openPlayground}
                </Link>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
