# SQL Fundamentals

Slug: `sql_fundamentals`
Group: deep
Hub: `/sql-fundamentals`
Freemium: the first 5 non-exam lessons in path order.

## What this course is

Oracle SQL along the public 1Z0-071 checklist: SELECT, functions, joins, subqueries, set operators, DML/DDL, views, privileges. Original practice, not a copy of a video course.

## Program

### `select` — SELECT and the model

- `sqlf-rel-model` — Tables, keys, NULL. In the relational model, a row is: (4 exercises)
- `sqlf-select` — SELECT / FROM. select all (3 exercises)
- `sqlf-distinct-alias` — DISTINCT, aliases, expressions. SELECT DISTINCT dept_id, job FROM staff removes duplicates of: (4 exercises)
- `sqlf-dual-quote` — DUAL, q-quote, concatenation. Expression with no table (4 exercises)
- `sqlf-where` — WHERE filters. filter (3 exercises)
- `sqlf-select-exam` — Exam: SELECT. Exam. FROM (4 exercises)

### `order-limit` — Filters and sorting

- `sqlf-order` — Sorting. order by (3 exercises)
- `sqlf-limit` — LIMIT / OFFSET. limit (3 exercises)
- `sqlf-between-like` — BETWEEN, IN, LIKE. salary BETWEEN 2000 AND 5000 includes: (4 exercises)
- `sqlf-fetch-nulls` — FETCH, NULLS, ROWNUM. ORDER BY salary ASC in Oracle puts NULLs: (4 exercises)
- `sqlf-order-exam` — Exam: order/limit. Exam. ORDER BY (4 exercises)

### `single-row` — Single-row functions

- `sqlf-char-fn` — Character functions. INITCAP('oracle sql') returns: (4 exercises)
- `sqlf-num-fn` — Numeric functions. ROUND(45.926, 2) equals: (4 exercises)
- `sqlf-date-fn` — Dates. DATE '2024-03-01' + 1 is: (4 exercises)
- `sqlf-fn-exam` — Exam: character, number, date. Exam. LOWER('SQL') = (6 exercises)

### `conversion` — Conversion, NULL, CASE

- `sqlf-convert` — TO_CHAR, TO_DATE, TO_NUMBER. Date from text with a format model (4 exercises)
- `sqlf-null-fns` — NVL, NVL2, NULLIF, COALESCE. NVL(NULL, 10) and NVL(4, 10): (4 exercises)
- `sqlf-case-decode` — CASE and DECODE. Simple CASE (4 exercises)
- `sqlf-cv-exam` — Exam: conversion and conditions. Exam. TO_DATE (6 exercises)

### `aggregates` — Aggregates

- `sqlf-agg` — COUNT / SUM / AVG. count rows (3 exercises)
- `sqlf-group` — GROUP BY / HAVING. group by (3 exercises)
- `sqlf-group-rules` — GROUP BY rules. COUNT(*) and COUNT(email) differ because: (4 exercises)
- `sqlf-agg-exam` — Exam: aggregates. Exam. COUNT (4 exercises)

### `joins` — JOINs

- `sqlf-inner` — INNER JOIN. inner join (3 exercises)
- `sqlf-left` — LEFT JOIN. LEFT JOIN keeps: (3 exercises)
- `sqlf-join-using` — USING, NATURAL, self join. What is wrong if the join uses USING (dept_id)? (4 exercises)
- `sqlf-outer-traps` — OUTER, CROSS, WHERE traps. LEFT JOIN plus a city filter in WHERE: (4 exercises)
- `sqlf-join-exam` — Exam: JOINs. Exam. JOIN (4 exercises)

### `subqueries` — Subqueries

- `sqlf-sq-single` — Single-row subquery. Who earns the maximum (4 exercises)
- `sqlf-sq-multi` — IN, ANY, ALL. salary > ALL (1000, 2000, 3000) means: (4 exercises)
- `sqlf-sq-exists` — Correlation and EXISTS. Why is this subquery correlated? (4 exercises)
- `sqlf-sq-exam` — Exam: subqueries. Exam. > ALL (10, 40) means (6 exercises)

### `set-ops` — Set operators

- `sqlf-union` — UNION and UNION ALL. UNION differs from UNION ALL because: (4 exercises)
- `sqlf-minus-intersect` — INTERSECT and MINUS. INTERSECT returns: (4 exercises)
- `sqlf-set-exam` — Exam: set operators. Exam. UNION ALL: (6 exercises)

### `dml` — INSERT / UPDATE / DELETE

- `sqlf-insert` — INSERT. insert into (2 exercises)
- `sqlf-update-delete` — UPDATE / DELETE. update set (3 exercises)
- `sqlf-merge` — MERGE and INSERT ALL. Build a MERGE (4 exercises)
- `sqlf-tx` — COMMIT, ROLLBACK, SAVEPOINT. Transaction: keep the insert, undo the raise (4 exercises)
- `sqlf-dml-exam` — Exam: DML. Exam. INSERT (4 exercises)

### `modeling` — Keys & modeling

- `sqlf-keys` — PRIMARY / FOREIGN KEY. PRIMARY KEY: (3 exercises)
- `sqlf-index` — Indexes intro. Index helps: (3 exercises)
- `sqlf-ddl-create` — CREATE TABLE and constraints. Table with a PK and an FK (4 exercises)
- `sqlf-ddl-alter` — ALTER, DROP, TRUNCATE. New column (4 exercises)
- `sqlf-model-exam` — Exam: modeling. Exam. PK: (4 exercises)

### `schema-objects` — Sequences, views, synonyms

- `sqlf-sequences` — Sequences. Next value (4 exercises)
- `sqlf-views` — Views. Replace a view (4 exercises)
- `sqlf-synonyms` — Synonyms and indexes. Short name for another schema's table (4 exercises)
- `sqlf-schema-exam` — Exam: schema objects. Exam. NEXTVAL (6 exercises)

### `access-dict` — Privileges, dictionary, time

- `sqlf-grant` — GRANT and roles. Permission to read a table (4 exercises)
- `sqlf-dictionary` — Data dictionary. USER_TABLES shows: (4 exercises)
- `sqlf-time` — Time zones. SYSDATE and CURRENT_DATE: (4 exercises)
- `sqlf-access-exam` — Exam: access, dictionary, time. Exam. GRANT (6 exercises)

### `windows` — NULL and window functions

- `sqlf-null-coalesce` — NULL & COALESCE. NULL means: (4 exercises)
- `sqlf-window-row` — ROW_NUMBER / OVER. Window functions keep: (3 exercises)
- `sqlf-window-rank` — RANK vs DENSE_RANK. RANK after ties 1,1 next is: (3 exercises)
- `sqlf-window-exam` — Exam: windows. Exam. OVER is used with: (4 exercises)

### `capstone` — Capstone

- `sqlf-capstone-query` — Scenario: users + orders. Names + order totals: (4 exercises)
- `sqlf-cap-exam` — Final SQL exam. Exam. SELECT (12 exercises)

## Depth now

- Units: 14
- Lessons: 59
- Exams: 14
- Free non-exam lessons after the freemium pass: 6
- Exercise types in the seed: code_fill, code_order, code_read, match, mcq

Depth here is the seeded player, not a lab you run on a VM. A lesson covers the point in its bullet. It does not add topics that are absent from that bullet.

## Not in this course

ORMs and database operations such as backups and WAL. The course is queries and schema, including the Oracle-shaped units.
