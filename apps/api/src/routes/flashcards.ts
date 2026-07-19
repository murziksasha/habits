import { Hono } from "hono";
import { and, asc, eq, or, sql } from "drizzle-orm";
import {
  characters,
  flashcardDecks,
  flashcardReviews,
  flashcards,
  flashcardStates,
} from "@eduforge/db";
import {
  applySrsRating,
  defaultSrsState,
  levelFromXp,
  nextReviewDate,
  type SrsRating,
} from "@eduforge/shared";
import { z } from "zod";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { logActivity } from "../engagement.js";

type Vars = { user: AuthedUser };

export const flashcardRoutes = new Hono<{ Variables: Vars }>();

flashcardRoutes.get("/decks", authMiddleware, async (c) => {
  const user = c.get("user");
  const decks = await db.query.flashcardDecks.findMany({
    where: or(
      eq(flashcardDecks.isSystem, true),
      eq(flashcardDecks.ownerUserId, user.id),
    ),
    orderBy: [asc(flashcardDecks.titleUk)],
  });

  const dueCounts = await db
    .select({
      deckId: flashcards.deckId,
      due: sql<number>`count(*) filter (where ${flashcardStates.nextReviewAt} is null or ${flashcardStates.nextReviewAt} <= now())::int`,
      total: sql<number>`count(*)::int`,
    })
    .from(flashcards)
    .leftJoin(
      flashcardStates,
      and(
        eq(flashcardStates.cardId, flashcards.id),
        eq(flashcardStates.userId, user.id),
      ),
    )
    .groupBy(flashcards.deckId);

  const map = new Map(dueCounts.map((r) => [r.deckId, r]));
  return c.json({
    decks: decks.map((d) => ({
      ...d,
      cardCount: map.get(d.id)?.total ?? 0,
      dueCount: map.get(d.id)?.due ?? map.get(d.id)?.total ?? 0,
    })),
  });
});

flashcardRoutes.get("/decks/:deckId", authMiddleware, async (c) => {
  const deckId = c.req.param("deckId") as string;
  const deck = await db.query.flashcardDecks.findFirst({
    where: eq(flashcardDecks.id, deckId),
  });
  if (!deck) return c.json({ error: "not_found" }, 404);
  const cards = await db.query.flashcards.findMany({
    where: eq(flashcards.deckId, deckId),
    orderBy: [asc(flashcards.sortOrder)],
  });
  return c.json({ deck, cards });
});

flashcardRoutes.get("/due", authMiddleware, async (c) => {
  const user = c.get("user");
  const deckId = c.req.query("deckId");
  const limit = Math.min(50, Number(c.req.query("limit") ?? 20));
  const now = new Date();

  // Cards with no state yet are due; cards with nextReviewAt <= now are due
  const allCards = await db
    .select({
      id: flashcards.id,
      deckId: flashcards.deckId,
      front: flashcards.front,
      back: flashcards.back,
      hint: flashcards.hint,
      tags: flashcards.tags,
      nextReviewAt: flashcardStates.nextReviewAt,
      ease: flashcardStates.ease,
      intervalDays: flashcardStates.intervalDays,
      repetitions: flashcardStates.repetitions,
    })
    .from(flashcards)
    .leftJoin(
      flashcardStates,
      and(
        eq(flashcardStates.cardId, flashcards.id),
        eq(flashcardStates.userId, user.id),
      ),
    )
    .where(deckId ? eq(flashcards.deckId, deckId) : sql`true`)
    .orderBy(asc(flashcards.sortOrder));

  const due = allCards
    .filter((row) => !row.nextReviewAt || row.nextReviewAt <= now)
    .slice(0, limit);

  return c.json({ cards: due, count: due.length });
});

const reviewSchema = z.object({
  cardId: z.string().uuid(),
  /** 1 again, 2 hard, 3 good, 4 easy */
  rating: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
});

