import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import CourseHeader from '../components/CourseHeader'
import MathBlock from '../components/MathBlock'

const scores = [65, 70, 72, 75, 78, 80, 82, 85, 88, 1000]

function DataPill({ value, isAnomaly = false }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl px-3 py-1.5 text-sm font-semibold ${
        isAnomaly
          ? 'border border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300'
          : 'border border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300'
      }`}
    >
      {value}
    </span>
  )
}

function KeyIdea({ title, children }) {
  return (
    <aside className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 shadow-soft dark:border-emerald-900 dark:bg-emerald-950/30">
      <div className="flex items-start gap-3 border-l-4 border-emerald-500 pl-3 dark:border-emerald-400">
        <ShieldCheck
          size={20}
          className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-300"
          aria-hidden="true"
        />
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-emerald-700 dark:text-emerald-300">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">{children}</p>
        </div>
      </div>
    </aside>
  )
}

function Practice1_Screen3({ setContext, setContextNotes }) {
  const sections = useMemo(
    () => [
      {
        id: 'intro',
        title: 'Сюжет задачи',
        note: 'Один баг в базе дал студенту 1000 баллов, и теперь нужно понять, какая метрика центра адекватна для группы.',
      },
      {
        id: 'data-array',
        title: 'Данные',
        note: 'В отсортированном ряду видно, что 1000 резко выбивается из диапазона остальных оценок (65-88).',
      },
      {
        id: 'mean-attempt',
        title: 'Среднее арифметическое',
        note: 'Mean = 169.5, что выше максимума теста. Метрика сломалась из-за чувствительности к выбросу.',
      },
      {
        id: 'median-attempt',
        title: 'Медиана',
        note: 'Median = 79 остается в реалистичном диапазоне и лучше описывает типичного студента.',
      },
      {
        id: 'key-idea',
        title: 'Важность для ML',
        note: 'Модели, минимизирующие суммарную ошибку, могут чрезмерно подстроиться под выброс и ухудшить качество на большинстве нормальных наблюдений.',
      },
    ],
    [],
  )

  useEffect(() => {
    setContextNotes([])
    setContext({ title: sections[0].title, text: sections[0].note })
  }, [sections, setContext, setContextNotes])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)
        if (!visibleEntry) {
          return
        }

        const currentSection = sections.find((section) => section.id === visibleEntry.target.id)
        if (currentSection) {
          setContext({ title: currentSection.title, text: currentSection.note })
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0.1 },
    )

    sections.forEach((section) => {
      const node = document.getElementById(section.id)
      if (node) {
        observer.observe(node)
      }
    })

    return () => observer.disconnect()
  }, [sections, setContext])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 -> Базовые понятия"
        title="Мини-пример: оценки 10 студентов"
        subtitle="Как один выброс ломает классическую статистику."
      />

      <section className="content-block space-y-6">
        <p id="intro" className="max-w-3xl text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Представим типичную задачу: мы спарсили данные об оценках 10 студентов за онлайн-тест.
          Девять человек написали тест нормально (максимум — 100 баллов). Но у десятого произошел
          баг в базе данных, и система записала ему 1000 баллов.
        </p>

        <div id="data-array" className="space-y-3">
          <p className="font-semibold text-slate-900 dark:text-white">
            Вот как выглядит наш отсортированный массив данных:
          </p>
          <div className="flex flex-wrap gap-3">
            {scores.map((score) => (
              <DataPill key={score} value={score} isAnomaly={score === 1000} />
            ))}
          </div>
        </div>

        <div id="mean-attempt" className="space-y-4">
          <h3 className="section-title">Попытка №1. Среднее арифметическое (Mean)</h3>
          <p className="max-w-3xl text-base leading-relaxed text-slate-700 dark:text-slate-200">
            Если мы «в лоб» применим классическую формулу, мы просто сложим все значения и поделим
            на количество студентов (10).
          </p>
          <MathBlock formula="\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i = \frac{1695}{10} = 169.5" />
          <p className="max-w-3xl text-base leading-relaxed text-slate-700 dark:text-slate-200">
            <strong>Результат: 169.5 баллов.</strong> Это математический абсурд. Средний балл
            оказался выше максимально возможного (100). Одно единственное аномальное значение
            «перетянуло» среднее на себя, сделав метрику абсолютно бесполезной для описания этой
            группы.
          </p>
        </div>

        <div id="median-attempt" className="space-y-4">
          <h3 className="section-title">Попытка №2. Медиана (Median)</h3>
          <p className="max-w-3xl text-base leading-relaxed text-slate-700 dark:text-slate-200">
            Теперь попробуем найти медиану. Это число, которое стоит ровно посередине
            отсортированного ряда. Так как у нас 10 элементов, мы берем среднее двух центральных:
          </p>
          <MathBlock formula="Me = \frac{x_{(5)} + x_{(6)}}{2} = \frac{78 + 80}{2} = 79" />
          <p className="max-w-3xl text-base leading-relaxed text-slate-700 dark:text-slate-200">
            <strong>Результат: 79 баллов.</strong> Вот это уже похоже на правду! Это число отлично
            описывает успеваемость типичного студента из нашей группы, полностью проигнорировав баг
            системы.
          </p>
        </div>

        <div id="key-idea">
          <KeyIdea title="Свойство робастности">
          Среднее арифметическое <strong>чувствительно к выбросам</strong>. Медиана —{' '}
          <strong>робастна (устойчива)</strong>. Если в ваших данных много аномалий или
          распределение сильно скошено (как зарплаты в компании), использование среднего
          арифметического приведет к неверным выводам.
          </KeyIdea>
        </div>
      </section>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/1/screen/2"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>

        <Link
          to="/practice/1/screen/4"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 4. Данные в коде (Pandas)
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen3
