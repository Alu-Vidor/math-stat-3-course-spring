import { MessageSquareText } from 'lucide-react'
import { isValidElement } from 'react'

function ContextNote({ title, text }) {
  const content =
    typeof text === 'string' || typeof text === 'number' ? (
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{text}</p>
    ) : isValidElement(text) ? (
      <div className="space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{text}</div>
    ) : null

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-3 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
        <MessageSquareText size={16} />
        <h3 className="text-sm font-semibold uppercase tracking-[0.08em]">{title}</h3>
      </div>
      {content}
    </article>
  )
}

export default ContextNote
