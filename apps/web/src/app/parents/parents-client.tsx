"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

export function ParentsClient() {
  const { user, token, loading } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const [children, setChildren] = useState<
    {
      linkId: string;
      userId: string;
      displayName: string;
      globalLevel: number;
      globalXp: number;
      streakDays: number;
      dailyXp: number;
      dailyGoalXp: number;
    }[]
  >([]);
  const [myParents, setMyParents] = useState<
    { linkId: string; displayName: string }[]
  >([]);
  const [pendingCode, setPendingCode] = useState<string | null>(null);
  const [claimCode, setClaimCode] = useState("");
  const [msg, setMsg] = useState("");

  async function load() {
    if (!token) return;
    const kids = await api<{ children: typeof children }>("/parents/children", {
      token,
    });
    setChildren(kids.children);
    const p = await api<{
      parents: typeof myParents;
      pendingInviteCode: string | null;
    }>("/parents/parents", { token });
    setMyParents(p.parents);
    setPendingCode(p.pendingInviteCode);
  }

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (token) void load().catch(() => undefined);
  }, [token]);

  if (loading || !user) {
    return (
      <div className="space-y-4" aria-busy="true">
        <div className="h-10 w-48 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-32 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <p className="sr-only">{t.common.loading}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-black">👪 {t.parents.title}</h1>
        <p className="text-sm font-bold text-ink-muted">
          {locale === "en"
            ? "Parent home: children, invites, digests."
            : "Кабінет батьків: діти, запрошення, дайджести."}
        </p>
        <div className="flex flex-wrap gap-2">
          <Link href="/family" className="btn-secondary !py-2 !px-3 text-sm min-h-11">
            👨‍👩‍👧‍👦 {locale === "en" ? "Family plan" : "Сімейний план"}
          </Link>
          <Link href="/reports" className="btn-secondary !py-2 !px-3 text-sm min-h-11">
            📊 {t.nav.reports}
          </Link>
          <Link href="/learn" className="btn-secondary !py-2 !px-3 text-sm min-h-11">
            🗺️ {t.nav.learn}
          </Link>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card space-y-3">
          <h2 className="font-black">{t.parents.generateInvite}</h2>
          <p className="text-sm text-ink-muted">
            Student: generate a code → parent claims it.
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={() =>
              void api<{ inviteCode: string }>("/parents/invite", {
                method: "POST",
                token,
              }).then((d) => {
                setPendingCode(d.inviteCode);
                setMsg(d.inviteCode);
              })
            }
          >
            {t.parents.generateInvite}
          </button>
          {pendingCode && (
            <div className="flex items-center gap-2">
              <code className="rounded-xl bg-slate-100 px-3 py-2 font-mono font-black">
                {pendingCode}
              </code>
              <button
                type="button"
                className="btn-secondary !py-2 text-sm"
                onClick={() => void navigator.clipboard.writeText(pendingCode)}
              >
                {t.parents.copyCode}
              </button>
            </div>
          )}
        </div>

        <div className="card space-y-3">
          <h2 className="font-black">{t.parents.claimInvite}</h2>
          <input
            className="input font-mono uppercase"
            value={claimCode}
            onChange={(e) => setClaimCode(e.target.value)}
            placeholder={t.parents.inviteCode}
          />
          <button
            type="button"
            className="btn-sky"
            onClick={() =>
              void api("/parents/claim", {
                method: "POST",
                token,
                body: { inviteCode: claimCode },
              })
                .then(() => {
                  setClaimCode("");
                  setMsg("OK");
                  return load();
                })
                .catch((e: Error) => setMsg(e.message))
            }
          >
            {t.parents.claimInvite}
          </button>
        </div>
      </div>

      {msg && <p className="text-sm font-bold text-sky">{msg}</p>}

      <section className="card space-y-2">
        <h2 className="font-black">{t.parents.children}</h2>
        {children.map((c) => (
          <Link
            key={c.linkId}
            href={`/parents/child/${c.userId}`}
            className="flex justify-between rounded-xl border border-slate-100 p-3 font-bold hover:border-brand/40"
          >
            <span>
              {c.displayName}{" "}
              <span className="text-ink-muted text-sm">L{c.globalLevel}</span>
            </span>
            <span className="text-sm text-ink-muted">
              {c.dailyXp}/{c.dailyGoalXp} daily · 🔥{c.streakDays}
            </span>
          </Link>
        ))}
        {!children.length && (
          <p className="text-sm text-ink-muted">{t.parents.empty}</p>
        )}
      </section>

      <section className="card space-y-2">
        <h2 className="font-black">{t.parents.myParents}</h2>
        {myParents.map((p) => (
          <div key={p.linkId} className="flex justify-between text-sm font-bold">
            <span>{p.displayName}</span>
            <button
              type="button"
              className="text-red-500"
              onClick={() =>
                void api(`/parents/links/${p.linkId}/revoke`, {
                  method: "POST",
                  token,
                }).then(load)
              }
            >
              {t.parents.revoke}
            </button>
          </div>
        ))}
        {!myParents.length && (
          <p className="text-sm text-ink-muted">{t.parents.empty}</p>
        )}
      </section>
    </div>
  );
}
