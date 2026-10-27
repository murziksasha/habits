"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { Badge, Button, EmptyState } from "@/components/ui";
import { PageLoading } from "@/components/page-loading";

type FamilyMe = {
  role: "owner" | "child" | "none";
  maxSeats?: number;
  childCount?: number;
  members?: {
    memberUserId: string;
    role: string;
    displayName: string | null;
    email: string | null;
  }[];
  pendingInvites?: { inviteCode: string; expiresAt: string }[];
  owner?: { id: string; email: string; displayName: string | null };
};

function FamilyBody() {
  const { user, token, loading, refresh } = useAuth();
  const { locale } = useLocale();
  const router = useRouter();
  const params = useSearchParams();
  const [data, setData] = useState<FamilyMe | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [claim, setClaim] = useState(params.get("claim") ?? "");
  const en = locale === "en";

  async function load() {
    if (!token) return;
    const d = await api<FamilyMe>("/family/me", { token });
    setData(d);
  }

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token) return;
    void load().catch(() => setData({ role: "none" }));
  }, [token]);

  useEffect(() => {
    const c = params.get("claim");
    if (c) setClaim(c);
  }, [params]);

  async function activate() {
    if (!token) return;
    setBusy(true);
    setMsg("");
    try {
      await api("/family/activate", { method: "POST", token, body: { seats: 4 } });
      await refresh();
      await load();
      setMsg(en ? "Family group created." : "Сімейну групу створено.");
    } catch {
      setMsg(en ? "Could not activate" : "Не вдалося активувати");
    } finally {
      setBusy(false);
    }
  }

  async function invite() {
    if (!token) return;
    setBusy(true);
    try {
      const r = await api<{ inviteCode: string }>("/family/invite", {
        method: "POST",
        token,
      });
      await load();
      setMsg(
        en
          ? `Invite code: ${r.inviteCode} (share with child)`
          : `Код запрошення: ${r.inviteCode}`,
      );
    } catch {
      setMsg(en ? "Seats full or error" : "Місця зайняті або помилка");
    } finally {
      setBusy(false);
    }
  }

  async function claimInvite() {
    if (!token || !claim) return;
    setBusy(true);
    try {
      await api("/family/claim", {
        method: "POST",
        token,
        body: { inviteCode: claim.trim() },
      });
      await refresh();
      await load();
      setMsg(en ? "Joined family group." : "Приєднано до сімейної групи.");
    } catch {
      setMsg(en ? "Invalid or expired code" : "Невірний або прострочений код");
    } finally {
      setBusy(false);
    }
  }

  async function removeMember(id: string) {
    if (!token) return;
    setBusy(true);
    try {
      await api(`/family/members/${id}`, { method: "DELETE", token });
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function leave() {
    if (!token) return;
    setBusy(true);
    try {
      await api("/family/leave", { method: "POST", token });
      await refresh();
      await load();
    } finally {
      setBusy(false);
    }
  }

  if (loading || !user) return <PageLoading />;
  if (!data) return <PageLoading />;

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-3xl font-black">
          👪 {en ? "Family group" : "Сімейна група"}
        </h1>
        <p className="font-bold text-ink-muted">
          {en
            ? "Free family group for up to 4 members."
            : "Безкоштовна сімейна група до 4 учасників."}
        </p>
      </div>

      {data.role === "none" && (
        <div className="card space-y-3">
          <p className="font-bold">
            {en
              ? "Create a free family group or join with a code."
              : "Створіть безкоштовну сімейну групу або введіть код."}
          </p>
          <Button disabled={busy} onClick={() => void activate()}>
            {en ? "Create family group" : "Створити сімейну групу"}
          </Button>
          <div className="border-t pt-3 space-y-2">
            <p className="text-sm font-black">
              {en ? "Have an invite?" : "Є запрошення?"}
            </p>
            <input
              className="input font-mono"
              value={claim}
              onChange={(e) => setClaim(e.target.value.toUpperCase())}
              placeholder="INVITE CODE"
            />
            <Button
              variant="secondary"
              disabled={busy || claim.length < 12}
              onClick={() => void claimInvite()}
            >
              {en ? "Join family" : "Приєднатися"}
            </Button>
          </div>
        </div>
      )}

      {data.role === "owner" && (
        <div className="space-y-4">
          <div className="card space-y-2">
            <div className="flex flex-wrap gap-2">
              <Badge tone="grape">Family owner</Badge>
              <Badge tone="brand">
                {data.childCount ?? 0}/{data.maxSeats ?? 4} {en ? "seats" : "місць"}
              </Badge>
            </div>
            <Button disabled={busy} onClick={() => void invite()}>
              {en ? "Create child invite" : "Створити запрошення"}
            </Button>
            {data.pendingInvites?.map((p) => (
              <p key={p.inviteCode} className="font-mono text-sm font-bold">
                {p.inviteCode}{" "}
                <span className="text-ink-muted font-sans text-xs">
                  exp {new Date(p.expiresAt).toLocaleDateString()}
                </span>
              </p>
            ))}
          </div>
          <div className="card space-y-2">
            <h2 className="font-black">{en ? "Members" : "Учасники"}</h2>
            {(data.members ?? []).length === 0 ? (
              <EmptyState
                title={en ? "No members yet" : "Ще немає учасників"}
                description={en ? "Share an invite code." : "Поділіться кодом."}
              />
            ) : (
              <ul className="space-y-2">
                {(data.members ?? []).map((m) => (
                  <li
                    key={m.memberUserId}
                    className="flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-sm font-bold"
                  >
                    <span>
                      {m.displayName || m.email}{" "}
                      <Badge tone="muted">{m.role}</Badge>
                    </span>
                    {m.role === "child" && (
                      <Button
                        size="sm"
                        variant="danger"
                        disabled={busy}
                        onClick={() => void removeMember(m.memberUserId)}
                      >
                        {en ? "Remove" : "Видалити"}
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {data.role === "child" && (
        <div className="card space-y-3">
          <Badge tone="brand">{en ? "Family member" : "Учасник сімʼї"}</Badge>
          <p className="font-bold">
            {en ? "Owner:" : "Власник:"}{" "}
            {data.owner?.displayName || data.owner?.email || "—"}
          </p>
          <Button variant="secondary" disabled={busy} onClick={() => void leave()}>
            {en ? "Leave family" : "Покинути сімʼю"}
          </Button>
        </div>
      )}

      {msg && <p className="text-sm font-bold text-sky">{msg}</p>}
    </div>
  );
}

export function FamilyClient() {
  return (
    <Suspense fallback={<PageLoading />}>
      <FamilyBody />
    </Suspense>
  );
}
