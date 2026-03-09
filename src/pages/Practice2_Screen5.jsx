import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Eye, FlaskConical, ScrollText } from 'lucide-react'
import CourseHeader from '../components/CourseHeader'
import CodeBlock from '../components/CodeBlock'
import PlotViewer from '../components/PlotViewer'
import KeyIdea from '../components/KeyIdea'
import MathText from '../components/MathText'
import QQPlotChart from '../components/QQPlotChart'
import QQPatternGallery from '../components/QQPatternGallery'

const contextNotes = [
  {
    title: 'А как же тесты?',
    text: 'Кроме графиков, существуют строгие тесты на нормальность. Например, у `scipy.stats.shapiro` нулевая гипотеза звучит так: «данные распределены нормально». Если $p \\le 0.05$, мы отвергаем нормальность.',
  },
  {
    title: 'Проблема больших данных',
    text: 'На очень больших выборках тесты на нормальность становятся сверхчувствительными: любая микродеформация даёт $p < 0.05$. QQ-plot в этом смысле честнее: он показывает, есть ли существенное нарушение формы распределения, а не только формальный повод отклонить $H_0$.',
  },
  {
    title: 'Что именно читать на QQ-plot?',
    text: 'Смотрите не на отдельные точки, а на систематическую форму отклонения от диагонали. Дуга часто означает асимметрию, S-образный изгиб - тяжелые хвосты, а случайное облако вокруг линии обычно допустимо.',
  },
]

const qqCode = `import numpy as np
import scipy.stats as stats
import matplotlib.pyplot as plt

# Генерируем нормальные и скошенные (экспоненциальные) данные
normal_data = np.random.normal(loc=0, scale=1, size=1000)
skewed_data = np.random.exponential(scale=2, size=1000)

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# QQ-plot для нормальных данных
stats.probplot(normal_data, dist="norm", plot=axes[0])
axes[0].set_title("QQ-plot: Нормальные данные")

# QQ-plot для скошенных данных
stats.probplot(skewed_data, dist="norm", plot=axes[1])
axes[1].set_title("QQ-plot: Скошенные данные")

plt.show()`

const readingCards = [
  {
    icon: Eye,
    title: '1. Сначала центр',
    text: 'Если середина графика идет вдоль линии, основная масса наблюдений согласуется с нормальной формой.',
    tone: 'border-sky-200 bg-sky-50/80 dark:border-sky-900/50 dark:bg-sky-950/20',
  },
  {
    icon: ScrollText,
    title: '2. Потом хвосты',
    text: 'Именно концы QQ-plot показывают, есть ли асимметрия, выбросы или тяжелые хвосты, которые ломают параметрические тесты.',
    tone: 'border-violet-200 bg-violet-50/80 dark:border-violet-900/50 dark:bg-violet-950/20',
  },
  {
    icon: FlaskConical,
    title: '3. Затем решение',
    text: 'Если отклонение систематическое, переходите к преобразованию данных или непараметрическим критериям.',
    tone: 'border-emerald-200 bg-emerald-50/80 dark:border-emerald-900/50 dark:bg-emerald-950/20',
  },
]

