"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PROGRAMMING_STACK_META,
  PROGRAMMING_UNIT_ORDER,
  isProgrammingStack,
  pickLocale,
} from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { XpBar } from "@/components/xp-bar";
import clsx from "clsx";

type Lesson = {
  id: string;
  titleUk: string;
  titleEn?: string;
  locked: boolean;
  status: string;
  bestScore: number;
};

type Unit = {
  id: string;
  slug: string;
  titleUk: string;
  titleEn?: string;
  lessons: Lesson[];
};

export default function ProgrammingStackPage() {
  const { stack } = useParams<{ stack: string }>();
  const { user, token, loading } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const [unit, setUnit] = useState<Unit | null>(null);
  const [error, setError] = useState("");

  const valid = isProgrammingStack(stack);
  const meta = valid ? PROGRAMMING_STACK_META[stack] : null;

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token || !valid) return;
    void api<{ units: Unit[] }>("/courses/programming", { token })
      .then((d) => {
        const u = d.units.find((x) => x.slug === stack) ?? null;
        setUnit(u);
        if (!u) setError("not_found");
      })
      .catch(() => setError(t.common.error));
  }, [token, stack, valid, t.common.error]);

  if (!valid || !meta) {
    return (
      <div className="card space-y-3">
        <p className="font-bold">Unknown stack</p>
        <Link href="/programming" className="btn-primary inline-flex">
          {t.programming.hubTitle}
        </Link>
        <div className="flex flex-wrap gap-2">
          {PROGRAMMING_UNIT_ORDER.map((s) => (
            <Link key={s} href={`/programming/${s}`} className="btn-secondary !py-1.5 text-sm">
              {PROGRAMMING_STACK_META[s].icon} {PROGRAMMING_STACK_META[s].titleEn}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (loading || !user) return <p>{t.common.loading}</p>;
  if (error && !unit) return <p className="text-red-500 font-bold">{error}</p>;

  const done = unit?.lessons.filter((l) => l.status === "completed").length ?? 0;
  const total = unit?.lessons.length || 1;

  return (
    <div className="space-y-6">
      <Link href="/programming" className="text-sm font-bold text-ink-muted">
        ← {t.programming.hubTitle}
      </Link>

      <section className="card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-4xl">{meta.icon}</span>
          <h1 className="mt-2 text-3xl font-black">
            {pickLocale(locale, meta.titleUk, meta.titleEn)}
          </h1>
          <p className="text-ink-muted font-bold">
            {pickLocale(locale, meta.descriptionUk, meta.descriptionEn)}
          </p>
        </div>
        <div className="w-full max-w-xs space-y-2">
          <XpBar
            xp={Math.round((done / total) * 100)}
            color="#0EA5E9"
            label={`${done}/${total} ${t.programming.unitProgress}`}
          />
          <div className="flex flex-wrap gap-2">
            <Link href="/playground" className="btn-secondary !py-1.5 text-sm">
              🖥️ Playground
            </Link>
            <Link href="/tutor" className="btn-secondary !py-1.5 text-sm">
              🤖 Tutor
            </Link>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        {PROGRAMMING_UNIT_ORDER.map((s) => (
          <Link
            key={s}
            href={`/programming/${s}`}
            className={clsx(
              "rounded-xl border-2 px-3 py-1.5 text-xs font-bold",
              s === stack
                ? "border-sky bg-sky/15"
                : "border-slate-200 dark:border-slate-700",
            )}
          >
            {PROGRAMMING_STACK_META[s].icon} {PROGRAMMING_STACK_META[s].titleEn}
          </Link>
        ))}
      </div>

      <div className="space-y-3">
        {unit?.lessons.map((l, i) =>
          l.locked ? (
            <div
              key={l.id}
              className="card flex items-center justify-between opacity-60"
            >
              <div>
                <p className="text-xs font-bold text-ink-muted">#{i + 1}</p>
                <p className="font-black">
                  {pickLocale(locale, l.titleUk, l.titleEn)}
                </p>
                <p className="text-sm text-ink-muted">{t.common.locked}</p>
              </div>
              <span>🔒</span>
            </div>
          ) : (
            <Link
              key={l.id}
              href={`/courses/programming/lessons/${l.id}`}
              className={clsx(
                "card flex items-center justify-between transition hover:border-sky",
                l.status === "completed" && "border-brand/40 bg-brand-soft/30",
              )}
            >
              <div>
                <p className="text-xs font-bold text-ink-muted">#{i + 1}</p>
                <p className="font-black">
                  {pickLocale(locale, l.titleUk, l.titleEn)}
                </p>
                <p className="text-sm text-ink-muted">
                  {l.status === "completed"
                    ? `✓ ${Math.round(l.bestScore * 100)}%`
                    : "→"}
                </p>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-sky text-white font-black">
                {l.status === "completed" ? "★" : "▶"}
              </span>
            </Link>
          ),
        )}
        {!unit && <p className="text-ink-muted font-bold">{t.common.loading}</p>}
      </div>
    </div>
  );
}