flashcardRoutes.post("/review", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const card = await db.query.flashcards.findFirst({
    where: eq(flashcards.id, parsed.data.cardId),
  });
  if (!card) return c.json({ error: "not_found" }, 404);

  let state = await db.query.flashcardStates.findFirst({
    where: and(
      eq(flashcardStates.userId, user.id),
      eq(flashcardStates.cardId, card.id),
    ),
  });

  const prev = state
    ? {
        ease: state.ease,
        intervalDays: state.intervalDays,
        repetitions: state.repetitions,
        lapses: state.lapses,
      }
    : defaultSrsState();

  const next = applySrsRating(prev, parsed.data.rating as SrsRating);
  const now = new Date();
  const nextAt = nextReviewDate(now, next.nextIntervalDays);

  if (state) {
    const [updated] = await db
      .update(flashcardStates)
      .set({
        ease: next.ease,
        intervalDays: next.intervalDays,
        repetitions: next.repetitions,
        lapses: next.lapses,
        nextReviewAt: nextAt,
        lastReviewedAt: now,
        lastRating: parsed.data.rating,
      })
      .where(eq(flashcardStates.id, state.id))
      .returning();
    state = updated;
  } else {
    const [created] = await db
      .insert(flashcardStates)
      .values({
        userId: user.id,
        cardId: card.id,
        ease: next.ease,
        intervalDays: next.intervalDays,
        repetitions: next.repetitions,
        lapses: next.lapses,
        nextReviewAt: nextAt,
        lastReviewedAt: now,
        lastRating: parsed.data.rating,
      })
      .returning();
    state = created;
  }

  await db.insert(flashcardReviews).values({
    userId: user.id,
    cardId: card.id,
    rating: parsed.data.rating,
  });

  // small XP reward for good reviews
  let xpGain = 0;
  if (parsed.data.rating >= 3) {
    xpGain = parsed.data.rating === 4 ? 2 : 1;
    const ch = await db.query.characters.findFirst({
      where: eq(characters.userId, user.id),
    });
    if (ch && xpGain > 0) {
      const globalXp = ch.globalXp + xpGain;
      await db
        .update(characters)
        .set({ globalXp, globalLevel: levelFromXp(globalXp) })
        .where(eq(characters.id, ch.id));
    }
  }

  await logActivity(db, user.id, "flashcard_review", {
    cardId: card.id,
    rating: parsed.data.rating,
    intervalDays: next.intervalDays,
  });

  return c.json({
    state,
    nextReviewAt: nextAt,
    xpGain,
  });
});

flashcardRoutes.get("/stats", authMiddleware, async (c) => {
  const user = c.get("user");
  const [agg] = await db
    .select({
      reviews: sql<number>`count(*)::int`,
      last7: sql<number>`count(*) filter (where ${flashcardReviews.createdAt} > now() - interval '7 days')::int`,
    })
    .from(flashcardReviews)
    .where(eq(flashcardReviews.userId, user.id));

  const [states] = await db
    .select({
      learning: sql<number>`count(*)::int`,
      mature: sql<number>`count(*) filter (where ${flashcardStates.intervalDays} >= 21)::int`,
    })
    .from(flashcardStates)
    .where(eq(flashcardStates.userId, user.id));

  return c.json({
    totalReviews: agg?.reviews ?? 0,
    reviewsLast7Days: agg?.last7 ?? 0,
    cardsLearning: states?.learning ?? 0,
    cardsMature: states?.mature ?? 0,
  });
});

const createCardSchema = z.object({
  deckId: z.string().uuid(),
  front: z.string().min(1).max(2000),
  back: z.string().min(1).max(2000),
  hint: z.string().max(500).optional(),
});

flashcardRoutes.post("/cards", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json().catch(() => null);
  const parsed = createCardSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const deck = await db.query.flashcardDecks.findFirst({
    where: eq(flashcardDecks.id, parsed.data.deckId),
  });
  if (!deck) return c.json({ error: "not_found" }, 404);
  if (deck.isSystem && user.role !== "admin") {
    return c.json({ error: "forbidden" }, 403);
  }
  if (!deck.isSystem && deck.ownerUserId !== user.id) {
    return c.json({ error: "forbidden" }, 403);
  }

  const [card] = await db
    .insert(flashcards)
    .values({
      deckId: deck.id,
      front: parsed.data.front,
      back: parsed.data.back,
      hint: parsed.data.hint ?? "",
    })
    .returning();
  return c.json({ card }, 201);
});
