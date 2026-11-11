import type { CourseContent } from "./types.js";
import {
  codeFill,
  codeOrderAuto,
  codeProject,
  codeRead,
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
        mcq(
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
        ),
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
        codeOrderAuto(
          "gw-hc3",
          "Впорядкуйте пошук першого зламаного коміту серед 64 попередніх комітів через `git bisect`",
          "Order a `git bisect` regression search across 64 commits",
          "bash",
          [
            "git bisect start",
            "git bisect bad HEAD",
            "git bisect good v1.2.0",
            "Run test at each midpoint (bad/good) until first bad commit is printed, then git bisect reset",
          ],
          why(
            "Бінарний пошук знайде винуватий коміт серед 64 змін за 6 кроків (~log2(64)).",
            "Bisect locates the exact regression in O(log N) steps and `git bisect reset` returns cleanly to HEAD.",
          ),
        ),
      ], { baseXp: 22 },
    ),
    exam("gw-hc-exam", "Контрольна: історія та атомарні коміти", "Checkpoint: History & Atomic Commits", 2, [
      mcq(
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
      ),
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
        mcq(
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
            "Rebase доречний лише на власних локальних/PR-гілках до інтеграції (`--force-with-lease`), але не на спільних гілках.",
            "Rebase belongs to private/feature work (`--force-with-lease`), never shared team branches.",
          ),
        ),
        codeFill(
          "gw-br2",
          "Безпечний примусовий push власної перебазованої PR-гілки (захист від перезапису чужих комітів)",
          "Safer force-push flag protecting unexpected remote commits",
          "bash",
          "git push --___-with-lease origin feat/tasks-filter",
          ["force"],
          true,
          why(
            "`--force-with-lease` відмовить у push, якщо хтось додав новий коміт у віддалену гілку після вашого останнього fetch.",
            "`--force-with-lease` aborts if the remote branch advanced unexpectedly.",
          ),
        ),
      ], { baseXp: 24 },
    ),
    lesson(
      "gw-br-switch",
      "Сучасні `git switch` / `git restore` проти заплутаного `checkout`",
      "Clean Navigation with switch & restore",
      3, true, [
        matchEx(
          "gw-br3",
          "Зіставте завдання зі зрозумілою командою Git",
          "Match each workflow need to the focused Git command",
          [
            { left: "Створити та перейти на нову гілку", right: "git switch -c feat/auth" },
            { left: "Скасувати незбережені зміни у конкретному файлі", right: "git restore src/api.ts" },
            { left: "Забрати файл зі staging назад у working tree", right: "git restore --staged src/api.ts" },
          ],
        ),
      ], { baseXp: 24 },
    ),
    exam("gw-br-exam", "Контрольна: гілки та rebase", "Checkpoint: Branches & Rebase", 3, [
      mcq(
        "gw-br-e1",
        "Колега випадково запушив у вашу PR-гілку коміт. Яка команда вбереже вас від мовчазного знищення його роботи при оновленні?",
        "A teammate pushed a commit to your shared PR branch. Which push safety check prevents silently overwriting it?",
        ["--force-with-lease", "--force", "--delete", "--mirror"],
        0,
      ),
      mcq(
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
      ),
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
        codeRead(
          "gw-cr1",
          "Розв'яжіть реальний конфлікт між двома гілками так, щоб не втратити жодного фіксу: Яке розв'язання є помилковим, а яке коректним?",
          "Resolve this conflict keeping both fixes intact: Which resolution breaks the application vs preserves both requirements?",
          "ts",
          "<<<<<<< HEAD\nif (!user) return res.status(401).json({ error: \"unauthorized\" });\n=======\nconst limit = Math.min(Number(req.query.limit ?? 20), 50);\n>>>>>>> feat/pagination",
          [
            "Потрібно зберегти Обидві частини (перевірку auth 401 AND ліміт пагінації), видалити маркери конфлікту й прогнати тести",
            "Натиснути «Accept Current» не дивлячись і видалити пагінацію",
            "Залишити рядки `=======` у файлі та закомітити",
            "Сліпо прийняти Incoming і видалити перевірку 401",
          ],
          0,
          why(
            "Сліпе «Accept Current / Incoming» — причина номер один регресій після злиття. Читайте намір обох змін і перевіряйте тестами.",
            "Blindly picking one side drops fixes; combine both intents cleanly and run tests before staging.",
          ),
        ),
        codeOrderAuto(
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
        ),
      ], { baseXp: 25 },
    ),
    exam("gw-cr-exam", "Контрольна: конфлікти", "Checkpoint: Conflict Resolution", 3, [
      mcq(
        "gw-cr-e1",
        "Під час `git rebase` стався конфлікт на 2-му коміті з 4. Ви передумали й хочете повернути гілку в стан ДО початку rebase. Яка команда безпечна?",
        "A conflict occurs during `git rebase` and you want to cancel back cleanly to the pre-rebase state. Which command?",
        ["git rebase --abort", "git reset --hard HEAD~10", "rm -rf .git", "git rebase --skip без аналізу"],
        0,
      ),
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
        mcq(
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
        ),
        mcq(
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
        ),
      ], { baseXp: 24 },
    ),
    exam("gw-rev-exam", "Контрольна: Code Review", "Checkpoint: Code Review", 3, [
      mcq(
        "gw-rev-e1",
        "Чому менші сфокусовані PR (150–300 рядків) проходять рев'ю якісніше, ніж один PR на 4000 рядків?",
        "Why do focused smaller PRs catch more real bugs than 4000-line mega-PRs?",
        [
          "Рев'ювери справді аналізують інваріанти й границі замість втомленого поверхового схвалення",
          "Git не вміє мерджити більше 500 рядків",
          "Малі PR не запускають CI",
          "Великі PR заборонені HTTP-протоколом",
        ],
        0,
      ),
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
        mcq(
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
            "Reflog зберігає переміщення HEAD локально тижнями; `git reset`/`rebase` не видаляють досяжні через reflog об'єкти миттєво.",
            "`git reflog` tracks every local HEAD movement so mistaken resets can be rescued immediately.",
          ),
        ),
        mcq(
          "gw-rr2",
          "Після мерджу в `main` і деплою виявили баг у релізному коміті `abc123`. Як безпечно відкотити зміну на спільній гілці?",
          "A regression already merged to shared `main` needs rollback. Which command preserves history safely?",
          [
            "`git revert abc123` (створює новий зворотній коміт без переписування публічної історії)",
            "`git reset --hard abc123~1 && git push --force` на `main`",
            "Видалити репозиторій",
            "Примусово вимкнути тести",
          ],
          0,
        ),
      ], { baseXp: 26 },
    ),
    lesson(
      "gw-forgeboard-conflict-lab",
      "Лаб: вирішення конфлікту й реліз ForgeBoard (M8)",
      "Lab: ForgeBoard Conflict Resolution & Delivery (M8)",
      4, false, [
        mcq(
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
        ),
        codeProject(
          "gw-fb2",
          "Зберіть об'єднану функцію з двома правками без маркерів конфлікту; завантажте локальний Git-репозиторій лабу M8 нижче для справжньої практики merge/conflict + тестів.",
          "Combine both conflicting validation changes cleanly without conflict markers; download Milestone 8 below for a real local Git conflict + verification lab.",
          [
            {
              id: "js",
              name: "create-task.js",
              language: "javascript",
              starter: `export function canCreateTask(project, userId, rawTitle) {\n  if (!project || project.ownerId !== userId) return { ok: false, error: "forbidden" };\n  const title = rawTitle.trim();\n  if (!title) return { ok: false, error: "title_required" };\n  return { ok: true, title };\n}\n`,
            },
          ],
          [
            { fileId: "js", contains: ["forbidden", "trim", "title_required"] },
          ],
          {
            hintUk: "Пакет M8 містить реальний локальний сценарій розв'язання конфлікту та набір тестів, які падають при втраті однієї зі сторін.",
            hintEn: "The M8 local lab includes real conflicted code + automated checks that fail if either side's fix is dropped.",
          },
        ),
      ], { baseXp: 45 },
    ),
    exam("gw-rr-exam", "Контрольна: відновлення і реліз", "Checkpoint: Recovery & Release", 4, [
      mcq(
        "gw-rr-e1",
        "Який тег і артефакт фіксують точний стан коду для відтворюваного релізу?",
        "What identifies an exact immutable release revision in Git?",
        ["Анотований / підписаний тег (напр. `v1.4.0`) на точному commit SHA", "Скриншот робочого столу", "Назва локальної папки Downloads", "Оновлена дата в Word-файлі"],
        0,
      ),
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
