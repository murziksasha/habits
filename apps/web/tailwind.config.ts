import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--ef-brand)",
          dark: "var(--ef-brand-dark)",
          soft: "var(--ef-brand-soft)",
        },
        ink: {
          DEFAULT: "var(--ef-ink)",
          muted: "var(--ef-ink-muted)",
        },
        sky: "var(--ef-sky)",
        grape: "var(--ef-grape)",
        sun: "var(--ef-sun)",
      },
      boxShadow: {
        card: "var(--ef-shadow-card)",
        btn: "0 1px 2px rgba(15, 23, 42, 0.12)",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
