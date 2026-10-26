"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { PageLoading } from "@/components/page-loading";
import { EmptyState, Badge } from "@/components/ui";
import { ShareLinkButtons } from "@/components/share-link";
import { useRequireAuth } from "@/lib/use-require-auth";
import { useToast } from "@/components/ui";

/**
 * Labs surface: referral share code.
 * Discoverable via ?labs=1 More menu.
 */
export function ReferralsClient() {
  const { user, token, loading } = useAuth();
  const { ready } = useRequireAuth();
  const { t, locale } = useLocale();
  const { toast } = useToast();
  const [data, setData] = useState<{
    code: string;
    uses: number;
    bonusXp: number;
    shareUrl: string;
  } | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!token) return;
    setDataLoading(true);
    setLoadError(false);
    void api<NonNullable<typeof data>>("/referrals/mine", { token })
      .then(setData)
      .catch(() => {
        setData(null);
        setLoadError(true);
      })
      .finally(() => setDataLoading(false));
  }, [token]);

  if (loading || !ready || dataLoading) {
    return <PageLoading label={t.common.loading} />;
  }
  if (!user) return <PageLoading label={t.common.loading} />;

  if (loadError || !data) {
    return (
      <EmptyState
        title={locale === "en" ? "Could not load referrals" : "Не вдалося завантажити"}
        description={
          locale === "en"
            ? "Try again or open Labs from More menu."
            : "Спробуйте ще раз або увімкніть Labs у меню «Ще»."
        }
        actionHref="/learn"
        actionLabel={t.nav.learn}
      />
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 pb-20 md:pb-0">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-3xl font-black">🎁 {t.extra.referralTitle}</h1>
        <Badge tone="muted">Labs</Badge>
      </div>
      <p className="text-sm font-bold text-ink-muted">
        {locale === "en"
          ? "Share your code. Friends register with it — you both can earn XP."
          : "Поділіться кодом. Друзі реєструються з ним — XP для обох."}
      </p>

      <div className="card space-y-4">
        <p className="font-bold text-ink-muted">
          {t.extra.referralBonus}: +{data.bonusXp} XP
        </p>
        <div>
          <p className="label" id="ref-code-label">
            {t.extra.yourCode}
          </p>
          <code
            className="block rounded-2xl bg-slate-100 px-4 py-3 font-mono text-xl font-black dark:bg-slate-800"
            aria-labelledby="ref-code-label"
          >
            {data.code}
          </code>
        </div>
        <p className="text-sm font-bold">
          {t.extra.uses}: {data.uses}
        </p>
        <button
          type="button"
          className="btn-primary w-full min-h-11"
          onClick={() => {
            void navigator.clipboard.writeText(data.shareUrl).then(
              () => toast(locale === "en" ? "Link copied" : "Посилання скопійовано", "success"),
              () => toast(t.common.error, "error"),
            );
          }}
        >
          {t.extra.copyLink}
        </button>
        <ShareLinkButtons
          path={data.shareUrl.startsWith("http") ? data.shareUrl : `/register?ref=${data.code}`}
          title="EduForge invite"
          text={
            locale === "en"
              ? `Join EduForge with my code ${data.code}`
              : `Приєднуйся до EduForge з кодом ${data.code}`
          }
        />
        <p className="break-all text-xs text-ink-muted">{data.shareUrl}</p>
      </div>
    </div>
  );
}
