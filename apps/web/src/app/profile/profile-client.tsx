"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { XpBar } from "@/components/xp-bar";
import { api } from "@/lib/api";
import { PushToggle } from "@/components/push-toggle";
import { ShareProfileCard } from "@/components/share-card";
import { StreakCalendar } from "@/components/streak-calendar";
import { OnboardingWizard } from "@/components/onboarding-wizard";
import { CharacterProgressionPanel } from "@/components/character-progression";
import { Badge, Button, Skeleton } from "@/components/ui";
import { avatarEmoji as avatarEmojiOf } from "@/lib/avatar-emoji";
import { titleLabel } from "@eduforge/shared";

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

type SessionRow = {
  id: string;
  createdAt: string;
  expiresAt: string;
  current: boolean;
};

function UserMfaCard({ token, locale }: { token: string | null; locale: string }) {
  const en = locale === "en";
  const [status, setStatus] = useState<{
    totpEnabled?: boolean;
    backupCodesRemaining?: number;
  } | null>(null);
  const [setup, setSetup] = useState<{ secret: string; otpauthUrl: string } | null>(null);
  const [code, setCode] = useState("");
  const [backups, setBackups] = useState<string[] | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!token) return;
    void api<{ totpEnabled?: boolean; backupCodesRemaining?: number }>("/auth/mfa/status", {
      token,
    })
      .then(setStatus)
      .catch(() => setStatus({ totpEnabled: false }));
  }, [token]);

  async function startSetup() {
    if (!token) return;
    setBusy(true);
    setMsg("");
    try {
      const r = await api<{ secret: string; otpauthUrl: string }>("/auth/mfa/totp/setup", {
        method: "POST",
        token,
      });
      setSetup(r);
    } catch {
      setMsg(en ? "Setup failed" : "Помилка setup");
    } finally {
      setBusy(false);
    }
  }

  async function confirm() {
    if (!token) return;
    setBusy(true);
    try {
      const r = await api<{ backupCodes?: string[] }>("/auth/mfa/totp/confirm", {
        method: "POST",
        token,
        body: { code },
      });
      setBackups(r.backupCodes ?? null);
      setSetup(null);
      setCode("");
      setStatus({ totpEnabled: true, backupCodesRemaining: r.backupCodes?.length });
      setMsg(en ? "2FA enabled. Store backup codes offline." : "2FA увімкнено. Збережіть backup-коди.");
    } catch {
      setMsg(en ? "Invalid code" : "Невірний код");
    } finally {
      setBusy(false);
    }
  }

  async function disable() {
    if (!token) return;
    setBusy(true);
    try {
      await api("/auth/mfa/totp/disable", {
        method: "POST",
        token,
        body: { code },
      });
      setStatus({ totpEnabled: false });
      setCode("");
      setMsg(en ? "2FA disabled" : "2FA вимкнено");
    } catch {
      setMsg(en ? "Need valid TOTP/backup to disable" : "Потрібен код для вимкнення");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card space-y-3">
      <h2 className="text-lg font-black">
        {en ? "🔐 Two-factor auth (TOTP)" : "🔐 Двофакторна автентифікація"}
      </h2>
      <p className="text-sm font-bold text-ink-muted">
        {status?.totpEnabled
          ? en
            ? `Enabled · ${status.backupCodesRemaining ?? 0} backup codes left`
            : `Увімкнено · залишилось backup: ${status.backupCodesRemaining ?? 0}`
          : en
            ? "Optional for learners; recommended for all accounts."
            : "Опційно для учнів; рекомендовано для всіх."}
      </p>
      {!status?.totpEnabled && !setup && (
        <Button size="sm" disabled={busy} onClick={() => void startSetup()}>
          {en ? "Enable authenticator" : "Увімкнути authenticator"}
        </Button>
      )}
      {setup && (
        <div className="space-y-2 text-sm font-bold">
          <p className="break-all text-xs font-mono">{setup.otpauthUrl}</p>
          <p className="text-xs text-ink-muted">
            {en ? "Secret:" : "Секрет:"} {setup.secret}
          </p>
          <input
            className="input font-mono"
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button size="sm" disabled={busy} onClick={() => void confirm()}>
            {en ? "Confirm" : "Підтвердити"}
          </Button>
        </div>
      )}
      {status?.totpEnabled && (
        <div className="space-y-2">
          <input
            className="input font-mono"
            placeholder={en ? "Code to disable" : "Код для вимкнення"}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button size="sm" variant="secondary" disabled={busy} onClick={() => void disable()}>
            {en ? "Disable 2FA" : "Вимкнути 2FA"}
          </Button>
        </div>
      )}
      {backups && (
        <ul className="rounded-xl bg-slate-50 p-3 font-mono text-xs dark:bg-slate-900">
          {backups.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {msg && <p className="text-sm font-bold text-sky">{msg}</p>}
    </div>
  );
}

function AccountSecurityCard({
  token,
  locale,
  email,
  emailVerified,
  isAdmin,
  onLogout,
}: {
  token: string | null;
  locale: string;
  email: string;
  emailVerified?: boolean;
  isAdmin?: boolean;
  onLogout: () => Promise<void>;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const en = locale === "en";

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setBusy(true);
    setMsg("");
    try {
      await api("/auth/change-password", {
        method: "POST",
        token,
        body: { currentPassword, newPassword },
      });
      setCurrentPassword("");
      setNewPassword("");
      setMsg(en ? "Password updated. Other devices signed out." : "Пароль змінено. Інші пристрої вийшли.");
    } catch (err) {
      const code = (err as { data?: { error?: string } })?.data?.error;
      setMsg(
        code === "invalid_credentials"
          ? en
            ? "Current password incorrect"
            : "Поточний пароль невірний"
          : code === "same_password"
            ? en
              ? "New password must differ"
              : "Новий пароль має відрізнятись"
            : en
              ? "Could not change password"
              : "Не вдалося змінити пароль",
      );
    } finally {
      setBusy(false);
    }
  }

  async function exportData() {
    if (!token) return;
    setBusy(true);
    setMsg("");
    try {
      const data = await api<Record<string, unknown>>("/learning/export", { token });
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `eduforge-export-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setMsg(en ? "Export downloaded." : "Експорт завантажено.");
    } catch {
      setMsg(en ? "Export failed" : "Помилка експорту");
    } finally {
      setBusy(false);
    }
  }

  async function deleteAccount() {
    if (!token || !confirmDelete) return;
    setBusy(true);
    setMsg("");
    try {
      await api("/auth/account/delete", {
        method: "POST",
        token,
        body: { password: deletePassword, confirm: "DELETE" },
      });
      setMsg(en ? "Account deleted." : "Акаунт видалено.");
      await onLogout();
    } catch (err) {
      const code = (err as { data?: { error?: string } })?.data?.error;
      setMsg(
        code === "admin_cannot_self_delete"
          ? en
            ? "Admin accounts cannot self-delete."
            : "Адмін не може видалити себе."
          : code === "invalid_credentials"
            ? en
              ? "Password incorrect"
              : "Невірний пароль"
            : en
              ? "Could not delete account"
              : "Не вдалося видалити акаунт",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card space-y-4">
      <h2 className="text-lg font-black">
        {en ? "🔐 Account & privacy" : "🔐 Акаунт і приватність"}
      </h2>
      <div className="rounded-xl bg-slate-50 px-3 py-2 text-sm font-bold dark:bg-slate-900">
        <p className="text-ink-muted text-xs">{en ? "Email" : "Email"}</p>
        <p>
          {email}{" "}
          {emailVerified === false ? (
            <Badge tone="grape">{en ? "unverified" : "не підтверджено"}</Badge>
          ) : (
            <Badge tone="brand">{en ? "verified" : "підтверджено"}</Badge>
          )}
        </p>
      </div>

      <form onSubmit={(e) => void changePassword(e)} className="space-y-2">
        <p className="text-sm font-black">
          {en ? "Change password" : "Змінити пароль"}
        </p>
        <input
          type="password"
          className="input"
          placeholder={en ? "Current password" : "Поточний пароль"}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <input
          type="password"
          className="input"
          placeholder={en ? "New password (letter + digit)" : "Новий пароль (літера + цифра)"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          autoComplete="new-password"
          minLength={8}
          required
        />
        <Button type="submit" variant="secondary" size="sm" disabled={busy}>
          {en ? "Update password" : "Оновити пароль"}
        </Button>
      </form>

      <div className="space-y-2 border-t border-slate-100 pt-3 dark:border-slate-800">
        <p className="text-sm font-black">
          {en ? "Your data (GDPR)" : "Ваші дані (GDPR)"}
        </p>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={busy}
          onClick={() => void exportData()}
        >
          {en ? "Download JSON export" : "Завантажити JSON-експорт"}
        </Button>
        <p className="text-xs font-bold text-ink-muted">
          {en
            ? "Includes progress, lessons, placements. Not chat attachments."
            : "Прогрес, уроки, placement. Без вкладень чату."}
        </p>
      </div>

      {!isAdmin && (
        <div className="space-y-2 border-t border-red-100 pt-3 dark:border-red-900/40">
          <p className="text-sm font-black text-red-600">
            {en ? "Delete account" : "Видалити акаунт"}
          </p>
          <p className="text-xs font-bold text-ink-muted">
            {en
              ? 'Irreversible. Type password and check confirm. Phrase sent: DELETE.'
              : "Незворотно. Введіть пароль і підтвердіть. Фраза: DELETE."}
          </p>
          <input
            type="password"
            className="input"
            placeholder={en ? "Password" : "Пароль"}
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            autoComplete="current-password"
          />
          <label className="flex items-center gap-2 text-sm font-bold">
            <input
              type="checkbox"
              checked={confirmDelete}
              onChange={(e) => setConfirmDelete(e.target.checked)}
            />
            {en ? "I understand this deletes my data" : "Розумію, що дані буде видалено"}
          </label>
          <Button
            type="button"
            variant="danger"
            size="sm"
            disabled={busy || !confirmDelete || !deletePassword}
            onClick={() => void deleteAccount()}
          >
            {en ? "Delete my account" : "Видалити мій акаунт"}
          </Button>
        </div>
      )}
      {msg && <p className="text-sm font-bold text-sky">{msg}</p>}
    </div>
  );
}

function SessionsCard({
  token,
  locale,
}: {
  token: string | null;
  locale: string;
}) {
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!token) return;
    void api<{ sessions: SessionRow[] }>("/auth/sessions", { token })
      .then((d) => setSessions(d.sessions ?? []))
      .catch(() => setSessions([]));
  }, [token]);

  async function logoutOthers() {
    if (!token || busy) return;
    setBusy(true);
    setMsg("");
    try {
      const d = await api<{ revoked: number }>("/auth/logout-others", {
        method: "POST",
        token,
        body: {},
      });
      const next = await api<{ sessions: SessionRow[] }>("/auth/sessions", { token });
      setSessions(next.sessions ?? []);
      setMsg(
        locale === "en"
          ? `Signed out ${d.revoked} other device(s).`
          : `Вийшли з ${d.revoked} інших пристроїв.`,
      );
    } catch {
      setMsg(locale === "en" ? "Could not revoke sessions" : "Не вдалося завершити сесії");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card space-y-3">
      <h2 className="text-lg font-black">
        {locale === "en" ? "🔒 Active sessions" : "🔒 Активні сесії"}
      </h2>
      <p className="text-sm font-bold text-ink-muted">
        {locale === "en"
          ? `${sessions.length} device session(s). Sign out others if you lost a device.`
          : `${sessions.length} сес. Пристрої. Вийдіть з інших, якщо втратили пристрій.`}
      </p>
      <ul className="space-y-2 text-sm">
        {sessions.map((s) => (
          <li
            key={s.id}
            className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-100 px-3 py-2 dark:border-slate-800"
          >
            <span className="font-bold">
              {new Date(s.createdAt).toLocaleString()}
              {s.current && (
                <Badge tone="brand" className="ml-2">
                  {locale === "en" ? "This device" : "Цей пристрій"}
                </Badge>
              )}
            </span>
            <span className="text-xs text-ink-muted font-mono">
              exp {new Date(s.expiresAt).toLocaleDateString()}
            </span>
          </li>
        ))}
        {!sessions.length && (
          <li className="text-ink-muted font-bold">
            {locale === "en" ? "No active sessions listed" : "Немає активних сесій"}
          </li>
        )}
      </ul>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        disabled={busy || sessions.filter((s) => !s.current).length === 0}
        onClick={() => void logoutOthers()}
      >
        {locale === "en" ? "Sign out other devices" : "Вийти з інших пристроїв"}
      </Button>
      {msg && <p className="text-sm font-bold text-sky">{msg}</p>}
    </div>
  );
}

export function ProfileClient() {
  const { user, character, loading, token, setCharacter, refresh, logout } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("default");
  const [msg, setMsg] = useState("");
  const [certs, setCerts] = useState<Cert[]>([]);
  const [minis, setMinis] = useState<Minis | null>(null);
  const [wizardOpen, setWizardOpen] = useState(false);
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

  if (loading || !user) {
    return (
      <div className="mx-auto max-w-lg space-y-4" aria-busy="true">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-48 w-full" />
        <p className="sr-only">{t.common.loading}</p>
      </div>
    );
  }

  const ratio = minis && minis.total > 0 ? Math.min(1, minis.completed / minis.total) : 0;
  const avatarEmoji = avatarEmojiOf(avatar);
  const streakDates =
    (character?.streakDays ?? 0) > 0
      ? Array.from({ length: Math.min(14, character!.streakDays) }, (_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - i);
          return d.toISOString().slice(0, 10);
        })
      : [];

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <OnboardingWizard
        open={wizardOpen}
        force={wizardOpen}
        onClose={() => setWizardOpen(false)}
      />
      {character && (
        <ShareProfileCard
          userId={user.id}
          displayName={character.displayName}
          globalLevel={character.globalLevel}
          globalXp={character.globalXp}
          streakDays={character.streakDays}
          avatarEmoji={avatarEmoji}
          titleLabel={titleLabel(
            character.progression?.equippedTitle,
            locale === "en" ? "en" : "uk",
          )}
          showFriendInvite
        />
      )}
      <StreakCalendar
        activeDates={streakDates}
        streakDays={character?.streakDays ?? 0}
      />
      {(character?.progression?.skillPoints ?? 0) > 0 ? (
        <a
          href="#build"
          className="card block border-grape/40 bg-grape/10 text-sm font-black text-grape hover:border-grape/60"
        >
          ⭐{" "}
          {locale === "en"
            ? `You have ${character!.progression!.skillPoints} skill points — tap to build`
            : `У вас ${character!.progression!.skillPoints} очок навичок — тапніть, щоб прокачати`}{" "}
          →
        </a>
      ) : null}
      <CharacterProgressionPanel />
      <div className="flex flex-wrap gap-2">
        <Link href={`/u/${user.id}`}>
          <Button size="sm" variant="secondary">
            {locale === "en" ? "Public profile" : "Публічний профіль"} →
          </Button>
        </Link>
        <Button size="sm" variant="secondary" onClick={() => setWizardOpen(true)}>
          {t.onboarding.changeRole}
        </Button>
        {user.plan === "premium" && <Badge tone="grape">Premium</Badge>}
      </div>
      <div className="card space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{avatarEmojiOf(avatar)}</span>
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

      <SessionsCard token={token} locale={locale} />

      <UserMfaCard token={token} locale={locale} />

      <AccountSecurityCard
        token={token}
        locale={locale}
        email={user.email}
        emailVerified={user.emailVerified}
        isAdmin={user.role === "admin"}
        onLogout={async () => {
          try {
            await logout();
          } catch {
            /* session already gone after delete */
          }
          router.replace("/login");
        }}
      />

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
