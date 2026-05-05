import { useEffect, useRef } from 'react'
import AlertBox from '../components/AlertBox'
import CodeBlock from '../components/CodeBlock'
import CourseHeader from '../components/CourseHeader'
import {
  ContingencyMosaicVisual,
  CorrelationMatrixVisual,
  LinearScatterVisual,
  RankCorrelationVisual,
  SignificanceVisual,
} from '../components/CorrelationVisuals'
import IdeaCard from '../components/IdeaCard'
import MathBlock from '../components/MathBlock'
import MathText from '../components/MathText'
import RecapBlock from '../components/RecapBlock'
import ScreenNavigation from '../components/ScreenNavigation'
import TaskBlock from '../components/TaskBlock'

const baseNotes = [
  {
    title: 'Статистическая осторожность',
    text: 'Корреляция описывает совместную изменчивость признаков. Она не доказывает причинно-следственную связь без дополнительного дизайна исследования.',
  },
  {
    title: 'Единица анализа',
    text: 'Все коэффициенты должны считаться по сопоставимым парам наблюдений: одна строка данных соответствует одному объекту, измеренному по двум или более признакам.',
  },
]

function usePractice5Notes(setContextNotes, notes = baseNotes) {
  const notesRef = useRef(notes)

  useEffect(() => {
    setContextNotes(notesRef.current)
  }, [setContextNotes])
}

function TextBlock({ children }) {
  return (
    <section className="content-block">
      <div className="space-y-4 text-base leading-relaxed text-slate-700 dark:text-slate-200">{children}</div>
    </section>
  )
}

function MethodsCard({ title, items }) {
  return (
    <section className="rounded-[1.75rem] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 shadow-soft dark:border-emerald-900/50 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20">
      <MathText as="h3" text={title} className="text-lg font-semibold text-slate-900 dark:text-white" />
      <ul className="mt-4 space-y-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
            <MathText text={item} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function TheoryCards({ title = 'Теоретические акценты', items }) {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.title}
          className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900"
        >
          <MathText as="h3" text={item.title} className="text-base font-semibold text-slate-900 dark:text-white" />
          <MathText as="p" text={item.text} className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200" />
        </article>
      ))}
      <span className="sr-only">{title}</span>
    </section>
  )
}

function FormulaGrid({ title = 'Математическая запись', formulas }) {
  return (
    <section className="rounded-[1.75rem] border border-indigo-200 bg-indigo-50/60 p-6 shadow-soft dark:border-indigo-900/50 dark:bg-indigo-950/20">
      <MathText as="h3" text={title} className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white" />
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {formulas.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-white/80 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/80"
          >
            <MathText as="h4" text={item.title} className="text-base font-semibold text-slate-900 dark:text-white" />
            <MathBlock formula={item.formula} />
            <MathText as="p" text={item.text} className="text-sm leading-relaxed text-slate-700 dark:text-slate-200" />
          </article>
        ))}
      </div>
    </section>
  )
}

function Navigation({ screen }) {
  const nextLabels = {
    1: 'Далее: 2. Линейная связь: Пирсон',
    2: 'Далее: 3. Ранговая связь: Спирмен и Кендалл',
    3: 'Далее: 4. Качественные признаки: контингенция',
    4: 'Далее: 5. Тепловые карты матриц',
    5: 'Далее: 6. Значимость коэффициентов',
    6: 'Далее: 7. Лаб 4.1. Числовые признаки',
    7: 'Далее: 8. Лаб 4.2. Ранговая корреляция',
    8: 'Далее: 9. Лаб 4.3. Контингенция',
  }
  const prev = screen > 1 ? `/practice/5/screen/${screen - 1}` : null
  const next = screen < 9 ? `/practice/5/screen/${screen + 1}` : null

  return (
    <ScreenNavigation
      prevTo={prev}
      prevLabel="Назад"
      nextTo={next}
      nextLabel={next ? nextLabels[screen] : undefined}
    />
  )
}

const lab41Tasks = [
  {
    title: '1. Подготовка данных и постановка вопроса',
    content: [
      'Выберите две количественные переменные и обоснуйте, почему их совместный анализ содержательно оправдан.',
      'Удалите пропуски только по анализируемой паре признаков и укажите итоговый объем выборки $n$.',
      'Сформулируйте нулевую гипотезу $H_0: \\rho = 0$ и альтернативную гипотезу о наличии связи.',
    ],
  },
  {
    title: '2. Графический анализ',
    content: [
      'Постройте диаграмму рассеяния и визуально оцените форму связи: линейная, монотонная нелинейная, облако без выраженной структуры.',
      'Отдельно отметьте выбросы или подгруппы, если они заметно влияют на форму облака наблюдений.',
    ],
  },
  {
    title: '3. Расчет коэффициентов',
    content: [
      'Вычислите коэффициенты Пирсона и Спирмена с соответствующими p-value.',
      'Сравните результаты: совпадают ли знак, порядок величины и статистическое решение.',
    ],
  },
  {
    title: '4. Академический вывод',
    content:
      'Сформулируйте вывод полным текстом: укажите метод, значение коэффициента, p-value, уровень значимости, направление связи и ограничение причинной интерпретации.',
  },
]

