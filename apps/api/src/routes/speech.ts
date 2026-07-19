import { Hono } from "hono";
import { z } from "zod";
import { authMiddleware, type AuthedUser } from "../auth.js";
import { rateLimit } from "../rate-limit.js";

type Vars = { user: AuthedUser };

/**
 * Pronunciation helpers.
 * Primary: client Web Speech API (speechSynthesis + SpeechRecognition).
 * This route returns normalized IPA-ish tips + SSML-friendly text for free TTS.
 */
export const speechRoutes = new Hono<{ Variables: Vars }>();

const tipSchema = z.object({
  text: z.string().min(1).max(500),
  lang: z.enum(["en-US", "en-GB", "uk-UA"]).optional().default("en-US"),
});

speechRoutes.post("/pronounce-tip", authMiddleware, async (c) => {
  const user = c.get("user");
  const rl = await rateLimit({
    key: `speech:${user.id}`,
    limit: 60,
    windowMs: 60_000,
  });
  if (!rl.ok) {
    return c.json({ error: "rate_limited", retryAfter: rl.retryAfterSec }, 429);
  }

  const body = await c.req.json().catch(() => null);
  const parsed = tipSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const text = parsed.data.text.trim();
  const lang = parsed.data.lang;
  const words = text.split(/\s+/).filter(Boolean);

  // Lightweight teaching tips (no external TTS bill)
  const tipsUk: string[] = [];
  const tipsEn: string[] = [];

  if (lang.startsWith("en")) {
    if (/th/i.test(text)) {
      tipsUk.push("«th» — язик між зубами (think / this).");
      tipsEn.push("«th» — tongue between teeth (think / this).");
    }
    if (/\b(r|w)\w*/i.test(text) && lang === "en-US") {
      tipsUk.push("Американське /r/ — кінчик язика назад, без вібрації.");
      tipsEn.push("American /r/ — tongue tip back, no trill.");
    }
    if (words.some((w) => w.length > 8)) {
      tipsUk.push("Довгі слова: розбий на склади й наголоси головний склад.");
      tipsEn.push("Long words: break into syllables; stress the main one.");
    }
    tipsUk.push("Слухай себе й повтори 3 рази повільно, потім у нормальному темпі.");
    tipsEn.push("Listen to yourself; repeat 3× slow, then normal pace.");
  } else {
    tipsUk.push("Українська: чіткі голосні, м'які приголосні перед і, є, ю, я.");
    tipsEn.push("Ukrainian: clear vowels; soft consonants before і/є/ю/я.");
  }

  return c.json({
    text,
    lang,
    speak: text,
    rate: 0.9,
    pitch: 1,
    tipsUk,
    tipsEn,
    // Client should use speechSynthesis.speak()
    clientHint: "Use Web Speech API speechSynthesis with lang + rate",
  });
});

/** Simple scoring: compare expected text to what browser recognition returned */
const scoreSchema = z.object({
  expected: z.string().min(1).max(500),
  heard: z.string().min(0).max(500),
});

speechRoutes.post("/score", authMiddleware, async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = scoreSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: "invalid_input" }, 400);

  const norm = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s']/gu, "")
      .replace(/\s+/g, " ")
      .trim();

  const a = norm(parsed.data.expected);
  const b = norm(parsed.data.heard);
  if (!a) return c.json({ score: 0, match: false });
  if (a === b) return c.json({ score: 1, match: true });

  // Token overlap F1-ish
  const ta = new Set(a.split(" ").filter(Boolean));
  const tb = new Set(b.split(" ").filter(Boolean));
  let inter = 0;
  for (const t of ta) if (tb.has(t)) inter += 1;
  const precision = tb.size ? inter / tb.size : 0;
  const recall = ta.size ? inter / ta.size : 0;
  const score =
    precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;

  // char similarity (simple)
  let same = 0;
  const maxLen = Math.max(a.length, b.length) || 1;
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] === b[i]) same += 1;
  }
  const charScore = same / maxLen;
  const final = Math.max(score, charScore * 0.85);

  return c.json({
    score: Math.round(final * 100) / 100,
    match: final >= 0.85,
    expected: a,
    heard: b,
  });
});
