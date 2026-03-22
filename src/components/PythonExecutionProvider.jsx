import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { resetPythonSession, runPythonCode } from '../lib/pythonRunner'
import { PythonExecutionContext } from './usePythonExecution'

function buildBlockMeta(blocks, executedBlockIds, currentRunningId, blockId) {
  const runnableBlocks = blocks.filter((block) => block.runnable)
  const orderIndex = runnableBlocks.findIndex((block) => block.id === blockId)

  if (orderIndex === -1) {
    return {
      blockedByOrder: null,
      canRun: false,
      isExecuted: false,
      isRegistered: false,
      isRunning: false,
      order: null,
      total: runnableBlocks.length,
    }
  }

  const previousBlock = orderIndex > 0 ? runnableBlocks[orderIndex - 1] : null
  const isExecuted = executedBlockIds.includes(blockId)
  const isRunning = currentRunningId === blockId
  const isPreviousReady = previousBlock ? executedBlockIds.includes(previousBlock.id) : true

  return {
    blockedByOrder: previousBlock ? orderIndex : null,
    canRun: isPreviousReady && currentRunningId === null,
    isExecuted,
    isRegistered: true,
    isRunning,
    order: orderIndex + 1,
    total: runnableBlocks.length,
  }
}

function syncRef(ref, value) {
  ref.current = value
}

export function PythonExecutionProvider({ screenKey, children }) {
  const [blocks, setBlocks] = useState([])
  const [executedBlockIds, setExecutedBlockIds] = useState([])
  const [currentRunningId, setCurrentRunningId] = useState(null)
  const [sessionVersion, setSessionVersion] = useState(0)

  const blocksRef = useRef(blocks)
  const executedBlockIdsRef = useRef(executedBlockIds)
  const currentRunningIdRef = useRef(currentRunningId)

  syncRef(blocksRef, blocks)
  syncRef(executedBlockIdsRef, executedBlockIds)
  syncRef(currentRunningIdRef, currentRunningId)

  useEffect(() => {
    setBlocks([])
    setExecutedBlockIds([])
    setCurrentRunningId(null)
    setSessionVersion((value) => value + 1)
  }, [screenKey])

  const registerBlock = useCallback((blockId, runnable) => {
    setBlocks((previous) => {
      const existingIndex = previous.findIndex((block) => block.id === blockId)

      if (existingIndex === -1) {
        return [...previous, { id: blockId, runnable }]
      }

      const existingBlock = previous[existingIndex]

      if (existingBlock.runnable === runnable) {
        return previous
      }

      return previous.map((block) => (block.id === blockId ? { ...block, runnable } : block))
    })
  }, [])

  const unregisterBlock = useCallback((blockId) => {
    setBlocks((previous) => previous.filter((block) => block.id !== blockId))
    setExecutedBlockIds((previous) => previous.filter((id) => id !== blockId))
  }, [])

  const getBlockMeta = useCallback((blockId) => {
    return buildBlockMeta(blocks, executedBlockIds, currentRunningId, blockId)
  }, [blocks, currentRunningId, executedBlockIds])

  const runBlock = useCallback(async ({ blockId, code, onStatus = () => {} }) => {
    const meta = buildBlockMeta(
      blocksRef.current,
      executedBlockIdsRef.current,
      currentRunningIdRef.current,
      blockId,
    )

    if (!meta.isRegistered) {
      throw new Error('Блок еще не готов к запуску')
    }

    if (currentRunningIdRef.current !== null && currentRunningIdRef.current !== blockId) {
      throw new Error('Дождитесь завершения текущего блока')
    }

    if (!meta.canRun && !meta.isRunning) {
      if (meta.blockedByOrder) {
        throw new Error(`Сначала выполните шаг ${meta.blockedByOrder}`)
      }

      throw new Error('Блок пока недоступен для запуска')
    }

    setCurrentRunningId(blockId)

    try {
      const result = await runPythonCode(code, {
        onStatus,
        sessionKey: `python-session:${screenKey}`,
      })

      if (!result.error) {
        setExecutedBlockIds((previous) => (previous.includes(blockId) ? previous : [...previous, blockId]))
      }

      return result
    } finally {
      setCurrentRunningId(null)
    }
  }, [screenKey])

  const resetSession = useCallback(async ({ onStatus = () => {} } = {}) => {
    if (currentRunningIdRef.current !== null) {
      throw new Error('Нельзя сбросить среду во время выполнения блока')
    }

    setCurrentRunningId('__session_reset__')

    try {
      await resetPythonSession(`python-session:${screenKey}`, {
        onStatus,
      })
      setExecutedBlockIds([])
      setSessionVersion((value) => value + 1)
    } finally {
      setCurrentRunningId(null)
    }
  }, [screenKey])

  const value = useMemo(() => ({
    getBlockMeta,
    isSessionBusy: currentRunningId !== null,
    registerBlock,
    resetSession,
    runBlock,
    sessionVersion,
    unregisterBlock,
  }), [currentRunningId, getBlockMeta, registerBlock, resetSession, runBlock, sessionVersion, unregisterBlock])

  return <PythonExecutionContext.Provider value={value}>{children}</PythonExecutionContext.Provider>
}
