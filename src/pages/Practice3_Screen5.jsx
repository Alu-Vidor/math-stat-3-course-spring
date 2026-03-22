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
    title: 'Здесь уже нет этапа угадывания',
    text: 'На кодовом экране для непрерывных признаков мы не повторяем заново теорию QQ-plot. Предполагается, что кандидат уже выбран и теперь его нужно аккуратно проверить.',
  },
  {
    title: 'Другие реальные данные',
    text: 'Здесь используются не признаки из лабораторных, а другие реальные наборы: `penguins`, `mpg` и `diamonds`.',
  },
]

const datasetCode = `import seaborn as sns
from scipy import stats
import numpy as np

penguins = sns.load_dataset('penguins')
mpg_df = sns.load_dataset('mpg')
diamonds = sns.load_dataset('diamonds')

continuous_features = {
    'bill_length_mm': penguins['bill_length_mm'].dropna().to_numpy(),
    'mpg': mpg_df['mpg'].dropna().to_numpy(),
    'price': diamonds['price'].dropna().to_numpy(),
}

def quick_summary(x):
    return {
        'n': x.size,
        'mean': x.mean(),
        'median': np.median(x),
        'std': x.std(ddof=1),
        'skew': stats.skew(x, bias=False),
        'min': x.min(),
        'max': x.max(),
    }`

const candidateCode = `from scipy import stats
import numpy as np

def evaluate_continuous(x, candidate):
    if candidate == 'normal':
        args = (x.mean(), x.std(ddof=1))
        cvm = stats.cramervonmises(x, 'norm', args=args)
        jb = stats.jarque_bera(x)
        return {'args': args, 'cvm_p': cvm.pvalue, 'jb_p': jb.pvalue}

    if candidate == 'lognormal':
        shape, loc, scale = stats.lognorm.fit(x, floc=0)
        cvm = stats.cramervonmises(x, 'lognorm', args=(shape, loc, scale))
        log_x = np.log(x)
        jb = stats.jarque_bera(log_x)
        return {'args': (shape, loc, scale), 'cvm_p': cvm.pvalue, 'jb_log_p': jb.pvalue}

    raise ValueError('Unknown candidate')

bill_length = continuous_features['bill_length_mm']
mpg_values = continuous_features['mpg']
diamond_price = continuous_features['price']`

const pearsonCode = `import numpy as np
from scipy import stats

def pearson_for_continuous(data, dist_name, dist_args, bins='sturges'):
    observed, edges = np.histogram(data, bins=bins)
    cdf = getattr(stats, dist_name).cdf
    probs = np.diff(cdf(edges, *dist_args))
    expected = observed.sum() * probs

    mask = expected > 0
    return stats.chisquare(f_obs=observed[mask], f_exp=expected[mask])

# пример:
# pearson_for_continuous(diamond_price, 'lognorm', lognorm_args)`

const workflowItems = [
  {
    title: '1. Сводка по признаку',
    content: [
      'Сразу выписываем `mean`, `median`, `std`, `skew`, `min`, `max`.',
      'Эта сводка нужна не для красоты: по ней мы понимаем, стоит ли проверять нормальность, логнормальность или обе гипотезы.',
    ],
  },
  {
    title: '2. Подготовка параметров модели',
    content: [
      'Для нормальной гипотезы нужны выборочные `mean` и `std`.',
      'Для логнормальной — параметры, полученные из `stats.lognorm.fit(x, floc=0)` или эквивалентной процедуры на логарифмах.',
    ],
  },
  {
    title: '3. Основные критерии',
    content: [
      'Для непрерывного признака удобно запускать критерий Крамера-Мизеса-Смирнова по самой CDF.',
      'Пирсон χ² добавляем как отдельную проверку через интервалы и ожидаемые частоты.',
    ],
  },
  {
    title: '4. Отдельная проверка нормальной формы',
    content: [
      'Jarque-Bera полезен именно там, где обсуждаем нормальность.',
      'Для логнормальной гипотезы логичнее смотреть на `jarque_bera(np.log(x))`, а не на исходный столбец.',
    ],
  },
]