const lab42Tasks = [
  {
    title: '1. Обоснование рангового подхода',
    content: [
      'Покажите, что хотя бы один из признаков имеет порядковую шкалу или что связь между числовыми признаками является монотонной, но не линейной.',
      'Укажите, как обрабатывались совпадающие ранги и пропущенные наблюдения.',
    ],
  },
  {
    title: '2. Расчет двух ранговых мер',
    content: [
      'Рассчитайте коэффициенты Спирмена и Кендалла.',
      'Объясните возможное различие между ними через логику рангов и согласованных пар.',
    ],
  },
  {
    title: '3. Интерпретация результата',
    content: [
      'Оцените направление и силу монотонной связи.',
      'Сделайте статистическое решение на уровне значимости 0.05.',
      'Не используйте язык линейной зависимости, если анализировалась только монотонность.',
    ],
  },
]

const lab43Tasks = [
  {
    title: '1. Таблица сопряженности',
    content: [
      'Постройте таблицу абсолютных частот для двух качественных признаков.',
      'Добавьте строковые или столбцовые доли, чтобы интерпретация была основана не только на абсолютных числах.',
    ],
  },
  {
    title: '2. Проверка независимости',
    content: [
      'Сформулируйте гипотезу независимости признаков.',
      'Проверьте критерий хи-квадрат Пирсона и укажите число степеней свободы.',
      'Проверьте, нет ли слишком малых ожидаемых частот; если они есть, обсудите ограничение вывода.',
    ],
  },
  {
    title: '3. Содержательный вывод',
    content:
      'Опишите, какие категории дают основной вклад в отличие наблюдаемых частот от ожидаемых. Не ограничивайтесь фразой о том, что p-value меньше или больше 0.05.',
  },
]

const lab41Methods = [
  'Для подготовки данных используйте `pandas`: выбор двух количественных столбцов, удаление пропусков по анализируемой паре, проверка объема выборки.',
  'Для визуализации используйте диаграмму рассеяния и, при необходимости, линию тренда: `seaborn.scatterplot`, `seaborn.regplot` или аналогичные средства.',
  'Для расчетов используйте `scipy.stats.pearsonr` и `scipy.stats.spearmanr`; коэффициенты и p-value должны быть приведены в отчете.',
  'Для проверки устойчивости вывода сравните результат Пирсона с ранговой мерой и отдельно прокомментируйте влияние выбросов.',
]

const lab42Methods = [
  'Для ранжирования и подготовки данных используйте `pandas`; явно укажите, какие признаки рассматриваются как порядковые.',
  'Для расчетов используйте `scipy.stats.spearmanr` и `scipy.stats.kendalltau`.',
  'Для визуализации используйте график рангов или диаграмму рассеяния с монотонным трендом; график должен подтверждать выбор рангового метода.',
  'Для интерпретации различайте монотонную и линейную связь: в выводе не должно быть утверждений о линейности без отдельного основания.',
]

const lab43Methods = [
  'Для таблицы сопряженности используйте `pandas.crosstab`; в отчете должны быть абсолютные частоты и доли по строкам или столбцам.',
  'Для проверки независимости используйте `scipy.stats.chi2_contingency`.',
  'Для визуализации используйте столбчатую диаграмму долей, stacked bar chart или mosaic plot; график должен показывать структуру категорий.',
  'Для контроля применимости критерия проверьте ожидаемые частоты и отдельно укажите ограничения, если часть ячеек имеет малые ожидаемые значения.',
]

const lab41SetupCode = `import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from scipy import stats

penguins = sns.load_dataset("penguins")

df = (
    penguins[
        ["bill_length_mm", "bill_depth_mm", "flipper_length_mm", "body_mass_g"]
    ]
    .dropna()
    .copy()
)

numeric_columns = df.columns.tolist()`

const lab42SetupCode = `import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from scipy import stats

mpg = sns.load_dataset("mpg")

df = (
    mpg[
        ["mpg", "horsepower", "weight", "acceleration", "model_year"]
    ]
    .dropna()
    .copy()
)

rank_candidate_columns = df.columns.tolist()`

const lab43SetupCode = `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from scipy import stats

tips = sns.load_dataset("tips")

df = (
    tips[
        ["sex", "smoker", "day", "time", "size"]
    ]
    .dropna()
    .copy()
)

categorical_columns = ["sex", "smoker", "day", "time"]`

const introTheory = [
  {
    title: 'Связь как совместная изменчивость',
    text: 'Корреляционный анализ изучает не уровень признака сам по себе, а то, насколько отклонения двух признаков от своих центров согласованы по направлению и величине.',
  },
  {
    title: 'Шкала определяет метод',
    text: 'Для количественных признаков применяют Пирсона или ранговые меры; для номинальных признаков анализируют таблицы сопряженности, а не числовые коды категорий.',
  },
  {
    title: 'График обязателен',
    text: 'Один и тот же коэффициент может соответствовать разным структурам данных: линейной связи, нелинейной монотонности, подгруппам или влиянию выбросов.',
  },
]

