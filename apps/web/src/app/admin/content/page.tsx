"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { UI } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { ExercisePlayer, type Exercise } from "@/components/exercises";
import { Badge, Button, Card } from "@/components/ui";

type Course = { id: string; slug: string; titleUk: string; icon: string };
type Lesson = {
  id: string;
  slug: string;
  titleUk: string;
  isFree: boolean;
  baseXp: number;
  difficulty: number;
  sortOrder: number;
  exercises: unknown[];
};
type Unit = { id: string; titleUk: string; slug: string; lessons: Lesson[] };

export default function AdminContentPage() {
  const { user, token, loading } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [slug, setSlug] = useState("english");
  const [tree, setTree] = useState<{ course: Course; units: Unit[] } | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [titleUk, setTitleUk] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [baseXp, setBaseXp] = useState(15);
  const [difficulty, setDifficulty] = useState(1);
  const [exercisesJson, setExercisesJson] = useState("[]");
  const [msg, setMsg] = useState("");
  const [previewIdx, setPreviewIdx] = useState(0);
  const [showPreview, setShowPreview] = useState(true);

  const parsedExercises = useMemo(() => {
    try {
      const arr = JSON.parse(exercisesJson) as unknown;
      if (!Array.isArray(arr)) return { ok: false as const, exercises: [] as Exercise[], err: "not array" };
      return { ok: true as const, exercises: arr as Exercise[], err: null };
    } catch (e) {
      return { ok: false as const, exercises: [] as Exercise[], err: (e as Error).message };
    }
  }, [exercisesJson]);

  const previewEx =
    parsedExercises.ok && parsedExercises.exercises.length
      ? parsedExercises.exercises[Math.min(previewIdx, parsedExercises.exercises.length - 1)]
      : null;

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) router.replace("/dashboard");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token || user?.role !== "admin") return;
    void api<{ courses: Course[] }>("/admin/courses", { token }).then((d) => {
      setCourses(d.courses);
      if (d.courses[0]) setSlug(d.courses[0].slug);
    });
  }, [token, user]);

  async function loadTree(s: string) {
    if (!token) return;
    const d = await api<{ course: Course; units: Unit[] }>(`/admin/courses/${s}/tree`, {
      token,
    });
    setTree(d);
    setEditId(null);
  }

  useEffect(() => {
    if (token && slug && user?.role === "admin") void loadTree(slug);
  }, [token, slug, user]);

  function startEdit(lesson: Lesson) {
    setEditId(lesson.id);
    setTitleUk(lesson.titleUk);
    setIsFree(lesson.isFree);
    setBaseXp(lesson.baseXp);
    setDifficulty(lesson.difficulty);
    setExercisesJson(JSON.stringify(lesson.exercises ?? [], null, 2));
    setPreviewIdx(0);
    setShowPreview(true);
    setMsg("");
  }

  async function save() {
    if (!token || !editId) return;
    let exercises: unknown[];
    try {
      exercises = JSON.parse(exercisesJson) as unknown[];
      if (!Array.isArray(exercises)) throw new Error("not array");
    } catch {
      setMsg("Невалідний JSON exercises");
      return;
    }
    await api(`/admin/lessons/${editId}`, {
      method: "PATCH",
      token,
      body: { titleUk, isFree, baseXp, difficulty, exercises },
    });
    setMsg("Збережено");
    await loadTree(slug);
  }

  async function remove(id: string) {
    if (!token || !confirm("Видалити урок?")) return;
    await api(`/admin/lessons/${id}`, { method: "DELETE", token });
    await loadTree(slug);
  }

  async function createLesson(unitId: string, courseId: string) {
    if (!token) return;
    const slugNew = `lesson-${Date.now()}`;
    await api("/admin/lessons", {
      method: "POST",
      token,
      body: {
        unitId,
        courseId,
        slug: slugNew,
        titleUk: "Новий урок",
        isFree: false,
        baseXp: 15,
        difficulty: 1,
        exercises: [
          {
            id: `${slugNew}-1`,
            type: "mcq",
            promptUk: "Питання?",
            options: ["A", "B", "C", "D"],
            correctIndex: 0,
          },
        ],
      },
    });
    await loadTree(slug);
  }

  if (loading || user?.role !== "admin") return <p>{UI.common.loading}</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-black">{UI.admin.content}</h1>
        <Link href="/admin" className="btn-secondary !py-2">
          {UI.common.back}
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {courses.map((c) => (
          <button
            key={c.slug}
            type="button"
            className={slug === c.slug ? "btn-primary !py-2" : "btn-secondary !py-2"}
            onClick={() => setSlug(c.slug)}
          >
            {c.icon} {c.titleUk}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {tree?.units.map((u) => (
            <div key={u.id} className="card space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-black">{u.titleUk}</h2>
                <button
                  type="button"
                  className="btn-secondary !py-1 !px-2 text-xs"
                  onClick={() => void createLesson(u.id, tree.course.id)}
                >
                  + урок
                </button>
              </div>
              <ul className="space-y-1">
                {u.lessons.map((l) => (
                  <li
                    key={l.id}
                    className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 px-3 py-2 text-sm"
                  >
                    <button
                      type="button"
                      className="text-left font-bold hover:text-sky"
                      onClick={() => startEdit(l)}
                    >
                      {l.titleUk}{" "}
                      <span className="text-xs font-semibold text-ink-muted">
                        ({l.exercises?.length ?? 0} ex)
                      </span>
                    </button>
                    <button
                      type="button"
                      className="text-xs font-bold text-red-500"
                      onClick={() => void remove(l.id)}
                    >
                      {UI.admin.delete}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="space-y-4 sticky top-20 h-fit">
          <Card className="space-y-3">
            <h2 className="text-xl font-black">
              {editId ? UI.admin.editLesson : "Оберіть урок"}
            </h2>
            {editId ? (
              <>
                <div className="flex flex-wrap gap-2">
                  {isFree && <Badge tone="brand">Free</Badge>}
                  <Badge tone="muted">XP {baseXp}</Badge>
                  <Badge tone="sky">★ {difficulty}</Badge>
                  {editId && (
                    <Link
                      href={`/courses/${slug}/lessons/${editId}`}
                      className="text-xs font-bold text-sky hover:underline"
                      target="_blank"
                    >
                      Open live →
                    </Link>
                  )}
                </div>
                <div>
                  <label className="label">Назва (UK)</label>
                  <input className="input" value={titleUk} onChange={(e) => setTitleUk(e.target.value)} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="label">XP</label>
                    <input
                      className="input"
                      type="number"
                      value={baseXp}
                      onChange={(e) => setBaseXp(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="label">Складність</label>
                    <input
                      className="input"
                      type="number"
                      min={1}
                      max={5}
                      value={difficulty}
                      onChange={(e) => setDifficulty(Number(e.target.value))}
                    />
                  </div>
                  <label className="flex items-end gap-2 pb-3 font-bold text-sm">
                    <input
                      type="checkbox"
                      checked={isFree}
                      onChange={(e) => setIsFree(e.target.checked)}
                    />
                    Free
                  </label>
                </div>
                <div>
                  <label className="label">Exercises JSON</label>
                  <textarea
                    className="input min-h-48 font-mono text-xs"
                    value={exercisesJson}
                    onChange={(e) => {
                      setExercisesJson(e.target.value);
                      setPreviewIdx(0);
                    }}
                    spellCheck={false}
                  />
                  {!parsedExercises.ok && (
                    <p className="mt-1 text-xs font-bold text-red-500">
                      JSON: {parsedExercises.err}
                    </p>
                  )}
                  {parsedExercises.ok && (
                    <p className="mt-1 text-xs font-bold text-ink-muted">
                      {parsedExercises.exercises.length} exercises · types:{" "}
                      {[
                        ...new Set(
                          parsedExercises.exercises.map((e) => String(e.type ?? "?")),
                        ),
                      ].join(", ")}
                    </p>
                  )}
                </div>
                {msg && <p className="text-sm font-bold text-sky">{msg}</p>}
                <Button fullWidth onClick={() => void save()}>
                  {UI.common.save}
                </Button>
              </>
            ) : (
              <p className="text-ink-muted text-sm">Клікніть урок зліва, щоб редагувати.</p>
            )}
          </Card>

          {editId && parsedExercises.ok && previewEx && (
            <Card className="space-y-3 border-grape/30">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-black">👁 Player preview</h3>
                <button
                  type="button"
                  className="text-xs font-bold text-ink-muted"
                  onClick={() => setShowPreview((v) => !v)}
                >
                  {showPreview ? "Hide" : "Show"}
                </button>
              </div>
              {showPreview && (
                <>
                  <div className="flex flex-wrap gap-1">
                    {parsedExercises.exercises.map((ex, i) => (
                      <button
                        key={String(ex.id ?? i)}
                        type="button"
                        className={
                          i === previewIdx
                            ? "btn-primary !py-1 !px-2 text-xs"
                            : "btn-secondary !py-1 !px-2 text-xs"
                        }
                        onClick={() => setPreviewIdx(i)}
                      >
                        {i + 1}. {String(ex.type ?? "?")}
                      </button>
                    ))}
                  </div>
                  <div className="rounded-2xl border border-slate-100 p-3 dark:border-slate-800">
                    <ExercisePlayer
                      key={`${previewEx.id}-${previewIdx}`}
                      exercise={previewEx}
                      onAnswer={() => undefined}
                    />
                  </div>
                  <p className="text-[10px] font-bold text-ink-muted">
                    Soft-grade only — answers are not submitted to the API.
                  </p>
                </>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
