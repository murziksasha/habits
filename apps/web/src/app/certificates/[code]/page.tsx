"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { ShareLinkButtons } from "@/components/share-link";
import { Badge, Button, Card, EmptyState, Skeleton } from "@/components/ui";

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
    courseSlug?: string;
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

  if (err) {
    return (
      <EmptyState
        title="404"
        description={
          locale === "en"
            ? "Certificate not found or code is invalid."
            : "Сертифікат не знайдено або код недійсний."
        }
        actionHref="/certificates"
        actionLabel={locale === "en" ? "My certificates" : "Мої сертифікати"}
      />
    );
  }
  if (!cert) {
    return (
      <div className="space-y-3" aria-busy="true">
        <Skeleton className="mx-auto h-64 max-w-2xl" />
        <p className="sr-only">{t.common.loading}</p>
      </div>
    );
  }

  const title = locale === "en" ? cert.titleEn || cert.titleUk : cert.titleUk;
  const sharePath = `/certificates/${cert.code}`;
  const shareText =
    locale === "en"
      ? `${cert.displayName} earned: ${title} on EduForge`
      : `${cert.displayName} отримав(ла): ${title} в EduForge`;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-end gap-3 print:hidden">
        <ShareLinkButtons path={sharePath} title={`${title} · EduForge`} text={shareText} />
        <Button variant="secondary" size="sm" onClick={() => window.print()}>
          {t.certificates.print}
        </Button>
      </div>

      <Card className="mx-auto max-w-lg space-y-3 border-brand/30 print:hidden">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="grape">📜 Certificate</Badge>
          <Badge tone="muted">{cert.code}</Badge>
        </div>
        <p className="text-sm font-bold text-ink-muted">
          {locale === "en"
            ? "Share this verified credential on LinkedIn or social media."
            : "Поділіться підтвердженим сертифікатом у LinkedIn чи соцмережах."}
        </p>
        <ShareLinkButtons path={sharePath} title={`${title} · EduForge`} text={shareText} />
      </Card>

      <div className="mx-auto max-w-2xl rounded-3xl border-4 border-brand bg-white p-10 text-center shadow-card print:shadow-none dark:bg-slate-950">
        <p className="text-sm font-bold uppercase tracking-widest text-ink-muted">EduForge</p>
        <p className="mt-4 text-5xl">{cert.courseIcon ?? "🎓"}</p>
        <h1 className="mt-4 text-3xl font-black">{title}</h1>
        <p className="mt-6 text-lg text-ink-muted">
          {locale === "en" ? "Awarded to" : "Нагороджується"}
        </p>
        <p className="mt-2 text-4xl font-black text-brand-dark">{cert.displayName}</p>
        {cert.courseTitleUk && <p className="mt-4 font-bold">{cert.courseTitleUk}</p>}
        <p className="mt-8 text-sm text-ink-muted">
          {t.certificates.issued}:{" "}
          {new Date(cert.issuedAt).toLocaleDateString(locale === "en" ? "en-GB" : "uk-UA")}
        </p>
        <p className="mt-2 font-mono text-xs text-ink-muted">
          {t.certificates.verify}: {cert.code}
        </p>
      </div>

      <p className="text-center text-sm print:hidden">
        <Link href="/" className="font-bold text-sky hover:underline">
          EduForge
        </Link>
      </p>
    </div>
  );
}
