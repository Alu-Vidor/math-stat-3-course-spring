import { useState } from 'react'
import MathBlock from './MathBlock'
import MathText from './MathText'

const distributions = [
  {
    id: 'normal',
    title: 'Нормальное',
    badge: 'Непрерывное',
    accent: 'from-sky-500/15 to-indigo-500/10',
    buttonTone:
      'data-[active=true]:border-sky-400 data-[active=true]:bg-sky-50 data-[active=true]:text-sky-800 dark:data-[active=true]:border-sky-700 dark:data-[active=true]:bg-sky-950/30 dark:data-[active=true]:text-sky-200',
    support: '$x \\in (-\\infty, +\\infty)$',
    signal:
      'Симметричная форма, умеренные хвосты, выборочные асимметрия и эксцесс близки к нулю.',
    meaning:
      'Хорошо описывает сумму большого числа малых независимых воздействий: ошибки измерения, суммарные шумы, агрегированные эффекты.',
    labs: 'Особенно важно для лабораторной 2.3, где дополнительно строятся доверительные интервалы для $\\mu$ и $\\sigma$.',
    formula: String.raw`f(x)=\frac{1}{\sigma\sqrt{2\pi}}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)`,
    svg: (
      <path
        d="M14 126 C 32 124, 48 108, 62 84 C 76 58, 94 34, 112 24 C 130 34, 148 58, 162 84 C 176 108, 192 124, 210 126"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    ),
  },
  {
    id: 'uniform',
    title: 'Равномерное',
    badge: 'Непрерывное',
    accent: 'from-cyan-500/15 to-teal-500/10',
    buttonTone:
      'data-[active=true]:border-cyan-400 data-[active=true]:bg-cyan-50 data-[active=true]:text-cyan-800 dark:data-[active=true]:border-cyan-700 dark:data-[active=true]:bg-cyan-950/30 dark:data-[active=true]:text-cyan-200',
    support: '$x \\in [a,b]$',
    signal:
      'Наблюдения относительно ровно заполняют конечный интервал, без ярко выраженного центра и без тяжёлых хвостов.',
    meaning:
      'Появляется, когда любой участок интервала одинаково правдоподобен, например при случайном выборе точки на отрезке.',
    labs: 'В лабораторных выступает как важная альтернативная гипотеза для непрерывного признака.',
    formula: String.raw`f(x)=\frac{1}{b-a}, \quad a \le x \le b`,
    svg: (
      <>
        <path
          d="M24 126 L 24 54 L 200 54 L 200 126"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="24" y1="54" x2="200" y2="54" stroke="currentColor" strokeWidth="4" />
      </>
    ),
  },
  {
    id: 'lognormal',
    title: 'Логнормальное',
    badge: 'Непрерывное',
    accent: 'from-emerald-500/15 to-lime-500/10',
    buttonTone:
      'data-[active=true]:border-emerald-400 data-[active=true]:bg-emerald-50 data-[active=true]:text-emerald-800 dark:data-[active=true]:border-emerald-700 dark:data-[active=true]:bg-emerald-950/30 dark:data-[active=true]:text-emerald-200',
    support: '$x > 0$',
    signal:
      'Положительный признак с выраженной правосторонней асимметрией; после логарифмирования часто становится ближе к нормальному.',
    meaning:
      'Типичен для доходов, цен, длительностей и других мультипликативных процессов.',
    labs: 'Ключевой кандидат для признака доходов `MedInc` в лабораторной 2.4.',
    formula: String.raw`f(x)=\frac{1}{x\sigma\sqrt{2\pi}}\exp\left(-\frac{(\ln x-\mu)^2}{2\sigma^2}\right), \quad x>0`,
    svg: (
      <path
        d="M16 126 C 34 124, 44 112, 52 92 C 60 54, 74 28, 88 20 C 104 16, 124 34, 142 62 C 162 92, 182 114, 208 126"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    ),
  },
  {
    id: 'binomial',
    title: 'Биномиальное',
    badge: 'Дискретное',
    accent: 'from-amber-500/15 to-orange-500/10',
    buttonTone:
      'data-[active=true]:border-amber-400 data-[active=true]:bg-amber-50 data-[active=true]:text-amber-800 dark:data-[active=true]:border-amber-700 dark:data-[active=true]:bg-amber-950/30 dark:data-[active=true]:text-amber-200',
    support: '$k=0,1,\\dots,n$',
    signal:
      'Есть фиксированное число испытаний $n$; анализируется количество успехов, а верхняя граница заранее известна.',
    meaning:
      'Естественная модель для доли попаданий, числа верных ответов, количества успехов в серии независимых попыток.',
    labs: 'В лабораторной 2.5 подходит, если удаётся обосновать модель фиксированного числа испытаний.',
    formula: String.raw`P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}`,
    svg: (
      <>
        {[28, 52, 76, 100, 124, 148, 172].map((x, index) => {
          const heights = [24, 48, 80, 106, 80, 48, 24]
          return (
            <rect
              key={x}
              x={x}
              y={126 - heights[index]}
              width="14"
              height={heights[index]}
              rx="4"
              fill="currentColor"
              opacity={0.92}
            />
          )
        })}
      </>
    ),
  },
  {
    id: 'poisson',
    title: 'Пуассона',
    badge: 'Дискретное',
    accent: 'from-violet-500/15 to-fuchsia-500/10',
    buttonTone:
      'data-[active=true]:border-violet-400 data-[active=true]:bg-violet-50 data-[active=true]:text-violet-800 dark:data-[active=true]:border-violet-700 dark:data-[active=true]:bg-violet-950/30 dark:data-[active=true]:text-violet-200',
    support: '$k=0,1,2,\\dots$',
    signal:
      'Считается число событий за фиксированный интервал времени, длины, площади или объёма; верхняя граница заранее не фиксируется.',
    meaning:
      'Подходит для числа заявок, редких отказов, посещений, звонков и других потоков событий.',
    labs: 'В лабораторной 2.5 часто оказывается содержательно убедительнее, чем биномиальная модель.',
    formula: String.raw`P(X=k)=\frac{\lambda^k e^{-\lambda}}{k!}`,
    svg: (
      <>
        {[24, 48, 72, 96, 120, 144, 168, 192].map((x, index) => {
          const heights = [88, 112, 94, 70, 48, 32, 18, 10]
          return (
            <rect
              key={x}
              x={x}
              y={126 - heights[index]}
              width="14"
              height={heights[index]}
              rx="4"
              fill="currentColor"
              opacity={0.92}
            />
          )
        })}
      </>
    ),
  },
]

