"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

type Friend = {
  friendshipId: string;
  userId: string;
  displayName: string;
  email: string;
  globalLevel: number;
  globalXp: number;
};

export default function FriendsPage() {
  const { user, token, loading } = useAuth();
  const { t } = useLocale();
  const router = useRouter();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [incoming, setIncoming] = useState<Friend[]>([]);
  const [outgoing, setOutgoing] = useState<Friend[]>([]);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [minisVs, setMinisVs] = useState<{
    totalMinis: number;
    entries: {
      userId: string;
      displayName: string;
      globalLevel: number;
      minisCompleted: number;
      total: number;
      allDone: boolean;
      isSelf: boolean;
      rank: number;
    }[];
  } | null>(null);
  const [raceVs, setRaceVs] = useState<{
    weekKey: string;
    totalRace: number;
    entries: {
      userId: string;
      displayName: string;
      score: number;
      totalRace: number;
      isSelf: boolean;
      rank: number;
    }[];
  } | null>(null);

  async function load() {
    if (!token) return;
    const d = await api<{
      friends: Friend[];
      pendingIncoming: Friend[];
      pendingOutgoing: Friend[];
    }>("/friends", { token });
    setFriends(d.friends);
    setIncoming(d.pendingIncoming);
    setOutgoing(d.pendingOutgoing);
    void api<NonNullable<typeof minisVs>>("/friends/minis", { token })
      .then(setMinisVs)
      .catch(() => setMinisVs(null));
    void api<NonNullable<typeof raceVs>>("/friends/race", { token })
      .then(setRaceVs)
      .catch(() => setRaceVs(null));
  }

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (token) void load().catch(() => undefined);
  }, [token]);

  if (loading || !user) return <p>{t.common.loading}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">👥 {t.social.friends}</h1>

      <div className="card max-w-lg space-y-3">
        <h2 className="font-black">{t.social.addFriend}</h2>
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.social.emailHint}
        />
        <button
          type="button"
          className="btn-primary"
          onClick={() =>
            void api("/friends/request", {
              method: "POST",
              token,
              body: { email },
            })
              .then(() => {
                setEmail("");
                setMsg("OK");
                return load();
              })
              .catch((e: Error) => setMsg(e.message))
          }
        >
          {t.social.addFriend}
        </button>
        {msg && <p className="text-sm font-bold text-sky">{msg}</p>}
      </div>

      {incoming.length > 0 && (
        <section className="card space-y-2">
          <h2 className="font-black">{t.social.pending}</h2>
          {incoming.map((f) => (
            <div key={f.friendshipId} className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold">{f.displayName}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="btn-primary !py-1 !px-3 text-sm"
                  onClick={() =>
                    void api(`/friends/${f.friendshipId}/accept`, {
                      method: "POST",
                      token,
                    }).then(load)
                  }
                >
                  {t.social.accept}
                </button>
                <button
                  type="button"
                  className="btn-secondary !py-1 !px-3 text-sm"
                  onClick={() =>
                    void api(`/friends/${f.friendshipId}/reject`, {
                      method: "POST",
                      token,
                    }).then(load)
                  }
                >
                  {t.social.reject}
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      <section className="card space-y-2">
        <h2 className="font-black">{t.social.friends}</h2>
        {friends.map((f) => (
          <div key={f.friendshipId} className="flex justify-between text-sm font-bold">
            <Link href={`/u/${f.userId}`} className="hover:text-sky">
              {f.displayName}{" "}
              <span className="text-ink-muted font-semibold">L{f.globalLevel}</span>
            </Link>
            <span className="text-ink-muted">{f.globalXp} XP</span>
          </div>
        ))}
        {!friends.length && <p className="text-ink-muted text-sm">{t.social.empty}</p>}
        {outgoing.length > 0 && (
          <p className="text-xs text-ink-muted pt-2">
            Outgoing: {outgoing.map((o) => o.displayName).join(", ")}
          </p>
        )}
      </section>

      {minisVs && minisVs.entries.length > 0 && (
        <section className="card space-y-2 border-sky/30">
          <h2 className="font-black">🧩 {t.social.minisVsFriends}</h2>
          <p className="text-xs font-bold text-ink-muted">{t.social.minisVsHint}</p>
          {minisVs.entries.map((e) => (
            <Link
              key={e.userId}
              href={`/u/${e.userId}`}
              className={`flex justify-between text-sm font-bold rounded-lg px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-900 ${
                e.isSelf ? "bg-sky/10" : ""
              }`}
            >
              <span>
                #{e.rank} {e.displayName}
                {e.isSelf ? ` (${t.social.you})` : ""}
                {e.allDone ? " 🏆" : ""}
              </span>
              <span className="text-ink-muted">
                {e.minisCompleted}/{e.total}
              </span>
            </Link>
          ))}
          <Link href="/programming" className="text-xs font-bold text-sky hover:underline">
            {t.programming.continueCode} →
          </Link>
        </section>
      )}

      {raceVs && raceVs.entries.length > 0 && (
        <section className="card space-y-2 border-grape/30">
          <h2 className="font-black">🏁 {t.social.raceVsFriends}</h2>
          <p className="text-xs font-bold text-ink-muted">
            {t.social.raceVsHint} · {raceVs.weekKey}
          </p>
          {raceVs.entries.map((e) => (
            <Link
              key={e.userId}
              href={`/u/${e.userId}`}
              className={`flex justify-between text-sm font-bold rounded-lg px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-900 ${
                e.isSelf ? "bg-grape/10" : ""
              }`}
            >
              <span>
                #{e.rank} {e.displayName}
                {e.isSelf ? ` (${t.social.you})` : ""}
              </span>
              <span className="text-ink-muted">
                {e.score}/{e.totalRace}
              </span>
            </Link>
          ))}
          <Link href="/programming" className="text-xs font-bold text-grape hover:underline">
            {t.programming.minisRace} →
          </Link>
        </section>
      )}
    </div>
  );
}
