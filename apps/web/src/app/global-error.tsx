"use client";

/**
 * Root-level error boundary (must include html/body).
 * Toast provider may be unavailable — keep self-contained UI.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="uk">
      <body className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800">
        <div className="mx-auto max-w-lg space-y-4 rounded-3xl border-2 border-slate-200 bg-white p-8 text-center shadow">
          <p className="text-5xl" aria-hidden>
            ⚠️
          </p>
          <h1 className="text-2xl font-black">Something went wrong · Помилка</h1>
          <p className="break-all text-sm font-bold text-slate-500">
            {error.message}
          </p>
          <button
            type="button"
            className="inline-flex rounded-2xl bg-[#58CC02] px-5 py-3 font-bold text-white"
            onClick={() => reset()}
          >
            Retry · Спробувати знову
          </button>
        </div>
      </body>
    </html>
  );
}
