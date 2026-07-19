"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UI } from "@eduforge/shared";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";

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
                  className="input min-h-64 font-mono text-xs"
                  value={exercisesJson}
                  onChange={(e) => setExercisesJson(e.target.value)}
                />
              </div>
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
