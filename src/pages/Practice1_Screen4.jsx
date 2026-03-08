import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CourseHeader from '../components/CourseHeader'
import CodeBlock from '../components/CodeBlock'
import KeyIdea from '../components/KeyIdea'
import TerminalOutput from '../components/TerminalOutput'

const contextNotes = [
  {
    title: 'Что такое Pandas?',
    text: 'Название произошло от "Panel Data" (панельные данные). Если сильно упростить, Pandas - это Excel на максималках, управляемый кодом. Он позволяет фильтровать, группировать и анализировать данные в сотни раз быстрее, чем это можно сделать мышкой.',
  },
  {
    title: 'pd.Series vs pd.DataFrame',
    text: 'Series - это одномерный массив (одна колонка). DataFrame - это двумерная таблица (строки и колонки). В наших лабах мы будем работать в основном с DataFrame, где колонками выступают разные признаки (например, рост, вес, возраст).',
  },
]

const createSeriesCode = `import pandas as pd

# Наши оценки 10 студентов (включая один баг)
scores = [65, 70, 72, 75, 78, 80, 82, 85, 88, 1000]

# Создаем объект Series
df_scores = pd.Series(scores)
print(df_scores.values)`

const metricsCode = `mean_score = df_scores.mean()
median_score = df_scores.median()

print(f"Среднее арифметическое: {mean_score}")
print(f"Медиана: {median_score}")`

function Practice1_Screen4({ setContextNotes }) {
  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setContextNotes(contextNotes)
    }, 0)

    return () => {
      window.clearTimeout(timerId)
    }
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 -> ДАННЫЕ В КОДЕ"
        title="Данные в коде: знакомство с Pandas"
        subtitle="Считаем базовые метрики в две строчки кода."
      />

      <section className="content-block space-y-6">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Ручной счет хорош для понимания интуиции, но в реальности датасеты содержат миллионы
          строк. Индустриальный стандарт для работы с табличными данными в Python - это библиотека
          <code className="mx-1 rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">pandas</code>.
          Давайте воспроизведем наш пример с 10 студентами в коде.
        </p>

        <div className="space-y-3">
          <h3 className="section-title">Создание DataFrame</h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Сначала импортируем библиотеку и создадим структуру данных
            <code className="mx-1 rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-700">Series</code>
            (одномерный массив, по сути - одна колонка в таблице).
          </p>
          <CodeBlock code={createSeriesCode} language="python" title="Python" />
          <TerminalOutput lines="[  65   70   72   75   78   80   82   85   88 1000]" />
        </div>

        <div className="space-y-3">
          <h3 className="section-title">Расчет метрик</h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Теперь нам не нужно писать циклы суммирования. У Pandas есть встроенные методы для
            описательной статистики. Считаем среднее и медиану:
          </p>
          <CodeBlock code={metricsCode} language="python" title="Python" />
          <TerminalOutput lines={['Среднее арифметическое: 169.5', 'Медиана: 79.0']} />
        </div>

        <KeyIdea title="Инструмент не заменяет мозг">
          Как видите, Python мгновенно выдал оба результата. Код никогда не скажет вам: "Эй, здесь
          есть выброс, не используй .mean()!". Библиотека просто выполняет математическую
          операцию. Выбор правильной метрики в зависимости от природы данных и наличия аномалий -
          это исключительно ваша задача как аналитика.
        </KeyIdea>
      </section>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/1/screen/4"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>

        <Link
          to="/practice/1/screen/6"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 6. Визуализация: Гистограммы
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen4
