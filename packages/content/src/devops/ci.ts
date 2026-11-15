import { unit } from "../builders.js";
import { quiz, teach, why } from "./kit.js";

/** This unit stops when the image is in the registry. Delivery is a later unit. */
export const ci = unit("ci", "CI до образу", "CI through the image", [
  teach("do-cicd", "Три різні слова", "Three different words", 4, "do-cicd", [
    {
      t: "mcq",
      uk: "Для forge-status цей модуль закінчується так:",
      en: "For forge-status this unit ends like this:",
      o: [
        "Образ зібраний, просканований і лежить у registry. Запуск сервісу буде пізніше",
        "Сервіс уже крутиться на кластері",
        "Відкритий pull request у GitOps з новим тегом",
        "Зроблений rollback",
      ],
      i: 0,
      note: why(
        "Integration збирає і перевіряє. Delivery вміє викласти кандидат. Deployment сам міняє те, що бачать люди. Тут лише перше.",
        "Integration builds and checks. Delivery can ship a candidate. Deployment changes what people run. This unit is only the first.",
      ),
    },
    {
      t: "match",
      uk: "Зіставте слово і межу.",
      en: "Match the word to the boundary.",
      pairs: [
        { left: "Continuous Integration", right: "Коміт збирається і тести зелені" },
        { left: "Continuous Delivery", right: "Кандидат готовий, людину ще питають" },
        { left: "Continuous Deployment", right: "Кандидат сам стає тим, що працює" },
      ],
    },
    {
      t: "mcq",
      uk: "Незмінний артефакт — це:",
      en: "An immutable artifact is:",
      o: [
        "Той самий тег або digest, який ви вже перевірили. Його не перезбирають під іншим змістом",
        "Тег latest, який перезаписують щовечора",
        "Тека на ноутбуці автора",
        "Лог збірки",
      ],
      i: 0,
    },
    {
      t: "mcq",
      uk: "Trunk-based для цього репозиторію означає:",
      en: "Trunk-based for this repo means:",
      o: [
        "Короткі гілки, main завжди зібраний",
        "Довгі релізні гілки на квартал",
        "Заборона pull request",
        "Один коміт на місяць",
      ],
      i: 0,
    },
  ]),
  teach("do-gha", "GitHub Actions до push", "GitHub Actions through the push", 4, "do-gha", [
    {
      t: "read",
      uk: "Де закінчується цей workflow?",
      en: "Where does this workflow stop?",
      lang: "yaml",
      code: "jobs:\n  test:\n    steps: [lint, unit]\n  image:\n    needs: test\n    steps: [build, trivy, push]",
      o: [
        "На push образу після тестів і скану. Кроку, який міняє кластер, немає",
        "На рестарті продакшен-бази",
        "На листі клієнтам",
        "На terraform apply",
      ],
      i: 0,
      note: why(
        "jobs test і image можуть йти так, що image чекає test через needs. Паралельно мають іти лише ті кроки, які не залежать одні від одних.",
        "The image job waits for test through needs. Only steps that do not depend on each other run side by side.",
      ),
    },
    {
      t: "mcq",
      uk: "actions/cache для npm потрібен, щоб:",
      en: "actions/cache for npm exists so that:",
      o: [
        "Не качати ті самі залежності на кожному коміті",
        "Зберігати state Terraform",
        "Замінити тести",
        "Приховати вразливості Trivy",
      ],
      i: 0,
    },
    {
      t: "mcq",
      uk: "Matrix у workflow:",
      en: "A workflow matrix:",
      o: [
        "Той самий job на кількох версіях, наприклад двох версіях Python",
        "Один секрет на всі репозиторії організації без межі",
        "Заміна CODEOWNERS",
        "Список pod у кластері",
      ],
      i: 0,
    },
    {
      t: "order",
      uk: "Порядок job image.",
      en: "Order of the image job.",
      lang: "text",
      correct: ["Lint і тести зелені", "Зібрати образ", "Прогнати Trivy", "Push у registry"],
    },
  ]),
  teach("do-oidc", "OIDC замість довгого ключа", "OIDC instead of a long-lived key", 4, "do-oidc", [
    {
      t: "mcq",
      uk: "Чому OIDC кращий за довгий ключ хмари в GitHub Actions?",
      en: "Why does OIDC beat a long-lived cloud key in GitHub Actions?",
      o: [
        "GitHub отримує короткий токен під конкретний workflow. Ключ не лежить у секретах місяцями",
        "OIDC вимикає логи",
        "OIDC замінює Trivy",
        "Ключ у секреті ніколи не витікає, тому різниці немає",
      ],
      i: 0,
      note: why(
        "Довіра обмежена репозиторієм і гілкою. Чужий fork не має отримувати ту саму роль.",
        "Trust is limited to the repo and the branch. A stranger's fork must not receive the same role.",
      ),
    },
    {
      t: "mcq",
      uk: "GITHUB_TOKEN за замовчуванням:",
      en: "GITHUB_TOKEN by default:",
      o: [
        "Має лишатись із тими правами, які job справді потребує, не з write на все",
        "Це ключ AWS",
        "Живе вічно в бакеті",
        "Підписує образ cosign сам",
      ],
      i: 0,
    },
    {
      t: "mcq",
      uk: "Environment з required reviewer:",
      en: "An environment with a required reviewer:",
      o: [
        "Зупиняє job, доки людина не підтвердить. Сам запуск сервісу цим модулем не описується",
        "Автоматично міняє репліки",
        "Замінює branch protection",
        "Ховає результати тестів",
      ],
      i: 0,
    },
    {
      t: "fill",
      uk: "Секрети репозиторію не друкують у лог. Маска в GitHub зветься:",
      en: "Repo secrets must not print in the log. The GitHub control is a:",
      lang: "text",
      code: "___",
      ok: ["secret"],
    },
  ]),
  teach("do-jenkins", "GitLab і Jenkins оглядом", "GitLab and Jenkins, a survey", 4, "do-jenkins", [
    {
      t: "mcq",
      uk: "GitLab CI у цьому уроці треба впізнати за:",
      en: "You should recognise GitLab CI in this lesson by:",
      o: [
        "Файлом .gitlab-ci.yml, стадіями і runner. Збірка образу тут та сама межа, що й у Actions",
        "Обов'язковим Groovy на кожен крок",
        "Тим, що він замінює Git",
        "Тим, що в нього немає registry",
      ],
      i: 0,
    },
    {
      t: "mcq",
      uk: "Jenkins сьогодні варто знати як:",
      en: "Jenkins today is worth knowing as:",
      o: [
        "Controller, агенти і Jenkinsfile. Писати його в цьому курсі не будемо",
        "Єдиний CI, який вміє збирати образ",
        "Заміну Kubernetes",
        "Секрет-менеджер",
      ],
      i: 0,
      note: why(
        "Shared library в Jenkins — спосіб не копіювати Groovy. Цього досить, щоб читати чужий Jenkinsfile і не вигадувати свій.",
        "A Jenkins shared library is how teams stop copying Groovy. That is enough to read someone else's Jenkinsfile and not invent your own.",
      ),
    },
    {
      t: "match",
      uk: "Хто виконує job.",
      en: "Who runs the job.",
      pairs: [
        { left: "GitHub-hosted runner", right: "Машина GitHub на один job" },
        { left: "self-hosted runner", right: "Ваша машина, яку треба оновлювати" },
        { left: "GitLab runner", right: "Агент, зареєстрований у GitLab" },
        { left: "Jenkins agent", right: "Вузол, який бере збірку в controller" },
      ],
    },
    {
      t: "mcq",
      uk: "Цей модуль навмисно не містить:",
      en: "This unit deliberately does not contain:",
      o: [
        "Кроку, який міняє живий сервіс. Це зробить GitOps пізніше",
        "Lint",
        "Збірку образу",
        "Trivy",
      ],
      i: 0,
    },
  ]),
  quiz("do-ci-exam", "Контроль: CI", "Check: CI", 4, "do-ci-exam", [
    {
      t: "mcq",
      uk: "Після зеленого workflow forge-status ви маєте:",
      en: "After a green forge-status workflow you have:",
      o: [
        "Digest образу в registry",
        "Нові репліки на кластері",
        "Змінений Terraform state",
        "Лист клієнтам про простій",
      ],
      i: 0,
    },
    {
      t: "mcq",
      uk: "Reusable workflow потрібен, щоб:",
      en: "A reusable workflow exists so that:",
      o: [
        "Не копіювати одні й ті самі кроки в кожен репозиторій",
        "Обійти права GITHUB_TOKEN",
        "Зберігати приватний ключ",
        "Замінити код-рев'ю",
      ],
      i: 0,
    },
    {
      t: "order",
      uk: "Що відбувається на pull request.",
      en: "What happens on a pull request.",
      lang: "text",
      correct: ["Запустити lint і тести", "Не пушити образ із чужого fork", "Показати статус у PR", "Мержити лише зелене"],
    },
    {
      t: "mcq",
      uk: "Dependabot у GitHub:",
      en: "Dependabot on GitHub:",
      o: [
        "Відкриває PR, коли залежність застаріла або дірява",
        "Деплоїть кластер",
        "Замінює OIDC",
        "Пише Helm values",
      ],
      i: 0,
    },
    {
      t: "fill",
      uk: "Короткий токен від хмари в Actions починається з довіри:",
      en: "The short cloud token in Actions starts from trust called:",
      lang: "text",
      code: "___",
      ok: ["OIDC"],
    },
    {
      t: "mcq",
      uk: "Blue-green і canary:",
      en: "Blue-green and canary:",
      o: [
        "Назви стратегій заміни трафіку. Їхній інструмент буде в модулі доставки, не в цьому workflow",
        "Команди docker build",
        "Типи DNS-записів",
        "Режими cron",
      ],
      i: 0,
    },
  ]),
]);
