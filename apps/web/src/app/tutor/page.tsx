"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { COURSE_SLUGS, UI } from "@eduforge/shared";

type Msg = { role: string; content: string; model?: string | null };

function TutorPageInner() {
  const { user, token, loading } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const search = useSearchParams();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [courseSlug, setCourseSlug] = useState("programming");
  const [busy, setBusy] = useState(false);
  const [aiOnline, setAiOnline] = useState(false);
  const [deepLinked, setDeepLinked] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  // Prefill from /tutor?course=programming&q=... (useSearchParams already decodes)
  useEffect(() => {
    if (deepLinked) return;
    const q = search.get("q");
    const course = search.get("course");
    if (course && (COURSE_SLUGS as readonly string[]).includes(course)) {
      setCourseSlug(course);
    }
    if (q) setInput(q);
    setDeepLinked(true);
  }, [search, deepLinked]);

  useEffect(() => {
    if (!token) return;
    void api<{ aiEnabled: boolean }>("/tutor/status", { token })
      .then((d) => setAiOnline(d.aiEnabled))
      .catch(() => setAiOnline(false));
    void api<{ messages: Msg[] }>("/tutor/history", { token })
      .then((d) => setMessages(d.messages))
      .catch(() => setMessages([]));
  }, [token]);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  async function send() {
    if (!token || !input.trim() || busy) return;
    const text = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setBusy(true);
    try {
      const d = await api<{ reply: string; model: string; source: string }>("/tutor/chat", {
        method: "POST",
        token,
        body: {
          message: text,
          courseSlug: courseSlug || null,
          locale,
        },
      });
      setMessages((m) => [
        ...m,
        { role: "assistant", content: d.reply, model: d.model },
      ]);
      setAiOnline(d.source === "xai");
    } catch (e) {
      const err = e as Error;
      setMessages((m) => [
        ...m,
        { role: "assistant", content: err.message === "rate_limited" ? "⏳ rate limit" : t.common.error },
      ]);
    } finally {
      setBusy(false);
    }
  }

  async function clear() {
    if (!token) return;
    await api("/tutor/history", { method: "DELETE", token });
    setMessages([]);
  }

  if (loading || !user) return <p>{t.common.loading}</p>;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4" style={{ minHeight: "70vh" }}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-3xl font-black">🤖 {t.tutor.title}</h1>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold dark:bg-slate-800">
          {aiOnline ? t.tutor.online : t.tutor.offline}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <select
          className="input !w-auto"
          value={courseSlug}
          onChange={(e) => setCourseSlug(e.target.value)}
        >
          <option value="">— course —</option>
          {COURSE_SLUGS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button type="button" className="btn-secondary !py-2 text-sm" onClick={() => void clear()}>
          {t.tutor.clear}
        </button>
      </div>

      <div className="card flex-1 space-y-3 overflow-y-auto max-h-[50vh]">
        {messages.length === 0 && (
          <p className="text-sm text-ink-muted font-bold">{t.tutor.placeholder}</p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === "user"
                ? "ml-8 rounded-2xl bg-brand-soft px-3 py-2 text-sm font-medium"
                : "mr-8 rounded-2xl bg-slate-50 px-3 py-2 text-sm dark:bg-slate-900"
            }
          >
            <p className="whitespace-pre-wrap">{m.content}</p>
            {m.model && (
              <p className="mt-1 text-[10px] text-ink-muted">{m.model}</p>
            )}
          </div>
        ))}
        {busy && <p className="text-sm font-bold text-ink-muted">{t.tutor.thinking}</p>}
        <div ref={bottom} />
      </div>

      <div className="flex gap-2">
        <input
          className="input flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.tutor.placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send();
            }
          }}
        />
        <button type="button" className="btn-primary" disabled={busy} onClick={() => void send()}>
          {t.tutor.send}
        </button>
      </div>
    </div>
  );
}

export default function TutorPage() {
  return (
    <Suspense fallback={<p>{UI.common.loading}</p>}>
      <TutorPageInner />
    </Suspense>
  );
}
