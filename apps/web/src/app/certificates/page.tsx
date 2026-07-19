"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

type Cert = {
  code: string;
  titleUk: string;
  titleEn: string;
  issuedAt: string;
  courseSlug: string;
  courseTitleUk: string;
};

export default function CertificatesPage() {
  const { user, token, loading } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const [certs, setCerts] = useState<Cert[]>([]);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token) return;
    void api<{ certificates: Cert[] }>("/certificates/mine", { token })
      .then((d) => setCerts(d.certificates))
      .catch(() => setCerts([]));
  }, [token]);

  if (loading || !user) return <p>{t.common.loading}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">📜 {t.certificates.title}</h1>
      <div className="grid gap-3 sm:grid-cols-2">
        {certs.map((c) => {
          const title = locale === "en" ? c.titleEn : c.titleUk;
          const isPath = /Programming Path/i.test(c.titleUk + c.titleEn);
          const isMinis = /Programming Minis/i.test(c.titleUk + c.titleEn);
          return (
            <Link
              key={c.code}
              href={`/certificates/${c.code}`}
              className="card hover:border-brand/40 space-y-1"
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
                {!isPath && !isMinis && c.courseSlug === "programming" && (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-black dark:bg-slate-800">
                    {t.certificates.badgeCourse}
                  </span>
                )}
              </div>
              <p className="font-black text-lg">{title}</p>
              <p className="text-sm text-ink-muted font-mono">{c.code}</p>
              <p className="text-xs text-ink-muted mt-1">
                {t.certificates.issued}: {new Date(c.issuedAt).toLocaleDateString()}
              </p>
            </Link>
          );
        })}
      </div>
      {!certs.length && <p className="text-ink-muted">{t.certificates.empty}</p>}
    </div>
  );
}
