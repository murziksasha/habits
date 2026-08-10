"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { PageLoading } from "@/components/page-loading";
import { Badge, EmptyState } from "@/components/ui";
import { useRequireAuth } from "@/lib/use-require-auth";
import { useToast } from "@/components/ui";

/**
 * Labs surface: learning export JSON + milestones.
 */
export function ExportClient() {
  const { user, token, loading } = useAuth();
  const { ready } = useRequireAuth();
  const { t, locale } = useLocale();
  const { toast } = useToast();
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [milestones, setMilestones] = useState<
    { code: string; titleUk: string; titleEn: string; unlockedAt: string }[]
  >([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    setDataLoading(true);
    Promise.all([
      api<Record<string, unknown>>("/learning/export", { token })
        .then(setData)
        .catch(() => setData(null)),
      api<{ milestones: typeof milestones }>("/learning/milestones", { token })
        .then((d) => setMilestones(d.milestones))
        .catch(() => setMilestones([])),
    ]).finally(() => setDataLoading(false));
  }, [token]);

  function download() {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `eduforge-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast(locale === "en" ? "Export downloaded" : "Експорт завантажено", "success");
  }

  if (loading || !ready || dataLoading) return <PageLoading label={t.common.loading} />;
  if (!user) return <PageLoading label={t.common.loading} />;

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-20 md:pb-0">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-3xl font-black">📦 {t.learning.exportTitle}</h1>
        <Badge tone="muted">Labs</Badge>
      </div>
      <p className="text-sm font-bold text-ink-muted">
        {locale === "en"
          ? "Download your learning data as JSON (GDPR-style export)."
          : "Завантажте дані навчання у JSON (експорт у стилі GDPR)."}
      </p>

      <button
        type="button"
        className="btn-primary min-h-11"
        disabled={!data}
        onClick={download}
      >
        {t.learning.download}
      </button>

      <section className="space-y-2" aria-labelledby="milestones-heading">
        <h2 id="milestones-heading" className="text-xl font-black">
          {t.learning.milestones}
        </h2>
        {milestones.length === 0 ? (
          <EmptyState
            title={locale === "en" ? "No milestones yet" : "Ще немає milestones"}
            description={
              locale === "en"
                ? "Complete lessons and paths to unlock milestones."
                : "Пройдіть уроки й path, щоб відкрити milestones."
            }
            actionHref="/learn"
            actionLabel={t.nav.learn}
          />
        ) : (
          <ul className="space-y-2">
            {milestones.map((m) => (
              <li
                key={m.code}
                className="card flex justify-between text-sm font-bold"
              >
                <span>{locale === "en" ? m.titleEn || m.titleUk : m.titleUk}</span>
                <time
                  className="text-ink-muted"
                  dateTime={m.unlockedAt}
                >
                  {new Date(m.unlockedAt).toLocaleDateString()}
                </time>
              </li>
            ))}
          </ul>
        )}
      </section>

      {data && (
        <details className="card">
          <summary className="cursor-pointer font-black">
            {locale === "en" ? "Preview JSON" : "Перегляд JSON"}
          </summary>
          <pre className="mt-3 max-h-80 overflow-auto text-xs" tabIndex={0}>
            {JSON.stringify(data, null, 2).slice(0, 4000)}
            …
          </pre>
        </details>
      )}
    </div>
  );
}
