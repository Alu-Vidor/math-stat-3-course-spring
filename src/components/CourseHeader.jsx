function CourseHeader({ badge, title, subtitle }) {
  return (
    <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <p className="text-sm font-semibold uppercase tracking-[0.1em] text-indigo-600 dark:text-indigo-400">
        {badge}
      </p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
      <p className="mt-2 text-base leading-relaxed text-slate-600 dark:text-slate-300">{subtitle}</p>
    </header>
  )
}

export default CourseHeader
