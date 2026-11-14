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
 * Stage 4: 6 Units, 36 Lessons (5 instructional + 1 exam per unit)
 */
export const stage4Units: UnitContent[] = [
  createUnit({
    slug: "ee-19-ac-sine-rms",
    titleUk: "Тригонометрія, синусоїда, частота, фаза та RMS",
    titleEn: "Trigonometry, Sine Waves, Frequency, Phase & RMS",
    lessons: [
      createLesson({
        slug: "ee-19-l1",
        titleUk: "Тригонометрія, синусоїда, частота, фаза та RMS (Частина 1)",
        titleEn: "Trigonometry, Sine Waves, Frequency, Phase & RMS (Part 1)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-19-l1-c1",
            "promptUk": "Теоретичні основи: Тригонометрія, синусоїда, частота, фаза та RMS (Частина 1)",
            "promptEn": "Theoretical Foundations: Trigonometry, Sine Waves, Frequency, Phase & RMS (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Тригонометрія, синусоїда, частота, фаза та RMS». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Trigonometry, Sine Waves, Frequency, Phase & RMS'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-19-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Тригонометрія, синусоїда, частота, фаза та RMS»?",
            "promptEn": "Which core statement is correct regarding 'Trigonometry, Sine Waves, Frequency, Phase & RMS'?",
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
            "id": "ee-19-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 72 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 72 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 108.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 72 * 1.5 = 108.0 В.",
            "explanationEn": "Calculation follows direct scaling: 72 * 1.5 = 108.0 V."
}),
          createNumeric({
            "id": "ee-19-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 72 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 72 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.347,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 72 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 72 A."
}),
          createExplain({
            "id": "ee-19-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Тригонометрія, синусоїда, частота, фаза та RMS»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Trigonometry, Sine Waves, Frequency, Phase & RMS':",
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
        slug: "ee-19-l2",
        titleUk: "Тригонометрія, синусоїда, частота, фаза та RMS (Частина 2)",
        titleEn: "Trigonometry, Sine Waves, Frequency, Phase & RMS (Part 2)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-19-l2-c1",
            "promptUk": "Теоретичні основи: Тригонометрія, синусоїда, частота, фаза та RMS (Частина 2)",
            "promptEn": "Theoretical Foundations: Trigonometry, Sine Waves, Frequency, Phase & RMS (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Тригонометрія, синусоїда, частота, фаза та RMS». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Trigonometry, Sine Waves, Frequency, Phase & RMS'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-19-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Тригонометрія, синусоїда, частота, фаза та RMS»?",
            "promptEn": "Which core statement is correct regarding 'Trigonometry, Sine Waves, Frequency, Phase & RMS'?",
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
            "id": "ee-19-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 77 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 77 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 115.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 77 * 1.5 = 115.5 В.",
            "explanationEn": "Calculation follows direct scaling: 77 * 1.5 = 115.5 V."
}),
          createNumeric({
            "id": "ee-19-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 77 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 77 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.325,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 77 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 77 A."
}),
          createExplain({
            "id": "ee-19-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Тригонометрія, синусоїда, частота, фаза та RMS»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Trigonometry, Sine Waves, Frequency, Phase & RMS':",
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
        slug: "ee-19-l3",
        titleUk: "Тригонометрія, синусоїда, частота, фаза та RMS (Частина 3)",
        titleEn: "Trigonometry, Sine Waves, Frequency, Phase & RMS (Part 3)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-19-l3-c1",
            "promptUk": "Теоретичні основи: Тригонометрія, синусоїда, частота, фаза та RMS (Частина 3)",
            "promptEn": "Theoretical Foundations: Trigonometry, Sine Waves, Frequency, Phase & RMS (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Тригонометрія, синусоїда, частота, фаза та RMS». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Trigonometry, Sine Waves, Frequency, Phase & RMS'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-19-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Тригонометрія, синусоїда, частота, фаза та RMS»?",
            "promptEn": "Which core statement is correct regarding 'Trigonometry, Sine Waves, Frequency, Phase & RMS'?",
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
            "id": "ee-19-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 82 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 82 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 123.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 82 * 1.5 = 123.0 В.",
            "explanationEn": "Calculation follows direct scaling: 82 * 1.5 = 123.0 V."
}),
          createNumeric({
            "id": "ee-19-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 82 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 82 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.305,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 82 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 82 A."
}),
          createExplain({
            "id": "ee-19-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Тригонометрія, синусоїда, частота, фаза та RMS»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Trigonometry, Sine Waves, Frequency, Phase & RMS':",
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
        slug: "ee-19-l4",
        titleUk: "Тригонометрія, синусоїда, частота, фаза та RMS (Частина 4)",
        titleEn: "Trigonometry, Sine Waves, Frequency, Phase & RMS (Part 4)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-19-l4-c1",
            "promptUk": "Теоретичні основи: Тригонометрія, синусоїда, частота, фаза та RMS (Частина 4)",
            "promptEn": "Theoretical Foundations: Trigonometry, Sine Waves, Frequency, Phase & RMS (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Тригонометрія, синусоїда, частота, фаза та RMS». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Trigonometry, Sine Waves, Frequency, Phase & RMS'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-19-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Тригонометрія, синусоїда, частота, фаза та RMS»?",
            "promptEn": "Which core statement is correct regarding 'Trigonometry, Sine Waves, Frequency, Phase & RMS'?",
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
            "id": "ee-19-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 87 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 87 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 130.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 87 * 1.5 = 130.5 В.",
            "explanationEn": "Calculation follows direct scaling: 87 * 1.5 = 130.5 V."
}),
          createCircuitLab({
            "id": "ee-19-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Тригонометрія, синусоїда, частота, фаза та RMS». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Trigonometry, Sine Waves, Frequency, Phase & RMS'. Run simulation and verify nodes.",
            "title": "Lab 19.4: Trigonometry, Sine Waves, Frequency, Phase & RMS",
            "netlist": "* EduForge SPICE Model for Unit 19\nV1 in 0 DC 10\nR1 in out 87k\nR2 out 0 32k\n.tran 10u 2m\n.end",
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
                                    "target": 2.689,
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
            "id": "ee-19-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Тригонометрія, синусоїда, частота, фаза та RMS»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Trigonometry, Sine Waves, Frequency, Phase & RMS':",
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
        slug: "ee-19-l5",
        titleUk: "Тригонометрія, синусоїда, частота, фаза та RMS (Частина 5)",
        titleEn: "Trigonometry, Sine Waves, Frequency, Phase & RMS (Part 5)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-19-l5-c1",
            "promptUk": "Теоретичні основи: Тригонометрія, синусоїда, частота, фаза та RMS (Частина 5)",
            "promptEn": "Theoretical Foundations: Trigonometry, Sine Waves, Frequency, Phase & RMS (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Тригонометрія, синусоїда, частота, фаза та RMS». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Trigonometry, Sine Waves, Frequency, Phase & RMS'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-19-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Тригонометрія, синусоїда, частота, фаза та RMS»?",
            "promptEn": "Which core statement is correct regarding 'Trigonometry, Sine Waves, Frequency, Phase & RMS'?",
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
            "id": "ee-19-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 92 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 92 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 138.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 92 * 1.5 = 138.0 В.",
            "explanationEn": "Calculation follows direct scaling: 92 * 1.5 = 138.0 V."
}),
          createCircuitLab({
            "id": "ee-19-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Тригонометрія, синусоїда, частота, фаза та RMS». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Trigonometry, Sine Waves, Frequency, Phase & RMS'. Run simulation and verify nodes.",
            "title": "Lab 19.5: Trigonometry, Sine Waves, Frequency, Phase & RMS",
            "netlist": "* EduForge SPICE Model for Unit 19\nV1 in 0 DC 10\nR1 in out 92k\nR2 out 0 43k\n.tran 10u 2m\n.end",
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
                                    "target": 3.185,
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
            "id": "ee-19-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Тригонометрія, синусоїда, частота, фаза та RMS»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Trigonometry, Sine Waves, Frequency, Phase & RMS':",
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
        slug: "ee-19-exam",
        titleUk: "Екзамен: Тригонометрія, синусоїда, частота, фаза та RMS",
        titleEn: "Exam: Trigonometry, Sine Waves, Frequency, Phase & RMS",
        difficulty: 3,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-19-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Тригонометрія, синусоїда, частота, фаза та RMS»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Trigonometry, Sine Waves, Frequency, Phase & RMS'?",
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
            "id": "ee-19-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Тригонометрія, синусоїда, частота, фаза та RMS»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Trigonometry, Sine Waves, Frequency, Phase & RMS'?",
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
            "id": "ee-19-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Тригонометрія, синусоїда, частота, фаза та RMS»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Trigonometry, Sine Waves, Frequency, Phase & RMS'?",
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
            "id": "ee-19-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Тригонометрія, синусоїда, частота, фаза та RMS»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Trigonometry, Sine Waves, Frequency, Phase & RMS'?",
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
            "id": "ee-19-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 200 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 200 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 100.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 200 = 100.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 200 = 100.0 V."
}),
          createNumeric({
            "id": "ee-19-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 202 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 202 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 101.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 202 = 101.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 202 = 101.0 V."
}),
          createNumeric({
            "id": "ee-19-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 204 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 204 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 102.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 204 = 102.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 204 = 102.0 V."
}),
          createNumeric({
            "id": "ee-19-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 206 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 206 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 103.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 206 = 103.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 206 = 103.0 V."
}),
          createCircuitLab({
            "id": "ee-19-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Тригонометрія, синусоїда, частота, фаза та RMS».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Trigonometry, Sine Waves, Frequency, Phase & RMS'.",
            "title": "Exam Lab 19.9: Trigonometry, Sine Waves, Frequency, Phase & RMS",
            "netlist": "* Exam Model 19_9\nV1 in 0 DC 12\nR1 in out 28k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 3.158,
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
            "id": "ee-19-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Тригонометрія, синусоїда, частота, фаза та RMS».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Trigonometry, Sine Waves, Frequency, Phase & RMS'.",
            "title": "Exam Lab 19.10: Trigonometry, Sine Waves, Frequency, Phase & RMS",
            "netlist": "* Exam Model 19_10\nV1 in 0 DC 12\nR1 in out 29k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 3.077,
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
    slug: "ee-20-complex-phasors",
    titleUk: "Комплексні числа та векторні діаграми",
    titleEn: "Complex Numbers & Phasor Diagrams",
    lessons: [
      createLesson({
        slug: "ee-20-l1",
        titleUk: "Комплексні числа та векторні діаграми (Частина 1)",
        titleEn: "Complex Numbers & Phasor Diagrams (Part 1)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-20-l1-c1",
            "promptUk": "Теоретичні основи: Комплексні числа та векторні діаграми (Частина 1)",
            "promptEn": "Theoretical Foundations: Complex Numbers & Phasor Diagrams (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Комплексні числа та векторні діаграми». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Complex Numbers & Phasor Diagrams'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-20-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Комплексні числа та векторні діаграми»?",
            "promptEn": "Which core statement is correct regarding 'Complex Numbers & Phasor Diagrams'?",
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
            "id": "ee-20-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 75 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 75 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 112.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 75 * 1.5 = 112.5 В.",
            "explanationEn": "Calculation follows direct scaling: 75 * 1.5 = 112.5 V."
}),
          createNumeric({
            "id": "ee-20-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 75 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 75 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.333,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 75 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 75 A."
}),
          createExplain({
            "id": "ee-20-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Комплексні числа та векторні діаграми»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Complex Numbers & Phasor Diagrams':",
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
        slug: "ee-20-l2",
        titleUk: "Комплексні числа та векторні діаграми (Частина 2)",
        titleEn: "Complex Numbers & Phasor Diagrams (Part 2)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-20-l2-c1",
            "promptUk": "Теоретичні основи: Комплексні числа та векторні діаграми (Частина 2)",
            "promptEn": "Theoretical Foundations: Complex Numbers & Phasor Diagrams (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Комплексні числа та векторні діаграми». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Complex Numbers & Phasor Diagrams'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-20-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Комплексні числа та векторні діаграми»?",
            "promptEn": "Which core statement is correct regarding 'Complex Numbers & Phasor Diagrams'?",
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
            "id": "ee-20-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 80 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 80 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 120.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 80 * 1.5 = 120.0 В.",
            "explanationEn": "Calculation follows direct scaling: 80 * 1.5 = 120.0 V."
}),
          createNumeric({
            "id": "ee-20-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 80 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 80 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.312,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 80 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 80 A."
}),
          createExplain({
            "id": "ee-20-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Комплексні числа та векторні діаграми»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Complex Numbers & Phasor Diagrams':",
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
        slug: "ee-20-l3",
        titleUk: "Комплексні числа та векторні діаграми (Частина 3)",
        titleEn: "Complex Numbers & Phasor Diagrams (Part 3)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-20-l3-c1",
            "promptUk": "Теоретичні основи: Комплексні числа та векторні діаграми (Частина 3)",
            "promptEn": "Theoretical Foundations: Complex Numbers & Phasor Diagrams (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Комплексні числа та векторні діаграми». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Complex Numbers & Phasor Diagrams'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-20-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Комплексні числа та векторні діаграми»?",
            "promptEn": "Which core statement is correct regarding 'Complex Numbers & Phasor Diagrams'?",
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
            "id": "ee-20-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 85 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 85 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 127.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 85 * 1.5 = 127.5 В.",
            "explanationEn": "Calculation follows direct scaling: 85 * 1.5 = 127.5 V."
}),
          createNumeric({
            "id": "ee-20-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 85 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 85 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.294,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 85 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 85 A."
}),
          createExplain({
            "id": "ee-20-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Комплексні числа та векторні діаграми»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Complex Numbers & Phasor Diagrams':",
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
        slug: "ee-20-l4",
        titleUk: "Комплексні числа та векторні діаграми (Частина 4)",
        titleEn: "Complex Numbers & Phasor Diagrams (Part 4)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-20-l4-c1",
            "promptUk": "Теоретичні основи: Комплексні числа та векторні діаграми (Частина 4)",
            "promptEn": "Theoretical Foundations: Complex Numbers & Phasor Diagrams (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Комплексні числа та векторні діаграми». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Complex Numbers & Phasor Diagrams'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-20-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Комплексні числа та векторні діаграми»?",
            "promptEn": "Which core statement is correct regarding 'Complex Numbers & Phasor Diagrams'?",
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
            "id": "ee-20-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 90 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 90 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 135.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 90 * 1.5 = 135.0 В.",
            "explanationEn": "Calculation follows direct scaling: 90 * 1.5 = 135.0 V."
}),
          createCircuitLab({
            "id": "ee-20-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Комплексні числа та векторні діаграми». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Complex Numbers & Phasor Diagrams'. Run simulation and verify nodes.",
            "title": "Lab 20.4: Complex Numbers & Phasor Diagrams",
            "netlist": "* EduForge SPICE Model for Unit 20\nV1 in 0 DC 10\nR1 in out 90k\nR2 out 0 39k\n.tran 10u 2m\n.end",
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
                                    "target": 3.023,
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
            "id": "ee-20-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Комплексні числа та векторні діаграми»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Complex Numbers & Phasor Diagrams':",
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
        slug: "ee-20-l5",
        titleUk: "Комплексні числа та векторні діаграми (Частина 5)",
        titleEn: "Complex Numbers & Phasor Diagrams (Part 5)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-20-l5-c1",
            "promptUk": "Теоретичні основи: Комплексні числа та векторні діаграми (Частина 5)",
            "promptEn": "Theoretical Foundations: Complex Numbers & Phasor Diagrams (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Комплексні числа та векторні діаграми». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Complex Numbers & Phasor Diagrams'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-20-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Комплексні числа та векторні діаграми»?",
            "promptEn": "Which core statement is correct regarding 'Complex Numbers & Phasor Diagrams'?",
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
            "id": "ee-20-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 95 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 95 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 142.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 95 * 1.5 = 142.5 В.",
            "explanationEn": "Calculation follows direct scaling: 95 * 1.5 = 142.5 V."
}),
          createCircuitLab({
            "id": "ee-20-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Комплексні числа та векторні діаграми». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Complex Numbers & Phasor Diagrams'. Run simulation and verify nodes.",
            "title": "Lab 20.5: Complex Numbers & Phasor Diagrams",
            "netlist": "* EduForge SPICE Model for Unit 20\nV1 in 0 DC 10\nR1 in out 95k\nR2 out 0 50k\n.tran 10u 2m\n.end",
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
                                    "target": 3.448,
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
            "id": "ee-20-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Комплексні числа та векторні діаграми»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Complex Numbers & Phasor Diagrams':",
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
        slug: "ee-20-exam",
        titleUk: "Екзамен: Комплексні числа та векторні діаграми",
        titleEn: "Exam: Complex Numbers & Phasor Diagrams",
        difficulty: 3,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-20-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Комплексні числа та векторні діаграми»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Complex Numbers & Phasor Diagrams'?",
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
            "id": "ee-20-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Комплексні числа та векторні діаграми»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Complex Numbers & Phasor Diagrams'?",
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
            "id": "ee-20-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Комплексні числа та векторні діаграми»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Complex Numbers & Phasor Diagrams'?",
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
            "id": "ee-20-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Комплексні числа та векторні діаграми»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Complex Numbers & Phasor Diagrams'?",
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
            "id": "ee-20-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 210 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 210 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 105.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 210 = 105.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 210 = 105.0 V."
}),
          createNumeric({
            "id": "ee-20-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 212 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 212 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 106.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 212 = 106.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 212 = 106.0 V."
}),
          createNumeric({
            "id": "ee-20-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 214 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 214 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 107.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 214 = 107.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 214 = 107.0 V."
}),
          createNumeric({
            "id": "ee-20-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 216 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 216 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 108.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 216 = 108.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 216 = 108.0 V."
}),
          createCircuitLab({
            "id": "ee-20-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Комплексні числа та векторні діаграми».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Complex Numbers & Phasor Diagrams'.",
            "title": "Exam Lab 20.9: Complex Numbers & Phasor Diagrams",
            "netlist": "* Exam Model 20_9\nV1 in 0 DC 12\nR1 in out 29k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 3.077,
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
            "id": "ee-20-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Комплексні числа та векторні діаграми».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Complex Numbers & Phasor Diagrams'.",
            "title": "Exam Lab 20.10: Complex Numbers & Phasor Diagrams",
            "netlist": "* Exam Model 20_10\nV1 in 0 DC 12\nR1 in out 30k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 3.0,
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
    slug: "ee-21-impedance-admittance",
    titleUk: "Імпеданс і провідність R, L, C",
    titleEn: "Impedance & Admittance of R, L, C Elements",
    lessons: [
      createLesson({
        slug: "ee-21-l1",
        titleUk: "Імпеданс і провідність R, L, C (Частина 1)",
        titleEn: "Impedance & Admittance of R, L, C Elements (Part 1)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-21-l1-c1",
            "promptUk": "Теоретичні основи: Імпеданс і провідність R, L, C (Частина 1)",
            "promptEn": "Theoretical Foundations: Impedance & Admittance of R, L, C Elements (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Імпеданс і провідність R, L, C». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Impedance & Admittance of R, L, C Elements'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-21-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Імпеданс і провідність R, L, C»?",
            "promptEn": "Which core statement is correct regarding 'Impedance & Admittance of R, L, C Elements'?",
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
            "id": "ee-21-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 78 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 78 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 117.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 78 * 1.5 = 117.0 В.",
            "explanationEn": "Calculation follows direct scaling: 78 * 1.5 = 117.0 V."
}),
          createNumeric({
            "id": "ee-21-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 78 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 78 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.321,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 78 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 78 A."
}),
          createExplain({
            "id": "ee-21-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Імпеданс і провідність R, L, C»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Impedance & Admittance of R, L, C Elements':",
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
        slug: "ee-21-l2",
        titleUk: "Імпеданс і провідність R, L, C (Частина 2)",
        titleEn: "Impedance & Admittance of R, L, C Elements (Part 2)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-21-l2-c1",
            "promptUk": "Теоретичні основи: Імпеданс і провідність R, L, C (Частина 2)",
            "promptEn": "Theoretical Foundations: Impedance & Admittance of R, L, C Elements (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Імпеданс і провідність R, L, C». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Impedance & Admittance of R, L, C Elements'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-21-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Імпеданс і провідність R, L, C»?",
            "promptEn": "Which core statement is correct regarding 'Impedance & Admittance of R, L, C Elements'?",
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
            "id": "ee-21-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 83 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 83 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 124.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 83 * 1.5 = 124.5 В.",
            "explanationEn": "Calculation follows direct scaling: 83 * 1.5 = 124.5 V."
}),
          createNumeric({
            "id": "ee-21-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 83 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 83 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.301,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 83 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 83 A."
}),
          createExplain({
            "id": "ee-21-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Імпеданс і провідність R, L, C»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Impedance & Admittance of R, L, C Elements':",
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
        slug: "ee-21-l3",
        titleUk: "Імпеданс і провідність R, L, C (Частина 3)",
        titleEn: "Impedance & Admittance of R, L, C Elements (Part 3)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-21-l3-c1",
            "promptUk": "Теоретичні основи: Імпеданс і провідність R, L, C (Частина 3)",
            "promptEn": "Theoretical Foundations: Impedance & Admittance of R, L, C Elements (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Імпеданс і провідність R, L, C». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Impedance & Admittance of R, L, C Elements'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-21-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Імпеданс і провідність R, L, C»?",
            "promptEn": "Which core statement is correct regarding 'Impedance & Admittance of R, L, C Elements'?",
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
            "id": "ee-21-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 88 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 88 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 132.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 88 * 1.5 = 132.0 В.",
            "explanationEn": "Calculation follows direct scaling: 88 * 1.5 = 132.0 V."
}),
          createNumeric({
            "id": "ee-21-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 88 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 88 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.284,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 88 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 88 A."
}),
          createExplain({
            "id": "ee-21-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Імпеданс і провідність R, L, C»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Impedance & Admittance of R, L, C Elements':",
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
        slug: "ee-21-l4",
        titleUk: "Імпеданс і провідність R, L, C (Частина 4)",
        titleEn: "Impedance & Admittance of R, L, C Elements (Part 4)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-21-l4-c1",
            "promptUk": "Теоретичні основи: Імпеданс і провідність R, L, C (Частина 4)",
            "promptEn": "Theoretical Foundations: Impedance & Admittance of R, L, C Elements (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Імпеданс і провідність R, L, C». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Impedance & Admittance of R, L, C Elements'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-21-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Імпеданс і провідність R, L, C»?",
            "promptEn": "Which core statement is correct regarding 'Impedance & Admittance of R, L, C Elements'?",
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
            "id": "ee-21-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 93 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 93 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 139.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 93 * 1.5 = 139.5 В.",
            "explanationEn": "Calculation follows direct scaling: 93 * 1.5 = 139.5 V."
}),
          createCircuitLab({
            "id": "ee-21-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Імпеданс і провідність R, L, C». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Impedance & Admittance of R, L, C Elements'. Run simulation and verify nodes.",
            "title": "Lab 21.4: Impedance & Admittance of R, L, C Elements",
            "netlist": "* EduForge SPICE Model for Unit 21\nV1 in 0 DC 10\nR1 in out 93k\nR2 out 0 46k\n.tran 10u 2m\n.end",
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
                                    "target": 3.309,
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
            "id": "ee-21-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Імпеданс і провідність R, L, C»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Impedance & Admittance of R, L, C Elements':",
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
        slug: "ee-21-l5",
        titleUk: "Імпеданс і провідність R, L, C (Частина 5)",
        titleEn: "Impedance & Admittance of R, L, C Elements (Part 5)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-21-l5-c1",
            "promptUk": "Теоретичні основи: Імпеданс і провідність R, L, C (Частина 5)",
            "promptEn": "Theoretical Foundations: Impedance & Admittance of R, L, C Elements (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Імпеданс і провідність R, L, C». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Impedance & Admittance of R, L, C Elements'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-21-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Імпеданс і провідність R, L, C»?",
            "promptEn": "Which core statement is correct regarding 'Impedance & Admittance of R, L, C Elements'?",
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
            "id": "ee-21-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 98 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 98 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 147.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 98 * 1.5 = 147.0 В.",
            "explanationEn": "Calculation follows direct scaling: 98 * 1.5 = 147.0 V."
}),
          createCircuitLab({
            "id": "ee-21-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Імпеданс і провідність R, L, C». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Impedance & Admittance of R, L, C Elements'. Run simulation and verify nodes.",
            "title": "Lab 21.5: Impedance & Admittance of R, L, C Elements",
            "netlist": "* EduForge SPICE Model for Unit 21\nV1 in 0 DC 10\nR1 in out 98k\nR2 out 0 7k\n.tran 10u 2m\n.end",
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
                                    "target": 0.667,
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
            "id": "ee-21-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Імпеданс і провідність R, L, C»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Impedance & Admittance of R, L, C Elements':",
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
        slug: "ee-21-exam",
        titleUk: "Екзамен: Імпеданс і провідність R, L, C",
        titleEn: "Exam: Impedance & Admittance of R, L, C Elements",
        difficulty: 3,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-21-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Імпеданс і провідність R, L, C»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Impedance & Admittance of R, L, C Elements'?",
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
            "id": "ee-21-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Імпеданс і провідність R, L, C»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Impedance & Admittance of R, L, C Elements'?",
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
            "id": "ee-21-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Імпеданс і провідність R, L, C»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Impedance & Admittance of R, L, C Elements'?",
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
            "id": "ee-21-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Імпеданс і провідність R, L, C»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Impedance & Admittance of R, L, C Elements'?",
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
            "id": "ee-21-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 220 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 220 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 110.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 220 = 110.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 220 = 110.0 V."
}),
          createNumeric({
            "id": "ee-21-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 222 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 222 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 111.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 222 = 111.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 222 = 111.0 V."
}),
          createNumeric({
            "id": "ee-21-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 224 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 224 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 112.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 224 = 112.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 224 = 112.0 V."
}),
          createNumeric({
            "id": "ee-21-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 226 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 226 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 113.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 226 = 113.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 226 = 113.0 V."
}),
          createCircuitLab({
            "id": "ee-21-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Імпеданс і провідність R, L, C».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Impedance & Admittance of R, L, C Elements'.",
            "title": "Exam Lab 21.9: Impedance & Admittance of R, L, C Elements",
            "netlist": "* Exam Model 21_9\nV1 in 0 DC 12\nR1 in out 30k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 3.0,
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
            "id": "ee-21-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Імпеданс і провідність R, L, C».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Impedance & Admittance of R, L, C Elements'.",
            "title": "Exam Lab 21.10: Impedance & Admittance of R, L, C Elements",
            "netlist": "* Exam Model 21_10\nV1 in 0 DC 12\nR1 in out 31k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 2.927,
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
    slug: "ee-22-ac-circuit-analysis",
    titleUk: "Розрахунок AC-кіл вузловим і контурним методами",
    titleEn: "AC Circuit Analysis with Nodal & Mesh Methods",
    lessons: [
      createLesson({
        slug: "ee-22-l1",
        titleUk: "Розрахунок AC-кіл вузловим і контурним методами (Частина 1)",
        titleEn: "AC Circuit Analysis with Nodal & Mesh Methods (Part 1)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-22-l1-c1",
            "promptUk": "Теоретичні основи: Розрахунок AC-кіл вузловим і контурним методами (Частина 1)",
            "promptEn": "Theoretical Foundations: AC Circuit Analysis with Nodal & Mesh Methods (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Розрахунок AC-кіл вузловим і контурним методами». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'AC Circuit Analysis with Nodal & Mesh Methods'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-22-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Розрахунок AC-кіл вузловим і контурним методами»?",
            "promptEn": "Which core statement is correct regarding 'AC Circuit Analysis with Nodal & Mesh Methods'?",
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
            "id": "ee-22-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 81 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 81 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 121.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 81 * 1.5 = 121.5 В.",
            "explanationEn": "Calculation follows direct scaling: 81 * 1.5 = 121.5 V."
}),
          createNumeric({
            "id": "ee-22-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 81 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 81 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.309,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 81 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 81 A."
}),
          createExplain({
            "id": "ee-22-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Розрахунок AC-кіл вузловим і контурним методами»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'AC Circuit Analysis with Nodal & Mesh Methods':",
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
        slug: "ee-22-l2",
        titleUk: "Розрахунок AC-кіл вузловим і контурним методами (Частина 2)",
        titleEn: "AC Circuit Analysis with Nodal & Mesh Methods (Part 2)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-22-l2-c1",
            "promptUk": "Теоретичні основи: Розрахунок AC-кіл вузловим і контурним методами (Частина 2)",
            "promptEn": "Theoretical Foundations: AC Circuit Analysis with Nodal & Mesh Methods (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Розрахунок AC-кіл вузловим і контурним методами». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'AC Circuit Analysis with Nodal & Mesh Methods'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-22-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Розрахунок AC-кіл вузловим і контурним методами»?",
            "promptEn": "Which core statement is correct regarding 'AC Circuit Analysis with Nodal & Mesh Methods'?",
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
            "id": "ee-22-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 86 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 86 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 129.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 86 * 1.5 = 129.0 В.",
            "explanationEn": "Calculation follows direct scaling: 86 * 1.5 = 129.0 V."
}),
          createNumeric({
            "id": "ee-22-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 86 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 86 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.291,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 86 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 86 A."
}),
          createExplain({
            "id": "ee-22-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Розрахунок AC-кіл вузловим і контурним методами»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'AC Circuit Analysis with Nodal & Mesh Methods':",
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
        slug: "ee-22-l3",
        titleUk: "Розрахунок AC-кіл вузловим і контурним методами (Частина 3)",
        titleEn: "AC Circuit Analysis with Nodal & Mesh Methods (Part 3)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-22-l3-c1",
            "promptUk": "Теоретичні основи: Розрахунок AC-кіл вузловим і контурним методами (Частина 3)",
            "promptEn": "Theoretical Foundations: AC Circuit Analysis with Nodal & Mesh Methods (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Розрахунок AC-кіл вузловим і контурним методами». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'AC Circuit Analysis with Nodal & Mesh Methods'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-22-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Розрахунок AC-кіл вузловим і контурним методами»?",
            "promptEn": "Which core statement is correct regarding 'AC Circuit Analysis with Nodal & Mesh Methods'?",
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
            "id": "ee-22-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 91 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 91 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 136.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 91 * 1.5 = 136.5 В.",
            "explanationEn": "Calculation follows direct scaling: 91 * 1.5 = 136.5 V."
}),
          createNumeric({
            "id": "ee-22-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 91 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 91 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.275,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 91 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 91 A."
}),
          createExplain({
            "id": "ee-22-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Розрахунок AC-кіл вузловим і контурним методами»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'AC Circuit Analysis with Nodal & Mesh Methods':",
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
        slug: "ee-22-l4",
        titleUk: "Розрахунок AC-кіл вузловим і контурним методами (Частина 4)",
        titleEn: "AC Circuit Analysis with Nodal & Mesh Methods (Part 4)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-22-l4-c1",
            "promptUk": "Теоретичні основи: Розрахунок AC-кіл вузловим і контурним методами (Частина 4)",
            "promptEn": "Theoretical Foundations: AC Circuit Analysis with Nodal & Mesh Methods (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Розрахунок AC-кіл вузловим і контурним методами». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'AC Circuit Analysis with Nodal & Mesh Methods'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-22-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Розрахунок AC-кіл вузловим і контурним методами»?",
            "promptEn": "Which core statement is correct regarding 'AC Circuit Analysis with Nodal & Mesh Methods'?",
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
            "id": "ee-22-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 96 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 96 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 144.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 96 * 1.5 = 144.0 В.",
            "explanationEn": "Calculation follows direct scaling: 96 * 1.5 = 144.0 V."
}),
          createCircuitLab({
            "id": "ee-22-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Розрахунок AC-кіл вузловим і контурним методами». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'AC Circuit Analysis with Nodal & Mesh Methods'. Run simulation and verify nodes.",
            "title": "Lab 22.4: AC Circuit Analysis with Nodal & Mesh Methods",
            "netlist": "* EduForge SPICE Model for Unit 22\nV1 in 0 DC 10\nR1 in out 96k\nR2 out 0 53k\n.tran 10u 2m\n.end",
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
                                    "target": 3.557,
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
            "id": "ee-22-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Розрахунок AC-кіл вузловим і контурним методами»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'AC Circuit Analysis with Nodal & Mesh Methods':",
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
        slug: "ee-22-l5",
        titleUk: "Розрахунок AC-кіл вузловим і контурним методами (Частина 5)",
        titleEn: "AC Circuit Analysis with Nodal & Mesh Methods (Part 5)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-22-l5-c1",
            "promptUk": "Теоретичні основи: Розрахунок AC-кіл вузловим і контурним методами (Частина 5)",
            "promptEn": "Theoretical Foundations: AC Circuit Analysis with Nodal & Mesh Methods (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Розрахунок AC-кіл вузловим і контурним методами». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'AC Circuit Analysis with Nodal & Mesh Methods'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-22-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Розрахунок AC-кіл вузловим і контурним методами»?",
            "promptEn": "Which core statement is correct regarding 'AC Circuit Analysis with Nodal & Mesh Methods'?",
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
            "id": "ee-22-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 101 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 101 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 151.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 101 * 1.5 = 151.5 В.",
            "explanationEn": "Calculation follows direct scaling: 101 * 1.5 = 151.5 V."
}),
          createCircuitLab({
            "id": "ee-22-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Розрахунок AC-кіл вузловим і контурним методами». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'AC Circuit Analysis with Nodal & Mesh Methods'. Run simulation and verify nodes.",
            "title": "Lab 22.5: AC Circuit Analysis with Nodal & Mesh Methods",
            "netlist": "* EduForge SPICE Model for Unit 22\nV1 in 0 DC 10\nR1 in out 101k\nR2 out 0 14k\n.tran 10u 2m\n.end",
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
                                    "target": 1.217,
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
            "id": "ee-22-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Розрахунок AC-кіл вузловим і контурним методами»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'AC Circuit Analysis with Nodal & Mesh Methods':",
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
        slug: "ee-22-exam",
        titleUk: "Екзамен: Розрахунок AC-кіл вузловим і контурним методами",
        titleEn: "Exam: AC Circuit Analysis with Nodal & Mesh Methods",
        difficulty: 3,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-22-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Розрахунок AC-кіл вузловим і контурним методами»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'AC Circuit Analysis with Nodal & Mesh Methods'?",
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
            "id": "ee-22-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Розрахунок AC-кіл вузловим і контурним методами»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'AC Circuit Analysis with Nodal & Mesh Methods'?",
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
            "id": "ee-22-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Розрахунок AC-кіл вузловим і контурним методами»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'AC Circuit Analysis with Nodal & Mesh Methods'?",
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
            "id": "ee-22-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Розрахунок AC-кіл вузловим і контурним методами»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'AC Circuit Analysis with Nodal & Mesh Methods'?",
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
            "id": "ee-22-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 230 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 230 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 115.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 230 = 115.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 230 = 115.0 V."
}),
          createNumeric({
            "id": "ee-22-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 232 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 232 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 116.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 232 = 116.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 232 = 116.0 V."
}),
          createNumeric({
            "id": "ee-22-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 234 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 234 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 117.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 234 = 117.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 234 = 117.0 V."
}),
          createNumeric({
            "id": "ee-22-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 236 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 236 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 118.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 236 = 118.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 236 = 118.0 V."
}),
          createCircuitLab({
            "id": "ee-22-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Розрахунок AC-кіл вузловим і контурним методами».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'AC Circuit Analysis with Nodal & Mesh Methods'.",
            "title": "Exam Lab 22.9: AC Circuit Analysis with Nodal & Mesh Methods",
            "netlist": "* Exam Model 22_9\nV1 in 0 DC 12\nR1 in out 31k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 2.927,
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
            "id": "ee-22-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Розрахунок AC-кіл вузловим і контурним методами».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'AC Circuit Analysis with Nodal & Mesh Methods'.",
            "title": "Exam Lab 22.10: AC Circuit Analysis with Nodal & Mesh Methods",
            "netlist": "* Exam Model 22_10\nV1 in 0 DC 12\nR1 in out 32k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 2.857,
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
    slug: "ee-23-ac-power-factor",
    titleUk: "Активна, реактивна, повна потужність та коефіцієнт потужності",
    titleEn: "Active, Reactive, Apparent Power & Power Factor",
    lessons: [
      createLesson({
        slug: "ee-23-l1",
        titleUk: "Активна, реактивна, повна потужність та коефіцієнт потужності (Частина 1)",
        titleEn: "Active, Reactive, Apparent Power & Power Factor (Part 1)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-23-l1-c1",
            "promptUk": "Теоретичні основи: Активна, реактивна, повна потужність та коефіцієнт потужності (Частина 1)",
            "promptEn": "Theoretical Foundations: Active, Reactive, Apparent Power & Power Factor (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Активна, реактивна, повна потужність та коефіцієнт потужності». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Active, Reactive, Apparent Power & Power Factor'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-23-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Активна, реактивна, повна потужність та коефіцієнт потужності»?",
            "promptEn": "Which core statement is correct regarding 'Active, Reactive, Apparent Power & Power Factor'?",
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
            "id": "ee-23-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 84 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 84 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 126.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 84 * 1.5 = 126.0 В.",
            "explanationEn": "Calculation follows direct scaling: 84 * 1.5 = 126.0 V."
}),
          createNumeric({
            "id": "ee-23-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 84 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 84 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.298,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 84 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 84 A."
}),
          createExplain({
            "id": "ee-23-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Активна, реактивна, повна потужність та коефіцієнт потужності»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Active, Reactive, Apparent Power & Power Factor':",
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
        slug: "ee-23-l2",
        titleUk: "Активна, реактивна, повна потужність та коефіцієнт потужності (Частина 2)",
        titleEn: "Active, Reactive, Apparent Power & Power Factor (Part 2)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-23-l2-c1",
            "promptUk": "Теоретичні основи: Активна, реактивна, повна потужність та коефіцієнт потужності (Частина 2)",
            "promptEn": "Theoretical Foundations: Active, Reactive, Apparent Power & Power Factor (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Активна, реактивна, повна потужність та коефіцієнт потужності». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Active, Reactive, Apparent Power & Power Factor'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-23-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Активна, реактивна, повна потужність та коефіцієнт потужності»?",
            "promptEn": "Which core statement is correct regarding 'Active, Reactive, Apparent Power & Power Factor'?",
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
            "id": "ee-23-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 89 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 89 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 133.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 89 * 1.5 = 133.5 В.",
            "explanationEn": "Calculation follows direct scaling: 89 * 1.5 = 133.5 V."
}),
          createNumeric({
            "id": "ee-23-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 89 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 89 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.281,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 89 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 89 A."
}),
          createExplain({
            "id": "ee-23-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Активна, реактивна, повна потужність та коефіцієнт потужності»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Active, Reactive, Apparent Power & Power Factor':",
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
        slug: "ee-23-l3",
        titleUk: "Активна, реактивна, повна потужність та коефіцієнт потужності (Частина 3)",
        titleEn: "Active, Reactive, Apparent Power & Power Factor (Part 3)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-23-l3-c1",
            "promptUk": "Теоретичні основи: Активна, реактивна, повна потужність та коефіцієнт потужності (Частина 3)",
            "promptEn": "Theoretical Foundations: Active, Reactive, Apparent Power & Power Factor (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Активна, реактивна, повна потужність та коефіцієнт потужності». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Active, Reactive, Apparent Power & Power Factor'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-23-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Активна, реактивна, повна потужність та коефіцієнт потужності»?",
            "promptEn": "Which core statement is correct regarding 'Active, Reactive, Apparent Power & Power Factor'?",
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
            "id": "ee-23-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 94 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 94 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 141.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 94 * 1.5 = 141.0 В.",
            "explanationEn": "Calculation follows direct scaling: 94 * 1.5 = 141.0 V."
}),
          createNumeric({
            "id": "ee-23-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 94 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 94 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.266,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 94 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 94 A."
}),
          createExplain({
            "id": "ee-23-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Активна, реактивна, повна потужність та коефіцієнт потужності»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Active, Reactive, Apparent Power & Power Factor':",
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
        slug: "ee-23-l4",
        titleUk: "Активна, реактивна, повна потужність та коефіцієнт потужності (Частина 4)",
        titleEn: "Active, Reactive, Apparent Power & Power Factor (Part 4)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-23-l4-c1",
            "promptUk": "Теоретичні основи: Активна, реактивна, повна потужність та коефіцієнт потужності (Частина 4)",
            "promptEn": "Theoretical Foundations: Active, Reactive, Apparent Power & Power Factor (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Активна, реактивна, повна потужність та коефіцієнт потужності». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Active, Reactive, Apparent Power & Power Factor'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-23-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Активна, реактивна, повна потужність та коефіцієнт потужності»?",
            "promptEn": "Which core statement is correct regarding 'Active, Reactive, Apparent Power & Power Factor'?",
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
            "id": "ee-23-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 99 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 99 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 148.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 99 * 1.5 = 148.5 В.",
            "explanationEn": "Calculation follows direct scaling: 99 * 1.5 = 148.5 V."
}),
          createCircuitLab({
            "id": "ee-23-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Активна, реактивна, повна потужність та коефіцієнт потужності». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Active, Reactive, Apparent Power & Power Factor'. Run simulation and verify nodes.",
            "title": "Lab 23.4: Active, Reactive, Apparent Power & Power Factor",
            "netlist": "* EduForge SPICE Model for Unit 23\nV1 in 0 DC 10\nR1 in out 99k\nR2 out 0 10k\n.tran 10u 2m\n.end",
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
                                    "target": 0.917,
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
            "id": "ee-23-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Активна, реактивна, повна потужність та коефіцієнт потужності»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Active, Reactive, Apparent Power & Power Factor':",
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
        slug: "ee-23-l5",
        titleUk: "Активна, реактивна, повна потужність та коефіцієнт потужності (Частина 5)",
        titleEn: "Active, Reactive, Apparent Power & Power Factor (Part 5)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-23-l5-c1",
            "promptUk": "Теоретичні основи: Активна, реактивна, повна потужність та коефіцієнт потужності (Частина 5)",
            "promptEn": "Theoretical Foundations: Active, Reactive, Apparent Power & Power Factor (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Активна, реактивна, повна потужність та коефіцієнт потужності». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Active, Reactive, Apparent Power & Power Factor'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-23-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Активна, реактивна, повна потужність та коефіцієнт потужності»?",
            "promptEn": "Which core statement is correct regarding 'Active, Reactive, Apparent Power & Power Factor'?",
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
            "id": "ee-23-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 104 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 104 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 156.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 104 * 1.5 = 156.0 В.",
            "explanationEn": "Calculation follows direct scaling: 104 * 1.5 = 156.0 V."
}),
          createCircuitLab({
            "id": "ee-23-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Активна, реактивна, повна потужність та коефіцієнт потужності». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Active, Reactive, Apparent Power & Power Factor'. Run simulation and verify nodes.",
            "title": "Lab 23.5: Active, Reactive, Apparent Power & Power Factor",
            "netlist": "* EduForge SPICE Model for Unit 23\nV1 in 0 DC 10\nR1 in out 104k\nR2 out 0 21k\n.tran 10u 2m\n.end",
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
                                    "target": 1.68,
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
            "id": "ee-23-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Активна, реактивна, повна потужність та коефіцієнт потужності»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Active, Reactive, Apparent Power & Power Factor':",
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
        slug: "ee-23-exam",
        titleUk: "Екзамен: Активна, реактивна, повна потужність та коефіцієнт потужності",
        titleEn: "Exam: Active, Reactive, Apparent Power & Power Factor",
        difficulty: 3,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-23-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Активна, реактивна, повна потужність та коефіцієнт потужності»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Active, Reactive, Apparent Power & Power Factor'?",
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
            "id": "ee-23-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Активна, реактивна, повна потужність та коефіцієнт потужності»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Active, Reactive, Apparent Power & Power Factor'?",
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
            "id": "ee-23-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Активна, реактивна, повна потужність та коефіцієнт потужності»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Active, Reactive, Apparent Power & Power Factor'?",
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
            "id": "ee-23-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Активна, реактивна, повна потужність та коефіцієнт потужності»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Active, Reactive, Apparent Power & Power Factor'?",
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
            "id": "ee-23-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 240 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 240 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 120.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 240 = 120.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 240 = 120.0 V."
}),
          createNumeric({
            "id": "ee-23-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 242 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 242 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 121.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 242 = 121.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 242 = 121.0 V."
}),
          createNumeric({
            "id": "ee-23-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 244 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 244 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 122.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 244 = 122.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 244 = 122.0 V."
}),
          createNumeric({
            "id": "ee-23-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 246 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 246 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 123.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 246 = 123.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 246 = 123.0 V."
}),
          createCircuitLab({
            "id": "ee-23-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Активна, реактивна, повна потужність та коефіцієнт потужності».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Active, Reactive, Apparent Power & Power Factor'.",
            "title": "Exam Lab 23.9: Active, Reactive, Apparent Power & Power Factor",
            "netlist": "* Exam Model 23_9\nV1 in 0 DC 12\nR1 in out 32k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 2.857,
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
            "id": "ee-23-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Активна, реактивна, повна потужність та коефіцієнт потужності».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Active, Reactive, Apparent Power & Power Factor'.",
            "title": "Exam Lab 23.10: Active, Reactive, Apparent Power & Power Factor",
            "netlist": "* Exam Model 23_10\nV1 in 0 DC 12\nR1 in out 33k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 2.791,
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
    slug: "ee-24-resonance-bode",
    titleUk: "Резонанс, добротність, частотна характеристика та діаграми Боде",
    titleEn: "Resonance, Q-Factor, Frequency Response & Bode Plots",
    lessons: [
      createLesson({
        slug: "ee-24-l1",
        titleUk: "Резонанс, добротність, частотна характеристика та діаграми Боде (Частина 1)",
        titleEn: "Resonance, Q-Factor, Frequency Response & Bode Plots (Part 1)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-24-l1-c1",
            "promptUk": "Теоретичні основи: Резонанс, добротність, частотна характеристика та діаграми Боде (Частина 1)",
            "promptEn": "Theoretical Foundations: Resonance, Q-Factor, Frequency Response & Bode Plots (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Резонанс, добротність, частотна характеристика та діаграми Боде». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Resonance, Q-Factor, Frequency Response & Bode Plots'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-24-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Резонанс, добротність, частотна характеристика та діаграми Боде»?",
            "promptEn": "Which core statement is correct regarding 'Resonance, Q-Factor, Frequency Response & Bode Plots'?",
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
            "id": "ee-24-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 87 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 87 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 130.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 87 * 1.5 = 130.5 В.",
            "explanationEn": "Calculation follows direct scaling: 87 * 1.5 = 130.5 V."
}),
          createNumeric({
            "id": "ee-24-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 87 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 87 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.287,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 87 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 87 A."
}),
          createExplain({
            "id": "ee-24-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Резонанс, добротність, частотна характеристика та діаграми Боде»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Resonance, Q-Factor, Frequency Response & Bode Plots':",
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
        slug: "ee-24-l2",
        titleUk: "Резонанс, добротність, частотна характеристика та діаграми Боде (Частина 2)",
        titleEn: "Resonance, Q-Factor, Frequency Response & Bode Plots (Part 2)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-24-l2-c1",
            "promptUk": "Теоретичні основи: Резонанс, добротність, частотна характеристика та діаграми Боде (Частина 2)",
            "promptEn": "Theoretical Foundations: Resonance, Q-Factor, Frequency Response & Bode Plots (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Резонанс, добротність, частотна характеристика та діаграми Боде». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Resonance, Q-Factor, Frequency Response & Bode Plots'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-24-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Резонанс, добротність, частотна характеристика та діаграми Боде»?",
            "promptEn": "Which core statement is correct regarding 'Resonance, Q-Factor, Frequency Response & Bode Plots'?",
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
            "id": "ee-24-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 92 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 92 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 138.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 92 * 1.5 = 138.0 В.",
            "explanationEn": "Calculation follows direct scaling: 92 * 1.5 = 138.0 V."
}),
          createNumeric({
            "id": "ee-24-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 92 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 92 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.272,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 92 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 92 A."
}),
          createExplain({
            "id": "ee-24-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Резонанс, добротність, частотна характеристика та діаграми Боде»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Resonance, Q-Factor, Frequency Response & Bode Plots':",
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
        slug: "ee-24-l3",
        titleUk: "Резонанс, добротність, частотна характеристика та діаграми Боде (Частина 3)",
        titleEn: "Resonance, Q-Factor, Frequency Response & Bode Plots (Part 3)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-24-l3-c1",
            "promptUk": "Теоретичні основи: Резонанс, добротність, частотна характеристика та діаграми Боде (Частина 3)",
            "promptEn": "Theoretical Foundations: Resonance, Q-Factor, Frequency Response & Bode Plots (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Резонанс, добротність, частотна характеристика та діаграми Боде». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Resonance, Q-Factor, Frequency Response & Bode Plots'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-24-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Резонанс, добротність, частотна характеристика та діаграми Боде»?",
            "promptEn": "Which core statement is correct regarding 'Resonance, Q-Factor, Frequency Response & Bode Plots'?",
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
            "id": "ee-24-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 97 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 97 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 145.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 97 * 1.5 = 145.5 В.",
            "explanationEn": "Calculation follows direct scaling: 97 * 1.5 = 145.5 V."
}),
          createNumeric({
            "id": "ee-24-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 97 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 97 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.258,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 97 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 97 A."
}),
          createExplain({
            "id": "ee-24-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Резонанс, добротність, частотна характеристика та діаграми Боде»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Resonance, Q-Factor, Frequency Response & Bode Plots':",
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
        slug: "ee-24-l4",
        titleUk: "Резонанс, добротність, частотна характеристика та діаграми Боде (Частина 4)",
        titleEn: "Resonance, Q-Factor, Frequency Response & Bode Plots (Part 4)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-24-l4-c1",
            "promptUk": "Теоретичні основи: Резонанс, добротність, частотна характеристика та діаграми Боде (Частина 4)",
            "promptEn": "Theoretical Foundations: Resonance, Q-Factor, Frequency Response & Bode Plots (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Резонанс, добротність, частотна характеристика та діаграми Боде». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Resonance, Q-Factor, Frequency Response & Bode Plots'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-24-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Резонанс, добротність, частотна характеристика та діаграми Боде»?",
            "promptEn": "Which core statement is correct regarding 'Resonance, Q-Factor, Frequency Response & Bode Plots'?",
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
            "id": "ee-24-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 102 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 102 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 153.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 102 * 1.5 = 153.0 В.",
            "explanationEn": "Calculation follows direct scaling: 102 * 1.5 = 153.0 V."
}),
          createCircuitLab({
            "id": "ee-24-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Резонанс, добротність, частотна характеристика та діаграми Боде». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Resonance, Q-Factor, Frequency Response & Bode Plots'. Run simulation and verify nodes.",
            "title": "Lab 24.4: Resonance, Q-Factor, Frequency Response & Bode Plots",
            "netlist": "* EduForge SPICE Model for Unit 24\nV1 in 0 DC 10\nR1 in out 102k\nR2 out 0 17k\n.tran 10u 2m\n.end",
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
                                    "target": 1.429,
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
            "id": "ee-24-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Резонанс, добротність, частотна характеристика та діаграми Боде»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Resonance, Q-Factor, Frequency Response & Bode Plots':",
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
        slug: "ee-24-l5",
        titleUk: "Резонанс, добротність, частотна характеристика та діаграми Боде (Частина 5)",
        titleEn: "Resonance, Q-Factor, Frequency Response & Bode Plots (Part 5)",
        difficulty: 2,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-24-l5-c1",
            "promptUk": "Теоретичні основи: Резонанс, добротність, частотна характеристика та діаграми Боде (Частина 5)",
            "promptEn": "Theoretical Foundations: Resonance, Q-Factor, Frequency Response & Bode Plots (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Резонанс, добротність, частотна характеристика та діаграми Боде». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Resonance, Q-Factor, Frequency Response & Bode Plots'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-24-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Резонанс, добротність, частотна характеристика та діаграми Боде»?",
            "promptEn": "Which core statement is correct regarding 'Resonance, Q-Factor, Frequency Response & Bode Plots'?",
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
            "id": "ee-24-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 107 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 107 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 160.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 107 * 1.5 = 160.5 В.",
            "explanationEn": "Calculation follows direct scaling: 107 * 1.5 = 160.5 V."
}),
          createCircuitLab({
            "id": "ee-24-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Резонанс, добротність, частотна характеристика та діаграми Боде». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Resonance, Q-Factor, Frequency Response & Bode Plots'. Run simulation and verify nodes.",
            "title": "Lab 24.5: Resonance, Q-Factor, Frequency Response & Bode Plots",
            "netlist": "* EduForge SPICE Model for Unit 24\nV1 in 0 DC 10\nR1 in out 107k\nR2 out 0 28k\n.tran 10u 2m\n.end",
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
                                    "target": 2.074,
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
            "id": "ee-24-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Резонанс, добротність, частотна характеристика та діаграми Боде»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Resonance, Q-Factor, Frequency Response & Bode Plots':",
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
        slug: "ee-24-exam",
        titleUk: "Екзамен: Резонанс, добротність, частотна характеристика та діаграми Боде",
        titleEn: "Exam: Resonance, Q-Factor, Frequency Response & Bode Plots",
        difficulty: 3,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-24-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Резонанс, добротність, частотна характеристика та діаграми Боде»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Resonance, Q-Factor, Frequency Response & Bode Plots'?",
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
            "id": "ee-24-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Резонанс, добротність, частотна характеристика та діаграми Боде»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Resonance, Q-Factor, Frequency Response & Bode Plots'?",
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
            "id": "ee-24-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Резонанс, добротність, частотна характеристика та діаграми Боде»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Resonance, Q-Factor, Frequency Response & Bode Plots'?",
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
            "id": "ee-24-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Резонанс, добротність, частотна характеристика та діаграми Боде»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Resonance, Q-Factor, Frequency Response & Bode Plots'?",
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
            "id": "ee-24-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 250 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 250 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 125.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 250 = 125.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 250 = 125.0 V."
}),
          createNumeric({
            "id": "ee-24-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 252 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 252 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 126.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 252 = 126.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 252 = 126.0 V."
}),
          createNumeric({
            "id": "ee-24-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 254 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 254 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 127.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 254 = 127.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 254 = 127.0 V."
}),
          createNumeric({
            "id": "ee-24-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 256 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 256 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 128.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 256 = 128.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 256 = 128.0 V."
}),
          createCircuitLab({
            "id": "ee-24-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Резонанс, добротність, частотна характеристика та діаграми Боде».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Resonance, Q-Factor, Frequency Response & Bode Plots'.",
            "title": "Exam Lab 24.9: Resonance, Q-Factor, Frequency Response & Bode Plots",
            "netlist": "* Exam Model 24_9\nV1 in 0 DC 12\nR1 in out 33k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 2.791,
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
            "id": "ee-24-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Резонанс, добротність, частотна характеристика та діаграми Боде».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Resonance, Q-Factor, Frequency Response & Bode Plots'.",
            "title": "Exam Lab 24.10: Resonance, Q-Factor, Frequency Response & Bode Plots",
            "netlist": "* Exam Model 24_10\nV1 in 0 DC 12\nR1 in out 34k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 2.727,
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