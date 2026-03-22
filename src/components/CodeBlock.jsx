import { useState } from 'react'
import { Check, Copy, LoaderCircle, Play, RotateCcw } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import TerminalOutput from './TerminalOutput'
import { runPythonCode } from '../lib/pythonRunner'

function CodeBlock({ code, language = 'python', title = 'Пример кода' }) {
  const [isCopied, setIsCopied] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [status, setStatus] = useState('')
  const [executionResult, setExecutionResult] = useState(null)

  const isPython = language.toLowerCase() === 'python'
  const hasExecutionResult = executionResult !== null

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 1200)
  }

  const handleRun = async () => {
    setIsRunning(true)
    setExecutionResult(null)

    try {
      const result = await runPythonCode(code, {
        onStatus: setStatus,
      })

      setExecutionResult(result)
      setStatus(result.error ? 'Выполнение завершилось с ошибкой' : 'Выполнение завершено')
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)

      setExecutionResult({
        stdout: '',
        stderr: '',
        value: null,
        plots: [],
        error: message,
      })
      setStatus('Выполнение завершилось с ошибкой')
    } finally {
      setIsRunning(false)
    }
  }

  const handleReset = () => {
    setExecutionResult(null)
    setStatus('')
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-700 bg-[#1e1e1e] shadow-soft">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 bg-slate-900/60 px-4 py-2.5">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
          {isPython ? <p className="mt-1 text-xs text-slate-400">Можно запустить прямо в браузере</p> : null}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {hasExecutionResult ? (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 rounded-md border border-slate-600 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
            >
              <RotateCcw size={14} />
              Очистить
            </button>
          ) : null}

          {isPython ? (
            <button
              type="button"
              onClick={handleRun}
              disabled={isRunning}
              className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-500 disabled:cursor-wait disabled:bg-emerald-700"
            >
              {isRunning ? <LoaderCircle size={14} className="animate-spin" /> : <Play size={14} />}
              {isRunning ? 'Запуск...' : 'Запустить'}
            </button>
          ) : null}

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded-md bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-500"
          >
            {isCopied ? <Check size={14} /> : <Copy size={14} />}
            {isCopied ? 'Скопировано' : 'Копировать'}
          </button>
        </div>
      </header>

      <div>
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: '#1e1e1e',
            fontSize: '0.85rem',
          }}
          wrapLongLines
        >
          {code}
        </SyntaxHighlighter>
      </div>

      {isPython && (isRunning || hasExecutionResult || status) ? (
        <div className="space-y-4 border-t border-slate-700 bg-slate-950/80 px-4 py-4">
          {status ? <p className="text-xs font-medium text-slate-300">{status}</p> : null}

          {executionResult?.stdout ? (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Stdout</p>
              <TerminalOutput lines={executionResult.stdout} />
            </div>
          ) : null}

          {executionResult?.value ? (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Результат</p>
              <TerminalOutput lines={executionResult.value} />
            </div>
          ) : null}

          {executionResult?.stderr ? (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">Stderr</p>
              <div className="overflow-x-auto rounded-2xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 font-mono text-sm text-amber-100">
                <pre className="m-0 whitespace-pre-wrap">{executionResult.stderr}</pre>
              </div>
            </div>
          ) : null}

          {executionResult?.error ? (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-300">Ошибка</p>
              <div className="overflow-x-auto rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 font-mono text-sm text-rose-100">
                <pre className="m-0 whitespace-pre-wrap">{executionResult.error}</pre>
              </div>
            </div>
          ) : null}

          {executionResult?.plots?.length ? (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Графики</p>
              <div className="grid gap-3">
                {executionResult.plots.map((plot, index) => (
                  <img
                    key={`${title}-plot-${index + 1}`}
                    src={`data:image/png;base64,${plot}`}
                    alt={`Результат выполнения ${index + 1}`}
                    className="w-full rounded-2xl border border-slate-700 bg-white"
                  />
                ))}
              </div>
            </div>
          ) : null}

          {executionResult &&
          !executionResult.stdout &&
          !executionResult.value &&
          !executionResult.stderr &&
          !executionResult.error &&
          !executionResult.plots.length ? (
            <div className="rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
              Код выполнился без текстового вывода.
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}

export default CodeBlock
