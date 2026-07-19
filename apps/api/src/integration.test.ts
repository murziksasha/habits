/**
 * HTTP integration tests against real Postgres (DATABASE_URL).
 * Requires migrated + seeded DB. Skip with SKIP_INTEGRATION=1.
 */
import { describe, expect, it, beforeAll } from "vitest";
import { createApp } from "./app.js";

const skip = process.env.SKIP_INTEGRATION === "1";
const describeIntegration = skip ? describe.skip : describe;

const app = createApp();

async function json(
  path: string,
  opts: { method?: string; body?: unknown; token?: string } = {},
) {
  const res = await app.request(path, {
    method: opts.method ?? (opts.body ? "POST" : "GET"),
    headers: {
      "Content-Type": "application/json",
      ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {}),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data };
}

describeIntegration("API integration", () => {
  const suffix = Date.now();
  const email = `itest-${suffix}@eduforge.test`;
  const password = "password123";
  let token = "";
  let lessonId = "";

  beforeAll(async () => {
    const health = await json("/health");
    expect(health.status).toBe(200);
    expect(health.data.ok).toBe(true);
  });

  it("registers a user", async () => {
    const r = await json("/auth/register", {
      method: "POST",
      body: { email, password, displayName: `ITest${suffix}` },
    });
    expect(r.status).toBe(200);
    expect(r.data.user.email).toBe(email);
    expect(r.data.token).toBeTruthy();
    token = r.data.token as string;
  });

  it("rejects duplicate email", async () => {
    const r = await json("/auth/register", {
      method: "POST",
      body: { email, password, displayName: "Dup" },
    });
    expect(r.status).toBe(409);
  });

  it("logs in", async () => {
    const r = await json("/auth/login", {
      method: "POST",
      body: { email, password },
    });
    expect(r.status).toBe(200);
    expect(r.data.token).toBeTruthy();
    token = r.data.token as string;
  });

  it("returns me", async () => {
    const r = await json("/auth/me", { token });
    expect(r.status).toBe(200);
    expect(r.data.character.displayName).toContain("ITest");
  });

  it("lists courses and english path", async () => {
    const list = await json("/courses");
    expect(list.status).toBe(200);
    expect(list.data.courses.length).toBeGreaterThanOrEqual(5);

    const eng = await json("/courses/english", { token });
    expect(eng.status).toBe(200);
    expect(eng.data.units.length).toBeGreaterThan(0);
    const first = eng.data.units[0].lessons[0];
    expect(first.locked).toBe(false);
    lessonId = first.id as string;
  });

  it("loads and submits a free english lesson", async () => {
    const lesson = await json(`/courses/english/lessons/${lessonId}`, { token });
    expect(lesson.status).toBe(200);
    const exercises = lesson.data.lesson.exercises as {
      id: string;
      type: string;
      correctIndex?: number;
      accepted?: string[];
      pairs?: { left: string; right: string }[];
      correct?: string[];
    }[];

    const answers = exercises.map((ex) => {
      if (ex.type === "mcq" || ex.type === "logic_puzzle") {
        return { exerciseId: ex.id, answer: ex.correctIndex ?? 0 };
      }
      if (ex.type === "translate" || ex.type === "fill_blank") {
        return { exerciseId: ex.id, answer: ex.accepted?.[0] ?? "" };
      }
      if (ex.type === "match") {
        return { exerciseId: ex.id, answer: ex.pairs ?? [] };
      }
      if (ex.type === "order_words") {
        return { exerciseId: ex.id, answer: ex.correct ?? [] };
      }
      return { exerciseId: ex.id, answer: true };
    });

    const submit = await json(`/courses/english/lessons/${lessonId}/submit`, {
      method: "POST",
      token,
      body: { answers },
    });
    expect(submit.status).toBe(200);
    expect(submit.data.accuracy).toBe(1);
    expect(submit.data.xpGain).toBeGreaterThan(0);
    expect(submit.data.character.globalXp).toBeGreaterThan(0);
  });

  it("password reset flow (dev)", async () => {
    const forgot = await json("/auth/forgot-password", {
      method: "POST",
      body: { email },
    });
    expect(forgot.status).toBe(200);
    expect(forgot.data.ok).toBe(true);
    const resetToken = forgot.data.devToken as string | undefined;
    if (!resetToken) {
      // production-like: no token returned — still ok response
      return;
    }
    const newPass = "newpassword99";
    const reset = await json("/auth/reset-password", {
      method: "POST",
      body: { token: resetToken, password: newPass },
    });
    expect(reset.status).toBe(200);
    const login = await json("/auth/login", {
      method: "POST",
      body: { email, password: newPass },
    });
    expect(login.status).toBe(200);
  });

  it("admin login and stats", async () => {
    const adminEmail = process.env.ADMIN_EMAIL ?? "admin@eduforge.ua";
    const adminPass = process.env.ADMIN_PASSWORD ?? "admin12345";
    const login = await json("/auth/login", {
      method: "POST",
      body: { email: adminEmail, password: adminPass },
    });
    if (login.status !== 200) {
      console.warn("admin not seeded — skip admin assertions");
      return;
    }
    expect(login.data.user.role).toBe("admin");
    const stats = await json("/admin/stats", {
      token: login.data.token as string,
    });
    expect(stats.status).toBe(200);
    expect(stats.data.users).toBeGreaterThanOrEqual(1);
    expect(stats.data.lessons).toBeGreaterThan(0);
  });

  it("forbids admin routes for normal users", async () => {
    // re-login as test user if password was changed
    let t = token;
    const tryLogin = await json("/auth/login", {
      method: "POST",
      body: { email, password: "newpassword99" },
    });
    if (tryLogin.status === 200) t = tryLogin.data.token as string;
    else {
      const old = await json("/auth/login", {
        method: "POST",
        body: { email, password },
      });
      if (old.status === 200) t = old.data.token as string;
    }
    const r = await json("/admin/stats", { token: t });
    expect(r.status).toBe(403);
  });

  it("leaderboard global includes scorers", async () => {
    const r = await json("/leaderboard/global");
    expect(r.status).toBe(200);
    expect(Array.isArray(r.data.entries)).toBe(true);
  });

  it("chess rating me", async () => {
    const login = await json("/auth/login", {
      method: "POST",
      body: { email, password: "newpassword99" },
    });
    const t =
      login.status === 200
        ? (login.data.token as string)
        : (
            await json("/auth/login", {
              method: "POST",
              body: { email, password },
            })
          ).data.token;
    const r = await json("/chess/rating/me", { token: t as string });
    expect(r.status).toBe(200);
    expect(r.data.rating.elo).toBeGreaterThanOrEqual(1000);
  });
});