function DistributionFamilyExplorer({ allowedIds, initialId }) {
  const items = allowedIds ? distributions.filter((item) => allowedIds.includes(item.id)) : distributions
  const initial = items.find((item) => item.id === initialId)?.id ?? items[0]?.id ?? 'normal'
  const [activeId, setActiveId] = useState(initial)
  const active = items.find((item) => item.id === activeId) ?? items[0]

  if (!active) {
    return null
  }

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          Интерактивный атлас распределений
        </h3>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Переключайте модели и сравнивайте форму, область значений, математическую запись и
          типичные ситуации применения.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            data-active={item.id === active.id}
            onClick={() => setActiveId(item.id)}
            className={`rounded-2xl border border-slate-200 px-4 py-3 text-left transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-slate-600 dark:hover:bg-slate-800/80 ${item.buttonTone}`}
          >
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
              {item.badge}
            </p>
          </button>
        ))}
      </div>

      <div
        className={`mt-6 rounded-[1.5rem] border border-slate-200 bg-gradient-to-br ${active.accent} p-5 dark:border-slate-700`}
      >
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.25rem] border border-white/70 bg-white/90 p-4 dark:border-slate-700 dark:bg-slate-950/80">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h4 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  {active.title}
                </h4>
                <MathText
                  as="p"
                  text={`Область значений: ${active.support}`}
                  className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                />
              </div>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                {active.badge}
              </span>
            </div>

            <div className="mt-5 rounded-[1.25rem] border border-slate-200 bg-slate-50/90 p-3 dark:border-slate-700 dark:bg-slate-900/80">
              <svg
                viewBox="0 0 224 144"
                className="h-44 w-full text-slate-900 dark:text-slate-100"
                role="img"
                aria-label={`Схема распределения ${active.title}`}
              >
                <line x1="10" y1="126" x2="214" y2="126" stroke="#94a3b8" strokeWidth="2" />
                <line x1="18" y1="10" x2="18" y2="130" stroke="#94a3b8" strokeWidth="2" />
                {active.svg}
              </svg>
            </div>
          </div>

          <div className="space-y-4">
            <article className="rounded-[1.25rem] border border-white/70 bg-white/90 p-4 dark:border-slate-700 dark:bg-slate-950/80">
              <MathText
                as="p"
                text="Графические признаки"
                className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400"
              />
              <MathText
                as="p"
                text={active.signal}
                className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
              />
            </article>

            <article className="rounded-[1.25rem] border border-white/70 bg-white/90 p-4 dark:border-slate-700 dark:bg-slate-950/80">
              <MathText
                as="p"
                text="Содержательный смысл"
                className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400"
              />
              <MathText
                as="p"
                text={active.meaning}
                className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
              />
            </article>

            <article className="rounded-[1.25rem] border border-white/70 bg-white/90 p-4 dark:border-slate-700 dark:bg-slate-950/80">
              <MathText
                as="p"
                text="Как это связано с лабораторными"
                className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400"
              />
              <MathText
                as="p"
                text={active.labs}
                className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
              />
            </article>
          </div>
        </div>

        <div className="mt-5">
          <MathBlock formula={active.formula} />
        </div>
      </div>
    </section>
  )
}

export default DistributionFamilyExplorer
