import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts'

const scatterData = [
  { x: 4.1, y: 42, group: 'A' },
  { x: 5.0, y: 47, group: 'A' },
  { x: 5.6, y: 51, group: 'A' },
  { x: 6.3, y: 55, group: 'A' },
  { x: 7.2, y: 61, group: 'A' },
  { x: 8.1, y: 66, group: 'A' },
  { x: 8.8, y: 70, group: 'A' },
  { x: 9.5, y: 74, group: 'A' },
]

const regressionLine = [
  { x: 4, y: 41 },
  { x: 10, y: 75 },
]

const rankData = [
  { x: 1, y: 17, rank: 1 },
  { x: 2, y: 30, rank: 2 },
  { x: 3, y: 44, rank: 3 },
  { x: 4, y: 55, rank: 4 },
  { x: 5, y: 64, rank: 5 },
  { x: 6, y: 70, rank: 6 },
  { x: 7, y: 75, rank: 7 },
  { x: 8, y: 78, rank: 8 },
]

const contingencyRows = [
  { category: 'Группа 1', yes: 42, no: 18 },
  { category: 'Группа 2', yes: 21, no: 39 },
]

const matrixRows = [
  { x: 'X1', y: 'X1', value: 1.0 },
  { x: 'X2', y: 'X1', value: 0.82 },
  { x: 'X3', y: 'X1', value: -0.18 },
  { x: 'X4', y: 'X1', value: 0.41 },
  { x: 'X1', y: 'X2', value: 0.82 },
  { x: 'X2', y: 'X2', value: 1.0 },
  { x: 'X3', y: 'X2', value: -0.09 },
  { x: 'X4', y: 'X2', value: 0.36 },
  { x: 'X1', y: 'X3', value: -0.18 },
  { x: 'X2', y: 'X3', value: -0.09 },
  { x: 'X3', y: 'X3', value: 1.0 },
  { x: 'X4', y: 'X3', value: -0.67 },
  { x: 'X1', y: 'X4', value: 0.41 },
  { x: 'X2', y: 'X4', value: 0.36 },
  { x: 'X3', y: 'X4', value: -0.67 },
  { x: 'X4', y: 'X4', value: 1.0 },
]

const densityRows = Array.from({ length: 121 }, (_, index) => {
  const x = -3 + index * 0.05
  const y = Math.exp(-0.5 * x * x)
  return {
    x: Number(x.toFixed(2)),
    y: Number(y.toFixed(4)),
    tail: Math.abs(x) >= 1.96 ? Number(y.toFixed(4)) : 0,
  }
})

function ChartFrame({ caption, children }) {
  return (
    <figure className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <div className="h-72 min-h-0 w-full">{children}</div>
      <figcaption className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {caption}
      </figcaption>
    </figure>
  )
}

function LinearScatterVisual() {
  return (
    <ChartFrame caption="Диаграмма рассеяния и линия тренда позволяют одновременно оценить направление, силу и приблизительную линейность связи.">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={1}>
        <ScatterChart margin={{ top: 18, right: 18, left: 0, bottom: 12 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
          <XAxis type="number" dataKey="x" name="x" domain={[3.5, 10]} tick={{ fontSize: 12 }} />
          <YAxis type="number" dataKey="y" name="y" domain={[35, 80]} tick={{ fontSize: 12 }} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Наблюдения" data={scatterData} fill="#10b981" />
          <Scatter name="Линейный тренд" data={regressionLine} line={{ stroke: '#4f46e5', strokeWidth: 3 }} fill="#4f46e5" />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}

function RankCorrelationVisual() {
  return (
    <ChartFrame caption="Ранговая визуализация показывает монотонную, но не строго линейную связь: порядок наблюдений сохраняется, расстояния между значениями уже вторичны.">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={1}>
        <LineChart data={rankData} margin={{ top: 18, right: 18, left: 0, bottom: 12 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
          <XAxis dataKey="x" tick={{ fontSize: 12 }} label={{ value: 'ранг X', position: 'insideBottom', offset: -4 }} />
          <YAxis tick={{ fontSize: 12 }} label={{ value: 'Y', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Line type="monotone" dataKey="y" stroke="#4f46e5" strokeWidth={3} dot={{ r: 5, fill: '#0ea5e9' }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}

function ContingencyMosaicVisual() {
  return (
    <ChartFrame caption="Для качественных признаков содержательно важны не отдельные числовые коды категорий, а распределение частот по ячейкам таблицы сопряженности.">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={1}>
        <BarChart data={contingencyRows} margin={{ top: 18, right: 18, left: 0, bottom: 12 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
          <XAxis dataKey="category" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="yes" name="Категория Y = 1" stackId="a" fill="#4f46e5" />
          <Bar dataKey="no" name="Категория Y = 0" stackId="a" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}

function matrixColor(value) {
  if (value >= 0.75) return '#4f46e5'
  if (value >= 0.25) return '#a5b4fc'
  if (value <= -0.55) return '#e11d48'
  if (value <= -0.15) return '#fecdd3'
  return '#e2e8f0'
}

function MatrixCell(props) {
  const { cx, cy, payload } = props
  const size = 42

  return (
    <g>
      <rect
        x={cx - size / 2}
        y={cy - size / 2}
        width={size}
        height={size}
        rx="8"
        fill={matrixColor(payload.value)}
      />
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        className="fill-slate-900 text-[11px] font-semibold"
      >
        {payload.value.toFixed(2)}
      </text>
    </g>
  )
}

function CorrelationMatrixVisual() {
  return (
    <ChartFrame caption="Тепловая карта через матрицу корреляций помогает увидеть блоки тесно связанных переменных и пары с отрицательной зависимостью.">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={1}>
        <ScatterChart margin={{ top: 18, right: 18, left: 0, bottom: 12 }}>
          <XAxis type="category" dataKey="x" allowDuplicatedCategory={false} tick={{ fontSize: 12 }} />
          <YAxis type="category" dataKey="y" allowDuplicatedCategory={false} tick={{ fontSize: 12 }} />
          <ZAxis type="number" dataKey="value" range={[350, 350]} />
          <Tooltip />
          <Scatter data={matrixRows} shape={<MatrixCell />} />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}

function SignificanceVisual() {
  return (
    <ChartFrame caption="Критические области показывают, что статистическое решение зависит от положения тестовой статистики относительно распределения при нулевой гипотезе.">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={1}>
        <AreaChart data={densityRows} margin={{ top: 18, right: 18, left: 0, bottom: 12 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
          <XAxis dataKey="x" tick={{ fontSize: 12 }} />
          <YAxis tick={false} width={12} />
          <Tooltip />
          <Area dataKey="y" stroke="#64748b" fill="#cbd5e1" fillOpacity={0.35} name="плотность" />
          <Area dataKey="tail" stroke="#e11d48" fill="#fb7185" fillOpacity={0.55} name="критическая область" />
          <ReferenceLine x={-1.96} stroke="#e11d48" strokeDasharray="4 4" />
          <ReferenceLine x={1.96} stroke="#e11d48" strokeDasharray="4 4" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}

export {
  ContingencyMosaicVisual,
  CorrelationMatrixVisual,
  LinearScatterVisual,
  RankCorrelationVisual,
  SignificanceVisual,
}
