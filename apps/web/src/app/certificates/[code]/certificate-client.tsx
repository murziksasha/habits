"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { useBranding } from "@/lib/branding-context";
import { api } from "@/lib/api";
import { ShareLinkButtons } from "@/components/share-link";
import {
  CertificateArt,
  type CertificateArtData,
} from "@/components/certificate-art";
import {
  certificateFilename,
  downloadCertificatePdf,
  downloadCertificatePng,
} from "@/lib/certificate-export";
import { Badge, Button, Card, EmptyState, Skeleton } from "@/components/ui";

export function CertificateClient({ code: codeProp }: { code?: string }) {
  const params = useParams<{ code: string }>();
  const code = codeProp || params.code;
  const { t, locale } = useLocale();
  const { theme } = useBranding();
  const artRef = useRef<HTMLDivElement>(null);
  const [cert, setCert] = useState<CertificateArtData | null>(null);
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState<"png" | "pdf" | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;
    void api<{ certificate: CertificateArtData }>(`/certificates/verify/${code}`)
      .then((d) => setCert(d.certificate))
      .catch(() => setErr(true));
  }, [code]);

  const productName = theme.branding.productName?.trim() || "EduForge";

  const runExport = useCallback(
    async (kind: "png" | "pdf") => {
      if (!cert || !artRef.current) return;
      setExportError(null);
      setBusy(kind);
      try {
        // Export the inner framed card for a clean edge
        const node =
          (artRef.current.querySelector("[data-certificate-frame]") as HTMLElement) ||
          artRef.current.firstElementChild as HTMLElement ||
          artRef.current;
        const filename = certificateFilename({
          productName,
          courseSlug: cert.courseSlug,
          code: cert.code,
          ext: kind,
        });
        if (kind === "png") await downloadCertificatePng(node, filename);
        else await downloadCertificatePdf(node, filename);
      } catch {
        setExportError(t.certificates.downloadError);
      } finally {
        setBusy(null);
      }
    },
    [cert, productName, t.certificates.downloadError],
  );

  if (err) {
    return (
      <EmptyState
        title="404"
        description={
          locale === "en"
            ? "Certificate not found or code is invalid."
            : "╨б╨╡╤А╤В╨╕╤Д╤Ц╨║╨░╤В ╨╜╨╡ ╨╖╨╜╨░╨╣╨┤╨╡╨╜╨╛ ╨░╨▒╨╛ ╨║╨╛╨┤ ╨╜╨╡╨┤╤Ц╨╣╤Б╨╜╨╕╨╣."
        }
        actionHref="/certificates"
        actionLabel={locale === "en" ? "My certificates" : "╨Ь╨╛╤Ч ╤Б╨╡╤А╤В╨╕╤Д╤Ц╨║╨░╤В╨╕"}
      />
    );
  }
  if (!cert) {
    return (
      <div className="space-y-3" aria-busy="true">
        <Skeleton className="mx-auto h-64 max-w-3xl" />
        <p className="sr-only">{t.common.loading}</p>
      </div>
    );
  }

  const title = locale === "en" ? cert.titleEn || cert.titleUk : cert.titleUk;
  const sharePath = `/certificates/${cert.code}`;
  const shareText =
    locale === "en"
      ? `${cert.displayName} earned: ${title} on ${productName}`
      : `${cert.displayName} ╨╛╤В╤А╨╕╨╝╨░╨▓(╨╗╨░): ${title} ╨▓ ${productName}`;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-end gap-2 print:hidden">
        <ShareLinkButtons path={sharePath} title={`${title} ┬╖ ${productName}`} text={shareText} />
        <Button
          variant="secondary"
          size="sm"
          disabled={!!busy}
          onClick={() => void runExport("png")}
        >
          {busy === "png" ? t.certificates.generating : t.certificates.downloadPng}
        </Button>
        <Button
          variant="primary"
          size="sm"
          disabled={!!busy}
          onClick={() => void runExport("pdf")}
        >
          {busy === "pdf" ? t.certificates.generating : t.certificates.downloadPdf}
        </Button>
        <Button variant="secondary" size="sm" onClick={() => window.print()}>
          {t.certificates.print}
        </Button>
      </div>

      {exportError && (
        <p className="text-center text-sm font-bold text-red-500 print:hidden">{exportError}</p>
      )}

      <Card className="mx-auto max-w-lg space-y-3 border-brand/30 print:hidden">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="grape">ЁЯУЬ Certificate</Badge>
          <Badge tone="muted">{cert.code}</Badge>
        </div>
        <p className="text-sm font-bold text-ink-muted">{t.certificates.shareCta}</p>
        <ShareLinkButtons path={sharePath} title={`${title} ┬╖ ${productName}`} text={shareText} />
      </Card>

      <div className="certificate-print-root mx-auto max-w-4xl">
        <CertificateArt ref={artRef} cert={cert} />
      </div>

      <p className="text-center text-sm print:hidden">
        <Link href="/" className="font-bold text-sky hover:underline">
          {productName}
        </Link>
      </p>
    </div>
  );
}
