import type { ExerciseLocaleEnrichment } from "./types.js";

export const JS_FUNDAMENTALS_LOCALE_ENRICHMENT: Record<string, ExerciseLocaleEnrichment> = {
  "jsf-object-is-r2": {
    "optionsEn": [
      "SameValueZero",
      "===",
      "==",
      "Object.is without changes"
    ]
  },
  "jsf-nullish-assign-r3": {
    "optionsEn": [
      "when a is falsy (0, empty string, false, null, undefined)",
      "only when a === null",
      "only when a === undefined",
      "always"
    ]
  },
  "jsf-rest-spread-fn-r3": {
    "optionsEn": [
      "Math.max(...xs)",
      "Math.max(xs)",
      "Math.max([...xs], 0) as one number",
      "Math.max.apply without an array"
    ]
  },
  "jsf-defaults-tdz-r2": {
    "optionsEn": [
      "b is still in TDZ when default for a is evaluated",
      "b is always undefined",
      "syntax error",
      "default parameters are forbidden"
    ]
  },
  "jsf-flatmap-at-r3": {
    "optionsEn": [
      "with returns a new copy without mutating the original array",
      "both mutate the array in place",
      "with removes index 0",
      "with only works on string arrays"
    ]
  },
  "jsf-freeze-seal-r1": {
    "optionsEn": [
      "TypeError",
      "x becomes 2",
      "silent failure",
      "o is deleted"
    ]
  },
  "jsf-freeze-seal-r2": {
    "optionsEn": [
      "seal permits modifying existing writable properties; freeze makes all properties read-only",
      "seal is deep, freeze is shallow",
      "they are identical",
      "seal deletes existing keys"
    ]
  },
  "jsf-groupby-fromentries-r3": {
    "optionsEn": [
      "when the grouping key is not a string (object, number without string coercion)",
      "when there are fewer than 3 groups",
      "when the input array is empty",
      "never"
    ]
  },
  "jsf-promise-combinators-r2": {
    "optionsEn": [
      "race rejects immediately; any still waits for pSlowOk",
      "both reject immediately",
      "both wait for fulfillment",
      "any rejects first"
    ]
  },
  "jsf-abort-controller-r2": {
    "optionsEn": [
      "check error.name === 'AbortError'",
      "all errors are indistinguishable",
      "response status code is 0",
      "HTTP status 408"
    ]
  },
  "jsf-abort-controller-r3": {
    "optionsEn": [
      "aborts the request after approximately 1 second if still pending",
      "waits exactly 1s even after receiving the response",
      "not supported in modern browsers",
      "retries the request"
    ]
  },
  "jsf-event-delegation-r1": {
    "optionsEn": [
      "the element to which the event handler is attached",
      "the deepest element clicked (target)",
      "document",
      "window"
    ]
  },
  "jsf-event-delegation-r3": {
    "optionsEn": [
      "dynamically added li elements are handled without attaching new listeners",
      "events stop bubbling",
      "requires attaching listeners to each li",
      "delegation stops working after DOM mutation"
    ]
  },
  "jsf-dom-tokens-data-r2": {
    "optionsEn": [
      "element.dataset.userId",
      "element.dataset['data-user-id']",
      "element.data.userId",
      "element.dataset.user-id as an identifier"
    ]
  },
  "jsf-dynamic-import-r2": {
    "optionsEn": [
      "(await import('./m.js')).default",
      "await import('./m.js') directly returns the default value",
      "require.default",
      "import default from dynamic without .default"
    ]
  },
  "jsf-dynamic-import-r3": {
    "optionsEn": [
      "upon user interaction (click), not during initial page load",
      "immediately when parsing the file",
      "never",
      "always during server-side rendering"
    ]
  },
  "jsf-col4": {
    "pairsEn": [
      {
        "left": "Set",
        "right": "unique values collection"
      },
      {
        "left": "Map",
        "right": "key-value pairs supporting arbitrary key types"
      },
      {
        "left": "Object",
        "right": "key-value structure with string or symbol keys"
      }
    ]
  },
  "jsf-cole2": {
    "optionsEn": [
      "nested object changes: Object.freeze is shallow by default",
      "nested object remains immutable",
      "throws TypeError in sloppy mode",
      "deletes the nested config object"
    ]
  },
  "jsf-col-e2": {
    "optionsEn": [
      "Set.has checks in $O(1)$ constant time vs $O(N)$ linear scan with array includes",
      "Set compresses memory usage by 10x",
      "Array.includes is deprecated in ES2024",
      "Set allows duplicate elements"
    ]
  },
  "jsf-mod-e2": {
    "optionsEn": [
      "circular dependency: variable b is accessed in module A before module B initialized it",
      "export statement was misspelled",
      "ES modules cannot import other ES modules",
      "Node.js does not support import statements"
    ]
  },
  "modern_features-exam-q1": {
    "optionsEn": [
      "SameValueZero treats +0 and -0 as identical keys",
      "SameValueZero distinguishes +0 and -0 as separate keys",
      "NaN is not equal to NaN",
      "SameValueZero is only used in regular expressions"
    ]
  },
  "modern_features-exam-q2": {
    "optionsEn": [
      "a is null or undefined (nullish)",
      "a is any falsy value like 0 or empty string",
      "a is truthy",
      "always"
    ]
  },
  "modern_features-exam-q3": {
    "optionsEn": [
      "evaluates default expression inside Temporal Dead Zone (TDZ)",
      "b is undefined",
      "syntax error in function declaration",
      "functions cannot accept default parameters"
    ]
  },
  "modern_features-exam-q4": {
    "optionsEn": [
      "with returns a new array copy without in-place mutation",
      "with mutates the array in place",
      "with deletes the element at index 0",
      "with is only supported in Node 12"
    ]
  },
  "modern_features-exam-q5": {
    "optionsEn": [
      "seal allows updating existing writable properties; freeze forbids writes",
      "seal is deep; freeze is shallow",
      "they are exact synonyms",
      "freeze deletes existing keys"
    ]
  },
  "modern_features-exam-q6": {
    "optionsEn": [
      "when grouping keys are non-strings (objects, numbers, symbols)",
      "when grouping fewer than three items",
      "when input array is empty",
      "never"
    ]
  },
  "async_dom_perf-exam-q1": {
    "optionsEn": [
      "any waits for first fulfilled promise; race settles on first settlement (rejection or fulfillment)",
      "both reject immediately on any failure",
      "both wait for all promises to resolve",
      "any rejects first"
    ]
  },
  "async_dom_perf-exam-q2": {
    "optionsEn": [
      "error.name === 'AbortError'",
      "HTTP status code 0",
      "HTTP status code 408",
      "all error objects are identical"
    ]
  },
  "async_dom_perf-exam-q3": {
    "optionsEn": [
      "the element where the event listener is attached (currentTarget)",
      "the innermost target element clicked",
      "document",
      "window"
    ]
  },
  "async_dom_perf-exam-q4": {
    "optionsEn": [
      "element.dataset.userId",
      "element.dataset['data-user-id']",
      "element.data.userId",
      "element.dataset.user-id as an identifier"
    ]
  },
  "async_dom_perf-exam-q5": {
    "optionsEn": [
      "(await import('./m.js')).default",
      "await import('./m.js') directly returns default value",
      "require.default",
      "import default without .default property"
    ]
  },
  "async_dom_perf-exam-q6": {
    "optionsEn": [
      "only Object.freeze is shallow: nested objects remain mutable without recursive freeze",
      "nested objects are deeply frozen automatically",
      "nested objects throw errors on read",
      "Object.freeze converts objects to arrays"
    ]
  },
  "jsf-error-subclass-r1": {
    "optionsEn": [
      "sets this.name = 'HttpError', calls super(message), and sets Error.captureStackTrace if available",
      "returns an empty string",
      "deletes the stack trace",
      "forbids catching with try/catch"
    ]
  },
  "jsf-error-subclass-r3": {
    "optionsEn": [
      "instanceof checks prototype chain and identifies specific error subclasses correctly",
      "typeof returns 'error'",
      "e.constructor is always null",
      "instanceof only works on arrays"
    ]
  },
  "jsf-error-cause-r2": {
    "optionsEn": [
      "err.cause",
      "err.inner",
      "err.previous",
      "err.reason"
    ]
  },
  "jsf-error-cause-r3": {
    "optionsEn": [
      "preserves original network error context in err.cause while presenting clean domain error",
      "deletes original error from memory",
      "logs error to public analytics",
      "restarts the server process"
    ]
  },
  "jsf-proto-chain-r3": {
    "optionsEn": [
      "walks up prototype chain and finds method on prototype object",
      "copies method into instance memory",
      "throws TypeError in strict mode",
      "deletes the method after call"
    ]
  },
  "jsf-class-private-r2": {
    "optionsEn": [
      "syntax error: private fields (#x) cannot be accessed outside the class body",
      "returns undefined silently",
      "returns the private value",
      "deletes the instance"
    ]
  },
  "jsf-class-private-r3": {
    "optionsEn": [
      "hard private: enforced by language engine, inaccessible via Object.keys or reflection",
      "soft convention only: accessible as obj['_private']",
      "private fields are deprecated in ES2022",
      "private fields can only store numbers"
    ]
  },
  "errors_classes-exam-q1": {
    "optionsEn": [
      "sets this.name and calls super(message)",
      "returns an integer code only",
      "deletes the stack trace",
      "forbids inheritance"
    ]
  },
  "errors_classes-exam-q2": {
    "optionsEn": [
      "new Error(msg, { cause: originalError })",
      "new Error(msg, originalError)",
      "new Error(msg).with(originalError)",
      "Error.chain(originalError)"
    ]
  },
  "errors_classes-exam-q3": {
    "optionsEn": [
      "SyntaxError before execution",
      "undefined",
      "the private value",
      "null"
    ]
  },
  "errors_classes-exam-q4": {
    "optionsEn": [
      "engine enforces hard privacy at syntax level; reflection cannot access #field",
      "it is just a naming convention like _foo",
      "it converts fields to symbols",
      "it is only available in TypeScript"
    ]
  },
  "jsf-regex-named-groups-r2": {
    "optionsEn": [
      "match.groups.year",
      "match[1].year",
      "match.year",
      "match.named('year')"
    ]
  },
  "jsf-regex-lookbehind-r3": {
    "optionsEn": [
      "matches digits preceded by $ without including $ in the matched string",
      "includes $ in the match result",
      "throws a syntax error in modern engines",
      "matches any currency symbol"
    ]
  },
  "jsf-unicode-u-flag-r3": {
    "optionsEn": [
      "treats astral surrogate pairs as a single code point (length 1)",
      "throws a runtime error",
      "converts text to ASCII",
      "ignores Unicode characters"
    ]
  },
  "regexp_text-exam-q1": {
    "optionsEn": [
      "match.groups",
      "match.named",
      "match.keys",
      "match.captures"
    ]
  },
  "regexp_text-exam-q2": {
    "optionsEn": [
      "asserts pattern precedes match without including it in result",
      "asserts pattern follows match",
      "matches negative numbers only",
      "reverses the search direction"
    ]
  },
  "regexp_text-exam-q3": {
    "optionsEn": [
      "accurately counts 32-bit surrogate pairs as single code points",
      "converts all text to uppercase",
      "speeds up execution by 100x",
      "disables regular expressions"
    ]
  },
  "regexp_text-exam-q4": {
    "optionsEn": [
      "normalizes canonically equivalent Unicode character sequences",
      "removes all whitespace characters",
      "converts string to lowercase",
      "generates a cryptographic hash"
    ]
  },
  "jsf-date-pitfalls-r1": {
    "optionsEn": [
      "January",
      "February",
      "December",
      "month index 0 is invalid"
    ]
  },
  "jsf-date-pitfalls-r2": {
    "optionsEn": [
      "date-only ISO strings are parsed as UTC midnight, shifting day in local time zones",
      "always parsed as local midnight",
      "throws an unhandled format error",
      "returns a string instead of Date"
    ]
  },
  "jsf-intl-datetime-r2": {
    "optionsEn": [
      "server process timezone is UTC or host-dependent, differing from user timezone",
      "servers cannot format dates",
      "Intl is prohibited in Node.js",
      "timeZone is only needed for minute precision"
    ]
  },
  "jsf-intl-datetime-r3": {
    "optionsEn": [
      "array of {type, value} objects to style components (day, month) individually",
      "identical formatted string",
      "numeric epoch timestamp",
      "Date object instance"
    ]
  },
  "jsf-intl-number-plural-r3": {
    "optionsEn": [
      "plural rules vary across languages (few, many, other), not just n > 1",
      "all languages only have singular and plural like English",
      "Intl does not support plurals",
      "numbers cannot be formatted with strings"
    ]
  },
  "dates_intl-exam-q1": {
    "optionsEn": [
      "zero-indexed, 0 is January",
      "one-indexed, 1 is January",
      "zero-indexed, 0 is December",
      "month must be passed as a string"
    ]
  },
  "dates_intl-exam-q2": {
    "optionsEn": [
      "as UTC midnight",
      "as local timezone midnight always",
      "as an invalid date error",
      "as local noon"
    ]
  },
  "dates_intl-exam-q3": {
    "optionsEn": [
      "to prevent formatting from depending on server host machine timezone",
      "otherwise an uncaught exception is thrown",
      "to disable localization",
      "it only affects minute precision"
    ]
  },
  "jsf-symbol-keys-r3": {
    "optionsEn": [
      "no: JSON.stringify silently ignores symbol-keyed properties",
      "yes: serialized as the symbol description string",
      "yes: serialized as a numeric ID",
      "throws a TypeError"
    ]
  },
  "jsf-proxy-traps-r2": {
    "optionsEn": [
      "throws a TypeError in strict mode",
      "value is written regardless",
      "silently ignored in all modes",
      "target object is deleted"
    ]
  },
  "jsf-proxy-traps-r3": {
    "optionsEn": [
      "no: Proxy instance and target are distinct object references",
      "yes: they are identical references",
      "only if handler is empty",
      "only for array targets"
    ]
  },
  "jsf-reflect-api-r2": {
    "optionsEn": [
      "returns false on failure rather than failing silently without status",
      "always throws TypeError",
      "cannot write values",
      "mutates the prototype chain"
    ]
  },
  "jsf-reflect-api-r3": {
    "optionsEn": [
      "provides correct 'this' context for getters (the receiver/proxy)",
      "specifies default fallback value",
      "strict mode boolean flag",
      "asynchronous completion callback"
    ]
  },
  "proxy_meta-exam-q1": {
    "optionsEn": [
      "no: each Symbol() call produces a globally unique primitive value",
      "yes: matching description strings make symbols equal",
      "yes: if defined in the same file",
      "only in strict mode"
    ]
  },
  "proxy_meta-exam-q2": {
    "optionsEn": [
      "no: proxy instance is a wrapper with distinct identity",
      "yes: they share the identical memory reference",
      "yes: if handler defines zero traps",
      "yes: after the first property read"
    ]
  },
  "proxy_meta-exam-q3": {
    "optionsEn": [
      "true",
      "false",
      "undefined",
      "the assigned value itself"
    ]
  },
  "proxy_meta-exam-q4": {
    "optionsEn": [
      "to preserve default language semantics and pass receiver to getters",
      "to accelerate loop performance",
      "to disable the Proxy",
      "it is an external library requirement"
    ]
  },
  "jsf-class-basics-r2": {
    "optionsEn": [
      "TypeError",
      "creates global object",
      "undefined",
      "returns A"
    ]
  },
  "jsf-extends-super-r1": {
    "optionsEn": [
      "this accessed before super()",
      "extends is forbidden",
      "super must follow return",
      "no error"
    ]
  },
  "jsf-extends-super-r3": {
    "optionsEn": [
      "whether Parent.prototype is in the prototype chain",
      "whether class names match",
      "whether Child === Parent",
      "whether super was called twice"
    ]
  },
  "jsf-private-fields-r1": {
    "optionsEn": [
      "no, accessible only within the class body",
      "yes, via Object.keys",
      "yes, via JSON.stringify",
      "yes, via bracket notation"
    ]
  },
  "jsf-private-fields-r3": {
    "optionsEn": [
      "on the class constructor function itself, not instances",
      "on each instance",
      "in global scope",
      "only on prototype.constructor.name"
    ]
  },
  "classes_oop-exam-q1": {
    "optionsEn": [
      "TypeError",
      "creates an instance",
      "undefined",
      "method becomes global"
    ]
  },
  "classes_oop-exam-q2": {
    "optionsEn": [
      "after calling super()",
      "before calling super()",
      "instead of calling super()",
      "never"
    ]
  },
  "classes_oop-exam-q3": {
    "optionsEn": [
      "on the prototype object",
      "on each instance as separate code copies",
      "in the global object",
      "in the static block"
    ]
  },
  "classes_oop-exam-q4": {
    "optionsEn": [
      "no, accessible only within the class body",
      "yes, with string hash syntax",
      "yes, via Object.keys",
      "yes, via JSON.stringify"
    ]
  },
  "jsf-map-vs-object-r2": {
    "optionsEn": [
      "Object coerces keys to strings; Map preserves distinct types",
      "Map always coerces to numbers",
      "Object forbids numeric keys",
      "they never coincide"
    ]
  },
  "jsf-set-unique-r3": {
    "optionsEn": [
      "new Set with union of elements without mutating a and b",
      "mutated a",
      "array",
      "Map"
    ]
  },
  "jsf-weakmap-weakset-r1": {
    "optionsEn": [
      "otherwise code would observe non-deterministic garbage collection timing",
      "not yet implemented in spec",
      "WeakMap is always empty",
      "size would be infinite"
    ]
  },
  "jsf-weakmap-weakset-r2": {
    "optionsEn": [
      "primitive string cannot be used as a key",
      "string is a valid key",
      "only numbers are forbidden",
      "set only throws after get"
    ]
  },
  "collections_maps-exam-q1": {
    "optionsEn": [
      "Map preserves arbitrary key types without string coercion",
      "Map only accepts strings",
      "Object accepts functions without coercion",
      "no difference"
    ]
  },
  "collections_maps-exam-q2": {
    "optionsEn": [
      "SameValueZero",
      "===",
      "==",
      "Object.is without zeros"
    ]
  },
  "collections_maps-exam-q3": {
    "optionsEn": [
      "to prevent observing garbage collection non-determinism",
      "because it is always empty",
      "because keys are strings",
      "it is just an alias for Map"
    ]
  },
  "collections_maps-exam-q4": {
    "optionsEn": [
      "garbage collector can reclaim it and the entry disappears",
      "entry persists forever in memory",
      "throws TypeError on next tick",
      "key becomes a string"
    ]
  },
  "jsf-iterable-protocol-r1": {
    "optionsEn": [
      "iterator object with a next() method",
      "array of values",
      "length number property",
      "map function"
    ]
  },
  "jsf-iterable-protocol-r3": {
    "optionsEn": [
      "iterates all enumerable keys, potentially capturing prototype properties",
      "it is forbidden by syntax",
      "always iterates in numerical order",
      "it invokes Symbol.iterator"
    ]
  },
  "jsf-generators-r3": {
    "optionsEn": [
      "generator iterator object; body execution has not started",
      "result of body",
      "undefined after full execution",
      "TypeError"
    ]
  },
  "jsf-yield-star-r3": {
    "optionsEn": [
      "10 after g is exhausted",
      "undefined always",
      "the generator object g",
      "the first yield from g"
    ]
  },
  "iterators_generators-exam-q1": {
    "optionsEn": [
      "a [Symbol.iterator]() method returning an iterator",
      "a length property",
      "a map method",
      "a forEach method"
    ]
  },
  "iterators_generators-exam-q2": {
    "optionsEn": [
      "an iterator object with body not yet executed",
      "all yields immediately",
      "undefined",
      "TypeError"
    ]
  },
  "iterators_generators-exam-q3": {
    "optionsEn": [
      "delegates iteration to another iterable or generator",
      "halts program execution",
      "copies the function",
      "creates a Promise"
    ]
  },
  "iterators_generators-exam-q4": {
    "optionsEn": [
      "for...of iterates values via iterator; for...in iterates keys",
      "they are completely identical",
      "for...of iterates keys",
      "for...in invokes Symbol.iterator"
    ]
  },
  "jsf-regexp-basics-r1": {
    "optionsEn": [
      "g flag advanced lastIndex past the end of the string",
      "the string mutated",
      "test() always returns false for 'a'",
      "the g flag is forbidden"
    ]
  },
  "jsf-regexp-groups-r2": {
    "optionsEn": [
      "replaceAll requires the g flag when passing a RegExp, otherwise throws TypeError",
      "they are always identical",
      "replaceAll only accepts numbers",
      "replaceAll cannot accept replacer functions"
    ]
  },
  "jsf-unicode-normalize-r2": {
    "optionsEn": [
      "so canonically equivalent accented characters match in string comparison",
      "to convert to lowercase",
      "to trim whitespace",
      "to remove emojis"
    ]
  }
};
