import { useState } from 'react'
import MathBlock from './MathBlock'
import MathText from './MathText'

const criteria = [
  {
    id: 'pearson',
    title: 'Пирсон $\\chi^2$',
    summary: 'Сравнивает наблюдаемые и ожидаемые частоты по интервалам или категориям.',
    formula: String.raw`\chi^2 = \sum_{i=1}^{k}\frac{(n_i-np_i)^2}{np_i}`,
    when:
      'Подходит и для непрерывных, и для дискретных задач, если можно корректно построить ожидаемые частоты.',
    caveat:
      'Чувствителен к способу группировки; необходимо следить за условием $E_i \\ge 5$.',
    role: 'Это рабочая “табличная” проверка согласия, особенно важная в лабораторных 2.3–2.5.',
    bars: [
      { label: 'Универсальность', value: 92, color: 'bg-sky-500' },
      { label: 'Требовательность к подготовке', value: 82, color: 'bg-amber-500' },
      { label: 'Наглядность в отчёте', value: 88, color: 'bg-emerald-500' },
    ],
  },
  {
    id: 'cvm',
    title: 'Крамер-Мизес-Смирнов $\\omega^2$',
    summary: 'Сравнивает эмпирическую и теоретическую функции распределения по всей оси значений.',
    formula: String.raw`\omega_n^2 = \frac{1}{12n} + \sum_{i=1}^{n}\left(F(x_{(i)})-\frac{2i-1}{2n}\right)^2`,
    when:
      'Удобен для несгруппированных непрерывных данных, когда хочется анализировать всю кривую распределения, а не только интервальные частоты.',
    caveat:
      'Обычно применяется именно к непрерывным законам; для дискретных задач его используют существенно реже.',
    role: 'Хорошо дополняет Пирсона, потому что не зависит от выбора сетки интервалов.',
    bars: [
      { label: 'Чувствительность к общей форме', value: 90, color: 'bg-violet-500' },
      { label: 'Зависимость от группировки', value: 12, color: 'bg-slate-500' },
      { label: 'Прямота интерпретации', value: 68, color: 'bg-teal-500' },
    ],
  },
  {
    id: 'kolmogorov',
    title: 'Колмогоров $D_n$',
    summary: 'Измеряет максимальное расхождение между $F_n(x)$ и теоретической $F(x)$.',
    formula: String.raw`D_n = \sup_x |F_n(x)-F(x)|`,
    when:
      'Полезен, когда теоретическая функция распределения задана полностью. В лабораторной 2.3 для `HouseAge` параметры зафиксированы: $\\mu = 28.6395$, $\\sigma = 12.5856$.',
    caveat:
      'Классическая формулировка предполагает известные параметры модели; для дискретных распределений интерпретация требует аккуратности.',
    role: 'Это критерий про наибольшее локальное отклонение, а не про среднюю картину в целом.',
    bars: [
      { label: 'Локальная чувствительность', value: 94, color: 'bg-rose-500' },
      { label: 'Требование к известным параметрам', value: 86, color: 'bg-amber-500' },
      { label: 'Простота геометрического смысла', value: 96, color: 'bg-indigo-500' },
    ],
  },
  {
    id: 'jb',
    title: 'Jarque-Bera',
    summary: 'Проверяет нормальность через асимметрию $S$ и эксцесс $K$.',
    formula: String.raw`JB = \frac{n}{6}\left(S^2 + \frac{(K-3)^2}{4}\right)`,
    when:
      'Используется как адресный тест именно на нормальность, когда нужно быстро оценить, насколько распределение отклоняется от нормального по форме.',
    caveat:
      'Не заменяет критерии согласия для равномерной, логнормальной, биномиальной или пуассоновской гипотез.',
    role: 'В лабораторных нужен как дополнительное подтверждение или опровержение нормальной модели.',
    bars: [
      { label: 'Специализация на нормальности', value: 98, color: 'bg-emerald-500' },
      { label: 'Узость области применения', value: 78, color: 'bg-amber-500' },
      { label: 'Скорость вычисления', value: 88, color: 'bg-sky-500' },
    ],
  },
]

function CriteriaExplorer({ initialId = 'pearson' }) {
  const [activeId, setActiveId] = useState(initialId)
  const active = criteria.find((item) => item.id === activeId) ?? criteria[0]

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          Интерактивная карта критериев согласия
        </h3>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Выберите критерий и посмотрите его математическую форму, область применения и
          методические ограничения.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {criteria.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveId(item.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              item.id === active.id
                ? 'border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800'
            }`}
          >
            <MathText text={item.title} />
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-900/70">
            <MathText
              as="h4"
              text={active.title}
              className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white"
            />
            <MathText
              as="p"
              text={active.summary}
              className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
            />
            <MathBlock formula={active.formula} />
          </article>

          <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-900/70">
            <MathText
              as="p"
              text="Когда использовать"
              className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400"
            />
            <MathText
              as="p"
              text={active.when}
              className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
            />
            <MathText
              as="p"
              text="Методическое ограничение"
              className="mt-4 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400"
            />
            <MathText
              as="p"
              text={active.caveat}
              className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
            />
            <MathText
              as="p"
              text="Роль в лабораторной"
              className="mt-4 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400"
            />
            <MathText
              as="p"
              text={active.role}
              className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
            />
          </article>
        </div>

        <article className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 dark:border-slate-700 dark:from-slate-900 dark:to-slate-900">
          <h4 className="text-base font-semibold text-slate-900 dark:text-white">
            Профиль критерия
          </h4>
          <div className="mt-5 space-y-4">
            {active.bars.map((bar) => (
              <div key={bar.label} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{bar.label}</p>
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
                    {bar.value}%
                  </span>
                </div>
                <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className={`h-3 rounded-full ${bar.color}`}
                    style={{ width: `${bar.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[1.25rem] border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-950/70">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
              Методический совет
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Чем важнее итоговый вывод, тем полезнее сочетать критерии с разной чувствительностью:
              один реагирует на интервальные частоты, другой на форму $F_n(x)$, третий адресно
              проверяет нормальность.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}

export default CriteriaExplorer
