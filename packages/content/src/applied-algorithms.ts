import type { CourseContent } from "./types.js";
import {
  codeFill,
  codeOrderAuto,
  codeOutputMcq,
  codeProject,
  codeRead,
  exam,
  lesson,
  matchEx,
  mcq,
  unit,
  why,
} from "./builders.js";

const complexityProfiling = unit(
  "aa_complexity_profiling",
  "Складність у вебнавантаженнях та вимірювання",
  "Complexity in Real Workloads & Profiling",
  [
    lesson(
      "aa-cp-big-o",
      "Чому $O(N^2)$ непомітне на 20 тестах, але кладе API на 10 000 задач",
      "Why Quadratic Code Looks Fast in Dev and Stalls in Prod",
      3, true, [
        codeRead(
          "aa-cp1",
          "Виявіть приховану $O(N^2)$ операцію в рендері дошки: При 20 000 задач і 5 000 користувачів скільки порівнянь у гіршому випадку зробить `users.find` і як прискорити до $O(N + M)$?",
          "Identify quadratic hidden loop in board grouping: With 20,000 tasks and 5,000 users, what happens and how do we fix it to O(N + M)?",
          "ts",
          "function attachAuthors(tasks: Task[], users: User[]) {\n  return tasks.map((t) => ({\n    ...t,\n    author: users.find((u) => u.id === t.authorId),\n  }));\n}",
          [
            "До 100 мільйонів порівнянь; побудувати один `Map<number, User>` за $O(M)$, потім робити `byId.get(t.authorId)` за $O(1)$",
            "`users.find` кешується рушієм V8 у базі даних",
            "Замінити `.find` на `.filter(...)[0]` (стає швидше у 100 разів)",
            "Перевести масиви у `Object.freeze`",
          ],
          0,
          why(
            "Вкладені `.find()` / `.includes()` всередині `.map()` перетворюють лінійний прохід на квадратичний; попередня індексація у `Map`/`Set` робить lookup константним.",
            "Replacing nested `.find()` inside `.map()` with one prebuilt `Map` eliminates quadratic scaling.",
          ),
        ),
        mcq(
          "aa-cp2",
          "Перед оптимізацією функції що інженер робить спершу, щоб не оптимізувати вигадане місце?",
          "What must happen before rewriting working code for speed?",
          [
            "Виміряти час/пам'ять на реалістичному розмірі даних (profiling / benchmark), знайти вузьке місце і зберегти поведінкові тести",
            "Переписати весь проєкт на асемблер наосліп",
            "Видалити типізацію TypeScript",
            "Вимкнути перевірки null",
          ],
          0,
        ),
      ], { baseXp: 22 },
    ),
    exam("aa-cp-exam", "Контрольна: складність і профілювання", "Checkpoint: Complexity & Profiling", 3, [
      mcq(
        "aa-cp-e1",
        "Яка функція масштабується набагато гірше при зростанні $N$ з 100 до 100 000?",
        "Which growth rate degrades fastest as input N grows from 100 to 100,000?",
        ["O(N^2)", "O(N log N)", "O(N)", "O(1)"],
        0,
        why(
          "При зростанні N у 1000 разів O(N^2) зростає у 1 000 000 разів, тоді як O(N log N) — приблизно у 1700 разів.",
          "When N grows 1,000x, O(N^2) grows 1,000,000x, whereas O(N log N) grows roughly 1,700x.",
        ),
      ),
      ({ ...mcq(
        "aa-cp-e2",
        "Функція робить `items.filter(...).length` усередині циклу по `items` (довжина $N$). Яка її часова складність?",
        "A function calls `items.filter(...).length` inside a loop over `items` of length N. What is its time complexity?",
        ["O(N^2)", "O(N)", "O(log N)", "O(1)"],
        0,
        why(
          "`filter()` сканує весь масив за O(N) на кожній з N ітерацій зовнішнього циклу — разом O(N^2).",
          "`filter()` scans the entire array in O(N) on each of the N outer iterations, yielding O(N^2).",
        ),
      ), optionsEn: ["O(N^2)", "O(N)", "O(log N)", "O(1)"] }),
      ({ ...mcq(
        "aa-cp-e3",
        "Який перший крок перед оптимізацією гальмівного ендпоїнта?",
        "What is the right first step before optimizing a slow endpoint?",
        [
          "Зняти профіль/бенчмарк на реалістичному обсязі даних і зберегти тести поведінки",
          "Переписати всі цикли на `for (;;)` навмання",
          "Вимкнути валідацію вхідних даних",
          "Збільшити таймаут клієнта до 10 хвилин",
        ],
        0,
        why(
          "Профілювання показує реальне вузьке місце (CPU, БД, серіалізація), а тести захищають від регресій.",
          "Profiling pinpoints the real bottleneck (CPU, DB, serialization) while behavioral tests prevent regressions.",
        ),
      ), optionsEn: [
        "Profile/benchmark on realistic data volume and keep behavioral tests",
        "Rewrite all loops to `for (;;)` blindly",
        "Disable input validation",
        "Raise client timeout to 10 minutes",
      ] }),
      codeFill(
        "aa-cp-e4",
        "Заповніть пропуск: індексація довідника за ID знижує пошук з O(N) до O(1)",
        "Fill in the blank: indexing a lookup table by ID drops lookup from O(N) to O(1)",
        "ts",
        "const byId = new ___(users.map((u) => [u.id, u]));\nconst author = byId.get(task.authorId);",
        ["Map"],
        true,
        why(
          "`Map` забезпечує O(1) у середньому для `.get(id)` замість лінійного `.find()`.",
          "`Map` provides average O(1) `.get(id)` lookup instead of linear `.find()`.",
        ),
      ),
    ]),
  ],
);

