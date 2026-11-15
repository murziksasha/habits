"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { PageLoading } from "@/components/page-loading";
import { EmptyState } from "@/components/ui";
import { useRequireAuth } from "@/lib/use-require-auth";

export function TournamentDetailClient() {
  const { id } = useParams<{ id: string }>();
  const { user, token, loading } = useAuth();
  const { ready } = useRequireAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const [data, setData] = useState<{
    tournament: {
      id: string;
      titleUk: string;
      titleEn: string;
      status: string;
      hostUserId: string;
      currentRound: number;
      timeControl: string;
    };
    players: {
      userId: string;
      score: number;
      displayName: string | null;
      elo: number | null;
    }[];
    pairings: {
      id: string;
      round: number;
      whiteId: string | null;
      blackId: string | null;
      gameId: string | null;
      result: string | null;
    }[];
  } | null>(null);

  async function load() {
    const d = await api<NonNullable<typeof data>>(`/tournaments/${id}`, {
      token: token ?? undefined,
    });
    setData(d);
  }

  useEffect(() => {
    if (id) void load().catch(() => setData(null));
  }, [id, token]);

  if (loading || !ready) return <PageLoading label={t.common.loading} />;
  if (!user) return <PageLoading label={t.common.loading} />;
  if (!data) {
    return (
      <EmptyState
        title={locale === "en" ? "Tournament not found" : "Турнір не знайдено"}
        actionHref="/tournaments"
        actionLabel={t.tournaments.title}
      />
    );
  }

  const { tournament: tr, players, pairings } = data;
  const isHost = tr.hostUserId === user.id || user.role === "admin";
  const joined = players.some((p) => p.userId === user.id);

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <Link href="/tournaments" className="text-sm font-bold text-ink-muted">
        ← {t.common.back}
      </Link>
      <div className="card space-y-2">
        <h1 className="text-3xl font-black">
          {locale === "en" && tr.titleEn ? tr.titleEn : tr.titleUk}
        </h1>
        <p className="text-ink-muted">
          {t.tournaments.status}: <strong>{tr.status}</strong> · {tr.timeControl} ·{" "}
          {t.tournaments.round} {tr.currentRound}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {!joined && tr.status === "registration" && (
            <button
              type="button"
              className="btn-primary"
              onClick={() =>
                void api(`/tournaments/${tr.id}/join`, { method: "POST", token }).then(load)
              }
            >
              {t.tournaments.join}
            </button>
          )}
          {isHost && (
            <>
              <button
                type="button"
                className="btn-sky"
                onClick={() =>
                  void api(`/tournaments/${tr.id}/pair`, { method: "POST", token }).then(load)
                }
              >
                {t.tournaments.pair}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() =>
                  void api(`/tournaments/${tr.id}/finish`, { method: "POST", token }).then(load)
                }
              >
                {t.tournaments.finish}
              </button>
            </>
          )}
        </div>
      </div>

      <section className="card">
        <h2 className="font-black mb-3">{t.tournaments.players}</h2>
        <ul className="space-y-2">
          {players.map((p, i) => (
            <li key={p.userId} className="flex justify-between text-sm font-bold">
              <span>
                #{i + 1} {p.displayName ?? p.userId.slice(0, 8)} ({p.elo ?? "—"})
              </span>
              <span>
                {t.tournaments.score}: {p.score}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="card space-y-3">
        <h2 className="font-black">{t.tournaments.round}s</h2>
        {pairings.map((pr) => (
          <div
            key={pr.id}
            className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-100 p-3 text-sm"
          >
            <span className="font-bold">
              R{pr.round}: {pr.whiteId?.slice(0, 6)} vs {pr.blackId?.slice(0, 6) ?? "BYE"}
            </span>
            <span>{pr.result ?? "—"}</span>
            {!pr.result && pr.blackId && (isHost || pr.whiteId === user.id || pr.blackId === user.id) && (
              <div className="flex gap-1">
                {(["1-0", "0-1", "1/2-1/2"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    className="btn-secondary !py-1 !px-2 text-xs"
                    onClick={() =>
                      void api(`/tournaments/${tr.id}/pairings/${pr.id}/result`, {
                        method: "POST",
                        token,
                        body: { result: r },
                      }).then(load)
                    }
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
            {pr.gameId && (
              <Link href={`/play?invite=${pr.gameId}`} className="text-sky font-bold text-xs">
                game
              </Link>
            )}
          </div>
        ))}
        {!pairings.length && <p className="text-ink-muted text-sm">—</p>}
      </section>
    </div>
  );
}
