"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import clsx from "clsx";

type Ach = {
  code: string;
  titleUk: string;
  titleEn: string;
  descriptionUk: string;
  descriptionEn: string;
  icon: string;
  xpReward: number;
  unlocked: boolean;
  unlockedAt: string | null;
};

export default function AchievementsPage() {
  const { user, token, loading } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const [items, setItems] = useState<Ach[]>([]);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token) return;
    void api<{ achievements: Ach[] }>("/engagement/achievements", { token })
      .then((d) => setItems(d.achievements))
      .catch(() => setItems([]));
  }, [token]);

  if (loading || !user) return <p>{t.common.loading}</p>;

  const unlocked = items.filter((a) => a.unlocked).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">🏅 {t.engagement.achievements}</h1>
        <p className="text-ink-muted font-bold">
          {unlocked}/{items.length}
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((a) => (
          <div
            key={a.code}
            className={clsx(
              "card",
              a.unlocked ? "border-brand/40 bg-brand-soft/20" : "opacity-70",
            )}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{a.icon}</span>
              <div>
                <p className="font-black">
                  {locale === "en" ? a.titleEn : a.titleUk}
                </p>
                <p className="text-sm text-ink-muted">
                  {locale === "en" ? a.descriptionEn : a.descriptionUk}
                </p>
                <p className="mt-1 text-xs font-bold text-sky">
                  +{a.xpReward} XP ·{" "}
                  {a.unlocked ? t.engagement.unlocked : t.engagement.locked}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