const mapsSetsDedup = unit(
  "aa_maps_sets_dedup",
  "Колекції Map і Set, індексація та дедуплікація",
  "Maps, Sets, Indexing & Deduplication",
  [
    lesson(
      "aa-ms-lookup",
      "Індексування записів, групування та вибір `Map` проти `Set` проти об'єкта",
      "Choosing Map, Set, or Plain Object Cleanly",
      3, true, [
        codeOutputMcq(
          "aa-ms1",
          "Зіставлення підводного каменя plain JS object при довільних користувацьких ключах",
          "Spot prototype collision hazard in plain object dictionary",
          "ts",
          "const counts: Record<string, number> = {};\n// key = \"constructor\" from untrusted tag filter!\nconsole.log(Boolean(counts[\"constructor\"]));",
          [
            "true — колізія з `Object.prototype.constructor`! `new Map()` повністю захищений від ключів на кшталт `constructor` або `__proto__`",
            "false — порожній `{}` не містить прототипних властивостей",
            "Викине TypeError",
            "Поверне undefined",
          ],
          0,
          why(
            "Для довільних користувацьких ключів (теги, назви, ID) `Map` і `Set` безпечніші та швидші при частих вставках/видаленнях, ніж `{}`.",
            "`Map` avoids prototype key collisions (`constructor`, `toString`) and handles dynamic mutations cleanly.",
          ),
        ),
        codeFill(
          "aa-ms2",
          "Швидка перевірка наявності ID без $O(N)$ сканування масиву",
          "O(1) membership structure for selected task IDs",
          "ts",
          "const allowedIds = new ___([1, 2, 3]);\nif (allowedIds.has(task.id)) { ... }",
          ["Set"],
          true,
        ),
      ], { baseXp: 24 },
    ),
    exam("aa-ms-exam", "Контрольна: колекції Map та Set", "Checkpoint: Maps & Sets", 3, [
      ({ ...mcq(
        "aa-ms-e1",
        "Потрібно зберегти унікальні теги задачі у порядку додавання і перевіряти наявність за $O(1)$. Що обрати?",
        "Need deduplicated items preserving insertion order with O(1) `.has()`. Best structure?",
        ["Set<string>", "Несортований масив + indexOf", "Зв'язний список з лінійним пошуком", "Рядок з комами"],
        0,
        why(
          "`Set` у JS/TS автоматично дедуплікує елементи, зберігає порядок вставки та дає O(1) `.has()`.",
          "`Set` in JS/TS deduplicates values, preserves insertion order, and offers O(1) `.has()`.",
        ),
      ), optionsEn: ["Set<string>", "Unsorted array + indexOf", "Linked list with linear search", "Comma-separated string"] }),
      ({ ...mcq(
        "aa-ms-e2",
        "Чому для підрахунку довільних тегів від користувачів `new Map<string, number>()` безпечніший за `{}`?",
        "Why is `new Map<string, number>()` safer than `{}` for counting arbitrary user-supplied tags?",
        [
          "`Map` не має колізій із ключами `Object.prototype` (як-от `constructor` чи `toString`)",
          "`Map` автоматично зберігається у PostgreSQL",
          "`{}` не підтримує числові значення",
          "`Map` забороняє рядкові ключі",
        ],
        0,
        why(
          "У plain object ключ `\"constructor\"` або `\"toString\"` повертає метод прототипу замість `undefined`.",
          "In a plain object, keys like `\"constructor\"` or `\"toString\"` resolve to prototype properties instead of `undefined`.",
        ),
      ), optionsEn: [
        "`Map` has no collisions with `Object.prototype` keys like `constructor` or `toString`",
        "`Map` is automatically persisted in PostgreSQL",
        "`{}` does not support numeric values",
        "`Map` forbids string keys",
      ] }),
      codeRead(
        "aa-ms-e3",
        "Що виведе `new Set(['a', 'b', 'a', 'c']).size`?",
        "What does `new Set(['a', 'b', 'a', 'c']).size` evaluate to?",
        "ts",
        "const tags = new Set(['a', 'b', 'a', 'c']);\nconsole.log(tags.size);",
        ["3", "4", "2", "1"],
        0,
        why(
          "`Set` зберігає лише унікальні значення, тому повтор `'a'` ігнорується — розмір 3.",
          "`Set` stores unique values only, so the duplicate `'a'` is ignored, leaving size 3.",
        ),
      ),
      codeFill(
        "aa-ms-e4",
        "Заповніть метод `Map`, який безпечно перевіряє, чи існує ключ у мапі (навіть якщо значення `0`)",
        "Fill in the `Map` method that checks key existence even when the stored value is `0`",
        "ts",
        "if (counts.___(tag)) {\n  counts.set(tag, (counts.get(tag) ?? 0) + 1);\n}",
        ["has"],
        true,
        why(
          "`map.has(key)` перевіряє наявність ключа без плутанини з falsy-значеннями `0` чи `\"\"`.",
          "`map.has(key)` checks key presence without being fooled by falsy values like `0` or `\"\"`.",
        ),
      ),
    ]),
  ],
);

