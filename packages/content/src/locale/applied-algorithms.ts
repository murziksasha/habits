import type { ExerciseLocaleEnrichment } from "./types.js";

export const APPLIED_ALGORITHMS_LOCALE_ENRICHMENT: Record<string, ExerciseLocaleEnrichment> = {
  "aa-cp1": {
    optionsEn: [
      "Up to 100 million comparisons; build one `Map<number, User>` in $O(M)$, then look up with `byId.get(t.authorId)` in $O(1)$",
      "`users.find` is cached by V8 in the database",
      "Replace `.find` with `.filter(...)[0]` (runs 100x faster)",
      "Convert arrays to `Object.freeze`",
    ],
  },
  "aa-cp2": {
    optionsEn: [
      "Measure time/memory on realistic data volumes (profiling / benchmark), pinpoint the bottleneck, and retain behavior tests",
      "Blindly rewrite the entire project in assembly",
      "Strip TypeScript typing",
      "Disable null checks",
    ],
  },
  "aa-ms1": {
    optionsEn: [
      "true — collision with `Object.prototype.constructor`! `new Map()` is completely immune to keys like `constructor` or `__proto__`",
      "false — empty `{}` contains no prototype properties",
      "Throws TypeError",
      "Returns undefined",
    ],
  },
  "aa-ms-e1": {
    optionsEn: [
      "Set<string>",
      "Unsorted array + indexOf",
      "Linked list with linear search",
      "Comma-separated string",
    ],
  },
  "aa-sq1": {
    pairsEn: [
      {
        left: "Editor Undo / Redo history on ForgeBoard",
        right: "Stack (LIFO: push/pop)",
      },
      {
        left: "Outbound email or webhook dispatch queue in arrival order",
        right: "Queue (FIFO with head index or circular buffer)",
      },
      {
        left: "Recent 100 search queries or fixed-size memory cache",
        right: "Bounded LRU Cache / Ring Buffer",
      },
    ],
  },
  "aa-sq2": {
    optionsEn: [
      "`shift()` re-indexes all remaining N-1 elements in memory on every call; a head index or circular buffer maintains dequeue in $O(1)$",
      "`shift()` makes a deep disk copy",
      "`shift()` coerces numbers into strings",
      "JS automatically sorts the array on `shift()`",
    ],
  },
  "aa-sq-e1": {
    optionsEn: [
      "Prevents memory, socket, and DB pool exhaustion (5-10 concurrent tasks instead of a 200-connection storm)",
      "Forces synchronous execution in a while(true) loop",
      "Drops excess tasks without running them",
      "Forbids the use of Promises",
    ],
  },
  "aa-ss1": {
    optionsEn: [
      "Add a unique secondary tie-breaker: `(a.priority - b.priority) || (a.id - b.id)`",
      "Use `Math.random() - 0.5`",
      "Wrap in `setTimeout`",
      "Use only `JSON.stringify`",
    ],
  },
  "aa-ss2": {
    optionsEn: [
      "~20 comparisons ($log_2(10^6) \\approx 20$), compared to 1,000,000 in a linear scan",
      "500,000 comparisons",
      "1,000,000 comparisons",
      "10^12 comparisons",
    ],
  },
  "aa-tt1": {
    optionsEn: [
      "Check `if (visited.has(id)) return; visited.add(id);` before traversing neighbors",
      "Increase Node call stack with a CLI flag",
      "Replace recursion with `eval()`",
      "Remove tasks with duplicate titles",
    ],
  },
  "aa-tt-e1": {
    optionsEn: [
      "Finding shortest path in an unweighted graph or exploring by levels / closest neighbors",
      "Depth-first topological sorting of acyclic graphs",
      "Evaluating arithmetic expressions recursively",
      "Sorting arrays in place",
    ],
  },
  "aa-tc1": {
    optionsEn: [
      "Maintain a secondary index `Map<Status, Task[]>` or indexed sorted view during inserts/updates",
      "Run the $O(N^2)$ scan in a loop every 100ms",
      "Disable task status updates",
      "Store all data in a single JSON string",
    ],
  },
  "aa-fb1": {
    optionsEn: [
      "Benchmark runtime drops from e.g. 1800ms to <15ms while all automated integration tests still pass",
      "Tests are disabled so the benchmark runs faster",
      "Module throws fewer warnings in console",
      "File size of the JS bundle is halved",
    ],
  },
  "aa-tc-e1": {
    optionsEn: [
      "Analyze actual access patterns: read vs write ratio, order guarantees, lookup frequency, and memory constraints",
      "Always pick plain arrays for everything",
      "Never use Maps because they are complex",
      "Choose the structure with the shortest name",
    ],
  },
  "aa-hash-uniform-r1": {
    optionsEn: [
      "all keys collide in bucket 'u', degrading lookup to $O(N)$",
      "the table rehashes automatically in $O(1)$",
      "hash tables forbid strings starting with 'u'",
      "memory usage drops to 0",
    ],
  },
  "aa-hash-uniform-r3": {
    optionsEn: [
      "no: fast non-cryptographic hashes are vulnerable to collision attacks; use bcrypt/argon2",
      "yes: murmurhash is standard for passwords",
      "only if passwords are under 8 characters",
      "murmurhash is a cryptographic hash",
    ],
  },
  "aa-bloom-maybe-r1": {
    optionsEn: [
      "query the actual authoritative storage/database; Bloom filter has false positives",
      "immediately return 404 because maybe means not found",
      "delete the cache entry",
      "rebuild the entire Bloom filter",
    ],
  },
  "aa-bloom-maybe-r3": {
    optionsEn: [
      "no: Bloom filter false positive can authorize payout to non-existent account; check DB",
      "yes: Bloom filter is authoritative for financial transactions",
      "only if payout is under $100",
      "Bloom filters never have false positives",
    ],
  },
  "aa-consistent-hash-r1": {
    optionsEn: [
      "almost all keys map to new buckets (N/(N+1) remap); consistent hashing only remaps 1/(N+1)",
      "cache is cleared by garbage collection",
      "modulo arithmetic is forbidden on servers",
      "it only affects keys with even numbers",
    ],
  },
  "aa-consistent-hash-r3": {
    optionsEn: [
      "no: keys must be migrated or warmed on the new node; updating the ring only changes routing",
      "yes: updating the ring automatically moves physical data across network",
      "only if Redis replication is off",
      "data never needs to move in distributed caches",
    ],
  },
  "aa_hashing_bloom-exam-q1": {
    optionsEn: [
      "causes massive clustering in a single bucket",
      "distributes keys uniformly across all buckets",
      "makes lookups run in $O(1)$ always",
      "is the optimal hashing function",
    ],
  },
  "aa_hashing_bloom-exam-q2": {
    optionsEn: [
      "breaks hash map contract: identical objects won't be found in the same bucket",
      "is completely valid in Java and TypeScript",
      "only matters during serialization",
      "improves hash map performance",
    ],
  },
  "aa_hashing_bloom-exam-q3": {
    optionsEn: [
      "is insecure for passwords because it lacks work factor and salt",
      "is recommended for password storage",
      "is slower than bcrypt",
      "encrypts passwords reversibly",
    ],
  },
  "aa_hashing_bloom-exam-q4": {
    optionsEn: [
      "item may exist (false positive possible); verify against true storage",
      "item definitely exists with 100% certainty",
      "item does not exist",
      "Bloom filter encountered a fatal error",
    ],
  },
  "aa_hashing_bloom-exam-q5": {
    optionsEn: [
      "are impossible: if an item was added, Bloom filter never reports 'definitely not'",
      "occur in 50% of queries",
      "occur when hash functions collide",
      "can be eliminated by resizing the array",
    ],
  },
  "aa_hashing_bloom-exam-q6": {
    optionsEn: [
      "invalidates almost all cache keys across nodes",
      "migrates keys smoothly with minimal churn",
      "is the basis of distributed consistent hashing",
      "preserves node mapping for all keys",
    ],
  },
  "aa-heap-top-r1": {
    optionsEn: [
      "inserting into a heap is $O(\\log N)$ vs $O(N \\log N)$ for full array sort",
      "sort() is forbidden in asynchronous code",
      "heaps store elements on disk",
      "sort() only works with strings",
    ],
  },
  "aa-heap-top-r3": {
    optionsEn: [
      "push (newPriority, id) and skip outdated entries when popped from heap",
      "iterate through heap array and manually reorder elements",
      "decrease-key is mandatory in all heap implementations",
      "rebuild the entire heap from scratch",
    ],
  },
  "aa-bfs-shortest-r1": {
    optionsEn: [
      "BFS minimizes edge hop count, not total edge weight; Dijkstra is required for weighted graphs",
      "BFS only works on directed acyclic graphs",
      "flight prices cannot be modeled as graph edges",
      "BFS requires negative weights to find lowest price",
    ],
  },
  "aa-bfs-shortest-r3": {
    optionsEn: [
      "infinite loop: the search revisits cycle nodes endlessly until call stack or queue explodes",
      "it automatically terminates when finding the target",
      "it finds the shortest path faster",
      "queue empties immediately",
    ],
  },
  "aa-dijkstra-pitfall-r1": {
    optionsEn: [
      "Dijkstra assumes visited node distance is finalized; negative edges violate greedy choice",
      "Dijkstra throws a runtime exception on negative numbers",
      "Dijkstra only works on unweighted graphs",
      "negative weights are converted to zero automatically",
    ],
  },
  "aa-dijkstra-pitfall-r3": {
    optionsEn: [
      "skip if extracted distance is greater than currently recorded `dist[node]`",
      "re-process all adjacent edges anyway",
      "throw an error because the heap is corrupted",
      "decrease dist[node] to match the stale entry",
    ],
  },
  "aa_heaps_graphs-exam-q1": {
    optionsEn: [
      "$O(1)$ constant time",
      "$O(\\log N)$ logarithmic time",
      "$O(N)$ linear scan",
      "$O(N^2)$ quadratic time",
    ],
  },
  "aa_heaps_graphs-exam-q2": {
    optionsEn: [
      "leads to $O(N^2 \\log N)$ overall; heap insertion keeps it at $O(N \\log K)$",
      "is the recommended approach in production schedulers",
      "is faster than a binary heap for large datasets",
      "preserves memory better than a priority queue",
    ],
  },
  "aa_heaps_graphs-exam-q3": {
    optionsEn: [
      "number of edges / hops in unweighted graphs",
      "sum of arbitrary edge weights",
      "longest path in a directed graph",
      "minimum spanning tree cost",
    ],
  },
  "aa_heaps_graphs-exam-q4": {
    optionsEn: [
      "loops infinitely cycling between nodes",
      "terminates normally without issue",
      "converts the graph to a tree",
      "returns null immediately",
    ],
  },
  "aa_heaps_graphs-exam-q5": {
    optionsEn: [
      "can produce incorrect shortest paths; use Bellman-Ford instead",
      "is handled correctly by standard Dijkstra",
      "speeds up the greedy selection",
      "is automatically converted to positive weights",
    ],
  },
  "aa_heaps_graphs-exam-q6": {
    optionsEn: [
      "is discarded if `d > dist[v]`",
      "is always preferred over newer entries",
      "breaks BFS visited tracking",
      "requires decrease-key support in heapq",
    ],
  },
  "aa-lru-recency-r1": {
    optionsEn: [
      "eviction policy has no knowledge of domain data staleness; explicit invalidation is needed",
      "LRU automatically detects database changes",
      "TTL is forbidden when using LRU",
      "cache hit rate corrects the stale price",
    ],
  },
  "aa-lru-recency-r3": {
    optionsEn: [
      "hit rate under real production traffic patterns",
      "only the number of lines of cache code",
      "memory size on an empty server",
      "number of CPU cores",
    ],
  },
  "aa-ttl-aside-r1": {
    optionsEn: [
      "the DB write code (or change data capture event); otherwise TTL serves stale data until expiry",
      "TTL alone without invalidation is always sufficient for monetary data",
      "the read operation on a cache hit",
      "the Bloom filter",
    ],
  },
  "aa-ttl-aside-r3": {
    optionsEn: [
      "document that profile data may be stale by up to 30 seconds",
      "guarantee that data is always real-time and immediate",
      "say nothing about data freshness",
      "state that cache TTL is infinite",
    ],
  },
  "aa-token-bucket-r1": {
    optionsEn: [
      "allows 2x burst across boundary: 100 requests at :59 followed by 100 at :00",
      "fixed window is always smoother than token bucket",
      "Retry-After header cannot be sent with fixed windows",
      "token bucket strictly forbids bursts",
    ],
  },
  "aa-token-bucket-r3": {
    optionsEn: [
      "all corporate users behind one NAT IP share the quota; rate-limit by user ID or API key",
      "NAT always assigns unique public IP to each person",
      "HTTP 429 cannot be returned to NAT IPs",
      "token bucket cannot use user IDs as keys",
    ],
  },
  "aa_lru_ratelimit-exam-q1": {
    optionsEn: [
      "the item least recently accessed",
      "the most frequently accessed item always",
      "a purely random key",
      "items whose domain values changed",
    ],
  },
  "aa_lru_ratelimit-exam-q2": {
    optionsEn: [
      "explicitly invalidated, without waiting for LRU eviction",
      "left in cache until naturally evicted by capacity",
      "measured only by code line count",
      "replaced with a Bloom filter",
    ],
  },
  "aa_lru_ratelimit-exam-q3": {
    optionsEn: [
      "invalidate or update the cache entry",
      "rely only on an infinite TTL",
      "treat cache hits as database writes",
      "ignore concurrency race conditions",
    ],
  },
  "aa_lru_ratelimit-exam-q4": {
    optionsEn: [
      "data may be eventually consistent / stale for up to 30s",
      "data is guaranteed to be strictly consistent instantly",
      "cache TTL is unbounded",
      "caching is completely disabled",
    ],
  },
  "aa_lru_ratelimit-exam-q5": {
    optionsEn: [
      "a 2N traffic spike across the minute boundary",
      "strictly N requests across any sliding 60s period",
      "smoother traffic flow than token bucket",
      "atomic operations without Redis",
    ],
  },
  "aa_lru_ratelimit-exam-q6": {
    optionsEn: [
      "poor developer experience: clients don't know when to retry",
      "complete and optimal API contract",
      "replacement for API user keys",
      "atomic counter implementation",
    ],
  },
};
