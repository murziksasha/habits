/**
 * Browser error tracking, optional. NEXT_PUBLIC_SENTRY_DSN is inlined at build
 * time: when it is empty this whole branch is removed from the bundle and
 * @sentry/nextjs is never downloaded.
 */
const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  void import("@sentry/nextjs").then((Sentry) => {
    Sentry.init({
      dsn,
      environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || process.env.NODE_ENV,
      tracesSampleRate: 0,
      initialScope: { tags: { service: "web" } },
    });
  });
}

export {};
