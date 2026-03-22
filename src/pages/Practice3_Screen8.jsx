import { useEffect } from 'react'
import AlertBox from '../components/AlertBox'
import CourseHeader from '../components/CourseHeader'
import DatasetCard from '../components/DatasetCard'
import MathBlock from '../components/MathBlock'
import ScreenNavigation from '../components/ScreenNavigation'
import TaskBlock from '../components/TaskBlock'

const contextNotes = [
  {
    title: 'Где взять данные',
    text: 'Для Лаб 2.3 используйте тот же `California Housing`, который уже загружался в Практике 1 на экране Лаб 1.1. Конкретный признак здесь фиксирован: `HouseAge`.',
  },
  {
    title: 'Параметры для Колмогорова',
    text: 'В критерии Колмогорова для `HouseAge` используйте фиксированные значения нормальной модели: $\\mu = 28.6395$ и $\\sigma = 12.5856$. Ничего искать в других лабораторных не нужно.',
  },
]

const datasetCode = `from sklearn.datasets import fetch_california_housing
import pandas as pd
from scipy import stats
import numpy as np

data = fetch_california_housing()
df = pd.DataFrame(data.data, columns=data.feature_names)

# Тот же датасет, что в Практике 1 (экран 9)
task1_data = df['HouseAge'].dropna().to_numpy()

x_bar = task1_data.mean()
s = task1_data.std(ddof=1)
alpha = 0.05

mu_kolm = 28.6395
sigma_kolm = 12.5856`

const taskItems = [
  {
    title: 'Источник данных и гипотеза',
    content: [
      'Возьмите признак `HouseAge` из датасета `California Housing`.',
      'Это тот же `df`, который уже создавался в Практике 1 на экране Лаб 1.1.',
      'Для `HouseAge` обоснуйте, какой закон выглядит правдоподобнее: нормальный, равномерный или логнормальный.',
    ],
  },
  {
    title: 'Проверка гипотезы на уровне значимости 0.05',
    content: [
      'Проверьте выбранную гипотезу по критерию хи-квадрат Пирсона.',
      'Проверьте ту же гипотезу по омега-квадрату Крамера-Мизеса-Смирнова.',
      'Для нормальной модели дополнительно примените критерий Колмогорова с параметрами $\\mu = 28.6395$ и $\\sigma = 12.5856$.',
      'Для нормальности отдельно посчитайте критерий Жарке-Бера.',
    ],
  },
  {
    title: 'Доверительные интервалы',
    content: [
      'В предположении нормальности постройте 95%-доверительный интервал для истинного математического ожидания.',
      'В том же предположении постройте 95%-доверительный интервал для генерального СКО.',
    ],
  },
  {
    title: 'Финальный вывод',
    content:
      'Сопоставьте результаты всех критериев и честно поясните, дают ли они одну и ту же картину. Если выводы расходятся, это тоже считается содержательным результатом и должно быть объяснено.',
  },
]

function Practice3_Screen8({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 3 -> ЛАБОРАТОРНАЯ РАБОТА"
        title="Лаб 2.3. Задание 1 из ЛР 1"
        subtitle="Полная проверка гипотезы о виде распределения для признака `HouseAge`."
      />

      <section className="content-block space-y-6">
        <DatasetCard
          title="Конкретный источник данных для Лаб 2.3"
          text="Здесь источник уже зафиксирован в логике курса: берите `California Housing`, знакомый по Практике 1, и колонку `HouseAge`. Это убирает двусмысленность и делает лабораторную воспроизводимой."
          code={datasetCode}
          codeTitle="Python: стартовый код для Лаб 2.3"
        />

        <TaskBlock title="Что нужно сделать в Лаб 2.3:" items={taskItems} />

        <section className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Интервал для средней
            </h3>
            <MathBlock formula={String.raw`\bar{x} \pm t_{1-\alpha/2,\;n-1}\frac{s}{\sqrt{n}}`} />
          </article>

          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Интервал для СКО
            </h3>
            <MathBlock
              formula={String.raw`\sqrt{\frac{(n-1)s^2}{\chi^2_{1-\alpha/2,\;n-1}}} \le \sigma \le \sqrt{\frac{(n-1)s^2}{\chi^2_{\alpha/2,\;n-1}}}`}
            />
          </article>
        </section>

        <AlertBox title="Как трактовать Jarque-Bera">
          <p>
            Jarque-Bera здесь не заменяет все остальные тесты. Если вы склоняетесь к нормальной
            модели, он работает как прямой тест на нормальность. Если основной кандидат иной,
            трактуйте его как дополнительный аргумент против нормальной формы, а не как универсальный
            тест любого закона распределения.
          </p>
        </AlertBox>
      </section>

      <ScreenNavigation
        prevTo="/practice/3/screen/7"
        nextTo="/practice/3/screen/9"
        nextLabel="Далее: 9. Лаб 2.4. AveRooms и MedInc"
      />
    </article>
  )
}

export default Practice3_Screen8
