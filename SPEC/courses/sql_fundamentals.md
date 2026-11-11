# SQL Fundamentals

Slug: `sql_fundamentals`
Group: deep
Hub: `/sql-fundamentals`
Freemium: first 6 non-exam lesson(s) open without Pro.
Prerequisites: `programming`
Recommended next: `postgresql_apps`

## What this course is

Oracle SQL along the public 1Z0-071 checklist: SELECT, functions, joins, subqueries, set operators, DML/DDL, views, privileges, query repair, and explicit Oracle ↔ PostgreSQL dialect notes.

## Program

### `select` — SELECT and the model

- `sqlf-rel-model` — Tables, keys, NULL [free] (4 exercises)
- `sqlf-select` — SELECT / FROM [free] (3 exercises)
- `sqlf-distinct-alias` — DISTINCT, aliases, expressions [free] (4 exercises)
- `sqlf-dual-quote` — DUAL, q-quote, concatenation [free] (4 exercises)
- `sqlf-where` — WHERE filters [free] (3 exercises)
- `sqlf-select-exam` — Exam: SELECT [exam] (4 exercises)

### `order-limit` — Filters and sorting

- `sqlf-order` — Sorting (3 exercises)
- `sqlf-limit` — LIMIT / OFFSET (3 exercises)
- `sqlf-between-like` — BETWEEN, IN, LIKE (4 exercises)
- `sqlf-fetch-nulls` — FETCH, NULLS, ROWNUM (4 exercises)
- `sqlf-order-exam` — Exam: order/limit [exam] (4 exercises)

### `single-row` — Single-row functions

- `sqlf-char-fn` — Character functions (4 exercises)
- `sqlf-num-fn` — Numeric functions (4 exercises)
- `sqlf-date-fn` — Dates (4 exercises)
- `sqlf-fn-exam` — Exam: character, number, date [exam] (6 exercises)

### `conversion` — Conversion, NULL, CASE

- `sqlf-convert` — TO_CHAR, TO_DATE, TO_NUMBER (4 exercises)
- `sqlf-null-fns` — NVL, NVL2, NULLIF, COALESCE (4 exercises)
- `sqlf-case-decode` — CASE and DECODE (4 exercises)
- `sqlf-cv-exam` — Exam: conversion and conditions [exam] (6 exercises)

### `aggregates` — Aggregates

- `sqlf-agg` — COUNT / SUM / AVG (3 exercises)
- `sqlf-group` — GROUP BY / HAVING (3 exercises)
- `sqlf-group-rules` — GROUP BY rules (4 exercises)
- `sqlf-agg-exam` — Exam: aggregates [exam] (4 exercises)

### `joins` — JOINs

- `sqlf-inner` — INNER JOIN (3 exercises)
- `sqlf-left` — LEFT JOIN (3 exercises)
- `sqlf-join-using` — USING, NATURAL, self join (4 exercises)
- `sqlf-outer-traps` — OUTER, CROSS, WHERE traps (4 exercises)
- `sqlf-join-exam` — Exam: JOINs [exam] (4 exercises)

### `subqueries` — Subqueries

- `sqlf-sq-single` — Single-row subquery (4 exercises)
- `sqlf-sq-multi` — IN, ANY, ALL (4 exercises)
- `sqlf-sq-exists` — Correlation and EXISTS (4 exercises)
- `sqlf-sq-exam` — Exam: subqueries [exam] (6 exercises)

### `set-ops` — Set operators

- `sqlf-union` — UNION and UNION ALL (4 exercises)
- `sqlf-minus-intersect` — INTERSECT and MINUS (4 exercises)
- `sqlf-set-exam` — Exam: set operators [exam] (6 exercises)

### `dml` — INSERT / UPDATE / DELETE

- `sqlf-insert` — INSERT (2 exercises)
- `sqlf-update-delete` — UPDATE / DELETE (3 exercises)
- `sqlf-merge` — MERGE and INSERT ALL (4 exercises)
- `sqlf-tx` — COMMIT, ROLLBACK, SAVEPOINT (4 exercises)
- `sqlf-dml-exam` — Exam: DML [exam] (4 exercises)

### `modeling` — Keys & modeling

- `sqlf-keys` — PRIMARY / FOREIGN KEY (3 exercises)
- `sqlf-index` — Indexes intro (3 exercises)
- `sqlf-ddl-create` — CREATE TABLE and constraints (4 exercises)
- `sqlf-ddl-alter` — ALTER, DROP, TRUNCATE (4 exercises)
- `sqlf-model-exam` — Exam: modeling [exam] (4 exercises)

### `schema-objects` — Sequences, views, synonyms

- `sqlf-sequences` — Sequences (4 exercises)
- `sqlf-views` — Views (4 exercises)
- `sqlf-synonyms` — Synonyms and indexes (4 exercises)
- `sqlf-schema-exam` — Exam: schema objects [exam] (6 exercises)

### `access-dict` — Privileges, dictionary, time

- `sqlf-grant` — GRANT and roles (4 exercises)
- `sqlf-dictionary` — Data dictionary (4 exercises)
- `sqlf-time` — Time zones (4 exercises)
- `sqlf-access-exam` — Exam: access, dictionary, time [exam] (6 exercises)

### `windows` — NULL and window functions

- `sqlf-null-coalesce` — NULL & COALESCE [free] (4 exercises)
- `sqlf-window-row` — ROW_NUMBER / OVER (3 exercises)
- `sqlf-window-rank` — RANK vs DENSE_RANK (3 exercises)
- `sqlf-window-exam` — Exam: windows [exam] (4 exercises)

### `query_repair_scenarios` — Scenario: Query Repair & Debugging

- `sql-repair-group-having` — Repairing GROUP BY & HAVING errors (3 exercises)
- `sql-repair-join-pitfalls` — Repairing Cartesian joins & predicate traps (3 exercises)
- `sql-repair-null-subqueries` — Repairing NULL traps in NOT IN subqueries (3 exercises)
- `sql-rep-exam` — Exam: query repair [exam] (4 exercises)

### `dataset_diagnosis` — Dataset Result Diagnosis & Dialect Notes

- `sqlf-dataset-predict` — Predict query output on a sample dataset (JOIN, NULL, COUNT) (3 exercises)
- `sqlf-ds-exam` — Exam: dataset diagnosis & SQL dialects [exam] (4 exercises)

### `capstone` — Capstone

- `sqlf-capstone-query` — Scenario: users + orders (4 exercises)
- `sqlf-cap-exam` — Final SQL exam [exam] (12 exercises)

## Depth now

- Units: 16
- Lessons: 65
- Exams: 16
- Free non-exam lessons: 6
- Exercise types in seed: code_fill, code_order, code_output, code_read, match, mcq

## References

- Oracle 1Z0-071 / PostgreSQL comparison dialect notes

