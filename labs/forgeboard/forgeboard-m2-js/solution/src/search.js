export function createSearchController(fetcher) {
  let activeController = null;
  return {
    async search(query, onResult) {
      activeController?.abort();
      const controller = new AbortController();
      activeController = controller;
      try {
        const res = await fetcher(`/api/tasks?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        if (!controller.signal.aborted && activeController === controller) {
          onResult(data.items);
        }
        return data.items;
      } catch (err) {
        if (err && typeof err === "object" && err.name === "AbortError") {
          return [];
        }
        throw err;
      }
    },
  };
}
