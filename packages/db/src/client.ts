import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.js";
import { loadRootEnv } from "./load-env.js";

export function createDb(connectionString?: string) {
  loadRootEnv();
  const url =
    connectionString ??
    process.env.DATABASE_URL ??
    "postgresql://eduforge:eduforge@localhost:5432/eduforge";
  const client = postgres(url, { max: 10 });
  return drizzle(client, { schema });
}

export type Db = ReturnType<typeof createDb>;
