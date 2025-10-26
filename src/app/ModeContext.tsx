'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

const ModeContext = createContext<{
  isTyping: boolean
  setIsTyping: (typing: boolean) => void
}>({
  isTyping: false,
  setIsTyping: () => {},
})

export function ModeProvider({ children }: { children: ReactNode }) {
  const [isTyping, setIsTyping] = useState(false)
  return (
    <ModeContext.Provider value={{ isTyping, setIsTyping }}>
      {children}
    </ModeContext.Provider>
  )
}

export const useMode = () => useContext(ModeContext)
