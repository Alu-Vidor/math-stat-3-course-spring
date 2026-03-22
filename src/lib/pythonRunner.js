const PYODIDE_VERSION = '0.29.3'
const PYODIDE_BASE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full`

const INIT_SCRIPT = `
import pyodide_http

pyodide_http.patch_all()

try:
    import matplotlib
    matplotlib.use("AGG")
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

    tree = ast.parse(__course_code__, mode="exec")

    if tree.body and isinstance(tree.body[-1], ast.Expr):
        last_expression = ast.Expression(tree.body.pop().value)
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

        for figure_number in plt.get_fignums():
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

let pyodidePromise = null
let seabornPromise = null
let executionQueue = Promise.resolve()

function normalizeOutput(chunks) {
  return chunks.join('').replace(/\s+$/, '')
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
      onStatus('Загружаем Python runtime...')

      const { loadPyodide } = await import(
        /* @vite-ignore */
        `${PYODIDE_BASE_URL}/pyodide.mjs`
      )

      const pyodide = await loadPyodide({
        indexURL: `${PYODIDE_BASE_URL}/`,
      })

      onStatus('Подготавливаем окружение...')
      await pyodide.loadPackage('pyodide-http')
      await pyodide.runPythonAsync(INIT_SCRIPT)
      setDefaultStreams(pyodide)

      return pyodide
    })()

    pyodidePromise.catch(() => {
      pyodidePromise = null
    })
  }

  return pyodidePromise
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

    seabornPromise.catch(() => {
      seabornPromise = null
    })
  }

  await seabornPromise
}

async function preparePackages(pyodide, code, onStatus) {
  const importsForBuiltins = stripPyPiImports(code)

  if (importsForBuiltins.trim() && typeof pyodide.loadPackagesFromImports === 'function') {
    onStatus('Загружаем библиотеки...')
    await pyodide.loadPackagesFromImports(importsForBuiltins)
  }

  if (usesSeaborn(code)) {
    await ensureSeaborn(pyodide, onStatus)
  }
}

async function executePythonInSession(code, sessionKey, onStatus) {
  const pyodide = await loadPyodideRuntime(onStatus)
  await preparePackages(pyodide, code, onStatus)

  const stdoutChunks = []
  const stderrChunks = []

  pyodide.setStdout({
    batched: (message) => {
      stdoutChunks.push(message)
    },
  })

  pyodide.setStderr({
    batched: (message) => {
      stderrChunks.push(message)
    },
  })

  pyodide.globals.set('__course_code__', code)
  pyodide.globals.set('__course_session_key__', sessionKey)

  try {
    onStatus('Выполняем код...')

    const rawResult = await pyodide.runPythonAsync(EXECUTION_SCRIPT)
    const result = JSON.parse(rawResult)

    return {
      stdout: normalizeOutput(stdoutChunks),
      stderr: normalizeOutput(stderrChunks),
      value: result.value,
      plots: result.plots,
      error: result.error,
    }
  } catch (error) {
    return {
      stdout: normalizeOutput(stdoutChunks),
      stderr: normalizeOutput(stderrChunks),
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
  const pyodide = await loadPyodideRuntime(onStatus)

  pyodide.globals.set('__course_session_key__', sessionKey)

  try {
    onStatus('Сбрасываем общую среду...')
    await pyodide.runPythonAsync(RESET_SESSION_SCRIPT)
  } finally {
    pyodide.globals.delete('__course_session_key__')
  }
}

function schedulePythonTask(task) {
  const scheduledExecution = executionQueue
    .catch(() => undefined)
    .then(() => task())

  executionQueue = scheduledExecution.catch(() => undefined)

  return scheduledExecution
}

export function runPythonCode(code, { onStatus = () => {}, sessionKey = 'default' } = {}) {
  return schedulePythonTask(() => executePythonInSession(code, sessionKey, onStatus))
}

export function resetPythonSession(sessionKey, { onStatus = () => {} } = {}) {
  return schedulePythonTask(() => clearPythonSession(sessionKey, onStatus))
}
