import { Hono } from "hono";
import { desc, eq } from "drizzle-orm";
import { tutorMessages } from "@eduforge/db";
import { z } from "zod";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { rateLimit } from "../rate-limit.js";
import { xaiChat, xaiConfigured } from "../xai.js";

type Vars = { user: AuthedUser };

export const tutorRoutes = new Hono<{ Variables: Vars }>();

const SYSTEM_UK = `Ти — EduForge Tutor, дружній освітній репетитор.
Курси платформи: English, Chess, Typing, Speed reading, Logic, Programming (HTML→QA path + playground).
Відповідай чітко, структуровано, з прикладами. Підтримуй українську та англійську.
Не пиши шкідливого контенту. Якщо питання поза навчанням — м'яко поверни до навчання.
Короткі відповіді (до ~250 слів), якщо не просять детальніше.`;

const SYSTEM_PROGRAMMING = `Ти — EduForge Code Tutor (Programming path).
Стеки path: HTML, CSS, JavaScript, TypeScript, React, Git, Node.js, Express, SQL, QA.
Стиль: як Mimo — короткі пояснення, мінімальний робочий приклад, 1–2 вправи «спробуй сам».
Код оформлюй у fenced blocks з мовою (html/css/js/ts/sql/bash).
Не генеруй великі production-проєкти; фокус на понятті + 5–15 рядків коду.
Виправляй помилки учня, пояснюй «чому», уникай небезпечних команд (rm -rf, curl | sh).
Згадуй playground EduForge (/playground) для експериментів, якщо доречно.
Мови: UK або EN за запитом.`;

tutorRoutes.get("/status", authMiddleware, async (c) => {
  return c.json({
    aiEnabled: xaiConfigured(),
    model: process.env.XAI_MODEL ?? "grok-4.5",
    provider: "spacexai-xai",
  });
});

tutorRoutes.get("/history", authMiddleware, async (c) => {
  const user = c.get("user");
  const rows = await db.query.tutorMessages.findMany({
    where: eq(tutorMessages.userId, user.id),
    orderBy: [desc(tutorMessages.createdAt)],
    limit: 40,
  });
  return c.json({ messages: rows.reverse() });
});

tutorRoutes.delete("/history", authMiddleware, async (c) => {
  const user = c.get("user");
  await db.delete(tutorMessages).where(eq(tutorMessages.userId, user.id));
  return c.json({ ok: true });
});

const chatSchema = z.object({
  message: z.string().min(1).max(4000),
  courseSlug: z.string().max(32).optional().nullable(),
  locale: z.enum(["uk", "en"]).optional(),
});

tutorRoutes.post("/chat", authMiddleware, async (c) => {
  const user = c.get("user");
  const limited = await rateLimit({
    key: `tutor:${user.id}`,
    limit: 20,
    windowMs: 60_000,
  });
  if (!limited.ok) {
    return c.json({ error: "rate_limited", retryAfter: limited.retryAfterSec }, 429);
  }

  const body = await c.req.json().catch(() => null);
  const parsed = chatSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  await db.insert(tutorMessages).values({
    userId: user.id,
    role: "user",
    content: parsed.data.message,
    courseSlug: parsed.data.courseSlug ?? null,
  });

  const history = await db.query.tutorMessages.findMany({
    where: eq(tutorMessages.userId, user.id),
    orderBy: [desc(tutorMessages.createdAt)],
    limit: 12,
  });
  const chronological = history.reverse();

  const localeHint =
    parsed.data.locale === "en"
      ? "Prefer English answers."
      : "Prefer Ukrainian answers, English terms allowed.";
  const slug = parsed.data.courseSlug ?? "";
  const isCode =
    slug === "programming" ||
    /```|\b(html|css|javascript|typescript|react|node|express|sql|git)\b/i.test(
      parsed.data.message,
    );
  const baseSystem = isCode || slug === "programming" ? SYSTEM_PROGRAMMING : SYSTEM_UK;
  const courseHint = slug
    ? `Focus course / unit: ${slug}. Align answers with EduForge Programming path order when relevant.`
    : "";

  const messages = [
    { role: "system" as const, content: `${baseSystem}\n${localeHint}\n${courseHint}` },
    ...chronological.map((m) => ({
      role: (m.role === "assistant" ? "assistant" : "user") as "assistant" | "user",
      content: m.content,
    })),
  ];

  const result = await xaiChat(messages);

  await db.insert(tutorMessages).values({
    userId: user.id,
    role: "assistant",
    content: result.text,
    courseSlug: parsed.data.courseSlug ?? null,
    model: result.model,
  });

  return c.json({
    reply: result.text,
    model: result.model,
    source: result.source,
  });
});