const summaryColumns = ['penguins.bill_length_mm', 'mpg.mpg', 'diamonds.price']

const summaryRows = [
  {
    label: 'Фактический диапазон',
    values: ['32.1-59.6', '9-46.6', '326-18823'],
  },
  {
    label: 'Центр',
    values: ['x̄ = 43.92, med = 44.45', 'x̄ = 23.52, med = 23', 'x̄ = 3932.8, med = 2401'],
  },
  {
    label: 'Асимметрия',
    values: ['0.053', '0.455', '1.618'],
  },
  {
    label: 'Первый кандидат',
    values: ['Нормальная модель', 'Нормальная модель как первое приближение', 'Логнормальная модель'],
  },
  {
    label: 'Что особенно важно в коде',
    values: [
      'Проверять форму, а не радоваться одному красивому среднему',
      'Не объявлять логнормальность только из-за положительной поддержки',
      'Сравнивать `price` и `log(price)`',
    ],
  },
]

const documentationLinks = [
  {
    label: 'SciPy: cramervonmises',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.cramervonmises.html',
  },
  {
    label: 'SciPy: jarque_bera',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.jarque_bera.html',
  },
  {
    label: 'SciPy: lognorm',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.lognorm.html',
  },
  {
    label: 'SciPy: chisquare',
    href: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.chisquare.html',
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
        subtitle="Собираем один аккуратный шаблон для измерений пингвинов, `mpg` и цен бриллиантов, а не для будущих лабораторных признаков."
      />

      <section className="content-block space-y-6">
        <DatasetCard
          title="Стартовый scaffold для трех реальных непрерывных датасетов"
          text="Один и тот же шаблон можно переиспользовать для разных непрерывных признаков. Разница будет не в структуре кода, а в выбранной гипотезе и в том, что именно вы комментируете в выводе."
          code={datasetCode}
          codeTitle="Python: загрузка и базовая сводка по признаку"
        />

        <TaskBlock title="Короткий рабочий pipeline для непрерывного признака" items={workflowItems} />

        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            На каких реальных сигналах строится код
          </h3>
          <div className="mt-4">
            <ComparisonTable columns={summaryColumns} rows={summaryRows} />
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Функция для сравнения кандидатов
          </h3>
          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
            Здесь одна и та же логика применяется к трем очень разным непрерывным признакам: почти симметричным
            измерениям, умеренно асимметричному `mpg` и ярко скошенным ценам.
          </p>
          <CodeBlock code={candidateCode} language="python" title="Python: сравнение непрерывных кандидатов" />
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Отдельно про Пирсона для непрерывных данных
          </h3>
          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
            Для непрерывного признака Пирсон χ² не появляется из одной готовой функции по сырым значениям: сначала нужно
            построить интервалы и перевести CDF выбранного закона в ожидаемые частоты.
          </p>
          <CodeBlock code={pearsonCode} language="python" title="Python: Пирсон χ² для непрерывного признака" />
        </section>

        <AlertBox title="Что теперь не нужно дублировать в каждом блоке">
          <p>
            Не повторяйте на каждом экране заново объяснение QQ-plot и списка распределений. В этой практике кодовый
            экран должен отвечать на другой вопрос: как один раз собрать проверку так, чтобы потом только менять признак,
            кандидата и комментарий к результату.
          </p>
        </AlertBox>

        <KeyIdea title="Универсальный код, разные статистические истории">
          Измерения клюва пингвинов, расход топлива и цены бриллиантов требуют разных интерпретаций, хотя кодовая рамка
          у них почти одна и та же. Именно это и важно показать на теоретическом экране: не конкретную ЛР, а общий
          рабочий паттерн.
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
