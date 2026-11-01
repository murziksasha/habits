/**
 * Oracle learning path inside the existing `sql_fundamentals` course.
 * Keys are stable unit slugs. Sections are browseable; prerequisites are advice.
 */

export const ORACLE_SECTION_IDS = ["sql", "plsql", "dba"] as const;
export type OracleSectionId = (typeof ORACLE_SECTION_IDS)[number];

export type OracleSection = {
  id: OracleSectionId;
  titleUk: string;
  titleEn: string;
  summaryUk: string;
  summaryEn: string;
};

export const ORACLE_SECTIONS: OracleSection[] = [
  {
    id: "sql",
    titleUk: "SQL і сучасний Oracle",
    titleEn: "SQL & Modern Oracle",
    summaryUk: "Запити, з’єднання, JSON, вектори й графи. Нові можливості позначені версією.",
    summaryEn: "Queries, joins, JSON, vectors, and graphs. Newer features are labeled with a version.",
  },
  {
    id: "plsql",
    titleUk: "PL/SQL",
    titleEn: "PL/SQL",
    summaryUk: "Блоки, курсори, процедури, пакети, тригери та перевірка коду.",
    summaryEn: "Blocks, cursors, procedures, packages, triggers, and how to test them.",
  },
  {
    id: "dba",
    titleUk: "Адміністрування баз даних",
    titleEn: "Database Administration",
    summaryUk: "Архітектура, доступ, безпека, резервні копії та супровід. Сценарії, без живого сервера.",
    summaryEn: "Architecture, access, security, backups, and care. Guided scenarios, no live server.",
  },
];

export type OracleUnitMeta = {
  section: OracleSectionId;
  /** Recommended earlier units. Never a lock. */
  prerequisites: string[];
};

const sqlCore = ["select", "order-limit"];

export const ORACLE_UNIT_META: Record<string, OracleUnitMeta> = {
  select: { section: "sql", prerequisites: [] },
  "order-limit": { section: "sql", prerequisites: ["select"] },
  "single-row": { section: "sql", prerequisites: ["select"] },
  conversion: { section: "sql", prerequisites: ["single-row"] },
  aggregates: { section: "sql", prerequisites: ["select"] },
  joins: { section: "sql", prerequisites: ["select"] },
  subqueries: { section: "sql", prerequisites: ["joins"] },
  "set-ops": { section: "sql", prerequisites: ["select"] },
  dml: { section: "sql", prerequisites: ["select"] },
  modeling: { section: "sql", prerequisites: ["dml"] },
  "schema-objects": { section: "sql", prerequisites: ["modeling"] },
  "access-dict": { section: "sql", prerequisites: ["schema-objects"] },
  windows: { section: "sql", prerequisites: ["aggregates"] },
  "cte-performance": { section: "sql", prerequisites: ["subqueries"] },
  "modern-select": { section: "sql", prerequisites: sqlCore },
  "grouping-analytics": { section: "sql", prerequisites: ["aggregates", "windows"] },
  "modern-dml": { section: "sql", prerequisites: ["dml", "modeling"] },
  "sql-json": { section: "sql", prerequisites: ["select"] },
  "json-duality": { section: "sql", prerequisites: ["sql-json", "joins"] },
  vectors: { section: "sql", prerequisites: ["order-limit"] },
  "property-graphs": { section: "sql", prerequisites: ["joins"] },
  capstone: { section: "sql", prerequisites: ["joins", "aggregates", "windows"] },
  "plsql-blocks": { section: "plsql", prerequisites: ["select", "dml"] },
  "plsql-cursors": { section: "plsql", prerequisites: ["plsql-blocks", "select"] },
  "plsql-exceptions": { section: "plsql", prerequisites: ["plsql-blocks"] },
  "plsql-routines": { section: "plsql", prerequisites: ["plsql-blocks", "plsql-exceptions"] },
  "plsql-packages": { section: "plsql", prerequisites: ["plsql-routines"] },
  "plsql-triggers": { section: "plsql", prerequisites: ["plsql-routines", "dml"] },
  "plsql-collections": { section: "plsql", prerequisites: ["plsql-cursors"] },
  "plsql-dynamic": { section: "plsql", prerequisites: ["plsql-routines", "plsql-collections"] },
  "dba-architecture": { section: "dba", prerequisites: ["select"] },
  "dba-connect": { section: "dba", prerequisites: ["dba-architecture"] },
  "dba-security": { section: "dba", prerequisites: ["access-dict", "dba-connect"] },
  "dba-storage": { section: "dba", prerequisites: ["dba-architecture", "modeling"] },
  "dba-transactions": { section: "dba", prerequisites: ["dml", "dba-architecture"] },
  "dba-optimizer": { section: "dba", prerequisites: ["cte-performance", "dba-architecture"] },
  "dba-backup": { section: "dba", prerequisites: ["dba-storage"] },
  "dba-operations": { section: "dba", prerequisites: ["dba-backup", "dba-optimizer"] },
};

export function oracleSection(id: OracleSectionId): OracleSection {
  const found = ORACLE_SECTIONS.find((s) => s.id === id);
  if (!found) throw new Error(`unknown oracle section ${id}`);
  return found;
}

export function oracleUnitMeta(unitSlug: string): OracleUnitMeta | null {
  return ORACLE_UNIT_META[unitSlug] ?? null;
}

export function oracleUnitsInSection(section: OracleSectionId): string[] {
  return Object.entries(ORACLE_UNIT_META)
    .filter(([, meta]) => meta.section === section)
    .map(([slug]) => slug);
}