const pearsonTheory = [
  {
    title: 'Ковариационная природа',
    text: 'Пирсон нормирует ковариацию на произведение стандартных отклонений, поэтому коэффициент не зависит от единиц измерения исходных признаков.',
  },
  {
    title: 'Линейность',
    text: 'Коэффициент Пирсона отвечает именно на вопрос о линейной согласованности. Нелинейная зависимость может дать малое значение $r$.',
  },
  {
    title: 'Чувствительность',
    text: 'Выброс способен резко изменить средние, стандартные отклонения и ковариацию, поэтому перед интерпретацией требуется диаграмма рассеяния.',
  },
]

const rankTheory = [
  {
    title: 'Переход к порядку',
    text: 'Спирмен заменяет исходные значения рангами. Тем самым метод сохраняет информацию о порядке, но ослабляет зависимость от формы шкалы.',
  },
  {
    title: 'Согласованные пары',
    text: 'Кендалл сравнивает пары наблюдений и оценивает баланс согласованных и несогласованных пар; поэтому его интерпретация особенно прозрачна для малых выборок.',
  },
  {
    title: 'Монотонность',
    text: 'Ранговые коэффициенты уместны, когда с ростом одного признака другой преимущественно растет или убывает, даже если темп изменения неодинаков.',
  },
]

const contingencyTheory = [
  {
    title: 'Независимость',
    text: 'При независимости распределение одного качественного признака должно оставаться тем же внутри каждого уровня другого признака.',
  },
  {
    title: 'Ожидаемые частоты',
    text: 'Критерий хи-квадрат сравнивает наблюдаемые частоты $O_{ij}$ с ожидаемыми $E_{ij}$, рассчитанными из маргинальных итогов.',
  },
  {
    title: 'Ограничения',
    text: 'Если ожидаемые частоты слишком малы, асимптотическое приближение критерия становится менее надежным, и вывод нужно формулировать осторожнее.',
  },
]

const matrixTheory = [
  {
    title: 'Разведочный инструмент',
    text: 'Матрица корреляций является средством первичного обзора, а не самостоятельным доказательством статистической связи.',
  },
  {
    title: 'Множественные проверки',
    text: 'При большом числе пар растет риск случайно значимых результатов, поэтому важные связи нужно подтверждать отдельной проверкой и содержательным смыслом.',
  },
  {
    title: 'Мультиколлинеарность',
    text: 'Высокие корреляции между предикторами могут быть полезны для описания структуры данных, но опасны для последующих регрессионных моделей.',
  },
]

const significanceTheory = [
  {
    title: 'Гипотеза о генеральной связи',
    text: 'Проверка значимости переносит вопрос с выборочного коэффициента на параметр генеральной совокупности: совместимы ли данные с $\\rho=0$.',
  },
  {
    title: 'Роль объема выборки',
    text: 'Один и тот же коэффициент при разных $n$ дает разные p-value, потому что неопределенность оценки уменьшается с ростом выборки.',
  },
  {
    title: 'Интервал важнее точки',
    text: 'Доверительный интервал для корреляции показывает диапазон правдоподобных значений параметра и помогает не переоценивать точечную оценку.',
  },
]

const introFormulas = [
  {
    title: 'Ковариация как мера совместного отклонения',
    formula: String.raw`\operatorname{Cov}(X,Y)=\mathbb{E}\big[(X-\mathbb{E}X)(Y-\mathbb{E}Y)\big]`,
    text: 'Ковариация положительна, если признаки чаще отклоняются от своих средних в одну сторону, и отрицательна, если отклонения разнонаправлены.',
  },
  {
    title: 'Генеральная корреляция',
    formula: String.raw`\rho_{XY}=\frac{\operatorname{Cov}(X,Y)}{\sigma_X\sigma_Y}, \qquad -1\le \rho_{XY}\le 1`,
    text: 'Корреляция является безразмерной нормировкой ковариации, поэтому допускает сравнение силы связи в разных шкалах.',
  },
]

const pearsonFormulas = [
  {
    title: 'Выборочная ковариация',
    formula: String.raw`s_{xy}=\frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})(y_i-\bar{y})`,
    text: 'Эта величина сохраняет знак совместного изменения, но зависит от единиц измерения обоих признаков.',
  },
  {
    title: 'Коэффициент Пирсона через стандартизацию',
    formula: String.raw`r=\frac{1}{n-1}\sum_{i=1}^{n}\left(\frac{x_i-\bar{x}}{s_x}\right)\left(\frac{y_i-\bar{y}}{s_y}\right)`,
    text: 'Формула показывает, что Пирсон усредняет произведения стандартизованных отклонений.',
  },
  {
    title: 'Доля объясненной линейной изменчивости',
    formula: String.raw`R^2=r^2`,
    text: 'В простой линейной регрессии квадрат корреляции равен доле вариации отклика, объясненной линейной моделью с одним предиктором.',
  },
]

