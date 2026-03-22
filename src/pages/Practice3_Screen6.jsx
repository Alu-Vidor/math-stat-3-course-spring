import { useEffect } from 'react'
import AlertBox from '../components/AlertBox'
import CodeBlock from '../components/CodeBlock'
import ComparisonTable from '../components/ComparisonTable'
import CourseHeader from '../components/CourseHeader'
import DatasetCard from '../components/DatasetCard'
import KeyIdea from '../components/KeyIdea'
import ScreenNavigation from '../components/ScreenNavigation'
import TaskBlock from '../components/TaskBlock'

const contextNotes = [
  {
    title: 'Главный пример — `taxis.passengers`',
    text: 'Признак `taxis.passengers` удобен тем, что на реальных данных показывает связь между частотной таблицей, ограниченностью диапазона и выбором дискретной модели.',
  },
  {
    title: 'Смысл важнее красивой формулы',
    text: 'Если признак ограничен сверху и сильно сосредоточен около 1-2, модель Пуассона нельзя считать естественной только потому, что она знакома по учебнику.',
  },
]

const datasetCode = `import seaborn as sns
import numpy as np
from scipy import stats

taxis = sns.load_dataset('taxis')
passengers = taxis['passengers'].dropna().to_numpy()

values, observed = np.unique(passengers, return_counts=True)
sample_mean = passengers.mean()       # 1.539
sample_var = passengers.var(ddof=1)   # 1.449

summary = {
    'min': passengers.min(),
    'max': passengers.max(),
    'mean': sample_mean,
    'variance': sample_var,
    'share_of_1': (passengers == 1).mean(),
}`

const modelCode = `import seaborn as sns
from scipy import stats
import numpy as np

taxis = sns.load_dataset('taxis')
passengers = taxis['passengers'].dropna().to_numpy()
values, observed = np.unique(passengers, return_counts=True)

def poisson_expected(values, sample):
    lam = sample.mean()
    probs = stats.poisson.pmf(values, mu=lam)
    probs = probs / probs.sum()
    return sample.size * probs

def capacity_benchmark(values, sample, seats=6):
    # Это не "истинная" биномиальная модель поездки,
    # а ограниченный сверху benchmark для сравнения с Пуассоном.
    p_hat = sample.mean() / seats
    probs = stats.binom.pmf(values, n=seats, p=p_hat)
    probs = probs / probs.sum()
    return sample.size * probs

expected_poisson = poisson_expected(values, passengers)
expected_capacity = capacity_benchmark(values, passengers, seats=6)

chi2_poisson = stats.chisquare(f_obs=observed, f_exp=expected_poisson)
chi2_capacity = stats.chisquare(f_obs=observed, f_exp=expected_capacity)

print('poisson ->', chi2_poisson)
print('capacity ->', chi2_capacity)`

const groupingCode = `import seaborn as sns
import numpy as np
from scipy import stats

taxis = sns.load_dataset('taxis')
passengers = taxis['passengers'].dropna().to_numpy()
values, observed = np.unique(passengers, return_counts=True)

lam = passengers.mean()
expected_poisson = passengers.size * stats.poisson.pmf(values, mu=lam)
expected_poisson = passengers.size * (expected_poisson / expected_poisson.sum())

mask = expected_poisson >= 5

observed_grouped = np.append(observed[mask], observed[~mask].sum())
expected_grouped = np.append(expected_poisson[mask], expected_poisson[~mask].sum())

chi2_grouped = stats.chisquare(f_obs=observed_grouped, f_exp=expected_grouped)

print('observed_grouped =', observed_grouped)
print('expected_grouped =', np.round(expected_grouped, 2))
print('chi2_grouped =', chi2_grouped)`

const decisionItems = [
  {
    title: '1. Сначала описываем фактическую форму',
    content: [
      'У `taxis.passengers` значения только от `0` до `6`.',
      'Из `6433` поездок `72.72%` имеют ровно `1` пассажира, а `86.34%` — `1` или `2` пассажиров.',
    ],
  },
  {
    title: '2. Потом сверяемся с содержанием модели',
    content: [
      'Пуассон лучше подходит для неограниченного потока событий.',
      'Для числа пассажиров ограниченность вместимостью машины делает такую гипотезу содержательно слабее.',
    ],
  },
  {
    title: '3. И только потом считаем Expected',
    content: [
      'Для Пирсона χ² надо получить теоретические вероятности и перевести их в ожидаемые частоты.',
      'Если некоторые `Expected < 5`, редкие категории приходится объединять.',
    ],
  },
]

