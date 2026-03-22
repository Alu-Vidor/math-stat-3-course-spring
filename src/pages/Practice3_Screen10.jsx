import { useEffect } from 'react'
import AlertBox from '../components/AlertBox'
import CourseHeader from '../components/CourseHeader'
import DatasetCard from '../components/DatasetCard'
import ScreenNavigation from '../components/ScreenNavigation'
import TaskBlock from '../components/TaskBlock'

const contextNotes = [
  {
    title: 'Где взять дискретный признак',
    text: 'В лабораторной работе 2.5 используется признак `size` из датасета `tips`, загружаемого с помощью `sns.load_dataset("tips")`.',
  },
  {
    title: 'Выбор модели',
    text: 'При выборе модели необходимо обосновать природу процесса: фиксированное число испытаний соответствует биномиальному закону, поток редких событий — распределению Пуассона.',
  },
]

const datasetCode = `import seaborn as sns
import numpy as np

df_tips = sns.load_dataset('tips')

discrete_data = df_tips['size'].dropna().to_numpy()

sample_mean = discrete_data.mean()
sample_var = discrete_data.var(ddof=1)

# Для Пуассона: lambda_hat = sample_mean
# Для биномиального закона: n_trials задается смыслом задачи`

const taskItems = [
  {
    title: 'Формулировка гипотезы',
    content: [
      'Возьмите признак `size` из датасета `tips`.',
      'Для `size` обоснуйте, какой закон распределения реалистичнее: биномиальное или Пуассона.',
      'Поясните, какие свойства процесса подтолкнули вас именно к этому выбору.',
    ],
  },
  {
    title: 'Проверка гипотезы на уровне значимости 0.05',
    content: [
      'Проверьте выбранную гипотезу критерием Пирсона.',
      'Проверьте ту же гипотезу критерием Колмогорова.',
    ],
  },
  {
    title: 'Что обязательно включить в расчеты',
    content: [
      'Оценку параметров выбранной модели.',
      'Таблицу наблюдаемых и ожидаемых частот.',
      'Проверку условия применимости критерия Пирсона.',
    ],
  },
  {
    title: 'Финальный вывод',
    content:
      'Сделайте содержательный вывод: согласуются ли данные `size` с выбранной дискретной моделью и насколько эта модель вообще разумна для описания ресторанных компаний.',
  },
]

function Practice3_Screen10({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 3 -> ЛАБОРАТОРНАЯ РАБОТА"
        title="Лаб 2.5. Tips size"
        subtitle="Проверка гипотезы о виде распределения для дискретного признака `size`."
      />

      <section className="content-block space-y-6">
        <DatasetCard
          title="Конкретный источник данных для Лаб 2.5"
          text="В лабораторной работе 2.5 используется датасет `tips` из библиотеки Seaborn. Для анализа рассматривается признак `size`."
          code={datasetCode}
          codeTitle="Python: стартовый код для Лаб 2.5"
        />

        <TaskBlock title="Что нужно сделать в Лаб 2.5:" items={taskItems} />

        <AlertBox title="Как аккуратно писать про критерий Колмогорова">
          <p>
            В рамках учебного задания критерий Колмогорова может использоваться как предусмотренный
            условием инструмент. Вместе с тем в отчете следует отметить, что классическая версия
            этого критерия в первую очередь ориентирована на непрерывные распределения.
          </p>
        </AlertBox>
      </section>

      <ScreenNavigation
        prevTo="/practice/3/screen/9"
        nextTo="/practice/4/screen/1"
        nextLabel="Завершить Практику 3 -> Перейти к Практике 4"
        celebratory
      />
    </article>
  )
}

export default Practice3_Screen10
