"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="card mx-auto max-w-lg text-center space-y-4 py-12">
      <p className="text-5xl">⚠️</p>
      <h1 className="text-2xl font-black">Щось пішло не так</h1>
      <p className="text-sm text-ink-muted break-all">{error.message}</p>
      <button type="button" className="btn-primary" onClick={() => reset()}>
        Спробувати знову
      </button>
    </div>
  );
}
