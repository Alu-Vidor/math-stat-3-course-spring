import { useEffect } from 'react'
import AlertBox from '../components/AlertBox'
import AnovaGroupScatterChart from '../components/AnovaGroupScatterChart'
import ComparisonTable from '../components/ComparisonTable'
import CourseHeader from '../components/CourseHeader'
import IdeaCard from '../components/IdeaCard'
import MathBlock from '../components/MathBlock'
import MathText from '../components/MathText'
import ScreenNavigation from '../components/ScreenNavigation'

const contextNotes = [
  {
    title: 'Суть F-статистики',
    text: 'Критерий Фишера сравнивает систематическую изменчивость между группами со случайной изменчивостью внутри групп. Если межгрупповая компонента существенно больше внутригрупповой, нулевая гипотеза становится неправдоподобной.',
  },
  {
    title: 'Три ключевых предположения',
    text: 'Для классической ANOVA важны независимость наблюдений, нормальность ошибок и однородность дисперсий по группам. Эти предположения нужно обсуждать в отчете отдельно.',
  },
]

const intuitionRows = [
  {
    label: 'Групповые средние',
    values: ['Почти совпадают', 'Хорошо разделены', 'Разделены умеренно'],
  },
  {
    label: 'Разброс внутри групп',
    values: [
      'Сопоставим с расстоянием между средними',
      'Мал по сравнению с расстоянием между средними',
      'Очень велик',
    ],
  },
  {
    label: 'Ожидаемое значение $F$',
    values: ['Близко к 1', 'Существенно больше 1', 'Может остаться умеренным'],
  },
  {
    label: 'Вероятный статистический вывод',
    values: [
      'Оснований отвергать $H_0$ мало',
      'Есть аргумент в пользу различий между средними',
      'Сигнал различий может быть замаскирован шумом',
    ],
  },
]

const assumptionCards = [
  {
    title: 'Независимость наблюдений',
    text: 'Дисперсионный анализ предполагает, что значения внутри и между группами не копируют друг друга по механизму формирования. Нарушение этого условия нельзя исправить одной лишь формулой.',
  },
  {
    title: 'Нормальность ошибок',
    text: 'В центре внимания находится не столько форма каждой выборки по отдельности, сколько поведение остатков модели. При умеренных объемах групп проверка QQ-графиком и тестами на нормальность остается полезной.',
  },
  {
    title: 'Однородность дисперсий',
    text: 'Если дисперсии в группах радикально различаются, то классическая F-статистика может работать нестабильно. В таких случаях нужно либо отдельно это оговаривать, либо переходить к более устойчивым модификациям.',
  },
]

function Practice4_Screen2({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 4 -> ИНТУИЦИЯ"
        title="Межгрупповая и внутригрупповая изменчивость"
        subtitle="Дисперсионный анализ становится понятным, если смотреть на него как на сравнение двух источников разброса."
      />

      <section className="content-block space-y-4">
        <MathText
          as="p"
          text="Пусть наблюдается $k$ групп, а внутри $i$-й группы собраны значения $y_{ij}$. Тогда общая вариация признака может быть разложена на вариацию между групповыми средними и вариацию вокруг этих средних внутри каждой группы."
          className="text-base leading-relaxed text-slate-700 dark:text-slate-200"
        />

        <div className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Общая сумма квадратов</h3>
            <MathBlock formula={String.raw`SS_T = \sum_{i=1}^{k}\sum_{j=1}^{n_i}(y_{ij} - \bar{y})^2`} />
          </article>

          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Межгрупповая часть</h3>
            <MathBlock formula={String.raw`SS_B = \sum_{i=1}^{k} n_i(\bar{y}_i - \bar{y})^2`} />
          </article>

          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Внутригрупповая часть</h3>
            <MathBlock formula={String.raw`SS_W = \sum_{i=1}^{k}\sum_{j=1}^{n_i}(y_{ij} - \bar{y}_i)^2`} />
          </article>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
        <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          От суммы квадратов к критерию Фишера
        </h3>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-700 dark:text-slate-200">
          <MathText as="p" text="После деления сумм квадратов на соответствующие числа степеней свободы получаем средние квадраты $MS_B$ и $MS_W$." />
          <MathBlock formula={String.raw`F = \frac{MS_B}{MS_W}`} />
          <MathText
            as="p"
            text="Если нулевая гипотеза верна и все групповые средние совпадают, то межгрупповая и внутригрупповая изменчивость должны быть одного порядка, а потому отношение $F$ обычно не выглядит аномально большим."
          />
        </div>
      </section>

      <AnovaGroupScatterChart />

      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
        <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          Три типовых статистических сценария
        </h3>
        <div className="mt-4">
          <ComparisonTable
            columns={['Сценарий A', 'Сценарий B', 'Сценарий C']}
            rows={intuitionRows}
          />
        </div>
      </section>

      <IdeaCard title="Интуитивный перевод формулы">
        <MathText
          text="Если групповые центры стоят далеко друг от друга, а облака наблюдений внутри групп относительно компактны, то систематический сигнал фактора начинает доминировать над шумом. Именно этот момент и фиксирует большая $F$-статистика."
        />
      </IdeaCard>

      <section className="grid gap-4 lg:grid-cols-3">
        {assumptionCards.map((card) => (
          <article
            key={card.title}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900"
          >
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">{card.text}</p>
          </article>
        ))}
      </section>

      <AlertBox title="Осторожно с неверной интерпретацией">
        <MathText
          as="p"
          text="Большое значение $F$ не означает, что различия автоматически велики в практическом смысле. Статистическая значимость зависит и от объема выборки, поэтому рядом с таблицей ANOVA полезно сообщать оценки силы эффекта, например $\eta^2$ или частичную $\eta^2$."
        />
      </AlertBox>

      <ScreenNavigation
        prevTo="/practice/4/screen/1"
        nextTo="/practice/4/screen/3"
        nextLabel="Далее: 3. Однофакторный анализ в Python"
      />
    </article>
  )
}

export default Practice4_Screen2
