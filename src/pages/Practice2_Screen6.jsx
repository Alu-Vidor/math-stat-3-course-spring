import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Dices, Sigma, TriangleAlert } from 'lucide-react'
import CourseHeader from '../components/CourseHeader'
import MathBlock from '../components/MathBlock'
import CodeBlock from '../components/CodeBlock'
import KeyIdea from '../components/KeyIdea'
import MathText from '../components/MathText'
import TerminalOutput from '../components/TerminalOutput'
import ComparisonTable from '../components/ComparisonTable'

const contextNotes = [
  {
    title: 'Жесткое ограничение',
    text: 'У критерия Пирсона есть важное правило: ожидаемая частота в каждой корзине ($E_i$) должна быть не меньше 5. Если вы кинете кубик всего 12 раз, математика Хи-квадрата начнет врать. В таких случаях корзины объединяют.',
  },
  {
    title: 'Степени свободы (df)',
    text: 'Форма распределения $\\chi^2$ зависит от числа степеней свободы. Здесь это число категорий минус один: $6 - 1 = 5$. Для монетки с двумя исходами график был бы совсем другим. SciPy учитывает это автоматически.',
  },
]

const comparisonColumns = ['1', '2', '3', '4', '5', '6']

const comparisonRows = [
  {
    label: 'Ожидаем (E)',
    values: [10, 10, 10, 10, 10, 10],
  },
  {
    label: 'Наблюдаем (O)',
    values: [5, 8, 9, 12, 14, 12],
    highlight: true,
  },
]

const chiSquareCode = `import scipy.stats as stats

# Наши данные
observed = [5, 8, 9, 12, 14, 12]
expected = [10, 10, 10, 10, 10, 10]

# Проводим тест Хи-квадрат
chi2_stat, p_value = stats.chisquare(f_obs=observed, f_exp=expected)

print(f"Статистика Хи-квадрат: {chi2_stat:.2f}")
print(f"P-value: {p_value:.4f}")`

function Practice2_Screen6({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 2 -> КРИТЕРИИ В КОДЕ"
        title="Критерий согласия Хи-квадрат ($\\chi^2$)"
        subtitle="Сравниваем реальность с нашими ожиданиями."
      />

      <section className="content-block space-y-6">
        <MathText
          as="p"
          text="Если QQ-plot нужен для непрерывных величин (рост, вес, доходы), то для категориальных и дискретных частот используют критерий Хи-квадрат Пирсона. Его логика проста: мы берем наблюдаемые частоты (Observed) и сравниваем их с ожидаемыми (Expected). Чем больше расхождение, тем сильнее данные спорят с нулевой гипотезой."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />

        <section className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-amber-50 p-6 shadow-soft dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/20">
          <div className="flex items-start gap-3">
            <Dices size={22} className="mt-1 shrink-0 text-amber-600 dark:text-amber-300" />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                Интуиция и формула
              </h3>
              <MathText
                as="p"
                text="Представьте, что мы кинули игральный кубик 60 раз. Если он честный ($H_0$), мы ожидаем, что каждая грань выпадет ровно по 10 раз. Но в реальности цифры почти никогда не совпадают идеально."
                className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
              />
              <ComparisonTable columns={comparisonColumns} rows={comparisonRows} />
              <MathText
                as="p"
                text="Чтобы понять, случаен ли такой перекос, Пирсон предложил одну сумму: на каждом шаге берем разницу между $O_i$ и $E_i$, возводим ее в квадрат и делим на ожидаемую частоту."
                className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
              />
              <MathBlock formula={String.raw`\chi^2 = \sum_{i=1}^{k} \frac{(O_i - E_i)^2}{E_i}`} />
              <MathText
                as="p"
                text="Здесь $O_i$ — Observed, а $E_i$ — Expected. Квадрат нужен, чтобы отрицательные и положительные отклонения не взаимоуничтожались."
                className="text-sm leading-relaxed text-slate-700 dark:text-slate-200"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[1.5rem] border border-indigo-200 bg-indigo-50/70 p-6 dark:border-indigo-900/50 dark:bg-indigo-950/20">
            <div className="flex items-start gap-3">
              <Sigma size={20} className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-300" />
              <div className="space-y-3">
                <h3 className="text-lg font-semibold tracking-tight text-indigo-900 dark:text-indigo-200">
                  Визуализация распределения
                </h3>
                <MathText
                  as="p"
                  text="Если кубик честный, значение этой суммы обычно болтается близко к нулю. Большие значения $\\chi^2$ означают, что наблюдаемые частоты слишком далеко ушли от ожидаемых."
                  className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
                />
                <MathText
                  as="p"
                  text="Логика решения такая же, как у других критериев: если статистика улетает далеко вправо, мы попадаем в критическую зону и отвергаем $H_0$."
                  className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
                />
              </div>
            </div>
          </article>

          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-start gap-3">
              <TriangleAlert size={20} className="mt-1 shrink-0 text-amber-600 dark:text-amber-300" />
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                  Как не сломать тест
                </h3>
                <MathText
                  as="p"
                  text="Пирсон работает на частотах, а не на сырых числах. Поэтому категории должны быть определены заранее, а ожидаемые частоты в каждой корзине не должны быть слишком маленькими."
                  className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
                />
              </div>
            </div>
          </article>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Пишем код (SciPy)
          </h3>
          <MathText
            as="p"
            text="В Python и сама формула, и вычисление $p$-value уже спрятаны внутри `scipy.stats.chisquare`."
            className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
          <CodeBlock code={chiSquareCode} language="python" title="Python: критерий согласия Хи-квадрат" />
          <TerminalOutput
            lines={['Статистика Хи-квадрат: 5.40', 'P-value: 0.3690']}
          />
        </section>

        <KeyIdea title="Как читать результат?">
          {'Наш p-value равен 0.369, то есть около 37%. Это заметно больше стандартного порога $\\alpha = 0.05$. Значит, мы не отвергаем нулевую гипотезу: перекос между 5 единицами и 14 пятерками для 60 бросков еще выглядит как нормальная случайность, а не как улика против честного кубика.'}
        </KeyIdea>
      </section>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/2/screen/5"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>

        <Link
          to="/practice/2/screen/7"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 7. Лаб 2.1. Распределение непрерывного признака
          <ArrowRight size={16} />
        </Link>
      </nav>
    </article>
  )
}

export default Practice2_Screen6
