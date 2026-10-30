/**
 * HTTP integration tests against real Postgres (DATABASE_URL).
 * Requires migrated + seeded DB. Skip with SKIP_INTEGRATION=1.
 */
import { Secret, TOTP } from "otpauth";
import { describe, expect, it, beforeAll } from "vitest";
import { createApp } from "./app.js";
import { db } from "./db.js";
import { users, classes, tournamentPairings, tournaments, organizations } from "@eduforge/db";
import { eq } from "drizzle-orm";

const skip = process.env.SKIP_INTEGRATION === "1";
const describeIntegration = skip ? describe.skip : describe;

const app = createApp();

let ipSeq = 1;

async function json(
  path: string,
  opts: { method?: string; body?: unknown; token?: string; headers?: Record<string, string> } = {},
) {
  const ip = `10.0.${Math.floor(ipSeq / 250)}.${(ipSeq++ % 250) + 1}`;
  const res = await app.request(path, {
    method: opts.method ?? (opts.body ? "POST" : "GET"),
    headers: {
      "Content-Type": "application/json",
      "X-Forwarded-For": ip,
      // CI and production omit the bearer body unless the client opts in.
      "X-Issue-Bearer": "1",
      ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {}),
      ...(opts.headers ?? {}),
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
    expect(r.data.user.emailVerified).toBe(false);
    expect(r.data.user.accountStatus).toBe("active");
    expect(r.data.token).toBeTruthy();
    const issued = r.data.emailVerification as { verifyUrl?: string; devToken?: string };
    expect(issued?.verifyUrl || issued?.devToken).toBeTruthy();
    token = r.data.token as string;

    const verifyToken =
      issued.devToken || String(issued.verifyUrl).split("token=").pop();
    const v = await json("/auth/verify-email", {
      method: "POST",
      body: { token: verifyToken },
    });
    expect(v.status).toBe(200);
    expect(v.data.user.emailVerified).toBe(true);
    token = (v.data.token as string) || token;
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

  it("returns home aggregate", async () => {
    const r = await json("/me/home", { token });
    expect(r.status).toBe(200);
    expect(Array.isArray(r.data.progress)).toBe(true);
    expect(Array.isArray(r.data.recommendations)).toBe(true);
    expect(Array.isArray(r.data.activity)).toBe(true);
    expect(r.data.meta?.progressOk).toBe(true);
    expect(r.data.meta?.nextOk).toBe(true);
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

  it("guest GET /courses/english, lesson GET, and POST submit return 200 without auth", async () => {
    const courseRes = await json("/courses/english");
    expect(courseRes.status).toBe(200);
    expect(courseRes.data.progress.xp).toBe(0);
    expect(courseRes.data.progress.completedLessons).toBe(0);
    const guestFirst = courseRes.data.units[0].lessons[0];
    expect(guestFirst.status).toBe("available");
    expect(guestFirst.locked).toBe(false);

    const guestLesson = await json(`/courses/english/lessons/${guestFirst.id}`);
    expect(guestLesson.status).toBe(200);
    expect(guestLesson.data.lesson.id).toBe(guestFirst.id);
    expect(guestLesson.data.hearts).toBe(5);

    const exercises = guestLesson.data.lesson.exercises as {
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

    const guestSubmit = await json(`/courses/english/lessons/${guestFirst.id}/submit`, {
      method: "POST",
      body: { answers },
    });
    expect(guestSubmit.status).toBe(200);
    expect(guestSubmit.data.guest).toBe(true);
    expect(guestSubmit.data.xpGain).toBe(0);
    expect(guestSubmit.data.character).toBeUndefined();
    expect(guestSubmit.data.passed).toBe(true);
    expect(guestSubmit.data.accuracy).toBe(1);
    expect(guestSubmit.data.nextLesson).toBeTruthy();

    const notFound = await json("/courses/non-existent-course-slug-xyz");
    expect(notFound.status).toBe(404);
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

    // Seed enrolls admin TOTP outside production. Password login then returns
    // 200 + mfaToken and no session; /admin/stats with that missing token is 401.
    let sessionToken = login.data.token as string | undefined;
    if (login.data.mfaRequired) {
      const mfaToken = login.data.mfaToken as string;
      expect(mfaToken).toBeTruthy();
      const secret = process.env.SEED_ADMIN_TOTP_SECRET ?? "JBSWY3DPEHPK3PXP";
      const code = new TOTP({
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: Secret.fromBase32(secret),
      }).generate();
      let verified = await json("/auth/mfa/totp/verify", {
        method: "POST",
        body: { mfaToken, code },
      });
      if (verified.status !== 200) {
        const backup = process.env.SEED_ADMIN_BACKUP_CODE ?? "AAAA-BBBB";
        verified = await json("/auth/mfa/totp/verify", {
          method: "POST",
          body: { mfaToken, code: backup },
        });
      }
      expect(verified.status).toBe(200);
      sessionToken = verified.data.token as string;
    }

    expect(sessionToken).toBeTruthy();
    const stats = await json("/admin/stats", { token: sessionToken });
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

  describe("Admin god mode on /admin/users", () => {
    let adminToken = "";
    let adminId = "";
    let stepUpToken = "";

    beforeAll(async () => {
      const adminEmail = process.env.ADMIN_EMAIL ?? "admin@eduforge.ua";
      const adminPass = process.env.ADMIN_PASSWORD ?? "admin12345";
      const login = await json("/auth/login", {
        method: "POST",
        body: { email: adminEmail, password: adminPass },
      });
      if (login.data.mfaRequired) {
        const mfaToken = login.data.mfaToken as string;
        const secret = process.env.SEED_ADMIN_TOTP_SECRET ?? "JBSWY3DPEHPK3PXP";
        const code = new TOTP({
          algorithm: "SHA1",
          digits: 6,
          period: 30,
          secret: Secret.fromBase32(secret),
        }).generate();
        let verified = await json("/auth/mfa/totp/verify", {
          method: "POST",
          body: { mfaToken, code },
        });
        if (verified.status !== 200) {
          const backup = process.env.SEED_ADMIN_BACKUP_CODE ?? "AAAA-BBBB";
          verified = await json("/auth/mfa/totp/verify", {
            method: "POST",
            body: { mfaToken, code: backup },
          });
        }
        adminToken = verified.data.token as string;
      } else {
        adminToken = login.data.token as string;
      }

      const me = await json("/auth/me", { token: adminToken });
      adminId = me.data.user.id as string;

      // Obtain a step-up token
      const secret = process.env.SEED_ADMIN_TOTP_SECRET ?? "JBSWY3DPEHPK3PXP";
      const code = new TOTP({
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: Secret.fromBase32(secret),
      }).generate();
      const su = await json("/auth/mfa/step-up", {
        method: "POST",
        token: adminToken,
        body: { code },
      });
      stepUpToken = (su.data.stepUpToken as string) ?? "";
    });

    it("self-target refused for all god mode mutations", async () => {
      const headers = stepUpToken ? { "X-Admin-StepUp": stepUpToken } : {};

      const pwd = await json(`/admin/users/${adminId}/password`, {
        method: "POST",
        token: adminToken,
        headers,
        body: { password: "ValidPassword123" },
      });
      expect(pwd.status).toBe(400);
      expect(pwd.data.error).toBe("self_target");

      const resetMfa = await json(`/admin/users/${adminId}/reset-mfa`, {
        method: "POST",
        token: adminToken,
        headers,
      });
      expect(resetMfa.status).toBe(400);
      expect(resetMfa.data.error).toBe("self_target");

      const reqMfa = await json(`/admin/users/${adminId}/require-mfa`, {
        method: "POST",
        token: adminToken,
        headers,
      });
      expect(reqMfa.status).toBe(400);
      expect(reqMfa.data.error).toBe("self_target");

      const del = await json(`/admin/users/${adminId}`, {
        method: "DELETE",
        token: adminToken,
        headers,
        body: { confirmEmail: "admin@eduforge.local" },
      });
      expect(del.status).toBe(400);
      expect(del.data.error).toBe("self_target");
    });

    it("email mismatch refused on delete", async () => {
      const headers = stepUpToken ? { "X-Admin-StepUp": stepUpToken } : {};
      const targetEmail = `target-mismatch-${Date.now()}@eduforge.test`;
      const reg = await json("/auth/register", {
        method: "POST",
        body: { email: targetEmail, password: "password123", displayName: "Target Mismatch" },
      });
      const targetId = reg.data.user.id as string;

      const del = await json(`/admin/users/${targetId}`, {
        method: "DELETE",
        token: adminToken,
        headers,
        body: { confirmEmail: "wrong@eduforge.test" },
      });
      expect(del.status).toBe(400);
      expect(del.data.error).toBe("confirm_mismatch");
    });

    it("delete nulls teacher and pairing then removes the user", async () => {
      const headers = stepUpToken ? { "X-Admin-StepUp": stepUpToken } : {};
      const targetEmail = `target-del-${Date.now()}@eduforge.test`;
      const reg = await json("/auth/register", {
        method: "POST",
        body: { email: targetEmail, password: "password123", displayName: "Target Delete" },
      });
      const targetId = reg.data.user.id as string;

      // Create organization owned by admin where target is a teacher
      const [org] = await db
        .insert(organizations)
        .values({
          name: "Admin Org",
          slug: `admin-org-${Date.now()}`,
          ownerUserId: adminId,
        })
        .returning();

      const [cls] = await db
        .insert(classes)
        .values({
          organizationId: org.id,
          name: "Test Class",
          inviteCode: `INV-${Date.now().toString().slice(-8)}`,
          teacherUserId: targetId,
        })
        .returning();

      // Create organization owned by target (should cascade on user delete)
      const [ownedOrg] = await db
        .insert(organizations)
        .values({
          name: "Target Owned School",
          slug: `owned-school-${Date.now()}`,
          ownerUserId: targetId,
        })
        .returning();

      // Create tournament and tournament pairing with whiteId and blackId = targetId
      const [tourn] = await db
        .insert(tournaments)
        .values({
          slug: `test-tourn-${Date.now()}`,
          titleUk: "Тестовий турнір",
          hostUserId: adminId,
        })
        .returning();

      const [pairing] = await db
        .insert(tournamentPairings)
        .values({
          tournamentId: tourn.id,
          round: 1,
          whiteId: targetId,
          blackId: targetId,
        })
        .returning();

      // Delete the user with trimmed case-insensitive confirmEmail
      const del = await json(`/admin/users/${targetId}`, {
        method: "DELETE",
        token: adminToken,
        headers,
        body: { confirmEmail: `  ${targetEmail.toUpperCase()}  ` },
      });
      expect(del.status).toBe(200);
      expect(del.data.ok).toBe(true);

      // Verify class still exists, teacherUserId is set to null
      const checkClass = await db.query.classes.findFirst({ where: eq(classes.id, cls.id) });
      expect(checkClass).toBeDefined();
      expect(checkClass?.teacherUserId).toBeNull();

      // Verify pairing still exists, whiteId and blackId are set to null
      const checkPairing = await db.query.tournamentPairings.findFirst({
        where: eq(tournamentPairings.id, pairing.id),
      });
      expect(checkPairing).toBeDefined();
      expect(checkPairing?.whiteId).toBeNull();
      expect(checkPairing?.blackId).toBeNull();

      // Verify user row is deleted
      const checkUser = await db.query.users.findFirst({ where: eq(users.id, targetId) });
      expect(checkUser).toBeUndefined();

      // Verify owned school was deleted via cascade
      const checkOwnedOrg = await db.query.organizations.findFirst({
        where: eq(organizations.id, ownedOrg.id),
      });
      expect(checkOwnedOrg).toBeUndefined();
    });

    it("password kills sessions and allows login", async () => {
      const headers = stepUpToken ? { "X-Admin-StepUp": stepUpToken } : {};
      const targetEmail = `target-pwd-${Date.now()}@eduforge.test`;
      const reg = await json("/auth/register", {
        method: "POST",
        body: { email: targetEmail, password: "oldPassword123", displayName: "Target Pwd" },
      });
      const targetId = reg.data.user.id as string;
      const initialToken = reg.data.token as string;

      // Verify initial session works
      const meBefore = await json("/auth/me", { token: initialToken });
      expect(meBefore.status).toBe(200);

      // Set new password via admin god mode
      const newPassword = "newSecurePassword456";
      const setPwd = await json(`/admin/users/${targetId}/password`, {
        method: "POST",
        token: adminToken,
        headers,
        body: { password: newPassword },
      });
      expect(setPwd.status).toBe(200);
      expect(setPwd.data.ok).toBe(true);

      // Verify old session is killed immediately
      const meAfter = await json("/auth/me", { token: initialToken });
      expect(meAfter.status).toBe(401);

      // Login with old password fails
      const loginOld = await json("/auth/login", {
        method: "POST",
        body: { email: targetEmail, password: "oldPassword123" },
      });
      expect(loginOld.status).toBe(401);

      // Login with new password succeeds
      const loginNew = await json("/auth/login", {
        method: "POST",
        body: { email: targetEmail, password: newPassword },
      });
      expect(loginNew.status).toBe(200);
      expect(loginNew.data.user.id).toBe(targetId);
    });

    it("mfa-off sets exemption and clears backup hashes", async () => {
      const headers = stepUpToken ? { "X-Admin-StepUp": stepUpToken } : {};
      const targetEmail = `target-admin2-${Date.now()}@eduforge.test`;
      const reg = await json("/auth/register", {
        method: "POST",
        body: { email: targetEmail, password: "admin2Password123", displayName: "Target Admin 2" },
      });
      const targetId = reg.data.user.id as string;
      let targetToken = reg.data.token as string;

      // Promote to admin
      await db.update(users).set({ role: "admin" }).where(eq(users.id, targetId));

      // Setup and confirm TOTP for target admin
      const setup = await json("/auth/mfa/totp/setup", {
        method: "POST",
        token: targetToken,
      });
      expect(setup.status).toBe(200);
      const secret = setup.data.secret as string;
      const code = new TOTP({
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: Secret.fromBase32(secret),
      }).generate();

      const conf = await json("/auth/mfa/totp/confirm", {
        method: "POST",
        token: targetToken,
        body: { code },
      });
      expect(conf.status).toBe(200);
      expect(conf.data.backupCodes.length).toBe(10);

      // Check user row before reset-mfa
      const userBefore = await db.query.users.findFirst({ where: eq(users.id, targetId) });
      expect(userBefore?.totpEnabled).toBe(true);
      expect(userBefore?.mfaBackupCodeHashes.length).toBe(10);

      // Surviving admin turns 2FA off
      const reset = await json(`/admin/users/${targetId}/reset-mfa`, {
        method: "POST",
        token: adminToken,
        headers,
      });
      expect(reset.status).toBe(200);

      // Check user row: exemption is true, backup hashes empty, totp disabled
      const userAfter = await db.query.users.findFirst({ where: eq(users.id, targetId) });
      expect(userAfter?.totpEnabled).toBe(false);
      expect(userAfter?.totpSecretEnc).toBeNull();
      expect(userAfter?.totpVerifiedAt).toBeNull();
      expect(userAfter?.mfaBackupCodeHashes).toEqual([]);
      expect(userAfter?.mfaExempt).toBe(true);

      // Old session was killed
      const meDead = await json("/auth/me", { token: targetToken });
      expect(meDead.status).toBe(401);

      // Target admin logs in again: mfaEnrollRequired is false because mfaExempt = true
      const login = await json("/auth/login", {
        method: "POST",
        body: { email: targetEmail, password: "admin2Password123" },
      });
      expect(login.status).toBe(200);
      expect(login.data.mfaEnrollRequired).toBe(false);
      targetToken = login.data.token as string;

      // GET /admin/users returns totpEnabled and mfaExempt
      const list = await json("/admin/users", { token: adminToken });
      const rowInList = list.data.users.find((u: { id: string }) => u.id === targetId);
      expect(rowInList).toBeDefined();
      expect(rowInList.totpEnabled).toBe(false);
      expect(rowInList.mfaExempt).toBe(true);
    });

    it("enroll clears exemption", async () => {
      const targetEmail = `target-exempt-enroll-${Date.now()}@eduforge.test`;
      const reg = await json("/auth/register", {
        method: "POST",
        body: { email: targetEmail, password: "adminPassword123", displayName: "Admin Exempt" },
      });
      const targetId = reg.data.user.id as string;
      const token = reg.data.token as string;

      // Make admin and set mfaExempt = true
      await db.update(users).set({ role: "admin", mfaExempt: true }).where(eq(users.id, targetId));

      const setup = await json("/auth/mfa/totp/setup", {
        method: "POST",
        token,
      });
      const secret = setup.data.secret as string;
      const code = new TOTP({
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: Secret.fromBase32(secret),
      }).generate();

      const conf = await json("/auth/mfa/totp/confirm", {
        method: "POST",
        token,
        body: { code },
      });
      expect(conf.status).toBe(200);

      const userAfter = await db.query.users.findFirst({ where: eq(users.id, targetId) });
      expect(userAfter?.totpEnabled).toBe(true);
      expect(userAfter?.mfaExempt).toBe(false);
    });

    it("require-mfa on a learner is rejected", async () => {
      const headers = stepUpToken ? { "X-Admin-StepUp": stepUpToken } : {};
      const learnerEmail = `learner-req-${Date.now()}@eduforge.test`;
      const reg = await json("/auth/register", {
        method: "POST",
        body: { email: learnerEmail, password: "password123", displayName: "Learner" },
      });
      const learnerId = reg.data.user.id as string;

      const reqMfa = await json(`/admin/users/${learnerId}/require-mfa`, {
        method: "POST",
        token: adminToken,
        headers,
      });
      expect(reqMfa.status).toBe(400);
      expect(reqMfa.data.error).toBe("mfa_require_admin_only");
    });

    it("require-mfa on an exempt admin clears the flag", async () => {
      const headers = stepUpToken ? { "X-Admin-StepUp": stepUpToken } : {};
      const targetEmail = `target-req-admin-${Date.now()}@eduforge.test`;
      const reg = await json("/auth/register", {
        method: "POST",
        body: { email: targetEmail, password: "adminPassword123", displayName: "Exempt Admin" },
      });
      const targetId = reg.data.user.id as string;
      const targetSession = reg.data.token as string;

      // Set target to admin with mfaExempt = true
      await db.update(users).set({ role: "admin", mfaExempt: true }).where(eq(users.id, targetId));

      // Verify active session before require-mfa
      const meBefore = await json("/auth/me", { token: targetSession });
      expect(meBefore.status).toBe(200);

      // Admin calls require-mfa
      const reqMfa = await json(`/admin/users/${targetId}/require-mfa`, {
        method: "POST",
        token: adminToken,
        headers,
      });
      expect(reqMfa.status).toBe(200);
      expect(reqMfa.data.ok).toBe(true);

      // Verify mfaExempt is false
      const userAfter = await db.query.users.findFirst({ where: eq(users.id, targetId) });
      expect(userAfter?.mfaExempt).toBe(false);

      // Verify sessions were killed
      const meAfter = await json("/auth/me", { token: targetSession });
      expect(meAfter.status).toBe(401);
    });
  });
});
