'use client'
import { useState, useEffect, useRef, ReactNode, cloneElement, isValidElement } from 'react'

export default function TypewriterWrapper({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const textContent = useRef('')

  useEffect(() => {
    setMounted(true)
    const extractText = (node: ReactNode): string => {
      if (typeof node === 'string') return node
      if (typeof node === 'number') return String(node)
      if (Array.isArray(node)) return node.map(extractText).join('')
      if (isValidElement(node) && node.props.children) {
        return extractText(node.props.children)
      }
      return ''
    }
    
    textContent.current = extractText(children)
    setIndex(0)
  }, [children])

  useEffect(() => {
    if (mounted && index < textContent.current.length) {
      const timeout = setTimeout(() => {
        setIndex(prev => prev + 1)
      }, 15)
      return () => clearTimeout(timeout)
    }
  }, [index, mounted])

  const displayedText = textContent.current.slice(0, index)

  return <div dangerouslySetInnerHTML={{ __html: displayedText.replace(/\n/g, '<br/>') }} />
}
