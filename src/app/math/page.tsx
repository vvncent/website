'use client'
import { useState, useEffect, useRef } from 'react'
import { useMode } from '../ModeContext'

export default function Math() {
  const [text, setText] = useState('')
  const fullTextRef = useRef("Math\n\nMy mathematical projects and interests.")
  const { setIsTyping } = useMode()

  useEffect(() => {
    let index = 0
    const fullText = fullTextRef.current
    setIsTyping(true)
    
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(interval)
      }
    }, 15)
    return () => {
      clearInterval(interval)
      setIsTyping(false)
    }
  }, [setIsTyping])

  const lines = text.split('\n')

  const showCursor = text.length < fullTextRef.current.length

  return (
    <div>
      {lines[0] && <h1 className="text-fg0 mb-6 text-xl transition-colors duration-300">{lines[0]}{!lines[2] && showCursor && <span className="bg-fg inline-block w-2 h-5 ml-1 animate-pulse"></span>}</h1>}
      {lines[2] && <p className="text-fg mb-4 transition-colors duration-300">{lines[2]}{showCursor && <span className="bg-fg inline-block w-2 h-4 ml-1 animate-pulse"></span>}</p>}
    </div>
  )
}
