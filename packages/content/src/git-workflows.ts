import type { CourseContent, Exercise } from "./types.js";
import {
  codeFill,
  codeOrderAuto,
  codeProject,
  codeRead,
  concept,
  exam,
  lesson,
  matchEx,
  mcq,
  unit,
  why,
} from "./builders.js";

const historyCommits = unit(
  "gw_history_commits",
  "Історія репозиторію та атомарні коміти",
  "Repository History & Atomic Commits",
  [
    lesson(
      "gw-hc-graph",
      "Модель DAG комітів, HEAD та індекс (Staging Area)",
      "Commit Graph, HEAD & Staging Area",
      2, true, [
        concept("gw-hc-graph-concept", "Робоче дерево, індекс і коміт", "Working tree, index, and commit", {
          uk: "Робоче дерево містить поточні файли; індекс визначає вміст наступного коміту, а HEAD зазвичай посилається на поточну гілку або безпосередньо на коміт у detached HEAD. Для відстежуваного файлу git add -p дозволяє вибрати фрагменти. Перевірте git status і git diff --staged перед комітом; неіндексовані зміни в робочому дереві до нього не потраплять.",
          en: "The working tree holds current files; the index determines the next commit's content, while HEAD normally refers to the current branch or directly to a commit in detached HEAD. For a tracked file, git add -p lets you select hunks. Check git status and git diff --staged before committing; unstaged working-tree changes will not be included.",
        }),
        { ...mcq(
          "gw-hc1",
          "У робочій директорії ви полагодили баг пагінації й заодно експериментально відредагували старий файл стилів. Як закомітити лише фікс пагінації чистим атомарним комітом?",
          "You fixed pagination in `api.ts` and made unrelated styling tweaks in `nav.css`. How do you commit only the pagination fix cleanly?",
          [
            "Проіндексувати точково `git add api.ts` (або `git add -p`), перевірити `git diff --staged` і зробити `git commit`",
            "Виконати `git add .` і написати «misc fixes»",
            "Видалити весь файл `nav.css`",
            "Склонувати репозиторій заново",
          ],
          0,
          why(
            "Атомарні коміти полегшують code review, безпечний `git revert` та пошук регресій через `git bisect`.",
            "Atomic commits make code review clear and enable surgical `git revert` and `git bisect`.",
          ),
        ), optionsEn: ["Stage only api.ts or selected hunks with git add -p, inspect git diff --staged, then commit", "Run git add . and write misc fixes", "Delete nav.css", "Clone the repository again"] },
        codeFill(
          "gw-hc2",
          "Подивитись точний diff уже доданих у staging змін перед комітом",
          "Inspect staged diff right before commit",
          "bash",
          "git diff --___",
          ["staged"],
          true,
          why(
            "`git diff --staged` (або `--cached`) показує рівно те, що потрапить у наступний коміт.",
            "`git diff --staged` verifies exact staged changes before committing.",
          ),
        ),
      ], { baseXp: 22 },
    ),
    lesson(
      "gw-hc-log",
      "Читання історії та пошук моменту поломки (`git bisect`)",
      "Reading History & Isolating Regressions with Bisect",
      2, true, [
        concept("gw-hc-log-concept", "Бісекція регресії", "Bisecting a regression", {
          uk: "Позначте відомий поганий і відомий добрий коміти, запускайте відтворювану перевірку на запропонованих ревізіях і позначайте результат. Пошук припускає послідовний перехід від доброго стану до поганого; пропущені або нестабільні перевірки обмежують точність. Завершіть git bisect reset.",
          en: "Mark known bad and known good commits, run a reproducible check on each proposed revision, and report the result. The search assumes a consistent transition from good to bad; skipped or flaky checks limit certainty. Finish with git bisect reset.",
        }),
        { ...codeOrderAuto(
          "gw-hc3",
          "Впорядкуйте пошук через `git bisect`: у цьому сценарії позначте поганий HEAD перед доброю версією v1.2.0.",
          "Order this `git bisect` search: in this scenario mark bad HEAD before the good version v1.2.0.",
          "bash",
          [
            "git bisect start",
            "git bisect bad HEAD",
            "git bisect good v1.2.0",
            "Run test at each midpoint (bad/good) until first bad commit is printed, then git bisect reset",
          ],
          why(
            "За монотонної відтворюваної перевірки пошук серед 64 кандидатів потребує приблизно шість перевірок; пропущені коміти чи немонотонна помилка можуть ускладнити результат.",
            "With a reproducible monotonic check, bisect takes roughly O(log N) checks; skipped commits or non-monotonic behavior can complicate the result. `git bisect reset` returns to the original checkout.",
          ),
        ), linesUk: ["git bisect bad HEAD", "git bisect good v1.2.0", "Перевіряйте кожну запропоновану ревізію, позначайте bad/good; після результату виконайте git bisect reset", "git bisect start"] },
      ], { baseXp: 22 },
    ),
    exam("gw-hc-exam", "Контрольна: історія та атомарні коміти", "Checkpoint: History & Atomic Commits", 2, [
      { ...mcq(
        "gw-hc-e1",
        "Чому не варто змішувати автоформатування всього репозиторію в одному коміті з критичним багфіксом?",
        "Why avoid mixing repo-wide formatting churn into a behavioral bugfix commit?",
        [
          "Масовий diff маскує реальну логічну зміну під час рев'ю і створює зайві merge-конфлікти",
          "Git забороняє коміти більше ніж на 10 рядків",
          "Форматування не зберігається в git",
          "`git log` перестає показувати дати",
        ],
        0,
      ), optionsEn: ["A large diff can hide the behavioral change and add merge conflicts", "Git forbids commits over ten lines", "Git cannot store formatting", "git log stops showing dates"] },
      codeFill(
        "gw-hc-e2",
        "Компактний граф гілок і комітів в одному рядку",
        "Compact commit graph view",
        "bash",
        "git log --oneline --graph --___",
        ["decorate"],
        true,
      ),
    ]),
  ],
);

