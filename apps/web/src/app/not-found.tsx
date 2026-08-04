import Link from "next/link";

/** Bilingual 404 with clear recovery CTAs. */
export default function NotFound() {
  return (
    <div className="card mx-auto max-w-lg space-y-4 py-12 text-center">
      <p className="text-5xl font-black text-brand" aria-hidden>
        404
      </p>
      <h1 className="text-2xl font-black">
        Сторінку не знайдено · Page not found
      </h1>
      <p className="font-bold text-ink-muted">
        Можливо, посилання застаріле або адресу введено з помилкою.
        <br />
        This link may be outdated or mistyped.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <Link href="/" className="btn-primary inline-flex min-h-11">
          На головну · Home
        </Link>
        <Link href="/learn" className="btn-secondary inline-flex min-h-11">
          Навчання · Learn
        </Link>
        <Link href="/search" className="btn-secondary inline-flex min-h-11">
          Пошук · Search
        </Link>
      </div>
    </div>
  );
}
