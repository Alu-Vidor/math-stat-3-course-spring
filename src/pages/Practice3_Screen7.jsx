import { useEffect } from 'react'
import CourseHeader from '../components/CourseHeader'
import KeyIdea from '../components/KeyIdea'
import ScreenNavigation from '../components/ScreenNavigation'
import TaskBlock from '../components/TaskBlock'

const contextNotes = [
  {
    title: 'Как звучит хороший вывод',
    text: 'Формулировка в отчете должна содержать объект, гипотезу, уровень значимости и решение: отвергается или не отвергается $H_0$. Избегайте фраз “гипотеза доказана” или “распределение точно такое-то”.',
  },
  {
    title: 'Единый стиль записи',
    text: 'Если в одной лабораторной используете обозначения $\\bar{x}$ и $s$, придерживайтесь их до конца. Смешивание разных обозначений делает отчет визуально слабее даже при верных расчетах.',
  },
]

const checklistItems = [
  {
    title: 'Шаг 1. Подготовка данных',
    content: [
      'Определите тип признака: непрерывный или дискретный.',
      'Постройте вариационный ряд, гистограмму или полигон частот.',
      'Найдите базовые выборочные характеристики: среднее, дисперсию, СКО, асимметрию, эксцесс.',
    ],
  },
  {
    title: 'Шаг 2. Выдвижение гипотезы',
    content: [
      'Сформулируйте, какой закон распределения предполагаете и почему.',
      'Покажите, что гипотеза основана не только на графике, но и на свойствах данных.',
    ],
  },
  {
    title: 'Шаг 3. Проверка критериями',
    content: [
      'Запустите критерии, требуемые по условию конкретной лабораторной.',
      'Для Пирсона обязательно проверьте ожидаемые частоты.',
      'Для Колмогорова используйте именно те параметры, которые указаны в задании.',
    ],
  },
  {
    title: 'Шаг 4. Дополнительные оценки',
    content: [
      'Если в задаче есть предположение о нормальности, постройте доверительные интервалы для средней и СКО.',
      'Если рассматривается логнормальность, явно поясните роль логарифмирования.',
    ],
  },
  {
    title: 'Шаг 5. Итоговый вывод',
    content: [
      'Сопоставьте результаты всех критериев, а не только одного.',
      'Напишите содержательный вывод о том, насколько выбранная модель согласуется с данными.',
    ],
  },
]

const reportSections = [
  'исходные данные и краткое описание признака;',
  'обоснование гипотезы о виде распределения;',
  'таблица результатов критериев согласия;',
  'доверительные интервалы, если они требуются по условию;',
  'финальный текстовый вывод на языке статистики и предметной области.',
]

function Practice3_Screen7({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 3 -> ЛАБОРАТОРНАЯ РАБОТА"
        title="Чек-лист для лабораторных 2.3–2.5"
        subtitle="Собираем единый стандарт оформления, чтобы каждая лабораторная читалась как законченный анализ."
      />

      <section className="content-block space-y-6">
        <TaskBlock title="Перед запуском ноутбука проверьте себя по этим пяти шагам:" items={checklistItems} />

        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Минимальная структура отчета
          </h3>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            {reportSections.map((item, index) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <KeyIdea title="Лабораторная — это история, а не набор команд">
          Если читатель видит только код и p-value, работа выглядит сырой. Если он видит путь от
          гипотезы к проверке и затем к выводу, лабораторная читается как законченный статистический
          разбор.
        </KeyIdea>
      </section>

      <ScreenNavigation
        prevTo="/practice/3/screen/6"
        nextTo="/practice/3/screen/8"
        nextLabel="Далее: 8. Лаб 2.3. Задание 1 из ЛР 1"
      />
    </article>
  )
}

export default Practice3_Screen7
