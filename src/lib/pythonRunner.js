const PYODIDE_VERSION = '0.29.3'
const PYODIDE_BASE_URLS = [
  `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full`,
  `https://pyodide-cdn2.iodide.io/v${PYODIDE_VERSION}/full`,
]

const INIT_SCRIPT = `
import pyodide_http

pyodide_http.patch_all()

try:
    import matplotlib
    matplotlib.use("AGG")
    import matplotlib.pyplot as plt
    def show_patch(*args, **kwargs):
        pass
    plt.show = show_patch
except Exception:
    pass
`

const EXECUTION_SCRIPT = `
import ast
import base64
import io
import json
import traceback

result = {
    "value": None,
    "plots": [],
    "error": None,
}

registry = globals().setdefault("__course_sessions__", {})
namespace = registry.get(__course_session_key__)

if namespace is None:
    namespace = {"__name__": "__main__"}
    registry[__course_session_key__] = namespace

try:
    try:
        import matplotlib
        matplotlib.use("AGG")
    except Exception:
        pass

    code_to_run = __course_code__.strip()
    if not code_to_run:
        result["value"] = ""
    else:
        tree = ast.parse(code_to_run, mode="exec")

        if tree.body and isinstance(tree.body[-1], ast.Expr):
            last_expression = ast.Expression(tree.body.pop().value)
            if tree.body:
                exec(compile(tree, "<code-block>", "exec"), namespace)
            value = eval(compile(last_expression, "<code-block>", "eval"), namespace)
            if value is not None:
                result["value"] = repr(value)
        else:
            exec(compile(tree, "<code-block>", "exec"), namespace)
except Exception:
    result["error"] = traceback.format_exc()
finally:
    try:
        import matplotlib.pyplot as plt
        fignums = plt.get_fignums()
        if fignums:
            for figure_number in fignums:
                figure = plt.figure(figure_number)
                buffer = io.BytesIO()
                figure.savefig(buffer, format="png", bbox_inches="tight", dpi=140)
                result["plots"].append(base64.b64encode(buffer.getvalue()).decode("ascii"))
                buffer.close()
            plt.close("all")
    except Exception:
        pass

json.dumps(result)
`

const RESET_SESSION_SCRIPT = `
registry = globals().setdefault("__course_sessions__", {})
registry.pop(__course_session_key__, None)

try:
    import matplotlib.pyplot as plt
    plt.close("all")
except Exception:
    pass
`

const RUNNER_LOG_PREFIX = '[pythonRunner]'

let pyodidePromise = null
let seabornPromise = null
let executionQueue = Promise.resolve()

function withTimeout(promise, timeoutMs, errorMessage = 'Превышено время ожидания') {
  let timeoutId
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(errorMessage)), timeoutMs)
  })

  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId))
}

function normalizeOutput(chunks) {
  const source = Array.isArray(chunks) ? chunks.join('') : String(chunks ?? '')
  return source.replace(/\s+$/, '')
}

function mergeOutputChunk(current, chunk) {
  const nextChunk = String(chunk ?? '')

  if (!nextChunk) {
    return current
  }

  if (!current) {
    return nextChunk
  }

  const lastChar = current[current.length - 1]
  const firstChar = nextChunk[0]
  const needsNewline = lastChar !== '\n' && firstChar !== '\n'

  return needsNewline ? `${current}\n${nextChunk}` : `${current}${nextChunk}`
}

function usesSeaborn(code) {
  return /\b(?:from\s+seaborn\s+import|import\s+seaborn(?:\s+as\s+\w+)?)\b/.test(code)
}

function stripPyPiImports(code) {
  return code.replace(/^\s*(?:from\s+seaborn\s+import|import\s+seaborn\b).*$\n?/gm, '')
}

function setDefaultStreams(pyodide) {
  pyodide.setStdout({ batched: (message) => console.log(message) })
  pyodide.setStderr({ batched: (message) => console.error(message) })
}

