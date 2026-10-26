"use client";

import { forwardRef, useEffect, useState } from "react";
import QRCode from "qrcode";
import { useBranding } from "@/lib/branding-context";
import { useLocale } from "@/lib/locale-context";

export type CertificateArtData = {
  code: string;
  titleUk: string;
  titleEn: string;
  issuedAt: string;
  displayName: string;
  courseTitleUk?: string;
  courseTitleEn?: string;
  courseIcon?: string;
  courseSlug?: string;
  lessonsCompleted?: number;
  lessonsTotal?: number;
  verifyPath?: string;
};

type Props = {
  cert: CertificateArtData;
  className?: string;
};

function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 28V8a4 4 0 0 1 4-4h20"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M10 22V14a2 2 0 0 1 2-2h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export const CertificateArt = forwardRef<HTMLDivElement, Props>(
  function CertificateArt({ cert, className }, ref) {
    const { theme } = useBranding();
    const { t, locale } = useLocale();
    const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
    const [logoFailed, setLogoFailed] = useState(false);

    const productName = theme.branding.productName?.trim() || "EduForge";
    const logoUrl = theme.branding.logoUrl?.trim() || "";
    const brand = theme.tokens.light.brand;
    const brandDark = theme.tokens.light.brandDark;
    const sky = theme.tokens.light.sky;
    const grape = theme.tokens.light.grape;

    const title = locale === "en" ? cert.titleEn || cert.titleUk : cert.titleUk;
    const courseTitle =
      locale === "en"
        ? cert.courseTitleEn || cert.courseTitleUk || ""
        : cert.courseTitleUk || cert.courseTitleEn || "";

    const origin =
      typeof window !== "undefined" ? window.location.origin : "https://eduforge.app";
    const verifyUrl = `${origin}${cert.verifyPath || `/certificates/${cert.code}`}`;

    useEffect(() => {
      let cancelled = false;
      void QRCode.toDataURL(verifyUrl, {
        width: 140,
        margin: 1,
        color: { dark: "#1e293b", light: "#ffffff" },
        errorCorrectionLevel: "M",
      }).then((url) => {
        if (!cancelled) setQrDataUrl(url);
      });
      return () => {
        cancelled = true;
      };
    }, [verifyUrl]);

    const issued = new Date(cert.issuedAt).toLocaleDateString(
      locale === "en" ? "en-GB" : "uk-UA",
      { year: "numeric", month: "long", day: "numeric" },
    );

    const lessonsLabel =
      cert.lessonsTotal != null && cert.lessonsTotal > 0
        ? `${t.certificates.lessonsCount}: ${cert.lessonsCompleted ?? cert.lessonsTotal}/${cert.lessonsTotal}`
        : null;

    return (
      <div
        ref={ref}
        className={className}
        data-certificate-art
        style={{
          // Always light for print/export readability
          color: "#1e293b",
          fontFamily:
            theme.tokens.light.fontFamily ||
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <div
          data-certificate-frame
          className="relative mx-auto w-full max-w-[960px] overflow-hidden bg-white"
          style={{
            aspectRatio: "1.414 / 1",
            boxShadow: "0 12px 40px rgba(15, 23, 42, 0.12)",
          }}
        >
          {/* Outer brand frame */}
          <div
            className="absolute inset-0"
            style={{
              border: `6px solid ${brand}`,
            }}
          />
          <div
            className="absolute inset-[10px]"
            style={{
              border: `2px solid ${sky}`,
              borderRadius: 2,
            }}
          />
          {/* Soft gradient wash */}
          <div
            className="pointer-events-none absolute inset-[14px]"
            style={{
              background: `linear-gradient(145deg, ${brand}14 0%, #ffffff 38%, ${sky}10 72%, ${grape}12 100%)`,
            }}
          />

          {/* Corner ornaments */}
          <div className="absolute left-5 top-5" style={{ color: brandDark }}>
            <CornerOrnament />
          </div>
          <div className="absolute right-5 top-5 rotate-90" style={{ color: brandDark }}>
            <CornerOrnament />
          </div>
          <div className="absolute bottom-5 left-5 -rotate-90" style={{ color: brandDark }}>
            <CornerOrnament />
          </div>
          <div className="absolute bottom-5 right-5 rotate-180" style={{ color: brandDark }}>
            <CornerOrnament />
          </div>

          {/* Content */}
          <div className="relative flex h-full flex-col items-center justify-between px-10 py-8 text-center sm:px-14 sm:py-10">
            {/* Header brand */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                {logoUrl && !logoFailed ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoUrl}
                    alt=""
                    className="h-11 w-auto max-w-[160px] object-contain"
                    crossOrigin="anonymous"
                    onError={() => setLogoFailed(true)}
                  />
                ) : (
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-xl font-black text-white shadow-sm"
                    style={{ backgroundColor: brand }}
                    aria-hidden
                  >
                    {productName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="text-left">
                  <p
                    className="text-lg font-black tracking-tight sm:text-xl"
                    style={{ color: brandDark }}
                  >
                    {productName}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    {locale === "en"
                      ? theme.branding.taglineEn || "Learning that levels you up"
                      : theme.branding.taglineUk || "Навчання, що прокачує"}
                  </p>
                </div>
              </div>
              <div
                className="mt-1 h-1 w-24 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${brand}, ${sky}, ${grape})`,
                }}
              />
              <p className="mt-2 text-xs font-black uppercase tracking-[0.28em] text-slate-500 sm:text-sm">
                {t.certificates.ofCompletion}
              </p>
            </div>

            {/* Body */}
            <div className="flex max-w-2xl flex-col items-center gap-2 sm:gap-3">
              <p className="text-sm font-bold text-slate-500 sm:text-base">
                {t.certificates.awardedTo}
              </p>
              <p
                className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl"
                style={{ color: brandDark }}
              >
                {cert.displayName}
              </p>
              <p className="mt-1 max-w-xl text-sm font-semibold text-slate-600 sm:text-base">
                {t.certificates.completionOf}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-3xl sm:text-4xl" aria-hidden>
                  {cert.courseIcon ?? "🎓"}
                </span>
                <div className="text-left">
                  {courseTitle ? (
                    <p className="text-lg font-black text-slate-800 sm:text-2xl">
                      {courseTitle}
                    </p>
                  ) : null}
                  <p className="text-sm font-bold text-slate-600 sm:text-base">{title}</p>
                </div>
              </div>
            </div>

            {/* Footer meta */}
            <div className="grid w-full max-w-3xl grid-cols-[1fr_auto_1fr] items-end gap-3 sm:gap-6">
              <div className="text-left text-xs sm:text-sm">
                <p className="font-bold uppercase tracking-wider text-slate-400">
                  {t.certificates.issued}
                </p>
                <p className="mt-0.5 font-black text-slate-700">{issued}</p>
                {lessonsLabel ? (
                  <p className="mt-1 font-semibold text-slate-500">{lessonsLabel}</p>
                ) : null}
              </div>

              <div className="flex flex-col items-center gap-1">
                {qrDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={qrDataUrl}
                    alt=""
                    width={88}
                    height={88}
                    className="rounded-md border border-slate-200 bg-white p-1"
                  />
                ) : (
                  <div className="h-[88px] w-[88px] rounded-md border border-dashed border-slate-200" />
                )}
                <p className="max-w-[140px] text-center text-[9px] font-bold uppercase tracking-wide text-slate-400">
                  {t.certificates.verifyHint}
                </p>
              </div>

              <div className="text-right text-xs sm:text-sm">
                <p className="font-bold uppercase tracking-wider text-slate-400">
                  {t.certificates.verify}
                </p>
                <p className="mt-0.5 font-mono text-[11px] font-black tracking-wide text-slate-700 sm:text-sm">
                  {cert.code}
                </p>
                <p className="mt-1 break-all text-[10px] font-semibold text-slate-400">
                  {verifyUrl.replace(/^https?:\/\//, "")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
