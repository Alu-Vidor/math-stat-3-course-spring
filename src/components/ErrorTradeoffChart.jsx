import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const tradeoffData = [
  { strictness: 1, alpha: 0.16, beta: 0.08, power: 0.92 },
  { strictness: 2, alpha: 0.11, beta: 0.13, power: 0.87 },
  { strictness: 3, alpha: 0.08, beta: 0.18, power: 0.82 },
  { strictness: 4, alpha: 0.05, beta: 0.26, power: 0.74 },
  { strictness: 5, alpha: 0.03, beta: 0.35, power: 0.65 },
]

function ErrorTradeoffChart() {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={tradeoffData} margin={{ top: 12, right: 12, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#cbd5e1" />
          <XAxis
            dataKey="strictness"
            tickLine={false}
            axisLine={{ stroke: '#64748b' }}
            tick={{ fill: '#475569', fontSize: 12 }}
            label={{ value: 'Строгость порога', position: 'insideBottom', offset: -4, fill: '#475569', fontSize: 12 }}
          />
          <YAxis
            tickLine={false}
            axisLine={{ stroke: '#64748b' }}
            tick={{ fill: '#475569', fontSize: 12 }}
            domain={[0, 1]}
            tickFormatter={(value) => value.toFixed(1)}
          />
          <Tooltip
            formatter={(value) => Number(value).toFixed(2)}
            contentStyle={{ borderRadius: '0.75rem', border: '1px solid #cbd5e1' }}
          />
          <Legend />
          <Area type="monotone" dataKey="beta" fill="#bfdbfe" stroke="#60a5fa" name="Ошибка II рода β" />
          <Line type="monotone" dataKey="alpha" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} name="Ошибка I рода α" />
          <Line type="monotone" dataKey="power" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} name="Мощность 1-β" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ErrorTradeoffChart