async function loadPyodideRuntime(onStatus) {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      console.info(`${RUNNER_LOG_PREFIX} init runtime`)
      let lastError = null

      for (let index = 0; index < PYODIDE_BASE_URLS.length; index += 1) {
        const baseUrl = PYODIDE_BASE_URLS[index]
        const host = (() => {
          try {
            return new URL(baseUrl).host
          } catch {
            return baseUrl
          }
        })()

        try {
          console.info(`${RUNNER_LOG_PREFIX} try CDN`, {
            attempt: index + 1,
            total: PYODIDE_BASE_URLS.length,
            host,
          })
          onStatus(`Загружаем Python runtime (${index + 1}/${PYODIDE_BASE_URLS.length})...`)

          const { loadPyodide } = await withTimeout(
            import(
              /* @vite-ignore */
              `${baseUrl}/pyodide.mjs`
            ),
            30000,
            `Не удалось загрузить pyodide.mjs с ${host} за 30с.`,
          )

          const pyodide = await withTimeout(
            loadPyodide({
              indexURL: `${baseUrl}/`,
            }),
            30000,
            `Не удалось инициализировать Pyodide с ${host} за 30с.`,
          )

          onStatus('Подготавливаем окружение...')
          await pyodide.loadPackage('pyodide-http')
          await pyodide.runPythonAsync(INIT_SCRIPT)
          setDefaultStreams(pyodide)
          console.info(`${RUNNER_LOG_PREFIX} runtime ready`, { host })

          return pyodide
        } catch (error) {
          lastError = error
          console.warn(`${RUNNER_LOG_PREFIX} CDN failed`, {
            host,
            attempt: index + 1,
            message: error instanceof Error ? error.message : String(error),
          })

          if (index < PYODIDE_BASE_URLS.length - 1) {
            onStatus(`Источник ${host} недоступен, пробуем резервный...`)
          }
        }
      }

      const reason = lastError instanceof Error ? lastError.message : String(lastError)
      console.error(`${RUNNER_LOG_PREFIX} all CDNs failed`, { reason })
      throw new Error(`Не удалось загрузить Python runtime ни с одного CDN. Последняя ошибка: ${reason}`)
    })()

    pyodidePromise.catch(() => {
      pyodidePromise = null
    })
  }

  return withTimeout(pyodidePromise, 60000, 'Загрузка Python runtime заняла слишком много времени (60с). Попробуйте обновить страницу.')
}

async function ensureSeaborn(pyodide, onStatus) {
  if (!seabornPromise) {
    seabornPromise = (async () => {
      onStatus('Подключаем seaborn...')
      await pyodide.loadPackage('micropip')
      await pyodide.runPythonAsync(`
import micropip

await micropip.install("seaborn")
`)
    })()

    seabornPromise = withTimeout(
      seabornPromise,
      90000,
      'Установка Seaborn и зависимостей заняла слишком много времени. Проверьте интернет-соединение.',
    )

    seabornPromise.catch(() => {
      seabornPromise = null
    })
  }

  await seabornPromise
}

async function preparePackages(pyodide, code, onStatus) {
  const needsNumpy = /\bimport\s+numpy\b|\bfrom\s+numpy\b|np\./.test(code)
  const needsPandas = /\bimport\s+pandas\b|\bfrom\s+pandas\b|pd\./.test(code)
  const needsMatplotlib = /\bimport\s+matplotlib\b|\bfrom\s+matplotlib\b|plt\./.test(code) || /\bimport\s+seaborn\b|\bfrom\s+seaborn\b|sns\./.test(code)
  const needsScipy = /\bimport\s+scipy\b|\bfrom\s+scipy\b|\bstats\./.test(code)
  console.info(`${RUNNER_LOG_PREFIX} package scan`, {
    needsNumpy,
    needsPandas,
    needsMatplotlib,
    needsScipy,
    needsSeaborn: usesSeaborn(code),
  })

  if (needsNumpy || needsPandas || needsMatplotlib || needsScipy) {
    onStatus('Подготавливаем библиотеки...')
    const packagesToLoad = []
    if (needsNumpy) packagesToLoad.push('numpy')
    if (needsPandas) packagesToLoad.push('pandas')
    if (needsMatplotlib) packagesToLoad.push('matplotlib')
    if (needsScipy) packagesToLoad.push('scipy')

    await pyodide.loadPackage(packagesToLoad)
  }

  const importsForBuiltins = stripPyPiImports(code)

  if (importsForBuiltins.trim() && typeof pyodide.loadPackagesFromImports === 'function') {
    onStatus('Загружаем дополнительные модули...')
    await pyodide.loadPackagesFromImports(importsForBuiltins)
  }

  if (usesSeaborn(code)) {
    await ensureSeaborn(pyodide, onStatus)
  }
}

