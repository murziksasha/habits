"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

export default function ReferralsPage() {
  const { user, token, loading } = useAuth();
  const { t } = useLocale();
  const router = useRouter();
  const [data, setData] = useState<{
    code: string;
    uses: number;
    bonusXp: number;
    shareUrl: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token) return;
    void api<NonNullable<typeof data>>("/referrals/mine", { token })
      .then(setData)
      .catch(() => setData(null));
  }, [token]);

  if (loading || !user) return <p>{t.common.loading}</p>;
  if (!data) return <p>{t.common.loading}</p>;

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-3xl font-black">🎁 {t.extra.referralTitle}</h1>
      <div className="card space-y-4">
        <p className="text-ink-muted">
          {t.extra.referralBonus}: +{data.bonusXp} XP
        </p>
        <div>
          <p className="label">{t.extra.yourCode}</p>
          <code className="block rounded-2xl bg-slate-100 dark:bg-slate-800 px-4 py-3 font-mono text-xl font-black">
            {data.code}
          </code>
        </div>
        <p className="text-sm font-bold">
          {t.extra.uses}: {data.uses}
        </p>
        <button
          type="button"
          className="btn-primary w-full"
          onClick={() => {
            void navigator.clipboard.writeText(data.shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
        >
          {copied ? "✓" : t.extra.copyLink}
        </button>
        <p className="break-all text-xs text-ink-muted">{data.shareUrl}</p>
      </div>
    </div>
  );
}
