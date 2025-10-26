'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Nav() {
  const [theme, setTheme] = useState('dark')
  const [colorscheme, setColorscheme] = useState('gruvbox')
  const [showSettings, setShowSettings] = useState(false)
  const [fontSize, setFontSize] = useState(16)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    const savedColorscheme = localStorage.getItem('colorscheme') || 'gruvbox'
    const savedFontSize = localStorage.getItem('fontSize') || '16'
    setTheme(savedTheme)
    setColorscheme(savedColorscheme)
    setFontSize(parseInt(savedFontSize))
    document.documentElement.setAttribute('data-theme', savedTheme)
    document.documentElement.style.fontSize = `${savedFontSize}px`
    if (savedColorscheme !== 'gruvbox') {
      document.documentElement.setAttribute('data-colorscheme', savedColorscheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const toggleColorscheme = () => {
    let newColorscheme = 'gruvbox'
    if (colorscheme === 'gruvbox') newColorscheme = 'dracula'
    else if (colorscheme === 'dracula') newColorscheme = 'nord'
    else newColorscheme = 'gruvbox'
    
    setColorscheme(newColorscheme)
    localStorage.setItem('colorscheme', newColorscheme)
    
    if (newColorscheme === 'gruvbox') {
      document.documentElement.removeAttribute('data-colorscheme')
    } else {
      document.documentElement.setAttribute('data-colorscheme', newColorscheme)
    }
  }

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value)
    setFontSize(newSize)
    localStorage.setItem('fontSize', String(newSize))
    document.documentElement.style.fontSize = `${newSize}px`
  }

  return (
    <nav className="bg-bg0 border-b-2 border-bg2 px-8 py-4 flex gap-8 items-center transition-all duration-300">
      <Link href="/" className="text-yellow no-underline px-2 py-1 transition-all duration-200 relative hover:text-orange group">
        Home
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange transition-all duration-200 group-hover:w-full"></span>
      </Link>
      <Link href="/math" className="text-yellow no-underline px-2 py-1 transition-all duration-200 relative hover:text-orange group">
        Math
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange transition-all duration-200 group-hover:w-full"></span>
      </Link>
      <Link href="/computer-science" className="text-yellow no-underline px-2 py-1 transition-all duration-200 relative hover:text-orange group">
        Computer Science
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange transition-all duration-200 group-hover:w-full"></span>
      </Link>
      <button onClick={() => setShowSettings(!showSettings)} className="ml-auto text-fg text-2xl cursor-pointer transition-all duration-200 hover:scale-110">
        ⚙
      </button>
      <div className="relative">
        {showSettings && (
          <div className="absolute right-0 top-full mt-2 bg-bg0/50 border-2 border-bg2 rounded-lg p-4 shadow-lg min-w-[200px] animate-fade-in z-50" style={{backdropFilter: 'blur(12px)'}}>
            <div className="mb-4">
              <div className="text-fg text-sm mb-2 font-bold">Theme</div>
              <button onClick={toggleTheme} className="w-full bg-bg1/30 text-fg px-3 py-2 cursor-pointer transition-all duration-200 hover:bg-bg2/50 rounded text-center">
                {theme === 'dark' ? 'dark' : 'light'}
              </button>
            </div>
            <div className="mb-4">
              <div className="text-fg text-sm mb-2 font-bold">Colorscheme</div>
              <button onClick={toggleColorscheme} className="w-full bg-bg1/30 text-fg px-3 py-2 cursor-pointer transition-all duration-200 hover:bg-bg2/50 rounded">
                {colorscheme}
              </button>
            </div>
            <div>
              <div className="text-fg text-sm mb-2 font-bold">Font Size: {fontSize}px</div>
              <input 
                type="range" 
                min="16" 
                max="20" 
                value={fontSize} 
                onChange={handleFontSizeChange}
                className="w-full cursor-pointer accent-yellow"
                style={{
                  background: `linear-gradient(to right, var(--yellow) 0%, var(--yellow) ${(fontSize - 16) * 25}%, var(--bg2) ${(fontSize - 16) * 25}%, var(--bg2) 100%)`
                }}
              />
            </div>
          </div>
        )}
      </div>
      <button onClick={toggleTheme} className="relative w-8 h-8 cursor-pointer overflow-hidden transition-all duration-300 hover:scale-110">
        <span className={`absolute left-1/2 -translate-x-1/2 text-2xl transition-all duration-500 ${theme === 'dark' ? 'top-1/2 -translate-y-1/2 opacity-100' : '-top-8 opacity-0'}`}>
          ☾
        </span>
        <span className={`absolute left-1/2 -translate-x-1/2 text-2xl transition-all duration-500 ${theme === 'light' ? 'top-1/2 -translate-y-1/2 opacity-100' : 'top-full opacity-0'}`}>
          ☀
        </span>
      </button>
    </nav>
  )
}
