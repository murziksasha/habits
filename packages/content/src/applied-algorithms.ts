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
      mcq(
        "aa-ms-e1",
        "Потрібно зберегти унікальні теги задачі у порядку додавання і перевіряти наявність за $O(1)$. Що обрати?",
        "Need deduplicated items preserving insertion order with O(1) `.has()`. Best structure?",
        ["Set<string>", "Несортований масив + indexOf", "Зв'язний список з лінійним пошуком", "Рядок з комами"],
        0,
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
      mcq(
        "aa-sq-e1",
        "Що означає обмежена черга / concurrency limit (`maxConcurrent = 4`) при запуску 200 запитів або job-ів?",
        "Why enforce bounded concurrency + queue backpressure instead of `Promise.all(200_items)`?",
        [
          "Запобігає вичерпанню пам'яті, сокетів та пулу БД (5-10 одночасних задач замість шторму на 200)",
          "Робить код синхронним у циклі while(true)",
          "Видаляє зайві задачі без виконання",
          "Забороняє використання Promise",
        ],
        0,
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
      ),
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
      mcq(
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
        mcq(
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
          "Перепишіть $O(N^2)$ поєднання задач із проєктами на $O(N + M)$ через `Map`; завантажте M12 нижче для вимірювання бенчмарку, циклів і тестів.",
          "Replace $O(N^2)$ nested `.find()` join with an $O(N + M)$ `Map` index; download Milestone 12 below to measure speedup and cycle handling locally.",
          [
            {
              id: "ts",
              name: "optimize-board.ts",
              language: "typescript",
              starter: `export function indexProjectsById<T extends { id: number }>(projects: T[]): Map<number, T> {\n  const map = new Map<number, T>();\n  for (const p of projects) map.set(p.id, p);\n  return map;\n}\n`,
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
      mcq(
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
