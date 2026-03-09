import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight, Coins, Percent } from 'lucide-react'
import CourseHeader from '../components/CourseHeader'
import KeyIdea from '../components/KeyIdea'
import AlertBox from '../components/AlertBox'
import RuleCard from '../components/RuleCard'
import MathBlock from '../components/MathBlock'
import MathText from '../components/MathText'
import PlotViewer from '../components/PlotViewer'
import PValueTailChart from '../components/PValueTailChart'

const contextNotes = [
  {
    title: '❌ Самая частая ошибка',
    text: 'Нельзя интерпретировать $p$-value как вероятность истинности $H_0$. $p$-value описывает вероятность получить наблюдаемые данные при условии, что $H_0$ верна.',
  },
  {
    title: 'Почему именно $0.05$?',
    text: 'Порог значимости $\\alpha = 0.05$ — это соглашение, а не закон природы. В задачах с дорогой ошибкой I рода порог делают строже: $0.01$, $0.001$ и ниже.',
  },
]

const decisionCards = [
  {
    tone: 'error',
    title: '$p \\le 0.05$',
    text: 'Данные слишком маловероятны при $H_0$. Значит, наблюдение плохо согласуется именно с той нулевой гипотезой, которую мы задали.',
    verdict: 'Отвергаем $H_0$',
  },
  {
    tone: 'success',
    title: '$p > 0.05$',
    text: 'Такие данные еще можно объяснить случайностью. Улик против $H_0$ пока недостаточно.',
    verdict: 'Не отвергаем $H_0$',
  },
]

function Practice2_Screen4({ setContextNotes }) {
  useEffect(() => {
    setContextNotes(contextNotes)
  }, [setContextNotes])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 2 -> ИНТУИЦИЯ"
        title="$p$-value: переводим на человеческий"
        subtitle="Как измерить степень удивления от полученных данных."
      />

      <section className="content-block space-y-6">
        <section className="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-amber-50 p-6 shadow-soft dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/20">
          <div className="flex items-start gap-3">
            <Coins size={22} className="mt-1 shrink-0 text-amber-600 dark:text-amber-300" />
            <div className="space-y-4 text-base leading-relaxed text-slate-700 dark:text-slate-200">
              <MathText
                as="p"
                text="Представьте, что друг дает вам монетку и уверяет, что она честная. Это и есть нулевая гипотеза $H_0$. Один орел, два орла, даже три орла подряд нас не поражают."
              />
              <p>
                Но если при 10 бросках подряд <strong>все 10 раз выпал орел</strong>, интуиция
                резко меняется: случайность еще возможна, но выглядит уже крайне неправдоподобно.
              </p>
            </div>
          </div>
        </section>

        <AlertBox title="Удивление">
          <p>
            Для честной монетки вероятность десяти орлов подряд равна
            <code> (1/2)^10 = 1/1024 ≈ 0.00098</code>, то есть меньше одной десятой процента.
          </p>
          <MathBlock formula="P(10\ \text{орлов подряд} \mid H_0)=\left(\frac{1}{2}\right)^{10}\approx 0.00098" />
          <p>
            Это и есть логика <strong>p-value</strong>: мы оцениваем, насколько редким был бы наш
            результат, если бы статус-кво был полностью верен.
          </p>
        </AlertBox>

        <KeyIdea title="Что такое $p$-value?">
          {'$p$-value — это вероятность получить такие же или еще более экстремальные данные при условии, что $H_0$ верна. Чем меньше это число, тем менее правдоподобно объяснение «ничего не произошло, это просто шум». '}
        </KeyIdea>

        <AlertBox title="Важная оговорка">
          <MathText
            as="p"
            text="Правило $p \le \alpha$ никогда не означает автоматически «эффект есть». Оно означает только одно: мы отвергаем именно ту нулевую гипотезу, которую сформулировали."
          />
          <MathText
            as="p"
            text="В этом курсе по умолчанию используется стандартная схема: $H_0$ означает отсутствие эффекта. Поэтому маленькое $p$-value обычно интерпретируется как аргумент против статуса-кво."
          />
        </AlertBox>

        <PlotViewer
          title="Хвост распределения и p-value"
          caption="Оранжевая область — это вероятность получить наблюдение не менее экстремальное, если H₀ верна. Чем она меньше, тем сильнее аргумент против H₀."
        >
          <PValueTailChart />
        </PlotViewer>

        <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[1.5rem] border border-indigo-200 bg-indigo-50/70 p-6 dark:border-indigo-900/50 dark:bg-indigo-950/20">
            <div className="flex items-start gap-3">
              <Percent size={20} className="mt-0.5 shrink-0 text-indigo-600 dark:text-indigo-300" />
              <div>
                <MathText
                  as="h3"
                  text="$p$-value как площадь хвоста"
                  className="text-lg font-semibold tracking-tight text-indigo-900 dark:text-indigo-200"
                />
                <MathText
                  as="p"
                  text="На графике $p$-value — это площадь хвоста распределения, которую отсекает наша наблюдаемая статистика. Чем дальше статистика от центра распределения при $H_0$, тем меньше хвост и тем сильнее наше математическое удивление."
                  className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200"
                />
                <MathBlock formula="p\text{-value}=P(|T|\ge |t_{obs}|\mid H_0)" />
                <MathText
                  as="p"
                  text="Если изменить формулировку $H_0$, изменится и смысл вывода. $p$-value всегда судит данные относительно выбранной нулевой гипотезы, а не относительно абстрактного «наличия эффекта»."
                  className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
                />
              </div>
            </div>
          </article>

          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              Решение в три строки
            </h3>
            <ol className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              <li><strong>1.</strong> Вычислите тестовую статистику.</li>
              <li>
                <strong>2.</strong>{' '}
                <MathText text="Найдите $p$-value для этой статистики." />
              </li>
              <li>
                <strong>3.</strong>{' '}
                <MathText text="Сравните $p$-value с заранее выбранным $\alpha$ и сделайте вывод именно про $H_0$." />
              </li>
            </ol>
          </article>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          {decisionCards.map((card) => (
            <RuleCard key={card.title} {...card} />
          ))}
        </section>

        <details className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft open:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:open:bg-slate-900/90">
          <summary className="cursor-pointer text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 dark:text-white">
            <MathText text="Мини-интерактив: что НЕ говорит $p$-value?" />
          </summary>
          <div className="mt-4 grid gap-3 lg:grid-cols-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Не говорит</p>
              <MathText as="p" text="«Вероятность истинности $H_0$ равна $3\%$» или «эффект точно есть» — это неверные интерпретации." className="mt-1" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Говорит</p>
              <MathText as="p" text="«Если $H_0$ верна, то увидеть такие данные случайно было бы очень трудно»." className="mt-1" />
            </div>
          </div>
        </details>
      </section>

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/practice/2/screen/3"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Назад
        </Link>

        <Link
          to="/practice/2/screen/5"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Далее: 5. QQ-plot: смотрим на нормальность
          <ArrowRight size={16} />
        </Link>
      </nav>
    </article>
  )
}

export default Practice2_Screen4
