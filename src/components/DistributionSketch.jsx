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

const sample = [65, 70, 72, 75, 78, 80, 82, 85, 88, 1000]
const mean = sample.reduce((sum, value) => sum + value, 0) / sample.length
const median = (sample[4] + sample[5]) / 2
const bandwidth = 35
const densityScale = 18

function gaussianKernel(u) {
  return Math.exp(-0.5 * u * u) / Math.sqrt(2 * Math.PI)
}

function estimateDensity(x) {
  const density =
    sample.reduce((sum, value) => sum + gaussianKernel((x - value) / bandwidth), 0) /
    (sample.length * bandwidth)

  return density * densityScale
}

const distributionData = Array.from({ length: 81 }, (_, index) => {
  const x = index * 12.5
  return {
    x: Number(x.toFixed(1)),
    density: Number(estimateDensity(x).toFixed(4)),
  }
})

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
              domain={[0, 1000]}
              tick={{ fill: '#475569', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#64748b' }}
              ticks={[0, 100, 200, 400, 600, 800, 1000]}
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
              domain={[0, 'auto']}
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
              x={median}
              stroke="#059669"
              strokeDasharray="6 6"
              label={{ value: 'Median', position: 'top', fill: '#059669', fontSize: 12 }}
            />
            <ReferenceLine
              x={mean}
              stroke="#e11d48"
              strokeDasharray="6 6"
              label={{ value: 'Mean', position: 'top', fill: '#e11d48', fontSize: 12 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        Этот график построен по той же учебной выборке: `65, 70, 72, 75, 78, 80, 82, 85, 88,
        1000`. Девять наблюдений образуют плотный кластер слева, а одно экстремальное значение
        тянет среднее далеко вправо. Поэтому `mean = 169.5`, а `median = 79`.
      </p>
    </div>
  )
}

export default DistributionSketch