const stacksQueues = unit(
  "aa_stacks_queues",
  "Стеки (LIFO), черги (FIFO) та Backpressure",
  "Stacks, Queues & Bounded Concurrency",
  [
    lesson(
      "aa-sq-undo-queue",
      "Стек історії дій, черга фонових задач і чому `array.shift()` може гальмувати",
      "Undo Stacks, FIFO Queues & Avoiding O(N) Array.shift()",
      3, true, [
        matchEx(
          "aa-sq1",
          "Підберіть структуру даних для практичного сценарію застосунку",
          "Match each app feature to the right data structure",
          [
            { left: "Undo / Redo дій редактора на дошці ForgeBoard", right: "Stack (LIFO: push/pop)" },
            { left: "Черга відправлення листів або обробки вебхуків за порядком прибуття", right: "Queue (FIFO з індексом голови або кільцевий буфер)" },
            { left: "Останні 100 пошукових запитів або кеш фіксованого розміру", right: "Bounded LRU Cache / Ring Buffer" },
          ],
        ),
        mcq(
          "aa-sq2",
          "Черга містить 100 000 подій у масиві JS і воркер викликає `queue.shift()` у циклі. Що відбувається під капотом?",
          "A loop processes 100,000 events calling `queue.shift()`. Why does it degrade to $O(N^2)$?",
          [
            "`shift()` щоразу зсуває всі решту N-1 елементів у пам'яті на індекс ліворуч; head-індекс або кільцевий буфер тримають dequeue за $O(1)$",
            "`shift()` робить глибоку копію диска",
            "`shift()` перетворює числа у рядки",
            "JS автоматично сортує масив при `shift()`",
          ],
          0,
        ),
      ], { baseXp: 25 },
    ),
    exam("aa-sq-exam", "Контрольна: стеки та черги", "Checkpoint: Stacks & Queues", 3, [
      ({ ...mcq(
        "aa-sq-e1",
        "Що означає обмежена черга / concurrency limit (`maxConcurrent = 4`) при запуску 200 запитів або job-ів?",
        "Why enforce bounded concurrency + queue backpressure instead of `Promise.all(200_items)`?",
        [
          "Запобігає вичерпанню пам'яті, сокетів та пулу БД (4 одночасні задачі замість шторму на 200)",
          "Робить код синхронним у циклі while(true)",
          "Видаляє зайві задачі без виконання",
          "Забороняє використання Promise",
        ],
        0,
        why(
          "Обмежена конкурентність тримає стабільне навантаження на БД та зовнішні API без перевантаження.",
          "Bounded concurrency keeps DB pools and downstream APIs stable instead of spiking 200 simultaneous connections.",
        ),
      ), optionsEn: [
        "Prevents memory, socket, and DB pool exhaustion (4 concurrent tasks instead of a 200-request storm)",
        "Turns code synchronous inside a while(true) loop",
        "Drops extra tasks without running them",
        "Forbids using Promises",
      ] }),
      ({ ...mcq(
        "aa-sq-e2",
        "Яка структура природно реалізує історію Undo / Redo у редакторі?",
        "Which structure naturally models Undo / Redo history in an editor?",
        [
          "Стек (LIFO: push / pop)",
          "Невідсортований Set",
          "Бінарне дерево пошуку",
          "Одноразовий лічильник",
        ],
        0,
        why(
          "Остання виконана дія має скасовуватися першою — це класичний принцип LIFO (стек).",
          "The most recent action must be undone first, which is classic LIFO stack behavior.",
        ),
      ), optionsEn: [
        "Stack (LIFO: push / pop)",
        "Unsorted Set",
        "Binary search tree",
        "Single counter",
      ] }),
      ({ ...mcq(
        "aa-sq-e3",
        "Чому цикл `while (q.length) { handle(q.shift()); }` на масиві з 100 000 елементів стає повільним?",
        "Why does `while (q.length) { handle(q.shift()); }` become slow on a 100,000-item array?",
        [
          "Кожен `shift()` зсуває всі решту елементів у пам'яті (O(N)), що дає O(N^2) сумарно",
          "`shift()` виконує мережевий запит",
          "`shift()` перетворює масив на Set",
          "JavaScript обмежує `shift()` до 1000 викликів",
        ],
        0,
        why(
          "Використання head-індексу або кільцевого буфера робить вилучення з голови O(1) замість O(N).",
          "Using a head index or ring buffer makes dequeue O(1) instead of shifting O(N) elements every step.",
        ),
      ), optionsEn: [
        "Each `shift()` shifts all remaining elements in memory (O(N)), causing O(N^2) total work",
        "`shift()` performs a network request",
        "`shift()` converts the array into a Set",
        "JavaScript caps `shift()` at 1,000 calls",
      ] }),
      codeFill(
        "aa-sq-e4",
        "Оновіть head-індекс замість `shift()`, щоб взяти наступний елемент черги за O(1)",
        "Advance the head index instead of `shift()` to dequeue in O(1)",
        "ts",
        "const item = queue[head];\n___ += 1;",
        ["head"],
        true,
        why(
          "Зсув індексу `head` читає елемент за O(1) без переміщення решти масиву.",
          "Advancing `head` reads the front item in O(1) without shifting the remaining array.",
        ),
      ),
    ]),
  ],
);

