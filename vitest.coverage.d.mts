export declare function coverage(
  thresholds: { lines: number; functions: number; branches: number; statements: number },
  opts?: { include?: string[]; exclude?: string[] },
): Record<string, unknown>;
