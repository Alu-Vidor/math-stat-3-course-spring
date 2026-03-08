import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

function CodeBlock({ code, language = 'python', title = 'Пример кода' }) {
  const [isCopied, setIsCopied] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    const syncTheme = () => setIsDark(root.classList.contains('dark'))

    syncTheme()
    const observer = new MutationObserver(syncTheme)
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 1200)
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <header className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</h3>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-md bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-500"
        >
          {isCopied ? <Check size={14} /> : <Copy size={14} />}
          {isCopied ? 'Скопировано' : 'Скопировать'}
        </button>
      </header>
      <SyntaxHighlighter
        language={language}
        style={isDark ? oneDark : oneLight}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: isDark ? '#0f172a' : 'white',
          fontSize: '0.85rem',
        }}
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </section>
  )
}

export default CodeBlock
