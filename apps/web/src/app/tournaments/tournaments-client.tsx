"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { PageLoading } from "@/components/page-loading";
import { useRequireAuth } from "@/lib/use-require-auth";

type Tournament = {
  id: string;
  slug: string;
  titleUk: string;
  titleEn: string;
  status: string;
  timeControl: string;
  maxPlayers: number;
  currentRound: number;
};

export function TournamentsClient() {
  const { user, token, loading } = useAuth();
  const { ready } = useRequireAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const [list, setList] = useState<Tournament[]>([]);
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [dataLoading, setDataLoading] = useState(true);

  async function load() {
    setDataLoading(true);
    try {
      const d = await api<{ tournaments: Tournament[] }>("/tournaments");
      setList(d.tournaments);
    } catch {
      setList([]);
    } finally {
      setDataLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function create() {
    if (!token || !title.trim()) return;
    try {
      const d = await api<{ tournament: Tournament }>("/tournaments", {
        method: "POST",
        token,
        body: {
          titleUk: title,
          titleEn: title,
        },
      });
      setTitle("");
      router.push(`/tournaments/${d.tournament.id}`);
    } catch {
      setMsg(t.common.error);
    }
  }

  if (loading || !ready || dataLoading) {
    return <PageLoading label={t.common.loading} />;
  }
  if (!user) return <PageLoading label={t.common.loading} />;

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <h1 className="text-3xl font-black">🏁 {t.tournaments.title}</h1>

      <div className="card max-w-lg space-y-3">
        <h2 className="font-black">{t.tournaments.create}</h2>
        <label className="label" htmlFor="tournament-title">
          {locale === "en" ? "Title" : "Назва"}
        </label>
        <input
          id="tournament-title"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={locale === "uk" ? "Назва турніру" : "Tournament name"}
        />
        <button type="button" className="btn-primary" onClick={() => void create()}>
          {t.common.create}
        </button>
        {msg && <p className="text-sm text-red-500 font-bold">{msg}</p>}
      </div>

      <div className="grid gap-3">
        {list.map((item) => (
          <Link key={item.id} href={`/tournaments/${item.id}`} className="card hover:border-brand/40">
            <div className="flex justify-between gap-3">
              <div>
                <p className="font-black text-lg">
                  {locale === "en" && item.titleEn ? item.titleEn : item.titleUk}
                </p>
                <p className="text-sm text-ink-muted">
                  {t.tournaments.status}: {item.status} · {item.timeControl} · R
                  {item.currentRound}
                </p>
              </div>
              <span className="text-xs font-bold text-ink-muted">→</span>
            </div>
          </Link>
        ))}
        {!list.length && <p className="text-ink-muted">{t.tournaments.empty}</p>}
      </div>
    </div>
  );
}
