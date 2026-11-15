import type { CourseContent, LessonContent, UnitContent } from "../types.js";
import { expandCourse, sectionUnit, teachLesson } from "./factory.js";

export const newUnits: UnitContent[] = [
  sectionUnit(
    "aa_hashing_bloom",
    "Хешування, Bloom-фільтр і коли помилка допустима",
    "Hashing, Bloom filters, and when an error is acceptable",
    [
      {
        slug: "aa-hash-uniform",
        titleUk: "Хороший хеш рівномірний; поганий збирає колізії в один кошик",
        titleEn: "A good hash is uniform; a bad one piles collisions into one bucket",
        difficulty: 3,
        pointsUk: ["Рівномірність і захист від колізійних атак", "equals узгоджений із hash", "Не плутати швидкий хеш і криптографічний"],
        pointsEn: ["Uniformity and protection against collision attacks", "equals agrees with hash", "Do not confuse a fast hash with a cryptographic one"],
        conceptUk: "Хеш-таблиця дає очікуване O(1), лише якщо ключі розкидані по кошиках. Слабкий хеш (лише перший символ рядка) або атака на передбачуваний хеш збирають багато ключів разом — деградація до списку. Для даних від користувача в мовах, де хеш можна атакувати, використовують рандомізований seed процесу. Рівність ключів має узгоджуватись із хешем: якщо a.equals(b), хеші рівні. Для розподілених систем окремо обирають стабільний алгоритм (не від режиму відладки). Не використовуйте криптографічний хеш там, де потрібна лише швидка таблиця — це зайва вартість, і навпаки: паролі не кладуть у murmur.",
        conceptEn: "A hash table is expected O(1) only if keys are spread across buckets. A weak hash (only the first character of a string) or an attack on a predictable hash piles many keys together — a degradation to a list. For user-supplied data in languages where the hash can be attacked, you use a per-process randomized seed. Key equality must agree with the hash: if a.equals(b), the hashes are equal. For distributed systems you separately pick a stable algorithm (not a debug-mode one). Do not use a cryptographic hash where you only need a fast table — that is extra cost, and the opposite: passwords do not go into murmur.",
        code: "// hash must spread keys; equals => same hash\n// sessions: randomized-seed table hash; passwords: argon2, not murmur",
        language: "java",
        retrieval: [
          { kind: "mcq", promptUk: "Що станеться з таблицею, якщо хеш рядка — лише s[0], а всі ключі починаються з 'u'?", promptEn: "What happens to a table if a string's hash is only s[0] and every key starts with 'u'?", options: ["усі потраплять в один кошик, операції стануть лінійними", "це ідеальна рівномірність", "O(1) гарантовано алгоритмом мови", "equals тоді не потрібен"], correctIndex: 0, explanationUk: "Хеш має розкидати ключі.", explanationEn: "The hash must spread keys." },
          { kind: "fill", promptUk: "Допишіть інваріант узгодженості", promptEn: "Fill in the consistency invariant", language: "java", code: "// if a.equals(b) then a.hashCode() == b.___()", accepted: ["hashCode"], caseSensitive: true, explanationUk: "Рівні об'єкти — рівні хеші.", explanationEn: "Equal objects, equal hashes." },
          { kind: "read", promptUk: "Чи підходить murmurhash для зберігання паролів?", promptEn: "Is murmurhash suitable for storing passwords?", language: "python", code: "store(murmur(password))", options: ["ні: потрібна повільна адаптивна функція (argon2/bcrypt), не швидкий табличний хеш", "так, murmur криптографічно стійкий", "так, якщо seed випадковий", "так, для O(1) логіну"], correctIndex: 0, explanationUk: "Різні задачі — різні хеші.", explanationEn: "Different jobs, different hashes." }
        ],
        whyUk: "Як обрати хеш для таблиці сесій і чому його не використати для паролів?",
        whyEn: "How do you choose a hash for a session table, and why would you not use it for passwords?",
        ideas: [{ labelUk: "рівномірність", labelEn: "uniformity", anyOf: ["рівномір", "uniform", "коліз", "collision", "кошик", "bucket"] }, { labelUk: "узгоджений equals", labelEn: "consistent equals", anyOf: ["equals", "hashcode", "інваріант", "invariant"] }, { labelUk: "не для паролів", labelEn: "not for passwords", anyOf: ["парол", "password", "argon", "murmur", "крипто", "crypto"] }],
        sampleUk: "Для таблиці беруть рівномірний швидкий хеш із захистом від атак і узгодженим equals; паролі хешують окремою повільною функцією, а слабкий хеш по першій літері збирає всі ключі в один кошик.",
        sampleEn: "For a table you take a uniform fast hash with attack protection and a consistent equals; passwords are hashed with a separate slow function, and a weak first-letter hash piles every key into one bucket.",
      },
      {
        slug: "aa-bloom-maybe",
        titleUk: "Bloom-фільтр каже 'точно немає' або 'може є' — ніколи 'точно є'",
        titleEn: "A Bloom filter says 'definitely not' or 'maybe yes' — never 'definitely yes'",
        difficulty: 3,
        pointsUk: ["'Ні' — точне, 'так' — ймовірне", "Відсів перед дорогим запитом", "Не єдине джерело правди для критичних рішень"],
        pointsEn: ["'No' is exact, 'yes' is probable", "A filter before an expensive query", "Not the only source of truth for critical decisions"],
        conceptUk: "Bloom-фільтр — бітовий масив і кілька хешів: вставка виставляє біти, перевірка каже 'немає', якщо якийсь біт нуль, або 'можливо є', якщо всі одиниці (хибне спрацювання). Хибних відмов 'немає, а насправді є' після вставки немає. Це економить пам'ять, коли треба відсіяти завідомо відсутні ключі (кеш, 'чи бачили URL') перед дорогим запитом. Розмір і кількість хешів обирають під допустиму частку хибних 'так' (наприклад 1%). Видалення звичайний Bloom не вміє (для цього counting або ротація). Не використовуйте його як єдине джерело правди для грошей чи прав доступу.",
        conceptEn: "A Bloom filter is a bit array and several hashes: an insert sets bits, a check says 'no' if some bit is zero, or 'maybe yes' if all are one (a false positive). There are no false negatives 'no, but it was actually inserted'. That saves memory when you want to reject keys that are definitely absent (a cache, 'have we seen this URL') before an expensive query. Size and the number of hashes are chosen for an acceptable false-yes rate (for example 1%). A normal Bloom cannot delete (for that, a counting filter or rotation). Do not use it as the only source of truth for money or access rights.",
        code: "if not bloom.maybe(key):\n    return None  # definitely absent\nreturn db.get(key)  # confirm; do not pay on bloom alone",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Bloom сказав 'можливо є'. Що робити далі для кешу сторінок?", promptEn: "The Bloom said 'maybe yes'. What do you do next for a page cache?", options: ["перевірити справжнє сховище: це може бути хибне спрацювання", "вважати факт доведеним і більше не ходити в БД ніколи", "видалити ключ з Bloom", "збільшити хибні відмови"], correctIndex: 0, explanationUk: "Bloom не підтверджує наявність.", explanationEn: "A Bloom does not confirm presence." },
          { kind: "fill", promptUk: "Допишіть, чого Bloom не дає після вставки", promptEn: "Fill in what a Bloom does not produce after an insert", language: "python", code: "# false ____ rate = 0  (never 'absent' if inserted)", accepted: ["negative", "negatives"], caseSensitive: true, explanationUk: "Немає хибних відмов (false negatives).", explanationEn: "There are no false negatives." },
          { kind: "read", promptUk: "Чи можна дозволити виплату, якщо лише Bloom каже, що рахунок існує?", promptEn: "May you authorize a payout if only a Bloom says the account exists?", language: "python", code: "if bloom.maybe(account): pay()", options: ["ні: 'можливо є' не достатньо для грошей; потрібне точне сховище", "так, Bloom точний для 'є'", "так, якщо 1% помилки прийнятний для виплат", "так, після видалення з Bloom"], correctIndex: 0, explanationUk: "Критичне рішення — точне джерело.", explanationEn: "A critical decision needs an exact source." }
        ],
        whyUk: "Коли Bloom-фільтр корисний перед запитом у базу, і коли його не можна питати?",
        whyEn: "When is a Bloom filter useful before a database query, and when must you not ask it?",
        ideas: [{ labelUk: "точне ні", labelEn: "an exact no", anyOf: ["немає", "definitely not", "false negative", "біт", "bit"] }, { labelUk: "ймовірне так", labelEn: "a maybe yes", anyOf: ["можливо", "maybe", "хибн", "false positive", "сховищ", "store"] }, { labelUk: "не для грошей", labelEn: "not for money", anyOf: ["виплат", "payout", "грош", "money", "правд", "truth", "прав", "rights"] }],
        sampleUk: "Bloom ставлять, щоб відсіяти точну відсутність перед дорогим запитом; відповідь 'можливо є' перевіряють у сховищі, хибних 'немає' після вставки немає, для виплат і прав його самого недостатньо.",
        sampleEn: "You put a Bloom to reject definite absence before an expensive query; a 'maybe yes' is checked in the store, there are no false 'no's after an insert, and for payouts and rights it is not enough by itself.",
      },
      {
        slug: "aa-consistent-hash",
        titleUk: "Consistent hashing: додавання вузла не перекладає весь кеш",
        titleEn: "Consistent hashing: adding a node does not reshuffle the whole cache",
        difficulty: 3,
        pointsUk: ["% N при зміні N перекладає майже все", "Кільце рухає близько 1/N ключів", "Віртуальні вузли й окремий план переносу байтів"],
        pointsEn: ["% N reshuffles almost everything when N changes", "The ring moves about 1/N of the keys", "Virtual nodes and a separate plan to move bytes"],
        conceptUk: "Звичайний `hash(key) % N` при зміні N перекладає майже всі ключі — кеш 'холодний', дані їдуть не на той шард. Consistent hashing розкладає вузли на кільце, ключ йде до наступного вузла за годинниковою стрілкою: при додаванні/виході переїздить лише сусідній сектор, очікувано близько 1/N ключів. Віртуальні вузли вирівнюють навантаження, якщо фізичні машини різної сили. Реальне переміщення даних планують (стримінг), не вважають, що кільце саме скопіює байти. Для жорсткої рівності часток інколи беруть інші схеми (rendezvous / MAGLEV) — важливо розуміти вартість ребалансу.",
        conceptEn: "A plain `hash(key) % N` reshuffles almost every key when N changes — the cache goes 'cold', data goes to the wrong shard. Consistent hashing places nodes on a ring, a key goes to the next node clockwise: on add/remove only a neighbouring sector moves, expected about 1/N of the keys. Virtual nodes even out the load if physical machines differ in power. The actual data move is planned (a stream); you do not assume the ring copies the bytes by itself. For strict equal shares, other schemes are sometimes used (rendezvous / MAGLEV) — what matters is understanding the cost of a rebalance.",
        code: "# avoid hash(key) % N when N changes\n# ring: key → next clockwise node; ~1/N keys move; then stream bytes",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому hash % 4 після переходу на 5 вузлів 'обнуляє' кеш?", promptEn: "Why does hash % 4 after moving to 5 nodes 'wipe' the cache?", options: ["майже кожен ключ отримує інший залишок і йде на інший вузол", "% завжди зберігає вузол", "consistent hashing так само % N", "1/N тоді дорівнює всім ключам"], correctIndex: 0, explanationUk: "Модуль нестабільний до зміни N.", explanationEn: "Modulo is unstable when N changes." },
          { kind: "fill", promptUk: "Допишіть оцінку частки ключів, що переїдуть при додаванні вузла", promptEn: "Fill in the estimate of the key fraction that moves when a node is added", language: "text", code: "expected moves ≈ 1/___   (N = new node count)", accepted: ["N", "n"], caseSensitive: true, explanationUk: "Близько 1/N, не майже всі.", explanationEn: "About 1/N, not almost all." },
          { kind: "read", promptUk: "Чи достатньо оновити кільце, щоб дані вже лежали на новому вузлі?", promptEn: "Is updating the ring enough for the data to already sit on the new node?", language: "python", code: "ring.add(node5)  # bytes?", options: ["ні: треба спланувати копіювання/стрімінг даних, кільце лише карта ключів", "так, кільце саме копіює байти", "так, якщо є віртуальні вузли", "так, якщо було % N"], correctIndex: 0, explanationUk: "Карта й перенос — різні кроки.", explanationEn: "The map and the move are different steps." }
        ],
        whyUk: "Як додати п'ятий вузол кешу, не викинувши майже всі потрапляння чотирьох?",
        whyEn: "How do you add a fifth cache node without throwing away almost every hit of the four?",
        ideas: [{ labelUk: "не % N", labelEn: "not % N", anyOf: ["%", "модуль", "modulo", "cold", "переклад", "reshuffl"] }, { labelUk: "кільце 1/N", labelEn: "a ring and 1/N", anyOf: ["кільце", "ring", "1/n", "consistent"] }, { labelUk: "віртуальні вузли й перенос", labelEn: "virtual nodes and a move", anyOf: ["віртуал", "virtual", "байт", "byte", "стрім", "stream"] }],
        sampleUk: "Замість hash % N ставлять consistent hashing на кільці, щоб при додаванні вузла переїхала близько 1/N ключів, вирівнюють навантаження віртуальними вузлами й окремо планують копіювання даних.",
        sampleEn: "Instead of hash % N you use consistent hashing on a ring so that adding a node moves about 1/N of the keys, you even the load with virtual nodes, and you separately plan copying the data.",
      }
    ],
    "Контрольна: хеші й фільтри",
    "Exam: hashes and filters",
    [
      { promptUk: "Хеш лише по першій літері…", promptEn: "A hash on only the first letter…", options: ["збирає колізії в один кошик", "гарантує O(1)", "замінює equals", "підходить для паролів"], correctIndex: 0, explanationUk: "Потрібна рівномірність.", explanationEn: "Uniformity is needed." },
      { promptUk: "equals істинний, а hashCode різний…", promptEn: "equals is true but hashCode differs…", options: ["порушений інваріант, таблиця зламається", "допустимо для сесій", "потрібно для murmur", "захист від атак"], correctIndex: 0, explanationUk: "Рівні об'єкти — рівні хеші.", explanationEn: "Equal objects, equal hashes." },
      { promptUk: "Murmur для паролів…", promptEn: "Murmur for passwords is…", options: ["непідходящий; беріть argon2/bcrypt", "ідеальний", "криптографічно достатній", "повільніший за argon2 завжди"], correctIndex: 0, explanationUk: "Інший клас функції.", explanationEn: "A different class of function." },
      { promptUk: "Bloom 'можливо є' означає…", promptEn: "A Bloom 'maybe yes' means…", options: ["треба перевірити точне сховище", "факт доведений", "хибну відмову", "дозвіл на виплату"], correctIndex: 0, explanationUk: "'Так' ймовірне.", explanationEn: "'Yes' is probable." },
      { promptUk: "False negatives у класичного Bloom після вставки…", promptEn: "False negatives in a classical Bloom after an insert are…", options: ["немає", "рівні 1% завжди", "частіші за false positives", "причина для виплат"], correctIndex: 0, explanationUk: "'Немає' точне.", explanationEn: "'No' is exact." },
      { promptUk: "hash % N при зміні N…", promptEn: "hash % N when N changes…", options: ["перекладає майже всі ключі", "рухає лише 1/N", "копіює байти сам", "замінює кільце завжди краще"], correctIndex: 0, explanationUk: "Беріть consistent hashing.", explanationEn: "Use consistent hashing." }
    ],
  ),
  sectionUnit(
    "aa_heaps_graphs",
    "Купи, черги з пріоритетом і графи",
    "Heaps, priority queues, and graphs",
    [
      {
        slug: "aa-heap-top",
        titleUk: "Купа: швидко дістати мінімум, не повне сортування щоразу",
        titleEn: "A heap: get the minimum quickly, not a full sort every time",
        difficulty: 3,
        pointsUk: ["O(1) peek, O(log n) insert/pop", "Топ-k і планувальник без повного сортування", "Зміна пріоритету — окрема операція"],
        pointsEn: ["O(1) peek, O(log n) insert/pop", "Top-k and a scheduler without a full sort", "A priority change is a separate operation"],
        conceptUk: "Двійкова купа дає O(1) на перегляд мінімуму (або максимуму) і O(log n) на вставку й видалення кореня — зручно для 'топ-k', планувальника задач, Dijkstra. Повне сортування масиву щоразу, коли прийшла одна нова подія, дорожче. У багатьох мовах це `PriorityQueue` / `heapq`. Стійкість однакових пріоритетів не гарантована без додаткового лічильника. Зміна пріоритету вже вставленого елемента часто потребує decrease-key або 'лінивого' видалення (вставити нову копію, стару ігнорувати). Не плутайте купу з відсортованим списком: у середині купи порядок не повний.",
        conceptEn: "A binary heap gives O(1) to peek at the minimum (or maximum) and O(log n) to insert and to remove the root — convenient for 'top-k', a task scheduler, Dijkstra. Fully sorting the array every time one new event arrives is more expensive. In many languages this is `PriorityQueue` / `heapq`. Stability of equal priorities is not guaranteed without an extra counter. Changing the priority of an already inserted element often needs decrease-key or 'lazy' deletion (insert a new copy, ignore the old). Do not confuse a heap with a sorted list: in the middle of a heap the order is not total.",
        code: "heapq.heappush(q, (time, seq, task))\n# pop min; if stale copy — skip; seq breaks ties",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому sort() після кожної нової задачі гірший за купу в планувальнику на тисячах задач?", promptEn: "Why is sort() after every new task worse than a heap in a scheduler of thousands of tasks?", options: ["повне сортування дорожче за O(log n) вставку в купу", "sort завжди O(1)", "купа вимагає повний порядок у середині", "PriorityQueue забороняє планувальники"], correctIndex: 0, explanationUk: "Амортизація на одну подію.", explanationEn: "Amortization on one event." },
          { kind: "fill", promptUk: "Допишіть структуру для 'наступна задача з найменшим часом'", promptEn: "Fill in the structure for 'the next task with the smallest time'", language: "python", code: "import heapq\nq = []  # ___ queue: heapq.heappush(q, (time, task))", accepted: ["priority", "heap"], caseSensitive: true, explanationUk: "Черга з пріоритетом на купі.", explanationEn: "A priority queue on a heap." },
          { kind: "read", promptUk: "Як оновити пріоритет уже вставленої задачі, якщо немає decrease-key?", promptEn: "How do you update the priority of an already inserted task if there is no decrease-key?", language: "python", code: "heapq.heappush(q, (new_time, task))  # old entry stays", options: ["вставити нову копію й ігнорувати застарілу при вийманні (ліниве видалення)", "змінити середину купи як масив навмання", "відсортувати весь список", "заборонити оновлення"], correctIndex: 0, explanationUk: "Ліниве оновлення — звичайний прийом.", explanationEn: "Lazy update is a common trick." }
        ],
        whyUk: "Як тримати розклад 'наступна задача' при постійному потоці нових подій?",
        whyEn: "How do you keep a 'next task' schedule under a constant stream of new events?",
        ideas: [{ labelUk: "купа / priority queue", labelEn: "a heap / priority queue", anyOf: ["куп", "heap", "priority", "лог", "log"] }, { labelUk: "не повний sort", labelEn: "not a full sort", anyOf: ["sort", "сортуван", "тисяч", "thousand"] }, { labelUk: "ліниве оновлення", labelEn: "lazy update", anyOf: ["decrease", "лінив", "lazy", "копі", "copy", "стійк", "stabil"] }],
        sampleUk: "Тримають купу (priority queue): нова задача — O(log n), наступна — з кореня; не сортують увесь список на кожну подію, пріоритет оновлюють decrease-key або лінивою копією.",
        sampleEn: "You keep a heap (a priority queue): a new task is O(log n), the next one comes from the root; you do not sort the whole list on every event, and you update a priority with decrease-key or a lazy copy.",
      },
      {
        slug: "aa-bfs-shortest",
        titleUk: "BFS на незваженому графі знаходить найкоротший шлях у ребрах",
        titleEn: "BFS on an unweighted graph finds the shortest path in edges",
        difficulty: 3,
        pointsUk: ["BFS = найкоротший шлях у кількості ребер", "З вагами — не BFS, а Dijkstra", "seen і предки, увага до пам'яті черги"],
        pointsEn: ["BFS is the shortest path in edge count", "With weights — not BFS, but Dijkstra", "seen and parents, care for queue memory"],
        conceptUk: "Пошук у ширину (черга) від старту відвідує вершини шар за шаром: перший раз, коли ви дійшли до цілі — це мінімальна кількість ребер. Підходить для 'найменше кліків', сітки без ваг, досяжності. Якщо ребра мають різну вагу — BFS невірний, беріть Dijkstra (купа) або інший алгоритм. Відвідуваність (`seen`) обов'язкова, інакше цикл. Зберігайте предка, щоб відновити шлях. На орієнтованому графі враховуйте напрямок. Пам'ять черги може бути великою на широких шарах — це обмеження, не 'BFS завжди дешевий'.",
        conceptEn: "Breadth-first search (a queue) from the start visits vertices layer by layer: the first time you reach the goal is the minimum number of edges. It fits 'fewest clicks', an unweighted grid, reachability. If edges have different weights — BFS is wrong, use Dijkstra (a heap) or another algorithm. A `seen` set is mandatory, or you loop. Store the parent to reconstruct the path. On a directed graph, respect direction. Queue memory can be large on wide layers — that is a limit, not 'BFS is always cheap'.",
        code: "q = deque([start]); seen={start}; parent={}\n# first time we reach goal = fewest edges; if weighted: use Dijkstra",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому BFS не знайде найдешевший переліт, якщо квитки різної ціни?", promptEn: "Why will BFS not find the cheapest flight if tickets have different prices?", options: ["BFS мінімізує кількість ребер, не суму ваг; потрібен Dijkstra або подібний", "BFS завжди враховує ціну", "seen тоді заборонений", "черга сама сортує за ціною"], correctIndex: 0, explanationUk: "Ваги — інший алгоритм.", explanationEn: "Weights need another algorithm." },
          { kind: "fill", promptUk: "Допишіть структуру обходу в ширину", promptEn: "Fill in the structure of a breadth-first traversal", language: "python", code: "from collections import deque\nq = ___([start]); seen = {start}", accepted: ["deque"], caseSensitive: true, explanationUk: "Черга deque.", explanationEn: "A deque queue." },
          { kind: "read", promptUk: "Що буде без множини seen на графі з циклом?", promptEn: "What happens without a seen set on a graph with a cycle?", language: "python", code: "q.append(n)  # never mark seen", options: ["обхід може не завершитись, вершини відвідують знову", "BFS тоді швидший", "шлях завжди коротший", "Dijkstra увімкнеться сам"], correctIndex: 0, explanationUk: "Позначайте відвідане.", explanationEn: "Mark what was visited." }
        ],
        whyUk: "Коли обрати BFS для маршруту в додатку, а коли купу з вагами?",
        whyEn: "When do you choose BFS for a route in an app, and when a heap with weights?",
        ideas: [{ labelUk: "BFS для незваженого", labelEn: "BFS for the unweighted", anyOf: ["bfs", "ребер", "edges", "шар", "layer", "клік", "click"] }, { labelUk: "Dijkstra для ваг", labelEn: "Dijkstra for weights", anyOf: ["dijkstra", "ваг", "weight", "куп", "heap", "цін", "price"] }, { labelUk: "seen і шлях", labelEn: "seen and the path", anyOf: ["seen", "предк", "parent", "цикл", "cycle", "черга", "queue"] }],
        sampleUk: "Для мінімальної кількості кроків без ваг беруть BFS із чергою, seen і предками; для різних ваг — Dijkstra на купі; без seen цикл не закінчиться, BFS не мінімізує суму цін.",
        sampleEn: "For a minimum number of unweighted steps you take BFS with a queue, seen, and parents; for different weights — Dijkstra on a heap; without seen a cycle never ends, and BFS does not minimise a sum of prices.",
      },
      {
        slug: "aa-dijkstra-pitfall",
        titleUk: "Dijkstra: невід'ємні ваги, купа, і коли алгоритм бреше",
        titleEn: "Dijkstra: non-negative weights, a heap, and when the algorithm lies",
        difficulty: 3,
        pointsUk: ["Невід'ємні ваги — умова правильності", "Купа й ліниві застарілі записи", "Масштаб і SLO: інколи A* або інший алгоритм"],
        pointsEn: ["Non-negative weights are the correctness condition", "A heap and lazy stale entries", "Scale and SLO: sometimes A* or another algorithm"],
        conceptUk: "Dijkstra жадібно знімає вершину з найменшим відомим шляхом. Це правильно, лише якщо ваги невід'ємні: від'ємне ребро ламає жадібність (тоді Bellman-Ford або інший підхід). Реалізація з купою — O((V+E) log V). Застарілі записи в купі (ліниве оновлення) пропускають при вийманні. Не запускайте Dijkstra з кожної вершини 'на око', якщо потрібні всі пари — є інші алгоритми. Нескінченність на старті, акуратне порівняння. На графі з мільйонами ребер дивіться, чи вміщається в час SLO, і чи можна звузити (A* з евристикою, обмеження горизонту).",
        conceptEn: "Dijkstra greedily pops the vertex with the smallest known path. That is correct only if weights are non-negative: a negative edge breaks greed (then Bellman-Ford or another approach). A heap implementation is O((V+E) log V). Stale heap entries (lazy updates) are skipped when popped. Do not run Dijkstra from every vertex 'by eye' if you need all pairs — there are other algorithms. Infinity at the start, careful comparison. On a graph with millions of edges, check whether it fits the SLO, and whether you can narrow it (A* with a heuristic, a horizon limit).",
        code: "if w < 0: use_bellman_ford()\n# Dijkstra: heap of (dist, v); skip stale (d > dist[v])",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому Dijkstra може дати неправильний шлях, якщо є ребро ваги -5?", promptEn: "Why can Dijkstra give a wrong path if there is an edge of weight -5?", options: ["жадібне зняття мінімуму більше не остаточне: від'ємне ребро може покращити вже закриту вершину", "від'ємні ваги завжди коротші за нуль і ігноруються правильно", "купа забороняє від'ємні числа в мові", "Bellman-Ford тоді повільніший і тому гірший завжди"], correctIndex: 0, explanationUk: "Умова невід'ємності.", explanationEn: "The non-negativity condition." },
          { kind: "fill", promptUk: "Допишіть умову ваг для Dijkstra", promptEn: "Fill in the weight condition for Dijkstra", language: "text", code: "Dijkstra requires ___-negative edge weights", accepted: ["non", "non-negative"], caseSensitive: true, explanationUk: "Невід'ємні ваги.", explanationEn: "Non-negative weights." },
          { kind: "read", promptUk: "Як обробити старий запис (вузол, 10) у купі, якщо вже відомий шлях 4?", promptEn: "How do you handle an old heap entry (node, 10) if a path of 4 is already known?", language: "python", code: "dist[node] = 4\n# heap still has (10, node)", options: ["при вийманні пропустити, якщо 10 > dist[node] (ліниве видалення)", "обов'язково зламати купу вручну", "перезапустити BFS", "вважати 10 кращим"], correctIndex: 0, explanationUk: "Лінивий запис пропускають.", explanationEn: "A lazy entry is skipped." }
        ],
        whyUk: "Коли Dijkstra підходить для маршруту доставки, і що ламає його правильність?",
        whyEn: "When is Dijkstra suitable for a delivery route, and what breaks its correctness?",
        ideas: [{ labelUk: "невід'ємні ваги", labelEn: "non-negative weights", anyOf: ["невід", "non-negative", "від'ємн", "negative", "жадібн", "greed"] }, { labelUk: "купа", labelEn: "a heap", anyOf: ["куп", "heap", "log", "лінив", "lazy"] }, { labelUk: "масштаб / A*", labelEn: "scale / A*", anyOf: ["slo", "мільйон", "million", "a*", "bellman"] }],
        sampleUk: "Dijkstra з купою правильний на невід'ємних вагах, застарілі записи в купі пропускають, від'ємне ребро ламає жадібність (Bellman-Ford), на великому графі дивляться SLO й інколи A*.",
        sampleEn: "Dijkstra with a heap is correct on non-negative weights, stale heap entries are skipped, a negative edge breaks greed (Bellman-Ford), and on a large graph you watch the SLO and sometimes use A*.",
      }
    ],
    "Контрольна: купи й графи",
    "Exam: heaps and graphs",
    [
      { promptUk: "Купа дає peek мінімуму за…", promptEn: "A heap gives a peek of the minimum in…", options: ["O(1), вставку за O(log n)", "O(n) завжди", "O(1) вставку й видалення кореня", "час повного sort"], correctIndex: 0, explanationUk: "Саме для потоку подій.", explanationEn: "Exactly for a stream of events." },
      { promptUk: "Повний sort на кожну нову задачу…", promptEn: "A full sort on every new task is…", options: ["дорожчий за купу", "завжди кращий", "O(1)", "заміна decrease-key"], correctIndex: 0, explanationUk: "Амортизація на подію.", explanationEn: "Amortization per event." },
      { promptUk: "BFS мінімізує…", promptEn: "BFS minimises…", options: ["кількість ребер, не суму ваг", "суму цін квитків", "пам'ять завжди до O(1)", "від'ємні цикли"], correctIndex: 0, explanationUk: "Незважений шлях.", explanationEn: "An unweighted path." },
      { promptUk: "Без seen на графі з циклом BFS…", promptEn: "Without seen on a graph with a cycle, BFS can…", options: ["не завершитись", "стати Dijkstra", "гарантувати короткий шлях", "зменшити чергу"], correctIndex: 0, explanationUk: "Позначайте відвідане.", explanationEn: "Mark the visited." },
      { promptUk: "Від'ємна вага в Dijkstra…", promptEn: "A negative weight in Dijkstra…", options: ["може дати неправильний шлях", "завжди безпечна", "прискорює жадібність", "замінює Bellman-Ford як умова"], correctIndex: 0, explanationUk: "Невід'ємні ваги — умова.", explanationEn: "Non-negative weights are the condition." },
      { promptUk: "Застарілий запис у купі Dijkstra…", promptEn: "A stale entry in Dijkstra's heap is…", options: ["пропускають, якщо d > dist[v]", "завжди кращий за новий", "ламає seen у BFS", "обов'язковий decrease-key у Python heapq"], correctIndex: 0, explanationUk: "Ліниве видалення.", explanationEn: "Lazy deletion." }
    ],
  ),
  sectionUnit(
    "aa_lru_ratelimit",
    "Кеш LRU і обмеження частоти",
    "An LRU cache and rate limiting",
    [
      {
        slug: "aa-lru-recency",
        titleUk: "LRU: витісняють те, до чого найдовше не звертались",
        titleEn: "LRU: evict what has not been touched for the longest time",
        difficulty: 3,
        pointsUk: ["Словник + список, O(1) hit/evict", "Hit rate міряють; інвалідація при зміні сенсу", "Гонки й 'рідко-дорого' — інші політики"],
        pointsEn: ["A map + a list, O(1) hit/evict", "Hit rate is measured; invalidation when meaning changes", "Races and 'rare-expensive' need other policies"],
        conceptUk: "Кеш фіксованого розміру потребує політики витіснення. LRU (least recently used) тримає елементи в порядку давності: попадання пересуває в 'свіжі', при переповненні видаляють найстаріший. Реалізація — словник плюс двозв'язний список, операції O(1). Це не ідеально для 'рідко, але дорого' (тоді LFU або ручний TTL). Thread-safety: звичайний LinkedHashMap не витримує гонки без блокування або Concurrent-структури. Міряйте hit rate на реальному трафіку. Після зміни ключа (нова версія об'єкта) старий запис треба інвалідувати, не чекати витіснення.",
        conceptEn: "A fixed-size cache needs an eviction policy. LRU (least recently used) keeps items in recency order: a hit moves to 'fresh', on overflow the oldest is removed. The implementation is a map plus a doubly linked list, operations are O(1). It is not ideal for 'rare but expensive' (then LFU or a manual TTL). Thread-safety: a plain LinkedHashMap does not survive races without a lock or a Concurrent structure. Measure hit rate on real traffic. After a key's meaning changes (a new object version), the old entry must be invalidated, not left until eviction.",
        code: "cache = LRU(1024)\n# on price update: cache.invalidate(product_id)\n# metric: hit_rate; concurrent-safe implementation",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чому після оновлення ціни товару запис LRU з старою ціною небезпечний?", promptEn: "Why is an LRU entry with an old price dangerous after a product price update?", options: ["політика витіснення не знає, що сенс ключа змінився; потрібна інвалідація", "LRU завжди оновлює значення сам", "TTL тоді заборонений", "hit rate виправляє ціну"], correctIndex: 0, explanationUk: "Інвалідація за змістом, не лише за часом використання.", explanationEn: "Invalidation by meaning, not only by recency." },
          { kind: "fill", promptUk: "Допишіть назву політики 'найдавніше використаний'", promptEn: "Fill in the name of the 'least recently used' policy", language: "python", code: "cache = ___Cache(maxsize=1024)", accepted: ["LRU", "Lru"], caseSensitive: true, explanationUk: "LRU.", explanationEn: "LRU." },
          { kind: "read", promptUk: "Що міряти, щоб зрозуміти, чи 1024 записи — достатній розмір?", promptEn: "What do you measure to know whether 1024 entries is a sufficient size?", language: "python", code: "metrics.gauge('cache_hit_rate', hits / (hits+misses))", options: ["hit rate на реальному трафіку, не лише на синтетиці", "лише кількість рядків коду LRU", "лише довжину списку без трафіку", "кількість потоків"], correctIndex: 0, explanationUk: "Розмір підбирають за попаданнями.", explanationEn: "Size is tuned from hits." }
        ],
        whyUk: "Як зробити кеш цін товарів на 1024 записи, щоб після зміни ціни не віддавати стару?",
        whyEn: "How do you build a 1024-entry product-price cache so that after a price change you do not serve the old one?",
        ideas: [{ labelUk: "LRU O(1)", labelEn: "LRU in O(1)", anyOf: ["lru", "словник", "map", "список", "list"] }, { labelUk: "інвалідація", labelEn: "invalidation", anyOf: ["інвалід", "invalid", "цін", "price", "версі", "version"] }, { labelUk: "hit rate і гонки", labelEn: "hit rate and races", anyOf: ["hit", "трафік", "traffic", "thread", "гонк", "race"] }],
        sampleUk: "Роблять LRU зі словником і списком на 1024, після оновлення ціни інвалідують ключ, міряють hit rate на живому трафіку й захищають структуру від гонок; сама давність використання не знає про зміну сенсу.",
        sampleEn: "You build an LRU with a map and a list at 1024, after a price update you invalidate the key, you measure hit rate on live traffic, and you protect the structure from races; recency alone does not know that meaning changed.",
      },
      {
        slug: "aa-ttl-aside",
        titleUk: "TTL і cache-aside: хто відповідає за застаріле",
        titleEn: "TTL and cache-aside: who is responsible for stale data",
        difficulty: 3,
        pointsUk: ["TTL — компроміс свіжості й попадань", "Cache-aside: miss → БД → запис, на зміні — інвалідація", "Гонки й чесне 'може бути застаріле'"],
        pointsEn: ["A TTL is a trade-off of freshness and hits", "Cache-aside: miss → DB → write, on change — invalidation", "Races and an honest 'may be stale'"],
        conceptUk: "TTL (час життя) обмежує, як довго значення вважається свіжим. Занадто довгий — користувач бачить застаріле; занадто короткий — кеш марний. Cache-aside: додаток читає кеш, при miss йде в БД і записує; при записі в БД — інвалідує або оновлює кеш. Гонка 'прочитали старе, записали після нового запису' потребує версії або обережної інвалідації. Не тримайте TTL 'назавжди' для даних, що змінюються. Для персональних даних TTL ще й вимога приватності. Документуйте, що клієнт може побачити застаріле протягом TTL.",
        conceptEn: "A TTL (time to live) limits how long a value is considered fresh. Too long — the user sees stale data; too short — the cache is useless. Cache-aside: the app reads the cache, on a miss it goes to the DB and writes back; on a DB write it invalidates or updates the cache. A race 'we read the old, we wrote after a new write' needs a version or careful invalidation. Do not keep a TTL of 'forever' for data that changes. For personal data a TTL is also a privacy requirement. Document that the client may see stale data for the duration of the TTL.",
        code: "val = cache.get(k) or cache.set(k, db.get(k), ttl=30)\n# on update: db.write(); cache.invalidate(k)\n# docs: may be stale ≤ 30s",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Хто має інвалідувати кеш при зміні рядка в БД в патерні cache-aside?", promptEn: "Who should invalidate the cache when a DB row changes in the cache-aside pattern?", options: ["код запису в БД (або підписка на зміну), інакше TTL триматиме старе до кінця", "лише сам TTL без інвалідації завжди достатній для грошей", "читач при hit", "Bloom-фільтр"], correctIndex: 0, explanationUk: "Запис і кеш узгоджують.", explanationEn: "The write and the cache are coordinated." },
          { kind: "fill", promptUk: "Допишіть час життя запису", promptEn: "Fill in the lifetime of an entry", language: "python", code: "redis.set(key, value, ex=___)  # seconds", accepted: ["ttl", "60", "300", "ex"], caseSensitive: true, explanationUk: "ex / TTL у секундах.", explanationEn: "ex / a TTL in seconds." },
          { kind: "read", promptUk: "Що сказати в документації API, якщо профіль кешується 30 с?", promptEn: "What should the API docs say if a profile is cached for 30 s?", language: "markdown", code: "# GET /profile", options: ["що дані можуть бути застарілими до 30 секунд", "що дані завжди миттєво точні", "нічого про свіжість", "що TTL нескінченний"], correctIndex: 0, explanationUk: "Чесний контракт свіжості.", explanationEn: "An honest freshness contract." }
        ],
        whyUk: "Як кешувати профіль користувача, щоб після зміни імені не тримати старе хвилину без потреби, і чесно описати затримку?",
        whyEn: "How do you cache a user profile so that after a name change you do not keep the old one for a minute without need, and you honestly describe the delay?",
        ideas: [{ labelUk: "TTL як компроміс", labelEn: "a TTL as a trade-off", anyOf: ["ttl", "свіж", "fresh", "коротк", "short", "довг", "long"] }, { labelUk: "інвалідація при записі", labelEn: "invalidation on write", anyOf: ["інвалід", "invalid", "cache-aside", "запис", "write", "бд", "db"] }, { labelUk: "чесний контракт", labelEn: "an honest contract", anyOf: ["документац", "docs", "застаріл", "stale", "гонк", "race"] }],
        sampleUk: "Читають cache-aside з розумним TTL, при записі в БД інвалідують ключ, враховують гонки через версію й у документації кажуть, що дані можуть бути застарілими до TTL.",
        sampleEn: "You read cache-aside with a sensible TTL, on a DB write you invalidate the key, you handle races with a version, and the docs say that data may be stale up to the TTL.",
      },
      {
        slug: "aa-token-bucket",
        titleUk: "Token bucket: плавна середня частота з короткою чергою сплесків",
        titleEn: "A token bucket: a smooth average rate with a short burst queue",
        difficulty: 3,
        pointsUk: ["Середня швидкість + місткість сплеску", "Ключ ліміту справедливий, є Retry-After", "Атомарний лічильник, не гонка read-write"],
        pointsEn: ["An average rate + burst capacity", "A fair limit key, a Retry-After", "An atomic counter, not a read-write race"],
        conceptUk: "Обмеження частоти (rate limit) захищає API. Token bucket: бачок наповнюється зі сталою швидкістю, кожен запит забирає токен; якщо порожньо — 429. Місткість бачка дозволяє короткий сплеск (burst) вищий за середнє. Це м'якше за 'N разів на фіксоване вікно', де на межі хвилини можливий подвійний сплеск. Ключ ліміту (IP, користувач, токен) обирають свідомо: спільний NAT не повинен душити офіс, автентифікований ліміт — справедливіший. Повідомляйте Retry-After. Лічильник у Redis має бути атомарним (INCR+TTL або токени з часом), не 'прочитав-записав' без блокування.",
        conceptEn: "A rate limit protects an API. A token bucket: the bucket fills at a constant speed, each request takes a token; if it is empty — 429. The bucket's capacity allows a short burst above the average. That is milder than 'N times per a fixed window', where a double burst is possible at a minute boundary. The limit key (IP, user, token) is chosen deliberately: a shared NAT should not throttle an office, an authenticated limit is fairer. Send Retry-After. A Redis counter must be atomic (INCR+TTL or tokens with a timestamp), not 'read-write' without a lock.",
        code: "bucket(rate=10/s, burst=20, key=user_id)\n# empty → 429 Retry-After; Redis: atomic token update",
        language: "python",
        retrieval: [
          { kind: "mcq", promptUk: "Чим фіксоване вікно '100 за хвилину' гірше за token bucket на межі :00?", promptEn: "How is a fixed window of '100 per minute' worse than a token bucket at the :00 boundary?", options: ["можна зробити 100 в кінці хвилини й 100 на початку наступної — подвійний сплеск", "фіксоване вікно завжди м'якше", "Retry-After тоді неможливий", "token bucket забороняє сплески"], correctIndex: 0, explanationUk: "Межа вікна дає 2N.", explanationEn: "A window edge allows 2N." },
          { kind: "fill", promptUk: "Допишіть код відповіді, коли токенів немає", promptEn: "Fill in the response code when there are no tokens", language: "http", code: "HTTP/1.1 ___ Too Many Requests\nRetry-After: 2", accepted: ["429"], caseSensitive: true, explanationUk: "429 і Retry-After.", explanationEn: "429 and Retry-After." },
          { kind: "read", promptUk: "Чому ліміт лише за IP несправедливий для офісу за NAT?", promptEn: "Why is an IP-only limit unfair for an office behind NAT?", language: "python", code: "limit(key=ip, n=10)", options: ["усі співробітники ділять один лічильник; краще ключ автентифікованого користувача", "NAT завжди дає унікальний IP на людину", "429 тоді не надсилають", "token bucket не вміє ключів користувача"], correctIndex: 0, explanationUk: "Ключ має відповідати суб'єкту.", explanationEn: "The key should match the subject." }
        ],
        whyUk: "Як обмежити API до 10 запитів на секунду з коротким сплеском, чесно для людей за NAT?",
        whyEn: "How do you limit an API to 10 requests per second with a short burst, fairly for people behind NAT?",
        ideas: [{ labelUk: "token bucket", labelEn: "a token bucket", anyOf: ["bucket", "токен", "token", "сплеск", "burst", "середн", "average"] }, { labelUk: "не фіксоване 2N", labelEn: "not a fixed 2N", anyOf: ["вікно", "window", "2n", "меж", "boundary"] }, { labelUk: "ключ і 429", labelEn: "the key and 429", anyOf: ["користувач", "user", "nat", "429", "retry", "атомар", "atomic"] }],
        sampleUk: "Ставлять token bucket із середньою швидкістю й місткістю сплеску, ключ — автентифікований користувач, а не лише IP за NAT, при відмові — 429 і Retry-After, лічильник у Redis атомарний.",
        sampleEn: "You set a token bucket with an average rate and burst capacity, the key is the authenticated user, not only the IP behind NAT, on refusal — 429 and Retry-After, and the Redis counter is atomic.",
      }
    ],
    "Контрольна: LRU і ліміти",
    "Exam: LRU and limits",
    [
      { promptUk: "LRU витісняє…", promptEn: "LRU evicts…", options: ["те, до чого найдовше не звертались", "найчастіше використовуване завжди", "випадковий ключ лише", "застаріле за змістом автоматично завжди"], correctIndex: 0, explanationUk: "Давність використання.", explanationEn: "Recency of use." },
      { promptUk: "Після зміни ціни запис кешу…", promptEn: "After a price change, the cache entry should be…", options: ["інвалідований, не чекати LRU", "залишений до витіснення завжди", "виміряний лише кількістю рядків коду", "замінений Bloom"], correctIndex: 0, explanationUk: "Сенс ключа змінився.", explanationEn: "The key's meaning changed." },
      { promptUk: "Cache-aside при записі в БД…", promptEn: "Cache-aside on a DB write should…", options: ["інвалідувати або оновити кеш", "покладатись лише на вічний TTL", "читати hit як запис", "ігнорувати гонки"], correctIndex: 0, explanationUk: "Узгодження запису.", explanationEn: "Coordination of the write." },
      { promptUk: "Документація при TTL 30 с має сказати…", promptEn: "Docs at a 30 s TTL should say…", options: ["дані можуть бути застарілими до 30 с", "дані завжди миттєві", "TTL нескінченний", "кешу немає"], correctIndex: 0, explanationUk: "Чесна свіжість.", explanationEn: "Honest freshness." },
      { promptUk: "Фіксоване вікно на межі хвилини дозволяє…", promptEn: "A fixed window at a minute boundary allows…", options: ["подвійний сплеск 2N", "лише N завжди", "м'якший за token bucket обов'язково", "атомарність без Redis"], correctIndex: 0, explanationUk: "Token bucket м'якший до сплесків середнього.", explanationEn: "A token bucket is smoother around average bursts." },
      { promptUk: "429 без Retry-After…", promptEn: "A 429 without Retry-After is…", options: ["гірший UX; кажіть коли пробувати знову", "повний контракт", "заміна ключа користувача", "атомарний лічильник"], correctIndex: 0, explanationUk: "Підказка клієнту.", explanationEn: "A hint to the client." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandAppliedAlgorithms(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
