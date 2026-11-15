import type { CourseContent, LessonContent, UnitContent } from "../types.js";
import { expandCourse, sectionUnit, teachLesson } from "./factory.js";

export const newUnits: UnitContent[] = [
  sectionUnit(
    "gw_worktrees_bisect",
    "Кілька робочих дерев, bisect і rerere",
    "Multiple worktrees, bisect, and rerere",
    [
      {
        slug: "gw-worktree-parallel",
        titleUk: "git worktree: друга гілка без другої клону-копії всього репо",
        titleEn: "git worktree: a second branch without a second full clone",
        difficulty: 3,
        pointsUk: ["Worktree ділить об'єкти, не дублює клон", "Одна гілка — в одному дереві", "Прибирайте через worktree remove"],
        pointsEn: ["A worktree shares objects, it does not duplicate the clone", "One branch is in one tree", "Remove with worktree remove"],
        conceptUk: "Коли треба одночасно тримати фікс на main і фічу на іншій гілці, другий `git clone` дублює об'єкти й налаштування. `git worktree add ../app-hotfix hotfix/42` додає робоче дерево, що ділить той самий `.git`: коміти, fetch і об'єкти спільні, а робочі файли окремі. Одна гілка не може бути checkout у двох деревах одночасно. Прибирайте дерево через `git worktree remove`, не просто rm — інакше лишаться метадані. Worktree зручний для довгого рев'ю чи запуску старої версії поруч. Не комітьте секрети в одному дереві, вважаючи, що інше їх не бачить: історія спільна.",
        conceptEn: "When you need a fix on main and a feature on another branch at the same time, a second `git clone` duplicates objects and settings. `git worktree add ../app-hotfix hotfix/42` adds a working tree that shares the same `.git`: commits, fetches, and objects are shared, the working files are separate. The same branch cannot be checked out in two trees at once. Remove a tree with `git worktree remove`, not a raw rm — otherwise metadata remains. A worktree is convenient for a long review or running an old version alongside. Do not commit secrets in one tree thinking the other cannot see them: the history is shared.",
        code: "git worktree add ../app-hotfix hotfix/42\n# later: git worktree remove ../app-hotfix",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Чому не варто git clone всього монорепо лише щоб перевірити hotfix поруч із фічею?", promptEn: "Why not git clone a whole monorepo just to check a hotfix next to a feature?", options: ["другий клон дублює об'єкти; worktree ділить той самий .git", "worktree забороняє hotfix", "клон не бачить remote", "hotfix не може бути гілкою"], correctIndex: 0, explanationUk: "Один об'єктний склад, кілька робочих тек.", explanationEn: "One object store, several working directories." },
          { kind: "fill", promptUk: "Допишіть команду другого робочого дерева", promptEn: "Fill in the command for a second working tree", language: "bash", code: "git ___ add ../app-hotfix hotfix/42", accepted: ["worktree"], caseSensitive: true, explanationUk: "git worktree add.", explanationEn: "git worktree add." },
          { kind: "read", promptUk: "Що буде, якщо в двох worktree checkout одну гілку?", promptEn: "What happens if two worktrees check out the same branch?", language: "bash", code: "git worktree add ../two main   # main already checked out here", options: ["Git відмовить: гілка вже взята в іншому дереві", "обидва дерева зіллють індекси автоматично", "історія роздвоїться назавжди", "remote зникне"], correctIndex: 0, explanationUk: "Одна гілка — одне дерево; для перегляду беріть detached або іншу гілку.", explanationEn: "One branch, one tree; for a look, use detached HEAD or another branch." }
        ],
        whyUk: "Як одночасно працювати над фічею і хотфіксом, не клонуючи репозиторій вдруге?",
        whyEn: "How do you work on a feature and a hotfix at once without cloning the repository a second time?",
        ideas: [{ labelUk: "worktree", labelEn: "worktree", anyOf: ["worktree", "робоч", "working", "клон", "clone"] }, { labelUk: "спільний .git", labelEn: "a shared .git", anyOf: [".git", "об'єкт", "object", "спільн", "shar"] }, { labelUk: "remove, не rm", labelEn: "remove, not rm", anyOf: ["remove", "rm", "метадан", "metadata", "гілка", "branch"] }],
        sampleUk: "Додають git worktree з окремою текою й гілкою, що ділить об'єкти одного .git, не роблять другий повний клон, не checkout ту саму гілку двічі й прибирають дерево через worktree remove.",
        sampleEn: "You add a git worktree with a separate folder and branch that shares one .git's objects, you do not make a second full clone, you do not check out the same branch twice, and you remove the tree with worktree remove.",
      },
      {
        slug: "gw-bisect-bug",
        titleUk: "git bisect: бінарний пошук коміту, що зламав тест",
        titleEn: "git bisect: a binary search for the commit that broke a test",
        difficulty: 3,
        pointsUk: ["Бінарний пошук між good і bad", "Автоматизація bisect run і skip для сміття", "Тест має бути детермінованим"],
        pointsEn: ["A binary search between good and bad", "Automation with bisect run, and skip for junk", "The test must be deterministic"],
        conceptUk: "Коли баг з'явився 'десь за місяць', лінійно дивитись 200 комітів довго. `git bisect start`, мітите поточний як `bad`, старий відомий добрий як `good`, Git ставить checkout на середину; ви ганяєте тест і кажете good/bad. За логарифмічну кількість кроків знаходиться перший поганий коміт — часто з одним логічним змістом, який легко рев'ювати. `git bisect run ./test.sh` автоматизує, якщо скрипт повертає 0/1. Непотрібні коміти (зламана збірка не через цей баг) — `skip`. Після пошуку `bisect reset`. Bisect працює чесно, коли тест детермінований: flake дасть хибний 'перший поганий'.",
        conceptEn: "When a bug appeared 'sometime this month', looking through 200 commits linearly takes long. `git bisect start`, you mark the current as `bad`, a known old good as `good`, Git checks out the midpoint; you run the test and say good/bad. In a logarithmic number of steps you find the first bad commit — often one logical change that is easy to review. `git bisect run ./test.sh` automates this if the script returns 0/1. Unusable commits (a broken build unrelated to this bug) are `skip`. After the search, `bisect reset`. Bisect is honest when the test is deterministic: a flake will give a false 'first bad'.",
        code: "git bisect start HEAD v2.4.0\ngit bisect run ./test-checkout.sh\ngit bisect reset",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Чому flake-тест у git bisect run небезпечний?", promptEn: "Why is a flaky test in git bisect run dangerous?", options: ["хибний good/bad зсуне 'перший поганий' на невинний коміт", "bisect не запускає скрипти", "skip тоді обов'язковий на кожному кроці", "reset видаляє remote"], correctIndex: 0, explanationUk: "Детермінований оракул — умова чесного пошуку.", explanationEn: "A deterministic oracle is required for an honest search." },
          { kind: "fill", promptUk: "Допишіть автоматичний прогін bisect", promptEn: "Fill in automatic bisect runs", language: "bash", code: "git bisect start HEAD v2.4.0 && git bisect ___ ./test-checkout.sh", accepted: ["run"], caseSensitive: true, explanationUk: "bisect run виконує скрипт на кожному кроці.", explanationEn: "bisect run executes the script at each step." },
          { kind: "read", promptUk: "Скільки кроків приблизно потрібно для 256 комітів?", promptEn: "About how many steps do 256 commits need?", language: "bash", code: "# interval length 256, binary search", options: ["близько 8 (лог2), не 256 лінійних перевірок", "рівно 256 завжди", "1, бо Git знає винний одразу", "0, без тестів"], correctIndex: 0, explanationUk: "Логарифм від довжини інтервалу.", explanationEn: "A logarithm of the interval length." }
        ],
        whyUk: "Як швидко знайти коміт, що зламав checkout, серед місяця історії?",
        whyEn: "How do you quickly find the commit that broke checkout in a month of history?",
        ideas: [{ labelUk: "bisect good/bad", labelEn: "bisect good/bad", anyOf: ["bisect", "good", "bad", "бінар", "binary"] }, { labelUk: "run і детермінований тест", labelEn: "run and a deterministic test", anyOf: ["run", "тест", "test", "flake", "детермін"] }, { labelUk: "skip і reset", labelEn: "skip and reset", anyOf: ["skip", "reset", "збірк", "build"] }],
        sampleUk: "Запускають git bisect між відомим good і поточним bad, краще bisect run з детермінованим тестом, сумнівні коміти skip, наприкінці reset; flake зсуне провину на невинний коміт.",
        sampleEn: "You start git bisect between a known good and the current bad, preferably bisect run with a deterministic test, you skip doubtful commits, and you reset at the end; a flake will shift the blame onto an innocent commit.",
      },
      {
        slug: "gw-rerere-conflicts",
        titleUk: "rerere: не розв'язувати той самий конфлікт утретє",
        titleEn: "rerere: do not resolve the same conflict a third time",
        difficulty: 3,
        pointsUk: ["Повторні однакові конфлікти підставляються з запису", "Завжди рев'юйте авторозв'язання", "Це не магія для унікальних чутливих конфліктів"],
        pointsEn: ["Repeated identical conflicts are filled from a record", "Always review an auto-resolution", "It is not magic for unique sensitive conflicts"],
        conceptUk: "Якщо гілку часто ребазите або зливаєте з main, одні й ті самі конфлікти повторюються. `rerere` (reuse recorded resolution) запам'ятовує, як ви розв'язали шматок, і підставляє це наступного разу. Вмикають `git config rerere.enabled true` (іноді rerere.autoupdate). Це економія часу, не ліцензія не дивитись: після автопідстановки перевірте diff і тести — контекст міг змінитись, старе розв'язання може бути вже неправильним. Записи живуть у `.git/rr-cache`. Не варто вмикати на репозиторії, де конфлікти майже завжди унікальні й чутливі, без звички рев'ювати результат.",
        conceptEn: "If you often rebase or merge a branch with main, the same conflicts repeat. `rerere` (reuse recorded resolution) remembers how you resolved a hunk and applies it next time. You turn it on with `git config rerere.enabled true` (sometimes rerere.autoupdate). That is a time saver, not a license to look away: after an auto-application, check the diff and the tests — the context may have changed, and the old resolution may now be wrong. Records live in `.git/rr-cache`. Do not turn it on in a repository where conflicts are almost always unique and sensitive, without a habit of reviewing the result.",
        code: "git config rerere.enabled true\n# after auto-apply: git diff && tests",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Що зробити після того, як rerere сам підставив розв'язання?", promptEn: "What should you do after rerere applies a resolution by itself?", options: ["переглянути diff і тести: контекст міг змінитись", "одразу push без погляду", "видалили rr-cache щоразу", "вимкнути rebase назавжди"], correctIndex: 0, explanationUk: "Запис може застаріти.", explanationEn: "The record can go stale." },
          { kind: "fill", promptUk: "Допишіть увімкнення rerere", promptEn: "Fill in enabling rerere", language: "bash", code: "git config ___ true", accepted: ["rerere.enabled"], caseSensitive: true, explanationUk: "rerere.enabled true.", explanationEn: "rerere.enabled true." },
          { kind: "read", promptUk: "Де зберігаються записані розв'язання?", promptEn: "Where are recorded resolutions stored?", language: "bash", code: "git config rerere.enabled true", options: ["у .git/rr-cache, локально в репозиторії", "на GitHub обов'язково", "у кожному коміті як blob повідомлення", "у INDEX_VERSION"], correctIndex: 0, explanationUk: "Це локальний кеш, не заміна рев'ю.", explanationEn: "It is a local cache, not a substitute for review." }
        ],
        whyUk: "Як не розв'язувати вручну той самий конфлікт на кожному rebase гілки, і не довіритись сліпо?",
        whyEn: "How do you avoid resolving the same conflict by hand on every rebase of a branch, without trusting blindly?",
        ideas: [{ labelUk: "rerere", labelEn: "rerere", anyOf: ["rerere", "recorded", "повтор", "repeat"] }, { labelUk: "рев'ю після авто", labelEn: "review after auto-apply", anyOf: ["рев", "review", "diff", "тест", "test", "контекст", "context"] }, { labelUk: "rr-cache", labelEn: "rr-cache", anyOf: ["rr-cache", "enabled", "локальн", "local"] }],
        sampleUk: "Вмикають rerere, щоб повторний однаковий конфлікт підставлявся з rr-cache, але після авторозв'язання завжди дивляться diff і тести, бо контекст міг змінитись.",
        sampleEn: "You enable rerere so a repeated identical conflict is filled from rr-cache, but after an auto-resolution you always look at the diff and the tests, because the context may have changed.",
      }
    ],
    "Контрольна: worktree і bisect",
    "Exam: worktree and bisect",
    [
      { promptUk: "git worktree відрізняється від другого clone тим, що…", promptEn: "git worktree differs from a second clone in that it…", options: ["ділить об'єкти одного .git", "дублює весь об'єктний склад", "дозволяє одну гілку в двох деревах", "не потребує remove"], correctIndex: 0, explanationUk: "Спільна історія, окремі файли.", explanationEn: "Shared history, separate files." },
      { promptUk: "Одна гілка в двох worktree…", promptEn: "The same branch in two worktrees is…", options: ["заборонена Git", "рекомендована", "зливає індекси", "видаляє remote"], correctIndex: 0, explanationUk: "Одна гілка — одне дерево.", explanationEn: "One branch, one tree." },
      { promptUk: "git bisect знаходить баг за…", promptEn: "git bisect finds a bug in…", options: ["логарифмічну кількість кроків між good і bad", "лінійний перегляд усіх комітів завжди", "один випадковий коміт", "rerere"], correctIndex: 0, explanationUk: "Бінарний пошук.", explanationEn: "A binary search." },
      { promptUk: "Flake у bisect run…", promptEn: "A flake in bisect run can…", options: ["вказати невинний коміт як перший поганий", "завжди бути корисним skip", "прискорити reset", "вимкнути good"], correctIndex: 0, explanationUk: "Потрібен детермінований тест.", explanationEn: "You need a deterministic test." },
      { promptUk: "Після авторозв'язання rerere варто…", promptEn: "After a rerere auto-resolution you should…", options: ["перевірити diff і тести", "одразу push", "видалити репо", "вимкнути enabled"], correctIndex: 0, explanationUk: "Контекст міг змінитись.", explanationEn: "The context may have changed." },
      { promptUk: "Дерево worktree прибирають через…", promptEn: "A worktree is removed with…", options: ["git worktree remove, не голий rm", "rm -rf .git основного репо", "git bisect reset", "git clone --mirror"], correctIndex: 0, explanationUk: "Інакше лишаться метадані.", explanationEn: "Otherwise metadata remains." }
    ],
  ),
  sectionUnit(
    "gw_signing_verify",
    "Підписи комітів і перевірка на сервері",
    "Commit signatures and server-side checks",
    [
      {
        slug: "gw-sign-commits",
        titleUk: "Підписаний коміт: авторство, яке можна перевірити, не лише рядок Author",
        titleEn: "A signed commit: authorship you can verify, not only an Author line",
        difficulty: 3,
        pointsUk: ["Підпис перевіряє ключ, поле Author — ні", "Теги релізів підписують завжди", "Підпис не замінює рев'ю коду"],
        pointsEn: ["A signature verifies a key, the Author field does not", "Release tags are always signed", "A signature does not replace a code review"],
        conceptUk: "Поле Author у коміті може поставити будь-хто з доступом до репо: це не криптографія. `git commit -S` (GPG або SSH-ключ) додає підпис, який `git log --show-signature` і GitHub/GitLab перевіряють проти відомого ключа. Тоді 'цей коміт від Анни' означає, що ключ Анни підписав вміст. Підписуйте теги релізів обов'язково. Втрачений або викладений ключ відкликають; новий ключ прив'язують до акаунта. Підпис не доводить, що код правильний — лише хто його засвідчив. Для команди зручний SSH signing (`user.signingkey` і `gpg.format ssh`), без окремого GPG-ритуалу.",
        conceptEn: "The Author field on a commit can be set by anyone with repo access: that is not cryptography. `git commit -S` (a GPG or SSH key) adds a signature that `git log --show-signature` and GitHub/GitLab verify against a known key. Then 'this commit is from Anna' means Anna's key signed the content. Always sign release tags. A lost or leaked key is revoked; a new key is bound to the account. A signature does not prove the code is correct — only who attested it. For a team, SSH signing (`user.signingkey` and `gpg.format ssh`) is convenient, without a separate GPG ritual.",
        code: "git config user.signingkey ~/.ssh/id_ed25519.pub\ngit config gpg.format ssh\ngit commit -S -m 'fix: checkout total'",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Чому можна не довіряти коміту з Author=anna@corp без підпису?", promptEn: "Why might you not trust a commit with Author=anna@corp and no signature?", options: ["будь-хто з push міг поставити це ім'я; підпис вимагає ключа Анни", "Git забороняє поле Author", "без підпису коміт не клонується", "GitHub завжди відхиляє непідписане"], correctIndex: 0, explanationUk: "Автор — рядок, підпис — криптографія.", explanationEn: "Author is a string, a signature is cryptography." },
          { kind: "fill", promptUk: "Допишіть прапорець підпису коміту", promptEn: "Fill in the commit-signing flag", language: "bash", code: "git commit ___ -m 'fix: checkout total'", accepted: ["-S", "-S -s"], caseSensitive: true, explanationUk: "commit -S підписує.", explanationEn: "commit -S signs." },
          { kind: "read", promptUk: "Що перевіряє підписаний тег v1.2.0?", promptEn: "What does a signed tag v1.2.0 verify?", language: "bash", code: "git tag -s v1.2.0 -m '1.2.0'", options: ["що власник ключа засвідчив саме цей коміт як реліз", "що в релізі немає CVE", "що CI вже пройшов за визначенням", "що Author збігається з тегом"], correctIndex: 0, explanationUk: "Засвідчення релізу ключем.", explanationEn: "An attestation of the release with a key." }
        ],
        whyUk: "Як зробити так, щоб реліз і важливі коміти не видавали себе лише рядком Author?",
        whyEn: "How do you make sure a release and important commits are not identified only by an Author line?",
        ideas: [{ labelUk: "підпис ключем", labelEn: "a key signature", anyOf: ["підпис", "sign", "-S", "gpg", "ssh", "ключ", "key"] }, { labelUk: "перевірка на сервері", labelEn: "verification on the server", anyOf: ["show-signature", "github", "verify", "перевір"] }, { labelUk: "теги релізів", labelEn: "release tags", anyOf: ["тег", "tag", "реліз", "release", "відклик", "revok"] }],
        sampleUk: "Підписують коміти й теги релізів ключем (SSH або GPG), сервер перевіряє підпис проти відомого ключа, втрачений ключ відкликають; рядок Author сам по собі не є доказом, і підпис не замінює рев'ю.",
        sampleEn: "You sign commits and release tags with a key (SSH or GPG), the server verifies the signature against a known key, a lost key is revoked; an Author line alone is not proof, and a signature does not replace a review.",
      },
      {
        slug: "gw-verify-server",
        titleUk: "Гілка захищена: потрібен підпис і статус CI, не лише 'хтось натиснув Merge'",
        titleEn: "A protected branch: a signature and a CI status, not only 'someone clicked Merge'",
        difficulty: 3,
        pointsUk: ["Політика на сервері, бо --no-verify обходить хук", "Required checks, підписи, заборона force-push", "Обхід адміна — з журналом"],
        pointsEn: ["Policy on the server, because --no-verify skips a hook", "Required checks, signatures, no force-push", "An admin bypass is logged"],
        conceptUk: "Правила гілки на сервері (branch protection / rulesets) можуть вимагати: підписані коміти, зелені обов'язкові перевірки, рев'ю, заборону force-push і обходу через адміна без журналу. Локальний хук легко вимкнути (`--no-verify`), тому політика 'лише хук на ноутбуці' не захищає main. Секретні правила узгоджують із break-glass: адмінський обхід логується. Підпис + required status не замінює людське рев'ю складних змін, але відсікає випадковий прямий push і непідписану історію. Для форків уважно налаштуйте, з якого контексту беруться CI-секрети.",
        conceptEn: "Branch rules on the server (branch protection / rulesets) can require: signed commits, green required checks, a review, a ban on force-push, and no admin bypass without a journal. A local hook is easy to skip (`--no-verify`), so a 'laptop hook only' policy does not protect main. Sensitive rules are aligned with break-glass: an admin bypass is logged. A signature + required status does not replace a human review of complex changes, but it stops a casual direct push and an unsigned history. For forks, carefully configure which context CI secrets come from.",
        code: "# ruleset on main: require signed commits, required status checks,\n# dismiss stale reviews, block force push, log admin bypass",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Чому pre-commit хук на ноутбуці недостатній, щоб захистити main?", promptEn: "Why is a laptop pre-commit hook not enough to protect main?", options: ["його можна обійти --no-verify або пушем з іншої машини; правило має бути на сервері", "хуки завжди дублюються на GitHub самі", "main не можна захистити", "CI ігнорує rulesets"], correctIndex: 0, explanationUk: "Довіра — на сервері.", explanationEn: "Trust sits on the server." },
          { kind: "fill", promptUk: "Допишіть прапорець, що обходить локальний хук", promptEn: "Fill in the flag that skips a local hook", language: "bash", code: "git commit --___ -m 'wip'", accepted: ["no-verify"], caseSensitive: true, explanationUk: "--no-verify пропускає хуки.", explanationEn: "--no-verify skips hooks." },
          { kind: "read", promptUk: "Яке правило найкорисніше проти випадкового git push --force на main?", promptEn: "Which rule is most useful against an accidental git push --force to main?", language: "bash", code: "git push --force origin main", options: ["заборона force-push на захищеній гілці на сервері", "лише коментар у CONTRIBUTING", "локальний alias без серверного правила", "підпис без ruleset"], correctIndex: 0, explanationUk: "Сервер відхилить force.", explanationEn: "The server will reject the force." }
        ],
        whyUk: "Як захистити main від непідписаного коміту і force-push, якщо хук можна обійти?",
        whyEn: "How do you protect main from an unsigned commit and a force-push if a hook can be skipped?",
        ideas: [{ labelUk: "правила на сервері", labelEn: "rules on the server", anyOf: ["protection", "ruleset", "сервер", "server", "main"] }, { labelUk: "підпис і CI", labelEn: "a signature and CI", anyOf: ["підпис", "sign", "status", "ci", "рев", "review"] }, { labelUk: "не лише хук", labelEn: "not only a hook", anyOf: ["no-verify", "хук", "hook", "force"] }],
        sampleUk: "Ставлять на сервері захист гілки: обов'язкові підписи, зелені перевірки, рев'ю й заборона force-push, обхід адміна логується; локальний хук із --no-verify цього не замінює.",
        sampleEn: "You put branch protection on the server: required signatures, green checks, a review, and no force-push, with a logged admin bypass; a local hook with --no-verify does not replace that.",
      },
      {
        slug: "gw-signed-trail",
        titleUk: "Верифікована історія: rebase підписаного коміту потребує нового підпису",
        titleEn: "A verified history: rebasing a signed commit needs a new signature",
        difficulty: 3,
        pointsUk: ["Новий об'єкт після rebase потребує нового підпису", "Увімкніть gpgSign для rebase/amend", "Старі коміти після ротації ключа можуть бути unverified"],
        pointsEn: ["A new object after a rebase needs a new signature", "Turn on gpgSign for rebase/amend", "Old commits after a key rotation may be unverified"],
        conceptUk: "Підпис стосується конкретного вмісту коміту (дерево, батьки, повідомлення). `rebase`, `commit --amend`, `cherry-pick` створюють новий об'єкт — старий підпис не переноситься сам, потрібен `-S` (або `git rebase --exec` / `commit.gpgSign`). Інакше після 'чистки історії' на захищеній гілці push відхилять як unverified. Навчіть команду підписувати інтерактивний rebase. Не 'відновлюйте' підпис, змінюючи лише дату без ключа — це вже інший коміт. Перевірка `allowed_signers` / verified badge має використовувати актуальні ключі; після ротації старі коміти можуть показувати unverified — це очікувано, їх не переписують без потреби.",
        conceptEn: "A signature covers the exact commit content (tree, parents, message). `rebase`, `commit --amend`, and `cherry-pick` create a new object — the old signature does not carry over by itself, you need `-S` (or `git rebase --exec` / `commit.gpgSign`). Otherwise, after 'cleaning history' on a protected branch, the push is rejected as unverified. Teach the team to sign during an interactive rebase. Do not 'restore' a signature by changing only the date without the key — that is already a different commit. Verification with `allowed_signers` / a verified badge must use current keys; after a rotation, old commits may show unverified — that is expected, and you do not rewrite them without a need.",
        code: "git config commit.gpgSign true\ngit rebase origin/main   # each rewritten commit is signed again",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Чому після rebase без -S захищена гілка відхилила push?", promptEn: "Why did a protected branch reject a push after a rebase without -S?", options: ["нові коміти не підписані: старий підпис не переходить на новий хеш", "rebase завжди зберігає підпис", "сервер не вміє verified", "потрібен --no-verify"], correctIndex: 0, explanationUk: "Підпис прив'язаний до хешу коміту.", explanationEn: "The signature is bound to the commit hash." },
          { kind: "fill", promptUk: "Допишіть опцію завжди підписувати коміти", promptEn: "Fill in the option to always sign commits", language: "bash", code: "git config commit.gpg___ true", accepted: ["Sign"], caseSensitive: true, explanationUk: "commit.gpgSign true підписує і rebase, і commit.", explanationEn: "commit.gpgSign true signs both rebase and commit." },
          { kind: "read", promptUk: "Чи треба переписувати річну історію після ротації ключа, щоб badge знову був зелений?", promptEn: "Do you need to rewrite a year of history after a key rotation so the badge is green again?", language: "bash", code: "# old commits: unverified after key rotation", options: ["зазвичай ні: старі підписи очікувано не збігаються з новим ключем; перепис дорого й ламає хеші", "так, завжди rewrite усього main", "так, змінити лише дату", "badge ігнорує ключі"], correctIndex: 0, explanationUk: "Не переписуйте минуле заради бейджа.", explanationEn: "Do not rewrite the past for a badge." }
        ],
        whyUk: "Як підписувати коміти так, щоб rebase на захищену гілку не ламав verified?",
        whyEn: "How do you sign commits so a rebase onto a protected branch does not break verified?",
        ideas: [{ labelUk: "новий підпис на новий об'єкт", labelEn: "a new signature on the new object", anyOf: ["rebase", "amend", "новий", "new", "хеш", "hash"] }, { labelUk: "gpgSign", labelEn: "gpgSign", anyOf: ["gpgSign", "-S", "exec", "завжди", "always"] }, { labelUk: "не переписувати заради ротації", labelEn: "do not rewrite for a rotation", anyOf: ["ротац", "rotation", "unverified", "історі", "history"] }],
        sampleUk: "Умикають commit.gpgSign, щоб rebase й amend отримували новий підпис на новий об'єкт, інакше захищена гілка відхилить unverified; після ротації ключа старі коміти не переписують лише заради бейджа.",
        sampleEn: "You turn on commit.gpgSign so rebase and amend get a new signature on the new object, otherwise the protected branch rejects unverified; after a key rotation you do not rewrite old commits only for a badge.",
      }
    ],
    "Контрольна: підписи",
    "Exam: signatures",
    [
      { promptUk: "Поле Author без підпису…", promptEn: "An Author field without a signature is…", options: ["лише рядок, який можна підробити", "криптографічний доказ", "заміна ruleset", "обов'язковий GPG"], correctIndex: 0, explanationUk: "Потрібен підпис ключем.", explanationEn: "You need a key signature." },
      { promptUk: "Теги релізів варто…", promptEn: "Release tags should be…", options: ["підписувати завжди", "ніколи не підписувати", "заміняти полем Author", "пушити --no-verify"], correctIndex: 0, explanationUk: "Засвідчення релізу.", explanationEn: "An attestation of the release." },
      { promptUk: "Локальний хук як єдиний захист main…", promptEn: "A local hook as the only protection of main is…", options: ["слабкий через --no-verify; потрібні правила сервера", "достатній завжди", "сильніший за ruleset", "заміна підпису"], correctIndex: 0, explanationUk: "Політика на сервері.", explanationEn: "Policy on the server." },
      { promptUk: "Force-push на захищений main…", promptEn: "A force-push to a protected main should be…", options: ["відхилений правилом сервера", "дозволений усім", "заміна CI", "підписаний автоматично"], correctIndex: 0, explanationUk: "Заборона force-push.", explanationEn: "A force-push ban." },
      { promptUk: "Rebase підписаного коміту…", promptEn: "Rebasing a signed commit…", options: ["створює новий об'єкт, потрібен новий підпис", "зберігає старий підпис завжди", "вимикає gpgSign", "не змінює хеш"], correctIndex: 0, explanationUk: "Підпис прив'язаний до хешу.", explanationEn: "The signature is bound to the hash." },
      { promptUk: "Перепис річної історії після ротації ключа…", promptEn: "Rewriting a year of history after a key rotation is…", options: ["зазвичай непотрібний і небезпечний", "обов'язковий для verified badge", "єдиний спосіб відкликати ключ", "заміна allowed_signers"], correctIndex: 0, explanationUk: "Старі коміти можуть лишитись unverified.", explanationEn: "Old commits may stay unverified." }
    ],
  ),
  sectionUnit(
    "gw_large_repos",
    "Великі репозиторії: sparse, LFS, підмодулі",
    "Large repositories: sparse checkout, LFS, and submodules",
    [
      {
        slug: "gw-sparse-partial",
        titleUk: "Не клонувати весь монорепо, якщо потрібна одна служба",
        titleEn: "Do not clone a whole monorepo when you need one service",
        difficulty: 3,
        pointsUk: ["Partial clone відкладає blobs", "Sparse-checkout обмежує робочі теки", "Не забудьте спільні залежності в наборі тек"],
        pointsEn: ["A partial clone defers blobs", "Sparse-checkout limits working folders", "Do not forget shared dependencies in the folder set"],
        conceptUk: "Великий монорепо важкий на диску й у checkout. `git clone --filter=blob:none` (partial clone) відкладає вміст файлів, доки він не потрібен; `sparse-checkout` обмежує робоче дерево теками (`git sparse-checkout set services/checkout`). Разом розробник отримує історію й файли лише своєї служби. CI теж виграє. Є нюанси: деякі команди (blame на старих файлах) докачують об'єкти; не виставляйте sparse так, щоб забути спільну бібліотеку, від якої служба залежить. Документуйте в README, які теки обов'язкові. `filter=blob:none` не замінює домовленості про розмір артефактів у Git.",
        conceptEn: "A large monorepo is heavy on disk and at checkout. `git clone --filter=blob:none` (a partial clone) defers file contents until they are needed; `sparse-checkout` limits the working tree to folders (`git sparse-checkout set services/checkout`). Together a developer gets history and the files of their service only. CI wins too. There are caveats: some commands (blame on old files) fetch objects later; do not set sparse so that you forget a shared library the service depends on. Document in the README which folders are mandatory. `filter=blob:none` does not replace an agreement about artifact size in Git.",
        code: "git clone --filter=blob:none --sparse git@g:org/mono.git\ncd mono && git sparse-checkout set services/checkout packages/ui",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Що робить git clone --filter=blob:none?", promptEn: "What does git clone --filter=blob:none do?", options: ["завантажує історію, а вміст файлів — за потреби, не весь монорепо одразу", "видаляє всю історію", "замінює LFS", "вимикає sparse-checkout"], correctIndex: 0, explanationUk: "Partial clone економіть місце й час.", explanationEn: "A partial clone saves space and time." },
          { kind: "fill", promptUk: "Допишіть обмеження робочого дерева теками", promptEn: "Fill in limiting the working tree to folders", language: "bash", code: "git ___-checkout set services/checkout packages/ui", accepted: ["sparse"], caseSensitive: true, explanationUk: "git sparse-checkout set.", explanationEn: "git sparse-checkout set." },
          { kind: "read", promptUk: "Чому sparse лише на services/checkout може зламати збірку?", promptEn: "Why can sparse only on services/checkout break the build?", language: "bash", code: "git sparse-checkout set services/checkout  # app imports packages/ui", options: ["немає спільної бібліотеки в дереві; її треба додати до набору", "Git забороняє кілька тек", "filter видаляє package.json", "checkout не компілюється без усього монорепо за визначенням"], correctIndex: 0, explanationUk: "Залежності мають входити в sparse-набір.", explanationEn: "Dependencies must be in the sparse set." }
        ],
        whyUk: "Як клонувати монорепо так, щоб локально були лише checkout і його бібліотеки?",
        whyEn: "How do you clone a monorepo so that locally you only have checkout and its libraries?",
        ideas: [{ labelUk: "partial clone", labelEn: "a partial clone", anyOf: ["filter", "blob:none", "partial", "клон", "clone"] }, { labelUk: "sparse-checkout", labelEn: "sparse-checkout", anyOf: ["sparse", "set", "теки", "folders"] }, { labelUk: "спільні пакети в наборі", labelEn: "shared packages in the set", anyOf: ["спільн", "shared", "packages/ui", "залеж", "depend"] }],
        sampleUk: "Клонують із --filter=blob:none і ставлять sparse-checkout на теку служби плюс спільні бібліотеки, щоб не тягнути весь монорепо і не зламати збірку відсутнім пакетом.",
        sampleEn: "You clone with --filter=blob:none and you set sparse-checkout to the service folder plus shared libraries, so you do not pull the whole monorepo and you do not break the build with a missing package.",
      },
      {
        slug: "gw-lfs-binaries",
        titleUk: "Git LFS: великі бінарники не в звичайному коміті",
        titleEn: "Git LFS: large binaries do not belong in a regular commit",
        difficulty: 3,
        pointsUk: ["LFS зберігає вказівник, файл — окремо", ".gitattributes комітять; потрібен git-lfs на клоні", "Старі blob без migrate лишаються; артефакти збірки — у реєстрі"],
        pointsEn: ["LFS stores a pointer, the file lives elsewhere", "You commit .gitattributes; clones need git-lfs", "Old blobs remain without migrate; build artifacts go in a registry"],
        conceptUk: "Git погано зберігає великі бінарники: кожна зміна — повний новий blob, клон росте, diff марний. Git LFS тримає в коміті вказівник, а файл — у сховищі LFS. `git lfs track '*.psd'` записує правило в `.gitattributes` (його треба закомітити). Нові клони потребують git-lfs; без нього залишаться вказівники-заглушки. Міграція вже закомічених бінарників — окрема історія (`lfs migrate`), інакше старі blob лишаться. LFS не є бекапом дисків і має квоти; не кладіть туди секрети. Для збірок артефакти краще в реєстрі пакетів, не в LFS 'назавжди'.",
        conceptEn: "Git stores large binaries poorly: every change is a full new blob, the clone grows, the diff is useless. Git LFS keeps a pointer in the commit and the file in an LFS store. `git lfs track '*.psd'` writes a rule into `.gitattributes` (you must commit it). New clones need git-lfs; without it you are left with pointer stubs. Migrating binaries already committed is a separate story (`lfs migrate`), otherwise the old blobs remain. LFS is not a disk backup and has quotas; do not put secrets there. For builds, artifacts belong in a package registry, not in LFS 'forever'.",
        code: "git lfs track '*.psd'\ngit add .gitattributes\ngit commit -m 'track PSD in LFS'",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Що отримає колега без git-lfs після клону репо з відео в LFS?", promptEn: "What will a colleague without git-lfs get after cloning a repo with videos in LFS?", options: ["текстові вказівники-заглушки, не самі файли", "повні відео автоматично", "помилку SSH завжди", "порожню історію"], correctIndex: 0, explanationUk: "Потрібен клієнт LFS.", explanationEn: "The LFS client is required." },
          { kind: "fill", promptUk: "Допишіть файл правил відстеження LFS", promptEn: "Fill in the LFS tracking-rules file", language: "bash", code: "git lfs track '*.psd'   # writes ___", accepted: [".gitattributes"], caseSensitive: true, explanationUk: "Правила живуть у .gitattributes.", explanationEn: "Rules live in .gitattributes." },
          { kind: "read", promptUk: "Чому git lfs track після року комітів ISO не зменшить клон одразу?", promptEn: "Why will git lfs track after a year of ISO commits not shrink the clone at once?", language: "bash", code: "git lfs track '*.iso' && git add .gitattributes", options: ["старі blob уже в історії; потрібен lfs migrate (або подібне) й узгоджена переписка", "LFS завжди переписує минуле сам", "ISO не підтримується", "досить видалити .git"], correctIndex: 0, explanationUk: "Track діє на нові коміти.", explanationEn: "Track applies to new commits." }
        ],
        whyUk: "Як додати макети PSD у репозиторій, не роздуваючи клон на кілобайти кожного шару?",
        whyEn: "How do you add PSD mockups to a repository without bloating the clone with every layer change?",
        ideas: [{ labelUk: "Git LFS", labelEn: "Git LFS", anyOf: ["lfs", "вказівник", "pointer", "бінар", "binar"] }, { labelUk: ".gitattributes", labelEn: ".gitattributes", anyOf: ["gitattributes", "track", "*.psd"] }, { labelUk: "не артефакти збірки назавжди", labelEn: "not build artifacts forever", anyOf: ["migrate", "реєстр", "registry", "секрет", "secret", "квот", "quota"] }],
        sampleUk: "Відстежують *.psd через git lfs track і комітять .gitattributes, колеги ставлять git-lfs; уже закомічені бінарники мігрують окремо, а артефакти збірки краще тримати в реєстрі, не в LFS назавжди.",
        sampleEn: "You track *.psd with git lfs track and you commit .gitattributes, colleagues install git-lfs; binaries already committed are migrated separately, and build artifacts are better kept in a registry, not in LFS forever.",
      },
      {
        slug: "gw-submodule-pitfall",
        titleUk: "Підмодулі: фіксований коміт, не 'остання main чужого репо'",
        titleEn: "Submodules: a pinned commit, not 'the latest main of someone else's repo'",
        difficulty: 3,
        pointsUk: ["Підмодуль — пін коміту, його треба init", "Оновлення — коміт вказівника в батьку", "Часто кращий пакет або монорепо"],
        pointsEn: ["A submodule is a commit pin, and it needs init", "An update is a pointer commit in the parent", "A package or a monorepo is often better"],
        conceptUk: "Підмодуль записує в батьківському репо конкретний коміт іншого репозиторію. Клон без `--recurse-submodules` і без `git submodule update --init` дає порожню теку й зламану збірку — це найчастіша скарга. Оновлення — зміна вказівника й коміт у батьку, не 'просто pull усередині' без запису. Підмодуль на гілку, що рухається, без піна, робить збірку невідтворюваною. Альтернативи: пакет у реєстрі, subtree, або монорепо. Для рідкісного вендору підмодуль прийнятний, якщо CI завжди ініціалізує його й README пояснює команди. Не кладіть у підмодуль секрети й не очікуйте, що rebase батька сам розв'яже конфлікти вказівника.",
        conceptEn: "A submodule records in the parent repo a concrete commit of another repository. A clone without `--recurse-submodules` and without `git submodule update --init` gives an empty folder and a broken build — that is the most common complaint. An update is a change of the pointer and a commit in the parent, not 'just a pull inside' with no record. A submodule on a moving branch with no pin makes the build unreproducible. Alternatives: a package in a registry, a subtree, or a monorepo. For a rare vendor a submodule is acceptable if CI always initializes it and the README explains the commands. Do not put secrets in a submodule, and do not expect a parent rebase to resolve pointer conflicts by itself.",
        code: "git clone --recurse-submodules git@g:org/app.git\n# after vendor bump: git add vendor && git commit -m 'chore: vendor v2.1.0'",
        language: "bash",
        retrieval: [
          { kind: "mcq", promptUk: "Чому після звичайного git clone збірка каже 'folder vendor is empty'?", promptEn: "Why after a plain git clone does the build say 'folder vendor is empty'?", options: ["підмодуль не ініціалізовано: потрібні --recurse-submodules або submodule update --init", "підмодулі завжди порожні за дизайном", "clone видаляє vendor", "вказівник не існує в Git"], correctIndex: 0, explanationUk: "Клон за замовчуванням не заповнює підмодулі.", explanationEn: "A clone does not fill submodules by default." },
          { kind: "fill", promptUk: "Допишіть ініціалізацію підмодулів", promptEn: "Fill in initializing submodules", language: "bash", code: "git submodule update --___ --recursive", accepted: ["init"], caseSensitive: true, explanationUk: "update --init завантажує піни.", explanationEn: "update --init fetches the pins." },
          { kind: "read", promptUk: "Що треба закомітити після оновлення вендора до нового тегу?", promptEn: "What must you commit after updating a vendor to a new tag?", language: "bash", code: "cd vendor && git fetch && git checkout v2.1.0 && cd ..", options: ["новий SHA вказівника підмодуля в батьківському репо", "нічого: батько підхопить тег сам", "лише тег у повідомленні без зміни дерева", "видалення .gitmodules"], correctIndex: 0, explanationUk: "Батько зберігає SHA.", explanationEn: "The parent stores the SHA." }
        ],
        whyUk: "Як підключити вендорський репозиторій, щоб CI й нові клони бачили той самий коміт?",
        whyEn: "How do you attach a vendor repository so CI and new clones see the same commit?",
        ideas: [{ labelUk: "пін коміту", labelEn: "a commit pin", anyOf: ["підмодул", "submodule", "пін", "pin", "коміт", "commit", "sha"] }, { labelUk: "init у клоні й CI", labelEn: "init in the clone and in CI", anyOf: ["init", "recurse", "порожн", "empty"] }, { labelUk: "коміт вказівника", labelEn: "a pointer commit", anyOf: ["вказівник", "pointer", "батьк", "parent", "оновл", "update"] }],
        sampleUk: "Підмодуль пінить конкретний SHA, CI і клон роблять update --init (або recurse), оновлення вендора комітять як новий вказівник у батьку; без init тека порожня, а рухома гілка без піна ламає відтворюваність.",
        sampleEn: "A submodule pins a concrete SHA, CI and the clone run update --init (or recurse), and a vendor update is committed as a new pointer in the parent; without init the folder is empty, and a moving branch with no pin breaks reproducibility.",
      }
    ],
    "Контрольна: великі репо",
    "Exam: large repos",
    [
      { promptUk: "--filter=blob:none означає…", promptEn: "--filter=blob:none means…", options: ["partial clone: вміст файлів за потреби", "видалення історії", "заміну LFS", "обов'язковий підмодуль"], correctIndex: 0, explanationUk: "Blobs докачуються пізніше.", explanationEn: "Blobs are fetched later." },
      { promptUk: "sparse-checkout без спільної бібліотеки…", promptEn: "sparse-checkout without a shared library can…", options: ["зламати збірку служби", "завжди бути повнішим за клон", "замінити package registry", "вимкнути LFS"], correctIndex: 0, explanationUk: "Залежності входять у набір тек.", explanationEn: "Dependencies belong in the folder set." },
      { promptUk: "Великі PSD у звичайному Git…", promptEn: "Large PSDs in regular Git…", options: ["роздувають клон; краще LFS", "дають ідеальний текстовий diff", "не потребують .gitattributes", "замінюють реєстр назавжди"], correctIndex: 0, explanationUk: "Вказівник у коміті, файл у LFS.", explanationEn: "A pointer in the commit, the file in LFS." },
      { promptUk: "Колега без git-lfs бачить…", promptEn: "A colleague without git-lfs sees…", options: ["заглушки-вказівники, не файли", "повні бінарники", "порожній git", "автоматичний migrate"], correctIndex: 0, explanationUk: "Потрібен клієнт LFS.", explanationEn: "The LFS client is required." },
      { promptUk: "Клон без init підмодуля дає…", promptEn: "A clone without submodule init gives…", options: ["порожню теку й зламану збірку", "завжди повний вендор", "автоматичний latest main", "підписаний тег"], correctIndex: 0, explanationUk: "--recurse-submodules або update --init.", explanationEn: "--recurse-submodules or update --init." },
      { promptUk: "Оновлення підмодуля записують як…", promptEn: "A submodule update is recorded as…", options: ["новий SHA вказівника, закомічений у батьку", "лише локальний pull без коміту батька", "зміну .gitattributes LFS", "filter=blob:none"], correctIndex: 0, explanationUk: "Батько пінить коміт.", explanationEn: "The parent pins the commit." }
    ],
  )
];

const insertions: Record<string, LessonContent[]> = {};

export function expandGitWorkflows(course: CourseContent): CourseContent {
  return expandCourse(course, insertions, newUnits);
}