const rankFormulas = [
  {
    title: 'Спирмен как Пирсон по рангам',
    formula: String.raw`\rho_s=\operatorname{cor}\big(R(X),R(Y)\big)`,
    text: 'На практике это означает замену исходных значений их рангами с последующим расчетом обычной корреляции Пирсона.',
  },
  {
    title: 'Спирмен без совпадающих рангов',
    formula: String.raw`\rho_s=1-\frac{6\sum_{i=1}^{n}d_i^2}{n(n^2-1)}`,
    text: 'Здесь $d_i$ — разность рангов одного и того же объекта по двум признакам.',
  },
  {
    title: 'Кендалл через согласованные пары',
    formula: String.raw`\tau=\frac{C-D}{\binom{n}{2}}`,
    text: '$C$ — число согласованных пар, $D$ — число несогласованных пар. При совпадающих рангах используют поправочные версии tau-b.',
  },
]

const contingencyFormulas = [
  {
    title: 'Ожидаемые частоты при независимости',
    formula: String.raw`E_{ij}=\frac{n_{i\cdot}n_{\cdot j}}{n}`,
    text: 'Если признаки независимы, ожидаемая частота в ячейке определяется только строковым и столбцовым итогами.',
  },
  {
    title: 'Статистика критерия хи-квадрат',
    formula: String.raw`\chi^2=\sum_{i=1}^{r}\sum_{j=1}^{c}\frac{(O_{ij}-E_{ij})^2}{E_{ij}}`,
    text: 'Большие отклонения наблюдаемых частот от ожидаемых увеличивают статистику критерия.',
  },
  {
    title: 'Число степеней свободы',
    formula: String.raw`\nu=(r-1)(c-1)`,
    text: 'Количество степеней свободы определяется числом строк и столбцов таблицы сопряженности.',
  },
  {
    title: 'Мера силы связи Cramer V',
    formula: String.raw`V=\sqrt{\frac{\chi^2}{n\min(r-1,c-1)}}`,
    text: 'Cramer V дополняет p-value и показывает выраженность связи между качественными признаками.',
  },
]

const matrixFormulas = [
  {
    title: 'Матрица корреляций',
    formula: String.raw`R=(r_{jk})_{p\times p},\qquad r_{jj}=1,\qquad r_{jk}=r_{kj}`,
    text: 'Корреляционная матрица симметрична, а на главной диагонали всегда стоят единицы.',
  },
  {
    title: 'Переход от ковариаций к корреляциям',
    formula: String.raw`R=D^{-1/2}\Sigma D^{-1/2}`,
    text: '$\\Sigma$ — ковариационная матрица, $D$ — диагональная матрица дисперсий. Нормировка удаляет масштаб признаков.',
  },
  {
    title: 'Попарное число проверок',
    formula: String.raw`m=\frac{p(p-1)}{2}`,
    text: 'Для $p$ переменных в матрице есть $m$ различных попарных корреляций, поэтому проблема множественных сравнений возникает естественно.',
  },
]

const significanceFormulas = [
  {
    title: 't-статистика для Пирсона',
    formula: String.raw`t=r\sqrt{\frac{n-2}{1-r^2}},\qquad t\sim t_{n-2}\ \text{при}\ H_0:\rho=0`,
    text: 'Чем больше $|r|$ и объем выборки, тем дальше статистика уходит от центра распределения при нулевой гипотезе.',
  },
  {
    title: 'Преобразование Фишера',
    formula: String.raw`z=\operatorname{arctanh}(r)=\frac{1}{2}\ln\frac{1+r}{1-r},\qquad SE_z=\frac{1}{\sqrt{n-3}}`,
    text: 'Преобразование Фишера используется для построения приближенных доверительных интервалов для генеральной корреляции.',
  },
  {
    title: 'Обратное преобразование интервала',
    formula: String.raw`\rho_L=\tanh(z_L),\qquad \rho_U=\tanh(z_U)`,
    text: 'Границы, полученные на z-шкале, возвращают к шкале корреляции через гиперболический тангенс.',
  },
  {
    title: 'Поправка Бонферрони',
    formula: String.raw`\alpha^\ast=\frac{\alpha}{m}`,
    text: 'При множественной проверке корреляций можно снижать порог значимости, чтобы контролировать совокупный риск ложных находок.',
  },
]

const lab41Formulas = [
  {
    title: 'Минимальный набор оценок',
    formula: String.raw`\bar{x},\ \bar{y},\ s_x,\ s_y,\ s_{xy},\ r`,
    text: 'В отчете должны быть указаны не только итоговые коэффициенты, но и базовые описательные характеристики анализируемой пары.',
  },
  {
    title: 'Проверка линейной корреляции',
    formula: String.raw`H_0:\rho=0,\qquad H_1:\rho\ne 0`,
    text: 'Гипотезы формулируются о генеральной корреляции, а не о конкретном выборочном значении $r$.',
  },
  {
    title: 'Тестовая статистика',
    formula: String.raw`t=r\sqrt{\frac{n-2}{1-r^2}},\qquad df=n-2`,
    text: 'Статистику и число степеней свободы нужно указать рядом с p-value.',
  },
]

