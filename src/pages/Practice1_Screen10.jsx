import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import CourseHeader from '../components/CourseHeader'
import DatasetCard from '../components/DatasetCard'
import TaskBlock from '../components/TaskBlock'

const contextNotes = [
  {
    title: 'Как построить ряд для дискреты?',
    text: 'В отличие от Лаб 1.1, здесь вам не нужен `pd.cut()`. Чтобы получить вариационный ряд, достаточно применить `.value_counts()` к колонке, а затем обязательно отсортировать результат по индексу (`.sort_index()`), чтобы количество гостей шло по порядку: 1, 2, 3, 4...',
  },
  {
    title: 'Полигон частот в Python',
    text: 'Полигон частот — это, по сути, линейный график, где по оси X идут уникальные значения дискретного признака, а по оси Y — их частоты. Его удобно построить через `matplotlib.pyplot.plot()`, передав индексы и значения из вариационного ряда.',
  },
]

const datasetCode = `import seaborn as sns
import pandas as pd

# Загружаем встроенный датасет

df = sns.load_dataset('tips')
discrete_data = df['size']  # Дискретный признак: размер компании`

const taskItems = [
  {
    title: 'Построение точечного ряда',
    content:
      'Постройте дискретный ранжированный вариационный ряд. Выведите таблицу со значениями признака (сколько людей за столом), их абсолютными частотами (n_i) и относительными частотами (w_i).',
  },
  {
    title: 'Визуализация',
    content: [
      'Постройте полигон частот и полигон относительных частот.',
      'Постройте эмпирическую функцию распределения (ECDF). Подумайте, как визуально она должна отличаться от непрерывной ECDF: здесь ожидается ступенчатая форма.',
    ],
  },
  {
    title: 'Точечные оценки',
    content: [
      'Выборочную среднюю.',
      'Выборочную и исправленную дисперсию.',
      'Выборочное и исправленное СКО.',
      'Моду и медиану.',
      'Коэффициенты асимметрии и эксцесса.',
    ],
  },
  {
    title: 'Аналитический вывод',
    content:
      'Напишите вывод. Какая компания чаще всего приходит в ресторан (мода)? Совпадает ли она с медианой? Имеет ли смысл среднее арифметическое в контексте данной задачи, если оно даёт значение вроде «2.5 человека»?',
  },
]

function Practice1_Screen10({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 -> ЛАБОРАТОРНАЯ РАБОТА"
        title="Лаб 1.2. Дискретные признаки"
        subtitle="Считаем людей, а не проценты."
      />

      <section className="content-block space-y-6">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          В этом задании (соответствует Заданию 4 из методички) мы переходим от непрерывных
          величин к дискретным. Дискретный признак принимает счетное количество значений. Мы не
          будем разбивать его на интервалы (корзины), потому что каждое конкретное значение уже
          само по себе является отдельной категорией.
        </p>

        <DatasetCard
          title="🍽 Ваш датасет: Чаевые в ресторане (Seaborn Tips)"
          text="Мы возьмем встроенный датасет с чеками из ресторана. Нас интересует дискретный признак `size` — количество гостей за одним столиком (например, 1, 2, 3... человека). Не путайте его с размером самого датасета!"
          code={datasetCode}
          codeTitle="Python: загрузка датасета"
        />

        <TaskBlock title="Что необходимо сделать в Jupyter Notebook:" items={taskItems} />
      </section>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/1/screen/9"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>

        <Link
          to="/practice/1/screen/11"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 11. Лаб 1.3. Ранговые признаки
          <ArrowRight size={16} />
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen10
