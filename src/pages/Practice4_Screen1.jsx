import { useEffect } from 'react'
import AlertBox from '../components/AlertBox'
import CourseHeader from '../components/CourseHeader'
import IdeaCard from '../components/IdeaCard'
import MathBlock from '../components/MathBlock'
import MathText from '../components/MathText'
import RecapBlock from '../components/RecapBlock'
import ScreenNavigation from '../components/ScreenNavigation'

const roadmapItems = [
  'понять, почему серия независимых попарных t-критериев плохо масштабируется на случай трех и более групп;',
  'разобрать, как дисперсионный анализ раскладывает общую изменчивость на межгрупповую и внутригрупповую части;',
  'научиться строить однофакторные и двухфакторные модели ANOVA в Python;',
  'переводить таблицу ANOVA в аккуратный академический вывод и план последующего анализа.',
]

const outcomes = [
  'формулировать нулевую и альтернативную гипотезы для однофакторного и двухфакторного дисперсионного анализа;',
  'интерпретировать отношение межгрупповой и внутригрупповой изменчивости через F-статистику;',
  'понимать, когда значимый результат ANOVA требует пост-хок анализа, а когда достаточно общего вывода;',
  'оформлять результат в отчете с указанием факторов, взаимодействия и силы эффекта.',
]

const contextNotes = [
  {
    title: 'Связь с предыдущей практикой',
    text: 'Если в Практике 2 мы сравнивали две совокупности, то теперь переходим к ситуации, где уровней фактора три и более, а значит, нужен единый критерий для всей системы средних.',
  },
  {
    title: 'Почему ANOVA появляется естественно',
    text: 'Дисперсионный анализ отвечает на вопрос о равенстве математических ожиданий в нескольких группах и делает это без неконтролируемого накопления вероятности ошибки первого рода.',
  },
]

function Practice4_Screen1({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 4 -> ВВЕДЕНИЕ"
        title="ANOVA: почему задача о нескольких средних не сводится к набору t-критериев"
        subtitle="Переходим от двухвыборочного сравнения к единой модели, которая работает для нескольких уровней фактора и сохраняет статистическую строгость."
      />

      <section className="content-block">
        <div className="space-y-4 text-base leading-relaxed text-slate-700 dark:text-slate-200">
          <p>
            Предположим, что исследователь сравнивает средние значения показателя в трех, четырех
            или пяти группах. Самое наивное решение состоит в том, чтобы последовательно запускать
            попарные t-критерии. Однако такой путь быстро приводит к накоплению вероятности ошибки
            первого рода: чем больше сравнений, тем выше шанс объявить различия значимыми просто
            вследствие случайных флуктуаций выборки.
          </p>
          <p>
            Дисперсионный анализ решает эту проблему концептуально иначе. Вместо множества
            разрозненных проверок он рассматривает единую статистическую модель, в которой общая
            вариация признака раскладывается на компоненту, связанную с различиями между группами,
            и компоненту, отражающую случайный разброс внутри групп.
          </p>
        </div>
      </section>

      <RecapBlock title="Где именно возникает проблема множественных сравнений">
        <MathText
          as="p"
          text="Если выполнить $m$ независимых проверок на одном и том же уровне значимости $\alpha$, то вероятность хотя бы одной ложной тревоги приближенно возрастает до $1 - (1-\alpha)^m$."
        />
        <MathBlock formula={String.raw`P(\text{хотя бы одна ошибка I рода}) = 1 - (1-\alpha)^m`} />
        <MathText
          as="p"
          text="Например, уже при трех попарных сравнениях и $\alpha = 0.05$ совокупный риск ложного отклонения нулевой гипотезы становится заметно выше исходных 5%."
        />
      </RecapBlock>

      <IdeaCard title="Главная идея практики">
        <MathText
          text="ANOVA проверяет не каждую пару групп по отдельности, а единую нулевую гипотезу $H_0: \mu_1 = \mu_2 = \dots = \mu_k$. Благодаря этому мы контролируем общий уровень значимости и получаем математически согласованную основу для дальнейших сравнений."
        />
      </IdeaCard>

      <section className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Логика практики
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
            Что нужно уметь к концу занятия
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

      <AlertBox title="Что ANOVA не делает автоматически">
        <p>
          Значимый результат дисперсионного анализа означает только то, что не все групповые
          средние равны между собой. Из одной лишь таблицы ANOVA нельзя сделать вывод о том, какая
          именно пара групп различается сильнее остальных. Для этого требуются пост-хок процедуры
          или анализ простых эффектов.
        </p>
      </AlertBox>

      <ScreenNavigation
        nextTo="/practice/4/screen/2"
        nextLabel="Далее: 2. Межгрупповой и внутригрупповой разброс"
      />
    </article>
  )
}

export default Practice4_Screen1