const lab42Formulas = [
  {
    title: 'Ранговое преобразование',
    formula: String.raw`x_i\mapsto R(x_i),\qquad y_i\mapsto R(y_i)`,
    text: 'До расчета коэффициентов нужно явно зафиксировать, какие значения заменяются рангами и как обрабатываются совпадения.',
  },
  {
    title: 'Коэффициент Спирмена',
    formula: String.raw`\rho_s=\operatorname{cor}(R_X,R_Y)`,
    text: 'Эта запись корректна и при совпадающих рангах, потому что расчет идет по ранговым переменным.',
  },
  {
    title: 'Кендалл tau-b при совпадениях',
    formula: String.raw`\tau_b=\frac{C-D}{\sqrt{(C+D+T_X)(C+D+T_Y)}}`,
    text: '$T_X$ и $T_Y$ учитывают пары, связанные совпадениями рангов по одному из признаков.',
  },
]

const lab43Formulas = [
  {
    title: 'Ожидаемая частота',
    formula: String.raw`E_{ij}=\frac{n_{i\cdot}n_{\cdot j}}{n}`,
    text: 'Эта формула должна быть использована для проверки применимости критерия и интерпретации структуры таблицы.',
  },
  {
    title: 'Стандартизованный остаток',
    formula: String.raw`z_{ij}=\frac{O_{ij}-E_{ij}}{\sqrt{E_{ij}}}`,
    text: 'Остатки помогают понять, какие ячейки дают основной вклад в статистику хи-квадрат.',
  },
  {
    title: 'Сила связи',
    formula: String.raw`V=\sqrt{\frac{\chi^2}{n\min(r-1,c-1)}}`,
    text: 'Cramer V нужно приводить вместе с p-value, чтобы отделять статистическую значимость от практической выраженности связи.',
  },
]

function Practice5_Screen1({ setContextNotes }) {
  usePractice5Notes(setContextNotes)

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 5 -> Введение"
        title="Корреляционный анализ: измерение связи между признаками"
        subtitle="Переходим от сравнения групп к исследованию совместного изменения переменных: формы связи, силы связи, направления связи и статистической значимости."
      />

      <TextBlock>
        <p>
          Корреляционный анализ применяется тогда, когда исследователя интересует не изолированное распределение
          признака, а согласованность изменений двух или более признаков. В простейшем случае мы наблюдаем пары
          значений <MathText text="$ (x_i, y_i) $" /> и оцениваем, насколько систематически большие значения одного
          признака сопровождаются большими или малыми значениями другого.
        </p>
        <p>
          В этой практике центральным объектом будет коэффициент связи. Его численное значение всегда следует
          интерпретировать вместе с диаграммой рассеяния, шкалой измерения, размером выборки и содержательным
          контекстом задачи.
        </p>
      </TextBlock>

      <TheoryCards items={introTheory} />

      <FormulaGrid formulas={introFormulas} />

      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <RecapBlock title="План практики">
          <ol className="space-y-3">
            <li>1. Коэффициент Пирсона для линейной связи числовых признаков.</li>
            <li>2. Ранговые коэффициенты Спирмена и Кендалла для монотонных зависимостей.</li>
            <li>3. Таблицы сопряженности для качественных признаков.</li>
            <li>4. Матрицы корреляций, тепловые карты и проверка значимости.</li>
          </ol>
        </RecapBlock>
        <LinearScatterVisual />
      </section>

      <IdeaCard title="Главная методологическая граница">
        Корреляция не устанавливает причинность. Высокий коэффициент может возникать из-за скрытого фактора,
        отбора наблюдений, общей временной тенденции или механического ограничения шкалы.
      </IdeaCard>

      <Navigation screen={1} />
    </article>
  )
}

