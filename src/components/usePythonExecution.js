import { createContext, useContext } from 'react'

export const PythonExecutionContext = createContext(null)

export function usePythonExecution() {
  const context = useContext(PythonExecutionContext)

  if (!context) {
    throw new Error('usePythonExecution must be used inside PythonExecutionProvider')
  }

  return context
}
