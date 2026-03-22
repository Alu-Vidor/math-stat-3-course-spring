import { useEffect } from 'react'
import AlertBox from '../components/AlertBox'
import CodeBlock from '../components/CodeBlock'
import CourseHeader from '../components/CourseHeader'
import DatasetCard from '../components/DatasetCard'
import KeyIdea from '../components/KeyIdea'
import PlotViewer from '../components/PlotViewer'
import QQPlotChart from '../components/QQPlotChart'
import ScreenNavigation from '../components/ScreenNavigation'

const contextNotes = [
  {
    title: 'Колмогоров в этой практике',
    text: 'Для критерия Колмогорова в лабораторной 2.3 следует использовать фиксированные параметры нормальной модели: $\\mu = 28.6395$ и $\\sigma = 12.5856$.',
  },
  {
    title: 'Пирсон и непрерывные данные',
    text: 'Для непрерывного признака критерий Пирсона всегда требует разбиения на интервалы и расчета ожидаемых частот по предполагаемому закону. Это не “одна строка SciPy”, а отдельный этап подготовки.',
  },
]

const notebookCode = `import numpy as np
from scipy import stats

x = task_data.dropna().to_numpy()
n = x.size

x_bar = x.mean()
s = x.std(ddof=1)

# Кандидаты для непрерывного признака
normal_args = (x_bar, s)
uniform_args = (x.min(), x.max() - x.min())
shape, loc, scale = stats.lognorm.fit(x, floc=0)
lognorm_args = (shape, loc, scale)

# Омега-квадрат Крамера-Мизеса-Смирнова
cvm_normal = stats.cramervonmises(x, 'norm', args=normal_args)
cvm_uniform = stats.cramervonmises(x, 'uniform', args=uniform_args)
cvm_lognorm = stats.cramervonmises(x, 'lognorm', args=lognorm_args)

# Колмогоров: параметры задаются условием задачи
mu0, sigma0 = 28.6395, 12.5856
ks_normal = stats.kstest(x, 'norm', args=(mu0, sigma0))

# Jarque-Bera как отдельная проверка нормальности
jb_stat, jb_p = stats.jarque_bera(x)`

const pearsonCode = `import numpy as np
from scipy import stats

def pearson_for_continuous(data, dist_name, dist_args, bins='sturges'):
    observed, bin_edges = np.histogram(data, bins=bins)
    n = observed.sum()

    cdf = getattr(stats, dist_name).cdf
    probs = np.diff(cdf(bin_edges, *dist_args))
    expected = n * probs

    mask = expected > 0
    return stats.chisquare(f_obs=observed[mask], f_exp=expected[mask])

chi2_stat, chi2_p = pearson_for_continuous(x, 'norm', normal_args)`

const workflowSteps = [
  'очистить признак от пропусков и получить `numpy`-массив;',
  'оценить параметры каждого кандидата распределения;',
  'запустить омега-квадрат и, где нужно, Колмогорова;',
  'отдельно собрать Пирсона через интервалы и ожидаемые частоты;',
  'использовать Jarque-Bera как отдельную проверку на нормальность.',
]

const documentationLinks = [
  {
    label: 'SciPy: cramervonmises',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.cramervonmises.html',
  },
  {
    label: 'SciPy: kstest',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.kstest.html',
  },
  {
    label: 'SciPy: jarque_bera',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.jarque_bera.html',
  },
  {
    label: 'SciPy: lognorm',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.lognorm.html',
  },
]

function Practice3_Screen5({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 3 -> КРИТЕРИИ И КОД"
        title="Непрерывные признаки в Python"
        subtitle="Собираем рабочий шаблон для нормальной, равномерной и логнормальной гипотез."
      />

      <section className="content-block space-y-6">
        <DatasetCard
          title="Шаблон ноутбука для непрерывного признака"
          text="Здесь `task_data` — любой непрерывный столбец из вашей лабораторной. Сначала готовим кандидатов распределения, затем запускаем критерии согласия и фиксируем результаты в одной таблице."
          code={notebookCode}
          codeTitle="Python: стартовый scaffold для непрерывного признака"
        />

        <section className="grid gap-4 lg:grid-cols-5">
          {workflowSteps.map((step, index) => (
            <article
              key={step}
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-900/70"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
                Шаг {index + 1}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">{step}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          <PlotViewer
            title="QQ-plot: почти нормальная ситуация"
            caption="Когда точки располагаются вдоль диагонали, нормальная модель выглядит устойчивым кандидатом для дальнейшей формальной проверки."
          >
            <QQPlotChart variant="normal" />
          </PlotViewer>

          <PlotViewer
            title="QQ-plot: асимметричный признак"
            caption="Систематический изгиб в правом хвосте предупреждает, что для признака стоит проверить логнормальность или другую асимметричную модель."
          >
            <QQPlotChart variant="skewed" />
          </PlotViewer>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Отдельно про критерий Пирсона
          </h3>
          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
            Для непрерывного признака Пирсон живет не на сырых наблюдениях, а на интервалах. Поэтому
            полезно иметь небольшую функцию, которая переводит CDF выбранного закона в ожидаемые
            частоты.
          </p>
          <CodeBlock code={pearsonCode} language="python" title="Python: Пирсон для непрерывного признака" />
        </section>

        <AlertBox title="Что обязательно прописать в отчете">
          <p>
            Для каждого непрерывного признака укажите, какие именно параметры закона вы оценивали,
            как строили интервалы для Пирсона и почему выбранный закон выглядит разумным еще до
            запуска тестов.
          </p>
        </AlertBox>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
              До тестов
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Гистограмма, QQ-plot, базовые характеристики формы и ограничения области значений.
            </p>
          </article>
          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
              Во время тестов
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Единая таблица параметров, статистик и `p-value`, чтобы видеть согласованность
              разных критериев.
            </p>
          </article>
          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">
              После тестов
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Статистическое решение следует связать с содержательным смыслом признака и формой
              распределения.
            </p>
          </article>
        </section>

        <KeyIdea title="Правильный результат — это не просто p-value">
          Сильное решение по непрерывному признаку обычно выглядит так: гипотеза выдвинута по
          гистограмме и смыслу признака, затем подтверждена или ослаблена омега-квадратом и
          Пирсоном, а Jarque-Bera и Колмогоров используются как адресные дополнительные проверки.
        </KeyIdea>

        <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-700 dark:bg-slate-900/70">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Официальная документация Python
          </h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {documentationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 dark:hover:border-indigo-700 dark:hover:text-indigo-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </section>

      <ScreenNavigation
        prevTo="/practice/3/screen/4"
        nextTo="/practice/3/screen/6"
        nextLabel="Далее: 6. Дискретные признаки в Python"
      />
    </article>
  )
}

export default Practice3_Screen5