const branchesRebase = unit(
  "gw_branches_rebase",
  "Гілки, Merge та Rebase без втрат",
  "Branching, Merge & Shared-Branch Rules",
  [
    lesson(
      "gw-br-merge-vs-rebase",
      "Коли Merge, коли Rebase, і золоте правило публічних гілок",
      "Fast-Forward, Merge vs Rebase & Shared Branches",
      3, true, [
        concept("gw-br-merge-vs-rebase-concept", "Спільна історія та переписування", "Shared history and rewriting", {
          uk: "Merge зберігає наявну історію, а rebase переносить коміти і створює нові ідентифікатори. Перед переписуванням опублікованої гілки узгодьте це з її користувачами. Force-with-lease зменшує ризик перезапису, але не замінює координацію та перевірку очікуваного стану віддаленої гілки.",
          en: "Merge preserves existing history, while rebase replays commits and creates new identifiers. Coordinate before rewriting a published branch. Force-with-lease reduces overwrite risk, but does not replace coordination and checking the expected remote state.",
        }),
        { ...mcq(
          "gw-br1",
          "Гілка `main` спільна для 4 розробників і вже запушена на origin. Чому на ній не можна робити `git rebase` з `push --force`?",
          "Why is rewriting shared `main` with `git rebase` + force-push dangerous for teammates?",
          [
            "Перезаписуються SHA-хеші спільних комітів, через що локальні гілки колег розходяться з історією origin і дублюють/затирають роботу",
            "`git rebase` видаляє `.gitignore`",
            "GitHub забороняє більше двох комітів на тиждень",
            "Force-push стирає файли у node_modules",
          ],
          0,
          why(
            "Переписування приватної гілки менш ризиковане; для опублікованої спершу узгодьте дію. Lease допомагає виявити несподівані зміни, але сам не гарантує збереження роботи колег.",
            "Rewriting a private branch is less risky; coordinate before rewriting a published branch. A lease helps detect unexpected updates but does not itself guarantee teammates' work is preserved.",
          ),
        ), optionsEn: ["Rewriting shared commit IDs makes teammates’ histories diverge and can overwrite work", "Rebase deletes .gitignore", "GitHub allows only two commits per week", "Force push erases node_modules"] },
        codeFill(
          "gw-br2",
          "Прапорець для перевірки очікуваного стану віддаленої гілки перед примусовим push",
          "Force-push flag that checks the expected remote branch state",
          "bash",
          "git push --___-with-lease origin feat/tasks-filter",
          ["force"],
          true,
          why(
            "`--force-with-lease` звіряє поточне значення віддаленої гілки з очікуваним. Фоновий fetch може оновити локальне посилання; для сильнішої перевірки задайте очікуваний SHA явно.",
            "`--force-with-lease` compares the remote ref with the expected value. A background fetch can update the local tracking ref; an explicit expected SHA offers a stronger check.",
          ),
        ),
      ], { baseXp: 24 },
    ),
    lesson(
      "gw-br-switch",
      "Сучасні `git switch` / `git restore` проти заплутаного `checkout`",
      "Clean Navigation with switch & restore",
      3, true, [
        concept("gw-br-switch-concept", "Переключення і відновлення", "Switching and restoring", {
          uk: "git switch змінює гілку, git restore --staged прибирає зміни з індексу, зберігаючи робочий файл. Натомість git restore без --staged перезаписує незакомічені зміни у вказаному файлі. Перед командою перевірте git status і diff та збережіть потрібну роботу.",
          en: "git switch changes branches; git restore --staged removes changes from the index while keeping the working file. In contrast, git restore without --staged overwrites uncommitted changes in the named file. Inspect git status and diff and save work you need first.",
        }),
        { ...matchEx(
          "gw-br3",
          "Зіставте завдання зі зрозумілою командою Git",
          "Match each workflow need to the focused Git command",
          [
            { left: "Створити та перейти на нову гілку", right: "git switch -c feat/auth" },
            { left: "Відкинути незакомічені зміни у файлі", right: "git restore src/api.ts" },
            { left: "Прибрати зміни файлу з індексу, залишивши робочий файл", right: "git restore --staged src/api.ts" },
          ],
        ), pairsEn: [{ left: "Create and switch to a new branch", right: "git switch -c feat/auth" }, { left: "Discard uncommitted changes in a file", right: "git restore src/api.ts" }, { left: "Unstage file changes while keeping the working file", right: "git restore --staged src/api.ts" }] },
      ], { baseXp: 24 },
    ),
    exam("gw-br-exam", "Контрольна: гілки та rebase", "Checkpoint: Branches & Rebase", 3, [
      { ...mcq(
        "gw-br-e1",
        "Який прапорець перевіряє, що віддалена гілка відповідає очікуваному значенню перед примусовим push?",
        "Which flag checks that the remote branch has the expected value before a force-push?",
        ["--force-with-lease", "--force", "--delete", "--mirror"],
        0,
        why("Lease не замінює узгодження та перевірку роботи колег; фоновий fetch може змінити неявне очікуване значення.", "A lease does not replace coordination or review of teammates' work; background fetch can change the implicit expected value."),
      ), optionsEn: ["--force-with-lease", "--force", "--delete", "--mirror"] },
      { ...mcq(
        "gw-br-e2",
        "Що означає статус `fast-forward` при злитті гілки?",
        "What happens during a `fast-forward` merge?",
        [
          "Цільова гілка просто пересуває вказівник уперед без нового merge-коміта, бо не було розгалуження",
          "Git пропускає всі тести CI",
          "Усі конфлікти розв'язуються видаленням цільової гілки",
          "Історія стискається в архів tar.gz",
        ],
        0,
      ), optionsEn: ["The target branch pointer moves to the descendant commit without creating a merge commit", "Git skips all CI tests", "All conflicts are resolved by deleting the target branch", "History is compressed into a tar.gz archive"] },
    ]),
  ],
);

