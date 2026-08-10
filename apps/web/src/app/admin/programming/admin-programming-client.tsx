"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/admin-api";

export function AdminProgrammingClient() {
  const { token } = useAuth();
  const { t } = useLocale();
  const [data, setData] = useState<{
    playgroundChallenges: number;
    minis: number;
    raceThisWeek: string[];
  } | null>(null);

  useEffect(() => {
    if (!token) return;
    void api<NonNullable<typeof data>>("/admin/overview/programming", { token }).then(setData);
  }, [token]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">💻 {t.admin.programming}</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card">
          <p className="text-sm font-bold text-ink-muted">Playground challenges</p>
          <p className="text-3xl font-black">{data?.playgroundChallenges ?? "…"}</p>
        </div>
        <div className="card">
          <p className="text-sm font-bold text-ink-muted">Programming minis</p>
          <p className="text-3xl font-black">{data?.minis ?? "…"}</p>
        </div>
      </div>
      <div className="card">
        <p className="mb-2 font-black">Race slugs this week</p>
        <ul className="list-inside list-disc text-sm font-mono">
          {(data?.raceThisWeek ?? []).map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
