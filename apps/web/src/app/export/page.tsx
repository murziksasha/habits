"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

export default function ExportPage() {
  const { user, token, loading } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [milestones, setMilestones] = useState<
    { code: string; titleUk: string; titleEn: string; unlockedAt: string }[]
  >([]);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token) return;
    void api<Record<string, unknown>>("/learning/export", { token })
      .then(setData)
      .catch(() => setData(null));
    void api<{ milestones: typeof milestones }>("/learning/milestones", { token })
      .then((d) => setMilestones(d.milestones))
      .catch(() => setMilestones([]));
  }, [token]);

  function download() {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `eduforge-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading || !user) return <p>{t.common.loading}</p>;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-3xl font-black">📦 {t.learning.exportTitle}</h1>
      <button type="button" className="btn-primary" disabled={!data} onClick={download}>
        {t.learning.download}
      </button>

      <section className="space-y-2">
        <h2 className="text-xl font-black">{t.learning.milestones}</h2>
        {milestones.length === 0 ? (
          <p className="text-ink-muted text-sm font-bold">—</p>
        ) : (
          milestones.map((m) => (
            <div key={m.code} className="card flex justify-between text-sm font-bold">
              <span>{locale === "en" ? m.titleEn || m.titleUk : m.titleUk}</span>
              <span className="text-ink-muted">
                {new Date(m.unlockedAt).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </section>

      {data && (
        <pre className="card max-h-80 overflow-auto text-xs">
          {JSON.stringify(data, null, 2).slice(0, 4000)}
          …
        </pre>
      )}
    </div>
  );
}
