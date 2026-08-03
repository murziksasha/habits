import { Hono } from "hono";
import { resolveFeatureFlags } from "@eduforge/shared";
import { authMiddleware, optionalAuth, type AuthedUser } from "../auth.js";
import { buildHomePayload } from "../services/home.js";

type Vars = { user: AuthedUser };

export const meRoutes = new Hono<{ Variables: Vars }>();

/** Dashboard BFF — progress, next steps, exams, race, activity. */
meRoutes.get("/home", authMiddleware, async (c) => {
  const user = c.get("user");
  const payload = await buildHomePayload(user.id);
  return c.json(payload);
});

/** Public-ish feature flags (no secrets) for web clients. */
meRoutes.get("/flags", optionalAuth, async (c) => {
  const flags = resolveFeatureFlags();
  return c.json({
    flags: {
      labs: flags.labs,
      tutorAi: flags.tutor_ai,
      strictCsrf: flags.strict_csrf,
      parentDigest: flags.parent_digest,
      pushReengage: flags.push_reengage,
    },
  });
});
