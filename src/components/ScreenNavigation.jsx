import { ArrowRight, PartyPopper } from 'lucide-react'
import { Link } from 'react-router-dom'

function ScreenNavigation({
  prevTo,
  prevLabel = 'Назад',
  nextTo,
  nextLabel,
  celebratory = false,
}) {
  const nextClassName = celebratory
    ? 'inline-flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600 px-6 py-4 text-base font-semibold text-white shadow-soft transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
    : 'inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'

  return (
    <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {prevTo ? (
        <Link
          to={prevTo}
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          {prevLabel}
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {nextTo ? (
        <Link to={nextTo} className={nextClassName}>
          {celebratory ? <PartyPopper size={20} /> : null}
          <span>{nextLabel}</span>
          <ArrowRight size={celebratory ? 18 : 16} />
        </Link>
      ) : null}
    </nav>
  )
}

export default ScreenNavigation
