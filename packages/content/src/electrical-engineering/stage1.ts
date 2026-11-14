import type { UnitContent } from "../types.js";
import {
  createConcept,
  createExplain,
  createNumeric,
  createCircuitLab,
  createMcq,
  createLesson,
  createUnit,
} from "./helpers.js";

/**
 * Stage 1: 6 Units, 36 Lessons (5 instructional + 1 exam per unit)
 */
export const stage1Units: UnitContent[] = [
  createUnit({
    slug: "ee-01-matter-charge",
    titleUk: "Будова речовини, заряд, провідники та діелектрики",
    titleEn: "Structure of Matter, Charge, Conductors & Dielectrics",
    lessons: [
      createLesson({
        slug: "ee-01-l1",
        titleUk: "Будова речовини, заряд, провідники та діелектрики (Частина 1)",
        titleEn: "Structure of Matter, Charge, Conductors & Dielectrics (Part 1)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-01-l1-c1",
            "promptUk": "Теоретичні основи: Будова речовини, заряд, провідники та діелектрики (Частина 1)",
            "promptEn": "Theoretical Foundations: Structure of Matter, Charge, Conductors & Dielectrics (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Будова речовини, заряд, провідники та діелектрики». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Structure of Matter, Charge, Conductors & Dielectrics'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-01-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Будова речовини, заряд, провідники та діелектрики»?",
            "promptEn": "Which core statement is correct regarding 'Structure of Matter, Charge, Conductors & Dielectrics'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-01-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 18 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 18 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 27.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 18 * 1.5 = 27.0 В.",
            "explanationEn": "Calculation follows direct scaling: 18 * 1.5 = 27.0 V."
}),
          createNumeric({
            "id": "ee-01-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 18 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 18 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 1.389,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 18 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 18 A."
}),
          createExplain({
            "id": "ee-01-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Будова речовини, заряд, провідники та діелектрики»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Structure of Matter, Charge, Conductors & Dielectrics':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-01-l2",
        titleUk: "Будова речовини, заряд, провідники та діелектрики (Частина 2)",
        titleEn: "Structure of Matter, Charge, Conductors & Dielectrics (Part 2)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-01-l2-c1",
            "promptUk": "Теоретичні основи: Будова речовини, заряд, провідники та діелектрики (Частина 2)",
            "promptEn": "Theoretical Foundations: Structure of Matter, Charge, Conductors & Dielectrics (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Будова речовини, заряд, провідники та діелектрики». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Structure of Matter, Charge, Conductors & Dielectrics'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-01-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Будова речовини, заряд, провідники та діелектрики»?",
            "promptEn": "Which core statement is correct regarding 'Structure of Matter, Charge, Conductors & Dielectrics'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-01-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 23 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 23 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 34.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 23 * 1.5 = 34.5 В.",
            "explanationEn": "Calculation follows direct scaling: 23 * 1.5 = 34.5 V."
}),
          createNumeric({
            "id": "ee-01-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 23 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 23 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 1.087,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 23 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 23 A."
}),
          createExplain({
            "id": "ee-01-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Будова речовини, заряд, провідники та діелектрики»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Structure of Matter, Charge, Conductors & Dielectrics':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-01-l3",
        titleUk: "Будова речовини, заряд, провідники та діелектрики (Частина 3)",
        titleEn: "Structure of Matter, Charge, Conductors & Dielectrics (Part 3)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-01-l3-c1",
            "promptUk": "Теоретичні основи: Будова речовини, заряд, провідники та діелектрики (Частина 3)",
            "promptEn": "Theoretical Foundations: Structure of Matter, Charge, Conductors & Dielectrics (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Будова речовини, заряд, провідники та діелектрики». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Structure of Matter, Charge, Conductors & Dielectrics'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-01-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Будова речовини, заряд, провідники та діелектрики»?",
            "promptEn": "Which core statement is correct regarding 'Structure of Matter, Charge, Conductors & Dielectrics'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-01-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 28 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 28 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 42.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 28 * 1.5 = 42.0 В.",
            "explanationEn": "Calculation follows direct scaling: 28 * 1.5 = 42.0 V."
}),
          createNumeric({
            "id": "ee-01-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 28 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 28 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.893,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 28 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 28 A."
}),
          createExplain({
            "id": "ee-01-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Будова речовини, заряд, провідники та діелектрики»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Structure of Matter, Charge, Conductors & Dielectrics':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-01-l4",
        titleUk: "Будова речовини, заряд, провідники та діелектрики (Частина 4)",
        titleEn: "Structure of Matter, Charge, Conductors & Dielectrics (Part 4)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-01-l4-c1",
            "promptUk": "Теоретичні основи: Будова речовини, заряд, провідники та діелектрики (Частина 4)",
            "promptEn": "Theoretical Foundations: Structure of Matter, Charge, Conductors & Dielectrics (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Будова речовини, заряд, провідники та діелектрики». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Structure of Matter, Charge, Conductors & Dielectrics'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-01-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Будова речовини, заряд, провідники та діелектрики»?",
            "promptEn": "Which core statement is correct regarding 'Structure of Matter, Charge, Conductors & Dielectrics'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-01-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 33 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 33 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 49.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 33 * 1.5 = 49.5 В.",
            "explanationEn": "Calculation follows direct scaling: 33 * 1.5 = 49.5 V."
}),
          createNumeric({
            "id": "ee-01-l4-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 33 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 33 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.758,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 33 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 33 A."
}),
          createExplain({
            "id": "ee-01-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Будова речовини, заряд, провідники та діелектрики»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Structure of Matter, Charge, Conductors & Dielectrics':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-01-l5",
        titleUk: "Будова речовини, заряд, провідники та діелектрики (Частина 5)",
        titleEn: "Structure of Matter, Charge, Conductors & Dielectrics (Part 5)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-01-l5-c1",
            "promptUk": "Теоретичні основи: Будова речовини, заряд, провідники та діелектрики (Частина 5)",
            "promptEn": "Theoretical Foundations: Structure of Matter, Charge, Conductors & Dielectrics (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Будова речовини, заряд, провідники та діелектрики». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Structure of Matter, Charge, Conductors & Dielectrics'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-01-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Будова речовини, заряд, провідники та діелектрики»?",
            "promptEn": "Which core statement is correct regarding 'Structure of Matter, Charge, Conductors & Dielectrics'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-01-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 38 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 38 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 57.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 38 * 1.5 = 57.0 В.",
            "explanationEn": "Calculation follows direct scaling: 38 * 1.5 = 57.0 V."
}),
          createNumeric({
            "id": "ee-01-l5-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 38 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 38 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.658,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 38 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 38 A."
}),
          createExplain({
            "id": "ee-01-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Будова речовини, заряд, провідники та діелектрики»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Structure of Matter, Charge, Conductors & Dielectrics':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-01-exam",
        titleUk: "Екзамен: Будова речовини, заряд, провідники та діелектрики",
        titleEn: "Exam: Structure of Matter, Charge, Conductors & Dielectrics",
        difficulty: 1,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-01-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Будова речовини, заряд, провідники та діелектрики»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Structure of Matter, Charge, Conductors & Dielectrics'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 1)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 1)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-01-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Будова речовини, заряд, провідники та діелектрики»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Structure of Matter, Charge, Conductors & Dielectrics'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 2)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 2)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-01-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Будова речовини, заряд, провідники та діелектрики»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Structure of Matter, Charge, Conductors & Dielectrics'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 3)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 3)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-01-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Будова речовини, заряд, провідники та діелектрики»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Structure of Matter, Charge, Conductors & Dielectrics'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 4)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 4)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createNumeric({
            "id": "ee-01-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 20 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 20 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 10.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 20 = 10.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 20 = 10.0 V."
}),
          createNumeric({
            "id": "ee-01-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 22 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 22 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 11.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 22 = 11.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 22 = 11.0 V."
}),
          createNumeric({
            "id": "ee-01-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 24 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 24 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 12.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 24 = 12.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 24 = 12.0 V."
}),
          createNumeric({
            "id": "ee-01-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 26 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 26 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 13.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 26 = 13.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 26 = 13.0 V."
}),
          createNumeric({
            "id": "ee-01-exam-n9",
            "promptUk": "Екзаменаційне завдання 9: Обчисліть потужність при напрузі 32 В та струмі 2 А:",
            "promptEn": "Exam Task 9: Calculate power at voltage 32 V and current 2 A:",
            "formula": "P = V \\cdot I",
            "target": 64,
            "unit": "W",
            "absTolerance": 0.2,
            "relTolerance": 0.02,
            "explanationUk": "Потужність P = 32 * 2 = 64 Вт.",
            "explanationEn": "Power P = 32 * 2 = 64 W."
}),
          createNumeric({
            "id": "ee-01-exam-n10",
            "promptUk": "Екзаменаційне завдання 10: Обчисліть потужність при напрузі 35 В та струмі 2 А:",
            "promptEn": "Exam Task 10: Calculate power at voltage 35 V and current 2 A:",
            "formula": "P = V \\cdot I",
            "target": 70,
            "unit": "W",
            "absTolerance": 0.2,
            "relTolerance": 0.02,
            "explanationUk": "Потужність P = 35 * 2 = 70 Вт.",
            "explanationEn": "Power P = 35 * 2 = 70 W."
}),
        ],
      }),
    ],
  }),
  createUnit({
    slug: "ee-02-electric-field",
    titleUk: "Електричне поле, сила Кулона та потенціал",
    titleEn: "Electric Field, Coulomb Force & Potential",
    lessons: [
      createLesson({
        slug: "ee-02-l1",
        titleUk: "Електричне поле, сила Кулона та потенціал (Частина 1)",
        titleEn: "Electric Field, Coulomb Force & Potential (Part 1)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-02-l1-c1",
            "promptUk": "Теоретичні основи: Електричне поле, сила Кулона та потенціал (Частина 1)",
            "promptEn": "Theoretical Foundations: Electric Field, Coulomb Force & Potential (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Електричне поле, сила Кулона та потенціал». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Electric Field, Coulomb Force & Potential'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-02-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Електричне поле, сила Кулона та потенціал»?",
            "promptEn": "Which core statement is correct regarding 'Electric Field, Coulomb Force & Potential'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-02-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 21 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 21 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 31.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 21 * 1.5 = 31.5 В.",
            "explanationEn": "Calculation follows direct scaling: 21 * 1.5 = 31.5 V."
}),
          createNumeric({
            "id": "ee-02-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 21 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 21 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 1.19,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 21 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 21 A."
}),
          createExplain({
            "id": "ee-02-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Електричне поле, сила Кулона та потенціал»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Electric Field, Coulomb Force & Potential':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-02-l2",
        titleUk: "Електричне поле, сила Кулона та потенціал (Частина 2)",
        titleEn: "Electric Field, Coulomb Force & Potential (Part 2)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-02-l2-c1",
            "promptUk": "Теоретичні основи: Електричне поле, сила Кулона та потенціал (Частина 2)",
            "promptEn": "Theoretical Foundations: Electric Field, Coulomb Force & Potential (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Електричне поле, сила Кулона та потенціал». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Electric Field, Coulomb Force & Potential'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-02-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Електричне поле, сила Кулона та потенціал»?",
            "promptEn": "Which core statement is correct regarding 'Electric Field, Coulomb Force & Potential'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-02-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 26 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 26 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 39.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 26 * 1.5 = 39.0 В.",
            "explanationEn": "Calculation follows direct scaling: 26 * 1.5 = 39.0 V."
}),
          createNumeric({
            "id": "ee-02-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 26 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 26 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.962,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 26 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 26 A."
}),
          createExplain({
            "id": "ee-02-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Електричне поле, сила Кулона та потенціал»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Electric Field, Coulomb Force & Potential':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-02-l3",
        titleUk: "Електричне поле, сила Кулона та потенціал (Частина 3)",
        titleEn: "Electric Field, Coulomb Force & Potential (Part 3)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-02-l3-c1",
            "promptUk": "Теоретичні основи: Електричне поле, сила Кулона та потенціал (Частина 3)",
            "promptEn": "Theoretical Foundations: Electric Field, Coulomb Force & Potential (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Електричне поле, сила Кулона та потенціал». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Electric Field, Coulomb Force & Potential'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-02-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Електричне поле, сила Кулона та потенціал»?",
            "promptEn": "Which core statement is correct regarding 'Electric Field, Coulomb Force & Potential'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-02-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 31 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 31 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 46.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 31 * 1.5 = 46.5 В.",
            "explanationEn": "Calculation follows direct scaling: 31 * 1.5 = 46.5 V."
}),
          createNumeric({
            "id": "ee-02-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 31 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 31 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.806,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 31 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 31 A."
}),
          createExplain({
            "id": "ee-02-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Електричне поле, сила Кулона та потенціал»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Electric Field, Coulomb Force & Potential':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-02-l4",
        titleUk: "Електричне поле, сила Кулона та потенціал (Частина 4)",
        titleEn: "Electric Field, Coulomb Force & Potential (Part 4)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-02-l4-c1",
            "promptUk": "Теоретичні основи: Електричне поле, сила Кулона та потенціал (Частина 4)",
            "promptEn": "Theoretical Foundations: Electric Field, Coulomb Force & Potential (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Електричне поле, сила Кулона та потенціал». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Electric Field, Coulomb Force & Potential'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-02-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Електричне поле, сила Кулона та потенціал»?",
            "promptEn": "Which core statement is correct regarding 'Electric Field, Coulomb Force & Potential'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-02-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 36 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 36 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 54.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 36 * 1.5 = 54.0 В.",
            "explanationEn": "Calculation follows direct scaling: 36 * 1.5 = 54.0 V."
}),
          createNumeric({
            "id": "ee-02-l4-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 36 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 36 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.694,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 36 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 36 A."
}),
          createExplain({
            "id": "ee-02-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Електричне поле, сила Кулона та потенціал»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Electric Field, Coulomb Force & Potential':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-02-l5",
        titleUk: "Електричне поле, сила Кулона та потенціал (Частина 5)",
        titleEn: "Electric Field, Coulomb Force & Potential (Part 5)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-02-l5-c1",
            "promptUk": "Теоретичні основи: Електричне поле, сила Кулона та потенціал (Частина 5)",
            "promptEn": "Theoretical Foundations: Electric Field, Coulomb Force & Potential (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Електричне поле, сила Кулона та потенціал». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Electric Field, Coulomb Force & Potential'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-02-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Електричне поле, сила Кулона та потенціал»?",
            "promptEn": "Which core statement is correct regarding 'Electric Field, Coulomb Force & Potential'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-02-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 41 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 41 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 61.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 41 * 1.5 = 61.5 В.",
            "explanationEn": "Calculation follows direct scaling: 41 * 1.5 = 61.5 V."
}),
          createNumeric({
            "id": "ee-02-l5-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 41 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 41 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.61,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 41 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 41 A."
}),
          createExplain({
            "id": "ee-02-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Електричне поле, сила Кулона та потенціал»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Electric Field, Coulomb Force & Potential':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-02-exam",
        titleUk: "Екзамен: Електричне поле, сила Кулона та потенціал",
        titleEn: "Exam: Electric Field, Coulomb Force & Potential",
        difficulty: 1,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-02-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Електричне поле, сила Кулона та потенціал»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Electric Field, Coulomb Force & Potential'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 1)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 1)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-02-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Електричне поле, сила Кулона та потенціал»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Electric Field, Coulomb Force & Potential'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 2)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 2)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-02-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Електричне поле, сила Кулона та потенціал»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Electric Field, Coulomb Force & Potential'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 3)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 3)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-02-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Електричне поле, сила Кулона та потенціал»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Electric Field, Coulomb Force & Potential'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 4)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 4)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createNumeric({
            "id": "ee-02-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 30 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 30 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 15.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 30 = 15.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 30 = 15.0 V."
}),
          createNumeric({
            "id": "ee-02-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 32 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 32 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 16.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 32 = 16.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 32 = 16.0 V."
}),
          createNumeric({
            "id": "ee-02-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 34 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 34 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 17.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 34 = 17.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 34 = 17.0 V."
}),
          createNumeric({
            "id": "ee-02-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 36 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 36 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 18.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 36 = 18.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 36 = 18.0 V."
}),
          createNumeric({
            "id": "ee-02-exam-n9",
            "promptUk": "Екзаменаційне завдання 9: Обчисліть потужність при напрузі 37 В та струмі 2 А:",
            "promptEn": "Exam Task 9: Calculate power at voltage 37 V and current 2 A:",
            "formula": "P = V \\cdot I",
            "target": 74,
            "unit": "W",
            "absTolerance": 0.2,
            "relTolerance": 0.02,
            "explanationUk": "Потужність P = 37 * 2 = 74 Вт.",
            "explanationEn": "Power P = 37 * 2 = 74 W."
}),
          createNumeric({
            "id": "ee-02-exam-n10",
            "promptUk": "Екзаменаційне завдання 10: Обчисліть потужність при напрузі 40 В та струмі 2 А:",
            "promptEn": "Exam Task 10: Calculate power at voltage 40 V and current 2 A:",
            "formula": "P = V \\cdot I",
            "target": 80,
            "unit": "W",
            "absTolerance": 0.2,
            "relTolerance": 0.02,
            "explanationUk": "Потужність P = 40 * 2 = 80 Вт.",
            "explanationEn": "Power P = 40 * 2 = 80 W."
}),
        ],
      }),
    ],
  }),
  createUnit({
    slug: "ee-03-current-voltage",
    titleUk: "Струм, напруга, джерела та напрямок перенесення заряду",
    titleEn: "Current, Voltage, Sources & Flow Direction",
    lessons: [
      createLesson({
        slug: "ee-03-l1",
        titleUk: "Струм, напруга, джерела та напрямок перенесення заряду (Частина 1)",
        titleEn: "Current, Voltage, Sources & Flow Direction (Part 1)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-03-l1-c1",
            "promptUk": "Теоретичні основи: Струм, напруга, джерела та напрямок перенесення заряду (Частина 1)",
            "promptEn": "Theoretical Foundations: Current, Voltage, Sources & Flow Direction (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Струм, напруга, джерела та напрямок перенесення заряду». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Current, Voltage, Sources & Flow Direction'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-03-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Струм, напруга, джерела та напрямок перенесення заряду»?",
            "promptEn": "Which core statement is correct regarding 'Current, Voltage, Sources & Flow Direction'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-03-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 24 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 24 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 36.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 24 * 1.5 = 36.0 В.",
            "explanationEn": "Calculation follows direct scaling: 24 * 1.5 = 36.0 V."
}),
          createNumeric({
            "id": "ee-03-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 24 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 24 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 1.042,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 24 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 24 A."
}),
          createExplain({
            "id": "ee-03-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Струм, напруга, джерела та напрямок перенесення заряду»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Current, Voltage, Sources & Flow Direction':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-03-l2",
        titleUk: "Струм, напруга, джерела та напрямок перенесення заряду (Частина 2)",
        titleEn: "Current, Voltage, Sources & Flow Direction (Part 2)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-03-l2-c1",
            "promptUk": "Теоретичні основи: Струм, напруга, джерела та напрямок перенесення заряду (Частина 2)",
            "promptEn": "Theoretical Foundations: Current, Voltage, Sources & Flow Direction (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Струм, напруга, джерела та напрямок перенесення заряду». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Current, Voltage, Sources & Flow Direction'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-03-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Струм, напруга, джерела та напрямок перенесення заряду»?",
            "promptEn": "Which core statement is correct regarding 'Current, Voltage, Sources & Flow Direction'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-03-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 29 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 29 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 43.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 29 * 1.5 = 43.5 В.",
            "explanationEn": "Calculation follows direct scaling: 29 * 1.5 = 43.5 V."
}),
          createNumeric({
            "id": "ee-03-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 29 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 29 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.862,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 29 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 29 A."
}),
          createExplain({
            "id": "ee-03-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Струм, напруга, джерела та напрямок перенесення заряду»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Current, Voltage, Sources & Flow Direction':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-03-l3",
        titleUk: "Струм, напруга, джерела та напрямок перенесення заряду (Частина 3)",
        titleEn: "Current, Voltage, Sources & Flow Direction (Part 3)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-03-l3-c1",
            "promptUk": "Теоретичні основи: Струм, напруга, джерела та напрямок перенесення заряду (Частина 3)",
            "promptEn": "Theoretical Foundations: Current, Voltage, Sources & Flow Direction (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Струм, напруга, джерела та напрямок перенесення заряду». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Current, Voltage, Sources & Flow Direction'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-03-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Струм, напруга, джерела та напрямок перенесення заряду»?",
            "promptEn": "Which core statement is correct regarding 'Current, Voltage, Sources & Flow Direction'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-03-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 34 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 34 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 51.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 34 * 1.5 = 51.0 В.",
            "explanationEn": "Calculation follows direct scaling: 34 * 1.5 = 51.0 V."
}),
          createNumeric({
            "id": "ee-03-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 34 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 34 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.735,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 34 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 34 A."
}),
          createExplain({
            "id": "ee-03-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Струм, напруга, джерела та напрямок перенесення заряду»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Current, Voltage, Sources & Flow Direction':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-03-l4",
        titleUk: "Струм, напруга, джерела та напрямок перенесення заряду (Частина 4)",
        titleEn: "Current, Voltage, Sources & Flow Direction (Part 4)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-03-l4-c1",
            "promptUk": "Теоретичні основи: Струм, напруга, джерела та напрямок перенесення заряду (Частина 4)",
            "promptEn": "Theoretical Foundations: Current, Voltage, Sources & Flow Direction (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Струм, напруга, джерела та напрямок перенесення заряду». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Current, Voltage, Sources & Flow Direction'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-03-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Струм, напруга, джерела та напрямок перенесення заряду»?",
            "promptEn": "Which core statement is correct regarding 'Current, Voltage, Sources & Flow Direction'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-03-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 39 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 39 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 58.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 39 * 1.5 = 58.5 В.",
            "explanationEn": "Calculation follows direct scaling: 39 * 1.5 = 58.5 V."
}),
          createNumeric({
            "id": "ee-03-l4-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 39 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 39 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.641,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 39 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 39 A."
}),
          createExplain({
            "id": "ee-03-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Струм, напруга, джерела та напрямок перенесення заряду»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Current, Voltage, Sources & Flow Direction':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-03-l5",
        titleUk: "Струм, напруга, джерела та напрямок перенесення заряду (Частина 5)",
        titleEn: "Current, Voltage, Sources & Flow Direction (Part 5)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-03-l5-c1",
            "promptUk": "Теоретичні основи: Струм, напруга, джерела та напрямок перенесення заряду (Частина 5)",
            "promptEn": "Theoretical Foundations: Current, Voltage, Sources & Flow Direction (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Струм, напруга, джерела та напрямок перенесення заряду». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Current, Voltage, Sources & Flow Direction'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-03-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Струм, напруга, джерела та напрямок перенесення заряду»?",
            "promptEn": "Which core statement is correct regarding 'Current, Voltage, Sources & Flow Direction'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-03-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 44 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 44 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 66.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 44 * 1.5 = 66.0 В.",
            "explanationEn": "Calculation follows direct scaling: 44 * 1.5 = 66.0 V."
}),
          createNumeric({
            "id": "ee-03-l5-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 44 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 44 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.568,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 44 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 44 A."
}),
          createExplain({
            "id": "ee-03-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Струм, напруга, джерела та напрямок перенесення заряду»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Current, Voltage, Sources & Flow Direction':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-03-exam",
        titleUk: "Екзамен: Струм, напруга, джерела та напрямок перенесення заряду",
        titleEn: "Exam: Current, Voltage, Sources & Flow Direction",
        difficulty: 1,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-03-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Струм, напруга, джерела та напрямок перенесення заряду»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Current, Voltage, Sources & Flow Direction'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 1)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 1)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-03-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Струм, напруга, джерела та напрямок перенесення заряду»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Current, Voltage, Sources & Flow Direction'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 2)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 2)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-03-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Струм, напруга, джерела та напрямок перенесення заряду»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Current, Voltage, Sources & Flow Direction'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 3)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 3)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-03-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Струм, напруга, джерела та напрямок перенесення заряду»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Current, Voltage, Sources & Flow Direction'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 4)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 4)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createNumeric({
            "id": "ee-03-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 40 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 40 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 20.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 40 = 20.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 40 = 20.0 V."
}),
          createNumeric({
            "id": "ee-03-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 42 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 42 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 21.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 42 = 21.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 42 = 21.0 V."
}),
          createNumeric({
            "id": "ee-03-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 44 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 44 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 22.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 44 = 22.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 44 = 22.0 V."
}),
          createNumeric({
            "id": "ee-03-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 46 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 46 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 23.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 46 = 23.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 46 = 23.0 V."
}),
          createNumeric({
            "id": "ee-03-exam-n9",
            "promptUk": "Екзаменаційне завдання 9: Обчисліть потужність при напрузі 42 В та струмі 2 А:",
            "promptEn": "Exam Task 9: Calculate power at voltage 42 V and current 2 A:",
            "formula": "P = V \\cdot I",
            "target": 84,
            "unit": "W",
            "absTolerance": 0.2,
            "relTolerance": 0.02,
            "explanationUk": "Потужність P = 42 * 2 = 84 Вт.",
            "explanationEn": "Power P = 42 * 2 = 84 W."
}),
          createNumeric({
            "id": "ee-03-exam-n10",
            "promptUk": "Екзаменаційне завдання 10: Обчисліть потужність при напрузі 45 В та струмі 2 А:",
            "promptEn": "Exam Task 10: Calculate power at voltage 45 V and current 2 A:",
            "formula": "P = V \\cdot I",
            "target": 90,
            "unit": "W",
            "absTolerance": 0.2,
            "relTolerance": 0.02,
            "explanationUk": "Потужність P = 45 * 2 = 90 Вт.",
            "explanationEn": "Power P = 45 * 2 = 90 W."
}),
        ],
      }),
    ],
  }),
  createUnit({
    slug: "ee-04-si-units-math",
    titleUk: "Одиниці СІ, префікси, пропорції та перетворення формул",
    titleEn: "SI Units, Prefixes, Proportions & Formula Manipulation",
    lessons: [
      createLesson({
        slug: "ee-04-l1",
        titleUk: "Одиниці СІ, префікси, пропорції та перетворення формул (Частина 1)",
        titleEn: "SI Units, Prefixes, Proportions & Formula Manipulation (Part 1)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-04-l1-c1",
            "promptUk": "Теоретичні основи: Одиниці СІ, префікси, пропорції та перетворення формул (Частина 1)",
            "promptEn": "Theoretical Foundations: SI Units, Prefixes, Proportions & Formula Manipulation (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Одиниці СІ, префікси, пропорції та перетворення формул». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'SI Units, Prefixes, Proportions & Formula Manipulation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-04-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Одиниці СІ, префікси, пропорції та перетворення формул»?",
            "promptEn": "Which core statement is correct regarding 'SI Units, Prefixes, Proportions & Formula Manipulation'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-04-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 27 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 27 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 40.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 27 * 1.5 = 40.5 В.",
            "explanationEn": "Calculation follows direct scaling: 27 * 1.5 = 40.5 V."
}),
          createNumeric({
            "id": "ee-04-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 27 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 27 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.926,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 27 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 27 A."
}),
          createExplain({
            "id": "ee-04-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Одиниці СІ, префікси, пропорції та перетворення формул»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'SI Units, Prefixes, Proportions & Formula Manipulation':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-04-l2",
        titleUk: "Одиниці СІ, префікси, пропорції та перетворення формул (Частина 2)",
        titleEn: "SI Units, Prefixes, Proportions & Formula Manipulation (Part 2)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-04-l2-c1",
            "promptUk": "Теоретичні основи: Одиниці СІ, префікси, пропорції та перетворення формул (Частина 2)",
            "promptEn": "Theoretical Foundations: SI Units, Prefixes, Proportions & Formula Manipulation (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Одиниці СІ, префікси, пропорції та перетворення формул». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'SI Units, Prefixes, Proportions & Formula Manipulation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-04-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Одиниці СІ, префікси, пропорції та перетворення формул»?",
            "promptEn": "Which core statement is correct regarding 'SI Units, Prefixes, Proportions & Formula Manipulation'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-04-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 32 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 32 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 48.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 32 * 1.5 = 48.0 В.",
            "explanationEn": "Calculation follows direct scaling: 32 * 1.5 = 48.0 V."
}),
          createNumeric({
            "id": "ee-04-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 32 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 32 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.781,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 32 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 32 A."
}),
          createExplain({
            "id": "ee-04-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Одиниці СІ, префікси, пропорції та перетворення формул»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'SI Units, Prefixes, Proportions & Formula Manipulation':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-04-l3",
        titleUk: "Одиниці СІ, префікси, пропорції та перетворення формул (Частина 3)",
        titleEn: "SI Units, Prefixes, Proportions & Formula Manipulation (Part 3)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-04-l3-c1",
            "promptUk": "Теоретичні основи: Одиниці СІ, префікси, пропорції та перетворення формул (Частина 3)",
            "promptEn": "Theoretical Foundations: SI Units, Prefixes, Proportions & Formula Manipulation (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Одиниці СІ, префікси, пропорції та перетворення формул». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'SI Units, Prefixes, Proportions & Formula Manipulation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-04-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Одиниці СІ, префікси, пропорції та перетворення формул»?",
            "promptEn": "Which core statement is correct regarding 'SI Units, Prefixes, Proportions & Formula Manipulation'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-04-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 37 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 37 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 55.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 37 * 1.5 = 55.5 В.",
            "explanationEn": "Calculation follows direct scaling: 37 * 1.5 = 55.5 V."
}),
          createNumeric({
            "id": "ee-04-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 37 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 37 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.676,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 37 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 37 A."
}),
          createExplain({
            "id": "ee-04-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Одиниці СІ, префікси, пропорції та перетворення формул»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'SI Units, Prefixes, Proportions & Formula Manipulation':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-04-l4",
        titleUk: "Одиниці СІ, префікси, пропорції та перетворення формул (Частина 4)",
        titleEn: "SI Units, Prefixes, Proportions & Formula Manipulation (Part 4)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-04-l4-c1",
            "promptUk": "Теоретичні основи: Одиниці СІ, префікси, пропорції та перетворення формул (Частина 4)",
            "promptEn": "Theoretical Foundations: SI Units, Prefixes, Proportions & Formula Manipulation (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Одиниці СІ, префікси, пропорції та перетворення формул». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'SI Units, Prefixes, Proportions & Formula Manipulation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-04-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Одиниці СІ, префікси, пропорції та перетворення формул»?",
            "promptEn": "Which core statement is correct regarding 'SI Units, Prefixes, Proportions & Formula Manipulation'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-04-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 42 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 42 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 63.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 42 * 1.5 = 63.0 В.",
            "explanationEn": "Calculation follows direct scaling: 42 * 1.5 = 63.0 V."
}),
          createNumeric({
            "id": "ee-04-l4-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 42 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 42 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.595,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 42 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 42 A."
}),
          createExplain({
            "id": "ee-04-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Одиниці СІ, префікси, пропорції та перетворення формул»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'SI Units, Prefixes, Proportions & Formula Manipulation':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-04-l5",
        titleUk: "Одиниці СІ, префікси, пропорції та перетворення формул (Частина 5)",
        titleEn: "SI Units, Prefixes, Proportions & Formula Manipulation (Part 5)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-04-l5-c1",
            "promptUk": "Теоретичні основи: Одиниці СІ, префікси, пропорції та перетворення формул (Частина 5)",
            "promptEn": "Theoretical Foundations: SI Units, Prefixes, Proportions & Formula Manipulation (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Одиниці СІ, префікси, пропорції та перетворення формул». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'SI Units, Prefixes, Proportions & Formula Manipulation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-04-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Одиниці СІ, префікси, пропорції та перетворення формул»?",
            "promptEn": "Which core statement is correct regarding 'SI Units, Prefixes, Proportions & Formula Manipulation'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-04-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 47 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 47 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 70.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 47 * 1.5 = 70.5 В.",
            "explanationEn": "Calculation follows direct scaling: 47 * 1.5 = 70.5 V."
}),
          createNumeric({
            "id": "ee-04-l5-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 47 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 47 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.532,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 47 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 47 A."
}),
          createExplain({
            "id": "ee-04-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Одиниці СІ, префікси, пропорції та перетворення формул»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'SI Units, Prefixes, Proportions & Formula Manipulation':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-04-exam",
        titleUk: "Екзамен: Одиниці СІ, префікси, пропорції та перетворення формул",
        titleEn: "Exam: SI Units, Prefixes, Proportions & Formula Manipulation",
        difficulty: 1,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-04-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Одиниці СІ, префікси, пропорції та перетворення формул»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'SI Units, Prefixes, Proportions & Formula Manipulation'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 1)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 1)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-04-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Одиниці СІ, префікси, пропорції та перетворення формул»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'SI Units, Prefixes, Proportions & Formula Manipulation'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 2)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 2)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-04-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Одиниці СІ, префікси, пропорції та перетворення формул»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'SI Units, Prefixes, Proportions & Formula Manipulation'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 3)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 3)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-04-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Одиниці СІ, префікси, пропорції та перетворення формул»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'SI Units, Prefixes, Proportions & Formula Manipulation'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 4)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 4)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createNumeric({
            "id": "ee-04-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 50 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 50 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 25.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 50 = 25.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 50 = 25.0 V."
}),
          createNumeric({
            "id": "ee-04-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 52 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 52 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 26.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 52 = 26.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 52 = 26.0 V."
}),
          createNumeric({
            "id": "ee-04-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 54 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 54 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 27.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 54 = 27.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 54 = 27.0 V."
}),
          createNumeric({
            "id": "ee-04-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 56 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 56 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 28.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 56 = 28.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 56 = 28.0 V."
}),
          createNumeric({
            "id": "ee-04-exam-n9",
            "promptUk": "Екзаменаційне завдання 9: Обчисліть потужність при напрузі 47 В та струмі 2 А:",
            "promptEn": "Exam Task 9: Calculate power at voltage 47 V and current 2 A:",
            "formula": "P = V \\cdot I",
            "target": 94,
            "unit": "W",
            "absTolerance": 0.2,
            "relTolerance": 0.02,
            "explanationUk": "Потужність P = 47 * 2 = 94 Вт.",
            "explanationEn": "Power P = 47 * 2 = 94 W."
}),
          createNumeric({
            "id": "ee-04-exam-n10",
            "promptUk": "Екзаменаційне завдання 10: Обчисліть потужність при напрузі 50 В та струмі 2 А:",
            "promptEn": "Exam Task 10: Calculate power at voltage 50 V and current 2 A:",
            "formula": "P = V \\cdot I",
            "target": 100,
            "unit": "W",
            "absTolerance": 0.2,
            "relTolerance": 0.02,
            "explanationUk": "Потужність P = 50 * 2 = 100 Вт.",
            "explanationEn": "Power P = 50 * 2 = 100 W."
}),
        ],
      }),
    ],
  }),
  createUnit({
    slug: "ee-05-resistance-ohm",
    titleUk: "Опір, провідність, закон Ома та температура",
    titleEn: "Resistance, Conductance, Ohm's Law & Temperature",
    lessons: [
      createLesson({
        slug: "ee-05-l1",
        titleUk: "Опір, провідність, закон Ома та температура (Частина 1)",
        titleEn: "Resistance, Conductance, Ohm's Law & Temperature (Part 1)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-05-l1-c1",
            "promptUk": "Теоретичні основи: Опір, провідність, закон Ома та температура (Частина 1)",
            "promptEn": "Theoretical Foundations: Resistance, Conductance, Ohm's Law & Temperature (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Опір, провідність, закон Ома та температура». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Resistance, Conductance, Ohm's Law & Temperature'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-05-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Опір, провідність, закон Ома та температура»?",
            "promptEn": "Which core statement is correct regarding 'Resistance, Conductance, Ohm's Law & Temperature'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-05-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 30 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 30 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 45.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 30 * 1.5 = 45.0 В.",
            "explanationEn": "Calculation follows direct scaling: 30 * 1.5 = 45.0 V."
}),
          createNumeric({
            "id": "ee-05-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 30 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 30 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.833,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 30 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 30 A."
}),
          createExplain({
            "id": "ee-05-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Опір, провідність, закон Ома та температура»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Resistance, Conductance, Ohm's Law & Temperature':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-05-l2",
        titleUk: "Опір, провідність, закон Ома та температура (Частина 2)",
        titleEn: "Resistance, Conductance, Ohm's Law & Temperature (Part 2)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-05-l2-c1",
            "promptUk": "Теоретичні основи: Опір, провідність, закон Ома та температура (Частина 2)",
            "promptEn": "Theoretical Foundations: Resistance, Conductance, Ohm's Law & Temperature (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Опір, провідність, закон Ома та температура». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Resistance, Conductance, Ohm's Law & Temperature'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-05-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Опір, провідність, закон Ома та температура»?",
            "promptEn": "Which core statement is correct regarding 'Resistance, Conductance, Ohm's Law & Temperature'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-05-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 35 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 35 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 52.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 35 * 1.5 = 52.5 В.",
            "explanationEn": "Calculation follows direct scaling: 35 * 1.5 = 52.5 V."
}),
          createNumeric({
            "id": "ee-05-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 35 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 35 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.714,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 35 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 35 A."
}),
          createExplain({
            "id": "ee-05-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Опір, провідність, закон Ома та температура»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Resistance, Conductance, Ohm's Law & Temperature':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-05-l3",
        titleUk: "Опір, провідність, закон Ома та температура (Частина 3)",
        titleEn: "Resistance, Conductance, Ohm's Law & Temperature (Part 3)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-05-l3-c1",
            "promptUk": "Теоретичні основи: Опір, провідність, закон Ома та температура (Частина 3)",
            "promptEn": "Theoretical Foundations: Resistance, Conductance, Ohm's Law & Temperature (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Опір, провідність, закон Ома та температура». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Resistance, Conductance, Ohm's Law & Temperature'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-05-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Опір, провідність, закон Ома та температура»?",
            "promptEn": "Which core statement is correct regarding 'Resistance, Conductance, Ohm's Law & Temperature'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-05-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 40 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 40 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 60.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 40 * 1.5 = 60.0 В.",
            "explanationEn": "Calculation follows direct scaling: 40 * 1.5 = 60.0 V."
}),
          createNumeric({
            "id": "ee-05-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 40 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 40 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.625,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 40 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 40 A."
}),
          createExplain({
            "id": "ee-05-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Опір, провідність, закон Ома та температура»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Resistance, Conductance, Ohm's Law & Temperature':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-05-l4",
        titleUk: "Опір, провідність, закон Ома та температура (Частина 4)",
        titleEn: "Resistance, Conductance, Ohm's Law & Temperature (Part 4)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-05-l4-c1",
            "promptUk": "Теоретичні основи: Опір, провідність, закон Ома та температура (Частина 4)",
            "promptEn": "Theoretical Foundations: Resistance, Conductance, Ohm's Law & Temperature (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Опір, провідність, закон Ома та температура». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Resistance, Conductance, Ohm's Law & Temperature'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-05-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Опір, провідність, закон Ома та температура»?",
            "promptEn": "Which core statement is correct regarding 'Resistance, Conductance, Ohm's Law & Temperature'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-05-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 45 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 45 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 67.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 45 * 1.5 = 67.5 В.",
            "explanationEn": "Calculation follows direct scaling: 45 * 1.5 = 67.5 V."
}),
          createNumeric({
            "id": "ee-05-l4-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 45 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 45 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.556,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 45 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 45 A."
}),
          createExplain({
            "id": "ee-05-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Опір, провідність, закон Ома та температура»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Resistance, Conductance, Ohm's Law & Temperature':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-05-l5",
        titleUk: "Опір, провідність, закон Ома та температура (Частина 5)",
        titleEn: "Resistance, Conductance, Ohm's Law & Temperature (Part 5)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-05-l5-c1",
            "promptUk": "Теоретичні основи: Опір, провідність, закон Ома та температура (Частина 5)",
            "promptEn": "Theoretical Foundations: Resistance, Conductance, Ohm's Law & Temperature (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Опір, провідність, закон Ома та температура». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Resistance, Conductance, Ohm's Law & Temperature'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-05-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Опір, провідність, закон Ома та температура»?",
            "promptEn": "Which core statement is correct regarding 'Resistance, Conductance, Ohm's Law & Temperature'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-05-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 50 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 50 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 75.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 50 * 1.5 = 75.0 В.",
            "explanationEn": "Calculation follows direct scaling: 50 * 1.5 = 75.0 V."
}),
          createNumeric({
            "id": "ee-05-l5-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 50 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 50 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.5,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 50 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 50 A."
}),
          createExplain({
            "id": "ee-05-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Опір, провідність, закон Ома та температура»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Resistance, Conductance, Ohm's Law & Temperature':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-05-exam",
        titleUk: "Екзамен: Опір, провідність, закон Ома та температура",
        titleEn: "Exam: Resistance, Conductance, Ohm's Law & Temperature",
        difficulty: 1,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-05-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Опір, провідність, закон Ома та температура»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Resistance, Conductance, Ohm's Law & Temperature'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 1)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 1)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-05-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Опір, провідність, закон Ома та температура»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Resistance, Conductance, Ohm's Law & Temperature'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 2)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 2)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-05-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Опір, провідність, закон Ома та температура»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Resistance, Conductance, Ohm's Law & Temperature'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 3)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 3)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-05-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Опір, провідність, закон Ома та температура»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Resistance, Conductance, Ohm's Law & Temperature'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 4)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 4)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createNumeric({
            "id": "ee-05-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 60 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 60 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 30.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 60 = 30.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 60 = 30.0 V."
}),
          createNumeric({
            "id": "ee-05-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 62 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 62 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 31.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 62 = 31.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 62 = 31.0 V."
}),
          createNumeric({
            "id": "ee-05-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 64 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 64 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 32.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 64 = 32.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 64 = 32.0 V."
}),
          createNumeric({
            "id": "ee-05-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 66 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 66 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 33.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 66 = 33.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 66 = 33.0 V."
}),
          createNumeric({
            "id": "ee-05-exam-n9",
            "promptUk": "Екзаменаційне завдання 9: Обчисліть потужність при напрузі 52 В та струмі 2 А:",
            "promptEn": "Exam Task 9: Calculate power at voltage 52 V and current 2 A:",
            "formula": "P = V \\cdot I",
            "target": 104,
            "unit": "W",
            "absTolerance": 0.2,
            "relTolerance": 0.02,
            "explanationUk": "Потужність P = 52 * 2 = 104 Вт.",
            "explanationEn": "Power P = 52 * 2 = 104 W."
}),
          createNumeric({
            "id": "ee-05-exam-n10",
            "promptUk": "Екзаменаційне завдання 10: Обчисліть потужність при напрузі 55 В та струмі 2 А:",
            "promptEn": "Exam Task 10: Calculate power at voltage 55 V and current 2 A:",
            "formula": "P = V \\cdot I",
            "target": 110,
            "unit": "W",
            "absTolerance": 0.2,
            "relTolerance": 0.02,
            "explanationUk": "Потужність P = 55 * 2 = 110 Вт.",
            "explanationEn": "Power P = 55 * 2 = 110 W."
}),
        ],
      }),
    ],
  }),
  createUnit({
    slug: "ee-06-work-power-safety",
    titleUk: "Робота, потужність, енергія, ККД та електробезпека",
    titleEn: "Work, Power, Energy, Efficiency & Electrical Safety",
    lessons: [
      createLesson({
        slug: "ee-06-l1",
        titleUk: "Робота, потужність, енергія, ККД та електробезпека (Частина 1)",
        titleEn: "Work, Power, Energy, Efficiency & Electrical Safety (Part 1)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-06-l1-c1",
            "promptUk": "Теоретичні основи: Робота, потужність, енергія, ККД та електробезпека (Частина 1)",
            "promptEn": "Theoretical Foundations: Work, Power, Energy, Efficiency & Electrical Safety (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Робота, потужність, енергія, ККД та електробезпека». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Work, Power, Energy, Efficiency & Electrical Safety'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-06-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Робота, потужність, енергія, ККД та електробезпека»?",
            "promptEn": "Which core statement is correct regarding 'Work, Power, Energy, Efficiency & Electrical Safety'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-06-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 33 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 33 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 49.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 33 * 1.5 = 49.5 В.",
            "explanationEn": "Calculation follows direct scaling: 33 * 1.5 = 49.5 V."
}),
          createNumeric({
            "id": "ee-06-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 33 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 33 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.758,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 33 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 33 A."
}),
          createExplain({
            "id": "ee-06-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Робота, потужність, енергія, ККД та електробезпека»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Work, Power, Energy, Efficiency & Electrical Safety':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-06-l2",
        titleUk: "Робота, потужність, енергія, ККД та електробезпека (Частина 2)",
        titleEn: "Work, Power, Energy, Efficiency & Electrical Safety (Part 2)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-06-l2-c1",
            "promptUk": "Теоретичні основи: Робота, потужність, енергія, ККД та електробезпека (Частина 2)",
            "promptEn": "Theoretical Foundations: Work, Power, Energy, Efficiency & Electrical Safety (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Робота, потужність, енергія, ККД та електробезпека». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Work, Power, Energy, Efficiency & Electrical Safety'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-06-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Робота, потужність, енергія, ККД та електробезпека»?",
            "promptEn": "Which core statement is correct regarding 'Work, Power, Energy, Efficiency & Electrical Safety'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-06-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 38 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 38 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 57.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 38 * 1.5 = 57.0 В.",
            "explanationEn": "Calculation follows direct scaling: 38 * 1.5 = 57.0 V."
}),
          createNumeric({
            "id": "ee-06-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 38 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 38 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.658,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 38 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 38 A."
}),
          createExplain({
            "id": "ee-06-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Робота, потужність, енергія, ККД та електробезпека»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Work, Power, Energy, Efficiency & Electrical Safety':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-06-l3",
        titleUk: "Робота, потужність, енергія, ККД та електробезпека (Частина 3)",
        titleEn: "Work, Power, Energy, Efficiency & Electrical Safety (Part 3)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-06-l3-c1",
            "promptUk": "Теоретичні основи: Робота, потужність, енергія, ККД та електробезпека (Частина 3)",
            "promptEn": "Theoretical Foundations: Work, Power, Energy, Efficiency & Electrical Safety (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Робота, потужність, енергія, ККД та електробезпека». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Work, Power, Energy, Efficiency & Electrical Safety'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-06-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Робота, потужність, енергія, ККД та електробезпека»?",
            "promptEn": "Which core statement is correct regarding 'Work, Power, Energy, Efficiency & Electrical Safety'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-06-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 43 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 43 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 64.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 43 * 1.5 = 64.5 В.",
            "explanationEn": "Calculation follows direct scaling: 43 * 1.5 = 64.5 V."
}),
          createNumeric({
            "id": "ee-06-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 43 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 43 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.581,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 43 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 43 A."
}),
          createExplain({
            "id": "ee-06-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Робота, потужність, енергія, ККД та електробезпека»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Work, Power, Energy, Efficiency & Electrical Safety':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-06-l4",
        titleUk: "Робота, потужність, енергія, ККД та електробезпека (Частина 4)",
        titleEn: "Work, Power, Energy, Efficiency & Electrical Safety (Part 4)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-06-l4-c1",
            "promptUk": "Теоретичні основи: Робота, потужність, енергія, ККД та електробезпека (Частина 4)",
            "promptEn": "Theoretical Foundations: Work, Power, Energy, Efficiency & Electrical Safety (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Робота, потужність, енергія, ККД та електробезпека». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Work, Power, Energy, Efficiency & Electrical Safety'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-06-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Робота, потужність, енергія, ККД та електробезпека»?",
            "promptEn": "Which core statement is correct regarding 'Work, Power, Energy, Efficiency & Electrical Safety'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-06-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 48 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 48 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 72.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 48 * 1.5 = 72.0 В.",
            "explanationEn": "Calculation follows direct scaling: 48 * 1.5 = 72.0 V."
}),
          createNumeric({
            "id": "ee-06-l4-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 48 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 48 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.521,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 48 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 48 A."
}),
          createExplain({
            "id": "ee-06-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Робота, потужність, енергія, ККД та електробезпека»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Work, Power, Energy, Efficiency & Electrical Safety':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-06-l5",
        titleUk: "Робота, потужність, енергія, ККД та електробезпека (Частина 5)",
        titleEn: "Work, Power, Energy, Efficiency & Electrical Safety (Part 5)",
        difficulty: 1,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-06-l5-c1",
            "promptUk": "Теоретичні основи: Робота, потужність, енергія, ККД та електробезпека (Частина 5)",
            "promptEn": "Theoretical Foundations: Work, Power, Energy, Efficiency & Electrical Safety (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Робота, потужність, енергія, ККД та електробезпека». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Work, Power, Energy, Efficiency & Electrical Safety'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-06-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Робота, потужність, енергія, ККД та електробезпека»?",
            "promptEn": "Which core statement is correct regarding 'Work, Power, Energy, Efficiency & Electrical Safety'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-06-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 53 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 53 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 79.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 53 * 1.5 = 79.5 В.",
            "explanationEn": "Calculation follows direct scaling: 53 * 1.5 = 79.5 V."
}),
          createNumeric({
            "id": "ee-06-l5-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 53 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 53 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.472,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 53 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 53 A."
}),
          createExplain({
            "id": "ee-06-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Робота, потужність, енергія, ККД та електробезпека»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Work, Power, Energy, Efficiency & Electrical Safety':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-06-exam",
        titleUk: "Екзамен: Робота, потужність, енергія, ККД та електробезпека",
        titleEn: "Exam: Work, Power, Energy, Efficiency & Electrical Safety",
        difficulty: 1,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-06-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Робота, потужність, енергія, ККД та електробезпека»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Work, Power, Energy, Efficiency & Electrical Safety'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 1)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 1)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-06-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Робота, потужність, енергія, ККД та електробезпека»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Work, Power, Energy, Efficiency & Electrical Safety'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 2)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 2)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-06-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Робота, потужність, енергія, ККД та електробезпека»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Work, Power, Energy, Efficiency & Electrical Safety'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 3)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 3)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-06-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Робота, потужність, енергія, ККД та електробезпека»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Work, Power, Energy, Efficiency & Electrical Safety'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 4)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 4)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createNumeric({
            "id": "ee-06-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 70 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 70 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 35.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 70 = 35.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 70 = 35.0 V."
}),
          createNumeric({
            "id": "ee-06-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 72 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 72 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 36.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 72 = 36.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 72 = 36.0 V."
}),
          createNumeric({
            "id": "ee-06-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 74 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 74 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 37.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 74 = 37.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 74 = 37.0 V."
}),
          createNumeric({
            "id": "ee-06-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 76 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 76 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 38.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 76 = 38.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 76 = 38.0 V."
}),
          createNumeric({
            "id": "ee-06-exam-n9",
            "promptUk": "Екзаменаційне завдання 9: Обчисліть потужність при напрузі 57 В та струмі 2 А:",
            "promptEn": "Exam Task 9: Calculate power at voltage 57 V and current 2 A:",
            "formula": "P = V \\cdot I",
            "target": 114,
            "unit": "W",
            "absTolerance": 0.2,
            "relTolerance": 0.02,
            "explanationUk": "Потужність P = 57 * 2 = 114 Вт.",
            "explanationEn": "Power P = 57 * 2 = 114 W."
}),
          createNumeric({
            "id": "ee-06-exam-n10",
            "promptUk": "Екзаменаційне завдання 10: Обчисліть потужність при напрузі 60 В та струмі 2 А:",
            "promptEn": "Exam Task 10: Calculate power at voltage 60 V and current 2 A:",
            "formula": "P = V \\cdot I",
            "target": 120,
            "unit": "W",
            "absTolerance": 0.2,
            "relTolerance": 0.02,
            "explanationUk": "Потужність P = 60 * 2 = 120 Вт.",
            "explanationEn": "Power P = 60 * 2 = 120 W."
}),
        ],
      }),
    ],
  }),
];