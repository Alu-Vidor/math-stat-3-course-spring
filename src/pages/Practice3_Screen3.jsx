import { useEffect } from 'react'
import AlertBox from '../components/AlertBox'
import ComparisonTable from '../components/ComparisonTable'
import CourseHeader from '../components/CourseHeader'
import DistributionFamilyExplorer from '../components/DistributionFamilyExplorer'
import ScreenNavigation from '../components/ScreenNavigation'

const contextNotes = [
  {
    title: 'Непрерывное vs дискретное',
    text: 'Первое решение всегда про тип признака. Непрерывные признаки ведут нас к нормальному, равномерному и логнормальному семействам. Счетные признаки — к биномиальному или пуассоновскому.',
  },
  {
    title: 'Не путайте ограниченность и равномерность',
    text: 'То, что признак живет на ограниченном интервале, еще не делает его равномерным. Для равномерного закона нужна не только конечная поддержка, но и примерно одинаковая плотность по всей длине интервала.',
  },
]

const distributionCards = [
  {
    title: 'Нормальное',
    text: 'Симметричный колокол без выраженного перекоса. Подходит для суммарного эффекта многих малых факторов.',
    tone: 'border-sky-200 bg-sky-50/80 dark:border-sky-900/50 dark:bg-sky-950/20',
  },
  {
    title: 'Равномерное',
    text: 'Значения заполняют интервал довольно ровно, без ярко выраженного центра и без тяжелых хвостов.',
    tone: 'border-cyan-200 bg-cyan-50/80 dark:border-cyan-900/50 dark:bg-cyan-950/20',
  },
  {
    title: 'Логнормальное',
    text: 'Признак положителен и правоскошен; после логарифмирования распределение часто становится ближе к нормальному.',
    tone: 'border-emerald-200 bg-emerald-50/80 dark:border-emerald-900/50 dark:bg-emerald-950/20',
  },
  {
    title: 'Биномиальное',
    text: 'Число успехов в фиксированном количестве испытаний. Есть верхняя граница, определяемая самим экспериментом.',
    tone: 'border-amber-200 bg-amber-50/80 dark:border-amber-900/50 dark:bg-amber-950/20',
  },
  {
    title: 'Пуассона',
    text: 'Число событий за фиксированный интервал времени, площади или объема. Поддержка не ограничена сверху жестко.',
    tone: 'border-violet-200 bg-violet-50/80 dark:border-violet-900/50 dark:bg-violet-950/20',
  },
]

const comparisonColumns = ['Нормальное', 'Равномерное', 'Логнормальное', 'Биномиальное', 'Пуассона']

const comparisonRows = [
  {
    label: 'Тип признака',
    values: ['Непрерывный', 'Непрерывный', 'Непрерывный', 'Дискретный', 'Дискретный'],
  },
  {
    label: 'Форма',
    values: ['Симметрия', 'Почти плоская', 'Правый хвост', 'Счет успехов', 'Счет событий'],
  },
  {
    label: 'Быстрая подсказка',
    values: [
      '$as \\approx 0,\\ ek \\approx 0$',
      'Поддержка $[a,b]$',
      '$\\log(X)$ ближе к нормали',
      'Есть фиксированное $n$',
      '$D \\approx \\bar{x}$',
    ],
  },
  {
    label: 'Типичный пример',
    values: ['Ошибки измерений', 'Случайная точка на отрезке', 'Доходы, цены', 'Число попаданий', 'Число заявок'],
  },
]

function Practice3_Screen3({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 3 -> ВЫДВИЖЕНИЕ ГИПОТЕЗЫ"
        title="Нормальное, равномерное, логнормальное, биномиальное, Пуассона"
        subtitle="Короткая карта пяти законов, которые понадобятся в лабораторных 2.3–2.5."
      />

      <section className="content-block space-y-6">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          В ваших заданиях не нужно изобретать экзотику. Круг гипотез уже заранее ограничен:
          для непрерывных признаков мы смотрим на <strong>нормальное</strong>,{' '}
          <strong>равномерное</strong> и <strong>логнормальное</strong> распределения, а для
          дискретных — на <strong>биномиальное</strong> и <strong>Пуассона</strong>.
        </p>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {distributionCards.map((card) => (
            <article key={card.title} className={`rounded-[1.5rem] border p-5 shadow-soft ${card.tone}`}>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                {card.text}
              </p>
            </article>
          ))}
        </section>

        <DistributionFamilyExplorer />

        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Быстрое сравнение законов
          </h3>
          <div className="mt-4">
            <ComparisonTable columns={comparisonColumns} rows={comparisonRows} />
          </div>
        </section>

        <AlertBox title="Где чаще всего ошибаются">
          <p>
            Правый хвост у положительного признака часто автоматически называют “нормальным с
            выбросами”. На практике это очень часто сигнал в сторону <strong>логнормальности</strong>
            , а не испорченной нормали.
          </p>
          <p>
            Для дискретного признака главный вопрос другой: есть ли у процесса{' '}
            <strong>фиксированное число испытаний</strong>. Если да, смотрим на биномиальное
            распределение. Если считаем поток событий за интервал — чаще уместен Пуассон.
          </p>
        </AlertBox>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-900/70">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
              Непрерывный признак
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Сначала проверяем тип поддержки: вся числовая ось, ограниченный интервал или только
              положительные значения.
            </p>
          </article>
          <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-900/70">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
              Форма распределения
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Затем анализируем симметрию, правый хвост, компактность распределения и поведение
              после логарифмирования.
            </p>
          </article>
          <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-900/70">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
              Механизм генерации
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Для дискретных данных решающим становится вопрос, что именно считается: успехи в
              серии испытаний или поток событий.
            </p>
          </article>
        </section>
      </section>

      <ScreenNavigation
        prevTo="/practice/3/screen/2"
        nextTo="/practice/3/screen/4"
        nextLabel="Далее: 4. Какие критерии согласия за что отвечают"
      />
    </article>
  )
}

export default Practice3_Screen3
