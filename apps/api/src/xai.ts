/**
 * SpaceXAI / xAI chat client (OpenAI-compatible).
 * Env: XAI_API_KEY, optional XAI_MODEL (default grok-4.5)
 */

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export function xaiConfigured() {
  return Boolean(process.env.XAI_API_KEY);
}

export async function xaiChat(
  messages: ChatMessage[],
  opts?: { model?: string; temperature?: number },
): Promise<{ text: string; model: string; source: "xai" | "fallback" }> {
  const model = opts?.model ?? process.env.XAI_MODEL ?? "grok-4.5";

  if (!xaiConfigured()) {
    return {
      text: fallbackTutor(messages),
      model: "fallback-local",
      source: "fallback",
    };
  }

  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.XAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: opts?.temperature ?? 0.6,
      messages,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    console.error("[xai]", res.status, errText.slice(0, 400));
    return {
      text: fallbackTutor(messages) + "\n\n_(AI offline — local tutor)_",
      model: "fallback-local",
      source: "fallback",
    };
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const text = data.choices?.[0]?.message?.content?.trim() || "…";
  return { text, model, source: "xai" };
}

function fallbackTutor(messages: ChatMessage[]): string {
  const last = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  const q = last.toLowerCase();

  if (/hello|привіт|hi\b/.test(q)) {
    return "Привіт! Я локальний репетитор EduForge (без XAI_API_KEY). Запитай про англійську, шахи, друк, швидкочитання чи логіку — дам коротку підказку. / Hello! Local tutor mode.";
  }
  if (/chess|шах|мат|king|ферзь|рокіров/.test(q)) {
    return "Шахи: король ходить на 1 клітину, ферзь — як тура+слон. Рокіровка — король на 2, тура «через» нього. Тактика: шукай вилки, зв'язки, слабкі клітини біля короля.";
  }
  if (/english|англій|present simple|past simple|grammar/.test(q)) {
    return "English tip: Present Simple = факти/звички (I work). Present Continuous = зараз (I am working). Past Simple = yesterday/ago (I worked). Склади 3 речення про свій день — і надішли, перевірю.";
  }
  if (/typing|друк|wpm|клавіатур/.test(q)) {
    return "Друк: тримай зап'ястя рівно, home row ASDF / JKL;. Не дивись на клавіші. Краще 5×5 хв точно, ніж 30 хв з помилками.";
  }
  if (/read|читан|rsvp|швідк/.test(q)) {
    return "Швидкочитання: RSVP прибирає саккади. Почни з комфортного WPM, потім +10–20. Завжди перевіряй comprehension — швидкість без розуміння марна.";
  }
  if (/logic|логік|послідов|pattern/.test(q)) {
    return "Логіка: 1) знайди крок ( +n, ×n, чергування ); 2) відсій варіанти; 3) перевір на краях. Для вербальних задач — визнач відношення A:B, потім застосуй до C.";
  }
  if (/flash|карт|srs|повтор/.test(q)) {
    return "SRS: Again (1) якщо не знаєш, Good (3) якщо згадав, Easy (4) якщо миттєво. Краще щодня 10 карток, ніж 100 раз на тиждень.";
  }
  if (/html|css|javascript|typescript|react|node|express|sql|git|programming|код|playground/.test(q)) {
    return [
      "💻 Code tutor (локальний режим):",
      "• HTML — семантика, a/href, forms; CSS — box model, flex.",
      "• JS — let/const, functions, arrays; React — components, props, useState.",
      "• Node/Express — routes, middleware, JSON; SQL — SELECT/WHERE/JOIN.",
      "• Git — add → commit → push; PR перед merge.",
      "Спробуй /playground challenges і path /programming.",
      "Приклад JS: `const double = n => n * 2; console.log(double(7)); // 14`",
    ].join("\n");
  }

  return `Ок, питання: «${last.slice(0, 200)}».\n\nПоради:\n• Розбий на менші кроки\n• Наведи приклад\n• Спробуй пояснити собі вголос\n\nЩоб увімкнути повний AI (SpaceXAI/xAI), додай XAI_API_KEY у середовище API.`;
}
