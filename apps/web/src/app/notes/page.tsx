"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { PageLoading } from "@/components/page-loading";
import { EmptyState } from "@/components/ui";
import { useRequireAuth } from "@/lib/use-require-auth";

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
  const { ready } = useRequireAuth();
  const { t } = useLocale();
  const [notes, setNotes] = useState<Note[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    setDataLoading(true);
    void api<{ notes: Note[] }>("/notes", { token })
      .then((d) => setNotes(d.notes))
      .catch(() => setNotes([]))
      .finally(() => setDataLoading(false));
  }, [token]);

  if (loading || !ready || dataLoading) return <PageLoading label={t.common.loading} />;
  if (!user) return <PageLoading label={t.common.loading} />;

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <h1 className="text-3xl font-black">📔 {t.notes.title}</h1>
      {notes.length === 0 ? (
        <EmptyState
          title={t.notes.empty}
          description={t.notes.placeholder}
          actionHref="/learn"
          actionLabel={t.nav.learn}
        />
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
