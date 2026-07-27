import { Hono } from "hono";
import { and, desc, eq } from "drizzle-orm";
import { activityEvents, tutorMessages } from "@eduforge/db";
import { sanitizeUserText } from "@eduforge/shared";
import { z } from "zod";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { db } from "../db.js";
import { rateLimit } from "../rate-limit.js";
import { xaiChat, xaiConfigured } from "../xai.js";

type Vars = { user: AuthedUser };

export const tutorRoutes = new Hono<{ Variables: Vars }>();

const SYSTEM_UK = `Ти — EduForge Tutor, дружній освітній репетитор.
Курси платформи: English, Chess, Typing, Speed reading, Logic, Programming (HTML→QA path + playground), deep tracks (TypeScript, HTML Semantics, CSS Flex/Grid, QA Theory).
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

const SYSTEM_BY_COURSE: Record<string, string> = {
  programming: SYSTEM_PROGRAMMING,
  typescript: `Ти — EduForge TypeScript Tutor.
Фокус: типи, interface/type, generics, narrowing, utility types, tsconfig.
Давай мінімальні приклади TS (5–20 рядків), пояснюй помилки компілятора простою мовою.
Не підміняй відповіді «any everywhere». UK/EN за запитом.`,
  html_semantics: `Ти — EduForge HTML Semantics Tutor.
Фокус: landmarks (header/nav/main/footer/aside), heading outline, forms a11y (label/for), figure, ARIA first rule.
Показуй семантичний HTML, порівнюй з div-soup. Коротко, з 1 прикладом.`,
  css_layout: `Ти — EduForge CSS Layout Tutor.
Фокус: Flexbox (direction, justify, align, grow/shrink) і CSS Grid (fr, repeat, areas, auto-fit).
Давай 5–15 рядків CSS, пояснюй main vs cross axis. Згадуй коли flex vs grid.`,
  js_fundamentals: `Ти — EduForge JavaScript Tutor.
Фокус: типи, ===, functions, arrays/map/filter, objects, promises/async-await, fetch, DOM.
Мінімальні приклади JS (5–20 рядків), пояснюй «чому».`,
  react_fundamentals: `Ти — EduForge React Tutor.
Фокус: компоненти, props, useState, keys, useEffect, controlled inputs, composition.
Приклади JSX/TSX короткі; не генеруй великі app shells.`,
  sql_fundamentals: `Ти — EduForge SQL Tutor.
Фокус: SELECT/WHERE, ORDER/LIMIT, JOIN, GROUP BY/HAVING, INSERT/UPDATE/DELETE, keys/indexes.
Давай короткі запити (3–10 рядків) і пояснення «чому». Без DROP у продакшен-прикладах без потреби.`,
  node_fundamentals: `Ти — EduForge Node.js Tutor.
Фокус: runtime, CommonJS/ESM, fs/path, process.env, http.createServer, npm scripts, async I/O.
Мінімальні приклади (5–20 рядків). Без небезпечних shell-патернів.`,
  express_fundamentals: `Ти — EduForge Express Tutor.
Фокус: express(), routes (GET/POST/params/query), middleware (use/next, json, static), REST status/json, error middleware (4 args), Router.
Мінімальні приклади (5–20 рядків). Без небезпечних shell-патернів.`,
  qa_theory: `Ти — EduForge QA Theory Tutor.
Фокус: принципи тестування, рівні (unit/integration/system/UAT), види (smoke/regression/…), EP/BVA, STLC, severity vs priority, bug report.
Без копіювання чужих сертифікаційних текстів; свої зрозумілі формулювання + 1 приклад-сценарій.`,
  english: `Ти — EduForge English Tutor. Пояснюй граматику/лексику просто, з 2–3 прикладами речень. UK explanations OK, prompts can be EN.`,
  chess: `Ти — EduForge Chess Tutor. Пояснюй ходи SAN, тактику, ідеї позиції. Без читерських engine dumps — навчальні ідеї.`,
};

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

  const cleanMessage = sanitizeUserText(parsed.data.message, 4000);
  if (!cleanMessage) return c.json({ error: "invalid_input" }, 400);

  // Guardrail: refuse full solution dumps when user asks for answer without attempt context
  const wantsDump =
    /\b(give me the (full )?solution|just the answer|дай повну відповідь|дай готовий код рішення)\b/i.test(
      cleanMessage,
    );

  await db.insert(tutorMessages).values({
    userId: user.id,
    role: "user",
    content: cleanMessage,
    courseSlug: parsed.data.courseSlug ?? null,
  });

  const history = await db.query.tutorMessages.findMany({
    where: eq(tutorMessages.userId, user.id),
    orderBy: [desc(tutorMessages.createdAt)],
    limit: 12,
  });
  const chronological = history.reverse();

  // Last fail context from learning loop
  let failHint = "";
  const lastFail = await db.query.activityEvents.findFirst({
    where: and(
      eq(activityEvents.userId, user.id),
      eq(activityEvents.kind, "lesson_fail_context"),
    ),
    orderBy: [desc(activityEvents.createdAt)],
  });
  if (lastFail?.payload && typeof lastFail.payload === "object") {
    const p = lastFail.payload as {
      courseSlug?: string;
      lessonId?: string;
      wrong?: { type?: string; missing?: unknown }[];
      accuracy?: number;
    };
    const wrongSummary = (p.wrong ?? [])
      .slice(0, 4)
      .map((w) => `${w.type ?? "?"}${w.missing ? ` missing=${JSON.stringify(w.missing)}` : ""}`)
      .join("; ");
    failHint = `Recent fail context: course=${p.courseSlug ?? "?"} accuracy=${p.accuracy ?? "?"} wrong=[${wrongSummary}]. Use this to give targeted hints, not full dumps until the learner tried.`;
  }

  const localeHint =
    parsed.data.locale === "en"
      ? "Prefer English answers."
      : "Prefer Ukrainian answers, English terms allowed.";
  const slug = (parsed.data.courseSlug ?? "").toLowerCase();
  const isCodeMsg =
    /```|\b(html|css|javascript|typescript|react|node|express|sql|git|flexbox|grid)\b/i.test(
      cleanMessage,
    );
  const baseSystem =
    SYSTEM_BY_COURSE[slug] ??
    (isCodeMsg ? SYSTEM_PROGRAMMING : SYSTEM_UK);
  const courseHint = slug
    ? `Focus course slug: ${slug}. Keep answers aligned with EduForge curriculum for that course.`
    : "";
  const guard =
    wantsDump
      ? "User asked for a full solution dump — refuse full answers; give a scaffold, 1–2 hints, and ask them to try first."
      : "Do not dump full solutions on the first ask; prefer Socratic hints and partial scaffolding.";

  const messages = [
    {
      role: "system" as const,
      content: `${baseSystem}\n${localeHint}\n${courseHint}\n${guard}\n${failHint}`,
    },
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
