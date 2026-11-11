"use client";

import type { LocalLabManifest } from "@eduforge/shared";
import { pickLocale } from "@eduforge/shared";
import { useLocale } from "@/lib/locale-context";

/**
 * Bilingual instructions & starter zip panel for local ForgeBoard labs.
 * Strictly advisory (`local_practice`): local tests run on the learner's machine and never grant server XP or exam pass.
 */
export function LocalLabPanel({ lab }: { lab: LocalLabManifest }) {
  const { locale, t } = useLocale();
  const title = pickLocale(locale, lab.titleUk, lab.titleEn);
  const objective = pickLocale(locale, lab.objectiveUk, lab.objectiveEn);
  const instructions = pickLocale(locale, lab.instructionsUk, lab.instructionsEn);
  const prerequisites = pickLocale(locale, lab.prerequisitesUk, lab.prerequisitesEn);
  const windowsNotes = pickLocale(locale, lab.windowsNotesUk, lab.windowsNotesEn);
  const criteria =
    locale === "en" ? lab.acceptanceCriteriaEn : lab.acceptanceCriteriaUk;

  return (
    <section
      aria-labelledby="local-lab-heading"
      data-testid="local-lab-panel"
      className="mt-8 rounded-2xl border-2 border-indigo-200 bg-indigo-50/60 p-5 sm:p-6 dark:border-indigo-900 dark:bg-indigo-950/30"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
            💻 {t.labs.badge} · {t.labs.milestoneLabel} M{lab.milestone} · v{lab.version}
          </span>
          <h2 id="local-lab-heading" className="mt-2 text-lg font-extrabold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{objective}</p>
        </div>

        <a
          href={lab.downloadPath}
          download
          data-testid="local-lab-download"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          ⬇ {t.labs.downloadStarter}
        </a>
      </div>

      <p
        role="note"
        data-testid="local-lab-practice-notice"
        className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200"
      >
        ℹ️ {t.labs.noMasteryNote}
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500">
            {locale === "en" ? "Instructions" : "Інструкція"}
          </h3>
          <p className="mt-1.5 text-sm text-gray-700 dark:text-gray-300">{instructions}</p>
          <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            <strong className="font-semibold">{t.labs.prerequisites}:</strong> {prerequisites}
          </p>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            <strong className="font-semibold">{t.labs.runtime}:</strong> {lab.supportedRuntime}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500">
            {t.labs.setupTitle}
          </h3>
          <pre className="mt-1.5 overflow-x-auto rounded-lg bg-slate-900 p-2.5 text-xs text-slate-100">
            <code>{lab.setupCommands.join("\n")}</code>
          </pre>
          <h3 className="mt-3 text-xs font-bold uppercase tracking-wide text-gray-500">
            {t.labs.testTitle}
          </h3>
          <pre className="mt-1.5 overflow-x-auto rounded-lg bg-slate-900 p-2.5 text-xs text-emerald-300">
            <code>{lab.testCommands.join("\n")}</code>
          </pre>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500">
          {t.labs.rubricTitle}
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          {criteria.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>

      <details className="mt-3 rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
        <summary className="cursor-pointer text-sm font-bold text-gray-800 dark:text-gray-200">
          🪟 {t.labs.windowsNotes} · {t.labs.failuresTitle}
        </summary>
        <p className="mt-2 text-xs text-gray-700 dark:text-gray-300">{windowsNotes}</p>
        <dl className="mt-3 space-y-2 border-t border-gray-100 pt-2 text-xs dark:border-gray-800">
          {lab.commonFailures.map((f, i) => (
            <div key={i}>
              <dt className="font-semibold text-rose-700 dark:text-rose-400">
                {pickLocale(locale, f.symptomUk, f.symptomEn)}
              </dt>
              <dd className="mt-0.5 text-gray-600 dark:text-gray-400">
                {pickLocale(locale, f.fixUk, f.fixEn)}
              </dd>
            </div>
          ))}
        </dl>
      </details>
    </section>
  );
}
