import { useEffect } from 'react'
import AlertBox from '../components/AlertBox'
import CourseHeader from '../components/CourseHeader'
import DatasetCard from '../components/DatasetCard'
import MathBlock from '../components/MathBlock'
import ScreenNavigation from '../components/ScreenNavigation'
import TaskBlock from '../components/TaskBlock'

const contextNotes = [
  {
    title: 'Важно про Колмогорова',
    text: 'По условию этой лабораторной критерий Колмогорова запускается не на произвольных текущих оценках, а на значениях математического ожидания и генерального СКО $\\sigma_\\Gamma$ из ЛР 3.',
  },
  {
    title: 'Интервалы только под нормальностью',
    text: 'Доверительные интервалы для средней и СКО здесь строятся именно в предположении нормального распределения. Если выбранная гипотеза не нормальна, этот шаг нужно интерпретировать как отдельный условный сценарий.',
  },
]

const datasetCode = `from scipy import stats
import numpy as np

task1_data = df['...'].dropna().to_numpy()

x_bar = task1_data.mean()
s = task1_data.std(ddof=1)
alpha = 0.05`

const taskItems = [
  {
    title: 'Гипотеза о виде распределения',
    content: [
      'Для признака из задания 1 ЛР 1 обоснуйте, какой закон выглядит правдоподобнее: нормальный, равномерный или логнормальный.',
      'Аргументация должна опираться на графики, поддержку признака, асимметрию и общую форму распределения.',
    ],
  },
  {
    title: 'Проверка на уровне значимости 0.05',
    content: [
      'Проверьте выдвинутую гипотезу по критерию хи-квадрат Пирсона.',
      'Проверьте ту же гипотезу по омега-квадрату Крамера-Мизеса-Смирнова.',
      'Проверьте по критерию Колмогорова, используя значения математического ожидания и генерального СКО $\\sigma_\\Gamma$ из ЛР 3.',
      'Для нормальности дополнительно оцените согласованность с помощью критерия Жарке-Бера.',
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
    title: 'Итоговый вывод',
    content:
      'Сопоставьте результаты всех критериев и отдельно поясните, поддерживают ли они одну и ту же модель. Если выводы расходятся, это тоже нужно прокомментировать.',
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
        subtitle="Полная проверка гипотезы о виде распределения для первого непрерывного признака."
      />

      <section className="content-block space-y-6">
        <DatasetCard
          title="Заготовка для ноутбука"
          text="Подставьте сюда тот признак, который вы анализировали в задании 1 первой лабораторной. Дальше поверх этого столбца строится вся логика гипотезы и критериев согласия."
          code={datasetCode}
          codeTitle="Python: старт для Лаб 2.3"
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

        <AlertBox title="Как честно использовать Jarque-Bera">
          <p>
            Если вы в итоге склоняетесь к нормальной модели, Jarque-Bera работает как прямой тест
            на согласие с нормальностью. Если основной кандидат — равномерное или логнормальное
            распределение, этот критерий лучше трактовать как дополнительный аргумент против
            нормальной формы, а не как универсальный тест выбранного закона.
          </p>
        </AlertBox>
      </section>

      <ScreenNavigation
        prevTo="/practice/3/screen/7"
        nextTo="/practice/3/screen/9"
        nextLabel="Далее: 9. Лаб 2.4. Задание 2 и доходы"
      />
    </article>
  )
}

export default Practice3_Screen8
