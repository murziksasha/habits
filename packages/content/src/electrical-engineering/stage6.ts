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
 * Stage 6: 6 Units, 36 Lessons (5 instructional + 1 exam per unit)
 */
export const stage6Units: UnitContent[] = [
  createUnit({
    slug: "ee-31-filters-laplace",
    titleUk: "Пасивні та активні фільтри, передатна функція, Лаплас",
    titleEn: "Passive & Active Filters, Transfer Functions & Laplace",
    lessons: [
      createLesson({
        slug: "ee-31-l1",
        titleUk: "Пасивні та активні фільтри, передатна функція, Лаплас (Частина 1)",
        titleEn: "Passive & Active Filters, Transfer Functions & Laplace (Part 1)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-31-l1-c1",
            "promptUk": "Теоретичні основи: Пасивні та активні фільтри, передатна функція, Лаплас (Частина 1)",
            "promptEn": "Theoretical Foundations: Passive & Active Filters, Transfer Functions & Laplace (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Пасивні та активні фільтри, передатна функція, Лаплас». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Passive & Active Filters, Transfer Functions & Laplace'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-31-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Пасивні та активні фільтри, передатна функція, Лаплас»?",
            "promptEn": "Which core statement is correct regarding 'Passive & Active Filters, Transfer Functions & Laplace'?",
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
            "id": "ee-31-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 108 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 108 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 162.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 108 * 1.5 = 162.0 В.",
            "explanationEn": "Calculation follows direct scaling: 108 * 1.5 = 162.0 V."
}),
          createNumeric({
            "id": "ee-31-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 108 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 108 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.231,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 108 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 108 A."
}),
          createExplain({
            "id": "ee-31-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Пасивні та активні фільтри, передатна функція, Лаплас»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Passive & Active Filters, Transfer Functions & Laplace':",
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
        slug: "ee-31-l2",
        titleUk: "Пасивні та активні фільтри, передатна функція, Лаплас (Частина 2)",
        titleEn: "Passive & Active Filters, Transfer Functions & Laplace (Part 2)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-31-l2-c1",
            "promptUk": "Теоретичні основи: Пасивні та активні фільтри, передатна функція, Лаплас (Частина 2)",
            "promptEn": "Theoretical Foundations: Passive & Active Filters, Transfer Functions & Laplace (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Пасивні та активні фільтри, передатна функція, Лаплас». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Passive & Active Filters, Transfer Functions & Laplace'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-31-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Пасивні та активні фільтри, передатна функція, Лаплас»?",
            "promptEn": "Which core statement is correct regarding 'Passive & Active Filters, Transfer Functions & Laplace'?",
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
            "id": "ee-31-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 13 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 13 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 19.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 13 * 1.5 = 19.5 В.",
            "explanationEn": "Calculation follows direct scaling: 13 * 1.5 = 19.5 V."
}),
          createNumeric({
            "id": "ee-31-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 13 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 13 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 1.923,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 13 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 13 A."
}),
          createExplain({
            "id": "ee-31-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Пасивні та активні фільтри, передатна функція, Лаплас»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Passive & Active Filters, Transfer Functions & Laplace':",
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
        slug: "ee-31-l3",
        titleUk: "Пасивні та активні фільтри, передатна функція, Лаплас (Частина 3)",
        titleEn: "Passive & Active Filters, Transfer Functions & Laplace (Part 3)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-31-l3-c1",
            "promptUk": "Теоретичні основи: Пасивні та активні фільтри, передатна функція, Лаплас (Частина 3)",
            "promptEn": "Theoretical Foundations: Passive & Active Filters, Transfer Functions & Laplace (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Пасивні та активні фільтри, передатна функція, Лаплас». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Passive & Active Filters, Transfer Functions & Laplace'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-31-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Пасивні та активні фільтри, передатна функція, Лаплас»?",
            "promptEn": "Which core statement is correct regarding 'Passive & Active Filters, Transfer Functions & Laplace'?",
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
            "id": "ee-31-l3-n1",
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
            "id": "ee-31-l3-n2",
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
            "id": "ee-31-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Пасивні та активні фільтри, передатна функція, Лаплас»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Passive & Active Filters, Transfer Functions & Laplace':",
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
        slug: "ee-31-l4",
        titleUk: "Пасивні та активні фільтри, передатна функція, Лаплас (Частина 4)",
        titleEn: "Passive & Active Filters, Transfer Functions & Laplace (Part 4)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-31-l4-c1",
            "promptUk": "Теоретичні основи: Пасивні та активні фільтри, передатна функція, Лаплас (Частина 4)",
            "promptEn": "Theoretical Foundations: Passive & Active Filters, Transfer Functions & Laplace (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Пасивні та активні фільтри, передатна функція, Лаплас». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Passive & Active Filters, Transfer Functions & Laplace'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-31-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Пасивні та активні фільтри, передатна функція, Лаплас»?",
            "promptEn": "Which core statement is correct regarding 'Passive & Active Filters, Transfer Functions & Laplace'?",
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
            "id": "ee-31-l4-n1",
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
          createCircuitLab({
            "id": "ee-31-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Пасивні та активні фільтри, передатна функція, Лаплас». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Passive & Active Filters, Transfer Functions & Laplace'. Run simulation and verify nodes.",
            "title": "Lab 31.4: Passive & Active Filters, Transfer Functions & Laplace",
            "netlist": "* EduForge SPICE Model for Unit 31\nV1 in 0 DC 10\nR1 in out 23k\nR2 out 0 16k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 4.103,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-31-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Пасивні та активні фільтри, передатна функція, Лаплас»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Passive & Active Filters, Transfer Functions & Laplace':",
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
        slug: "ee-31-l5",
        titleUk: "Пасивні та активні фільтри, передатна функція, Лаплас (Частина 5)",
        titleEn: "Passive & Active Filters, Transfer Functions & Laplace (Part 5)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-31-l5-c1",
            "promptUk": "Теоретичні основи: Пасивні та активні фільтри, передатна функція, Лаплас (Частина 5)",
            "promptEn": "Theoretical Foundations: Passive & Active Filters, Transfer Functions & Laplace (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Пасивні та активні фільтри, передатна функція, Лаплас». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Passive & Active Filters, Transfer Functions & Laplace'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-31-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Пасивні та активні фільтри, передатна функція, Лаплас»?",
            "promptEn": "Which core statement is correct regarding 'Passive & Active Filters, Transfer Functions & Laplace'?",
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
            "id": "ee-31-l5-n1",
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
          createCircuitLab({
            "id": "ee-31-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Пасивні та активні фільтри, передатна функція, Лаплас». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Passive & Active Filters, Transfer Functions & Laplace'. Run simulation and verify nodes.",
            "title": "Lab 31.5: Passive & Active Filters, Transfer Functions & Laplace",
            "netlist": "* EduForge SPICE Model for Unit 31\nV1 in 0 DC 10\nR1 in out 28k\nR2 out 0 27k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 4.909,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-31-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Пасивні та активні фільтри, передатна функція, Лаплас»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Passive & Active Filters, Transfer Functions & Laplace':",
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
        slug: "ee-31-exam",
        titleUk: "Екзамен: Пасивні та активні фільтри, передатна функція, Лаплас",
        titleEn: "Exam: Passive & Active Filters, Transfer Functions & Laplace",
        difficulty: 4,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-31-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Пасивні та активні фільтри, передатна функція, Лаплас»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Passive & Active Filters, Transfer Functions & Laplace'?",
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
            "id": "ee-31-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Пасивні та активні фільтри, передатна функція, Лаплас»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Passive & Active Filters, Transfer Functions & Laplace'?",
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
            "id": "ee-31-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Пасивні та активні фільтри, передатна функція, Лаплас»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Passive & Active Filters, Transfer Functions & Laplace'?",
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
            "id": "ee-31-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Пасивні та активні фільтри, передатна функція, Лаплас»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Passive & Active Filters, Transfer Functions & Laplace'?",
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
            "id": "ee-31-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 320 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 320 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 160.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 320 = 160.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 320 = 160.0 V."
}),
          createNumeric({
            "id": "ee-31-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 322 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 322 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 161.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 322 = 161.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 322 = 161.0 V."
}),
          createNumeric({
            "id": "ee-31-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 324 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 324 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 162.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 324 = 162.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 324 = 162.0 V."
}),
          createNumeric({
            "id": "ee-31-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 326 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 326 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 163.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 326 = 163.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 326 = 163.0 V."
}),
          createCircuitLab({
            "id": "ee-31-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Пасивні та активні фільтри, передатна функція, Лаплас».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Passive & Active Filters, Transfer Functions & Laplace'.",
            "title": "Exam Lab 31.9: Passive & Active Filters, Transfer Functions & Laplace",
            "netlist": "* Exam Model 31_9\nV1 in 0 DC 12\nR1 in out 40k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.4,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
          createCircuitLab({
            "id": "ee-31-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Пасивні та активні фільтри, передатна функція, Лаплас».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Passive & Active Filters, Transfer Functions & Laplace'.",
            "title": "Exam Lab 31.10: Passive & Active Filters, Transfer Functions & Laplace",
            "netlist": "* Exam Model 31_10\nV1 in 0 DC 12\nR1 in out 41k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.353,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
        ],
      }),
    ],
  }),
  createUnit({
    slug: "ee-32-real-opamps",
    titleUk: "Реальні підсилювачі: смуга, насичення, шум, компенсація",
    titleEn: "Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation",
    lessons: [
      createLesson({
        slug: "ee-32-l1",
        titleUk: "Реальні підсилювачі: смуга, насичення, шум, компенсація (Частина 1)",
        titleEn: "Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation (Part 1)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-32-l1-c1",
            "promptUk": "Теоретичні основи: Реальні підсилювачі: смуга, насичення, шум, компенсація (Частина 1)",
            "promptEn": "Theoretical Foundations: Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Реальні підсилювачі: смуга, насичення, шум, компенсація». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-32-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Реальні підсилювачі: смуга, насичення, шум, компенсація»?",
            "promptEn": "Which core statement is correct regarding 'Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation'?",
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
            "id": "ee-32-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 11 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 11 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 16.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 11 * 1.5 = 16.5 В.",
            "explanationEn": "Calculation follows direct scaling: 11 * 1.5 = 16.5 V."
}),
          createNumeric({
            "id": "ee-32-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 11 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 11 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 2.273,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 11 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 11 A."
}),
          createExplain({
            "id": "ee-32-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Реальні підсилювачі: смуга, насичення, шум, компенсація»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation':",
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
        slug: "ee-32-l2",
        titleUk: "Реальні підсилювачі: смуга, насичення, шум, компенсація (Частина 2)",
        titleEn: "Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation (Part 2)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-32-l2-c1",
            "promptUk": "Теоретичні основи: Реальні підсилювачі: смуга, насичення, шум, компенсація (Частина 2)",
            "promptEn": "Theoretical Foundations: Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Реальні підсилювачі: смуга, насичення, шум, компенсація». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-32-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Реальні підсилювачі: смуга, насичення, шум, компенсація»?",
            "promptEn": "Which core statement is correct regarding 'Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation'?",
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
            "id": "ee-32-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 16 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 16 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 24.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 16 * 1.5 = 24.0 В.",
            "explanationEn": "Calculation follows direct scaling: 16 * 1.5 = 24.0 V."
}),
          createNumeric({
            "id": "ee-32-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 16 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 16 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 1.562,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 16 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 16 A."
}),
          createExplain({
            "id": "ee-32-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Реальні підсилювачі: смуга, насичення, шум, компенсація»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation':",
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
        slug: "ee-32-l3",
        titleUk: "Реальні підсилювачі: смуга, насичення, шум, компенсація (Частина 3)",
        titleEn: "Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation (Part 3)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-32-l3-c1",
            "promptUk": "Теоретичні основи: Реальні підсилювачі: смуга, насичення, шум, компенсація (Частина 3)",
            "promptEn": "Theoretical Foundations: Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Реальні підсилювачі: смуга, насичення, шум, компенсація». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-32-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Реальні підсилювачі: смуга, насичення, шум, компенсація»?",
            "promptEn": "Which core statement is correct regarding 'Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation'?",
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
            "id": "ee-32-l3-n1",
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
            "id": "ee-32-l3-n2",
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
            "id": "ee-32-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Реальні підсилювачі: смуга, насичення, шум, компенсація»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation':",
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
        slug: "ee-32-l4",
        titleUk: "Реальні підсилювачі: смуга, насичення, шум, компенсація (Частина 4)",
        titleEn: "Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation (Part 4)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-32-l4-c1",
            "promptUk": "Теоретичні основи: Реальні підсилювачі: смуга, насичення, шум, компенсація (Частина 4)",
            "promptEn": "Theoretical Foundations: Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Реальні підсилювачі: смуга, насичення, шум, компенсація». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-32-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Реальні підсилювачі: смуга, насичення, шум, компенсація»?",
            "promptEn": "Which core statement is correct regarding 'Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation'?",
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
            "id": "ee-32-l4-n1",
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
          createCircuitLab({
            "id": "ee-32-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Реальні підсилювачі: смуга, насичення, шум, компенсація». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation'. Run simulation and verify nodes.",
            "title": "Lab 32.4: Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation",
            "netlist": "* EduForge SPICE Model for Unit 32\nV1 in 0 DC 10\nR1 in out 26k\nR2 out 0 23k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 4.694,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-32-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Реальні підсилювачі: смуга, насичення, шум, компенсація»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation':",
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
        slug: "ee-32-l5",
        titleUk: "Реальні підсилювачі: смуга, насичення, шум, компенсація (Частина 5)",
        titleEn: "Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation (Part 5)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-32-l5-c1",
            "promptUk": "Теоретичні основи: Реальні підсилювачі: смуга, насичення, шум, компенсація (Частина 5)",
            "promptEn": "Theoretical Foundations: Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Реальні підсилювачі: смуга, насичення, шум, компенсація». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-32-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Реальні підсилювачі: смуга, насичення, шум, компенсація»?",
            "promptEn": "Which core statement is correct regarding 'Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation'?",
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
            "id": "ee-32-l5-n1",
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
          createCircuitLab({
            "id": "ee-32-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Реальні підсилювачі: смуга, насичення, шум, компенсація». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation'. Run simulation and verify nodes.",
            "title": "Lab 32.5: Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation",
            "netlist": "* EduForge SPICE Model for Unit 32\nV1 in 0 DC 10\nR1 in out 31k\nR2 out 0 34k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 5.231,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-32-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Реальні підсилювачі: смуга, насичення, шум, компенсація»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation':",
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
        slug: "ee-32-exam",
        titleUk: "Екзамен: Реальні підсилювачі: смуга, насичення, шум, компенсація",
        titleEn: "Exam: Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation",
        difficulty: 4,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-32-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Реальні підсилювачі: смуга, насичення, шум, компенсація»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation'?",
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
            "id": "ee-32-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Реальні підсилювачі: смуга, насичення, шум, компенсація»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation'?",
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
            "id": "ee-32-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Реальні підсилювачі: смуга, насичення, шум, компенсація»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation'?",
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
            "id": "ee-32-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Реальні підсилювачі: смуга, насичення, шум, компенсація»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation'?",
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
            "id": "ee-32-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 330 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 330 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 165.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 330 = 165.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 330 = 165.0 V."
}),
          createNumeric({
            "id": "ee-32-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 332 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 332 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 166.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 332 = 166.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 332 = 166.0 V."
}),
          createNumeric({
            "id": "ee-32-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 334 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 334 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 167.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 334 = 167.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 334 = 167.0 V."
}),
          createNumeric({
            "id": "ee-32-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 336 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 336 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 168.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 336 = 168.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 336 = 168.0 V."
}),
          createCircuitLab({
            "id": "ee-32-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Реальні підсилювачі: смуга, насичення, шум, компенсація».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation'.",
            "title": "Exam Lab 32.9: Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation",
            "netlist": "* Exam Model 32_9\nV1 in 0 DC 12\nR1 in out 41k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.353,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
          createCircuitLab({
            "id": "ee-32-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Реальні підсилювачі: смуга, насичення, шум, компенсація».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation'.",
            "title": "Exam Lab 32.10: Real Op-Amps: Bandwidth, Slew Rate, Noise & Compensation",
            "netlist": "* Exam Model 32_10\nV1 in 0 DC 12\nR1 in out 42k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.308,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
        ],
      }),
    ],
  }),
  createUnit({
    slug: "ee-33-comparators-timers",
    titleUk: "Компаратори, гістерезис, генератори та таймер 555",
    titleEn: "Comparators, Hysteresis, Oscillators & 555 Timers",
    lessons: [
      createLesson({
        slug: "ee-33-l1",
        titleUk: "Компаратори, гістерезис, генератори та таймер 555 (Частина 1)",
        titleEn: "Comparators, Hysteresis, Oscillators & 555 Timers (Part 1)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-33-l1-c1",
            "promptUk": "Теоретичні основи: Компаратори, гістерезис, генератори та таймер 555 (Частина 1)",
            "promptEn": "Theoretical Foundations: Comparators, Hysteresis, Oscillators & 555 Timers (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Компаратори, гістерезис, генератори та таймер 555». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Comparators, Hysteresis, Oscillators & 555 Timers'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-33-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Компаратори, гістерезис, генератори та таймер 555»?",
            "promptEn": "Which core statement is correct regarding 'Comparators, Hysteresis, Oscillators & 555 Timers'?",
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
            "id": "ee-33-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 14 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 14 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 21.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 14 * 1.5 = 21.0 В.",
            "explanationEn": "Calculation follows direct scaling: 14 * 1.5 = 21.0 V."
}),
          createNumeric({
            "id": "ee-33-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 14 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 14 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 1.786,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 14 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 14 A."
}),
          createExplain({
            "id": "ee-33-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Компаратори, гістерезис, генератори та таймер 555»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Comparators, Hysteresis, Oscillators & 555 Timers':",
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
        slug: "ee-33-l2",
        titleUk: "Компаратори, гістерезис, генератори та таймер 555 (Частина 2)",
        titleEn: "Comparators, Hysteresis, Oscillators & 555 Timers (Part 2)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-33-l2-c1",
            "promptUk": "Теоретичні основи: Компаратори, гістерезис, генератори та таймер 555 (Частина 2)",
            "promptEn": "Theoretical Foundations: Comparators, Hysteresis, Oscillators & 555 Timers (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Компаратори, гістерезис, генератори та таймер 555». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Comparators, Hysteresis, Oscillators & 555 Timers'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-33-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Компаратори, гістерезис, генератори та таймер 555»?",
            "promptEn": "Which core statement is correct regarding 'Comparators, Hysteresis, Oscillators & 555 Timers'?",
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
            "id": "ee-33-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 19 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 19 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 28.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 19 * 1.5 = 28.5 В.",
            "explanationEn": "Calculation follows direct scaling: 19 * 1.5 = 28.5 V."
}),
          createNumeric({
            "id": "ee-33-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 19 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 19 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 1.316,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 19 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 19 A."
}),
          createExplain({
            "id": "ee-33-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Компаратори, гістерезис, генератори та таймер 555»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Comparators, Hysteresis, Oscillators & 555 Timers':",
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
        slug: "ee-33-l3",
        titleUk: "Компаратори, гістерезис, генератори та таймер 555 (Частина 3)",
        titleEn: "Comparators, Hysteresis, Oscillators & 555 Timers (Part 3)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-33-l3-c1",
            "promptUk": "Теоретичні основи: Компаратори, гістерезис, генератори та таймер 555 (Частина 3)",
            "promptEn": "Theoretical Foundations: Comparators, Hysteresis, Oscillators & 555 Timers (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Компаратори, гістерезис, генератори та таймер 555». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Comparators, Hysteresis, Oscillators & 555 Timers'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-33-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Компаратори, гістерезис, генератори та таймер 555»?",
            "promptEn": "Which core statement is correct regarding 'Comparators, Hysteresis, Oscillators & 555 Timers'?",
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
            "id": "ee-33-l3-n1",
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
            "id": "ee-33-l3-n2",
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
            "id": "ee-33-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Компаратори, гістерезис, генератори та таймер 555»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Comparators, Hysteresis, Oscillators & 555 Timers':",
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
        slug: "ee-33-l4",
        titleUk: "Компаратори, гістерезис, генератори та таймер 555 (Частина 4)",
        titleEn: "Comparators, Hysteresis, Oscillators & 555 Timers (Part 4)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-33-l4-c1",
            "promptUk": "Теоретичні основи: Компаратори, гістерезис, генератори та таймер 555 (Частина 4)",
            "promptEn": "Theoretical Foundations: Comparators, Hysteresis, Oscillators & 555 Timers (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Компаратори, гістерезис, генератори та таймер 555». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Comparators, Hysteresis, Oscillators & 555 Timers'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-33-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Компаратори, гістерезис, генератори та таймер 555»?",
            "promptEn": "Which core statement is correct regarding 'Comparators, Hysteresis, Oscillators & 555 Timers'?",
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
            "id": "ee-33-l4-n1",
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
          createCircuitLab({
            "id": "ee-33-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Компаратори, гістерезис, генератори та таймер 555». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Comparators, Hysteresis, Oscillators & 555 Timers'. Run simulation and verify nodes.",
            "title": "Lab 33.4: Comparators, Hysteresis, Oscillators & 555 Timers",
            "netlist": "* EduForge SPICE Model for Unit 33\nV1 in 0 DC 10\nR1 in out 29k\nR2 out 0 30k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 5.085,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-33-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Компаратори, гістерезис, генератори та таймер 555»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Comparators, Hysteresis, Oscillators & 555 Timers':",
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
        slug: "ee-33-l5",
        titleUk: "Компаратори, гістерезис, генератори та таймер 555 (Частина 5)",
        titleEn: "Comparators, Hysteresis, Oscillators & 555 Timers (Part 5)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-33-l5-c1",
            "promptUk": "Теоретичні основи: Компаратори, гістерезис, генератори та таймер 555 (Частина 5)",
            "promptEn": "Theoretical Foundations: Comparators, Hysteresis, Oscillators & 555 Timers (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Компаратори, гістерезис, генератори та таймер 555». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Comparators, Hysteresis, Oscillators & 555 Timers'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-33-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Компаратори, гістерезис, генератори та таймер 555»?",
            "promptEn": "Which core statement is correct regarding 'Comparators, Hysteresis, Oscillators & 555 Timers'?",
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
            "id": "ee-33-l5-n1",
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
          createCircuitLab({
            "id": "ee-33-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Компаратори, гістерезис, генератори та таймер 555». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Comparators, Hysteresis, Oscillators & 555 Timers'. Run simulation and verify nodes.",
            "title": "Lab 33.5: Comparators, Hysteresis, Oscillators & 555 Timers",
            "netlist": "* EduForge SPICE Model for Unit 33\nV1 in 0 DC 10\nR1 in out 34k\nR2 out 0 41k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 5.467,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-33-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Компаратори, гістерезис, генератори та таймер 555»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Comparators, Hysteresis, Oscillators & 555 Timers':",
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
        slug: "ee-33-exam",
        titleUk: "Екзамен: Компаратори, гістерезис, генератори та таймер 555",
        titleEn: "Exam: Comparators, Hysteresis, Oscillators & 555 Timers",
        difficulty: 4,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-33-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Компаратори, гістерезис, генератори та таймер 555»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Comparators, Hysteresis, Oscillators & 555 Timers'?",
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
            "id": "ee-33-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Компаратори, гістерезис, генератори та таймер 555»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Comparators, Hysteresis, Oscillators & 555 Timers'?",
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
            "id": "ee-33-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Компаратори, гістерезис, генератори та таймер 555»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Comparators, Hysteresis, Oscillators & 555 Timers'?",
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
            "id": "ee-33-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Компаратори, гістерезис, генератори та таймер 555»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Comparators, Hysteresis, Oscillators & 555 Timers'?",
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
            "id": "ee-33-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 340 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 340 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 170.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 340 = 170.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 340 = 170.0 V."
}),
          createNumeric({
            "id": "ee-33-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 342 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 342 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 171.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 342 = 171.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 342 = 171.0 V."
}),
          createNumeric({
            "id": "ee-33-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 344 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 344 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 172.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 344 = 172.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 344 = 172.0 V."
}),
          createNumeric({
            "id": "ee-33-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 346 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 346 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 173.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 346 = 173.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 346 = 173.0 V."
}),
          createCircuitLab({
            "id": "ee-33-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Компаратори, гістерезис, генератори та таймер 555».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Comparators, Hysteresis, Oscillators & 555 Timers'.",
            "title": "Exam Lab 33.9: Comparators, Hysteresis, Oscillators & 555 Timers",
            "netlist": "* Exam Model 33_9\nV1 in 0 DC 12\nR1 in out 42k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.308,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
          createCircuitLab({
            "id": "ee-33-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Компаратори, гістерезис, генератори та таймер 555».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Comparators, Hysteresis, Oscillators & 555 Timers'.",
            "title": "Exam Lab 33.10: Comparators, Hysteresis, Oscillators & 555 Timers",
            "netlist": "* Exam Model 33_10\nV1 in 0 DC 12\nR1 in out 43k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.264,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
        ],
      }),
    ],
  }),
  createUnit({
    slug: "ee-34-boolean-cmos",
    titleUk: "Булева алгебра, логічні елементи та рівні CMOS",
    titleEn: "Boolean Algebra, Logic Gates & CMOS Levels",
    lessons: [
      createLesson({
        slug: "ee-34-l1",
        titleUk: "Булева алгебра, логічні елементи та рівні CMOS (Частина 1)",
        titleEn: "Boolean Algebra, Logic Gates & CMOS Levels (Part 1)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-34-l1-c1",
            "promptUk": "Теоретичні основи: Булева алгебра, логічні елементи та рівні CMOS (Частина 1)",
            "promptEn": "Theoretical Foundations: Boolean Algebra, Logic Gates & CMOS Levels (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Булева алгебра, логічні елементи та рівні CMOS». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Boolean Algebra, Logic Gates & CMOS Levels'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-34-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Булева алгебра, логічні елементи та рівні CMOS»?",
            "promptEn": "Which core statement is correct regarding 'Boolean Algebra, Logic Gates & CMOS Levels'?",
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
            "id": "ee-34-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 17 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 17 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 25.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 17 * 1.5 = 25.5 В.",
            "explanationEn": "Calculation follows direct scaling: 17 * 1.5 = 25.5 V."
}),
          createNumeric({
            "id": "ee-34-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 17 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 17 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 1.471,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 17 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 17 A."
}),
          createExplain({
            "id": "ee-34-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Булева алгебра, логічні елементи та рівні CMOS»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Boolean Algebra, Logic Gates & CMOS Levels':",
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
        slug: "ee-34-l2",
        titleUk: "Булева алгебра, логічні елементи та рівні CMOS (Частина 2)",
        titleEn: "Boolean Algebra, Logic Gates & CMOS Levels (Part 2)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-34-l2-c1",
            "promptUk": "Теоретичні основи: Булева алгебра, логічні елементи та рівні CMOS (Частина 2)",
            "promptEn": "Theoretical Foundations: Boolean Algebra, Logic Gates & CMOS Levels (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Булева алгебра, логічні елементи та рівні CMOS». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Boolean Algebra, Logic Gates & CMOS Levels'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-34-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Булева алгебра, логічні елементи та рівні CMOS»?",
            "promptEn": "Which core statement is correct regarding 'Boolean Algebra, Logic Gates & CMOS Levels'?",
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
            "id": "ee-34-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 22 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 22 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 33.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 22 * 1.5 = 33.0 В.",
            "explanationEn": "Calculation follows direct scaling: 22 * 1.5 = 33.0 V."
}),
          createNumeric({
            "id": "ee-34-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 22 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 22 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 1.136,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 22 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 22 A."
}),
          createExplain({
            "id": "ee-34-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Булева алгебра, логічні елементи та рівні CMOS»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Boolean Algebra, Logic Gates & CMOS Levels':",
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
        slug: "ee-34-l3",
        titleUk: "Булева алгебра, логічні елементи та рівні CMOS (Частина 3)",
        titleEn: "Boolean Algebra, Logic Gates & CMOS Levels (Part 3)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-34-l3-c1",
            "promptUk": "Теоретичні основи: Булева алгебра, логічні елементи та рівні CMOS (Частина 3)",
            "promptEn": "Theoretical Foundations: Boolean Algebra, Logic Gates & CMOS Levels (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Булева алгебра, логічні елементи та рівні CMOS». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Boolean Algebra, Logic Gates & CMOS Levels'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-34-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Булева алгебра, логічні елементи та рівні CMOS»?",
            "promptEn": "Which core statement is correct regarding 'Boolean Algebra, Logic Gates & CMOS Levels'?",
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
            "id": "ee-34-l3-n1",
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
            "id": "ee-34-l3-n2",
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
            "id": "ee-34-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Булева алгебра, логічні елементи та рівні CMOS»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Boolean Algebra, Logic Gates & CMOS Levels':",
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
        slug: "ee-34-l4",
        titleUk: "Булева алгебра, логічні елементи та рівні CMOS (Частина 4)",
        titleEn: "Boolean Algebra, Logic Gates & CMOS Levels (Part 4)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-34-l4-c1",
            "promptUk": "Теоретичні основи: Булева алгебра, логічні елементи та рівні CMOS (Частина 4)",
            "promptEn": "Theoretical Foundations: Boolean Algebra, Logic Gates & CMOS Levels (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Булева алгебра, логічні елементи та рівні CMOS». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Boolean Algebra, Logic Gates & CMOS Levels'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-34-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Булева алгебра, логічні елементи та рівні CMOS»?",
            "promptEn": "Which core statement is correct regarding 'Boolean Algebra, Logic Gates & CMOS Levels'?",
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
            "id": "ee-34-l4-n1",
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
          createCircuitLab({
            "id": "ee-34-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Булева алгебра, логічні елементи та рівні CMOS». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Boolean Algebra, Logic Gates & CMOS Levels'. Run simulation and verify nodes.",
            "title": "Lab 34.4: Boolean Algebra, Logic Gates & CMOS Levels",
            "netlist": "* EduForge SPICE Model for Unit 34\nV1 in 0 DC 10\nR1 in out 32k\nR2 out 0 37k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 5.362,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-34-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Булева алгебра, логічні елементи та рівні CMOS»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Boolean Algebra, Logic Gates & CMOS Levels':",
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
        slug: "ee-34-l5",
        titleUk: "Булева алгебра, логічні елементи та рівні CMOS (Частина 5)",
        titleEn: "Boolean Algebra, Logic Gates & CMOS Levels (Part 5)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-34-l5-c1",
            "promptUk": "Теоретичні основи: Булева алгебра, логічні елементи та рівні CMOS (Частина 5)",
            "promptEn": "Theoretical Foundations: Boolean Algebra, Logic Gates & CMOS Levels (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Булева алгебра, логічні елементи та рівні CMOS». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Boolean Algebra, Logic Gates & CMOS Levels'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-34-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Булева алгебра, логічні елементи та рівні CMOS»?",
            "promptEn": "Which core statement is correct regarding 'Boolean Algebra, Logic Gates & CMOS Levels'?",
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
            "id": "ee-34-l5-n1",
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
          createCircuitLab({
            "id": "ee-34-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Булева алгебра, логічні елементи та рівні CMOS». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Boolean Algebra, Logic Gates & CMOS Levels'. Run simulation and verify nodes.",
            "title": "Lab 34.5: Boolean Algebra, Logic Gates & CMOS Levels",
            "netlist": "* EduForge SPICE Model for Unit 34\nV1 in 0 DC 10\nR1 in out 37k\nR2 out 0 48k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 5.647,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-34-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Булева алгебра, логічні елементи та рівні CMOS»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Boolean Algebra, Logic Gates & CMOS Levels':",
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
        slug: "ee-34-exam",
        titleUk: "Екзамен: Булева алгебра, логічні елементи та рівні CMOS",
        titleEn: "Exam: Boolean Algebra, Logic Gates & CMOS Levels",
        difficulty: 4,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-34-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Булева алгебра, логічні елементи та рівні CMOS»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Boolean Algebra, Logic Gates & CMOS Levels'?",
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
            "id": "ee-34-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Булева алгебра, логічні елементи та рівні CMOS»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Boolean Algebra, Logic Gates & CMOS Levels'?",
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
            "id": "ee-34-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Булева алгебра, логічні елементи та рівні CMOS»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Boolean Algebra, Logic Gates & CMOS Levels'?",
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
            "id": "ee-34-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Булева алгебра, логічні елементи та рівні CMOS»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Boolean Algebra, Logic Gates & CMOS Levels'?",
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
            "id": "ee-34-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 350 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 350 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 175.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 350 = 175.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 350 = 175.0 V."
}),
          createNumeric({
            "id": "ee-34-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 352 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 352 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 176.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 352 = 176.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 352 = 176.0 V."
}),
          createNumeric({
            "id": "ee-34-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 354 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 354 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 177.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 354 = 177.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 354 = 177.0 V."
}),
          createNumeric({
            "id": "ee-34-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 356 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 356 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 178.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 356 = 178.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 356 = 178.0 V."
}),
          createCircuitLab({
            "id": "ee-34-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Булева алгебра, логічні елементи та рівні CMOS».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Boolean Algebra, Logic Gates & CMOS Levels'.",
            "title": "Exam Lab 34.9: Boolean Algebra, Logic Gates & CMOS Levels",
            "netlist": "* Exam Model 34_9\nV1 in 0 DC 12\nR1 in out 43k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.264,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
          createCircuitLab({
            "id": "ee-34-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Булева алгебра, логічні елементи та рівні CMOS».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Boolean Algebra, Logic Gates & CMOS Levels'.",
            "title": "Exam Lab 34.10: Boolean Algebra, Logic Gates & CMOS Levels",
            "netlist": "* Exam Model 34_10\nV1 in 0 DC 12\nR1 in out 44k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.222,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
        ],
      }),
    ],
  }),
  createUnit({
    slug: "ee-35-flipflops-counters",
    titleUk: "Тригери, лічильники, часові діаграми та керування",
    titleEn: "Flip-Flops, Counters, Timing Diagrams & Digital Control",
    lessons: [
      createLesson({
        slug: "ee-35-l1",
        titleUk: "Тригери, лічильники, часові діаграми та керування (Частина 1)",
        titleEn: "Flip-Flops, Counters, Timing Diagrams & Digital Control (Part 1)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-35-l1-c1",
            "promptUk": "Теоретичні основи: Тригери, лічильники, часові діаграми та керування (Частина 1)",
            "promptEn": "Theoretical Foundations: Flip-Flops, Counters, Timing Diagrams & Digital Control (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Тригери, лічильники, часові діаграми та керування». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Flip-Flops, Counters, Timing Diagrams & Digital Control'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-35-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Тригери, лічильники, часові діаграми та керування»?",
            "promptEn": "Which core statement is correct regarding 'Flip-Flops, Counters, Timing Diagrams & Digital Control'?",
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
            "id": "ee-35-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 20 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 20 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 30.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 20 * 1.5 = 30.0 В.",
            "explanationEn": "Calculation follows direct scaling: 20 * 1.5 = 30.0 V."
}),
          createNumeric({
            "id": "ee-35-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 20 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 20 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 1.25,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 20 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 20 A."
}),
          createExplain({
            "id": "ee-35-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Тригери, лічильники, часові діаграми та керування»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Flip-Flops, Counters, Timing Diagrams & Digital Control':",
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
        slug: "ee-35-l2",
        titleUk: "Тригери, лічильники, часові діаграми та керування (Частина 2)",
        titleEn: "Flip-Flops, Counters, Timing Diagrams & Digital Control (Part 2)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-35-l2-c1",
            "promptUk": "Теоретичні основи: Тригери, лічильники, часові діаграми та керування (Частина 2)",
            "promptEn": "Theoretical Foundations: Flip-Flops, Counters, Timing Diagrams & Digital Control (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Тригери, лічильники, часові діаграми та керування». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Flip-Flops, Counters, Timing Diagrams & Digital Control'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-35-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Тригери, лічильники, часові діаграми та керування»?",
            "promptEn": "Which core statement is correct regarding 'Flip-Flops, Counters, Timing Diagrams & Digital Control'?",
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
            "id": "ee-35-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 25 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 25 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 37.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 25 * 1.5 = 37.5 В.",
            "explanationEn": "Calculation follows direct scaling: 25 * 1.5 = 37.5 V."
}),
          createNumeric({
            "id": "ee-35-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 25 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 25 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 1.0,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 25 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 25 A."
}),
          createExplain({
            "id": "ee-35-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Тригери, лічильники, часові діаграми та керування»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Flip-Flops, Counters, Timing Diagrams & Digital Control':",
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
        slug: "ee-35-l3",
        titleUk: "Тригери, лічильники, часові діаграми та керування (Частина 3)",
        titleEn: "Flip-Flops, Counters, Timing Diagrams & Digital Control (Part 3)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-35-l3-c1",
            "promptUk": "Теоретичні основи: Тригери, лічильники, часові діаграми та керування (Частина 3)",
            "promptEn": "Theoretical Foundations: Flip-Flops, Counters, Timing Diagrams & Digital Control (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Тригери, лічильники, часові діаграми та керування». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Flip-Flops, Counters, Timing Diagrams & Digital Control'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-35-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Тригери, лічильники, часові діаграми та керування»?",
            "promptEn": "Which core statement is correct regarding 'Flip-Flops, Counters, Timing Diagrams & Digital Control'?",
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
            "id": "ee-35-l3-n1",
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
            "id": "ee-35-l3-n2",
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
            "id": "ee-35-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Тригери, лічильники, часові діаграми та керування»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Flip-Flops, Counters, Timing Diagrams & Digital Control':",
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
        slug: "ee-35-l4",
        titleUk: "Тригери, лічильники, часові діаграми та керування (Частина 4)",
        titleEn: "Flip-Flops, Counters, Timing Diagrams & Digital Control (Part 4)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-35-l4-c1",
            "promptUk": "Теоретичні основи: Тригери, лічильники, часові діаграми та керування (Частина 4)",
            "promptEn": "Theoretical Foundations: Flip-Flops, Counters, Timing Diagrams & Digital Control (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Тригери, лічильники, часові діаграми та керування». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Flip-Flops, Counters, Timing Diagrams & Digital Control'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-35-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Тригери, лічильники, часові діаграми та керування»?",
            "promptEn": "Which core statement is correct regarding 'Flip-Flops, Counters, Timing Diagrams & Digital Control'?",
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
            "id": "ee-35-l4-n1",
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
          createCircuitLab({
            "id": "ee-35-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Тригери, лічильники, часові діаграми та керування». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Flip-Flops, Counters, Timing Diagrams & Digital Control'. Run simulation and verify nodes.",
            "title": "Lab 35.4: Flip-Flops, Counters, Timing Diagrams & Digital Control",
            "netlist": "* EduForge SPICE Model for Unit 35\nV1 in 0 DC 10\nR1 in out 35k\nR2 out 0 44k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 5.57,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-35-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Тригери, лічильники, часові діаграми та керування»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Flip-Flops, Counters, Timing Diagrams & Digital Control':",
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
        slug: "ee-35-l5",
        titleUk: "Тригери, лічильники, часові діаграми та керування (Частина 5)",
        titleEn: "Flip-Flops, Counters, Timing Diagrams & Digital Control (Part 5)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-35-l5-c1",
            "promptUk": "Теоретичні основи: Тригери, лічильники, часові діаграми та керування (Частина 5)",
            "promptEn": "Theoretical Foundations: Flip-Flops, Counters, Timing Diagrams & Digital Control (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Тригери, лічильники, часові діаграми та керування». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Flip-Flops, Counters, Timing Diagrams & Digital Control'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-35-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Тригери, лічильники, часові діаграми та керування»?",
            "promptEn": "Which core statement is correct regarding 'Flip-Flops, Counters, Timing Diagrams & Digital Control'?",
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
            "id": "ee-35-l5-n1",
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
          createCircuitLab({
            "id": "ee-35-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Тригери, лічильники, часові діаграми та керування». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Flip-Flops, Counters, Timing Diagrams & Digital Control'. Run simulation and verify nodes.",
            "title": "Lab 35.5: Flip-Flops, Counters, Timing Diagrams & Digital Control",
            "netlist": "* EduForge SPICE Model for Unit 35\nV1 in 0 DC 10\nR1 in out 40k\nR2 out 0 5k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 1.111,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-35-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Тригери, лічильники, часові діаграми та керування»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Flip-Flops, Counters, Timing Diagrams & Digital Control':",
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
        slug: "ee-35-exam",
        titleUk: "Екзамен: Тригери, лічильники, часові діаграми та керування",
        titleEn: "Exam: Flip-Flops, Counters, Timing Diagrams & Digital Control",
        difficulty: 4,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-35-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Тригери, лічильники, часові діаграми та керування»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Flip-Flops, Counters, Timing Diagrams & Digital Control'?",
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
            "id": "ee-35-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Тригери, лічильники, часові діаграми та керування»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Flip-Flops, Counters, Timing Diagrams & Digital Control'?",
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
            "id": "ee-35-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Тригери, лічильники, часові діаграми та керування»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Flip-Flops, Counters, Timing Diagrams & Digital Control'?",
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
            "id": "ee-35-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Тригери, лічильники, часові діаграми та керування»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Flip-Flops, Counters, Timing Diagrams & Digital Control'?",
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
            "id": "ee-35-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 360 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 360 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 180.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 360 = 180.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 360 = 180.0 V."
}),
          createNumeric({
            "id": "ee-35-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 362 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 362 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 181.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 362 = 181.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 362 = 181.0 V."
}),
          createNumeric({
            "id": "ee-35-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 364 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 364 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 182.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 364 = 182.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 364 = 182.0 V."
}),
          createNumeric({
            "id": "ee-35-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 366 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 366 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 183.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 366 = 183.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 366 = 183.0 V."
}),
          createCircuitLab({
            "id": "ee-35-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Тригери, лічильники, часові діаграми та керування».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Flip-Flops, Counters, Timing Diagrams & Digital Control'.",
            "title": "Exam Lab 35.9: Flip-Flops, Counters, Timing Diagrams & Digital Control",
            "netlist": "* Exam Model 35_9\nV1 in 0 DC 12\nR1 in out 44k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.222,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
          createCircuitLab({
            "id": "ee-35-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Тригери, лічильники, часові діаграми та керування».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Flip-Flops, Counters, Timing Diagrams & Digital Control'.",
            "title": "Exam Lab 35.10: Flip-Flops, Counters, Timing Diagrams & Digital Control",
            "netlist": "* Exam Model 35_10\nV1 in 0 DC 12\nR1 in out 45k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.182,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
        ],
      }),
    ],
  }),
  createUnit({
    slug: "ee-36-sensors-adc-dac",
    titleUk: "Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси",
    titleEn: "Sensors, Measurement Bridges, ADC, DAC & Sampling",
    lessons: [
      createLesson({
        slug: "ee-36-l1",
        titleUk: "Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси (Частина 1)",
        titleEn: "Sensors, Measurement Bridges, ADC, DAC & Sampling (Part 1)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-36-l1-c1",
            "promptUk": "Теоретичні основи: Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси (Частина 1)",
            "promptEn": "Theoretical Foundations: Sensors, Measurement Bridges, ADC, DAC & Sampling (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Sensors, Measurement Bridges, ADC, DAC & Sampling'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-36-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси»?",
            "promptEn": "Which core statement is correct regarding 'Sensors, Measurement Bridges, ADC, DAC & Sampling'?",
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
            "id": "ee-36-l1-n1",
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
            "id": "ee-36-l1-n2",
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
            "id": "ee-36-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Sensors, Measurement Bridges, ADC, DAC & Sampling':",
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
        slug: "ee-36-l2",
        titleUk: "Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси (Частина 2)",
        titleEn: "Sensors, Measurement Bridges, ADC, DAC & Sampling (Part 2)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-36-l2-c1",
            "promptUk": "Теоретичні основи: Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси (Частина 2)",
            "promptEn": "Theoretical Foundations: Sensors, Measurement Bridges, ADC, DAC & Sampling (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Sensors, Measurement Bridges, ADC, DAC & Sampling'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-36-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси»?",
            "promptEn": "Which core statement is correct regarding 'Sensors, Measurement Bridges, ADC, DAC & Sampling'?",
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
            "id": "ee-36-l2-n1",
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
            "id": "ee-36-l2-n2",
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
            "id": "ee-36-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Sensors, Measurement Bridges, ADC, DAC & Sampling':",
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
        slug: "ee-36-l3",
        titleUk: "Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси (Частина 3)",
        titleEn: "Sensors, Measurement Bridges, ADC, DAC & Sampling (Part 3)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-36-l3-c1",
            "promptUk": "Теоретичні основи: Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси (Частина 3)",
            "promptEn": "Theoretical Foundations: Sensors, Measurement Bridges, ADC, DAC & Sampling (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Sensors, Measurement Bridges, ADC, DAC & Sampling'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-36-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси»?",
            "promptEn": "Which core statement is correct regarding 'Sensors, Measurement Bridges, ADC, DAC & Sampling'?",
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
            "id": "ee-36-l3-n1",
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
            "id": "ee-36-l3-n2",
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
            "id": "ee-36-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Sensors, Measurement Bridges, ADC, DAC & Sampling':",
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
        slug: "ee-36-l4",
        titleUk: "Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси (Частина 4)",
        titleEn: "Sensors, Measurement Bridges, ADC, DAC & Sampling (Part 4)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-36-l4-c1",
            "promptUk": "Теоретичні основи: Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси (Частина 4)",
            "promptEn": "Theoretical Foundations: Sensors, Measurement Bridges, ADC, DAC & Sampling (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Sensors, Measurement Bridges, ADC, DAC & Sampling'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-36-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси»?",
            "promptEn": "Which core statement is correct regarding 'Sensors, Measurement Bridges, ADC, DAC & Sampling'?",
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
            "id": "ee-36-l4-n1",
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
          createCircuitLab({
            "id": "ee-36-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Sensors, Measurement Bridges, ADC, DAC & Sampling'. Run simulation and verify nodes.",
            "title": "Lab 36.4: Sensors, Measurement Bridges, ADC, DAC & Sampling",
            "netlist": "* EduForge SPICE Model for Unit 36\nV1 in 0 DC 10\nR1 in out 38k\nR2 out 0 51k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 5.73,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-36-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Sensors, Measurement Bridges, ADC, DAC & Sampling':",
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
        slug: "ee-36-l5",
        titleUk: "Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси (Частина 5)",
        titleEn: "Sensors, Measurement Bridges, ADC, DAC & Sampling (Part 5)",
        difficulty: 3,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-36-l5-c1",
            "promptUk": "Теоретичні основи: Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси (Частина 5)",
            "promptEn": "Theoretical Foundations: Sensors, Measurement Bridges, ADC, DAC & Sampling (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Sensors, Measurement Bridges, ADC, DAC & Sampling'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-36-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси»?",
            "promptEn": "Which core statement is correct regarding 'Sensors, Measurement Bridges, ADC, DAC & Sampling'?",
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
            "id": "ee-36-l5-n1",
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
          createCircuitLab({
            "id": "ee-36-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Sensors, Measurement Bridges, ADC, DAC & Sampling'. Run simulation and verify nodes.",
            "title": "Lab 36.5: Sensors, Measurement Bridges, ADC, DAC & Sampling",
            "netlist": "* EduForge SPICE Model for Unit 36\nV1 in 0 DC 10\nR1 in out 43k\nR2 out 0 12k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.182,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-36-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Sensors, Measurement Bridges, ADC, DAC & Sampling':",
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
        slug: "ee-36-exam",
        titleUk: "Екзамен: Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси",
        titleEn: "Exam: Sensors, Measurement Bridges, ADC, DAC & Sampling",
        difficulty: 4,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-36-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Sensors, Measurement Bridges, ADC, DAC & Sampling'?",
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
            "id": "ee-36-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Sensors, Measurement Bridges, ADC, DAC & Sampling'?",
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
            "id": "ee-36-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Sensors, Measurement Bridges, ADC, DAC & Sampling'?",
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
            "id": "ee-36-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Sensors, Measurement Bridges, ADC, DAC & Sampling'?",
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
            "id": "ee-36-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 370 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 370 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 185.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 370 = 185.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 370 = 185.0 V."
}),
          createNumeric({
            "id": "ee-36-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 372 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 372 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 186.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 372 = 186.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 372 = 186.0 V."
}),
          createNumeric({
            "id": "ee-36-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 374 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 374 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 187.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 374 = 187.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 374 = 187.0 V."
}),
          createNumeric({
            "id": "ee-36-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 376 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 376 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 188.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 376 = 188.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 376 = 188.0 V."
}),
          createCircuitLab({
            "id": "ee-36-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Sensors, Measurement Bridges, ADC, DAC & Sampling'.",
            "title": "Exam Lab 36.9: Sensors, Measurement Bridges, ADC, DAC & Sampling",
            "netlist": "* Exam Model 36_9\nV1 in 0 DC 12\nR1 in out 45k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.182,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
          createCircuitLab({
            "id": "ee-36-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Датчики, мости, АЦП, ЦАП, дискретизація та інтерфейси».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Sensors, Measurement Bridges, ADC, DAC & Sampling'.",
            "title": "Exam Lab 36.10: Sensors, Measurement Bridges, ADC, DAC & Sampling",
            "netlist": "* Exam Model 36_10\nV1 in 0 DC 12\nR1 in out 46k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.143,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
        ],
      }),
    ],
  }),
];