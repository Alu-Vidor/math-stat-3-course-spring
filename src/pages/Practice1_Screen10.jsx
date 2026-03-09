import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import CourseHeader from '../components/CourseHeader'
import KeyIdea from '../components/KeyIdea'

function Practice1_Screen10({ setContextNotes }) {
  useEffect(() => {
    setContextNotes([])
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 1 -> ЛАБОРАТОРНАЯ РАБОТА"
        title="Лаб 1.2. Дискретные признаки"
        subtitle="Экран подготовлен для следующего задания лабораторной работы."
      />

      <section className="content-block space-y-4">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          Маршрут для следующего шага уже подключен, поэтому переход с экрана 9 работает корректно. Содержательное
          наполнение экрана 10 можно добавить отдельно.
        </p>

        <KeyIdea title="Статус">
          Сейчас это технический плейсхолдер, чтобы навигация по лабораторной работе была непрерывной.
        </KeyIdea>
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
          Далее: 11. Лаб 1.3. Ранговые и номинативные признаки
          <ArrowRight size={16} />
        </Link>
      </nav>
    </article>
  )
}

export default Practice1_Screen10
