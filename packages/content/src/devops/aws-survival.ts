import { unit } from "../builders.js";
import { quiz, teach, why } from "./kit.js";

export const awsSurvival = unit(
  "aws-survival",
  "AWS без сюрпризу в рахунку",
  "AWS without a surprise bill",
  [
    teach("do-iam", "IAM і найменші права", "IAM and least privilege", 3, "do-iam", [
      {
        t: "mcq",
        uk: "Людина і програма в AWS ходять у хмару по-різному:",
        en: "A person and a program enter AWS differently:",
        o: [
          "Людина — користувач або SSO. Програма на EC2 — роль інстанса, не ключ у файлі",
          "Обидва тримають один access key у Git",
          "Програма логіниться паролем root акаунта",
          "Роль — це те саме, що група без політик",
        ],
        i: 0,
        note: why(
          "Політика JSON каже, які дії на яких ресурсах дозволені. Порожня зірочка на * — це не навчання, це дірка.",
          "A JSON policy says which actions are allowed on which resources. A star on everything is a hole, not a lesson.",
        ),
      },
      {
        t: "match",
        uk: "Зіставте сутність IAM.",
        en: "Match the IAM noun.",
        pairs: [
          { left: "User", right: "Довгоживуча особа або ключ людини" },
          { left: "Role", right: "Роль, яку хтось тимчасово бере" },
          { left: "Group", right: "Набір людей з одними політиками" },
          { left: "Policy", right: "Список дозволених дій" },
        ],
      },
      {
        t: "mcq",
        uk: "STS AssumeRole потрібен, щоб:",
        en: "STS AssumeRole exists so that:",
        o: [
          "Отримати короткі креденшали іншої ролі, зокрема в іншому акаунті",
          "Вимкнути CloudTrail",
          "Зробити бакет публічним",
          "Замінити VPC",
        ],
        i: 0,
      },
      {
        t: "mcq",
        uk: "Root-користувач акаунта:",
        en: "The account root user:",
        o: [
          "Лишається для кількох рідкісних дій і з MFA. Щоденна робота йде ролями",
          "Це логін для CI",
          "Його ключ лежить у репозиторії forge-status",
          "Він потрібен кожному pod",
        ],
        i: 0,
      },
    ]),
    teach("do-vpc", "VPC і групи безпеки", "VPC and security groups", 3, "do-vpc", [
      {
        t: "mcq",
        uk: "Публічна підмережа відрізняється від приватної тим, що:",
        en: "A public subnet differs from a private one because:",
        o: [
          "У таблиці маршрутів є шлях на Internet Gateway",
          "У ній немає security group",
          "Вона завжди в іншому регіоні",
          "У ній не буває EC2",
        ],
        i: 0,
      },
      {
        t: "mcq",
        uk: "Security group і NACL:",
        en: "A security group and a NACL:",
        o: [
          "Група безпеки — станна і на інтерфейсі. NACL — без стану, на підмережі",
          "Обидві без стану",
          "NACL замінює IAM",
          "Група безпеки фільтрує лише вихід і ніколи вхід",
        ],
        i: 0,
        note: why(
          "Дозволений вхідний TCP 443 у станній групі сам пускає відповідні пакети назад. У NACL зворотний трафік треба описати окремо.",
          "An allowed inbound TCP 443 on a stateful group lets the replies back. A NACL needs the return traffic written out.",
        ),
      },
      {
        t: "mcq",
        uk: "NAT Gateway у приватній підмережі:",
        en: "A NAT Gateway for a private subnet:",
        o: [
          "Дає вихід в інтернет без вхідних сесій з інтернету і коштує грошей навіть без трафіку",
          "Безкоштовний і обов'язковий у кожній лабі",
          "Замінює Internet Gateway для публічних адрес",
          "Ховає бакети S3",
        ],
        i: 0,
      },
      {
        t: "order",
        uk: "Щоб приватний інстанс сам вийшов у інтернет за оновленням.",
        en: "So a private instance can fetch updates.",
        lang: "text",
        correct: [
          "Internet Gateway на VPC",
          "Публічна підмережа з маршрутом на нього",
          "NAT Gateway у цій публічній підмережі",
          "Маршрут 0.0.0.0/0 із приватної підмережі на NAT",
        ],
      },
    ]),
    teach("do-s3", "EC2 і S3", "EC2 and S3", 3, "do-s3", [
      {
        t: "mcq",
        uk: "forge-status на одному EC2 у цьому модулі — це:",
        en: "forge-status on a single EC2 in this unit is:",
        o: [
          "Навчальний хост із роллю, security group і user data. Не фінальна схема на все життя",
          "Заміна Kubernetes назавжди",
          "Місце для root-ключа",
          "Публічний бакет зі статикою без політик",
        ],
        i: 0,
      },
      {
        t: "mcq",
        uk: "Бакет зі статикою forge-status:",
        en: "The bucket that holds forge-status static files:",
        o: [
          "Приватний. Назовні його віддає окремий доступ, не ACL «усім у світі»",
          "Публічний на читання, бо так простіше",
          "Без версій, щоб дешевше було помилятись",
          "З класом Glacier з першого дня, бо це дешево і сайт має відкриватись миттєво",
        ],
        i: 0,
        note: why(
          "Glacier — дешеве зберігання, з якого файл не відкривається як звичайна сторінка. Для сайту це не клас за замовчуванням.",
          "Glacier is cheap storage that does not serve a page like a normal object. It is not the default class for a site.",
        ),
      },
      {
        t: "match",
        uk: "Імена тієї самої ідеї в трьох хмарах.",
        en: "The same idea in three clouds.",
        pairs: [
          { left: "EC2", right: "Compute Engine / Virtual Machines" },
          { left: "S3", right: "Cloud Storage / Blob Storage" },
          { left: "IAM", right: "IAM / Entra RBAC" },
          { left: "VPC", right: "VPC / Virtual Network" },
        ],
      },
      {
        t: "mcq",
        uk: "EBS snapshot:",
        en: "An EBS snapshot:",
        o: [
          "Знімок диска в S3-подібне сховище AWS. Це не бекап бази з перевіркою відновлення",
          "Копія Git-репозиторію",
          "Сертифікат TLS",
          "Заміна security group",
        ],
        i: 0,
      },
    ]),
    teach("do-budget", "Бюджет і знесення", "Budget and teardown", 3, "do-budget", [
      {
        t: "mcq",
        uk: "Перший день у AWS для цього курсу:",
        en: "Day one in AWS for this course:",
        o: [
          "Бюджет із листом на пошту і список того, що ви знищите ввечері",
          "NAT, ALB і RDS Multi-AZ «щоб було як у вакансії»",
          "П'ять регіонів про запас",
          "Вимкнений білінг, бо free tier безмежний",
        ],
        i: 0,
        note: why(
          "Free tier не покриває NAT Gateway. Він тарифікується погодинно, навіть якщо інстанси вимкнені.",
          "The free tier does not cover a NAT Gateway. It bills per hour even when the instances are stopped.",
        ),
      },
      {
        t: "order",
        uk: "Кінець навчального вечора.",
        en: "End of a lab evening.",
        lang: "text",
        correct: [
          "Зупинити або знищити EC2, які самі піднімали",
          "Прибрати NAT і публічні адреси, які ви створювали",
          "Перевірити Cost Explorer або бюджет",
          "Записати, що лишилось навмисно",
        ],
      },
      {
        t: "mcq",
        uk: "Spot-інстанс:",
        en: "A Spot instance:",
        o: [
          "Дешевший і його можуть забрати. Не для єдиної копії бази",
          "Дорожчий за on-demand і вічний",
          "Безплатний завжди",
          "Не може мати роль IAM",
        ],
        i: 0,
      },
      {
        t: "mcq",
        uk: "Регіон і Availability Zone:",
        en: "A region and an Availability Zone:",
        o: [
          "Регіон — географія. Зони — окремі датацентри всередині, зі своїми підмережами",
          "Це синоніми",
          "Зона завжди в іншому акаунті",
          "Регіон не впливає на ціну",
        ],
        i: 0,
      },
    ]),
    quiz("do-aws-exam", "Контроль: AWS", "Check: AWS", 3, "do-aws-exam", [
      {
        t: "mcq",
        uk: "Ключ доступу в репозиторії forge-status:",
        en: "An access key inside the forge-status repo:",
        o: [
          "Вважайте світящим. Ротація і роль замість довгого ключа",
          "Норма для навчального акаунта",
          "Потрібен, щоб Terraform бачив акаунт з ноутбука назавжди",
          "Це публічна частина SSH",
        ],
        i: 0,
      },
      {
        t: "mcq",
        uk: "Приватна підмережа без маршруту назовні:",
        en: "A private subnet with no outbound route:",
        o: [
          "Інстанс не скачає пакет і не дійде до публічного API",
          "Інстанс сам стає публічним",
          "Security group це компенсує",
          "S3 у тому самому регіоні завжди відкритий без endpoint",
        ],
        i: 0,
      },
      {
        t: "fill",
        uk: "Команда, якою дивляться, хто ви зараз у CLI.",
        en: "The command that shows who the CLI is right now.",
        lang: "bash",
        code: "aws sts get-___",
        ok: ["caller-identity"],
      },
      {
        t: "mcq",
        uk: "CloudTrail у двох словах:",
        en: "CloudTrail in one line:",
        o: [
          "Журнал викликів API акаунта",
          "Балансувальник",
          "База Postgres",
          "CDN",
        ],
        i: 0,
      },
      {
        t: "mcq",
        uk: "GKE і AKS у таблиці цього уроку:",
        en: "GKE and AKS in this lesson's table:",
        o: [
          "Чужі імена для керованого Kubernetes. Глибина кластера буде пізніше, не тут",
          "Заміна S3",
          "Безкоштовні завжди",
          "Синонім security group",
        ],
        i: 0,
      },
      {
        t: "order",
        uk: "Перші кроки акаунта перед будь-яким NAT.",
        en: "First account steps before any NAT.",
        lang: "text",
        correct: ["Увімкнути MFA на root", "Зробити адміна не з root", "Поставити бюджет", "Лише потім збирати мережу"],
      },
    ]),
  ],
);
