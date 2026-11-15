import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postgres from "postgres";

export async function runMigrations(
  databaseUrl = process.env.DATABASE_URL ??
    "postgres://forgeboard:forgeboard@127.0.0.1:5432/forgeboard",
) {
  const sql = postgres(databaseUrl, { max: 1 });
  try {
    const migDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../migrations");
    const files = fs
      .readdirSync(migDir)
      .filter((f) => f.endsWith(".sql"))
      .sort();
    for (const file of files) {
      const ddl = fs.readFileSync(path.join(migDir, file), "utf8");
      await sql.unsafe(ddl);
    }
  } finally {
    await sql.end();
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("migrate.ts")) {
  await runMigrations();
  console.log("Migrations applied");
}
