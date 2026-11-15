"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { EmptyState } from "@/components/ui";
import { ShareLinkButtons } from "@/components/share-link";
import { PageLoading } from "@/components/page-loading";
import { useRequireAuth } from "@/lib/use-require-auth";

type Mini = {
  slug: string;
  titleUk?: string;
  titleEn?: string;
  completed?: boolean;
  lessonId?: string | null;
};

export function PortfolioClient() {
  const { user, token, loading, character } = useAuth();
  const { ready } = useRequireAuth();
  const { locale, t } = useLocale();
  const [minis, setMinis] = useState<Mini[]>([]);
  const [certs, setCerts] = useState<{ code: string; titleUk?: string }[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!token || !user) return;
    setDataLoading(true);
    Promise.all([
      api<{
        minisRace?: { raceMeta?: Mini[] };
      }>("/me/home", { token })
        .then((d) => {
          const done = (d.minisRace?.raceMeta ?? []).filter((m) => m.completed);
          setMinis(done);
        })
        .catch(() => setMinis([])),
      api<{ certificates?: { code: string; titleUk?: string }[] }>("/certificates/mine", {
        token,
      })
        .then((d) => setCerts(d.certificates ?? []))
        .catch(() => setCerts([])),
    ]).finally(() => setDataLoading(false));
  }, [token, user]);

  if (loading || !ready || dataLoading) return <PageLoading label={t.common.loading} />;
  if (!user) return <PageLoading label={t.common.loading} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">
          📁 {locale === "en" ? "Portfolio" : "Портфоліо"}
        </h1>
        <p className="font-bold text-ink-muted">
          {character?.displayName} · L{character?.globalLevel ?? 1}
        </p>
      </div>

      <section className="card space-y-2">
        <p className="text-xs font-black uppercase text-ink-muted">
          {locale === "en" ? "Public profile" : "Публічний профіль"}
        </p>
        <ShareLinkButtons path={`/u/${user.id}`} title={character?.displayName ?? "EduForge"} />
        <Link href={`/u/${user.id}`} className="text-sm font-bold text-sky hover:underline">
          {locale === "en" ? "Open card" : "Відкрити картку"} →
        </Link>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-black">
          {locale === "en" ? "Completed minis" : "Завершені міні-проєкти"}
        </h2>
        {minis.length === 0 ? (
          <EmptyState
            title={locale === "en" ? "No minis yet" : "Ще немає міні"}
            description={
              locale === "en"
                ? "Finish programming mini-projects to showcase them."
                : "Пройдіть міні-проєкти з Programming path."
            }
            actionHref="/programming"
            actionLabel={locale === "en" ? "Open path" : "До path"}
          />
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2">
            {minis.map((m) => (
              <li key={m.slug} className="card font-bold">
                ✅ {locale === "en" ? m.titleEn || m.slug : m.titleUk || m.slug}
                {m.lessonId && (
                  <Link
                    href={`/courses/programming/lessons/${m.lessonId}`}
                    className="ml-2 text-xs text-sky hover:underline"
                  >
                    →
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-black">
          {locale === "en" ? "Certificates" : "Сертифікати"}
        </h2>
        {certs.length === 0 ? (
          <p className="card text-ink-muted font-bold">
            {locale === "en" ? "Earn certificates via course exams." : "Отримайте сертифікати через іспити."}
          </p>
        ) : (
          <ul className="space-y-2">
            {certs.map((c) => (
              <li key={c.code}>
                <Link
                  href={`/certificates/${c.code}`}
                  className="card block font-bold hover:border-brand/40"
                >
                  📜 {c.titleUk || c.code}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="text-sm font-bold">
        <Link href="/embed/playground" className="text-sky hover:underline">
          {locale === "en" ? "Embed playground" : "Embed playground"} →
        </Link>
      </p>
    </div>
  );
}
