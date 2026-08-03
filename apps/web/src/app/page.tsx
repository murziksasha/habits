import Link from "next/link";
import { COURSE_META, UI } from "@eduforge/shared";
import { LandingLocaleBits } from "@/components/landing-locale";

/**
 * Marketing landing — Server Component (RSC).
 * Locale-sensitive chrome lives in a thin client island.
 */
export default function LandingPage() {
  const courses = Object.values(COURSE_META);

  return (
    <div className="space-y-16">
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <p className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-sm font-bold text-brand-dark">
            Learning OS · code + skills
          </p>
          <h1 className="text-4xl font-black leading-tight md:text-5xl">
            {UI.appName}: {UI.tagline}
          </h1>
          <p className="text-lg text-ink-muted">
            English, chess, skills, and a Programming path — deep tracks, exams, playground,
            schools, AI tutor. Now with multi-lang judge, video lessons, live classroom, and
            adaptive next-steps.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/register" className="btn-primary">
              {UI.landing.ctaStart}
            </Link>
            <Link href="/login" className="btn-secondary">
              {UI.nav.login}
            </Link>
            <Link href="/pricing" className="btn-secondary">
              {UI.nav.pricing}
            </Link>
          </div>
          <LandingLocaleBits />
        </div>
        <div className="card space-y-3 bg-gradient-to-br from-brand-soft/40 to-sky/10">
          <p className="text-xs font-black uppercase text-ink-muted">Platform</p>
          <ul className="space-y-2 text-sm font-bold">
            <li>🧪 Multi-lang judge (JS/TS/Python/Bash · Docker optional)</li>
            <li>🎬 Video LMS exercise type</li>
            <li>📡 Live classroom collab</li>
            <li>📈 Adaptive next-step ranking</li>
            <li>🔭 OpenTelemetry-compatible spans</li>
            <li>📝 MDX content pipeline</li>
            <li>📱 Native WebView shell</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-black">Courses</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <Link
              key={c.slug}
              href={`/courses/${c.slug}`}
              className="card flex items-center gap-3 hover:border-brand/40"
            >
              <span className="text-2xl" aria-hidden>
                {c.icon}
              </span>
              <div>
                <p className="font-black">{c.titleEn || c.titleUk}</p>
                <p className="text-xs font-bold text-ink-muted">{c.group}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
