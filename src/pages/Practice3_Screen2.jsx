import { useEffect } from 'react'
import CourseHeader from '../components/CourseHeader'
import IdeaCard from '../components/IdeaCard'
import QQPatternGallery from '../components/QQPatternGallery'
import ScreenNavigation from '../components/ScreenNavigation'

const contextNotes = [
  {
    title: 'Что значит “обосновать”',
    text: 'В отчете мало написать “кажется, распределение нормальное”. Нужно показать, на чем основано это предположение: вид гистограммы, характер хвостов, связь между средней и дисперсией, физический смысл признака.',
  },
  {
    title: 'PDF-алгоритм',
    text: 'В теме 2 прямо задана логика: построить вариационный ряд, оценить параметры, сравнить эмпирические и выравнивающие частоты и только потом формулировать $H_0$ и $H_1$.',
  },
]

const evidenceCards = [
  {
    title: '1. Графическая форма',
    text: 'Гистограмма, полигон частот и ECDF дают первое ощущение: есть ли симметрия, длинный правый хвост, компактная поддержка или счетная природа значений.',
    tone: 'border-sky-200 bg-sky-50/80 dark:border-sky-900/50 dark:bg-sky-950/20',
  },
  {
    title: '2. Выборочные характеристики',
    text: 'Асимметрия, эксцесс, близость средней к дисперсии, правило трех сигм и наличие естественных границ помогают сузить круг гипотез.',
    tone: 'border-violet-200 bg-violet-50/80 dark:border-violet-900/50 dark:bg-violet-950/20',
  },
  {
    title: '3. Предметный смысл',
    text: 'Доходы и цены часто правоскошены, доли и вероятности ограничены интервалом, а число событий за фиксированное время естественно ведет к дискретным моделям.',
    tone: 'border-emerald-200 bg-emerald-50/80 dark:border-emerald-900/50 dark:bg-emerald-950/20',
  },
  {
    title: '4. Ограничения задачи',
    text: 'Не каждый критерий применим всегда: одним нужны сгруппированные частоты, другим известные параметры, третьи вообще адресованы только нормальности.',
    tone: 'border-amber-200 bg-amber-50/80 dark:border-amber-900/50 dark:bg-amber-950/20',
  },
]

const algorithmSteps = [
  'Постройте ранжированный ряд, гистограмму или полигон и найдите базовые оценки параметров.',
  'Сформулируйте 1-2 реалистичные гипотезы о законе распределения, а не десяток случайных догадок.',
  'Проверьте, совпадает ли визуальная картина с числовыми подсказками: асимметрией, эксцессом, соотношением средней и дисперсии.',
  'Для выбранной модели вычислите теоретические частоты или теоретическую функцию распределения.',
  'Только после этого формулируйте $H_0$: “признак распределен по данному закону”, и подбирайте критерии согласия.',
]

const reportBlocks = [
  {
    title: 'Для нормальной гипотезы',
    text: 'Симметричная гистограмма, умеренные хвосты, асимметрия и эксцесс близки к нулю, значительная часть наблюдений укладывается в правило трех сигм.',
  },
  {
    title: 'Для логнормальной гипотезы',
    text: 'Признак принимает только положительные значения, имеет выраженный правый хвост, а после логарифмирования форма становится заметно ближе к нормальной.',
  },
  {
    title: 'Для дискретной гипотезы',
    text: 'Наблюдаем только счетные значения. Если считаем число событий за интервал, подозреваем Пуассона; если число успехов в фиксированном числе испытаний, биномиальное распределение.',
  },
]

function Practice3_Screen2({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 3 -> ВЫДВИЖЕНИЕ ГИПОТЕЗЫ"
        title="Как предложить закон распределения"
        subtitle="Не угадываем, а собираем аргументы из графиков, моментов и смысла признака."
      />

      <section className="content-block space-y-6">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          В теме 2 это сформулировано очень честно: гипотеза о виде распределения рождается из{' '}
          <strong>теоретических предпосылок</strong>, <strong>предшествующего опыта</strong>,{' '}
          <strong>анализа графиков</strong> и <strong>точечных характеристик</strong>. Иначе говоря,
          сначала мы смотрим на данные и контекст, а уже потом зовем критерии согласия.
        </p>

        <section className="grid gap-4 md:grid-cols-2">
          {evidenceCards.map((card) => (
            <article key={card.title} className={`rounded-[1.5rem] border p-5 shadow-soft ${card.tone}`}>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                {card.text}
              </p>
            </article>
          ))}
        </section>

        <IdeaCard title="Практическое правило">
          Чем уже список разумных гипотез до запуска тестов, тем сильнее итоговый вывод. Хороший
          аналитик редко проверяет все подряд. Он сначала отсеивает невозможные законы распределения
          по типу признака и по механике генерации данных.
        </IdeaCard>

        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            QQ-plot как быстрый аргумент до запуска тестов
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Если точки лежат близко к диагонали, нормальная гипотеза выглядит правдоподобнее.
            Систематический изгиб вверх в правом хвосте заставляет проверить логнормальность или
            другую асимметричную модель.
          </p>
          <div className="mt-5">
            <QQPatternGallery />
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Алгоритм выдвижения гипотезы
          </h3>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            {algorithmSteps.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {reportBlocks.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-900/70"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                {item.text}
              </p>
            </article>
          ))}
        </section>

        <section className="rounded-[1.5rem] border border-indigo-200 bg-indigo-50/70 p-6 shadow-soft dark:border-indigo-900/50 dark:bg-indigo-950/20">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Что особенно ценится в академическом отчёте
          </h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-white/70 bg-white/90 p-4 dark:border-slate-700 dark:bg-slate-950/80">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
                Аргументация
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                Гипотеза опирается на графики, характеристики формы и предметный смысл признака.
              </p>
            </article>
            <article className="rounded-2xl border border-white/70 bg-white/90 p-4 dark:border-slate-700 dark:bg-slate-950/80">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
                Сдержанность
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                Формулировка звучит как статистическое решение, а не как абсолютное доказательство
                истинности модели.
              </p>
            </article>
            <article className="rounded-2xl border border-white/70 bg-white/90 p-4 dark:border-slate-700 dark:bg-slate-950/80">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
                Целостность
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                Графическая диагностика и критерии согласия не противоречат друг другу, а работают
                как единая доказательная линия.
              </p>
            </article>
          </div>
        </section>
      </section>

      <ScreenNavigation
        prevTo="/practice/3/screen/1"
        nextTo="/practice/3/screen/3"
        nextLabel="Далее: 3. Какие законы выбирать"
      />
    </article>
  )
}

export default Practice3_Screen2
