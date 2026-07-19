type Exercise = {
  id: string;
  type: string;
  [key: string]: unknown;
};

function norm(s: string) {
  return s.trim().toLowerCase().replace(/[.…!?]/g, "").replace(/\s+/g, " ");
}

/** Light normalize for code: trim + collapse internal whitespace runs */
function normCode(s: string, caseSensitive: boolean) {
  const t = s.trim().replace(/\s+/g, " ");
  return caseSensitive ? t : t.toLowerCase();
}

export function gradeExercise(
  exercise: Exercise,
  answer: unknown,
): { correct: boolean; meta?: Record<string, unknown> } {
  switch (exercise.type) {
    case "mcq":
    case "logic_puzzle":
    case "code_read": {
      const idx = typeof answer === "number" ? answer : Number((answer as { index?: number })?.index);
      return { correct: idx === exercise.correctIndex };
    }
    case "code_output": {
      if (Array.isArray(exercise.options) && exercise.correctIndex != null) {
        const idx =
          typeof answer === "number" ? answer : Number((answer as { index?: number })?.index);
        return { correct: idx === exercise.correctIndex };
      }
      const text = String(answer ?? "");
      const accepted = (exercise.accepted as string[]) ?? [];
      const cs = exercise.caseSensitive !== false;
      return {
        correct: accepted.some((a) => normCode(a, cs) === normCode(text, cs)),
      };
    }
    case "code_fill": {
      const text = String(answer ?? "");
      const accepted = (exercise.accepted as string[]) ?? [];
      const cs = exercise.caseSensitive !== false;
      return {
        correct: accepted.some((a) => normCode(String(a), cs) === normCode(text, cs)),
      };
    }
    case "code_order": {
      const correct = (exercise.correct as string[]) ?? (exercise.lines as string[]) ?? [];
      const ans = (answer as string[]) ?? [];
      return {
        correct:
          ans.length === correct.length && ans.every((w, i) => w === correct[i]),
      };
    }
    case "code_project": {
      // answer: { files: Record<fileId, content> } or { files: { id, content }[] }
      const checks =
        (exercise.checks as {
          fileId?: string;
          contains?: string[];
          containsHtml?: string[];
          kind?: string;
          selector?: string;
        }[]) ?? [];
      if (!checks.length) return { correct: false };
      const raw = answer as {
        files?: Record<string, string> | { id: string; content: string }[];
      };
      const map = new Map<string, string>();
      if (Array.isArray(raw?.files)) {
        for (const f of raw.files) map.set(f.id, f.content ?? "");
      } else if (raw?.files && typeof raw.files === "object") {
        for (const [k, v] of Object.entries(raw.files)) map.set(k, String(v ?? ""));
      }
      const allJoined = [...map.values()].join("\n");
      const cs = exercise.caseSensitive !== false;
      const failed: string[] = [];
      for (const ch of checks) {
        if (ch.kind === "dom" && ch.selector) {
          const html = allJoined;
          const sel = ch.selector;
          let ok = false;
          if (sel.startsWith(".")) {
            const cls = sel.slice(1);
            ok = new RegExp(`class=["'][^"']*\\b${cls}\\b`).test(html);
          } else if (sel.startsWith("#")) {
            const id = sel.slice(1);
            ok = html.includes(`id="${id}"`) || html.includes(`id='${id}'`);
          } else {
            const tag = sel.replace(/[^a-z0-9-]/gi, "") || sel;
            ok = new RegExp(`<${tag}[\\s>]`, "i").test(html);
          }
          if (!ok) failed.push(`dom:${sel}`);
          continue;
        }
        if (ch.containsHtml?.length) {
          let content = allJoined;
          if (!cs) content = content.toLowerCase();
          for (const needle of ch.containsHtml) {
            const n = cs ? needle : needle.toLowerCase();
            if (!content.includes(n)) failed.push(`html:${needle}`);
          }
        }
        if (ch.fileId && ch.contains?.length) {
          let content = map.get(ch.fileId) ?? "";
          if (!cs) content = content.toLowerCase();
          for (const needle of ch.contains) {
            const n = cs ? needle : needle.toLowerCase();
            if (!content.includes(n)) failed.push(`${ch.fileId}:${needle}`);
          }
        }
      }
      return {
        correct: failed.length === 0,
        meta: failed.length ? { missing: failed } : { ok: true },
      };
    }
    case "translate":
    case "fill_blank": {
      const text = String(answer ?? "");
      const accepted = (exercise.accepted as string[]) ?? [];
      return { correct: accepted.some((a) => norm(a) === norm(text)) };
    }
    case "match": {
      // answer: array of {left, right} in any order — compare sets
      const pairs = (exercise.pairs as { left: string; right: string }[]) ?? [];
      const ans = (answer as { left: string; right: string }[]) ?? [];
      if (ans.length !== pairs.length) return { correct: false };
      const set = new Set(pairs.map((p) => `${p.left}::${p.right}`));
      return { correct: ans.every((p) => set.has(`${p.left}::${p.right}`)) };
    }
    case "order_words": {
      const correct = (exercise.correct as string[]) ?? [];
      const ans = (answer as string[]) ?? [];
      return {
        correct:
          ans.length === correct.length && ans.every((w, i) => w === correct[i]),
      };
    }
    case "typing": {
      const meta = answer as { wpm?: number; accuracy?: number };
      const wpm = Number(meta?.wpm ?? 0);
      const accuracy = Number(meta?.accuracy ?? 0);
      return { correct: accuracy >= 0.85 && wpm >= 10, meta: { wpm, accuracy } };
    }
    case "rsvp": {
      // completion counts as correct if user finished
      const done = Boolean((answer as { completed?: boolean })?.completed);
      return { correct: done, meta: { wpm: exercise.wpm } };
    }
    case "comprehension": {
      const indices = (answer as number[]) ?? [];
      const questions = (exercise.questions as { correctIndex: number }[]) ?? [];
      let ok = 0;
      questions.forEach((q, i) => {
        if (indices[i] === q.correctIndex) ok += 1;
      });
      const ratio = questions.length ? ok / questions.length : 0;
      return { correct: ratio >= 0.5, meta: { comprehension: ratio, correctCount: ok } };
    }
    case "chess_puzzle": {
      // Client sends { sans: string[] } or { solved: true }
      const a = answer as { solved?: boolean; sans?: string[] };
      if (a?.solved) return { correct: true };
      const solution = (exercise.solutionSans as string[]) ?? [];
      const sans = a?.sans ?? [];
      const normSan = (s: string) => s.replace(/[+#]/g, "");
      return {
        correct:
          sans.length >= solution.length &&
          solution.every((s, i) => normSan(sans[i] ?? "") === normSan(s)),
      };
    }
    case "chess_lesson": {
      const quiz = exercise.quiz as { correctIndex: number } | undefined;
      if (!quiz) return { correct: true };
      const idx = typeof answer === "number" ? answer : Number((answer as { index?: number })?.index);
      return { correct: idx === quiz.correctIndex };
    }
    default:
      return { correct: false };
  }
}
