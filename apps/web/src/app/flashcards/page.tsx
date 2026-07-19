"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { pickLocale } from "@eduforge/shared";

type Deck = {
  id: string;
  slug: string;
  titleUk: string;
  titleEn: string;
  descriptionUk: string;
  descriptionEn: string;
  courseSlug: string | null;
  cardCount: number;
  dueCount: number;
};

export default function FlashcardsPage() {
  const { user, token, loading } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const [decks, setDecks] = useState<Deck[]>([]);
  const [stats, setStats] = useState({
    totalReviews: 0,
    reviewsLast7Days: 0,
    cardsLearning: 0,
    cardsMature: 0,
  });

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token) return;
    void api<{ decks: Deck[] }>("/flashcards/decks", { token })
      .then((d) => setDecks(d.decks))
      .catch(() => setDecks([]));
    void api<typeof stats>("/flashcards/stats", { token })
      .then(setStats)
      .catch(() => undefined);
  }, [token]);

  if (loading || !user) return <p>{t.common.loading}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">🃏 {t.flashcards.title}</h1>

      <div className="grid gap-3 sm:grid-cols-4">
        <div className="card">
          <p className="text-xs font-bold text-ink-muted">{t.flashcards.reviews}</p>
          <p className="text-2xl font-black">{stats.totalReviews}</p>
        </div>
        <div className="card">
          <p className="text-xs font-bold text-ink-muted">7d</p>
          <p className="text-2xl font-black">{stats.reviewsLast7Days}</p>
        </div>
        <div className="card">
          <p className="text-xs font-bold text-ink-muted">{t.flashcards.stats}</p>
          <p className="text-2xl font-black">{stats.cardsLearning}</p>
        </div>
        <div className="card">
          <p className="text-xs font-bold text-ink-muted">{t.flashcards.mature}</p>
          <p className="text-2xl font-black text-green-600">{stats.cardsMature}</p>
        </div>
      </div>

      <h2 className="text-xl font-black">{t.flashcards.decks}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {decks.map((d) => (
          <div key={d.id} className="card space-y-2">
            <h3 className="text-lg font-black">
              {pickLocale(locale, d.titleUk, d.titleEn)}
            </h3>
            <p className="text-sm text-ink-muted">
              {pickLocale(locale, d.descriptionUk, d.descriptionEn)}
            </p>
            <p className="text-sm font-bold">
              {d.cardCount} cards · {t.flashcards.due}: {d.dueCount}
            </p>
            <Link href={`/flashcards/${d.id}`} className="btn-primary inline-flex">
              {t.flashcards.start}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
