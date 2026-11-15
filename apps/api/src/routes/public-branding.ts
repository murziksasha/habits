import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { platformSettings } from "@eduforge/db";
import { DEFAULT_PLATFORM_THEME, type PlatformTheme } from "@eduforge/shared";
import { db } from "../db.js";

export const publicBrandingRoutes = new Hono();

publicBrandingRoutes.get("/branding", async (c) => {
  try {
    const row = await db.query.platformSettings.findFirst({
      where: eq(platformSettings.key, "theme_published"),
    });
    const theme = (row?.value as PlatformTheme | undefined) ?? DEFAULT_PLATFORM_THEME;
    c.header("Cache-Control", "public, max-age=60");
    return c.json({ theme });
  } catch {
    return c.json({ theme: DEFAULT_PLATFORM_THEME });
  }
});