function Practice5_Screen2({ setContextNotes }) {
  usePractice5Notes(setContextNotes, [
    {
      title: 'Пирсон',
      text: 'Коэффициент Пирсона измеряет линейную связь и чувствителен к выбросам, нелинейности и неоднородным подгруппам.',
    },
  ])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 5 -> Виды корреляций"
        title="Линейная связь: коэффициент корреляции Пирсона"
        subtitle="Коэффициент Пирсона стандартизирует ковариацию и принимает значения от -1 до 1."
      />

      <TextBlock>
        <p>
          Для двух количественных признаков коэффициент Пирсона определяется как нормированная ковариация.
          Он положителен, если большие значения <MathText text="$x$" /> в среднем соответствуют большим значениям{' '}
          <MathText text="$y$" />, и отрицателен, если большие значения одного признака соответствуют малым значениям
          другого.
        </p>
        <MathBlock formula={String.raw`r = \frac{\sum_{i=1}^{n}(x_i-\bar{x})(y_i-\bar{y})}{\sqrt{\sum_{i=1}^{n}(x_i-\bar{x})^2\sum_{i=1}^{n}(y_i-\bar{y})^2}}`} />
      </TextBlock>

      <TheoryCards items={pearsonTheory} />

      <FormulaGrid formulas={pearsonFormulas} />

      <section className="grid gap-4 lg:grid-cols-2">
        <LinearScatterVisual />
        <RecapBlock title="Условия корректной интерпретации">
          <ul className="space-y-3">
            <li>Связь должна быть приблизительно линейной.</li>
            <li>Наблюдения должны быть независимыми.</li>
            <li>Выбросы необходимо анализировать отдельно, а не механически удалять.</li>
            <li>Один коэффициент не заменяет график рассеяния.</li>
          </ul>
        </RecapBlock>
      </section>

      <CodeBlock
        title="Python: коэффициент Пирсона и диаграмма рассеяния"
        code={`import numpy as np
import scipy.stats as st

x = np.array([4.1, 5.0, 5.6, 6.3, 7.2, 8.1, 8.8, 9.5])
y = np.array([42, 47, 51, 55, 61, 66, 70, 74])

r, p_value = st.pearsonr(x, y)
print(f"r = {r:.3f}")
print(f"p-value = {p_value:.4f}")`}
      />

      <AlertBox title="Типичная ошибка">
        <p>
          Значение <MathText text="$r=0$" /> означает отсутствие линейной связи, но не доказывает отсутствие любой
          зависимости. Нелинейная монотонная или U-образная зависимость может давать малый коэффициент Пирсона.
        </p>
      </AlertBox>

      <Navigation screen={2} />
    </article>
  )
}

function Practice5_Screen3({ setContextNotes }) {
  usePractice5Notes(setContextNotes, [
    {
      title: 'Ранги',
      text: 'Ранговые коэффициенты заменяют исходные значения их порядковыми номерами и поэтому устойчивее к монотонным преобразованиям шкалы.',
    },
  ])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 5 -> Виды корреляций"
        title="Ранговая связь: коэффициенты Спирмена и Кендалла"
        subtitle="Ранговые меры используются, когда важен порядок наблюдений, а не расстояния между числовыми значениями."
      />

      <TextBlock>
        <p>
          Коэффициент Спирмена является коэффициентом Пирсона, вычисленным не по исходным значениям, а по их рангам.
          Поэтому он хорошо фиксирует монотонную связь, даже если зависимость не является линейной.
        </p>
        <MathBlock formula={String.raw`\rho_s = 1 - \frac{6\sum d_i^2}{n(n^2-1)}`} />
        <p>
          Коэффициент Кендалла основан на сравнении пар наблюдений. Пара называется согласованной, если порядок по
          одному признаку совпадает с порядком по другому, и несогласованной в противоположном случае.
        </p>
        <MathBlock formula={String.raw`\tau = \frac{C-D}{C+D}`} />
      </TextBlock>

      <TheoryCards items={rankTheory} />

      <FormulaGrid formulas={rankFormulas} />

      <section className="grid gap-4 lg:grid-cols-2">
        <RankCorrelationVisual />
        <RecapBlock title="Когда выбирать ранговые меры">
          <ul className="space-y-3">
            <li>Шкала является порядковой или имеет грубые категории.</li>
            <li>Связь монотонная, но заметно нелинейная.</li>
            <li>В данных присутствуют отдельные экстремальные наблюдения.</li>
            <li>Требуется более осторожная интерпретация силы связи.</li>
          </ul>
        </RecapBlock>
      </section>

      <CodeBlock
        title="Python: Спирмен и Кендалл"
        code={`import scipy.stats as st

rank_x = [1, 2, 3, 4, 5, 6, 7, 8]
rank_y = [2, 1, 4, 3, 5, 7, 6, 8]

spearman = st.spearmanr(rank_x, rank_y)
kendall = st.kendalltau(rank_x, rank_y)

print(f"Spearman rho = {spearman.statistic:.3f}, p = {spearman.pvalue:.4f}")
print(f"Kendall tau = {kendall.statistic:.3f}, p = {kendall.pvalue:.4f}")`}
      />

      <Navigation screen={3} />
    </article>
  )
}

