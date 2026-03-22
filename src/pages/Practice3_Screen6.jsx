import { useEffect } from 'react'
import AlertBox from '../components/AlertBox'
import CodeBlock from '../components/CodeBlock'
import CourseHeader from '../components/CourseHeader'
import DatasetCard from '../components/DatasetCard'
import KeyIdea from '../components/KeyIdea'
import ScreenNavigation from '../components/ScreenNavigation'

const contextNotes = [
  {
    title: 'Биномиальное или Пуассон?',
    text: 'Если заранее известно фиксированное число испытаний и считается число успехов, это биномиальная логика. Если считаем поток событий за интервал времени или пространства, чаще возникает модель Пуассона.',
  },
  {
    title: 'Колмогоров для дискреты',
    text: 'Классический тест Колмогорова изначально строился для непрерывных распределений. В учебной лабораторной его можно использовать как рабочий ориентир, но в отчете полезно честно отметить это ограничение.',
  },
]

const discreteNotebookCode = `import numpy as np
from scipy import stats

x = discrete_data.dropna().to_numpy()
values, observed = np.unique(x, return_counts=True)
n_obs = observed.sum()

sample_mean = x.mean()
sample_var = x.var(ddof=1)

# Гипотеза Пуассона
lambda_hat = sample_mean
expected_poisson = n_obs * stats.poisson.pmf(values, mu=lambda_hat)
chi2_poisson = stats.chisquare(f_obs=observed, f_exp=expected_poisson)
ks_poisson = stats.kstest(x, stats.poisson(mu=lambda_hat).cdf)

# Гипотеза биномиального распределения:
# n_trials задается смыслом задачи, а не берется автоматически из данных
n_trials = ...
p_hat = sample_mean / n_trials
expected_binom = n_obs * stats.binom.pmf(values, n=n_trials, p=p_hat)
chi2_binom = stats.chisquare(f_obs=observed, f_exp=expected_binom)
ks_binom = stats.kstest(x, stats.binom(n_trials, p_hat).cdf)`

const groupingCode = `import numpy as np

mask = expected_poisson >= 5

observed_main = observed[mask]
expected_main = expected_poisson[mask]

tail_observed = observed[~mask].sum()
tail_expected = expected_poisson[~mask].sum()

observed_grouped = np.append(observed_main, tail_observed)
expected_grouped = np.append(expected_main, tail_expected)`

const decisionCards = [
  {
    title: 'Шаг 1. Тип процесса',
    text: 'Фиксированное число испытаний ведет к биномиальному закону, поток событий без жесткого верхнего потолка — к Пуассону.',
  },
  {
    title: 'Шаг 2. Параметры',
    text: 'Для Пуассона оцениваем $\\lambda$ через выборочную среднюю. Для биномиального нужны и число испытаний $n$, и вероятность успеха $p$.',
  },
  {
    title: 'Шаг 3. Частоты',
    text: 'Через `pmf` получаем теоретические вероятности и переводим их в ожидаемые частоты, умножая на объем выборки.',
  },
  {
    title: 'Шаг 4. Проверка',
    text: 'Запускаем Пирсона и Колмогорова, затем сравниваем, какая модель лучше согласуется с данными и с предметным смыслом задачи.',
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
        subtitle="Рабочий шаблон для задач про биномиальное распределение и закон Пуассона."
      />

      <section className="content-block space-y-6">
        <DatasetCard
          title="Шаблон ноутбука для дискретного признака"
          text="Здесь `discrete_data` — любой счетный признак из вашей лабораторной. Сначала фиксируем гипотезу о механике процесса, затем считаем теоретические вероятности, ожидаемые частоты и запускаем критерии."
          code={discreteNotebookCode}
          codeTitle="Python: scaffold для дискретного признака"
        />

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {decisionCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-900/70"
            >
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                {card.text}
              </p>
            </article>
          ))}
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Что делать с малыми ожидаемыми частотами
          </h3>
          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
            Критерий Пирсона требует, чтобы ожидаемые частоты в корзинах не были слишком малы.
            Поэтому хвосты распределения часто приходится объединять в одну группу.
          </p>
          <CodeBlock code={groupingCode} language="python" title="Python: объединение редких категорий" />
        </section>

        <AlertBox title="Академически аккуратная формулировка вывода">
          <p>
            Даже если одна модель дает формально лучшее `p-value`, не забывайте о содержательном
            смысле. В отчете важна фраза не “данные точно распределены по Пуассону”, а “данные не
            дают оснований отвергнуть гипотезу о распределении Пуассона на уровне значимости 0.05”.
          </p>
        </AlertBox>

        <KeyIdea title="Сначала механизм, потом тест">
          Для дискретных задач особенно опасно подгонять закон распределения постфактум. Сначала
          решите, какая модель вообще соответствует природе процесса, и только затем запускайте
          критерии согласия.
        </KeyIdea>
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
