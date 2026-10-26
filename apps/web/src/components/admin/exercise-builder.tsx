"use client";

import { useMemo, useState } from "react";
import { validateExercises } from "@eduforge/shared";
import clsx from "clsx";

export type BuilderExercise = {
  id: string;
  type: string;
  promptUk: string;
  promptEn?: string;
  [key: string]: unknown;
};

const TYPES = [
  "mcq",
  "translate",
  "fill_blank",
  "match",
  "order_words",
  "logic_puzzle",
  "code_read",
  "code_output",
  "code_fill",
  "code_order",
  "typing",
  "rsvp",
  "comprehension",
  "chess_puzzle",
  "chess_lesson",
  "code_project",
] as const;

function newId() {
  return `ex-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function blankExercise(type: string): BuilderExercise {
  const id = newId();
  switch (type) {
    case "mcq":
    case "logic_puzzle":
      return {
        id,
        type,
        promptUk: "Питання?",
        options: ["A", "B", "C", "D"],
        correctIndex: 0,
        ...(type === "logic_puzzle" ? { category: "pattern", difficulty: 1 } : {}),
      };
    case "translate":
      return {
        id,
        type,
        promptUk: "Переклади",
        source: "hello",
        accepted: ["привіт"],
        direction: "en_uk",
      };
    case "fill_blank":
      return {
        id,
        type,
        promptUk: "Заповни пропуск",
        sentence: "I ___ a book",
        accepted: ["read", "have"],
      };
    case "match":
      return {
        id,
        type,
        promptUk: "Зʼєднай пари",
        pairs: [
          { left: "cat", right: "кіт" },
          { left: "dog", right: "пес" },
        ],
      };
    case "order_words":
      return {
        id,
        type,
        promptUk: "Порядок слів",
        words: ["I", "love", "code"],
        correct: ["I", "love", "code"],
      };
    case "code_read":
    case "code_output":
      return {
        id,
        type,
        promptUk: "Що робить код?",
        code: "console.log(1 + 1)",
        language: "javascript",
        options: ["1", "2", "11", "error"],
        correctIndex: 1,
      };
    case "code_fill":
      return {
        id,
        type,
        promptUk: "Заповни код",
        code: "const x = ___;",
        language: "javascript",
        accepted: ["42"],
      };
    case "code_order":
      return {
        id,
        type,
        promptUk: "Порядок рядків",
        lines: ["const a = 1;", "const b = a + 1;", "console.log(b);"],
        correct: ["const a = 1;", "const b = a + 1;", "console.log(b);"],
      };
    case "typing":
      return {
        id,
        type,
        promptUk: "Набери текст",
        text: "hello world",
        layout: "en",
      };
    case "rsvp":
      return {
        id,
        type,
        promptUk: "Швидке читання",
        text: "Sample RSVP passage for speed reading practice.",
        wpm: 200,
      };
    case "comprehension":
      return {
        id,
        type,
        promptUk: "Розуміння тексту",
        passage: "Cats sleep a lot.",
        questions: [
          {
            q: "What sleeps a lot?",
            options: ["Dogs", "Cats", "Birds", "Fish"],
            correctIndex: 1,
          },
        ],
      };
    case "chess_puzzle":
      return {
        id,
        type,
        promptUk: "Шаховий пазл",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        solutionSans: ["e4"],
        difficulty: 1,
      };
    case "chess_lesson":
      return {
        id,
        type,
        promptUk: "Шаховий урок",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        notesUk: "Початкова позиція.",
      };
    case "code_project":
      return {
        id,
        type,
        promptUk: "Міні-проєкт",
        files: [
          {
            id: "html",
            name: "index.html",
            language: "html",
            starter: "<h1>Hello</h1>",
          },
        ],
        checks: [{ containsHtml: ["<h1>"] }],
      };
    default:
      return { id, type: "mcq", promptUk: "?", options: ["A", "B"], correctIndex: 0 };
  }
}

type Props = {
  exercises: BuilderExercise[];
  onChange: (next: BuilderExercise[]) => void;
  /** Also keep JSON in sync for advanced mode parent */
  onJsonSync?: (json: string) => void;
};

export function ExerciseBuilder({ exercises, onChange, onJsonSync }: Props) {
  const [selected, setSelected] = useState(0);
  const [addType, setAddType] = useState<string>("mcq");
  const validation = useMemo(() => validateExercises(exercises), [exercises]);

  function emit(next: BuilderExercise[]) {
    onChange(next);
    onJsonSync?.(JSON.stringify(next, null, 2));
  }

  function updateAt(i: number, patch: Partial<BuilderExercise>) {
    const next = exercises.map((ex, idx) => (idx === i ? { ...ex, ...patch } : ex));
    emit(next);
  }

  function removeAt(i: number) {
    const next = exercises.filter((_, idx) => idx !== i);
    emit(next);
    setSelected(Math.max(0, Math.min(selected, next.length - 1)));
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= exercises.length) return;
    const next = [...exercises];
    const tmp = next[i]!;
    next[i] = next[j]!;
    next[j] = tmp;
    emit(next);
    setSelected(j);
  }

  function add() {
    const next = [...exercises, blankExercise(addType)];
    emit(next);
    setSelected(next.length - 1);
  }

  const ex = exercises[selected];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <select
          className="input !w-auto !py-2"
          value={addType}
          onChange={(e) => setAddType(e.target.value)}
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <button type="button" className="btn-secondary !py-2 text-sm" onClick={add}>
          + exercise
        </button>
        <span
          className={clsx(
            "text-xs font-bold",
            validation.ok ? "text-brand" : "text-red-500",
          )}
        >
          {validation.ok
            ? `✓ ${exercises.length} valid`
            : `✗ ${validation.errors[0] ?? "invalid"}`}
        </span>
      </div>

      <div className="flex flex-wrap gap-1">
        {exercises.map((e, i) => (
          <button
            key={e.id}
            type="button"
            className={clsx(
              "rounded-xl px-2 py-1 text-xs font-bold",
              i === selected ? "bg-brand text-white" : "bg-slate-100 dark:bg-slate-800",
            )}
            onClick={() => setSelected(i)}
          >
            {i + 1}. {e.type}
          </button>
        ))}
      </div>

      {ex ? (
        <div className="space-y-2 rounded-2xl border-2 border-slate-100 p-3 dark:border-slate-800">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="btn-secondary !px-2 !py-1 text-xs"
              onClick={() => move(selected, -1)}
            >
              ↑
            </button>
            <button
              type="button"
              className="btn-secondary !px-2 !py-1 text-xs"
              onClick={() => move(selected, 1)}
            >
              ↓
            </button>
            <button
              type="button"
              className="text-xs font-bold text-red-500"
              onClick={() => removeAt(selected)}
            >
              Delete
            </button>
          </div>

          <div>
            <label className="label">Type</label>
            <select
              className="input"
              value={ex.type}
              onChange={(e) => {
                const rebuilt = blankExercise(e.target.value);
                updateAt(selected, { ...rebuilt, id: ex.id });
              }}
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Prompt UK</label>
            <textarea
              className="input min-h-16"
              value={String(ex.promptUk ?? "")}
              onChange={(e) => updateAt(selected, { promptUk: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Prompt EN</label>
            <input
              className="input"
              value={String(ex.promptEn ?? "")}
              onChange={(e) => updateAt(selected, { promptEn: e.target.value })}
            />
          </div>

          {Array.isArray(ex.options) && (
            <div>
              <label className="label">Options (one per line)</label>
              <textarea
                className="input min-h-24 font-mono text-xs"
                value={(ex.options as string[]).join("\n")}
                onChange={(e) =>
                  updateAt(selected, {
                    options: e.target.value.split("\n").filter((l) => l.length > 0),
                  })
                }
              />
              <label className="label mt-2">Correct index</label>
              <input
                className="input"
                type="number"
                min={0}
                value={Number(ex.correctIndex ?? 0)}
                onChange={(e) =>
                  updateAt(selected, { correctIndex: Number(e.target.value) })
                }
              />
            </div>
          )}

          {Array.isArray(ex.accepted) && (
            <div>
              <label className="label">Accepted answers (one per line)</label>
              <textarea
                className="input min-h-20 font-mono text-xs"
                value={(ex.accepted as string[]).join("\n")}
                onChange={(e) =>
                  updateAt(selected, {
                    accepted: e.target.value.split("\n").filter(Boolean),
                  })
                }
              />
            </div>
          )}

          {typeof ex.code === "string" && (
            <div>
              <label className="label">Code</label>
              <textarea
                className="input min-h-28 font-mono text-xs"
                value={ex.code}
                onChange={(e) => updateAt(selected, { code: e.target.value })}
              />
              {typeof ex.language === "string" && (
                <>
                  <label className="label mt-2">Language</label>
                  <input
                    className="input"
                    value={ex.language}
                    onChange={(e) => updateAt(selected, { language: e.target.value })}
                  />
                </>
              )}
            </div>
          )}

          {typeof ex.source === "string" && (
            <div>
              <label className="label">Source</label>
              <input
                className="input"
                value={ex.source}
                onChange={(e) => updateAt(selected, { source: e.target.value })}
              />
            </div>
          )}

          {typeof ex.sentence === "string" && (
            <div>
              <label className="label">Sentence</label>
              <input
                className="input"
                value={ex.sentence}
                onChange={(e) => updateAt(selected, { sentence: e.target.value })}
              />
            </div>
          )}

          {Array.isArray(ex.pairs) && (
            <div>
              <label className="label">Pairs (left|right per line)</label>
              <textarea
                className="input min-h-24 font-mono text-xs"
                value={(ex.pairs as { left: string; right: string }[])
                  .map((p) => `${p.left}|${p.right}`)
                  .join("\n")}
                onChange={(e) =>
                  updateAt(selected, {
                    pairs: e.target.value
                      .split("\n")
                      .filter(Boolean)
                      .map((line) => {
                        const [left, ...rest] = line.split("|");
                        return { left: left ?? "", right: rest.join("|") };
                      }),
                  })
                }
              />
            </div>
          )}

          {(Array.isArray(ex.words) || Array.isArray(ex.lines) || Array.isArray(ex.correct)) &&
            (ex.type === "order_words" || ex.type === "code_order") && (
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <label className="label">
                    {ex.type === "code_order" ? "Lines" : "Words"} (one per line)
                  </label>
                  <textarea
                    className="input min-h-24 font-mono text-xs"
                    value={((ex.lines ?? ex.words) as string[] | undefined)?.join("\n") ?? ""}
                    onChange={(e) => {
                      const arr = e.target.value.split("\n").filter((l) => l.length > 0);
                      if (ex.type === "code_order") updateAt(selected, { lines: arr });
                      else updateAt(selected, { words: arr });
                    }}
                  />
                </div>
                <div>
                  <label className="label">Correct order (one per line)</label>
                  <textarea
                    className="input min-h-24 font-mono text-xs"
                    value={((ex.correct as string[] | undefined) ?? []).join("\n")}
                    onChange={(e) =>
                      updateAt(selected, {
                        correct: e.target.value.split("\n").filter((l) => l.length > 0),
                      })
                    }
                  />
                </div>
              </div>
            )}

          {typeof ex.fen === "string" && (
            <div>
              <label className="label">FEN</label>
              <input
                className="input font-mono text-xs"
                value={ex.fen}
                onChange={(e) => updateAt(selected, { fen: e.target.value })}
              />
            </div>
          )}

          {Array.isArray(ex.solutionSans) && (
            <div>
              <label className="label">Solution SAN (one per line)</label>
              <textarea
                className="input min-h-16 font-mono text-xs"
                value={(ex.solutionSans as string[]).join("\n")}
                onChange={(e) =>
                  updateAt(selected, {
                    solutionSans: e.target.value.split("\n").filter(Boolean),
                  })
                }
              />
            </div>
          )}

          {typeof ex.text === "string" && (ex.type === "typing" || ex.type === "rsvp") && (
            <div>
              <label className="label">Text</label>
              <textarea
                className="input min-h-20"
                value={ex.text}
                onChange={(e) => updateAt(selected, { text: e.target.value })}
              />
            </div>
          )}

          {/* Advanced raw fields for less common shapes */}
          {(ex.type === "comprehension" ||
            ex.type === "code_project" ||
            ex.type === "chess_lesson") && (
            <div>
              <label className="label">Advanced fields (JSON patch)</label>
              <textarea
                className="input min-h-32 font-mono text-xs"
                defaultValue={JSON.stringify(
                  Object.fromEntries(
                    Object.entries(ex).filter(
                      ([k]) =>
                        !["id", "type", "promptUk", "promptEn"].includes(k),
                    ),
                  ),
                  null,
                  2,
                )}
                onBlur={(e) => {
                  try {
                    const patch = JSON.parse(e.target.value) as Record<string, unknown>;
                    updateAt(selected, patch);
                  } catch {
                    /* keep previous */
                  }
                }}
              />
            </div>
          )}
        </div>
      ) : (
        <p className="text-sm text-ink-muted">Додайте вправу кнопкою вище.</p>
      )}
    </div>
  );
}
