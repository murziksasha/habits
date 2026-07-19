"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";

type Note = {
  id: string;
  lessonId: string;
  lessonTitleUk: string;
  courseSlug: string;
  courseTitleUk: string;
  body: string;
  updatedAt: string;
};

export default function NotesPage() {
  const { user, token, loading } = useAuth();
  const { t } = useLocale();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token) return;
    void api<{ notes: Note[] }>("/notes", { token })
      .then((d) => setNotes(d.notes))
      .catch(() => setNotes([]));
  }, [token]);

  if (loading || !user) return <p>{t.common.loading}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">📔 {t.notes.title}</h1>
      {notes.length === 0 ? (
        <p className="card text-ink-muted font-bold">{t.notes.empty}</p>
      ) : (
        <div className="space-y-3">
          {notes.map((n) => (
            <div key={n.id} className="card space-y-2">
              <div className="flex flex-wrap justify-between gap-2">
                <Link
                  href={`/courses/${n.courseSlug}/lessons/${n.lessonId}`}
                  className="font-black text-lg hover:text-sky"
                >
                  {n.lessonTitleUk}
                </Link>
                <span className="text-xs text-ink-muted">
                  {new Date(n.updatedAt).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-ink-muted">{n.courseTitleUk}</p>
              <p className="whitespace-pre-wrap text-sm">{n.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
