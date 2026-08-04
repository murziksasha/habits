import Link from "next/link";
import { COURSE_META, landingPersonas, UI } from "@eduforge/shared";
import { LandingLocaleBits } from "@/components/landing-locale";
import { GuestTrial } from "@/components/guest-trial";

/**
 * Marketing landing — Server Component (RSC).
 * Persona CTAs + guest trial + core loop (no scaffold overclaim).
 */
export default function LandingPage() {
  const courses = Object.values(COURSE_META).filter((c) =>
    ["english", "chess", "programming", "typing", "logic"].includes(c.slug),
  );
  const personas = landingPersonas();

  return (
    <div className="space-y-16">
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <p className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-sm font-bold text-brand-dark">
            Learning OS · skills + code
          </p>
          <h1 className="text-4xl font-black leading-tight md:text-5xl">
            {UI.appName}: {UI.tagline}
          </h1>
          <p className="text-lg text-ink-muted">
            Англійська, шахи, навички та Programming path — уроки, XP, playground і freemium.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/register" className="btn-primary min-h-11">
              {UI.landing.ctaStart}
            </Link>
            <Link href="/login" className="btn-secondary min-h-11">
              {UI.nav.login}
            </Link>
            <Link href="/pricing" className="btn-secondary min-h-11 hidden sm:inline-flex">
              {UI.nav.pricing}
            </Link>
          </div>
          <LandingLocaleBits />
        </div>
        <div className="card space-y-3 bg-gradient-to-br from-brand-soft/40 to-sky/10">
          <p className="text-xs font-black uppercase text-ink-muted">Core loop</p>
          <ul className="space-y-2 text-sm font-bold">
            <li>🗺️ Learning map + recommended next step</li>
            <li>💻 Programming path + playground sandbox</li>
            <li>♟️ Chess lessons &amp; online play</li>
            <li>🔥 Streak, XP, hearts, freemium path</li>
            <li>🏫 Schools · homework · parents (supporting)</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-black">Оберіть шлях · Pick a path</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {personas.map((p) => (
            <Link
              key={p.intent}
              href={p.href}
              className="card flex min-h-11 flex-col gap-2 hover:border-brand/40"
            >
              <span className="text-3xl" aria-hidden>
                {p.icon}
              </span>
              <p className="text-lg font-black">{p.titleUk}</p>
              <p className="text-sm font-bold text-ink-muted">{p.bodyUk}</p>
              <span className="mt-auto text-sm font-black text-brand-dark">
                {UI.nav.register} →
              </span>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 text-sm font-bold">
          <Link href="/register?intent=parent" className="btn-secondary !py-2 !px-3">
            👪 Батьки
          </Link>
          <Link href="/register?intent=teacher" className="btn-secondary !py-2 !px-3">
            👩‍🏫 Учителі
          </Link>
        </div>
      </section>

      <GuestTrial />

      <section>
        <h2 className="mb-4 text-2xl font-black">Курси</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <Link
              key={c.slug}
              href={`/courses/${c.slug}`}
              className="card flex min-h-11 items-center gap-3 hover:border-brand/40"
            >
              <span className="text-2xl" aria-hidden>
                {c.icon}
              </span>
              <div>
                <p className="font-black">{c.titleUk}</p>
                <p className="text-xs font-bold text-ink-muted">{c.titleEn}</p>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm font-bold text-ink-muted">
          <Link href="/courses" className="text-sky hover:underline">
            Повний каталог →
          </Link>
        </p>
      </section>
    </div>
  );
}