function Practice5_Screen4({ setContextNotes }) {
  usePractice5Notes(setContextNotes, [
    {
      title: 'Качественные признаки',
      text: 'Для категориальных переменных связь анализируется через таблицу сопряженности и сравнение наблюдаемых частот с ожидаемыми при независимости.',
    },
  ])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 5 -> Виды корреляций"
        title="Качественные признаки: таблицы сопряженности"
        subtitle="Когда признаки не являются числовыми, вместо корреляции Пирсона применяют анализ частот и критерий независимости."
      />

      <TextBlock>
        <p>
          Таблица сопряженности показывает, как распределяются наблюдения по совместным категориям двух признаков.
          Нулевая гипотеза утверждает, что признаки независимы, то есть распределение одного признака не меняется
          при фиксации категории другого.
        </p>
        <MathBlock formula={String.raw`\chi^2 = \sum_{i=1}^{r}\sum_{j=1}^{c}\frac{(O_{ij}-E_{ij})^2}{E_{ij}}`} />
      </TextBlock>

      <TheoryCards items={contingencyTheory} />

      <FormulaGrid formulas={contingencyFormulas} />

      <section className="grid gap-4 lg:grid-cols-2">
        <ContingencyMosaicVisual />
        <IdeaCard title="Ожидаемые частоты">
          При независимости ожидаемая частота в ячейке равна произведению соответствующих маргинальных итогов,
          деленному на общий объем выборки: <MathText text="$E_{ij}=\\frac{n_{i\\cdot}n_{\\cdot j}}{n}$" />.
        </IdeaCard>
      </section>

      <CodeBlock
        title="Python: критерий независимости хи-квадрат"
        code={`import numpy as np
import scipy.stats as st

table = np.array([
    [42, 18],
    [21, 39],
])

chi2, p_value, dof, expected = st.chi2_contingency(table)
print(f"chi2 = {chi2:.3f}")
print(f"df = {dof}")
print(f"p-value = {p_value:.4f}")
print(expected.round(2))`}
      />

      <Navigation screen={4} />
    </article>
  )
}

function Practice5_Screen5({ setContextNotes }) {
  usePractice5Notes(setContextNotes, [
    {
      title: 'Матрица корреляций',
      text: 'Тепловая карта удобна для первичного обзора, но не заменяет проверку значимости и анализ диаграмм рассеяния для ключевых пар переменных.',
    },
  ])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 5 -> Корреляция в коде"
        title="Тепловые карты матриц корреляций"
        subtitle="Матрица корреляций обобщает попарные связи между несколькими числовыми признаками."
      />

      <TextBlock>
        <p>
          При большом числе переменных таблица коэффициентов быстро становится трудной для чтения. Тепловая карта
          кодирует величину и направление связи цветом, поэтому помогает увидеть блоки тесно связанных признаков,
          отрицательные зависимости и почти независимые пары.
        </p>
      </TextBlock>

      <TheoryCards items={matrixTheory} />

      <FormulaGrid formulas={matrixFormulas} />

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1fr]">
        <CorrelationMatrixVisual />
        <RecapBlock title="Строгий порядок работы">
          <ol className="space-y-3">
            <li>1. Убрать идентификаторы и технические поля из числовой матрицы.</li>
            <li>2. Отдельно обработать пропуски: попарное удаление может менять объем выборки.</li>
            <li>3. Построить тепловую карту и выбрать содержательно важные пары.</li>
            <li>4. Для выбранных пар проверить график, значимость и устойчивость результата.</li>
          </ol>
        </RecapBlock>
      </section>

      <CodeBlock
        title="Python: матрица корреляций и тепловая карта"
        code={`import pandas as pd

df = pd.DataFrame({
    "x1": [12, 14, 15, 17, 19, 21],
    "x2": [31, 34, 35, 38, 42, 45],
    "x3": [8, 7, 8, 6, 5, 4],
    "x4": [21, 22, 23, 25, 24, 27],
})

corr = df.corr(method="pearson")
print(corr.round(3))`}
      />

      <Navigation screen={5} />
    </article>
  )
}

function Practice5_Screen6({ setContextNotes }) {
  usePractice5Notes(setContextNotes, [
    {
      title: 'Значимость',
      text: 'p-value для корреляции отвечает на вопрос о совместимости наблюдаемого коэффициента с нулевой корреляцией в генеральной совокупности.',
    },
  ])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 5 -> Корреляция в коде"
        title="Оценка значимости коэффициентов корреляции"
        subtitle="Даже заметный по модулю коэффициент требует проверки: при малой выборке он может быть статистически неубедительным."
      />

      <TextBlock>
        <p>
          Для коэффициента Пирсона часто проверяется нулевая гипотеза <MathText text="$H_0: \\rho = 0$" />. При
          выполнении модельных предпосылок тестовая статистика имеет t-распределение с <MathText text="$n-2$" /> степенями
          свободы.
        </p>
        <MathBlock formula={String.raw`t = r\sqrt{\frac{n-2}{1-r^2}}`} />
      </TextBlock>

      <TheoryCards items={significanceTheory} />

      <FormulaGrid formulas={significanceFormulas} />

      <section className="grid gap-4 lg:grid-cols-2">
        <SignificanceVisual />
        <AlertBox title="Практическая и статистическая значимость">
          <p>
            При большой выборке очень малый коэффициент может оказаться статистически значимым. Поэтому в отчете
            необходимо указывать не только <MathText text="$p$" />-value, но и сам коэффициент, объем выборки и
            содержательную интерпретацию силы связи.
          </p>
        </AlertBox>
      </section>

      <CodeBlock
        title="Python: значимость Пирсона и доверительный интервал Фишера"
        code={`import math
import scipy.stats as st

r = 0.62
n = 28

t_stat = r * math.sqrt((n - 2) / (1 - r**2))
p_value = 2 * st.t.sf(abs(t_stat), df=n - 2)
z = math.atanh(r)
se = 1 / math.sqrt(n - 3)
z_crit = st.norm.ppf(0.975)
ci = (math.tanh(z - z_crit * se), math.tanh(z + z_crit * se))

print(f"t = {t_stat:.3f}")
print(f"p-value = {p_value:.4f}")
print(f"95% CI for rho: [{ci[0]:.3f}, {ci[1]:.3f}]")`}
      />

      <Navigation screen={6} />
    </article>
  )
}

