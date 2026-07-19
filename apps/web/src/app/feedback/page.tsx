"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

type FeedbackRow = {
  id: string;
  category: string;
  message: string;
  pagePath: string;
  status: string;
  createdAt: string;
};

const CATS = ["bug", "idea", "content", "other"] as const;

export default function FeedbackPage() {
  const { user, token, loading } = useAuth();
  const { t } = useLocale();
  const router = useRouter();
  const [category, setCategory] = useState<(typeof CATS)[number]>("bug");
  const [message, setMessage] = useState("");
  const [pagePath, setPagePath] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  const [mine, setMine] = useState<FeedbackRow[]>([]);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (typeof window !== "undefined" && !pagePath) {
      setPagePath(document.referrer ? new URL(document.referrer).pathname : "");
    }
  }, [pagePath]);

  useEffect(() => {
    if (!token) return;
    void api<{ feedback: FeedbackRow[] }>("/feedback/mine", { token })
      .then((d) => setMine(d.feedback ?? []))
      .catch(() => setMine([]));
  }, [token, sent]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setErr("");
    try {
      await api("/feedback", {
        method: "POST",
        token,
        body: { category, message, pagePath: pagePath || undefined },
      });
      setSent(true);
      setMessage("");
    } catch (ex: unknown) {
      const err = ex as Error;
      setErr(err.message || "error");
    }
  }

  if (loading || !user) return <p>{t.common.loading}</p>;

  const catLabel = (c: string) => {
    if (c === "bug") return t.feedback.catBug;
    if (c === "idea") return t.feedback.catIdea;
    if (c === "content") return t.feedback.catContent;
    return t.feedback.catOther;
  };

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-3xl font-black">💬 {t.feedback.title}</h1>
        <p className="text-sm font-bold text-ink-muted">{t.feedback.hint}</p>
      </div>

      <form onSubmit={submit} className="card space-y-4">
        <div>
          <label className="label">{t.feedback.category}</label>
          <select
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value as (typeof CATS)[number])}
          >
            {CATS.map((c) => (
              <option key={c} value={c}>
                {catLabel(c)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">{t.feedback.message}</label>
          <textarea
            className="input min-h-[120px]"
            required
            minLength={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div>
          <label className="label">{t.feedback.pagePath}</label>
          <input
            className="input"
            value={pagePath}
            onChange={(e) => setPagePath(e.target.value)}
            placeholder="/courses/typescript"
          />
        </div>
        {sent && <p className="text-sm font-bold text-brand-dark">{t.feedback.sent}</p>}
        {err && <p className="text-sm font-bold text-red-500">{err}</p>}
        <button type="submit" className="btn-primary w-full">
          {t.feedback.submit}
        </button>
      </form>

      <section className="card space-y-2">
        <h2 className="font-black">{t.feedback.mine}</h2>
        {mine.length === 0 && (
          <p className="text-sm text-ink-muted font-bold">{t.feedback.empty}</p>
        )}
        {mine.map((f) => (
          <div
            key={f.id}
            className="rounded-xl border border-slate-100 px-3 py-2 text-sm dark:border-slate-800"
          >
            <div className="flex justify-between gap-2 font-bold">
              <span>
                {catLabel(f.category)} · {f.status}
              </span>
              <span className="text-xs text-ink-muted">
                {new Date(f.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-1 text-ink-muted whitespace-pre-wrap">{f.message}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