const searchSort = unit(
  "aa_search_sort_pagination",
  "Пошук, стабільність сортування та бінарний пошук",
  "Binary Search & Deterministic Comparators",
  [
    lesson(
      "aa-ss-comparators",
      "Детерміноване сортування, `toSorted` та бінарний пошук діапазону",
      "Comparator Tie-Breakers & Binary Search Boundaries",
      3, true, [
        codeRead(
          "aa-ss1",
          "Чому сортування задач стрибає між сторінками при однаковому `priority`? Що додати у компаратор, щоб при рівних пріоритетах порядок завжди лишався фіксованим?",
          "Diagnose non-deterministic comparator tie bug: How do you make equal-priority ordering strictly deterministic?",
          "ts",
          "tasks.toSorted((a, b) => a.priority - b.priority);",
          [
            "Додати вторинний унікальний tie-breaker: `(a.priority - b.priority) || (a.id - b.id)`",
            "Використовувати `Math.random() - 0.5`",
            "Обгорнути в `setTimeout`",
            "Скористатися лише `JSON.stringify`",
          ],
          0,
          why(
            "Детермінований tie-breaker гарантує стабільне відображення в UI і консистентну курсорну пагінацію.",
            "Adding a unique `id` tie-breaker stabilizes equal-priority elements across re-renders and pagination.",
          ),
        ),
        mcq(
          "aa-ss2",
          "Масив таймстемпів логів відсортований за зростанням (1 млн записів). Скільки кроків потрібно, щоб знайти першу подію після часу T бінарним пошуком?",
          "Log timestamps are sorted ascending (1,000,000 items). Roughly how many comparisons does binary search need?",
          ["~20 порівнянь ($log_2(10^6) \\approx 20$), замість 1 000 000 лінійного скану", "500 000 порівнянь", "1 000 000 порівнянь", "10^12 порівнянь"],
          0,
        ),
      ], { baseXp: 25 },
    ),
    exam("aa-ss-exam", "Контрольна: пошук і сортування", "Checkpoint: Searching & Sorting", 3, [
      codeFill(
        "aa-ss-e1",
        "Імутабельне сортування масиву в сучасному JS/TS без зміни оригіналу",
        "Non-mutating array sort method",
        "ts",
        "const sorted = items.___((a, b) => a.id - b.id);",
        ["toSorted"],
        true,
        why(
          "`toSorted()` повертає новий відсортований масив і не мутує стан React чи вхідний параметр.",
          "`toSorted()` returns a new sorted array without mutating React state or input arguments.",
        ),
      ),
      ({ ...mcq(
        "aa-ss-e2",
        "Навіщо додавати вторинний ключ `|| (a.id - b.id)` у компаратор сортування за `priority`?",
        "Why add a secondary tie-breaker `|| (a.id - b.id)` when sorting by `priority`?",
        [
          "Щоб порядок елементів із однаковим `priority` був детермінованим і не стрибав при пагінації",
          "Щоб прискорити компіляцію TypeScript",
          "Щоб видаляти дублікати під час сортування",
          "Без нього `toSorted` кидає виняток",
        ],
        0,
        why(
          "Детермінований tie-breaker усуває нестабільність списку між рендерами та сторінками.",
          "A deterministic tie-breaker prevents equal-priority items from shifting order across renders or pages.",
        ),
      ), optionsEn: [
        "So items with equal `priority` stay in a deterministic order across renders and pagination",
        "To speed up TypeScript compilation",
        "To delete duplicates during sorting",
        "Without it `toSorted` throws an exception",
      ] }),
      ({ ...mcq(
        "aa-ss-e3",
        "Яка обов'язкова передумова для бінарного пошуку в масиві?",
        "What is the mandatory precondition for binary search on an array?",
        [
          "Масив має бути відсортованим за ключем пошуку",
          "Масив має містити лише парну кількість елементів",
          "Усі елементи мають бути рядками",
          "Масив не може бути довшим за 1000 елементів",
        ],
        0,
        why(
          "Бінарний пошук відкидає половину діапазону на кожному кроці лише завдяки монотонності відсортованих даних.",
          "Binary search can discard half the range at each step only because the data is sorted.",
        ),
      ), optionsEn: [
        "The array must be sorted by the search key",
        "The array must have an even length",
        "All elements must be strings",
        "The array cannot exceed 1,000 items",
      ] }),
      ({ ...codeRead(
        "aa-ss-e4",
        "Чому `[10, 2, 1].sort()` у JS без компаратора дає `[1, 10, 2]`?",
        "Why does `[10, 2, 1].sort()` in JS without a comparator return `[1, 10, 2]`?",
        "ts",
        "console.log([10, 2, 1].sort());",
        [
          "За замовчуванням `.sort()` порівнює елементи як рядки UTF-16 (`'10' < '2'`)",
          "JS завжди сортує за спаданням",
          "Метод `.sort()` округляє числа",
          "Тому що 10 не є простим числом",
        ],
        0,
        why(
          "Для чисел завжди передавайте числовий компаратор `(a, b) => a - b`.",
          "Always pass a numeric comparator `(a, b) => a - b` when sorting numbers.",
        ),
      ), optionsEn: ["By default `.sort()` compares elements as UTF-16 strings (`'10' < '2'`)", "JS always sorts descending", "`.sort()` rounds numbers", "Because 10 is not prime"] }),
    ]),
  ],
);

