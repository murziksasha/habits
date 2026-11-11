export function createSearchController(fetcher) {
  return {
    async search(query, onResult) {
      // TODO: cancel previous request via AbortController, ignore AbortError, check !res.ok
      const res = await fetcher(`/api/tasks?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      onResult(data.items);
      return data.items;
    },
  };
}
