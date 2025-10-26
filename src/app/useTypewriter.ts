import { useState, useEffect } from 'react'

export function useTypewriter(fullText: string, typoWord: string, typoReplacement: string, setIsTyping: (typing: boolean) => void) {
  const [text, setText] = useState('')

  useEffect(() => {
    let index = 0
    const typoText = fullText.replace(typoWord, typoReplacement)
    const typoLength = typoReplacement.length
    let phase = 'typing'
    let backspaceCount = 0
    setIsTyping(true)
    
    const getDelay = () => {
      if (phase === 'pause') return 300
      if (phase === 'backspace') return 80
      if (phase === 'correcting') return 100
      return 5
    }
    
    const tick = () => {
      if (phase === 'typing') {
        if (index < fullText.length - typoLength) {
          setText(fullText.slice(0, index + 1))
          index++
        } else if (index < typoText.length) {
          setText(typoText.slice(0, index + 1))
          index++
        } else {
          phase = 'pause'
        }
      } else if (phase === 'pause') {
        phase = 'backspace'
      } else if (phase === 'backspace') {
        if (backspaceCount < typoLength) {
          setText(typoText.slice(0, typoText.length - backspaceCount - 1))
          backspaceCount++
        } else {
          phase = 'correcting'
          index = fullText.length - typoLength
        }
      } else if (phase === 'correcting') {
        if (index < fullText.length) {
          setText(fullText.slice(0, index + 1))
          index++
        } else {
          setIsTyping(false)
          return
        }
      }
      setTimeout(tick, getDelay())
    }
    
    setTimeout(tick, 5)
    
    return () => {
      setIsTyping(false)
    }
  }, [fullText, typoWord, typoReplacement, setIsTyping])

  return text
}
