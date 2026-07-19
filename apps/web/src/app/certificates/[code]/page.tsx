"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

export default function CertificateViewPage() {
  const { code } = useParams<{ code: string }>();
  const { t, locale } = useLocale();
  const [cert, setCert] = useState<{
    code: string;
    titleUk: string;
    titleEn: string;
    issuedAt: string;
    displayName: string;
    courseTitleUk?: string;
    courseIcon?: string;
  } | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (!code) return;
    void api<{ certificate: NonNullable<typeof cert> }>(
      `/certificates/verify/${code}`,
    )
      .then((d) => setCert(d.certificate))
      .catch(() => setErr(true));
  }, [code]);

  if (err) return <p className="text-red-500 font-bold">404</p>;
  if (!cert) return <p>{t.common.loading}</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end print:hidden">
        <button type="button" className="btn-primary" onClick={() => window.print()}>
          {t.certificates.print}
        </button>
      </div>
      <div className="mx-auto max-w-2xl rounded-3xl border-4 border-brand bg-white p-10 text-center shadow-card print:shadow-none">
        <p className="text-sm font-bold uppercase tracking-widest text-ink-muted">
          EduForge
        </p>
        <p className="mt-4 text-5xl">{cert.courseIcon ?? "🎓"}</p>
        <h1 className="mt-4 text-3xl font-black">
          {locale === "en" ? cert.titleEn : cert.titleUk}
        </h1>
        <p className="mt-6 text-lg text-ink-muted">
          {locale === "en" ? "Awarded to" : "Нагороджується"}
        </p>
        <p className="mt-2 text-4xl font-black text-brand-dark">{cert.displayName}</p>
        {cert.courseTitleUk && (
          <p className="mt-4 font-bold">{cert.courseTitleUk}</p>
        )}
        <p className="mt-8 text-sm text-ink-muted">
          {t.certificates.issued}:{" "}
          {new Date(cert.issuedAt).toLocaleDateString(locale === "en" ? "en-GB" : "uk-UA")}
        </p>
        <p className="mt-2 font-mono text-xs text-ink-muted">
          {t.certificates.verify}: {cert.code}
        </p>
      </div>
    </div>
  );
}
