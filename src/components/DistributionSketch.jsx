import {
  Area,
  CartesianGrid,
  ComposedChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const distributionData = [
  { x: 40, density: 0.02 },
  { x: 50, density: 0.08 },
  { x: 60, density: 0.18 },
  { x: 70, density: 0.34 },
  { x: 78, density: 0.48 },
  { x: 85, density: 0.44 },
  { x: 95, density: 0.28 },
  { x: 110, density: 0.16 },
  { x: 130, density: 0.08 },
  { x: 160, density: 0.035 },
  { x: 200, density: 0.012 },
]

function DistributionSketch() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={distributionData}
            margin={{ top: 20, right: 24, left: 8, bottom: 12 }}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="#cbd5e1" vertical={false} />
            <XAxis
              dataKey="x"
              type="number"
              domain={[40, 200]}
              tick={{ fill: '#475569', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#64748b' }}
              label={{
                value: 'Значение признака',
                position: 'insideBottom',
                offset: -6,
                fill: '#475569',
                fontSize: 12,
              }}
            />
            <YAxis
              tick={{ fill: '#475569', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#64748b' }}
              width={36}
              label={{
                value: 'Плотность',
                angle: -90,
                position: 'insideLeft',
                fill: '#475569',
                fontSize: 12,
              }}
            />
            <Tooltip
              formatter={(value) => [Number(value).toFixed(3), 'Плотность']}
              labelFormatter={(label) => `Значение: ${label}`}
              contentStyle={{
                borderRadius: '0.75rem',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
              }}
            />
            <Area
              type="monotone"
              dataKey="density"
              stroke="#0f172a"
              strokeWidth={2}
              fill="#93c5fd"
              fillOpacity={0.6}
            />
            <ReferenceLine
              x={78}
              stroke="#0f172a"
              strokeDasharray="6 6"
              label={{ value: 'Mode', position: 'top', fill: '#0f172a', fontSize: 12 }}
            />
            <ReferenceLine
              x={79}
              stroke="#059669"
              strokeDasharray="6 6"
              label={{ value: 'Median', position: 'top', fill: '#059669', fontSize: 12 }}
            />
            <ReferenceLine
              x={169.5}
              stroke="#e11d48"
              strokeDasharray="6 6"
              label={{ value: 'Mean', position: 'top', fill: '#e11d48', fontSize: 12 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        У распределения длинный правый хвост. Поэтому среднее уходит вправо заметно сильнее, чем
        медиана. Это и есть визуальная причина, почему при выбросах `mean` и `median` начинают
        расходиться.
      </p>
    </div>
  )
}

export default DistributionSketch
