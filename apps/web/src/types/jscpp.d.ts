declare module "JSCPP" {
  export function run(
    code: string,
    input: string,
    config?: {
      stdio?: { write?: (s: string) => void };
      maxTimeout?: number;
    },
  ): number;
  const JSCPP: {
    run: typeof run;
    includes?: unknown;
  };
  export default JSCPP;
}
