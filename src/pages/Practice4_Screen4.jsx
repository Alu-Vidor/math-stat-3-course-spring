import { useEffect } from 'react'
import AlertBox from '../components/AlertBox'
import CodeBlock from '../components/CodeBlock'
import ComparisonTable from '../components/ComparisonTable'
import CourseHeader from '../components/CourseHeader'
import DatasetCard from '../components/DatasetCard'
import KeyIdea from '../components/KeyIdea'
import MathBlock from '../components/MathBlock'
import MathText from '../components/MathText'
import ScreenNavigation from '../components/ScreenNavigation'
import TaskBlock from '../components/TaskBlock'

const contextNotes = [
  {
    title: 'Что добавляет второй фактор',
    text: 'Двухфакторная ANOVA позволяет одновременно учитывать два источника систематической изменчивости и проверять, зависит ли действие одного фактора от уровня другого.',
  },
  {
    title: 'Смысл взаимодействия',
    text: 'Наличие взаимодействия означает, что эффект фактора A нельзя описать одной общей разницей по всем уровням фактора B. В этом случае главные эффекты интерпретируются осторожно.',
  },
]

const datasetCode = `import seaborn as sns

tips = sns.load_dataset('tips').dropna(subset=['total_bill', 'day', 'smoker'])

df = tips[['total_bill', 'day', 'smoker']].copy()

cell_summary = (
    df.groupby(['day', 'smoker'])['total_bill']
      .agg(['count', 'mean', 'std'])
      .round(2)
)`

const analysisCode = `import statsmodels.api as sm
import statsmodels.formula.api as smf

model = smf.ols('total_bill ~ C(day) * C(smoker)', data=df).fit()
anova_table = sm.stats.anova_lm(model, typ=2)

residuals = model.resid
fitted = model.fittedvalues

# При необходимости строим график средних по ячейкам:
interaction_means = (
    df.groupby(['day', 'smoker'])['total_bill']
      .mean()
      .unstack()
)`

const workflowItems = [
  {
    title: '1. Формулировка модели',
    content: [
      'Выберите количественный отклик $Y$ и два категориальных фактора $A$ и $B$.',
      'Заранее укажите, интересуют ли вас только главные эффекты или также возможное взаимодействие факторов.',
    ],
  },
  {
    title: '2. Первичная визуализация',
    content: [
      'Постройте таблицу средних по ячейкам и график профилей.',
      'Именно на этом шаге часто видно, пересекаются ли линии и есть ли намек на взаимодействие.',
    ],
  },
  {
    title: '3. Оценка модели',
    content: [
      'Оцените модель вида $Y_{ijk} = \\mu + \\alpha_i + \\beta_j + (\\alpha\\beta)_{ij} + \\varepsilon_{ijk}$.',
      'Получите таблицу ANOVA и отдельно прокомментируйте каждый источник вариации.',
    ],
  },
  {
    title: '4. Интерпретация результата',
    content: [
      'Если взаимодействие значимо, анализируйте простые эффекты, а не только усредненные главные эффекты.',
      'Если взаимодействие незначимо, основной акцент можно перенести на интерпретацию главных эффектов факторов.',
    ],
  },
]

const interactionRows = [
  {
    label: 'График средних',
    values: ['Параллельные профили', 'Непараллельные или пересекающиеся профили'],
  },
  {
    label: 'Интерпретация фактора A',
    values: [
      'Можно обсуждать усредненный эффект по уровням фактора B',
      'Эффект зависит от конкретного уровня фактора B',
    ],
  },
  {
    label: 'Интерпретация фактора B',
    values: [
      'Можно обсуждать усредненный эффект по уровням фактора A',
      'Эффект зависит от конкретного уровня фактора A',
    ],
  },
  {
    label: 'Следующий шаг',
    values: [
      'Сравнение главных эффектов и оценка силы эффекта',
      'Анализ простых эффектов и разбор отдельных ячеек',
    ],
  },
]

function Practice4_Screen4({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 4 -> ANOVA В КОДЕ"
        title="Двухфакторная ANOVA и взаимодействие факторов"
        subtitle="Показываем, как совместно анализировать два фактора и почему взаимодействие меняет язык интерпретации."
      />

      <section className="content-block space-y-6">
        <DatasetCard
          title="Подготовка данных для двухфакторной модели"
          text="Используем датасет `tips`: отклик `total_bill`, факторы `day` и `smoker`. Такая конструкция позволяет обсудить и главные эффекты, и их возможное взаимодействие."
          code={datasetCode}
          codeTitle="Python: таблица ячеечных средних"
        />

        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Математическая форма модели
          </h3>
          <MathBlock formula={String.raw`Y_{ijk} = \mu + \alpha_i + \beta_j + (\alpha\beta)_{ij} + \varepsilon_{ijk}`} />
          <MathText
            as="p"
            text="Здесь $\alpha_i$ описывает вклад первого фактора, $\beta_j$ - вклад второго фактора, а член $(\alpha\beta)_{ij}$ показывает, меняется ли действие одного фактора при переходе между уровнями другого."
            className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-200"
          />
        </section>

        <TaskBlock title="Как читать двухфакторную модель" items={workflowItems} />

        <section className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Код для оценки модели и первичной диагностики
          </h3>
          <CodeBlock
            code={analysisCode}
            language="python"
            title="Python: двухфакторная ANOVA с взаимодействием"
            runnable={false}
          />
        </section>

        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Два принципиально разных случая
          </h3>
          <div className="mt-4">
            <ComparisonTable
              columns={['Взаимодействие несущественно', 'Взаимодействие существенно']}
              rows={interactionRows}
            />
          </div>
        </section>

        <AlertBox title="Почему взаимодействие нельзя игнорировать">
          <p>
            Если взаимодействие значимо, усредненный главный эффект может оказаться вводящим в
            заблуждение. Формально один и тот же фактор может увеличивать отклик при одном уровне
            второго фактора и почти не влиять на него при другом уровне.
          </p>
        </AlertBox>

        <KeyIdea title="Главный вывод по двухфакторной ANOVA">
          Полноценная интерпретация двухфакторной модели начинается не с вопроса «какой фактор
          значим?», а с вопроса «есть ли взаимодействие?». Именно ответ на него определяет,
          допустимо ли обсуждать усредненные эффекты или нужно переходить к более локальному
          анализу по ячейкам.
        </KeyIdea>
      </section>

      <ScreenNavigation
        prevTo="/practice/4/screen/3"
        nextTo="/practice/4/screen/5"
        nextLabel="Далее: 5. Лаб 3.1. Однофакторная модель"
      />
    </article>
  )
}

export default Practice4_Screen4
