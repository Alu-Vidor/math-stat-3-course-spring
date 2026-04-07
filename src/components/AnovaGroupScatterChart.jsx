import {
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import PlotViewer from './PlotViewer'

const groupLabels = {
  1: 'Adelie',
  2: 'Chinstrap',
  3: 'Gentoo',
}

const adelieData = [
  { x: 0.94, y: 3320, group: 'Adelie' },
  { x: 0.97, y: 3480, group: 'Adelie' },
  { x: 1.02, y: 3610, group: 'Adelie' },
  { x: 1.05, y: 3720, group: 'Adelie' },
  { x: 0.99, y: 3890, group: 'Adelie' },
  { x: 1.06, y: 4010, group: 'Adelie' },
]

const chinstrapData = [
  { x: 1.94, y: 3180, group: 'Chinstrap' },
  { x: 1.98, y: 3370, group: 'Chinstrap' },
  { x: 2.02, y: 3510, group: 'Chinstrap' },
  { x: 2.06, y: 3660, group: 'Chinstrap' },
  { x: 1.96, y: 3790, group: 'Chinstrap' },
  { x: 2.04, y: 3920, group: 'Chinstrap' },
]

const gentooData = [
  { x: 2.94, y: 4380, group: 'Gentoo' },
  { x: 2.98, y: 4620, group: 'Gentoo' },
  { x: 3.02, y: 4890, group: 'Gentoo' },
  { x: 3.05, y: 5120, group: 'Gentoo' },
  { x: 2.97, y: 5340, group: 'Gentoo' },
  { x: 3.06, y: 5580, group: 'Gentoo' },
]

const meanLines = [
  { x: 1, mean: 3672, label: 'mean Adelie' },
  { x: 2, mean: 3572, label: 'mean Chinstrap' },
  { x: 3, mean: 4985, label: 'mean Gentoo' },
]

function MeanMarker({ cx, cy }) {
  if (cx == null || cy == null) {
    return null
  }

  return (
    <g>
      <rect x={cx - 7} y={cy - 7} width={14} height={14} rx={3} fill="#0f172a" />
      <rect x={cx - 4} y={cy - 4} width={8} height={8} rx={2} fill="#f8fafc" />
    </g>
  )
}

function AnovaGroupScatterChart() {
  return (
    <PlotViewer
      title="Групповой график для однофакторной ANOVA"
      caption="Такой dot-plot помогает увидеть две вещи сразу: насколько далеко стоят центры групп и насколько велик разброс внутри каждой группы. Именно это соотношение затем формализуется в F-статистике."
    >
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={1}>
        <ScatterChart margin={{ top: 18, right: 20, left: 6, bottom: 10 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#cbd5e1" vertical={false} />
          <XAxis
            type="number"
            dataKey="x"
            domain={[0.5, 3.5]}
            ticks={[1, 2, 3]}
            tickFormatter={(value) => groupLabels[value] ?? value}
            tickLine={false}
            axisLine={{ stroke: '#94a3b8' }}
            tick={{ fill: '#475569', fontSize: 12 }}
          />
          <YAxis
            type="number"
            dataKey="y"
            domain={[2800, 5800]}
            tickLine={false}
            axisLine={{ stroke: '#94a3b8' }}
            tick={{ fill: '#475569', fontSize: 12 }}
            width={56}
            label={{
              value: 'body_mass_g',
              angle: -90,
              position: 'insideLeft',
              fill: '#475569',
              fontSize: 12,
            }}
          />
          <Tooltip
            cursor={{ strokeDasharray: '4 4' }}
            formatter={(value, _, item) => {
              if (item?.payload?.group) {
                return [`${value} г`, item.payload.group]
              }
              return [`${value} г`, 'Среднее']
            }}
            labelFormatter={() => ''}
            contentStyle={{ borderRadius: '0.75rem', border: '1px solid #cbd5e1' }}
          />

          {meanLines.map((line) => (
            <ReferenceLine
              key={line.label}
              segment={[
                { x: line.x - 0.18, y: line.mean },
                { x: line.x + 0.18, y: line.mean },
              ]}
              stroke="#0f172a"
              strokeWidth={2.5}
              strokeDasharray="5 5"
            />
          ))}

          <Scatter data={adelieData} fill="#2563eb" />
          <Scatter data={chinstrapData} fill="#0f766e" />
          <Scatter data={gentooData} fill="#d97706" />
          <Scatter data={meanLines.map((line) => ({ x: line.x, y: line.mean }))} shape={<MeanMarker />} />
        </ScatterChart>
      </ResponsiveContainer>
    </PlotViewer>
  )
}

export default AnovaGroupScatterChart
