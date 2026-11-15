# 93 — Learning refresh and the Oracle path

Local product update. No deploy step and no paid Oracle service.

## Learning experience

- Student desktop nav: Home, Learn, Courses, Practice, Friends, More.
- Student mobile nav: Learn, Courses, Practice, Friends, Profile.
- Practice opens `/review`. Programming and chess stay in Courses and in More.
- Catalog filters: Languages, Thinking & Strategy, Learning Skills, Technology.
- The catalog reads published, visible courses from `GET /courses`.
- Learn has one continue action. Quests sit below the subject list.
- Buttons use the darker brand token so the label stays readable. Page background and cards follow the admin theme variables.

## Oracle course

- Slug remains `sql_fundamentals`. Route remains `/sql-fundamentals`.
- Display name: SQL & Oracle Database.
- Sections: SQL & Modern Oracle, PL/SQL, Database Administration.
- 38 units and 155 lessons. The 23 new units each have three teaching lessons and one exam.
- Existing lesson slugs stay in their units so progress and review history remain attached.
- Seed skips a course whose `contentSource` is `cms`.
- Modern features cite Oracle Database 23ai or 26ai where the syntax differs from 19c.
- Teaching examples are documentation-based. Do not describe them as executed on Oracle 26 unless a run against that version is recorded.

## Next, not in this change

- Prefer correct feedback over more rewards.
- Deepen the current non-IT courses with scenarios and spaced review.
- Future subjects, when added, start with mathematics, science, history, or financial literacy, and ship with real lessons and checks.
- This update does not add those subjects and does not split Oracle into separate courses.