const conflictResolution = unit(
  "gw_conflict_resolution",
  "Розв'язання конфліктів без паніки",
  "Merge & Rebase Conflict Resolution",
  [
    lesson(
      "gw-cr-markers",
      "Читання маркерів `<<<<<<<`, `=======`, `>>>>>>>`",
      "Reading Conflict Markers & Verifying Combined Intent",
      3, false, [
        concept("gw-cr-markers-concept", "Конфлікт — це рішення про зміст", "A conflict requires a content decision", {
          uk: "Маркери показують конкуруючі фрагменти, але не визначають правильну поведінку. Прочитайте намір обох змін, узгодьте результат, приберіть маркери та запустіть потрібні перевірки. Для merge завершують злиття комітом; для rebase після git add використовують git rebase --continue або --abort.",
          en: "Markers show competing fragments, but do not determine the correct behavior. Understand both changes, resolve their intent, remove markers, and run relevant checks. Finish a merge with a commit; during rebase use git rebase --continue after staging, or --abort.",
        }),
        { ...codeRead(
          "gw-cr1",
          "Обидві зміни потрібні; validatedLimit уже перевірено як додатне ціле число. Яке розв'язання збереже обидві вимоги?",
          "Both changes are required; validatedLimit has already been validated as a positive integer. Which resolution preserves both requirements?",
          "ts",
          "<<<<<<< HEAD\nif (!user) return res.status(401).json({ error: \"unauthorized\" });\n=======\nconst limit = Math.min(validatedLimit, 50);\n>>>>>>> feat/pagination",
          [
            "Потрібно зберегти Обидві частини (перевірку auth 401 AND ліміт пагінації), видалити маркери конфлікту й прогнати тести",
            "Натиснути «Accept Current» не дивлячись і видалити пагінацію",
            "Залишити рядки `=======` у файлі та закомітити",
            "Сліпо прийняти Incoming і видалити перевірку 401",
          ],
          0,
          why(
            "Сліпе «Accept Current / Incoming» може призвести до втрати важливої зміни. Читайте намір обох змін і перевіряйте тестами.",
            "Blindly picking one side drops fixes; combine both intents cleanly and run tests before staging.",
          ),
        ) as Extract<Exercise, { type: "code_read" }>, optionsEn: ["Keep both the 401 authorization check and the pagination limit, remove markers, and run tests", "Accept current blindly and remove pagination", "Leave conflict markers in the file and commit", "Accept incoming blindly and remove the 401 check"] },
        { ...codeOrderAuto(
          "gw-cr2",
          "Повний безпечний порядок завершення конфліктного merge",
          "Order the steps to finish a conflicted merge safely",
          "bash",
          [
            "Inspect conflicted files via git status and read both diff sides",
            "Edit file to combine valid code and remove all conflict markers",
            "Run typecheck and tests to verify merged behavior works",
            "Stage resolved file with git add and finish via git commit",
          ],
        ), linesUk: ["Об'єднати потрібні зміни у файлі та прибрати маркери конфлікту", "Запустити перевірку типів і тести об'єднаної поведінки", "Додати розв'язаний файл через git add і завершити git commit", "Перевірити конфліктні файли через git status і прочитати обидві сторони"] },
      ], { baseXp: 25 },
    ),
    exam("gw-cr-exam", "Контрольна: конфлікти", "Checkpoint: Conflict Resolution", 3, [
      { ...mcq(
        "gw-cr-e1",
        "Під час `git rebase` стався конфлікт на 2-му коміті з 4. Ви передумали й хочете повернути гілку в стан ДО початку rebase. Яка команда безпечна?",
        "A conflict occurs during `git rebase` and you want to cancel back cleanly to the pre-rebase state. Which command?",
        ["git rebase --abort", "git reset --hard HEAD~10", "rm -rf .git", "git rebase --skip без аналізу"],
        0,
      ), optionsEn: ["git rebase --abort", "git reset --hard HEAD~10", "rm -rf .git", "git rebase --skip without analysis"] },
      codeFill(
        "gw-cr-e2",
        "Продовжити rebase після вирішення та git add",
        "Continue rebase after resolving and staging",
        "bash",
        "git rebase --___",
        ["continue"],
        true,
      ),
    ]),
  ],
);

