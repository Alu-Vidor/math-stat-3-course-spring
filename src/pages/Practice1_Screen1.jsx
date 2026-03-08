import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CourseHeader from '../components/CourseHeader'
import IdeaCard from '../components/IdeaCard'
import RecapBlock from '../components/RecapBlock'

const contextNotes = [
  {
    title: 'Зачем нам Python и Pandas?',
    text: 'В классических курсах часто используют Excel или ручной счет. Мы используем Python, так как это индустриальный стандарт для аналитики данных и машинного обучения. Pandas позволяет сделать за 2 строчки кода то, на что в таблицах ушли бы часы.',
  },
  {
    title: 'Грязные данные',
    text: 'В учебниках данные всегда причесаны. В реальности (и в наших лабах) вы столкнетесь с пропусками, выбросами и ошибками сбора. Описательная статистика — это ваш первый фильтр адекватности данных.',
  },
]

function Practice1_Screen1({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Связь с лекцией: Раздел 1"
        title="Описательная статистика: От сырых данных к смыслу"
        subtitle="Где мы находимся и куда идем дальше"
      />

      <section className="content-block">
        <div className="space-y-4 text-base leading-relaxed text-slate-700 dark:text-slate-200">
          <p>
            На лекциях мы разобрали методы фиксации данных, шкалы измерений и первичную
            обработку. На практике наша задача — научиться применять эти инструменты к реальным
            данным с помощью Python. Мы научимся превращать нечитаемые таблицы с тысячами строк в
            понятные метрики и графики.
          </p>
        </div>
      </section>

      <RecapBlock title="Напоминание: Выборка vs Генеральная совокупность">
        <p>
          В идеальном мире мы бы знали всё. Если бы мы хотели узнать средний рост всех людей на
          Земле, мы бы измерили каждого (это генеральная совокупность). Но в реальности у нас нет
          на это ни времени, ни денег.
        </p>
        <p>
          Поэтому мы берем небольшую группу людей (выборку), измеряем их и надеемся, что они
          хорошо отражают картину в целом.
        </p>
        <p>
          Главная проблема статистики: выборка почти никогда не бывает идеальной. Описательная
          статистика дает нам инструменты, чтобы понять, с чем именно мы имеем дело, прежде чем
          делать глобальные выводы.
        </p>
      </RecapBlock>

      <IdeaCard title="План на сегодня">
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            Шкалы измерений: разберемся, почему нельзя считать среднее арифметическое для цвета
            глаз.
          </p>
          <p>
            Мини-пример (Интуиция): посмотрим, как выбросы ломают классические метрики на примере
            оценок студентов.
          </p>
          <p>
            Переход в код (Pandas): загрузим датасет и посчитаем точечные и интервальные оценки.
          </p>
          <p>
            Визуализация: построим гистограммы и эмпирическую функцию распределения (ECDF).
          </p>
          <p>
            Лабораторные работы (1.1 - 1.3): ваши самостоятельные задания по непрерывным,
            дискретным и номинативным признакам.
          </p>
        </div>
      </IdeaCard>

      <div className="flex justify-end">
        <Link
          to="/practice/1/screen/2"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 2. Шкалы измерений
        </Link>
      </div>
    </article>
  )
}

export default Practice1_Screen1
