'use client'
import { useState, useEffect, useRef } from 'react'
import { useMode } from './ModeContext'

export default function Home() {
  const [text, setText] = useState('')
  const [theme, setTheme] = useState('dark')
  const [showPopup, setShowPopup] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const fullTextRef = useRef("Welcome to Vincent's Website!\n\nI graduated from Carnegie Mellon with a B.S. in Computer Science and Math (with university honors). I am currently a software engineer at Amazon Web Services, working on networking and automation in EC2 VPC.\n\nThis page is under construction.\n\nCheck back soon for updates!")
  const { setIsTyping } = useMode()

  useEffect(() => {
    setTimeout(() => setShowPopup(true), 2000)
  }, [])

  useEffect(() => {
    setTheme(localStorage.getItem('theme') || 'dark')
    const interval = setInterval(() => {
      setTheme(localStorage.getItem('theme') || 'dark')
    }, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let index = 0
    const fullText = fullTextRef.current
    const typoText = fullText.replace('for updates!', 'for updaets!')
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
        if (index < fullText.length - 8) {
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
        if (backspaceCount < 8) {
          setText(typoText.slice(0, typoText.length - backspaceCount - 1))
          backspaceCount++
        } else {
          phase = 'correcting'
          index = fullText.length - 8
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
  }, [setIsTyping])

  const lines = text.split('\n')

  const showCursor = text.length < fullTextRef.current.length

  return (
    <>
      {showPopup && (
        <div className={`fixed top-32 left-80 z-50 flex items-center gap-2 ${fadeOut ? 'animate-fade-out' : 'animate-fade-in'}`}>
          <div className="text-yellow text-4xl">←</div>
          <div className="border-2 border-dashed border-yellow bg-bg p-4" style={{ opacity: 0.6 }}>
            <p className="text-fg mb-2">Click on pages to explore!</p>
            <button 
              onClick={() => {
                setFadeOut(true)
                setTimeout(() => {
                  setShowPopup(false)
                  localStorage.setItem('hasSeenPopup', 'true')
                }, 500)
              }}
              className="text-yellow hover:text-green transition-colors text-xs"
            >
              [x] close
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center">
      <div className="flex gap-4 mb-6 w-full">
        <div className="border-2 border-dashed border-bg2 p-4 flex items-center justify-center">
          <img src="/images/profile.png" alt="Profile" className="w-40 h-40 rounded-full" />
        </div>
        <div className="border-2 border-dashed border-bg2 p-4 flex-1 flex flex-col items-center justify-center gap-3">
          {lines[0] && <h1 className="text-fg0 text-2xl transition-colors duration-300">{lines[0]}{!lines[2] && showCursor && <span className="bg-fg inline-block w-2 h-6 ml-1 animate-pulse"></span>}</h1>}
          <div className="flex gap-4 items-center">
            <a href="https://www.linkedin.com/in/vvncent/" target="_blank" rel="noopener noreferrer">
              <img src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg" alt="LinkedIn" className="h-8" />
            </a>
            <a href="https://github.com/vvncent" target="_blank" rel="noopener noreferrer">
              <svg className="h-8 w-8" fill={theme === 'dark' ? '#ffffff' : '#000000'} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="mailto:vincent2@alumni.cmu.edu">
              <svg className="h-8 w-8" fill={theme === 'dark' ? '#ffffff' : '#000000'} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
            <a href="https://cs.cmu.edu/" target="_blank" rel="noopener noreferrer">
              <img src="/images/scs.gif" alt="CMU" className="h-8" />
            </a>
            <a href="https://aws.amazon.com/what-is-cloud-computing" target="_blank" rel="noopener noreferrer">
              <img src={theme === 'dark' ? 'https://d0.awsstatic.com/logos/powered-by-aws-white.png' : 'https://d0.awsstatic.com/logos/powered-by-aws.png'} alt="Powered by AWS Cloud Computing" className="h-8" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-2 border-dashed border-bg2 p-4 mb-6 w-full">
        {lines[2] && <p className="text-fg transition-colors duration-300">{lines[2]}{!lines[4] && showCursor && <span className="bg-fg inline-block w-2 h-4 ml-1 animate-pulse"></span>}</p>}
      </div>
      {lines[4] && <p className="text-fg mb-4 transition-colors duration-300">{lines[4]}{!lines[6] && showCursor && <span className="bg-fg inline-block w-2 h-4 ml-1 animate-pulse"></span>}</p>}
      {lines[6] && <p className="text-fg mb-4 transition-colors duration-300">{lines[6]}{showCursor && <span className="bg-fg inline-block w-2 h-4 ml-1 animate-pulse"></span>}</p>}
      </div>
    </>
  )
}
