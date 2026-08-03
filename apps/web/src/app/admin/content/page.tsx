"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UI } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import {
  ExerciseBuilder,
  type BuilderExercise,
} from "@/components/admin/exercise-builder";

type Course = {
  id: string;
  slug: string;
  titleUk: string;
  icon: string;
  status?: string;
  contentSource?: string;
};
type Lesson = {
  id: string;
  slug: string;
  titleUk: string;
  titleEn?: string;
  isFree: boolean;
  isExam?: boolean;
  passThreshold?: number | null;
  baseXp: number;
  difficulty: number;
  sortOrder: number;
  exercises: unknown[];
};
type Unit = {
  id: string;
  titleUk: string;
  titleEn?: string;
  slug: string;
  sortOrder?: number;
  lessons: Lesson[];
};

export default function AdminContentPage() {
  const { user, token, loading } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [slug, setSlug] = useState("english");
  const [tree, setTree] = useState<{ course: Course; units: Unit[] } | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [titleUk, setTitleUk] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [isExam, setIsExam] = useState(false);
  const [passThreshold, setPassThreshold] = useState(0.7);
  const [baseXp, setBaseXp] = useState(15);
  const [difficulty, setDifficulty] = useState(1);
  const [exercisesJson, setExercisesJson] = useState("[]");
  const [exercises, setExercises] = useState<BuilderExercise[]>([]);
  const [editorMode, setEditorMode] = useState<"visual" | "json">("visual");
  const [msg, setMsg] = useState("");

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
    setTitleEn(lesson.titleEn ?? "");
    setIsFree(lesson.isFree);
    setIsExam(lesson.isExam ?? false);
    setPassThreshold(lesson.passThreshold ?? 0.7);
    setBaseXp(lesson.baseXp);
    setDifficulty(lesson.difficulty);
    const list = (lesson.exercises ?? []) as BuilderExercise[];
    setExercises(list);
    setExercisesJson(JSON.stringify(list, null, 2));
    setMsg("");
  }

  async function save() {
    if (!token || !editId) return;
    let payload: unknown[];
    if (editorMode === "json") {
      try {
        payload = JSON.parse(exercisesJson) as unknown[];
        if (!Array.isArray(payload)) throw new Error("not array");
      } catch {
        setMsg("Невалідний JSON exercises");
        return;
      }
    } else {
      payload = exercises;
    }
    await api(`/admin/lessons/${editId}`, {
      method: "PATCH",
      token,
      body: {
        titleUk,
        titleEn,
        isFree,
        isExam,
        passThreshold: isExam ? passThreshold : null,
        baseXp,
        difficulty,
        exercises: payload,
      },
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
        titleEn: "New lesson",
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

  async function createUnit() {
    if (!token || !tree) return;
    const slugNew = `unit-${Date.now()}`;
    const sortOrder = (tree.units?.length ?? 0);
    await api("/admin/units", {
      method: "POST",
      token,
      body: {
        courseId: tree.course.id,
        slug: slugNew,
        titleUk: "Новий юніт",
        titleEn: "New unit",
        sortOrder,
      },
    });
    setMsg("Unit created");
    await loadTree(slug);
  }

  async function renameUnit(u: Unit) {
    if (!token) return;
    const titleUk = window.prompt("Unit title (UK)", u.titleUk);
    if (titleUk == null || !titleUk.trim()) return;
    const titleEn = window.prompt("Unit title (EN)", u.titleEn ?? "") ?? "";
    await api(`/admin/units/${u.id}`, {
      method: "PATCH",
      token,
      body: { titleUk: titleUk.trim(), titleEn: titleEn.trim() },
    });
    await loadTree(slug);
  }

  async function moveUnit(u: Unit, dir: -1 | 1) {
    if (!token || !tree) return;
    const ordered = [...tree.units].sort(
      (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
    );
    const i = ordered.findIndex((x) => x.id === u.id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= ordered.length) return;
    const a = ordered[i]!;
    const b = ordered[j]!;
    const items = [
      { id: a.id, sortOrder: b.sortOrder ?? j },
      { id: b.id, sortOrder: a.sortOrder ?? i },
    ];
    await api("/admin/units/reorder", { method: "POST", token, body: { items } });
    await loadTree(slug);
  }

  async function deleteUnit(u: Unit) {
    if (!token || !confirm(`Delete unit «${u.titleUk}» and its lessons?`)) return;
    try {
      await api(`/admin/units/${u.id}`, { method: "DELETE", token });
      await loadTree(slug);
    } catch (e) {
      setMsg((e as Error).message + " (may need step-up 2FA)");
    }
  }

  async function moveLesson(unit: Unit, lesson: Lesson, dir: -1 | 1) {
    if (!token) return;
    const ordered = [...unit.lessons].sort((a, b) => a.sortOrder - b.sortOrder);
    const i = ordered.findIndex((x) => x.id === lesson.id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= ordered.length) return;
    const a = ordered[i]!;
    const b = ordered[j]!;
    await api("/admin/lessons/reorder", {
      method: "POST",
      token,
      body: {
        items: [
          { id: a.id, sortOrder: b.sortOrder },
          { id: b.id, sortOrder: a.sortOrder },
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

      {msg && !editId && <p className="text-sm font-bold text-sky">{msg}</p>}

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className="btn-primary !py-2 text-sm" onClick={() => void createUnit()}>
          + unit
        </button>
        <span className="text-xs font-bold text-ink-muted">
          ↑↓ reorder · Rename unit · seed courses can be overwritten on re-seed
          {tree?.course.contentSource ? ` · source: ${tree.course.contentSource}` : ""}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {tree?.units.map((u) => (
            <div key={u.id} className="card space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-black">{u.titleUk}</h2>
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    className="btn-secondary !py-1 !px-2 text-xs"
                    onClick={() => void moveUnit(u, -1)}
                    title="Move unit up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="btn-secondary !py-1 !px-2 text-xs"
                    onClick={() => void moveUnit(u, 1)}
                    title="Move unit down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="btn-secondary !py-1 !px-2 text-xs"
                    onClick={() => void renameUnit(u)}
                  >
                    Rename
                  </button>
                  <button
                    type="button"
                    className="btn-secondary !py-1 !px-2 text-xs"
                    onClick={() => void createLesson(u.id, tree.course.id)}
                  >
                    + урок
                  </button>
                  <button
                    type="button"
                    className="text-xs font-bold text-red-500 px-1"
                    onClick={() => void deleteUnit(u)}
                  >
                    {UI.admin.delete}
                  </button>
                </div>
              </div>
              <ul className="space-y-1">
                {u.lessons.map((l) => (
                  <li
                    key={l.id}
                    className="flex items-center justify-between gap-2 rounded-xl border border-slate-100 px-3 py-2 text-sm dark:border-slate-800"
                  >
                    <button
                      type="button"
                      className="text-left font-bold hover:text-sky flex-1"
                      onClick={() => startEdit(l)}
                    >
                      {l.titleUk}{" "}
                      <span className="text-xs font-semibold text-ink-muted">
                        ({l.exercises?.length ?? 0} ex)
                      </span>
                    </button>
                    <button
                      type="button"
                      className="text-xs font-bold px-1"
                      onClick={() => void moveLesson(u, l, -1)}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="text-xs font-bold px-1"
                      onClick={() => void moveLesson(u, l, 1)}
                    >
                      ↓
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

        <div className="card space-y-3 sticky top-20 h-fit">
          <h2 className="text-xl font-black">
            {editId ? UI.admin.editLesson : "Оберіть урок"}
          </h2>
          {editId ? (
            <>
              <div>
                <label className="label">Назва (UK)</label>
                <input className="input" value={titleUk} onChange={(e) => setTitleUk(e.target.value)} />
              </div>
              <div>
                <label className="label">Title (EN)</label>
                <input className="input" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} />
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
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 font-bold text-sm">
                  <input
                    type="checkbox"
                    checked={isExam}
                    onChange={(e) => setIsExam(e.target.checked)}
                  />
                  Exam
                </label>
                {isExam && (
                  <div>
                    <label className="label">Pass threshold</label>
                    <input
                      className="input"
                      type="number"
                      step={0.05}
                      min={0.1}
                      max={1}
                      value={passThreshold}
                      onChange={(e) => setPassThreshold(Number(e.target.value))}
                    />
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={
                    editorMode === "visual" ? "btn-primary !py-1 text-xs" : "btn-secondary !py-1 text-xs"
                  }
                  onClick={() => {
                    setEditorMode("visual");
                    try {
                      const p = JSON.parse(exercisesJson) as BuilderExercise[];
                      if (Array.isArray(p)) setExercises(p);
                    } catch {
                      /* keep */
                    }
                  }}
                >
                  Visual blocks
                </button>
                <button
                  type="button"
                  className={
                    editorMode === "json" ? "btn-primary !py-1 text-xs" : "btn-secondary !py-1 text-xs"
                  }
                  onClick={() => {
                    setEditorMode("json");
                    setExercisesJson(JSON.stringify(exercises, null, 2));
                  }}
                >
                  Advanced JSON
                </button>
              </div>
              {editorMode === "visual" ? (
                <ExerciseBuilder
                  exercises={exercises}
                  onChange={setExercises}
                  onJsonSync={setExercisesJson}
                />
              ) : (
                <div>
                  <label className="label">Exercises JSON</label>
                  <textarea
                    className="input min-h-64 font-mono text-xs"
                    value={exercisesJson}
                    onChange={(e) => setExercisesJson(e.target.value)}
                  />
                </div>
              )}
              {msg && <p className="text-sm font-bold text-sky">{msg}</p>}
              <button type="button" className="btn-primary w-full" onClick={() => void save()}>
                {UI.common.save}
              </button>
            </>
          ) : (
            <p className="text-ink-muted text-sm">Клікніть урок зліва, щоб редагувати.</p>
          )}
        </div>
      </div>
    </div>
  );
}