const treesTraversal = unit(
  "aa_trees_traversal",
  "Дерева і графи: коментарі, категорії, BFS/DFS та захист від циклів",
  "Trees, Org Hierarchies, BFS/DFS & Cycle Guards",
  [
    lesson(
      "aa-tt-cycles",
      "Перетворення плоского списку (adjacency list) у дерево і виявлення циклів",
      "Building Trees from Flat DB Rows & Cycle Guards",
      4, false, [
        codeRead(
          "aa-tt1",
          "Виявіть потенційний `Maximum call stack size exceeded` при побудові залежностей підзадач: Як гарантовано зупинити рекурсію навіть на зіпсованих циклічних даних?",
          "Prevent infinite recursion on cyclic task dependencies: What guard prevents stack overflow if corrupt data forms a dependency cycle?",
          "ts",
          "function collectBlocked(id: number, deps: Map<number, number[]>, out = new Set<number>()) {\n  for (const next of deps.get(id) ?? []) {\n    // BUG if A blocks B and B blocks A!\n    collectBlocked(next, deps, out);\n  }\n}",
          [
            "Перевіряти `if (visited.has(id)) return; visited.add(id);` перед обходом сусідів",
            "Просто збільшити ліміт стека Node через прапорець CLI на 1GB",
            "Замінити `Map` на масив",
            "Прибрати `return` у функції",
          ],
          0,
          why(
            "Будь-які графи залежностей задач або ролей у реальних застосунках вимагають `visited` Set для захисту від циклів.",
            "Always track a `visited` set when traversing task dependencies or parent pointers to reject or skip cycles safely.",
          ),
        ),
        codeOrderAuto(
          "aa-tt2",
          "Побудуйте дерево задач із плоских SQL-рядків за один прохід $O(N)$ (замість рекурсивного `.filter` на кожен вузол)",
          "Build nested task tree from flat DB rows in O(N)",
          "ts",
          [
            "Create Map<id, nodeWithChildren> initializing children: [] for every row",
            "Iterate rows once attaching each child to map.get(row.parentId)?.children",
            "Collect roots (where parentId === null) into result array",
          ],
          why(
            "Двокрокова побудова через `Map` будує дерево довільної глибини за $O(N)$ часу і без ризику зайвих запитів.",
            "Building node maps once turns nested `.filter()` $O(N^2)$ recursion into linear $O(N)$ tree assembly.",
          ),
        ),
      ], { baseXp: 26 },
    ),
    exam("aa-tt-exam", "Контрольна: дерева і обходи", "Checkpoint: Trees & Graph Traversal", 4, [
      ({ ...mcq(
        "aa-tt-e1",
        "Коли доречніший BFS (пошук у ширину) замість DFS?",
        "When is Breadth-First Search (BFS) clearly preferred over DFS?",
        [
          "Пошук найкоротшого шляху (найменше кроків) або завантаження елементів по рівнях ієрархії",
          "Просте підсумовування всіх елементів плоского масиву",
          "Генерація випадкових UUID",
          "Сортування рядків за абеткою",
        ],
        0,
        why(
          "BFS обходить граф шар за шаром, тому першим знаходить найкоротший шлях у незваженому графі.",
          "BFS explores level by level, guaranteeing the shortest path in unweighted graphs.",
        ),
      ), optionsEn: [
        "Finding the shortest path (fewest hops) or loading hierarchy nodes level by level",
        "Summing all elements of a flat array",
        "Generating random UUIDs",
        "Sorting strings alphabetically",
      ] }),
      ({ ...mcq(
        "aa-tt-e2",
        "Як захистити рекурсивний обхід залежностей від нескінченного циклу при зіпсованих даних (A→B→A)?",
        "How do you protect a recursive dependency traversal against infinite loops on corrupt cyclic data (A→B→A)?",
        [
          "Передавати `visited: Set<number>` і зупинятися, якщо вузол уже відвідано",
          "Видалити базовий випадок рекурсії",
          "Замінити `Set` на `Math.random()`",
          "Зберігати вузли у CSS-класах",
        ],
        0,
        why(
          "`visited.has(id)` перериває обхід при повторному входженні в цикл і запобігає переповненню стека.",
          "Checking `visited.has(id)` stops re-entering a cycle and prevents stack overflow.",
        ),
      ), optionsEn: [
        "Track a `visited: Set<number>` and return early if the node was already seen",
        "Remove the recursion base case",
        "Replace `Set` with `Math.random()`",
        "Store nodes in CSS classes",
      ] }),
      ({ ...mcq(
        "aa-tt-e3",
        "Яка складність побудови дерева з плоского масиву рядків БД за допомогою попереднього `Map<id, node>`?",
        "What is the time complexity of assembling a tree from flat DB rows using a prebuilt `Map<id, node>`?",
        ["O(N)", "O(N^2)", "O(N!)", "O(2^N)"],
        0,
        why(
          "Перший прохід індексує вузли в `Map`, другий прикріплює дітей за `parentId` — разом O(N).",
          "One pass indexes nodes in a `Map` and a second attaches children via `parentId`, totaling O(N).",
        ),
      ), optionsEn: ["O(N)", "O(N^2)", "O(N!)", "O(2^N)"] }),
      codeFill(
        "aa-tt-e4",
        "Заповніть умову захисту від циклів у графі",
        "Fill in the cycle-guard condition in graph traversal",
        "ts",
        "if (visited.___(id)) return;\nvisited.add(id);",
        ["has"],
        true,
        why(
          "`visited.has(id)` перевіряє, чи ми вже відвідували цей вузол.",
          "`visited.has(id)` checks whether this node has already been visited.",
        ),
      ),
    ]),
  ],
);

