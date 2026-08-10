"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { pickLocale } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { XpBar } from "@/components/xp-bar";
import { ShareProfileCard } from "@/components/share-card";
import { Badge, Button, Card, EmptyState, Skeleton } from "@/components/ui";
import { avatarEmoji } from "@/lib/avatar-emoji";
import { FRAME_CATALOG } from "@eduforge/shared";

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
  equippedTitle?: string | null;
  equippedFrame?: string | null;
  titleUk?: string;
  titleEn?: string;
  pathBadges?: {
    id: string;
    icon: string;
    titleUk: string;
    titleEn: string;
    courseSlug: string;
  }[];
  certificates: { code: string; titleUk: string; titleEn?: string; issuedAt: string }[];
  courseProgress: {
    slug: string;
    titleUk: string;
    titleEn?: string;
    icon: string;
    color: string;
    xp: number;
    level: number;
    completedLessons: number;
  }[];
  recentAchievements: {
    code: string;
    titleUk: string;
    titleEn?: string;
    icon: string;
  }[];
  programmingMinis?: {
    total: number;
    completed: number;
    allDone: boolean;
    slugsDone: string[];
  } | null;
};

export function PublicProfileClient({ userId: userIdProp }: { userId?: string }) {
  const params = useParams<{ userId: string }>();
  const userId = userIdProp || params.userId;
  const { user, token, loading } = useAuth();
  const { t, locale } = useLocale();
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

  if (loading || !user) {
    return (
      <div className="space-y-3" aria-busy="true">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }
  if (error) {
    return (
      <EmptyState
        title={t.common.error}
        description={error}
        actionHref="/friends"
        actionLabel={t.nav.friends}
      />
    );
  }
  if (!profile) {
    return (
      <div className="space-y-3" aria-busy="true">
        <Skeleton className="h-28 w-full" />
        <p className="sr-only">{t.common.loading}</p>
      </div>
    );
  }

  const emoji = avatarEmoji(profile.avatarKey);
  const title =
    locale === "en"
      ? (profile.titleEn ?? profile.equippedTitle ?? "")
      : (profile.titleUk ?? profile.equippedTitle ?? "");
  const frameCss =
    FRAME_CATALOG.find((f) => f.id === (profile.equippedFrame ?? "none"))?.cssClass ?? "";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <span
          className={`inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-6xl dark:bg-slate-900 ${frameCss}`}
          aria-hidden
        >
          {emoji}
        </span>
        <div className="flex-1">
          <p className="text-sm font-bold text-ink-muted">{t.publicProfile.title}</p>
          <h1 className="text-2xl font-black">{profile.displayName}</h1>
          {title ? (
            <p className="text-sm font-bold text-grape">{title}</p>
          ) : null}
          <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-ink-muted">
            <Badge tone="brand">
              {t.dashboard.level} {profile.globalLevel}
            </Badge>
            <Badge tone="sky">🔥 {profile.streakDays}</Badge>
            <Badge tone={profile.plan === "premium" ? "grape" : "muted"}>
              {profile.plan}
            </Badge>
          </p>
          <div className="mt-2 max-w-sm">
            <XpBar xp={profile.globalXp} />
          </div>
        </div>
        {!profile.isSelf && profile.friendship === "none" && (
          <Button onClick={() => void addFriend()}>{t.social.addFriend}</Button>
        )}
        {profile.friendship === "friends" && (
          <Badge tone="brand">🤝 {t.social.friends}</Badge>
        )}
        {profile.friendship === "pending_out" && (
          <span className="text-sm font-bold text-ink-muted">{t.social.pending}</span>
        )}
      </Card>

      <ShareProfileCard
        userId={profile.userId}
        displayName={profile.displayName}
        globalLevel={profile.globalLevel}
        globalXp={profile.globalXp}
        streakDays={profile.streakDays}
        avatarEmoji={emoji}
        titleLabel={title}
        showFriendInvite={!profile.isSelf}
      />

      {profile.pathBadges && profile.pathBadges.length > 0 && (
        <Card className="space-y-2">
          <h2 className="font-black">
            {locale === "en" ? "Path badges" : "Path-бейджі"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.pathBadges.map((b) => (
              <Link
                key={b.id}
                href={`/courses/${b.courseSlug}`}
                className="rounded-xl border border-brand/30 bg-brand/10 px-2 py-1 text-xs font-bold hover:border-brand"
                title={locale === "en" ? b.titleEn : b.titleUk}
              >
                {b.icon} {locale === "en" ? b.titleEn : b.titleUk}
              </Link>
            ))}
          </div>
        </Card>
      )}

      {profile.programmingMinis && profile.programmingMinis.total > 0 && (
        <Card className="space-y-2 border-sky/30">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-black">🧩 {t.publicProfile.minis}</h2>
            {profile.programmingMinis.allDone ? (
              <Badge tone="brand">{t.publicProfile.minisComplete}</Badge>
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
        </Card>
      )}

      <section>
        <h2 className="mb-3 text-xl font-black">{t.publicProfile.courses}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {profile.courseProgress.map((c) => (
            <Card key={c.slug}>
              <span className="text-2xl">{c.icon}</span>
              <p className="font-black">
                {pickLocale(locale, c.titleUk, c.titleEn)}
              </p>
              <p className="text-sm text-ink-muted">
                {t.dashboard.level} {c.level} ┬╖ {c.completedLessons}{" "}
                {locale === "en" ? "lessons" : "╤Г╤А╨╛╨║╤Ц╨▓"}
              </p>
            </Card>
          ))}
          {profile.courseProgress.length === 0 && (
            <p className="text-ink-muted text-sm">тАФ</p>
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
              className="rounded-2xl border-2 border-slate-100 px-3 py-2 text-sm font-bold dark:border-slate-800"
            >
              {a.icon} {pickLocale(locale, a.titleUk, a.titleEn)}
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
              ЁЯУЬ {pickLocale(locale, c.titleUk, c.titleEn)}
            </Link>
          ))}
          {profile.certificates.length === 0 && (
            <p className="text-sm text-ink-muted">тАФ</p>
          )}
        </div>
      </section>
    </div>
  );
}
