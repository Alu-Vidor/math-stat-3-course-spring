import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight, Coins, Percent } from 'lucide-react'
import CourseHeader from '../components/CourseHeader'
import KeyIdea from '../components/KeyIdea'
import AlertBox from '../components/AlertBox'
import RuleCard from '../components/RuleCard'
import MathBlock from '../components/MathBlock'

const contextNotes = [
  {
    title: '❌ Самая частая ошибка',
    text: 'Нельзя интерпретировать p-value как вероятность истинности H_0. P-value описывает вероятность получить наблюдаемые данные при условии, что H_0 верна.',
  },
  {
    title: 'Почему именно 0.05?',
    text: 'Порог α = 0.05 — это соглашение, а не закон природы. В задачах с дорогой ошибкой I рода порог делают строже: 0.01, 0.001 и ниже.',
  },
]

const decisionCards = [
  {
    tone: 'error',
    title: 'p ≤ 0.05',
    text: 'Данные слишком маловероятны при H_0. Наше удивление пробило порог принятия решения.',
    verdict: 'Отвергаем H_0 — эффект статистически значим',
  },
  {
    tone: 'success',
    title: 'p > 0.05',
    text: 'Такие данные вполне могли получиться случайно. Улик для перелома статуса-кво недостаточно.',
    verdict: 'Не отвергаем H_0 — доказательств эффекта не хватило',
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
        title="P-value: переводим на человеческий"
        subtitle="Как измерить степень удивления от полученных данных."
      />

      <section className="content-block space-y-6">
        <section className="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-amber-50 p-6 shadow-soft dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/20">
          <div className="flex items-start gap-3">
            <Coins size={22} className="mt-1 shrink-0 text-amber-600 dark:text-amber-300" />
            <div className="space-y-4 text-base leading-relaxed text-slate-700 dark:text-slate-200">
              <p>
                Представьте, что друг дает вам монетку и уверяет, что она честная. Это и есть
                нулевая гипотеза <code>H_0</code>. Один орел, два орла, даже три орла подряд нас не
                поражают.
              </p>
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
            Это и есть логика p-value: мы оцениваем, насколько редким был бы наш результат, если бы
            статус-кво был полностью верен.
          </p>
        </AlertBox>

        <KeyIdea title="Что такое p-value?">
          <strong>P-value</strong> — это вероятность получить такие же или еще более экстремальные
          данные при условии, что <strong>H_0 верна</strong>. Чем меньше это число, тем менее
          правдоподобно объяснение «ничего не произошло, это просто шум».
        </KeyIdea>

        <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[1.5rem] border border-indigo-200 bg-indigo-50/70 p-6 dark:border-indigo-900/50 dark:bg-indigo-950/20">
            <div className="flex items-start gap-3">
              <Percent size={20} className="mt-0.5 shrink-0 text-indigo-600 dark:text-indigo-300" />
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-indigo-900 dark:text-indigo-200">
                  P-value как площадь хвоста
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">
                  На графике p-value — это площадь хвоста распределения, которую отсекает наша
                  наблюдаемая статистика. Чем дальше статистика от центра распределения при H_0,
                  тем меньше хвост и тем сильнее наше математическое удивление.
                </p>
                <MathBlock formula="p\text{-value}=P(|T|\ge |t_{obs}|\mid H_0)" />
              </div>
            </div>
          </article>

          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              Решение в три строки
            </h3>
            <ol className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              <li><strong>1.</strong> Вычислите тестовую статистику.</li>
              <li><strong>2.</strong> Найдите p-value для этой статистики.</li>
              <li><strong>3.</strong> Сравните p-value с заранее выбранным α.</li>
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
            Мини-интерактив: что НЕ говорит p-value?
          </summary>
          <div className="mt-4 grid gap-3 lg:grid-cols-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Не говорит</p>
              <p className="mt-1">«Вероятность истинности H_0 равна 3%» — это неверная интерпретация.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Говорит</p>
              <p className="mt-1">«Если H_0 верна, то увидеть такие данные случайно было бы очень трудно».</p>
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
