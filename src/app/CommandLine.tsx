'use client'
import { useState, useEffect } from 'react'
import { useMode } from './ModeContext'

export default function CommandLine() {
  const [commandText, setCommandText] = useState('')
  const [messageText, setMessageText] = useState('')
  const [hasPlayed, setHasPlayed] = useState(false)
  const { isTyping } = useMode()

  useEffect(() => {
    if (isTyping) {
      setHasPlayed(false)
    } else if (!hasPlayed) {
      setHasPlayed(true)
      setMessageText('')
      setCommandText('')
      setTimeout(() => {
        let index = 0
        const command = ':w'
        const interval = setInterval(() => {
          if (index < command.length) {
            setCommandText(command.slice(0, index + 1))
            index++
          } else {
            clearInterval(interval)
            setTimeout(() => {
              setCommandText('')
              setMessageText('"page.tsx" 144L, 4829B written')
              setTimeout(() => {
                setMessageText('')
                const message = ':The design of this website was inspired by vim, my favorite editor'
                let msgIndex = 0
                const msgInterval = setInterval(() => {
                  if (msgIndex < message.length) {
                    setMessageText(message.slice(0, msgIndex + 1))
                    msgIndex++
                  } else {
                    clearInterval(msgInterval)
                  }
                }, 30)
              }, 800)
            }, 200)
          }
        }, 150)
      }, 1000)
    }
  }, [isTyping, hasPlayed])

  return (
    <div className="bg-bg text-fg px-2 py-1 text-sm border-t border-bg2">
      {commandText ? (
        <span>{commandText}<span className="bg-fg inline-block w-2 h-5 ml-1 animate-pulse align-text-bottom"></span></span>
      ) : messageText ? (
        <span>{messageText}<span className="bg-fg inline-block w-2 h-5 ml-1 animate-pulse align-text-bottom"></span></span>
      ) : (
        <span className="bg-fg inline-block w-2 h-5 animate-pulse align-text-bottom"></span>
      )}
    </div>
  )
}
