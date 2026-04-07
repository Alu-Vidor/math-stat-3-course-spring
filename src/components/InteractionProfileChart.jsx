import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import PlotViewer from './PlotViewer'

const interactionData = [
  { day: 'Thu', nonsmoker: 17.3, smoker: 19.4 },
  { day: 'Fri', nonsmoker: 18.1, smoker: 18.9 },
  { day: 'Sat', nonsmoker: 19.6, smoker: 21.7 },
  { day: 'Sun', nonsmoker: 21.5, smoker: 20.3 },
]

function InteractionProfileChart() {
  return (
    <PlotViewer
      title="Interaction Plot для двухфакторной модели"
      caption="График профилей средних показывает, как ведет себя отклик по уровням одного фактора при фиксированных уровнях другого. Чем менее параллельны линии, тем серьезнее повод обсуждать взаимодействие."
    >
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={1}>
        <LineChart data={interactionData} margin={{ top: 18, right: 18, left: 6, bottom: 10 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#cbd5e1" vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={{ stroke: '#94a3b8' }}
            tick={{ fill: '#475569', fontSize: 12 }}
          />
          <YAxis
            domain={[15, 24]}
            tickLine={false}
            axisLine={{ stroke: '#94a3b8' }}
            tick={{ fill: '#475569', fontSize: 12 }}
            width={48}
            label={{
              value: 'mean total_bill',
              angle: -90,
              position: 'insideLeft',
              fill: '#475569',
              fontSize: 12,
            }}
          />
          <Tooltip
            contentStyle={{ borderRadius: '0.75rem', border: '1px solid #cbd5e1' }}
            formatter={(value) => [`${Number(value).toFixed(1)}`, 'Средний чек']}
            labelFormatter={(label) => `День: ${label}`}
          />
          <Legend verticalAlign="top" height={28} />
          <Line
            type="monotone"
            dataKey="nonsmoker"
            name="smoker = no"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4, fill: '#2563eb' }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="smoker"
            name="smoker = yes"
            stroke="#ea580c"
            strokeWidth={3}
            dot={{ r: 4, fill: '#ea580c' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </PlotViewer>
  )
}

export default InteractionProfileChart
