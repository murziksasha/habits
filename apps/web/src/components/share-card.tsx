"use client";

import { useLocale } from "@/lib/locale-context";
import { ShareLinkButtons } from "@/components/share-link";
import { Badge, Card } from "@/components/ui";

export function ShareProfileCard({
  userId,
  displayName,
  globalLevel,
  globalXp,
  streakDays,
  avatarEmoji = "🧙",
  /** Also offer a friend-invite deep link */
  showFriendInvite = false,
}: {
  userId: string;
  displayName: string;
  globalLevel: number;
  globalXp: number;
  streakDays: number;
  avatarEmoji?: string;
  showFriendInvite?: boolean;
}) {
  const { t, locale } = useLocale();
  const path = `/u/${userId}`;
  /** Guest-friendly: register then auto friend-request */
  const guestInvitePath = `/register?friend=${userId}`;
  /** Already logged-in: deep link on friends page */
  const loggedInInvitePath = `/friends?add=${userId}`;

  return (
    <Card className="space-y-3 border-brand/30 bg-gradient-to-br from-brand-soft/30 to-white dark:to-slate-950">
      <div className="flex items-center gap-3">
        <span className="text-4xl" aria-hidden>
          {avatarEmoji}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase text-ink-muted">EduForge</p>
          <p className="truncate text-lg font-black">{displayName}</p>
          <div className="mt-1 flex flex-wrap gap-1">
            <Badge tone="brand">
              {t.dashboard.level} {globalLevel}
            </Badge>
            <Badge tone="sky">🔥 {streakDays}</Badge>
            <Badge tone="muted">{globalXp} XP</Badge>
          </div>
        </div>
      </div>
      <ShareLinkButtons
        path={path}
        title={`${displayName} · EduForge`}
        text={
          locale === "en"
            ? `Check out ${displayName} on EduForge — L${globalLevel}, streak ${streakDays}`
            : `Профіль ${displayName} в EduForge — L${globalLevel}, серія ${streakDays}`
        }
      />
      {showFriendInvite && (
        <div className="space-y-3 border-t border-slate-100 pt-3 dark:border-slate-800">
          <div>
            <p className="mb-2 text-xs font-bold text-ink-muted">
              {locale === "en" ? "Invite new users (register)" : "Запрошення нових (реєстрація)"}
            </p>
            <ShareLinkButtons
              path={guestInvitePath}
              title={
                locale === "en"
                  ? `Join me on EduForge — ${displayName}`
                  : `Приєднуйся до EduForge — ${displayName}`
              }
              text={
                locale === "en"
                  ? `Sign up with this link to join EduForge and connect with ${displayName}.`
                  : `Зареєструйся за цим посиланням у EduForge і додай ${displayName} у друзі.`
              }
            />
          </div>
          <div>
            <p className="mb-2 text-xs font-bold text-ink-muted">
              {locale === "en" ? "Already have an account" : "Вже є акаунт"}
            </p>
            <ShareLinkButtons
              path={loggedInInvitePath}
              title={
                locale === "en"
                  ? `Add ${displayName} on EduForge`
                  : `Додай ${displayName} в EduForge`
              }
              text={
                locale === "en"
                  ? `Open while logged in to send a friend request to ${displayName}.`
                  : `Відкрий, увійшовши в акаунт, щоб надіслати запит ${displayName}.`
              }
            />
          </div>
        </div>
      )}
    </Card>
  );
}
