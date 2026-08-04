"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PROGRAMMING_UNIT_ORDER } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { ContinueCta } from "@/components/continue-cta";
import { PageLoading } from "@/components/page-loading";
import { useRequireAuth } from "@/lib/use-require-auth";

const UNIT_LABELS: Record<string, { uk: string; en: string; icon: string }> = {
  html: { uk: "HTML", en: "HTML", icon: "🌐" },
  css: { uk: "CSS", en: "CSS", icon: "🎨" },
  js: { uk: "JavaScript", en: "JavaScript", icon: "⚡" },
  typescript: { uk: "TypeScript", en: "TypeScript", icon: "📘" },
  react: { uk: "React", en: "React", icon: "⚛️" },
  git: { uk: "Git", en: "Git", icon: "🔀" },
  node: { uk: "Node.js", en: "Node.js", icon: "🟢" },
  express: { uk: "Express", en: "Express", icon: "🚂" },
  sql: { uk: "SQL", en: "SQL", icon: "🗄️" },
  qa: { uk: "QA", en: "QA", icon: "🧪" },
};

type Progress = {
  completedLessons?: number;
  level?: number;
  xp?: number;
};

export default function SkillTreePage() {
  const { user, token, loading } = useAuth();
  const { ready } = useRequireAuth();
  const { locale, t } = useLocale();
  const [prog, setProg] = useState<Progress | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    setDataLoading(true);
    void api<{ progress?: { slug: string; completedLessons: number; level: number; xp: number }[] }>(
      "/me/home",
      { token },
    )
      .then((d) => {
        const row = d.progress?.find((p) => p.slug === "programming");
        setProg(row ?? { completedLessons: 0, level: 1, xp: 0 });
      })
      .catch(() => setProg({ completedLessons: 0 }))
      .finally(() => setDataLoading(false));
  }, [token]);

  if (loading || !ready || dataLoading) return <PageLoading label={t.common.loading} />;
  if (!user) return <PageLoading label={t.common.loading} />;

  const done = prog?.completedLessons ?? 0;
  // Rough unlock: 2 lessons per unit step
  const unlockAt = (i: number) => i * 2;

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div>
        <h1 className="text-3xl font-black">
          🌳 {locale === "en" ? "Programming skill tree" : "Дерево навичок · Код"}
        </h1>
        <p className="text-ink-muted font-bold">
          {locale === "en"
            ? "Path units unlock as you complete lessons."
            : "Юніти path відкриваються з проходженням уроків."}
        </p>
      </div>

      <ContinueCta variant="inline" />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PROGRAMMING_UNIT_ORDER.map((slug, i) => {
          const meta = UNIT_LABELS[slug] ?? {
            uk: slug,
            en: slug,
            icon: "📦",
          };
          const unlocked = done >= unlockAt(i);
          const active = unlocked && done < unlockAt(i + 1);
          return (
            <Link
              key={slug}
              href={unlocked ? `/programming/${slug}` : "/programming"}
              className={`card transition ${
                unlocked
                  ? active
                    ? "border-brand/50 bg-brand-soft/20"
                    : "hover:border-sky/40"
                  : "opacity-60"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden>
                  {meta.icon}
                </span>
                <div>
                  <p className="font-black">
                    {locale === "en" ? meta.en : meta.uk}
                  </p>
                  <p className="text-xs font-bold text-ink-muted">
                    {unlocked
                      ? active
                        ? locale === "en"
                          ? "In progress"
                          : "У процесі"
                        : locale === "en"
                          ? "Unlocked"
                          : "Відкрито"
                      : locale === "en"
                        ? `Unlock ~${unlockAt(i)} lessons`
                        : `Від ~${unlockAt(i)} уроків`}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <p className="text-sm font-bold">
        <Link href="/programming" className="text-sky hover:underline">
          {locale === "en" ? "Programming hub" : "Хаб програмування"} →
        </Link>
      </p>
    </div>
  );
}
