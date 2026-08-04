"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { api } from "@/lib/api";
import { Badge, Button, EmptyState, Skeleton } from "@/components/ui";
import clsx from "clsx";

type BoardClass = {
  classId: string;
  className: string;
  memberCount: number;
  overallPct: number;
  heatLevel: number;
  members: { userId: string; displayName: string }[];
  assignments: {
    id: string;
    titleUk: string;
    titleEn?: string | null;
    dueAt: string | null;
    completed: number;
    total: number;
    pct: number;
    heatLevel: number;
    cells: Record<string, { status: string; score: number | null; heat: number }>;
  }[];
};

const HEAT = [
  "bg-slate-100 dark:bg-slate-900",
  "bg-orange-100 dark:bg-orange-950",
  "bg-yellow-200 dark:bg-yellow-900",
  "bg-lime-300 dark:bg-lime-800",
  "bg-brand dark:bg-brand-dark",
];

type CatalogLesson = {
  id: string;
  titleUk: string;
  titleEn?: string;
  isExam?: boolean;
};

export default function TeacherPage() {
  const { user, token, loading } = useAuth();
  const { locale } = useLocale();
  const router = useRouter();
  const [board, setBoard] = useState<BoardClass[] | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [lessons, setLessons] = useState<CatalogLesson[]>([]);
  const [courseId, setCourseId] = useState("");
  const [lessonId, setLessonId] = useState("");
  const [title, setTitle] = useState("");
  const [assignMsg, setAssignMsg] = useState("");
  const [assignBusy, setAssignBusy] = useState(false);
  const uk = locale !== "en";

  const loadBoard = useCallback(() => {
    if (!token) return;
    void api<{ board: BoardClass[] }>("/homework/teacher/board", { token })
      .then((d) => {
        setBoard(d.board ?? []);
        setSelected((prev) => prev ?? d.board?.[0]?.classId ?? null);
      })
      .catch(() => setBoard([]));
  }, [token]);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    loadBoard();
  }, [loadBoard]);

  useEffect(() => {
    if (!token) return;
    void api<{
      course?: { id: string };
      units?: { lessons: CatalogLesson[] }[];
    }>("/homework/catalog?course=programming", { token })
      .then((d) => {
        setCourseId(d.course?.id ?? "");
        const flat = (d.units ?? []).flatMap((u) => u.lessons);
        setLessons(flat.slice(0, 40));
        if (flat[0]) {
          setLessonId(flat[0].id);
          setTitle(uk ? `ДЗ: ${flat[0].titleUk}` : `HW: ${flat[0].titleEn || flat[0].titleUk}`);
        }
      })
      .catch(() => setLessons([]));
  }, [token, uk]);

  if (loading || !user) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-24" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  const current = board?.find((b) => b.classId === selected) ?? board?.[0] ?? null;

  async function assignHomework() {
    if (!token || !current || !courseId || !lessonId) return;
    setAssignBusy(true);
    setAssignMsg("");
    try {
      await api("/homework", {
        method: "POST",
        token,
        body: {
          classId: current.classId,
          courseId,
          lessonId,
          titleUk: title || (uk ? "Домашнє" : "Homework"),
          titleEn: title || "Homework",
        },
      });
      setAssignMsg(uk ? "Завдання створено" : "Assignment created");
      loadBoard();
    } catch {
      setAssignMsg(uk ? "Помилка (чи ви teacher класу?)" : "Failed (are you the class teacher?)");
    } finally {
      setAssignBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-black">
          👩‍🏫 {uk ? "Кабінет учителя" : "Teacher desk"}
        </h1>
        <p className="font-bold text-ink-muted">
          {uk
            ? "Heatmap виконання домашки по класах і учнях."
            : "Homework completion heat by class and student."}
        </p>
        <div className="flex flex-wrap gap-2">
          <Link href="/homework" className="btn-secondary !py-2 !px-3 text-sm min-h-11">
            📝 {uk ? "Домашка" : "Homework"}
          </Link>
          <Link href="/schools" className="btn-secondary !py-2 !px-3 text-sm min-h-11">
            🏫 {uk ? "Школи" : "Schools"}
          </Link>
          <Link href="/learn" className="btn-secondary !py-2 !px-3 text-sm min-h-11">
            🗺️ {uk ? "Навчання" : "Learn"}
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link href="/schools" className="btn-primary !py-2 text-sm">
          {uk ? "Школи" : "Schools"}
        </Link>
        <Link href="/homework" className="btn-secondary !py-2 text-sm">
          {uk ? "Домашка" : "Homework"}
        </Link>
        <Link href="/classroom/live/demo" className="btn-secondary !py-2 text-sm">
          {uk ? "Живий клас" : "Live class"}
        </Link>
      </div>

      {current && lessons.length > 0 && (
        <section className="card space-y-3 border-sky/30">
          <h2 className="text-lg font-black">
            {uk ? "Швидке ДЗ" : "Quick assign"} → {current.className}
          </h2>
          <label className="block text-xs font-bold text-ink-muted">
            {uk ? "Урок (programming path)" : "Lesson (programming path)"}
            <select
              className="input mt-1"
              value={lessonId}
              onChange={(e) => {
                const id = e.target.value;
                setLessonId(id);
                const l = lessons.find((x) => x.id === id);
                if (l) {
                  setTitle(uk ? `ДЗ: ${l.titleUk}` : `HW: ${l.titleEn || l.titleUk}`);
                }
              }}
            >
              {lessons.map((l) => (
                <option key={l.id} value={l.id}>
                  {uk ? l.titleUk : l.titleEn || l.titleUk}
                  {l.isExam ? " · exam" : ""}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-bold text-ink-muted">
            {uk ? "Назва" : "Title"}
            <input
              className="input mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <Button
            size="sm"
            disabled={assignBusy || !lessonId}
            onClick={() => void assignHomework()}
          >
            {uk ? "Призначити класу" : "Assign to class"}
          </Button>
          {assignMsg && <p className="text-sm font-bold text-sky">{assignMsg}</p>}
        </section>
      )}

      {board === null ? (
        <Skeleton className="h-40" />
      ) : board.length === 0 ? (
        <EmptyState
          title={uk ? "Немає класів" : "No classes"}
          description={
            uk
              ? "Створіть клас у Школах — ви маєте бути teacher."
              : "Create a class under Schools as a teacher."
          }
          actionHref="/schools"
          actionLabel={uk ? "До шкіл" : "Schools"}
        />
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            {board.map((cl) => (
              <button
                key={cl.classId}
                type="button"
                onClick={() => setSelected(cl.classId)}
                className={clsx(
                  "rounded-2xl border-2 px-3 py-2 text-sm font-black transition",
                  selected === cl.classId
                    ? "border-brand bg-brand-soft/40"
                    : "border-slate-200 hover:border-sky/40",
                )}
              >
                {cl.className}{" "}
                <Badge
                  tone={cl.heatLevel >= 3 ? "brand" : cl.heatLevel >= 1 ? "grape" : "muted"}
                >
                  {cl.overallPct}%
                </Badge>
              </button>
            ))}
          </div>

          {current && (
            <section className="card space-y-4 overflow-x-auto">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-black">{current.className}</h2>
                <p className="text-sm font-bold text-ink-muted">
                  {current.memberCount} {uk ? "учнів" : "students"} ·{" "}
                  {current.assignments.length} {uk ? "завдань" : "assignments"}
                </p>
              </div>

              {/* Class-level assignment bars */}
              <div className="space-y-2">
                {current.assignments.map((a) => (
                  <div key={a.id} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="truncate">
                        {uk ? a.titleUk : a.titleEn || a.titleUk}
                      </span>
                      <span>
                        {a.completed}/{a.total} · {a.pct}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        className={clsx("h-full rounded-full", HEAT[a.heatLevel])}
                        style={{ width: `${a.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
                {current.assignments.length === 0 && (
                  <p className="text-sm font-bold text-ink-muted">
                    {uk ? "Немає завдань — створіть у Homework." : "No assignments yet."}
                  </p>
                )}
              </div>

              {/* Student × assignment heat grid */}
              {current.assignments.length > 0 && current.members.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[480px] border-collapse text-left text-xs">
                    <thead>
                      <tr>
                        <th className="p-2 font-black">{uk ? "Учень" : "Student"}</th>
                        {current.assignments.map((a) => (
                          <th
                            key={a.id}
                            className="max-w-[72px] truncate p-1 font-bold text-ink-muted"
                            title={a.titleUk}
                          >
                            {a.titleUk.slice(0, 8)}…
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {current.members.map((m) => (
                        <tr key={m.userId} className="border-t border-slate-100 dark:border-slate-800">
                          <td className="p-2 font-bold">{m.displayName}</td>
                          {current.assignments.map((a) => {
                            const cell = a.cells[m.userId];
                            const heat = cell?.heat ?? 0;
                            return (
                              <td key={a.id} className="p-1">
                                <div
                                  className={clsx(
                                    "grid h-8 w-8 place-items-center rounded-lg font-black",
                                    HEAT[heat] ?? HEAT[0],
                                    heat >= 3 && "text-white",
                                  )}
                                  title={
                                    cell
                                      ? `${cell.status}${cell.score != null ? ` ${Math.round(cell.score * 100)}%` : ""}`
                                      : "—"
                                  }
                                >
                                  {cell?.status === "completed"
                                    ? "✓"
                                    : cell
                                      ? "·"
                                      : "–"}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-2 text-[10px] font-bold text-ink-muted">
                    {uk
                      ? "Колір: сірий=немає · помаранч=призначено · жовт/зелен=здано"
                      : "Heat: grey=none · orange=assigned · yellow/green=done"}
                  </p>
                </div>
              )}

              <Link
                href={`/schools/class/${current.classId}`}
                className="text-sm font-bold text-sky hover:underline"
              >
                {uk ? "Відкрити клас" : "Open class"} →
              </Link>
            </section>
          )}
        </>
      )}
    </div>
  );
}