const codeReviews = unit(
  "gw_code_review",
  "Code Review та якість Pull Request",
  "Pull Requests & Code Review Craft",
  [
    lesson(
      "gw-rev-pr",
      "Підготовка PR, самоперевірка diff та конструктивний фідбек",
      "Scoped PRs, Self-Review & Review Habits",
      3, false, [
        concept("gw-rev-pr-concept", "Рев’ю, яке допомагає зміні", "Review that helps the change", {
          uk: "Перед запитом рев’ю перевірте власний diff, зв’язок із вимогою та результати перевірок. У коментарі назвіть конкретну поведінку, можливий наслідок і запропонуйте наступний крок. Розмір PR важливий для огляду, але сам по собі не гарантує якості.",
          en: "Before requesting review, inspect your diff, its relationship to the requirement, and relevant check results. A useful comment identifies concrete behavior, its consequence, and a possible next step. PR size affects reviewability but does not guarantee review quality.",
        }),
        { ...mcq(
          "gw-rev1",
          "Перед переведенням PR зі стану Draft у Ready що автор має перевірити першим?",
          "What should an author verify before marking a PR Ready for Review?",
          [
            "Переглянути власний PR diff на відлагоджувальні логи/зайві правки, перевірити зв'язок із вимогою і прогнати локальні перевірки (typecheck/test)",
            "Почекати, доки рев'ювер сам знайде помилки компіляції",
            "Об'єднати 5 різних задач в один PR на 3000 рядків",
            "Приховати тести у локальному невідстежуваному файлі",
          ],
          0,
          why(
            "Self-review ловить забутий `console.log`, пропущені edge cases та економить час команди.",
            "Self-review catches stray debug output, out-of-scope edits, and broken tests before interrupting reviewers.",
          ),
        ), optionsEn: ["Review the diff for debug output and unrelated changes, check requirements, and run relevant checks", "Wait for a reviewer to find compilation errors", "Combine five unrelated tasks into a 3000-line PR", "Hide tests in an untracked local file"] },
        { ...mcq(
          "gw-rev2",
          "Який коментар у PR найефективніший?",
          "Which PR review comment is most effective?",
          [
            "Конкретний, із поясненням наслідків: «Без `limit` цей запит тягне всю таблицю — додамо обмеження 50, як у списку проєктів»",
            "«Погано написано» без деталей",
            "Зміна стилю пробілів у кожному рядку вручну попри лінтер",
            "«Схвалено», навіть якщо тести вимкнені",
          ],
          0,
        ), optionsEn: ["Explain a concrete consequence and propose a change, such as adding a query limit", "Say only that it is badly written", "Manually change spacing on every line despite a linter", "Approve even though tests are disabled"] },
      ], { baseXp: 24 },
    ),
    exam("gw-rev-exam", "Контрольна: Code Review", "Checkpoint: Code Review", 3, [
      { ...mcq(
        "gw-rev-e1",
        "Чому сфокусований PR часто простіше ретельно перевірити, ніж PR із багатьма не пов’язаними змінами?",
        "Why is a focused PR often easier to review carefully than one containing many unrelated changes?",
        [
          "Рев'ювери справді аналізують інваріанти й границі замість втомленого поверхового схвалення",
          "Git не вміє мерджити більше 500 рядків",
          "Малі PR не запускають CI",
          "Великі PR заборонені HTTP-протоколом",
        ],
        0,
      ), optionsEn: ["A focused change gives reviewers more room to examine behavior and edge cases", "Git cannot merge more than 500 lines", "Small PRs do not run CI", "Large PRs are forbidden by HTTP"] },
    ]),
  ],
);

