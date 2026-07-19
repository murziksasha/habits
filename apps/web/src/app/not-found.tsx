import Link from "next/link";

export default function NotFound() {
  return (
    <div className="card mx-auto max-w-lg text-center space-y-4 py-12">
      <p className="text-5xl font-black text-brand">404</p>
      <h1 className="text-2xl font-black">Сторінку не знайдено</h1>
      <p className="text-ink-muted">Можливо, посилання застаріле або адресу введено з помилкою.</p>
      <Link href="/" className="btn-primary inline-flex">
        На головну
      </Link>
    </div>
  );
}
