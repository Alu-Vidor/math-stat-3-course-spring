import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Check, Copy, RotateCcw } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import TerminalOutput from './TerminalOutput'
import { usePythonExecution } from './usePythonExecution'

function getLastMeaningfulLine(code) {
  const lines = code
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))

  return lines.length ? lines[lines.length - 1] : ''
}

function hasLikelyVisibleOutput(code) {
  const normalizedCode = code.trim()

  if (!normalizedCode) {
    return false
  }

  if (/\b(print|display|help)\s*\(/.test(normalizedCode)) {
    return true
  }

  if (/\b(?:plt|sns)\s*\./.test(normalizedCode) || /\.plot\s*\(/.test(normalizedCode)) {
    return true
  }

  const lastLine = getLastMeaningfulLine(normalizedCode)

  if (!lastLine || lastLine.endsWith(':')) {
    return false
  }

  if (
    /^(?:import|from|def|class|for|while|if|elif|else|try|except|finally|with|return|pass|break|continue|raise|assert|global|nonlocal|del|lambda|@)\b/.test(
      lastLine,
    )
  ) {
    return false
  }

  if (/^[A-Za-z_][\w\s,]*=/.test(lastLine)) {
    return false
  }

  return true
}

function CodeBlock({ code, language = 'python', title = 'Пример кода', runnable }) {
  const [isCopied, setIsCopied] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [isResettingSession, setIsResettingSession] = useState(false)
  const [status, setStatus] = useState('')
  const [executionResult, setExecutionResult] = useState(null)
  const hasAutoRunStartedRef = useRef(false)
  const blockId = useId()
  const { getBlockMeta, isSessionBusy, registerBlock, resetSession, runBlock, sessionVersion, unregisterBlock } =
    usePythonExecution()

  const isPython = language.toLowerCase() === 'python'
  const hasVisibleOutput = isPython && hasLikelyVisibleOutput(code)
  const canRun = runnable ?? hasVisibleOutput
  const logPrefix = `[CodeBlock:${title}]`
  const hasExecutionResult = executionResult !== null
  const blockMeta = canRun
    ? getBlockMeta(blockId)
    : {
        blockedByOrder: null,
        canRun: false,
        isExecuted: false,
        isRegistered: false,
        isRunning: false,
        order: null,
        total: 0,
      }
  const orderHint =
    canRun && blockMeta.order
      ? `Шаг ${blockMeta.order} из ${blockMeta.total}. ${
          blockMeta.isRunning
            ? 'Сейчас выполняется'
            : blockMeta.isExecuted
              ? 'Уже выполнен'
              : blockMeta.canRun
                ? 'Готов к запуску'
                : blockMeta.blockedByOrder
                  ? `Сначала выполните шаг ${blockMeta.blockedByOrder}`
                  : 'Ожидает регистрации'
        }`
      : null

  useEffect(() => {
    if (!canRun) {
      console.info(`${logPrefix} run disabled`, {
        language,
        isPython,
        hasVisibleOutput,
        runnable,
      })
      return undefined
    }

    console.info(`${logPrefix} register runnable block`, {
      language,
      hasVisibleOutput,
      runnable,
    })
    registerBlock(blockId, true)

    return () => {
      console.info(`${logPrefix} unregister block`)
      unregisterBlock(blockId)
    }
  }, [blockId, canRun, hasVisibleOutput, isPython, language, logPrefix, registerBlock, runnable, unregisterBlock])

  useEffect(() => {
    setExecutionResult(null)
    setStatus('')
    hasAutoRunStartedRef.current = false
  }, [sessionVersion])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 1200)
  }

  const handleRun = useCallback(async ({ isAutoRun = false } = {}) => {
    console.info(`${logPrefix} run start`, {
      mode: isAutoRun ? 'auto' : 'manual',
      codeLength: code.length,
    })
    setIsRunning(true)
    setExecutionResult(null)

    try {
      const result = await runBlock({
        blockId,
        code,
        onStatus: setStatus,
      })

      setExecutionResult(result)
      setStatus(result.error ? 'Выполнение завершилось с ошибкой' : 'Выполнение завершено')
      console.info(`${logPrefix} run complete`, {
        mode: isAutoRun ? 'auto' : 'manual',
        hasError: Boolean(result.error),
        hasStdout: Boolean(result.stdout),
        hasValue: Boolean(result.value),
        hasStderr: Boolean(result.stderr),
        plots: result.plots?.length ?? 0,
      })
      return !result.error
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      const shouldRetryAutoRun =
        /не готов к запуску|пока недоступен для запуска|Сначала выполните шаг|Дождитесь завершения текущего блока/.test(
          message,
        )

      setExecutionResult({
        stdout: '',
        stderr: '',
        value: null,
        plots: [],
        error: message,
      })
      setStatus('Выполнение завершилось с ошибкой')

      if (isAutoRun && shouldRetryAutoRun) {
        hasAutoRunStartedRef.current = false
      }

      console.error(`${logPrefix} run failed`, {
        mode: isAutoRun ? 'auto' : 'manual',
        shouldRetryAutoRun,
        message,
      })
      return false
    } finally {
      setIsRunning(false)
    }
  }, [blockId, code, logPrefix, runBlock])

  useEffect(() => {
    if (!canRun || !hasVisibleOutput || hasAutoRunStartedRef.current) {
      return
    }

    if (
      !blockMeta.isRegistered ||
      !blockMeta.canRun ||
      blockMeta.isExecuted ||
      isRunning ||
      isSessionBusy ||
      isResettingSession
    ) {
      console.info(`${logPrefix} auto-run skipped`, {
        canRun,
        hasVisibleOutput,
        blockCanRun: blockMeta.canRun,
        isRegistered: blockMeta.isRegistered,
        order: blockMeta.order,
        blockedByOrder: blockMeta.blockedByOrder,
        isExecuted: blockMeta.isExecuted,
        isRunning,
        isSessionBusy,
        isResettingSession,
      })
      return
    }

    hasAutoRunStartedRef.current = true
    console.info(`${logPrefix} auto-run trigger`)
    void handleRun({ isAutoRun: true })
  }, [
    blockMeta.blockedByOrder,
    blockMeta.canRun,
    blockMeta.isExecuted,
    blockMeta.isRegistered,
    blockMeta.order,
    canRun,
    handleRun,
    hasVisibleOutput,
    isResettingSession,
    isRunning,
    isSessionBusy,
    logPrefix,
  ])

  const handleReset = () => {
    setExecutionResult(null)
    setStatus('')
  }

  const handleResetSession = async () => {
    setIsResettingSession(true)
    setExecutionResult(null)

    try {
      await resetSession({
        onStatus: setStatus,
      })
      setStatus('Общая среда экрана сброшена')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : String(error))
    } finally {
      setIsResettingSession(false)
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-700 bg-[#1e1e1e] shadow-soft">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 bg-slate-900/60 px-4 py-2.5">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
          {isPython ? (
            <div className="mt-1 space-y-1 text-xs text-slate-400">
              <p>
                {canRun
                  ? 'Блоки на этом экране используют общую Python-среду'
                  : 'Интерактивный запуск отключен для этого примера'}
              </p>
              {orderHint ? <p>{orderHint}</p> : null}
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {canRun ? (
            <button
              type="button"
              onClick={handleResetSession}
              disabled={isRunning || isResettingSession || isSessionBusy}
              className="inline-flex items-center gap-1 rounded-md border border-slate-600 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
            >
              <RotateCcw size={14} />
              {isResettingSession ? 'Сброс среды...' : 'Сбросить среду'}
            </button>
          ) : null}

          {hasExecutionResult || status ? (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 rounded-md border border-slate-600 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
            >
              Очистить вывод
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
          codeTagProps={{
            contentEditable: false,
            spellCheck: false,
          }}
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

      {canRun && (isRunning || hasExecutionResult || status) ? (
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

        </div>
      ) : null}
    </section>
  )
}

export default CodeBlock
