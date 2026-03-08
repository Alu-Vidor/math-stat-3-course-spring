import { ShieldCheck } from 'lucide-react'

function KeyIdea({ title = 'Ключевая идея', children }) {
  return (
    <aside className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 shadow-soft dark:border-emerald-900 dark:bg-emerald-950/30">
      <div className="flex items-start gap-3 border-l-4 border-emerald-500 pl-3 dark:border-emerald-400">
        <ShieldCheck
          size={20}
          className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-300"
          aria-hidden="true"
        />
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-emerald-700 dark:text-emerald-300">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">{children}</p>
        </div>
      </div>
    </aside>
  )
}

export default KeyIdea
