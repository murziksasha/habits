# SQL Fundamentals

Slug: `sql_fundamentals`
Group: deep
Hub: `/sql-fundamentals`
Access: Free for every account (no Pro, trial, or paywall).
Prerequisites: `programming`
Recommended next: `postgresql_apps`

## What this course is

Oracle SQL along the public 1Z0-071 checklist: SELECT, functions, joins, subqueries, set operators, DML/DDL, views, privileges, query repair, and explicit Oracle ↔ PostgreSQL dialect notes.

## Program

### `select` — SELECT and the model

- `sqlf-rel-model` — Tables, keys, NULL (5 exercises)
- `sqlf-select` — SELECT / FROM (4 exercises)
- `sqlf-distinct-alias` — DISTINCT, aliases, expressions (5 exercises)
- `sqlf-dual-quote` — DUAL, q-quote, concatenation (5 exercises)
- `sqlf-where` — WHERE filters (4 exercises)
- `sqlf-select-exam` — Exam: SELECT [exam] (4 exercises)

### `order-limit` — Filters and sorting

- `sqlf-order` — Sorting (4 exercises)
- `sqlf-limit` — LIMIT / OFFSET (4 exercises)
- `sqlf-between-like` — BETWEEN, IN, LIKE (5 exercises)
- `sqlf-fetch-nulls` — FETCH, NULLS, ROWNUM (5 exercises)
- `sqlf-order-exam` — Exam: order/limit [exam] (4 exercises)

### `single-row` — Single-row functions

- `sqlf-char-fn` — Character functions (5 exercises)
- `sqlf-num-fn` — Numeric functions (5 exercises)
- `sqlf-date-fn` — Dates (5 exercises)
- `sqlf-fn-exam` — Exam: character, number, date [exam] (6 exercises)

### `conversion` — Conversion, NULL, CASE

- `sqlf-convert` — TO_CHAR, TO_DATE, TO_NUMBER (5 exercises)
- `sqlf-null-fns` — NVL, NVL2, NULLIF, COALESCE (5 exercises)
- `sqlf-case-decode` — CASE and DECODE (5 exercises)
- `sqlf-cv-exam` — Exam: conversion and conditions [exam] (6 exercises)

### `aggregates` — Aggregates

- `sqlf-agg` — COUNT / SUM / AVG (4 exercises)
- `sqlf-group` — GROUP BY / HAVING (4 exercises)
- `sqlf-group-rules` — GROUP BY rules (5 exercises)
- `sqlf-agg-exam` — Exam: aggregates [exam] (4 exercises)

### `joins` — JOINs

- `sqlf-inner` — INNER JOIN (4 exercises)
- `sqlf-left` — LEFT JOIN (4 exercises)
- `sqlf-join-using` — USING, NATURAL, self join (5 exercises)
- `sqlf-outer-traps` — OUTER, CROSS, WHERE traps (5 exercises)
- `sqlf-join-exam` — Exam: JOINs [exam] (4 exercises)

### `subqueries` — Subqueries

- `sqlf-sq-single` — Single-row subquery (6 exercises)
- `sqlf-sq-multi` — IN, ANY, ALL (6 exercises)
- `sqlf-sq-exists` — Correlation and EXISTS (5 exercises)
- `sqlf-sq-exam` — Exam: subqueries [exam] (6 exercises)

### `set-ops` — Set operators

- `sqlf-union` — UNION and UNION ALL (6 exercises)
- `sqlf-minus-intersect` — INTERSECT and MINUS (5 exercises)
- `sqlf-set-exam` — Exam: set operators [exam] (6 exercises)

### `dml` — INSERT / UPDATE / DELETE

- `sqlf-insert` — INSERT (3 exercises)
- `sqlf-update-delete` — UPDATE / DELETE (4 exercises)
- `sqlf-merge` — MERGE and INSERT ALL (5 exercises)
- `sqlf-tx` — COMMIT, ROLLBACK, SAVEPOINT (6 exercises)
- `sqlf-dml-exam` — Exam: DML [exam] (4 exercises)

### `modeling` — Keys & modeling

- `sqlf-keys` — PRIMARY / FOREIGN KEY (4 exercises)
- `sqlf-index` — Indexes intro (4 exercises)
- `sqlf-ddl-create` — CREATE TABLE and constraints (5 exercises)
- `sqlf-ddl-alter` — ALTER, DROP, TRUNCATE (5 exercises)
- `sqlf-model-exam` — Exam: modeling [exam] (4 exercises)

### `schema-objects` — Sequences, views, synonyms

- `sqlf-sequences` — Sequences (6 exercises)
- `sqlf-views` — Views (5 exercises)
- `sqlf-synonyms` — Synonyms and indexes (6 exercises)
- `sqlf-schema-exam` — Exam: schema objects [exam] (6 exercises)

### `access-dict` — Privileges, dictionary, time

- `sqlf-grant` — GRANT and roles (5 exercises)
- `sqlf-dictionary` — Data dictionary (5 exercises)
- `sqlf-time` — Time zones (5 exercises)
- `sqlf-access-exam` — Exam: access, dictionary, time [exam] (6 exercises)

### `windows` — NULL and window functions

- `sqlf-null-coalesce` — NULL & COALESCE (5 exercises)
- `sqlf-window-row` — ROW_NUMBER / OVER (5 exercises)
- `sqlf-window-rank` — RANK vs DENSE_RANK (4 exercises)
- `sqlf-window-exam` — Exam: windows [exam] (4 exercises)

### `query_repair_scenarios` — Scenario: Query Repair & Debugging

- `sql-repair-group-having` — Repairing GROUP BY & HAVING errors (4 exercises)
- `sql-repair-join-pitfalls` — Repairing Cartesian joins & predicate traps (4 exercises)
- `sql-repair-null-subqueries` — Repairing NULL traps in NOT IN subqueries (4 exercises)
- `sql-rep-exam` — Exam: query repair [exam] (4 exercises)

### `dataset_diagnosis` — Dataset Result Diagnosis & Dialect Notes

- `sqlf-dataset-predict` — Predict query output on a sample dataset (JOIN, NULL, COUNT) (4 exercises)
- `sqlf-ds-exam` — Exam: dataset diagnosis & SQL dialects [exam] (4 exercises)

### `capstone` — Capstone

- `sqlf-capstone-query` — Scenario: users + orders (7 exercises)
- `sqlf-cap-exam` — Final SQL exam [exam] (14 exercises)

## Depth now

- Units: 44
- Lessons: 178
- Exams: 44
- Free non-exam lessons: 6
- Exercise types in seed: code_fill, code_order, code_output, code_read, match, mcq

## References

- Oracle 1Z0-071 / PostgreSQL comparison dialect notes

## Expansion (Nov 2026)

Applied transfer: `sql-transfer-report` in `sql_profiling` preserves customers with no orders through aggregation and LEFT JOIN.

Additional bilingual (uk+en) lessons shipped in `packages/content/src/expansion/`.

New units:

- `hierarchical_queries` — Hierarchies: CONNECT BY and recursive WITH (4 lessons including exam)
- `materialized_views` — Materialized views and query rewrite (4 lessons including exam)
- `table_partitioning` — Table partitioning and partition pruning (4 lessons including exam)
- `sql_profiling` — SQL profiling: the monitor, ASH, and bind peeking (4 lessons including exam)
