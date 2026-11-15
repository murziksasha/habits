import { unit } from "../builders.js";
import { quiz, teach, why } from "./kit.js";

/** forge-status starts as a Git repo before any server exists. */
export const gitWorkstation = unit(
  "git-workstation",
  "Робоче місце і Git",
  "Workstation and Git",
  [
    teach("do-ssh", "Ключі SSH", "SSH keys", 1, "do-ssh", [
      {
        t: "mcq",
        uk: "Куди кладуть приватний ключ для доступу до репозиторію forge-status?",
        en: "Where does the private key for the forge-status repo live?",
        o: [
          "Лише на вашій машині, файл не в Git",
          "У README, щоб команда скопіювала",
          "У публічному репозиторії поруч із кодом",
          "У коментарі першого коміту",
        ],
        i: 0,
        note: why(
          "Приватний ключ — секрет. У Git потрапляє щонайбільше публічний .pub.",
          "The private key is a secret. Git may hold the .pub file at most.",
        ),
      },
      {
        t: "fill",
        uk: "Команда, яка створює пару ключів.",
        en: "Command that creates a key pair.",
        lang: "bash",
        code: "___ -t ed25519 -C \"forge-status\"",
        ok: ["ssh-keygen"],
      },
      {
        t: "mcq",
        uk: "Навіщо файл ~/.ssh/config з Host forge?",
        en: "Why keep a Host forge block in ~/.ssh/config?",
        o: [
          "Коротке ім'я, користувач, ключ і порт в одному місці",
          "Він замінює git commit",
          "Він вимикає пароль sudo",
          "Він публікує образ у registry",
        ],
        i: 0,
      },
      {
        t: "mcq",
        uk: "Jump host у SSH — це:",
        en: "An SSH jump host is:",
        o: [
          "Проміжна машина, через яку ви доходите до внутрішньої",
          "Публічний DNS усієї компанії",
          "Заміна TLS-сертифіката",
          "Користувач root без ключа",
        ],
        i: 0,
      },
    ]),
    teach("do-git-objects", "Об'єкти Git", "Git objects", 1, "do-git-objects", [
      {
        t: "match",
        uk: "Зіставте об'єкт Git і те, що він зберігає.",
        en: "Match the Git object to what it stores.",
        pairs: [
          { left: "blob", right: "Вміст файлу" },
          { left: "tree", right: "Імена і посилання на blob/tree" },
          { left: "commit", right: "Автор, батьки і корінь tree" },
          { left: "tag", right: "Іменована мітка на коміт" },
        ],
      },
      {
        t: "mcq",
        uk: "Історія комітів — це:",
        en: "Commit history is:",
        o: [
          "DAG: коміт вказує на батьків, не на «наступний»",
          "Один лінійний файл без розгалужень",
          "Копія робочої теки на кожен коміт",
          "Лише повідомлення без вмісту файлів",
        ],
        i: 0,
        note: why(
          "Коміт знає батьків. Гілки — це рухомі вказівники на коміти.",
          "A commit knows its parents. A branch is a movable pointer to a commit.",
        ),
      },
      {
        t: "mcq",
        uk: "reflog потрібен, коли:",
        en: "You use reflog when:",
        o: [
          "Гілка зсунулась і старий коміт уже не видно в log",
          "Треба зібрати Docker-образ",
          "Треба відкрити порт 443",
          "Треба зашифрувати диск",
        ],
        i: 0,
      },
      {
        t: "read",
        uk: "Що лежить у .git/HEAD на гілці main?",
        en: "What does .git/HEAD hold while you are on main?",
        lang: "text",
        code: "ref: refs/heads/main",
        o: [
          "Ім'я поточної гілки, не сам коміт",
          "Повний diff останнього коміту",
          "Пароль від registry",
          "Список усіх blob у репозиторії",
        ],
        i: 0,
      },
    ]),
    teach("do-git-branch", "Гілка, PR, rebase", "Branch, PR, rebase", 2, "do-git-branch", [
      {
        t: "mcq",
        uk: "Для forge-status у цьому курсі гілки живуть так:",
        en: "For forge-status in this course, branches work like this:",
        o: [
          "Коротка feature-гілка, pull request, рев'ю, merge у main",
          "Окремий довгий релізний форк на кожну людину назавжди",
          "Коміти одразу в main без рев'ю",
          "Один коміт на весь модуль без гілок",
        ],
        i: 0,
      },
      {
        t: "mcq",
        uk: "git rebase вашої feature-гілки на свіжий main:",
        en: "git rebase of your feature branch onto fresh main:",
        o: [
          "Переписує ваші коміти поверх нового main",
          "Створює merge-коміт і лишає історію як є",
          "Видаляє remote назавжди",
          "Підписує коміти чужим ключем",
        ],
        i: 0,
        note: why(
          "Rebase вже опублікованої гілки, яку хтось тягне, ламає їм історію. Для своєї короткої гілки це звичайний спосіб.",
          "Rebasing a published branch that others pull rewrites their history. On your own short branch it is the usual tidy-up.",
        ),
      },
      {
        t: "order",
        uk: "Порядок одного циклу зміни.",
        en: "Order one change cycle.",
        lang: "bash",
        correct: ["git switch -c feat/health", "git add health.json", "git commit", "git push -u origin HEAD"],
      },
      {
        t: "mcq",
        uk: "cherry-pick бере:",
        en: "cherry-pick takes:",
        o: [
          "Один коміт і кладе його копію на поточну гілку",
          "Увесь remote разом із issues",
          "Лише файли з .gitignore",
          "Образ з registry",
        ],
        i: 0,
      },
    ]),
    teach("do-git-hooks", "Хуки і захист гілки", "Hooks and branch protection", 2, "do-git-hooks", [
      {
        t: "mcq",
        uk: "pre-commit на репозиторії forge-status має:",
        en: "The forge-status pre-commit hook should:",
        o: [
          "Запустити формат, lint і пошук секретів до коміту",
          "Задеплоїти кластер",
          "Купити домен",
          "Вимкнути branch protection",
        ],
        i: 0,
      },
      {
        t: "match",
        uk: "Зіставте файл і роль.",
        en: "Match the file to its job.",
        pairs: [
          { left: ".gitignore", right: "Не комітити секрети і сміття збірки" },
          { left: ".gitattributes", right: "Єдині кінці рядків і тип файлу" },
          { left: "CODEOWNERS", right: "Хто має схвалити теку" },
          { left: "commit-msg hook", right: "Перевірити форму повідомлення" },
        ],
      },
      {
        t: "mcq",
        uk: "Branch protection на main вимагає:",
        en: "Branch protection on main requires:",
        o: [
          "Рев'ю і зелені перевірки, прямий push закритий",
          "Лише красивий README",
          "Щоб кожен коміт був merge-комітом",
          "Вимкнений SSH",
        ],
        i: 0,
        note: why(
          "Підписаний коміт (SSH або GPG) показує, чий ключ його зробив. Захист гілки не пускає неперевірений код у main.",
          "A signed commit (SSH or GPG) shows which key made it. Branch protection keeps unchecked code off main.",
        ),
      },
      {
        t: "mcq",
        uk: "Секрет у коміті, який уже в origin:",
        en: "A secret that already landed on origin:",
        o: [
          "Вважайте скомпрометованим: ротація, потім прибрати з історії",
          "Достатньо нового коміту, який видаляє файл",
          "Достатньо .gitignore після факту",
          "Git сам забуває blob через годину",
        ],
        i: 0,
      },
    ]),
    quiz("do-git-exam", "Контроль: Git", "Check: Git", 2, "do-git-exam", [
      {
        t: "mcq",
        uk: "Що є вказівником, а не знімком файлів?",
        en: "Which one is a pointer, not a snapshot of files?",
        o: ["Ім'я гілки", "blob", "tree", "Повідомлення коміту"],
        i: 0,
      },
      {
        t: "mcq",
        uk: "Fast-forward merge можливий, коли:",
        en: "A fast-forward merge is possible when:",
        o: [
          "main не має своїх нових комітів після відгалуження",
          "Є конфлікт у кожному файлі",
          "Репозиторій без жодного коміту",
          "Увімкнено rebase для чужої опублікованої гілки",
        ],
        i: 0,
      },
      {
        t: "fill",
        uk: "Показати, куди рухався HEAD.",
        en: "Show where HEAD has been.",
        lang: "bash",
        code: "git ___",
        ok: ["reflog"],
      },
      {
        t: "mcq",
        uk: "git stash потрібен, щоб:",
        en: "git stash is for:",
        o: [
          "Сховати незакомічені правки і повернутись до них",
          "Опублікувати реліз",
          "Замінити CODEOWNERS",
          "Підписати тег чужим ключем",
        ],
        i: 0,
      },
      {
        t: "mcq",
        uk: "git worktree дає:",
        en: "git worktree gives you:",
        o: [
          "Другу теку того самого репозиторію на іншій гілці",
          "Новий віддалений сервер",
          "Шифрування blob",
          "Автоматичний деплой",
        ],
        i: 0,
      },
      {
        t: "order",
        uk: "Безпечний шлях секрету, який вже потрапив у main.",
        en: "Safe path after a secret reached main.",
        lang: "text",
        correct: [
          "Ротувати секрет у системі, де він діє",
          "Прибрати файл з історії",
          "Додати шаблон у .gitignore",
          "Повідомити команду",
        ],
      },
    ]),
  ],
);