async function executePythonInSession(code, sessionKey, onStatus) {
  console.info(`${RUNNER_LOG_PREFIX} execute start`, {
    sessionKey,
    codeLength: code.length,
  })
  const pyodide = await loadPyodideRuntime(onStatus)
  await preparePackages(pyodide, code, onStatus)

  let stdoutOutput = ''
  let stderrOutput = ''

  pyodide.setStdout({
    batched: (message) => {
      stdoutOutput = mergeOutputChunk(stdoutOutput, message)
    },
  })

  pyodide.setStderr({
    batched: (message) => {
      stderrOutput = mergeOutputChunk(stderrOutput, message)
    },
  })

  pyodide.globals.set('__course_code__', code)
  pyodide.globals.set('__course_session_key__', sessionKey)

  try {
    onStatus('Выполняем код...')

    const rawResult = await pyodide.runPythonAsync(EXECUTION_SCRIPT)
    const result = JSON.parse(rawResult)
    console.info(`${RUNNER_LOG_PREFIX} execute complete`, {
      sessionKey,
      hasError: Boolean(result.error),
      plots: result.plots?.length ?? 0,
      stdoutLength: normalizeOutput(stdoutOutput).length,
      stderrLength: normalizeOutput(stderrOutput).length,
      hasValue: Boolean(result.value),
    })

    return {
      stdout: normalizeOutput(stdoutOutput),
      stderr: normalizeOutput(stderrOutput),
      value: result.value,
      plots: result.plots,
      error: result.error,
    }
  } catch (error) {
    console.error(`${RUNNER_LOG_PREFIX} execute failure`, {
      sessionKey,
      message: error instanceof Error ? error.message : String(error),
    })
    return {
      stdout: normalizeOutput(stdoutOutput),
      stderr: normalizeOutput(stderrOutput),
      value: null,
      plots: [],
      error: error instanceof Error ? error.message : String(error),
    }
  } finally {
    pyodide.globals.delete('__course_code__')
    pyodide.globals.delete('__course_session_key__')
    setDefaultStreams(pyodide)
  }
}

async function clearPythonSession(sessionKey, onStatus) {
  console.info(`${RUNNER_LOG_PREFIX} reset session start`, { sessionKey })
  const pyodide = await loadPyodideRuntime(onStatus)

  pyodide.globals.set('__course_session_key__', sessionKey)

  try {
    onStatus('Сбрасываем общую среду...')
    await pyodide.runPythonAsync(RESET_SESSION_SCRIPT)
    console.info(`${RUNNER_LOG_PREFIX} reset session complete`, { sessionKey })
  } finally {
    pyodide.globals.delete('__course_session_key__')
  }
}

function schedulePythonTask(task) {
  console.info(`${RUNNER_LOG_PREFIX} queue task`)
  const scheduledExecution = executionQueue
    .catch(() => undefined)
    .then(() => task())

  executionQueue = scheduledExecution.catch(() => undefined)

  return scheduledExecution
}

export function runPythonCode(code, { onStatus = () => {}, sessionKey = 'default' } = {}) {
  return schedulePythonTask(() =>
    withTimeout(
      executePythonInSession(code, sessionKey, onStatus),
      45000,
      'Выполнение кода прервано по таймауту (45с). Убедитесь, что нет бесконечных циклов.',
    ),
  )
}

export function resetPythonSession(sessionKey, { onStatus = () => {} } = {}) {
  return schedulePythonTask(() =>
    withTimeout(
      clearPythonSession(sessionKey, onStatus),
      30000,
      'Сброс сессии прерван по таймауту (30с).',
    ),
  )
}
