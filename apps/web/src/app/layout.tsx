import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import { LocaleProvider } from "@/lib/locale-context";
import { ThemeProvider } from "@/lib/theme-context";
import { Nav } from "@/components/nav";
import { PwaRegister } from "@/components/pwa-register";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "EduForge — навчання, що прокачує",
  description:
    "Англійська, шахи, друк, швидкочитання та логіка. Прокачка персонажа, рейтинг, онлайн-шахи.",
  manifest: "/manifest.webmanifest",
  themeColor: "#58CC02",
  appleWebApp: {
    capable: true,
    title: "EduForge",
    statusBarStyle: "default",
  },
  other: { "content-language": "uk" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body className={`${manrope.variable} font-sans`}>
        <ThemeProvider>
          <LocaleProvider>
            <AuthProvider>
              <PwaRegister />
              <Nav />
              <main className="mx-auto max-w-6xl px-4 py-8 pb-24 md:pb-8">{children}</main>
            </AuthProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
