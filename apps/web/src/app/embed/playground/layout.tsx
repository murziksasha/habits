import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EduForge Playground Embed",
  robots: { index: false, follow: false },
  other: {
    // Hint for browsers; CSP also set via headers when reverse-proxied
    "x-frame-options": "ALLOWALL",
  },
};

/**
 * Embed layout: minimal chrome (root layout still wraps; nav hides on /embed).
 * Sandbox: child iframes use allow-scripts only (no same-origin).
 */
export default function EmbedPlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/*
        Content-Security-Policy for embed page is best applied at edge.
        Client sandbox attributes on run iframes enforce isolation.
      */}
      {children}
    </div>
  );
}
