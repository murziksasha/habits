/** Shared list pagination (limit/offset + nextPage hint). */

export type PaginationQuery = {
  limit?: string | number | null;
  offset?: string | number | null;
};

export type Pagination = {
  limit: number;
  offset: number;
};

export function parsePagination(
  q: PaginationQuery,
  opts?: { max?: number; def?: number },
): Pagination {
  const max = opts?.max ?? 100;
  const def = opts?.def ?? 50;
  const rawLimit = Number(q.limit);
  const rawOffset = Number(q.offset);
  const limit = Number.isFinite(rawLimit)
    ? Math.min(max, Math.max(1, Math.floor(rawLimit)))
    : def;
  const offset = Number.isFinite(rawOffset) ? Math.max(0, Math.floor(rawOffset)) : 0;
  return { limit, offset };
}

export function paginatedMeta(total: number, page: Pagination) {
  const nextOffset = page.offset + page.limit;
  return {
    total,
    limit: page.limit,
    offset: page.offset,
    nextOffset: nextOffset < total ? nextOffset : null,
  };
}
