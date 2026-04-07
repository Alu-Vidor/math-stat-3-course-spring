import { useEffect } from 'react'
import AlertBox from '../components/AlertBox'
import CodeBlock from '../components/CodeBlock'
import CourseHeader from '../components/CourseHeader'
import DatasetCard from '../components/DatasetCard'
import KeyIdea from '../components/KeyIdea'
import MathBlock from '../components/MathBlock'
import MathText from '../components/MathText'
import ScreenNavigation from '../components/ScreenNavigation'
import TaskBlock from '../components/TaskBlock'

const contextNotes = [
  {
    title: 'Что проверяет модель',
    text: 'В однофакторной ANOVA мы исследуем влияние одного категориального фактора на средний уровень количественного признака.',
  },
  {
    title: 'Что писать после значимого F',
    text: 'Если общая нулевая гипотеза отвергнута, следующий шаг состоит не в повторении вывода, а в локализации различий: пост-хок сравнениях и оценке силы эффекта.',
  },
]

const datasetCode = `import seaborn as sns
import pandas as pd

penguins = sns.load_dataset('penguins').dropna(subset=['species', 'body_mass_g'])

df = penguins[['species', 'body_mass_g']].copy()

group_summary = (
    df.groupby('species')['body_mass_g']
      .agg(['count', 'mean', 'std', 'median'])
      .round(2)
)`

const analysisCode = `import statsmodels.api as sm
import statsmodels.formula.api as smf
from scipy import stats

model = smf.ols('body_mass_g ~ C(species)', data=df).fit()
anova_table = sm.stats.anova_lm(model, typ=2)

levene_stat, levene_p = stats.levene(
    *[group['body_mass_g'].to_numpy() for _, group in df.groupby('species')]
)

ss_factor = anova_table.loc['C(species)', 'sum_sq']
ss_residual = anova_table.loc['Residual', 'sum_sq']
eta_sq = ss_factor / (ss_factor + ss_residual)

# Если H0 отвергается, можно перейти к множественным сравнениям:
# from statsmodels.stats.multicomp import pairwise_tukeyhsd
# tukey = pairwise_tukeyhsd(endog=df['body_mass_g'], groups=df['species'], alpha=0.05)`

const workflowItems = [
  {
    title: '1. Описание данных',
    content: [
      'Выпишите объемы групп, средние, медианы и стандартные отклонения по каждому уровню фактора.',
      'Сопроводите таблицу boxplot или violin plot, чтобы увидеть форму распределения и возможные выбросы.',
    ],
  },
  {
    title: '2. Проверка предположений',
    content: [
      'Обсудите независимость наблюдений на уровне постановки задачи.',
      'Проверьте однородность дисперсий, например критерием Левена.',
      'Оцените нормальность остатков модели через QQ-график или дополнительный тест.',
    ],
  },
  {
    title: '3. Построение ANOVA-модели',
    content: [
      'Оцените модель вида $Y_{ij} = \\mu + \\alpha_i + \\varepsilon_{ij}$.',
      'Получите таблицу ANOVA и зафиксируйте $F$-статистику, число степеней свободы и `p-value`.',
    ],
  },
  {
    title: '4. Интерпретация',
    content: [
      'При отклонении $H_0$ выполните пост-хок сравнения, например методом Тьюки.',
      'Дополнительно вычислите меру силы эффекта $\\eta^2$ и переведите результат в предметный вывод.',
    ],
  },
]

function Practice4_Screen3({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 4 -> ANOVA В КОДЕ"
        title="Однофакторный дисперсионный анализ в Python"
        subtitle="Строим модель влияния вида пингвина на массу тела и оформляем вывод в статистически корректной форме."
      />

      <section className="content-block space-y-6">
        <DatasetCard
          title="Заготовка данных для однофакторной модели"
          text="В качестве количественного отклика берем `body_mass_g`, а в качестве фактора - `species` из датасета `penguins`."
          code={datasetCode}
          codeTitle="Python: подготовка выборки и групповой сводки"
        />

        <section className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Нулевая гипотеза</h3>
            <MathBlock formula={String.raw`H_0:\ \mu_{\text{Adelie}} = \mu_{\text{Chinstrap}} = \mu_{\text{Gentoo}}`} />
          </article>

          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Модель</h3>
            <MathBlock formula={String.raw`Y_{ij} = \mu + \alpha_i + \varepsilon_{ij}, \qquad \varepsilon_{ij} \sim N(0,\sigma^2)`} />
          </article>
        </section>

        <TaskBlock title="Рабочий pipeline для однофакторной ANOVA" items={workflowItems} />

        <section className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Код для оценки модели
          </h3>
          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
            Ниже собрана минимальная вычислительная схема: оценка линейной модели, получение
            таблицы ANOVA, проверка однородности дисперсий и расчет доли объясненной вариации.
          </p>
          <CodeBlock
            code={analysisCode}
            language="python"
            title="Python: однофакторная ANOVA через statsmodels"
            runnable={false}
          />
        </section>

      <AlertBox title="Почему нельзя остановиться на одном p-value">
        <MathText
          as="p"
          text="Даже при значимом результате ANOVA исследователь обязан показать, что предположения модели не игнорировались. Кроме того, сам факт отклонения $H_0$ не сообщает, насколько велик эффект и какие именно группы ответственны за общий результат."
        />
      </AlertBox>

        <KeyIdea title="Хороший академический вывод по однофакторной модели">
          В отчете важно не только сообщить, что фактор `species` статистически значим, но и
          показать структуру результата: насколько велики различия между средними, выполняются ли
          основные предположения модели и какие пары уровней остаются различимыми после
          множественных сравнений.
        </KeyIdea>
      </section>

      <ScreenNavigation
        prevTo="/practice/4/screen/2"
        nextTo="/practice/4/screen/4"
        nextLabel="Далее: 4. Двухфакторный анализ и взаимодействие"
      />
    </article>
  )
}

export default Practice4_Screen3
