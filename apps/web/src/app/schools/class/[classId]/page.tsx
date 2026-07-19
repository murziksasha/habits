"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { PLAYGROUND_CHALLENGES, pickLocale } from "@eduforge/shared";

type ClassData = {
  class: { id: string; name: string; inviteCode: string };
  students: {
    userId: string;
    displayName: string | null;
    globalXp: number | null;
    globalLevel: number | null;
  }[];
  progress: {
    userId: string;
    courseSlug: string;
    xp: number;
    level: number;
    completedLessons: number;
  }[];
};

type Assignment = {
  id: string;
  titleUk: string;
  titleEn: string;
  dueAt: string | null;
  courseSlug?: string;
  lessonTitleUk?: string;
  lessonId: string;
  completed: number;
  total: number;
  submissions: {
    userId: string;
    status: string;
    score: number | null;
    displayName: string | null;
  }[];
};

type Course = { id: string; slug: string; titleUk: string };
type LessonOpt = { id: string; titleUk: string; unitId: string };

export default function ClassPage() {
  const { classId } = useParams<{ classId: string }>();
  const { user, token, loading } = useAuth();
  const { t, locale } = useLocale();
  const router = useRouter();
  const [data, setData] = useState<ClassData | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<LessonOpt[]>([]);
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [lessonId, setLessonId] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState<
    { id: string; body: string; displayName: string | null; createdAt: string }[]
  >([]);
  const [chatBody, setChatBody] = useState("");
  const [progUnits, setProgUnits] = useState<
    {
      id: string;
      slug: string;
      titleUk: string;
      lessons: { id: string; titleUk: string; isFree: boolean }[];
    }[]
  >([]);
  const [progCourseId, setProgCourseId] = useState("");
  const [bulkUnitSlug, setBulkUnitSlug] = useState("");
  const [progExams, setProgExams] = useState<{ id: string; titleUk: string; slug: string }[]>(
    [],
  );
  const [examLessonId, setExamLessonId] = useState("");
  const [pgChallengeId, setPgChallengeId] = useState(PLAYGROUND_CHALLENGES[0]?.id ?? "");
  const [pgClassAssigns, setPgClassAssigns] = useState<
    {
      id: string;
      challengeId: string;
      titleUk?: string;
      solvedCount: number;
      totalStudents: number;
    }[]
  >([]);
  const [analytics, setAnalytics] = useState<{
    summary: {
      students: number;
      activeLast7Days: number;
      lessonsCompleted7d: number;
      avgLessonScore: number | null;
      homeworkAvgCompletion: number;
      playgroundAssignCount?: number;
      playgroundAvgSolved?: number;
    };
    students: {
      userId: string;
      displayName: string;
      globalXp: number;
      globalLevel: number;
      streakDays: number;
      activeLast7: boolean;
      playgroundSolved?: number;
      playgroundXp?: number;
      programmingLessons?: number;
    }[];
    homework: {
      titleUk: string;
      completionRate: number;
      completed: number;
      total: number;
      avgScore: number | null;
    }[];
  } | null>(null);

  async function load() {
    if (!token || !classId) return;
    const d = await api<ClassData>(`/orgs/classes/${classId}`, { token });
    setData(d);
    void api<NonNullable<typeof analytics>>(`/analytics/class/${classId}`, { token })
      .then(setAnalytics)
      .catch(() => setAnalytics(null));
    void api<{
      assignments: {
        id: string;
        challengeId: string;
        titleUk?: string;
        solvedCount: number;
        totalStudents: number;
      }[];
    }>(`/playground/class/${classId}`, { token })
      .then((d) => setPgClassAssigns(d.assignments))
      .catch(() => setPgClassAssigns([]));
    const a = await api<{ assignments: Assignment[] }>(`/homework/class/${classId}`, {
      token,
    });
    setAssignments(a.assignments);
    const m = await api<{
      messages: { id: string; body: string; displayName: string | null; createdAt: string }[];
    }>(`/chat/class/${classId}`, { token });
    setChat(m.messages);
  }

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (token && classId) void load().catch(() => setData(null));
  }, [token, classId]);

  useEffect(() => {
    void api<{ courses: Course[] }>("/courses")
      .then((d) => {
        setCourses(d.courses);
        if (d.courses[0]) setCourseId(d.courses[0].id);
        const prog = d.courses.find((c) => c.slug === "programming");
        if (prog) setProgCourseId(prog.id);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!token) return;
    void api<{
      course: { id: string };
      units: {
        id: string;
        slug: string;
        titleUk: string;
        lessons: { id: string; titleUk: string; isFree: boolean }[];
      }[];
    }>("/homework/catalog?course=programming", { token })
      .then((d) => {
        setProgCourseId(d.course.id);
        setProgUnits(d.units as typeof progUnits);
        if (d.units[0]) setBulkUnitSlug(d.units[0].slug);
        const exams =
          (d as { exams?: { id: string; titleUk: string; slug: string }[] }).exams ?? [];
        setProgExams(exams);
        if (exams[0]) setExamLessonId(exams[0].id);
      })
      .catch(() => {
        setProgUnits([]);
        setProgExams([]);
      });
  }, [token]);

  useEffect(() => {
    if (!token || !courseId) return;
    const slug = courses.find((c) => c.id === courseId)?.slug;
    if (!slug) return;
    void api<{
      units: { lessons: { id: string; titleUk: string; unitId?: string }[] }[];
    }>(`/courses/${slug}`, { token })
      .then((d) => {
        const flat = d.units.flatMap((u) =>
          u.lessons.map((l) => ({
            id: l.id,
            titleUk: l.titleUk,
            unitId: l.unitId ?? "",
          })),
        );
        setLessons(flat);
        if (flat[0]) setLessonId(flat[0].id);
      })
      .catch(() => setLessons([]));
  }, [token, courseId, courses]);

  async function sendChat() {
    if (!token || !chatBody.trim()) return;
    await api(`/chat/class/${classId}`, {
      method: "POST",
      token,
      body: { body: chatBody },
    });
    setChatBody("");
    await load();
  }

  async function createAssignment() {
    if (!token || !title.trim() || !lessonId) return;
    try {
      await api("/homework", {
        method: "POST",
        token,
        body: {
          classId,
          titleUk: title,
          titleEn: title,
          courseId,
          lessonId,
          dueAt: dueAt ? new Date(dueAt).toISOString() : null,
        },
      });
      setTitle("");
      setMsg("OK");
      await load();
    } catch {
      setMsg(t.common.error);
    }
  }

  async function assignProgrammingUnit() {
    if (!token || !progCourseId || !bulkUnitSlug) return;
    const unit = progUnits.find((u) => u.slug === bulkUnitSlug);
    if (!unit?.lessons.length) return;
    try {
      const d = await api<{ count: number }>("/homework/bulk", {
        method: "POST",
        token,
        body: {
          classId,
          courseId: progCourseId,
          lessonIds: unit.lessons.map((l) => l.id),
          titlePrefix: `💻 ${unit.titleUk}`,
          dueAt: dueAt ? new Date(dueAt).toISOString() : null,
        },
      });
      setMsg(`${t.homeworkAssign.bulkOk}: ${d.count}`);
      await load();
    } catch {
      setMsg(t.common.error);
    }
  }

  async function assignPlaygroundChallenge() {
    if (!token || !pgChallengeId) return;
    try {
      const d = await api<{ count: number }>(`/playground/class/${classId}/assign`, {
        method: "POST",
        token,
        body: { challengeIds: [pgChallengeId] },
      });
      setMsg(`${t.playground.classChallenges}: ${d.count}`);
      await load();
    } catch {
      setMsg(t.common.error);
    }
  }

  async function assignProgrammingExam() {
    if (!token || !progCourseId || !examLessonId) return;
    const exam = progExams.find((e) => e.id === examLessonId);
    try {
      await api("/homework", {
        method: "POST",
        token,
        body: {
          classId,
          titleUk: `📝 Exam: ${exam?.titleUk ?? "Control"}`,
          titleEn: `📝 Exam: ${exam?.titleUk ?? "Control"}`,
          courseId: progCourseId,
          lessonId: examLessonId,
          dueAt: dueAt ? new Date(dueAt).toISOString() : null,
        },
      });
      setMsg("Exam assigned");
      await load();
    } catch {
      setMsg(t.common.error);
    }
  }

  async function assignProgrammingFreePack() {
    if (!token || !progCourseId) return;
    const freeIds = progUnits.flatMap((u) =>
      u.lessons.filter((l) => l.isFree).map((l) => l.id),
    );
    if (!freeIds.length) return;
    try {
      const d = await api<{ count: number }>("/homework/bulk", {
        method: "POST",
        token,
        body: {
          classId,
          courseId: progCourseId,
          lessonIds: freeIds.slice(0, 12),
          titlePrefix: "💻 Free pack",
          dueAt: dueAt ? new Date(dueAt).toISOString() : null,
        },
      });
      setMsg(`${t.homeworkAssign.bulkOk}: ${d.count}`);
      await load();
    } catch {
      setMsg(t.common.error);
    }
  }

  if (loading || !user) return <p>{t.common.loading}</p>;
  if (!data) return <p>{t.common.loading}</p>;

  return (
    <div className="space-y-6">
      <Link href="/schools" className="text-sm font-bold text-ink-muted">
        ← {t.common.back}
      </Link>
      {analytics && (
        <section className="space-y-3">
          <h2 className="text-xl font-black">📊 {t.analytics.title}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            <div className="card">
              <p className="text-xs font-bold text-ink-muted">{t.analytics.students}</p>
              <p className="text-2xl font-black">{analytics.summary.students}</p>
            </div>
            <div className="card">
              <p className="text-xs font-bold text-ink-muted">{t.analytics.active7}</p>
              <p className="text-2xl font-black">{analytics.summary.activeLast7Days}</p>
            </div>
            <div className="card">
              <p className="text-xs font-bold text-ink-muted">{t.analytics.lessons7}</p>
              <p className="text-2xl font-black">{analytics.summary.lessonsCompleted7d}</p>
            </div>
            <div className="card">
              <p className="text-xs font-bold text-ink-muted">{t.analytics.avgScore}</p>
              <p className="text-2xl font-black">
                {analytics.summary.avgLessonScore != null
                  ? `${Math.round(analytics.summary.avgLessonScore * 100)}%`
                  : "—"}
              </p>
            </div>
            <div className="card">
              <p className="text-xs font-bold text-ink-muted">{t.analytics.hwCompletion}</p>
              <p className="text-2xl font-black">
                {Math.round(analytics.summary.homeworkAvgCompletion * 100)}%
              </p>
            </div>
            <div className="card">
              <p className="text-xs font-bold text-ink-muted">{t.analytics.pgAssigns}</p>
              <p className="text-2xl font-black">
                {analytics.summary.playgroundAssignCount ?? 0}
              </p>
            </div>
            <div className="card">
              <p className="text-xs font-bold text-ink-muted">{t.analytics.pgAvgSolved}</p>
              <p className="text-2xl font-black">
                {analytics.summary.playgroundAvgSolved != null
                  ? analytics.summary.playgroundAvgSolved.toFixed(1)
                  : "—"}
              </p>
            </div>
          </div>
          <div className="card space-y-2">
            <h3 className="font-black">{t.analytics.leaderboard}</h3>
            {analytics.students.slice(0, 10).map((s, i) => (
              <div
                key={s.userId}
                className="flex flex-wrap items-center justify-between gap-2 text-sm font-bold"
              >
                <span>
                  #{i + 1} {s.displayName}
                  {s.activeLast7 ? " · 🟢" : " · ⚪"} · L{s.globalLevel} · 🔥
                  {s.streakDays}
                </span>
                <span className="text-ink-muted text-xs sm:text-sm">
                  {s.globalXp} XP
                  {s.playgroundSolved != null ? (
                    <>
                      {" "}
                      · 🖥️ {s.playgroundSolved}
                      {s.playgroundXp ? ` (+${s.playgroundXp})` : ""}
                    </>
                  ) : null}
                  {s.programmingLessons != null ? (
                    <>
                      {" "}
                      · 💻 {s.programmingLessons} {t.analytics.progLessons}
                    </>
                  ) : null}
                </span>
              </div>
            ))}
          </div>
          {analytics.homework.length > 0 && (
            <div className="card space-y-2">
              <h3 className="font-black">{t.nav.homework}</h3>
              {analytics.homework.map((h, i) => (
                <div key={i} className="text-sm font-bold flex justify-between">
                  <span>{h.titleUk}</span>
                  <span>
                    {h.completed}/{h.total} ({Math.round(h.completionRate * 100)}%)
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
      <div className="card flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black">{data.class.name}</h1>
          <p className="font-mono text-sm text-ink-muted">
            {t.schools.inviteCode}: {data.class.inviteCode}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <a
            className="btn-secondary !py-2 text-sm"
            href={`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/gradebook/class/${classId}.csv`}
            onClick={(e) => {
              e.preventDefault();
              if (!token) return;
              void fetch(
                `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/gradebook/class/${classId}.csv`,
                { headers: { Authorization: `Bearer ${token}` } },
              )
                .then((r) => r.blob())
                .then((blob) => {
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `gradebook-${data.class.name}.csv`;
                  a.click();
                  URL.revokeObjectURL(url);
                });
            }}
          >
            📊 {t.gradebook.exportCsv}
          </a>
          <p className="text-[10px] font-bold text-ink-muted max-w-[220px] text-right">
            {t.gradebook.colsHint}
          </p>
        </div>
      </div>

      <section className="card space-y-3">
        <h2 className="font-black">📝 {t.homework.create}</h2>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t.homework.title}
        />
        <div className="grid gap-2 sm:grid-cols-2">
          <div>
            <label className="label">{t.homework.pickCourse}</label>
            <select
              className="input"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.titleUk}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">{t.homework.pickLesson}</label>
            <select
              className="input"
              value={lessonId}
              onChange={(e) => setLessonId(e.target.value)}
            >
              {lessons.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.titleUk}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="label">{t.homework.due}</label>
          <input
            className="input"
            type="datetime-local"
            value={dueAt}
            onChange={(e) => setDueAt(e.target.value)}
          />
        </div>
        <button type="button" className="btn-primary" onClick={() => void createAssignment()}>
          {t.homework.create}
        </button>
        {msg && <p className="text-sm font-bold text-sky">{msg}</p>}
      </section>

      {progUnits.length > 0 && (
        <section className="card space-y-3 border-sky/30">
          <h2 className="font-black">💻 {t.homeworkAssign.programmingPack}</h2>
          <p className="text-sm text-ink-muted font-bold">
            {t.homeworkAssign.pickUnit} / bulk assign
          </p>
          <select
            className="input"
            value={bulkUnitSlug}
            onChange={(e) => setBulkUnitSlug(e.target.value)}
          >
            {progUnits.map((u) => (
              <option key={u.slug} value={u.slug}>
                {u.titleUk} ({u.lessons.length})
              </option>
            ))}
          </select>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="btn-primary"
              onClick={() => void assignProgrammingUnit()}
            >
              {t.homeworkAssign.assignUnit}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => void assignProgrammingFreePack()}
            >
              Free pack (≤12)
            </button>
          </div>
          {progExams.length > 0 && (
            <div className="space-y-2 border-t border-slate-100 pt-3 dark:border-slate-800">
              <p className="text-sm font-black">📝 Assign unit exam</p>
              <select
                className="input"
                value={examLessonId}
                onChange={(e) => setExamLessonId(e.target.value)}
              >
                {progExams.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.titleUk}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => void assignProgrammingExam()}
              >
                Assign exam
              </button>
            </div>
          )}
        </section>
      )}

      <section className="card space-y-3 border-grape/30">
        <h2 className="font-black">🖥️ {t.playground.classChallenges}</h2>
        <select
          className="input"
          value={pgChallengeId}
          onChange={(e) => setPgChallengeId(e.target.value)}
        >
          {PLAYGROUND_CHALLENGES.map((ch) => (
            <option key={ch.id} value={ch.id}>
              [{ch.lang}] {pickLocale(locale, ch.titleUk, ch.titleEn)} (+{ch.xpReward} XP)
            </option>
          ))}
        </select>
        <button
          type="button"
          className="btn-primary"
          onClick={() => void assignPlaygroundChallenge()}
        >
          {t.homeworkAssign.assignUnit.replace("unit", "challenge")}
        </button>
        {pgClassAssigns.map((a) => (
          <div key={a.id} className="flex justify-between text-sm font-bold">
            <span>{a.titleUk || a.challengeId}</span>
            <span className="text-ink-muted">
              {a.solvedCount}/{a.totalStudents}
            </span>
          </div>
        ))}
      </section>

      <section className="card space-y-3">
        <h2 className="font-black">{t.homework.title}</h2>
        {assignments.map((a) => (
          <div key={a.id} className="rounded-xl border border-slate-100 p-3">
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <p className="font-black">
                  {locale === "en" && a.titleEn ? a.titleEn : a.titleUk}
                </p>
                <p className="text-sm text-ink-muted">{a.lessonTitleUk}</p>
                <p className="text-xs font-bold mt-1">
                  {t.homework.progress}: {a.completed}/{a.total}
                  {a.dueAt && (
                    <>
                      {" "}
                      · {t.homework.due}: {new Date(a.dueAt).toLocaleString()}
                    </>
                  )}
                </p>
              </div>
              <button
                type="button"
                className="text-xs font-bold text-red-500"
                onClick={() =>
                  void api(`/homework/${a.id}`, { method: "DELETE", token }).then(load)
                }
              >
                {t.common.cancel}
              </button>
            </div>
            <ul className="mt-2 space-y-1 text-xs">
              {a.submissions.map((s) => (
                <li key={s.userId} className="flex justify-between">
                  <span>{s.displayName ?? s.userId.slice(0, 8)}</span>
                  <span className="font-bold">
                    {s.status}
                    {s.score != null ? ` · ${Math.round(s.score * 100)}%` : ""}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {!assignments.length && (
          <p className="text-sm text-ink-muted">{t.homework.empty}</p>
        )}
      </section>

      <section className="card space-y-3">
        <h2 className="font-black">💬 {t.extra.classChat}</h2>
        <div className="max-h-64 space-y-2 overflow-y-auto rounded-2xl bg-slate-50 dark:bg-slate-950 p-3">
          {chat.map((m) => (
            <div key={m.id} className="text-sm">
              <span className="font-black">{m.displayName ?? "—"}: </span>
              <span>{m.body}</span>
            </div>
          ))}
          {!chat.length && <p className="text-xs text-ink-muted">—</p>}
        </div>
        <div className="flex gap-2">
          <input
            className="input"
            value={chatBody}
            onChange={(e) => setChatBody(e.target.value)}
            placeholder="…"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                void sendChat();
              }
            }}
          />
          <button type="button" className="btn-primary !px-4" onClick={() => void sendChat()}>
            {t.extra.send}
          </button>
        </div>
      </section>

      <section className="card space-y-2">
        <h2 className="font-black">{t.schools.students}</h2>
        {data.students.map((s) => (
          <div key={s.userId} className="rounded-xl border border-slate-100 p-3">
            <div className="flex justify-between font-bold">
              <span>{s.displayName ?? s.userId.slice(0, 8)}</span>
              <span className="text-ink-muted text-sm">
                L{s.globalLevel ?? 1} · {s.globalXp ?? 0} XP
              </span>
            </div>
            <ul className="mt-2 text-xs text-ink-muted space-y-1">
              {data.progress
                .filter((p) => p.userId === s.userId)
                .map((p) => (
                  <li key={p.courseSlug}>
                    {p.courseSlug}: L{p.level} · {p.xp} XP · {p.completedLessons} lessons
                  </li>
                ))}
            </ul>
          </div>
        ))}
        {!data.students.length && <p className="text-ink-muted">—</p>}
      </section>
    </div>
  );
}