const tradeoffsCapstone = unit(
  "aa_tradeoffs_capstone",
  "Продуктивні компроміси та оптимізація ForgeBoard M12",
  "Time-Space Tradeoffs & ForgeBoard Bottleneck Lab",
  [
    lesson(
      "aa-tc-tradeoffs",
      "Пам'ять vs Час, пагінація vs повне завантаження, вимірювані покращення",
      "Time-Space Tradeoffs & Avoiding Premature Over-Engineering",
      4, false, [
        ({ ...mcq(
          "aa-tc1",
          "Сторінка ForgeBoard щоразу сортує та сканує $O(N^2)$ усі 10 000 задач клієнта, щоб знайти 10 прострочених + 5 блокуючих. Яка оптимізація виправдана?",
          "ForgeBoard scans all 10,000 items quadratically on every filter keystroke. Which improvement is clean and justified?",
          [
            "Замінити квадратичний пошук залежностей на одноразову побудову `Map`/індексу ($O(N)$) і перемістити важкі вибірки у серверний SQL з індексом",
            "Написати власний B-Tree у LocalStorage вручну",
            "Прибрати пошук з інтерфейсу назавжди",
            "Дублювати всі 10 000 об'єктів у 6 різних `useState`",
          ],
          0,
          why(
            "Індексування в пам'яті (`Map`) або на стороні БД (SQL індекс + ліміт) дає найбільший виграш із мінімальною складністю.",
            "In-memory indexing (`Map`) or indexed server-side SQL queries yield the biggest speedup with minimal complexity.",
          ),
        ), optionsEn: [
          "Replace the quadratic scan with a single O(N) `Map` index and push heavy filtering to indexed server SQL",
          "Hand-roll a custom B-Tree in LocalStorage",
          "Remove search from the UI permanently",
          "Duplicate all 10,000 items into 6 separate `useState` hooks",
        ] }),
        ({ ...mcq(
          "aa-tc2",
          "Коли кешування результату в `Map` може нашкодити більше, ніж допомогти?",
          "When can caching results in a `Map` hurt more than it helps?",
          [
            "Коли кеш росте необмежено без eviction (LRU/TTL) і призводить до витоку пам'яті (OOM)",
            "Коли ключ кешу є рядком",
            "Коли функція викликається більше одного разу",
            "Кеш у `Map` ніколи не споживає оперативну пам'ять",
          ],
          0,
          why(
            "Кожен кеш у довгоживучому процесі потребує обмеження розміру (LRU) або TTL, інакше пам'ять ростиме нескінченно.",
            "Every cache in a long-lived process needs a size bound (LRU) or TTL; otherwise memory grows without bound.",
          ),
        ), optionsEn: [
          "When the cache grows unbounded without eviction (LRU/TTL) and causes a memory leak (OOM)",
          "When the cache key is a string",
          "When the function is called more than once",
          "A `Map` cache never consumes RAM",
        ] }),
        codeFill(
          "aa-tc3",
          "Додайте обмеження сторінки у серверний запит, щоб не повертати всі 100 000 рядків одразу",
          "Add a page limit to a server query so it does not return 100,000 rows at once",
          "sql",
          "SELECT id, title FROM tasks WHERE project_id = $1 ORDER BY id DESC ___ 50;",
          ["LIMIT"],
          false,
          why(
            "`LIMIT` обмежує кількість рядків, що передаються мережею й серіалізуються у JSON.",
            "`LIMIT` bounds the number of rows transferred over the network and serialized to JSON.",
          ),
        ),
      ], { baseXp: 26 },
    ),
    lesson(
      "aa-forgeboard-perf-lab",
      "Лаб: усунення вузького місця в ForgeBoard та аргументація компромісу (M12)",
      "Lab: Optimizing a ForgeBoard Bottleneck & Tradeoff Writeup (M12)",
      4, false, [
        mcq(
          "aa-fb1",
          "У Milestone 12 ви отримуєте повільний модуль ForgeBoard (`matchTasksWithDependencies` або пошук з дублями) зі скриптом бенчмарку на ~10 000 записах. Який результат доводить успіх?",
          "In Milestone 12 you optimize a quadratic ForgeBoard bottleneck tested at ~10,000 items. What proves success?",
          [
            "Бенчмарк прискорюється на порядок (лінійний час замість квадратичного), поведінкові тести зберігають 100% точність і враховані цикли/дублікати, а компроміс по пам'яті пояснений",
            "Функція стала швидшою просто тому, що повертає порожній масив",
            "Зменшили набір тесту до 1 елемента",
            "Вимкнули перевірку циклів",
          ],
          0,
        ),
        codeProject(
          "aa-fb2",
          "Побудуйте індекс проєктів за id через Map — перший крок до поєднання за $O(N + M)$. Вбудована перевірка шукає фрагменти коду; M12 нижче перевіряє повне поєднання й продуктивність.",
          "Build a Map index of projects by id as the first step toward an $O(N + M)$ join. The in-app check searches for code fragments; M12 below tests the full join and performance.",
          [
            {
              id: "ts",
              name: "optimize-board.ts",
              language: "typescript",
              starter: `export function indexProjectsById<T extends { id: number }>(projects: T[]): Map<number, T> {\n  // TODO: index each project by id\n  throw new Error("not implemented");\n}\n`,
            },
          ],
          [
            { fileId: "ts", contains: ["new Map", "map.set"] },
          ],
          {
            hintUk: "Завантажте M12 нижче: скрипт автоматично порівняє час виконання на 10k записах і перевірить граничні кейси.",
            hintEn: "Download M12 below: tests benchmark 10k inputs and assert exact output parity + cycle safety.",
          },
        ),
      ], { baseXp: 45 },
    ),
    exam("aa-tc-exam", "Контрольна: прикладна алгоритміка", "Checkpoint: Applied Algorithms", 4, [
      ({ ...mcq(
        "aa-tc-e1",
        "Який головний принцип прикладного вибору структури даних?",
        "What guides practical data-structure selection in web engineering?",
        [
          "Виміряти реальний шаблон доступу (читання vs запис, $N$), обрати найпростішу структуру з потрібною асимптотикою (`Map`/`Set`/індекс БД) і зафіксувати тестом граничні випадки",
          "Завжди реалізувати найскладніший граф із підручника для списку з 3 елементів",
          "Ігнорувати пам'ять і складність до скарг у prod",
          "Уникати `Map` та SQL індексів",
        ],
        0,
        why(
          "Інженерний баланс: виміряти навантаження, обрати просту структуру з потрібним Big-O та покрити граничні випадки.",
          "Engineering balance: measure the workload, pick the simplest structure with the needed Big-O, and test edge cases.",
        ),
      ), optionsEn: [
        "Measure the real access pattern (reads vs writes, N), pick the simplest structure with the needed complexity (`Map`/`Set`/DB index), and test edge cases",
        "Always implement the most complex textbook graph for a 3-item list",
        "Ignore memory and complexity until production breaks",
        "Avoid `Map` and SQL indexes",
      ] }),
      ({ ...mcq(
        "aa-tc-e2",
        "Коли варто перенести фільтрацію/сортування 50 000 записів із браузера на сервер?",
        "When should filtering/sorting 50,000 records move from the browser to the server?",
        [
          "Коли повне завантаження на клієнт гальмує мережу/пам'ять, а серверна БД може використати індекс + курсорну пагінацію",
          "Ніколи — браузер завжди швидший за PostgreSQL з індексом",
          "Лише якщо у записів немає `id`",
          "Щоб вимкнути авторизацію на API",
        ],
        0,
        why(
          "Серверна пагінація з індексами передає клієнту лише потрібну сторінку (20–50 рядків) замість десятків мегабайтів.",
          "Server-side indexed pagination sends only the requested page (20–50 rows) instead of tens of megabytes.",
        ),
      ), optionsEn: [
        "When shipping all rows to the client hurts network/memory, and the server DB can use an index + cursor pagination",
        "Never — the browser is always faster than indexed PostgreSQL",
        "Only when rows have no `id`",
        "To disable API authorization",
      ] }),
      ({ ...mcq(
        "aa-tc-e3",
        "Який ризик у пагінації `OFFSET 100000 LIMIT 20` порівняно з keyset/cursor пагінацією `WHERE id < $cursor LIMIT 20`?",
        "What is the risk of `OFFSET 100000 LIMIT 20` compared to keyset/cursor pagination `WHERE id < $cursor LIMIT 20`?",
        [
          "БД все одно сканує й відкидає 100 000 рядків перед поверненням 20 (деградація на глибоких сторінках)",
          "`OFFSET` заборонений у стандарті SQL",
          "`LIMIT 20` ігнорується при наявності `OFFSET`",
          "Keyset-пагінація не працює з індексами",
        ],
        0,
        why(
          "Keyset-пагінація стрибає одразу до потрібного місця за B-tree індексом за O(log N) незалежно від глибини.",
          "Keyset pagination jumps straight to the cursor via the B-tree index in O(log N) regardless of page depth.",
        ),
      ), optionsEn: [
        "The DB still scans and discards 100,000 rows before returning 20, degrading on deep pages",
        "`OFFSET` is forbidden by the SQL standard",
        "`LIMIT 20` is ignored whenever `OFFSET` is present",
        "Keyset pagination cannot use indexes",
      ] }),
      codeFill(
        "aa-tc-e4",
        "Заповніть пропуск для побудови індексу `Map` по полю `id`",
        "Fill in the blank to index items into a `Map` by `id`",
        "ts",
        "const byId = new Map<number, Task>();\nfor (const item of items) byId.___(item.id, item);",
        ["set"],
        true,
        why(
          "`map.set(key, value)` додає або оновлює запис у `Map` за O(1).",
          "`map.set(key, value)` inserts or updates an entry in `Map` in O(1).",
        ),
      ),
    ]),
  ],
);

export const appliedAlgorithmsContent: CourseContent = {
  slug: "applied_algorithms",
  titleUk: "Прикладні алгоритми та структури даних",
  titleEn: "Applied Algorithms & Data Structures",
  descriptionUk:
    "Складність і профілювання реальних запитів, Map/Set проти O(N²), стеки та обмежені черги, стабільне сортування, обхід дерев із циклами й оптимізація ForgeBoard.",
  descriptionEn:
    "Complexity profiling in web apps, Map/Set indexing vs O(N²), undo stacks and bounded queues, deterministic sorting, cycle-safe tree traversal, and ForgeBoard bottleneck lab.",
  icon: "🧮",
  color: "#0284C7",
  units: [
    complexityProfiling,
    mapsSetsDedup,
    stacksQueues,
    searchSort,
    treesTraversal,
    tradeoffsCapstone,
  ],
};
