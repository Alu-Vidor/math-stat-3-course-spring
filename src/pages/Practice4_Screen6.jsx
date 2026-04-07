import { useEffect } from 'react'
import CourseHeader from '../components/CourseHeader'
import DatasetCard from '../components/DatasetCard'
import ScreenNavigation from '../components/ScreenNavigation'
import TaskBlock from '../components/TaskBlock'

const contextNotes = [
  {
    title: 'Источник данных',
    text: 'В лабораторной работе 3.2 используем датасет `tips`, где количественный отклик `total_bill` можно анализировать по двум категориальным факторам: `day` и `smoker`.',
  },
  {
    title: 'Ключевой вопрос',
    text: 'Центральный вопрос этой лабораторной работы состоит в том, наблюдается ли взаимодействие между факторами. Именно оно определяет дальнейшую схему интерпретации.',
  },
]

const datasetCode = `import seaborn as sns
import pandas as pd
import statsmodels.api as sm
import statsmodels.formula.api as smf

tips = sns.load_dataset('tips').dropna(subset=['total_bill', 'day', 'smoker'])

df = tips[['total_bill', 'day', 'smoker']].copy()

alpha = 0.05

cell_summary = (
    df.groupby(['day', 'smoker'])['total_bill']
      .agg(['count', 'mean', 'median', 'std'])
      .round(2)
)`

const taskItems = [
  {
    title: '1. Формулировка модели и гипотез',
    content: [
      'Рассмотрите модель с откликом `total_bill` и факторами `day` и `smoker`.',
      'Сформулируйте три нулевые гипотезы: об отсутствии главного эффекта фактора `day`, об отсутствии главного эффекта фактора `smoker` и об отсутствии взаимодействия между факторами.',
    ],
  },
  {
    title: '2. Описательная статистика и визуализация',
    content: [
      'Постройте таблицу ячеечных средних и стандартных отклонений.',
      'Сделайте график профилей средних, чтобы увидеть возможное взаимодействие еще до формальной проверки.',
    ],
  },
  {
    title: '3. Оценка двухфакторной ANOVA',
    content: [
      'Постройте модель `total_bill ~ C(day) * C(smoker)` и получите таблицу ANOVA.',
      'Отдельно интерпретируйте три источника вариации: фактор `day`, фактор `smoker` и их взаимодействие.',
    ],
  },
  {
    title: '4. Диагностика и детализация',
    content: [
      'Проверьте основные предположения модели по остаткам и сопоставимости дисперсий.',
      'Если взаимодействие значимо, разберите простые эффекты или сравните отдельные ячейки.',
      'Если взаимодействие незначимо, сосредоточьтесь на главных эффектах и кратко объясните, почему это допустимо.',
    ],
  },
  {
    title: '5. Финальный вывод',
    content:
      'Оформите итоговый вывод так, чтобы из текста было ясно: есть ли влияние дня недели, есть ли влияние статуса курения и зависит ли один эффект от другого. В академической формулировке избегайте фразы «гипотеза доказана»; используйте язык статистического решения.',
  },
]

function Practice4_Screen6({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 4 -> ЛАБОРАТОРНАЯ РАБОТА"
        title="Лаб 3.2. Двухфакторная модель"
        subtitle="Исследуем влияние факторов `day` и `smoker` на величину `total_bill` и отдельно разбираем возможное взаимодействие."
      />

      <section className="content-block space-y-6">
        <DatasetCard
          title="Стартовый код для Лаб 3.2"
          text="Для двухфакторной лабораторной работы берем датасет `tips`, количественный отклик `total_bill` и два категориальных фактора: `day` и `smoker`."
          code={datasetCode}
          codeTitle="Python: исходные данные для Лаб 3.2"
        />

        <TaskBlock title="Что нужно сделать в Лаб 3.2:" items={taskItems} />
      </section>

      <ScreenNavigation
        prevTo="/practice/4/screen/5"
        nextTo="/practice/5/screen/1"
        nextLabel="Завершить Практику 4 -> Перейти к Практике 5"
        celebratory
      />
    </article>
  )
}

export default Practice4_Screen6
