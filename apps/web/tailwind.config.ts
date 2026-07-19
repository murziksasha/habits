import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#58CC02",
          dark: "#46A302",
          soft: "#D7FFB8",
        },
        ink: {
          DEFAULT: "#3C3C3C",
          muted: "#777777",
        },
        sky: "#1CB0F6",
        grape: "#CE82FF",
        sun: "#FF9600",
      },
      boxShadow: {
        card: "0 4px 0 0 rgba(0,0,0,0.08)",
        btn: "0 4px 0 0 rgba(0,0,0,0.15)",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
