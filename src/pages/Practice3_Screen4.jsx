import { useEffect } from 'react'
import AlertBox from '../components/AlertBox'
import ComparisonTable from '../components/ComparisonTable'
import CriteriaExplorer from '../components/CriteriaExplorer'
import CourseHeader from '../components/CourseHeader'
import KeyIdea from '../components/KeyIdea'
import ScreenNavigation from '../components/ScreenNavigation'

const contextNotes = [
  {
    title: 'Пирсон не всесилен',
    text: 'Критерий Пирсона удобен и универсален, но требует группировки и достаточно больших ожидаемых частот. В PDF отдельно отмечено, что его результаты желательно дополнять другими критериями.',
  },
  {
    title: 'Колмогоров и известные параметры',
    text: 'В классической формулировке критерий Колмогорова требует полностью известной теоретической функции распределения. Для признака `HouseAge` в лабораторной 2.3 используются параметры $\\mu = 28.6395$ и $\\sigma = 12.5856$.',
  },
]

const criteriaColumns = ['Пирсон χ²', 'Крамер-Мизес-Смирнов ω²', 'Колмогоров', 'Jarque-Bera']

const criteriaRows = [
  {
    label: 'Что сравнивает',
    values: ['Эмпирические и теоретические частоты', 'Эмпирическую и теоретическую F(x)', 'Максимальное расхождение F(x)', 'Асимметрию и эксцесс'],
  },
  {
    label: 'Какие данные удобнее',
    values: ['Сгруппированные', 'Несгруппированные', 'Известная F(x)', 'Проверка нормальности'],
  },
  {
    label: 'Сильная сторона',
    values: ['Работает и для дискретных задач', 'Не требует грубой группировки', 'Простая интерпретация максимального отклонения', 'Быстро ловит ненормальность'],
  },
  {
    label: 'Главное ограничение',
    values: ['Нужны ожидания Eᵢ ≥ 5', 'Обычно применяют к непрерывным законам', 'Нужны известные параметры', 'Не проверяет равномерность или Пуассона напрямую'],
  },
]

const whySeveralTests = [
  {
    title: 'Один тест видит одно',
    text: 'Пирсон чувствителен к группировке, Колмогоров к максимальному локальному отклонению, а Jarque-Bera вообще смотрит только на два момента формы.',
  },
  {
    title: 'Разные тесты страхуют друг друга',
    text: 'Если несколько критериев дают совместимую картину, вывод становится устойчивее и академически убедительнее.',
  },
  {
    title: 'Задание требует не магии, а аргументации',
    text: 'В отчете важно не просто показать четыре p-value, а объяснить, почему они вместе поддерживают или ослабляют выбранную гипотезу.',
  },
]

function Practice3_Screen4({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 3 -> КРИТЕРИИ И КОД"
        title="Какие критерии согласия за что отвечают"
        subtitle="Смотрим не только на список названий, но и на роль каждого критерия в реальной задаче."
      />

      <section className="content-block space-y-6">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
          По теме 2 критерии делятся на <strong>универсальные</strong>, <strong>частные</strong> и{' '}
          <strong>точечные</strong>. Для лабораторных это переводится очень просто: Пирсон и
          Крамер-Мизес-Смирнов дают общий взгляд на согласие модели с данными, Колмогоров нужен
          там, где параметры заданы заранее, а Jarque-Bera помогает отдельно проверить нормальность.
        </p>

        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Карта критериев
          </h3>
          <div className="mt-4">
            <ComparisonTable columns={criteriaColumns} rows={criteriaRows} />
          </div>
        </section>

        <CriteriaExplorer />

        <section className="grid gap-4 lg:grid-cols-3">
          {whySeveralTests.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-900/70"
            >
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                {item.text}
              </p>
            </article>
          ))}
        </section>

        <AlertBox title="Методическая тонкость по Jarque-Bera">
          <p>
            Jarque-Bera адресован именно <strong>нормальному распределению</strong>. Если вы
            проверяете гипотезу о равномерности или логнормальности, этот тест не заменяет Пирсона,
            омега-квадрат или Колмогорова. Он играет роль дополнительного диагностического сигнала
            против нормальности.
          </p>
        </AlertBox>

        <KeyIdea title="Хороший отчет не сводится к таблице p-value">
          В сильном решении вы связываете три слоя: визуальную аргументацию, свойства выбранного
          закона и результаты нескольких критериев. Именно вместе они дают убедительный вывод о виде
          распределения.
        </KeyIdea>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-900/70">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Что показывает Пирсон
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Он сопоставляет наблюдаемые и ожидаемые частоты по корзинам. Это делает его очень
              понятным для отчёта, но одновременно требует аккуратной группировки данных.
            </p>
          </article>
          <article className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-700 dark:bg-slate-900/70">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Что показывает Колмогоров
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Он фиксирует наибольший разрыв между эмпирической и теоретической функциями
              распределения, поэтому особенно удобен для геометрической интерпретации на графике.
            </p>
          </article>
        </section>
      </section>

      <ScreenNavigation
        prevTo="/practice/3/screen/3"
        nextTo="/practice/3/screen/5"
        nextLabel="Далее: 5. Непрерывные признаки в Python"
      />
    </article>
  )
}

export default Practice3_Screen4
