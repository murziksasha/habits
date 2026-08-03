"use client";

import Link from "next/link";
import { COURSE_META } from "@eduforge/shared";
import { useLocale } from "@/lib/locale-context";
import { useBranding } from "@/lib/branding-context";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function LandingPage() {
  const { t, locale } = useLocale();
  const { theme: brandTheme } = useBranding();
  const productName = brandTheme.branding.productName || t.appName;
  const tagline =
    (locale === "en"
      ? brandTheme.branding.taglineEn
      : brandTheme.branding.taglineUk) || t.tagline;
  const logoUrl = brandTheme.branding.logoUrl;
  const courses = Object.values(COURSE_META);

  const features = [
    { t: t.landing.f1t, d: t.landing.f1d, icon: "⚡" },
    { t: t.landing.f2t, d: t.landing.f2d, icon: "♟️" },
    { t: t.landing.f3t, d: t.landing.f3d, icon: "🏫" },
    { t: t.landing.f4t, d: t.landing.f4d, icon: "🤖" },
    { t: t.landing.f5t, d: t.landing.f5d, icon: "🔔" },
    { t: t.landing.f6t, d: t.landing.f6d, icon: "🔊" },
  ];

  return (
    <div className="space-y-16">
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-6">
          {logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={productName} className="h-14 w-auto object-contain" />
          )}
          <p className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-sm font-bold text-brand-dark">
            {t.landing.badge}
          </p>
          <h1 className="text-4xl font-black leading-tight md:text-5xl">
            {productName}: {tagline}
          </h1>
          <p className="text-lg text-ink-muted">
            {locale === "en"
              ? "English, chess, skills, and a Mimo-style Programming path — plus deep tracks (TS, HTML, CSS, JS, React, SQL, Node, Express, QA), exams, playground, schools, AI tutor."
              : "Англійська, шахи, навички та path Програмування — плюс deep tracks (TS, HTML, CSS, JS, React, SQL, Node, Express, QA), контрольні, playground, школи, AI-репетитор."}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/register" className="btn-primary">
              {t.landing.ctaStart}
            </Link>
            <Link href="/learn" className="btn-secondary">
              🗺️ {t.nav.learn}
            </Link>
            <Link href="/pricing" className="btn-secondary">
              {t.landing.ctaPricing}
            </Link>
            <Link href="/login" className="btn-secondary">
              {t.landing.ctaLogin}
            </Link>
            <a
              href={`${API}/docs`}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              {t.landing.apiDocs}
            </a>
          </div>
        </div>
        <div className="card relative overflow-hidden">
          <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-brand/20" />
          <div className="absolute -bottom-8 -left-4 h-24 w-24 rounded-full bg-sky/20" />
          <div className="relative space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🧙‍♂️</span>
              <div>
                <p className="font-black">
                  {locale === "en" ? "Your character" : "Ваш персонаж"}
                </p>
                <p className="text-sm text-ink-muted">
                  {locale === "en" ? "Level · streak · ranking" : "Рівень · серія · рейтинг"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 max-h-72 overflow-y-auto">
              {courses.map((c) => (
                <div
                  key={c.slug}
                  className="rounded-2xl border-2 border-slate-100 p-3 dark:border-slate-700"
                  style={{ borderColor: `${c.color}33` }}
                >
                  <div className="text-2xl">{c.icon}</div>
                  <div className="mt-1 text-sm font-bold">
                    {locale === "en" ? c.titleEn : c.titleUk}
                  </div>
                  {c.group === "deep" && (
                    <span className="text-[10px] font-black text-grape">Deep</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-black">{t.landing.featuresTitle}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.t} className="card">
              <div className="text-2xl">{f.icon}</div>
              <h3 className="mt-2 text-lg font-black">{f.t}</h3>
              <p className="mt-2 text-ink-muted">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card flex flex-col items-start gap-4 bg-gradient-to-br from-brand-soft to-white dark:from-slate-900 dark:to-slate-950 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black">
            {locale === "en" ? "Ready to level up?" : "Готові прокачатись?"}
          </h2>
          <p className="text-ink-muted">
            {locale === "en"
              ? "Free tier included. Premium unlocks the full path."
              : "Безкоштовний старт. Premium відкриває весь шлях."}
          </p>
        </div>
        <Link href="/register" className="btn-primary shrink-0">
          {t.landing.ctaStart}
        </Link>
      </section>
    </div>
  );
}
