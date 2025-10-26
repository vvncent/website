'use client'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useMode } from './ModeContext'

export default function Statusline() {
  const pathname = usePathname()
  const [theme, setTheme] = useState('dark')
  const [colorscheme, setColorscheme] = useState('gruvbox')
  const [mounted, setMounted] = useState(false)
  const { isTyping } = useMode()

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') || 'dark'
    const savedColorscheme = localStorage.getItem('colorscheme') || 'gruvbox'
    setTheme(savedTheme)
    setColorscheme(savedColorscheme)

    const interval = setInterval(() => {
      const currentTheme = localStorage.getItem('theme') || 'dark'
      const currentColorscheme = localStorage.getItem('colorscheme') || 'gruvbox'
      if (currentTheme !== theme) setTheme(currentTheme)
      if (currentColorscheme !== colorscheme) setColorscheme(currentColorscheme)
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [theme, colorscheme])
  
  const getPageName = () => {
    if (pathname === '/') return 'home'
    if (pathname === '/math') return 'math'
    if (pathname === '/computer-science') return 'computer-science'
    return 'home'
  }

  if (!mounted) {
    return (
      <div className="bg-bg0 flex justify-between text-sm transition-all duration-300 fixed bottom-0 left-0 right-0 z-50">
        <div className="flex items-stretch">
          <span className="bg-green text-bg px-3 py-1 flex items-center font-bold relative z-10">
            NORMAL
            <span className="absolute right-[-8px] top-0 w-0 h-full border-l-[8px] border-l-green border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent"></span>
          </span>
          <span className="bg-bg1 text-fg pl-4 pr-3 py-1 flex items-center relative z-0">
            home
            <span className="absolute right-[-8px] top-0 w-0 h-full border-l-[8px] border-l-bg1 border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent"></span>
          </span>
        </div>
        <div className="flex items-stretch">
          <span className="bg-bg2 text-fg pl-3 pr-4 py-1 flex items-center relative z-0">
            <span className="absolute left-[-8px] top-0 w-0 h-full border-r-[8px] border-r-bg2 border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent"></span>
            dark
          </span>
          <span className="bg-bg1 text-fg pl-4 pr-3 py-1 flex items-center relative z-10">
            <span className="absolute left-[-8px] top-0 w-0 h-full border-r-[8px] border-r-bg1 border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent"></span>
            gruvbox
          </span>
          <span className="bg-bg2 text-fg pl-4 pr-3 py-1 flex items-center relative z-20">
            <span className="absolute left-[-8px] top-0 w-0 h-full border-r-[8px] border-r-bg2 border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent"></span>
            utf-8
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-bg0 flex justify-between text-sm transition-all duration-300 fixed bottom-0 left-0 right-0 z-50">
      <div className="flex items-stretch">
        <span className={`${isTyping ? 'bg-blue' : 'bg-green'} text-bg px-3 py-1 flex items-center font-bold relative z-10`}>
          {isTyping ? 'INSERT' : 'NORMAL'}
          <span className={`absolute right-[-8px] top-0 w-0 h-full border-l-[8px] ${isTyping ? 'border-l-blue' : 'border-l-green'} border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent`}></span>
        </span>
        <span className="bg-bg1 text-fg pl-4 pr-3 py-1 flex items-center relative z-0">
          {getPageName()}
          <span className="absolute right-[-8px] top-0 w-0 h-full border-l-[8px] border-l-bg1 border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent"></span>
        </span>
      </div>
      <div className="flex items-stretch">
        <span className="bg-bg2 text-fg pl-3 pr-4 py-1 flex items-center relative z-0">
          <span className="absolute left-[-8px] top-0 w-0 h-full border-r-[8px] border-r-bg2 border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent"></span>
          {theme === 'dark' ? 'dark' : 'light'}
        </span>
        <span className="bg-bg1 text-fg pl-4 pr-3 py-1 flex items-center relative z-10">
          <span className="absolute left-[-8px] top-0 w-0 h-full border-r-[8px] border-r-bg1 border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent"></span>
          {colorscheme}
        </span>
        <span className="bg-bg2 text-fg pl-4 pr-3 py-1 flex items-center relative z-20">
          <span className="absolute left-[-8px] top-0 w-0 h-full border-r-[8px] border-r-bg2 border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent"></span>
          utf-8
        </span>
      </div>
    </div>
  )
}
