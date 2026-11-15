/**
 * Table definitions live in `tables.ts` (single module avoids circular FK issues).
 * Domain barrels (`identity.ts`, `learning.ts`, …) re-export subsets for readable imports:
 *   import { users } from "@eduforge/db/schema/identity"  // optional path
 * Main package still: import { users } from "@eduforge/db"
 *
 * Do not re-export domain namespaces here — drizzle `schema` object must only contain tables/enums.
 */
export * from "./tables.js";
