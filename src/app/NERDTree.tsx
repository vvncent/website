'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function NERDTree() {
  const pathname = usePathname()
  const [theme, setTheme] = useState('dark')
  const [colorscheme, setColorscheme] = useState('gruvbox')
  const [showSettings, setShowSettings] = useState(false)
  const [showTheme, setShowTheme] = useState(false)
  const [showColorscheme, setShowColorscheme] = useState(false)
  const [showFont, setShowFont] = useState(false)
  const [showFontSize, setShowFontSize] = useState(false)
  const [showPages, setShowPages] = useState(true)
  const [showHelp, setShowHelp] = useState(false)
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

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '?') {
        setShowHelp(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
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
    else if (colorscheme === 'nord') newColorscheme = 'retrobox'
    else if (colorscheme === 'retrobox') newColorscheme = 'solarized'
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
    <div className="w-64 bg-bg border-r-2 border-dashed border-bg2 flex flex-col h-screen sticky top-0 transition-colors duration-300">
      <div className="p-4 border-b-2 border-dashed border-bg2">
        <div className="flex items-center justify-between mb-2">
          <div className="text-fg font-bold">vvncent.com</div>
          <button onClick={toggleTheme} className="relative w-6 h-6 cursor-pointer overflow-hidden transition-all duration-300 hover:scale-110">
            <span className={`absolute left-1/2 -translate-x-1/2 text-xl transition-all duration-500 ${theme === 'dark' ? 'top-1/2 -translate-y-1/2 opacity-100' : '-top-8 opacity-0'}`}>
              ☾
            </span>
            <span className={`absolute left-1/2 -translate-x-1/2 text-xl transition-all duration-500 ${theme === 'light' ? 'top-1/2 -translate-y-1/2 opacity-100' : 'top-full opacity-0'}`}>
              ☀
            </span>
          </button>
        </div>
        <button onClick={() => setShowHelp(!showHelp)} className="text-fg/50 text-xs hover:text-fg transition-colors cursor-pointer">" Press ? for help</button>
      </div>
      
      <div className="flex-1 p-4 text-sm overflow-y-auto">
        {showHelp ? (
          <div className="text-fg space-y-2">
            <div className="text-yellow font-bold mb-3">Help</div>
            <div className="text-xs space-y-1">
              <div><span className="text-aqua">Navigation:</span></div>
              <div className="ml-2">• Click folders to expand/collapse</div>
              <div className="ml-2">• Click files to navigate pages</div>
              <div className="mt-2"><span className="text-aqua">Settings:</span></div>
              <div className="ml-2">• Toggle theme (dark/light)</div>
              <div className="ml-2">• Change colorscheme</div>
              <div className="ml-2">• Adjust font size (16-20px)</div>
              <div className="mt-2"><span className="text-aqua">Shortcuts:</span></div>
              <div className="ml-2">• Press <span className="text-yellow">?</span> to toggle help</div>
            </div>
            <button onClick={() => setShowHelp(false)} className="mt-4 text-yellow hover:text-orange transition-colors text-xs">Close help</button>
          </div>
        ) : (
          <>
            <div className="text-fg/50 mb-2">/vvncent.com</div>
        <button onClick={() => setShowPages(!showPages)} className="text-fg cursor-pointer hover:text-yellow transition-colors flex items-center">
          <span className="text-fg/50 mr-1">{showPages ? '▾' : '▸'}</span>
          <span className="text-fg/50 mr-1">~</span>
          pages/
        </button>
        <div className={`ml-4 space-y-1 mb-4 overflow-hidden transition-all duration-300 ${showPages ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
          <Link href="/" className={`block text-fg hover:text-yellow transition-colors ${pathname === '/' ? 'text-yellow' : ''}`}>
            <span className="text-fg/50">├─ </span>index.tsx
          </Link>
          <Link href="/math" className={`block text-fg hover:text-yellow transition-colors ${pathname === '/math' ? 'text-yellow' : ''}`}>
            <span className="text-fg/50">├─ </span>math.tsx
          </Link>
          <Link href="/computer-science" className={`block text-fg hover:text-yellow transition-colors ${pathname === '/computer-science' ? 'text-yellow' : ''}`}>
            <span className="text-fg/50">└─ </span>computer-science.tsx
          </Link>
        </div>
        
        <div>
          <button onClick={() => setShowSettings(!showSettings)} className="text-fg cursor-pointer hover:text-yellow transition-colors flex items-center">
            <span className="text-fg/50 mr-1">{showSettings ? '▾' : '▸'}</span>
            <span className="text-fg/50 mr-1">~</span>
            settings/
          </button>
          <div className={`ml-4 space-y-2 overflow-hidden transition-all duration-300 ${showSettings ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div>
              <button onClick={() => setShowTheme(!showTheme)} className="text-fg cursor-pointer hover:text-yellow transition-colors flex items-center text-sm">
                <span className="text-fg/50 mr-1">{showTheme ? '▾' : '▸'}</span>
                <span className="text-fg/50 mr-1">├─</span>
                theme
              </button>
              <div className={`ml-4 overflow-hidden transition-all duration-300 ${showTheme ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                <button onClick={() => { setTheme('dark'); localStorage.setItem('theme', 'dark'); document.documentElement.setAttribute('data-theme', 'dark'); }} className={`block text-sm ${theme === 'dark' ? 'text-yellow' : 'text-fg hover:text-yellow'} transition-colors`}><span className="text-fg/50">├─ </span>dark</button>
                <button onClick={() => { setTheme('light'); localStorage.setItem('theme', 'light'); document.documentElement.setAttribute('data-theme', 'light'); }} className={`block text-sm ${theme === 'light' ? 'text-yellow' : 'text-fg hover:text-yellow'} transition-colors`}><span className="text-fg/50">└─ </span>light</button>
              </div>
            </div>
            <div>
              <button onClick={() => setShowColorscheme(!showColorscheme)} className="text-fg cursor-pointer hover:text-yellow transition-colors flex items-center text-sm">
                <span className="text-fg/50 mr-1">{showColorscheme ? '▾' : '▸'}</span>
                <span className="text-fg/50 mr-1">├─</span>
                colorscheme
              </button>
              <div className={`ml-4 overflow-hidden transition-all duration-300 ${showColorscheme ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <button onClick={() => { setColorscheme('gruvbox'); localStorage.setItem('colorscheme', 'gruvbox'); document.documentElement.removeAttribute('data-colorscheme'); }} className={`block text-sm ${colorscheme === 'gruvbox' ? 'text-yellow' : 'text-fg hover:text-yellow'} transition-colors`}><span className="text-fg/50">├─ </span>gruvbox ♥</button>
                <button onClick={() => { setColorscheme('dracula'); localStorage.setItem('colorscheme', 'dracula'); document.documentElement.setAttribute('data-colorscheme', 'dracula'); }} className={`block text-sm ${colorscheme === 'dracula' ? 'text-yellow' : 'text-fg hover:text-yellow'} transition-colors`}><span className="text-fg/50">├─ </span>dracula</button>
                <button onClick={() => { setColorscheme('nord'); localStorage.setItem('colorscheme', 'nord'); document.documentElement.setAttribute('data-colorscheme', 'nord'); }} className={`block text-sm ${colorscheme === 'nord' ? 'text-yellow' : 'text-fg hover:text-yellow'} transition-colors`}><span className="text-fg/50">├─ </span>nord</button>
                <button onClick={() => { setColorscheme('retrobox'); localStorage.setItem('colorscheme', 'retrobox'); document.documentElement.setAttribute('data-colorscheme', 'retrobox'); }} className={`block text-sm ${colorscheme === 'retrobox' ? 'text-yellow' : 'text-fg hover:text-yellow'} transition-colors`}><span className="text-fg/50">├─ </span>retrobox</button>
                <button onClick={() => { setColorscheme('solarized'); localStorage.setItem('colorscheme', 'solarized'); document.documentElement.setAttribute('data-colorscheme', 'solarized'); }} className={`block text-sm ${colorscheme === 'solarized' ? 'text-yellow' : 'text-fg hover:text-yellow'} transition-colors`}><span className="text-fg/50">└─ </span>solarized</button>
              </div>
            </div>
            <div>
              <button onClick={() => setShowFontSize(!showFontSize)} className="text-fg cursor-pointer hover:text-yellow transition-colors flex items-center text-sm">
                <span className="text-fg/50 mr-1">{showFontSize ? '▾' : '▸'}</span>
                <span className="text-fg/50 mr-1">└─</span>
                font size
              </button>
              <div className={`ml-4 overflow-hidden transition-all duration-300 ${showFontSize ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                <button onClick={() => { setFontSize(16); localStorage.setItem('fontSize', '16'); document.documentElement.style.fontSize = '16px'; }} className={`block text-sm ${fontSize === 16 ? 'text-yellow' : 'text-fg hover:text-yellow'} transition-colors`}><span className="text-fg/50">├─ </span>small (16px)</button>
                <button onClick={() => { setFontSize(17); localStorage.setItem('fontSize', '17'); document.documentElement.style.fontSize = '17px'; }} className={`block text-sm ${fontSize === 17 ? 'text-yellow' : 'text-fg hover:text-yellow'} transition-colors`}><span className="text-fg/50">├─ </span>medium (17px)</button>
                <button onClick={() => { setFontSize(18); localStorage.setItem('fontSize', '18'); document.documentElement.style.fontSize = '18px'; }} className={`block text-sm ${fontSize === 18 ? 'text-yellow' : 'text-fg hover:text-yellow'} transition-colors`}><span className="text-fg/50">└─ </span>large (18px)</button>
              </div>
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  )
}
