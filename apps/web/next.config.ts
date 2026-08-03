import type { NextConfig } from "next";

/** COOP/COEP for WebContainers (SharedArrayBuffer) on Node Studio. */
const isolationHeaders = [
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
];

const nextConfig: NextConfig = {
  transpilePackages: ["@eduforge/shared"],
  // C++ interpreter used only in the browser for playground / code_run
  serverExternalPackages: ["JSCPP"],
  webpack: (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.fallback = {
      ...(config.resolve.fallback ?? {}),
      fs: false,
      path: false,
      module: false,
    };
    // WebContainer API is browser-only
    config.externals = config.externals ?? [];
    return config;
  },
  async headers() {
    return [
      {
        // Isolate Node Studio page for WebContainers
        source: "/studio/node",
        headers: isolationHeaders,
      },
      {
        source: "/studio/node/:path*",
        headers: isolationHeaders,
      },
      {
        // Same-origin assets must be embeddable under COEP require-corp
        source: "/_next/:path*",
        headers: [
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
  // standalone needs symlink privileges on Windows; enable in Docker via NEXT_OUTPUT=standalone
  ...(process.env.NEXT_OUTPUT === "standalone" ? { output: "standalone" as const } : {}),
};

export default nextConfig;
