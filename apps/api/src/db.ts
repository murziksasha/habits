import { createDb, type Db } from "@eduforge/db";
import { env } from "./env.js";

export const db: Db = createDb(env.databaseUrl);
