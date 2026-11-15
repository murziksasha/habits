import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EduForge Playground Embed",
  robots: { index: false, follow: false },
};

/**
 * Embed layout: minimal chrome (root layout still wraps; nav hides on /embed).
 * Sandbox: child iframes use allow-scripts only (no same-origin).
 * Framing: CSP frame-ancestors set in next.config for /embed/*.
 */
export default function EmbedPlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {children}
    </div>
  );
}