function Practice5_Screen7({ setContextNotes }) {
  usePractice5Notes(setContextNotes, [
    {
      title: 'Лабораторная 4.1',
      text: 'Цель работы: построить корректный корреляционный анализ числовых признаков и оформить вывод в академическом стиле.',
    },
  ])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 5 -> Лабораторная работа"
        title="Лабораторная 4.1: корреляция числовых признаков"
        subtitle="Работа направлена на анализ линейных и ранговых связей между количественными переменными."
      />

      <section className="content-block space-y-6">
        <MethodsCard title="Что использовать" items={lab41Methods} />
        <CodeBlock
          title="Python: загрузка данных для Лаб 4.1"
          code={lab41SetupCode}
          runnable={false}
        />
        <FormulaGrid title="Формулы для отчета" formulas={lab41Formulas} />
        <TaskBlock title="Что нужно сделать в Лаб 4.1:" items={lab41Tasks} />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <LinearScatterVisual />
        <RankCorrelationVisual />
      </section>

      <IdeaCard title="Формулировка вывода">
        Корректный вывод должен отвечать на четыре вопроса: какая пара признаков анализировалась, каков знак связи,
        насколько велика связь по модулю и является ли результат статистически значимым на выбранном уровне.
      </IdeaCard>

      <Navigation screen={7} />
    </article>
  )
}

function Practice5_Screen8({ setContextNotes }) {
  usePractice5Notes(setContextNotes, [
    {
      title: 'Лабораторная 4.2',
      text: 'Ранговая корреляция применяется для порядковых признаков и для монотонных зависимостей, где линейная модель была бы слишком жесткой.',
    },
  ])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 5 -> Лабораторная работа"
        title="Лабораторная 4.2: ранговая корреляция и конкордация"
        subtitle="В этом задании требуется перейти от исходных числовых значений к порядку наблюдений и проверить монотонную связь."
      />

      <section className="content-block space-y-6">
        <MethodsCard title="Что использовать" items={lab42Methods} />
        <CodeBlock
          title="Python: загрузка данных для Лаб 4.2"
          code={lab42SetupCode}
          runnable={false}
        />
        <FormulaGrid title="Формулы для отчета" formulas={lab42Formulas} />
        <TaskBlock title="Что нужно сделать в Лаб 4.2:" items={lab42Tasks} />
      </section>

      <RankCorrelationVisual />

      <AlertBox title="Критерий приемки отчета">
        <p>
          В отчете должно быть явно указано, что проверяется именно монотонная связь. Если вывод написан в терминах
          линейной зависимости, метод и интерпретация противоречат друг другу.
        </p>
      </AlertBox>

      <Navigation screen={8} />
    </article>
  )
}

function Practice5_Screen9({ setContextNotes }) {
  usePractice5Notes(setContextNotes, [
    {
      title: 'Лабораторная 4.3',
      text: 'Для номинальных признаков анализируется не корреляция чисел, а структура частот в таблице сопряженности.',
    },
  ])

  return (
    <article className="space-y-6">
      <CourseHeader
        badge="Практика 5 -> Лабораторная работа"
        title="Лабораторная 4.3: контингенция"
        subtitle="Финальный экран практики посвящен проверке независимости двух качественных признаков и содержательной интерпретации таблицы частот."
      />

      <section className="content-block space-y-6">
        <MethodsCard title="Что использовать" items={lab43Methods} />
        <CodeBlock
          title="Python: загрузка данных для Лаб 4.3"
          code={lab43SetupCode}
          runnable={false}
        />
        <FormulaGrid title="Формулы для отчета" formulas={lab43Formulas} />
        <TaskBlock title="Что нужно сделать в Лаб 4.3:" items={lab43Tasks} />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <ContingencyMosaicVisual />
        <RecapBlock title="Формат итогового вывода">
          <p>
            Укажите, какие признаки анализировались, какова нулевая гипотеза, чему равны статистика критерия,
            число степеней свободы и p-value. Затем опишите, какие сочетания категорий встречаются чаще или реже,
            чем ожидалось бы при независимости.
          </p>
        </RecapBlock>
      </section>

      <ScreenNavigation
        prevTo="/practice/5/screen/8"
        prevLabel="Назад"
        nextTo="/practice/6"
        nextLabel="Завершить Практику 5 -> Перейти к Практике 6"
        celebratory
      />
    </article>
  )
}

export {
  Practice5_Screen1,
  Practice5_Screen2,
  Practice5_Screen3,
  Practice5_Screen4,
  Practice5_Screen5,
  Practice5_Screen6,
  Practice5_Screen7,
  Practice5_Screen8,
  Practice5_Screen9,
}
