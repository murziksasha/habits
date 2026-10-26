"use client";

import { useLocale } from "@/lib/locale-context";

const ROWS: { keys: string; uk: string; en: string }[] = [
  { keys: "1–9", uk: "Вибір варіанта (MCQ)", en: "Select option (MCQ)" },
  { keys: "↑ ↓ ← →", uk: "Навігація по варіантах", en: "Move between options" },
  { keys: "Enter", uk: "Перевірити відповідь", en: "Check answer" },
  { keys: "F", uk: "Режим фокусу (сховати chrome)", en: "Focus mode (hide chrome)" },
  { keys: "Esc", uk: "Вийти з уроку", en: "Exit lesson" },
  { keys: "?", uk: "Ця довідка", en: "This help" },
];

/** Lesson keyboard shortcuts modal (? key). */
export function LessonShortcutsHelp({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { locale, t } = useLocale();
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[85] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lesson-keys-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md space-y-4 rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-xl dark:border-slate-700 dark:bg-slate-950">
        <div className="flex items-start justify-between gap-2">
          <h2 id="lesson-keys-title" className="text-lg font-black">
            ⌨️{" "}
            {locale === "en" ? "Keyboard shortcuts" : "Гарячі клавіші"}
          </h2>
          <button
            type="button"
            className="btn-secondary !py-1 !px-3 text-sm"
            onClick={onClose}
          >
            {t.common.back}
          </button>
        </div>
        <ul className="space-y-2">
          {ROWS.map((r) => (
            <li
              key={r.keys}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 px-3 py-2 text-sm dark:border-slate-800"
            >
              <kbd className="rounded-lg bg-slate-100 px-2 py-1 font-mono text-xs font-black dark:bg-slate-800">
                {r.keys}
              </kbd>
              <span className="font-bold text-right">
                {locale === "en" ? r.en : r.uk}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-xs font-bold text-ink-muted">
          {locale === "en"
            ? "Press ? again or Esc to close."
            : "Натисніть ? або Esc, щоб закрити."}
        </p>
      </div>
    </div>
  );
}
