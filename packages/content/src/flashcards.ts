export type FlashcardSeed = {
  front: string;
  back: string;
  hint?: string;
  tags?: string[];
};

export type DeckSeed = {
  slug: string;
  titleUk: string;
  titleEn: string;
  descriptionUk: string;
  descriptionEn: string;
  courseSlug: string;
  cards: FlashcardSeed[];
};

export const FLASHCARD_DECKS: DeckSeed[] = [
  {
    slug: "programming-basics",
    titleUk: "Програмування: основи",
    titleEn: "Programming: basics",
    descriptionUk: "HTML/CSS/JS ключові терміни",
    descriptionEn: "HTML/CSS/JS key terms",
    courseSlug: "programming",
    cards: [
      { front: "<div>", back: "блочний контейнер / block container", tags: ["html"] },
      { front: "href", back: "URL посилання / link URL", tags: ["html"] },
      { front: "flexbox", back: "1D layout (row/column)", tags: ["css"] },
      { front: "const", back: "непереприсвоювана змінна", tags: ["js"] },
      { front: "useState", back: "React hook локального стану", tags: ["react"] },
      { front: "express()", back: "створити Express app", tags: ["express"] },
      { front: "SELECT *", back: "усі колонки таблиці", tags: ["sql"] },
      { front: "unit test", back: "тест модуля/функції", tags: ["qa"] },
      { front: "middleware", back: "шар обробки req у Express", tags: ["express"] },
      { front: "props", back: "вхідні дані компонента React", tags: ["react"] },
    ],
  },

  {
    slug: "english-basics",
    titleUk: "Англійська: основи",
    titleEn: "English: basics",
    descriptionUk: "Базові слова та фрази (SRS)",
    descriptionEn: "Core words and phrases (SRS)",
    courseSlug: "english",
    cards: [
      { front: "Hello", back: "Привіт", tags: ["greetings"] },
      { front: "Good morning", back: "Доброго ранку", tags: ["greetings"] },
      { front: "Goodbye", back: "Бувай / До побачення", tags: ["greetings"] },
      { front: "Thank you", back: "Дякую", tags: ["polite"] },
      { front: "Please", back: "Будь ласка", tags: ["polite"] },
      { front: "Sorry", back: "Вибач / Вибачте", tags: ["polite"] },
      { front: "Yes", back: "Так", tags: ["basics"] },
      { front: "No", back: "Ні", tags: ["basics"] },
      { front: "My name is…", back: "Мене звати…", tags: ["intro"] },
      { front: "Nice to meet you", back: "Приємно познайомитись", tags: ["intro"] },
      { front: "How are you?", back: "Як справи?", tags: ["intro"] },
      { front: "I am fine", back: "У мене все добре", tags: ["intro"] },
      { front: "Water", back: "Вода", tags: ["nouns"] },
      { front: "Food", back: "Їжа", tags: ["nouns"] },
      { front: "Friend", back: "Друг / Подруга", tags: ["nouns"] },
      { front: "School", back: "Школа", tags: ["nouns"] },
      { front: "Book", back: "Книга", tags: ["nouns"] },
      { front: "Teacher", back: "Вчитель / Вчителька", tags: ["nouns"] },
      { front: "I have a cat", back: "У мене є кіт", tags: ["sentences"] },
      { front: "Where is the station?", back: "Де станція?", tags: ["travel"] },
    ],
  },
  {
    slug: "chess-terms",
    titleUk: "Шахи: терміни",
    titleEn: "Chess: terms",
    descriptionUk: "Основна шахова лексика",
    descriptionEn: "Core chess vocabulary",
    courseSlug: "chess",
    cards: [
      { front: "King", back: "Король", tags: ["pieces"] },
      { front: "Queen", back: "Ферзь", tags: ["pieces"] },
      { front: "Rook", back: "Тура", tags: ["pieces"] },
      { front: "Bishop", back: "Слон", tags: ["pieces"] },
      { front: "Knight", back: "Кінь", tags: ["pieces"] },
      { front: "Pawn", back: "Пішак", tags: ["pieces"] },
      { front: "Check", back: "Шах", tags: ["rules"] },
      { front: "Checkmate", back: "Мат", tags: ["rules"] },
      { front: "Stalemate", back: "Пат", tags: ["rules"] },
      { front: "Castling", back: "Рокіровка", tags: ["rules"] },
      { front: "En passant", back: "Взяття на проході", tags: ["rules"] },
      { front: "Fork", back: "Вилка", tags: ["tactics"] },
      { front: "Pin", back: "Зв'язка", tags: ["tactics"] },
      { front: "Skewer", back: "Лінійний удар", tags: ["tactics"] },
      { front: "Opening", back: "Дебют", tags: ["phases"] },
    ],
  },
  {
    slug: "logic-patterns",
    titleUk: "Логіка: підказки",
    titleEn: "Logic: tips",
    descriptionUk: "Корисні патерни для задач",
    descriptionEn: "Useful problem-solving patterns",
    courseSlug: "logic",
    cards: [
      { front: "Sequence", back: "Послідовність", hint: "знайди крок / rule", tags: ["vocab"] },
      { front: "Pattern", back: "Закономірність", tags: ["vocab"] },
      { front: "Odd one out", back: "Зайве / виключення", tags: ["types"] },
      { front: "Analogy A:B :: C:?", back: "Пропорція / аналогія", tags: ["types"] },
      { front: "Eliminate options", back: "Відсікай неможливі відповіді", tags: ["strategy"] },
      { front: "Work backwards", back: "Йди від відповіді назад", tags: ["strategy"] },
      { front: "Draw it", back: "Намалюй / схематизуй", tags: ["strategy"] },
      { front: "Check extremes", back: "Перевір крайні випадки", tags: ["strategy"] },
    ],
  },
];
