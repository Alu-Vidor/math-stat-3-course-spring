const rawCourseData = [
  {
    id: 'practice-1',
    number: 1,
    title: 'Практика 1. Описательная статистика',
    categories: [
      {
        id: 'introduction',
        title: 'ВВЕДЕНИЕ',
        screens: ['Рекап + план занятия', 'Шкалы измерений: не складывай яблоки с рангами'],
      },
      {
        id: 'basic-concepts',
        title: 'БАЗОВЫЕ ПОНЯТИЯ',
        screens: ['Мини-пример: оценки 10 студентов', 'Робастность: медиана спасает ситуацию'],
      },
      {
        id: 'data-in-code',
        title: 'ДАННЫЕ В КОДЕ (PANDAS)',
        screens: [
          'Загружаем первый датасет',
          'Гистограмма и эмпирическая функция (ECDF)',
          'Точечные и интервальные оценки (код)',
        ],
      },
      {
        id: 'lab-work',
        title: 'ЛАБОРАТОРНАЯ РАБОТА',
        screens: [
          'Чек-лист: что нужно сдать',
          'Лаб 1.1. Непрерывные признаки',
          'Лаб 1.2. Дискретные признаки',
          'Лаб 1.3. Ранговые и номинативные признаки',
        ],
      },
    ],
  },
  {
    id: 'practice-2',
    number: 2,
    title: 'Практика 2. Проверка статистических гипотез',
    categories: [
      {
        id: 'introduction',
        title: 'ВВЕДЕНИЕ',
        screens: ['Рекап: от описания к выводам'],
      },
      {
        id: 'intuition',
        title: 'ИНТУИЦИЯ',
        screens: [
          'Аналогия с судом (H0 и H1)',
          'Ошибки I и II рода: кого посадить?',
          'P-value: переводим на человеческий',
        ],
      },
      {
        id: 'criteria-in-code',
        title: 'КРИТЕРИИ В КОДЕ (SCIPY)',
        screens: ['QQ-plot: смотрим на нормальность глазами', 'Хи-квадрат Пирсона (код)'],
      },
      {
        id: 'lab-work',
        title: 'ЛАБОРАТОРНАЯ РАБОТА',
        screens: [
          'Лаб 2.1. Распределение непрерывного признака',
          'Лаб 2.2. Распределение дискретного признака',
        ],
      },
    ],
  },
  {
    id: 'practice-3',
    number: 3,
    title: 'Практика 3. Гипотезы о виде распределения',
    categories: [
      {
        id: 'introduction',
        title: 'ВВЕДЕНИЕ',
        screens: ['Почему форма распределения вообще важна?'],
      },
      {
        id: 'hypothesis-design',
        title: 'ВЫДВИЖЕНИЕ ГИПОТЕЗЫ',
        screens: [
          'Как предложить закон распределения',
          'Нормальное, равномерное, логнормальное, биномиальное, Пуассона',
        ],
      },
      {
        id: 'tests-in-code',
        title: 'КРИТЕРИИ И КОД',
        screens: [
          'Какие критерии согласия за что отвечают',
          'Непрерывные признаки в Python',
          'Дискретные признаки в Python',
        ],
      },
      {
        id: 'lab-work',
        title: 'ЛАБОРАТОРНАЯ РАБОТА',
        screens: [
          'Чек-лист для лабораторных 2.3-2.5',
          'Лаб 2.3. Задание 1 из ЛР 1',
          'Лаб 2.4. Задание 2 и доходы',
          'Лаб 2.5. Дискретный признак',
        ],
      },
    ],
  },
  {
    id: 'practice-4',
    number: 4,
    title: 'Практика 4. Дисперсионный анализ (ANOVA)',
    categories: [
      {
        id: 'introduction',
        title: 'ВВЕДЕНИЕ',
        screens: ['Рекап: проблема множественных сравнений'],
      },
      {
        id: 'intuition',
        title: 'ИНТУИЦИЯ',
        screens: ['Разброс внутри групп vs Разброс между группами'],
      },
      {
        id: 'anova-in-code',
        title: 'ANOVA В КОДЕ',
        screens: ['Однофакторный анализ (Python)', 'Двухфакторный анализ и взаимодействие факторов'],
      },
      {
        id: 'lab-work',
        title: 'ЛАБОРАТОРНАЯ РАБОТА',
        screens: ['Лаб 3.1. Однофакторная модель', 'Лаб 3.2. Двухфакторная модель'],
      },
    ],
  },
  {
    id: 'practice-5',
    number: 5,
    title: 'Практика 5. Корреляционный анализ',
    categories: [
      {
        id: 'introduction',
        title: 'ВВЕДЕНИЕ',
        screens: ['В поисках скрытых связей'],
      },
      {
        id: 'correlation-types',
        title: 'ВИДЫ КОРРЕЛЯЦИЙ',
        screens: [
          'Линейная связь: Пирсон',
          'Ранговая связь: Спирмен и Кендалл',
          'Качественные признаки: Контингенация',
        ],
      },
      {
        id: 'correlation-in-code',
        title: 'КОРРЕЛЯЦИЯ В КОДЕ',
        screens: ['Тепловые карты матриц (Seaborn)', 'Оценка значимости коэффициентов'],
      },
      {
        id: 'lab-work',
        title: 'ЛАБОРАТОРНАЯ РАБОТА',
        screens: [
          'Лаб 4.1. Корреляция числовых признаков',
          'Лаб 4.2. Ранговая корреляция и конкордация',
          'Лаб 4.3. Контингенация',
        ],
      },
    ],
  },
  {
    id: 'practice-6',
    number: 6,
    title: 'Практика 6. Регрессионный анализ',
    categories: [
      {
        id: 'introduction',
        title: 'ВВЕДЕНИЕ',
        screens: ['От связи к предсказанию будущего'],
      },
      {
        id: 'ols-and-intuition',
        title: 'МНК И ИНТУИЦИЯ',
        screens: [
          'Метод наименьших квадратов простыми словами',
          'Условия Гаусса-Маркова: когда модели можно верить',
        ],
      },
      {
        id: 'regression-in-code',
        title: 'РЕГРЕССИЯ В КОДЕ',
        screens: ['Линейная регрессия (Statsmodels)', 'Нелинейная регрессия и линеаризация'],
      },
      {
        id: 'lab-work',
        title: 'ЛАБОРАТОРНАЯ РАБОТА',
        screens: ['Лаб 5.1. Парная линейная регрессия', 'Лаб 5.2. Парные нелинейные регрессии'],
      },
    ],
  },
]

function withScreenRoutes(practice) {
  let screenCounter = 1

  return {
    ...practice,
    route: `/practice/${practice.number}`,
    categories: practice.categories.map((category) => ({
      ...category,
      screens: category.screens.map((title) => {
        const screen = {
          id: `${practice.id}-screen-${screenCounter}`,
          number: screenCounter,
          title,
          route: `/practice/${practice.number}/screen/${screenCounter}`,
        }
        screenCounter += 1
        return screen
      }),
    })),
  }
}

export const courseData = rawCourseData.map(withScreenRoutes)
