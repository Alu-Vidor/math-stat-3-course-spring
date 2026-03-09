const patternCards = [
  {
    title: 'Почти нормальное распределение',
    tone:
      'border-blue-200 bg-blue-50/80 dark:border-blue-900/50 dark:bg-blue-950/20',
    points:
      '12,86 34,64 52,49 70,35 88,22 106,10 124,24 142,38 160,53 178,67 196,82',
    takeaway: 'Точки идут вдоль диагонали без систематического изгиба.',
  },
  {
    title: 'Правая асимметрия',
    tone:
      'border-amber-200 bg-amber-50/80 dark:border-amber-900/50 dark:bg-amber-950/20',
    points:
      '12,108 34,100 52,94 70,86 88,74 106,58 124,40 142,26 160,16 178,10 196,7',
    takeaway: 'Правый хвост тяжелее нормы: верхние квантили резко уходят вверх.',
  },
  {
    title: 'Тяжелые хвосты',
    tone:
      'border-teal-200 bg-teal-50/80 dark:border-teal-900/50 dark:bg-teal-950/20',
    points:
      '12,110 34,92 52,72 70,54 88,40 106,32 124,40 142,54 160,72 178,92 196,110',
    takeaway: 'Оба хвоста отклоняются сильнее центра: получается выраженная S-форма.',
  },
]

function QQPatternGallery() {
  return (
    <section className="grid gap-4 xl:grid-cols-3">
      {patternCards.map((card) => (
        <article
          key={card.title}
          className={`rounded-[1.5rem] border p-5 shadow-soft ${card.tone}`}
        >
          <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 dark:text-white">
            {card.title}
          </h3>

          <div className="mt-4 rounded-[1.25rem] border border-white/70 bg-white/90 p-3 dark:border-slate-700 dark:bg-slate-950/80">
            <svg viewBox="0 0 208 120" className="h-40 w-full" role="img" aria-label={card.title}>
              <line x1="10" y1="110" x2="198" y2="110" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="12" y1="108" x2="12" y2="10" stroke="#94a3b8" strokeWidth="1.5" />
              <line
                x1="12"
                y1="108"
                x2="196"
                y2="10"
                stroke="#e11d48"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <polyline
                points={card.points}
                fill="none"
                stroke="#0f172a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            {card.takeaway}
          </p>
        </article>
      ))}
    </section>
  )
}

export default QQPatternGallery
