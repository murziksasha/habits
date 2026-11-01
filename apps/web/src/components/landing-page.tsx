"use client";

import Link from "next/link";
import { COURSE_META, landingPersonas, pickLocale } from "@eduforge/shared";
import { useLocale } from "@/lib/locale-context";
import { GuestTrial } from "@/components/guest-trial";

const SPOTLIGHT = ["english", "logic", "speed_reading", "chess", "sql_fundamentals"] as const;

/** Learner-facing home. Rewards and school tools stay in the feature list, not the headline. */
export function LandingPageBody() {
  const { t, locale } = useLocale();
  const personas = landingPersonas();
  const outcomes = [
    t.landing.outcomeEnglish,
    t.landing.outcomeThinking,
    t.landing.outcomeReading,
    t.landing.outcomeChess,
    t.landing.outcomeTech,
  ];
  const features = [
    [t.landing.f1t, t.landing.f1d],
    [t.landing.f2t, t.landing.f2d],
    [t.landing.f3t, t.landing.f3d],
    [t.landing.f4t, t.landing.f4d],
    [t.landing.f5t, t.landing.f5d],
    [t.landing.f6t, t.landing.f6d],
  ];
  const courses = SPOTLIGHT.map((slug) => COURSE_META[slug]);

  return (
    <div className="space-y-16">
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <p className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-sm font-bold text-brand-dark">
            {t.landing.badge}
          </p>
          <h1 className="text-4xl font-black leading-tight md:text-5xl">{t.landing.heroTitle}</h1>
          <p className="text-lg text-ink-muted">{t.landing.heroBody}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/register" className="btn-primary min-h-11">
              {t.landing.ctaStart}
            </Link>
            <Link href="/login" className="btn-secondary min-h-11">
              {t.landing.ctaLogin}
            </Link>
          </div>
        </div>
        <div className="card space-y-3">
          <h2 className="text-lg font-black">{t.landing.outcomesTitle}</h2>
          <ul className="space-y-2 text-sm font-bold">
            {outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-black">{t.landing.outcomesTitle}</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {personas.map((p) => (
            <Link key={p.intent} href={p.href} className="card flex min-h-11 flex-col gap-2 hover:border-brand/40">
              <span className="text-3xl" aria-hidden>
                {p.icon}
              </span>
              <p className="text-lg font-black">{pickLocale(locale, p.titleUk, p.titleEn)}</p>
              <p className="text-sm font-bold text-ink-muted">{pickLocale(locale, p.bodyUk, p.bodyEn)}</p>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 text-sm font-bold">
          <Link href="/register?intent=parent" className="btn-secondary !py-2 !px-3">
            {locale === "en" ? "Parents" : "Батьки"}
          </Link>
          <Link href="/register?intent=teacher" className="btn-secondary !py-2 !px-3">
            {locale === "en" ? "Teachers" : "Учителі"}
          </Link>
        </div>
      </section>

      <GuestTrial />

      <section>
        <h2 className="mb-4 text-2xl font-black">{t.nav.courses}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <Link key={c.slug} href={`/courses/${c.slug}`} className="card flex min-h-11 items-center gap-3 hover:border-brand/40">
              <span className="text-2xl" aria-hidden>
                {c.icon}
              </span>
              <span className="font-black">{pickLocale(locale, c.titleUk, c.titleEn)}</span>
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm font-bold">
          <Link href="/courses" className="text-brand-dark hover:underline">
            {t.catalog.all} →
          </Link>
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-black">{t.landing.featuresTitle}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(([title, body]) => (
            <div key={title} className="card space-y-1">
              <p className="font-black">{title}</p>
              <p className="text-sm text-ink-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