function Practice2_Screen5({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 2 -> КРИТЕРИИ В КОДЕ"
        title="QQ-plot: смотрим на нормальность глазами"
        subtitle="Как понять, можно ли применять классические критерии к вашим данным."
      />

      <section className="content-block space-y-6">
        <MathText
          as="p"
          text="Большинство мощных параметрических тестов требуют, чтобы данные были распределены нормально. Если применить такой тест к сильно скошенным данным, он даст некорректный $p$-value. Гистограмма полезна, но глаз плохо замечает тонкие отклонения в хвостах. Для этого и используют QQ-plot."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />

        <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-700 dark:bg-slate-900/70">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Интуиция QQ-plot
          </h3>
          <MathText
            as="p"
            text="QQ-plot сопоставляет квантили вашей выборки с квантилями идеального нормального распределения. Правило чтения простое: если точки лежат вдоль диагонали, форма выборки близка к нормальной. Если точки выгибаются дугой или резко расходятся по краям, нормальность нарушена."
            className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <MathText
            as="p"
            text="Важно другое: QQ-plot проверяет не совпадение среднего и дисперсии, а совпадение всей формы распределения. Поэтому он особенно полезен там, где тест чувствителен к хвостам и асимметрии."
            className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {readingCards.map((card) => {
            const Icon = card.icon
            return (
              <article key={card.title} className={`rounded-[1.5rem] border p-5 shadow-soft ${card.tone}`}>
                <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <Icon size={18} />
                  <h3 className="text-base font-semibold">{card.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                  {card.text}
                </p>
              </article>
            )
          })}
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Пишем код на SciPy
          </h3>
          <MathText
            as="p"
            text="Сгенерируем два массива: один почти идеально нормальный, второй — сильно скошенный. Затем построим QQ-plot с помощью `scipy.stats.probplot`."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <CodeBlock code={qqCode} language="python" title="Python: QQ-plot через scipy.stats.probplot" />
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Как читать форму отклонений
          </h3>
          <MathText
            as="p"
            text="Ниже три типовые геометрии QQ-plot. Это полезнее, чем просто помнить фразу «точки должны лежать на линии», потому что именно форма изгиба подсказывает причину нарушения."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <QQPatternGallery />
        </section>

        <section className="grid gap-5 xl:grid-cols-3">
          <PlotViewer
            title="QQ-plot: нормальные данные"
            caption="Идеальное совпадение: точки плотно облегают диагональ. Это признак того, что эмпирические квантили почти совпадают с теоретическими."
          >
            <QQPlotChart variant="normal" />
          </PlotViewer>

          <PlotViewer
            title="QQ-plot: скошенные данные"
            caption="Типичная асимметрия: точки образуют дугу и резко отрываются от линии в хвостах. Это сигнал, что нормальность нарушена."
          >
            <QQPlotChart variant="skewed" />
          </PlotViewer>

          <PlotViewer
            title="QQ-plot: тяжелые хвосты"
            caption="Центр еще похож на нормальный, но оба хвоста уходят от линии заметно сильнее. Так выглядит распределение с избытком крайних значений."
          >
            <QQPlotChart variant="heavy-tails" />
          </PlotViewer>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50/80 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/20">
            <h3 className="text-base font-semibold text-emerald-900 dark:text-emerald-200">Что видно в норме</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Центральная часть и хвосты ведут себя согласованно. Значит, параметрические тесты обычно допустимы.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50/80 p-5 dark:border-amber-900/50 dark:bg-amber-950/20">
            <h3 className="text-base font-semibold text-amber-900 dark:text-amber-200">Что видно при асимметрии</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Хвосты систематически отклоняются от диагонали. Это уже не шум, а структурная скошенность распределения.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-teal-200 bg-teal-50/80 p-5 dark:border-teal-900/50 dark:bg-teal-950/20">
            <h3 className="text-base font-semibold text-teal-900 dark:text-teal-200">Что видно при тяжелых хвостах</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Середина еще выглядит прилично, но крайние точки улетают. Это риск выбросов и завышенной чувствительности классических критериев.
            </p>
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Практическое правило для анализа
          </h3>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/70">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 dark:text-white">
                Почти прямая
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                Можно продолжать с t-тестом, ANOVA или линейной моделью, если остальные предпосылки тоже в порядке.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/70">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 dark:text-white">
                Умеренный изгиб
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                Проверьте логарифмирование, Box-Cox, удаление явных ошибок ввода и устойчивость вывода к выбросам.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/70">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 dark:text-white">
                Сильное расхождение
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                Лучше перейти к непараметрическим критериям или перестроить модель под реальную форму данных.
              </p>
            </div>
          </div>
        </section>

        <KeyIdea title="Нормальности нет. Что делать?">
          {'Если QQ-plot похож на правый график, есть два стандартных пути. Первый — попробовать преобразование данных, например логарифмирование, чтобы стянуть хвосты. Второй — отказаться от параметрики и перейти к непараметрическим критериям, например Манна–Уитни, который не требует нормальности.'}
        </KeyIdea>
      </section>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/2/screen/4"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>

        <Link
          to="/practice/2/screen/6"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 6. Хи-квадрат Пирсона (код)
          <ArrowRight size={16} />
        </Link>
      </nav>
    </article>
  )
}

export default Practice2_Screen5
