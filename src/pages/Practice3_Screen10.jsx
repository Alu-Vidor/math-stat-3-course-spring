import { useEffect } from 'react'
import AlertBox from '../components/AlertBox'
import CourseHeader from '../components/CourseHeader'
import DatasetCard from '../components/DatasetCard'
import ScreenNavigation from '../components/ScreenNavigation'
import TaskBlock from '../components/TaskBlock'

const contextNotes = [
  {
    title: 'Содержательный выбор модели',
    text: 'В этой лабораторной особенно важно не гадать по красивому графику, а объяснить природу процесса: фиксированное число испытаний ведет к биномиальной модели, поток событий — к Пуассону.',
  },
  {
    title: 'Пирсон и ожидания',
    text: 'Перед критерием Пирсона для дискретного признака проверьте, что ожидаемые частоты не слишком малы. При необходимости объедините редкие категории в хвостах.',
  },
]

const datasetCode = `discrete_data = df['...'].dropna().to_numpy()

sample_mean = discrete_data.mean()
sample_var = discrete_data.var(ddof=1)

# Для Пуассона: lambda_hat = sample_mean
# Для биномиального закона: n_trials задается смыслом задачи`

const taskItems = [
  {
    title: 'Формулировка гипотезы',
    content: [
      'Для признака из задания 4 обоснуйте, какой закон распределения реалистичнее: биномиальное или Пуассона.',
      'Укажите, какие свойства данных подтолкнули вас к этому выбору.',
    ],
  },
  {
    title: 'Проверка на уровне значимости 0.05',
    content: [
      'Проверьте гипотезу критерием Пирсона.',
      'Проверьте ту же гипотезу критерием Колмогорова.',
    ],
  },
  {
    title: 'Что включить в расчеты',
    content: [
      'Оценку параметров выбранной модели.',
      'Таблицу наблюдаемых и ожидаемых частот.',
      'Проверку условия применимости критерия Пирсона.',
    ],
  },
  {
    title: 'Финальный вывод',
    content:
      'Сделайте содержательный вывод: согласуются ли данные с выбранной дискретной моделью и насколько этот закон вообще разумен для описания рассматриваемого процесса.',
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
        title="Лаб 2.5. Дискретный признак"
        subtitle="Финальная лабораторная по теме 2: биномиальная модель или закон Пуассона."
      />

      <section className="content-block space-y-6">
        <DatasetCard
          title="Заготовка для дискретной лабораторной"
          text="Подставьте сюда дискретный признак из задания 4 и сразу подготовьте два сценария: биномиальный и пуассоновский. Так будет проще честно сравнить модели."
          code={datasetCode}
          codeTitle="Python: старт для Лаб 2.5"
        />

        <TaskBlock title="Что нужно сделать в Лаб 2.5:" items={taskItems} />

        <AlertBox title="Как аккуратно написать про критерий Колмогорова">
          <p>
            В учебной задаче можно использовать Колмогорова для дискретной гипотезы как требуемый
            по условию инструмент. Но сильный отчет честно отмечает, что классическая версия теста
            ориентирована прежде всего на непрерывные распределения.
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
