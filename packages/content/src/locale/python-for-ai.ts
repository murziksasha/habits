import type { ExerciseLocaleEnrichment } from "./types.js";

export const PYTHON_FOR_AI_LOCALE_ENRICHMENT: Record<string, ExerciseLocaleEnrichment> = {
  "py-v1": {
    optionsEn: [
      "0 and 0.0 are falsy in Python, so `0.0 or 0.7` evaluates to 0.7; check `if temp is None` instead",
      "`dict.get` always returns a string instead of a number",
      "Dictionary keys must be uppercase",
      "The `or` operator is forbidden in functions with float return type",
    ],
  },
  "py-v3": {
    optionsEn: [
      "Custom classes or library objects can override `__eq__` with unexpected side-effects, while `is` checks exact object identity",
      "`==` triggers bytecode recompilation during the request",
      "`is` automatically coerces `None` into an empty string",
      "`== None` only works for integers",
    ],
  },
  "py-v4": {
    optionsEn: [
      "JSON curly braces inside an f-string must be doubled (`{{\"action\": \"{task}\"}}`), otherwise Python parses `\"action\"` as an expression",
      "Python f-strings do not support single quotes",
      "The variable `task` cannot be a string inside an f-string",
      "`import json` is strictly mandatory before `f'...`",
    ],
  },
  "py-v5": {
    pairsEn: [
      { left: "bool([])", right: "False (empty list is falsy)" },
      { left: "None is False", right: "False (None is a distinct singleton)" },
      { left: 'f"{latency:.2f}s"', right: "Formats number to 2 decimal places" },
      { left: "val if val is not None else 0", right: "Preserves 0, defaults to 0 only when None" },
    ],
  },
  "py-v-e1": {
    optionsEn: [
      "Due to truthiness: `0 or 3` evaluates to `3`",
      "Because `opts.get` throws on zero",
      "`int` in Python cannot equal zero",
      "The key `\"retries\"` must be passed without quotes",
    ],
  },
  "py-v-e3": {
    optionsEn: [
      "Double it as `{{`",
      "Escape it with a backslash `\\{`",
      "Prefix with `$` before the brace",
      "Disable string interpolation in the module",
    ],
  },
  "py-c1": {
    optionsEn: [
      "Crashes with `KeyError: 'args'` because direct indexing rejects missing keys; safer is `(call.get(\"args\") or {}).get(\"query\")`",
      "Returns `None` without error",
      "Automatically creates an empty dictionary `args`",
      "Converts `call` to a `set`",
    ],
  },
  "py-c3": {
    optionsEn: [
      "`set` (hash table lookup in $O(1)$)",
      "`list` (linear scan in $O(N)$ via `in`)",
      "`tuple` (immutable sequence with $O(N)$ lookup)",
      "`str` with comma separation",
    ],
  },
  "py-c4": {
    optionsEn: [
      "A new list `[\"Refunds take 5 days\"]` without mutating the original `chunks`",
      "Mutates `chunks` in place and deletes the second dict",
      "Returns a dictionary with key `\"score\"`",
      "Throws `SyntaxError` due to `if` inside square brackets",
    ],
  },
  "py-c6": {
    pairsEn: [
      { left: "list[dict]", right: "Ordered chat message history" },
      { left: "dict[str, float]", right: "Tool name -> timeout mapping" },
      { left: "set[str]", right: "Allowlist of permitted tool names" },
      { left: "tuple[str, ...]", right: "Fixed immutable pair or stage path" },
    ],
  },
  "py-c-e1": {
    optionsEn: [
      "Mutable default argument `history=[]` is instantiated once at function definition and shared across all calls",
      "Python lists cannot store strings larger than 100 bytes",
      "`append` overwrites the first element of the list",
      "The annotation `list[str]` creates a global variable",
    ],
  },
  "py-f1": {
    optionsEn: [
      "It documents the contract for developers and `mypy`/`pyright`, but the CPython runtime does NOT enforce types without explicit checks",
      "Python automatically casts arguments to `int` at runtime",
      "Without type annotations Python refuses to run `.py` files",
      "`-> str` encrypts the returned payload",
    ],
  },
  "py-f3": {
    optionsEn: [
      "Returning `tuple[bool, str]` forces the caller to destructure and explicitly handle error states before continuing",
      "Tuples execute 100x faster than dictionaries",
      "Tuples allow mutating values in background threads",
      "Python functions can only accept tuples as arguments",
    ],
  },
  "py-f4": {
    optionsEn: [
      "It runs `func(*args, **kwargs)` before and after measuring `time.perf_counter()`, transparently returning the original result",
      "It deletes the function from memory after execution",
      "It converts synchronous functions into coroutines",
      "It catches all exceptions and returns 0",
    ],
  },
  "py-f6": {
    optionsEn: [
      "Bare \`raise\` inside the \`except\` block",
      "\`return None\`",
      "\`raise Exception(\"failed\")\` without \`from\`",
      "\`pass\`",
    ],
  },
  "py-d1": {
    optionsEn: [
      "\`json.loads\` parses the list or string, and \`data[\"answer\"]\` throws \`TypeError: indices must be integers\`",
      "\`json.loads\` only returns dict and throws on arrays",
      "\`data[\"answer\"]\` returns \`None\`",
      "Python automatically wraps lists into dictionaries",
    ],
  },
  "py-d3": {
    pairsEn: [
      { left: "json.loads(text)", right: "Parses JSON string in memory into Python objects" },
      { left: "json.dumps(obj, ensure_ascii=False)", right: "Serializes Python dict to JSON preserving UTF-8 text" },
      { left: 'Path(p).read_text(encoding="utf-8")', right: "Reads local fixture with explicit encoding" },
      { left: "isinstance(data, dict)", right: "Verifies the decoded JSON root is a dictionary" },
    ],
  },
  "py-d4": {
    optionsEn: [
      "Missing \`timeout=...\` (request can hang indefinitely) and missing \`resp.raise_for_status()\` (429/500 crashes JSON parsing)",
      "\`POST\` does not support JSON bodies",
      "\`headers\` must be passed as a string",
      "\`httpx.post\` does not support HTTPS",
    ],
  },
  "py-d6": {
    optionsEn: [
      "\`data=\` encodes dictionary as form-urlencoded without \`Content-Type: application/json\`, whereas \`json=\` serializes and sets the header",
      "\`json=\` encrypts body via TLS, \`data=\` does not",
      "\`data=\` automatically converts \`POST\` to \`GET\`",
      "\`json=\` disables timeouts",
    ],
  },
  "py-d-e1": {
    optionsEn: [
      "Explicit \`timeout=...\`, status check \`r.raise_for_status()\`, and validation that \`results\` is a non-empty list",
      "Replacing \`requests.post\` with \`print\`",
      "Passing credentials in query strings",
      "Removing key \`\"q\"\`",
    ],
  },
  "py-d-e3": {
    optionsEn: [
      "Raises an \`HTTPError\` exception instead of continuing to parse the error body as valid JSON",
      "Automatically retries request 100 times",
      "Changes status code to 200 OK",
      "Ignores response headers",
    ],
  },
  "py-f-e1": {
    optionsEn: [
      "None: CPython does not enforce type annotations at runtime",
      "TypeError: Expected int, got str",
      "ValueError: Invalid numeric format",
      "Python halts with an unhandled exception",
    ],
  },
  "py-f-e3": {
    optionsEn: [
      "Accept `*args, **kwargs` and return the inner result",
      "Hardcode function arguments to 0",
      "Wrap the return value in a set",
      "Convert the decorator to a global variable",
    ],
  },
  "py-e1": {
    optionsEn: [
      "It catches `Exception` and prints a warning, but returns `None` instead of raising, allowing corrupted downstream pipeline state",
      "It uses `try/except` which is deprecated in Python 3.12",
      "`json.loads` cannot parse dictionary strings",
      "Logger statements must be wrapped in async blocks",
    ],
  },
  "py-e2": {
    optionsEn: [
      "Inheriting from `Exception` creates a domain-specific hierarchy (`RateLimitError`, `SchemaError`) allowing granular catch handlers",
      "Custom exceptions run faster in V8",
      "Python forbids raising built-in exceptions",
      "Custom exceptions automatically retry HTTP requests",
    ],
  },
  "py-e4": {
    optionsEn: [
      "Preserves original traceback chain via `from err`, aiding production post-mortems while presenting a clean domain error",
      "Suppresses all error logs completely",
      "Converts the exception into a JSON response",
      "Restarts the application server",
    ],
  },
  "py-e6": {
    pairsEn: [
      { left: "raise RateLimitError() from e", right: "Wraps upstream 429 keeping original traceback" },
      { left: "except TimeoutError:", right: "Handles upstream timeout without catching all errors" },
      { left: "finally: cleanup()", right: "Guarantees resource release regardless of error" },
      { left: "assert schema.is_valid()", right: "Internal invariant check; not for user input" },
    ],
  },
  "py-e-e1": {
    optionsEn: [
      "A bare `except:` catches `KeyboardInterrupt`, `SystemExit`, and mask programmer bugs like `NameError`",
      "Bare `except:` is valid and recommended in all production code",
      "It increases memory usage by 4GB",
      "Python 3 prohibits the word `except`",
    ],
  },
  "py-e-e3": {
    optionsEn: [
      "Preserves original exception context and chain in traceback",
      "Deletes the previous error from memory",
      "Converts the exception to an integer",
      "Signals that the error should be ignored",
    ],
  },
  "py-a1": {
    optionsEn: [
      "The async function returned a coroutine object because it was called without `await`",
      "Python cannot parse dictionaries inside async functions",
      "Coroutine objects do not support JSON serialization",
      "`async def` requires returning an integer",
    ],
  },
  "py-a3": {
    optionsEn: [
      "It blocks the entire single-threaded event loop for 3s, freezing all other concurrent agent requests",
      "It speeds up execution by utilizing all CPU cores",
      "It creates an isolated background process",
      "It throws an unhandled SyntaxError",
    ],
  },
  "py-a4": {
    optionsEn: [
      "Bounded concurrency via `asyncio.Semaphore(5)` prevents network socket exhaustion and upstream 429 rate-limiting",
      "Unbounded gather is always safer for high-load systems",
      "Semaphores encrypt network packets",
      "Gather without arguments runs synchronously",
    ],
  },
  "py-a6": {
    pairsEn: [
      { left: "asyncio.Semaphore(5)", right: "Limits concurrent outbound LLM requests" },
      { left: "asyncio.wait_for(coro, 10)", right: "Enforces strict deadline timeout on execution" },
      { left: "asyncio.gather(*tasks)", right: "Runs multiple I/O coroutines concurrently" },
      { left: "asyncio.sleep(0.1)", right: "Non-blocking sleep yielding control to event loop" },
    ],
  },
  "py-a-e1": {
    optionsEn: [
      "Synchronous `time.sleep(5)` blocks the event loop thread instead of non-blocking `await asyncio.sleep(5)`",
      "Async functions cannot sleep",
      "5 seconds exceeds maximum Python integer limits",
      "The route is missing an HTTP decorator",
    ],
  },
  "py-a-e3": {
    optionsEn: [
      "To prevent one failing upstream from aborting remaining concurrent requests and losing valid data",
      "It makes requests run synchronously",
      "It converts exceptions into integers",
      "It bypasses all rate limits",
    ],
  },
  "py-r1": {
    optionsEn: [
      "Unsanitized `eval(code)` allows arbitrary remote code execution; missing `isinstance` check allows malformed input to crash the app",
      "Code contains too few comments",
      "Variable names are too short",
      "Python does not support list indexing",
    ],
  },
  "py-r2": {
    optionsEn: [
      "Path traversal vulnerability via `open(path)` without validating that path stays within the permitted upload directory",
      "The file is opened in text mode instead of binary",
      "Python cannot read files larger than 10 lines",
      "Text files cannot be converted into embeddings",
    ],
  },
  "py-r5": {
    pairsEn: [
      { left: "eval(user_expression)", right: "Replace with safe ast.literal_eval or parser" },
      { left: "open(user_path)", right: "Validate path against base dir (no path traversal)" },
      { left: "requests.get(url)", right: "Replace with httpx.AsyncClient + timeout in async" },
      { left: "temp = opts['temp']", right: "Use opts.get('temp') with explicit None check" },
    ],
  },
  "py-r6": {
    optionsEn: [
      "An automated unit test checking both valid happy path and known edge cases / adversarial inputs",
      "Printing output to console once manually",
      "Assuming the AI generated bug-free code",
      "Renaming variables to uppercase",
    ],
  },
  "py-r-e1": {
    optionsEn: [
      "Arbitrary code execution via `eval`, unconstrained file path reading, and unhandled missing dictionary keys",
      "Only formatting indentation issues",
      "Zero security issues",
      "Missing docstring comments only",
    ],
  },
  "py-r-e3": {
    optionsEn: [
      "Treat AI code as unverified input: verify boundaries, edge cases, security sanitization, and write explicit tests",
      "Copy-paste directly to production without testing",
      "Assume AI code is always superior to human code",
      "Delete existing test suites",
    ],
  },
  "py-typed-dicts-r1": {
    optionsEn: [
      "TypedDict enables static verification of model response keys in IDE and CI without `dict[str, Any]` ambiguity",
      "It accelerates LLM token generation speed",
      "It converts Python dictionaries into C structs",
      "TypedDict automatically encrypts payloads",
    ],
  },
  "py-typed-dicts-r3": {
    optionsEn: [
      "In a dedicated ingress validation adapter or Pydantic boundary, not scattered across business logic",
      "Directly inside database SQL queries",
      "In the UI front-end layer only",
      "Validation is unnecessary for LLM output",
    ],
  },
  "py-protocol-swap-r1": {
    optionsEn: [
      "Enables clean dependency inversion, mocking in unit tests, and swapping to Anthropic or local models without rewriting callers",
      "Protocols make API requests free of charge",
      "Python requires protocols for network connections",
      "Protocols prevent all network timeouts",
    ],
  },
  "py-protocol-swap-r3": {
    optionsEn: [
      "Inside the client adapter / gateway wrapper, keeping callers clean and consistent",
      "In every individual prompt helper",
      "In the database driver",
      "In the operating system kernel",
    ],
  },
  "py_typing_contracts-exam-q1": {
    optionsEn: [
      "leads to runtime `KeyError` and loss of IDE autocomplete across pipeline stages",
      "is the recommended architectural practice for large projects",
      "speeds up execution by eliminating type checks",
      "is required by the Python standard library",
    ],
  },
  "py_typing_contracts-exam-q2": {
    optionsEn: [
      "the field is optional and may be omitted in the dictionary",
      "the field must always equal None",
      "the field cannot be modified",
      "the field is deprecated",
    ],
  },
  "py_typing_contracts-exam-q3": {
    optionsEn: [
      "enables structural subtyping (duck typing) for test mocks and model adapters",
      "forces classes to inherit from a concrete base class",
      "replaces unit testing completely",
      "encrypts method implementations",
    ],
  },
  "py_typing_contracts-exam-q4": {
    optionsEn: [
      "inside the resilient adapter wrapper around API clients",
      "scattered across all application functions",
      "in the UI rendering components",
      "in the global exception handler only",
    ],
  },
  "py_typing_contracts-exam-q5": {
    optionsEn: [
      "at the ingress boundary before passing data to domain logic",
      "at the very end of processing after saving to DB",
      "in background logging tasks",
      "inside the model weights",
    ],
  },
  "py_typing_contracts-exam-q6": {
    optionsEn: [
      "violates Interface Segregation Principle; prefer small, focused protocols",
      "is good practice to prepare for future features",
      "guarantees high code quality",
      "is mandatory for cloud deployment",
    ],
  },
  "py-venv-lock-r1": {
    optionsEn: [
      "unpinned packages pull breaking upstream changes during production deployment",
      "pip install without pin is faster in CI",
      "virtual environments forbid pinned dependencies",
      "transformers requires floating versions",
    ],
  },
  "py-venv-lock-r3": {
    optionsEn: [
      "the specific model weight revision hash, not just the floating org/model-name",
      "only the model name without revision",
      "the system site-packages folder",
      "any conda environment without lockfile",
    ],
  },
  "py-pytest-data-r1": {
    optionsEn: [
      "slows down CI feedback loops; use compact fixtures for unit tests and reserve corpora for integration",
      "large corpus tests always complete in 2 seconds",
      "test fixtures cannot be used for chunking",
      "2 GB data guarantees zero bugs",
    ],
  },
  "py-pytest-data-r3": {
    optionsEn: [
      "investigate why the template output changed instead of blindly accepting the new snapshot",
      "always accept snapshot updates whenever CI turns red",
      "delete all test snapshots",
      "increase the corpus to 10 GB",
    ],
  },
  "py_packaging_env-exam-q1": {
    optionsEn: [
      "breaks reproducibility and pollutes host system; always use venv and lockfiles",
      "is the gold standard for production environments",
      "replaces the need for .python-version",
      "pins model weights automatically",
    ],
  },
  "py_packaging_env-exam-q2": {
    optionsEn: [
      "from a frozen lockfile (`requirements.lock` or `poetry.lock`), not floating latest",
      "always from floating latest releases",
      "using global pip install without venv",
      "without specifying Python minor versions",
    ],
  },
  "py_packaging_env-exam-q3": {
    optionsEn: [
      "floats over time; always record explicit commit SHA or revision hash",
      "is an authoritative and immutable identifier",
      "replaces dependency lockfiles",
      "is a virtual environment requirement",
    ],
  },
  "py_packaging_env-exam-q4": {
    optionsEn: [
      "is a brittle PR gate; use small fixtures in unit tests and run corpus benchmarks in scheduled jobs",
      "is the mandatory standard for all PRs",
      "runs faster than small synthetic fixtures",
      "replaces random seed configuration",
    ],
  },
  "py_packaging_env-exam-q5": {
    optionsEn: [
      "risks silently accepting accidental regressions in prompt templates",
      "is recommended to keep CI green quickly",
      "pins random seeds across tests",
      "replaces domain invariant assertions",
    ],
  },
  "py_packaging_env-exam-q6": {
    optionsEn: [
      "ensures test failures and random sampling remain deterministic and reproducible",
      "makes the corpus download faster",
      "updates package lockfiles",
      "creates isolated virtual environments",
    ],
  },
  "py-pydantic-llm-r1": {
    optionsEn: [
      "unexpected hallucinated fields trigger validation errors instead of being silently ignored",
      "it reduces token costs on the API",
      "it turns off all runtime type checking",
      "it logs sensitive user passwords",
    ],
  },
  "py-pydantic-llm-r3": {
    optionsEn: [
      "sanitize and redact sensitive PII before logging trace payloads",
      "always log raw unredacted inputs in public logs for debugging",
      "disable Pydantic validation",
      "replace schema validation with bare dictionaries",
    ],
  },
  "py-chunk-overlap-r1": {
    optionsEn: [
      "arbitrary character slicing cuts sentences and citations in half, degrading retrieval relevance",
      "400 characters is always the mathematically optimal chunk size",
      "chunk overlap is forbidden in vector databases",
      "metadata is generated automatically by character slicing",
    ],
  },
  "py-chunk-overlap-r3": {
    optionsEn: [
      "document source identifier, page/section offset, and chunk index",
      "only the embedding vector without text source",
      "the entire 500-page book in every single chunk",
      "a random UUID without document reference",
    ],
  },
  "py_pydantic_io-exam-q1": {
    optionsEn: [
      "treats unexpected keys as validation errors",
      "silently discards extra fields without warning",
      "disables type validation",
      "logs API keys into application logs",
    ],
  },
  "py_pydantic_io-exam-q2": {
    optionsEn: [
      "raise an explicit error and trigger retry or fallback, not silently returning `{}`",
      "silently return an empty dict `{}`",
      "disable schema enforcement",
      "downgrade Python version",
    ],
  },
  "py_pydantic_io-exam-q3": {
    optionsEn: [
      "is a breaking change requiring an alias or migration adapter",
      "is always backwards-compatible by default",
      "replaces random seed configuration",
      "is completely ignored by Pydantic",
    ],
  },
  "py_pydantic_io-exam-q4": {
    optionsEn: [
      "can cut sentences and clauses in half mid-word",
      "is always superior to semantic sentence splitting",
      "attaches document metadata automatically",
      "measures retrieval precision directly",
    ],
  },
  "py_pydantic_io-exam-q5": {
    optionsEn: [
      "prevents context loss across chunk boundaries",
      "expands chunk size to the entire book",
      "removes metadata from the index",
      "replaces tokenizer embeddings",
    ],
  },
  "py_pydantic_io-exam-q6": {
    optionsEn: [
      "unverifiable: always store chunk metadata (source, page, offset)",
      "sufficient for enterprise RAG systems",
      "replaces latency measurements",
      "is a strict Pydantic requirement",
    ],
  },
};
