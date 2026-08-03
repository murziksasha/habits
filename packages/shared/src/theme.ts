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
    taglineUk: "Навчання, що прокачує",
    taglineEn: "Learning that levels you up",
    supportEmail: "",
  },
  tokens: {
    light: {
      brand: "#58CC02",
      brandDark: "#46A302",
      brandSoft: "#D7FFB8",
      sky: "#1CB0F6",
      grape: "#CE82FF",
      sun: "#FF9600",
      ink: "#3C3C3C",
      inkMuted: "#777777",
      bg: "#F8FAFC",
      cardBg: "#FFFFFF",
      radiusPx: 24,
      shadowCard: "0 4px 0 0 rgba(0,0,0,0.08)",
    },
    dark: {
      brand: "#58CC02",
      brandDark: "#46A302",
      brandSoft: "#1A3D0A",
      sky: "#1CB0F6",
      grape: "#CE82FF",
      sun: "#FF9600",
      ink: "#F1F5F9",
      inkMuted: "#94A3B8",
      bg: "#020617",
      cardBg: "#0F172A",
      radiusPx: 24,
      shadowCard: "0 4px 0 0 rgba(0,0,0,0.35)",
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