const countColumns = ['0', '1', '2', '3', '4', '5', '6']

const countRows = [
  {
    label: 'Наблюдаемые частоты',
    values: [96, 4678, 876, 243, 110, 277, 153],
    highlight: true,
  },
  {
    label: 'Доли, %',
    values: ['1.49', '72.72', '13.62', '3.78', '1.71', '4.31', '2.38'],
  },
  {
    label: 'Что это подсказывает',
    values: ['Редко', 'Главный пик', 'Вторая масса', 'Хвост', 'Хвост', 'Хвост', 'Хвост'],
  },
]

const documentationLinks = [
  {
    label: 'SciPy: chisquare',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.chisquare.html',
  },
  {
    label: 'SciPy: poisson',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.poisson.html',
  },
  {
    label: 'SciPy: binom',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.binom.html',
  },
]

function Practice3_Screen6({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 3 -> КРИТЕРИИ И КОД"
        title="Дискретные признаки в Python"
        subtitle="Разбираем `taxis.passengers` как пример выбора дискретной модели с учетом природы признака."
      />

      <section className="content-block space-y-6">
        <DatasetCard
          title="Базовая сводка для `taxis.passengers`"
          text="Частотная таблица по `taxis.passengers` позволяет сразу увидеть диапазон значений, положение основной массы наблюдений и ограничения, которые должна учитывать гипотеза о распределении."
          code={datasetCode}
          codeTitle="Python: базовая сводка по дискретному признаку"
        />

        <TaskBlock title="Последовательность анализа дискретного признака" items={decisionItems} />

        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Что реально происходит в `taxis.passengers`
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Здесь полезно держать в голове три числа: среднее `1.539`, дисперсия `1.449` и пик в точке `1`, который
            собирает почти три четверти поездок.
          </p>
          <div className="mt-4">
            <ComparisonTable columns={countColumns} rows={countRows} />
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Код для сравнения дискретных кандидатов
          </h3>
          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
            Сравнение дискретных моделей строится одинаково: сначала для каждой гипотезы получаем теоретические
            вероятности и ожидаемые частоты, затем сопоставляем их с наблюдаемыми частотами с помощью критерия
            Пирсона χ².
          </p>
          <CodeBlock code={modelCode} language="python" title="Python: Expected frequencies для дискретных моделей" />
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Что делать с редкими категориями
          </h3>
          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
            На хвостах у дискретного распределения Expected быстро становятся малыми. Поэтому для Пирсона χ² важно
            заранее уметь объединять редкие категории, а не надеяться, что функция сама все исправит.
          </p>
          <CodeBlock code={groupingCode} language="python" title="Python: объединение редких категорий" />
        </section>

        <AlertBox title="Почему гипотеза Пуассона требует осторожности">
          <p>
            Закон Пуассона естественен для неограниченного потока редких событий, тогда как число пассажиров в поездке
            такси ограничено вместимостью автомобиля и резко сосредоточено в малых значениях. Поэтому для
            `taxis.passengers` гипотезу Пуассона разумно рассматривать как одну из сравниваемых моделей, а не как
            автоматически предпочтительный вариант.
          </p>
        </AlertBox>

        <KeyIdea title="Для дискретных данных сначала думаем о процессе, потом о тесте">
          В примере с `taxis.passengers` сами данные подсказывают осторожность с Пуассоном: диапазон ограничен,
          вместимость фиксирована, а основная масса поездок сосредоточена в точках `1` и `2`. Именно такие реальные
          сигналы и должны направлять код, а не наоборот.
        </KeyIdea>

        <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-700 dark:bg-slate-900/70">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Официальная документация Python
          </h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
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
        prevTo="/practice/3/screen/5"
        nextTo="/practice/3/screen/7"
        nextLabel="Далее: 7. Чек-лист для лабораторных 2.3-2.5"
      />
    </article>
  )
}

export default Practice3_Screen6
