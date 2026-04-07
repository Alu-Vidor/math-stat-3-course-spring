import { useEffect } from 'react'
import AlertBox from '../components/AlertBox'
import CourseHeader from '../components/CourseHeader'
import DatasetCard from '../components/DatasetCard'
import MathBlock from '../components/MathBlock'
import ScreenNavigation from '../components/ScreenNavigation'
import TaskBlock from '../components/TaskBlock'

const contextNotes = [
  {
    title: 'Источник данных',
    text: 'В лабораторной работе 3.1 удобно использовать датасет `penguins`, где фактор `species` имеет три уровня, а отклик `body_mass_g` измеряется в количественной шкале.',
  },
  {
    title: 'Что обязательно в отчете',
    text: 'Для однофакторной ANOVA недостаточно сообщить только таблицу дисперсионного анализа. В отчете нужны описательные статистики, проверка предположений, пост-хок сравнения и интерпретация силы эффекта.',
  },
]

const datasetCode = `import seaborn as sns
import pandas as pd
import statsmodels.api as sm
import statsmodels.formula.api as smf
from scipy import stats

penguins = sns.load_dataset('penguins').dropna(subset=['species', 'body_mass_g'])

df = penguins[['species', 'body_mass_g']].copy()

alpha = 0.05

group_summary = (
    df.groupby('species')['body_mass_g']
      .agg(['count', 'mean', 'median', 'std'])
      .round(2)
)`

const taskItems = [
  {
    title: '1. Постановка задачи и предварительное описание',
    content: [
      'Сформулируйте $H_0$ и $H_1$ для сравнения средних значений `body_mass_g` между видами пингвинов.',
      'Постройте таблицу описательных статистик и график распределений по группам.',
      'Кратко поясните, почему `species` трактуется как фактор, а `body_mass_g` - как количественный отклик.',
    ],
  },
  {
    title: '2. Проверка предположений однофакторной ANOVA',
    content: [
      'Оцените однородность дисперсий, например критерием Левена.',
      'Проверьте поведение остатков модели графически или тестом на нормальность.',
      'Отдельно прокомментируйте предположение независимости наблюдений.',
    ],
  },
  {
    title: '3. Основной статистический анализ',
    content: [
      'Постройте модель `body_mass_g ~ C(species)` и получите таблицу ANOVA.',
      'На уровне значимости 0.05 примите решение о сохранении или отклонении нулевой гипотезы.',
      'Вычислите меру силы эффекта $\\eta^2$ и интерпретируйте ее содержательно.',
    ],
  },
  {
    title: '4. Детализация результата',
    content: [
      'Если общий результат значим, выполните пост-хок сравнения, например методом Тьюки.',
      'Укажите, какие пары видов различаются статистически значимо и в каком направлении расположены средние.',
    ],
  },
  {
    title: '5. Итоговый академический вывод',
    content:
      'Сформулируйте финальный вывод полным текстом: опишите, подтверждаются ли различия средних между видами, насколько выражен эффект фактора и не противоречат ли выводу результаты диагностических проверок.',
  },
]

function Practice4_Screen5({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 4 -> ЛАБОРАТОРНАЯ РАБОТА"
        title="Лаб 3.1. Однофакторная модель"
        subtitle="Полный цикл однофакторного дисперсионного анализа для признака `body_mass_g` в датасете `penguins`."
      />

      <section className="content-block space-y-6">
        <DatasetCard
          title="Стартовый код для Лаб 3.1"
          text="В лабораторной работе используем датасет `penguins`, количественный отклик `body_mass_g` и фактор `species`."
          code={datasetCode}
          codeTitle="Python: исходные данные для Лаб 3.1"
        />

        <TaskBlock title="Что нужно сделать в Лаб 3.1:" items={taskItems} />

        <section className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Основная гипотеза</h3>
            <MathBlock formula={String.raw`H_0:\ \mu_1 = \mu_2 = \mu_3`} />
          </article>

          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Сила эффекта</h3>
            <MathBlock formula={String.raw`\eta^2 = \frac{SS_B}{SS_T}`} />
          </article>
        </section>

        <AlertBox title="Что считается полноценным решением">
          <p>
            Полноценная работа по ANOVA содержит не только вычисления, но и статистический рассказ:
            как были подготовлены данные, какие предположения проверялись, как интерпретирован
            значимый или незначимый результат и почему итоговый вывод выглядит обоснованным.
          </p>
        </AlertBox>
      </section>

      <ScreenNavigation
        prevTo="/practice/4/screen/4"
        nextTo="/practice/4/screen/6"
        nextLabel="Далее: 6. Лаб 3.2. Двухфакторная модель"
      />
    </article>
  )
}

export default Practice4_Screen5
