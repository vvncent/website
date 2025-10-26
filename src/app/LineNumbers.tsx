'use client'
import { useState, useEffect } from 'react'

export default function LineNumbers() {
  const [mouseY, setMouseY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="w-12 bg-bg1 text-fg text-center select-none leading-relaxed transition-colors duration-300 flex flex-col items-center pb-14">
      {Array.from({length: 30}, (_, i) => {
        const lineElement = typeof window !== 'undefined' ? document.getElementById(`line-${i + 1}`) : null
        const lineY = lineElement?.getBoundingClientRect().top || 0
        const distance = Math.abs(mouseY - lineY)
        const opacity = Math.max(0.35, 1 - distance / 800)
        
        return (
          <div 
            key={i + 1} 
            id={`line-${i + 1}`} 
            style={{ opacity }}
          >
            {i < 20 ? i + 1 : '~'}
          </div>
        )
      })}
    </div>
  )
}
