"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { PageLoading } from "@/components/page-loading";
import { useRequireAuth } from "@/lib/use-require-auth";

type ShopItem = {
  id: string;
  costXp: number;
  kind: string;
  avatarKey?: string;
  owned: boolean;
  canAfford: boolean;
};

export default function ShopPage() {
  const { user, token, loading, setCharacter, refresh } = useAuth();
  const { ready } = useRequireAuth();
  const { t } = useLocale();
  const [balance, setBalance] = useState(0);
  const [freezes, setFreezes] = useState(0);
  const [maxFreezes, setMaxFreezes] = useState(5);
  const [items, setItems] = useState<ShopItem[]>([]);
  const [msg, setMsg] = useState("");
  const [dataLoading, setDataLoading] = useState(true);

  async function load() {
    if (!token) return;
    setDataLoading(true);
    try {
      const d = await api<{
        balanceXp: number;
        streakFreezes: number;
        maxStreakFreezes?: number;
        items: (ShopItem & { freezeFull?: boolean })[];
      }>("/shop", { token });
      setBalance(d.balanceXp);
      setFreezes(d.streakFreezes);
      if (d.maxStreakFreezes) setMaxFreezes(d.maxStreakFreezes);
      setItems(d.items);
    } catch {
      /* keep previous */
    } finally {
      setDataLoading(false);
    }
  }

  useEffect(() => {
    if (token) void load();
  }, [token]);

  async function buy(itemId: string) {
    if (!token) return;
    setMsg("");
    try {
      const d = await api<{ character: NonNullable<ReturnType<typeof useAuth>["character"]> }>(
        "/shop/buy",
        { method: "POST", token, body: { itemId } },
      );
      if (d.character) setCharacter(d.character);
      await refresh();
      await load();
      setMsg(t.shop.success);
    } catch (e) {
      const err = e as Error;
      setMsg(
        err.message === "insufficient_xp"
          ? t.shop.insufficient
          : err.message === "freezes_full"
            ? t.shop.freezesFull
            : t.common.error,
      );
    }
  }

  if (loading || !ready || (dataLoading && !items.length)) {
    return <PageLoading label={t.common.loading} />;
  }
  if (!user) return <PageLoading label={t.common.loading} />;

  function labelFor(id: string) {
    if (id === "heart_one") return t.shop.heartOne;
    if (id === "hearts_full") return t.shop.heartsFull;
    if (id === "streak_freeze") return t.shop.streakFreeze;
    if (id === "streak_shield_pack") return t.shop.streakShieldPack;
    if (id.startsWith("avatar_")) return `${t.shop.avatar}: ${id.replace("avatar_", "")}`;
    return id;
  }

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-3xl font-black">🛒 {t.shop.title}</h1>
        <div className="card !py-3 !px-4 text-sm font-bold">
          <span className="text-ink-muted">{t.shop.balance}:</span>{" "}
          <span className="text-lg text-brand-dark">{balance} XP</span>
          <span className="mx-2 text-slate-300">|</span>
          🛡️ {t.shop.freezes}: {freezes}/{maxFreezes}
        </div>
      </div>
      <p className="text-sm font-bold text-ink-muted">🛡️ {t.shop.shieldHint}</p>
      {msg && <p className="text-sm font-bold text-grape">{msg}</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="card flex flex-col gap-3">
            <div className="text-3xl">
              {item.kind === "avatar"
                ? "🎭"
                : item.kind === "streak_freeze"
                  ? "🛡️"
                  : "❤️"}
            </div>
            <h2 className="font-black text-lg">{labelFor(item.id)}</h2>
            <p className="text-sm font-bold text-ink-muted">{item.costXp} XP</p>
            <button
              type="button"
              className="btn-primary mt-auto"
              disabled={item.owned || !item.canAfford}
              onClick={() => void buy(item.id)}
            >
              {item.owned
                ? t.shop.owned
                : (item as ShopItem & { freezeFull?: boolean }).freezeFull
                  ? t.shop.freezesFull
                  : t.shop.buy}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
