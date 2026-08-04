"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { pickContextualToolkit, type ToolkitItem } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

const LABELS: Record<
  ToolkitItem["id"],
  { uk: string; en: string }
> = {
  review: { uk: "Повторення", en: "Review" },
  playground: { uk: "Playground", en: "Playground" },
  flashcards: { uk: "Картки", en: "Flashcards" },
  tutor: { uk: "Тьютор", en: "Tutor" },
  exam: { uk: "Іспити", en: "Exams" },
  quests: { uk: "Квести", en: "Quests" },
  tree: { uk: "Дерево навичок", en: "Skill tree" },
  portfolio: { uk: "Портфоліо", en: "Portfolio" },
};

/** Max 3 contextual tools for Learn (progressive disclosure). */
export function ContextualToolkit() {
  const { token } = useAuth();
  const { locale, t } = useLocale();
  const [items, setItems] = useState<ToolkitItem[]>([]);

  useEffect(() => {
    if (!token) return;
    void (async () => {
      let weak = 0;
      let examReady = 0;
      let codeDone = 0;
      try {
        const rev = await api<{ weak?: { length?: number }; items?: unknown[] }>(
          "/learning/review",
          { token },
        ).catch(() => null);
        weak = Array.isArray(rev?.items)
          ? rev!.items!.length
          : Array.isArray((rev as { weak?: unknown[] })?.weak)
            ? (rev as { weak: unknown[] }).weak.length
            : 0;
      } catch {
        /* ignore */
      }
      try {
        const ex = await api<{
          summary?: { ready?: number };
        }>("/learning/exams/me", { token });
        examReady = ex.summary?.ready ?? 0;
      } catch {
        /* ignore */
      }
      try {
        const home = await api<{
          progress?: { slug: string; completedLessons: number }[];
        }>("/me/home", { token });
        const prog = home.progress?.find((p) => p.slug === "programming");
        codeDone = prog?.completedLessons ?? 0;
      } catch {
        /* ignore */
      }
      setItems(
        pickContextualToolkit({
          weakLessonCount: weak,
          examReadyCount: examReady,
          codeLessonsCompleted: codeDone,
          hasProgrammingProgress: codeDone > 0,
        }),
      );
    })();
  }, [token]);

  if (!items.length) return null;

  return (
    <section className="card space-y-2" aria-label={t.onboarding.forYou}>
      <h2 className="font-black">{t.onboarding.forYou}</h2>
      <div className="flex flex-wrap gap-2">
        {items.map((x) => {
          const label = locale === "en" ? LABELS[x.id].en : LABELS[x.id].uk;
          return (
            <Link
              key={x.href}
              href={x.href}
              className="btn-secondary inline-flex min-h-11 items-center !py-2 !px-3 text-sm"
            >
              <span aria-hidden>{x.icon}</span> {label}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
