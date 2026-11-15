import { unit } from "../builders.js";
import { quiz, teach, why } from "./kit.js";

export const devsecopsGitops = unit(
  "devsecops-gitops",
  "DevSecOps і GitOps",
  "DevSecOps and GitOps",
  [
    teach("do-shift", "Перевірки до мержу", "Checks before the merge", 4, "do-shift", [
      {
        t: "match",
        uk: "Який інструмент що ловить.",
        en: "Which tool catches what.",
        pairs: [
          { left: "gitleaks", right: "Секрет, який ледь не потрапив у коміт" },
          { left: "Semgrep", right: "Підозрілий шаблон у коді" },
          { left: "Trivy", right: "Відома дірка в залежності або образі" },
          { left: "checkov", right: "Небезпечний шаблон у Terraform" },
        ],
      },
      {
        t: "mcq",
        uk: "SAST і DAST:",
        en: "SAST and DAST:",
        o: [
          "SAST читає код. DAST чіпає вже запущений додаток. Для forge-status у CI спершу SAST і залежності",
          "Це синоніми",
          "DAST замінює код-рев'ю людей завжди",
          "SAST працює лише на кластері вночі",
        ],
        i: 0,
      },
      {
        t: "mcq",
        uk: "Секрет у pre-commit і секрет уже в main:",
        en: "A secret at pre-commit versus a secret already on main:",
        o: [
          "Хук не пускає новий. Старий усе одно треба ротувати: хук історію не лікує",
          "Хук витирає історію сам",
          "Достатньо видалити файл новим комітом",
          "GitHub забуває blob",
        ],
        i: 0,
        note: why(
          "Політика OPA або Kyverno відсікає маніфест, який не проходить правило, ще до того як він стане pod.",
          "An OPA or Kyverno policy rejects a manifest that fails the rule before it becomes a pod.",
        ),
      },
      {
        t: "order",
        uk: "Порядок воріт для одного PR forge-status.",
        en: "Gate order for one forge-status pull request.",
        lang: "text",
        correct: ["gitleaks на коміті", "Тести", "Скан залежностей і образу", "Рев'ю людини"],
      },
    ]),
    teach("do-cosign", "Підпис і SBOM", "Signature and SBOM", 4, "do-cosign", [
      {
        t: "mcq",
        uk: "Навіщо cosign образу forge-status?",
        en: "Why cosign the forge-status image?",
        o: [
          "Кластер може прийняти лише образ, підпис якого зійшовся. Тег без підпису нічого не доводить",
          "Cosign замінює тести",
          "Cosign шифрує диск вузла",
          "Cosign вимикає Trivy",
        ],
        i: 0,
        note: why(
          "SBOM — список того, з чого зібраний образ. Без нього ви не знаєте, яка бібліотека всередині, коли виходить нова дірка.",
          "An SBOM is the list of what the image was built from. Without it you do not know which library is inside when a new hole is published.",
        ),
      },
      {
        t: "mcq",
        uk: "Digest і тег:",
        en: "A digest and a tag:",
        o: [
          "Тег можна пересунути на інший зліпок. Digest вказує на конкретні байти",
          "Це синоніми",
          "Digest змінюється при кожному pull",
          "Тег підписує байти сам",
        ],
        i: 0,
      },
      {
        t: "order",
        uk: "Від зібраного образу до дозволу на кластері.",
        en: "From a built image to permission on the cluster.",
        lang: "text",
        correct: ["Зібрати образ", "Підписати cosign", "Покласти SBOM поруч", "Пускати лише підписаний digest"],
      },
      {
        t: "mcq",
        uk: "Кластер, який тягне тег latest без перевірки підпису:",
        en: "A cluster that pulls latest with no signature check:",
        o: [
          "Запустить те, що зараз лежить під цим іменем, навіть якщо це не ваш зліпок",
          "Гарантовано безпечний",
          "Сам ротує секрети",
          "Не вміє Ingress",
        ],
        i: 0,
      },
    ]),
    teach("do-vault", "Секрети", "Secrets", 4, "do-vault", [
      {
        t: "mcq",
        uk: "Пароль бази forge-status не лежить у values.yaml відкритим текстом. Краще:",
        en: "The forge-status database password does not sit in values.yaml in clear text. Prefer:",
        o: [
          "Зовнішнє сховище і оператор, який кладе секрет у кластер, коли pod стартує",
          "Той самий пароль у Git, бо репозиторій приватний",
          "Змінну в Dockerfile ENV",
          "Коментар у Helm chart",
        ],
        i: 0,
      },
      {
        t: "mcq",
        uk: "Динамічний секрет бази відрізняється від статичного тим, що:",
        en: "A dynamic database secret differs from a static one because:",
        o: [
          "Його видають на час і він протухає. Витік одного pod не лишає вічний пароль",
          "Він ніколи не змінюється",
          "Його комітять",
          "Він замінює TLS",
        ],
        i: 0,
        note: why(
          "external-secrets читає Vault або Secrets Manager і створює Kubernetes Secret. sealed-secrets ховає маніфест так, що в Git немає відкритого пароля.",
          "external-secrets reads Vault or Secrets Manager and creates a Kubernetes Secret. sealed-secrets hides the manifest so Git has no clear password.",
        ),
      },
      {
        t: "match",
        uk: "Де живе секрет.",
        en: "Where the secret lives.",
        pairs: [
          { left: "Vault", right: "Сервіс із видачею і аудитом" },
          { left: "SOPS", right: "Файл у Git, зашифрований ключем" },
          { left: "Kubernetes Secret", right: "Те, що pod монтує. Не джерело правди" },
        ],
      },
      {
        t: "mcq",
        uk: "Ротація без простою означає:",
        en: "Rotation without downtime means:",
        o: [
          "Новий пароль починає діяти, старий ще приймають, поки поди не перечитали",
          "Усі поди вбивають одночасно",
          "Пароль міняють у Git і чекають тиждень",
          "Ротація вимикає додаток навмисно",
        ],
        i: 0,
      },
    ]),
    teach("do-argo", "Argo CD і відкат", "Argo CD and rollback", 5, "do-argo", [
      {
        t: "mcq",
        uk: "Чому доставку forge-status робить Argo CD, а не крок CI?",
        en: "Why does Argo CD deliver forge-status instead of a CI step?",
        o: [
          "Кластер сам підтягує те, що лежить у Git. CI лише поклав образ і, окремим комітом, новий тег",
          "CI має kubectl apply із ноутбука runner назавжди",
          "Argo CD збирає образ",
          "Git більше не джерело маніфестів",
        ],
        i: 0,
        note: why(
          "Розходження живого і Git Argo показує як OutOfSync. Відкат — це повернути коміт, а не шукати, хто щось застосував руками.",
          "Argo shows a gap between live and Git as OutOfSync. A rollback is returning a commit, not hunting who applied something by hand.",
        ),
      },
      {
        t: "order",
        uk: "Шлях тега 1.4.0 до подів.",
        en: "Path of tag 1.4.0 to the pods.",
        lang: "text",
        correct: [
          "CI пушить образ 1.4.0",
          "Коміт міняє tag у values",
          "Argo CD бачить коміт і синхронізує",
          "Нові поди стають Ready",
        ],
      },
      {
        t: "mcq",
        uk: "Canary в Argo Rollouts — це:",
        en: "A canary in Argo Rollouts is:",
        o: [
          "Мала частка трафіку на нову версію, поки метрики не підтвердять, що вона не гірша",
          "Повна заміна всіх подів одним кроком без метрик",
          "Інша назва CI",
          "Спосіб обійти підпис образу",
        ],
        i: 0,
      },
      {
        t: "mcq",
        uk: "Якщо після синхронізації 5xx зросли:",
        en: "If 5xx climb after the sync:",
        o: [
          "Зупинити розкат і повернути попередній коміт маніфесту. Образ зі старим тегом усе ще в registry",
          "Видалити Git",
          "Перебудувати образ під тим самим тегом",
          "Вимкнути алерти, щоб не заважали",
        ],
        i: 0,
      },
    ]),
    quiz("do-sec-exam", "Контроль: доставка", "Check: delivery", 5, "do-sec-exam", [
      {
        t: "mcq",
        uk: "Pull-модель GitOps означає:",
        en: "The GitOps pull model means:",
        o: [
          "Кластер читає Git. Не CI штовхає kubectl іззовні",
          "Розробник застосовує YAML з ноутбука",
          "Реєстр сам міняє репліки",
          "Логи є джерелом правди",
        ],
        i: 0,
      },
      {
        t: "mcq",
        uk: "ApplicationSet:",
        en: "An ApplicationSet:",
        o: [
          "Розводить кілька Application, наприклад по одному на середовище, з одного шаблону",
          "Збирає Docker-образ",
          "Заміна gitleaks",
          "Тип проби",
        ],
        i: 0,
      },
      {
        t: "fill",
        uk: "Інструмент підпису образу в цьому курсі.",
        en: "The image signing tool in this course.",
        lang: "text",
        code: "___",
        ok: ["cosign"],
      },
      {
        t: "mcq",
        uk: "Feature flag відрізняється від canary тим, що:",
        en: "A feature flag differs from a canary because:",
        o: [
          "Прапор вмикає поведінку в коді для частини людей. Canary ділить трафік між версіями зліпка",
          "Це одне і те саме",
          "Прапор живе лише в DNS",
          "Canary вимикає метрики",
        ],
        i: 0,
      },
      {
        t: "mcq",
        uk: "Міграція бази в цьому пайплайні:",
        en: "A database migration in this pipeline:",
        o: [
          "Окремий крок, сумісний зі старою версією коду, доки відкат ще можливий",
          "Ручний SQL у проді без запису",
          "Частина Dockerfile ENV",
          "Не потрібна ніколи",
        ],
        i: 0,
      },
      {
        t: "order",
        uk: "Відкат forge-status.",
        en: "Roll forge-status back.",
        lang: "text",
        correct: [
          "Побачити 5xx на новій версії",
          "Повернути попередній тег у Git",
          "Дочекатись синхронізації",
          "Перевірити, що сигнали повернулись",
        ],
      },
    ]),
  ],
);
