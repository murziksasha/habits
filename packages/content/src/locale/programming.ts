import type { ExerciseLocaleEnrichment } from "./types.js";

export const PROGRAMMING_LOCALE_ENRICHMENT: Record<string, ExerciseLocaleEnrichment> = {
  "pr-html-4": {
    pairsEn: [
      { left: "<a>", right: "hyperlink" },
      { left: "<img>", right: "image" },
      { left: "<ul>", right: "unordered list" },
    ],
  },
  "pr-html-form-submit": {
    optionsEn: [
      "Submits the form",
      "Only styles CSS",
      "Deletes the DOM",
      "Permanently locks Enter",
    ],
  },
  "pr-html-12": {
    pairsEn: [
      { left: "<header>", right: "site/page header" },
      { left: "<main>", right: "primary document content" },
      { left: "<footer>", right: "site/page footer" },
    ],
  },
  "pr-html-d3": {
    optionsEn: [
      "only CSS",
      "screen readers / a11y",
      "Node runtime",
      "SQL index",
    ],
  },
  "pr-env-1": {
    optionsEn: [
      "`pwd` and `ls` (in Windows CMD also `cd` / `dir`)",
      "`http` and `css`",
      "`git push` and `sql select`",
      "`npm delete`",
    ],
  },
  "pr-env-2": {
    pairsEn: [
      {
        left: "HTML + CSS",
        right: "structure, accessibility, and responsive layout",
      },
      {
        left: "JS / TypeScript / React",
        right: "interactive client behavior and typed state",
      },
      {
        left: "Node / Express + PostgreSQL",
        right: "HTTP API, validation, authorization, and data persistence",
      },
      {
        left: "Git + Tests",
        right: "version history, behavior verification, and safe releases",
      },
    ],
  },
  "pr-env-4": {
    optionsEn: [
      "In the corresponding deep track (`/html-semantics`, `/css-layout`, `/js-fundamentals`, `/typescript`, `/react-fundamentals`, `/express-fundamentals`, `/postgresql-apps`, `/software-testing`)",
      "Only in the Profile tab",
      "Delete the repository and restart",
      "Only in a console calculator",
    ],
  },
  "pr-html-proj-2": {
    optionsEn: [
      "only for SQL",
      "separating structure (HTML) and styles (CSS)",
      "replacing Git",
      "only for Docker",
    ],
  },
  "html-datalist-autocomplete-r1": {
    optionsEn: [
      "user can type a custom value not in the suggestions",
      "datalist is always required like select",
      "select allows arbitrary string, datalist does not",
      "they are complete synonyms",
    ],
  },
  "html-datalist-autocomplete-r3": {
    optionsEn: [
      "client can submit any string, server validation is required",
      "option forbids other values in HTTP protocol",
      "datalist encrypts the value",
      "list works only with select",
    ],
  },
  "pr-css-10": {
    pairsEn: [
      { left: "background-color", right: "background fill" },
      { left: "border-radius", right: "corner curvature" },
      { left: "opacity", right: "element transparency" },
    ],
  },
  "pr-css-d2": {
    optionsEn: [
      "only desktop CSS",
      "base styles for small screens, then min-width up",
      "without media queries",
      "only print stylesheets",
    ],
  },
  "pr-css-d3": {
    optionsEn: [
      "breaks the layout",
      "prevents overflowing the container",
      "fixes width to 100px",
      "removes alt text",
    ],
  },
  "css-custom-props-r1": {
    optionsEn: [
      "accessible in browser runtime and updates without rebuilding",
      "Sass variables also update in the browser on their own",
      "CSS variables only exist at compile time",
      "they are complete synonyms",
    ],
  },
  "css-custom-props-r3": {
    optionsEn: [
      "custom properties inherit down the DOM tree",
      "gap is a reserved name and always 0",
      "children cannot see ancestor variables",
      "requires !important",
    ],
  },
  "pr-css-ex3": {
    optionsEn: [
      "content, padding, border, margin",
      "HTML only",
      "git log",
      "SQL columns",
    ],
  },
  "pr-form-3": {
    optionsEn: [
      "page reloads and submits GET/POST to the URL",
      "browser crashes",
      "CSS turns red",
      "JS code is deleted",
    ],
  },
  "pr-fetch-2": {
    optionsEn: [
      "res.ok (status in 200..299 range)",
      "typeof res === 'object'",
      "res.status === 404",
      "JSON.stringify(res)",
    ],
  },
  "pr-fetch-3": {
    optionsEn: [
      "HTTP responses are valid server communication, only network failures reject",
      "it always rejects on any HTTP code",
      "404 is considered a success in browser",
      "fetch never returns promises",
    ],
  },
  "js-optional-chaining-prog-r1": {
    optionsEn: [
      "if data.n === 0, || coerces it to false and defaults to 10",
      "0 is truthy in JavaScript",
      "|| throws on numbers",
      "data.n cannot be checked",
    ],
  },
  "js-optional-chaining-prog-r3": {
    optionsEn: [
      "undefined without throwing an error",
      "TypeError: Cannot read properties of null",
      "null",
      "empty string",
    ],
  },
  "pr-js-ex1": {
    optionsEn: [
      "binding cannot be reassigned",
      "value is immutable deep frozen",
      "always a string",
      "CSS property",
    ],
  },
  "pr-js-ex4": {
    optionsEn: [
      "value and type without coercion",
      "only strings",
      "only lengths",
      "memory address only",
    ],
  },
  "ts-narrowing-in-r1": {
    optionsEn: [
      "discriminated union: checking kind narrows payload types",
      "runtime validation of JSON from server",
      "automatic database conversion",
      "removes all types in JS",
    ],
  },
  "ts-narrowing-in-r3": {
    optionsEn: [
      "bypasses type checking and can cause runtime crash if value is number/null",
      "makes the code run 10x faster",
      "mandatory in TypeScript",
      "turns string into number",
    ],
  },
  "react-lists-stable-keys-r1": {
    optionsEn: [
      "internal input state will shift to the wrong item",
      "React throws an immediate syntax error",
      "browser crashes",
      "database record is deleted",
    ],
  },
  "react-lists-stable-keys-r3": {
    optionsEn: [
      "DOM nodes recreate on every render, losing focus and input state",
      "Math.random is forbidden in React",
      "keys must always be numbers under 10",
      "it slows down network requests",
    ],
  },
  "pr-react-ex1": {
    optionsEn: [
      "function returning JSX",
      "database table",
      "CSS selector",
      "Node server process",
    ],
  },
  "pr-react-ex3": {
    optionsEn: [
      "input arguments passed to a component",
      "local mutable state",
      "SQL queries",
      "HTTP headers",
    ],
  },
  "pr-git-d1": {
    optionsEn: [
      "reapplies commits onto a new base tip",
      "deletes the repository",
      "only minifies code",
      "pushes code to prod",
    ],
  },
  "pr-git-d2": {
    pairsEn: [
      { left: "merge", right: "preserves branch history with a merge commit" },
      { left: "rebase", right: "creates a linear history by replaying commits" },
      { left: "cherry-pick", right: "applies a single specific commit to current branch" },
    ],
  },
  "pr-git-early-2": {
    optionsEn: [
      "easy to review, revert mistakes, and isolate working steps",
      "large 2000-line commits are preferred",
      "git requires exactly 1 commit per project",
      "branches slow down download speed",
    ],
  },
  "git-stash-wip-r1": {
    optionsEn: [
      "pop applies and removes from stash; apply keeps the entry in stash",
      "apply deletes the repository; pop saves it",
      "pop works only on main branch",
      "they are identical aliases",
    ],
  },
  "git-stash-wip-r3": {
    optionsEn: [
      "stash is local, uncommitted, untracked by remotes, and easily lost or forgotten",
      "stash automatically pushes to GitHub",
      "stash encrypts files with a password",
      "git forbids stashing more than 10 lines",
    ],
  },
  "pr-git-ex1": {
    optionsEn: [
      "snapshot of staged changes",
      "entire internet history",
      "only current line",
      "CSS variables",
    ],
  },
  "pr-git-ex3": {
    optionsEn: [
      "movable pointer to a commit",
      "hardware folder",
      "npm package",
      "network cable",
    ],
  },
  "pr-git-ex4": {
    optionsEn: [
      "proposal to review and merge changes",
      "deletes repository",
      "formats disk",
      "compiles TypeScript",
    ],
  },
  "node-url-path-r1": {
    optionsEn: [
      "resolve starts from process.cwd(), which changes if script is run from another directory",
      "resolve is forbidden in ESM",
      "data.json cannot be read from Node",
      "join is mandatory instead of checking file existence",
    ],
  },
  "node-url-path-r3": {
    optionsEn: [
      "attacker can escape application directory (path traversal)",
      "join always drops ..",
      "passwd does not exist on Linux",
      "join only works with URLs",
    ],
  },
  "pr-node-ex1": {
    optionsEn: [
      "JS runtime outside the browser",
      "CSS framework",
      "SQL database",
      "text editor",
    ],
  },
  "pr-node-ex3": {
    optionsEn: [
      "environment variables",
      "CSS only",
      "git refs",
      "browser DOM",
    ],
  },
  "pr-node-ex4": {
    optionsEn: [
      "npm run CLI commands",
      "SQL only",
      "CSS only",
      "chess ratings",
    ],
  },
  "pr-ex-cap-3": {
    pairsEn: [
      { left: "Route", right: "HTTP request entrypoint" },
      { left: "SQL", right: "data persistence layer" },
      { left: "QA", right: "quality verification suite" },
    ],
  },
  "pr-ex-d3": {
    optionsEn: [
      "ignores the error",
      "forwards to error-handling middleware",
      "creates a git commit",
      "injects CSS",
    ],
  },
  "express-query-validation-r1": {
    optionsEn: [
      "400 Bad Request with field error details, not 500 after NaN in SQL",
      "200 OK with empty list always",
      "301 Redirect to homepage",
      "500 Internal Error because client input is server fault",
    ],
  },
  "express-query-validation-r3": {
    optionsEn: [
      "attacker can pass NaN, negative, or 1 billion and crash the DB",
      "Number always returns 10",
      "query cannot be a string",
      "limit is ignored by database",
    ],
  },
  "pr-ex-ex1": {
    optionsEn: [
      "minimalist web framework for Node",
      "CSS library",
      "relational DB",
      "game engine",
    ],
  },
  "pr-ex-ex3": {
    optionsEn: [
      "functions in the req/res pipeline",
      "only static HTML",
      "git hooks only",
      "SQL triggers",
    ],
  },
  "sql-three-valued-r1": {
    optionsEn: [
      "= NULL evaluates to UNKNOWN, and WHERE keeps only TRUE rows",
      "NULL equals NULL in WHERE",
      "= is forbidden for status columns",
      "empty status is an empty string, not NULL",
    ],
  },
  "sql-three-valued-r3": {
    optionsEn: [
      "often zero rows because comparison with NULL yields UNKNOWN",
      "all rows except 1 and 2 always",
      "syntax compilation error always",
      "only rows where id is NULL",
    ],
  },
  "pr-sql-ex1": {
    optionsEn: [
      "rows matching the query",
      "only CSS rules",
      "git commits",
      "JSX templates",
    ],
  },
  "pr-sql-ex3": {
    optionsEn: [
      "combines rows from multiple tables by relation",
      "merges CSS files",
      "bundles npm packages",
      "opens network ports",
    ],
  },
  "qa-exploratory-note-r1": {
    optionsEn: [
      "covered areas, specific checks run, and edge cases tried for the next session",
      "nothing: an empty bug session has no artifact",
      "just 'all ok' with no details",
      "screenshot of green CI instead of notes",
    ],
  },
  "qa-exploratory-note-r3": {
    optionsEn: [
      "team cannot search or reuse it, context is lost",
      "chats are forbidden in software engineering",
      "notes must be written in assembly code",
      "chat automatically becomes a unit test",
    ],
  },
  "pr-qa-ex1": {
    optionsEn: [
      "isolated module or function in isolation",
      "entire production cluster at once only",
      "CSS animations only",
      "chess rating calculation",
    ],
  },
  "pr-qa-ex3": {
    optionsEn: [
      "many fast unit tests",
      "only manual UI tests",
      "zero tests",
      "only end-to-end browser tests",
    ],
  },
  "pr-qa-ex4": {
    optionsEn: [
      "detects reintroduction of previously resolved bugs",
      "minifies CSS stylesheets",
      "runs git blame on author",
      "awards extra XP",
    ],
  },
};
