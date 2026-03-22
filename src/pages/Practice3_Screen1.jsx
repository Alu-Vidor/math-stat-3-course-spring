import { useEffect } from 'react'
import CourseHeader from '../components/CourseHeader'
import IdeaCard from '../components/IdeaCard'
import RecapBlock from '../components/RecapBlock'
import ScreenNavigation from '../components/ScreenNavigation'

const roadmapItems = [
  'сначала учимся выдвигать осмысленную гипотезу о законе распределения;',
  'затем разбираем, какой критерий согласия за что отвечает и где у него границы;',
  'после этого собираем рабочие шаблоны кода для непрерывных и дискретных признаков;',
  'в финале оформляем лабораторные 2.3, 2.4 и 2.5 без разрыва между теорией и ноутбуком.',
]

const outcomes = [
  'обосновывать, почему признак скорее нормальный, равномерный, логнормальный, биномиальный или пуассоновский;',
  'понимать, когда нужен Пирсон, когда Крамер-Мизес-Смирнов, когда Колмогоров и зачем вообще Jarque-Bera;',
  'писать аккуратный пайплайн проверки гипотез о виде распределения в Python;',
  'переводить формальную статистику в академический вывод для отчета.',
]

const contextNotes = [
  {
    title: 'Почему это не “косметика”',
    text: 'Гипотеза о виде распределения влияет на весь следующий анализ: на выбор критериев, интервальных оценок и даже на то, можно ли вообще интерпретировать среднее и СКО в привычном виде.',
  },
  {
    title: 'Связь с темой 2',
    text: 'По PDF эта практика продолжает раздел 2.3 про гипотезы о виде распределения и критерии согласия, а затем аккуратно мостиком выходит в раздел 2.4 про параметры нормального распределения и доверительные интервалы.',
  },
]

function Practice3_Screen1({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 3 -> ВВЕДЕНИЕ"
        title="Гипотезы о виде распределения: от картинки к строгой проверке"
        subtitle="Почему один и тот же набор данных может требовать совсем разных математических инструментов."
      />

      <section className="content-block">
        <div className="space-y-4 text-base leading-relaxed text-slate-700 dark:text-slate-200">
          <p>
            В Практике 2 мы научились мыслить категориями <strong>нулевой</strong> и{' '}
            <strong>альтернативной</strong> гипотезы. Теперь задача усложняется: мало сказать
            «проверяем гипотезу». Нужно еще понять, <em>какую именно модель мира</em> мы кладем в
            основу проверки.
          </p>
          <p>
            Если признак похож на нормальный, мы получаем один набор методов. Если он
            логнормальный, равномерный или подчиняется закону Пуассона, вся логика отчета
            перестраивается. Поэтому в этой практике мы учимся не только нажимать на кнопку
            `scipy.stats`, но и осмысленно выбирать закон распределения.
          </p>
        </div>
      </section>

      <RecapBlock title="Что мы уже умеем после Практики 2">
        <p>
          Мы умеем формулировать $H_0$ и $H_1$, выбирать уровень значимости и интерпретировать
          `p-value` без магического мышления.
        </p>
        <p>
          Мы уже видели, что визуальная диагностика важна: QQ-plot и гистограммы помогают заметить
          асимметрию, хвосты и выбросы еще до запуска формального теста.
        </p>
        <p>
          Следующий шаг более взрослый: научиться говорить не только «данные не нормальны», а
          «какой закон распределения выглядит правдоподобно и чем это подтверждается».
        </p>
      </RecapBlock>

      <IdeaCard title="Главная мысль практики">
        Хороший статистический анализ начинается не с теста, а с гипотезы о структуре данных.
        Критерии согласия нужны не для угадывания вслепую, а для проверки уже осмысленного
        предположения, которое вы выдвинули на основании графиков, моментов и предметного смысла
        признака.
      </IdeaCard>

      <section className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Логика занятия
          </h3>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            {roadmapItems.map((item, index) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-[1.5rem] border border-indigo-200 bg-indigo-50/70 p-6 shadow-soft dark:border-indigo-900/50 dark:bg-indigo-950/20">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Что должно получиться к концу
          </h3>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            {outcomes.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </section>

      <ScreenNavigation nextTo="/practice/3/screen/2" nextLabel="Далее: 2. Как предложить закон распределения" />
    </article>
  )
}

export default Practice3_Screen1
