import { z } from "zod";

const hexColor = z.string().regex(/^#[0-9A-Fa-f]{6}$/, "invalid_hex");

export const themeTokenSchema = z.object({
  brand: hexColor,
  brandDark: hexColor,
  brandSoft: hexColor,
  sky: hexColor,
  grape: hexColor,
  sun: hexColor,
  ink: hexColor,
  inkMuted: hexColor,
  bg: hexColor,
  cardBg: hexColor,
  radiusPx: z.number().int().min(0).max(48),
  shadowCard: z.string().min(1).max(120),
  fontFamily: z.string().max(200).optional(),
});

export const platformThemeSchema = z.object({
  version: z.literal(1),
  branding: z.object({
    productName: z.string().min(1).max(64),
    taglineUk: z.string().max(200).optional(),
    taglineEn: z.string().max(200).optional(),
    logoUrl: z.string().max(500_000).optional(),
    faviconUrl: z.string().max(500_000).optional(),
    supportEmail: z.string().email().optional().or(z.literal("")),
  }),
  tokens: z.object({
    light: themeTokenSchema,
    dark: themeTokenSchema,
  }),
});

export type ThemeTokens = z.infer<typeof themeTokenSchema>;
export type PlatformTheme = z.infer<typeof platformThemeSchema>;

export const DEFAULT_PLATFORM_THEME: PlatformTheme = {
  version: 1,
  branding: {
    productName: "EduForge",
    taglineUk: "Безкоштовне навчання з багатьох предметів",
    taglineEn: "Free learning across many subjects",
    supportEmail: "",
  },
  tokens: {
    light: {
      brand: "#58CC02",
      brandDark: "#166534",
      brandSoft: "#E7F6D8",
      sky: "#0369A1",
      grape: "#7E22CE",
      sun: "#C2410C",
      ink: "#1F2937",
      inkMuted: "#4B5563",
      bg: "#F4F7F5",
      cardBg: "#FFFFFF",
      radiusPx: 16,
      shadowCard: "0 1px 2px rgba(15, 23, 42, 0.06)",
    },
    dark: {
      brand: "#86EFAC",
      brandDark: "#4ADE80",
      brandSoft: "#14532D",
      sky: "#7DD3FC",
      grape: "#D8B4FE",
      sun: "#FDBA74",
      ink: "#F8FAFC",
      inkMuted: "#CBD5E1",
      bg: "#0E1412",
      cardBg: "#16201C",
      radiusPx: 16,
      shadowCard: "0 1px 2px rgba(0, 0, 0, 0.35)",
    },
  },
};

/** CSS custom properties derived from a theme (light mode on :root). */
export function themeToCssVars(theme: PlatformTheme, mode: "light" | "dark" = "light"): Record<string, string> {
  const t = theme.tokens[mode];
  return {
    "--ef-brand": t.brand,
    "--ef-brand-dark": t.brandDark,
    "--ef-brand-soft": t.brandSoft,
    "--ef-sky": t.sky,
    "--ef-grape": t.grape,
    "--ef-sun": t.sun,
    "--ef-ink": t.ink,
    "--ef-ink-muted": t.inkMuted,
    "--ef-bg": t.bg,
    "--ef-card-bg": t.cardBg,
    "--ef-radius": `${t.radiusPx}px`,
    "--ef-shadow-card": t.shadowCard,
    ...(t.fontFamily ? { "--ef-font": t.fontFamily } : {}),
  };
}
