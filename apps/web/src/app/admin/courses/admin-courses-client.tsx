"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { adminApi, api } from "@/lib/admin-api";
import { StepUpModal } from "@/components/admin/step-up-modal";
import { PageLoading } from "@/components/page-loading";

type Course = {
  id: string;
  slug: string;
  titleUk: string;
  titleEn: string;
  icon: string;
  color: string;
  status: "draft" | "published" | "archived";
  category: string;
  contentSource: string;
};

export function AdminCoursesClient() {
  const { token, user } = useAuth();
  const { t } = useLocale();
  const [courses, setCourses] = useState<Course[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [stepUpOpen, setStepUpOpen] = useState(false);
  const [pending, setPending] = useState<null | (() => Promise<void>)>(null);
  const [form, setForm] = useState({
    slug: "",
    titleUk: "",
    titleEn: "",
    descriptionUk: "Новий курс",
    descriptionEn: "New course",
    icon: "📘",
    color: "#58CC02",
    category: "skill" as "skill" | "code" | "deep" | "chess",
  });

  async function load() {
    if (!token) return;
    setDataLoading(true);
    try {
      const d = await api<{ courses: Course[] }>("/admin/courses", { token });
      setCourses(d.courses);
    } catch {
      setCourses([]);
    } finally {
      setDataLoading(false);
    }
  }

  useEffect(() => {
    if (token && user?.role === "admin") void load();
  }, [token, user]);

  async function withStepUp(fn: () => Promise<void>) {
    try {
      await fn();
    } catch (e) {
      if ((e as Error & { data?: { error?: string } }).data?.error === "step_up_required") {
        setPending(() => fn);
        setStepUpOpen(true);
        return;
      }
      setMsg((e as Error).message);
    }
  }

  async function createCourse() {
    if (!token) return;
    setMsg("");
    await adminApi("/admin/courses", { method: "POST", token, body: form, stepUp: false });
    setForm((f) => ({ ...f, slug: "", titleUk: "", titleEn: "" }));
    await load();
    setMsg("Created draft");
  }

  async function publish(id: string) {
    if (!token) return;
    await withStepUp(async () => {
      await adminApi(`/admin/courses/${id}/publish`, { method: "POST", token });
      await load();
      setMsg("Published");
    });
  }

  async function archive(id: string) {
    if (!token) return;
    await withStepUp(async () => {
      await adminApi(`/admin/courses/${id}/archive`, { method: "POST", token });
      await load();
      setMsg("Archived");
    });
  }

  if (dataLoading && !courses.length) {
    return <PageLoading label={t.common.loading} />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">📚 {t.admin.courses}</h1>
      {msg && (
        <p className="text-sm font-bold text-sky" role="status" aria-live="polite">
          {msg}
        </p>
      )}

      <section className="card space-y-3">
        <h2 className="text-xl font-black">+ Draft course</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <input
            className="input"
            placeholder="slug (my_course)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />
          <input
            className="input"
            placeholder="Icon"
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
          />
          <input
            className="input"
            placeholder="Title UK"
            value={form.titleUk}
            onChange={(e) => setForm({ ...form, titleUk: e.target.value })}
          />
          <input
            className="input"
            placeholder="Title EN"
            value={form.titleEn}
            onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
          />
          <select
            className="input"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value as typeof form.category })
            }
          >
            <option value="skill">skill</option>
            <option value="code">code</option>
            <option value="deep">deep</option>
            <option value="chess">chess</option>
          </select>
          <input
            className="input"
            type="color"
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
          />
        </div>
        <button type="button" className="btn-primary" onClick={() => void createCourse()}>
          Create draft
        </button>
      </section>

      <div className="card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-ink-muted">
              <th className="pb-2">Course</th>
              <th className="pb-2">Slug</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Source</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id} className="border-t border-slate-100 dark:border-slate-800">
                <td className="py-2 font-bold">
                  {c.icon} {c.titleUk}
                </td>
                <td className="py-2 font-mono text-xs">{c.slug}</td>
                <td className="py-2">
                  <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-bold dark:bg-slate-800">
                    {c.status}
                  </span>
                </td>
                <td className="py-2 text-xs">{c.contentSource}</td>
                <td className="py-2">
                  <div className="flex flex-wrap gap-1">
                    {c.status !== "published" && (
                      <button
                        type="button"
                        className="btn-primary !px-2 !py-1 text-xs"
                        onClick={() => void publish(c.id)}
                      >
                        {t.admin.publish}
                      </button>
                    )}
                    {c.status === "published" && (
                      <button
                        type="button"
                        className="btn-secondary !px-2 !py-1 text-xs"
                        onClick={() => void archive(c.id)}
                      >
                        {t.admin.archive}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <StepUpModal
        open={stepUpOpen}
        onClose={() => setStepUpOpen(false)}
        onSuccess={() => {
          if (pending) void pending().then(() => setPending(null));
        }}
      />
    </div>
  );
}
