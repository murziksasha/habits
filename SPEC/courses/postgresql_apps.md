# PostgreSQL for Web Applications

Slug: `postgresql_apps`
Group: deep
Hub: `/postgresql-apps`
Freemium: first 5 non-exam lesson(s) open without Pro.
Prerequisites: `express_fundamentals`, `sql_fundamentals`
Recommended next: `software_testing`, `web_security`, `nextjs_fullstack`

## What this course is

Relational modeling, constraints and migrations, parameterized CRUD, joins and keyset pagination, ACID transactions, query plans, and ForgeBoard DB.

## Local ForgeBoard Labs

- **Milestone 6 (`forgeboard-m6-postgres` v1.0.0)** on lesson `pg-forgeboard-db-lab` — `/labs/forgeboard-m6-postgres-v1.0.0.zip` (`assessmentMode: "local_practice"`, runtime: Node >= 20, pnpm >= 9, Docker + PostgreSQL 16)

## Program

### `pg_relational_modeling` — Relational Modeling for Web Apps

- `pg-rm-entities` — Entities, Keys & 1:N Modeling in PostgreSQL [free] (2 exercises)
- `pg-rm-normalization` — Avoiding Anomalies & Foreign Key Actions [free] (1 exercises)
- `pg-rm-exam` — Checkpoint: Relational Modeling [exam] (2 exercises)

### `pg_constraints_migrations` — Constraints & Safe Schema Migrations

- `pg-cm-constraints` — CHECK Constraints & Partial Unique Indexes [free] (2 exercises)
- `pg-cm-migrations` — Forward-Only Versioned Migrations & Lock Safety [free] (2 exercises)
- `pg-cm-exam` — Checkpoint: Constraints & Migrations [exam] (2 exercises)

### `pg_parameterized_crud` — Parameterized CRUD & Returning Clauses

- `pg-crud-params` — Bind Parameters ($1) & RETURNING [free] (2 exercises)
- `pg-crud-upsert` — Idempotent Upserts with ON CONFLICT (1 exercises)
- `pg-crud-exam` — Checkpoint: Parameterized CRUD [exam] (2 exercises)

### `pg_joins_pagination` — Joins, Aggregations & Pagination

- `pg-jp-joins` — Eliminating N+1 & Safe Aggregate Joins (2 exercises)
- `pg-jp-pagination` — Keyset (Cursor) vs Offset Pagination (2 exercises)
- `pg-jp-exam` — Checkpoint: Joins & Pagination [exam] (2 exercises)

### `pg_transactions_concurrency` — Transactions, Isolation & Concurrency

- `pg-tc-acid` — Atomic Multi-Step Transactions (2 exercises)
- `pg-tc-locking` — Preventing Lost Updates with FOR UPDATE (1 exercises)
- `pg-tc-exam` — Checkpoint: Transactions & Locking [exam] (2 exercises)

### `pg_indexes_plans_capstone` — Indexes, Query Plans & ForgeBoard DB

- `pg-ip-indexes` — Composite B-Tree Indexes & EXPLAIN ANALYZE (2 exercises)
- `pg-forgeboard-db-lab` — Lab: ForgeBoard Migrations & Postgres Layer (M6) (2 exercises)
- `pg-ip-exam` — Checkpoint: Postgres Indexes & Plans [exam] (2 exercises)

## Depth now

- Units: 6
- Lessons: 18
- Exams: 6
- Free non-exam lessons: 5
- Exercise types in seed: code_fill, code_order, code_output, code_project, code_read, match, mcq

## References

- PostgreSQL Tutorial & Documentation: https://www.postgresql.org/docs/current/tutorial.html

