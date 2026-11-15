export function createSearchController(fetcher) {
  return {
    async search(query, onResult) {
      // BUG: ignores cancellation allowing slow queries to overwrite newer results
      const res = await fetcher(`/api/tasks?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      onResult(data.items);
      return data.items;
    },
  };
}
