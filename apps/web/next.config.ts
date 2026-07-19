import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@eduforge/shared"],
  // standalone needs symlink privileges on Windows; enable in Docker via NEXT_OUTPUT=standalone
  ...(process.env.NEXT_OUTPUT === "standalone" ? { output: "standalone" as const } : {}),
};

export default nextConfig;
