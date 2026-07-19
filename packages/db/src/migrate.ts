import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const url =
    process.env.DATABASE_URL ??
    "postgresql://eduforge:eduforge@localhost:5432/eduforge";
  const client = postgres(url, { max: 1 });
  const db = drizzle(client);
  const migrationsFolder = path.join(__dirname, "..", "drizzle");
  console.log("Migrating…", migrationsFolder);
  await migrate(db, { migrationsFolder });
  console.log("Migrations complete");
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
