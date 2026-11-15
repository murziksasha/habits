"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/admin-api";

export function AdminEngagementClient() {
  const { token } = useAuth();
  const { t } = useLocale();
  const [data, setData] = useState<{
    achievements: number;
    shopItems: number;
    dailyQuests: number;
  } | null>(null);

  useEffect(() => {
    if (!token) return;
    void api<NonNullable<typeof data>>("/admin/overview/engagement", { token }).then(setData);
  }, [token]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">🏆 {t.admin.engagement}</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Achievements (catalog)", v: data?.achievements ?? "…" },
          { label: "Shop items", v: data?.shopItems ?? "…" },
          { label: "Daily quests", v: data?.dailyQuests ?? "…" },
        ].map((s) => (
          <div key={s.label} className="card">
            <p className="text-sm font-bold text-ink-muted">{s.label}</p>
            <p className="text-3xl font-black">{s.v}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-ink-muted">
        Catalogs are code-owned (`@eduforge/shared`). Edit in repo + deploy; this module is overview only.
      </p>
    </div>
  );
}
