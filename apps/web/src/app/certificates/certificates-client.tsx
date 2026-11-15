"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { PageLoading } from "@/components/page-loading";
import { EmptyState } from "@/components/ui";
import { useRequireAuth } from "@/lib/use-require-auth";

type Cert = {
  code: string;
  titleUk: string;
  titleEn: string;
  issuedAt: string;
  courseSlug: string;
  courseTitleUk: string;
  courseTitleEn?: string;
  courseIcon?: string;
  lessonsCompleted?: number;
  lessonsTotal?: number;
};

export function CertificatesClient() {
  const { user, token, loading } = useAuth();
  const { ready } = useRequireAuth();
  const { t, locale } = useLocale();
  const [certs, setCerts] = useState<Cert[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    setDataLoading(true);
    void api<{ certificates: Cert[] }>("/certificates/mine", { token })
      .then((d) => setCerts(d.certificates))
      .catch(() => setCerts([]))
      .finally(() => setDataLoading(false));
  }, [token]);

  if (loading || !ready || dataLoading) {
    return <PageLoading label={t.common.loading} />;
  }
  if (!user) return <PageLoading label={t.common.loading} />;

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div>
        <h1 className="text-3xl font-black">📜 {t.certificates.title}</h1>
        <p className="mt-1 text-sm font-bold text-ink-muted">
          {locale === "en"
            ? "Download PDF or PNG from any certificate page."
            : "Скачайте PDF або PNG на сторінці будь-якого сертифіката."}
        </p>
      </div>
      {!certs.length && (
        <div className="space-y-3">
          <EmptyState
            title={locale === "en" ? "No certificates yet" : "Ще немає сертифікатів"}
            description={
              locale === "en"
                ? "Finish a course path or minis to earn one."
                : "Завершіть path або minis, щоб отримати сертифікат."
            }
            actionHref="/learn"
            actionLabel={t.nav.learn}
          />
          <div className="flex flex-wrap gap-2">
            <Link href="/programming" className="btn-secondary !py-2 text-sm">
              💻 {t.nav.programming}
            </Link>
            <Link href="/courses" className="btn-secondary !py-2 text-sm">
              📚 {t.nav.courses}
            </Link>
          </div>
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        {certs.map((c) => {
          const title = locale === "en" ? c.titleEn : c.titleUk;
          const courseTitle =
            locale === "en"
              ? c.courseTitleEn || c.courseTitleUk
              : c.courseTitleUk;
          const isPath = /Programming Path/i.test(c.titleUk + c.titleEn);
          const isMinis = /Programming Minis/i.test(c.titleUk + c.titleEn);
          return (
            <Link
              key={c.code}
              href={`/certificates/${c.code}`}
              className="card hover:border-brand/40 space-y-2 transition"
            >
              <div className="flex flex-wrap gap-1">
                {isPath && (
                  <span className="rounded-full bg-sky/15 px-2 py-0.5 text-[10px] font-black text-sky">
                    {t.certificates.badgePath}
                  </span>
                )}
                {isMinis && (
                  <span className="rounded-full bg-grape/15 px-2 py-0.5 text-[10px] font-black text-grape">
                    {t.certificates.badgeMinis}
                  </span>
                )}
                {!isPath && !isMinis && (
                  <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[10px] font-black text-brand-dark">
                    {t.certificates.badgeCourse}
                  </span>
                )}
              </div>
              <div className="flex items-start gap-3">
                <span className="text-3xl" aria-hidden>
                  {c.courseIcon ?? "🎓"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-black text-lg leading-snug">{title}</p>
                  {courseTitle ? (
                    <p className="text-sm font-bold text-ink-muted">{courseTitle}</p>
                  ) : null}
                  <p className="mt-1 font-mono text-xs text-ink-muted">{c.code}</p>
                  <p className="mt-1 text-xs text-ink-muted">
                    {t.certificates.issued}:{" "}
                    {new Date(c.issuedAt).toLocaleDateString(
                      locale === "en" ? "en-GB" : "uk-UA",
                    )}
                    {c.lessonsTotal
                      ? ` · ${t.certificates.lessonsCount} ${c.lessonsCompleted ?? c.lessonsTotal}/${c.lessonsTotal}`
                      : ""}
                  </p>
                  <p className="mt-2 text-xs font-black text-sky">
                    {t.certificates.openCert} →
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {!certs.length && <p className="text-ink-muted">{t.certificates.empty}</p>}
    </div>
  );
}
