function Marker({ label, left, tone }) {
  return (
    <div
      className="absolute bottom-0 flex -translate-x-1/2 flex-col items-center"
      style={{ left }}
    >
      <span className={`mb-2 text-xs font-semibold ${tone}`}>{label}</span>
      <div className={`h-24 w-0.5 border-l-2 border-dashed ${tone.replace('text-', 'border-')}`} />
    </div>
  )
}

function DistributionSketch() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <div className="relative h-64 overflow-hidden rounded-xl bg-gradient-to-b from-sky-50 to-white dark:from-slate-800 dark:to-slate-900">
        <div className="absolute bottom-8 left-6 right-6 border-b-2 border-slate-700 dark:border-slate-300" />

        <svg
          viewBox="0 0 600 220"
          className="absolute inset-x-6 bottom-8 h-[190px] w-[calc(100%-3rem)]"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M20 200
               C80 198, 120 165, 170 65
               C205 10, 250 42, 290 95
               C340 160, 400 188, 560 200
               L560 200 L20 200 Z"
            fill="rgba(96, 165, 250, 0.35)"
            stroke="rgba(15, 23, 42, 0.9)"
            strokeWidth="3"
          />
        </svg>

        <Marker label="Mode" left="33%" tone="text-slate-900 dark:text-white" />
        <Marker label="Median" left="45%" tone="text-emerald-700 dark:text-emerald-300" />
        <Marker label="Mean" left="63%" tone="text-rose-700 dark:text-rose-300" />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        При правосторонней асимметрии хвост тянется вправо, поэтому среднее смещается за медиану.
        Для нашей истории это и есть эффект выброса: экстремальное значение тянет `mean`, но почти
        не двигает `median`.
      </p>
    </div>
  )
}

export default DistributionSketch
