"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { XpBar } from "@/components/xp-bar";

type Profile = {
  userId: string;
  displayName: string;
  avatarKey: string;
  globalLevel: number;
  globalXp: number;
  streakDays: number;
  plan: string;
  isSelf: boolean;
  friendship: string;
  achievementsUnlocked: number;
  certificates: { code: string; titleUk: string; titleEn?: string; issuedAt: string }[];
  courseProgress: {
    slug: string;
    titleUk: string;
    icon: string;
    color: string;
    xp: number;
    level: number;
    completedLessons: number;
  }[];
  recentAchievements: {
    code: string;
    titleUk: string;
    icon: string;
  }[];
  programmingMinis?: {
    total: number;
    completed: number;
    allDone: boolean;
    slugsDone: string[];
  } | null;
};

const AVATAR_EMOJI: Record<string, string> = {
  default: "🧙",
  wizard: "🧙‍♂️",
  knight: "⚔️",
  scholar: "📚",
  fox: "🦊",
  robot: "🤖",
  dragon: "🐉",
  ninja: "🥷",
  owl: "🦉",
  panda: "🐼",
};

export default function PublicProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const { user, token, loading } = useAuth();
  const { t } = useLocale();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token || !userId) return;
    void api<{ profile: Profile }>(`/profiles/${userId}`, { token })
      .then((d) => setProfile(d.profile))
      .catch(() => setError(t.common.error));
  }, [token, userId, t.common.error]);

  async function addFriend() {
    if (!token || !profile) return;
    await api("/friends/request", {
      method: "POST",
      token,
      body: { userId: profile.userId },
    });
    setProfile({ ...profile, friendship: "pending_out" });
  }

  if (loading || !user) return <p>{t.common.loading}</p>;
  if (error) return <p className="text-red-500 font-bold">{error}</p>;
  if (!profile) return <p>{t.common.loading}</p>;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="card flex flex-col gap-4 sm:flex-row sm:items-center">
        <span className="text-6xl">
          {AVATAR_EMOJI[profile.avatarKey] ?? "🧙"}
        </span>
        <div className="flex-1">
          <p className="text-sm font-bold text-ink-muted">{t.publicProfile.title}</p>
          <h1 className="text-2xl font-black">{profile.displayName}</h1>
          <p className="text-sm text-ink-muted">
            {t.dashboard.level} {profile.globalLevel} · 🔥 {profile.streakDays} ·{" "}
            {profile.plan}
          </p>
          <div className="mt-2 max-w-sm">
            <XpBar xp={profile.globalXp} />
          </div>
        </div>
        {!profile.isSelf && profile.friendship === "none" && (
          <button type="button" className="btn-primary" onClick={() => void addFriend()}>
            {t.social.addFriend}
          </button>
        )}
        {profile.friendship === "friends" && (
          <span className="rounded-full bg-brand-soft px-3 py-1 text-sm font-bold">
            👥 {t.social.friends}
          </span>
        )}
        {profile.friendship === "pending_out" && (
          <span className="text-sm font-bold text-ink-muted">{t.social.pending}</span>
        )}
      </div>

      {profile.programmingMinis && profile.programmingMinis.total > 0 && (
        <section className="card space-y-2 border-sky/30">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-black">🧩 {t.publicProfile.minis}</h2>
            {profile.programmingMinis.allDone ? (
              <span className="rounded-full bg-brand/15 px-2 py-0.5 text-xs font-black text-brand-dark">
                {t.publicProfile.minisComplete}
              </span>
            ) : null}
          </div>
          <p className="text-sm font-bold text-ink-muted">
            {profile.programmingMinis.completed}/{profile.programmingMinis.total}{" "}
            {t.publicProfile.minisDone}
          </p>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-sky"
              style={{
                width: `${Math.round(
                  (profile.programmingMinis.completed /
                    Math.max(1, profile.programmingMinis.total)) *
                    100,
                )}%`,
              }}
            />
          </div>
          {profile.isSelf && (
            <Link href="/programming" className="text-xs font-bold text-sky hover:underline">
              {t.programming.continueCode} →
            </Link>
          )}
        </section>
      )}

      <section>
        <h2 className="mb-3 text-xl font-black">{t.publicProfile.courses}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {profile.courseProgress.map((c) => (
            <div key={c.slug} className="card">
              <span className="text-2xl">{c.icon}</span>
              <p className="font-black">{c.titleUk}</p>
              <p className="text-sm text-ink-muted">
                {t.dashboard.level} {c.level} · {c.completedLessons} lessons
              </p>
            </div>
          ))}
          {profile.courseProgress.length === 0 && (
            <p className="text-ink-muted text-sm">—</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-black">
          {t.publicProfile.achievements} ({profile.achievementsUnlocked})
        </h2>
        <div className="flex flex-wrap gap-2">
          {profile.recentAchievements.map((a) => (
            <span
              key={a.code}
              className="rounded-2xl border-2 border-slate-100 px-3 py-2 text-sm font-bold"
            >
              {a.icon} {a.titleUk}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-black">{t.publicProfile.certificates}</h2>
        <div className="space-y-2">
          {profile.certificates.map((c) => (
            <Link
              key={c.code}
              href={`/certificates/${c.code}`}
              className="card block hover:border-brand/40"
            >
              📜 {c.titleUk}
            </Link>
          ))}
          {profile.certificates.length === 0 && (
            <p className="text-sm text-ink-muted">—</p>
          )}
        </div>
      </section>
    </div>
  );
}
