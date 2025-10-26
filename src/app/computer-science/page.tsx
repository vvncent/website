'use client'
import { useMode } from '../ModeContext'
import { useTypewriter } from '../useTypewriter'

export default function ComputerScience() {
  const { setIsTyping } = useMode()
  const text = useTypewriter(
    "Computer Science\n\nMy programming projects and technical work.",
    "technical work.",
    "tecnical work.",
    setIsTyping
  )
  const fullText = "Computer Science\n\nMy programming projects and technical work."
  const lines = text.split('\n')

  const showCursor = text.length < fullText.length

  return (
    <div>
      {lines[0] && <h1 className="text-fg0 mb-6 text-xl transition-colors duration-300">{lines[0]}{!lines[2] && showCursor && <span className="bg-fg inline-block w-2 h-5 ml-1 animate-pulse align-text-bottom"></span>}</h1>}
      {lines[2] && <p className="text-fg mb-4 transition-colors duration-300">{lines[2]}{showCursor && <span className="bg-fg inline-block w-2 h-4 ml-1 animate-pulse align-text-bottom"></span>}</p>}
    </div>
  )
}
