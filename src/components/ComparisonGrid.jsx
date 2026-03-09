import MathBlock from './MathBlock'

function ComparisonCard({ tone, title, sections, formula }) {
  const toneStyles =
    tone === 'accent'
      ? 'border-amber-200 bg-amber-50/70 dark:border-amber-900/50 dark:bg-amber-950/20'
      : 'border-slate-200 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-900/70'

  const titleStyles =
    tone === 'accent'
      ? 'text-amber-900 dark:text-amber-200'
      : 'text-slate-900 dark:text-slate-100'

  return (
    <article className={`rounded-[1.75rem] border p-6 shadow-soft ${toneStyles}`}>
      <h3 className={`text-xl font-semibold tracking-tight ${titleStyles}`}>{title}</h3>

      <div className="mt-5 space-y-4">
        {sections.map((section) => (
          <div key={section.label} className="space-y-1.5">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
              {section.label}
            </p>
            <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">{section.text}</p>
          </div>
        ))}

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
            Математически
          </p>
          <MathBlock formula={formula} />
        </div>
      </div>
    </article>
  )
}

function ComparisonGrid({ left, right }) {
  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <ComparisonCard tone="neutral" {...left} />
      <ComparisonCard tone="accent" {...right} />
    </section>
  )
}

export default ComparisonGrid
