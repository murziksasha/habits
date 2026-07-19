"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { XpBar } from "@/components/xp-bar";
import { api } from "@/lib/api";
import { PushToggle } from "@/components/push-toggle";

const BASE_AVATARS = ["default", "wizard", "knight", "scholar", "fox", "robot"];

type Cert = { code: string; titleUk: string; titleEn?: string | null; issuedAt: string };
type Minis = {
  total: number;
  completed: number;
  allDone: boolean;
  slugsDone: string[];
};

function certBadge(title: string, t: { badgePath: string; badgeMinis: string; badgeCourse: string }) {
  const lower = title.toLowerCase();
  if (lower.includes("minis")) return t.badgeMinis;
  if (lower.includes("path")) return t.badgePath;
  if (lower.includes("programming")) return t.badgeCourse;
  return null;
}

export default function ProfilePage() {
  const { user, character, loading, token, setCharacter, refresh } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("default");
  const [msg, setMsg] = useState("");
  const [certs, setCerts] = useState<Cert[]>([]);
  const [minis, setMinis] = useState<Minis | null>(null);
  const AVATARS = character?.unlockedAvatars?.length
    ? character.unlockedAvatars
    : BASE_AVATARS;

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (character) {
      setName(character.displayName);
      setAvatar(character.avatarKey || "default");
    }
  }, [character]);

  useEffect(() => {
    if (!token || !user) return;
    void api<{ certificates: Cert[] }>("/certificates/mine", { token })
      .then((d) => setCerts(d.certificates ?? []))
      .catch(() => setCerts([]));
    void api<{ profile: { programmingMinis?: Minis | null } }>(
      `/profiles/${user.id}`,
      { token },
    )
      .then((d) => setMinis(d.profile?.programmingMinis ?? null))
      .catch(() => setMinis(null));
  }, [token, user]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    try {
      const d = await api<{ character: NonNullable<typeof character> }>(
        "/auth/me/character",
        {
          method: "PATCH",
          token,
          body: { displayName: name, avatarKey: avatar },
        },
      );
      setCharacter(d.character);
      await refresh();
      setMsg(locale === "en" ? "Saved" : "Збережено");
    } catch {
      setMsg(locale === "en" ? "Save failed" : "Помилка збереження");
    }
  }

  if (loading || !user) return <p>{t.common.loading}</p>;

  const ratio = minis && minis.total > 0 ? Math.min(1, minis.completed / minis.total) : 0;

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <div className="card space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-5xl">
            {avatar === "knight"
              ? "⚔️"
              : avatar === "scholar"
                ? "📚"
                : avatar === "fox"
                  ? "🦊"
                  : avatar === "robot"
                    ? "🤖"
                    : avatar === "wizard"
                      ? "🧙‍♂️"
                      : "🧙"}
          </span>
          <div>
            <h1 className="text-2xl font-black">{character?.displayName}</h1>
            <p className="text-ink-muted">{user.email}</p>
            {user.role === "admin" && (
              <p className="text-xs font-bold text-grape">admin</p>
            )}
            <Link
              href={`/u/${user.id}`}
              className="text-xs font-bold text-sky hover:underline"
            >
              {t.publicProfile.title} →
            </Link>
          </div>
        </div>
        <XpBar xp={character?.globalXp ?? 0} />
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">
            <dt className="text-ink-muted">{t.dashboard.level}</dt>
            <dd className="text-xl font-black">{character?.globalLevel}</dd>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">
            <dt className="text-ink-muted">Plan</dt>
            <dd className="text-sm font-black capitalize">
              {user.plan}
              {user.plan === "premium" && user.planExpiresAt ? (
                <span className="block text-[10px] font-bold text-ink-muted normal-case">
                  {locale === "en" ? "until" : "до"}{" "}
                  {new Date(user.planExpiresAt).toLocaleDateString()}
                </span>
              ) : null}
            </dd>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">
            <dt className="text-ink-muted">{t.dashboard.streak}</dt>
            <dd className="text-xl font-black">{character?.streakDays}</dd>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">
            <dt className="text-ink-muted">{t.streak.shields}</dt>
            <dd className="text-xl font-black">
              🛡️ {character?.streakFreezes ?? 0}
            </dd>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">
            <dt className="text-ink-muted">{t.dashboard.xp}</dt>
            <dd className="text-xl font-black">{character?.globalXp}</dd>
          </div>
        </dl>
      </div>

      {minis && (
        <div className="card space-y-2 border-sky/30">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-black">🧩 {t.publicProfile.minis}</h2>
            {minis.allDone && (
              <span className="rounded-full bg-sky/15 px-2 py-0.5 text-xs font-black text-sky">
                {t.publicProfile.minisComplete}
              </span>
            )}
          </div>
          <p className="text-sm font-bold text-ink-muted">
            {minis.completed}/{minis.total} {t.publicProfile.minisDone}
          </p>
          <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-sky transition-all"
              style={{ width: `${ratio * 100}%` }}
            />
          </div>
          <Link href="/programming" className="text-xs font-bold text-sky hover:underline">
            {t.programming.continueCode} →
          </Link>
        </div>
      )}

      <div className="card space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black">📜 {t.certificates.title}</h2>
          <Link href="/certificates" className="text-xs font-bold text-sky hover:underline">
            {t.certificates.title} →
          </Link>
        </div>
        {certs.length === 0 && (
          <p className="text-sm text-ink-muted font-bold">{t.certificates.empty}</p>
        )}
        <ul className="space-y-2">
          {certs.map((c) => {
            const title =
              locale === "en" ? c.titleEn || c.titleUk : c.titleUk || c.titleEn || "";
            const badge = certBadge(title, t.certificates);
            return (
              <li key={c.code}>
                <Link
                  href={`/certificates/${c.code}`}
                  className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 px-3 py-2 text-sm font-bold hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                >
                  <span className="truncate">{title}</span>
                  <span className="flex items-center gap-2 shrink-0">
                    {badge && (
                      <span className="rounded-full bg-grape/15 px-2 py-0.5 text-[10px] font-black text-grape">
                        {badge}
                      </span>
                    )}
                    <span className="text-xs text-ink-muted font-mono">{c.code}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="card space-y-2">
        <h2 className="text-lg font-black">🔔 Push</h2>
        <PushToggle />
      </div>

      <form onSubmit={save} className="card space-y-4">
        <h2 className="text-lg font-black">
          {locale === "en" ? "Edit character" : "Редагувати персонажа"}
        </h2>
        <div>
          <label className="label">{t.auth.displayName}</label>
          <input
            className="input"
            value={name}
            minLength={2}
            maxLength={32}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="label">
            {locale === "en" ? "Avatar" : "Аватар"}
          </label>
          <div className="flex flex-wrap gap-2">
            {AVATARS.map((a) => (
              <button
                key={a}
                type="button"
                className={
                  avatar === a
                    ? "btn-primary !py-2 !px-3 text-sm"
                    : "btn-secondary !py-2 !px-3 text-sm"
                }
                onClick={() => setAvatar(a)}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
        {msg && <p className="text-sm font-bold text-sky">{msg}</p>}
        <button className="btn-primary w-full" type="submit">
          {t.common.save}
        </button>
      </form>
    </div>
  );
}
