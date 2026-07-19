"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { SpeakButton } from "@/components/speak-button";

type Card = {
  id: string;
  front: string;
  back: string;
  hint: string;
};

export default function DeckStudyPage() {
  const { deckId } = useParams<{ deckId: string }>();
  const { user, token, loading, refresh } = useAuth();
  const { t } = useLocale();
  const router = useRouter();
  const [queue, setQueue] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(0);
  const [xp, setXp] = useState(0);

  const load = useCallback(async () => {
    if (!token || !deckId) return;
    const d = await api<{ cards: Card[] }>(
      `/flashcards/due?deckId=${deckId}&limit=30`,
      { token },
    );
    setQueue(d.cards);
    setFlipped(false);
  }, [token, deckId]);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    void load().catch(() => setQueue([]));
  }, [load]);

  async function rate(rating: 1 | 2 | 3 | 4) {
    if (!token || !queue[0]) return;
    const card = queue[0];
    try {
      const r = await api<{ xpGain: number }>("/flashcards/review", {
        method: "POST",
        token,
        body: { cardId: card.id, rating },
      });
      setDone((n) => n + 1);
      setXp((x) => x + (r.xpGain ?? 0));
      setQueue((q) => q.slice(1));
      setFlipped(false);
      if (r.xpGain) void refresh();
    } catch {
      /* ignore */
    }
  }

  if (loading || !user) return <p>{t.common.loading}</p>;

  const current = queue[0];

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/flashcards" className="text-sm font-bold text-ink-muted">
          ← {t.flashcards.decks}
        </Link>
        <span className="text-sm font-bold">
          {done} done · +{xp} XP · {queue.length} left
        </span>
      </div>

      {!current ? (
        <div className="card text-center space-y-3">
          <p className="text-xl font-black">{t.flashcards.empty}</p>
          <button type="button" className="btn-secondary" onClick={() => void load()}>
            Reload
          </button>
          <Link href="/flashcards" className="btn-primary inline-flex">
            {t.common.back}
          </Link>
        </div>
      ) : (
        <>
          <button
            type="button"
            className="card w-full min-h-[220px] text-center space-y-4"
            onClick={() => setFlipped(true)}
          >
            <p className="text-xs font-bold text-ink-muted uppercase tracking-wide">
              {flipped ? "Back" : "Front"}
            </p>
            <p className="text-2xl font-black">{flipped ? current.back : current.front}</p>
            <div onClick={(e) => e.stopPropagation()}>
              <SpeakButton
                text={flipped ? current.back : current.front}
                lang={flipped ? "uk-UA" : "en-US"}
                showPractice={!flipped}
              />
            </div>
            {!flipped && current.hint && (
              <p className="text-sm text-ink-muted">💡 {current.hint}</p>
            )}
            {!flipped && (
              <p className="text-sm font-bold text-sky">{t.flashcards.showAnswer}</p>
            )}
          </button>

          {flipped && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <button type="button" className="btn-secondary !bg-red-50" onClick={() => void rate(1)}>
                {t.flashcards.again}
              </button>
              <button type="button" className="btn-secondary" onClick={() => void rate(2)}>
                {t.flashcards.hard}
              </button>
              <button type="button" className="btn-primary" onClick={() => void rate(3)}>
                {t.flashcards.good}
              </button>
              <button type="button" className="btn-primary !bg-grape" onClick={() => void rate(4)}>
                {t.flashcards.easy}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
