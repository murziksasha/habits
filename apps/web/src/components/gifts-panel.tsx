"use client";

import { useCallback, useEffect, useState } from "react";
import type { GiftDef } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { Badge, Button, Skeleton } from "@/components/ui";

type FriendRow = {
  userId: string;
  displayName: string;
  status?: string;
};

type InboxGift = {
  id: string;
  giftKey: string;
  message?: string | null;
  fromDisplayName: string;
  payload?: Record<string, unknown>;
  def: GiftDef | null;
};

export function GiftsPanel({ friends }: { friends: FriendRow[] }) {
  const { token, setCharacter, refresh } = useAuth();
  const { locale } = useLocale();
  const en = locale === "en";
  const [catalog, setCatalog] = useState<GiftDef[]>([]);
  const [inbox, setInbox] = useState<InboxGift[]>([]);
  const [toUserId, setToUserId] = useState("");
  const [giftKey, setGiftKey] = useState("cheer");
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    if (!token) return;
    try {
      const [cat, box] = await Promise.all([
        api<{ gifts: GiftDef[] }>("/gifts/catalog", { token }),
        api<{ gifts: InboxGift[] }>("/gifts/inbox", { token }),
      ]);
      setCatalog(cat.gifts ?? []);
      setInbox(box.gifts ?? []);
      if (!toUserId && friends[0]) setToUserId(friends[0].userId);
    } catch {
      /* ignore */
    }
  }, [token, friends, toUserId]);

  useEffect(() => {
    void load();
  }, [load]);

  async function send() {
    if (!token || !toUserId || busy) return;
    setBusy(true);
    setMsg("");
    try {
      await api("/gifts/send", {
        method: "POST",
        token,
        body: { toUserId, giftKey, message: message || undefined },
      });
      await refresh();
      setMessage("");
      setMsg(en ? "Gift sent!" : "Подарунок надіслано!");
      await load();
    } catch (e) {
      const err = (e as Error).message;
      setMsg(
        err === "insufficient_xp"
          ? en
            ? "Not enough XP"
            : "Недостатньо XP"
          : err === "daily_limit"
            ? en
              ? "Daily gift limit"
              : "Денний ліміт подарунків"
            : err === "not_friends"
              ? en
                ? "Not friends"
                : "Не друзі"
              : en
                ? "Send failed"
                : "Не вдалося надіслати",
      );
    } finally {
      setBusy(false);
    }
  }

  async function claim(id: string) {
    if (!token || busy) return;
    setBusy(true);
    try {
      const d = await api<{ character?: Parameters<typeof setCharacter>[0] }>(
        `/gifts/claim/${id}`,
        { method: "POST", token },
      );
      if (d.character) setCharacter(d.character);
      await refresh();
      setMsg(en ? "Gift claimed!" : "Подарунок отримано!");
      await load();
    } catch {
      setMsg(en ? "Claim failed" : "Помилка отримання");
    } finally {
      setBusy(false);
    }
  }

  if (!catalog.length && !inbox.length) {
    return <Skeleton className="h-32 w-full" />;
  }

  const selected = catalog.find((g) => g.id === giftKey);

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-black">{en ? "Gifts" : "Подарунки"}</h2>
        {inbox.length > 0 && <Badge tone="brand">{inbox.length}</Badge>}
      </div>

      {inbox.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-black">{en ? "Inbox" : "Вхідні"}</h3>
          <ul className="space-y-2">
            {inbox.map((g) => (
              <li
                key={g.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-feather/10 p-3"
              >
                <div>
                  <p className="font-bold">
                    {g.def?.icon ?? "🎁"} {g.fromDisplayName}:{" "}
                    {en ? g.def?.titleEn : g.def?.titleUk}
                  </p>
                  {g.message && (
                    <p className="text-xs text-ink-muted">“{g.message}”</p>
                  )}
                </div>
                <Button size="sm" disabled={busy} onClick={() => void claim(g.id)}>
                  {en ? "Claim" : "Забрати"}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-sm font-black">{en ? "Send to friend" : "Надіслати другу"}</h3>
        {friends.length === 0 ? (
          <p className="text-sm text-ink-muted">
            {en ? "Add friends to send gifts." : "Додайте друзів, щоб дарувати."}
          </p>
        ) : (
          <>
            <label className="block text-xs font-bold text-ink-muted">
              {en ? "Friend" : "Друг"}
              <select
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                value={toUserId}
                onChange={(e) => setToUserId(e.target.value)}
              >
                {friends.map((f) => (
                  <option key={f.userId} value={f.userId}>
                    {f.displayName}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-bold text-ink-muted">
              {en ? "Gift" : "Подарунок"}
              <select
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                value={giftKey}
                onChange={(e) => setGiftKey(e.target.value)}
              >
                {catalog.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.icon} {en ? g.titleEn : g.titleUk}
                    {g.costXp > 0 ? ` (−${g.costXp} XP)` : en ? " (free)" : " (безк.)"}
                  </option>
                ))}
              </select>
            </label>
            {selected && (
              <p className="text-xs text-ink-muted">
                {en ? selected.descEn : selected.descUk}
                {selected.rarity ? ` · ${selected.rarity}` : ""}
              </p>
            )}
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
              placeholder={en ? "Optional message" : "Повідомлення (опц.)"}
              value={message}
              maxLength={280}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button disabled={busy || !toUserId} onClick={() => void send()}>
              {en ? "Send gift" : "Надіслати"}
            </Button>
          </>
        )}
      </div>

      {msg && <p className="text-sm font-bold text-sky">{msg}</p>}
    </div>
  );
}