const recoveryReleaseCapstone = unit(
  "gw_recovery_release_capstone",
  "Відновлення (`reflog`), релізи та ForgeBoard M8",
  "Recovery (Reflog), Releases & ForgeBoard Conflict Lab",
  [
    lesson(
      "gw-rr-reflog-revert",
      "Порятунок через `git reflog` і безпечний відкат у prod (`git revert`)",
      "Rescue with Reflog & Public Rollback with Revert",
      4, false, [
        concept("gw-rr-reflog-revert-concept", "Відновлення та скасування", "Recovery and reversal", {
          uk: "Reflog локально записує переміщення посилань і може допомогти знайти нещодавній коміт після reset; незакомічені файли він не гарантує відновити. Створіть захисну гілку на знайденому SHA і перевірте її. Для скасування опублікованої зміни revert створює новий коміт; merge-коміт може вимагати вибору батьківської гілки.",
          en: "The local reflog records ref movements and can help locate a recent commit after reset; it cannot guarantee recovery of uncommitted files. Create a rescue branch at the found SHA and inspect it. To undo a published change, revert creates a new commit; reverting a merge commit may require choosing a parent.",
        }),
        { ...mcq(
          "gw-rr1",
          "Випадково запустили `git reset --hard HEAD~2` на локальній гілці з ще не запушеною роботою. Як повернути загублені коміти?",
          "You accidentally ran `git reset --hard HEAD~2` losing unpushed local commits. How do you recover them?",
          [
            "Знайти попередній хеш у `git reflog` і створити гілку або скинутись назад: `git switch -c rescue <hash>`",
            "Коміти знищено назавжди тієї ж мілісекунди",
            "Виконати `git clean -fdx`",
            "Перевстановити Git",
          ],
          0,
          why(
            "Локальний reflog допомагає знайти записані позиції HEAD, доки об’єкти доступні; незакомічені зміни він надійно не відновлює.",
            "The local reflog can help recover recorded HEAD positions while the objects remain available; it does not reliably restore uncommitted work.",
          ),
        ), optionsEn: ["Find the previous commit in git reflog and create a rescue branch at its hash", "Commits are destroyed permanently in the same millisecond", "Run git clean -fdx", "Reinstall Git"] },
        { ...mcq(
          "gw-rr2",
          "Після мерджу в `main` виявили баг у звичайному коміті `abc123` з одним батьком. Як скасувати зміну, зберігши історію?",
          "A regression on shared `main` comes from an ordinary single-parent commit `abc123`. How can you undo it while preserving history?",
          [
            "`git revert abc123` (створює новий зворотній коміт без переписування публічної історії)",
            "`git reset --hard abc123~1 && git push --force` на `main`",
            "Видалити репозиторій",
            "Примусово вимкнути тести",
          ],
          0,
        ), optionsEn: ["git revert abc123 creates a new reverse commit without rewriting shared history", "Run git reset --hard and force-push main", "Delete the repository", "Force tests off"] },
      ], { baseXp: 26 },
    ),
    lesson(
      "gw-forgeboard-conflict-lab",
      "Лаб: вирішення конфлікту й реліз ForgeBoard (M8)",
      "Lab: ForgeBoard Conflict Resolution & Delivery (M8)",
      4, false, [
        concept("gw-forgeboard-conflict-lab-concept", "Перевірте обидва наміри", "Verify both intentions", {
          uk: "У конфлікті потрібно зберегти перевірку власника та нормалізацію назви, а не просто прибрати маркери. Вбудована вправа шукає потрібний текст; локальна лабораторна робота дозволяє відпрацювати Git і запустити тести на реальному сценарії.",
          en: "Resolve the conflict by preserving both ownership validation and title normalization, not merely removing markers. The embedded exercise checks for text; the local lab lets you practice Git and run tests against a realistic scenario.",
        }),
        { ...mcq(
          "gw-fb1",
          "У Milestone 8 дві гілки ForgeBoard одночасно торкнулися валідації створення задачі: одна додала санітизацію назви, друга — перевірку прав власника проєкту. Яке завдання цього лабу?",
          "In Milestone 8, two ForgeBoard branches edited task creation: one added title sanitization, the other added project ownership checks. What is required?",
          [
            "Акуратно поєднати обидві гілки без втрати жодної перевірки, додати/прогнати тести та переконатися в чистій лінійній історії PR",
            "Видалити перевірку власника заради зеленого конфлікту",
            "Залишити конфлікт-маркери в README",
            "Використати force push на спільний main",
          ],
          0,
        ), optionsEn: ["Combine both changes, run tests, and follow the lab’s PR history requirements", "Remove ownership checks to resolve the conflict", "Leave conflict markers in README", "Force-push shared main"] },
        codeProject(
          "gw-fb2",
          "Зберіть функцію з двома правками без маркерів конфлікту. Вбудована перевірка шукає фрагменти тексту, зокрема в коментарях, і не запускає код. Для справжньої практики merge та тестів скористайтеся локальним лабом M8 нижче.",
          "Combine both validation changes without conflict markers. The embedded check searches text fragments, including comments, and does not run the code. Use the local M8 lab below for actual merge and test practice.",
          [
            {
              id: "js",
              name: "create-task.js",
              language: "javascript",
              starter: `export function canCreateTask(project, userId, rawTitle) {\n<<<<<<< ownership\n  if (!project || project.ownerId !== userId) return { ok: false, error: "forbidden" };\n=======\n  const title = rawTitle.trim();\n  if (!title) return { ok: false, error: "title_required" };\n>>>>>>> validation\n  return { ok: true, title };\n}\n`,
            },
          ],
          [
            { fileId: "js", contains: ["forbidden", "trim", "title_required"], forbidden: ["<<<<<<<", "=======", ">>>>>>>"] },
          ],
          {
            hintUk: "Пакет M8 містить реальний локальний сценарій розв'язання конфлікту та набір тестів, які падають при втраті однієї зі сторін.",
            hintEn: "The M8 local lab includes real conflicted code + automated checks that fail if either side's fix is dropped.",
          },
        ),
      ], { baseXp: 45 },
    ),
    exam("gw-rr-exam", "Контрольна: відновлення і реліз", "Checkpoint: Recovery & Release", 4, [
      { ...mcq(
        "gw-rr-e1",
        "Що дозволяє ідентифікувати точний коміт релізу та перевірити його походження?",
        "What identifies the exact release commit and supports verifying its origin?",
        ["Зафіксований commit SHA та перевірений підписаний тег (тег сам по собі можна пересунути)", "Скриншот робочого столу", "Назва локальної папки Downloads", "Оновлена дата в Word-файлі"],
        0,
      ), optionsEn: ["A recorded commit SHA and a verified signed tag (a tag name itself can be moved)", "A desktop screenshot", "The name of the local Downloads folder", "An updated date in a Word file"] },
      codeFill(
        "gw-rr-e2",
        "Переглянути журнал переміщень HEAD після випадкового reset",
        "Inspect local HEAD history journal",
        "bash",
        "git ___",
        ["reflog"],
        true,
      ),
    ]),
  ],
);

export const gitWorkflowsContent: CourseContent = {
  slug: "git_workflows",
  titleUk: "Git та командні робочі процеси",
  titleEn: "Git and Team Workflows",
  descriptionUk:
    "Історія комітів і bisect, гілки та правила rebase, розв'язання конфліктів без втрати логіки, ефективний code review, reflog і релізний процес.",
  descriptionEn:
    "Commit history and bisect, branching and rebase safety, conflict resolution without dropped fixes, code review craft, reflog recovery, and releases.",
  icon: "🌿",
  color: "#F05032",
  units: [
    historyCommits,
    branchesRebase,
    conflictResolution,
    codeReviews,
    recoveryReleaseCapstone,
  ],
};
