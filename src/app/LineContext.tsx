'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

const LineContext = createContext<{
  lineCount: number
  setLineCount: (count: number) => void
}>({
  lineCount: 10,
  setLineCount: () => {},
})

export function LineProvider({ children }: { children: ReactNode }) {
  const [lineCount, setLineCount] = useState(10)
  return (
    <LineContext.Provider value={{ lineCount, setLineCount }}>
      {children}
    </LineContext.Provider>
  )
}

export const useLineCount = () => useContext(LineContext)
